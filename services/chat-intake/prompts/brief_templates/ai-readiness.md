# Brief Template — Variant: `ai-readiness`

This template defines the structure of the intake brief produced after `<READY_TO_SUBMIT/>`. The brief-generation pass (`brief_generation.md`) uses this file as the structural reference when converting the conversation transcript into a brief.

Do not write chat responses in this format — this is the **output artifact**, written by a separate LLM pass after the chat closes.

Saved to: `/opt/forgingapps/intakes/{sid}/brief.md`. Delivered to forger via the n8n pipeline.

---

## Frontmatter (YAML, always present)

```yaml
---
variant: ai-readiness
session_id: "{sid}"
locale: "{bg|en}"
created_at: "{ISO-8601 UTC}"
submitter_name: "{form_data.name}"
submitter_email: "{form_data.email}"
company_name: "{extracted — null if not captured}"
flags: []                     # list from style-guide.md §12
minimum_reached: true|false
completion_level: "floor"|"full"|"partial"
conversation_turns: {int}
language_used: "{bg|en|bg→en|en→bg|mixed}"
---
```

Notes for the generator:
- `flags` must use the exact strings in style-guide §12. Empty list `[]` is valid.
- `completion_level`: `full` if all 10 targets captured to reasonable depth; `floor` if only items 1–4 captured; `partial` for anything in between.
- `language_used`: reflect any mid-conversation locale switch. If user switched EN→BG, write `en→bg`.
- If the conversation hit an edge-case hard-close (flags include one of: hostile_close, non_buyer_soft, existing_client_redirect, vendor_outreach, language_barrier), set `completion_level: "partial"` regardless of target coverage.

---

## Body sections

### 1. One-line summary

Single sentence describing the opportunity. No hedging.

Example:
> B2B analytics SaaS (Sofia, ~25 ppl) wants a sprint to decide where AI could cut support load before committing to a build.

If the conversation was a hard-close edge case (hostile / non-buyer / existing-client redirect / vendor), write one honest line reflecting that:
> Student asked for free advice on building an AI assistant for a school project; deflected to the blog, no intake conducted.

### 2. Business context

2–4 sentences. What the company does, who they serve, size signal if captured.

- Industry / product
- Customer segment (B2B / B2C / internal tools / etc.)
- Size signal (headcount band, revenue band, or "unknown")
- Any relevant constraints mentioned (regulated industry, multi-region, legacy systems — if they came up)

If unknown: write "Unknown — not captured in conversation."

### 3. The pain

What the prospect wants AI to address. Be specific. Quote the user's own framing where it's useful — don't paraphrase a vivid detail into corporate-speak.

