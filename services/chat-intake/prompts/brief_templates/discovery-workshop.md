# Brief Template — Variant: `discovery-workshop`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: discovery-workshop
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
format: "remote|in-person-sofia|in-person-other|hybrid|unknown"
duration_hours: {int|null}
---
```

---

## Body sections

### 1. One-line summary

> Leadership team (CEO/CTO/Head of Product) wants 3h remote workshop to align on AI hiring direction; output = 1-page memo + direction shortlist; target 2 weeks.

### 2. Topic

The specific question / decision / problem the workshop is built around. Sharp, one paragraph.

### 3. Attendees

- Titles
- Names if given
- Headcount
- Anyone notable absent (vendor not invited / exec not in room) — flag if meaningful

### 4. Desired output

Concrete deliverable from the session. Be specific. If multiple outputs were named, list in priority order:

1. One-page decision memo with recommendation
2. 3-6 month roadmap sketch
3. Action items

### 5. Timing and logistics

- Target window (specific date or range)
- Format: remote / in-person / hybrid
- Location if in-person
- Duration (hours requested if any)

Apply `urgent_timeline` flag if the target is inside 2 weeks.

### 6. Pre-workshop materials

- Documents / proposals / memos the client will share before the session
- Or: "No pre-read materials — full discovery in-session"

### 7. Internal stakes

What's riding on the workshop's output. A hiring decision, a vendor signing, a board update, an investor conversation. Frame in their words.

### 8. Facilitation preference (if stated)

- Slides / whiteboard / conversation / structured agenda
- "Let us drive" vs. "they have a preferred format"

If unstated: "No preference signaled — ForgingApps to propose."

### 9. Decision authority

Does the workshop make a decision in the room, or produce a proposal for later approval. Who owns the decision in either case.

### 10. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 11. Recommended first-call angle

One paragraph. The wedge.

> Open with format: they described 3h but listed 6 distinct outputs. Either we cut to 2 outputs or run 4h. Don't let them default to "try to cover it all in 3h" — you'll miss everything.

### 12. Risks and open questions

- Topic clarity
- Attendee alignment (is everyone actually bought in)
- Output realism (is the desired output achievable in the time)
- Pre-read commitment (will they actually send materials in time)

### 13. Conversation flags

Applied flags with one-line rationale each.

### 14. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in source language.
- Length: 300–500 words. Short engagement, short brief.
- Precision over completeness — the four floor items must be crystal clear.
- Hard-close compression + redaction per style guide.
