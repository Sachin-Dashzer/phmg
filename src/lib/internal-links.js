// One map of the site's contextual internal links, and one descriptive anchor per URL.
//
// Why this exists: Google finds and weighs pages mostly through links in the body of pages it has
// already indexed. The header and footer link to everything, which is worth far less, and on
// 19 Oct 2026 Search Console had 79 of this site's pages as "Discovered, currently not indexed" —
// found, but not considered worth crawling. The fix is contextual body links, and they have to be
// consistent, so they are generated from one place rather than hand-written per template.
//
// Two exports do the work:
//   anchorFor(url)  the one anchor text used for that URL anywhere on the site. Each anchor text
//                   belongs to exactly one URL, which keeps the signal per URL unambiguous;
//                   internal-links.test.js asserts this and seo-audit.mjs re-checks it against the
//                   rendered HTML, so a hand-written link cannot quietly reuse an anchor either.
//   relatedFor(url) the URLs the <RelatedLinks> block on that page should link to.
//
// relatedFor is COMPLEMENTARY to what a template already renders. A service page already lists its
// own documents and sibling cards, so its entry adds the parent hub, the guides that point at it,
// the industries that need it and the booking page, rather than repeating the page's own grid.
//
// Imports are relative, not "@/", so plain Node can load this file and the test can run offline.

import { categories } from "../data/categories.js";
import { publishedServices, serviceUrl, servicesIn } from "../data/services.js";
import { industries } from "../data/industries.js";
import { cities } from "../data/cities.js";
import { articles, articlesIn, insightCategories } from "../data/insights.js";
import { calculators, utilities } from "../data/knowledge-bank.js";

/* ------------------------------------------------------------------ */
/* Lookups                                                            */
/* ------------------------------------------------------------------ */

const bySlug = new Map(publishedServices.map((s) => [s.slug, s]));

/** A service slug as a URL, or null when that service has no published page yet. */
export const svc = (slug) => (bySlug.has(slug) ? serviceUrl(bySlug.get(slug)) : null);

/** The hub a service slug sits under, e.g. "gst-registration" -> "/services/gst". */
const hubOf = (slug) => (bySlug.has(slug) ? `/services/${bySlug.get(slug).category}` : null);

const art = (slug) => (articles.some((a) => a.slug === slug) ? `/insights/${slug}` : null);
const calc = (slug) => (calculators.some((c) => c.slug === slug) ? `/knowledge-bank/calculators/${slug}` : null);

// Table D in reverse: the guides that name this service, so each service links back to them.
const guidesForService = (slug) => articles.filter((a) => (a.services || []).includes(slug)).map((a) => `/insights/${a.slug}`);

// The industries whose work needs this service, so a service page reaches its audience pages.
const industriesForService = (slug) => industries.filter((i) => i.services.includes(slug)).map((i) => `/industries/${i.slug}`);

/* ------------------------------------------------------------------ */
/* Anchors                                                            */
/* ------------------------------------------------------------------ */

// Hand-written for the pages whose title is not already a good anchor. Everything else is derived
// from the data below, so adding a service or an article needs no edit here.
const STATIC_ANCHORS = {
  "/": "PHMG & Associates, chartered accountants",
  "/about": "about our firm and how we work",
  "/team": "the partners and their practice areas",
  "/services": "all chartered accountancy services",
  "/industries": "the industries we work with",
  "/locations": "all four office locations",
  "/contact": "contact our offices",
  "/book-consultation": "book a consultation with a chartered accountant",
  "/pricing": "how our fees are structured",
  "/faq": "answers to common client questions",
  "/careers": "careers and articleship at PHMG",
  "/gallery": "photographs of our offices and team",
  "/tax-calendar": "the statutory tax and compliance calendar",
  "/download": "document checklists you can print",
  "/insights": "all guides and compliance updates",
  "/knowledge-bank": "calculators and reference tables",
  "/knowledge-bank/official-resources": "official government and regulator portals",
  "/privacy-policy": "how we handle your personal data",
  "/terms": "the terms of use for this website",
  "/disclaimer": "the scope of the information on this site",
};

/**
 * The single anchor text for a URL. Descriptive by construction: it is the page's own subject,
 * never "click here" and never a bare keyword.
 */
