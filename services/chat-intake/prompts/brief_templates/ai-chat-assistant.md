# Brief Template — Variant: `ai-chat-assistant`

Output artifact produced after `<READY_TO_SUBMIT/>`. Saved to `/opt/forgingapps/intakes/{sid}/brief.md`.

---

## Frontmatter

```yaml
---
variant: ai-chat-assistant
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
use_case_category: "support-deflection|sales-qualification|product-discovery|docs-qa|internal-knowledge|lead-intake|other|unknown"
surface: "website-widget|whatsapp|slack|in-app|standalone|multiple|unknown"
agentic: "read-only|light-actions|heavy-agentic|unknown"
---
```

Notes:
- `use_case_category` is the founders' fastest read at a glance.
- `agentic` captures whether the bot needs to act in systems — the single biggest scope determinant. "Light-actions" = create a ticket, add to list, tag a record. "Heavy-agentic" = cancel orders, update records, run workflows.

---

## Body sections

### 1. One-line summary

> Mid-size DIY retailer wants website chat assistant for project-based product discovery across 12k SKUs + manuals + how-to articles; BG+EN; ~500/day volume; no agentic actions.

### 2. Use case

2–3 sentences. The specific job to be done, in plain language. Not "chatbot for customer support" — something like "answer DIY customers' project-based questions ('I need to waterproof a concrete balcony that gets heavy rain') with the right product recommendations and how-to articles from our archive".

### 3. Data sources

Bulleted, with format and size signal for each.

- **Product catalog** — Shopify API, ~12k SKUs
- **Product manuals** — ~800 PDFs hosted on a public URL
- **How-to articles** — CMS (WordPress), ~350 articles in BG and ~280 in EN
- **Support archive** — Zendesk, but they're not sure yet if it should be ingested

Note any data they mentioned but weren't sure about including.

### 4. Surface(s)

- Primary: website widget (specific pages or site-wide?)
- Secondary: WhatsApp / Slack / in-app / standalone URL
- Any mobile considerations

### 5. Volume expectation

- Launch-day estimate
- 6-month trajectory if mentioned
- Peak handling (any seasonal spikes expected)

### 6. Languages

- BG / EN / other
- Equal quality expectation, or "English primary, BG best-effort"

### 7. Handoff to human

- Trigger: confidence threshold, user request, specific intent
- Destination: support email, ticket system, live chat handoff, Slack channel
- Acceptable "I don't know" behavior if no handoff path

### 8. Integrations

- Read-only API calls (pulling product data, order status)
- Write-back needs (ticket creation, CRM update, calendar booking)
- Workflow triggers (Zapier, Make, direct API)

This section's depth determines whether the build fits the fixed-price package or scales to Anvil.

### 9. Tone / persona

- Brand voice notes provided
- Style-guide or reference examples
- Constraints ("must sound professional", "must be friendly", "must be humorous")

If none specified: "No explicit persona constraints — default to brand voice observable on their public site."

### 10. Regulatory / trust surface

- Domain sensitivity (healthcare / finance / legal / children's)
- Disclaimers required
- PII handling (does the bot collect any, how's it stored)
- Liability signals they flagged

If none: "Consumer retail — standard disclaimers only."

### 11. Current baseline

What's happening today in this workflow. Sets the comparison for "does this thing work".

- FAQ page / manual search / live agent / nothing
- Current pain (cost, response time, accuracy)

### 12. Success metrics

- Deflection rate target
- CSAT / user satisfaction signal
- Conversion target (if sales-adjacent)
- Usage volume expectations

If unstated: "No specific metric defined — opportunity to co-design on the call."

### 13. Budget / scope signal

Whether the described scope fits the fixed-price package, or scales up. Note any specific budget mentions.

### 14. Variant fit assessment

`Fit` / `Fit with notes` / `Misfit, redirect declined` / `Misfit, redirect accepted`.

### 15. Recommended first-call angle

One paragraph. The wedge.

> Open by validating data-source quality: 800 PDFs + 630 articles sounds fine until you look at whether they're well-structured. Ask them to send 3 random manuals and 3 how-to articles before the call. If the PDFs are scanned images instead of native text, that's a chunk of pre-work that wasn't scoped.

### 16. Risks and open questions

- Data quality (assumed clean, may not be)
- Agentic creep (they said "just Q&A" but later said "also cancel orders" — scope ambiguity)
- Language quality parity (BG content depth vs. EN)
- Integration surface (which systems, which directions)
- Regulatory (if domain is sensitive)

### 17. Conversation flags

Applied flags with one-line rationale each.

### 18. Raw transcript link

```
[Full conversation log](file:///opt/forgingapps/intakes/{sid}/conversation.jsonl)
```

---

## Generator rules

- English body. User quotes verbatim in source language.
- Length: 500–900 words. Medium-sized brief.
- The `agentic` frontmatter field must be filled — it's the fastest scope-risk check the founders do.
- Never promise a specific LLM vendor or architecture. Stay at the scope level.
- Hard-close compression + redaction per style guide.
