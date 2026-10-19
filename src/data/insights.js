import { incomeTaxArticles } from "./insights/income-tax.js";
import { gstArticles } from "./insights/gst.js";
import { companyArticles } from "./insights/company.js";
import { auditIntlArticles } from "./insights/audit-intl-compliance.js";
import { articleExtras } from "./insights/extra.js";

// `intro` is the standing description of the category, shown on /insights/category/{slug}. It is
// there because those pages were being crawled and left unindexed: a list of article cards and a
// templated one-liner is not a page in Google's eyes. Informational only, per the ICAI rules — it
// describes what the category covers, and claims nothing about the firm.
export const insightCategories = [
  {
    slug: "income-tax",
    title: "Income Tax",
    intro:
      "Income tax in India is administered under the Income-tax Act, 1961, with the Income-tax Act, 2025 applying to later periods under renumbered sections. These guides cover return filing for salaried taxpayers, professionals and businesses, the choice between the old and new regimes, capital gains, and how to read and answer a notice or intimation. Rates, limits and due dates change with each Finance Act, so every guide records the period it describes.",
  },
  {
    slug: "gst",
    title: "GST",
    intro:
      "Goods and Services Tax touches registration, monthly and annual returns, input tax credit and refunds, and each has its own deadline and consequence for missing it. These guides explain who has to register, what GSTR-1 and GSTR-3B each report, how late fees and interest are computed, and what a departmental notice is asking for. Rate and procedural changes are notified frequently, so confirm the current position before relying on a figure.",
  },
  {
    slug: "company-law",
    title: "Company Law",
    intro:
      "A company or LLP carries filing obligations from the day it is incorporated, independent of whether it has traded. These guides cover choosing between a private limited company, an LLP, a one-person company and a proprietorship, what incorporation actually involves, and the annual returns, director KYC and board formalities the Companies Act and the LLP Act require. Penalties here accrue per day and per officer, which is why the due dates matter more than the forms.",
  },
  {
    slug: "audit",
    title: "Audit",
    intro:
      "Several different audits can apply to the same business in the same year, each under its own law and with its own report. These guides set out what a statutory audit under the Companies Act, a tax audit under Section 44AB and an internal audit under Section 138 are each for, who they apply to, and the turnover and profit thresholds that trigger them. Thresholds are revised periodically, so check the limit for the year you are reporting on.",
  },
  {
    slug: "fema-international",
    title: "FEMA & International",
    intro:
      "Cross-border income and payments are governed by the Income-tax Act and the Foreign Exchange Management Act together, and the two ask different questions about the same transaction. These guides cover residential status and how it decides what India taxes, return filing and TDS for non-residents, relief under a double taxation avoidance agreement, and the Form 15CA and 15CB certification a remittance out of India needs.",
  },
  {
    slug: "startups",
    title: "Startups",
    intro:
      "An early-stage company spends its first years establishing a structure, a cap table and a compliance record that later investors will examine. These guides cover DPIIT recognition under the Startup India scheme and what it does and does not grant, the registrations a newly incorporated company needs, and the valuation and reporting that follow a funding round.",
  },
  {
    slug: "compliance-calendar",
    title: "Compliance Calendar",
    intro:
      "Most penalties a small business pays are for filing late rather than for filing wrongly. These guides set out the recurring monthly, quarterly and annual due dates across GST, TDS, income tax and ROC filings, with what each return covers and what happens when it is missed. Due dates are extended by notification from time to time, so treat the dates here as the standing position and confirm before a deadline.",
  },
  {
    slug: "budget-circulars",
    title: "Budget & Circulars",
    intro:
      "Rates, thresholds and procedures change through the annual Finance Act and through circulars and notifications issued during the year. This category collects the changes that alter what a business or an individual actually has to do, with the date each one takes effect.",
  },
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

