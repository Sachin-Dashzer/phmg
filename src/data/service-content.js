import { taxGstCompany } from "./content/tax-gst-company";
import { llpAuditRocBooks } from "./content/llp-audit-roc-books";
import { moreServices } from "./content/more-services";
import { extraServices } from "./content/extra-services";

// Full page content for published services, keyed by slug.
// A service goes live when it has an entry here. `definition` marks it published.
const lastReviewed = "October 2026"; // TODO: update when partners re-review each page

const all = { ...taxGstCompany, ...llpAuditRocBooks, ...moreServices };

export const flagship = Object.fromEntries(
  Object.entries(all).map(([slug, c]) => [slug, { lastReviewed, sections: extraServices[slug], ...c }])
);
