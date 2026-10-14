// Runners for the Resources calculators added in October 2026. Same shape as runners.js:
// fields for the form, and run(values) -> { rows, note }. Merged into `runners` there.
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

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const num = { type: "number", min: 0 };
const rate = { type: "number", min: 0, step: "any" };

export const financeRunners = {
  "gst-mrp-calculator": {
    fields: [
      { name: "mrp", label: "Maximum retail price, inclusive of GST (₹)", default: 1180, ...num },
      { name: "rate", label: "GST rate (%)", type: "select", default: "18", options: [["0", "0%"], ["5", "5%"], ["12", "12%"], ["18", "18%"], ["28", "28%"]] },
      { name: "cess", label: "Compensation cess, if any (%)", default: 0, ...rate },
    ],
    run: (v) => {
      const r = gstFromMrp({ mrp: v.mrp, rate: Number(v.rate), cess: v.cess });
      return {
        rows: [
          { label: "Taxable value before GST", value: inr(r.base), strong: true },
          { label: "GST", value: inr(r.gst) },
          { label: "CGST", value: inr(r.cgst) },
          { label: "SGST or UTGST", value: inr(r.sgst) },
          ...(r.cess ? [{ label: "Compensation cess", value: inr(r.cess) }] : []),
          { label: "Total, back to the MRP", value: inr(r.total) },
        ],
        note: "The MRP already includes GST, so the tax is backed out by dividing rather than by taking the rate off the price. On an inter-state supply the CGST and SGST split is replaced by IGST at the full rate.",
      };
    },
  },

  "tds-calculator": {
    fields: [
      { name: "amount", label: "Payment amount (₹)", default: 100000, ...num },
      { name: "rate", label: "TDS rate for the section (%)", default: 10, ...rate },
      { name: "threshold", label: "Threshold for the section (₹)", default: 30000, ...num },
      { name: "noPan", label: "Has the deductee furnished a PAN?", type: "select", default: "yes", options: [["yes", "Yes"], ["no", "No"]] },
    ],
    run: (v) => {
      const r = tds({ amount: v.amount, rate: v.rate, threshold: v.threshold, noPan: v.noPan === "no" });
      if (!r.applicable) {
        return {
          rows: [
            { label: "TDS deductible", value: inr(0), strong: true },
            { label: "Net payable", value: inr(v.amount) },
          ],
          note: "The payment is at or below the threshold entered, so nothing is deductible on it. Thresholds usually apply to the aggregate paid to one party during the year, so check the running total rather than the single payment.",
        };
      }
      return {
        rows: [
          { label: "Rate applied", value: `${r.rateApplied}%` },
          { label: "TDS deductible", value: inr(r.tds), strong: true },
          { label: "Net payable to the party", value: inr(r.net) },
        ],
        note: "Once the threshold is crossed, tax is deducted on the whole amount and not only on the excess. Where no PAN has been furnished the higher rate the Act prescribes applies. Rates and thresholds differ by section, so confirm the current rate before deducting.",
      };
    },
  },

  "net-profit-calculator": {
    fields: [
      { name: "revenue", label: "Revenue from operations (₹)", default: 10000000, ...num },
      { name: "costOfGoods", label: "Cost of materials or goods sold (₹)", default: 6000000, ...num },
      { name: "operatingExpenses", label: "Operating and administrative expenses (₹)", default: 2000000, ...num },
      { name: "depreciation", label: "Depreciation and amortisation (₹)", default: 500000, ...num },
      { name: "interest", label: "Finance costs (₹)", default: 300000, ...num },
      { name: "otherIncome", label: "Other income (₹)", default: 0, ...num },
      { name: "taxRate", label: "Effective tax rate (%)", default: 25, ...rate },
    ],
    run: (v) => {
      const r = netProfit(v);
      return {
        rows: [
          { label: "Gross profit", value: inr(r.gross) },
          { label: "Operating profit", value: inr(r.operating) },
          { label: "Profit before tax", value: inr(r.beforeTax) },
          { label: "Tax", value: inr(r.tax) },
          { label: "Profit after tax", value: inr(r.net), strong: true },
          { label: "Net margin", value: `${(r.netMargin * 100).toFixed(1)}%` },
        ],
        note: "A working figure from the numbers entered, not a computation of taxable income: tax depends on allowances, disallowances and set-offs that this does not model.",
      };
    },
  },

  "net-worth-calculator": {
    fields: [
      { name: "property", label: "Property and land (₹)", default: 8000000, ...num },
      { name: "deposits", label: "Bank balances and deposits (₹)", default: 1500000, ...num },
      { name: "investments", label: "Shares, mutual funds and bonds (₹)", default: 500000, ...num },
      { name: "other", label: "Other assets: gold, vehicles, business interest (₹)", default: 0, ...num },
      { name: "homeLoan", label: "Home loan outstanding (₹)", default: 3500000, ...num },
      { name: "otherLoans", label: "Other loans and liabilities (₹)", default: 400000, ...num },
    ],
    run: (v) => {
      const r = netWorth({
        assets: { property: v.property, deposits: v.deposits, investments: v.investments, other: v.other },
        liabilities: { homeLoan: v.homeLoan, otherLoans: v.otherLoans },
      });
      return {
        rows: [
          { label: "Total assets", value: inr(r.totalAssets) },
          { label: "Total liabilities", value: inr(r.totalLiabilities) },
          { label: "Net worth", value: inr(r.netWorth), strong: true },
        ],
        note: "Assets at the values entered. A net worth certificate for a visa, a tender or a loan application has to be supported by documents and is certified on a prescribed basis, which may value some assets differently.",
      };
    },
  },

  "effective-capital-calculator": {
    fields: [
      { name: "paidUpCapital", label: "Paid-up share capital (₹)", default: 5000000, ...num },
      { name: "sharePremium", label: "Share premium account (₹)", default: 1000000, ...num },
      { name: "reserves", label: "Reserves and surplus, excluding revaluation (₹)", default: 2000000, ...num },
      { name: "longTermLoans", label: "Long-term loans and deposits repayable after a year (₹)", default: 3000000, ...num },
      { name: "investments", label: "Investments (₹)", default: 1500000, ...num },
      { name: "accumulatedLosses", label: "Accumulated losses (₹)", default: 500000, ...num },
      { name: "preliminaryExpenses", label: "Preliminary expenses not written off (₹)", default: 100000, ...num },
      { name: "revaluationReserve", label: "Revaluation reserve, shown for reference only (₹)", default: 0, ...num },
    ],
    run: (v) => {
      const r = effectiveCapital(v);
      return {
        rows: [
          { label: "Capital and long-term funds", value: inr(r.additions) },
          { label: "Less: investments, losses and preliminary expenses", value: inr(r.deductions) },
          { label: "Effective capital", value: inr(r.effectiveCapital), strong: true },
          ...(r.excluded ? [{ label: "Revaluation reserve, excluded from the total", value: inr(r.excluded) }] : []),
        ],
        note: "Computed on the Schedule V basis used for managerial remuneration under the Companies Act, which excludes any revaluation reserve. Confirm the components against the Schedule for the year concerned before relying on the figure.",
      };
    },
  },

  "nsc-calculator": {
    fields: [
      { name: "principal", label: "Amount invested (₹)", default: 100000, ...num },
      { name: "annualRate", label: "Interest rate (% per year)", default: 7.7, ...rate },
      { name: "years", label: "Term (years)", default: 5, type: "number", min: 1, step: "any" },
    ],
    run: (v) => {
      const r = nsc(v);
      return {
        rows: [
          { label: "Amount invested", value: inr(v.principal) },
          { label: "Interest over the term", value: inr(r.interest) },
          { label: "Maturity value", value: inr(r.value), strong: true },
        ],
        note: "Interest is compounded annually and paid on maturity. The rate on small savings is notified each quarter and the rate at the time of purchase applies for the whole term, so enter the rate that applied when the certificate was bought.",
      };
    },
  },

  "home-loan-calculator": {
    fields: [
      { name: "principal", label: "Loan amount (₹)", default: 5000000, ...num },
      { name: "annualRate", label: "Interest rate (% per year)", default: 9, ...rate },
      { name: "years", label: "Tenure (years)", default: 20, type: "number", min: 1, step: "any" },
      { name: "prepayment", label: "One-off prepayment, if any (₹)", default: 500000, ...num },
    ],
    run: (v) => {
      const r = prepaymentSaving(v);
      if (r.neverRepays) {
        return {
          rows: [{ label: "Monthly EMI", value: inr(r.monthly), strong: true }],
          note: "Check the figures entered: the instalment does not cover the interest.",
        };
      }
      const rows = [
        { label: "Monthly EMI", value: inr(r.monthly), strong: true },
        { label: "Total interest over the full term", value: inr(r.originalInterest) },
      ];
      if (v.prepayment > 0) {
        rows.push(
          { label: "Interest after the prepayment", value: inr(r.newInterest) },
          { label: "Interest saved", value: inr(r.interestSaved), strong: true },
          { label: "Tenure shortened by", value: `${Math.round(r.monthsSaved)} months` }
        );
      }
      return {
        rows,
        note: "Assumes a fixed rate on a monthly reducing balance, and that the instalment stays the same after a prepayment so the term shortens. Keeping the instalment and shortening the term saves more interest than reducing the instalment over the original term.",
      };
    },
  },

  "loan-tenure-calculator": {
    fields: [
      { name: "principal", label: "Outstanding loan amount (₹)", default: 1000000, ...num },
      { name: "annualRate", label: "Interest rate (% per year)", default: 10, ...rate },
      { name: "monthlyPayment", label: "Instalment you can pay each month (₹)", default: 15000, ...num },
    ],
    run: (v) => {
      const r = loanTenure(v);
      if (r.neverRepays) {
        return {
          rows: [
            { label: "First month's interest alone", value: inr(r.firstMonthInterest), strong: true },
            { label: "Number of instalments", value: "The loan never clears" },
          ],
          note: "The instalment is less than the interest for the first month, so the balance would grow rather than reduce however long the loan ran. The instalment has to exceed the first month's interest before any principal is repaid.",
        };
      }
      return {
        rows: [
          { label: "Number of instalments", value: `${Math.ceil(r.months)} months`, strong: true },
          { label: "That is about", value: `${r.years.toFixed(1)} years` },
          { label: "Total paid", value: inr(r.totalPaid) },
          { label: "Of which interest", value: inr(r.interest) },
        ],
        note: "The final instalment is usually smaller than the rest, because the term rarely works out to a whole number of months. Assumes a fixed rate on a monthly reducing balance.",
      };
    },
  },

  "delay-interest-calculator": {
    fields: [
      { name: "amountPaid", label: "Amount paid to the developer (₹)", default: 5000000, ...num },
      { name: "annualRate", label: "Prescribed rate of interest (% per year)", default: 10.75, ...rate },
      { name: "days", label: "Days of delay", default: 365, type: "number", min: 0, step: "1" },
    ],
    run: (v) => {
      const r = delayInterest(v);
      return {
        rows: [
          { label: "Interest for the delay", value: inr(r.interest), strong: true },
          { label: "Amount paid plus interest", value: inr(r.total) },
          { label: "Interest per day", value: inr(r.perDay) },
        ],
        note: "Simple interest on the amount paid, for the days entered. The rate is prescribed by the rules made under the Real Estate (Regulation and Development) Act and is commonly linked to a bank lending rate plus a margin, so it differs between states and changes over time. Confirm the rate and the method against the rules of the state concerned.",
      };
    },
  },
};
