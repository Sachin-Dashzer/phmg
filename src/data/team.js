// Core team, from PHMG_Profile_Updated.pdf. Photos live in public/images/team.
// Shape: { slug, name, role, credentials, years, focus, photo }
//
// Each partner also has a page at /team/{slug}, built from the fields below plus the optional
// ones in `profiles`. Everything in `profiles` is empty and renders only when set, so nothing
// is invented: add a bio, membership number, education, languages, an office or the forums a
// partner appears before, and that part of the page appears. Tracked in REVIEW.md.
export const team = [
  { slug: "piyush-mishra", name: "CA Piyush Mishra", role: "Founding Partner", credentials: ["FCA", "LLB", "B.Com"], years: "15+", focus: ["Management & Internal Audit", "Financial Controls & GST", "Search & Investigation", "Banking Audits", "Governance Advisory"], photo: "/images/team/piyush.jpeg" },
  { slug: "ankit-choudhary", name: "CA Ankit Choudhary", role: "Partner – Business Development", credentials: ["CA", "LLB", "MBA", "IFRS"], years: "8+", focus: ["Direct & International Tax", "Business Automation", "Enterprise Risk Management", "Tax Litigation & Appeals"], photo: "/images/team/ankit.jpeg" },
  { slug: "praveen-thakur", name: "CA Praveen Thakur", role: "Partner", credentials: ["CA", "B.Com"], years: "4+", focus: ["Audit Execution", "Virtual CFO", "Financial Reporting", "Process Reviews", "Team Leadership"], photo: "/images/team/praveen.jpeg" },
  { slug: "manish-goel", name: "CA Manish Goel", role: "Head – Delhi Branch", credentials: ["CA", "DISA", "B.Com"], years: "10+", focus: ["IT Audit", "Bank Audit", "Overseas Accounting", "Compliance Advisory"], photo: "/images/team/manish.jpeg" },
  { slug: "mehtaab-qureshi", name: "CA Mehtaab Qureshi", role: "Head – Ludhiana Branch", credentials: ["CA", "Forensic", "B.Com"], years: "4+", focus: ["Technology-driven Audit", "Due Diligence", "Assurance Technology", "Income Tax"], photo: "/images/team/mehtaab.jpeg" },
];

// Optional, partner-supplied detail for /team/{slug}. Keyed by team slug.
// TODO: CLIENT TO CONFIRM — the partners have not supplied these yet. Nothing here is invented.
//   bio          one or two paragraphs, as an array of strings
//   icaiMembership  membership number, shown as a plain fact
//   education    e.g. ["B.Com, Delhi University", "FCA, ICAI"]
//   languages    e.g. ["English", "Hindi"]
//   office       an office slug from firm.js, if the partner leads or is based at one
//   appearsBefore  forums the partner appears before, e.g. ["CIT(A)", "ITAT"]
//   email        a direct address, only if the firm wants one published
export const profiles = {
  "piyush-mishra": { bio: [], icaiMembership: "", education: [], languages: [], office: "", appearsBefore: [], email: "" },
  "ankit-choudhary": { bio: [], icaiMembership: "", education: [], languages: [], office: "", appearsBefore: [], email: "" },
  "praveen-thakur": { bio: [], icaiMembership: "", education: [], languages: [], office: "", appearsBefore: [], email: "" },
  "manish-goel": { bio: [], icaiMembership: "", education: [], languages: [], office: "delhi", appearsBefore: [], email: "" },
  "mehtaab-qureshi": { bio: [], icaiMembership: "", education: [], languages: [], office: "ludhiana", appearsBefore: [], email: "" },
};

export const getMember = (slug) => team.find((t) => t.slug === slug);
export const getProfile = (slug) => profiles[slug] || {};
