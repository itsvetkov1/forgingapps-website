# Brief Template — Variant: `anvil`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: anvil
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
stage: "pre-revenue|post-revenue|established|unknown"
domain: "{e.g. healthtech, fintech, retail, education — null if unclear}"
---
```

Notes:
- `stage` reflects where the client is — material to the call's shape (funded founder vs. bootstrapper vs. established business).
- `domain` surfaces regulatory-sensitive industries at a glance.

---

## Body sections

### 1. One-line summary

> Owner of 4 physio clinics in Sofia wants web + iOS booking app to cut no-shows and eliminate phone-based rescheduling; €8–12k frame, pre-September launch.

### 2. The problem

2–4 sentences. What's broken, slow, expensive, or missing today. Ideally in the client's framing. This is the foundation of the brief — if it reads like "they want an app" rather than "they have a problem", the intake failed.

### 3. Users

List the user roles the app needs to serve, with one line each:

- **Client** — books / reschedules / pays / receives reminders
- **Therapist** — sees own schedule, marks sessions complete
- **Desk staff** — manages the daily board, handles overrides

For each role, note decision-grade details: what they do most often, what friction they have today.

### 4. Core flows

The 2–4 critical paths through the app.

1. Client books a class/session/appointment from a list of available slots
2. Client reschedules or cancels within a policy window
3. Desk staff sees day view, handles walk-ins, moves sessions
4. Client receives reminder and pre-paid receipt

Not a full feature list — the must-haves that define the product.

### 5. Platforms

- Web: required / nice-to-have / out-of-scope
- iOS: required / nice-to-have / out-of-scope
- Android: required / nice-to-have / out-of-scope
- Cross-platform preference (React Native / Flutter / native) — noted only if the client raised it

If mobile is in scope but platform wasn't specified, surface as an open question.

### 6. Auth and roles

- Auth method: email+password / magic link / OAuth provider / SSO / invite-only
- Role model: which roles, what each can do
- Multi-tenant: yes / no / partial (e.g. multi-location but single org)

### 7. Data model sketch

Rough entity list. Not a schema.

- Users (roles: client / therapist / desk)
- Sessions (class slot, capacity, therapist, location)
- Bookings (client → session, status, payment)
- Clinics / locations
- Passes / memberships (if applicable)
- Payments (Stripe objects)

Note anything the client flagged as complex or important ("we need per-clinic pricing, not global").

### 8. Integrations

- Payments: Stripe / Stripe Connect / other
- Email: service named or TBD
- SMS / notifications: service named or TBD
- Calendar sync: Google Calendar / Outlook / none
- External APIs: any third-party they know they'll hit
- Analytics: mentioned or not

### 9. Existing stack / data migration

If this replaces something:
- Current system (booking vendor / internal tool / spreadsheets / paper)
- Data to migrate: members, past bookings, notes, etc.
- Migration complexity signal

If greenfield: "Greenfield — no migration required."

### 10. Budget signal

Frame, not commitment. Include the language they used.

- Named range ("€8–12k" / "under €5k" / "doesn't matter if it fits the scope")
- Prior spend on similar attempts
- Sponsor / funding source context (bootstrapped / seed round / established company budget)

Apply `high_budget_signal` or `low_budget_signal` flags if applicable.

### 11. Timeline

- Stated deadline with date
- Driver behind the deadline (launch event, seasonal demand, funding milestone)
- Flexibility signal

Apply `urgent_timeline` if inside 4 weeks.

### 12. Team capability

- Engineering on their side (yes / no / contractor relationship)
- Handoff preference (keep ForgingApps maintaining it / internal team takes over / hybrid)
- Technical literacy of the primary stakeholder

Apply `technical_user` / `non_technical_user` flag accordingly.

### 13. Regulatory / compliance

- GDPR specifics beyond defaults
- Industry regs flagged (healthcare, finance, education, HR)
- PII handling concerns
- Data residency requirements

If none: "Standard GDPR; no special concerns raised."

### 14. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 15. Recommended first-call angle

One paragraph. The sharpest wedge the founders can open with.

> Open with scope: they used the words "marketplace" and "external trainers" alongside the in-house app. Clarify up-front whether v1 is just in-house or includes the marketplace. If marketplace is v1, this is Forge not Anvil and the €8–12k frame doesn't fit. Get this nailed before pricing anything.

### 16. Risks and open questions

- Scope ambiguity (feature list vs. flows)
- Platform ambiguity (iOS native vs. cross-platform not decided)
- Integration uncertainty (named Stripe but hasn't confirmed payment model)
- Stakeholder risk (decision authority unclear)
- Technical risks (data migration from Google Sheets at scale)
- Timeline risk (vs. readiness of content / content / team)

### 17. Conversation flags

All applied flags with one-line rationale.

### 18. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in original language.
- Length: 700–1200 words. Anvil briefs should be substantial — the call depends on them.
- When the client gave a feature list instead of a problem + flows, say so explicitly in section 2 — don't paper over it.
- Don't invent a stack, budget number, or timeline that wasn't stated.
- Redaction + hard-close compression per style guide.
