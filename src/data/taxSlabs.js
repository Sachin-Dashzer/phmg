// Income tax slabs for the calculator.
// TODO: UPDATE AFTER EVERY UNION BUDGET and verify with the partners. Surcharge is not modelled.
export const taxSlabs = {
  financialYear: "2025-26",
  assessmentYear: "2026-27",
  cess: 0.04,
  // Each band: [upper limit of band, rate]
  new: {
    standardDeduction: 75000,
    rebateIncomeLimit: 1200000, // no tax up to this taxable income (with marginal relief above)
    bands: [[400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15], [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3]],
  },
  old: {
    standardDeduction: 50000,
    rebateIncomeLimit: 500000,
    rebateMax: 12500,
    exemption: { below60: 250000, senior: 300000, superSenior: 500000 }, // basic exemption by age
    upperBands: [[500000, 0.05], [1000000, 0.2], [Infinity, 0.3]],
  },
};
