# SEO and GEO upgrade — October 2026

Branch `seo-geo-upgrade`, six commits, one per phase. This is what changed and why.
Facts a partner needs to confirm are in [`REVIEW.md`](../REVIEW.md), not here.

---

## The 21 new URLs

All 21 were previously unpublished, so none was ever a live URL and no redirects were needed
for them. Confirmed by checking that only 20 slugs had content before this work.

### 17 service pages

| URL | Primary keyword |
|---|---|
| `/services/audit-assurance/bank-audit` | bank statutory audit |
| `/services/audit-assurance/concurrent-audit` | concurrent audit of banks |
| `/services/audit-assurance/stock-audit` | stock audit for banks |
| `/services/audit-assurance/internal-audit` | internal audit services |
| `/services/gst/gst-refund` | gst refund consultant |
| `/services/income-tax/tds-return-filing` | tds return filing services |
| `/services/income-tax/income-tax-appeal` | income tax appeal consultant |
| `/services/international-tax-fema/15ca-15cb` | form 15ca 15cb ca certificate |
| `/services/international-tax-fema/fema-compliance` | fema compliance consultant |
| `/services/international-tax-fema/transfer-pricing` | transfer pricing services india |
| `/services/accounting-bookkeeping/virtual-cfo` | virtual cfo services |
| `/services/accounting-bookkeeping/payroll` | payroll outsourcing services |
| `/services/business-advisory/project-report` | project report for bank loan |
| `/services/ngo-trust/trust-registration` | trust registration |
| `/services/ngo-trust/12a-80g-registration` | 12a and 80g registration |
| `/services/ngo-trust/fcra-registration` | fcra registration consultant |
| `/services/ngo-trust/csr-1-registration` | csr-1 registration |

### 4 city pages

| URL | Primary keyword |
|---|---|
| `/ca-in-noida` | chartered accountant in noida |
| `/ca-in-mumbai` | ca in powai |
| `/ca-in-ludhiana` | chartered accountant in ludhiana |
| `/ca-in-meerut` | ca in meerut |

`/ca-in-delhi` already existed and was refocused off Noida searches.

### Slug changes (none were live)

| Old | New |
|---|---|
| `income-tax/income-tax-appeals` | `income-tax/income-tax-appeal` |
| `international-tax-fema/form-15ca-15cb` | `international-tax-fema/15ca-15cb` |
| `accounting-bookkeeping/virtual-cfo-services` | `accounting-bookkeeping/virtual-cfo` |
| `accounting-bookkeeping/payroll-services` | `accounting-bookkeeping/payroll` |
| `accounting-bookkeeping/cma-data-project-report` | `business-advisory/project-report` |
| `ngo-trust/trust-society-registration` | `ngo-trust/trust-registration` |
| `ngo-trust/csr-fcra-compliance` | split into `fcra-registration` + `csr-1-registration` |
| `income-tax/12a-80g-registration` | `ngo-trust/12a-80g-registration` |

### New redirect

`/locations/:city` → `/ca-in-:city`, permanent. Next emits **308**, not 301 — equivalent for
search engines, and Next uses 308 because it preserves the request method.

---

## Phase 1 — catalog

Retitled `bank-audit` to Bank Statutory Audit and `stock-audit` to Stock Audit for Banks, added
`concurrent-audit`, and made the eight slug changes above. Updated all 8 stale references across
the content, insights and industries data. Removed "12A 80G registration" and "CSR-1 registration"
from `section-8-company`'s secondary keywords and pointed its `related` at the new pages instead,
which was the main cannibalisation risk the brief named.

**Also fixed two things that were already broken on `main`:**

- `npm run lint` failed, with two `react-hooks/set-state-in-effect` errors in `Header.js`. Both
  were "close the menu on route change" effects; they now reset during render, which is React's
  documented pattern for this and removes a cascading render.
