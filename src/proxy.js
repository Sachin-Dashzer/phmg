import { NextResponse } from "next/server";
import { legacyTarget, isGone } from "@/data/legacy-urls.mjs";

// Old WordPress URLs, plus the trailing-slash canonicalisation that next.config.mjs hands over
// via `skipTrailingSlashRedirect`. That handover is the whole point: Next normalises trailing
// slashes BEFORE proxy runs, and Google only knows the old URLs with a trailing slash, so leaving
// it to Next made every one of them a two-hop chain (/about-us/ -> /about-us -> /about).
// Resolving both here keeps each old URL a single 308 to its final destination.
//
// See src/data/legacy-urls.mjs for the tables. Structural redirects (/locations/:city, /tools/*,
// the closed Mumbai branch) stay in src/data/redirects.mjs: they interact with the /ca-in-:city
// rewrite and are already single-hop.

// WooCommerce cart parameters from the old theme. Nothing on this site reads them, so they are
// dropped rather than left to spawn a crawlable variant of every URL they are appended to.
const CART_PARAMS = ["add-to-cart", "add_to_cart", "removed_item"];

// A 410 is still read by a person who followed an old link, so it offers the three routes that
// cover why they came. Inlined because proxy runs before rendering and cannot use a React page.
const gonePage = (pathname) => `<!doctype html>
<html lang="en-IN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>Page removed &middot; PHMG &amp; Associates</title>
<style>
:root{color-scheme:light}
body{margin:0;display:grid;place-items:center;min-height:100vh;background:#f6f7f9;color:#1e293b;
font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:34rem;padding:2rem;text-align:center}
h1{font-size:1.5rem;color:#0b1f3a;margin:0 0 .75rem}
code{background:#e8ebef;border-radius:4px;padding:.1em .35em;font-size:.85em}
ul{list-style:none;display:flex;flex-wrap:wrap;gap:1.25rem;justify-content:center;padding:0;margin:1.75rem 0 0}
a{color:#1d4ed8;font-weight:600}
</style></head>
<body><main>
<h1>This page has been removed</h1>
<p><code>${pathname.replace(/[<>&"]/g, "")}</code> belonged to our previous website and no longer exists.</p>
<ul>
<li><a href="/">Home</a></li>
<li><a href="/services">Our services</a></li>
<li><a href="/contact">Contact us</a></li>
</ul>
</main></body></html>`;

export default function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  // Both forms reach proxy now, so every rule below is resolved against the stripped path.
  const bare = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;

  // 1. A real equivalent exists: one permanent redirect straight to the final URL.
  const target = legacyTarget(bare);
  if (target) return NextResponse.redirect(new URL(target, request.url), 308);

  // 2. Theme demo page with no equivalent: 410 Gone, which Google drops faster than a 404.
  //    Checked before the cart params so /woo-product-grid/?add-to-cart=5435 answers in one hop.
  if (isGone(bare)) {
    return new NextResponse(gonePage(bare), {
      status: 410,
      headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }

  // 3. A trailing slash, stray WooCommerce cart parameters, or both: one redirect fixes all of it.
  const cart = CART_PARAMS.filter((p) => searchParams.has(p));
  if (cart.length || bare !== pathname) {
    const params = new URLSearchParams(searchParams);
    for (const p of cart) params.delete(p);
    const qs = params.toString();
    return NextResponse.redirect(new URL(bare + (qs ? `?${qs}` : ""), request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, the API routes and anything with a file extension, so assets are never
  // touched. feed.xml and sitemap.xml keep their extension and so never reach the /*/feed rule.
  // Written with [.] rather than an escape so the pattern reads as it is matched.
  matcher: ["/((?!_next/static|_next/image|api/|.*[.][a-zA-Z0-9]+$).*)"],
};
