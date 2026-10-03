import { taxSlabs as S } from "../../data/taxSlabs.js";

export function slabTax(taxable, bands) {
  let lower = 0;
  let tax = 0;
  for (const [upper, rate] of bands) {
    tax += Math.max(0, Math.min(taxable, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

const withCess = (tax) => ({ tax, cess: tax * S.cess, total: tax * (1 + S.cess) });

export function newRegime({ income, salaried }) {
  const taxable = Math.max(0, income - (salaried ? S.new.standardDeduction : 0));
  let tax = slabTax(taxable, S.new.bands);
  const limit = S.new.rebateIncomeLimit;
  if (taxable <= limit) tax = 0;
  else tax = Math.min(tax, taxable - limit); // marginal relief
  return { taxable, ...withCess(tax) };
}

export function oldRegime({ income, salaried, deductions = 0, age = "below60" }) {
  const taxable = Math.max(0, income - (salaried ? S.old.standardDeduction : 0) - deductions);
  const bands = [[S.old.exemption[age], 0], ...S.old.upperBands];
  let tax = slabTax(taxable, bands);
  if (taxable <= S.old.rebateIncomeLimit) tax = Math.max(0, tax - S.old.rebateMax);
  return { taxable, ...withCess(tax) };
}

export function compareRegimes(input) {
  const n = newRegime(input);
  const o = oldRegime(input);
  return { new: n, old: o, better: n.total <= o.total ? "new" : "old", saving: Math.abs(n.total - o.total) };
}
