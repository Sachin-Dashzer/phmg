// Validates service and city page content against the field rules in README.md, plus the ICAI
// wording rules. Runs offline against the data files, so it catches problems before a build.
//
//   node scripts/check-content.mjs             pages added in this round; older pages warn only
//   node scripts/check-content.mjs --all       fail on every page, including the older ones
//   node scripts/check-content.mjs bank-audit  one slug
//
// Pages written before this round carry known debt (thin `sections`, related slugs that point at
// unpublished services, "expert"/"free quote" wording in older meta descriptions). Those surface as
// warnings so this script can gate new content now, and `--all` turns them into failures once the
// wording and metadata phases have cleaned them up.
//
// Exits non-zero on any failure, so it can go in CI next to check-seo.mjs.

import { publishedServices, serviceUrl } from "../src/data/services.js";
import { newServices2026 } from "../src/data/content/new-services-2026.js";
import { cities } from "../src/data/cities.js";
import { articles } from "../src/data/insights.js";

const NEW_CITIES = ["noida", "ludhiana", "meerut", "delhi"];

const args = process.argv.slice(2);
const all = args.includes("--all");
const only = args.find((a) => !a.startsWith("--"));

const problems = [];
const warnings = [];
// A rule breach on a page from this round always fails; on an older page it warns unless --all.
const isNew = (slug) => slug in newServices2026 || NEW_CITIES.includes(slug);
const bad = (slug, msg) => (all || isNew(slug) ? problems : warnings).push(msg);

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

// Title rule mirrors withBrand() in src/lib/seo.js: the brand suffix is added only if it fits in 60.
const renderedTitle = (t) => (t.length + 20 <= 60 ? `${t} | PHMG & Associates` : t);

// ICAI: superlatives, self-praise, guarantees, urgency and inducement. Word-boundary matched so
// "Expeditors" does not trip "expert" and "bestow" does not trip "best".
const banned = [
  /\bbest\b/i, /\btop\b/i, /\bleading\b/i, /\bno\.?\s?1\b/i, /\bmost trusted\b/i, /\btrusted\b/i,
  /\bexperts?\b/i, /\bexpertise\b/i, /\bspecialis(t|ts|ing)\b/i, /\bcheapest\b/i,
  // Only the promissory uses of "guarantee". "credit guarantee scheme", "bank guarantee" and
  // "guaranteeing the borrowings" (the associated-enterprise test) are domain terms, not promises.
  /\bwe guarantee\b/i, /\bguaranteed? (results?|outcome|success|approval|refund|savings)\b/i,
  /\b(100%|fully|totally) guaranteed\b/i, /\bguarantee\b(?=[^.?!]*\b(we|our|us)\b[^.?!]*$)/i,
  /\bbetter than\b/i, /\bnever miss\b/i, /\bnever slip\b/i, /\bhurry\b/i, /\blimited (time|offer)\b/i,
  /\bfree consultation\b/i, /\bfree quote\b/i, /\bno obligation\b/i, /\bact now\b/i,
  /\b(today|now)\b(?=[^.?!]*$)/i, // urgency only when it closes the sentence ("...today.")
];

const checkText = (slug, where, text) => {
  for (const re of banned) {
    const m = String(text).match(re);
    if (m) bad(slug, `${where}: ICAI wording "${m[0]}" in: ${String(text).slice(0, 90)}`);
  }
};

const titles = new Map();
const descs = new Map();
const primaries = new Map();

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

