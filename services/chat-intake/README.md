# ForgingApps Chat Intake

Canonical source now lives in this repository under `services/chat-intake/`.

Operational notes:
- Runtime deployment target: `/opt/forgingapps/chat-intake/`
- systemd unit: `chat-intake.service`
- Deploy helper: `scripts/deploy-chat-intake.sh`
- Secrets: `/etc/forgingapps/chat-intake.env`

History note:
- Pre-2026-04-23 standalone git history is preserved at `/opt/forgingapps/chat-intake.gitbundle`
- The former runtime repo metadata was also archived as `/opt/forgingapps/chat-intake.git-backup-<timestamp>.tar.gz`
