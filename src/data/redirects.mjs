// Extra permanent redirects (e.g. old site URLs after launch): { source: "/old", destination: "/new", permanent: true }
//
// Note: Next.js emits 308 for `permanent: true`, not 301. Both are permanent for search engines;
// Next uses 308 because it preserves the request method.
//
// Ordering note for /locations/:city -> /ca-in-:city: next.config.mjs rewrites /ca-in-:city to
// /locations/:city internally. Next checks redirects BEFORE the filesystem, and an array of
// rewrites is applied AFTER the filesystem, so the two do not loop:
//   /locations/noida -> matches this redirect -> 308 to /ca-in-noida
//   /ca-in-noida     -> matches no redirect   -> rewritten internally to /locations/noida -> renders
// The canonical on the page points at /ca-in-:city, so only one URL is indexable.
const redirects = [
  // The Mumbai branch closed in October 2026. These sit BEFORE the generic /locations/:city rule
  // so the old URLs reach /locations in one hop rather than bouncing via /ca-in-mumbai.
  { source: "/ca-in-mumbai", destination: "/locations", permanent: true },
  { source: "/ca-in-powai", destination: "/locations", permanent: true },
  { source: "/locations/mumbai", destination: "/locations", permanent: true },
  { source: "/mumbai", destination: "/locations", permanent: true },

  { source: "/locations/:city", destination: "/ca-in-:city", permanent: true },

  // /tools became /knowledge-bank in October 2026. The five original calculators kept their
  // slugs, so each old URL maps to exactly one new one and no link is lost.
  { source: "/tools", destination: "/knowledge-bank", permanent: true },
  { source: "/tools/:slug", destination: "/knowledge-bank/calculators/:slug", permanent: true },

  // Old WordPress URLs that still pick up impressions in Search Console. /careers is deliberately
  // absent: the new site has its own /careers page, so that URL already resolves.
  { source: "/home", destination: "/", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/our-team", destination: "/team", permanent: true },
  { source: "/teams/:slug*", destination: "/team", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/services/accounting", destination: "/services/accounting-bookkeeping", permanent: true },
];
export default redirects;
