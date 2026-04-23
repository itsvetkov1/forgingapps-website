# ForgingApps Intake Chat Flow — Implementation Plan

**Status:** Draft (v0.1)
**Owner:** Ivaylo
**Author:** prime (Cowork)
**Date:** 2026-04-20
**Dependencies:** variant-specific assistant instructions (separate session), LLM provider wiring (separate session)

---

## 1. Executive Summary

A new post-contact conversational intake flow. After a visitor submits the existing contact form on forgingapps.com, they receive an email containing a unique, resumable chat URL. Clicking the link opens a static chat page where a variant-aware AI assistant conducts a structured intake conversation for the specific product they're interested in (Anvil, Oracle, Ember, etc.). On completion, the backend produces a structured `.md` brief, saves it on Hydra under a per-session directory, and alerts `hello@forgingapps.com` via the existing n8n + Resend pipeline.

The assistant's instructions and the brief template are explicitly **out of scope** for this plan — they'll be authored in a separate session. This plan delivers the platform that will host them.

---

## 2. Scope & Non-Goals

**In scope:**

- A new `/chat?sid={uuid}` page on the static forgingapps.com site (bilingual, responsive).
- A new FastAPI service on Hydra ("chat-intake" service) exposing a small HTTP API the chat page talks to.
- Extensions to the existing `YOj9m4Th3epVgW5q` n8n workflow to generate a session ID + embed the chat URL in the auto-reply email.
- A new n8n workflow triggered by the chat service on session completion, which alerts `hello@forgingapps.com`.
- On-disk per-session storage on Hydra at `/opt/forgingapps/intakes/{session-id}/`.
- A pluggable `LLMProvider` abstraction in the chat service so actual providers can be wired later without refactoring.
- Rate limiting, token ceilings per turn, and history summarization as invisible cost/abuse mitigations.

**Out of scope (explicit non-goals):**

- The assistant's system prompts per variant — authored separately.
- The brief `.md` template shape per variant — authored separately.
- An internal browser UI for Ivaylo to scan sessions and read transcripts. SSH + filesystem is sufficient for MVP. Parked as a phase-4 candidate.
- Real-time streaming of tokens (explicitly declined: turn-based POST/response only).
- A hard per-session turn cap (declined). Rate limit + invisible ceilings + summarization only.
- Real-time handoff to a human operator during a chat session.
- Payment/checkout inside the chat.
- Migration of the existing form itself — the form stays as it is today. Only the n8n workflow behind it changes.

---

## 3. End-to-End Flow (Happy Path)

```
1. Visitor lands on forgingapps.com/{locale}/contact?product={variant}
2. Fills and submits the existing ContactForm
3. Form POSTs to https://hooks.forgingapps.com/webhook/contact-form-lead (n8n)
4. n8n (modified):
   a. Normalizes data (existing)
   b. [NEW] Generates UUIDv4 session_id
   c. [NEW] POSTs to chat service's "create-session" endpoint with form data + variant + locale
   d. Alerts hello@forgingapps.com via Resend (existing, enriched with chat URL)
   e. [MODIFIED] Auto-replies submitter via Resend — email now includes chat URL
      https://forgingapps.com/chat?sid={session_id}
   f. Returns 200 JSON to the form
5. Form success page (existing) informs submitter: "check your inbox — we've sent you a link
   to continue the conversation with our intake assistant"
6. Submitter opens email, clicks link
7. Browser loads static /chat/index.html, JS reads sid from URL, calls GET /api/sessions/{sid}
8. Chat service loads session meta + conversation history, returns to UI
9. UI renders welcome state + assistant's opening turn (variant-specific)
10. Conversation loop:
    - User types message -> UI POSTs /api/sessions/{sid}/turn { message }
    - Backend appends to conversation.jsonl, builds prompt with variant system prompt + history,
      calls LLMProvider, receives full response, appends to jsonl, returns response to UI
    - UI renders response, unblocks input
11. When the assistant decides it has enough, it emits a structured signal (see section 7.5)
    -> Backend updates session state to ready_to_submit -> UI renders "Submit my brief" button
12. User clicks Submit -> UI POSTs /api/sessions/{sid}/submit
13. Backend:
    a. Makes a second LLM call (history + variant-specific brief template prompt) -> brief.md
    b. Writes brief.md to /opt/forgingapps/intakes/{sid}/
    c. Sets session state to "submitted" (terminal; further turns refused)
    d. POSTs summary payload to new n8n webhook /webhook/intake-complete
    e. Returns success to UI
14. UI renders completion state: "thanks — we've got everything. You'll hear from us shortly."
15. n8n sends alert email to hello@forgingapps.com with brief attached/linked
16. Ivaylo reads the email, opens the brief, picks up the lead
```

