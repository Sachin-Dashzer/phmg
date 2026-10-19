import { firm } from "@/data/firm";

export const SITE_URL = firm.url;
export const absUrl = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * Service pages carry `lastReviewed` as a month name ("October 2026") because that is what the
 * page shows a reader. Structured data and the sitemap both need an ISO date, so convert here and
 * use this in both places rather than parsing the string twice.
 * Built in UTC on purpose: `new Date("1 October 2026")` is midnight *local* time, which in IST
 * serialises back one day earlier as 2026-09-30.
 */
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
export const reviewedToISO = (value, fallback = "") => {
  const m = /^([a-z]+)\s+(\d{4})$/i.exec(String(value || "").trim());
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  if (month < 0) return fallback;
  return new Date(Date.UTC(Number(m[2]), month, 1)).toISOString().slice(0, 10);
};

/**
 * Keep titles within 60 characters, and aim for at least 50.
 *
 * The old rule appended " | PHMG & Associates" or nothing, so a 41-character title lost the brand
 * entirely for being one character over, and 74 of the 131 pages ended up below 50. The ladder
 * takes the longest form of the firm's name that still fits. Every entry is a real rendering of
 * the name — no invented variants, and no padding a title with keywords to reach a character
 * count, which would make it worse to read for the sake of a guideline.
 *
 * Three rungs cannot cover every base length, so WRITING A NEW TITLE means staying in one of
 * these windows, measured before the suffix is added:
 *
 *     7-17   ->  + " | PHMG & Associates, Chartered Accountants"  ->  50-60
 *     30-40  ->  + " | PHMG & Associates"                         ->  50-60
 *     43-53  ->  + " | PHMG"                                      ->  50-60
 *     54-60  ->  no suffix fits, the title stands alone           ->  54-60
 *
 * 18-29 and 41-42 land short of 50, and scripts/seo-audit.mjs fails on them. Say something more
 * useful about the page rather than reaching for filler: that is how all 74 were fixed.
 */
const BRAND_SUFFIXES = [` | ${firm.name}, ${firm.tagline}`, ` | ${firm.name}`, " | PHMG"];
const withBrand = (t) => BRAND_SUFFIXES.map((s) => t + s).find((v) => v.length <= 60) ?? t;

// ownImage: the route has its own opengraph-image file, so skip the default one.
export function buildMetadata({ title, description, path = "/", noindex = false, type = "website", ownImage = false, extra = {} }) {
  const url = absUrl(path);
  const images = ownImage ? undefined : [absUrl("/opengraph-image")];
  return {
    title: { absolute: withBrand(title) },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: firm.name, locale: "en_IN", type, ...(images && { images }) },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(firm.xHandle && { site: firm.xHandle, creator: firm.xHandle }),
      ...(images && { images }),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    ...extra,
  };
}
