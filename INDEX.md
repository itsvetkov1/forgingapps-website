# ForgingApps Website — Project Index
**Last indexed:** 2026-04-10
**Type:** Next.js 15 static marketing site
**Purpose:** Marketing site for ForgingApps covering services, AI consulting, portfolio, blog, contact flow, and an embedded Veloura support demo.

## Tech Stack
- **Framework:** Next.js 15 App Router with static export
- **Styling:** Tailwind CSS 3.4 + global CSS
- **Language:** TypeScript + React 19
- **Hosting:** Cloudflare Pages (\out/\ export)

## Routing Architecture

The site uses **URL-based locale routing** (migrated from client-side toggle). All user-facing pages live under \pp/[locale]/\, with \/en/...\ and \/bg/...\ as the canonical URL patterns.

- \pp/(root)/\ — Root redirect group: redirects \/\ to \/en\ (meta refresh, no middleware)
- \pp/[locale]/\ — Primary route group for all localized content
- \pp/blog/\ — Legacy blog article folders (pre-i18n, kept for redirect/static compatibility)
- \pp/sitemap.ts\ — Sitemap generation (force-static)

No Next.js middleware is used. Locale logic is handled entirely via \lib/i18n/\.

## Key Pages / Features

All pages below live at \pp/[locale]/<path>/page.tsx\ (served as \/en/<path>\ and \/bg/<path>\):

- \page.tsx\ — Homepage with pricing tiers, credentials, and CTA flow
- \services/\ — Full package catalog (Spark, Ember, Anvil, Forge, Oracle, Hearthstone), pricing, delivery, and payment terms
- \i-consulting/\ — AI consulting offer page (expanded body copy EN + BG)
- \portfolio/\ — Portfolio / proof page
- \bout/\ — Company background and positioning (founders with LinkedIn links)
- \log/\ — Blog index page
- \log/[slug]/\ — Dynamic blog post rendering (content sourced from \lib/i18n/blog-posts-*.ts\)
- \contact/\ — Contact page with brief form and FAQ
- \demo/veloura-support/\ — Embedded AI support demo page
- \privacy/\ — Privacy policy
- \	erms/\ — Terms page

### Shared Content Components
- \pp/HomeContent.tsx\ — Homepage content component
- \pp/blog/BlogContent.tsx\, \pp/blog/BlogPostContent.tsx\ — Blog rendering components (shared)
- \pp/services/ServicesContent.tsx\ — Services content component
- \pp/about/AboutContent.tsx\ — About content component

## Service Packages

| Package | Price | Delivery | Notes |
|---|---|---|---|
| The Spark | Fixed price (per quote) | ~2 wks | Landing pages. 40/30/30 payment split. |
| The Ember | From EUR 3,000 | 2-3 weeks | New. Simple web product: brochure sites with CMS, portals, directories, calculators, booking flows, lightweight internal tools. 100% upfront. |
| The Anvil | From EUR 5,000 | 4-8 weeks | Custom app or mobile product. 50/50 split. |
| The Forge | From EUR 10,000 | Variable | Complex platform or full MVP. 40/30/30 split. |
| The Oracle | EUR 60/hr | Ongoing | AI consulting & integration. Billed weekly. |
| The Hearthstone | From EUR 400/mo | Retainer | Maintenance / Growth / Partner tiers. Monthly prepaid. |

Payment terms: Spark & Ember 100% upfront. Post-launch support: 30 days (Spark, Ember, Anvil), 60 days (Forge).

## i18n Architecture

Locale files live in \lib/i18n/\:

| File | Purpose |
|---|---|
| \en.ts\ | Full English translation object (all UI copy, packages, FAQ, legal, contact) |
| \g.ts\ | Full Bulgarian translation object -- source of truth for pricing |
| \log-posts-en.ts\ | English blog post content (title, meta, sections, CTAs) |
| \log-posts-bg.ts\ | Bulgarian blog post content |
| \
outing.ts\ | Locale routing helpers: localePath, swapLocaleInPath, stripLocaleFromPath |
| \	ranslations.ts\ | Translation resolution utilities |
| \useTranslation.ts\ | React hook for consuming translations |
| \metadata.ts\ | i18n-aware metadata helpers for Next.js |