**Resume path** (user comes back later):

- Step 7 above loads an existing session with state `open` or `ready_to_submit`.
- Full history re-renders, input is re-enabled, conversation resumes.
- Sessions in state `submitted` render as read-only summary.

---

## 4. Architecture

### 4.1 Component Inventory

| # | Component | Where it lives | New / Existing |
|---|---|---|---|
| 1 | `ContactForm.tsx` + variant configs | forgingapps-website repo | Existing, unchanged |
| 2 | n8n `contact-form-lead` workflow | hooks.forgingapps.com | **Modified** |
| 3 | n8n `intake-complete` workflow | hooks.forgingapps.com | **New** |
| 4 | `/chat?sid=xxx` static page | forgingapps-website repo | **New** |
| 5 | `chat-intake` FastAPI service | Hydra `/opt/forgingapps/chat-intake/` | **New** |
| 6 | Caddy reverse proxy route for `chat.forgingapps.com` | Hydra `/etc/caddy/Caddyfile` | **New route** |
| 7 | DNS record `chat.forgingapps.com` | Cloudflare | **New A/AAAA** |
| 8 | Per-session storage | Hydra `/opt/forgingapps/intakes/{sid}/` | **New dir** |
| 9 | `LLMProvider` abstraction | inside #5 | **New** (interface + stub impl) |
| 10 | systemd unit for chat service | Hydra `/etc/systemd/system/forgingapps-chat.service` | **New** |

### 4.2 Why a separate subdomain (`chat.forgingapps.com`) instead of `/api/chat/*` on the main domain

**Chosen: subdomain on Hydra with Caddy.** Score: **85/100**.

- Rationale: Cloudflare Pages is a static host; it can't proxy `/api/chat/*` on forgingapps.com back to Hydra without Cloudflare Workers, which adds a new component. A dedicated subdomain is the simplest and most maintainable route.
- Trade-offs:
  - + Clean separation: static site and chat backend evolve independently.
  - + Caddy handles TLS automatically.
  - + No Cloudflare Worker layer to reason about.
  - + Easy to kill or rebuild the backend without touching the website deploy.
  - - Cross-origin request — requires explicit CORS config on the chat service. (Minor.)
  - - One more DNS record.
- **Alternative considered:** reuse `hooks.forgingapps.com` and add `/chat/*` routes alongside n8n. **Rejected** because it couples two services to one reverse proxy entry and muddies the mental model ("what does hooks.forgingapps.com do?"). Score: 65/100.
- **Alternative considered:** Cloudflare Worker proxy from `forgingapps.com/api/chat/*` -> Hydra. **Rejected** as over-engineered for our scale. Score: 55/100.

### 4.3 Data Flow Diagram (text)

```
[Visitor Browser]
    |  HTTPS POST (form submit)
    v
[n8n @ hooks.forgingapps.com] -- HTTP POST (create session) --> [Chat Service @ chat.forgingapps.com]
    |                                                                  |
    |  Resend email (with chat URL)                                     |  writes meta.json
    v                                                                  v
[Submitter's inbox]                                           [Hydra /opt/forgingapps/intakes/{sid}/]
    |  click email link
    v
[Visitor Browser loads /chat?sid=xxx on forgingapps.com (Cloudflare Pages)]
    |  XHR  (GET session, POST turn)
    v
[Chat Service @ chat.forgingapps.com]
    |                                                                  |
    |  LLMProvider.complete()                                           |  appends conversation.jsonl
    v                                                                  v
[External LLM API (deferred)]                                 [Hydra /opt/forgingapps/intakes/{sid}/]
    |
    |  On user-clicks-submit:
    |    - 2nd LLM call -> brief.md
    |    - write brief.md
    |    - POST to n8n /webhook/intake-complete
    v
[n8n] -- Resend email --> [hello@forgingapps.com]
```

