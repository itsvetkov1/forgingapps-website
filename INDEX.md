# ForgingApps Website — Project Index
**Last indexed:** 2026-04-01 15:00
**Type:** Next.js 15 static marketing site
**Purpose:** Marketing site for ForgingApps covering services, AI consulting, portfolio, blog, contact flow, and an embedded Veloura support demo.

## Tech Stack
- **Framework:** Next.js 15 App Router with static export
- **Styling:** Tailwind CSS 3.4 + global CSS
- **Language:** TypeScript + React 19
- **Hosting:** Cloudflare Pages (`out/` export)

## Key Pages / Features
- `/app/page.tsx` — Homepage with pricing tiers, credentials, and CTA flow
- `/app/services/page.tsx` — Full package catalog, pricing, delivery, and payment terms
- `/app/ai-consulting/page.tsx` — AI consulting offer page
- `/app/portfolio/page.tsx` — Portfolio / proof page
- `/app/about/page.tsx` — Company background and positioning
- `/app/blog/page.tsx` — Blog index
- `/app/blog/ai-for-small-business/page.tsx` — Blog article
- `/app/blog/umlaut-secure-app-award/page.tsx` — Blog article
- `/app/blog/what-does-app-cost/page.tsx` — Blog article
- `/app/blog/why-we-started-forgingapps/page.tsx` — Blog article
- `/app/contact/page.tsx` — Contact page with brief form and FAQ
- `/app/demo/veloura-support/page.tsx` — Embedded AI support demo page
- `/app/privacy/page.tsx` — Privacy policy
- `/app/terms/page.tsx` — Terms page

## Configuration
- `package.json` — Scripts, runtime deps, and app metadata
- `next.config.ts` — Enables `output: 'export'` static build
- `tsconfig.json` — Strict TypeScript config with `@/*` alias
- `tailwind.config.ts` — Forge color palette and font tokens
- `postcss.config.js` — Tailwind + Autoprefixer
- `.github/workflows/deploy.yml` — Cloudflare Pages deploy pipeline
- `.github/workflows/pr-agent.yml` — PR review automation
- `DEPLOYMENT.md` — Cloudflare Pages setup guide

## Assets
- `/public/` — Static deployment assets, SEO files, and icons
- `/public/favicon.svg` — Site favicon
- `/public/og-image.svg` — Open Graph image
- `/public/robots.txt` — Search crawler rules
- `/public/sitemap.xml` — Sitemap
- `/public/_headers`, `/public/_redirects` — Cloudflare/static hosting directives

## Deployment
- **URL:** `https://forgingapps.com`
- **Method:** GitHub Actions builds and deploys static export to Cloudflare Pages
- **CI:** `.github/workflows/deploy.yml`

## Key Contacts / Context
- **Owner:** ForgingApps
- **Repo:** Local repo at `~/projects/forgingapps-website/`
- **Related docs:** `DEPLOYMENT.md`, `~/projects/INDEX.md`, `~/SYSTEM-MAP.md`
