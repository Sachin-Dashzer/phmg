// Single source of truth for firm facts (NAP, social, trust numbers).
// Source: PHMG_Profile_Updated.pdf. Empty values are hidden in the UI.
// Never invent numbers, ratings or names — leave empty until confirmed.

export const firm = {
  name: "PHMG & Associates",
  legalName: "PHMG & Associates",
  tagline: "Chartered Accountants",
  strapline: "Assurance | Tax | Advisory | Litigation",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phmgindia.com",
  domain: "phmgindia.com",
  icaiFrn: "", // TODO: CLIENT TO CONFIRM (not in profile)
  foundedYear: "2014",
  phone: "+91 9718115480",
  phone2: "+91 9654123003",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  email: "piyushm@phmgindia.com",
  email2: "caankit@phmgindia.com",
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
export const offices = [
  { city: "Noida", head: true, address: "D-23, 3rd Floor, Sector 59, Noida - 201301" },
  { city: "Mumbai", address: "C-2102, Vicinia, Powai Vihaar Road, Chandivali, Mumbai - 400072" },
  { city: "Delhi", address: "First Floor, 83-84, Sector 24, Rohini, Delhi - 110085" },
  { city: "Ludhiana", address: "223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana" },
  { city: "Meerut", address: "Opp. Canara Bank, Near Mohiuddinpur Sugar Mill, Meerut - 250205" },
];

export const hasAddress = () => Boolean(firm.address.street && firm.address.city);
export const phoneHref = () => (firm.phone ? `tel:${firm.phone.replace(/[^+\d]/g, "")}` : "");
export const waHref = (text = "Hello PHMG & Associates, I would like to talk to a CA.") =>
  firm.whatsapp ? `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}` : "";