- `check-seo` measured words inside `<article>`, but on the service template `<article>` closes
  before the process steps and FAQs, so roughly 500 visible words per page went uncounted and
  **all 20 published service pages failed the 1,200-word gate**. It now measures `<main>` minus
  the shared CTA band (which marks itself `data-seo-skip`), matching the comment the script
  always carried. No content padding was needed: every page cleared the gate once it was
  measuring what a reader actually sees.

---

## Phase 2 — the 17 service pages

All content in `src/data/content/new-services-2026.js`, with each page's in-depth `sections`
inline on its own entry. A second file was not needed: `service-content.js` spreads the content
object after `sections: extraServices[slug]`, so an inline key simply wins.

Every page carries the full README field set plus a key-facts table, question-shaped H2s whose
first paragraph answers the question before the detail, a comparison table, a worked example
labelled illustrative, and an official-sources list. They render at **2,344–3,070 words** inside
the measured area.

The audit and attest pages — bank audit, concurrent audit, stock audit, internal audit — are
written as purely informational, with no promotional framing, since those services are exclusive
to chartered accountants. RBI Category-I and CAG empanelment is stated once, factually, on the
bank audit page. Virtual CFO, payroll and project report describe the service more directly,
being services not exclusive to CAs.

Section numbers are to the Income-tax Act, 1961, with one shared transition note (`ITA_2025_NOTE`)
rendered on the income-tax pages. **No 2025 Act section number is asserted anywhere on the site**;
the mapping gathered during research is in `REVIEW.md` for a partner to confirm first.

### Two supporting changes

- `ArticleBody` gained a `links` block type, so pages can cite official sources as real links
  while the data files stay plain data. `.prose-phmg a` is underlined, not colour-only (WCAG 1.4.1).
- **`scripts/check-content.mjs`** (new) validates every README field rule and the ICAI wording
  list offline: title and description length and uniqueness, the 40–60 word definition, FAQ and
  keyword counts, `related` resolution and cross-category reach, section block shapes, internal
  `/services/` links, and inbound link counts. It caught 23 real problems while the pages were
  being written, including four `related` slugs that looked published but had no content.

---

## Phase 3 — city pages

`offices` in `firm.js` gained `slug`, `street`, `locality`, `region`, `postalCode`, `geo`,
`mapUrl` and `hours`. `cities.js` gained `officeCity`, `branchHead`, `nearby`, `primaryKeyword`,
`secondaryKeywords` and `updatedAt`.

What makes the five pages genuinely different is the real local position rather than reworded
copy — and this is also why the local content is worth reading:

| | GST | Registrar of Companies | Professional tax |
|---|---|---|---|
| Noida, Meerut | Uttar Pradesh | Uttar Pradesh | **None** |
| Delhi | Delhi | Delhi & Haryana | **None** |
| Mumbai | Maharashtra | Maharashtra at Mumbai | Yes, two registrations |
| Ludhiana | Punjab | Chandigarh | Yes, Punjab State Development Tax |

Maharashtra is also the only one of the four states with a Charity Commissioner registering
public trusts, which gives the Mumbai page a genuine local angle on trust registration.

Delhi was refocused off Noida: renamed from "Delhi NCR" to "Delhi", Rohini office and CA Manish
Goel named, and a local section plus an FAQ that answer the Delhi-or-Noida question directly and
link to the Noida page. The "call or WhatsApp today" meta description is gone.

The branch head card renders only when `branchHead` is set, so Delhi and Ludhiana show one and
Noida, Mumbai and Meerut correctly show none rather than a guessed name. "Get directions" renders
only when `mapUrl` is set, so it is absent everywhere until real map links are added.

`OfficesGrid` now links each office to its city page and takes an `exclude` prop, which both gives
the city pages links to each other and updated `/locations` to all five cities from one change.
`keyword-map.mjs` reads city rows from `cities.js`, so the stale `/ca-in-delhi` row that claimed
"ca in noida" and "ca in gurgaon" as secondaries is gone and cannot come back.

