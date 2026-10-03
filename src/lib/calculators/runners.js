import { compareRegimes } from "./incomeTax.js";
import { hra, gst, emi, sip } from "./simple.js";
import { taxSlabs } from "../../data/taxSlabs.js";

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const num = { type: "number", min: 0 };

// Each runner: fields for the form, run(values) -> { rows: [{ label, value, strong? }], note? }
export const runners = {
  "income-tax-calculator": {
    fields: [
      { name: "income", label: "Annual income before deductions (₹)", default: 1500000, ...num },
      { name: "salaried", label: "Salaried (standard deduction applies)", type: "select", default: "yes", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "age", label: "Age (old regime exemption)", type: "select", default: "below60", options: [["below60", "Below 60"], ["senior", "60 to 79"], ["superSenior", "80 and above"]] },
      { name: "deductions", label: "Old regime deductions: 80C, 80D, HRA, home loan interest etc. (₹)", default: 150000, ...num },
    ],
    run: (v) => {
      const r = compareRegimes({ income: v.income, salaried: v.salaried === "yes", age: v.age, deductions: v.deductions });
      return {
        rows: [
          { label: "New regime: taxable income", value: inr(r.new.taxable) },
          { label: "New regime: total tax with cess", value: inr(r.new.total) },
          { label: "Old regime: taxable income", value: inr(r.old.taxable) },
          { label: "Old regime: total tax with cess", value: inr(r.old.total) },
          { label: r.better === "new" ? "New regime is lower by" : "Old regime is lower by", value: inr(r.saving), strong: true },
        ],
        note: `Based on FY ${taxSlabs.financialYear} (AY ${taxSlabs.assessmentYear}) slabs. Surcharge for high incomes is not included. Estimates only.`,
      };
    },
  },
  "hra-calculator": {
    fields: [
      { name: "basic", label: "Annual basic salary (₹)", default: 600000, ...num },
      { name: "da", label: "Annual dearness allowance, if part of salary for HRA (₹)", default: 0, ...num },
      { name: "hraReceived", label: "Annual HRA received (₹)", default: 240000, ...num },
      { name: "rentPaid", label: "Annual rent paid (₹)", default: 300000, ...num },
      { name: "metro", label: "City", type: "select", default: "yes", options: [["yes", "Delhi, Mumbai, Kolkata or Chennai"], ["no", "Other city"]] },
    ],
    run: (v) => {
      const r = hra({ basic: v.basic, da: v.da, hraReceived: v.hraReceived, rentPaid: v.rentPaid, metro: v.metro === "yes" });
      return {
        rows: [
          { label: "HRA exempt from tax", value: inr(r.exempt), strong: true },
          { label: "HRA taxable", value: inr(r.taxable) },
        ],
        note: "HRA exemption is available only under the old tax regime. Estimates only.",
      };
    },
  },
  "gst-calculator": {
    fields: [
      { name: "amount", label: "Amount (₹)", default: 10000, ...num },
      { name: "rate", label: "GST rate (%)", default: 18, type: "number", min: 0, max: 100, step: "any" },
      { name: "inclusive", label: "Amount is", type: "select", default: "no", options: [["no", "Excluding GST"], ["yes", "Including GST"]] },
    ],
    run: (v) => {
      const r = gst({ amount: v.amount, rate: v.rate, inclusive: v.inclusive === "yes" });
      return {
        rows: [
          { label: "Amount before GST", value: inr(r.base) },
          { label: "CGST", value: inr(r.cgst) },
          { label: "SGST / UTGST", value: inr(r.sgst) },
          { label: "Total GST (IGST for inter-state supply)", value: inr(r.tax) },
          { label: "Total amount", value: inr(r.total), strong: true },
        ],
      };
    },
  },
  "emi-calculator": {
    fields: [
      { name: "principal", label: "Loan amount (₹)", default: 1000000, ...num },
      { name: "annualRate", label: "Interest rate (% per year)", default: 10, type: "number", min: 0, step: "any" },
      { name: "years", label: "Tenure (years)", default: 10, type: "number", min: 1, step: "any" },
    ],
    run: (v) => {
      const r = emi(v);
      return {
        rows: [
          { label: "Monthly EMI", value: inr(r.monthly), strong: true },
          { label: "Total interest", value: inr(r.interest) },
          { label: "Total payment", value: inr(r.total) },
        ],
        note: "Based on a fixed rate with monthly reducing balance. Actual lender calculations may differ.",
      };
    },
  },
  "sip-calculator": {
    fields: [
      { name: "monthly", label: "Monthly investment (₹)", default: 5000, ...num },
      { name: "annualRate", label: "Expected return (% per year)", default: 12, type: "number", min: 0, step: "any" },
      { name: "years", label: "Period (years)", default: 10, type: "number", min: 1, step: "any" },
    ],
    run: (v) => {
      const r = sip(v);
      return {
        rows: [
          { label: "Amount invested", value: inr(r.invested) },
          { label: "Estimated gain", value: inr(r.gain) },
          { label: "Estimated value", value: inr(r.value), strong: true },
        ],
        note: "Returns are not guaranteed. This is an illustration based on the rate you enter.",
      };
    },
  },
};
