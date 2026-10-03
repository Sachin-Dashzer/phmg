// Crawls every URL in sitemap.xml on a running server and checks the on-page SEO basics.
// Usage: npm run build && npx next start -p 3000   then   node scripts/check-seo.mjs http://localhost:3000
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const get = async (path) => {
  const res = await fetch(base + path, { redirect: "manual" });
  return { status: res.status, text: await res.text() };
};

const sitemap = (await get("/sitemap.xml")).text;
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const problems = [];
const titles = new Map();
const descs = new Map();
const pathSet = new Set(paths);

for (const path of paths) {
  const { status, text: html } = await get(path);
  const bad = (msg) => problems.push(`${path}: ${msg}`);
  if (status !== 200) { bad(`status ${status}`); continue; }

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, "&");
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.replace(/&amp;/g, "&");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) bad("no title");
  else {
    if (title.length > 60) bad(`title ${title.length} chars: ${title}`);
    if (titles.has(title)) bad(`duplicate title with ${titles.get(title)}`);
    titles.set(title, path);
  }
  if (!desc) bad("no meta description");
  else {
    if (desc.length < 120 || desc.length > 160) bad(`description ${desc.length} chars`);
    if (descs.has(desc)) bad(`duplicate description with ${descs.get(desc)}`);
    descs.set(desc, path);
  }
  if (!canonical) bad("no canonical");
  if (h1s !== 1) bad(`${h1s} h1 tags`);
  if (!/property="og:image"/.test(html)) bad("no og:image");

  // thin-content check on money pages and articles (visible words inside <main>, excluding the shared CTA band)
  const min = /^\/services\/[^/]+\/[^/]+$/.test(path) ? 1200 : /^\/insights\/[^/]+$/.test(path) ? 900 : 0;
  if (min) {
    const main = (html.match(/<article[\s\S]*<\/article>/) || [""])[0].replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ");
    const words = main.split(/\s+/).filter(Boolean).length;
    if (process.env.SHOW_WORDS) console.log(words, path);
    if (words < min) bad(`only ${words} words (target ${min})`);
  }
  if (/lorem ipsum|TODO|CLIENT TO CONFIRM/i.test(html)) bad("placeholder text visible");

  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const data = JSON.parse(m[1]);
      if (!data["@context"] || !data["@type"]) bad("JSON-LD missing @context/@type");
      if (/AggregateRating|"Review"/.test(m[1])) bad("JSON-LD contains rating/review (needs real data)");
      if (data["@type"] === "FAQPage" && !data.mainEntity?.every((q) => q.name && q.acceptedAnswer?.text)) bad("FAQPage incomplete");
    } catch {
      bad("invalid JSON-LD");
    }
  }

  // internal links must resolve to a known page (static check against sitemap + known non-sitemap routes)
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (!pathSet.has(href) && !problems.includes(`link ${href}`)) {
      const r = await fetch(base + href, { redirect: "manual" });
      if (r.status >= 400) { problems.push(`${path}: broken link ${href} (${r.status})`); }
    }
  }
}

console.log(`Checked ${paths.length} pages.`);
if (problems.length) {
  console.log(`${problems.length} problem(s):\n` + problems.join("\n"));
  process.exit(1);
}
console.log("All checks passed.");
