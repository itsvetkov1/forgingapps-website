# Dev Handoff — Chat Intake Platform

**Owner:** dev (code-truth tasks per CLAUDE.md delegation rules)
**Requested by:** prime
**Prereq artifacts:**
- `/opt/forgingapps/chat-intake/prompts/` — 24 markdown files (deployed 2026-04-20, sha256-verified)
- `/opt/forgingapps/chat-intake/PLAN.md` — platform implementation plan (pushed 2026-04-20, sha256 decda496...50e70)
- Design (committed to author repo, to be mirrored to Hydra): `docs/design/post-contact-chat.html` (V2 "Split" variation only — V1/V3 are archived) + `docs/design/IMPLEMENTATION_PROMPT.md`. Design is the visual + component contract for the user-facing page.
- **Reference wiki page:** [[chat-intake-llm-layer]]

**Heads-up:** `docs/design/IMPLEMENTATION_PROMPT.md` was authored before the backend plan existed. Where it conflicts with this HANDOFF — backend plan wins. Specific overrides called out below.

---

## Decisions locked in (2026-04-20, by Ivaylo)

1. **Coexistence with Ember Chat.** Ember Chat stays on the main site as the general-support widget — unchanged. The new chat-intake is a **separate assistant** (called "Cinder") for the post-contact-form intake flow. No migration of Ember Chat; both systems coexist.

2. **URL split.** Two origins, two responsibilities:
   - **User-facing page:** `forgingapps.com/[locale]/brief-received` — rendered by the main ForgingApps Next.js site (preserves `output: 'export'`).
   - **API / conversational backend:** `chat.forgingapps.com/intake/*` — FastAPI on Hydra.
   - Frontend calls the backend cross-origin. Backend CORS must allow `https://forgingapps.com` (and staging origins if in use).
   - **Cloudflare Tunnel path-split** (first infra task): `/intake*` on `chat.forgingapps.com` → new FastAPI service; catch-all stays on Ember's WebSocket.

3. **LLM providers — Legion models only, no Claude.**
   - **Primary:** `openai-codex/gpt-5.4` (via ChatGPT backend API at `https://chatgpt.com/backend-api`)
   - **Fallback:** `minimax/MiniMax-M2.7`
   - **No Claude models anywhere in this pipeline.** `IMPLEMENTATION_PROMPT.md` mentions `claude-sonnet-4-5` — **disregard that line**. The design spec was written before the model lock; nothing visual depends on model choice.

4. **Flow intent — concierge-surface, extraction-underneath (Option B).**
   - Outward persona is "Cinder," a concierge. The user sees a polished Q&A chat per the design.
   - Under the hood, the existing 24-prompt intake system runs: style-guide + variant-specific extraction + brief-gen pipeline. Variant routing is invisible to the user.
   - `<MINIMUM_REACHED/>` and `<READY_TO_SUBMIT/>` tags are **silently stripped from user-visible content**. `<MINIMUM_REACHED/>` triggers a UI affordance (submit button — see decision 5). `<READY_TO_SUBMIT/>` triggers brief-gen + email.