---

## Phase 4 — technical SEO

**Sitemap `lastModified`** no longer uses `new Date()` on every URL, which told search engines the
whole site changes on every deploy. Services use `lastReviewed`, articles and cities their
`updatedAt`, static pages a dated constant — three real dates instead of one. `reviewedToISO` in
`lib/seo.js` parses the month-name form and is built in UTC, because `new Date("1 October 2026")`
is local midnight and serialises back a day early in IST. Shared with the schema so the string is
parsed in one place.

**Metadata.** 30 titles and descriptions had ICAI problems — "expert help", "Get a free quote
today", "Talk to a CA today", "Book a free consultation", "no hidden charges". All replaced, each
asserted ICAI-safe and in the 120–158 window before being written. The category pages built their
description as `` `${c.intro} Talk to our chartered accountants – call or WhatsApp today`.slice(0, 158) ``,
which carried urgency *and* could truncate mid-word; each category now carries its own description.

**Schema** (`lib/schema.js`, substantially rewritten): raster `/logo.png` with `image`, a factual
`description` naming both empanelments, `contactPoint`, `knowsAbout`, and one `AccountingService`
node per office at `/#office-{slug}` with `parentOrganization`, referenced via `subOrganization`.
`geo`, `hasMap` and `openingHoursSpecification` appear only when the data is set. `sameAs` carries
only Instagram, YouTube and X — LinkedIn is cleared because the company page did not resolve, and
a `sameAs` pointing at a 404 is worse than an absent one. `numberOfEmployees` is omitted: "50+" is
not a number schema.org can take. `WebSite` on the home page, no `SearchAction`. `Person` per
partner on `/team`. `Service` gained `areaServed` (India plus the five cities), `serviceType`,
`audience` and an ISO `dateModified`. `Article` gained `image`, `publisher.logo` and `inLanguage`.

Two defects were found by reading the rendered output rather than trusting the code:
`streetAddress` repeated the city and PIN that `addressLocality` and `postalCode` already carried,
and `dateModified` was emitting `"October 2026"` instead of a date.

**`reviewedBy`** is wired but empty, by design: `reviewers` maps in `service-content.js` and
`insights.js`. Set a team slug and both the visible line and the schema `reviewedBy` appear.
The visible "Last reviewed" line is now on every service page, which makes the About page's
editorial-policy claim true — it was narrowed to exactly what is shown.

**Images.** `next/image`'s `priority` prop is **deprecated in Next 16** in favour of `preload`, so
the heroes were emitting no `fetchpriority` at all — the LCP hint the code appeared to set was
doing nothing. Per the Next 16 docs they now set `fetchPriority="high"` and `loading="eager"`
directly. Sources recompressed with the `sharp` that ships with Next, so no new dependency:

| File | Before | After |
|---|---|---|
| `who-we-serve.jpg` | 4.75 MB | 196 KB (also capped 4896px → 2400px) |
| `banner.png` → `banner.jpg` | 1.87 MB | 139 KB |
| `images/stock-audit.png` → `.jpg` | 1.98 MB | 187 KB |

8.7 MB → 522 KB. Both PNGs were photographs, which is why they were so large. Re-runnable with
`node scripts/optimise-images.mjs`.

**robots.txt** names the AI crawlers explicitly rather than leaving them to the wildcard: GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot,
Perplexity-User, Google-Extended, Applebot-Extended, CCBot, meta-externalagent, Bingbot. Neither
llms file is disallowed.

**Internal links.** `check-content` now reports any published page with fewer than two inbound
links besides its category page. All 21 new pages pass. The two pre-existing pages that had one
each (`opc-registration`, `trademark-registration`) now have a second from a city page where the
service genuinely belongs. The mega menu and footer already read from `services.js` and
`categories.js` via `navigation.js`, so new pages appeared in them automatically — no change needed.

---

## Phase 5 — GEO

