# ForgingApps Website Content Manual

Last updated: 2026-04-11
Status: Working reference for site content, structure, pricing, messaging, and content ownership.

## 1. Purpose of this document

This is the single practical reference for what the ForgingApps website currently says, how it is structured, and where the content lives.

Use it when you need to:
- review or rewrite copy
- update pricing or offers
- check page purpose and CTA flow
- audit EN/BG consistency
- brief another agent or developer
- plan new pages, blog posts, or conversion improvements

This is not a design spec and not a technical architecture doc. It is a content and messaging map.

---

## 2. Site structure at a glance

### Localized routes
The main site uses URL-based locale routing:
- English: `/en/*`
- Bulgarian: `/bg/*`

Examples:
- `/en`
- `/en/services`
- `/bg/services`
- `/en/ai-consulting`
- `/bg/blog`

### Root behavior
- `/` redirects to `/en`

### Non-localized demo routes
These stay outside locale prefixes:
- `/demo/veloura-shop`
- `/demo/veloura-support`

These demo routes are intentionally preserved outside the `/en` and `/bg` route tree.

---

## 3. Core brand/message positioning

### What ForgingApps is
ForgingApps is positioned as:
- a boutique software and AI studio
- senior-founder-led
- practical, not hype-driven
- direct-access, low-overhead, no bloated agency structure
- suitable for businesses that want useful software and AI systems without enterprise theatre

### Strategic positioning themes
Recurring positioning themes across the site:
- senior builders, not account managers
- direct communication
- practical AI
- transparent pricing
- startup-friendly but serious
- fast delivery without cheapening quality
- no bloated teams or unnecessary overhead

### Tone
Primary tone characteristics:
- direct
- confident
- practical
- low-fluff
- founder-led
- sharp but not theatrical

The site aims to sound premium but not corporate.

---

## 4. Source of truth for content

### Primary content sources
Main website copy currently lives in:
- `lib/i18n/en.ts` — English source of truth
- `lib/i18n/bg.ts` — Bulgarian source of truth

### Main rendering components
The localized site content is rendered through client content components, including:
- `app/HomeContent.tsx`
- `app/about/AboutContent.tsx`
- `app/services/ServicesContent.tsx`
- `app/ai-consulting/AIConsultingContent.tsx`
- `app/contact/ContactContent.tsx`
- `app/demo/DemoContent.tsx`
- `app/privacy/PrivacyContent.tsx`
- `app/terms/TermsContent.tsx`
- `app/blog/BlogContent.tsx`
- `app/blog/BlogPostContent.tsx`

