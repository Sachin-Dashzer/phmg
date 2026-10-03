// Industry pages. Case studies are deliberately omitted until the firm has real, consented ones.
// Shape: { slug, title, metaDescription, intro, challenges[], value[{t,d}], services[slugs], faqs[{q,a}] }
export const industries = [
  {
    slug: "it-saas-startups",
    title: "IT, SaaS & Startups",
    metaDescription: "CA services for IT, SaaS and startup businesses: incorporation, GST on exports, ESOPs, valuation and compliance. Talk to our chartered accountants.",
    intro: "Technology companies grow fast, raise money in rounds and often sell across borders. Their books and filings need to keep pace with that speed.",
    challenges: [
      "Choosing the right entity before the first funding round.",
      "GST treatment of software services, exports and foreign payments.",
      "Granting ESOPs and keeping valuation records for investors.",
      "Revenue recognition and clean MIS for diligence.",
    ],
    value: [
      { t: "Structure first", d: "We help you incorporate the right entity and set up registrations so later rounds are simpler." },
      { t: "Cross-border clarity", d: "We advise on export of services, LUT, foreign remittances and related reporting." },
      { t: "Investor-ready records", d: "Monthly books, MIS and compliance files that stand up in due diligence." },
    ],
    services: ["private-limited-company-registration", "startup-india-registration", "gst-return-filing", "business-valuation", "bookkeeping-services"],
    faqs: [
      { q: "Is GST applicable on software exports?", a: "Export of services can be treated as zero-rated if the conditions are met, usually with an LUT. We check your invoices and receipts against the conditions." },
      { q: "When should a startup get a valuation?", a: "Typically before issuing shares or granting ESOPs, and whenever a regulation requires a valuation report for the transaction." },
      { q: "Do we need an audit in the first year?", a: "Yes. Every company needs a statutory audit each year, even in the first year with little revenue." },
    ],
  },
  {
    slug: "ecommerce-retail",
    title: "E-commerce & Retail",
    metaDescription: "CA services for e-commerce sellers and retailers: GST registration, returns, reconciliation of marketplace data and bookkeeping. Get a free quote.",
    intro: "Online and retail businesses deal with high transaction volumes, multiple sales channels and marketplace deductions. Accurate reconciliation is the difference between a clean return and a notice.",
    challenges: [
      "Reconciling marketplace settlements with sales and fees.",
      "GST registration across states for warehouses and sellers.",
      "TCS credit and input tax credit matching.",
      "Inventory valuation and returns accounting.",
    ],
    value: [
      { t: "Marketplace-ready books", d: "We reconcile settlements, fees and returns so your profit is real, not estimated." },
      { t: "GST discipline", d: "Timely returns with credit matched against your portal data." },
      { t: "Scalable set-up", d: "A chart of accounts and process that works as you add channels and states." },
    ],
    services: ["gst-registration", "gst-return-filing", "bookkeeping-services", "udyam-registration", "trademark-registration"],
    faqs: [
      { q: "Do online sellers need GST registration?", a: "In most cases selling through e-commerce operators requires registration, with limited exceptions. We confirm the rule for your products and turnover." },
      { q: "Can I claim credit for TCS deducted by the marketplace?", a: "Yes, the TCS credit appears in your electronic cash ledger after the operator files, and can be used for tax payment." },
      { q: "How do I handle returns and refunds in books?", a: "Through credit notes and matching entries so revenue and tax reflect net sales. We set this up in your accounting tool." },
    ],
  },
  {
    slug: "real-estate-construction",
    title: "Real Estate & Construction",
    metaDescription: "CA services for real estate and construction: GST on works contracts, TDS, project accounting, audit and tax planning. Talk to our chartered accountants.",
    intro: "Long project cycles, advance receipts and many contractors make compliance in this sector complex. Good project-level records keep tax and audit manageable.",
    challenges: [
      "Recognising revenue and cost project by project.",
      "GST on works contracts, sales and under-construction property.",
      "TDS on payments to contractors and on property purchases.",
      "Funding documentation for banks and investors.",
    ],
    value: [
      { t: "Project accounting", d: "Separate books and MIS for each project." },
      { t: "Tax and GST review", d: "We check how tax is charged and credits are claimed across the project cycle." },
      { t: "Audit and lender support", d: "Certifications, CMA data and audits that lenders accept." },
    ],
    services: ["statutory-audit", "tax-audit", "gst-return-filing", "business-loan-assistance", "bookkeeping-services"],
    faqs: [
      { q: "Is GST charged on under-construction property?", a: "Yes, as per the rates and conditions in force, which have changed. We confirm the current treatment for your project." },
      { q: "Do builders need tax audit?", a: "If turnover crosses the Section 44AB limits, yes. Companies also need a statutory audit regardless." },
      { q: "How should advances from buyers be recorded?", a: "As liabilities until revenue recognition conditions are met, in line with the applicable accounting standard." },
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    metaDescription: "CA services for manufacturers: GST and ITC, costing, stock audit, MSME registration and bank finance documentation. Request a quote.",
    intro: "Manufacturers carry inventory, raw material credits and bank finance. Clean costing and credit management protect margins.",
    challenges: [
      "Input tax credit on raw materials and capital goods.",
      "Inventory valuation and stock audits for lenders.",
      "MSME status, payment timelines and benefits.",
      "Working capital finance paperwork.",
    ],
    value: [
      { t: "Credit and compliance", d: "Regular reconciliation of credit and returns." },
      { t: "Stock and audit support", d: "Stock audit and statutory audit that satisfy banks." },
      { t: "Finance documentation", d: "CMA data and project reports prepared from your books." },
    ],
    services: ["gst-return-filing", "udyam-registration", "statutory-audit", "business-loan-assistance", "tax-audit"],
    faqs: [
      { q: "Is Udyam registration useful for manufacturers?", a: "It is the basis for MSME benefits such as priority lending and timely payment rules, subject to eligibility." },
      { q: "What is a stock audit?", a: "It is a verification of inventory quantities and valuation, usually required by the bank that finances the working capital." },
      { q: "Can I claim ITC on machinery?", a: "Credit on capital goods is generally available if used for taxable supplies and not blocked under the law. We review each case." },
    ],
  },
  {
    slug: "healthcare-pharma",
    title: "Healthcare & Pharma",
    metaDescription: "CA services for clinics, hospitals and pharma businesses: registration, GST, audit, payroll and tax planning. Talk to our chartered accountants.",
    intro: "Clinics, diagnostic centres and pharma traders have a mix of exempt and taxable supplies, plus licences and staff costs to manage.",
    challenges: [
      "Separating exempt healthcare services from taxable supplies.",
      "Payroll and statutory dues for clinical staff.",
      "Entity structure for partners and doctors.",
      "Capital planning for equipment purchases.",
    ],
    value: [
      { t: "Correct GST position", d: "We map each service to its GST treatment and credit eligibility." },
      { t: "Payroll compliance", d: "PF, ESI and TDS handled together." },
      { t: "Entity and tax planning", d: "Structure suited to partners and growth plans." },
    ],
    services: ["gst-registration", "payroll-services", "llp-registration", "tax-audit", "itr-filing"],
    faqs: [
      { q: "Are healthcare services exempt from GST?", a: "Certain healthcare services by clinical establishments are exempt, but other supplies such as some medicines, goods and rentals may be taxable. We check each stream." },
      { q: "Can doctors form an LLP?", a: "Professionals can form an LLP, subject to the rules of their regulating councils. We advise on structure." },
      { q: "Is tax audit needed for professionals?", a: "If gross receipts cross the professional limit in Section 44AB, yes." },
    ],
  },
  {
    slug: "professionals",
    title: "Professionals",
    metaDescription: "Tax and compliance support for doctors, lawyers, architects and consultants: ITR, presumptive tax, GST and advance tax. Get a free quote.",
    intro: "Doctors, lawyers, architects and other independent professionals are taxed on receipts and expenses, have advance tax duties and may need GST. Simple, regular records make filing easy.",
    challenges: [
      "Choosing between regular accounts and presumptive taxation.",
      "Advance tax every quarter.",
      "GST thresholds and registration timing.",
      "TDS deducted by clients and matching it.",
    ],
    value: [
      { t: "Right scheme", d: "We compare presumptive and regular computation and recommend the better one." },
      { t: "Advance tax planning", d: "Estimates before each instalment to avoid interest." },
      { t: "One yearly calendar", d: "ITR, GST, TDS credit and advance tax in one plan." },
    ],
    services: ["itr-filing", "tax-planning", "gst-registration", "tax-audit", "advance-tax"],
    faqs: [
      { q: "What is presumptive taxation for professionals?", a: "Section 44ADA lets eligible professionals declare a prescribed percentage of receipts as income, without maintaining detailed books, subject to limits." },
      { q: "Do professionals need GST?", a: "If service turnover crosses the threshold, yes. Many professionals below the threshold do not need to register." },
      { q: "Is advance tax compulsory?", a: "If your tax liability for the year is above the prescribed limit, yes. Interest applies if instalments are short or late." },
    ],
  },
  {
    slug: "freelancers-creators",
    title: "Freelancers & Creators",
    metaDescription: "CA services for freelancers and content creators: ITR, GST, foreign income, advance tax and expense planning. Get help from our CAs today.",
    intro: "Freelancers and creators often earn from several platforms and countries, with little TDS. Planning ahead avoids a heavy tax bill at year end.",
    challenges: [
      "Foreign income and export of services.",
      "Platform payouts that do not show TDS.",
      "Deciding when to register for GST.",
      "Tracking expenses without a proper bookkeeping habit.",
    ],
    value: [
      { t: "Simple monthly routine", d: "A light process to track income and expenses." },
      { t: "Export documentation", d: "Guidance on invoices, LUT and foreign payment proofs." },
      { t: "Year-round advice", d: "Advance tax and regime choice before deadlines." },
    ],
    services: ["itr-filing", "gst-registration", "tax-planning", "bookkeeping-services", "advance-tax"],
    faqs: [
      { q: "Do freelancers need GST registration?", a: "Once aggregate turnover crosses the threshold for services, yes. Exports of services follow specific conditions." },
      { q: "How is income from foreign clients taxed?", a: "It is taxable in India for residents, with possible relief for foreign taxes under a treaty. Receipts must be through proper banking channels." },
      { q: "Which ITR form do freelancers use?", a: "Usually ITR-3 or ITR-4, depending on whether they use presumptive taxation." },
    ],
  },
  {
    slug: "ngos-trusts",
    title: "NGOs & Trusts",
    metaDescription: "CA services for NGOs, trusts and Section 8 companies: registration, 12A, 80G, audit and annual compliance. Talk to our chartered accountants.",
    intro: "Non-profits must protect their tax exemption and show donors where money goes. Clean records and timely filings are essential.",
    challenges: [
      "Getting and renewing 12A and 80G registrations.",
      "Audit and utilisation reporting.",
      "Maintaining separate records for projects and grants.",
      "Meeting FCRA and CSR documentation requirements.",
    ],
    value: [
      { t: "Registration support", d: "Structure, registration and tax exemption applications." },
      { t: "Compliance calendar", d: "Audit, returns and renewals tracked in advance." },
      { t: "Donor-ready reporting", d: "Utilisation statements and audited accounts." },
    ],
    services: ["section-8-company", "12a-80g-registration", "statutory-audit", "annual-roc-filing", "itr-filing"],
    faqs: [
      { q: "Do trusts need to file income tax returns?", a: "Yes, trusts and institutions generally must file a return, and audit applies above prescribed limits, to retain their exemption." },
      { q: "What is 80G?", a: "Registration under Section 80G lets donors claim a deduction for donations, subject to the conditions." },
      { q: "Can an NGO be a Section 8 company?", a: "Yes. Many NGOs choose this structure for governance and credibility with corporate donors." },
    ],
  },
  {
    slug: "export-import",
    title: "Export & Import",
    metaDescription: "CA services for exporters and importers: IEC, GST LUT and refunds, FEMA, Form 15CA/15CB and compliance. Request a quote from our CAs.",
    intro: "Trading across borders involves registrations, foreign exchange rules and tax refunds. Missed steps delay payments and refunds.",
    challenges: [
      "IEC registration and foreign trade documentation.",
      "GST on exports, LUT and refund claims.",
      "Foreign remittance certification and reporting.",
      "Realisation of export proceeds within time limits.",
    ],
    value: [
      { t: "Registrations done right", d: "IEC, GST and related registrations with correct classification." },
      { t: "Refund readiness", d: "Documents and reconciliations that support GST refunds." },
      { t: "FEMA awareness", d: "Guidance on remittances and reporting." },
    ],
    services: ["gst-registration", "gst-return-filing", "nri-tax-filing", "business-valuation"],
    faqs: [
      { q: "What is an LUT?", a: "A Letter of Undertaking lets exporters supply goods or services without paying IGST, subject to conditions, instead of paying tax and claiming a refund." },
      { q: "Is IEC needed for service exports?", a: "Generally not for services, but it is needed for goods. Rules vary, so we confirm." },
      { q: "What is Form 15CA/15CB?", a: "Declaration and CA certificate required for many foreign remittances, mainly for payments to non-residents." },
    ],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