`/llms.txt` expanded with a firm-facts block (name, regulator, established 2014, both
empanelments, head office, phone, email, website), all five offices, all five partners with
qualifications, an "About this content" note on ICAI regulation and the 1961/2025 position, all
five city pages, and services grouped by practice area using each definition's first sentence
rather than the catalog blurb. Still generated entirely from data.

**New `/llms-full.txt`**: the plain-text content of all 37 service pages and 5 city pages, each
section headed by its own URL so a model can cite the right page. Tables render as pipe tables and
official-source links as absolute URLs. 472 KB from one route, generated from the same data the
pages render from.

Entity consistency: "PHMG and Associates" appeared exactly once, in the homepage about section,
and is now "PHMG & Associates". Audited all of `src` for phone and email variants — one of each,
both matching `firm.js`.

---

## Phase 6 — ICAI wording on existing pages

| Was | Now |
|---|---|
| "Your Trusted Partner in Financial Success" | "Chartered Accountants since 2014" |
| "Expert Accounting Solutions for a Stronger Tomorrow" | "Audit, Tax and Advisory for Indian Business" |
| "a leading Chartered Accountant firm" | the factual credentials: established 2014, both empanelments, five offices |
| "Trusted / Expertise" hero badge | "RBI Category-I & CAG empanelled" |
| "Trusted expertise for your financial needs" | "Services across audit, tax and advisory" |
| "Partner-led. Expert-driven." | "Partner-led. Qualified throughout." |
| "Built on integrity, driven by results" | "How we work" |
| "your deadlines never slip" | "due dates are tracked for you with reminders ahead of each one" |
| "Critical work is never left to juniors" | "a partner owns each engagement and reviews the work before it is submitted" |
| "available 24/7" | removed — `firm.js` has no 24/7 channel and no office hours at all |
| "the best way to reduce it" | "the deductions and reliefs available to you" |
| "Talk to a specialist" | "Speak to a chartered accountant" |
| "and specialists" (team composition) | "and support staff" |
| "Specialist work for companies…" | "Work for companies…" |
| "Book Free Consultation" / "Get a free quote" | "Book a consultation" / "Request a quote" |
| "No commitment · Reply within one business day" | "Reply within one business day" |
| "No commitment until you approve the written scope" | "Work begins once you approve the written scope and fee" |
| "Hidden charges added later" | "Charges added after the scope is agreed" |
| "Trusted by banks, PSUs and businesses across sectors" | "Banks, PSUs and businesses we have worked with" |
| "GST Litigation Specialists" (`firm.empanelments`) | "GST Litigation & Advisory" |

Only labels and copy changed — every `href`, form, component and route is untouched, verified in
the built HTML.

**Client list**: `firm.showClientList` added, defaulting to `true`, so nothing changes until a
partner decides. The 16 names stay in the data either way, so the decision is one boolean.

**Fixed the `15++` display bug**: the years seal in the homepage team carousel appended a `+` to a
value already stored as `"15+"`. The seals now read 15+, 10+, 8+, 4+.

**Service counts now agree**: the homepage card counted published pages while the category page
aside counted the whole catalog, so a card said "2 services" against a page listing 11. Both count
published pages, and the category aside now says "service pages in this practice".

---

## Verification

| Check | Result |
|---|---|
| `npm run lint` | passes (was failing on `main`) |
| `npm test` | 10 pass |
| `npm run build` | compiles |
| `npm run check:seo` | **109 pages, All checks passed.** |
| `node scripts/check-content.mjs` | All content checks passed |
| `/locations/:city` redirect | one 308 hop to `/ca-in-:city`, final 200, no loop — all five verified in a running server |

## Follow-up pass — gaps closed

An audit of the delivered work against the brief found six gaps, all since closed.

