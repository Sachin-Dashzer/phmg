// Additional sections and FAQs appended to articles, part B. Verify with the partners before launch.

export const extraB = {
  "gst-late-fee-and-interest": {
    body: [
      ["h2", "How interest is calculated, step by step"],
      ["p", "Interest runs on the amount of tax paid late, from the day after the due date until the day you pay. The formula is: tax paid late × interest rate × number of days late ÷ 365. Interest on the net liability paid in cash is the usual basis, so if part of your liability was set off against input credit on time, interest applies only to the cash portion paid late."],
      ["h2", "Late fee in practice"],
      ["ul", ["The fee is charged per day from the due date until the return is filed, and it stops at the cap.", "It is split equally between the central and state tax.", "Nil returns attract a lower daily amount.", "The fee is charged for each return separately, so a late GSTR-1 and a late GSTR-3B each carry their own fee."]],
      ["h2", "Mistakes that make it worse"],
      ["ul", ["Paying the tax on time but filing the return late. The fee still applies.", "Filing the return on time but paying the tax late. Interest applies.", "Ignoring nil returns for several months, because the fee adds up and the registration is at risk.", "Claiming credit that is not in GSTR-2B and having to reverse it later with interest."]],
      ["h2", "If you have many pending returns"],
      ["p", "File the oldest period first, because the portal generally requires earlier returns to be filed before later ones. Work out the total fee and interest before you start so you can budget for it. If an amnesty or fee-waiver scheme has been notified for the period, it can save a lot, but such schemes apply only for a limited window."],
    ],
    faqs: [
      { q: "Is the GST late fee refundable?", a: "Generally no. In some cases the government has waived or reduced the fee for specified periods by notification, and those waivers apply to returns filed within the window." },
      { q: "Is interest charged if there is no tax payable?", a: "No. Interest is charged on tax paid late. A nil return attracts only the late fee." },
      { q: "Can GST registration be cancelled for late filing?", a: "Yes. Failure to file returns for a continuous period can lead to a notice and cancellation of the registration, which can be revoked only within limits." },
      { q: "Does the late fee apply to the annual return as well?", a: "Yes. GSTR-9 attracts a late fee per day with a cap linked to turnover, for the taxpayers who are required to file it." },
    ],
  },

  "annual-roc-compliance-checklist-private-limited": {
    body: [
      ["h2", "A suggested annual timeline"],
      ["table", { head: ["Period", "What to do"], rows: [["April to June", "Close the books, begin the audit, file Form DPT-3 where applicable by 30 June"], ["July to August", "Finish the audit, approve accounts at a board meeting, issue notice for the AGM"], ["By 30 September", "Hold the AGM, complete director KYC if due, file ADT-1 if an auditor was appointed"], ["Within 30 days of AGM", "File Form AOC-4"], ["Within 60 days of AGM", "File Form MGT-7 or MGT-7A"], ["October", "File the MSME half-yearly return where applicable"], ["Through the year", "Hold board meetings, update registers, file event-based forms"]] }],
      ["h2", "Event-based filings that people forget"],
      ["ul", ["Change of directors: file the director appointment or resignation form within 30 days.", "Allotment of shares: file the return of allotment within 30 days.", "Change of registered office, name or capital: each has its own form and time limit.", "Charges created on assets for a loan: file the charge form within the time allowed."]],
      ["h2", "Records to maintain"],
      ["p", "Keep the register of members, directors and charges, the minutes of board and general meetings, copies of notices and attendance records. These are statutory records and are checked in audits and due diligence. Poor records can cause delay when a bank, investor or buyer examines the company."],
    ],
    faqs: [
      { q: "Are the annual filings required if the company is dormant?", a: "Yes. A dormant company must still file annual accounts and the annual return. A company can apply for dormant status, which has its own conditions and filings." },
      { q: "How many board meetings are required?", a: "At least four a year, with no more than 120 days between two meetings. One person companies and small companies have relaxations." },
      { q: "Can the AGM be held at short notice?", a: "Yes, with the consent of the required majority of members, and in line with the provisions. Documented consent is important." },
      { q: "What if the AGM is not held on time?", a: "The company and its officers can be penalised, and the delay can push back the due dates of AOC-4 and MGT-7. The Registrar can also grant an extension in limited cases if applied for before the due date." },
    ],
  },

  "private-limited-vs-llp-vs-opc-vs-proprietorship": {
    body: [
      ["h2", "Questions to ask yourself before choosing"],
      ["ul", ["Will you raise equity money from investors in the next two years?", "Do you need limited liability because of the risks of the business?", "Is there more than one owner, and how will profit and control be shared?", "How much compliance cost and paperwork can you handle?", "Do you plan to sell shares or give ESOPs to employees?", "Do you want to keep the structure simple and convert later?"]],
      ["h2", "Common scenarios"],
      ["ul", ["A single consultant who wants to start now: a proprietorship, with GST and other registrations as needed, is the lowest-effort start.", "Two friends opening a professional practice: an LLP gives limited liability with flexible profit sharing.", "A technology founder planning to raise seed money: a private limited company is the usual choice because investors expect shares and a standard structure.", "A single founder who wants limited liability but is not ready for partners: an OPC, with the option of converting later."]],
      ["h2", "Tax in one paragraph"],
      ["p", "Proprietors pay tax at individual slab rates on business profit. Partnership firms and LLPs pay tax at a flat rate on profit, and partners' share of profit is exempt in their hands. Companies pay corporate tax at the applicable rate, and shareholders pay tax on dividends they receive. Which is cheaper depends on how much profit you want to take out, so compare using your projected numbers instead of relying on general claims."],
    ],
    faqs: [
      { q: "Can a proprietorship take investment?", a: "Not by selling equity, because it has no shares. It can borrow money. Investors who want equity generally ask the business to become a company." },
      { q: "Is an LLP better than a private limited company?", a: "Neither is better in general. An LLP has lighter compliance and is flexible for professionals. A private limited company suits businesses planning to raise equity." },
      { q: "Can I convert later?", a: "Yes. Proprietorships, partnerships, LLPs and OPCs can be converted, with conditions and costs. Plan for it if investment is likely." },
      { q: "Which has the lowest compliance?", a: "A proprietorship, followed by a partnership, then an LLP, an OPC and a private limited company." },
    ],
  },

  "tds-rates-and-due-dates-chart": {
    body: [
      ["h2", "How to use the chart"],
      ["ul", ["Identify the nature of payment, such as professional fees or contractor payment.", "Check whether the payee is a resident and whether PAN is available, because the rate is higher without PAN.", "Check whether the annual or single-payment threshold is crossed before deduction is required.", "Deduct at the correct rate, deposit by the due date, and file the quarterly return."]],
      ["h2", "What happens if TDS is not deducted"],
      ["p", "If you do not deduct tax where required, interest is charged on the tax. In addition, a percentage of the expense can be disallowed as a deduction in computing your income, which increases your own tax. The deductee's own credit is not affected until the department identifies the default, so a short deduction can also lead to demands later."],
      ["h2", "Certificates and credit"],
      ["p", "After filing the quarterly return, the deductor issues a TDS certificate to the deductee. Form 16 is for salary and Form 16A is for other payments. The deductee's credit appears in Form 26AS and the Annual Information Statement. If the amounts do not match your records, ask the deductor to correct the return."],
      ["h2", "Tips for businesses"],
      ["ul", ["Collect PAN and contract details before the first payment.", "Keep a vendor-wise TDS ledger.", "Match your payments against the threshold during the year.", "File corrections quickly when you find a mistake, because late corrections increase fees."]],
    ],
    faqs: [
      { q: "Is TDS deducted on GST?", a: "TDS is generally deducted on the value of the payment excluding GST, if GST is shown separately on the invoice. Check the specific rules for each section." },
      { q: "What is the penalty for late filing of a TDS return?", a: "A fee of ₹200 per day applies until the return is filed, subject to a cap at the amount of TDS, plus a possible penalty in some cases." },
      { q: "Can I get a refund of excess TDS?", a: "Yes, by filing your income tax return and claiming credit for TDS deducted. The refund is processed after the return is verified." },
      { q: "Who needs a TAN?", a: "Any person who deducts or collects tax at source must have a Tax Deduction and Collection Account Number and quote it in returns and certificates." },
    ],
  },

  "gst-registration-documents-eligibility-process": {
    body: [
      ["h2", "Choosing the right address and activity"],
      ["p", "The place of business you declare decides the state of registration. If you have more than one place from which you make supplies in a state, you can list them as additional places. If you operate in several states, you need a registration in each state. Choose the goods or services you will supply, and the HSN or SAC codes, because they are used to determine the GST rate on your invoices."],
      ["h2", "What happens after you apply"],
      ["ul", ["The officer reviews the application and documents.", "If there are doubts, a notice for clarification is issued, and you have seven working days to reply.", "If everything is in order, the registration is approved and the GSTIN and certificate are issued.", "In some cases, a physical verification of the place of business may be done."]],
      ["h2", "Common reasons for rejection"],
      ["ul", ["Address proof that does not match the address entered", "Rental premises without the owner's consent letter", "Mismatch between PAN details and the name entered", "Wrong or unclear description of the business activity", "Documents that are unclear, cropped or in the wrong format"]],
    ],
    faqs: [
      { q: "Can I register for GST without a shop?", a: "Yes, a residential address can be the place of business if you provide proof and the owner's consent where applicable." },
      { q: "Is Aadhaar authentication mandatory?", a: "Aadhaar authentication is part of the process for most applicants. Those who choose it get faster approval, while others may face physical verification." },
      { q: "Can I cancel the registration later?", a: "Yes. A registration can be cancelled if the business closes or goes below the threshold in the cases allowed. Returns must be filed up to the date of cancellation." },
      { q: "Is separate GST registration needed for online selling?", a: "You need a GSTIN to sell through marketplaces in most cases. If you sell from several states, each state needs its own registration." },
    ],
  },

  "itr-due-dates-and-penalties": {
    body: [
      ["h2", "Interest you may owe in addition to the late fee"],
      ["ul", ["Section 234A: interest for delay in filing the return, at 1% per month or part of a month on the unpaid tax.", "Section 234B: interest if you did not pay enough advance tax during the year.", "Section 234C: interest for deferment of the individual advance tax instalments."]],
      ["h2", "A simple example"],
      ["p", "Suppose your tax payable after TDS is ₹40,000 and you file the return two months and ten days after the due date. Interest under Section 234A is roughly 1% of ₹40,000 for three months or parts of months, which is about ₹1,200, and you also pay the late fee under Section 234F. Paying the tax early, even if you cannot file immediately, stops the interest on that part."],
      ["h2", "Who must file even if they have no tax to pay"],
      ["ul", ["People with income above the basic exemption limit, before deductions", "Those with foreign assets or foreign income", "Directors of companies and holders of unlisted equity shares", "People who made large cash deposits, spent heavily on foreign travel or paid large electricity bills, as per the rules in force"]],
    ],
    faqs: [
      { q: "Can I revise a return after the due date?", a: "Yes, a revised return can be filed up to the permitted date, usually 31 December of the assessment year, if you find an error in the original." },
      { q: "Is the late fee waived if I have no tax to pay?", a: "No. The late fee under Section 234F applies on late filing even if there is no tax due, though the amount is capped at ₹1,000 when total income is up to ₹5 lakh." },
      { q: "What if I forgot to file in an earlier year?", a: "You may still be able to file a belated or updated return, depending on the year. Speak to a CA, because the options and costs differ for each year." },
      { q: "Will a late return delay my refund?", a: "A belated return is processed like any other once filed and verified, but the delay to file means you receive the refund later, and interest on the refund starts from the date of filing in many cases." },
    ],
  },

  "old-vs-new-tax-regime": {
    body: [
      ["h2", "A worked comparison"],
      ["p", "Take a salaried person earning ₹15,00,000 a year. Under the new regime, the standard deduction of ₹75,000 reduces taxable income to ₹14,25,000, and tax with cess comes to about ₹97,500. Under the old regime, with the standard deduction of ₹50,000 and deductions of ₹1,50,000 under Section 80C, taxable income is ₹13,00,000, and tax with cess is about ₹2,10,600. Here the new regime is cheaper by a large margin. To make the old regime competitive at this income, deductions would need to be far higher, for example through HRA and a home loan."],
      ["h2", "When the old regime still wins"],
      ["ul", ["You pay a large amount of rent and claim HRA.", "You have a home loan with substantial interest.", "You invest fully under Section 80C and also claim Section 80D and other deductions.", "Your income is in a range where the extra deductions bring you into a lower slab."]],
      ["h2", "Switching between regimes"],
      ["p", "Salaried individuals can choose the regime each year when they file the return, and can tell their employer which one to use for TDS. Individuals with business income have fewer chances to switch back after opting for the new regime. Check the current rules before deciding for a business."],
    ],
    faqs: [
      { q: "Is the new regime the default?", a: "Yes. If you do not choose the old regime, your tax is computed under the new regime." },
      { q: "Can I claim HRA in the new regime?", a: "No. HRA exemption and most other deductions are available only in the old regime." },
      { q: "Can I change the regime after my employer has deducted TDS?", a: "Yes. The employer's choice only affects TDS. At the time of filing your return, you can choose the regime that gives the lower tax, subject to the rules." },
      { q: "Does the choice affect capital gains tax?", a: "Special rates for capital gains apply under either regime. The choice mainly affects the slab-rate income and the deductions you can claim." },
    ],
  },

  "how-to-reply-income-tax-notice": {
    body: [
      ["h2", "What a good reply contains"],
      ["ul", ["A short opening that identifies the notice, the section, the assessment year and your PAN", "A point-by-point answer to each query in the order asked", "Supporting documents, labelled and referred to in the text", "A statement of what you agree with and what you dispute, with reasons", "Your contact details and, if applicable, the authorisation of your representative"]],
      ["h2", "A worked example: income mismatch"],
      ["p", "Suppose an intimation says your return does not match the interest income shown in the Annual Information Statement. You check your bank records and find that you had omitted interest on a fixed deposit. The simplest response is to agree, file a revised return if the time allows, and pay the extra tax and interest. If instead the interest belongs to a joint holder who is the real owner, you can respond with the bank's confirmation that the income is not yours."],
      ["h2", "After you reply"],
      ["p", "The officer may accept your reply and close the matter, ask for more information, or pass an order. Check the portal regularly, because the next notice may carry a short deadline. If an order is passed against you, read the reasons carefully, and decide quickly whether to seek rectification, file an appeal or pay."],
    ],
    faqs: [
      { q: "How long do I have to reply?", a: "The time is written in the notice, and varies by type of notice. It can be as short as 7 or 15 days, and can sometimes be extended on request." },
      { q: "Can a CA reply on my behalf?", a: "Yes, a chartered accountant can be authorised to represent you on the e-filing portal, subject to your authorisation." },
      { q: "What if I did not receive the notice by email?", a: "Notices are also visible on the portal. Check it regularly, and keep your email and mobile number up to date, because the portal sends the alerts there." },
      { q: "Is a notice the same as a penalty?", a: "No. A notice asks for information or correction. A penalty may follow only if the department finds a default and passes a separate order." },
    ],
  },

  "capital-gains-tax-shares-property-mutual-funds": {
    body: [
      ["h2", "A worked example on listed shares"],
      ["p", "You bought listed shares for ₹2,00,000 and sold them after 18 months for ₹3,50,000. The gain is ₹1,50,000. It is long-term. Gains up to ₹1,25,000 in a year are exempt, so only ₹25,000 is taxed at 12.5%, which is ₹3,125 plus cess. If you had sold after 10 months, the gain would have been short-term and taxed at 20% on the full ₹1,50,000."],
      ["h2", "How to compute cost and gain"],
      ["ul", ["Cost of acquisition: the price you paid, plus brokerage and expenses of purchase.", "Cost of improvement: for property, the cost of capital improvements, with proofs.", "Expenses on transfer: brokerage and costs of sale are deducted from the sale price.", "Gain: sale price less expenses of sale less the cost of acquisition and improvement."]],
      ["h2", "Reinvestment exemptions need planning"],
      ["p", "To claim exemption on a long-term gain from a house, you must buy or construct a residential house within the time limits, or deposit the money in a capital gains account scheme before the return due date if you have not yet reinvested. Missing the conditions makes the gain taxable. Plan before the sale, not after."],
    ],
    faqs: [
      { q: "Are capital gains taxed separately from my other income?", a: "They are part of your total income, but special rates apply to long-term gains and to short-term gains on listed equity, instead of slab rates." },
      { q: "Can I set off a capital loss?", a: "Yes. Short-term losses can be set off against both short-term and long-term gains. Long-term losses can be set off only against long-term gains. Unabsorbed losses can be carried forward for eight years if the return is filed on time." },
      { q: "How is gain on mutual funds taxed?", a: "It depends on the type of fund, the holding period and the date of purchase. Equity funds are taxed like listed shares. Debt funds follow different rules, so check the type of fund." },
      { q: "Do gifts and inherited assets attract capital gains?", a: "Receiving a gift or inheritance is not a transfer for capital gains. When you later sell, the holding period and cost of the previous owner are generally used." },
    ],
  },

  "how-to-file-itr-online": {
    body: [
      ["h2", "Checklist before you click submit"],
      ["ul", ["Salary and TDS match Form 16 and Form 26AS", "Interest and dividend income match the Annual Information Statement", "Capital gains are reported with the right dates and amounts", "Bank account for refund is pre-validated and linked to your PAN", "The regime you chose is the one with lower tax for you", "You have your Aadhaar OTP, net banking or other e-verification method ready"]],
      ["h2", "After filing"],
      ["p", "Once the return is verified, the department processes it and sends an intimation. Check it for any difference between your computation and theirs. If you find a mistake in your own return after filing, file a revised return before the permitted last date."],
    ],
    faqs: [
      { q: "Can I file my ITR on my phone?", a: "Yes, the e-filing portal works on a mobile browser. For a complex return, a computer is easier because you need to review many schedules." },
      { q: "Do I need a CA to file my return?", a: "Not for a simple salary return. A CA helps if you have capital gains, business income, foreign assets or a notice." },
      { q: "How long should I keep my documents?", a: "Keep records for at least six years from the end of the assessment year, and longer if an assessment or appeal is pending." },
      { q: "What if I made a mistake after verifying?", a: "You can file a revised return within the allowed time, which replaces the original return." },
    ],
  },
};
