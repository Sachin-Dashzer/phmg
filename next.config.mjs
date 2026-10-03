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
  "frame-src https://www.google.com",
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
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: security }];
  },
  async rewrites() {
    // public city URLs: /ca-in-delhi -> /locations/delhi
    return [{ source: "/ca-in-:city", destination: "/locations/:city" }];
  },
  async redirects() {
    return [
      // one canonical host: phmgindia.com (http -> https is handled by the host/CDN and HSTS)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.phmgindia.com" }],
        destination: "https://phmgindia.com/:path*",
        permanent: true,
      },
      ...extraRedirects,
    ];
  },
};

export default nextConfig;
