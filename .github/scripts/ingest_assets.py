#!/usr/bin/env python3
"""Turn incoming/**/*.{url,b64} pointer files into verified images under assets/.

A .url file holds one HTTP(S) URL. A .b64 file holds either a raw base64
blob or a full data URI (data:image/jpeg;base64,...). Either way, the
destination is assets/<same-subpath-as-incoming>/<pointer-basename>.<ext>,
with <ext> taken from the image's real, Pillow-detected format rather than
guessed from the pointer's own name or the source URL.

A pointer is only consumed (deleted) once the fetched/decoded bytes are
proven to be a genuinely decodable image: im.load() is called, not just
im.verify(), because verify() can miss a truncated download that still
parses as a valid-looking header. Anything that fails is left in place and
reported as a workflow warning instead of being committed.
"""
import base64
import os
import re
import sys
import time
import urllib.error
import urllib.request

from PIL import Image, UnidentifiedImageError

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
INCOMING = os.path.join(REPO_ROOT, "incoming")
ASSETS = os.path.join(REPO_ROOT, "assets")

FORMAT_EXT = {
    "JPEG": ".jpeg",
    "PNG": ".png",
    "WEBP": ".webp",
    "GIF": ".gif",
}

USER_AGENT = "tnv-site-asset-ingest/1.0 (+https://github.com/livioq/tnv-site)"
POINTER_EXTS = (".url", ".b64")


def log(msg):
    print(msg, flush=True)


def fetch_url(url, dest_tmp, attempts=3):
    last_exc = None
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
            with open(dest_tmp, "wb") as f:
                f.write(data)
            return
        except (urllib.error.URLError, TimeoutError, ConnectionError) as exc:
            last_exc = exc
            if attempt < attempts - 1:
                time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"failed to fetch {url!r} after {attempts} attempts: {last_exc}")


def decode_b64(content, dest_tmp):
    content = content.strip()
    m = re.match(r"^data:[^;,]+;base64,(.*)$", content, re.DOTALL)
    payload = m.group(1) if m else content
    payload = re.sub(r"\s+", "", payload)
    data = base64.b64decode(payload, validate=False)
    with open(dest_tmp, "wb") as f:
        f.write(data)


def verify_image(path):
    """Return the Pillow-detected format, or None if it doesn't fully decode."""
    try:
        with Image.open(path) as im:
            im.load()  # forces a full decode; .verify() alone misses truncated streams
            return im.format
    except (UnidentifiedImageError, OSError, ValueError):
        return None


def iter_pointers():
    for dirpath, _dirnames, filenames in os.walk(INCOMING):
        for name in sorted(filenames):
            ext = os.path.splitext(name)[1].lower()
            if ext in POINTER_EXTS:
                yield dirpath, name, ext


def main():
    if not os.path.isdir(INCOMING):
        log("No incoming/ directory, nothing to do.")
        return 0

    changed = False
    any_failed = False

    for dirpath, name, ext in iter_pointers():
        src_path = os.path.join(dirpath, name)
        rel_src = os.path.relpath(src_path, REPO_ROOT)
        rel_dir = os.path.relpath(dirpath, INCOMING)
        basename = os.path.splitext(name)[0]
        tmp_path = src_path + ".tmp"

        log(f"Ingesting {rel_src} ...")
        try:
            with open(src_path, "r", encoding="utf-8") as f:
                content = f.read()

            if ext == ".url":
                url = content.strip()
                if not re.match(r"^https?://\S+$", url):
                    raise ValueError(f"not a valid http(s) URL: {url!r}")
                fetch_url(url, tmp_path)
            else:
                decode_b64(content, tmp_path)

            fmt = verify_image(tmp_path)
            if fmt is None:
                raise ValueError(
                    "downloaded/decoded data is not a fully-decodable image "
                    "(likely a truncated or blocked fetch)"
                )

            out_ext = FORMAT_EXT.get(fmt, os.path.splitext(tmp_path)[1] or ".bin")
            dest_dir = ASSETS if rel_dir == "." else os.path.join(ASSETS, rel_dir)
            os.makedirs(dest_dir, exist_ok=True)
            dest_path = os.path.join(dest_dir, basename + out_ext)

            os.replace(tmp_path, dest_path)
            os.remove(src_path)
            changed = True
            log(f"  OK -> {os.path.relpath(dest_path, REPO_ROOT)} ({fmt})")

        except Exception as exc:  # noqa: BLE001 - report and keep going with other pointers
            any_failed = True
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            log(f"::warning file={rel_src}::Ingest failed, pointer left in place: {exc}")

    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a", encoding="utf-8") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")
            f.write(f"failed={'true' if any_failed else 'false'}\n")

    return 0


if __name__ == "__main__":
    sys.exit(main())
