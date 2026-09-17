#!/usr/bin/env bash
# Import a local image into the TNV site repo.
# Usage:
#   scripts/import_asset.sh /path/to/photo.png team mario_mariani
#   scripts/import_asset.sh /path/to/desk.jpg coworking desk --replace
# Then: git add assets && git commit && git push
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-}"
CAT="${2:-}"
NAME="${3:-}"
FORCE="${4:-}"

if [[ -z "$SRC" || -z "$CAT" || -z "$NAME" ]]; then
  echo "usage: $0 <file> <category> <slug> [--replace]"
  echo "categories: team coworking brand other"
  exit 1
fi
if [[ ! -f "$SRC" ]]; then
  echo "missing file: $SRC" >&2
  exit 1
fi
case "$CAT" in
  team) DIR="$ROOT/assets/team" ;;
  coworking|brand|other) DIR="$ROOT/assets" ;;
  *) echo "unknown category: $CAT" >&2; exit 1 ;;
esac
slug="$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9._-' '-')"
slug="${slug#-}"; slug="${slug%-}"
if [[ "$slug" == .* || "$slug" == *..* || "$slug" == */* ]]; then
  echo "unsafe name: $NAME" >&2
  exit 1
fi
ext="${SRC##*.}"
ext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
case "$ext" in
  png|jpg|jpeg|webp|gif|svg) ;;
  *) echo "unsupported format: $ext" >&2; exit 1 ;;
esac
mkdir -p "$DIR"
DEST="$DIR/${slug}.${ext}"
if [[ -e "$DEST" && "$FORCE" != "--replace" ]]; then
  echo "exists: ${DEST#$ROOT/}  (pass --replace)" >&2
  exit 1
fi
cp "$SRC" "$DEST"
echo "repo:  ${DEST#$ROOT/}"
echo "site:  https://livioq.github.io/tnv-site/${DEST#$ROOT/}"
echo "next:  git add ${DEST#$ROOT/} && git commit -m 'Add ${slug}' && git push"
