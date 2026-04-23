#!/usr/bin/env bash
set -euo pipefail
REPO_DIR=$(cd "$(dirname "$0")/.." && pwd)
rsync -a --delete \
  --exclude='.venv' --exclude='intakes' --exclude='db' \
  --exclude='__pycache__' --exclude='*.pyc' --exclude='.pytest_cache' \
  "$REPO_DIR/services/chat-intake/" /opt/forgingapps/chat-intake/
sudo systemctl restart chat-intake.service
systemctl --no-pager status chat-intake.service | head -10
