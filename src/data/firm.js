// Single source of truth for firm facts (NAP, social, trust numbers).
// Source: PHMG_Profile_Updated.pdf. Empty values are hidden in the UI.
// Never invent numbers, ratings or names — leave empty until confirmed.

export const firm = {
  name: "PHMG & Associates",
  legalName: "PHMG & Associates",
  tagline: "Chartered Accountants",
  strapline: "Assurance | Tax | Advisory | Litigation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.phmgindia.com",
  domain: "phmgindia.com",
  icaiFrn: "", // TODO: CLIENT TO CONFIRM (not in profile)
  foundedYear: "2014",
  phone: "+91 96677 22802",
  phone2: "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919667722802",
  email: "associatesphmg@gmail.com",
  email2: "",
  // Identical at every office. `hours` is the display string; `hoursSpec` is the machine-readable
  // form for openingHoursSpecification. Sunday is closed, so it is simply absent from the spec.
  hours: "Mon–Fri 10:30–19:00 · Sat 10:30–17:00 · Sun closed",
  hoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:30", closes: "19:00" },
    { days: ["Saturday"], opens: "10:30", closes: "17:00" },
  ],
  primaryCity: "Noida",
  address: {
    street: "D-23, 3rd Floor, Sector 59",
    locality: "",
    city: "Noida",
    region: "Uttar Pradesh",
    postalCode: "201301",
    country: "IN",
  },
  geo: { lat: "", lng: "" },
  // Only profiles that actually exist: every value here goes into `sameAs` in the organisation
  // schema and into the footer, and a sameAs pointing at a 404 is worse than an absent one.
  social: {
    linkedin: "https://www.linkedin.com/company/phmgindia", // supplied in the Oct 2026 audit — confirm it resolves
    facebook: "https://www.facebook.com/phmgassociates",
    instagram: "https://www.instagram.com/phmgassociates/",
    youtube: "https://www.youtube.com/@phmgindia",
    x: "https://x.com/PHMGAssociates",
    googleBusiness: "",
  },
  // The @handle for Twitter-card metadata. The profile URL above is what `sameAs` uses.
  xHandle: "@PHMGAssociates",
  // "Specialists" is a self-description the ICAI rules discourage; the other two are factual
  // empanelments. Flagged for a partner decision in REVIEW.md.
  empanelments: ["RBI Category-I Empanelled", "CAG of India Empanelled", "GST Litigation & Advisory"],
  stats: {
    yearsExperience: "10+",
    assignments: "400+",
    // Counted from `offices` below, so closing or opening a branch updates the stats band
    // without anyone remembering to edit a number here.
    offices: "",
    statesServed: "",
    professionals: "50+",
  },
  testimonials: [],
  googleRating: null,
};

// Head office first. Branch addresses as printed in the profile.
// `slug` ties an office to its city page and to its /#office-{slug} node in the schema.
// `geo` and `mapUrl` are empty until confirmed: the UI and the schema both omit what is empty,
// so a "Get directions" link and a geo node appear only once they are set.
// TODO: CLIENT TO CONFIRM coordinates, map links and the Meerut building number. Tracked in
// REVIEW.md. Never invent these.
// Hours are identical at every office, so they live on `firm` rather than being repeated here.
// `address` is the full printed address, used wherever the address is displayed.
// `street` and `locality` are the same address split for structured data, so streetAddress does
// not repeat the city and PIN that already have their own fields. Keep the two in step.
//
// Coordinates and the map link live on the matching city in src/data/cities.js, not here, so that
// everything a person edits for a city page sits in one file.
export const offices = [
  { slug: "noida", city: "Noida", head: true, address: "D-23, 3rd Floor, Sector 59, Noida - 201301", street: "D-23, 3rd Floor", locality: "Sector 59", region: "Uttar Pradesh", postalCode: "201301" },
  { slug: "delhi", city: "Delhi", address: "First Floor, 83-84, Sector 24, Rohini, Delhi - 110085", street: "First Floor, 83-84", locality: "Sector 24, Rohini", region: "Delhi", postalCode: "110085" },
  { slug: "ludhiana", city: "Ludhiana", address: "223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana - 141003", street: "223, First Floor", locality: "Industrial Area-A, Cheema Chowk", region: "Punjab", postalCode: "141003" },
  { slug: "meerut", city: "Meerut", address: "Opp. Canara Bank, Near Mohiuddinpur Sugar Mill, Meerut - 250205", street: "Opp. Canara Bank", locality: "Near Mohiuddinpur Sugar Mill", region: "Uttar Pradesh", postalCode: "250205" },
];

// Counted, not typed: the stats band stays true when the office list changes.
firm.stats.offices = String(offices.length);
firm.stats.statesServed = String(new Set(offices.map((o) => o.region)).size);

export const getOffice = (slug) => offices.find((o) => o.slug === slug);

export const hasAddress = () => Boolean(firm.address.street && firm.address.city);
export const phoneHref = () => (firm.phone ? `tel:${firm.phone.replace(/[^+\d]/g, "")}` : "");
export const waHref = (text = "Hello PHMG & Associates, I would like to talk to a CA.") =>
  firm.whatsapp ? `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}` : "";
