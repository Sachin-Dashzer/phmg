// Single source of truth for firm facts (NAP, social, trust numbers).
// Empty values are hidden in the UI. Fill them in before launch.
// Never invent numbers, ratings or names — leave empty until confirmed.

export const firm = {
  name: "PHMG & Associates",
  legalName: "PHMG & Associates", // TODO: CLIENT TO CONFIRM (registered firm name)
  tagline: "Chartered Accountants",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phmgindia.com",
  domain: "phmgindia.com",
  icaiFrn: "", // TODO: CLIENT TO CONFIRM (ICAI Firm Registration No.)
  foundedYear: "", // TODO: CLIENT TO CONFIRM
  phone: "", // TODO: CLIENT TO CONFIRM e.g. "+91 98XXXXXXXX"
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "", // digits with country code, e.g. 9198XXXXXXXX
  email: "", // TODO: CLIENT TO CONFIRM
  hours: "", // TODO: CLIENT TO CONFIRM e.g. "Mon–Sat, 10:00–19:00"
  primaryCity: "Delhi NCR", // TODO: CLIENT TO CONFIRM head-office city
  address: {
    street: "", // TODO: CLIENT TO CONFIRM
    locality: "",
    city: "",
    region: "",
    postalCode: "",
    country: "IN",
  },
  geo: { lat: "", lng: "" }, // TODO: CLIENT TO CONFIRM
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
    googleBusiness: "",
  },
  // Real numbers only. Counters/chips render only for non-empty values.
  stats: {
    yearsExperience: "",
    clientsServed: "",
    returnsFiled: "",
    gstRegistrations: "",
    statesServed: "",
  },
  // Real, consented reviews only. Shape: { name, role, text, url }
  testimonials: [],
  googleRating: null, // { value, count, url } only when verified
};

export const hasAddress = () => Boolean(firm.address.street && firm.address.city);
export const phoneHref = () => (firm.phone ? `tel:${firm.phone.replace(/[^+\d]/g, "")}` : "");
export const waHref = (text = "Hello PHMG & Associates, I would like to talk to a CA.") =>
  firm.whatsapp ? `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}` : "";
