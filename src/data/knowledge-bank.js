// The Resources: calculators and reference tables, at /knowledge-bank.
//
// This replaced the old /tools section. Calculator copy for the five original calculators moved
// here from tools.js unchanged apart from the ICAI wording; the nine added in October 2026 follow.
//
// Scope note: the brief for this section also listed Bulletins, Acts, Rules and Forms. Those are
// link directories and subscription content feeds rather than pages that can be written, so this
// file carries one curated `officialResources` list of sources we can stand behind instead of
// several hundred pages of unverifiable deep links. See docs/seo-changes-2026-10.md.
//
// Every figure on a utility page is listed in REVIEW.md for partner verification. Where a dataset
// is too large or too volatile to restate accurately (IFSC and MICR codes, daily gold and silver
// rates, the full HSN schedule, state stamp duty, the National Industries Classification), the
// page links the official source rather than reproducing it. That is deliberate: a stale rate
// table is worse than no rate table.

import { taxSlabs } from "./taxSlabs";

/* ------------------------------------------------------------------ */
/* Calculators                                                         */
/* ------------------------------------------------------------------ */

export const calculatorGroups = [
  { slug: "tax", title: "Tax", blurb: "Income tax, TDS and HRA." },
  { slug: "gst", title: "GST", blurb: "Add or remove GST, and work back from an MRP." },
  { slug: "loans", title: "Loans and interest", blurb: "EMI, tenure, prepayment and delay interest." },
  { slug: "business", title: "Business and investment", blurb: "Profit, net worth, effective capital and savings." },
];

