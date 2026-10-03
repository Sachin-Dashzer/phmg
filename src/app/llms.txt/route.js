import { firm } from "@/data/firm";
import { categories } from "@/data/categories";
import { publishedServices, serviceUrl } from "@/data/services";
import { articles } from "@/data/insights";
import { tools } from "@/data/tools";
import { absUrl } from "@/lib/seo";

// Plain-text site summary for AI crawlers (llmstxt.org format).
export function GET() {
  const link = (title, path, note) => `- [${title}](${absUrl(path)})${note ? `: ${note}` : ""}`;
  const body = [
    `# ${firm.name}`,
    "",
    `> ${firm.name} is a firm of chartered accountants in India offering income tax, GST, audit, company registration, ROC compliance, accounting and NRI services, online across India. Content is general information, not professional advice.`,
    "",
    "## Services",
    ...categories.map((c) => link(c.title, `/services/${c.slug}`, c.short)),
    ...publishedServices.map((s) => link(s.title, serviceUrl(s), s.shortDesc)),
    "",
    "## Guides",
    ...articles.map((a) => link(a.title, `/insights/${a.slug}`, a.description)),
    "",
    "## Tools",
    ...tools.map((t) => link(t.title, `/tools/${t.slug}`, t.short)),
    "",
    "## Company",
    link("About", "/about"),
    link("Contact", "/contact"),
    link("Tax and compliance calendar", "/tax-calendar"),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