| Gap | Fix |
|---|---|
| City pages were not linked from the footer, which Phase 4.9 required | An "Offices" column in the footer, built from `cities.js`, so every city page has a site-wide link and a new city appears automatically |
| `geo` and `mapUrl` were on `offices` in `firm.js`, not in `cities.js` as the brief specified | Moved to `cities.js`, where city-page data is edited. The office schema reads them back through `cityByOffice()`, so there is still one source of truth. Verified end to end: setting a test value produced `GeoCoordinates`, `hasMap` and the "Get directions" button; reverting removed all three |
| `audience` was plumbed through to the Service schema but no page set it | An `audiences` map in `service-content.js` covering **all 37** published services, kept in one place so the older content files needed no edits |
| `nri-tax-filing` still listed "Form 15CA 15CB" as a secondary keyword — the cannibalisation pair the brief named | Replaced with "DTAA relief for NRI" and "NRI residential status", which the dedicated 15CA/15CB page does not target |
| Five new pages had no worked example | Added to `income-tax-appeal`, `trust-registration`, `12a-80g-registration`, `fcra-registration` and `csr-1-registration`. On procedural pages the useful example is a dated sequence rather than figures — how the appeal limitation clock runs, why the Form 10AB deadline arrives early, the two-account FCRA mechanics — and each uses only dates and amounts that follow from rules already stated on the page |
| No answer-first pass on existing service pages | 50 headings on the 20 older pages ran straight into a bullet list or table with nothing answering the heading. Each now has one leading sentence that summarises what the list says. Purely additive: no existing sentence was rewritten and no new legal claim introduced |

The recount also caught the same defect on **five of the new pages** — three of them question-shaped headings running straight into a table or list. Those were fixed too, so no content heading anywhere on the site now lacks an answering paragraph. The only headings without one are the 51 structural labels ("Key facts", "Related reading", "Official sources"), each of which heads a table or link list by design.

### Known, deliberate gap

`node scripts/check-content.mjs --all` is still red. The default run gates this round's pages and
warns on older ones; `--all` promotes the warnings and reports ~90 items of pre-existing
structural debt on the 20 older service pages — thin `sections` (146–577 words against the 600
target), no question-shaped H2, no official-sources link block, 4 secondary keywords instead of
5–8, and `related` entries pointing at catalog slugs that have no content. None of this was in
scope, since existing content was not to be rewritten, but it is now measured and therefore
well-defined follow-up work.

---

## New and changed tooling

| File | What it does |
|---|---|
| `scripts/check-content.mjs` | **new** — validates service and city field rules, ICAI wording, link resolution and inbound links, offline. `--all` to include older pages |
| `scripts/optimise-images.mjs` | **new** — recompresses heavy images in `public/` with the bundled `sharp`, asserting dimensions never change except by an explicit cap |
| `scripts/check-seo.mjs` | word count now measures `<main>` minus the CTA band, as its comment always described |
| `scripts/keyword-map.mjs` | city rows read from `cities.js` instead of a hand-maintained list |
| `src/data/*.js` | imports carry `.js` extensions so node scripts can import the data directly |

---

## Manual steps after deploy

These cannot be done from the repository. In rough priority order.

### 1. Before you deploy

- **Delete or move `public/phmg-main.zip`.** It is a 10.5 MB archive sitting in `public/`, which
  means a deploy from this working directory would publish it at `/phmg-main.zip`. It is in
  `.gitignore` now, so it is out of git, but it is still on disk.
- Confirm the highest-priority facts in [`REVIEW.md`](../REVIEW.md) — the Section 138 thresholds,
  the Form 10AB "whichever is earlier" deadline, and the labour codes commencement dates.
- Read the new homepage hero copy and the CTA wording, which are the most visible changes.

### 2. Search engines

- **Google Search Console**: submit `https://phmgindia.com/sitemap.xml`.
- **Bing Webmaster Tools**: submit the same sitemap. Bing also accepts an import of the Search
  Console configuration, which is quicker than setting it up twice.
