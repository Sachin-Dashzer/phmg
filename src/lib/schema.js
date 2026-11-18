import { firm, offices, hasAddress } from "@/data/firm";
import { getProfile } from "@/data/team";
import { cityByOffice } from "@/data/cities";
import { absUrl, reviewedToISO } from "./seo.js";

// Drops empty values so nothing half-filled reaches the structured data. Whenever a field below
// is gated on data being present, this is why: an empty geo or map URL simply does not appear.
const compact = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v && (!Array.isArray(v) || v.length)));

// schema.org wants an unambiguous number; the display form uses spaces, so hyphenate here rather
// than keep a second copy of the number in the data.
const telephone = firm.phone ? firm.phone.replace(/ /g, "-") : undefined;

// Hours are the same at every office, so one spec serves the firm and every office node.
// Sunday is absent because the offices are closed: schema.org reads a missing day as closed.
const openingHours = firm.hoursSpec?.map(({ days, opens, closes }) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: days,
  opens,
  closes,
}));

const postalAddress = ({ street, locality, city, region, postalCode, country = "IN" }) =>
  compact({
    "@type": "PostalAddress",
    streetAddress: [street, locality].filter(Boolean).join(", "),
    addressLocality: city,
    addressRegion: region,
    postalCode,
    addressCountry: country,
  });

// Main service areas, for `knowsAbout`. Kept factual: these are practice areas, not claims.
const KNOWS_ABOUT = [
  "Statutory audit",
  "Tax audit under Section 44AB",
  "Bank statutory and concurrent audit",
  "Internal audit",
  "Income tax return filing and assessments",
  "Income tax appeals and litigation",
  "Goods and Services Tax compliance and refunds",
  "Company and LLP incorporation",
  "Registrar of Companies compliance",
  "Accounting, bookkeeping and payroll",
  "Transfer pricing and international taxation",
  "FEMA and foreign investment reporting",
  "NGO, trust and FCRA compliance",
];

/**
 * One AccountingService node per office, referenced from the organisation.
 * Coordinates and the map link come from the matching city in cities.js, which is where they are
 * edited; the office contributes the address and hours.
 */
export const officeSchema = (o) => {
  const city = cityByOffice(o.slug);
  const geo = city?.geo;
  return compact({
    "@type": "AccountingService",
    "@id": absUrl(`/#office-${o.slug}`),
    name: `${firm.name} – ${o.city}`,
    url: absUrl(`/ca-in-${o.slug}`),
    // The Rich Results Test warns on an AccountingService with no image. The logo is the honest
    // choice: the office photos in /images/office are generic, not of a specific branch.
    image: absUrl("/logo.png"),
    telephone,
    email: firm.email,
    parentOrganization: { "@id": absUrl("/#organization") },
    // `street`/`locality`, not the full `address` string, or streetAddress would repeat the
    // city and PIN that addressLocality and postalCode already carry.
    address: postalAddress({
      street: o.street,
      locality: o.locality,
      city: o.city,
      region: o.region,
      postalCode: o.postalCode,
    }),
    // Only when the data is actually set, per REVIEW.md: no invented coordinates or map links.
    geo: geo?.lat && geo?.lng ? { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } : undefined,
    hasMap: city?.mapUrl || undefined,
    openingHoursSpecification: openingHours,
  });
};

export function organizationSchema() {
  const a = firm.address;
  return compact({
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService"],
    "@id": absUrl("/#organization"),
    name: firm.name,
    legalName: firm.legalName,
    // The names people and assistants actually type. Not marketing variants: these are the
    // short forms already used on the profiles and in correspondence.
    alternateName: ["PHMG", "PHMG India", "PHMG and Associates"],
    url: absUrl("/"),
    // Raster logo: Google's structured data guidance expects a crawlable raster image here,
    // not an SVG icon.
    logo: absUrl("/logo.png"),
    image: absUrl("/logo.png"),
    description:
      "PHMG & Associates is a firm of chartered accountants established in 2014, empanelled with the Reserve Bank of India in Category-I and with the Comptroller and Auditor General of India. It provides audit and assurance, income tax, GST, company law, accounting and international tax services from offices in Noida, Delhi, Ludhiana and Meerut.",
    telephone,
    email: firm.email,
    openingHoursSpecification: openingHours,
    foundingDate: firm.foundedYear,
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: KNOWS_ABOUT,
    // Only profiles that actually exist. LinkedIn is deliberately empty in firm.js until the
    // company page exists, so sameAs never points at a 404.
    sameAs: Object.values(firm.social).filter(Boolean),
    contactPoint: compact({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone,
      email: firm.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    }),
    address: hasAddress() ? postalAddress({ ...a, city: a.city }) : undefined,
    geo: firm.geo.lat && firm.geo.lng ? { "@type": "GeoCoordinates", latitude: firm.geo.lat, longitude: firm.geo.lng } : undefined,
    // Each office as its own node, so a local result can resolve to the right branch.
    subOrganization: offices.map(officeSchema),
  });
}

