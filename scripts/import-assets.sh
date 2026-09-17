#!/usr/bin/env bash
# Copy images from assets/incoming/ into the site folders.
# Run on the Mac (or in Codex local), then git add + commit.
# This script cannot run from the GitHub text API.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="$ROOT/assets/incoming"
DEST_TEAM="$ROOT/assets/team"
DEST_SPACE="$ROOT/assets"

mkdir -p "$IN" "$DEST_TEAM"

if ! ls "$IN"/* >/dev/null 2>&1; then
  echo "Drop files in assets/incoming/ then run again."
  echo "Expected team names:"
  echo "  mario-mariani.jpg"
  echo "  livio-quintavalle.jpg"
  echo "  benedetta-mariani.jpg"
  echo "  giulia-onano.jpg"
  echo "  maria-adelaide-lai.jpg"
  echo "Coworking names:"
  echo "  coworking-desk.jpg coworking-office.jpg coworking-room.jpg"
  exit 0
fi

shopt -s nullglob
for f in "$IN"/*; do
  base="$(basename "$f")"
  lower="$(echo "$base" | tr '[:upper:]' '[:lower:]' | tr ' _' '--' | sed 's/--/-/g')"
  case "$lower" in
    *mario*) dest="$DEST_TEAM/mario-mariani.jpg" ;;
    *livio*) dest="$DEST_TEAM/livio-quintavalle.jpg" ;;
    *benedetta*) dest="$DEST_TEAM/benedetta-mariani.jpg" ;;
    *giulia*) dest="$DEST_TEAM/giulia-onano.jpg" ;;
    *adelaide*|*lai*) dest="$DEST_TEAM/maria-adelaide-lai.jpg" ;;
    *desk*|*flex*|*fixed*) dest="$DEST_SPACE/coworking-desk.jpg" ;;
    *ufficio*|*office*|*imprese*) dest="$DEST_SPACE/coworking-office.jpg" ;;
    *sala*|*room*|*sale*) dest="$DEST_SPACE/coworking-room.jpg" ;;
    *) dest="$DEST_SPACE/$lower" ;;
  esac
  cp "$f" "$dest"
  echo "copied $base -> ${dest#$ROOT/}"
done

echo "Next: git add assets && git commit -m 'Add photos' && git push"