- **Request indexing for the 21 new URLs** listed at the top of this document. In Search Console
  this is the URL Inspection tool, one URL at a time; there is a daily quota, so expect to spread
  them over two or three days. Bing's URL submission takes several at once.
- Check Search Console's Pages report a week later for anything reported as "Discovered – currently
  not indexed", which on a new set of pages usually means internal linking rather than quality.

### 3. Validate the structured data

Test at least three pages, one of each template, in both tools:

| Page | What to expect |
|---|---|
| `/` | `AccountingService` + `ProfessionalService`, `WebSite`, `FAQPage`, five `AccountingService` office nodes under `subOrganization` |
| `/ca-in-ludhiana` | the organisation, that office's `AccountingService` node, `BreadcrumbList`, `FAQPage` |
| `/services/audit-assurance/bank-audit` | the organisation, `Service` with `areaServed` and `dateModified`, `BreadcrumbList`, `FAQPage` |

- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org validator](https://validator.schema.org/)

Expect the Rich Results Test to report no eligible rich result for `AccountingService` and
`Service` — that is normal, those types have no rich result. What matters is that it reports no
errors. `FAQPage` and `BreadcrumbList` are the two that should be recognised.

### 4. Supply the data that is deliberately missing

Each of these makes something appear that is currently hidden, rather than changing anything:

| Add to | Effect |
|---|---|
| `geo: { lat, lng }` per office in `firm.js` | adds `geo` to that office's schema node |
| `mapUrl` per office in `firm.js` | makes the "Get directions" button appear on that city page |
| `hours` per office in `firm.js` | shows the hours line and adds `openingHoursSpecification` |
| `firm.icaiFrn` | shows the ICAI registration number in the footer and in `/llms.txt` |
| `firm.social.linkedin` | returns LinkedIn to `sameAs` — only once the company page exists |
| `firm.social.googleBusiness` | adds the Google Business Profile to `sameAs` |
| `branchHead` in `cities.js` for Noida, Mumbai, Meerut | shows the branch head card on that page |
| `reviewers` in `service-content.js` / `insights.js` | shows "Reviewed by" and adds schema `reviewedBy` |
| Ludhiana PIN code, Meerut building number | completes those two addresses |

### 5. Google Business Profile

Create or claim a profile for each of the five offices, and make the name, address and phone
match `firm.js` exactly — inconsistent NAP data across profiles is the most common cause of weak
local ranking. Then put each profile URL and each office's coordinates into `firm.js`. See
`docs/off-page-seo.md`.

### 6. Worth watching afterwards

- The `/locations/:city` → `/ca-in-:city` redirects, in Search Console's Pages report: the old URLs
  should drop out and the new ones appear, not both.
- Core Web Vitals on the hero images after the recompression, particularly LCP on mobile.
- Whether `/llms-full.txt` is being fetched, in the server or CDN logs, by the AI crawlers named
  in `robots.txt`. That is the only way to tell whether the GEO work is reaching anything.

---

## October 2026, second round: new sections and the ICAI client-list removal

### What changed

**The client list is gone.** The "Trusted by banks, PSUs and businesses across sectors" strip and
all 16 client names are deleted from the homepage, the services page and the booking page, along
with the `showClientList` flag added earlier. A flag kept the names in the repository one edit away
from publication; naming clients is the ICAI exposure, so the names went with the section. Git
history has them if the position ever changes.

**Every offer-style use of "free" is removed.** "Free Tools", "Free checklists", "Free calculator",
"Free resources", "Free, no obligation", "Share your notice for a free review", "Use these tools
free, no sign-up required". What stayed, deliberately, is the word used in its ordinary or legal
sense, because removing it would make the pages wrong: "free from material misstatement" in an
audit opinion, "collateral-free loans" under CGTMSE, "free of liabilities" on LLP closure, "the GST
portal is free", "tax-free", "free-of-charge service" in the transfer pricing page.

### New pages

| URL | What it is |
|---|---|
| `/gallery` | Office and team photographs in a CSS-column masonry grid, grouped into albums from `src/data/gallery.js`. The video section renders only when video ids are supplied; until then the page links the YouTube channel. Embeds use youtube-nocookie and load nothing until play is pressed, which keeps them consistent with the cookie banner. |
| `/careers` | Rebuilt. Job listings render from `src/data/jobs.js`; with none set the page shows a "no advertised openings" state and still accepts speculative applications. A real application form posts to a new `/api/careers` handler with the same rate limit, honeypot and consent pattern as the enquiry form. |
| `/team/{slug}` | A page for each of the five partners and branch heads, with `Person` structured data. Built from `team.js`, with optional `bio`, `icaiMembership`, `education`, `languages`, `office` and `appearsBefore` fields that each render only when set. Related services are matched from the partner's own focus areas rather than a hand-kept list. |
| `/knowledge-bank` | Replaces `/tools`. Hub for the calculators, the reference tables and the official-sources directory. |
| `/knowledge-bank/calculators/{slug}` | 14 calculators: the 5 that existed, plus GST MRP, TDS, net profit, net worth, effective capital, NSC, home loan with prepayment, loan tenure and RERA delay interest. |
| `/knowledge-bank/utilities/{slug}` | 6 reference tables: income tax rates, the GST rate structure, 80TTA against 80TTB, TDS due dates, PF and ESI rates and dates, and recurring compliance due dates. |
| `/knowledge-bank/official-resources` | A curated directory of 30 official sources, grouped by subject, plus a table of the datasets deliberately **not** reproduced and where to get them. |

### Redirects

`/tools` → `/knowledge-bank` and `/tools/:slug` → `/knowledge-bank/calculators/:slug`. The five
original calculators kept their slugs, so every old URL maps to exactly one new one.

### Knowledge Bank: what was built and what was not

The brief for this section listed roughly 250 items across Calculators, Bulletins, Utilities,
Links, Acts, Rules and Forms. Calculators and Utilities were built properly. The rest was scoped
down deliberately, and the reasoning is worth recording:

- **Acts, Rules and Forms** are link directories. Building them as listed would have meant several
  hundred near-empty pages, each holding a handful of government deep links that cannot be verified
  and frequently break. That is thin content, and it would have been added to a site that had just
  reached a clean SEO pass. They are one curated directory of sources we can stand behind instead.
- **Bulletins** (RBI and SEBI notifications, circulars, departmental updates) are a subscription
  content feed on the sites that carry them. Without a feed those pages would be permanently empty,
  so the official notification pages are linked from the directory rather than mirrored.
- **Eight datasets are explicitly not reproduced** and say so on the page: IFSC and MICR codes,
  daily gold and silver rates, the full HSN and SAC schedules, state stamp duty, the National
  Industries Classification, the cost inflation index, depreciation schedules, and ROC and LLP fee
  slabs. Each links the authority that maintains it. A stale rate table is worse than no rate
  table, and a wrong cost inflation index figure produces a wrong capital gain.

Every calculator's maths is a pure function in `src/lib/calculators/finance.js` with no rate baked
in — every rate is an argument, so a change in the law is a data change rather than a code change.
`finance.test.js` adds 14 tests (24 in total), including the cases that matter: that GST is divided
out of an MRP rather than subtracted from it, that TDS applies to the whole payment once the
threshold is crossed rather than to the excess, that a revaluation reserve never reaches effective
capital, and that a loan instalment below the first month's interest is reported as never clearing
instead of returning a nonsense tenure.

### Verification

| Check | Result |
|---|---|
| `npm run lint` | passes |
| `npm test` | 24 pass (was 10) |
| `npm run build` | compiles |
| `npm run check:seo` | **132 pages, All checks passed** (was 109) |
| `/tools` redirects | 308 to the matching Knowledge Bank URL, verified for the hub and all five original calculator slugs |
| Client names in the HTML | 0 occurrences |
