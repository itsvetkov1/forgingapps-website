# Brief Template — Variant: `oracle`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: oracle
session_id: "{sid}"
locale: "{bg|en}"
created_at: "{ISO-8601 UTC}"
submitter_name: "{form_data.name}"
submitter_email: "{form_data.email}"
company_name: "{extracted — null if not captured}"
flags: []
minimum_reached: true|false
completion_level: "floor"|"full"|"partial"
conversation_turns: {int}
language_used: "{bg|en|bg→en|en→bg|mixed}"
engagement_shape: "one-off|block|retainer|memo|unknown"
urgency: "immediate|this-month|open"
---
```

---

## Body sections

### 1. One-line summary

> CTO of 40-person logistics SaaS wants a 90-min call to stress-test a €60k AI vendor proposal for route optimization; decision on signing imminent.

### 2. The specific question

Direct, framed in their words. If they gave multiple, list them in priority order.

> 1. Is the vendor's proposal technically sound for route optimization at our scale?
> 2. Are the claimed accuracy numbers believable given our data shape?
> 3. Should we outsource this to the vendor, or build internally with the team we have?

### 3. Context around the question

Enough that the call doesn't open with discovery. The business, the team, the state of the art on their side, any prior attempts, the triggering event that made them reach out.

### 4. Stakeholders

- Inquirer role (CTO / founder / ops lead / advisor)
- Who else will be in the room (engineers / exec / board / silent observers)
- Decision authority: inquirer alone, collective decision, rubber-stamp situation

### 5. Engagement shape

- One-off call (length if stated)
- Block of hours (size if stated)
- Retainer (hours/month)
- Written memo / report
- Unknown — flagged for call clarification

### 6. Output format

- Call with verbal recommendation
- Written memo post-call
- Slide feedback
- Code review / architecture review
- Unknown

### 7. Confidentiality surface

- NDA already signed / needs signing / not expected
- Whether they're willing to share specific vendor names / proposal contents in writing
- Any data shown in the intake that should be handled carefully

### 8. Urgency and timing

- Triggering deadline (e.g., "we need to decide by Friday")
- Preferred scheduling window
- Absolute no-goes (they're travelling, board meeting, etc.)

Apply `urgent_timeline` flag if the decision is inside 4 weeks.

### 9. Recurring signal

- One-off vibe
- Could-become-ongoing signal
- Part of an existing / proposed ongoing relationship (in which case `hearthstone` might be a better variant — note if so)

### 10. Budget awareness

As stated. If unstated: "Not discussed."

### 11. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 12. Recommended first-call angle

One paragraph. What to prepare before the call and how to open.

> Ask him to send the vendor proposal and their internal spec 48h before the call. Open by validating the proposal's claims against his actual data shape (which he hasn't described — worth one question mid-call). If it smells light, pivot fast to "what would internal look like" discussion.

### 13. Preparation request for the client

A short list of what the founders would benefit from receiving before the call. This is delivered back to the client in the confirmation email.

- Vendor proposal doc
- Their own internal spec
- Sample of the data the system would operate on (aggregated / anonymized)
- Current performance baseline if any

Omit this section if the engagement shape doesn't need prep materials.

### 14. Risks and open questions

- Whether the question is still too broad
- Whether NDA is a blocker to useful prep
- Whether stakeholder alignment is real (CTO agrees, but CEO may have a position)
- Expertise match — is this the kind of AI question ForgingApps can speak to (if the domain is deep niche, flag for the founders)

### 15. Conversation flags

Applied flags with one-line rationale.

### 16. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in source language.
- Length: 400–700 words. Oracle briefs are focused.
- Preserve the exact phrasing of the specific question. That's the contract.
- Never editorialize on whether the question "has a good answer" — that's the engagement, not the brief.
- Hard-close compression + redaction per style guide.
