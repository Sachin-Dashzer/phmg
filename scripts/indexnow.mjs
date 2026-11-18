#!/usr/bin/env node
// Tell IndexNow (Bing, and through it Copilot, plus Yandex and Seznam) which URLs changed.
//
//   npm run indexnow -- --dry-run          # print what would be sent, send nothing
//   npm run indexnow                       # send, then record the snapshot
//   npm run indexnow -- https://staging... # read a different sitemap
//
// Run it after each deploy. The first run has no snapshot to compare against, so it submits
// nothing and only records the current sitemap: a cold start would otherwise submit all 131
// URLs as "changed", which is noise rather than a signal.
//
// Google does not use IndexNow. The sitemap and Search Console remain the route there.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(root, ".indexnow-cache.json");
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10000; // IndexNow's per-request limit

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const base = (args.find((a) => a.startsWith("http")) || "https://www.phmgindia.com").replace(/\/$/, "");

/**
 * The key, from INDEXNOW_KEY or from the key file in public/. It is never written into this
 * script: the public file IS the proof of ownership, so reading it back is the same secret.
 */
function readKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  const file = readdirSync(join(root, "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!file) {
    console.error("No IndexNow key. Set INDEXNOW_KEY, or put <32-hex>.txt in public/ containing that key.");
    process.exit(1);
  }
  return readFileSync(join(root, "public", file), "utf8").trim();
}

/** [{ loc, lastmod }] from the sitemap, lastmod defaulting to "" when a URL has none. */
async function readSitemap() {
  const res = await fetch(`${base}/sitemap.xml`);
  if (!res.ok) {
    console.error(`sitemap.xml returned ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: /<loc>([^<]+)<\/loc>/.exec(m[1])?.[1] ?? "",
    lastmod: /<lastmod>([^<]+)<\/lastmod>/.exec(m[1])?.[1] ?? "",
  })).filter((u) => u.loc);
}

const key = readKey();
const urls = await readSitemap();
// The host IndexNow validates is the one the submitted URLs are on, which is the canonical origin
// the sitemap emits — not necessarily the origin the sitemap was fetched from. Reading it back
// means a run against a local build still submits, and proves ownership of, the live host.
const origin = new URL(urls[0].loc).origin;
const host = new URL(origin).host;
const now = Object.fromEntries(urls.map((u) => [u.loc, u.lastmod]));

const before = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf8")) : null;
// New URL or a changed lastmod. A URL dropped from the sitemap is not submitted: IndexNow has no
// way to say "gone", and the 410 the proxy serves is what tells the crawler that.
const changed = before
  ? Object.keys(now).filter((loc) => before[loc] !== now[loc])
  : [];

if (!before) {
  console.log(`No snapshot yet. Recording ${urls.length} URLs; nothing submitted on a cold start.`);
} else if (!changed.length) {
  console.log(`No lastmod changes across ${urls.length} sitemap URLs. Nothing to submit.`);
} else {
  console.log(`${changed.length} changed URL(s) of ${urls.length}:`);
  for (const u of changed) console.log("  " + u);
}

if (dryRun) {
  console.log("--dry-run: nothing sent, snapshot not written.");
  process.exit(0);
}

if (changed.length) {
  for (let i = 0; i < changed.length; i += MAX_URLS) {
    const urlList = changed.slice(i, i + MAX_URLS);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList }),
    });
    // 200 and 202 both mean accepted; 422 means the key or a URL did not match the host.
    console.log(`POST ${urlList.length} URL(s) -> ${res.status} ${res.statusText}`);
    if (!res.ok) {
      console.error(await res.text().catch(() => ""));
      process.exit(1);
    }
  }
}

writeFileSync(CACHE, JSON.stringify(now, null, 1) + "\n");
console.log(`Snapshot written to ${CACHE}`);
