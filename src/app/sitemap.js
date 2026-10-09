import { absUrl, reviewedToISO } from "@/lib/seo";
import { categories } from "@/data/categories";
import { team } from "@/data/team";
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";
import { articles, insightCategories, articlesIn } from "@/data/insights";
import { tools } from "@/data/tools";
import { publishedServices, servicesIn, serviceUrl } from "@/data/services";

// `new Date()` on every URL told search engines the whole site changes on every deploy, which
// makes lastModified worthless as a signal. Each entry now carries a real date: the service's
// lastReviewed, the article's updatedAt, the city's updatedAt, or this constant for static pages.
// Bump STATIC_REVIEWED when the static pages are actually edited.
const STATIC_REVIEWED = "2026-10-09";

// lastReviewed is a month name such as "October 2026"; reviewedToISO turns it into a real date.
const fromReviewed = (v) => reviewedToISO(v, STATIC_REVIEWED);

const staticPaths = ["/", "/about", ...(team.length ? ["/team"] : []), "/services", "/faq", "/contact", "/industries", "/locations", "/pricing", "/book-consultation", "/insights", "/tools", "/tax-calendar", "/download", "/privacy-policy", "/terms", "/disclaimer"];

export default function sitemap() {
  const entries = [
    ...staticPaths.map((p) => [p, STATIC_REVIEWED]),
    ...categories.filter((c) => servicesIn(c.slug).length).map((c) => [`/services/${c.slug}`, STATIC_REVIEWED]),
    ...publishedServices.map((s) => [serviceUrl(s), fromReviewed(s.lastReviewed)]),
    ...industries.map((i) => [`/industries/${i.slug}`, STATIC_REVIEWED]),
    ...cities.map((c) => [`/ca-in-${c.slug}`, c.updatedAt || STATIC_REVIEWED]),
    ...insightCategories.filter((c) => articlesIn(c.slug).length).map((c) => [`/insights/category/${c.slug}`, STATIC_REVIEWED]),
    ...articles.map((a) => [`/insights/${a.slug}`, a.updatedAt]),
    ...tools.map((t) => [`/tools/${t.slug}`, STATIC_REVIEWED]),
  ];
  return entries.map(([path, lastModified]) => ({ url: absUrl(path), lastModified }));
}
