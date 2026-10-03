// Regenerates docs/keyword-map.csv from the data files. Run: node scripts/keyword-map.mjs
// Add a row to `manual` when you add an article or page. Flags duplicate primary keywords (cannibalisation).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const rows = [];
const add = (url, primary, secondary, intent, type) => rows.push({ url, primary, secondary: secondary.join("; "), intent, type });

// Services: parse each content block for category (from services.js catalog) and keywords.
const catalog = readFileSync("src/data/services.js", "utf8");
const category = Object.fromEntries([...catalog.matchAll(/\["([a-z-]+)", "([a-z0-9-]+)", "/g)].map((m) => [m[2], m[1]]));
for (const f of readdirSync("src/data/content")) {
  const text = readFileSync(`src/data/content/${f}`, "utf8");
  for (const m of text.matchAll(/^ {2}"([a-z0-9-]+)": \{[\s\S]*?primaryKeyword: "([^"]+)",\s*secondaryKeywords: \[([^\]]*)\]/gm)) {
    const sec = [...m[3].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    add(`/services/${category[m[1]]}/${m[1]}`, m[2], sec, "transactional", "service");
  }
}

// Articles and other pages (informational / navigational). Keep primaries distinct from the service pages.
const manual = [
  ["/insights/how-to-file-itr-online", "how to file itr online", ["itr filing step by step"], "informational", "article"],
  ["/insights/itr-due-dates-and-penalties", "itr due date late filing penalty", ["section 234F", "belated return"], "informational", "article"],
  ["/insights/old-vs-new-tax-regime", "old vs new tax regime", ["tax slabs", "which regime is better"], "informational", "article"],
  ["/insights/how-to-reply-income-tax-notice", "how to reply to income tax notice", ["notice 143(1)", "notice 142(1)", "notice 148"], "informational", "article"],
  ["/insights/capital-gains-tax-shares-property-mutual-funds", "capital gains tax on shares property mutual funds", ["LTCG", "STCG"], "informational", "article"],
  ["/insights/gst-registration-documents-eligibility-process", "documents required for gst registration", ["who needs gst registration"], "informational", "article"],
  ["/insights/gstr-1-vs-gstr-3b", "gstr-1 vs gstr-3b", ["gst return due dates"], "informational", "article"],
  ["/insights/gst-late-fee-and-interest", "gst late fee and interest", ["penalty for late filing of gst return"], "informational", "article"],
  ["/insights/private-limited-vs-llp-vs-opc-vs-proprietorship", "private limited vs llp", ["opc vs proprietorship", "which business structure"], "informational", "article"],
  ["/insights/company-registration-cost-timeline-documents", "cost of company registration in india", ["company registration timeline"], "informational", "article"],
  ["/insights/annual-roc-compliance-checklist-private-limited", "annual compliance for private limited company", ["roc compliance checklist"], "informational", "article"],
  ["/insights/dir-3-kyc-who-must-file-and-penalty", "what is dir-3 kyc", ["director kyc penalty"], "informational", "article"],
  ["/insights/startup-india-dpiit-recognition-benefits", "startup india dpiit recognition benefits", ["dpiit eligibility"], "informational", "article"],
  ["/insights/tax-audit-section-44ab-limits-applicability", "is tax audit applicable for me", ["tax audit limit", "44AB turnover limit"], "informational", "article"],
  ["/insights/statutory-audit-vs-tax-audit-vs-internal-audit", "statutory audit vs tax audit", ["internal audit difference"], "informational", "article"],
  ["/insights/nri-income-tax-filing-tds-dtaa-basics", "nri income tax in india", ["nri tds", "dtaa"], "informational", "article"],
  ["/insights/section-8-company-ngo-registration-process", "section 8 company registration process", ["ngo registration steps"], "informational", "article"],
  ["/insights/form-15ca-15cb-explained", "form 15ca 15cb", ["foreign remittance certificate"], "informational", "article"],
  ["/insights/tds-rates-and-due-dates-chart", "tds rates chart", ["tds due dates"], "informational", "article"],
  ["/insights/compliance-calendar-monthly-due-dates-for-businesses", "compliance calendar for businesses", ["monthly due dates"], "informational", "article"],
  ["/tools/income-tax-calculator", "income tax calculator", ["old vs new regime calculator"], "transactional", "tool"],
  ["/tools/hra-calculator", "hra calculator", ["hra exemption"], "transactional", "tool"],
  ["/tools/gst-calculator", "gst calculator", ["add gst", "remove gst"], "transactional", "tool"],
  ["/tools/emi-calculator", "emi calculator", ["loan emi"], "transactional", "tool"],
  ["/tools/sip-calculator", "sip calculator", ["sip returns"], "transactional", "tool"],
  ["/tax-calendar", "tax calendar india", ["compliance due dates", "gst tds due dates"], "informational", "page"],
  ["/ca-in-delhi", "chartered accountant in delhi", ["ca firm in delhi ncr", "ca in noida", "ca in gurgaon"], "local", "city"],
  ["/", "chartered accountants in india", ["ca firm", "online ca services", "phmg & associates"], "navigational", "home"],
  ["/services", "ca services", ["chartered accountant services"], "commercial", "hub"],
];
for (const r of manual) add(...r);

const seen = new Map();
const dupes = [];
for (const r of rows) {
  const k = r.primary.toLowerCase();
  if (seen.has(k)) dupes.push(`${r.url} duplicates ${seen.get(k)}`);
  seen.set(k, r.url);
}

const q = (s) => `"${s.replace(/"/g, '""')}"`;
const csv = ["url,primary_keyword,secondary_keywords,intent,page_type,monthly_volume", ...rows.map((r) => [r.url, r.primary, r.secondary, r.intent, r.type, ""].map(q).join(","))].join("\n");
writeFileSync("docs/keyword-map.csv", csv + "\n");
console.log(`${rows.length} rows written to docs/keyword-map.csv`);
if (dupes.length) { console.log("Cannibalisation risk:\n" + dupes.join("\n")); process.exit(1); }
