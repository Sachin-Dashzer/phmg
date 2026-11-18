export const categories = [
  { slug: "audit-assurance", title: "Audit & Assurance", icon: "ClipboardCheck", short: "Statutory, tax, internal, bank and stock audits with clear, timely reporting.", metaDescription: "Statutory, tax, internal, bank and stock audits for companies, LLPs, firms, trusts and banks, carried out by qualified chartered accountants.", intro: "Independent audit and assurance for companies, LLPs, firms, trusts and banks, delivered by qualified chartered accountants." },
  { slug: "income-tax", title: "Income Tax", icon: "FileText", short: "ITR filing, notices, appeals and year-round tax planning.", metaDescription: "Income tax return filing, notice and assessment handling, appeals before CIT(A) and ITAT, and tax planning for individuals, professionals and businesses.", intro: "Accurate income tax return filing, notice handling and tax planning for individuals, professionals and businesses." },
  { slug: "gst", title: "GST & Indirect Tax", icon: "Receipt", short: "GST registration, returns, notices, refunds and reconciliations.", metaDescription: "GST registration, monthly and annual returns, reconciliations, refunds for exporters, and replies to departmental notices, assessments and appeals.", intro: "End-to-end GST support, from registration to monthly returns, reconciliations, refunds and departmental notices." },
  { slug: "business-registration", title: "Company & Business Registration", icon: "Building2", short: "Private limited, LLP, OPC, partnership, Section 8 and more.", metaDescription: "Private limited, LLP, OPC, partnership, proprietorship and Section 8 registration, with the licences and registrations each structure needs.", intro: "Choose the right entity and get it registered correctly, with the licences and registrations your business needs." },
  // `faqs` is optional on a category and renders only where it is set. It exists because the hub
  // pages are routing pages: the ROC hub draws searches for the compliance checklist itself, so
  // the answers belong on it rather than only on the guide it links to.
  {
    slug: "roc-compliance",
    title: "ROC & Secretarial Compliance",
    icon: "Landmark",
    short: "Annual filings, director KYC and company law compliance.",
    metaDescription: "Annual filings for companies and LLPs, director KYC and company law compliance, so that late fees, penalties and director disqualification do not arise.",
    intro: "Keep your company or LLP compliant with the Registrar of Companies and avoid late fees and disqualification.",
    faqs: [
      {
        q: "What is on the annual ROC compliance checklist for a private limited company?",
        a: "Six items recur every year. The first board meeting of the year and at least four board meetings in all, spaced no more than 120 days apart (Section 173). The annual general meeting, by 30 September for a financial year ending 31 March (Section 96). Form AOC-4 with the audited financial statements, within 30 days of that meeting (Section 137). Form MGT-7 or MGT-7A, the annual return, within 60 days of it (Section 92). Form DIR-3 KYC for every director, by 30 September (Rule 12A of the Companies (Appointment and Qualification of Directors) Rules, 2014). Form DPT-3, the return of deposits and exempt money received, by 30 June (Rule 16 of the Companies (Acceptance of Deposits) Rules, 2014).",
      },
      {
        q: "What are the ROC due dates for a company with a 31 March year end?",
        a: "30 June for DPT-3. 30 September for the annual general meeting and for DIR-3 KYC. 30 October for AOC-4, being 30 days after an AGM held on 30 September. 29 November for MGT-7 or MGT-7A, being 60 days after it. A company whose first financial year ended on 31 March may hold its first AGM up to nine months after the year end, which moves the two filing dates with it.",
      },
      {
        q: "What is the late fee if a ROC filing is missed?",
        a: "Additional fee of Rs 100 per day per form, with no upper limit, for AOC-4 and MGT-7 (Section 403 read with the Companies (Registration Offices and Fees) Rules, 2014). DIR-3 KYC filed after the due date carries a fee of Rs 5,000 and the director identification number stays deactivated until it is paid. The daily fee runs from the day after the due date until the form is actually filed, so the cost of a forgotten filing compounds rather than being capped.",
      },
      {
        q: "Does an LLP have the same filings?",
        a: "No. An LLP files Form 11, the annual return, by 30 May, and Form 8, the statement of account and solvency, by 30 October, under the Limited Liability Partnership Act, 2008. There is no AGM and no AOC-4 or MGT-7. The late fee for an LLP form is Rs 100 per day per form and likewise uncapped. An LLP whose turnover exceeds Rs 40 lakh or whose contribution exceeds Rs 25 lakh must also have its accounts audited.",
      },
      {
        q: "What happens if a company does not file for two years or more?",
        a: "Two consequences follow. A director of a company that has not filed its financial statements or annual returns for three continuous financial years is disqualified for five years under Section 164(2) and cannot be appointed to any other company during that period. Separately, the Registrar may strike the company off the register under Section 248 where it has not carried on business, after which restoration requires an application to the National Company Law Tribunal.",
      },
      {
        q: "Who can certify the ROC forms?",
        a: "AOC-4 and MGT-7 are signed by a director and, depending on the company's size, certified by a practising chartered accountant, company secretary or cost accountant. A company with paid-up capital of Rs 10 crore or more, or turnover of Rs 50 crore or more, must have its annual return signed by a company secretary in practice in Form MGT-8 (Section 92(2)). Below those thresholds the director's signature with professional certification is sufficient.",
      },
    ],
  },
  { slug: "accounting-bookkeeping", title: "Accounting & Bookkeeping", icon: "Calculator", short: "Monthly books, MIS, payroll and outsourced finance.", metaDescription: "Monthly bookkeeping on Tally, Zoho or QuickBooks, MIS reporting, payroll with PF and ESI, and outsourced finance leadership for growing businesses.", intro: "Reliable monthly accounting, MIS reporting and payroll support so your numbers are always audit-ready." },
  { slug: "international-tax-fema", title: "International Tax, FEMA & NRI", icon: "Globe2", short: "NRI tax, FEMA, transfer pricing and cross-border compliance.", metaDescription: "NRI tax filing, Form 15CA and 15CB certification, FEMA, FDI and ODI reporting, and transfer pricing documentation for businesses working across borders.", intro: "Advisory and compliance for NRIs, foreign investors and Indian businesses operating across borders." },
  { slug: "business-advisory", title: "Business Advisory & Valuation", icon: "TrendingUp", short: "Valuation, fund raising, M&A, project reports and loan assistance.", metaDescription: "Business and ESOP valuation, project reports and CMA data for bank finance, M&A support and IPO readiness for small and medium sized Indian enterprises.", intro: "Financial advisory for growth stages: valuation, project reports and CMA data, funding documentation, restructuring and bank finance." },
  { slug: "ngo-trust", title: "NGO, Trust & Not-for-Profit", icon: "HeartHandshake", short: "Trust registration, 12A, 80G, CSR-1 and FCRA support.", metaDescription: "Trust registration, 12A and 80G exemption, CSR-1 and FCRA registration, and annual compliance for trusts, societies and Section 8 companies.", intro: "Registration, tax exemption and annual compliance for trusts, societies and Section 8 companies." },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
