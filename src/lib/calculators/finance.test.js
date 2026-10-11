// Run with: npm test
import test from "node:test";
import assert from "node:assert/strict";
import {
  gstFromMrp,
  tds,
  netProfit,
  netWorth,
  effectiveCapital,
  nsc,
  loanTenure,
  prepaymentSaving,
  delayInterest,
} from "./finance.js";

const close = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);

test("GST is backed out of an MRP, not taken off it", () => {
  // ₹118 at 18% must give a base of ₹100, not ₹96.76 (which is 118 less 18%).
  const r = gstFromMrp({ mrp: 118, rate: 18 });
  close(r.base, 100);
  close(r.gst, 18);
  close(r.cgst, 9);
  close(r.total, 118);
});

test("GST from MRP handles a cess", () => {
  const r = gstFromMrp({ mrp: 143, rate: 28, cess: 15 });
  close(r.base, 100);
  close(r.gst, 28);
  close(r.cess, 15);
  close(r.total, 143);
});

test("TDS is nil at or below the threshold, and on the whole amount above it", () => {
  assert.equal(tds({ amount: 30000, rate: 10, threshold: 30000 }).applicable, false);
  assert.equal(tds({ amount: 30000, rate: 10, threshold: 30000 }).tds, 0);
  const over = tds({ amount: 50000, rate: 10, threshold: 30000 });
  assert.equal(over.applicable, true);
  close(over.tds, 5000); // 10% of the whole 50,000, not of the 20,000 excess
  close(over.net, 45000);
});

test("TDS applies the higher rate where there is no PAN", () => {
  const r = tds({ amount: 100000, rate: 10, threshold: 0, noPan: true, noPanRate: 20 });
  assert.equal(r.rateApplied, 20);
  close(r.tds, 20000);
  // A rate already above the no-PAN rate is not reduced to it.
  assert.equal(tds({ amount: 100000, rate: 30, noPan: true, noPanRate: 20 }).rateApplied, 30);
});

test("net profit works down from revenue to profit after tax", () => {
  const r = netProfit({
    revenue: 10000000,
    costOfGoods: 6000000,
    operatingExpenses: 2000000,
    depreciation: 500000,
    interest: 300000,
    taxRate: 25,
  });
  close(r.gross, 4000000);
  close(r.operating, 1500000);
  close(r.beforeTax, 1200000);
  close(r.tax, 300000);
  close(r.net, 900000);
  close(r.netMargin, 0.09);
});

test("net profit charges no tax on a loss", () => {
  const r = netProfit({ revenue: 100000, costOfGoods: 150000, taxRate: 25 });
  assert.equal(r.tax, 0);
  close(r.net, -50000);
});

test("net worth is assets less liabilities", () => {
  const r = netWorth({
    assets: { property: 8000000, deposits: 1500000, shares: 500000 },
    liabilities: { homeLoan: 3500000, carLoan: 400000 },
  });
  close(r.totalAssets, 10000000);
  close(r.totalLiabilities, 3900000);
  close(r.netWorth, 6100000);
});

test("effective capital adds capital and long-term funds and deducts investments and losses", () => {
  const r = effectiveCapital({
    paidUpCapital: 5000000,
    sharePremium: 1000000,
    reserves: 2000000,
    revaluationReserve: 900000, // excluded by Schedule V
    longTermLoans: 3000000,
    investments: 1500000,
    accumulatedLosses: 500000,
    preliminaryExpenses: 100000,
  });
  close(r.additions, 11000000);
  close(r.deductions, 2100000);
  close(r.effectiveCapital, 8900000);
  // The revaluation reserve must not reach the result.
  assert.equal(r.excluded, 900000);
});

test("NSC compounds annually", () => {
  const r = nsc({ principal: 100000, annualRate: 7.7, years: 5 });
  close(r.value, 100000 * 1.077 ** 5, 0.5);
  assert.ok(r.interest > 44000 && r.interest < 46000);
});

test("loan tenure inverts the EMI formula", () => {
  // A 10 lakh loan at 10% for 10 years has an EMI of about 13,215.
  const months = loanTenure({ principal: 1000000, annualRate: 10, monthlyPayment: 13215 }).months;
  close(months, 120, 0.5);
});

test("loan tenure reports a payment that never clears the loan", () => {
  // 1% a month on 10 lakh is 8,333 of interest; paying 5,000 never amortises.
  const r = loanTenure({ principal: 1000000, annualRate: 12, monthlyPayment: 5000 });
  assert.equal(r.neverRepays, true);
  assert.equal(r.months, null);
  close(r.firstMonthInterest, 10000);
});

test("loan tenure handles a zero-interest loan", () => {
  const r = loanTenure({ principal: 120000, annualRate: 0, monthlyPayment: 10000 });
  close(r.months, 12);
  assert.equal(r.interest, 0);
});

test("a prepayment shortens the term and saves interest", () => {
  const r = prepaymentSaving({ principal: 5000000, annualRate: 9, years: 20, prepayment: 500000 });
  assert.equal(r.neverRepays, false);
  assert.ok(r.newMonths < r.originalMonths, "term should shorten");
  assert.ok(r.interestSaved > 0, "interest should fall");
  // Paying down 10% of a 20-year loan saves far more than the 5 lakh itself.
  assert.ok(r.interestSaved > 500000, `expected a large saving, got ${r.interestSaved}`);
});

test("delay interest is simple interest for the days of delay", () => {
  const r = delayInterest({ amountPaid: 5000000, annualRate: 10.75, days: 365 });
  close(r.interest, 537500, 1);
  close(r.total, 5537500, 1);
  // Half a year is half the interest.
  close(delayInterest({ amountPaid: 5000000, annualRate: 10.75, days: 182.5 }).interest, 268750, 1);
});
