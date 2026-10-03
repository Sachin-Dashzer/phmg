# Launch checklist – phmgindia.com

Work top to bottom. Do not point the real domain at the site until sections 1–3 are done.

## 1. Content the client must supply (blockers)
All values live in `src/data/*`. Search for `TODO: CLIENT TO CONFIRM`.
- [ ] `firm.js`: registered name, ICAI Firm Registration No., founding year, phone, WhatsApp, email, hours, office address, map coordinates, social links
- [ ] `team.js`: partner/team names, credentials, photos, bios (the `/team` page is `noindex` until this has entries)
- [ ] `firm.js` `stats`: only real numbers (years, clients, returns filed). Empty values are hidden.
- [ ] `firm.js` `testimonials` / `googleRating`: only real, consented reviews (leave empty otherwise)
- [ ] `cities.js`: confirm Delhi NCR is served; add other cities only with unique local content
- [ ] Fee policy: if "starting from" prices are approved, add them. Otherwise leave `/pricing` as is.
- [ ] Legal text in `legal.js` reviewed by the firm / its legal adviser
- [ ] Disclaimer wording checked against current ICAI website guidelines (no superlatives, guarantees, comparisons)
- [ ] Partners have verified every tax/law statement, rate and due date on service pages, articles, `/tax-calendar` and `taxSlabs.js`
- [ ] Real author and reviewer names, and real publish dates, for articles (`src/data/insights.js`)
- [ ] Logo (SVG) and brand colours, if different from the placeholders (`Logo` in `Header.js`, `src/app/icon.svg`)

## 2. Accounts and environment
- [ ] Hosting set up (see README: Vercel or VPS)
- [ ] Production env vars set: `NEXT_PUBLIC_SITE_URL=https://phmgindia.com`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (a verified Resend domain), `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`
- [ ] DNS: apex `phmgindia.com` serves the site; `www` redirects to the apex (a redirect is already in `next.config.mjs`); HTTPS certificate active; HTTP redirects to HTTPS at the host/CDN
- [ ] Email deliverability: SPF, DKIM and DMARC records for the sending domain

## 3. Pre-launch testing (on the production build)
- [ ] `npm run lint`, `npm test`, `npm run build` all clean
- [ ] `npx next start`, then `npm run check:seo -- http://localhost:3000` passes
- [ ] Submit a real enquiry from: home hero, a service page, `/contact`, `/book-consultation`. Confirm the email arrives, the thank-you page shows, and a bad phone number shows an error
- [ ] Newsletter box sends a subscription email
- [ ] Submit the form 6 times quickly: the 6th is rate limited
- [ ] Mobile at 360px and 390px: no horizontal scroll, sticky Call / WhatsApp / Enquire bar works, header menu opens, forms usable with the keyboard open
- [ ] Keyboard only: skip link, menu, FAQ accordions, forms, cookie banner
- [ ] Lighthouse mobile on home, one service page and one article: Performance ≥ 95, Accessibility ≥ 95, Best Practices 100, SEO 100 (re-run on the live URL; lab scores vary by a few points)
- [ ] Rich Results Test (search.google.com/test/rich-results) on: home (Organization), a service page (Service, FAQ, Breadcrumb), an article (Article), a calculator (WebApplication). Fix any errors
- [ ] No `lorem ipsum`, TODO text, or placeholder phone/address visible on any page (`check:seo` flags these)
- [ ] `https://phmgindia.com/robots.txt` allows crawling and lists the sitemap; **no `noindex` leakage**: view source on home, a service page and an article and confirm there is no `noindex`. Only `/thank-you`, `/careers`, empty categories and `/team` (while empty) should be `noindex`
- [ ] `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/manifest.webmanifest` load
- [ ] 404 page shows for a made-up URL and returns status 404
- [ ] If analytics IDs are set: banner appears, nothing loads before Accept, events (`generate_lead`, `click_call`, `click_whatsapp`, `calculator_use`) appear in GA4 DebugView after Accept
- [ ] Broken-link crawl of the live site (`check:seo` checks internal links; also run an external-link check on `.gov.in` links in articles)

## 4. Go live
- [ ] Deploy, then point DNS
- [ ] Re-run `check:seo` against `https://phmgindia.com`
- [ ] If an old site existed: add 301 redirects to `src/data/redirects.mjs`, redeploy, spot-check the top old URLs

## 5. First week after launch
- [ ] Google Search Console: add the domain property, verify (DNS TXT or `NEXT_PUBLIC_GSC_VERIFICATION`), submit `https://phmgindia.com/sitemap.xml`, request indexing for home and the top service pages
- [ ] Bing Webmaster Tools: import from Search Console, submit the sitemap
- [ ] Google Business Profile: create and verify (see `docs/off-page-seo.md`); make name, address, phone identical to `firm.js`
- [ ] GA4: mark `generate_lead` as a key event; set up a Search Console link
- [ ] Add the live site URL to the LinkedIn page and other profiles
- [ ] Check Search Console "Pages" report for unexpected `noindex` or "Crawled, not indexed" patterns after two weeks

## 6. Ongoing
See `docs/content-calendar.md`: quarterly content review, Budget-time updates to `taxSlabs.js`, monthly due-date check.
