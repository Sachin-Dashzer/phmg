#!/usr/bin/env node
// Indexability + internal-link audit. No paid APIs, nothing crawled but this site.
//
//   npm run build && npx next start -p 3000
//   node scripts/seo-audit.mjs http://localhost:3000
//   node scripts/seo-audit.mjs https://www.phmgindia.com
//
// Writes seo-audit-report.md and exits non-zero when anything is wrong, so it can gate a deploy.
// This replaced scripts/check-seo.mjs and carries over all of its checks.

import { writeFileSync } from "node:fs";
import structuralRedirects from "../src/data/redirects.mjs";
import { legacyRedirects, legacyTarget, isGone, normalisePath } from "../src/data/legacy-urls.mjs";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

/* ------------------------------------------------------------------ */
/* What Google had on 19 Oct 2026                                      */
/* ------------------------------------------------------------------ */

// The new-site pages Google has indexed. Every other page needs at least one in-body link from
// one of these, because this is where crawl equity actually enters the site.
// /tools/emi-calculator is indexed too, but it redirects to the knowledge-bank URL below, which
// is the canonical one.
const INDEXED = [
  "/",
  "/about",
  "/contact",
  "/industries",
  "/ca-in-delhi",
  "/download",
  "/knowledge-bank/calculators/emi-calculator",
];

// Every old WordPress URL Search Console still knows, exactly as it reports them. Each must be a
// single-hop permanent redirect to a 200, or a 410. The expectations are derived from
// src/data/legacy-urls.mjs rather than restated here, so the tables cannot drift from the test.
const OLD_URLS = `
/portfolios/big-data-services/ /portfolios/sales-enablement/ /portfolios/support-technology/
/portfolios/stock-investments/ /portfolios/hr-recruiting/
/portfolio-category/strategy/ /portfolio-category/marketing/ /portfolio-category/consulting/
/portfolio-category/business/ /portfolio-category/finance/
/services/goods-services-tax/ /services/business-consultancy/ /services/audit-assurance/
/services/accounting/ /services/
/category/development/ /category/creative/ /category/consulting/ /category/strategy/
/teams/mukul-mohan/ /teams/vivek-kumar/ /teams/piyush-mishra/
/team-category/business/ /team-category/mba/ /team-category/fca/ /team-category/b-com/
/team-category/team-member/ /team-category/llb/ /team-category/ifrs/
/our-team/ /about-us/ /careers/ /our-association/ /home/ /home-10/ /home-3/
/industries/ /resources/ /team-grid-style1/ /partners/ /blog/ /price-table-1/ /about-2-6/
/onepage-5/ /onepage-8/ /onepage-9/ /onepage-10/ /onepage-13/ /onepage-14/ /onepage-16/
/contact-us/ /contact-2-2/ /contact-3/
/lights-winged-seasons-fish-abundantly-evening/
/given-void-great-youre-good-appear-have-i-also-fifth/
/if-the-white-whale-be-raised-it-must-be-in-a-month/
/whale-be-raised-it-must-be-in-a-month/
/winged-moved-stars-fruit-creature-seed-night/
/winged-moved-stars-fruit-creature-seed-night/feed/
/hello-world/ /hello-world/feed/
/services/corporate-law-advisory/ /services/tax-advisory/ /services/business-setup-in-india/
/portfolios/stock-market-analysis-using-machine-learning/
/portfolios/security-software-and-services/ /portfolios/sales-analysis/
/2019/02/ /2021/01/
/woo-product-grid/?add-to-cart=5435 /woo-product-slider/?add-to-cart=5439
`.trim().split(/\s+/);

// ICAI: the content must stay informational, with no superlatives, comparisons with other firms,
// testimonials, success rates or guarantees.
//
// These patterns look for a superlative USED AS A CLAIM, not for the words themselves. Matching
// "best" on its own flagged seven pages that were all legitimate English — "the best way to avoid
// delay", "best-judgment assessment" (the statutory term in Section 144), "returns are not
// guaranteed" — and an audit that cries wolf gets ignored, which is worse than not checking.
const PROMOTIONAL = [
  /\bbest[- ](ca|chartered|firm|audit|tax|gst|accounting|consultan|advis|service|in (delhi|noida|india))/i,
  /\bbest (ca|chartered|firm|audit|tax|gst|accounting|consultan|advis|service)/i,
  /\bno\.? ?1\b|\bnumber one\b/i,
  /\b(top-rated|award-winning|most trusted|unmatched|unrivalled) /i,
  // "the fastest way to file" and "the largest saving" are descriptions, not claims; only flag
  // these when they attach to what the firm sells or to a place.
  /\b(cheapest|fastest|quickest|largest) (ca|chartered|firm|fee|price|service|filing service|in (delhi|noida|india))/i,
  /\bleading (ca|chartered|firm|provider|consultan|accounting|audit)/i,
  /\b(we )?guarantee(d|s)? (approval|a refund|success|results?|a favourable)/i,
  /\b100% (success|approval|accuracy|refund)/i,
  /\b\d+% success rate\b/i,
];

