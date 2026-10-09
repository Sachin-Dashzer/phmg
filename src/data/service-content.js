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

const all = { ...taxGstCompany, ...llpAuditRocBooks, ...moreServices, ...newServices2026 };

export const flagship = Object.fromEntries(
  Object.entries(all).map(([slug, c]) => [
    slug,
    { lastReviewed, sections: extraServices[slug], ...c, reviewedBy: reviewers[slug] || "" },
  ])
);
