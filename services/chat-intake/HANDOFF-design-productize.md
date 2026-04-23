# HANDOFF — Productize Cinder design at /intake/test

From: prime (Cowork-mode Claude)
To: dev
Priority: medium
Scope: frontend replacement of a throwaway prototype bundle

## Current state

- `https://chat.forgingapps.com/intake/test` now serves Kotio's design prototype as-is from `/opt/forgingapps/chat-intake/design/post-contact-chat.html` (FileResponse).
- The bare backend-testing skeleton moved to `/intake/_dev` (localhost only — public reverse proxy 404s `/_dev`; fine for our purposes).
- `POST /intake/message` is live and wired to gpt-5.4 via hermes codex OAuth, verified green (tokens round-tripping, en + bg locale).
- Route file: `/opt/forgingapps/chat-intake/app/routes/chat.py`.

## Two problems with the current prototype

### 1. Bundler TypeError on every load

On load you get a visible red banner at the bottom of the viewport:

```
[bundle] Uncaught TypeError: Cannot read properties of null (reading 'document')
(https://chat.forgingapps.com/intake/test:180)
```

Root cause: the file is a self-extracting Claude-artifact-style bundle. The bootstrap script (lines 1–175) runs, then calls `document.open()` to replace the current document with an unpacked template stored in `<script type="__bundler/template">` (line 177–179, 41k chars). The captured `__bundler_err` + `__bundler_loading` references become orphaned after doc replacement, and something downstream attempts a `.document` access on a null reference (most likely a stale iframe contentWindow or captured Document ref). The error is cosmetic — the React app renders and replies — but the banner is user-visible and looks broken.

Do NOT try to patch the bundle in place. It's obfuscated Claude-artifact output and any patch will be fragile.

### 2. Chat replies are mock, not LLM

The bundle ships with a hardcoded REPLY_MAP. Suggestion chips and typed messages both return pre-canned strings instantly — no network call to `/intake/message`. Only `fetch()` in the whole 1.7MB blob is the bundler loading its own JSX sources. This was flagged back in task #14 (reconcile Kotio's design with backend intake plan) and the resolution was always "productize the design". That's this handoff.

## What to build

Replace the bundle with a real integration. Two acceptable shapes — pick whichever fits better:

**Option A — static export page in the forgingapps-website repo**
- New route in `~/projects/forgingapps-website/` — likely `app/[locale]/intake/page.tsx` (and `app/[locale]/intake/[briefId]/page.tsx` if brief_id needs to be path-visible).
- Recreate the visual design as real React/Tailwind components from the repo's design system. Don't re-use Kotio's bundle CSS verbatim — integrate with the existing brand tokens in `lib/design-tokens.ts` (or equivalent). The prototype's look (warm dark right panel, serif headline left, suggestion chips, bottom brief metadata row) should be reproducible in ~6–10 components.
- Client component handles chat state. `POST` to `https://chat.forgingapps.com/intake/message` with the contract from chat.py:
  ```ts
  { session: { brief_id, firstName, topic, locale: 'en'|'bg', variant }, history: ChatTurn[], message: string, model: 'gpt-5.4' }
  // response: { reply: string, usage: {...} }
  ```
- Static export compatible (`output: 'export'`). No server actions, no middleware — per ForgingApps engineering defaults in CLAUDE.md.
- Deploy through the existing site pipeline. This is where the productized design should ultimately live.

**Option B — keep it under chat-intake, but with a real build**
- Convert `/opt/forgingapps/chat-intake/design/` into a proper Vite React app with its own build step producing static assets.
- FastAPI serves the built `index.html` + assets at `/intake/test` (use `StaticFiles` mount for assets).
- Same API contract.
- Lower integration surface but a second frontend to maintain.

My recommendation: **Option A.** Intake is part of the site story, the site repo already has the design system, and it keeps the surface area small.

Either way, the bundler TypeError goes away automatically (we stop using the self-extractor).

## Reference material

- Kotio's prototype (visual reference only): `/opt/forgingapps/chat-intake/design/post-contact-chat.html`
- Cinder voice + behavior: `/opt/forgingapps/chat-intake/prompts/cinder_persona.md`
- API contract: `/opt/forgingapps/chat-intake/app/routes/chat.py` (MessageRequest, SessionPayload)
- Project page: `/opt/alpharius/wiki/projects/chat-intake-llm-layer.md`
- Live endpoint to hit during dev: `POST https://chat.forgingapps.com/intake/message` (CORS may need allowlisting for `forgingapps.com` / `localhost:3000` — check before you start)

## Definition of done

1. Design renders clean with no visible error banners or console errors.
2. Typing in the input + pressing Enter (or clicking the send arrow) makes a real `POST /intake/message` call and renders the returned `reply` as a new Cinder turn.
3. `history` array grows turn-over-turn and is included in subsequent requests (multi-turn context works — we verified this works backend-side).
4. Bulgarian locale supported — `session.locale === 'bg'` returns Bulgarian replies (backend handles it; frontend just needs to pass the right locale).
5. Suggestion chips still present and functional — clicking a chip sends that text as the user message.
6. Status while awaiting response: some "Cinder is typing…" affordance rather than going silent.
7. Ivaylo can load the page, type, get real LLM replies end-to-end on stage. Local harness at `/opt/alpharius/testing/forgingapps/harness/` should stay green (may need a new selector suite for the integrated page; see forger/prime for priorities).

## Scope boundaries

- Don't change `/intake/message`. It works. If you find a bug, report it, don't silently patch.
- Don't touch `cinder_persona.md` or the prompt stack. That's prime/forger territory.
- If you pick Option A, don't put this behind a feature flag or breaking change. It can coexist with the rest of the site.

Ping prime when a PR is up or if blockers surface.