const OLD_PHONES = /9718115480|97181 ?15480|9654123003|96541 ?23003/;

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const problems = [];
const warn = [];
const bad = (where, msg) => problems.push(`**${where}** — ${msg}`);

const get = async (path) => {
  const res = await fetch(base + path, { redirect: "manual" });
  return { status: res.status, headers: res.headers, text: await res.text() };
};

const clean = (p) => {
  const noHash = p.split("#")[0].split("?")[0];
  return (noHash.length > 1 ? noHash.replace(/\/+$/, "") : noHash) || "/";
};

// Visible words and links inside <main>, with the shared CTA band dropped: it marks itself with
// data-seo-skip and is always the last block, so everything from there on is boilerplate.
//
// This is the definition of "in-body" used for both the thin-content and the inbound-link counts,
// and it is deliberately strict. The header and footer link to every section of the site, so
// counting those would make every page look well linked and the orphan report would be useless.
const bodyOf = (html) => {
  const main = (html.match(/<main[^>]*>([\s\S]*)<\/main>/) || ["", ""])[1];
  return main.split(/<[a-z]+ data-seo-skip/)[0];
};

const textOf = (body) =>
  body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/g, " ");

const wordsIn = (body) => textOf(body).split(/\s+/).filter(Boolean).length;

const linksIn = (body) => [...body.matchAll(/<a [^>]*href="(\/[^"]*)"/g)].map((m) => clean(m[1]));

/* ------------------------------------------------------------------ */
/* 1. Crawl every sitemap URL                                          */
/* ------------------------------------------------------------------ */

