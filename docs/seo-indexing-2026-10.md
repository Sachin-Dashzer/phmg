# Indexing clean-up and internal linking — October 2026

Written against the Search Console state of 19 October 2026. The previous round of work is in
`seo-changes-2026-10.md`; this round is about getting the pages that round created indexed.

## What Search Console actually said

- **Indexed: 41 pages.** Only 8 of them were pages on this site. The other 33 were URLs from the
  WordPress theme the domain used to run.
- **Not indexed: 125.** 19 as *Not found (404)*, 6 as *Page with redirect*, 21 as
  *Crawled – currently not indexed*, and **79 as *Discovered – currently not indexed***.
- The sitemap was read successfully and `robots.txt` was fine.

The 79 are the number that mattered. "Discovered, currently not indexed" means Google found the
URL and decided it was not worth spending a crawl on. Those pages were reachable only through the
header menu and the footer, which are on every page and therefore carry little weight per link.
Nothing in the body of an indexed page pointed at them.

The 8 indexed pages were `/`, `/about`, `/contact`, `/industries`, `/ca-in-delhi`, `/download`,
`/tools/emi-calculator` and `/knowledge-bank/calculators/emi-calculator`.

## Redirects and 410s

Old WordPress URLs now live in `src/data/legacy-urls.mjs` and are answered by `src/proxy.js`.

They are deliberately **not** in `next.config.mjs` `redirects()`. Next applies the
`trailingSlash: false` normalisation in the same pass as the config redirects, and every URL
Google knows carries a trailing slash, so handling them there produced a chain:

```
/about-us/  ->  /about-us  ->  /about        (two hops, measured)
```

`skipTrailingSlashRedirect: true` hands trailing slashes to proxy, which strips the slash and
resolves the old-URL table in the same step, so each one answers in a single 308. Proxy also took
over the ordinary `/x/` → `/x` canonicalisation for the rest of the site, since Next no longer
does it.

`src/data/redirects.mjs` keeps only the structural redirects, the ones whose destination is
decided by this site's routing rather than the old site: `/locations/:city` → `/ca-in-:city`,
`/tools/*` → `/knowledge-bank/*`, and the closed Mumbai branch. Those run before proxy, so the two
files must not overlap — an overlap is what initially sent `/teams/piyush-mishra/` to `/team`
instead of to that partner's own page.

Theme demo pages with no equivalent (`/onepage-*`, `/portfolios/*`, `/portfolio-category/*`,
`/hello-world*`, `/woo-product-*`, date archives, `/*/feed`, and the five lorem-ipsum post slugs)
return **410 Gone** with a small page linking `/`, `/services` and `/contact`. Google drops a 410
faster than a 404. `scripts/seo-audit.mjs` checks every 410 pattern against the live sitemap, so
none of them can start matching a real page without the audit failing.

Stray WooCommerce cart parameters (`?add-to-cart=`) are dropped rather than left to spawn a
crawlable variant of every URL they are appended to.

### Two requests in the brief that were not followed

1. **`/knowledge-bank/calculators/emi-calculator` → `/tools/emi-calculator`.** This is the reverse
   of the live structure. `/tools/*` has redirected to `/knowledge-bank/calculators/*` since
   October 2026, so adding the reverse rule would have created a redirect loop. `/knowledge-bank`
   stays canonical and the duplicate Google has indexed at `/tools/emi-calculator` is resolved by
   the existing redirect, which is the same outcome the brief wanted.
2. **Splitting the sitemap into an index.** 131 URLs is far inside the 50,000-URL limit, and the
   brief asked for it only "if it's easy". It would mean converting `sitemap.js` into a route with
   `generateSitemaps` and five segments, for no crawl benefit at this size.

## Internal linking

`src/lib/internal-links.js` holds one map of contextual links and **one descriptive anchor per
URL**. Most of it is derived from the existing data files, so a new service or article is covered
without editing it. `src/components/ui/RelatedLinks.js` renders the block: server-rendered, plain
`next/link`, no `nofollow`, no JS-only links. It is on every template.

The block is *complementary* to what a template already renders. A service page already lists its
own documents and sibling cards, so its entry adds the parent hub, the guides that point at it,
the sectors that need it and the booking page, rather than repeating the page's own grid.

Four template bugs were suppressing links and were worth more than the block itself:

| Where | What was wrong |
|---|---|
| `/download` | Listed a checklist for all 37 services but linked none of them. It is indexed, so this was the single biggest missed route into the service pages. |
| `/industries` | Each card was one big `<Link>`, which left no room to link the services a sector needs. |
| `TeamSection` | Linked `/team` for every partner, so all five profile pages had no inbound body link anywhere. |
| `/industries/[slug]` | Sibling list was `.slice(0, 4)` off the front of `industries.js`, so sectors further down the file never appeared as anyone's sibling. |

