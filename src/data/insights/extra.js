import { extraA } from "./extra-a.js";
import { extraB } from "./extra-b.js";
import { extraC } from "./extra-c.js";
import { extraD } from "./extra-d.js";

// slug -> { body: extra blocks appended to the article, faqs: [{ q, a }] }
// extraA/B carry the first round of body sections and the FAQs; C and D are later body rounds, placed before the FAQs.
const first = { ...extraA, ...extraB };
const later = [extraC, extraD];

export const articleExtras = Object.fromEntries(
  [...new Set([...Object.keys(first), ...later.flatMap(Object.keys)])].map((slug) => [
    slug,
    { body: [...(first[slug]?.body || []), ...later.flatMap((r) => r[slug] || [])], faqs: first[slug]?.faqs || [] },
  ])
);
