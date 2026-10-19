// Old WordPress URLs that Google still has in its index.
//
// These live here rather than in next.config.mjs `redirects()` for one reason: Next applies the
// `trailingSlash: false` normalisation in the same pass as the config redirects, so
// `/about-us/` becomes TWO hops (`/about-us/` -> `/about-us` -> `/about`). Every URL Google
// knows carries a trailing slash, and a chain costs crawl budget and dilutes the signal.
// src/proxy.js runs before that pass, strips the slash itself and answers in a single 308.
//
// Structural redirects that interact with the /ca-in-:city rewrite stay in src/data/redirects.mjs.
// Keep both files free of overlap: scripts/seo-audit.mjs asserts a single hop for every entry here.

/** old path (no trailing slash, lower case) -> new path. One hop, no chains. */
export const legacyRedirects = {
  // Service pages that were renamed
  "/services/goods-services-tax": "/services/gst",
  "/services/tax-advisory": "/services/income-tax",
  "/services/business-consultancy": "/services/business-advisory",
  "/services/accounting": "/services/accounting-bookkeeping",
  "/services/corporate-law-advisory": "/services/roc-compliance",
  "/services/business-setup-in-india": "/services/business-registration",

  // Team. /teams/piyush-mishra is the only old profile with a page on the new site; the rest of
  // the WordPress team URLs (including the theme's category and grid demos) land on /team.
  "/teams/piyush-mishra": "/team/piyush-mishra",
  "/our-team": "/team",
  "/team-grid-style1": "/team",
  "/partners": "/team",

  // About
  "/about-us": "/about",
  "/our-association": "/about",
  "/about-2-6": "/about",

  // Home variants from the theme demo
  "/home": "/",
  "/home-3": "/",
  "/home-10": "/",

  // Sections
  "/resources": "/knowledge-bank",
  "/blog": "/insights",

  // Contact
  "/contact-us": "/contact",
  "/contact-2-2": "/contact",
  "/contact-3": "/contact",

  // Pricing
  "/price-table-1": "/pricing",
};

/**
 * Prefix rules for whole families of old URLs, applied after the exact map above misses.
 * `/teams/*` and `/team-category/*` cannot be exact entries: the WordPress slugs are open-ended.
 */
export const legacyPrefixRedirects = [
  [/^\/teams\/[^/]+$/, "/team"],
  [/^\/team-category\/[^/]+$/, "/team"],
  [/^\/category\/[^/]+$/, "/insights"],
];

/**
 * WordPress theme demo pages with nothing equivalent on the new site. 410 Gone tells Google to
 * drop them, which it acts on faster than a 404.
 *
 * Every pattern is checked against the live sitemap by scripts/seo-audit.mjs, so none of them can
 * start matching a real page without the audit failing.
 */
export const gonePatterns = [
  /^\/onepage-/,                 // theme one-page demos
  /^\/portfolios(\/|$)/,         // portfolio items
  /^\/portfolio-category(\/|$)/, // portfolio taxonomy
  /^\/hello-world/,              // the default WordPress post
  /^\/woo-product-/,             // WooCommerce demo grids
  /^\/\d{4}\/\d{2}/,             // date archives: /2019/02, /2021/01
  /^\/.+\/feed$/,                // comment feeds (/feed.xml is a real route and does not match)
  /^\/lights-winged-seasons-fish-abundantly-evening$/,
  /^\/given-void-great-youre-good-appear-have-i-also-fifth$/,
  /^\/if-the-white-whale-be-raised-it-must-be-in-a-month$/,
  /^\/whale-be-raised-it-must-be-in-a-month$/,
  /^\/winged-moved-stars-fruit-creature-seed-night$/,
];

/** The path Google knows, with its trailing slash, stripped the way the proxy strips it. */
export const normalisePath = (p) => {
  const lower = p.toLowerCase();
  return lower.length > 1 && lower.endsWith("/") ? lower.replace(/\/+$/, "") : lower;
};

/** Resolve a request path to its 308 target, or null when there is none. */
export function legacyTarget(pathname) {
  const p = normalisePath(pathname);
  if (legacyRedirects[p]) return legacyRedirects[p];
  for (const [re, target] of legacyPrefixRedirects) if (re.test(p)) return target;
  return null;
}

/** True when the path is a WordPress demo page that should answer 410 Gone. */
export const isGone = (pathname) => gonePatterns.some((re) => re.test(normalisePath(pathname)));