### Shared UI/content surfaces
Important shared components affecting content presentation:
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/LanguageToggle.tsx`
- `components/ContactForm.tsx`
- `components/CopyEmailButton.tsx`
- `components/ServiceCard.tsx`
- `components/ConditionalShell.tsx`

### i18n/routing infrastructure
Important supporting files:
- `contexts/LanguageContext.tsx`
- `lib/i18n/translations.ts`
- `lib/i18n/useTranslation.ts`
- `lib/i18n/routing.ts`
- `lib/i18n/metadata.ts`

---

## 5. Homepage content

### URL
- `/en`
- `/bg`

### Purpose
The homepage is the top-level conversion and positioning page.
It answers:
- what ForgingApps does
- what types of services exist
- why trust the team
- how the process works
- what the next CTA should be

### Main sections
1. Hero
2. What We Forge (three primary package cards)
3. Demo teaser
4. Differentiators
5. Process
6. Credentials / tech stack
7. Final CTA

### Homepage package cards shown
Homepage highlights only three top-tier entry points:
- Spark — from EUR 1,500
- Anvil — from EUR 5,000
- Forge — from EUR 10,000

Notes:
- crossed-out discount pricing has been removed from the homepage cards
- homepage cards now point toward deeper service exploration or contact
- Ember exists in the full services stack, but is not one of the three homepage spotlight cards

### Homepage trust themes
The homepage reinforces:
- senior expertise
- fast delivery
- affordability through low overhead, not cheapness
- technical credibility

### Homepage main CTA intent
Primary CTA direction:
- explore demo
- contact / start conversation
- move to services or AI consulting if interest is more specific

---

## 6. Services page content

### URL
- `/en/services`
- `/bg/services`

### Purpose
This page explains the core commercial packaging of ForgingApps.
It is the main pricing/offer page for websites, apps, platforms, consulting, and long-term partnership.

### Current services stack
The site currently presents these service offers:

#### 1. The Spark
- from EUR 1,500
- for simple websites and one-page launches
- typical delivery: 1–2 weeks

#### 2. The Ember
- from EUR 3,000
- for websites or simple apps with more moving parts
- typical delivery: 2–3 weeks
- positioned between Spark and Anvil

#### 3. The Anvil
- from EUR 5,000
- for serious apps, portals, and business systems
- typical delivery: 4–8 weeks
- most Anvil projects are framed as landing between EUR 5,000 and EUR 12,000 depending on scope

#### 4. The Forge
- from EUR 10,000
- for platforms, products, and larger custom builds
- individually scoped

#### 5. The Oracle
- from EUR 1,500
- AI consulting and feasibility
- acts as the consulting entry point

#### 6. The Hearthstone
- post-launch partnership / retainer offer
- monthly retainers after launch

### Hearthstone retainer tiers
Current Hearthstone tiers:
- Maintenance — EUR 800/month
- Growth — EUR 1,800/month
- Partner — EUR 3,500/month

Additional retainer note:
- annual retainer framing: pay 10 months, get 12

### Discovery Workshop
There is a specific Discovery Workshop offer for larger projects:
- EUR 500–800
- used before larger Anvil / Forge work
- credited in full if the client proceeds

### Page-level messaging themes
The Services page now emphasizes:
- clarity over gimmicky pricing
- practical packaging
- boutique team vs large agency overhead
- a “start small, scale properly” commercial path
- a progression from one-off project to long-term partnership

### Main conversion flow on Services
The page is meant to move visitors toward:
- contact
- scoping call
- discovery workshop
- AI consulting if their need is AI-first

---

## 7. AI Consulting page content

### URL
- `/en/ai-consulting`
- `/bg/ai-consulting`

### Purpose
This page positions ForgingApps as a practical AI consulting and implementation partner.
It is designed to convert visitors who are AI-curious but may not yet know whether they need consulting, a productized offer, or a larger implementation.

### Current AI offer structure

#### 1. AI Readiness Sprint
- EUR 1,500–2,500 fixed
- half-day to full-day engagement
- for businesses unsure where to start with AI
- positioned as the first recommended step for many AI buyers

#### 2. AI Chat Assistant
- EUR 2,500 flat
- deployed in 2 weeks
- custom AI assistant trained on client content
- fixed-scope, simpler entry offer

#### 3. The Oracle
- EUR 100–150/hour
- senior AI consulting for more complex thinking, architecture, workflow design, and implementation guidance

#### 4. Other fixed-price AI work
Presented as supporting offers:
- AI feasibility assessment — from EUR 1,500
- custom chatbot / assistant — from EUR 2,500
- workflow automation — from EUR 2,000
- custom AI implementation — individually scoped
- AI strategy workshop — from EUR 1,200

### AI page strategic narrative
The page is built around a three-stage logic:
1. AI Readiness Sprint
2. AI Implementation
3. AI Management Retainer

This is important because it frames AI work not as a single project, but as a progression.

### Key page intentions
The AI page is supposed to answer:
- where should a business start with AI?
- what can AI actually do in practice?
- when is a fixed-price AI offer enough?
- when is deeper consulting needed?
- what happens after the first AI system is built?

### Demo relation
The AI page uses the live demo as supporting proof, not as the offer itself.
It points people toward:
- trying the demo
- booking a conversation
- choosing the right AI entry point

---

## 8. About page content

### URL
- `/en/about`
- `/bg/about`

### Purpose
Trust-building and founder credibility.

### Main content themes
- why ForgingApps exists
- why founder-led delivery matters
- seniority and direct access
- working without bloated agency structure
- values and operating philosophy

### Main trust levers
- founder identity
- practical motivation for starting the studio
- values around quality, direct access, and no-surprise delivery

This page is more about credibility than conversion, but it supports both.

---

## 9. Contact page content

### URL
- `/en/contact`
- `/bg/contact`

### Purpose
Primary lead capture page.

### Main content elements
- contact form
- direct email
- response expectation
- FAQ block
- reassurance around next steps

### Form role
The form is the main inquiry capture mechanism.
It supports package/interest routing and project description.

### Contact conversion philosophy
The contact page is designed to reduce friction by making:
- next steps clear
- response time visible
- direct email available
- FAQs accessible before submission

---

## 10. Demo page content

### URL
- `/en/demo`
- `/bg/demo`

### Purpose
The demo page bridges curiosity into confidence.
It shows a live example of AI behavior in a realistic business context.

### Main themes
- real AI support interaction
- practical use case, not toy demo
- context-aware assistance
- deployable business value

### Demo links of note
Localized demo index exists at:
- `/en/demo`
- `/bg/demo`

But the actual Veloura demos remain non-localized:
- `/demo/veloura-support`
- `/demo/veloura-shop`

That split is intentional.

---

## 11. Blog content

### Blog index URLs
- `/en/blog`
- `/bg/blog`

### Blog purpose
The blog serves multiple roles:
- thought leadership
- SEO/supporting acquisition
- buyer education
- AI consulting funnel support
- trust and expertise reinforcement

### Current known post inventory
The blog currently includes at least these posts:
- `voice-agents-just-got-useful`
- `why-forgingapps-ai`
- `how-to-choose-ai-consultant`
- `does-my-business-need-ai`
- `what-is-ai-consulting`
- `umlaut-secure-app-award`
- `why-we-started-forgingapps`
- `ai-for-small-business`
- `what-does-app-cost`

### Blog architecture
- blog index is rendered through `app/blog/BlogContent.tsx`
- blog post content is rendered through shared `app/blog/BlogPostContent.tsx`
- localized blog posts use route pattern:
  - `/en/blog/[slug]`
  - `/bg/blog/[slug]`

### Blog strategy direction
Current blog content is doing at least two things:
1. educational content for AI/service buyers
2. company credibility / story content

There is also an existing weekly blog automation workflow in the workspace.

---

## 12. Legal pages

### URLs
- `/en/privacy`
- `/bg/privacy`
- `/en/terms`
- `/bg/terms`

### Purpose
These pages reinforce legitimacy and trust.
They are not conversion-first pages, but they matter for professionalism and compliance.

---

## 13. Current CTA map

### Primary CTA patterns across the site
Most pages ultimately route to one of these:
- contact / start the conversation
- book a scoping/discovery discussion
- explore AI consulting
- try the demo
- view services

### CTA hierarchy by page intent
- Homepage → demo / contact / services
- Services → contact / discovery workshop / AI consulting
- AI Consulting → contact / demo / choose the right AI entry point
- Contact → submit inquiry
- Blog → continue learning or move to services/contact

---

## 14. EN/BG content relationship

### Current rule
English and Bulgarian should be structurally equivalent in intent, offer set, and page hierarchy.

### Source files
- EN: `lib/i18n/en.ts`
- BG: `lib/i18n/bg.ts`

### Practical note
If the website messaging changes, both files must be updated together unless the change is intentionally locale-specific.

### Risk area
The easiest way for the site to drift is:
- pricing updated in EN but not BG
- page component changed but translation keys not updated
- offer renamed in one locale only

For this reason, pricing and positioning changes should always be checked in both translation files.

---

## 15. Pricing summary (current state)

### Core services
- Spark — from EUR 1,500
- Ember — from EUR 3,000
- Anvil — from EUR 5,000
- Forge — from EUR 10,000
- Oracle — from EUR 1,500

### Discovery / scoping
- Discovery Workshop — EUR 500–800

### Hearthstone retainers
- Maintenance — EUR 800/month
- Growth — EUR 1,800/month
- Partner — EUR 3,500/month

### AI offers
- AI Readiness Sprint — EUR 1,500–2,500 fixed
- AI Chat Assistant — EUR 2,500 flat
- Oracle hourly consulting — EUR 100–150/hour
- AI feasibility assessment — from EUR 1,500
- custom chatbot / assistant — from EUR 2,500
- workflow automation — from EUR 2,000
- AI strategy workshop — from EUR 1,200

---

## 16. Demo / side-project content references

### Veloura
Veloura content is a separate demo track and should be treated independently from the main site offers.
Related assets and tasks exist in workspace task lanes, but Veloura is not part of the main localized route tree.

### Ember
Ember is the site assistant / chat layer.
Its own knowledge and tone live outside the main website content files and may need manual syncing when website pricing or offers change.

Important practical note:
If prices or offers change on the website, Ember’s internal knowledge may need to be updated separately.

---

## 17. Existing content operations infrastructure

### Weekly blog automation
There is a task lane at:
- `context/tasks/weekly-ai-blog-automation/`

This includes:
- workflow spec
- research prompt
- article-draft prompt
- cron stub
- approval workflow
- logs and drafts folders

### Veloura task lane
There is also a project-local task lane at:
- `context/tasks/veloura-bot/`

That includes:
- specs
- prompts
- handoff docs
- verification checklists
- notes
- local task log

These are not website pages, but they matter for content operations and demo-related updates.

---

## 18. Recommended future documentation additions

This manual is useful, but it can get stronger by adding:
- exact page-by-page CTA targets
- full EN/BG message parity matrix
- blog content intent per post (SEO vs trust vs funnel)
- conversion audit notes
- brand voice do/don’t rules
- content ownership rules by page
- pricing change log with dates

---

## 19. Practical maintenance rules

If you update the website content:
1. update EN and BG together unless there is a deliberate locale exception
2. verify the relevant content component and translation file both align
3. re-check Ember knowledge if pricing or offers changed
4. re-check blog index if blog inventory changed
5. preserve non-localized demo routes
6. rebuild after structural page or route changes

---

## 20. Best quick-reference files

If you need to understand the site fast, start here:
1. `lib/i18n/en.ts`
2. `lib/i18n/bg.ts`
3. `app/services/ServicesContent.tsx`
4. `app/ai-consulting/AIConsultingContent.tsx`
5. `app/HomeContent.tsx`
6. `app/blog/BlogContent.tsx`
7. `app/blog/BlogPostContent.tsx`

That combination gives you the clearest picture of the current site content and commercial positioning.