const sitemapXml = await get("/sitemap.xml");
if (sitemapXml.status !== 200) {
  console.error(`sitemap.xml returned ${sitemapXml.status} — is a server running at ${base}?`);
  process.exit(1);
}
const paths = [...sitemapXml.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

// Sitemap hygiene: nothing in it may be a redirect source or match a 410 pattern.
// Only parameterless sources are literal URLs. `/locations/:city` is a pattern, and stripping the
// parameter from it would wrongly condemn `/locations`, which is a real page.
const redirectSources = new Set([
  ...Object.keys(legacyRedirects),
  ...structuralRedirects.map((r) => r.source).filter((s) => !s.includes(":")),
]);
for (const p of paths) {
  if (isGone(p)) bad(p, "in the sitemap but matches a 410 pattern in legacy-urls.mjs");
  else if (legacyTarget(p)) bad(p, `in the sitemap but redirects to ${legacyTarget(p)}`);
  if (p !== normalisePath(p)) bad(p, "sitemap URL is not already canonical (case or trailing slash)");
  if (redirectSources.has(p)) bad(p, "in the sitemap but is a redirect source");
}

const pages = new Map();
const titles = new Map();
const descs = new Map();
const inbound = new Map(paths.map((p) => [p, new Set()]));
const checkedLinks = new Map();

for (const path of paths) {
  const { status, headers, text: html } = await get(path);
  if (status !== 200) { bad(path, `status ${status} (every sitemap URL must be 200)`); continue; }

  const body = bodyOf(html);
  const text = textOf(body);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, "&") ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.replace(/&amp;/g, "&") ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const robotsMeta = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  const xRobots = headers.get("x-robots-tag") ?? "";
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const words = wordsIn(body);

  pages.set(path, { title, desc, canonical, robotsMeta, xRobots, h1s, words, jsonLd: [] });

  /* --- canonical: www, https, no trailing slash ------------------ */
  // The home page is the one URL where the trailing slash is the canonical form, and Next emits
  // it without one; both are the same URL to a search engine, so accept either.
  const want = path === "/" ? ["https://www.phmgindia.com", "https://www.phmgindia.com/"] : [`https://www.phmgindia.com${path}`];
  if (!canonical) bad(path, "no rel=canonical");
  else if (!want.includes(canonical) && canonical !== base + path && canonical !== base) {
    bad(path, `canonical is ${canonical}, expected ${want[0]}`);
  }

  /* --- indexability ---------------------------------------------- */
  if (/noindex/i.test(robotsMeta)) bad(path, "robots meta says noindex");
  if (/noindex/i.test(xRobots)) bad(path, `X-Robots-Tag says noindex (${xRobots})`);

  /* --- SSR: the main content must be in the server HTML ----------- */
  if (words < 50) bad(path, `only ${words} words inside <main> in the server HTML — content may be client-rendered`);

  /* --- title and description ------------------------------------- */
  // Lengths are failures, not warnings: every one of the 131 pages is inside both windows, so a
  // page falling out of them is a regression someone has just introduced, not standing debt.
  // src/lib/seo.js documents the base-title lengths that survive the brand suffix.
  if (!title) bad(path, "no title");
  else {
    if (title.length < 50 || title.length > 60) bad(path, `title ${title.length} chars (target 50-60): ${title}`);
    if (titles.has(title)) bad(path, `duplicate title with ${titles.get(title)}`);
    titles.set(title, path);
  }
  if (!desc) bad(path, "no meta description");
  else {
    if (desc.length < 140 || desc.length > 160) bad(path, `description ${desc.length} chars (target 140-160): ${desc}`);
    if (descs.has(desc)) bad(path, `duplicate description with ${descs.get(desc)}`);
    descs.set(desc, path);
  }

  /* --- exactly one h1 -------------------------------------------- */
  if (h1s !== 1) bad(path, `${h1s} h1 tags (expected exactly 1)`);

  /* --- structured data ------------------------------------------- */
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const raw = m[1];
    try {
      const data = JSON.parse(raw);
      const t = [].concat(data["@type"] ?? []);
      types.push(...t);
      if (!data["@context"] || !data["@type"]) bad(path, "JSON-LD missing @context/@type");
      if (/AggregateRating|"Review"/.test(raw)) bad(path, "JSON-LD carries a rating or review (no real data exists for one)");
      if (t.includes("FAQPage") && !data.mainEntity?.every((q) => q.name && q.acceptedAnswer?.text)) bad(path, "FAQPage incomplete");
      if (t.includes("Article")) {
        if (!data.author) bad(path, "Article JSON-LD has no author");
        if (!data.datePublished || !data.dateModified) bad(path, "Article JSON-LD has no date");
      }
    } catch {
      bad(path, "invalid JSON-LD");
    }
  }
  pages.get(path).jsonLd = [...new Set(types)];

  if (path !== "/" && !types.includes("BreadcrumbList")) bad(path, "inner page with no BreadcrumbList");
  if (/Frequently asked/i.test(body) && /<details/.test(body) && !types.includes("FAQPage")) {
    bad(path, "page shows FAQs but has no FAQPage schema");
  }
  if (/^\/insights\/[^/]+$/.test(path) && !types.includes("Article")) bad(path, "insight article with no Article schema");
  if ((path === "/locations" || path.startsWith("/ca-in-")) && !types.includes("AccountingService")) {
    bad(path, "office page with no AccountingService/LocalBusiness schema");
  }

  /* --- thin content ---------------------------------------------- */
  // The brief set the floor at 400 words for a service or industry page and 150 for a tool or
  // category page. The money pages are held to the higher bar check-seo.mjs already enforced and
  // they already clear it, so lowering them to the brief's floor would only let them rot.
  const min =
    /^\/services\/[^/]+\/[^/]+$/.test(path) ? 1200
      : /^\/insights\/[^/]+$/.test(path) ? 900
        : /^\/industries\/[^/]+$/.test(path) ? 400
          : /^\/insights\/category\//.test(path) ? 150
            : /^\/knowledge-bank\/(calculators|utilities)\//.test(path) ? 150
              : 0;
  if (min && words < min) bad(path, `thin: ${words} words in <main> (target ${min})`);

  /* --- content hygiene ------------------------------------------- */
  if (/lorem ipsum|TODO|CLIENT TO CONFIRM/i.test(html)) bad(path, "placeholder text visible");
  if (!/property="og:image"/.test(html)) bad(path, "no og:image");
  for (const re of PROMOTIONAL) {
    const hit = text.match(re);
    if (hit) bad(path, `ICAI: promotional wording "${hit[0].trim()}" in the page body`);
  }
  if (OLD_PHONES.test(html)) bad(path, "an old phone number is present");
  if (/\bMumbai\b/.test(text) && !/HRA|metro/i.test(text)) bad(path, "references Mumbai (that branch is closed)");

  /* --- internal links -------------------------------------------- */
  for (const href of linksIn(body)) {
    if (inbound.has(href)) {
      if (href !== path) inbound.get(href).add(path);
    } else if (!checkedLinks.has(href)) {
      const r = await fetch(base + href, { redirect: "manual" });
      checkedLinks.set(href, r.status);
      if (r.status >= 400) bad(path, `in-body link to ${href} returns ${r.status}`);
      else if (r.status >= 300) warn.push(`${path} — in-body link to ${href} redirects (${r.status}); link the final URL`);
    }
  }
}

/* ------------------------------------------------------------------ */
/* 2. Orphans                                                          */
/* ------------------------------------------------------------------ */

const fromIndexedCount = (from) => [...from].filter((f) => INDEXED.includes(f)).length;

