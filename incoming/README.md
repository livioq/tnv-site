# incoming/

Agents cannot push JPG/PNG bytes through most chat/text APIs. Drop a small
**text** pointer file here instead and push it (directly or in a PR) — the
"Ingest assets" GitHub Action turns it into a real file under `assets/`
automatically. No local image tools, terminal commands, or manual `assets/`
edits needed. This works the same regardless of which assistant (Claude,
Grok, Codex, ...) or which chat surface handed you the pointer, since all
any of them needs is the ability to write a text file and push — not local
filesystem access to this repo.

## What Livio says to an agent

> This photo is Mario. Put it on the site.

The agent then writes one of:

- A pointer to a file that already exists online, e.g.
  `incoming/team/mario_mariani.url` containing one URL on one line.
- A pointer built from the chat attachment itself: the agent base64-encodes
  the bytes it was actually given and writes
  `incoming/team/mario_mariani.b64`.

Livio never opens Terminal or uses the GitHub upload UI.

## How to add an image

1. Create `incoming/<category>/<name>.url` or `incoming/<category>/<name>.b64`.
   - `<category>` becomes the subfolder under `assets/` (e.g. `team`).
   - `<name>` becomes the filename. The final extension is detected from
     the real, decoded image data — not guessed from the pointer's name or
     the source URL — so don't include an extension in `<name>`.
2. `.url` pointer: a single HTTP(S) URL, one line, nothing else.
3. `.b64` pointer: either a raw base64 blob, or a full data URI
   (`data:image/jpeg;base64,AAAA...`).
4. Push the pointer file. The workflow fetches or decodes it, verifies the
   result is a genuinely, fully decodable image (`Image.load()`, not just
   `Image.verify()` — verify() can miss a truncated download that still
   parses as a valid-looking header), moves it to
   `assets/<category>/<name>.<ext>`, deletes the pointer, and commits.

## If ingest fails

Nothing broken gets committed: the pointer file is left exactly where it
was, and the workflow run is marked failed with a `::warning::` explaining
why — check the repo's Actions tab. Common causes:

- The source blocked or rate-limited the GitHub Actions runner. Retry, or
  switch to a `.b64` pointer with the bytes already in hand instead of a
  `.url` pointer that has to be fetched live from the runner.
- A URL pointing into another repo used an invalid ref.
  `raw.githubusercontent.com` only serves real branches, tags, or commit
  SHAs — **never** a PR number path like `.../pr/286/...`. Use the actual
  branch, tag, or SHA instead.

## Current team-photo slots

`chi-siamo.html` already looks for these and falls back to plain initials
until the files exist:

- `assets/team/mario_mariani.*`
- `assets/team/livio_quintavalle.*`
- `assets/team/benedetta_mariani.*`
- `assets/team/giulia_onano.*`
- `assets/team/maria_adelaide_lai.*`

So a pointer at `incoming/team/mario_mariani.url` (or `.b64`) is all it
takes to fill that slot in.
