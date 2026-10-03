// Run with: npm test
import test from "node:test";
import assert from "node:assert/strict";
import { newRegime, oldRegime, compareRegimes } from "./incomeTax.js";
import { hra, gst, emi, sip } from "./simple.js";

const near = (a, b, tol = 1) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

test("new regime: no tax up to 12 lakh taxable (salaried 12.75 lakh)", () => {
  assert.equal(newRegime({ income: 1275000, salaried: true }).total, 0);
});

test("new regime: 15 lakh salaried", () => {
  const r = newRegime({ income: 1500000, salaried: true });
  near(r.tax, 93750);
  near(r.total, 97500);
});

test("new regime: marginal relief just above 12 lakh", () => {
  near(newRegime({ income: 1285000, salaried: true }).tax, 10000); // taxable 12.10 lakh
});

test("old regime: 10 lakh salaried with 1.5 lakh deductions", () => {
  near(oldRegime({ income: 1000000, salaried: true, deductions: 150000 }).total, 75400);
});

test("old regime: rebate makes tax nil at 5 lakh taxable", () => {
  assert.equal(oldRegime({ income: 550000, salaried: true }).total, 0);
});

test("compare picks the cheaper regime", () => {
  assert.equal(compareRegimes({ income: 1500000, salaried: true, deductions: 0 }).better, "new");
});

test("hra exemption is the minimum of three limits", () => {
  assert.equal(hra({ basic: 600000, hraReceived: 240000, rentPaid: 300000, metro: true }).exempt, 240000);
  assert.equal(hra({ basic: 600000, hraReceived: 240000, rentPaid: 100000, metro: false }).exempt, 40000);
});

test("gst exclusive and inclusive", () => {
  near(gst({ amount: 1000, rate: 18, inclusive: false }).tax, 180, 0.001);
  near(gst({ amount: 1180, rate: 18, inclusive: true }).base, 1000, 0.001);
});

test("emi on 10 lakh at 10% for 10 years", () => {
  near(emi({ principal: 1000000, annualRate: 10, years: 10 }).monthly, 13215.07, 0.01);
});

test("sip 5000 a month at 12% for 10 years", () => {
  near(sip({ monthly: 5000, annualRate: 12, years: 10 }).value, 1161695, 5);
});
