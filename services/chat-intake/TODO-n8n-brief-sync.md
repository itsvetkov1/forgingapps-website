# TODO — n8n brief sync gap

Status: noted during cleanup on 2026-04-21. Not implemented in this pass.

## Problem

Real contact-form submissions still flow through n8n to Google Sheets and email, but they do not currently create or update rows in `/opt/forgingapps/db/briefs.db`.

Result: `/[locale]/brief-received` can only hydrate for manually seeded briefs right now. Fresh production leads will not have brief bootstrap data unless something writes the SQLite row and matching session bootstrap artifacts.

## Options

### A. n8n POSTs to a new `/intake/brief/ingest` endpoint

Recommended MVP direction.

Flow:
1. contact form lands in n8n
2. n8n generates or receives the canonical lead payload
3. n8n POSTs to `chat-intake` at something like `/intake/brief/ingest`
4. chat-intake upserts `/opt/forgingapps/db/briefs.db`
5. chat-intake creates or updates `/opt/forgingapps/intakes/{sid}/form_data.json`
6. chat-intake returns `{ ok, brief_id, sid }`

Pros:
- keeps SQLite + filesystem writes in one service
- centralizes validation and schema ownership in chat-intake
- easiest place to add auth, logging, and future invariants

Cons:
- requires a small new backend endpoint and n8n workflow update

### B. Background job polls n8n or Sheets and upserts

Flow:
1. n8n keeps writing Sheets/email as it does now
2. a scheduled worker polls n8n output or Google Sheets
3. worker upserts missing rows into `briefs.db` and creates session bootstrap files

Pros:
- decouples intake capture from immediate backend availability
- can backfill historical leads

Cons:
- eventual consistency, not immediate hydration
- adds polling complexity, dedupe rules, and lag
- more moving parts than needed for MVP

### C. Direct shared DB write from n8n

Flow:
1. n8n writes directly into `/opt/forgingapps/db/briefs.db`
2. n8n also writes matching bootstrap files into `/opt/forgingapps/intakes/{sid}/`

Pros:
- shortest path in pure implementation terms

Cons:
- pushes DB/file ownership into workflow automation
- weaker validation boundary
- harder to evolve schema safely
- less attractive from an ops/security perspective

## Minimum fields n8n must pass

At minimum, the ingest handoff needs:
- `brief_id`
- `sid` generation
- `firstName`
- `email`
- `project`
- `interest`
- `launch`
- `locale`
- `variant`

Likely also useful:
- `createdAt`
- `status` (default `open`)

## Auth / boundary note

n8n is internal infrastructure, not a public browser client.

If option A is used, a shared secret header is probably enough for MVP, for example:
- `X-Intake-Ingest-Secret: <shared secret>`

That endpoint should not be open CORS for the public site. Browser CORS concerns apply to public read/chat routes; the ingest path should stay internal-only and authenticated separately.

## Explicitly out of scope for this cleanup

This note is here so the gap does not get lost.

Not in scope for this pass:
- implementing `/intake/brief/ingest`
- changing n8n workflows
- adding a poller
- direct n8n DB/file writes
- live migration/backfill work
