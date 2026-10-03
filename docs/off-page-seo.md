# Off-page and local SEO plan

Everything here happens outside the codebase. Keep the firm's Name, Address and Phone (NAP) **identical** everywhere, copied from `src/data/firm.js`.

## ICAI guard
Chartered accountants are restricted by the ICAI Code of Ethics from certain solicitation and advertising. Before using any listing, review, post or outreach below, confirm with the partners that it complies with current ICAI guidelines. Keep claims factual. Do not use "best", "No.1", "guaranteed", price comparisons or unverifiable claims. Do not buy or incentivise reviews.

## 1. Google Business Profile (highest priority for local search)
- Primary category: Chartered accountant. Secondary: Tax consultant, Accountant, Tax preparation service
- Add: services list (match service names on the site), opening hours, website URL, phone, photos of the office and team (with consent), short description in plain words
- Add the appointment link: `https://phmgindia.com/book-consultation`
- Ask real clients to leave reviews (no pressure, no incentives). Reply to every review, positive or negative, without sharing client details
- Post about once a week: a compliance reminder, a new guide, a due date
- Answer Q&A; seed it with the real questions clients ask
- Once there are real reviews, add the verified rating to `firm.googleRating` and the reviews to `firm.testimonials` (only with consent)

## 2. Directory and citation listings
Create profiles with identical NAP and a link to the site. Only list services actually offered.

| Listing | Notes |
|---|---|
| ICAI "Find a CA" / firm directory | Official; confirm firm details are current |
| Bing Places | Import from Google Business Profile |
| Apple Business Connect | Shows in Apple Maps |
| JustDial | Free listing, verify by phone |
| Sulekha | Free listing |
| IndiaMART | Only if relevant services fit |
| LinkedIn company page | Add website, description, partners |
| Facebook / Instagram / YouTube | Add links to `firm.social` in `src/data/firm.js` so they appear in structured data |
| Clutch / local business directories | Optional |

Track each listing (URL, date, login owner) in a shared sheet. Re-check NAP twice a year.

## 3. Links and mentions (earn, do not buy)
- Publish the useful tools (`/tools`) and the tax calendar; these attract natural links. Share them with relevant communities and associations
- Offer expert commentary to business and startup publications on due-date changes and Budget announcements, within ICAI rules
- Submit guest articles to local chambers of commerce, trade associations and startup communities that the firm genuinely works with
- Cite official `.gov.in` sources in articles (already done); fix any that move
- Avoid link schemes, paid links and mass directory submissions: they risk a manual penalty

## 4. Social and email
- Share each new guide on LinkedIn from the partners' profiles
- Use the newsletter (`/api/newsletter` collects sign-ups by email) for monthly due dates. Move to a mailing-list provider when volume grows, and keep an unsubscribe in every email
- Keep UTM-tagged links (`?utm_source=linkedin&utm_medium=social`) in posts to see what drives enquiries in GA4

## 5. Monitoring
- Search Console: weekly check of queries, pages and indexing problems
- Rank tracking for the primary keywords in `docs/keyword-map.csv` (any tool), monthly
- Review the Google Business Profile insights monthly (calls, direction requests, website clicks)