---

## 5. Data Model

### 5.1 Session Directory Layout

```
/opt/forgingapps/intakes/
|-- 2026-04-20/                                # day partition for operational sanity
|   `-- 3f9d1e2c-...-{sid}/
|       |-- meta.json                          # authoritative session metadata
|       |-- conversation.jsonl                 # one message per line, append-only
|       `-- brief.md                           # only present after state=submitted
`-- ...
```

Rationale for day-partitioning: eases ops (browsing by date, retention policies, tar-gzipping old months) without adding a database. Session IDs stay globally unique so the day prefix is purely organizational.

### 5.2 `meta.json` schema

```json
{
  "session_id": "3f9d1e2c-9b41-4f2a-b1e8-68dc9a20c112",
  "created_at": "2026-04-20T14:32:10Z",
  "updated_at": "2026-04-20T14:47:02Z",
  "completed_at": null,
  "state": "open",
  "locale": "bg",
  "variant": "ai-readiness",
  "form_data": {
    "name": "...",
    "email": "...",
    "phone": "+359...",
    "subject": "...",
    "packageInterest": "ai-readiness",
    "message": "...",
    "budget": "10k-25k",
    "source": "homepage",
    "product_tag": "ai-readiness",
    "source_page": "/bg/ai-consulting"
  },
  "turn_count": 7,
  "token_usage": {
    "input_total": 12450,
    "output_total": 3920
  },
  "summarized_at_turn": null,
  "rate_limit_state": {
    "last_turn_at": "2026-04-20T14:47:02Z"
  },
  "client_fingerprint": {
    "first_ip": "1.2.3.4",
    "first_user_agent": "Mozilla/5.0 ...",
    "last_ip": "5.6.7.8"
  }
}
```

State machine: `open` -> `ready_to_submit` -> `submitted`. Additional: `archived` (for idle cleanup post-30 days, phase 3).

### 5.3 `conversation.jsonl` schema

One JSON object per line, append-only. No overwrite, ever — always append.

```jsonl
{"ts":"2026-04-20T14:32:11Z","role":"system","content":"<variant system prompt snapshot>","meta":{"prompt_hash":"sha256:..."}}
{"ts":"2026-04-20T14:32:11Z","role":"assistant","content":"Hello, Ivan..."}
{"ts":"2026-04-20T14:34:22Z","role":"user","content":"..."}
{"ts":"2026-04-20T14:34:30Z","role":"assistant","content":"...","meta":{"input_tokens":412,"output_tokens":188,"provider":"stub"}}
{"ts":"2026-04-20T14:42:00Z","role":"system","content":"<history summary>","meta":{"summary_of_turns":"1-20","kind":"summary"}}
```

Rationale for JSONL over JSON:
- Append-only writes are crash-safe (partial writes produce at most one broken line, detectable and skippable).
- No in-memory mutation of the whole history on every turn.
- `tail -f` works for debugging.

### 5.4 `brief.md` shape

Template authored per variant in a separate session. This plan only guarantees:

- File is written once, atomically (write to `.brief.md.tmp` then `os.rename`).
- File is immutable after state=submitted; no further edits from the service.
- Filename is always exactly `brief.md` (no versioning).

---

## 6. Frontend (`/chat` page on static site)

### 6.1 Routing

- `/chat` is a standard Next.js App Router page in the existing forgingapps-website repo.
- Static export-friendly: no dynamic route param, everything reads from `window.location.search`.
- i18n: the page exists at `/en/chat` and `/bg/chat`. The email link points to the correct localized URL based on form locale.
- File: `app/[locale]/chat/page.tsx` + `app/[locale]/chat/ChatContent.tsx` (client component, mirrors the `ContactContent` pattern already used in the repo).

### 6.2 UI State Machine

```
INITIAL -> LOADING -> (OPEN | READY_TO_SUBMIT | SUBMITTED | ERROR | NOT_FOUND)
OPEN: user can send turns; assistant replies; sticky input box
READY_TO_SUBMIT: same as OPEN but a prominent "Submit my brief" button is rendered
SUBMITTED: read-only transcript + "thanks" confirmation; input removed
ERROR: transient API failure; banner with "try again"; auto-clears on successful turn
NOT_FOUND: invalid or expired session ID; CTA to return to contact page
```

State is managed via `useReducer` — per `CLAUDE.md` hard rule, no zustand/redux.

### 6.3 i18n Strings

All user-facing strings land in `lib/i18n/en.ts` and `lib/i18n/bg.ts` under a new `chat` namespace:

```ts
chat: {
  loading: "...",
  inputPlaceholder: "...",
  sendButton: "...",
  submitBriefButton: "...",
  submittedTitle: "...",
  submittedBody: "...",
  errorBanner: "...",
  rateLimitedBanner: "...",
  notFoundTitle: "...",
  notFoundBody: "...",
  assistantTyping: "..."
}
```

`npm run check-i18n` enforces parity (per existing tooling).

### 6.4 Error / Abuse UX

- Rate-limit hit: inline non-blocking toast "please wait a moment before sending again" — no session teardown.
- LLM error: banner with retry button; turn is not charged to state (stays in `open`).
- Network error: banner with retry button; local draft of the user's message preserved in component state.
- Submitted session re-opened: read-only transcript + success banner.

### 6.5 Mobile

- Responsive Tailwind layout; tested on iOS Safari + Android Chrome + common viewport widths.
- Keyboard auto-scroll: on send, scroll transcript to bottom.

---

## 7. Chat Backend Service (Hydra)

### 7.1 Service Layout

```
/opt/forgingapps/chat-intake/
|-- app/
|   |-- main.py                         # FastAPI app factory, middleware, CORS
|   |-- routes/
|   |   |-- sessions.py                 # GET /sessions/{sid}, POST /sessions/{sid}/turn, /submit
|   |   `-- admin.py                    # POST /admin/create-session (called from n8n)
|   |-- domain/
|   |   |-- state.py                    # session state machine
|   |   |-- storage.py                  # meta.json + jsonl I/O (flock protected)
|   |   `-- summarization.py            # history compaction after N turns
|   |-- llm/
|   |   |-- provider.py                 # LLMProvider ABC
|   |   |-- providers/
|   |   |   |-- stub.py                 # echo / canned responses for MVP
|   |   |   |-- anthropic.py            # placeholder, wired later
|   |   |   `-- openai_compatible.py    # placeholder, wired later
|   |   `-- factory.py                  # provider selection via env var
|   |-- prompts/
|   |   |-- variants/                   # per-variant system prompts (placeholders for now)
|   |   |   |-- ai-readiness.md
|   |   |   |-- anvil.md
|   |   |   `-- ...
|   |   `-- brief_templates/            # per-variant brief templates
|   |       `-- ...
|   |-- ratelimit.py                    # sqlite-backed rate limiter
|   `-- notify.py                       # POST to n8n /webhook/intake-complete
|-- tests/                              # pytest
|-- pyproject.toml
|-- .env.example
`-- README.md
```

