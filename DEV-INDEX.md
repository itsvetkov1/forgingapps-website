# ForgingApps Website — Developer Index
**Last indexed:** 2026-04-01 15:00
**Type:** Next.js 15 / TypeScript

## Architecture
- **Framework:** Next.js 15 App Router with static export
- **Pattern:** Route-per-page marketing site with shared layout and reusable section components
- **Styling:** Tailwind CSS + `app/globals.css`
- **State management:** Local React state only
- **Data fetching:** No internal data layer detected; content is static in code

## Directory Structure
```text
app/
├── layout.tsx                 # Root layout, metadata, fonts, navbar/footer
├── page.tsx                   # Homepage
├── services/page.tsx          # Service package catalog
├── contact/page.tsx           # Contact page and FAQ
├── demo/veloura-support/      # Embedded AI support demo
├── blog/                      # Blog index + article routes
├── about/ portfolio/          # Marketing proof pages
└── privacy/ terms/            # Legal pages
components/
├── Hero.tsx                   # Shared hero banner
├── Navbar.tsx                 # Desktop/mobile nav
├── Footer.tsx                 # Site footer
├── ServiceCard.tsx            # Pricing / offer card
├── ContactForm.tsx            # Formspree-backed lead form
├── StructuredData.tsx         # JSON-LD SEO metadata
└── VelouraChatEmbed.tsx       # Embedded demo chat experience
public/
└── static SEO assets + Cloudflare headers/redirects
.github/workflows/
├── deploy.yml                 # Cloudflare Pages deploy
└── pr-agent.yml               # AI PR review automation
```

## Entry Points
- `/app/layout.tsx` — Root metadata, font setup, `StructuredData`, `Navbar`, `Footer`
- `/app/page.tsx` — Homepage route entry
- `/app/services/page.tsx` — Pricing / package detail route
- `/app/contact/page.tsx` — Lead capture route
- `/app/demo/veloura-support/page.tsx` — AI demo route

## Components
- `Hero.tsx` — Shared hero banner with CTA/badge variants
- `Navbar.tsx` — Sticky nav with mobile menu state
- `Footer.tsx` — Shared footer and site links
- `ServiceCard.tsx` — Reusable offer card used on homepage/services
- `ContactForm.tsx` — Client-side form posting JSON to Formspree
- `StructuredData.tsx` — Injects org/site schema into `<head>`
- `VelouraChatEmbed.tsx` — Embedded branded support demo container

## API Routes / Endpoints
- No internal `/api` routes found
- External form endpoint: `POST https://formspree.io/f/xlgwoabo` from `components/ContactForm.tsx`

## Data Models / Schema
- No database or server-side schema detected
- Structured data only: `ProfessionalService` and `WebSite` JSON-LD in `components/StructuredData.tsx`

## Tests
- **Location:** No test directories found
- **Framework:** none detected
- **Run command:** none configured
- **Coverage:** not configured
- ⚠️ No tests found

## Build & Deploy
- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Start:** `npm run start`
- **Deploy:** GitHub Actions → Cloudflare Pages static deploy (`out/`)
- **CI config:** `.github/workflows/deploy.yml`, `.github/workflows/pr-agent.yml`
- **Env vars needed:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `OPENAI_KEY` (for PR Agent), `GITHUB_TOKEN`

## Dependencies (key ones)
| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.0.0 | App framework + static export |
| react | ^19.0.0 | UI runtime |
| react-dom | ^19.0.0 | DOM rendering |
| tailwindcss | ^3.4.1 | Utility-first styling |
| lucide-react | ^0.575.0 | Icon set |
| typescript | ^5.3.3 | Type checking |

## Technical Debt / TODOs
- No `TODO`, `FIXME`, or `HACK` markers found in scanned files
- No README.md found at project root
- Contact form depends on external Formspree endpoint from client-side code
- No automated tests or validation pipeline beyond build/deploy and PR agent

## Website Content Documentation

When you need the current website copy, pricing language, offer structure, blog inventory, or content ownership map, read:
- `CONTENT-MANUAL.md`

This is the main human-readable content reference for the ForgingApps website.

