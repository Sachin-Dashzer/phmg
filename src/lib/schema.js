import { firm, hasAddress } from "@/data/firm";
import { absUrl } from "./seo";

const compact = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v && (!Array.isArray(v) || v.length)));

export function organizationSchema() {
  const a = firm.address;
  return compact({
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService"],
    "@id": absUrl("/#organization"),
    name: firm.name,
    legalName: firm.legalName,
    url: absUrl("/"),
    logo: absUrl("/icon.svg"),
    telephone: firm.phone,
    email: firm.email,
    foundingDate: firm.foundedYear,
    areaServed: { "@type": "Country", name: "India" },
    sameAs: Object.values(firm.social).filter(Boolean),
    address: hasAddress()
      ? compact({
          "@type": "PostalAddress",
          streetAddress: [a.street, a.locality].filter(Boolean).join(", "),
          addressLocality: a.city,
          addressRegion: a.region,
          postalCode: a.postalCode,
          addressCountry: a.country,
        })
      : undefined,
    geo: firm.geo.lat && firm.geo.lng ? { "@type": "GeoCoordinates", latitude: firm.geo.lat, longitude: firm.geo.lng } : undefined,
  });
}

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absUrl(it.href),
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = ({ name, description, path, serviceType }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: serviceType || name,
  url: absUrl(path),
  provider: { "@id": absUrl("/#organization") },
  areaServed: { "@type": "Country", name: "India" },
});
