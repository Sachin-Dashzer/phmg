import { firm, offices, getOffice } from "@/data/firm";
import { publishedServices, serviceUrl } from "@/data/services";
import { getCategory } from "@/data/categories";
import { cities } from "@/data/cities";
import { team } from "@/data/team";
import { absUrl } from "@/lib/seo";

// The plain-text content of every published service page and city page, each section headed by its
// URL so a model can cite the right page. Generated from the same data the pages render from, so it
// cannot drift. /llms.txt is the short index; this is the full text.
//
// Kept to services and cities on purpose: those are the pages that answer questions. Articles are
// already linked from /llms.txt and have their own crawlable pages.

const rule = "=".repeat(78);

const bullets = (items) => items.map((t) => `- ${t}`).join("\n");

const table = ({ head, rows }) =>
  [head.join(" | "), head.map(() => "---").join(" | "), ...rows.map((r) => r.join(" | "))].join("\n");

// Render the in-depth blocks the page shows, in order, as plain text.
const sections = (blocks = []) =>
  blocks
    .map(([type, v]) => {
      if (type === "h2") return `\n## ${v}`;
      if (type === "p") return v;
      if (type === "ul") return bullets(v);
      if (type === "table") return table(v);
      if (type === "links") return bullets(v.map((l) => `${l.label}: ${l.href.startsWith("/") ? absUrl(l.href) : l.href}${l.note ? ` (${l.note})` : ""}`));
      return "";
    })
    .filter(Boolean)
    .join("\n\n");

const servicePage = (s) => {
  const cat = getCategory(s.category);
  return [
    rule,
    `URL: ${absUrl(serviceUrl(s))}`,
    `Title: ${s.h1}`,
    `Practice area: ${cat?.title || s.category}`,
    s.lastReviewed ? `Last reviewed: ${s.lastReviewed}` : null,
    rule,
    "",
    `## What it is`,
    s.definition,
    "",
    `## Overview`,
    s.intro,
    "",
    `## Who needs it`,
    bullets(s.whoNeedsIt),
    "",
    `## What the service covers`,
    bullets(s.benefits),
    "",
    sections(s.sections),
    "",
    `## Documents required`,
    bullets(s.documents),
    "",
    `## Process`,
    s.process.map((p, i) => `${i + 1}. ${p.title} (${p.time}): ${p.text}`).join("\n"),
    "",
    `## Due dates and consequences`,
    table({
      head: ["Item", "Due date", "If missed"],
      rows: s.deadlines.map((d) => [d.item, d.date, d.penalty]),
    }),
    s.dueNote ? `\nNote: ${s.dueNote}` : null,
    "",
    `## Mistakes to avoid`,
    bullets(s.mistakes),
    "",
    `## Frequently asked questions`,
    s.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n"),
    "",
    `## Related pages`,
    bullets(
      (s.related || [])
        .map((slug) => publishedServices.find((p) => p.slug === slug))
        .filter(Boolean)
        .map((r) => `${r.title}: ${absUrl(serviceUrl(r))}`)
    ),
    "",
  ]
    .filter((x) => x != null)
    .join("\n");
};

const cityPage = (c) => {
  const office = getOffice(c.officeCity);
  const head = c.branchHead ? team.find((t) => t.slug === c.branchHead) : null;
  return [
    rule,
    `URL: ${absUrl(`/ca-in-${c.slug}`)}`,
    `Title: ${c.title}`,
    office ? `Office: ${office.address}` : null,
    head ? `Branch head: ${head.name}, ${head.role}${head.credentials?.length ? ` (${head.credentials.join(", ")})` : ""}` : null,
    c.updatedAt ? `Last reviewed: ${c.updatedAt}` : null,
    rule,
    "",
    c.intro,
    "",
    ...c.local.flatMap((s) => [`## ${s.h}`, s.p, ""]),
    c.nearby?.length ? `## Areas served from this office\n${bullets(c.nearby)}\n` : null,
    `## Services most often requested here`,
    bullets(
      c.services
        .map((slug) => publishedServices.find((p) => p.slug === slug))
        .filter(Boolean)
        .map((s) => `${s.title}: ${absUrl(serviceUrl(s))}`)
    ),
    "",
    `## Frequently asked questions`,
    c.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n"),
    "",
  ]
    .filter((x) => x != null)
    .join("\n");
};

export function GET() {
  const body = [
    `# ${firm.name} — full text of service and city pages`,
    "",
    `> ${firm.name}, chartered accountants, established ${firm.foundedYear}. Reserve Bank of India Category-I and Comptroller and Auditor General of India empanelled. ${offices.length} offices: ${offices.map((o) => o.city).join(", ")}. Telephone ${firm.phone}, email ${firm.email}, website ${absUrl("/")}.`,
    "",
    "> This file contains the plain-text content of every published service page and city page, each headed by its URL. Content is general information and not professional advice. Section references are to the Income-tax Act, 1961 unless stated; the Income-tax Act, 2025 replaced it from 1 April 2026. Chartered accountants in India are regulated by the Institute of Chartered Accountants of India.",
    "",
    `> Generated from the site's own data. ${publishedServices.length} service pages and ${cities.length} city pages.`,
    "",
    "",
    "# Service pages",
    "",
    ...publishedServices.map(servicePage),
    "",
    "# City pages",
    "",
    ...cities.map(cityPage),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
