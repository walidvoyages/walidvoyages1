# Walid Voyages 2026 — Website + Admin

**Stack:** Astro 5 + Firebase Realtime Database / Auth + Cloudinary + GitHub Pages. Responsive desktop/mobile/tablet.

## Quick start

```bash
npm install
npm run dev
npm run build
```

Project Firebase: `walidvoyages-13332`, Realtime Database: `https://walidvoyages-13332-default-rtdb.firebaseio.com`, Cloudinary cloud: `xvncs8ud`.

**IMPORTANT** The SVG hero is a placeholder. Replace it in Admin with a licensed Cloudinary image and replace the symbolic brand mark with the **real, unchanged Walid Voyages logo** (not supplied with this project).

## Critical Firebase setup BEFORE use

1. Firebase Auth → Email/Password enabled, create authorized user with UID `LbAdOIWphiaJH9TAqzPyKKadiXk2`.
2. Realtime Database → Data: confirm `admins/LbAdOIWphiaJH9TAqzPyKKadiXk2` = `"admin"` (string).
3. Realtime Database → Rules: **replace previous rules** with the content of `firebase-rules.json`. Previous rules expose drafts and cannot safely be used unchanged. This project's content uses new nodes `public/` and `drafts/`.
4. Auth → Authorized domains: add `www.walidvoyages.com` and optionally GitHub Pages staging domain.
5. Admin URL: `/admin/`. No passwords in git or chats.

## Publishing process

- Admin writes published records to `public/{omra|hotels|articles|...}/{id}`. Drafts go to private `drafts/{collection}/{id}`.
- Public listing UI receives updates from Firebase immediately. Static blog article pages and their meta descriptions are **regenerated hourly** by `.github/workflows/deploy.yml`. A newly published article may take up to approximately one hour plus build duration to get its own indexable URL. Google indexing takes longer and is never guaranteed.
- To refresh immediately: GitHub → Actions → Deploy Walid Voyages → Run workflow. The admin does NOT yet have a "force rebuild now" button.
- Avoid editing URL slugs after article publication: existing inbound links may break without redirect support.
- SEO Manager data stored in Firebase can be edited, but this starter only generates SEO meta from the `articles` items at build time; other page-level SEO entries are **not applied automatically** until their mapping is implemented.
- Draft management: saving drafts is supported but the current admin list only shows **published** records; draft listing/editing is not yet implemented.

## Cloudinary signed upload

Cloudinary uploads need the small Cloudflare Worker in `cloudinary-worker/`.

```bash
cd cloudinary-worker
npm install
npx wrangler login
npx wrangler secret put CLOUD_API_SECRET
npm run deploy
```

Never put the API secret in source, GitHub public variables, browser, Firebase Realtime Database, or messages. Put the deployed Worker URL in GitHub repository Settings → Secrets and variables → Actions → **Variables** → `PUBLIC_UPLOAD_API`; builds publish the variable to the browser. Worker verifies Firebase ID token and required admin UID before signing uploads. Adjust ALLOWED_ORIGIN for staging as needed. CORS does **not** replace auth.

## Hosting, DNS, deployment

1. Push this project to a new GitHub repo, branch `main`.
2. Repo Settings → Pages → Source: **GitHub Actions**.
3. Repo Settings → Pages → Custom domain: `www.walidvoyages.com`.
4. At Hostinger DNS, create CNAME `www` → `walidvoyages.github.io` **only if your GitHub owner is `walidvoyages`**. Follow GitHub's latest documentation for apex A/AAAA records and redirect to `www`. Do not modify old `walid-voyages.com` DNS.
5. Enable HTTPS when available. Preserve email MX/SPF/DKIM.
6. GitHub Actions build and deploy automatically on push and hourly schedule.

## Flight/hotel search deep link — IMPORTANT

The new homepage form collects user details and opens the original booking website. **It currently does not transfer the values automatically**, because the proprietary booking engine's supported parameters/API have not been verified. `sessionStorage` saves intent in the new domain only; the old domain cannot read it. To enable correct transfer, obtain the provider's documented deep-link URL or booking API and then set `PUBLIC_FLIGHTS_SEARCH_URL` / `PUBLIC_HOTELS_SEARCH_URL` in GitHub Variables and adjust parameter naming to the provider contract. Do not invent or automate forms across cross-origin pages.

## Remaining production work

- Add real logo, licensed photos, approved legal/privacy pages and data retention notices.
- Implement page-level SEO manager mapping (currently storage + UI only), drafts listing and scheduled publishing.
- Test Firebase security rules with unauthenticated users and admin; test uploads, mobile layout, accessibility and performance.
- Configure Search Console, GA4, canonical domains, local agency structured data with verified addresses.
- Never hardcode secrets in client-side JavaScript. Firebase Web API key is public configuration; server credentials are not.
