import { taxGstCompany } from "./content/tax-gst-company.js";
import { llpAuditRocBooks } from "./content/llp-audit-roc-books.js";
import { moreServices } from "./content/more-services.js";
import { newServices2026 } from "./content/new-services-2026.js";
import { extraServices } from "./content/extra-services.js";

// Full page content for published services, keyed by slug.
// A service goes live when it has an entry here. `definition` marks it published.
const lastReviewed = "October 2026"; // TODO: update when partners re-review each page

// Per-page reviewer: a team.js slug, e.g. { "bank-audit": "piyush-mishra" }. Left empty
// deliberately — the partners have not been assigned yet (see REVIEW.md). Set one and both the
// visible "Reviewed by" line and the schema `reviewedBy` appear on that page; leave it empty
// and neither does.
export const reviewers = {};

// Who the service is for, used only for `audience` in the Service structured data. Kept in one
// map rather than on each entry so the older content files need no edits. Factual descriptions of
// the audience, not claims about it; a slug with no entry simply omits `audience`.
export const audiences = {
  // Audit and assurance
  "statutory-audit": "Companies and LLPs required to have their accounts audited",
  "tax-audit": "Businesses and professionals crossing the Section 44AB limits",
  "bank-audit": "Banks and their branches",
  "concurrent-audit": "Bank branches within the concurrent audit framework",
  "stock-audit": "Banks lending against stock and their working-capital borrowers",
  "internal-audit": "Companies covered by Section 138 of the Companies Act",
  // Income tax
  "itr-filing": "Salaried individuals, professionals and businesses",
  "income-tax-notice": "Taxpayers who have received a notice or intimation",
  "income-tax-appeal": "Taxpayers disputing an assessment or penalty order",
  "tds-return-filing": "Employers and businesses deducting or collecting tax at source",
  // GST
  "gst-registration": "Businesses required or choosing to register under GST",
  "gst-return-filing": "GST-registered businesses",
  "gst-notice": "GST-registered businesses facing a notice or assessment",
  "gst-refund": "Exporters, SEZ suppliers and businesses with accumulated credit",
  // Registration and ROC
  "private-limited-company-registration": "Founders incorporating a private limited company",
  "llp-registration": "Partners forming a limited liability partnership",
  "opc-registration": "Single founders incorporating a company",
  "section-8-company": "Founders of not-for-profit organisations",
  "startup-india-registration": "Startups seeking DPIIT recognition",
  "udyam-registration": "Micro, small and medium enterprises",
  "trademark-registration": "Businesses registering a brand name or logo",
  "annual-roc-filing": "Companies filing their annual returns",
  "llp-annual-filing": "Limited liability partnerships",
  "director-kyc": "Directors holding a DIN",
  // Accounting and advisory
  "bookkeeping-services": "Businesses outsourcing their monthly accounting",
  "virtual-cfo": "Growing businesses without a full-time finance head",
  payroll: "Employers processing salaries and statutory deductions",
  "project-report": "Businesses applying for term loans or working-capital limits",
  "business-valuation": "Companies and startups needing a valuation",
  // International
  "nri-tax-filing": "Non-residents with income or assets in India",
  "15ca-15cb": "Businesses and individuals remitting funds out of India",
  "fema-compliance": "Entities with foreign investment or investment abroad",
  "transfer-pricing": "Entities transacting with associated enterprises",
  // Not-for-profit
  "trust-registration": "Founders of charitable trusts",
  "12a-80g-registration": "Trusts, societies and Section 8 companies seeking tax exemption",
  "fcra-registration": "Organisations receiving foreign contributions",
  "csr-1-registration": "Implementing agencies receiving corporate CSR funding",
};

const all = { ...taxGstCompany, ...llpAuditRocBooks, ...moreServices, ...newServices2026 };

export const flagship = Object.fromEntries(
  Object.entries(all).map(([slug, c]) => [
    slug,
    {
      lastReviewed,
      sections: extraServices[slug],
      ...c,
      reviewedBy: reviewers[slug] || "",
      audience: audiences[slug] || "",
    },
  ])
);
