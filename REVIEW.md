# Review needed before launch

Things a partner must confirm, correct or supply. Written during the SEO/GEO upgrade
(branch `seo-geo-upgrade`, October 2026). Each entry says what to check and where.

Sections:

- [Facts to verify](#facts-to-verify)
- [Income-tax Act 2025 updates needed](#income-tax-act-2025-updates-needed)
- [Missing firm data](#missing-firm-data)
- [Partner decisions](#partner-decisions)
- [Engineering notes](#engineering-notes)

---

## Facts to verify

Every legal or regulatory claim written without full certainty, with the page it appears on
and the official source to check it against. Pages state these conservatively
("as prescribed", "the time limit set by the rules") wherever the exact figure was not certain.

_Filled in during Phase 2 (service pages) and Phase 3 (city pages)._

---

## Income-tax Act 2025 updates needed

The Income-tax Act, 2025 replaced the Income-tax Act, 1961 from 1 April 2026. It uses
"tax year" in place of previous year / assessment year, and renumbers sections and forms.
New pages use the familiar 1961 references in titles, headings and keywords (because that is
how people still search) and name the 2025 Act's equivalent only where it is certain.

This section lists **existing** pages and articles that cite 1961 sections or forms and should
be reviewed. Per the brief, these are listed only — existing legal content was not rewritten.

_Filled in during Phase 6._

---

## Missing firm data

Leave these empty in `src/data/firm.js` / `src/data/cities.js` until confirmed: the UI and the
structured data both hide empty values, so nothing breaks while they are blank.

| What | Where it goes | Notes |
|---|---|---|
| Ludhiana office PIN code | `offices` in `src/data/firm.js` | The profile address ("223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana") has no PIN. Not invented. |
| Meerut office building number | `offices` in `src/data/firm.js` | Address is only "Opp. Canara Bank, Near Mohiuddinpur Sugar Mill, Meerut - 250205". |
| Office hours | `firm.hours` | Currently empty. Needed before `openingHoursSpecification` can go into the office schema. |
| Map links (5 offices) | `mapUrl` per office | Google Maps share link per office. The "Get directions" link on each city page renders only once this is set. |
| Coordinates (5 offices) | `geo: { lat, lng }` per office | From Google Maps. `geo` goes into the office schema only once set. |
| Branch head — Noida | `branchHead` in `src/data/cities.js` | `team.js` does not say who leads the head office. The Founding Partner was **not** named as Noida head because nothing confirms it. |
| Branch head — Mumbai | `branchHead` in `src/data/cities.js` | Not named anywhere. Not invented. |
| Branch head — Meerut | `branchHead` in `src/data/cities.js` | Not named anywhere. Not invented. |
| ICAI Firm Registration Number | `firm.icaiFrn` | Currently empty; the footer line renders only when set. |
| LinkedIn company page URL | `firm.social.linkedin` | **Cleared** during this work: `https://www.linkedin.com/company/phmg-associates` did not resolve to a real page. Restore only once the company page exists, or the `sameAs` in the organisation schema points at a 404. |
| Google Business Profile URLs (5) | `firm.social.googleBusiness` + per office | Needed for local SEO. See `docs/off-page-seo.md`. |
| Reviewer per page | `reviewedBy` on services and articles | Left empty deliberately. Set a team slug per page and the visible "Reviewed by" line and the schema `reviewedBy` both appear. |

---

## Partner decisions

| Decision | Current state | Why it needs a decision |
|---|---|---|
| Client list | `firm.showClientList` defaults to `true`, so the "Trusted by banks, PSUs and businesses across sectors" strip with 16 named clients still renders exactly as before. | Naming clients may fall foul of the ICAI restrictions on advertising and on disclosing client relationships, and the firm may not have each client's consent. Set `showClientList: false` in `src/data/firm.js` to hide the section without deleting the data. |
| "GST Litigation Specialists" empanelment line | Listed in `firm.empanelments`. | "Specialists" is a self-description the ICAI rules discourage. The other two entries (RBI Category-I, CAG of India) are factual empanelments. |
| Remaining CTA wording | All "free consultation" / "free quote" wording replaced with neutral equivalents; buttons and forms unchanged. | Confirm the replacements read the way the partners want, and whether consultations are in fact free (if so, whether saying so is acceptable under the current guidelines). |

---

## Engineering notes

| Note | Detail |
|---|---|
| `public/phmg-main.zip` | A 10.5 MB archive sits in `public/`. Anything in `public/` is served, so a deploy from this working directory would publish it at `/phmg-main.zip`. It is now in `.gitignore` so it stays out of git, but **delete or move it before deploying from this directory.** |
| `check-seo` word measurement | `scripts/check-seo.mjs` counted words inside `<article>`, but on the service template `<article>` closes before the process steps and FAQs, so ~500 visible words per page went uncounted and all 20 published service pages failed the 1,200-word gate. It now counts `<main>` minus the shared CTA band (which marks itself `data-seo-skip`), matching the comment the script always carried. Note the effective floor includes shared chrome (hero, lead form, process, FAQs, related), so 1,200 is a weaker bar than it appears — judge new pages on the `sections` content, not the total. |
| Pre-existing lint errors | `Header.js` had two `react-hooks/set-state-in-effect` errors (`npm run lint` failed on `main` before this work). Both were "close the menu on route change" effects; they now reset during render, which is React's documented pattern for this and removes a cascading render. |
| Redirect status code | Next.js emits **308** for `permanent: true`, not 301. Equivalent for search engines; Next uses 308 to preserve the request method. |
| Near-duplicate keywords (pre-existing) | `docs/keyword-map.csv` already pairs "section 8 company registration" (service) with "section 8 company registration process" (article), and "nri tax filing" (service) with "nri income tax in india" (article). Not flagged by the duplicate check and not introduced here, but worth a look when the keyword map is next reviewed. |