### 7.2 API Endpoints

| Method | Path | Purpose | Auth |
|---|---|---|---|
| `POST` | `/admin/create-session` | n8n calls this after form submit; creates session dir + meta.json; returns session_id | Shared secret header `X-Admin-Token` |
| `GET` | `/sessions/{sid}` | Load session state + conversation history for the chat page | session_id in path (UUID is the bearer) |
| `POST` | `/sessions/{sid}/turn` | Send a user message, receive assistant reply | session_id in path + optional `X-Turn-Nonce` for idempotency |
| `POST` | `/sessions/{sid}/submit` | Finalize: generate brief, notify n8n | session_id in path |
| `GET` | `/healthz` | Liveness for monitoring | none |

**Response shape for `/turn`:**
```json
{
  "message": { "role": "assistant", "content": "..." },
  "state": "open",
  "ready_to_submit": false,
  "turn_count": 8
}
```

**Response shape for `/submit`:**
```json
{
  "state": "submitted",
  "brief_saved": true,
  "notified": true
}
```

### 7.3 `LLMProvider` Abstraction

```python
class LLMProvider(Protocol):
    async def complete(
        self,
        system_prompt: str,
        history: list[Message],
        max_output_tokens: int,
        metadata: dict,   # session_id, variant, locale - for logging/routing
    ) -> CompletionResult:
        """Return full response. Non-streaming."""
        ...

class CompletionResult:
    content: str
    input_tokens: int
    output_tokens: int
    finish_reason: Literal["stop", "length", "error"]
    provider_raw: dict  # for debugging; stored in jsonl meta
```

