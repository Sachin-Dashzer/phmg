import { absUrl } from "@/lib/seo";
import { categories } from "@/data/categories";
import { team } from "@/data/team";
import { industries } from "@/data/industries";
import { cities } from "@/data/cities";
import { articles, insightCategories, articlesIn } from "@/data/insights";
import { tools } from "@/data/tools";
import { publishedServices, servicesIn, serviceUrl } from "@/data/services";

const staticPaths = ["/", "/about", ...(team.length ? ["/team"] : []), "/services", "/faq", "/contact", "/industries", "/locations", "/pricing", "/book-consultation", "/insights", "/tools", "/tax-calendar", "/download", "/privacy-policy", "/terms", "/disclaimer"];

export default function sitemap() {
  const paths = [
    ...staticPaths,
    ...categories.filter((c) => servicesIn(c.slug).length).map((c) => `/services/${c.slug}`),
    ...publishedServices.map(serviceUrl),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...cities.map((c) => `/ca-in-${c.slug}`),
    ...insightCategories.filter((c) => articlesIn(c.slug).length).map((c) => `/insights/category/${c.slug}`),
    ...articles.map((a) => `/insights/${a.slug}`),
    ...tools.map((t) => `/tools/${t.slug}`),
  ];
  return paths.map((p) => ({ url: absUrl(p), lastModified: new Date() }));
}
