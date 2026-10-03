# Content and maintenance calendar

Tax and company law content goes stale quickly, and it is YMYL (money) content, so freshness and accuracy matter for both clients and rankings.

## Quarterly (every 3 months)
- [ ] Partner review of every service page: rates, limits, due dates, penalties, form names. Then update `lastReviewed` in `src/data/service-content.js`
- [ ] Review all articles; update `updatedAt` in `src/data/insights.js` only when the text actually changed
- [ ] Check `/tax-calendar` and the compliance-calendar article against current notifications
- [ ] Re-run `npm run check:seo` and spot-check the live site for broken links to `.gov.in` pages
- [ ] Review Search Console: pages with falling clicks are candidates to refresh
- [ ] Regenerate the keyword map (`node scripts/keyword-map.mjs`) after adding pages

## When the Union Budget is announced (usually February)
- [ ] Update `src/data/taxSlabs.js` (slabs, rebate, standard deduction, `financialYear`, `assessmentYear`) and the matching numbers in the `old-vs-new-tax-regime` article and the income tax calculator copy in `src/data/tools.js`
- [ ] Update `npm test` expectations in `src/lib/calculators/calculators.test.js`, then run `npm test`
- [ ] Update capital gains rates in the `capital-gains-tax-...` article, TDS rates in the `tds-rates-...` article
- [ ] Publish a "Budget highlights" article in the Budget & Circulars category
- [ ] Note: the Income-tax Act, 2025 renumbers sections for later periods. Review section references across articles and service pages

## Monthly
- [ ] Publish at least 1–2 articles (aim for 2): see the topic backlog below
- [ ] Monthly compliance bulletin: send to the newsletter list, summarising the next month's due dates and any extensions
- [ ] Check GST, TDS and ROC due dates for extensions and update `/tax-calendar` if needed
- [ ] Google Business Profile: 4 posts (weekly)

## Around due dates
| When | Content idea |
|---|---|
| June | Advance tax reminder; ITR season checklist |
| July | ITR filing last-week guide; TDS return Q1 reminder |
| September | Tax audit and AGM deadlines; DIR-3 KYC reminder |
| October | Audit-case ITR reminder; LLP Form 8 |
| December | GSTR-9 and annual return prep |
| January–March | Tax-saving investments; advance tax final instalment; year-end close |
| April–May | New financial year compliance calendar; TDS Q4 |

## Article topic backlog (not yet written)
Aim for 900–1,800 words each, with an author byline, reviewer, sources and a related service link.
- Documents required for ITR filing, by taxpayer type
- How to claim HRA, step by step
- TDS on rent: rates and due date
- Is GST applicable on freelancers? (services thresholds, exports)
- GST composition scheme: who can choose it
- How to read Form 26AS and AIS
- Notice under Section 143(1): rectification step by step
- LLP annual compliance checklist
- Closing a company: strike-off vs winding up
- Trademark objection: how to reply
- ESOP basics for startups and their tax treatment
- NRI selling property in India: tax and repatriation
- Form 16, Form 16A and Form 26AS differences
- Section 80C, 80D and other deductions explained
- Gift tax rules and clubbing of income
- Advance tax: who pays and when

## Depth of the existing pages
All 20 service pages now have at least 1,200 words of body text and all 20 articles at least 900 (`npm run check:seo` enforces this on the article body). The extra material lives in `src/data/content/extra-services-*.js` and `src/data/insights/extra-*.js`.

Length is not quality. At the next quarterly review, prioritise: (1) replace the generic examples with anonymised, real client situations the partners approve, (2) add the questions clients actually ask, taken from enquiries and Search Console, and (3) have a partner read each page for accuracy. Pages that attract impressions but few clicks are the best candidates for a rewrite.

## Services still on the "on request" list
The services in `src/data/services.js` without content in `src/data/content/` appear on their category page but have no page of their own. Publish one when there is real demand and enough original content (see README: "Add a service").
