# Brief Template — Variant: `forge`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: forge
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
stage: "pre-seed|seed|series-a|established|bootstrapped|unknown"
funding_source: "founder|vc|enterprise-sponsor|corporate-internal|unknown"
domain: "{e.g. fintech, healthtech, constructiontech — null if unclear}"
user_model: "single-sided|marketplace|multi-tenant-saas|enterprise-internal|unknown"
---
```

Notes:
- `stage` and `funding_source` are intake signals, not commitments.
- `user_model` captures the structural nature of the platform — useful for the founders to read at a glance.

---

## Body sections

### 1. One-line summary

> Seed-funded founder building multi-sided renovation PM SaaS centered on project owners; 2 pilots committed; 5-month production target; TS/Supabase preference; team of 2 engineers on their side.

### 2. Vision

3–5 sentences. What the platform is, what market it serves, what it replaces or enables, why now. Framed in the founder's language where possible. This section is read first — make it crisp.

### 3. Stage and funding

- Stage: nothing built / design mocks / prototype / v0 / replacement-for-existing
- Funding source: founder / VC / enterprise sponsor / corporate internal
- Capital committed: amount if stated, framing if not
- Runway in months as framed by the founder
- Any past raised or spent (prior attempts, prior vendor)

### 4. User segments and value exchange

For marketplaces: each side and what flows between them. For multi-tenant SaaS: buyer vs. user dynamic. For internal platforms: operators vs. customer-facing users.

- **Project owner** (primary) — runs renovations, hires contractors, tracks milestones, signs off on payments
- **General contractor** — responds to RFPs, runs projects, manages subs
- **Subcontractor** — accepts assigned work, submits completion proof, receives payment
- **Platform admin** — onboarding, dispute resolution, payout operations

For each: what they do most often, what value they get, what friction they have today.

### 5. Core modules (v1)

Not features — modules. Each module gets a line.

- **Project workspace** — shared space where owner + GC + subs coordinate on a given project
- **Document vault** — construction-sensitive docs (contracts, permits, COIs) with access control
- **Milestone approval flow** — owner signs off, triggers payment release
- **Payments (Stripe Connect)** — owner → GC → sub flows with split logic

Note any modules they mentioned as "v1 or v1.5" — scope-ambiguous items the first call must nail down.

### 6. Tech posture

- Stated stack preferences (e.g., "TypeScript end-to-end", "prior Supabase experience")
- Existing systems the platform must integrate with (CRM, ERP, their own APIs)
- Constraints imposed by their team's skills or hiring plan
- Infrastructure preferences (cloud vendor, self-hosted, compliance-driven)

### 7. Team

- Engineering: headcount, composition, seniority
- Design / Product / Ops: who's there, who's not
- Integration model: full delivery / augmentation / embedded / split-by-module

Apply `technical_user` or `non_technical_user` flag based on conversational tone.

### 8. Runway / budget frame

- Budget frame as stated (may be expressed as milestones, not lump sum)
- Runway the founder expects from the build (e.g., "we're planning 5 months of build burn")
- Risk tolerance signals — milestone-based delivery preference, fixed-price preference, open for T&M

Apply `high_budget_signal` / `low_budget_signal` if applicable relative to Forge range (€8k–€40k+).

### 9. Go-to-market and launch context

- Launch target date and what anchors it (investor moment, pilot customer commitment, fiscal event, market window)
- Pilot customers already committed (number and type)
- What "go-live" means (internal demo / first transaction / paid customer / public launch)

Apply `urgent_timeline` flag if the launch is inside 4 weeks (rare for Forge, but flag if so).

### 10. Commercial model

- Subscription / transaction fee / marketplace take rate / enterprise license / hybrid
- Pricing tiers already sketched or still TBD
- Billing frequency expectations
- Payout model (if marketplace)

### 11. Compliance surface

- Data residency (EU-only / multi-region / specific country)
- Industry regulation (fintech licensing, healthtech HIPAA-equivalent, gov procurement)
- Accessibility (WCAG level if mentioned)
- Enterprise procurement requirements (SOC2-style asks)

If nothing raised: "Standard GDPR for EU market; no additional regulation surfaced."

### 12. Success definition (6 months post-launch)

In the founder's own metrics. Concrete numbers or plain-English outcomes. E.g. "10 paying customers at €2k/mo" or "replace current vendor entirely across 3 regions".

### 13. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 14. Recommended first-call angle

One or two paragraphs. The wedge the founders can use to open.

> Open with v1 scope discipline: they described 4 modules as "all in v1" but runway only supports 5 months and team is 2 engineers plus us. Propose cutting milestone-approval flow to v1.5 and shipping payments as manual until volume warrants Stripe Connect. If that's uncomfortable for them, it reveals whether the pilot customers committed on a specific feature set (which is then non-negotiable) or on the broader vision.

### 15. Risks and open questions

- Scope vs. runway mismatch
- Team capacity signals
- Technical risks (identified integrations, stack compatibility)
- Compliance that was under-probed
- Commercial model ambiguity
- Stakeholder risk (investor involvement, advisor opinions, co-founder alignment)

### 16. Conversation flags

Applied flags with one-line rationale each.

### 17. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in original language.
- Length: 900–1500 words. Forge briefs are the longest — the founders want depth before a 90-minute first call.
- Structure matters. The founders will scan this brief more than read it linearly. Strong section headers, tight prose, specific nouns.
- Never invent a funding amount, runway number, or pilot customer count. If unknown, say so.
- Note user's stated language verbatim for key phrases: vision, pilot framing, success metrics. These are quotable in the call.
- Hard-close compression + redaction per style guide.