Supported locales: ['en', 'bg']. BG locale loads Cyrillic Inter font subset. English is default/fallback.

## Blog

**Status: Revived.** Blog was removed for SEO reasons then reinstated with full localization.

Dynamic routing: \pp/[locale]/blog/[slug]/page.tsx\ -- slug maps to keys in \log-posts-en.ts\ / \log-posts-bg.ts\.

All posts include a contextual CTA block based on post category.

### Current Articles

| Slug | Title | Date | Category |
|---|---|---|---|
| voice-agents-just-got-useful | Voice Agents Just Got a Lot More Useful | Apr 6, 2026 | AI |
| why-forgingapps-ai | Why ForgingApps for AI Consulting | Apr 5, 2026 | AI |
| how-to-choose-ai-consultant | How to Choose an AI Consulting Partner (Without Getting Burned) | Mar 29, 2026 | AI |
| does-my-business-need-ai | Does My Business Need AI? An Honest Checklist | Mar 22, 2026 | AI |
| what-is-ai-consulting | What Is AI Consulting? | -- | AI |
| ai-for-small-business | AI for Small Business | -- | AI |
| umlaut-secure-app-award | Umlaut Secure App Award | -- | Company |
| what-does-app-cost | What Does an App Cost? | -- | Dev |
| why-we-started-forgingapps | Why We Started ForgingApps | -- | Company |

## Configuration

- \package.json\ — Scripts, runtime deps, and app metadata
- \
ext.config.ts\ — \output: 'export'\ static build
- \	sconfig.json\ — Strict TypeScript config with \@/*\ alias
- \	ailwind.config.ts\ — Forge color palette and font tokens
- \postcss.config.js\ — Tailwind + Autoprefixer
- \.github/workflows/deploy.yml\ — Cloudflare Pages deploy pipeline
- \.github/workflows/pr-agent.yml\ — PR review automation
- \DEPLOYMENT.md\ — Cloudflare Pages setup guide

## Library (lib/)

- \lib/i18n/\ — Full i18n system (see above)
- \lib/ember-api.ts\ — Ember/chat API client
- \lib/ember-config.ts\ — Ember chat configuration
- \lib/veloura-config.ts\ — Veloura demo configuration
- \lib/veloura-demo-config.mjs\ — Veloura demo shop config (ESM)
- \lib/veloura-shop-data.ts\ — Veloura demo shop product data
- \lib/chat-format.mjs\ — Chat message formatting utilities
- \lib/product-actions.mjs\ — Product action helpers

## Assets

- \/public/\ — Static deployment assets, SEO files, and icons
- \/public/favicon.svg\ — Site favicon (updated brand assets)
- \/public/logo.svg\ — New SVG logo (replacing anvil emoji)
- \/public/og-image.svg\ — Open Graph image (updated branding)
- \/public/robots.txt\ — Search crawler rules
- \/public/sitemap.xml\ — Sitemap
- \/public/_headers\, \/public/_redirects\ — Cloudflare/static hosting directives

## Deployment

- **URL:** https://forgingapps.com
- **Method:** GitHub Actions builds and deploys static export to Cloudflare Pages
- **CI:** \.github/workflows/deploy.yml\

## Key Contacts / Context

- **Owner:** ForgingApps
- **Repo:** Local repo at ~/projects/forgingapps-website/
- **Related docs:** DEPLOYMENT.md, ~/projects/INDEX.md, ~/SYSTEM-MAP.md

## Website Content Documentation

For a full content and messaging reference for the website, start with:
- `CONTENT-MANUAL.md`

Use it for:
- page-by-page content inventory
- pricing/offer reference
- CTA structure
- blog inventory
- EN/BG content mapping
- demo/Veloura/Ember website-content context