export const calculators = [
  {
    slug: "income-tax-calculator",
    group: "tax",
    title: "Income Tax Calculator (Old vs New Regime)",
    short: "Compare tax under the old and new regimes.",
    metaTitle: "Income Tax Calculator – Old vs New Regime",
    metaDescription:
      "Compare income tax under the old and new regimes for FY 2025-26 and see which costs less, with the standard deduction and rebate applied.",
    intro: "Enter your income and deductions to see tax under both regimes side by side.",
    explainer: [
      "This calculator estimates your income tax for FY 2025-26 under the new regime and under the old regime, so you can see which one costs less. It applies the standard deduction for salaried taxpayers, the rebate under Section 87A and 4% health and education cess.",
      "In the old regime, enter the total of deductions you expect to claim, such as Section 80C, 80D, HRA exemption and home loan interest. The new regime allows very few deductions, so it usually suits people with limited deductions.",
      "The result is an estimate. It does not include surcharge for high incomes, special-rate income such as capital gains, or other adjustments. Confirm your final tax with a chartered accountant before filing.",
    ],
    faqs: [
      { q: "Does this include surcharge?", a: "No. Surcharge applies at higher income levels and is not modelled here. Speak to a chartered accountant for incomes above ₹50 lakh." },
      { q: "Which slabs are used?", a: `Slabs for FY ${taxSlabs.financialYear} (assessment year ${taxSlabs.assessmentYear}). They are updated after each Union Budget.` },
    ],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "hra-calculator",
    group: "tax",
    title: "HRA Exemption Calculator",
    short: "Work out how much of your HRA is exempt from tax.",
    metaTitle: "HRA Calculator – Exemption under Section 10(13A)",
    metaDescription:
      "Work out how much house rent allowance is exempt from tax under the old regime: enter salary, HRA and rent paid to see the exempt and taxable split.",
    intro: "Find the exempt part of your house rent allowance.",
    explainer: [
      "HRA exemption is the lowest of three amounts: the actual HRA you receive, rent paid minus 10% of your salary, and 50% of salary for Delhi, Mumbai, Kolkata and Chennai (40% for other cities). Here salary means basic salary plus dearness allowance, where it forms part of retirement benefits.",
      "The exemption is available only under the old tax regime. You also need rent receipts, and the landlord's PAN if annual rent exceeds ₹1 lakh.",
      "If you own the house you live in, or do not actually pay rent, no exemption is available however much HRA appears in your salary structure.",
    ],
    faqs: [
      { q: "Can I claim HRA under the new regime?", a: "No. The HRA exemption is one of the deductions the new regime does not allow. If you have substantial HRA, compare the two regimes before choosing." },
      { q: "What counts as a metro city for this?", a: "Delhi, Mumbai, Kolkata and Chennai attract the 50% limit. Every other city, including Noida, Gurugram and Bengaluru, takes the 40% limit." },
    ],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "tds-calculator",
    group: "tax",
    title: "TDS Calculator",
    short: "Work out the tax to deduct on a payment.",
    metaTitle: "TDS Calculator – Deduction on a Payment",
    metaDescription:
      "Work out the tax to deduct at source on a payment: enter the amount, the rate and the threshold for the section, and the higher rate where no PAN is held.",
    intro: "Enter the payment, the rate for the section and its threshold.",
    explainer: [
      "Tax deducted at source works section by section. Each section sets its own rate and its own threshold, and the threshold behaves as a floor rather than an exemption: once a payment crosses it, tax is deducted on the whole amount and not only on the part above it.",
      "Thresholds generally apply to the aggregate paid to one party during the financial year, so a series of small payments can cross the limit even where no single payment does. The running total for each party is what matters.",
      "Where the deductee has not furnished a PAN, the Act requires deduction at the higher rate it prescribes. That also denies the deductee credit for the tax, which is why validating a PAN before the first payment is worth the time it takes.",
      "This calculator applies the rate and threshold you enter. It does not hold a rate table, because rates and thresholds change by notification: check the current figure for the section before deducting.",
    ],
    faqs: [
      { q: "Is TDS deducted only on the amount above the threshold?", a: "No. Once the threshold is crossed, tax is deducted on the whole payment. The threshold decides whether tax applies at all, not how much of the payment it applies to." },
      { q: "What happens if the deductee has no PAN?", a: "Deduction is required at the higher rate the Act prescribes for that situation. The deductee also cannot get credit for the tax, because credit is given on the basis of PAN, so the amount is effectively lost to them." },
      { q: "Which form reports the deduction?", a: "Form 24Q for salary, Form 26Q for other payments to residents, Form 27Q for payments to non-residents and Form 27EQ for tax collected at source. The return is quarterly." },
    ],
    services: ["tds-return-filing", "payroll"],
  },
  {
    slug: "gst-calculator",
    group: "gst",
    title: "GST Calculator",
    short: "Add GST to an amount or remove it from one.",
    metaTitle: "GST Calculator – Add or Remove GST",
    metaDescription:
      "Add GST to an amount or remove it from a GST-inclusive figure, with the CGST and SGST split shown at 5%, 12%, 18% and 28%.",
    intro: "Work out GST on an amount, either way round.",
    explainer: [
      "Enter an amount and a rate. Choose whether the amount already includes GST or not: adding GST to ₹10,000 at 18% gives ₹11,800, while removing GST from ₹11,800 gives a taxable value of ₹10,000.",
      "For a supply within a state, the tax splits equally into CGST and SGST or UTGST. For a supply between states, the same total is charged as IGST instead, and the split does not apply.",
      "Some goods also attract compensation cess on top of GST. Where it applies, it is charged on the taxable value in the same way as the tax.",
    ],
    faqs: [
      { q: "What is the difference between CGST, SGST and IGST?", a: "On a supply within a state the tax is split equally between the Centre and the state as CGST and SGST. On a supply between states the whole amount is charged as IGST. The total rate is the same either way." },
      { q: "Which rate applies to my product?", a: "The rate follows the classification of the goods or service under the rate schedules. Classification is not always obvious and getting it wrong creates a demand later, so confirm it rather than assume." },
    ],
    services: ["gst-registration", "gst-return-filing"],
  },
  {
    slug: "gst-mrp-calculator",
    group: "gst",
    title: "GST MRP Calculator",
    short: "Work back from a retail price to the taxable value.",
    metaTitle: "GST MRP Calculator – Tax Inside a Retail Price",
    metaDescription:
      "Work back from a maximum retail price to the taxable value and the GST inside it, with the CGST and SGST split and compensation cess where it applies.",
    intro: "Find the tax inside a maximum retail price.",
    explainer: [
      "A maximum retail price is the final price a consumer pays, so it already includes GST. Finding the tax inside it is not the same as taking the rate off the price: taking 18% off ₹118 gives ₹96.76, while the correct taxable value is ₹100.",
      "The tax is backed out by dividing. At 18%, the taxable value is the MRP divided by 1.18, and the difference is the GST. This is the calculation that matters when you need the taxable value for an invoice, a margin calculation or a reconciliation.",
      "Where compensation cess applies on top of GST, the divisor includes it as well, because the MRP includes both.",
      "Retailers and distributors need this most often when working out a margin from a fixed MRP, and when checking whether an invoice from a supplier has split the price and the tax correctly.",
    ],
    faqs: [
      { q: "Why can I not just take 18% off the MRP?", a: "Because the 18% was charged on the taxable value, not on the final price. Taking the rate off the MRP applies it to the wrong base and understates the taxable value. Divide by 1.18 instead of subtracting 18%." },
      { q: "Does the MRP have to include GST?", a: "Yes. The maximum retail price is the all-inclusive price to the consumer, so GST and any cess are inside it. That is why it cannot be used directly as a taxable value." },
      { q: "How do I show this on an invoice?", a: "An invoice shows the taxable value and the tax separately rather than the MRP. This calculator gives you the taxable value to put on the invoice and the tax that sits on top of it." },
    ],
    services: ["gst-return-filing", "gst-registration"],
  },
  {
    slug: "emi-calculator",
    group: "loans",
    title: "EMI Calculator",
    short: "Monthly instalment on a loan.",
    metaTitle: "EMI Calculator – Monthly Loan Instalment",
    metaDescription:
      "Work out the monthly instalment on a loan from the amount, the interest rate and the tenure, with the total interest and total payment shown.",
    intro: "Work out the monthly instalment on a loan.",
    explainer: [
      "An equated monthly instalment covers both interest and principal. Early instalments are mostly interest, and the principal share grows as the balance falls.",
      "Enter the loan amount, the annual rate and the tenure in years. The calculation assumes a fixed rate on a monthly reducing balance, which is how most term loans work.",
      "A lender's figure may differ slightly because of the day count, the date of the first instalment and any processing fee added to the principal.",
    ],
    faqs: [
      { q: "Does a longer tenure cost more?", a: "Yes, in total interest, even though the monthly instalment is lower. Extending a loan reduces the monthly outgoing and increases what you pay overall." },
      { q: "What if my rate is floating?", a: "The instalment changes when the rate changes, or the tenure does. Re-run the calculation at the new rate to see the effect." },
    ],
    services: ["business-loan-assistance", "project-report"],
  },
  {
    slug: "home-loan-calculator",
    group: "loans",
    title: "Home Loan Calculator with Prepayment",
    short: "EMI, total interest, and what a prepayment saves.",
    metaTitle: "Home Loan Calculator – EMI and Prepayment Saving",
    metaDescription:
      "Work out a home loan EMI and see what a one-off prepayment saves in interest and how many months it takes off the tenure, keeping the instalment the same.",
    intro: "See the instalment, and what a prepayment would save.",
    explainer: [
      "A home loan runs long enough that the interest usually exceeds the amount borrowed. On a 20-year loan, total interest can be close to the principal, which is why prepayment has such a large effect.",
      "When you prepay, you can either keep the instalment and shorten the term, or keep the term and reduce the instalment. Keeping the instalment saves considerably more interest, because the balance falls faster. This calculator models that option.",
      "A prepayment made early saves far more than the same amount paid later, because interest in the early years is charged on a much larger balance. The same ₹5 lakh is worth several times more in year two than in year fifteen.",
      "Lenders may apply conditions to prepayment of a fixed-rate loan. Floating-rate home loans to individuals are generally free of a prepayment charge, but check the sanction terms.",
    ],
    faqs: [
      { q: "Should I shorten the tenure or reduce the EMI?", a: "Shortening the tenure saves more interest, because the outstanding balance reduces faster. Reducing the instalment helps monthly cash flow instead. The calculator shows the saving on the shorten-the-tenure basis." },
      { q: "Is prepaying better than investing the money?", a: "It depends on the loan rate against the return you expect after tax, and on how much certainty you want. A prepayment gives a certain saving at the loan rate; an investment return is not certain." },
      { q: "Does this include the tax benefit on a home loan?", a: "No. Deductions for interest and principal depend on the regime you choose and on conditions in the Act, so they are not modelled here. The comparison between regimes is a separate calculation." },
    ],
    services: ["itr-filing", "project-report"],
  },
  {
    slug: "loan-tenure-calculator",
    group: "loans",
    title: "Loan Tenure Calculator",
    short: "How many instalments it takes to clear a loan.",
    metaTitle: "Loan Tenure Calculator – Number of Instalments",
    metaDescription:
      "Work out how many monthly instalments it takes to clear a loan from the balance, the rate and what you can pay each month, with total interest shown.",
    intro: "Work out how long a loan takes to clear at a given instalment.",
    explainer: [
      "This is the EMI calculation the other way round. Instead of fixing the term and finding the instalment, it fixes the instalment and finds the term, which is the more useful question when you know what you can afford each month.",
      "There is a floor below which the loan never clears. If the instalment is less than the first month's interest, the balance grows instead of reducing, however long the loan runs. The calculator reports that rather than returning a very large number.",
      "The final instalment is usually smaller than the rest, because the term rarely works out to a whole number of months.",
      "This is also the quickest way to see the effect of paying a little more each month: raising the instalment slightly often takes a surprising number of months off a long loan.",
    ],
    faqs: [
      { q: "Why does my loan never clear at a low instalment?", a: "Because the instalment is not covering the interest charged for the month, so nothing is left to reduce the principal. The balance then grows. The instalment has to exceed the first month's interest before any principal is repaid." },
      { q: "How much does paying a bit extra help?", a: "More than most people expect on a long loan, because the extra comes off the principal and stops accruing interest for the rest of the term. Run the calculation at both instalments to compare." },
    ],
    services: ["business-loan-assistance", "project-report"],
  },
  {
    slug: "delay-interest-calculator",
    group: "loans",
    title: "RERA Delay Interest Calculator",
    short: "Interest on money paid for a delayed possession.",
    metaTitle: "RERA Delay Interest Calculator for Home Buyers",
    metaDescription:
      "Work out interest on amounts paid to a developer for a delay in possession: enter the amount, the prescribed rate and the days of delay.",
    intro: "Work out interest on amounts paid, for a delay in possession.",
    explainer: [
      "Where possession of a flat is delayed, the Real Estate (Regulation and Development) Act entitles an allottee to interest on the amounts already paid, either for the period of the delay if they continue with the project, or with a refund if they withdraw.",
      "The rate is prescribed by the rules made under the Act and is commonly linked to a bank lending rate plus a margin. Because the rules are made by each state, both the rate and the way it is expressed differ between states, and the rate changes as the underlying lending rate moves.",
      "This calculator applies simple interest on the amount paid for the days of delay, at the rate you enter. Enter the rate from the rules of the state where the project is registered.",
      "The date from which the delay runs is usually the date for possession in the agreement, and it is often disputed. Keep the agreement, the payment receipts and any written extension, because the computation stands or falls on those dates.",
    ],
    faqs: [
      { q: "What rate should I enter?", a: "The rate prescribed by the rules of the state where the project is registered, which is typically a specified bank's lending rate plus a margin. Because it moves with the underlying rate, use the rate applicable to the period of the delay rather than today's." },
      { q: "Is the interest simple or compound?", a: "These computations are normally made on a simple interest basis, which is what this calculator applies. Where a tribunal has directed otherwise in a particular matter, that direction governs." },
      { q: "Can I claim interest and still take the flat?", a: "The Act provides for interest for the period of the delay where an allottee continues with the project, and for a refund with interest where they withdraw. Which route is better depends on the facts, and it is worth taking advice before electing either." },
    ],
    services: ["itr-filing", "business-valuation"],
  },
  {
    slug: "sip-calculator",
    group: "business",
    title: "SIP Calculator",
    short: "Projected value of a monthly investment.",
    metaTitle: "SIP Calculator – Value of a Monthly Investment",
    metaDescription:
      "Project the value of a monthly investment from the amount, the expected return and the period, with the amount invested and the gain shown separately.",
    intro: "Project the value of investing a fixed amount each month.",
    explainer: [
      "A systematic investment plan invests a fixed amount at regular intervals. This projects the value at the end of the period from the return you enter, compounding monthly.",
      "The return is an assumption, not a promise. Market-linked returns vary year to year, and the final value depends on the sequence of returns as well as the average.",
      "The split between the amount invested and the gain is the part worth looking at: over long periods the gain becomes the larger share, which is the argument for starting early rather than investing more later.",
    ],
    faqs: [
      { q: "Is the return guaranteed?", a: "No. Market-linked returns are not guaranteed and past returns do not predict future ones. Treat the output as an illustration based on the rate you entered." },
      { q: "How is the gain taxed?", a: "That depends on the type of fund and the holding period. Capital gains rules differ between equity and debt funds, so check the position for your holding before you redeem." },
    ],
    services: ["tax-planning", "capital-gains-tax"],
  },
  {
    slug: "nsc-calculator",
    group: "business",
    title: "NSC Calculator",
    short: "Maturity value of a National Savings Certificate.",
    metaTitle: "NSC Calculator – Maturity Value and Interest",
    metaDescription:
      "Work out the maturity value of a National Savings Certificate from the amount invested, the rate at purchase and the term, with annual compounding.",
    intro: "Work out the maturity value of a National Savings Certificate.",
    explainer: [
      "Interest on a National Savings Certificate is compounded annually and paid with the principal at maturity, so the maturity value is simply the amount invested compounded over the term.",
      "The rate on small savings instruments is notified each quarter. The rate that applies for the whole term is the one in force when the certificate was bought, so enter the rate at purchase and not the current rate.",
      "Interest accrues each year even though it is not received until maturity. In practice the accrued interest is often declared as income each year, with the reinvested interest also qualifying for deduction under Section 80C in the years it accrues. The treatment of the final year's interest differs, because it is received rather than reinvested.",
    ],
    faqs: [
      { q: "Which rate should I use?", a: "The rate notified for the quarter in which you bought the certificate. That rate applies for the full term regardless of later changes, so the current rate is only relevant to a new purchase." },
      { q: "Is the interest taxable?", a: "Interest is taxable, and in practice it is commonly declared as it accrues each year. Reinvested interest can also qualify for deduction under Section 80C in those years. Confirm the treatment for your case before filing." },
    ],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "net-profit-calculator",
    group: "business",
    title: "Net Profit Calculator",
    short: "From revenue down to profit after tax.",
    metaTitle: "Net Profit Calculator – Gross to Profit After Tax",
    metaDescription:
      "Work from revenue down to profit after tax: gross profit, operating profit, profit before tax and net margin, from your own cost figures.",
    intro: "Work down from revenue to profit after tax.",
    explainer: [
      "Three profit figures matter and they answer different questions. Gross profit is revenue less the direct cost of what you sold, and it tells you whether your pricing covers your product. Operating profit takes off the cost of running the business, and it tells you whether the business model works. Profit after tax is what is actually left.",
      "Net margin, profit after tax as a percentage of revenue, is the figure to watch over time. A business can grow revenue while its margin falls, which usually means costs are growing faster than price.",
      "This is a working calculation from the figures you enter, not a computation of taxable income. Taxable profit differs because the Act disallows some expenses, allows depreciation on its own basis, and permits set-off of earlier losses.",
    ],
    faqs: [
      { q: "Is this my taxable profit?", a: "No. Taxable profit starts from accounting profit and then adjusts it: some expenses are disallowed, depreciation is computed on the Income-tax Act basis rather than the books basis, and brought-forward losses may be set off. The two figures are rarely the same." },
      { q: "Where does depreciation belong?", a: "Above operating profit, as a cost of using the assets. It is shown separately here because it is a non-cash charge, so operating profit before and after depreciation answer different questions." },
    ],
    services: ["bookkeeping-services", "virtual-cfo"],
  },
  {
    slug: "net-worth-calculator",
    group: "business",
    title: "Net Worth Calculator",
    short: "What you own less what you owe.",
    metaTitle: "Net Worth Calculator – Assets Less Liabilities",
    metaDescription:
      "Work out net worth from assets and liabilities, and see what a net worth certificate for a visa, a tender or a loan application has to be supported by.",
    intro: "Work out net worth from assets and liabilities.",
    explainer: [
      "Net worth is what you own less what you owe. The arithmetic is simple; the work is in the values. Property at the price you paid years ago and property at today's value give very different answers, so the basis of valuation matters more than the subtraction.",
      "A net worth certificate is often asked for by an embassy for a visa, by a department for a tender, by a lender with a loan application, or under a scheme that has a net worth condition. Those certificates are issued by a chartered accountant on a prescribed basis and have to be supported by documents: title deeds, bank statements, valuation reports and loan statements.",
      "A certificate is not the same as this calculation. The certifying accountant has to see evidence for each asset and liability, and may value an asset differently from the figure an owner would use.",
    ],
    faqs: [
      { q: "Can a chartered accountant certify my net worth from this?", a: "No. A certificate has to be supported by documents for each asset and liability, and the accountant takes responsibility for the basis of valuation. This calculator is for working out the figure yourself before that process starts." },
      { q: "At what value should I take my property?", a: "That depends on why the certificate is needed. Some purposes require cost, others market value supported by a valuation report. Establish the required basis before gathering the figures, or the work has to be redone." },
      { q: "Do I include my business?", a: "Where you hold shares in a company, the shares are the asset and are valued as such. For a proprietorship, the business assets and liabilities are yours directly and come into the computation individually." },
    ],
    services: ["business-valuation", "ca-certification"],
  },
  {
    slug: "effective-capital-calculator",
    group: "business",
    title: "Effective Capital Calculator",
    short: "Schedule V effective capital, for managerial remuneration.",
    metaTitle: "Effective Capital Calculator – Schedule V",
    metaDescription:
      "Work out effective capital on the Schedule V basis used for managerial remuneration under the Companies Act, with revaluation reserves excluded.",
    intro: "Work out effective capital on the Schedule V basis.",
    explainer: [
      "Effective capital is a defined figure under Schedule V to the Companies Act, and it matters because the limits on managerial remuneration a company may pay without central government approval are expressed in bands of effective capital. A company that computes it wrongly can pay remuneration it was not entitled to pay.",
      "The computation adds paid-up share capital, share premium, reserves and surplus, long-term loans and deposits repayable after a year. It then deducts investments, accumulated losses and preliminary expenses not written off.",
      "A revaluation reserve is specifically excluded. That is the point most often missed: revaluing assets upwards does not increase effective capital, so it cannot be used to lift the remuneration a company may pay.",
      "The figure is computed as at the last date of the previous financial year, or as at the date of appointment for a company that has not completed a financial year. Confirm the components against the Schedule for the year concerned before relying on the result.",
    ],
    faqs: [
      { q: "Why does effective capital matter?", a: "Schedule V sets the maximum remuneration a company may pay a managerial person, in the absence of adequate profits, in bands linked to effective capital. The band the company falls in decides the limit." },
      { q: "Does a revaluation reserve count?", a: "No. Schedule V excludes it from the computation. This calculator shows any revaluation reserve you enter separately, so you can see that it has not been added to the total." },
      { q: "As at what date is it computed?", a: "Generally the last date of the financial year preceding the one in which the appointment is made, and the date of appointment for a company that has not yet completed a financial year. Confirm the position in the Schedule for your case." },
    ],
    services: ["annual-roc-filing", "statutory-audit"],
  },
];

