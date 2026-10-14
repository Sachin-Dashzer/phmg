// Job openings, rendered at /careers. Add an object here to post a job; empty the array and the
// page falls back to inviting speculative applications, so there is never a fake vacancy.
//
// TODO: CLIENT TO CONFIRM — no openings have been supplied, so this is deliberately empty.
// Never invent a role, a location, a salary or a closing date. Tracked in REVIEW.md.
//
// Shape:
//   slug         kebab-case, used in the application form's "role" field
//   title        the job title as it should appear
//   type         "Full time" | "Articleship" | "Internship" | "Contract"
//   locations    office slugs from firm.js, e.g. ["noida", "delhi"], or [] for any office
//   experience   free text, e.g. "2-4 years" or "Freshers"
//   qualification free text, e.g. "CA" or "CA Inter / semi-qualified"
//   about        one or two sentences on the role
//   responsibilities  array of strings
//   requirements array of strings
//   postedAt     ISO date, shown as "Posted on"
//   closesAt     ISO date or "" if open-ended
export const jobs = [];

// Why someone might join. Factual statements about how the firm works, not claims about being a
// better employer than anyone else.
export const whyJoin = [
  {
    h: "The work itself",
    p: "Bank statutory and concurrent audits, GST litigation, income tax appeals, transfer pricing and advisory. The firm is empanelled with the Reserve Bank of India in Category-I and with the CAG of India, so audit work includes assignments that smaller practices do not see.",
  },
  {
    h: "A partner reviews your work",
    p: "Every engagement is owned by a partner who reviews the work before it is submitted and explains the reasoning behind the position taken. That review is where most of the learning happens.",
  },
  {
    h: "Four offices",
    p: "Noida, Delhi, Ludhiana and Meerut, each with a different client base — IT and electronics around Noida, manufacturing and exports in Ludhiana. Exposure varies by office.",
  },
  {
    h: "Breadth early",
    p: "Teams are small enough that work is not confined to one narrow task for a year. Articled assistants see audit, tax and compliance rather than a single department.",
  },
];

export const getJob = (slug) => jobs.find((j) => j.slug === slug);