Home also shows six guides rather than three, with topic links to the category pages, and insight
articles carry an in-text link to their service in the opening standfirst.

### Measured effect

Counted inside `<main>` only, excluding the shared CTA band. The header and footer are excluded on
purpose: they link to everything, so counting them would make every page look well linked and the
orphan report would be useless.

| | Before | After |
|---|---|---|
| In-body internal links across the site | 1,325 | 2,810 |
| Median inbound links per page | 6 | 13 |
| Fewest inbound links on any page | 0 | 3 |
| Pages under 3 inbound links | 19 | 0 |
| Pages with no link from an indexed page | 63 | 0 |
| Audit problems | 81 | 0 |

## Verification

`scripts/seo-audit.mjs` replaces `scripts/check-seo.mjs` and carries over all of its checks, so
there is one crawler rather than two that drift. `npm run check:seo -- <base-url>` against a
production build or the live site. It writes `seo-audit-report.md` and exits non-zero on any
problem.

It records status, canonical, robots meta and `X-Robots-Tag`, title and description length and
uniqueness, h1 count, word count inside `<main>`, JSON-LD types and validity, inbound in-body link
counts and orphans, and asserts that each of the 71 old URLs is either a single-hop permanent
redirect to a 200 or a 410. Expectations come from `legacy-urls.mjs` rather than being restated,
so the tables cannot drift from the test.

`src/lib/internal-links.test.js` (`npm test`) checks the two properties offline: one anchor text
per URL, and nothing left unreachable from an indexed page.

### The ICAI check

It looks for superlatives **used as a claim**, not for the words themselves. The first version
matched `best` on its own and flagged seven pages that were all ordinary English — "the best way
to avoid delay", "best-judgment assessment" (the statutory term in Section 144), "returns are not
guaranteed", "the largest saving comes from closing the books". An audit that cries wolf gets
ignored, which is worse than not checking. There are no genuine ICAI wording problems in the
content: no superlatives about the firm, no comparisons with other firms, no testimonials
(`firm.testimonials` is empty), no success rates and no guarantees.

## Titles and descriptions

All 131 pages are inside the 50-60 character title window and the 140-160 character description
window, and both are **failures** in the audit rather than warnings, so a page falling out of
either is caught as a regression.

Getting there was structural first and editorial second:

- `withBrand` in `src/lib/seo.js` appended `" | PHMG & Associates"` or nothing at all, so a
  41-character title lost the brand entirely for being one character over the limit. It now takes
  the longest real rendering of the firm's name that fits. **74 short titles became 20.**
- The remaining 20 were fixed by saying something more useful, not by padding: the generated
  patterns for industry pages (`… in India`), insight categories (`… Guides for Indian
  Businesses`) and partner pages were lengthened, the four city titles gained their locality
  (Sector 59, Rohini, Cheema Chowk, Mohiuddinpur), and a dozen individual titles were rewritten.
- The 32 short descriptions were extended with real detail. The seven insight category pages had
  been sharing one generated sentence with a single word swapped — near-duplicate text — and now
  carry a purpose-written `metaDescription` each, in `src/data/insights.js`.
- `describe()` on the partner pages was already adaptive, targeting a 120-158 window; it was
  retargeted to 140-160 and allowed a fourth focus area.

Three brand-suffix rungs cannot cover every base length. The windows a new title has to sit in are
documented at `withBrand` in `src/lib/seo.js`; base lengths of 18-29 and 41-42 come out short and
the audit will fail on them.

## Known, deliberate gaps

- The pre-existing content debt `scripts/check-content.mjs` reports (a few older service pages
  with short `sections`, two `related` slugs pointing at unpublished services) is unchanged and
  still warns rather than fails. The `related` slugs are filtered out at render, so no link is
  broken; the related-links block covers those pages regardless.

## After deploying

In Search Console:

1. Resubmit `https://www.phmgindia.com/sitemap.xml`.
2. **Page indexing** → **Validate fix** on *Not found (404)*, then on *Page with redirect* and
   *Crawled – currently not indexed*.
3. **URL Inspection → Request indexing**, roughly 10 a day. Start with
   `/services/gst/gst-registration`, `/services/income-tax/itr-filing`,
   `/services/business-registration/private-limited-company-registration`, `/ca-in-noida`,
   `/services/gst`, `/services/income-tax`, `/services/audit-assurance`, `/team`, `/locations`,
   `/insights`. Then the remaining service pages, then the guides.
4. Optional: **Removals → Temporary removal**, prefix option, for
   `https://phmgindia.com/portfolios/`, `/portfolio-category/`, `/onepage-` and `/team-category/`.
   This hides the old theme URLs from results while the 410s take effect.
5. Submit the same sitemap in Bing Webmaster Tools.
6. Check Page indexing again after two to four weeks.
