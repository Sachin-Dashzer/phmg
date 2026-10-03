// Additional sections and FAQs appended to articles (see src/data/insights.js). Verify with the partners before launch.

export const extraA = {
  "startup-india-dpiit-recognition-benefits": {
    body: [
      ["h2", "Documents and details you will need"],
      ["ul", ["Certificate of incorporation or registration, with the entity's PAN", "Details of directors or partners and an authorised signatory", "A clear description of the business: the problem, the product and the customers", "A website, app link or pitch deck that supports the description", "Details of any funding received, if applicable"]],
      ["h2", "How the application is reviewed"],
      ["p", "DPIIT reviews the application online. Officials check the entity type, age and turnover, and read the description to judge whether the business is working on innovation or has a scalable model. If the description is unclear, they ask for clarification, and the application waits until you answer. Applications that explain the product and the market in specific terms move faster than those with general statements."],
      ["h2", "Practical benefits founders ask about"],
      ["ul", ["Intellectual property: recognised startups can use fast-track examination of patent applications and may get fee concessions, as notified.", "Public procurement: some relaxations on prior experience and turnover conditions may apply to tenders, as notified.", "Schemes and funds: recognition is often a basic condition for state and central startup schemes and for some incubators.", "Compliance: certain self-certification facilities under labour and environment laws have been offered to startups, with conditions."]],
      ["p", "Each of these benefits has its own conditions and application. Recognition opens the door but does not by itself deliver the benefit."],
      ["h2", "Common reasons for delay or rejection"],
      ["ul", ["The business looks like a normal trading or service firm with no innovation or scalability.", "The entity is older than the permitted age or above the turnover limit.", "Information in the form does not match the incorporation documents.", "The entity was formed by splitting up or restructuring an existing business."]],
    ],
    faqs: [
      { q: "Do I need DPIIT recognition to start a startup?", a: "No. You can run a business without it. Recognition is only needed if you want to access benefits and schemes that are limited to recognised startups." },
      { q: "Is there a government fee for recognition?", a: "The application on the Startup India portal has not traditionally carried a government fee. Check the portal for the current position, and be careful about agents who quote a fee for it." },
      { q: "Can a recognised startup still get tax notices?", a: "Yes. Recognition does not exempt you from any filing, assessment or notice. Normal compliance applies." },
      { q: "Can I get recognition for a business that is only an idea?", a: "You must first be incorporated or registered as an eligible entity. The entity can be at an early stage, but the application is made by the entity." },
    ],
  },

  "statutory-audit-vs-tax-audit-vs-internal-audit": {
    body: [
      ["h2", "A worked example"],
      ["p", "Consider a private limited company with a turnover of ₹3 crore that sells goods to other businesses. The company must get a statutory audit every year, because it is a company. It also needs a tax audit if its turnover crosses the limit under Section 44AB, which depends partly on how much of its receipts and payments are in cash. The directors may separately choose to hire an outside firm for an internal audit of inventory and purchases because they want better controls. Three different audits, three different purposes, and three different reports."],
      ["h2", "Who relies on each report"],
      ["ul", ["Statutory audit report: shareholders, the Registrar of Companies, lenders and investors.", "Tax audit report: the Income Tax Department, which uses it in assessing your return.", "Internal audit report: the board and management, who use it to fix weaknesses."]],
      ["h2", "Timing and effort"],
      ["p", "A statutory audit usually follows the year end, once the books are closed and before the annual general meeting. A tax audit is due before the date set for filing the audit report with the income tax return. Internal audit often runs throughout the year in periodic visits, so issues are found as they occur. Because the statutory and tax audits both use the same books, doing them together saves effort, and many businesses give both to the same firm."],
      ["h2", "Choosing between auditors"],
      ["p", "Statutory auditors must be independent. For companies where internal audit is mandatory, the law limits the services the statutory auditor can also provide, so that the two roles stay separate. Ask any prospective auditor to confirm their eligibility before appointment."],
    ],
    faqs: [
      { q: "Can one firm do statutory audit and tax audit?", a: "Yes, in many cases the same firm can do both, provided it meets the independence rules under the Companies Act and the professional guidelines." },
      { q: "Is internal audit mandatory?", a: "It is mandatory for certain classes of companies that cross specified thresholds, such as listed companies and larger unlisted ones. For others it is voluntary but useful." },
      { q: "Does an LLP need a statutory audit?", a: "Only if its turnover exceeds ₹40 lakh or its contribution exceeds ₹25 lakh. Otherwise there is no mandatory audit under the LLP Act, though a tax audit may still apply." },
      { q: "Which audit do banks ask for?", a: "Banks usually want audited financial statements, which come from the statutory audit, and sometimes a stock audit or concurrent audit for the facility they have granted." },
    ],
  },

  "compliance-calendar-monthly-due-dates-for-businesses": {
    body: [
      ["h2", "How to turn the calendar into a routine"],
      ["p", "A calendar only helps if someone owns each date. Assign an owner for every recurring item, such as the person who collects invoices for GST or the one who approves payroll for PF. Set reminders about a week before each date so that documents are ready, and a second reminder two days before for approvals and payments."],
      ["h2", "A suggested weekly rhythm"],
      ["ul", ["Week 1: deposit TDS by the 7th and collect sales and purchase data for GST.", "Week 2: file GSTR-1 by the 11th and pay PF and ESI by the 15th.", "Week 3: reconcile credit and file GSTR-3B by the 20th.", "Week 4: close the month's books, review MIS and plan the next month's payments."]],
      ["h2", "Dates that are easy to miss"],
      ["ul", ["TDS for March is due on 30 April, not the 7th.", "Quarterly TDS returns follow the quarter end, and the fourth quarter return falls on 31 May.", "Advance tax instalments apply to most taxpayers whose estimated tax is above the limit, and presumptive taxpayers have a single instalment by 15 March.", "AOC-4 and MGT-7 depend on the date of the AGM, not a fixed calendar date.", "Form MSME-1 is due twice a year only for companies with outstanding payments to micro or small suppliers beyond the permitted period."]],
      ["h2", "When due dates are extended"],
      ["p", "Governments sometimes extend dates for returns by notification or circular, usually for a specific class of taxpayers or a specific period. An extension does not always cover interest or every form. Check the notification before relying on it, and when in doubt, comply by the original date."],
    ],
    faqs: [
      { q: "What happens if I miss a GST or TDS due date?", a: "GST returns attract a daily late fee and interest on unpaid tax. TDS attracts interest on late deduction or deposit and a fee for late return filing. Amounts and caps are set by law and change from time to time." },
      { q: "Do these dates apply to every business?", a: "No. They apply only if you hold the relevant registration or meet the conditions. For example, PF and ESI apply above employee thresholds, and tax audit applies above turnover limits." },
      { q: "Where can I confirm the current due date?", a: "On the official portals: the income tax e-filing portal, the GST portal and the MCA portal. They publish circulars and notifications about extensions." },
      { q: "Who can help me set up a calendar?", a: "Your chartered accountant can build a calendar tailored to your registrations and send reminders. See our tax calendar page for the recurring dates." },
    ],
  },

  "tax-audit-section-44ab-limits-applicability": {
    body: [
      ["h2", "Worked examples"],
      ["ul", ["A trader has a turnover of ₹1.5 crore. Cash receipts and payments are more than 5% of the total. Tax audit applies, because the ₹1 crore limit applies.", "The same trader keeps cash receipts and payments within 5% of the totals. Under the higher limit, audit applies only above ₹10 crore, so no audit is needed on these facts.", "A doctor has gross receipts of ₹60 lakh. The professional limit of ₹50 lakh is crossed, so tax audit applies unless presumptive taxation under Section 44ADA is available and used.", "A small shop declares presumptive income under Section 44AD but later opts out of the scheme and declares less than the presumptive profit. Books and an audit may be needed."]],
      ["h2", "What the auditor checks"],
      ["p", "The auditor reports on a long list of items in Form 3CD. These include how the books are maintained, depreciation, loans and deposits taken, payments in cash above limits, tax deducted at source, payments to related parties, and turnover reconciled with the GST returns. Where the answers show non-compliance, the auditor is required to report them, and the department may disallow the related expenses."],
      ["h2", "What it costs to skip it"],
      ["p", "Apart from the penalty of 0.5% of turnover up to ₹1.5 lakh, the real cost is often a re-assessment. An unaudited return in a case where audit was required may be treated as defective or lead to a notice. If you realise the audit was missed, speak to a CA quickly, because the position can be fixed more easily soon after the due date than years later."],
    ],
    faqs: [
      { q: "Does tax audit apply if I made a loss?", a: "It can. Several rules are triggered by turnover or by declaring a profit below the presumptive rate, regardless of whether the business made a loss in the year." },
      { q: "What is the audit limit if I take most payments by cheque?", a: "A higher limit of ₹10 crore applies where cash receipts and cash payments are each within 5% of the total, subject to the conditions of the law. Otherwise the ₹1 crore limit applies." },
      { q: "Can I switch between presumptive taxation and regular books?", a: "You can, but the law restricts switching back for some period after you opt out. Decide with advice, since it affects both audit and tax cost." },
      { q: "Who can sign a tax audit report?", a: "Only a practising chartered accountant. They must be independent, and must also meet the eligibility conditions of the professional rules." },
    ],
  },

  "form-15ca-15cb-explained": {
    body: [
      ["h2", "Who needs to file"],
      ["p", "The person making a payment to a non-resident, or to a foreign company, must furnish Form 15CA before the payment, subject to exceptions. This includes businesses paying for services, royalties and software, and individuals sending large sums abroad that are chargeable to tax. Payments that are clearly of a capital nature and not taxable may need only a declaration, or may be exempt from the form, depending on the nature and the amount."],
      ["h2", "When is a CA certificate required?"],
      ["p", "Form 15CB is required where the payment is taxable in India and the amount exceeds the limit stated in the rules. The CA examines the agreement, the nature of the payment, the applicable tax treaty and the rate of deduction. The certificate gives the details the bank needs to allow the remittance, including how much tax should be deducted."],
      ["h2", "How a treaty can change the tax"],
      ["p", "India's tax treaties can reduce or eliminate tax on payments to residents of the treaty country. To use the benefit, the payee generally provides a tax residency certificate and Form 10F. The CA checks whether the treaty actually applies to the type of payment, for example royalties and fees for technical services are treated differently from business profits."],
      ["h2", "Mistakes that delay remittances"],
      ["ul", ["Choosing the wrong part of Form 15CA", "Mismatch between the invoice, the agreement and the form", "No tax residency certificate to support a treaty claim", "Wrong purpose code or beneficiary details in the bank request", "Not deducting tax at the right rate, which leads to a demand later"]],
    ],
    faqs: [
      { q: "Do I need Form 15CA for every foreign payment?", a: "No. Some payments are exempt under the rules, such as certain payments related to travel, education and specified purposes, up to limits. Others need only a declaration. Your bank and CA can confirm." },
      { q: "Who can issue Form 15CB?", a: "A chartered accountant, as defined in the Chartered Accountants Act. The form is uploaded on the income tax portal." },
      { q: "How long does it take?", a: "If the facts and documents are clear, the CA certificate and the declaration can be done in a day or two. Missing documents are the usual cause of delay." },
      { q: "Is Form 15CA required for NRIs sending money abroad from NRO accounts?", a: "Yes, generally. Repatriation from an NRO account usually needs Form 15CA and, in many cases, a CA certificate, along with the bank's own documentation." },
    ],
  },

  "gstr-1-vs-gstr-3b": {
    body: [
      ["h2", "A simple example of how the two returns connect"],
      ["p", "Suppose your business sold goods worth ₹10,00,000 plus 18% GST in a month, and bought goods worth ₹6,00,000 plus 18% GST. In GSTR-1, you report each sales invoice, and the tax on them, which is ₹1,80,000. In GSTR-3B, you declare the same ₹1,80,000 as output tax, claim ₹1,08,000 as input credit, if it appears in GSTR-2B and is eligible, and pay the balance of ₹72,000. If GSTR-3B shows less output tax than GSTR-1, the system flags it."],
      ["h2", "What GSTR-2B is and why it matters"],
      ["p", "GSTR-2B is a statement generated for you every month, showing the credit available based on what your suppliers reported in their GSTR-1. It is the reference for claiming credit in GSTR-3B. A supplier that files late or not at all means that credit does not appear in your GSTR-2B, and claiming it anyway can lead to a notice."],
      ["h2", "Correcting mistakes"],
      ["ul", ["Errors in a GSTR-1 already filed can be corrected through amendments in a later return.", "Errors in GSTR-3B are generally corrected in the next month's return.", "Credit claimed wrongly should be reversed with interest as soon as you notice the error."]],
      ["h2", "Practical tips"],
      ["ul", ["File GSTR-1 first and use the same data for GSTR-3B.", "Download GSTR-2B after the due date for suppliers to file and reconcile it with your purchase register.", "Keep a monthly note explaining any difference between books and returns."]],
    ],
    faqs: [
      { q: "Can I file GSTR-3B before GSTR-1?", a: "Technically yes in many cases, but it is better to file GSTR-1 first so your buyers get their credit on time and so your data is consistent." },
      { q: "What if I forget to report an invoice in GSTR-1?", a: "Report it in the next period's GSTR-1, with the correct tax, and pay any interest if the tax was paid late." },
      { q: "Is GSTR-1 needed if there are no sales?", a: "Yes, a nil GSTR-1 is generally required for the period, unless you are covered by a scheme that allows a different filing." },
      { q: "Which return decides the tax I pay?", a: "GSTR-3B. It is where the tax liability and credit are finally computed and paid." },
    ],
  },

  "section-8-company-ngo-registration-process": {
    body: [
      ["h2", "Choosing the objects carefully"],
      ["p", "The objects clause of the memorandum is the heart of a Section 8 company. It must be charitable or non-commercial in character, and specific enough that the Registrar can see what the company will do. It should also be broad enough for the activities you plan over the next few years. Avoid objects that suggest trading for profit, and avoid listing many unrelated causes."],
      ["h2", "Who can be a director or member"],
      ["p", "A Section 8 company needs at least two directors, with minimum two members for a private company. Directors should have a genuine interest in the objects and the time to govern. The law does not allow distribution of profits to members, so people who join should understand that they are joining for the cause, not for returns."],
      ["h2", "Estimated income and expenditure"],
      ["p", "The licence application includes a statement of the expected income and expenditure for the next three years. It should be realistic, show the sources of funds, and show how the funds will be used for the objects. The Registrar reads it to judge the seriousness of the plan."],
      ["h2", "Common reasons for delay"],
      ["ul", ["Objects that sound commercial or are too vague", "Name objections, such as a name too close to an existing organisation", "Missing declarations or inconsistent addresses", "No source of income explained in the projections"]],
    ],
    faqs: [
      { q: "Can a Section 8 company pay its directors?", a: "Directors can be reimbursed for expenses, and reasonable payment for specific services can be made if properly approved and recorded. Distribution of profits to members is not allowed." },
      { q: "Is audit mandatory for a Section 8 company?", a: "Yes. Like every company, it must get its accounts audited every year." },
      { q: "Do I need 12A and 80G if I am a Section 8 company?", a: "They are not automatic. If you want the income of the organisation to be exempt, and donors to claim deductions, you must apply separately." },
      { q: "Can a Section 8 company be converted into a normal company?", a: "Yes, but only after following the conditions in the Companies Act, which restrict conversion and require approvals. It is not something to plan lightly." },
    ],
  },

  "dir-3-kyc-who-must-file-and-penalty": {
    body: [
      ["h2", "What details are checked"],
      ["ul", ["Name, date of birth and PAN, matched against the DIN record", "Residential address and proof of address", "Mobile number and email address, each verified with a one-time password", "Aadhaar details, where required by the form"]],
      ["h2", "Step-by-step filing"],
      ["ul", ["Log in to the MCA portal and open the director KYC form.", "Confirm or update your details and verify the contact details with one-time passwords.", "Attach any documents the form requires and sign it as instructed.", "Pay any fee due and submit. Download the acknowledgement."]],
      ["h2", "What if you do not know your DIN status?"],
      ["p", "You can check whether your DIN is active by looking up your DIN on the MCA portal. A deactivated DIN is shown as such. If you are a director of a company whose forms you must sign, check this at the start of the year rather than during the filing rush."],
      ["h2", "Practical points"],
      ["ul", ["Keep the mobile number and email of each director separate and in use.", "Complete KYC before signing any forms that need your digital signature.", "If you are a director of several companies, one KYC covers your DIN across all of them.", "If you have resigned from all companies but still hold a DIN, check whether KYC is still required for you."]],
    ],
    faqs: [
      { q: "What is DIR-3 KYC web?", a: "It is a simpler web-based form that directors who have already completed the full KYC in an earlier period can use. It needs an OTP and does not need a digital signature in many cases." },
      { q: "How much does it cost to restore a deactivated DIN?", a: "A late fee of ₹5,000 is payable when filing the KYC form to reactivate the DIN, along with any applicable fees. The MCA publishes the current fee." },
      { q: "Does director KYC apply to a company's nominee director?", a: "Yes. Any person who holds an approved DIN is covered, regardless of the role in the company." },
      { q: "Can I file KYC from outside India?", a: "Yes, provided you can receive the OTPs on the mobile number and email you have registered. Keep these numbers active before the due date." },
    ],
  },

  "company-registration-cost-timeline-documents": {
    body: [
      ["h2", "A sample cost breakdown, by category"],
      ["table", { head: ["Cost item", "Depends on", "Paid to"], rows: [["Professional fee", "Scope: with or without GST, bank account help, drafting of founders' agreement", "CA or consultant"], ["Government fee for incorporation forms", "Authorised capital and the form used", "MCA"], ["Stamp duty on memorandum and articles", "State and authorised capital", "State government"], ["Digital signature certificates", "Number of directors and validity", "Certifying authority"], ["Name reservation", "Fee as notified", "MCA"], ["Optional: trademark, GST, Udyam, bank account", "Services chosen", "Various"]] }],
      ["h2", "How to compare quotes"],
      ["p", "Ask each provider to list what is included. A lower professional fee may leave out digital signatures, stamp duty, or post-incorporation filings, which you then pay separately. Ask what happens if the Registrar raises a query, and whether re-filing is included. A fair quote is clear about government charges, which are fixed by the authorities and do not vary between providers."],
      ["h2", "After you receive the certificate"],
      ["ul", ["Open a current bank account in the company's name and deposit the subscription money", "Hold the first board meeting and issue share certificates", "Appoint the first auditor within 30 days", "File the commencement of business declaration within 180 days", "Register for GST, professional tax, shops and establishment and other licences as relevant", "Set up bookkeeping and an annual compliance calendar"]],
    ],
    faqs: [
      { q: "Is there a minimum capital to start a private limited company?", a: "There is no minimum paid-up capital requirement. Your authorised capital should match your plans, since it decides fees and stamp duty." },
      { q: "Can I register a company without a physical office?", a: "You need a registered office address in India where you can receive communications. A rented or owned premises or, in some cases, a residence can serve, with proper proof." },
      { q: "Can foreigners be directors?", a: "Yes, subject to FEMA and sector rules, but at least one director must be a resident in India." },
      { q: "How long does the whole process take?", a: "Once documents are complete, filing can be done within a few days. Approval depends on the Registrar and on whether queries arise." },
    ],
  },

  "nri-income-tax-filing-tds-dtaa-basics": {
    body: [
      ["h2", "Common NRI scenarios"],
      ["ul", ["An NRI rents out a flat in India: the tenant deducts tax at source at a higher rate. The NRI files a return to claim credit and, if the actual tax is lower, a refund.", "An NRI sells an inherited property: capital gains tax is due, and the buyer deducts tax at source. A lower deduction certificate can be applied for before the sale.", "An NRI earns interest on an NRO deposit: the bank deducts tax at source, and the income is part of the Indian return.", "An NRI returns to India permanently: residential status changes during the year, and the year may need to be split into non-resident and resident periods."]],
      ["h2", "Using a double taxation treaty"],
      ["p", "If the country where you live also taxes the same income, the treaty tells you which country has the first right, and how to avoid paying twice. You normally claim credit in your country of residence for the Indian tax paid. Keep the Indian tax return, the proof of tax paid and the tax residency certificate from your country to support the claim."],
      ["h2", "Documents to keep"],
      ["ul", ["Passport pages showing entry and exit dates", "Bank statements for NRE and NRO accounts", "Rent agreements, property tax receipts and sale documents", "Form 26AS and AIS for the Indian PAN", "Tax residency certificate and Form 10F for treaty claims"]],
    ],
    faqs: [
      { q: "Does an NRI need an Indian PAN?", a: "Yes, if the NRI earns income in India, has to file a return or wants to transact in financial assets. A PAN is also needed for most banking and investment accounts." },
      { q: "Do NRIs pay tax on money sent from abroad to India?", a: "Money brought from abroad is not income, so it is not taxed. Income earned or received in India is taxable." },
      { q: "Can an NRI claim deductions?", a: "Some deductions are available to non-residents, such as certain investments under the old regime. Others are restricted. We review your return to find what applies." },
      { q: "How often should NRIs file a return in India?", a: "Every year in which they have taxable income above the exemption limit, want a refund, or hold assets or income that must be reported." },
    ],
  },
};
