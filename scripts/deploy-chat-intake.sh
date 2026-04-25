#!/usr/bin/env bash
# Canonical deploy script for the chat-intake FastAPI service.
# Always run this script after editing anything under services/chat-intake/
# Do NOT just `systemctl restart chat-intake.service` -- the runtime lives
# at /opt/forgingapps/chat-intake/ and is a SEPARATE COPY from the repo.
# A bare restart will run the OLD code.
set -euo pipefail

REPO_DIR=$(cd "$(dirname "$0")/.." && pwd)
SRC="$REPO_DIR/services/chat-intake/"
DST="/opt/forgingapps/chat-intake/"

echo "[deploy] rsync $SRC -> $DST"
sudo rsync -a --delete \
  --exclude='.venv' --exclude='intakes' --exclude='db' \
  --exclude='__pycache__' --exclude='*.pyc' --exclude='.pytest_cache' \
  --exclude='*.bak.*' \
  "$SRC" "$DST"

echo "[deploy] restart chat-intake.service"
sudo systemctl restart chat-intake.service

# Restart sweeper service so any change to sweep_inactive.py / unit takes effect.
# The TIMER itself just fires the SERVICE on schedule; restarting the timer
# resets the next-fire countdown without losing schedule alignment.
echo "[deploy] reload + restart chat-intake-sweep.timer"
sudo systemctl daemon-reload
sudo systemctl restart chat-intake-sweep.timer 2>/dev/null || true

echo "[deploy] runtime status:"
systemctl --no-pager status chat-intake.service | head -8

# Drift check: confirm that the file hash of every .py in the runtime
# matches its source counterpart. If anything mismatches we fail loudly.
echo "[deploy] drift check:"
DRIFT=0
while IFS= read -r -d '' src_file; do
  rel=${src_file#"$SRC"}
  dst_file="$DST$rel"
  if [ ! -f "$dst_file" ]; then
    echo "  MISSING in runtime: $rel"
    DRIFT=$((DRIFT+1))
    continue
  fi
  src_hash=$(sha256sum "$src_file" | awk '{print $1}')
  dst_hash=$(sha256sum "$dst_file" | awk '{print $1}')
  if [ "$src_hash" != "$dst_hash" ]; then
    echo "  DRIFT: $rel"
    DRIFT=$((DRIFT+1))
  fi
done < <(find "$SRC" -type f \( -name '*.py' -o -name '*.md' \) \
  -not -path '*/__pycache__/*' \
  -not -path '*/.pytest_cache/*' \
  -not -name '*.bak.*' \
  -print0)

if [ "$DRIFT" -gt 0 ]; then
  echo "[deploy] FAIL: $DRIFT file(s) drifted between repo and runtime"
  exit 1
fi
echo "[deploy] OK: repo and runtime are in sync"