for (const s of publishedServices) {
  if (only && s.slug !== only) continue;
  const at = serviceUrl(s);
  const need = ["h1", "metaTitle", "metaDescription", "primaryKeyword", "secondaryKeywords", "intro",
    "definition", "whoNeedsIt", "benefits", "documents", "process", "deadlines", "mistakes", "faqs", "related"];
  let missing = false;
  for (const f of need) {
    if (!s[f] || (Array.isArray(s[f]) && !s[f].length)) { bad(s.slug, `${at}: missing ${f}`); missing = true; }
  }
  if (missing) continue;

  const title = renderedTitle(s.metaTitle);
  if (title.length > 60) bad(s.slug, `${at}: rendered title ${title.length} chars: ${title}`);
  if (titles.has(title)) bad(s.slug, `${at}: duplicate title with ${titles.get(title)}`);
  titles.set(title, at);

  const d = s.metaDescription.length;
  if (d < 140 || d > 158) bad(s.slug, `${at}: metaDescription ${d} chars (want 140-158)`);
  if (descs.has(s.metaDescription)) bad(s.slug, `${at}: duplicate description with ${descs.get(s.metaDescription)}`);
  descs.set(s.metaDescription, at);

  const pk = s.primaryKeyword.toLowerCase();
  if (primaries.has(pk)) bad(s.slug, `${at}: primary keyword "${pk}" already used by ${primaries.get(pk)}`);
  primaries.set(pk, at);

  const dw = words(s.definition);
  if (dw < 40 || dw > 60) bad(s.slug, `${at}: definition ${dw} words (want 40-60)`);

  const sk = s.secondaryKeywords.length;
  if (sk < 5 || sk > 8) bad(s.slug, `${at}: ${sk} secondaryKeywords (want 5-8)`);
  if (s.faqs.length < 6 || s.faqs.length > 8) bad(s.slug, `${at}: ${s.faqs.length} faqs (want 6-8)`);
  if (s.related.length < 3 || s.related.length > 4) bad(s.slug, `${at}: ${s.related.length} related (want 3-4)`);

  for (const r of s.related) {
    if (r === s.slug) bad(s.slug, `${at}: related links to itself`);
    else if (!publishedServices.some((p) => p.slug === r)) bad(s.slug, `${at}: related "${r}" is not a published service`);
  }
  // Every page should reach outside its own category at least once.
  const cats = new Set(s.related.map((r) => publishedServices.find((p) => p.slug === r)?.category).filter(Boolean));
  if (cats.size && [...cats].every((c) => c === s.category)) bad(s.slug, `${at}: all related services are in its own category`);

  if (!s.process.every((p) => p.title && p.text && p.time)) bad(s.slug, `${at}: a process step is missing title/text/time`);
  if (!s.deadlines.every((x) => x.item && x.date && x.penalty)) bad(s.slug, `${at}: a deadline row is missing item/date/penalty`);
  if (!s.faqs.every((f) => f.q && f.a)) bad(s.slug, `${at}: an faq is missing q/a`);
  if (!s.dueNote) bad(s.slug, `${at}: missing dueNote`);

  checkText(s.slug, at, s.metaTitle);
  checkText(s.slug, at, s.metaDescription);
  checkText(s.slug, at, s.h1);
  checkText(s.slug, at, s.intro);
  checkText(s.slug, at, s.definition);

  // Section blocks must be shapes ArticleBody can render.
  const kinds = new Set(["h2", "p", "ul", "table", "links"]);
  for (const [type, v] of s.sections || []) {
    if (!kinds.has(type)) bad(s.slug, `${at}: unknown section block "${type}"`);
    if (type === "table") {
      if (!v?.head?.length) bad(s.slug, `${at}: table block without head`);
      else if (!v.rows.every((r) => r.length === v.head.length))
        bad(s.slug, `${at}: table row width does not match its ${v.head.length}-column head`);
    }
    if (type === "links") {
      if (!v.every((l) => l.href && l.label)) bad(s.slug, `${at}: links block entry missing href/label`);
      // A /services/ link must reach a published page, or it is a 404 the build will not catch.
      for (const l of v) {
        if (l.href?.startsWith("/services/") && !publishedServices.some((p) => serviceUrl(p) === l.href))
          bad(s.slug, `${at}: section link ${l.href} is not a published service page`);
      }
    }
  }
  if (!s.sections) bad(s.slug, `${at}: no in-depth sections`);
  else {
    const sw = s.sections.reduce((n, [, v]) => n + words(JSON.stringify(v)), 0);
    if (sw < 600) bad(s.slug, `${at}: sections only ~${sw} words (want 600+)`);
    if (!s.sections.some(([t, v]) => t === "h2" && /\?$/.test(v))) bad(s.slug, `${at}: no question-shaped H2`);
    if (!s.sections.some(([t]) => t === "table")) bad(s.slug, `${at}: no table in sections`);
    if (!s.sections.some(([t]) => t === "links")) bad(s.slug, `${at}: no official-sources links block`);
  }
}

