// Copy for each calculator page. The maths lives in src/lib/calculators.
export const tools = [
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator (Old vs New Regime)",
    short: "Compare tax under the old and new regimes.",
    metaTitle: "Income Tax Calculator – Old vs New Regime",
    metaDescription: "Free income tax calculator that compares the old and new regimes for FY 2025-26 and shows which costs you less. Try it now and plan your tax.",
    intro: "Enter your income and deductions to see tax under both regimes side by side.",
    explainer: [
      "This calculator estimates your income tax for FY 2025-26 under the new regime and under the old regime, so you can see which one costs less. It applies the standard deduction for salaried taxpayers, the rebate under Section 87A and 4% health and education cess.",
      "In the old regime, enter the total of deductions you expect to claim, such as Section 80C, 80D, HRA exemption and home loan interest. The new regime allows very few deductions, so it usually suits people with limited deductions.",
      "The result is an estimate. It does not include surcharge for high incomes, special-rate income such as capital gains, or other adjustments. Confirm your final tax with a chartered accountant before filing.",
    ],
    faqs: [
      { q: "Does this include surcharge?", a: "No. Surcharge applies at higher income levels and is not modelled here. Consult a CA for incomes above ₹50 lakh." },
      { q: "Which slabs are used?", a: "Slabs for FY 2025-26 (assessment year 2026-27). They are updated after each Union Budget." },
    ],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "hra-calculator",
    title: "HRA Exemption Calculator",
    short: "Work out how much of your HRA is tax-free.",
    metaTitle: "HRA Calculator – Exemption under Section 10(13A)",
    metaDescription: "Free HRA calculator to find how much house rent allowance is exempt from tax under the old regime. Enter salary and rent and get the answer instantly.",
    intro: "Find the tax-free part of your house rent allowance.",
    explainer: [
      "HRA exemption is the lowest of three amounts: the actual HRA you receive, rent paid minus 10% of your salary, and 50% of salary for Delhi, Mumbai, Kolkata and Chennai (40% for other cities). Here salary means basic salary plus dearness allowance, where it forms part of retirement benefits.",
      "The exemption is available only under the old tax regime. You also need rent receipts, and the landlord's PAN if annual rent exceeds ₹1 lakh.",
    ],
    faqs: [
      { q: "Can I claim HRA if I live with my parents?", a: "Yes, if you actually pay rent to them and they report it as income. Keep proof of payment and a rent agreement." },
      { q: "Is HRA exempt in the new regime?", a: "No. HRA exemption is available only in the old regime." },
    ],
    services: ["itr-filing", "tax-planning"],
  },
  {
    slug: "gst-calculator",
    title: "GST Calculator",
    short: "Add or remove GST from any amount.",
    metaTitle: "GST Calculator – Add or Remove GST",
    metaDescription: "Free GST calculator to add or remove GST from an amount and see the CGST, SGST and total. Enter your price and rate to get the result instantly.",
    intro: "Add GST to a price, or find the GST inside a GST-inclusive price.",
    explainer: [
      "Enter the amount and the GST rate. If your amount already includes GST, choose 'Including GST' to find the base price and the tax inside it. For supplies within a state, GST splits equally into CGST and SGST. For supplies between states, the whole amount is charged as IGST.",
      "Check the correct rate for your goods or services using the HSN or SAC code, since rates are notified by the GST Council and can change.",
    ],
    faqs: [
      { q: "How do I remove GST from a price?", a: "Divide the GST-inclusive price by (1 + rate/100). For 18%, divide by 1.18. Select 'Including GST' to do it automatically." },
      { q: "When is IGST charged?", a: "On supplies between states and on imports. Within a state, CGST and SGST apply." },
    ],
    services: ["gst-registration", "gst-return-filing"],
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    short: "Calculate monthly loan instalments.",
    metaTitle: "EMI Calculator – Loan Instalment Estimator",
    metaDescription: "Free EMI calculator to estimate monthly instalments, total interest and total payment for a loan. Enter amount, rate and tenure to see the result.",
    intro: "Estimate your monthly instalment and total interest.",
    explainer: [
      "The EMI is calculated with the standard reducing-balance formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate and n is the number of months.",
      "Lenders may add processing fees and use slightly different day-count methods, so your actual EMI can differ a little. Use this as a planning estimate.",
    ],
    faqs: [
      { q: "Does a longer tenure reduce my EMI?", a: "Yes, but you pay more interest overall. Compare total interest for different tenures." },
      { q: "Is this suitable for floating-rate loans?", a: "It assumes a constant rate. For floating-rate loans the EMI or tenure changes when the rate changes." },
    ],
    services: ["business-loan-assistance"],
  },
  {
    slug: "sip-calculator",
    title: "SIP Calculator",
    short: "Estimate the future value of monthly investments.",
    metaTitle: "SIP Calculator – Estimate Your Returns",
    metaDescription: "Free SIP calculator to estimate the future value of a monthly investment at an assumed return rate. Enter amount, rate and years to see an illustration.",
    intro: "See how a regular monthly investment may grow at an assumed rate of return.",
    explainer: [
      "A Systematic Investment Plan invests a fixed amount every month. This calculator assumes that the return you enter is earned evenly and that each instalment is invested at the start of the month, which gives future value = P × [((1+i)^n − 1) / i] × (1+i), where i is the monthly rate and n is the number of months.",
      "Market-linked returns are not guaranteed and vary year to year. The result is an illustration and not a forecast or a recommendation to invest.",
    ],
    faqs: [
      { q: "Is the result guaranteed?", a: "No. Investment returns vary and can be negative. The tool only shows what the entered rate would produce." },
      { q: "Are taxes included?", a: "No. Capital gains tax may apply on redemption. See our capital gains guide." },
    ],
    services: ["tax-planning"],
  },
];

export const getTool = (slug) => tools.find((t) => t.slug === slug);