5. **Submit-button UX (new; replaces design's implicit flow).**
   - The design as drawn has no submit button (chat just chats). We add one because the extraction flow needs a close-signal.
   - Button is **rendered by dev**, styled to match the existing design tokens (forge-ember palette, same radius + shadow family as the composer send button, larger and prominent — placement: inline CTA below the last assistant message, or sticky footer above the composer; dev's call per visual sensibility).
   - **Appears only after backend emits a `minimum_met` state** (i.e. when an assistant turn contains `<MINIMUM_REACHED/>`). Backend exposes this via either SSE stream or a `state` field on each turn response.
   - On click: POST `/intake/session/{sid}/submit` — triggers PII pass + brief enrichment + email send. Show inline "Thanks — Ivaylo has your full brief, he'll be in touch within a week" message. Keep composer disabled after submit.

6. **PII redaction via dedicated LLM pass.** Not regex; not passthrough. A separate LLM call scrubs transcript turns before brief-gen. Cadence (per-turn pre-write vs. batch pre-brief-gen) is dev's call — batch is cheaper and still protects the durable artifact (the brief), which is the exposure surface that matters.

7. **Brief delivery — HTML email + DB-backed admin view.**
   - Markdown brief → HTML render → email body to `hello@forgingapps.com` (primary delivery).
   - Brief row also lands in the `briefs` DB table; chat turns land in `chat_messages`. Powers Ivaylo's admin transcript reader (internal-only, separate task).
   - Email: ForgingApps branding, frontmatter rendered as visible metadata block at top, mobile-friendly CSS. Python `markdown` or `markdown2` lib; render step can live in the Python backend (cleaner) or as an n8n function node.

8. **Removed from design (disregard in IMPLEMENTATION_PROMPT.md):**
   - 3-tab toolbar (`ChatToolbar.tsx` with "Chat with Cinder" / "Book a time" / "Read first") — **do not build**. Right panel is just ChatSurface + BriefContextStrip.
   - Cal.com integration — skip.
   - `/[locale]/how-we-work` stub — skip.

9. **PLAN.md and HANDOFF.md canonical on Hydra** at `/opt/forgingapps/chat-intake/`.

---

## Goal

Ship the post-contact intake at `forgingapps.com/[locale]/brief-received` (design locked) backed by the Cinder concierge assistant at `chat.forgingapps.com/intake/*`. Per session, produce a founder-facing brief: HTML-rendered email to `hello@forgingapps.com` that makes the first discovery call productive from minute one, plus a DB record for the admin transcript view.

The LLM-layer content is done. This task is runtime + frontend + wiring.

---

## System boundary — what's done

- 24 markdown prompt files at `/opt/forgingapps/chat-intake/prompts/` — read-only. Do not edit; if gaps surface, log and kick back to prime/forger.
- Brand voice, edge-case handling, flag taxonomy, variant routing, brief schema — all encoded in the prompts.
- Design (V2 Split variation) — visual + component contract. Don't invent new copy, colors, or layouts.
- Existing Ember Chat runtime at `ember-openclaw-gateway-1` — unchanged.
- Contact form already routes through n8n webhook (commit `5d97105`). Per-product intake forms already capture variant-specific fields (commit `bd35466`); they feed `variant_preselect`.

## System boundary — what this task owns

### Frontend (main ForgingApps Next.js site, `~/projects/forgingapps-website` on Hydra)

1. **Route:** `/[locale]/brief-received?id={briefId}` (match existing `app/[locale]/...` pattern).
   - Static-export-compatible. Loads brief data by `briefId` via client-side fetch to the backend API (no server actions, no `app/api/*` route on the main site).
   - 404 / error state if `briefId` is missing or doesn't belong to the current session.
   - Localize all copy — i18n keys in `lib/i18n/{en,bg}.ts` under a new `briefReceived:` namespace.

2. **Components** under `components/brief-received/`:
   ```
   components/brief-received/
   ├─ BriefReceivedPage.tsx        # outer grid, 520px dark left + 1fr right
   ├─ LeftPanel.tsx                # logo + greeting + "What happens next" + footer note
   │  ├─ Greeting.tsx              # "Thanks, {firstName} — we've got your brief."
   │  ├─ WhatHappensNext.tsx       # 4-step ordered list, step 1 active
   │  └─ PanelFootNote.tsx
   ├─ RightPanel.tsx               # chat + context strip (no toolbar — 3 tabs removed)
   │  ├─ CinderChat.tsx            # thin wrapper around ChatSurface
   │  └─ BriefContextStrip.tsx     # 3 read-only cards: Project / Interest / Launch
   ```

3. **Chat components** under `components/chat/`:
   ```
   components/chat/
   ├─ ChatSurface.tsx              # header + messages + composer + SubmitCTA
   ├─ ChatHeader.tsx               # flame avatar + "Cinder" + subtitle
   ├─ MessageList.tsx              # role="log", aria-live="polite"
   ├─ Message.tsx                  # renderRichText for **bold**, [link](href), • bullets
   ├─ TypingDots.tsx               # 3-dot animation, SR label "Cinder is typing"
   ├─ StarterPrompts.tsx           # 4 buttons, visible when messages.length <= 1
   ├─ Composer.tsx                 # auto-growing textarea (max 140px)
   └─ SubmitCTA.tsx                # NEW — submit-brief button. Hidden until minimum_met.
   ```

4. **Design tokens** — add to `tailwind.config.js` or `app/globals.css` `:root`:
   - `--forge-ember: #D8660B`
   - `--forge-ember-soft: #E8852F`
   - `--forge-gold: #C4A062`
   - `--forge-dark: #0F1419`
   - `--dark-panel: #141A22`
   - `--dark-hairline: rgba(196, 160, 98, 0.12)`
   - `--dark-ink-100: #E8E6E1`
   - `--dark-ink-300: #A8A39B`
   - `--dark-ink-500: #6B6963`

   Typography already in project: Cinzel (display), Inter (body), JetBrains Mono (meta). Use `next/font`.

   Port design styles from the prototype's inline style objects to Tailwind utilities + CSS variables. Do NOT ship inline style objects the way the prototype does.

5. **Contact form update.** Contact form currently POSTs to n8n. Update the response handling so after a 200 response, `router.push('/[locale]/brief-received?id=<briefId>')` using the `brief_id` returned by n8n.

### Backend (FastAPI on Hydra at `chat.forgingapps.com/intake/*`)

6. **FastAPI service** for Cinder. Endpoints:
   - `POST /intake/session` — start session (usually called by n8n on form submit, not directly by frontend).
   - `POST /intake/session/{sid}/turn` — user sends a message, assistant streams or returns a reply. Response exposes `state` (`open` | `minimum_met` | `ready_to_submit` | `submitted`).
   - `POST /intake/session/{sid}/submit` — user clicks SubmitCTA. Triggers PII pass → brief-gen → email.
   - `GET /intake/session/{sid}/state` — debug/admin.
   - `GET /intake/brief/{brief_id}` — returns brief + session metadata for the frontend page bootstrap (called client-side from /brief-received).
   - **CORS:** allow `https://forgingapps.com` (and staging origins). Preflight must handle OPTIONS cleanly for streaming and non-streaming responses.

7. **Session storage — hybrid.**
   - **Filesystem (durable session artifacts):** `/opt/forgingapps/intakes/{sid}/` — layout unchanged:
     ```
     form_data.json            # seeded by n8n on form submit
     conversation.jsonl        # raw turn log
     conversation_redacted.jsonl  # post-PII-pass
     state.json                # state machine, flags, variant, turn count
     summary_N.md              # compaction artifacts
     brief.md                  # post-submit markdown brief
     brief.html                # HTML-rendered brief for email
     ```
   - **DB (queryable surface for admin view and brief_id lookup):** SQLite at `/opt/forgingapps/db/briefs.db` is fine for current scale; upgrade to Postgres later if admin view grows. Tables:
     ```
     briefs(id TEXT PK, sid TEXT, first_name TEXT, email TEXT, project TEXT, interest TEXT, launch TEXT, variant TEXT, locale TEXT, created_at TIMESTAMP, submitted_at TIMESTAMP NULL, flags JSON, completion_level TEXT)
     chat_messages(id INTEGER PK, brief_id TEXT FK, role TEXT, content TEXT, created_at TIMESTAMP)
     ```
   - `briefs.id` is the user-facing brief ID (e.g. `FA-2604-089`). `briefs.sid` is the session UUID linking to `/opt/forgingapps/intakes/{sid}/`.

8. **Prompt assembly per turn:**
   ```
   [cinder_persona.md] + [style-guide.md] + [system/{variant}.md]
     + [locale_switch.md if switch detected]
     + [prior turns or summary + recent N verbatim]
   ```
   `cinder_persona.md` is a NEW wrapper prompt — **to be authored by prime/forger before go-live**, deployed to `/opt/forgingapps/chat-intake/prompts/cinder_persona.md`. Dev wires the loader, not the content.

9. **Tag parser.** Strips `<MINIMUM_REACHED/>` and `<READY_TO_SUBMIT/>` from user-visible content. Triggers state transitions idempotently. Tolerant to unrecognized `<TAG/>` patterns — strip them too (non-Claude models may over-produce angle-bracket markup).

10. **Flag extractor.** Format TBD — prime suggests `<FLAGS>["flag1","flag2"]</FLAGS>` sentinel or JSON in HTML-comment. Parser appends flag set to session state and mirrors to `briefs.flags`.

11. **Summarization trigger.** At turn 15 or when input-token budget threshold hit. Calls `summarization.md`, persists output to `summary_N.md`, uses summary + most-recent 3–5 turns verbatim on subsequent turns.

12. **Locale-switch detection.** 2-turn rolling window per `locale_switch.md` §1. On flip, inject `locale_switch.md` as appendix for next assistant turn(s).

13. **PII redaction (LLM pass).** gpt-5.4 or MiniMax — whichever is cheaper at the redaction task. Preserves name/email/company from form_data; strips card numbers, SSN-likes, passwords, API keys, extra PII. Cadence is dev's call.

14. **Brief generation.** Post-`<READY_TO_SUBMIT/>` or submit-button click, separate LLM call using `brief_generation.md` + routed variant's `brief_templates/{variant}.md` + redacted transcript + form_data. Output written to `brief.md` and mirrored to `briefs` row.

15. **Brief HTML render.** Markdown → HTML with ForgingApps branding. Stored at `brief.html`. Frontmatter rendered as visible metadata block at top of email body.

### n8n workflow edit (extension of commit `5d97105`)

16. On contact form submit (existing webhook):
    - (a) Create a `briefs` row with form fields → returns `briefs.id` (e.g. `FA-2604-089`) and a generated `sid` (UUID v4).
    - (b) Create `/opt/forgingapps/intakes/{sid}/` with `form_data.json` seeded (name, email, locale, project, interest, launch, variant_preselect if per-product form).
    - (c) Return `{brief_id, status: "created"}` to the frontend so it can redirect to `/brief-received?id={brief_id}`.
    - (d) Separate: on brief-gen complete (n8n listens for webhook from FastAPI, or watches `brief.html` via filesystem trigger — dev's call), send HTML email to `hello@forgingapps.com`. Optional Slack notification as secondary channel (not required).

---

## Scripted opening message (server-rendered, no LLM call)

Message 1 is templated for consistency — matches the design's welcome and removes model variance from the first impression. Localize:

**EN:**
```
Hey {firstName}. Your brief on a {project.toLowerCase()} just landed in Ivaylo's queue — he'll reply within a week.

While you're here, I have the full context. Want to firm up **scope**, **timeline**, or next steps? I can give you the honest answer.
```

**BG** (to be authored by forger — don't literal-translate):
```
(draft needed — concierge tone, formal "Вие", no "EUR", matches voice of existing site)
```

**Note:** removed "price" from the EN opening since Cinder must not commit to specific prices outside published ranges (per design hard rules). "scope, timeline, or next steps" is safer.

## Starter prompts (visible when messages.length <= 1)

**EN** (from design, used verbatim):
- Walk me through what happens next
- How do you scope a project?
- What does payment look like?
- Can I see more of your work?

**BG** — new content, authored by forger. Concierge tone, formal "Вие".

Click sends exact text as a user message.

---

## Data model (frontend)

Brief data fetched client-side from `GET /intake/brief/{brief_id}`:

```ts
type Brief = {
  id: string;                    // "FA-2604-089"
  firstName: string;
  email: string;
  project: string;               // "Custom booking platform + admin dashboard"
  interest: string;              // "The Anvil — Custom app"
  launch: string;                // "Early Q3 2026"
  createdAt: string;             // ISO 8601
  locale: "en" | "bg";
  sid: string;                   // session UUID, used for subsequent /turn and /submit calls
};
```

**Do NOT display budget.** Not collected at this surface.

**"What happens next" list — static content, don't load from DB:**

1. **Founder reads your brief** · _Within a week_ · state: active
2. **Scoping call · 30 min** · _Within a week, on Google Meet_ · pending
3. **Written proposal** · _Scope · price · timeline · team_ · pending
4. **Kickoff** · _Once the proposal is accepted_ · pending

Localize step labels and descriptions.

---

## Variants and routing

Ten variants, default `generic` auto-routes in phase 1 then swaps to the routed variant:

```
spark  ember  anvil  forge  oracle
ai-readiness  ai-chat-assistant
discovery-workshop  hearthstone  generic
```

Form data may include `variant_preselect` (from per-product intake forms, commit `bd35466`) to skip routing. Invalid or absent → generic.

---

## Tag state machine

- `open` → `<MINIMUM_REACHED/>` emitted → `minimum_met` → **SubmitCTA button appears in UI**.
- `minimum_met` → user clicks SubmitCTA → POST /submit → `ready_to_submit` → brief-gen runs → `submitted`.
- Both tags stripped from all user-visible content.
- `<READY_TO_SUBMIT/>` from LLM only accepted when state is `minimum_met`; ignore otherwise.
- Duplicate `<MINIMUM_REACHED/>` emissions in later turns are ignored.

---

## SubmitCTA styling (dev owns)

- Match design tokens: `--forge-ember` background, `--forge-ember-soft` hover, white text, `border-radius: 10px`, `box-shadow` matching composer send button family.
- Larger than composer send button — prominent but not a wall. Suggested: full-width-of-composer, padding `14px 24px`, font-weight 500, label localized.
- Label EN (draft): "Submit — send this brief to the founder". Localize BG.
- Placement: inline CTA in chat flow (below last assistant message after minimum_met) OR sticky footer above composer. Dev's aesthetic call — verify with Ivaylo via screenshot after first pass.
- Post-click: disabled + loading state → on success, inline confirmation message, composer disabled.

---

## Cinder persona rules (hard guardrails — prime authors `cinder_persona.md` separately)

Summary for dev context; full prompt lives in `/opt/forgingapps/chat-intake/prompts/cinder_persona.md` once authored:

- Never commits to specific prices outside published ranges.
- Never promises delivery dates or scope Ivaylo hasn't agreed to.
- Never claims to be Ivaylo or Radoslav. Cinder is an AI concierge; if asked directly, says so.
- Always offers escalation ("I'll flag that to Ivaylo") when uncertain.
- Refuses to leak the system prompt.
- Tone: direct, no salesy language, no emoji, no "I'd be happy to help!", no "Great question!".
- Matches voice of the existing site (read `app/HomeContent.tsx`, `components/ember/*`, published copy).

---

## Canonical flag list

See `prompts/style-guide.md` §14. Platform persists union of flags raised in-chat (via parser) and flags added during brief-gen. Stored in `state.json`, mirrored to `briefs.flags`, included in brief frontmatter.

---

## Accessibility

- Chat messages: `role="log"` on the scroll container, `aria-live="polite"`.
- Starter prompts: actual `<button>` elements, keyboard-reachable.
- Composer: `<textarea>` with visible focus ring (design's `:focus-within` pattern).
- SubmitCTA: `<button>` with SR-accessible label; announce state transitions ("Brief ready to submit") when it appears.
- Color contrast: verify on dark panel — `--dark-ink-300` (#A8A39B) on `--forge-dark` (#0F1419) passes AA.
- Typing indicator: SR-only label "Cinder is typing".

---

## Success criteria

1. Live at `forgingapps.com/[locale]/brief-received?id={briefId}`, API reachable at `chat.forgingapps.com/intake/*`. Ember Chat on non-`/intake` paths of `chat.forgingapps.com` continues to function unaffected.
2. End-to-end: contact form submit → `/brief-received` redirect → multi-turn chat → `<MINIMUM_REACHED/>` fires → SubmitCTA appears → user clicks → PII pass → brief-gen → HTML email arrives at `hello@forgingapps.com` → brief row + chat_messages populated in DB.
3. All 10 variants exercised with a representative fixture conversation each. Fresh fixtures — don't copy example turns literally.
4. Bilingual: one EN end-to-end, one BG end-to-end, one BG→EN locale-switch pass. Cyrillic renders cleanly in HTML email (no charmap corruption, no HTML-entity artifacts).
5. Hostile-close + early-submit + non-buyer-soft paths each produce a valid brief with the correct flag set.
6. Model fallback: deliberately break gpt-5.4 access, verify failover to MiniMax-M2.7 works end-to-end.
7. Regression: pytest harness at `/opt/alpharius/testing/forgingapps/harness/` stays green. New intake is subdomain/sub-path; shouldn't affect main site tests — verify anyway.
8. Frontend accessibility: keyboard-only flow (Tab reaches composer, Enter sends, Shift+Enter newline, Tab reaches SubmitCTA when visible, Enter submits). Screen reader announces typing + state changes.
9. Mobile breakpoint < 840px: left panel stacks above right panel, chat is full-width.
10. Rate limiting in place (dev picks specific numbers — suggest 20 user messages per sid per hour, 100 per day). Graceful 429 with in-chat error message.

---

## Risks and notes

- **Prompt adherence on non-Claude models.** Prompts authored in Claude-context; gpt-5.4 and MiniMax may handle tag emission + BG formal-"Вие" differently. Small eval harness (5–10 reference conversations) against both models before go-live.
- **Cinder persona tuning.** Dual-mode prompt (friendly concierge + still extracts) is harder than either extreme. If tuning can't hit both, fall back to concierge-only and ask prime/forger to resimplify the extraction prompts.
- **Tag emission collisions.** Parser tolerant — strip any `<TAG/>` it doesn't recognize.
- **BG UTF-8 end-to-end.** FastAPI/Cloudflare/n8n → HTML email must be UTF-8 clean. Test with Bulgarian conversation and verify the email body renders Cyrillic correctly.
- **Cloudflare tunnel reconfig is mandatory, not optional.** Ember's current tunnel has no path filter; splitting `chat.forgingapps.com` by path requires adding an ingress rule ahead of the catch-all. Misconfiguration takes down Ember Chat (P0 regression). Smoke-test Ember after reconfig before FastAPI go-live.
- **CORS on cross-origin calls.** Frontend on `forgingapps.com` calling API on `chat.forgingapps.com` requires backend CORS allow-list + proper preflight handling. Test with both streaming and non-streaming responses.
- **Static export compatibility.** Main site is `output: 'export'`. The `/brief-received` page must work under static export — no server actions, no middleware, no `app/api/*` routes on the main site. Brief data loads client-side via fetch to backend.
- **REPLY_MAP reference answers.** `IMPLEMENTATION_PROMPT.md` references a REPLY_MAP in `chat-engine.jsx` with 8 canned response topics. These chunks are external to `post-contact-chat.html`; Ivaylo to extract for `cinder_persona.md` authoring, or prime/forger author reference answers from scratch matching ForgingApps voice.

---

## Non-goals

- Editing prompts — if gap found, log and kick back to prime/forger.
- Business-side intent (variant priorities, package naming) — forger's call.
- Pricing, quotes, SOWs — not this task.
- Migrating Ember Chat — explicitly out of scope.
- **3-tab toolbar** (Chat with Cinder / Book a time / Read first) — removed per decision 8. Right panel is just ChatSurface + BriefContextStrip.
- **Cal.com integration** — removed per decision 8.
- **`/[locale]/how-we-work` stub** — removed per decision 8.
- **"Assigned to you" founder card** — removed intentionally by design.
- **Export transcript link** (customer-facing) — internal-only feature on Ivaylo's admin view.
- **Budget display** anywhere on this surface.
- **Queue position** ("you're 2nd") — removed by design.
- **"End-to-end encryption" claim** — removed. Footer line reads "Private · forgingapps.com".

---

## Open items flagged for prime/forger (not blocking dev)

1. Author `cinder_persona.md` — deploy to `/opt/forgingapps/chat-intake/prompts/` before go-live. Includes REPLY_MAP reference answers paraphrased.
2. Author BG version of the scripted opening message.
3. Author BG version of the 4 starter prompts.
4. Extract REPLY_MAP content from `chat-engine.jsx` external bundle (Ivaylo's action) — or sign off on prime/forger writing reference answers from scratch.

---

## Status

Created: 2026-04-20
Design reconciled: 2026-04-20
Decisions locked: 2026-04-20
Last updated: 2026-04-20 (v4 — design-reconciled)
By: prime
Ready for dev pickup: **yes**, no open questions for dev. Four items flagged to prime/forger (above) — none block dev kicking off infra + scaffolding.
