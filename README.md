# PHMG & Associates – phmgindia.com

Website for a chartered accountants' firm, built with Next.js 16 (App Router), plain JavaScript and Tailwind CSS v4. Pages are statically generated; the only server code is the form handlers in `src/app/api/`.

> Next.js 16 differs from older versions. See `AGENTS.md` and `node_modules/next/dist/docs/` before changing framework-level code.

## Quick start
Requires Node 20.9 or newer (developed on Node 24).

```bash
npm install
cp .env.example .env.local     # then fill in values
npm run dev                    # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm test` | Calculator maths (Node's built-in test runner) |
| `npm run check:seo -- http://localhost:3000` | Crawls a running server: titles, descriptions, canonicals, H1, og:image, JSON-LD, internal links, placeholder text |
| `npm run analyze` | Bundle analyzer |
| `node scripts/keyword-map.mjs` | Regenerates `docs/keyword-map.csv` and flags duplicate primary keywords |

## Environment variables
See `.env.example`.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, structured data (`https://phmgindia.com`) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Enquiry and newsletter emails via Resend. If missing, forms return a 503 in production (and log to the console in development) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp buttons (digits with country code, e.g. `919812345678`). Hidden if empty |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | Analytics. Loaded only after the visitor accepts the cookie banner. No banner shows if both are empty |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification tag |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Reserved, not wired up. Forms currently use a honeypot field and a per-IP rate limit |

`NEXT_PUBLIC_*` values are baked in at build time: change them, then rebuild.

## Where things live
```
src/data/        All editable content: firm, services, content/, categories, industries,
                 cities, insights/, tools, faqs, team, legal, taxSlabs, navigation, redirects
src/app/         Routes (App Router), sitemap, robots, manifest, llms.txt, feed.xml, OG images
src/components/  layout/, ui/, forms/, tools/, seo/
src/lib/         seo.js (metadata), schema.js (JSON-LD), email.js, validators.js, calculators/
docs/            launch-checklist, keyword-map, off-page-seo, content-calendar
scripts/         check-seo.mjs, keyword-map.mjs
```
Theme colours are tokens in `src/app/globals.css` (`@theme`). Tailwind v4 has no `tailwind.config.js`.

## How to…

### Update firm details
Edit `src/data/firm.js`. Anything left empty (phone, address, stats, testimonials) is hidden in the UI and structured data. Never invent numbers, ratings or names.

### Add or publish a service
1. If it is not in the catalog, add a row to `src/data/services.js`: `[category, slug, title, one-line description]`.
2. Add its content to a file in `src/data/content/` (copy an existing entry). Required fields: `h1`, `metaTitle` (≤ 60 chars), `metaDescription` (about 140–158 chars, ends with a call to action), `primaryKeyword`, `secondaryKeywords`, `intro`, `definition` (40–60 words), `whoNeedsIt`, `benefits`, `documents`, `process`, `deadlines`, `mistakes`, `faqs`, `related`. Import the file in `src/data/service-content.js` if it is new.
3. The page, menu, footer, sitemap, `llms.txt` and checklist page update automatically. Run `node scripts/keyword-map.mjs`, `npm run build` and `npm run check:seo`.

A service with no content stays on its category page as an "on request" line and has no URL.

### Add an article
Add an object to a file in `src/data/insights/` (or a new file imported in `src/data/insights.js`). Body blocks are `["h2", text]`, `["p", text]`, `["ul", [items]]` or `["table", { head, rows }]`. Set `category` (one of the slugs in `insightCategories`), `tags`, and `services` (slugs of related services). Add a row to `scripts/keyword-map.mjs`.

### Add a city page
Only for cities the firm genuinely serves. Add an entry to `src/data/cities.js` with **unique** local content: do not copy another city's text and swap the name (Google treats that as a doorway page). The page is served at `/ca-in-{slug}`.

### Add an industry, FAQ, team member or calculator
- Industry: `src/data/industries.js`. FAQ: `src/data/faqs.js`. Team member: `src/data/team.js` (the `/team` page switches from `noindex` to indexed once it has entries and appears in the sitemap).
- Calculator: add pure maths and tests in `src/lib/calculators/`, a runner in `runners.js`, and page copy in `src/data/tools.js`.

### Redirect an old URL
Add `{ source, destination, permanent: true }` to `src/data/redirects.mjs`, then redeploy.

### Add a third-party script or embed
Add its origin to the Content-Security-Policy in `next.config.mjs` first, or the browser will block it.

## Deploy

### Option A: Vercel
1. Import the repository in Vercel (framework: Next.js; defaults are fine).
2. Add the environment variables above for the Production environment.
3. Add the domain `phmgindia.com` and set it as primary. Add `www.phmgindia.com` as an alias: the app already redirects `www` to the apex.
4. Deploy, then work through `docs/launch-checklist.md`.

### Option B: VPS (Node + PM2 + Nginx)
```bash
# on the server (Node 20.9+ installed)
git clone <repo> /var/www/phmg && cd /var/www/phmg
cp .env.example .env.production   # fill values; Next reads .env.production at build and run time
npm ci
npm run build
npm i -g pm2
pm2 start npm --name phmg -- start     # listens on port 3000
pm2 save && pm2 startup
```
Nginx server block (then run `certbot --nginx -d phmgindia.com -d www.phmgindia.com` for HTTPS and the HTTP to HTTPS redirect):
```nginx
server {
  server_name phmgindia.com www.phmgindia.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
Update: `git pull && npm ci && npm run build && pm2 restart phmg`.

Note: the form rate limiter keeps counts in memory, so it resets on restart and is per instance. Use a shared store (e.g. Redis) if you run more than one instance.

## Compliance notes (read before launch)
- **ICAI rules.** Chartered accountants are restricted by the ICAI Code of Ethics from certain solicitation and advertising. Site copy avoids superlatives ("best", "No.1"), guarantees, comparisons and unverifiable claims, and carries a disclaimer. The firm must confirm the wording against the Institute's current website guidelines. No prices are published until the firm approves a fee policy.
- **YMYL content.** Tax and law statements, rates and due dates were written from general knowledge and must be verified by the partners before launch and reviewed every quarter (`docs/content-calendar.md`). Section references are to the Income-tax Act, 1961 unless stated.
- **No fabricated social proof.** Ratings, reviews, client names and counters render only from real data in `firm.js`. Do not add review structured data without real, visible reviews.
- **Privacy.** Analytics are consent-based. Review `src/data/legal.js` with a legal adviser (DPDP Act).

## Docs
- `docs/launch-checklist.md`: everything to finish before and just after going live
- `docs/keyword-map.csv`: one primary keyword per page (no cannibalisation)
- `docs/off-page-seo.md`: Google Business Profile, citations, links
- `docs/content-calendar.md`: quarterly reviews, Budget updates, article backlog
