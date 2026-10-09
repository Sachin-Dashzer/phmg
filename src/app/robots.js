import { absUrl } from "@/lib/seo";

// Everything is allowed, including the AI crawlers. They are named explicitly rather than left to
// the wildcard so that the intent is unambiguous to an operator reading robots.txt, and so that a
// future narrowing of one crawler does not silently change the rest.
// /llms.txt and /llms-full.txt are deliberately NOT disallowed: they exist for these crawlers.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI, training
  "OAI-SearchBot", // OpenAI, search index
  "ChatGPT-User", // OpenAI, user-initiated fetch
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended",
  "CCBot", // Common Crawl, which several models train from
  "meta-externalagent",
  "Bingbot", // powers Copilot as well as Bing
];

const disallow = ["/api/", "/thank-you"];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: absUrl("/").replace(/\/$/, ""),
  };
}