export const getCalculator = (slug) => calculators.find((c) => c.slug === slug);
export const calculatorsIn = (group) => calculators.filter((c) => c.group === group);

/* ------------------------------------------------------------------ */
/* Utilities: reference tables                                         */
/* ------------------------------------------------------------------ */

// Every figure below is listed in REVIEW.md for verification, and every page carries a note
// saying so plus a link to the official source. Where a dataset could not be restated accurately,
// there is no page: see `notReproduced` at the end of this file.
export const utilities = [
  {
    slug: "income-tax-rates",
    title: "Income Tax Rates",
    short: "Slabs under both regimes, with the standard deduction and rebate.",
    metaTitle: "Income Tax Rates – Both Regimes",
    metaDescription:
      "Income tax slab rates under the new and old regimes, with the standard deduction, the rebate limit and the health and education cess.",
    intro: `Slab rates for FY ${taxSlabs.financialYear} (assessment year ${taxSlabs.assessmentYear}), under both regimes.`,
    // Built from taxSlabs.js, the same data the income tax calculator uses, so the page and the
    // calculator can never disagree.
    source: { label: "Income Tax Department", href: "https://www.incometax.gov.in/iec/foportal/" },
    sections: [
      ["h2", "New regime"],
      ["p", "The default regime. It has wider slabs and a lower entry rate, but allows very few deductions."],
      ["table", {
        head: ["Taxable income", "Rate"],
        rows: taxSlabs.new.bands.map(([limit, r], i, a) => {
          const from = i === 0 ? 0 : a[i - 1][0];
          const money = (n) => "₹" + n.toLocaleString("en-IN");
          return [limit === Infinity ? `Above ${money(from)}` : `${money(from)} to ${money(limit)}`, `${r * 100}%`];
        }),
      }],
      ["ul", [
        `Standard deduction for salaried taxpayers and pensioners: ₹${taxSlabs.new.standardDeduction.toLocaleString("en-IN")}`,
        `No tax where taxable income is up to ₹${taxSlabs.new.rebateIncomeLimit.toLocaleString("en-IN")}, through the rebate under Section 87A, with marginal relief just above it`,
        `Health and education cess of ${taxSlabs.cess * 100}% on the tax`,
      ]],
      ["h2", "Old regime"],
      ["p", "Available by election. It has a basic exemption that varies with age and permits the main deductions, including 80C, 80D, HRA and home loan interest."],
      ["table", {
        head: ["Age", "Basic exemption"],
        rows: [
          ["Below 60", "₹" + taxSlabs.old.exemption.below60.toLocaleString("en-IN")],
          ["60 to 79 (senior citizen)", "₹" + taxSlabs.old.exemption.senior.toLocaleString("en-IN")],
          ["80 and above (super senior citizen)", "₹" + taxSlabs.old.exemption.superSenior.toLocaleString("en-IN")],
        ],
      }],
      ["ul", [
        `Standard deduction for salaried taxpayers: ₹${taxSlabs.old.standardDeduction.toLocaleString("en-IN")}`,
        `Rebate under Section 87A up to ₹${taxSlabs.old.rebateMax.toLocaleString("en-IN")} where taxable income does not exceed ₹${taxSlabs.old.rebateIncomeLimit.toLocaleString("en-IN")}`,
        `Health and education cess of ${taxSlabs.cess * 100}% on the tax`,
      ]],
      ["h2", "What is not shown here"],
      ["p", "Surcharge, which applies at higher income levels and at different rates under the two regimes, and the special rates that apply to capital gains and certain other income. Both change the effective rate materially, so a computation at the slab rates alone is an approximation."],
    ],
    related: ["income-tax-calculator"],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "gst-rate-structure",
    title: "GST Rate Structure",
    short: "The rate slabs, how the tax splits, and where cess applies.",
    metaTitle: "GST Rate Structure – Slabs and the Tax Split",
    metaDescription:
      "The GST rate slabs, how tax splits between CGST, SGST and IGST, where compensation cess applies, and why classification decides the rate.",
    intro: "The rate slabs and how the tax splits between the Centre and the states.",
    source: { label: "CBIC – GST", href: "https://cbic-gst.gov.in/" },
    sections: [
      ["h2", "The rate slabs"],
      ["p", "Goods and services fall into rate slabs by classification. A nil rate is not the same as an exempt or a non-GST supply, and the difference affects input tax credit."],
      ["table", {
        head: ["Slab", "Typically applies to"],
        rows: [
          ["Nil", "Specified essential goods and services"],
          ["5%", "Specified mass-consumption goods and some services"],
          ["12%", "A middle band of goods and services"],
          ["18%", "The standard band for most goods and services"],
          ["28%", "Specified goods, several of which also attract compensation cess"],
        ],
      }],
      ["h2", "How the tax splits"],
      ["table", {
        head: ["Supply", "What is charged"],
        rows: [
          ["Within a state or union territory", "CGST and SGST or UTGST, half the total rate each"],
          ["Between states", "IGST at the full rate"],
          ["Import of goods", "IGST, with customs duty, at the point of import"],
          ["Specified goods in the 28% band", "Compensation cess in addition to GST"],
        ],
      }],
      ["h2", "Why classification matters more than the rate table"],
      ["p", "The rate follows the classification of the goods or service, and classification is where disputes arise. Two products that look similar can sit in different slabs, and an incorrect classification produces a demand for the difference with interest, often years later. The slab table is the easy part; establishing which slab applies is the work."],
      ["h2", "Rates change by notification"],
      ["p", "The slabs above are the structure rather than a current rate list. Individual items move between slabs by notification, and the full schedules run to thousands of entries by HSN code. For a specific product or service, check the current schedule rather than relying on a summary."],
    ],
    related: ["gst-calculator", "gst-mrp-calculator"],
    services: ["gst-registration", "gst-return-filing"],
  },
  {
    slug: "section-80tta-vs-80ttb",
    title: "Section 80TTA and 80TTB Compared",
    short: "Which deduction applies to interest income, and to whom.",
    metaTitle: "Section 80TTA vs 80TTB – Interest Deduction",
    metaDescription:
      "How Section 80TTA and 80TTB differ: who can claim each, which interest qualifies, the limits, and why only one of them can be claimed.",
    intro: "Two deductions for interest income, and the differences between them.",
    source: { label: "Income Tax Department", href: "https://www.incometax.gov.in/iec/foportal/" },
    sections: [
      ["h2", "The difference in one table"],
      ["p", "Both deductions cover interest income, but they apply to different taxpayers and to different kinds of interest. A taxpayer claims one or the other, never both."],
      ["table", {
        head: ["", "Section 80TTA", "Section 80TTB"],
        rows: [
          ["Who can claim", "Individuals and Hindu undivided families below 60", "Resident senior citizens, 60 and above"],
          ["Interest covered", "Interest on savings accounts only", "Interest on savings accounts and on deposits, including fixed and recurring deposits"],
          ["Maximum deduction", "₹10,000", "₹50,000"],
          ["Fixed deposit interest", "Not covered", "Covered"],
          ["Available under the new regime", "No", "No"],
        ],
      }],
      ["h2", "Why a senior citizen should not claim 80TTA"],
      ["p", "A senior citizen is eligible for the larger and wider deduction under 80TTB, which covers deposit interest as well as savings interest and has a higher limit. Claiming 80TTA instead gives up most of that. The two are mutually exclusive, so the choice has to be made deliberately rather than by habit."],
      ["h2", "Both are deductions, not exemptions"],
      ["p", "The interest is still income and still has to be reported in the return. The deduction reduces taxable income afterwards. This matters because the interest appears in the Annual Information Statement, and a return that omits it produces a mismatch notice even where the deduction would have covered the tax."],
      ["h2", "Neither is available under the new regime"],
      ["p", "Both deductions belong to the old regime. A taxpayer with substantial interest income, particularly a senior citizen with deposits, should compare the two regimes with the deduction included before electing."],
    ],
    related: ["income-tax-rates"],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "tds-return-due-dates",
    title: "TDS Return and Payment Due Dates",
    short: "Quarterly return dates, payment dates and certificate dates.",
    metaTitle: "TDS Due Dates – Returns, Payment and Certificates",
    metaDescription:
      "TDS due dates in one table: quarterly return dates for Forms 24Q, 26Q, 27Q and 27EQ, monthly payment dates, and the dates for Form 16 and 16A.",
    intro: "The dates for depositing tax deducted, filing the quarterly return, and issuing certificates.",
    source: { label: "Income Tax Department", href: "https://www.incometax.gov.in/iec/foportal/" },
    sections: [
      ["h2", "Which form applies"],
      ["p", "The form follows the nature of the payment and the residential status of the recipient, not the size of the payment."],
      ["table", {
        head: ["Form", "Covers"],
        rows: [
          ["24Q", "Tax deducted from salary"],
          ["26Q", "Tax deducted on payments to residents other than salary"],
          ["27Q", "Tax deducted on payments to non-residents"],
          ["27EQ", "Tax collected at source"],
        ],
      }],
      ["h2", "Quarterly return due dates"],
      ["table", {
        head: ["Quarter", "Period", "Return due"],
        rows: [
          ["Q1", "April to June", "31 July"],
          ["Q2", "July to September", "31 October"],
          ["Q3", "October to December", "31 January"],
          ["Q4", "January to March", "31 May"],
        ],
      }],
      ["h2", "Payment and certificate dates"],
      ["table", {
        head: ["Item", "Due date"],
        rows: [
          ["Deposit of tax deducted, April to February", "7th of the following month"],
          ["Deposit of tax deducted in March", "30 April"],
          ["Form 16 to employees", "15 June following the financial year"],
          ["Form 16A to other deductees", "Quarterly, within the period prescribed after the return due date"],
        ],
      }],
      ["h2", "What a default costs"],
      ["p", "The consequences stack rather than replace one another: interest under Section 201(1A) for late deduction or late deposit, a fee of ₹200 for each day a return is late under Section 234E capped at the tax deducted, and a penalty under Section 271H where a return is not filed or carries incorrect information. Late deduction can also lead to the expense being disallowed, which turns a compliance slip into additional tax on income."],
      ["h2", "Dates can be extended"],
      ["p", "The Central Board of Direct Taxes extends these dates from time to time for a particular quarter or category. Confirm the applicable date for the quarter before filing rather than working from this table alone."],
    ],
    related: ["tds-calculator"],
    services: ["tds-return-filing", "payroll"],
  },
  {
    slug: "pf-esi-rates-and-dates",
    title: "Provident Fund and ESI: Rates and Dates",
    short: "Contribution structure, due dates and the professional tax position by state.",
    metaTitle: "PF and ESI – Contribution Rates and Due Dates",
    metaDescription:
      "Provident fund and ESI contribution structure and monthly due dates, with the state-by-state professional tax position for payroll across offices.",
    intro: "What is deducted from a salary each month, when it has to be paid, and which states levy professional tax.",
    source: { label: "EPFO", href: "https://www.epfindia.gov.in/" },
    sections: [
      ["h2", "Monthly due dates"],
      ["p", "Both the provident fund and ESI are due by the 15th of the month following the month they relate to. These dates are fixed by statute and do not move because a salary run was late."],
      ["table", {
        head: ["Item", "Due date", "If missed"],
        rows: [
          ["Provident fund deposit and electronic challan-cum-return", "15th of the following month", "Interest on the amount and damages at the prescribed rates"],
          ["ESI contribution", "15th of the following month", "Interest on the amount and damages at the prescribed rates"],
          ["Tax deducted on salary", "7th of the following month; 30 April for March", "Interest under Section 201(1A)"],
          ["Professional tax", "As the state law prescribes", "Interest and penalty under the state legislation"],
        ],
      }],
      ["h2", "Which deductions apply at all"],
      ["p", "Four may apply, and only two of them are national. Provident fund and ESI depend on the establishment being covered and the employee being within the wage conditions; tax on salary applies to anyone whose estimated annual income is taxable; professional tax applies only in states that levy it."],
      ["h2", "Professional tax differs by state"],
      ["p", "This is what catches an employer with staff in more than one state, because there is no national professional tax and no national rate."],
      ["table", {
        head: ["State", "Position"],
        rows: [
          ["Uttar Pradesh", "No professional tax: no registration, deduction or return"],
          ["Delhi", "No professional tax"],
          ["Maharashtra", "Levied on a slab basis with an annual ceiling, and two registrations: as an employer and in the business's own right"],
          ["Punjab", "Levied as the Punjab State Development Tax, a flat monthly amount on persons liable to income tax above the threshold in the state Act"],
          ["Other states", "Varies: some levy it, some do not, with rates and return frequency set by each state"],
        ],
      }],
      ["h2", "Rates and ceilings are not reproduced here"],
      ["p", "Contribution rates and wage ceilings for the provident fund and ESI are set by their own statutes and have been revised from time to time, and the statutory definition of wages itself changed under the labour codes. Rather than restate figures that may have moved, this page links the two authorities below. Check the current rate and ceiling for the period being processed."],
    ],
    related: [],
    services: ["payroll", "tds-return-filing"],
  },
  {
    slug: "compliance-due-dates",
    title: "Recurring Compliance Due Dates",
    short: "The monthly, quarterly and annual dates in one place.",
    metaTitle: "Compliance Due Dates – Monthly to Annual",
    metaDescription:
      "Recurring statutory due dates for GST, TDS, advance tax, provident fund, ESI and ROC filings, grouped by how often each one comes round.",
    intro: "The recurring dates a business works to, grouped by frequency.",
    source: { label: "GST portal", href: "https://www.gst.gov.in/" },
    sections: [
      ["h2", "Monthly"],
      ["table", {
        head: ["Item", "Due date"],
        rows: [
          ["GSTR-1, outward supplies, monthly filers", "11th of the following month"],
          ["GSTR-3B, summary return and payment, monthly filers", "20th of the following month"],
          ["Deposit of tax deducted at source", "7th of the following month; 30 April for March"],
          ["Provident fund and ESI", "15th of the following month"],
          ["Stock statements to a lender, where the sanction requires them", "As the sanction specifies"],
        ],
      }],
      ["h2", "Quarterly"],
      ["table", {
        head: ["Item", "Due date"],
        rows: [
          ["TDS and TCS returns", "31 July, 31 October, 31 January, 31 May"],
          ["Advance tax instalments", "The dates prescribed in the Income-tax Act"],
          ["GST returns under the quarterly scheme", "As prescribed for the scheme"],
        ],
      }],
      ["h2", "Annual"],
      ["table", {
        head: ["Item", "Due date"],
        rows: [
          ["Form 16 to employees", "15 June"],
          ["Annual return on foreign liabilities and assets (FLA)", "15 July"],
          ["GST annual return and reconciliation statement", "As prescribed for the year"],
          ["Statement of donations in Form 10BD, for 80G holders", "31 May"],
          ["Annual performance report for overseas investment", "31 December"],
          ["FCRA annual return in Form FC-4", "31 December"],
          ["Company and LLP annual filings", "Counted from the annual general meeting or the year end, as applicable"],
        ],
      }],
      ["h2", "Every one of these can be extended"],
      ["p", "Due dates are extended by notification more often than this kind of table suggests, sometimes repeatedly within a year and sometimes only for particular categories of taxpayer. Treat this as the recurring shape of the year and confirm each date for the period concerned before relying on it."],
    ],
    related: [],
    services: ["gst-return-filing", "tds-return-filing", "annual-roc-filing"],
  },
];

