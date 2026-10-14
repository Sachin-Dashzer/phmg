import { firm, offices, waHref } from "@/data/firm";
import { categories } from "@/data/categories";
import { publishedServices, serviceUrl, servicesIn } from "@/data/services";
import { cities } from "@/data/cities";
import { team } from "@/data/team";
import { articles } from "@/data/insights";
import { calculators, utilities } from "@/data/knowledge-bank";
import { absUrl } from "@/lib/seo";

// Plain-text site summary for AI crawlers (llmstxt.org format). Generated from the same data the
// pages render from, so it cannot drift from the site. /llms-full.txt carries the page content.
export function GET() {
  const link = (title, path, note) => `- [${title}](${absUrl(path)})${note ? `: ${note}` : ""}`;
  // Labelled profiles, so an assistant can tell the firm's own accounts from accounts using its name.
  const profiles = [
    ["LinkedIn", firm.social.linkedin],
    ["Instagram", firm.social.instagram],
    ["X", firm.social.x],
    ["YouTube", firm.social.youtube],
    ["Facebook", firm.social.facebook],
    ["Google Business Profile", firm.social.googleBusiness],
  ].filter(([, href]) => href);

  const body = [
    `# ${firm.name}`,
    "",
    `> ${firm.name} is a firm of chartered accountants in India, established in ${firm.foundedYear}, providing audit and assurance, income tax, GST, company law, accounting, payroll, international tax and not-for-profit compliance services. It has ${offices.length} offices and works with clients across India. Content on this site is general information, not professional advice.`,
    "",
    "## Firm facts",
    `- Name: ${firm.name}`,
    `- Type: firm of chartered accountants, regulated by the Institute of Chartered Accountants of India`,
    `- Established: ${firm.foundedYear}`,
    `- Empanelments: Reserve Bank of India Category-I; Comptroller and Auditor General of India`,
    `- Head office: ${offices.find((o) => o.head)?.address || firm.address.street}`,
    `- Telephone: ${firm.phone}`,
    `- Email: ${firm.email}`,
    `- Website: ${absUrl("/")}`,
    ...(firm.icaiFrn ? [`- ICAI Firm Registration Number: ${firm.icaiFrn}`] : []),
    "",
    "### Official profiles",
    `- Website: ${absUrl("/")}`,
    ...profiles.map(([label, href]) => `- ${label}: ${href}`),
    `- Telephone: ${firm.phone}`,
    ...(firm.whatsapp ? [`- WhatsApp: ${waHref().split("?")[0]}`] : []),
    `- Email: ${firm.email}`,
    "",
    "### Offices",
    ...offices.map((o) => `- ${o.city}${o.head ? " (head office)" : ""}: ${o.address}`),
    "",
    "### Partners and branch heads",
    ...team.map((p) => `- ${p.name}, ${p.role}${p.credentials?.length ? ` (${p.credentials.join(", ")})` : ""}: ${p.focus.join(", ")}`),
    "",
    "### About this content",
    "- Chartered accountants in India are regulated by the Institute of Chartered Accountants of India, whose Code of Ethics restricts advertising and solicitation. Pages on this site are written as general information and avoid superlatives, comparisons, guarantees and testimonials.",
    "- Tax and company law statements, rates and due dates are general and change by notification. Service pages show the date they were last reviewed and link to the official source for the rules they state.",
    "- Section references are to the Income-tax Act, 1961 unless stated. The Income-tax Act, 2025 replaced it from 1 April 2026 and renumbers sections and forms.",
    "",
    "## Locations",
    ...cities.map((c) => link(c.title, `/ca-in-${c.slug}`, c.metaDescription)),
    link("All locations", "/locations", "the four offices and how remote work is handled"),
    "",
    "## Services by practice area",
    ...categories.flatMap((c) => [
      "",
      `### ${c.title}`,
      link(`${c.title} overview`, `/services/${c.slug}`, c.short),
      ...servicesIn(c.slug).map((s) => link(s.title, serviceUrl(s), s.definition ? s.definition.split(". ")[0] + "." : s.shortDesc)),
    ]),
    "",
    "## Guides",
    ...articles.map((a) => link(a.title, `/insights/${a.slug}`, a.description)),
    "",
    "## Knowledge Bank",
    link("Knowledge Bank", "/knowledge-bank", "calculators, reference tables and official sources"),
    ...calculators.map((c) => link(c.title, `/knowledge-bank/calculators/${c.slug}`, c.short)),
    ...utilities.map((u) => link(u.title, `/knowledge-bank/utilities/${u.slug}`, u.short)),
    link("Official sources", "/knowledge-bank/official-resources", "directory of the government sources behind the guidance on this site"),
    "",
    "## Company",
    link("About", "/about", `established ${firm.foundedYear}, RBI Category-I and CAG empanelled`),
    link("Team", "/team", "partners and branch heads with their qualifications"),
    link("Contact", "/contact"),
    link("Tax and compliance calendar", "/tax-calendar", "recurring statutory due dates"),
    link("Pricing approach", "/pricing", "how fees are determined; no fee schedule is published"),
    "",
    "## Full text",
    link("llms-full.txt", "/llms-full.txt", "the plain-text content of every service and city page"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