- MVP ships with `StubProvider` that returns canned responses based on a simple state counter — enough to verify the full flow end-to-end without LLM costs.
- Provider selection via env var `CHAT_LLM_PROVIDER=stub|anthropic|openai-compatible`.
- Per-variant system prompts are loaded from disk at service start into a dict, hot-reloadable via `SIGHUP` (phase 3 convenience).

### 7.4 Abuse / Cost Mitigations

All invisible unless genuinely abused:

- **Rate limit per session:** 1 turn per 2 seconds (configurable). Enforced at `/turn` handler. Response: 429 with Retry-After.
- **Global IP rate limit:** 30 requests/minute per IP across all sessions, enforced in middleware.
- **Max input tokens per turn:** user message capped at 2000 tokens; response rejected with "your message is too long" if exceeded.
- **Max output tokens per turn:** 1200 tokens cap on LLM output.
- **History summarization:** at turn 20, the backend replaces turns 1–15 with a single summary `system`-role message + keeps the last 5 turns verbatim. Summarization uses the same LLM provider with a compact summarization prompt. Tunable thresholds.
- **Session TTL:** no expiry for MVP. Phase 3 adds a cron that marks sessions idle-for-30-days as `archived` and excludes them from the live API (tar-gzipped and moved to `/opt/forgingapps/intakes/_archive/`).

### 7.5 Brief Generation Signal

The assistant needs to signal "I think we have everything" without this living purely in the LLM's free-text response. Three possible mechanisms:

1. **Structured tag in response** (recommended for MVP). Assistant instructions include: "when you believe you have enough, end your reply with a single line `<READY_TO_SUBMIT/>`." Backend detects the tag, strips it from the stored/rendered message, sets state to `ready_to_submit`. Works with any LLM. No tool-calling required.
2. **Tool call** (clean, but provider-dependent). Requires LLM providers that support function calling. Defer until we're committed to a provider with first-class tool use.
3. **Classifier pass** (expensive). A separate LLM call after each turn to classify "is the conversation ready." Rejected: cost and latency double.

