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
  hours: "", // TODO: CLIENT TO CONFIRM
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
  // schema, and a sameAs pointing at a 404 is worse than an absent one.
  // LinkedIn is cleared until the company page exists — see REVIEW.md.
  social: {
    linkedin: "", // TODO: CLIENT TO CONFIRM — the company page did not resolve
    facebook: "",
    instagram: "https://www.instagram.com/phmgassociates/",
    youtube: "https://www.youtube.com/@phmgindia",
    x: "https://x.com/PHMGAssociates",
    googleBusiness: "",
  },
  // "Specialists" is a self-description the ICAI rules discourage; the other two are factual
  // empanelments. Flagged for a partner decision in REVIEW.md.
  empanelments: ["RBI Category-I Empanelled", "CAG of India Empanelled", "GST Litigation & Advisory"],
  // Renders the "Trusted by banks, PSUs and businesses" strip with its 16 named clients.
  // Defaults to true, so nothing changes until a partner decides. Naming clients may fall foul
  // of the ICAI restrictions on advertising and may need each client's consent — see REVIEW.md.
  showClientList: true,
  stats: {
    yearsExperience: "10+",
    assignments: "400+",
    offices: "5",
    statesServed: "4",
    professionals: "50+",
  },
  testimonials: [],
  googleRating: null,
};

// Head office first. Branch addresses as printed in the profile.
// `slug` ties an office to its city page and to its /#office-{slug} node in the schema.
// `geo`, `mapUrl` and `hours` are empty until confirmed: the UI and the schema both omit
// what is empty, so a "Get directions" link and a geo/openingHours node appear only once set.
// TODO: CLIENT TO CONFIRM coordinates, map links, office hours, the Ludhiana PIN code and the
// Meerut building number. Tracked in REVIEW.md. Never invent these.
// `address` is the full printed address, used wherever the address is displayed.
// `street` and `locality` are the same address split for structured data, so streetAddress does
// not repeat the city and PIN that already have their own fields. Keep the two in step.
//
// Coordinates and the map link live on the matching city in src/data/cities.js, not here, so that
// everything a person edits for a city page sits in one file. `hours` stays here because it is a
// property of the office rather than of the page.
export const offices = [
  { slug: "noida", city: "Noida", head: true, address: "D-23, 3rd Floor, Sector 59, Noida - 201301", street: "D-23, 3rd Floor", locality: "Sector 59", region: "Uttar Pradesh", postalCode: "201301", hours: "" },
  { slug: "mumbai", city: "Mumbai", address: "C-2102, Vicinia, Powai Vihaar Road, Chandivali, Mumbai - 400072", street: "C-2102, Vicinia, Powai Vihaar Road", locality: "Chandivali, Powai", region: "Maharashtra", postalCode: "400072", hours: "" },
  { slug: "delhi", city: "Delhi", address: "First Floor, 83-84, Sector 24, Rohini, Delhi - 110085", street: "First Floor, 83-84", locality: "Sector 24, Rohini", region: "Delhi", postalCode: "110085", hours: "" },
  { slug: "ludhiana", city: "Ludhiana", address: "223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana", street: "223, First Floor", locality: "Industrial Area-A, Cheema Chowk", region: "Punjab", postalCode: "", hours: "" },
  { slug: "meerut", city: "Meerut", address: "Opp. Canara Bank, Near Mohiuddinpur Sugar Mill, Meerut - 250205", street: "Opp. Canara Bank", locality: "Near Mohiuddinpur Sugar Mill", region: "Uttar Pradesh", postalCode: "250205", hours: "" },
];

export const getOffice = (slug) => offices.find((o) => o.slug === slug);

export const hasAddress = () => Boolean(firm.address.street && firm.address.city);
export const phoneHref = () => (firm.phone ? `tel:${firm.phone.replace(/[^+\d]/g, "")}` : "");
export const waHref = (text = "Hello PHMG & Associates, I would like to talk to a CA.") =>
  firm.whatsapp ? `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}` : "";