/* ------------------------------------------------------------------ */
/* Cities                                                             */
/* ------------------------------------------------------------------ */

for (const c of cities) {
  if (only && c.slug !== only) continue;
  const at = `/ca-in-${c.slug}`;
  let missing = false;
  for (const f of ["name", "title", "metaDescription", "intro", "local", "services", "faqs"]) {
    if (!c[f] || (Array.isArray(c[f]) && !c[f].length)) { bad(c.slug, `${at}: missing ${f}`); missing = true; }
  }
  if (missing) continue;

  const title = renderedTitle(c.title);
  if (title.length > 60) bad(c.slug, `${at}: rendered title ${title.length} chars: ${title}`);
  if (titles.has(title)) bad(c.slug, `${at}: duplicate title with ${titles.get(title)}`);
  titles.set(title, at);

  const d = c.metaDescription.length;
  if (d < 140 || d > 158) bad(c.slug, `${at}: metaDescription ${d} chars (want 140-158)`);
  if (descs.has(c.metaDescription)) bad(c.slug, `${at}: duplicate description with ${descs.get(c.metaDescription)}`);
  descs.set(c.metaDescription, at);

  if (c.local.length < 4 || c.local.length > 6) bad(c.slug, `${at}: ${c.local.length} local sections (want 4-6)`);
  if (c.faqs.length < 5 || c.faqs.length > 6) bad(c.slug, `${at}: ${c.faqs.length} faqs (want 5-6)`);
  for (const s of c.services)
    if (!publishedServices.some((p) => p.slug === s)) bad(c.slug, `${at}: service "${s}" is not published`);

  checkText(c.slug, at, c.title);
  checkText(c.slug, at, c.metaDescription);
  checkText(c.slug, at, c.intro);
  for (const l of c.local) checkText(c.slug, at, l.p);
}

/* ------------------------------------------------------------------ */
/* Inbound links: a page nothing links to is an orphan, however good it is.            */
/* The category page links to every service automatically, so that one is not counted. */
/* ------------------------------------------------------------------ */

if (!only) {
  const inbound = new Map(publishedServices.map((s) => [s.slug, 0]));
  const count = (slug, fromSlug) => {
    if (inbound.has(slug) && slug !== fromSlug) inbound.set(slug, inbound.get(slug) + 1);
  };

  for (const s of publishedServices) {
    for (const r of s.related || []) count(r, s.slug);
    for (const [t, v] of s.sections || []) {
      if (t !== "links") continue;
      for (const l of v) {
        const target = publishedServices.find((p) => serviceUrl(p) === l.href);
        if (target) count(target.slug, s.slug);
      }
    }
  }
  for (const a of articles) for (const sv of a.services || []) count(sv, null);
  for (const c of cities) for (const sv of c.services || []) count(sv, null);

  for (const [slug, n] of inbound) {
    if (n < 2) bad(slug, `/services/.../${slug}: only ${n} inbound internal link(s) besides its category page (want 2+)`);
  }
}

/* ------------------------------------------------------------------ */

const checked = only ? 1 : publishedServices.length + cities.length;
console.log(`Checked ${checked} page(s).`);
if (warnings.length) console.log(`\n${warnings.length} warning(s) on pages written before this round:\n` + warnings.join("\n"));
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n` + problems.join("\n"));
  process.exit(1);
}
console.log("\nAll content checks passed.");