export function anchorFor(url) {
  if (STATIC_ANCHORS[url]) return STATIC_ANCHORS[url];

  const cat = categories.find((c) => `/services/${c.slug}` === url);
  if (cat) return `${cat.title} services`;

  const s = publishedServices.find((x) => serviceUrl(x) === url);
  if (s) return s.title;

  const ind = industries.find((i) => `/industries/${i.slug}` === url);
  if (ind) return `CA services for ${ind.title}`;

  const city = cities.find((c) => `/ca-in-${c.slug}` === url);
  if (city) return `chartered accountants in ${city.name}`;

  const a = articles.find((x) => `/insights/${x.slug}` === url);
  if (a) return a.title;

  const ic = insightCategories.find((c) => `/insights/category/${c.slug}` === url);
  if (ic) return `${ic.title} guides`;

  const cl = calculators.find((c) => `/knowledge-bank/calculators/${c.slug}` === url);
  if (cl) return cl.title;

  const u = utilities.find((x) => `/knowledge-bank/utilities/${x.slug}` === url);
  if (u) return u.title;

  // A team member page. Their name is the honest anchor.
  return url.replace(/^\/team\//, "").split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

/* ------------------------------------------------------------------ */
/* Industry -> services and guides                                    */
/* ------------------------------------------------------------------ */

// Each industry page already renders its own `services` grid from industries.js. These are the
// extra destinations the linking plan asks for on top of that grid: the practice hub the sector
// leans on, and the guide that answers its most common question.
const INDUSTRY_EXTRAS = {
  "ecommerce-retail": [svc("trademark-registration"), art("gst-registration-documents-eligibility-process")],
  "export-import": ["/services/international-tax-fema", art("form-15ca-15cb-explained")],
  "freelancers-creators": [calc("income-tax-calculator"), art("how-to-file-itr-online")],
  "healthcare-pharma": [svc("statutory-audit"), svc("bookkeeping-services"), art("statutory-audit-vs-tax-audit-vs-internal-audit")],
  "it-saas-startups": ["/services/international-tax-fema", art("startup-india-dpiit-recognition-benefits")],
  manufacturing: [svc("udyam-registration"), art("gstr-1-vs-gstr-3b")],
  "ngos-trusts": [art("section-8-company-ngo-registration-process")],
  professionals: [art("tax-audit-section-44ab-limits-applicability")],
  "real-estate-construction": [art("capital-gains-tax-shares-property-mutual-funds")],
};

/* ------------------------------------------------------------------ */
/* The links the <RelatedLinks> block renders                          */
/* ------------------------------------------------------------------ */

const allHubs = () => categories.filter((c) => servicesIn(c.slug).length).map((c) => `/services/${c.slug}`);
const allCities = () => cities.map((c) => `/ca-in-${c.slug}`);
const allCalculators = () => calculators.map((c) => `/knowledge-bank/calculators/${c.slug}`);
const allUtilities = () => utilities.map((u) => `/knowledge-bank/utilities/${u.slug}`);
const allInsightCategories = () => insightCategories.filter((c) => articlesIn(c.slug).length).map((c) => `/insights/category/${c.slug}`);

// Pages Google has already indexed. Linking back to one of these from every page is the point of
// the exercise: it is the path a crawler actually takes into the rest of the site.
const INDEXED_HUBS = ["/about", "/industries", "/contact", "/ca-in-delhi"];

// The blocks on the pages Google has indexed. These are the entry points, so they deliberately
// reach further than an ordinary related-links block would.
const ENTRY_BLOCKS = {
  "/": [
    "/industries",
    ...industries.map((i) => `/industries/${i.slug}`),
    "/locations",
    "/tax-calendar",
    "/download",
    "/faq",
    "/pricing",
    "/book-consultation",
  ],
  "/about": [
    "/team",
    "/locations",
    ...allCities(),
    "/services",
    "/industries",
    "/careers",
    "/gallery",
    "/faq",
    "/book-consultation",
  ],
  "/contact": [
    "/book-consultation",
    "/locations",
    ...allCities(),
    "/faq",
    "/pricing",
    "/services",
    "/tax-calendar",
    "/terms",
    "/disclaimer",
    "/privacy-policy",
  ],
  // Each sector card on this page already links the services it needs; the block adds the guide
  // that answers that sector's most common question.
  "/industries": [
    ...allHubs(),
    ...new Set(Object.values(INDUSTRY_EXTRAS).flat().filter((u) => u && u.startsWith("/insights/"))),
    "/contact",
    "/book-consultation",
  ],
  // /download is the "before you start" reference page: it already lists a checklist for all 37
  // services and is one of the few URLs Google has indexed. Giving it the full guide, calculator
  // and table index is what gets every one of those pages a body link from an indexed page, and
  // it keeps working as content is added rather than needing a hand-picked list maintained here.
  "/download": [
    "/tax-calendar",
    "/insights",
    ...articles.map((a) => `/insights/${a.slug}`),
    "/knowledge-bank",
    ...allCalculators(),
    ...allUtilities(),
    "/knowledge-bank/official-resources",
  ],
};

/**
 * The URLs the <RelatedLinks> block on `url` should link to, de-duplicated, with the page's own
 * URL removed and anything unpublished dropped.
 */
export function relatedFor(url) {
  const out = ENTRY_BLOCKS[url] ? [...ENTRY_BLOCKS[url]] : [];

  if (!ENTRY_BLOCKS[url]) {
    const service = publishedServices.find((s) => serviceUrl(s) === url);
    const hub = categories.find((c) => `/services/${c.slug}` === url);
    const industry = industries.find((i) => `/industries/${i.slug}` === url);
    const city = cities.find((c) => `/ca-in-${c.slug}` === url);
    const article = articles.find((a) => `/insights/${a.slug}` === url);
    const icat = insightCategories.find((c) => `/insights/category/${c.slug}` === url);
    const calculator = calculators.find((c) => `/knowledge-bank/calculators/${c.slug}` === url);
    const utility = utilities.find((u) => `/knowledge-bank/utilities/${u.slug}` === url);

    if (service) {
      // Parent hub, siblings, the guides that point here, the sectors that need it, and the two
      // office pages a visitor is most likely to want.
      out.push(
        hubOf(service.slug),
        ...servicesIn(service.category).filter((s) => s.slug !== service.slug).slice(0, 3).map(serviceUrl),
        ...guidesForService(service.slug).slice(0, 3),
        ...industriesForService(service.slug).slice(0, 2),
        "/book-consultation",
        "/ca-in-noida",
        "/ca-in-delhi",
      );
    } else if (hub) {
      // The hub page already renders its own sub-service grid, so this adds the reading around it.
      const guides = [...new Set(servicesIn(hub.slug).flatMap((s) => guidesForService(s.slug)))];
      out.push(...guides.slice(0, 4), "/industries", "/pricing", "/book-consultation", "/ca-in-delhi");
    } else if (industry) {
      out.push(...(INDUSTRY_EXTRAS[industry.slug] || []), "/industries", "/contact", "/book-consultation");
    } else if (city) {
      out.push(...allHubs(), ...allCities(), "/locations", "/book-consultation", "/tax-calendar");
    } else if (article) {
      out.push(
        ...(article.services || []).map(svc),
        `/insights/category/${article.category}`,
        ...articlesIn(article.category).filter((a) => a.slug !== article.slug).slice(0, 3).map((a) => `/insights/${a.slug}`),
        "/insights",
        "/book-consultation",
      );
    } else if (icat) {
      out.push("/insights", ...allInsightCategories(), "/knowledge-bank", "/tax-calendar", "/book-consultation");
    } else if (calculator || utility) {
      out.push(...allCalculators(), ...allUtilities(), "/knowledge-bank", "/tax-calendar");
    } else {
      // Everything else — /team, /faq, /pricing, /careers, /gallery, the legal pages — gets the
      // same set. It is what guarantees the indexed hubs are reachable from every page, and it is
      // also the only inbound body link the quieter pages (/careers, /gallery, the official
      // resources list) get, since nothing else on the site has a reason to mention them.
      out.push(
        "/services", "/insights", "/knowledge-bank", "/locations", "/team", "/faq", "/pricing",
        "/tax-calendar", "/download", "/careers", "/gallery", "/knowledge-bank/official-resources",
        "/book-consultation",
      );
    }

    // Every page links back to the home page and to one or two pages Google has already indexed.
    out.push("/", ...INDEXED_HUBS);
  }

  return [...new Set(out)].filter((u) => u && u !== url);
}

/** The heading the block uses, so a services page does not say "Related guides". */
export function relatedHeading(url) {
  if (url === "/") return "More from PHMG & Associates";
  if (/^\/insights/.test(url)) return "Related guides and services";
  if (/^\/knowledge-bank/.test(url)) return "Other calculators and reference tables";
  if (/^\/industries\//.test(url)) return "Services for this sector";
  if (/^\/ca-in-/.test(url)) return "Services at this office";
  if (/^\/services/.test(url)) return "Related services and guides";
  return "Explore the rest of the site";
}