Include:
- The pain itself (what's slow / manual / unreliable)
- Where it hurts (which team, which workflow, which part of the P&L)
- What they've already tried to fix it, if anything

If multiple pains surfaced, list them. Rank them by the user's own stated priority, not your guess.

### 4. Desired outcome

What success looks like **according to them**, in their own framing.

- Hard numbers they named (e.g., "cut support tickets by 30%")
- Soft outcomes they named (e.g., "team feels less overwhelmed")
- Non-goals they flagged (e.g., "not trying to replace people")

Do not invent KPIs. If they didn't name one, write "No specific success metric stated."

### 5. Current tooling and data

Short, scannable. Bullet points allowed here. Cover:

- Current systems (CRM, support, ERP, data warehouse — whichever came up)
- Data accessibility signal (clean / messy / siloed / "unknown")
- AI tools already in use, if any
- Integration points they already know matter

### 6. Prior AI attempts

- What they've tried (internal ChatGPT rollout, vendor POC, commercial AI tool)
- How it went (worked / stalled / abandoned / still running)
- Lessons they've carried forward

If none: "No prior AI attempts."

### 7. Team

- Engineering capacity (do they have engineers?)
- Data capacity (analysts? data eng?)
- AI-adjacent capacity (someone who's dabbled)
- Who would own this internally post-sprint

If the user said "we don't have engineers", that's important — surface it clearly.

### 8. Budget signal

**Not a commitment.** A signal of where their head is at.

- Did they ask about price? How did they react to the deferral?
- Did they name a budget range?
- Did they mention prior AI spend or failed budget for an AI attempt?
- Do they have allocated budget for this sprint, or are they scoping before asking for it?

Never invent a number. If budget wasn't discussed: "Not discussed."

Apply flags if warranted: `high_budget_signal`, `low_budget_signal`.

### 9. Timeline

- Stated deadline (e.g., "before our board meeting in June")
- Implicit urgency (e.g., "our competitor just launched an AI feature")
- Flexibility signal (hard date / soft preference / no rush)

If they named a deadline inside 4 weeks: apply `urgent_timeline` flag.

### 10. Stakeholders

- Who initiated this inquiry
- Who else is involved in the decision
- Who needs to see the sprint's output (audience for the deliverable)
- Any political / organizational context the founders should know before the call

### 11. Variant fit assessment

Your honest read on whether `ai-readiness` is the right variant.

- `Fit` — the sprint is a clean match.
- `Fit with notes` — good match but there's a complication (e.g., they might want a build right after).
- `Misfit, redirect declined` — they'd be better served by another variant but chose to stay. Name the better variant and apply `variant_mismatch_noted`.
- `Misfit, redirect accepted` — the variant was switched mid-conversation. This brief shouldn't exist under `ai-readiness` in that case; the downstream platform should re-route.

### 12. Recommended first-call angle

**The most useful section for the founders.** One paragraph, direct.

Given what was said in the intake, how should the first call open? What's the wedge?

Examples:
> Open with scope: they have a clear pain (support load) but no team to execute internally, so the sprint's output has to double as a build-vs-buy decision framework. Recommend framing the sprint as "what to pilot and who could run the pilot".

> Open with tooling reality check: they named a CRM that's known to have poor API surface. Spend 10 minutes confirming data access before discussing opportunities — the shape of the sprint changes a lot if data is locked up.

If the conversation was too thin to recommend an angle: "Intake captured minimum info only. Recommend discovery-heavy first call."

### 13. Risks and open questions

What's unresolved. What to probe on the call.

- Questions the intake didn't answer
- Signals that might be concerning (e.g., they've burned a prior vendor)
- Technical risks you noted (e.g., they're on a legacy system with known constraints)
- Organizational risks (e.g., inquirer isn't the decision maker, sponsor ambiguous)

### 14. Conversation flags

List all flags applied, one per line with a one-line rationale.

Example:
```
- variant_mismatch_noted: user's described scope is closer to ai-chat-assistant but they opted to stay on ai-readiness track
- urgent_timeline: named board meeting in 3 weeks
- technical_user: CTO-level conversation, referenced Kafka / Airflow comfortably
```

### 15. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

Always include. The founders can open the raw transcript if any section feels wrong.

---

## Generator rules

(These apply when the brief-generation LLM pass builds the brief — see `brief_generation.md` for the full prompt.)

- **Tone:** internal document for two founders. Plain, direct, technically literate. Not customer-facing. Not marketing. No hedging unless hedging is warranted.
- **Length:** aim for 400–800 words in the body. Shorter is fine for thin intakes. Don't pad.
- **Quotes:** quote the user verbatim (in the correct language — EN or BG) for vivid phrases. Mark with `>` blockquote syntax.
- **Redaction:** if `pii_shared` flag is present, replace any credential-like content in quoted user text with `[REDACTED:credential]`.
- **Language:** write the brief in **English regardless of conversation locale**. The founders read briefs in English. If the conversation was in Bulgarian, quoted user snippets stay in Bulgarian; everything you write about them is in English.
- **Never infer.** If a section is underdetermined, say so. Do not guess a budget, a timeline, a team size, or an outcome.
- **Hard closes (hostile / non-buyer / vendor / language barrier):** collapse sections 2–13 into a single 2–3 sentence "what happened" paragraph after the one-line summary. Keep the frontmatter, the flags section, and the transcript link. Everything else is optional.

---

## Minimal viable brief (edge case — hard close)

For hard-close cases, the brief can be as short as:

```markdown
---
variant: ai-readiness
session_id: "abc123"
locale: "en"
created_at: "2026-04-20T14:23:00Z"
submitter_name: "John Doe"
submitter_email: "john@example.com"
company_name: null
flags: [non_buyer_soft]
minimum_reached: false
completion_level: "partial"
conversation_turns: 3
language_used: "en"
---

# One-line summary
Student asked for free advice on building an AI tutor for a course project; deflected to the blog with a short exchange.

# What happened
Opening turn identified the user as a university student working on a course project. They explicitly stated they weren't looking to hire anyone, just wanted help framing the approach. One polite turn pointing at the blog; they thanked and closed out.

# Conversation flags
- non_buyer_soft: explicit "I'm doing this myself for class"

# Raw transcript
[Full conversation log](file:///opt/forgingapps/intakes/abc123/conversation.jsonl)
```

That is sufficient. Do not pad it out.
