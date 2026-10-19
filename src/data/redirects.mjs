// Structural permanent redirects: URLs whose destination is decided by this site's own routing
// rather than by the old WordPress site.
//
// Old WordPress URLs are NOT here. They live in src/data/legacy-urls.mjs and are answered by
// src/proxy.js, because Next applies the trailing-slash normalisation before proxy and after
// these, which turned every old URL Google knows (all of them carry a trailing slash) into a
// two-hop chain. Keep the two files free of overlap: anything listed here wins, because
// next.config redirects run before proxy.
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
  //
  // Deliberately NOT reversed: the October 2026 brief asked for /knowledge-bank/calculators/*
  // to redirect to /tools/*, which is the opposite of the live structure and would loop against
  // these two rules. /knowledge-bank is the canonical home of the calculators; the duplicate
  // Google still has indexed at /tools/emi-calculator is resolved by this redirect, not by a new
  // one in the other direction. See docs/seo-indexing-2026-10.md.
  { source: "/tools", destination: "/knowledge-bank", permanent: true },
  { source: "/tools/:slug", destination: "/knowledge-bank/calculators/:slug", permanent: true },
];
export default redirects;
