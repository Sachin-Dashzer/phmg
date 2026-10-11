import { extraA } from "./extra-services-a.js";
import { extraB } from "./extra-services-b.js";
import { extraC } from "./extra-services-c.js";
import { extraD } from "./extra-services-d.js";

// slug -> extra in-depth content blocks, rendered after "Benefits" on the service page.
// Parts A and B are the first round; C and D are later rounds placed after them.
const rounds = [{ ...extraA, ...extraB }, extraC, extraD];

export const extraServices = Object.fromEntries(
  [...new Set(rounds.flatMap(Object.keys))].map((slug) => [slug, rounds.flatMap((r) => r[slug] || [])])
);
