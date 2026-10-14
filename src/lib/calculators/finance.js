// Maths for the Resources calculators. Pure functions, no rounding (format at display time),
// no rates baked in: every rate is an argument, so a change in the law is a data change on the
// page and not a code change here.

/**
 * GST from a maximum retail price. The MRP already includes GST, so the taxable value is the
 * price divided by (1 + rate), not the price less the rate — taking the rate off the MRP is the
 * mistake this calculator exists to prevent.
 */
export function gstFromMrp({ mrp, rate, cess = 0 }) {
  const divisor = 1 + (rate + cess) / 100;
  const base = mrp / divisor;
  const gst = base * (rate / 100);
  const cessAmount = base * (cess / 100);
  return { base, gst, cgst: gst / 2, sgst: gst / 2, cess: cessAmount, total: base + gst + cessAmount };
}

/**
 * Tax deducted at source on a payment. Returns zero where the payment is at or below the
 * threshold, because the threshold is a floor for the whole payment and not an exemption slice.
 * `noPan` applies the higher rate the Act prescribes where the deductee has furnished no PAN.
 */
export function tds({ amount, rate, threshold = 0, noPan = false, noPanRate = 20 }) {
  if (amount <= threshold) {
    return { applicable: false, rateApplied: 0, tds: 0, net: amount };
  }
  const rateApplied = noPan ? Math.max(rate, noPanRate) : rate;
  const deducted = amount * (rateApplied / 100);
  return { applicable: true, rateApplied, tds: deducted, net: amount - deducted };
}

/** Net profit from a trading or manufacturing account, step by step. */
export function netProfit({ revenue, otherIncome = 0, costOfGoods = 0, operatingExpenses = 0, depreciation = 0, interest = 0, taxRate = 0 }) {
  const gross = revenue - costOfGoods;
  const operating = gross - operatingExpenses - depreciation;
  const beforeTax = operating - interest + otherIncome;
  const tax = beforeTax > 0 ? beforeTax * (taxRate / 100) : 0;
  return {
    gross,
    operating,
    beforeTax,
    tax,
    net: beforeTax - tax,
    netMargin: revenue ? (beforeTax - tax) / revenue : 0,
  };
}

/** Net worth: what is owned less what is owed. */
export function netWorth({ assets = {}, liabilities = {} }) {
  const sum = (o) => Object.values(o).reduce((a, b) => a + (Number(b) || 0), 0);
  const totalAssets = sum(assets);
  const totalLiabilities = sum(liabilities);
  return { totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities };
}

/**
 * Effective capital, as Schedule V to the Companies Act computes it for managerial remuneration.
 * Paid-up capital plus reserves and long-term borrowings, less investments, accumulated losses
 * and preliminary expenses not written off. Revaluation reserves are excluded by the Schedule,
 * which is why they are a separate argument rather than part of `reserves`.
 */
export function effectiveCapital({
  paidUpCapital = 0,
  sharePremium = 0,
  reserves = 0,
  revaluationReserve = 0,
  longTermLoans = 0,
  depositsRepayableAfterOneYear = 0,
  investments = 0,
  accumulatedLosses = 0,
  preliminaryExpenses = 0,
}) {
  const additions = paidUpCapital + sharePremium + reserves + longTermLoans + depositsRepayableAfterOneYear;
  const deductions = investments + accumulatedLosses + preliminaryExpenses;
  return {
    additions,
    deductions,
    excluded: revaluationReserve,
    effectiveCapital: additions - deductions,
  };
}

/**
 * National Savings Certificate maturity value. Interest is compounded annually and paid on
 * maturity, so the value is simply principal compounded over the term.
 */
export function nsc({ principal, annualRate, years }) {
  const value = principal * (1 + annualRate / 100) ** years;
  return { value, interest: value - principal };
}

/**
 * Loan tenure: the number of monthly instalments needed to clear a principal at a given rate and
 * instalment. Returns null where the instalment does not cover the first month's interest, in
 * which case the loan never amortises however long it runs.
 */
export function loanTenure({ principal, annualRate, monthlyPayment }) {
  const r = annualRate / 1200;
  if (r === 0) {
    const months = principal / monthlyPayment;
    return { months, years: months / 12, totalPaid: monthlyPayment * months, interest: 0, neverRepays: false };
  }
  const firstMonthInterest = principal * r;
  if (monthlyPayment <= firstMonthInterest) {
    return { months: null, years: null, totalPaid: null, interest: null, neverRepays: true, firstMonthInterest };
  }
  const months = Math.log(monthlyPayment / (monthlyPayment - principal * r)) / Math.log(1 + r);
  const totalPaid = monthlyPayment * months;
  return { months, years: months / 12, totalPaid, interest: totalPaid - principal, neverRepays: false };
}

/**
 * Effect of a one-off prepayment on a running loan, keeping the instalment the same and
 * shortening the term. Returns the original and shortened tenures and the interest saved.
 */
export function prepaymentSaving({ principal, annualRate, years, prepayment }) {
  const r = annualRate / 1200;
  const n = Math.round(years * 12);
  const monthly = r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  const originalInterest = monthly * n - principal;
  const after = loanTenure({ principal: principal - prepayment, annualRate, monthlyPayment: monthly });
  if (after.neverRepays) return { monthly, originalInterest, neverRepays: true };
  return {
    monthly,
    originalMonths: n,
    newMonths: after.months,
    monthsSaved: n - after.months,
    originalInterest,
    newInterest: after.interest,
    interestSaved: originalInterest - after.interest,
    neverRepays: false,
  };
}

/**
 * Interest on a delayed possession or a refund, on the simple-interest basis these calculations
 * normally use. The rate is an argument because it is prescribed by the applicable rules and
 * differs between states and between the delay and refund situations.
 */
export function delayInterest({ amountPaid, annualRate, days }) {
  const interest = amountPaid * (annualRate / 100) * (days / 365);
  return { interest, total: amountPaid + interest, perDay: amountPaid * (annualRate / 100) / 365 };
}
