# Deployment Guide — Cloudflare Pages

## One-Time Setup (5 minutes)

### 1. Create Cloudflare API Token

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → My Profile → API Tokens
2. Create Token → Use template: **Edit Cloudflare Pages**
3. Copy the token — you won't see it again

### 2. Get Account ID

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Right sidebar: copy **Account ID**

### 3. Create Cloudflare Pages Project

1. Go to Workers & Pages → Pages → Create a project
2. Connect to Git → Select `forgingapps-website` repo
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Click Save and Deploy (first deploy from UI)
5. Note the project name (default: `forgingapps-website`)

### 4. Add GitHub Secrets

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add two secrets:
   - `CLOUDFLARE_API_TOKEN` — the token from step 1
   - `CLOUDFLARE_ACCOUNT_ID` — the account ID from step 2

### 5. Test

Push any commit to `main`. GitHub Actions will build and deploy automatically.

## After Setup

- Every push to `main` → auto-deploys to production
- Every PR → deploys a preview URL (posted as a PR comment)
- Build takes ~2 minutes

## Custom Domain

1. Cloudflare Pages dashboard → your project → Custom domains
2. Add `forgingapps.com` + `www.forgingapps.com`
3. Cloudflare handles SSL automatically
