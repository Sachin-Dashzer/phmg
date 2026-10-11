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

/** Keep titles within ~60 chars: the brand suffix is dropped if too long. */
const withBrand = (t) => (t.length + 20 <= 60 ? `${t} | ${firm.name}` : t);

// ownImage: the route has its own opengraph-image file, so skip the default one.
export function buildMetadata({ title, description, path = "/", noindex = false, type = "website", ownImage = false, extra = {} }) {
  const url = absUrl(path);
  const images = ownImage ? undefined : [absUrl("/opengraph-image")];
  return {
    title: { absolute: withBrand(title) },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: firm.name, locale: "en_IN", type, ...(images && { images }) },
    twitter: { card: "summary_large_image", title, description, ...(images && { images }) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    ...extra,
  };
}
