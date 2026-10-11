import { incomeTaxArticles } from "./insights/income-tax.js";
import { gstArticles } from "./insights/gst.js";
import { companyArticles } from "./insights/company.js";
import { auditIntlArticles } from "./insights/audit-intl-compliance.js";
import { articleExtras } from "./insights/extra.js";

export const insightCategories = [
  { slug: "income-tax", title: "Income Tax" },
  { slug: "gst", title: "GST" },
  { slug: "company-law", title: "Company Law" },
  { slug: "audit", title: "Audit" },
  { slug: "fema-international", title: "FEMA & International" },
  { slug: "startups", title: "Startups" },
  { slug: "compliance-calendar", title: "Compliance Calendar" },
  { slug: "budget-circulars", title: "Budget & Circulars" },
];

export const SITE_REVIEWER = "Reviewed by a chartered accountant at PHMG & Associates";
// Per-article reviewer: a team.js slug. Left empty deliberately — the partners have not been
// assigned yet (see REVIEW.md). Set one and both the visible byline and the schema `reviewedBy`
// appear on that article; leave it empty and neither does.
export const reviewers = {};

const published = "2026-10-03"; // TODO: set real dates per article after partner review

const wordCount = (blocks, faqs = []) =>
  blocks.reduce((n, [, v]) => n + JSON.stringify(v).split(/\s+/).length, 0) +
  faqs.reduce((n, f) => n + `${f.q} ${f.a}`.split(/\s+/).length, 0);

export const articles = [...incomeTaxArticles, ...gstArticles, ...companyArticles, ...auditIntlArticles].map((a) => {
  const x = articleExtras[a.slug] || {};
  const body = [...a.body, ...(x.body || [])];
  const faqs = x.faqs || [];
  return {
    publishedAt: published,
    updatedAt: published,
    ...a,
    body,
    faqs,
    readMinutes: Math.max(2, Math.round(wordCount(body, faqs) / 200)),
    reviewedBy: reviewers[a.slug] || "",
  };
});

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const articlesIn = (cat) => articles.filter((a) => a.category === cat);
export const categoryTitle = (slug) => insightCategories.find((c) => c.slug === slug)?.title ?? slug;