/** Home page only. No SearchAction: the site has no search. */
export const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absUrl("/#website"),
  name: firm.name,
  url: absUrl("/"),
  publisher: { "@id": absUrl("/#organization") },
  inLanguage: "en-IN",
});

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

/** A city page: that office's node, standing alone with the organisation referenced. */
export const cityOfficeSchema = (office) => ({
  "@context": "https://schema.org",
  ...officeSchema(office),
});

// No price or offer: the firm publishes no fees, so none is asserted here.
export const serviceSchema = ({ name, description, path, serviceType, audience, dateModified }) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    url: absUrl(path),
    provider: { "@id": absUrl("/#organization") },
    areaServed: [
      { "@type": "Country", name: "India" },
      ...offices.map((o) => ({ "@type": "City", name: o.city })),
    ],
    audience: audience ? { "@type": "Audience", audienceType: audience } : undefined,
    // lastReviewed arrives as a month name; structured data needs an ISO date.
    dateModified: reviewedToISO(dateModified) || undefined,
  });

// The designations the ICAI itself awards. Only these carry `recognizedBy`: an LLB, MBA or B.Com
// comes from a university, and naming the ICAI as the awarding body for them would be false.
const ICAI = "The Institute of Chartered Accountants of India";
const ICAI_CREDENTIALS = {
  CA: "Chartered Accountant",
  FCA: "Fellow Chartered Accountant",
  DISA: "Diploma in Information Systems Audit",
};

/** /team: one Person per partner. No ratings, no invented profile URLs. */
export const personSchema = (p) => {
  // `icaiMembership` and `linkedin` live in the profiles table in team.js and are empty until a
  // partner supplies them, so neither the identifier nor sameAs is asserted on a guess.
  const profile = getProfile(p.slug);
  return compact({
    "@type": "Person",
    "@id": absUrl(`/team#${p.slug}`),
    name: p.name,
    jobTitle: p.role,
    worksFor: { "@id": absUrl("/#organization") },
    image: p.photo ? absUrl(p.photo) : undefined,
    knowsAbout: p.focus,
    sameAs: [profile.linkedin].filter(Boolean),
    identifier: profile.icaiMembership
      ? { "@type": "PropertyValue", name: "ICAI membership number", value: profile.icaiMembership }
      : undefined,
    // `credentials` holds qualifications such as FCA, CA, LLB. Expressed both ways: honorificSuffix
    // for display and hasCredential for the machine-readable claim.
    honorificSuffix: p.credentials?.length ? p.credentials.join(", ") : undefined,
    hasCredential: p.credentials?.map((c) =>
      compact({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: ICAI_CREDENTIALS[c] || c,
        recognizedBy: ICAI_CREDENTIALS[c] ? { "@type": "Organization", name: ICAI } : undefined,
      })
    ),
  });
};

export const teamSchema = (team) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: team.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: personSchema(p) })),
});

/** An article. `reviewedBy` appears only when a reviewer is actually assigned. */
export const articleSchema = ({ title, description, slug, publishedAt, updatedAt, reviewer }) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    inLanguage: "en-IN",
    image: absUrl(`/insights/${slug}/opengraph-image`),
    author: { "@id": absUrl("/#organization") },
    publisher: {
      "@type": "Organization",
      "@id": absUrl("/#organization"),
      name: firm.name,
      logo: { "@type": "ImageObject", url: absUrl("/logo.png") },
    },
    reviewedBy: reviewer ? personSchema(reviewer) : undefined,
    mainEntityOfPage: absUrl(`/insights/${slug}`),
  });
