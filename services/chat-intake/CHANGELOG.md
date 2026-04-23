# Chat Intake Legacy History

Pre-2026-04-23 standalone git history is preserved in `/opt/forgingapps/chat-intake.gitbundle`.
A tarball backup of the former runtime `.git/` directory also exists under `/opt/forgingapps/chat-intake.git-backup-<timestamp>.tar.gz`.

## Standalone repo commits
82b0cb4 [hermes] create: add POST /intake/brief/ingest — n8n→brief DB sync with shared-secret auth
072b391 [hermes] update: capture n8n brief sync gap — preserve post-cleanup ingest follow-up
037caac [hermes] create: add brief bootstrap endpoint + sqlite store + seed tool — support brief-received page hydration
f1379b9 [hermes] create: add brief endpoint TODO note — preserve main-site bootstrap contract
572a878 [hermes] refactor: productize intake test page — replace throwaway bundle with live integrated stage UI
f8fe15b [hermes] create: add stage chat-intake test surface — enable Cinder end-to-end QA today
362285f [hermes] fix: make chat-intake unit venv-ready — system python lacked uvicorn under systemd
563ce6a [hermes] create: scaffold intake health service — establish repo-owned FastAPI entrypoint
5eba8e1 [hermes] create: scaffold chat-intake health service — enable first live /intake endpoint
f1cf142 [hermes] create: initialize chat-intake service repo — standalone backend service approved by Kotio
