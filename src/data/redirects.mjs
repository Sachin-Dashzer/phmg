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
  { source: "/locations/:city", destination: "/ca-in-:city", permanent: true },
];
export default redirects;
