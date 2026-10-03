import { flagship } from "./service-content";

// [category, slug, title, one-line description]
// A service gets a live page only once it has content in service-content.js
// (see isPublished). Add content there to publish it.
const catalog = [
  ["audit-assurance", "statutory-audit", "Statutory Audit", "Independent audit of financial statements under the Companies Act and LLP Act."],
  ["audit-assurance", "tax-audit", "Tax Audit (Section 44AB)", "Tax audit and Form 3CA/3CB-3CD reporting for businesses and professionals."],
  ["audit-assurance", "internal-audit", "Internal Audit", "Risk-based review of processes and controls with practical recommendations."],
  ["audit-assurance", "stock-audit", "Stock & Inventory Audit", "Physical verification and valuation checks for inventory."],
  ["audit-assurance", "bank-audit", "Bank Concurrent & Stock Audit", "Audit assignments for bank-financed borrowers."],
  ["audit-assurance", "gst-audit", "GST Audit & Reconciliation", "Reconciliation of GST returns with books and credit eligibility review."],
  ["audit-assurance", "compliance-audit", "Management & Compliance Audit", "Check that statutory and internal compliance requirements are met."],
  ["audit-assurance", "forensic-audit", "Forensic & Investigation Audit", "Fact-finding on suspected fraud or misreporting."],
  ["audit-assurance", "ifc-review", "Internal Financial Controls Review", "Design and operating effectiveness review of financial controls."],
  ["audit-assurance", "due-diligence", "Financial & Tax Due Diligence", "Pre-transaction review of financial and tax position."],
  ["audit-assurance", "ca-certification", "CA Certification Services", "Net worth, turnover, CMA and other CA certificates."],
  ["income-tax", "itr-filing", "ITR Filing Online", "Income tax return filing for salaried, business, professionals and capital gains."],
  ["income-tax", "income-tax-notice", "Income Tax Notice Reply", "Responses to notices, intimations and scrutiny assessments."],
  ["income-tax", "income-tax-appeals", "Income Tax Appeals", "Representation before CIT(A) and ITAT."],
  ["income-tax", "tax-planning", "Tax Planning & Advisory", "Legitimate tax planning across regimes, deductions and investments."],
  ["income-tax", "tds-return-filing", "TDS / TCS Return Filing", "Quarterly TDS and TCS return preparation and filing."],
  ["income-tax", "advance-tax", "Advance Tax Computation", "Quarterly advance tax estimates to avoid interest."],
  ["income-tax", "capital-gains-tax", "Capital Gains Tax Advisory", "Tax on shares, property, mutual funds and other assets."],
  ["income-tax", "trader-tax-filing", "Crypto, F&O & Trader Tax Filing", "ITR and audit support for traders and investors."],
  ["income-tax", "lower-tds-certificate", "Lower / Nil TDS Certificate", "Application for lower deduction certificate (Form 13)."],
  ["income-tax", "12a-80g-registration", "12A & 80G Registration", "Tax exemption registration for trusts and NGOs."],
  ["income-tax", "belated-revised-itr", "Belated, Revised & Updated Return", "Fix or file missed returns, including ITR-U."],
  ["gst", "gst-registration", "GST Registration", "Apply for GST registration with correct classification and documents."],
  ["gst", "gst-return-filing", "GST Return Filing", "Monthly and annual GST returns, filed on time."],
  ["gst", "gst-notice", "GST Notice & Appeals", "Replies to GST notices, assessments and appeals."],
  ["gst", "gst-refund", "GST Refund & LUT", "Refund claims and LUT filing for exporters."],
  ["gst", "gst-cancellation", "GST Cancellation & Revocation", "Cancel or revive a GST registration."],
  ["gst", "gst-annual-return", "GST Annual Return (GSTR-9/9C)", "Annual return and reconciliation statement."],
  ["gst", "e-invoicing", "E-invoicing & E-way Bill Setup", "Set up e-invoicing and e-way bill for your business."],
  ["gst", "iec-registration", "IEC & Foreign Trade Registration", "Import Export Code and foreign trade policy support."],
  ["business-registration", "private-limited-company-registration", "Private Limited Company Registration", "Incorporate a private limited company end to end."],
  ["business-registration", "llp-registration", "LLP Registration", "Register a Limited Liability Partnership and its agreement."],
  ["business-registration", "opc-registration", "One Person Company Registration", "Incorporate a company with a single owner."],
  ["business-registration", "partnership-firm-registration", "Partnership Firm Registration", "Partnership deed and firm registration."],
  ["business-registration", "proprietorship-registration", "Proprietorship Registration", "Set up a sole proprietorship with the registrations it needs."],
  ["business-registration", "section-8-company", "Section 8 Company Registration", "Not-for-profit company registration."],
  ["business-registration", "startup-india-registration", "Startup India (DPIIT) Recognition", "DPIIT recognition and related benefits."],
  ["business-registration", "udyam-registration", "Udyam (MSME) Registration", "MSME registration for small businesses."],
  ["business-registration", "trademark-registration", "Trademark Registration", "Brand name and logo trademark filing and objection replies."],
  ["business-registration", "company-closure", "Company & LLP Closure", "Strike-off and closure of companies and LLPs."],
  ["business-registration", "foreign-company-registration-india", "Foreign Company Registration in India", "Subsidiary, branch or liaison office set-up."],
  ["roc-compliance", "annual-roc-filing", "Annual ROC Filing (AOC-4, MGT-7)", "Annual financial statements and return filing for companies."],
  ["roc-compliance", "llp-annual-filing", "LLP Annual Filing (Form 11 & 8)", "Annual filings for LLPs."],
  ["roc-compliance", "director-kyc", "Director KYC (DIR-3 KYC)", "Annual KYC for directors."],
  ["accounting-bookkeeping", "bookkeeping-services", "Bookkeeping Services", "Monthly bookkeeping on Tally, Zoho or QuickBooks."],
  ["accounting-bookkeeping", "virtual-cfo-services", "Virtual CFO Services", "Outsourced finance leadership."],
  ["accounting-bookkeeping", "cma-data-project-report", "CMA Data & Project Reports", "Bank-ready CMA data and project reports."],
  ["accounting-bookkeeping", "payroll-services", "Payroll, PF & ESI Services", "Payroll processing and labour-law compliance."],
  ["international-tax-fema", "nri-tax-filing", "NRI Tax Filing", "Income tax returns and advisory for NRIs."],
  ["international-tax-fema", "fema-compliance", "FEMA Compliance", "FDI, ODI and FEMA reporting."],
  ["international-tax-fema", "transfer-pricing", "Transfer Pricing", "Documentation and compliance for related-party transactions."],
  ["international-tax-fema", "form-15ca-15cb", "Form 15CA / 15CB", "Foreign remittance certification."],
  ["business-advisory", "business-valuation", "Business Valuation", "Startup, ESOP and business valuations."],
  ["business-advisory", "mergers-acquisitions", "Mergers & Acquisitions Advisory", "Structuring and support for M&A."],
  ["business-advisory", "business-loan-assistance", "Business Loan Assistance", "Documentation for bank loans and project finance."],
  ["business-advisory", "sme-ipo-advisory", "SME IPO Advisory", "IPO readiness for SMEs."],
  ["ngo-trust", "trust-society-registration", "Trust & Society Registration", "Registration of public charitable trusts and societies."],
  ["ngo-trust", "csr-fcra-compliance", "CSR-1 & FCRA Compliance", "CSR-1 registration and FCRA support for NGOs."],
  ["ngo-trust", "trust-audit", "Audit of Trusts & NGOs", "Audit and Form 10B/10BB reporting for trusts."],
];

export const services = catalog.map(([category, slug, title, shortDesc]) => ({
  category,
  slug,
  title,
  shortDesc,
  ...(flagship[slug] || {}),
}));

export const isPublished = (s) => Boolean(s.definition);
export const publishedServices = services.filter(isPublished);
export const getService = (category, slug) =>
  publishedServices.find((s) => s.category === category && s.slug === slug);
export const servicesIn = (category) => publishedServices.filter((s) => s.category === category);
export const serviceUrl = (s) => `/services/${s.category}/${s.slug}`;
