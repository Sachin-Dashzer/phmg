export const categories = [
  { slug: "audit-assurance", title: "Audit & Assurance", icon: "ClipboardCheck", short: "Statutory, tax, internal and stock audits with clear, timely reporting.", intro: "Independent audit and assurance for companies, LLPs, firms and trusts, delivered by qualified chartered accountants." },
  { slug: "income-tax", title: "Income Tax", icon: "FileText", short: "ITR filing, notices, appeals and year-round tax planning.", intro: "Accurate income tax return filing, notice handling and tax planning for individuals, professionals and businesses." },
  { slug: "gst", title: "GST & Indirect Tax", icon: "Receipt", short: "GST registration, returns, notices, refunds and reconciliations.", intro: "End-to-end GST support, from registration to monthly returns, reconciliations, refunds and departmental notices." },
  { slug: "business-registration", title: "Company & Business Registration", icon: "Building2", short: "Private limited, LLP, OPC, partnership, Section 8 and more.", intro: "Choose the right entity and get it registered correctly, with the licences and registrations your business needs." },
  { slug: "roc-compliance", title: "ROC & Secretarial Compliance", icon: "Landmark", short: "Annual filings, director KYC and company law compliance.", intro: "Keep your company or LLP compliant with the Registrar of Companies and avoid late fees and disqualification." },
  { slug: "accounting-bookkeeping", title: "Accounting & Bookkeeping", icon: "Calculator", short: "Monthly books, MIS, payroll and outsourced finance.", intro: "Reliable monthly accounting, MIS reporting and payroll support so your numbers are always audit-ready." },
  { slug: "international-tax-fema", title: "International Tax, FEMA & NRI", icon: "Globe2", short: "NRI tax, FEMA, transfer pricing and cross-border compliance.", intro: "Advisory and compliance for NRIs, foreign investors and Indian businesses operating across borders." },
  { slug: "business-advisory", title: "Business Advisory & Valuation", icon: "TrendingUp", short: "Valuation, fund raising, M&A and loan assistance.", intro: "Financial advisory for growth stages: valuation, funding documentation, restructuring and bank finance." },
  { slug: "ngo-trust", title: "NGO, Trust & Not-for-Profit", icon: "HeartHandshake", short: "Trust registration, 12A, 80G, CSR-1 and FCRA support.", intro: "Registration, tax exemption and annual compliance for trusts, societies and Section 8 companies." },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
