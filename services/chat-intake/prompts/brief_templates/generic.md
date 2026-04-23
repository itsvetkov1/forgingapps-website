# Brief Template — Variant: `generic`

**Important:** This template is only used when the conversation ended in phase 1 routing — the intake did not successfully commit to a specific variant. If routing succeeded and the conversation shifted to a specific variant (e.g., Forge), the brief is produced using that variant's template, not this one.

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: generic
session_id: "{sid}"
locale: "{bg|en}"
created_at: "{ISO-8601 UTC}"
submitter_name: "{form_data.name}"
submitter_email: "{form_data.email}"
company_name: "{extracted — null if not captured}"
flags: []
minimum_reached: false
completion_level: "partial"
conversation_turns: {int}
language_used: "{bg|en|bg→en|en→bg|mixed}"
routing_outcome: "inconclusive|redirected-external|hard-close"
suspected_variant: "{variant|null}"
---
```

Notes:
- `variant` stays `generic` to reflect that routing didn't land on a specific package.
- `suspected_variant` captures the LLM's best guess even if the user didn't confirm.
- `routing_outcome` reflects why intake ended in generic state.

---

## Body sections

### 1. One-line summary

> Inquiry ended in routing phase without landing on a variant; best guess is Ember (new company site) based on first message.

Or if the conversation was a hard-close:
> Inquiry appeared to be unrelated to ForgingApps services (IT support request); deflected to email.

### 2. What the user said

Short paragraph. Their framing of what they want. Quote key phrases verbatim.

### 3. Routing attempt

What you tried to route them toward, and what the user said. Don't editorialize — report.

- Turn 1: assistant asked about build/modify/advisory
- Turn 2: user said "mostly we want to talk about our options"
- Turn 3: assistant suggested discovery-workshop, user didn't confirm or reject
- Turn 4: user hit submit

### 4. Best guess variant

Your read on what they probably needed. Be honest about confidence level.

> Most likely `discovery-workshop` — the user wants to talk through options but hasn't committed to a build or an audit. A low-risk initial call is the natural match.

### 5. Why routing didn't complete

- User was vague and didn't converge
- User wanted to go straight to a call and skipped clarification
- Conversation was too short (user submitted early)
- Edge case — request was outside ForgingApps scope
- Technical issue on the platform side (rare)

### 6. Recommended first-call angle

One paragraph. The wedge for a founder opening a call with an ambiguous lead.

> Open broad: "Tell me about your business and what's bringing you to us this week." Let the user define the shape, then narrow to whichever variant fits. Don't try to route from the chat transcript alone — the user never committed in the intake, they'll need to commit to you on the call.

### 7. Risks and open questions

- Whether the user is a real buyer (low-engagement intakes sometimes aren't)
- Whether suspected variant is right (don't treat best-guess as confirmed)
- Whether the user needs broader warm-up before getting to specifics

### 8. Conversation flags

Applied flags with rationale.

### 9. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in source language.
- Length: 200–400 words. Generic briefs are short — the intake didn't go deep.
- Never pretend the conversation produced a clear variant match if it didn't.
- If routing did succeed and the brief is being generated for a specific variant, use that variant's template — not this one.
- Hard-close compression + redaction per style guide.