const orphans = [];
for (const [path, from] of inbound) {
  if (!pages.has(path)) continue;
  const fi = fromIndexedCount(from);
  if (from.size < 3 || fi === 0) {
    orphans.push({ path, count: from.size, fromIndexed: fi });
    bad(path, `${from.size} in-body inbound link(s), ${fi} from an indexed page (need 3+ and 1+)`);
  }
}

/* ------------------------------------------------------------------ */
/* 3. Old URLs: single-hop 301/308 to a 200, or 410                    */
/* ------------------------------------------------------------------ */

const oldResults = [];
for (const old of OLD_URLS) {
  const bare = normalisePath(old.split("?")[0]);
  const res = await fetch(base + old, { redirect: "manual" });
  const loc = res.headers.get("location");
  const target = loc ? clean(new URL(loc, base).pathname) : null;
  const expectGone = isGone(bare);
  const expectTarget = legacyTarget(bare);
  let verdict = "ok";

  if (expectGone) {
    if (res.status !== 410) { verdict = `expected 410, got ${res.status}`; bad(old, verdict); }
    else verdict = "ok (410 Gone)";
  } else if (expectTarget) {
    if (res.status !== 301 && res.status !== 308) {
      verdict = `expected a permanent redirect, got ${res.status}`;
      bad(old, verdict);
    } else if (target !== expectTarget) {
      verdict = `redirects to ${target}, expected ${expectTarget}`;
      bad(old, verdict);
    } else {
      const hop = await fetch(base + target, { redirect: "manual" });
      if (hop.status !== 200) { verdict = `target ${target} returns ${hop.status} — not a single hop`; bad(old, verdict); }
      else verdict = `ok (-> ${target})`;
    }
  } else if (res.status === 200) {
    verdict = "ok (live page on the new site)";
  } else if (res.status === 301 || res.status === 308) {
    const hop = await fetch(base + target, { redirect: "manual" });
    if (hop.status !== 200) { verdict = `chain: -> ${target} -> ${hop.status}`; bad(old, verdict); }
    else verdict = `ok (-> ${target})`;
  } else {
    verdict = `status ${res.status} and no rule covers it — add one to legacy-urls.mjs`;
    bad(old, verdict);
  }
  oldResults.push({ old, status: res.status, target, verdict });
}

/* ------------------------------------------------------------------ */
/* 4. Report                                                           */
/* ------------------------------------------------------------------ */

const row = (cells) => `| ${cells.join(" | ")} |`;
const sorted = [...inbound.entries()].filter(([p]) => pages.has(p)).sort((a, b) => b[1].size - a[1].size);

const report = [
  "# SEO audit report",
  "",
  `Target: \`${base}\``,
  "",
  `Run: ${new Date().toISOString()}`,
  "",
  `Sitemap URLs: ${paths.length} · old URLs checked: ${OLD_URLS.length}`,
  "",
  problems.length ? `## ${problems.length} problem(s)` : "## No problems",
  "",
  ...(problems.length ? problems.map((p) => `- ${p}`) : ["Everything checked passes."]),
  "",
  `## ${warn.length} warning(s)`,
  "",
  ...(warn.length ? warn.map((w) => `- ${w}`) : ["None."]),
  "",
  "## Orphans (fewer than 3 in-body inbound links, or none from an indexed page)",
  "",
  ...(orphans.length
    ? [row(["URL", "Inbound", "From indexed"]), row(["---", "---", "---"]),
      ...orphans.map((o) => row([o.path, o.count, o.fromIndexed]))]
    : ["None."]),
  "",
  "## Every sitemap URL",
  "",
  row(["URL", "Inbound", "From indexed", "Words", "H1", "Title", "Desc", "JSON-LD"]),
  row(["---", "---", "---", "---", "---", "---", "---", "---"]),
  ...sorted.map(([p, from]) => {
    const d = pages.get(p);
    return row([p, from.size, fromIndexedCount(from), d.words, d.h1s, d.title.length, d.desc.length, d.jsonLd.join(", ") || "-"]);
  }),
  "",
  "## Old WordPress URLs",
  "",
  row(["Old URL", "Status", "Target", "Verdict"]),
  row(["---", "---", "---", "---"]),
  ...oldResults.map((r) => row([`\`${r.old}\``, r.status, r.target ?? "-", r.verdict])),
  "",
].join("\n");

writeFileSync("seo-audit-report.md", report);

console.log(`Checked ${paths.length} sitemap URLs and ${OLD_URLS.length} old URLs.`);
console.log(`${problems.length} problem(s), ${warn.length} warning(s), ${orphans.length} orphan(s).`);
console.log("Report written to seo-audit-report.md");
if (problems.length) process.exit(1);