export const getUtility = (slug) => utilities.find((u) => u.slug === slug);

/* ------------------------------------------------------------------ */
/* Official resources                                                  */
/* ------------------------------------------------------------------ */

// Bare acts, rules and forms live on government sites that maintain them. Linking the official
// source is more useful and more honest than reproducing hundreds of deep links that break, so
// this is a curated directory rather than a copy of the statute book.
export const officialResources = [
  {
    group: "Direct tax",
    links: [
      { label: "Income Tax Department – e-filing portal", href: "https://www.incometax.gov.in/iec/foportal/", note: "returns, forms, utilities and the taxpayer's own records" },
      { label: "Income Tax Department – Acts", href: "https://incometaxindia.gov.in/pages/acts/income-tax-act.aspx", note: "the Income-tax Act as amended" },
      { label: "Income Tax Department – Rules", href: "https://incometaxindia.gov.in/pages/rules/income-tax-rules-1962.aspx", note: "the Income-tax Rules" },
      { label: "Income Tax Department – all forms", href: "https://www.incometax.gov.in/iec/foportal/help/all-topics/statutory-forms", note: "statutory forms by number" },
      { label: "Income Tax Department – double taxation agreements", href: "https://incometaxindia.gov.in/pages/international-taxation/dtaa.aspx", note: "treaty texts by country" },
      { label: "Income Tax Department – transfer pricing", href: "https://incometaxindia.gov.in/pages/international-taxation/transfer-pricing.aspx", note: "provisions, rules and safe harbour notifications" },
      { label: "TRACES", href: "https://contents.tdscpc.gov.in/", note: "TDS certificates, corrections and the justification report" },
    ],
  },
  {
    group: "GST and indirect tax",
    links: [
      { label: "GST portal", href: "https://www.gst.gov.in/", note: "registration, returns, refunds and the LUT" },
      { label: "CBIC – GST", href: "https://cbic-gst.gov.in/", note: "the GST Acts, rules, notifications and circulars" },
      { label: "CBIC – GST Acts and Rules", href: "https://cbic-gst.gov.in/cbec-gst-act-rules.html", note: "CGST, IGST, UTGST and the compensation cess Act" },
      { label: "Central Board of Indirect Taxes and Customs", href: "https://www.cbic.gov.in/", note: "customs, and the legacy excise and service tax material" },
      { label: "Directorate General of Foreign Trade", href: "https://www.dgft.gov.in/", note: "Import Export Code and the foreign trade policy" },
    ],
  },
  {
    group: "Company and LLP law",
    links: [
      { label: "Ministry of Corporate Affairs", href: "https://www.mca.gov.in/", note: "filings, including Form CSR-1 and the ROC forms" },
      { label: "MCA – Acts", href: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html", note: "the Companies Act and the LLP Act" },
      { label: "MCA – Rules", href: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/rules.html", note: "rules made under both Acts" },
      { label: "India Code", href: "https://www.indiacode.nic.in/", note: "the official repository of central and state legislation" },
      { label: "Insolvency and Bankruptcy Board of India", href: "https://ibbi.gov.in/", note: "the Code, regulations and circulars" },
    ],
  },
  {
    group: "Banking, exchange control and securities",
    links: [
      { label: "Reserve Bank of India – notifications", href: "https://www.rbi.org.in/Scripts/NotificationUser.aspx", note: "circulars and directions as issued" },
      { label: "Reserve Bank of India – master directions", href: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx", note: "consolidated directions by subject" },
      { label: "Reserve Bank of India – master circulars", href: "https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx", note: "income recognition and asset classification, and lending norms" },
      { label: "Reserve Bank of India – FEMA", href: "https://www.rbi.org.in/scripts/Fema.aspx", note: "the Act, rules, regulations and directions" },
      { label: "FIRMS portal", href: "https://firms.rbi.org.in/", note: "Entity Master, FC-GPR and FC-TRS" },
      { label: "Securities and Exchange Board of India", href: "https://www.sebi.gov.in/", note: "regulations, circulars and master circulars" },
    ],
  },
  {
    group: "Labour and social security",
    links: [
      { label: "Employees' Provident Fund Organisation", href: "https://www.epfindia.gov.in/", note: "ECR filing, contribution rates and due dates" },
      { label: "Employees' State Insurance Corporation", href: "https://www.esic.gov.in/", note: "contribution rates, the wage ceiling and due dates" },
      { label: "Ministry of Labour and Employment", href: "https://labour.gov.in/", note: "the four labour codes and the central rules" },
    ],
  },
  {
    group: "Not-for-profit",
    links: [
      { label: "FCRA portal, Ministry of Home Affairs", href: "https://fcraonline.nic.in/", note: "registration, prior permission, FC-3C, FC-4 and FC-6" },
      { label: "National CSR portal", href: "https://www.csr.gov.in/", note: "the CSR framework and registered implementing agencies" },
      { label: "NGO Darpan", href: "https://ngodarpan.gov.in/", note: "the unique identification a number of applications require" },
    ],
  },
  {
    group: "Small business and credit",
    links: [
      { label: "Udyam registration portal", href: "https://udyamregistration.gov.in/", note: "MSME classification and registration" },
      { label: "Ministry of Micro, Small and Medium Enterprises", href: "https://msme.gov.in/", note: "schemes and eligibility" },
      { label: "Credit Guarantee Fund Trust for Micro and Small Enterprises", href: "https://www.cgtmse.in/", note: "guarantee cover and ceilings" },
    ],
  },
  {
    group: "Professional standards",
    links: [
      { label: "The Institute of Chartered Accountants of India", href: "https://www.icai.org/", note: "accounting and auditing standards, and the Code of Ethics" },
    ],
  },
];

// Datasets that are deliberately not reproduced, and where to get them instead. Shown on the
// Resources hub so the omission is explicit rather than looking like an oversight.
export const notReproduced = [
  { what: "IFSC and MICR codes", why: "Tens of thousands of records that change as branches open, merge and close", where: { label: "Reserve Bank of India", href: "https://www.rbi.org.in/Scripts/Bs_viewcontent.aspx?Id=2009" } },
  { what: "Gold and silver rates", why: "Change daily, so any published table is wrong by the time it is read", where: { label: "Income Tax Department", href: "https://incometaxindia.gov.in/charts%20%20tables/gold-and-silver-rates.htm" } },
  { what: "Full HSN and SAC rate schedules", why: "Thousands of entries, amended by notification through the year", where: { label: "CBIC – GST", href: "https://cbic-gst.gov.in/gst-goods-services-rates.html" } },
  { what: "Stamp duty rates", why: "Set by each state and amended in state budgets", where: { label: "India Code", href: "https://www.indiacode.nic.in/" } },
  { what: "National Industries Classification codes", why: "A large published classification used mainly during registration", where: { label: "Udyam registration portal", href: "https://udyamregistration.gov.in/" } },
  { what: "Cost inflation index", why: "A long published series where a single wrong figure produces a wrong capital gain", where: { label: "Income Tax Department", href: "https://incometaxindia.gov.in/charts%20%20tables/cost-inflation-index.htm" } },
  { what: "Depreciation rates and useful lives", why: "Block rates under the Income-tax Act and useful lives under Schedule II both run to long schedules", where: { label: "Income Tax Department", href: "https://incometaxindia.gov.in/pages/rules/income-tax-rules-1962.aspx" } },
  { what: "ROC and LLP filing fees", why: "Fee slabs depend on nominal capital and on how late a filing is, and are revised by notification", where: { label: "Ministry of Corporate Affairs", href: "https://www.mca.gov.in/" } },
];
