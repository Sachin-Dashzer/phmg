// City landing pages. Build a page ONLY for cities the firm genuinely serves.
// Every city needs unique local content: never clone-swap names (doorway-page risk).
// TODO: CLIENT TO CONFIRM that Delhi NCR is served and add real office details in firm.js.
export const cities = [
  {
    slug: "delhi",
    name: "Delhi NCR",
    title: "Chartered Accountant in Delhi NCR",
    metaDescription: "CA services in Delhi NCR: ITR, GST, audit, ROC and company registration. Talk to our chartered accountants – call or WhatsApp today.",
    intro: "Delhi NCR has one of the densest business markets in India, with traders, manufacturers, startups and professionals spread across Delhi, Noida, Gurugram, Ghaziabad and Faridabad. We help them stay compliant, online and in person.",
    local: [
      { h: "A mix of trade and technology", p: "The region combines long-established wholesale and trading markets with newer technology, consulting and e-commerce firms. Traders usually need strong GST and stock records. Technology and service firms often need export documentation, ESOP planning and investor-ready books." },
      { h: "Registrations tied to your state", p: "Your GST registration is state-specific. A business with offices in Delhi, Noida and Gurugram is operating in three different states and needs a registration in each place from where it makes supplies. Company filings go to the Registrar of Companies for the state in which the registered office sits, so an address in Delhi, Uttar Pradesh or Haryana decides which registry handles your file." },
      { h: "Local licences and filings", p: "Depending on your activity you may also need state-level registrations such as shops and establishment licences, trade licences from local municipal bodies, or labour-law registrations. Rules differ between Delhi, Uttar Pradesh and Haryana, so we confirm what applies to your address before you start." },
      { h: "Working with you across the region", p: "Because most compliance work is digital, you can share documents securely and get filing proof by email. Where an in-person meeting helps, such as at the start of an audit or for a notice hearing, we arrange it." },
    ],
    services: ["itr-filing", "gst-registration", "gst-return-filing", "private-limited-company-registration", "statutory-audit", "annual-roc-filing"],
    faqs: [
      { q: "Do you serve businesses across Delhi, Noida, Gurugram, Ghaziabad and Faridabad?", a: "Yes. We work with clients across the NCR, mostly online, and arrange meetings when needed." },
      { q: "Which GST registration do I need if I have offices in Delhi and Noida?", a: "GST is registered state by state. If you supply from places in both Delhi and Uttar Pradesh, you generally need a registration in each state. We map your locations and advise." },
      { q: "Which Registrar handles my company if my office is in Gurugram?", a: "The Registrar for the state of the registered office. Companies in Haryana and Delhi fall under the Registrar of Companies, Delhi and Haryana. Companies in Uttar Pradesh fall under the Registrars in that state." },
      { q: "Can I get a consultation without visiting the office?", a: "Yes. We can hold the first consultation by phone or video and handle documents through a secure link." },
    ],
  },
];

export const getCity = (slug) => cities.find((c) => c.slug === slug);
