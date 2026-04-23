# Brief Template — Variant: `hearthstone`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: hearthstone
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
tier_signal: "maintenance|growth|partner|unclear"
product_state: "running-well|running-with-issues|unstable|paused|unknown"
builder_status: "still-engaged|reachable|unreachable|internal-team|unknown"
---
```

---

## Body sections

### 1. One-line summary

> Established 60-ppl Sofia e-commerce team, custom Next.js/Node site built by dissolved agency, wants Growth-tier retainer — bi-weekly fixes + quarterly feature pushes; repo access yes, original devs unreachable.

### 2. Existing product

- Product type (website / app / SaaS / internal tool)
- URL or product name if shared
- Customer-facing or internal
- Size signal (users, traffic, revenue scale if mentioned)

### 3. Current state

- Running well / running with known issues / unstable / paused
- Who built it (agency / freelancer / internal / prior ForgingApps)
- Builder accessibility (still engaged / reachable / unreachable)
- Documentation state (good / partial / none)

### 4. Tier preference

- **Maintenance** — bug fixes, security, minor content
- **Growth** — maintenance + scheduled improvements + product partnership
- **Partner** — embedded technical partnership with roadmap ownership

If signaled vaguely, note it as tier-ambiguous and surface for call clarification.

### 5. Frequency / intensity expected

- Hours/week or hours/month estimate if given
- Cadence (weekly syncs / bi-weekly / monthly / ad-hoc)
- Availability expectation (business hours / extended / on-call)

### 6. Current pain points

Specific issues they raised — bugs, perf problems, missing capabilities, stability concerns. List form.

### 7. Growth targets (if Growth / Partner tier)

- Feature backlog state (drafted / in-product-tool / informal)
- Metrics targets if named
- Roadmap visibility on their side

### 8. Stack and tech context

- Languages / frameworks named
- Infrastructure (cloud vendor, hosting, CI/CD)
- Database / data stores
- Any known tech debt or "sensitive" areas of the code

### 9. Access model

- Repo access (yes / partial / blocked)
- Cloud / deployment credentials
- Ticketing / PM tool access
- NDAs or security constraints
- SOC2-type requirements if mentioned

### 10. Stakeholders

- Primary point of contact
- Escalation path
- Who else is involved in the retainer decision

Apply `technical_user` or `non_technical_user` flag based on stakeholder composition.

### 11. Start timing

- When they want to begin
- Overlap with existing team or vendor
- Transition period expectations

### 12. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 13. Recommended first-call angle

One paragraph.

> Open with a stabilization vs. steady-state question: they describe "running with known issues" and want Growth tier from day one, but a product handover where the original builders are gone usually needs a scoped audit month before iterative improvements make sense. Propose starting at Maintenance tier for 30 days (audit + hygiene) then stepping up to Growth.

### 14. Risks and open questions

- Unknown-unknown risk (product state described optimistically)
- Handover complexity (no original devs reachable)
- Access risk (repo / credentials access still to be granted)
- Scope ambiguity (tier unclear or backlog vague)
- SLA expectations (if they hinted at heavy uptime expectations without saying SLA)

### 15. Conversation flags

Applied flags with one-line rationale each.

### 16. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in source language.
- Length: 500–900 words.
- Be especially cautious about handover risk — if the original builder is unreachable and the product state is opaque, that's the single biggest risk signal for a retainer. Surface it.
- Hard-close compression + redaction per style guide.
