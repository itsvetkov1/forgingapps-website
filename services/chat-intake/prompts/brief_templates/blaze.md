# Brief Template — Variant: `blaze`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: blaze
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

---

## Body sections

### 1. One-line summary

> B2B legal firm, 12 lawyers, Sofia, needs a replacement for an aging WordPress site; BG + EN, CMS-editable insights section, HubSpot integration, launch by end of Q2.

### 2. Business context

2–3 sentences: what the company does, who they serve, size signal if captured.

### 3. Why now

What triggered the inquiry. Rebrand, losing deals, migration pressure, external event, internal restructuring. Frame it in their own words where possible.

### 4. Information architecture sketch

The pages / sections they described. Bulleted, as-stated:

- Home
- Services (7 sub-pages for specific practice areas)
- Team
- Insights (blog, CMS-editable)
- Contact

Note any sections they mentioned tentatively ("we were thinking maybe a case studies section") versus firmly.

### 5. CMS requirement

- Needed: yes / no / unclear
- What content they'd edit (blog, case studies, team members, services, pricing)
- Who edits (specific person or role)
- Frequency (weekly / monthly / ad-hoc)

Material to the quote. Don't let this section be vague — if unclear, surface that as an open question.

### 6. Languages / locales

- Single locale: which one
- Bilingual BG/EN
- Any additional locales mentioned

Impacts IA and content scope.

### 7. Content and assets

- Copy: ready / partial / needs writing / mixed
- Photography: ready / needs shoot / stock / mixed
- Brand: style guide / logo / colors — what they have
- Case studies / testimonials: ready / need to produce / not part of scope

### 8. Integrations

Any that came up: CRM (HubSpot / Salesforce / Pipedrive), email (Mailchimp / MailerLite), analytics (GA4 / Plausible / Fathom), chat (Intercom / Crisp), booking (Cal.com / Calendly), reviews, embedded tools.

If none: "None discussed — confirm on the call."

### 9. Migration (if applicable)

- Source platform (WordPress / Wix / Webflow / custom / Squarespace)
- SEO-sensitive pages or URLs to preserve
- Content export concerns
- Timing (flip domain at launch / parallel run)

If no migration: omit this section.

### 10. Timeline

Stated deadline with date, flexibility signal. Apply `urgent_timeline` flag if inside 4 weeks.

### 11. Decision authority

Who signs off on scope / design / content. Is there a bottleneck stakeholder.

### 12. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 13. Recommended first-call angle

One paragraph. The wedge.

> Open with the CMS decision: they said they publish weekly but admitted nobody on the team has kept up content in 2 years. Either commit to a content program (and CMS is worth building) or skip CMS and use Markdown-in-repo. Don't quote until that's nailed.

### 14. Risks and open questions

- Scope ambiguity (pages mentioned but not firmed)
- Migration risk (unclear if SEO-sensitive content is flagged)
- Content risk (deadline vs. copy readiness)
- Stakeholder risk (sign-off bottlenecks)

### 15. Conversation flags

Applied flags with one-line rationale each.

### 16. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in original language.
- Length: 500–900 words. Blaze briefs are meatier than Spark because scope varies widely.
- Be specific about what was captured versus what's still unclear. Section-by-section uncertainty is useful.
- PII/credential redaction per style-guide §11.
- Hard-close edge cases → minimal brief, see style-guide §16.
