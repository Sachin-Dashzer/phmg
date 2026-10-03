import { incomeTaxArticles } from "./insights/income-tax";
import { gstArticles } from "./insights/gst";
import { companyArticles } from "./insights/company";
import { auditIntlArticles } from "./insights/audit-intl-compliance";
import { articleExtras } from "./insights/extra";

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
  };
});

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
export const articlesIn = (cat) => articles.filter((a) => a.category === cat);
export const categoryTitle = (slug) => insightCategories.find((c) => c.slug === slug)?.title ?? slug;
