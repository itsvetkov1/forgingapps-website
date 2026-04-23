# TODO — GET /intake/brief/{id}

Purpose: unblock the main-site `/{locale}/brief-received?id=<brief_id>` page so it can bootstrap a real brief and enable the live Cinder chat UI.

Required behavior
- Add `GET /intake/brief/{brief_id}` on the FastAPI intake service.
- Return `404` for unknown / expired / invalid brief IDs.
- Return `200 application/json` for valid brief IDs with only the metadata the frontend needs to render the page and open chat.

Minimum response shape
```json
{
  "id": "FA-2604-TEST",
  "sid": "session-or-thread-id",
  "firstName": "Mara",
  "email": "mara@example.com",
  "project": "AI chatbot for customer support",
  "interest": "Founder-led scoping",
  "launch": "Next month",
  "locale": "en",
  "createdAt": "2026-04-21T08:00:00Z"
}
```

Data source expectations
- Primary lookup key: `brief_id`.
- Source of truth should be the hybrid intake store described in HANDOFF / wiki:
  - SQLite `briefs` row for the canonical brief metadata.
  - Session/filesystem state for the linked `sid` if needed.
- If n8n already writes the `briefs` row, this endpoint should read that record rather than inventing a parallel source.

Session bootstrap expectations
- The endpoint should not mutate state just to read a brief.
- It must return the session identifier (`sid`) the frontend uses for subsequent chat calls.
- If the session row exists but the transcript has not started yet, that is fine — the frontend seeds the first visible assistant message client-side.
- Keep chat-turn creation in the existing POST flow (`/intake/session/{sid}/turn` or legacy `/intake/message` fallback), not in this GET.

Frontend compatibility notes
- Current deployed frontend calls:
  - `GET /intake/brief/{brief_id}` to bootstrap
  - `POST /intake/session/{sid}/turn` first
  - falls back to `POST /intake/message` if `/turn` is not implemented yet
  - `POST /intake/session/{sid}/submit` for SubmitCTA
- The redirect in `ContactForm.tsx` is intentionally guarded behind a successful GET to this endpoint so users are not dropped onto a broken page.

CORS / access expectations
- Allow `https://forgingapps.com`.
- Allow preview / deploy domains used by the static site pipeline if they are already part of the intake CORS policy.
- `GET` should be callable from the public brief-received page with normal browser fetch semantics.
- If credentials are required later, keep CORS compatible with `credentials: 'include'`; current frontend already sets that for intake fetches.

Failure semantics
- `404`: brief does not exist or is not available for bootstrap.
- `410` would be acceptable for intentionally expired links if link expiry is added later.
- Do not leak internal storage paths, SQL errors, or stack traces in the response body.

Non-goals for this pass
- Do not implement admin transcript views here.
- Do not change the current `/intake/message` business behavior just to satisfy this GET.
- Do not add Claude or any non-approved model provider.

Why this matters
- Without this endpoint, the live `/en/brief-received?id=...` page loads but cannot hydrate a real brief, so the Cinder UI stays in the “could not load that brief” state even though the deployed chat-turn path itself is healthy.
