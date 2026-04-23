# Brief Template — Variant: `spark`

Output artifact produced by the brief-generation pass after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: spark
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
---
```

Flag strings: style-guide §12.

---

## Body sections

### 1. One-line summary

What the landing page is for, in a single sentence.

> Solo consultant in Sofia needs a launch page for a cohort-based leadership course starting in 6 weeks; copy ready, branding not.

### 2. Purpose and audience

- What the page promotes / sells / communicates
- Who the audience is (one-liner — the target visitor)
- The specific action the page needs to drive (signup / purchase / booking / download / contact)

### 3. Content and brand readiness

- Copy: ready / partial / needs writing
- Visuals: ready / partial / needs sourcing or production
- Brand: style guide / logo / color system — what they have
- Legal content (privacy policy, terms, cookie notice): ready / needed

Flag `needs_content_help` in body text (not a frontmatter flag) if the team will need support producing copy or imagery.

### 4. Timeline

- Hard deadline (event, campaign launch, paid media start) — with the date
- Flexibility signal
- Apply `urgent_timeline` flag if the hard deadline is inside 4 weeks

### 5. Integrations and hooks

- Email tool (which one)
- Analytics
- CRM / lead capture destination
- Payments (if conversion is purchase)
- Calendar (if conversion is booking)

If none mentioned: "None discussed — confirm on the call."

### 6. Design direction (if captured)

- Reference sites they like
- Existing site to match style
- Stated preferences (minimal / bold / specific typography)
- Brand assets they'd supply

If not captured: "No design direction discussed. Explore on the call."

### 7. Variant fit assessment

One line: `Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 8. Recommended first-call angle

One paragraph. The wedge for opening the call.

> Open with scope confirmation: they described a single page but mentioned wanting "an about section and a pricing section" — confirm these are sections on one page versus separate pages before quoting. If separate, this is Ember not Spark.

### 9. Risks and open questions

- Unanswered intake items
- Likely scope-creep signals (multi-page hints, request for custom features)
- Content production risk (deadline vs. copy readiness)

### 10. Conversation flags

List applied flags with one-line rationale each.

### 11. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- Tone: internal, direct, founder-facing. English body regardless of chat locale; quote user verbatim in original language.
- Length: 300–500 words. Spark briefs are short. Padding is worse than sparse.
- Hard-close edge cases: collapse body to "what happened" paragraph. See style-guide §16 for the minimal-viable-brief pattern.
- Redact PII/credentials if `pii_shared` flag applied.
- Never infer a price, a timeline, or a design direction that wasn't stated.