**Chosen: option 1 (structured tag).** Works with every provider, trivial to parse, reversible if the assistant gets it wrong (the frontend shows the button but doesn't auto-submit — user still clicks).

### 7.6 Deployment

- Python 3.11 via venv at `/opt/forgingapps/chat-intake/venv/`.
- systemd unit: `forgingapps-chat.service` — runs `uvicorn app.main:app --host 127.0.0.1 --port 8010`.
- Caddy block:
  ```
  chat.forgingapps.com {
      encode gzip
      reverse_proxy 127.0.0.1:8010
      header {
          X-Content-Type-Options nosniff
          X-Frame-Options DENY
      }
  }
  ```
- Secrets (LLM API keys, `ADMIN_TOKEN`, Resend webhook URL) in `/etc/forgingapps/chat-intake.env` (mode 0600, owned by the service user).
- Logs: stdout -> journald, with a logrotate-friendly JSON log format.

---

## 8. n8n Pipeline Changes

### 8.1 Modify existing `YOj9m4Th3epVgW5q` ("Lead Ops — Contact Form Pipeline")

Insert two new nodes between **Normalize Data** and the Alert / Auto-Reply nodes:

1. **Generate session ID** (Code node):
   ```js
   const crypto = require('crypto');
   return { json: { ...$json, session_id: crypto.randomUUID() } };
   ```
2. **Create session in chat service** (HTTP Request node):
   - POST `https://chat.forgingapps.com/admin/create-session`
   - Header: `X-Admin-Token: {{ $env.CHAT_INTAKE_ADMIN_TOKEN }}`
   - Body: `{ session_id, variant: $json.product_tag, locale: $json.locale, form_data: $json }`
   - On failure: log and continue (the lead still gets through; email just won't have a chat URL). Surface via a secondary alert.

Then modify:

- **Auto-Reply** node template — add the chat URL (bilingual: the template already renders based on locale, add the chat-URL block accordingly).
- **Alert email** to `hello@forgingapps.com` — include the session_id in the subject and a direct link to the brief path on Hydra (pre-rendered; populated after completion).

### 8.2 New `intake-complete` workflow

Trigger: Webhook node at `/webhook/intake-complete`. Payload:

```json
{
  "session_id": "...",
  "variant": "ai-readiness",
  "locale": "bg",
  "completed_at": "...",
  "brief_path": "/opt/forgingapps/intakes/2026-04-20/{sid}/brief.md",
  "brief_md": "<inline brief contents>",
  "turn_count": 14,
  "submitter_email": "ivan@example.com"
}
```

Actions:
1. Send alert email to `hello@forgingapps.com` via Resend with a summary + the brief content inlined.
2. Return 200 JSON.

Decision: **chat service includes `brief_md` field inline in the webhook payload** — one less moving piece, one less endpoint to authenticate, n8n doesn't need Hydra filesystem access.

---

## 9. Notifications

- **Primary:** Resend email to `hello@forgingapps.com` from the new n8n workflow, triggered on session completion.
- **Subject line convention:** `[Intake complete] {variant} — {submitter_name}` (keeps Ivaylo's inbox greppable).
- **Body includes:**
  - Summary line (name, email, variant, locale)
  - Link to the brief file path on Hydra
  - Inline preview of brief.md (first ~40 lines)
  - Session ID for lookup
- **Secondary (phase 3):** optional Telegram or email-to-self ping if Ivaylo wants more immediate notification. Not MVP.

---

## 10. Security Posture

| Surface | Threat | Mitigation |
|---|---|---|
| Session ID as bearer in URL | Link forwarding = shared access | Accepted. No sensitive auth-gated data is behind the link; worst case a colleague fills the brief. |
| Public `/sessions/{sid}/turn` endpoint | LLM cost abuse via replay | Per-session rate limit, per-IP global rate limit, max-tokens-per-turn, summarization. |
| `POST /admin/create-session` | Unauthenticated session creation | Shared-secret `X-Admin-Token` header, rotated via `/etc/forgingapps/chat-intake.env`. |
| CORS | Unintended origins calling the API | Explicit allowlist in FastAPI: `https://forgingapps.com`, `https://www.forgingapps.com`, `http://localhost:3000` (dev only, dev builds). |
| Secrets | Leaked LLM/Resend keys | `.env` mode 0600, not in git, rotated on compromise. |
| `brief.md` content | Sensitive client project info on disk | Directory mode 0750, owned by service user, group-readable by `alpharius`. Not world-readable. No public endpoint serves brief content after completion. |
| Session storage DoS | Attacker fills disk by spamming form | n8n can add a simple per-IP rate limit on the form webhook as phase-3 hardening. MVP risk is low since Formspree/Resend abuse tracking is upstream. |

---

## 11. Implementation Roadmap

Phased delivery. Each phase is independently shippable and leaves the site in a working state. **Phases 1–3 form the MVP as defined above.**

### Phase 0 — Pre-work (dependencies)

**Owner:** Ivaylo + separate sessions. **Blocker for phase 2.**

- Author per-variant assistant system prompts (separate session).
- Author per-variant `brief.md` templates (separate session).
- Choose initial LLM provider + budget (separate decision).
- Register DNS: `chat.forgingapps.com` A/AAAA to Hydra's public IP (Cloudflare).

Timeline: independent; can happen in parallel with phase 1.

### Phase 1 — Platform scaffold + stub provider

**Owner:** dev (delegation via forger). **Goal:** end-to-end flow works with echo responses — no real LLM yet.

- Scaffold FastAPI service at `/opt/forgingapps/chat-intake/`, pyproject, Ruff, pytest.
- Implement `LLMProvider` interface + `StubProvider` that returns pre-canned responses based on turn count.
- Implement session storage (meta.json, jsonl, flock-protected writes, atomic brief.md rename).
- Implement `/admin/create-session`, `/sessions/{sid}`, `/sessions/{sid}/turn`, `/sessions/{sid}/submit`, `/healthz`.
- Rate limiter (sqlite-backed, shared across workers).
- systemd unit, Caddy block, env file, TLS via Caddy's ACME.
- Modify n8n workflow: generate session_id, call `/admin/create-session`, embed chat URL in auto-reply email.
- Create new n8n workflow `/webhook/intake-complete`, wired to chat service's submit handler.
- Add `/chat` page to forgingapps-website: state machine, i18n strings, mobile-responsive layout.
- Update `projects/forgingapps-website.md` wiki with new chat funnel section + fix stale Formspree mention.
- Create new wiki page `services/chat-intake.md`.

**Exit criteria:** A form submission produces an email with a chat URL; clicking it renders the chat UI; a conversation with stub replies can be completed end-to-end; brief.md is written; n8n sends alert email. Forgingapps test harness is green.

Estimated: 4–6 working days for dev.

### Phase 2 — Wire real LLM provider + variant prompts

**Depends on phase 0 completion.**

- Implement concrete `LLMProvider` for the chosen provider (Anthropic SDK, OpenAI-compatible, or internal Legion gateway).
- Drop variant system prompts and brief templates into `app/prompts/`.
- End-to-end test with one real variant (recommend: `ai-readiness`).
- Per-variant test: full chat happy path for each active variant.
- Tune max-tokens-per-turn and summarization thresholds based on observed cost.

**Exit criteria:** Real conversations produce real briefs across all active variants in both locales.

Estimated: 2–3 working days once phase 0 is ready.

### Phase 3 — Polish & hardening

- History summarization logic (turn 20 compaction).
- 30-day idle auto-archive cron.
- Observability: structured JSON logs, basic Grafana/Loki dashboard or even just `jq`-friendly grep scripts.
- Cost dashboard: sum `input_total + output_total` across `meta.json` files by day.
- i18n review pass (BG polish by native speaker).
- Forgingapps test harness: new UI verification plans for `/chat` page + happy-path intake simulation.
- Incident playbook: what to do if chat service is down (answer: form still works, chat URL in email returns friendly "temporarily unavailable" page).

Estimated: 2–3 working days.

### Phase 4 — Optional internal admin view

Only if phase 3 operations reveal SSH-only access is actually painful.

- Minimal auth (HTTP basic or a simple session cookie) on an `/admin` path.
- Index view: list of sessions, filterable by state, variant, date.
- Detail view: render conversation + brief preview.
- Read-only only. No editing.

Parked. Not MVP.

---

## 12. Tech Stack Scoring

| Component | Choice | Score | Rationale |
|---|---|---|---|
| Chat backend language | Python 3.11 + FastAPI | **92/100** | Matches existing Legion Python idiom, FastAPI's async + pydantic fits non-streaming HTTP chat, ops scripts are already Python. |
| LLM SDK (later) | Provider-agnostic ABC + per-provider adapters | **90/100** | Matches the openclaw/hermes model system pattern. Keeps chat service loosely coupled to provider choice. |
| Storage | Flat JSONL + JSON files on disk | **80/100** | No database to operate. Perfectly adequate at expected scale (dozens/hundreds of sessions/month). If volume grows past 10k active sessions, migrate to SQLite or Postgres — trivial. |
| Reverse proxy | Caddy | **88/100** | Already in use elsewhere in Ivaylo's setup, auto-TLS, simpler config than nginx for this case. |
| Rate limit | SQLite-backed (`slowapi` or custom) | **78/100** | Simple, survives restarts, no Redis to operate. Single-node only; if horizontally scaled later, swap to Redis. |
| n8n integration | Two HTTP calls + webhook | **85/100** | Reuses existing infra, no new control plane. |
| Frontend routing | Static Next.js page reading query string | **88/100** | Works with `output: 'export'`, no build-time ID knowledge needed, simpler than dynamic routes + `generateStaticParams`. |
| State mgmt (frontend) | `useReducer` | **95/100** | Repo convention, zero deps. |
| Auth | UUID-as-bearer | **72/100** | Adequate for non-sensitive intake. If ever used for anything auth-gated, upgrade. |
| Observability | journald + per-session meta.json | **70/100** | Good enough for MVP. Structured logging added in phase 3. |

---

## 13. Open Questions / Deferred Decisions

Parking these for later sessions:

1. **LLM provider choice.** Ivaylo will wire later. Stub in Phase 1 keeps the platform honest.
2. **Per-variant assistant system prompts.** Authored in a separate session.
3. **Per-variant brief templates.** Same — separate session.
4. **Admin UI in phase 4:** build it or don't? Depends on real-world pain of SSH-only.
5. **Session archival: delete or cold-store?** Default: gzip + move to `_archive/` after 30 days idle. Never delete (intake data may be useful historical context).
6. **Bot abuse on form submission itself.** Out of scope for this plan, but worth revisiting if form spam becomes a problem (Turnstile / hCaptcha).
7. **Captcha on chat URL activation.** If a bot can submit the form, it can receive a chat URL. Current abuse posture relies on rate limits; revisit if real-world data shows abuse patterns.
8. **Telegram/Slack ping** — deferred to phase 3+.
9. **Duplicate form submissions from the same email?** Each creates a new session. Upstream form already doesn't dedupe. Acceptable for now.

---

## 14. Success Criteria

MVP is complete when:

1. Submitting the contact form on `/en/contact?product=ai-readiness` produces an email with a working chat URL within 10 seconds.
2. Clicking the link opens a functional chat UI in the submitter's browser, in the correct locale.
3. A 10-turn conversation with the stub provider completes; the assistant's `<READY_TO_SUBMIT/>` signal activates the button; clicking it produces a `brief.md` on Hydra.
4. An alert email lands in `hello@forgingapps.com` with the brief contents.
5. Returning to the same chat URL after closing the browser resumes the conversation.
6. Rate-limit and max-tokens-per-turn actually fire when tested with a script.
7. Forgingapps test harness is still 72/0/283 green, plus new chat-page smoke tests pass.
8. Wiki pages `services/chat-intake.md` and updated `projects/forgingapps-website.md` reflect reality.

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| LLM provider costs exceed comfort zone | Medium | Medium | Summarization + max-tokens-per-turn + rate limit. Ivaylo monitors `meta.json` token totals. |
| A spam bot abuses the chat URL at scale | Low–Medium | Medium | Rate limits, max-tokens, and upstream form has its own spam posture. Layer in Turnstile if needed. |
| n8n -> chat-service call fails, lead loses chat URL | Low | Low–Medium | Design: form still succeeds, email goes out without the chat URL, alert email still lands. Degraded but not broken. |
| Chat service crashes mid-conversation | Low | Low | JSONL append-only storage means nothing is lost. Session resumes after systemd restarts. |
| Session ID guessed / brute-forced | Negligible | Low | UUIDv4 = 122 bits. Brute force is not a real threat at our volume. |
| LLM returns malformed brief on submit | Medium | Medium | Retry once with stricter prompt; if still malformed, save raw output as `brief.md` with a marker comment + alert Ivaylo that it needs manual cleanup. |
| Cloudflare Pages build breaks due to new `/chat` page | Low | Medium | Forgingapps test harness + `npm run check-i18n` + build step in GitHub Actions catches this pre-deploy. |
| User submits form in BG but asks the assistant in EN mid-chat | Medium | Low | System prompt instructs assistant to gracefully switch language. No code change needed. |
| Variant not yet prompt-authored when someone submits that variant | Medium (Phase 1) | Medium | Fallback: generic intake system prompt for any variant without a dedicated file. Log to alert Ivaylo to author the missing variant. |

---

## Appendix A — Wiki Pages to Create / Update

- **New:** `/opt/alpharius/wiki/services/chat-intake.md` — this service, endpoints, ops runbook.
- **New:** `/opt/alpharius/wiki/projects/forgingapps-intake-chat-flow.md` — this plan, living.
- **Update:** `/opt/alpharius/wiki/projects/forgingapps-website.md` — add chat funnel section, fix stale Formspree mention.
- **Update:** `/opt/alpharius/wiki/services/n8n-lead-ops.md` — document new workflow + modifications to existing.
- **Update:** `/opt/alpharius/wiki/infrastructure/n8n.md` — add `intake-complete` workflow to the table.
- **Log:** two `log-append.sh` entries — one for plan creation, one per phase completion.

## Appendix B — Delegation Plan

Per `CLAUDE.md` routing rules:

- **dev** owns: FastAPI service, frontend `/chat` page, tests, systemd/Caddy config.
- **forger** owns: n8n workflow modifications, email template copy (bilingual), wiki content updates.
- **prime** owns: verification against live site, cross-checking tests, wiki structure review, final sign-off.
- **Ivaylo** owns: assistant system prompts, brief templates, LLM provider choice, deployment approval.
