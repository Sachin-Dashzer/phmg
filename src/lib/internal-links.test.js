// Run with: npm test
//
// The two properties the linking plan depends on, checked offline against the data:
//   1. one anchor text per URL, never shared between two URLs
//   2. every page in the sitemap reachable from at least one page Google has indexed
// If either breaks, the contextual linking stops doing the job it was added for.

import test from "node:test";
import assert from "node:assert/strict";

import { anchorFor, relatedFor } from "./internal-links.js";
import { categories } from "../data/categories.js";
import { publishedServices, serviceUrl, servicesIn } from "../data/services.js";
import { industries } from "../data/industries.js";
import { cities } from "../data/cities.js";
import { articles, articlesIn, insightCategories } from "../data/insights.js";
import { calculators, utilities } from "../data/knowledge-bank.js";
import { team } from "../data/team.js";

// The same list src/app/sitemap.js builds, kept in the same order of sections.
const sitemapPaths = [
  "/", "/about", "/team", "/services", "/faq", "/contact", "/industries", "/locations", "/pricing",
  "/book-consultation", "/insights", "/knowledge-bank", "/knowledge-bank/official-resources",
  "/careers", "/gallery", "/tax-calendar", "/download", "/privacy-policy", "/terms", "/disclaimer",
  ...categories.filter((c) => servicesIn(c.slug).length).map((c) => `/services/${c.slug}`),
  ...publishedServices.map(serviceUrl),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...cities.map((c) => `/ca-in-${c.slug}`),
  ...insightCategories.filter((c) => articlesIn(c.slug).length).map((c) => `/insights/category/${c.slug}`),
  ...articles.map((a) => `/insights/${a.slug}`),
  ...calculators.map((c) => `/knowledge-bank/calculators/${c.slug}`),
  ...utilities.map((u) => `/knowledge-bank/utilities/${u.slug}`),
  ...team.map((t) => `/team/${t.slug}`),
];

// The 8 URLs Search Console listed as indexed on 19 Oct 2026, minus /tools/emi-calculator, which
// redirects to the knowledge-bank URL below.
const INDEXED = ["/", "/about", "/contact", "/industries", "/ca-in-delhi", "/download", "/knowledge-bank/calculators/emi-calculator"];

test("every anchor text belongs to exactly one URL", () => {
  const owner = new Map();
  for (const url of sitemapPaths) {
    const anchor = anchorFor(url);
    assert.ok(anchor && anchor.length > 3, `${url} has no usable anchor text`);
    assert.doesNotMatch(anchor, /click here|read more|learn more|here$/i, `${url} has a non-descriptive anchor: ${anchor}`);
    const clash = owner.get(anchor.toLowerCase());
    assert.equal(clash, undefined, `anchor "${anchor}" is used for both ${clash} and ${url}`);
    owner.set(anchor.toLowerCase(), url);
  }
});

test("related links only ever point at real pages, never at themselves", () => {
  const known = new Set(sitemapPaths);
  for (const url of sitemapPaths) {
    for (const target of relatedFor(url)) {
      assert.ok(known.has(target), `${url} links to ${target}, which is not in the sitemap`);
      assert.notEqual(target, url, `${url} links to itself`);
    }
  }
});

test("every page is reachable from a page Google has indexed", () => {
  // The related-links blocks alone, before counting anything a template renders itself. Anything
  // missing here needs a contextual link added to one of the indexed pages.
  const reachable = new Set(INDEXED.flatMap((p) => relatedFor(p)));
  const missing = sitemapPaths.filter((p) => !INDEXED.includes(p) && !reachable.has(p));

  // Service pages, articles and calculators are linked by the templates on those indexed pages
  // (the home services grid, the /download checklists, the /industries cards), not by the blocks,
  // so they are checked end-to-end by scripts/seo-audit.mjs against the rendered HTML instead.
  const coveredByTemplates = (p) =>
    /^\/services\//.test(p) || /^\/insights\//.test(p) || /^\/knowledge-bank\/calculators\//.test(p) || /^\/team\//.test(p);

  assert.deepEqual(missing.filter((p) => !coveredByTemplates(p)), [], "pages with no in-body link from an indexed page");
});
