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
  social: {
    linkedin: "https://www.linkedin.com/company/phmg-associates",
    facebook: "",
    instagram: "",
    youtube: "",
    googleBusiness: "",
  },
  empanelments: ["RBI Category-I Empanelled", "CAG of India Empanelled", "GST Litigation Specialists"],
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
export const offices = [
  { slug: "noida", city: "Noida", head: true, address: "D-23, 3rd Floor, Sector 59, Noida - 201301", locality: "Sector 59", region: "Uttar Pradesh", postalCode: "201301", geo: { lat: "", lng: "" }, mapUrl: "", hours: "" },
  { slug: "mumbai", city: "Mumbai", address: "C-2102, Vicinia, Powai Vihaar Road, Chandivali, Mumbai - 400072", locality: "Chandivali, Powai", region: "Maharashtra", postalCode: "400072", geo: { lat: "", lng: "" }, mapUrl: "", hours: "" },
  { slug: "delhi", city: "Delhi", address: "First Floor, 83-84, Sector 24, Rohini, Delhi - 110085", locality: "Sector 24, Rohini", region: "Delhi", postalCode: "110085", geo: { lat: "", lng: "" }, mapUrl: "", hours: "" },
  { slug: "ludhiana", city: "Ludhiana", address: "223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana", locality: "Industrial Area-A, Cheema Chowk", region: "Punjab", postalCode: "", geo: { lat: "", lng: "" }, mapUrl: "", hours: "" },
  { slug: "meerut", city: "Meerut", address: "Opp. Canara Bank, Near Mohiuddinpur Sugar Mill, Meerut - 250205", locality: "Mohiuddinpur", region: "Uttar Pradesh", postalCode: "250205", geo: { lat: "", lng: "" }, mapUrl: "", hours: "" },
];

export const getOffice = (slug) => offices.find((o) => o.slug === slug);

export const hasAddress = () => Boolean(firm.address.street && firm.address.city);
export const phoneHref = () => (firm.phone ? `tel:${firm.phone.replace(/[^+\d]/g, "")}` : "");
export const waHref = (text = "Hello PHMG & Associates, I would like to talk to a CA.") =>
  firm.whatsapp ? `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}` : "";
