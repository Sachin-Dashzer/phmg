import extraRedirects from "./src/data/redirects.mjs";

const isProd = process.env.NODE_ENV === "production";

// CSP without nonces keeps pages static. 'unsafe-inline' is needed for Next's inline bootstrap scripts.
// Add any new third-party origin here (e.g. a Google Maps iframe on /contact).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://scripts.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms",
  // youtube-nocookie for the gallery video embeds; google for a Maps iframe if one is added.
  "frame-src https://www.google.com https://www.youtube-nocookie.com https://www.youtube.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  // Trailing slashes are canonicalised in src/proxy.js instead. Next normalises them BEFORE proxy
  // runs, which turned every old WordPress URL into a two-hop chain (/about-us/ -> /about-us ->
  // /about). With this flag the strip and the legacy lookup happen together, in a single 308.
  skipTrailingSlashRedirect: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: security }];
  },
  async rewrites() {
    // public city URLs: /ca-in-delhi -> /locations/delhi
    return [{ source: "/ca-in-:city", destination: "/locations/:city" }];
  },
  async redirects() {
    // no host redirects here: Vercel Domains sends apex -> www
    return extraRedirects;
  },
};

export default nextConfig;
