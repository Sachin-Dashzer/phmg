// Service-in-city landing pages, served at the root: /company-registration-in-noida and so on.
//
// Why these exist at the root rather than under /services or /ca-in-*: the searches they answer
// are typed as "<service> in <city>", and the pages that currently rank for them are aggregator
// pages at the root of their own domains. The route is src/app/[landing]/page.js, with
// dynamicParams = false, so only the slugs listed here resolve and every other root path still
// 404s or hits the legacy rules in src/proxy.js.
//
// These are NOT doorway pages and must not become them. Each one has to carry something that is
// true of that city and not of the others — which Registrar of Companies, which state's GST Act,
// which Sub-Registrar, whether the state levies professional tax. If a new page cannot say
// anything city-specific, it does not belong here; link the service page instead.
//
// ICAI: no fees framed as offers, no "best/top/affordable", no guarantees, no client names.
// Timelines are stated as the authority's own processing times, never as a promise.
//
// TODO: CLIENT TO CONFIRM before these go live — the two jurisdiction facts below are stated from
// general practice and a partner should confirm them against a current filing:
//   1. The Commissioner of Income Tax (Exemptions) station that handles Gautam Buddh Nagar.
//   2. The Sub-Registrar sub-district used for trust deeds executed at the Sector 59 office.
// Both are written in the copy without naming a station, so nothing is asserted that is wrong;
// naming them would make the pages more useful. Tracked in REVIEW.md.

import { offices } from "./firm.js";
import { cities } from "./cities.js";

const office = (slug) => offices.find((o) => o.slug === slug);
const lastReviewed = "2026-11-18";

// `title` carries no brand suffix: buildMetadata's withBrand appends the longest form of the
// firm's name that keeps the rendered title within 60 characters.
export const cityServices = [
  /* ---------------------------------------------------------------- */
  {
    slug: "company-registration-in-noida",
    officeSlug: "noida",
    cityName: "Noida",
    parentService: "private-limited-company-registration",
    title: "Company Registration in Noida & Greater Noida",
    h1: "Company Registration in Noida",
    metaDescription:
      "Private limited, LLP, OPC, partnership and proprietorship registration for Noida and Greater Noida businesses, filed with the Registrar of Companies, Kanpur.",
    intro:
      "Company registration in Noida is handled from our head office at D-23, 3rd Floor, Sector 59, Noida 201309. A company or LLP with its registered office in Noida or Greater Noida is incorporated through the Ministry of Corporate Affairs portal and falls under the Registrar of Companies for Uttar Pradesh at Kanpur, not the Delhi and Haryana registry.",
    sections: [
      ["h2", "Who needs to register, and as what"],
      ["p", "The structure decides the compliance that follows it for as long as the business exists, so it is worth settling before anything is filed. Five structures cover almost every case in Noida and Greater Noida."],
      ["table", {
        head: ["Structure", "Suits", "Registered with", "Annual filings"],
        rows: [
          ["Private limited company", "Businesses raising outside investment, or needing a corporate counterparty", "Registrar of Companies, Kanpur, under the Companies Act, 2013", "AOC-4, MGT-7, statutory audit, DIR-3 KYC"],
          ["Limited liability partnership", "Professional and service firms with no outside investor", "Registrar of Companies, Kanpur, under the LLP Act, 2008", "Form 11, Form 8, audit above the turnover and contribution limits"],
          ["One person company", "A single owner who wants limited liability", "Registrar of Companies, Kanpur", "AOC-4, MGT-7A, statutory audit"],
          ["Partnership firm", "Two or more owners, no limited liability", "Registrar of Firms, Uttar Pradesh, under the Indian Partnership Act, 1932", "None with the Registrar; income tax return only"],
          ["Proprietorship", "A single owner testing a business", "No incorporation; Udyam, GST and a trade licence as applicable", "None; income tax return only"],
        ],
      }],
      ["p", "A proprietorship and an unregistered partnership are not incorporated at all: there is nothing to register with the Registrar of Companies, and what people mean by registering one is obtaining the Udyam registration, the GST registration and the trade licence the activity needs. We will say so rather than file an incorporation that is not required."],
      ["h2", "Documents required"],
      ["ul", [
        "PAN and Aadhaar of every proposed director or partner, and a passport for a foreign national.",
        "One identity proof (voter ID, passport or driving licence) and one address proof dated within the last two months (bank statement, electricity, telephone or mobile bill) for each of them.",
        "A passport-size photograph and an email address and mobile number for each, used for the director identification number and for OTP verification on the portal.",
        "Proof of the registered office: the latest electricity bill or property tax receipt in the owner's name, a no-objection letter from the owner, and the rent agreement where the premises are taken on rent.",
        "Two or three proposed names, with the activity they describe, for name reservation.",
        "A digital signature certificate for each subscriber and director, which we arrange where one is not already held.",
      ]],
      ["h2", "The process, and who you are filing with"],
      ["ul", [
        "Digital signature certificates issued for each subscriber and director.",
        "Name reservation through SPICe+ Part A on the MCA portal, or RUN where the name is being changed rather than incorporated.",
        "SPICe+ Part B filed with the electronic memorandum (INC-33), the electronic articles (INC-34), the declaration by the subscribers (INC-9) and AGILE-PRO-S (INC-35), which carries the GST, EPFO, ESIC and bank account applications in the same submission.",
        "Stamp duty paid at the Uttar Pradesh rate for the state of the registered office, which is collected inside the SPICe+ filing rather than separately.",
        "The certificate of incorporation issued by the Registrar of Companies, Kanpur, with the corporate identity number, PAN and TAN.",
        "For an LLP: FiLLiP in place of SPICe+, followed by the LLP agreement in Form 3 within 30 days of incorporation.",
      ]],
      ["p", "The processing time is the Ministry's, not ours. Name reservation is usually decided in one to three working days and incorporation in a further three to seven working days where nothing is queried, but a resubmission for a name objection or a document defect adds its own cycle. We do not promise a date the Registrar controls."],
      ["h2", "Why Uttar Pradesh changes the answer"],
      ["p", "Three things follow from the registered office being in Noida rather than across the border in Delhi. Company filings go to the Registrar of Companies for Uttar Pradesh at Kanpur, so the jurisdiction on every incorporation and annual filing is different from a Delhi company's. GST is registered state by state, so a place of business in Noida needs an Uttar Pradesh registration even where the promoters and most customers are in Delhi, and a business supplying from both states generally needs one in each. And Uttar Pradesh does not levy professional tax, so payroll processed from a Noida office carries no professional tax registration, deduction or return at all — unlike the same payroll run from Punjab or Maharashtra."],
      ["h2", "What follows incorporation"],
      ["ul", [
        "The first auditor appointed by the board within 30 days of incorporation, under Section 139(6) of the Companies Act, 2013.",
        "A bank account opened and the subscription money actually paid in, before the next item can be filed.",
        "Form INC-20A, the declaration of commencement of business, within 180 days of incorporation, under Section 10A. A company cannot borrow or begin business until it is filed.",
        "GST registration where the activity or turnover requires it, and a Letter of Undertaking before the first export of the financial year where supplies are zero-rated.",
        "DIR-3 KYC for every director by 30 September each year, and then the annual cycle of AOC-4 and MGT-7.",
        "Where foreign investment comes in, Form FC-GPR within 30 days of allotment and the annual FLA return each July, under FEMA.",
      ]],
    ],
    faqs: [
      { q: "Which Registrar of Companies covers a company registered in Noida?", a: "The Registrar of Companies for Uttar Pradesh, at Kanpur. A registered office in Noida, Greater Noida or Noida Extension falls under that registry rather than the Delhi and Haryana one, even though the business may operate across the national capital region. The jurisdiction is fixed by the address of the registered office, not by where the directors live or where the customers are." },
      { q: "How long does company registration take in Noida?", a: "Name reservation is usually decided in one to three working days and the incorporation in a further three to seven working days where the Registrar raises no query. A name objection or a defect in a document leads to a resubmission, which adds a cycle. These are the Ministry of Corporate Affairs' own processing times and they are not something a professional can shorten or commit to." },
      { q: "Can I register a company at a residential address in Noida?", a: "Yes. The Companies Act does not require commercial premises for a registered office. What is required is proof of the address: a recent electricity bill or property tax receipt in the owner's name, a no-objection letter from the owner, and the rent agreement where it is rented. A co-working address can be used where the operator issues those documents." },
      { q: "Do I need a GST registration as soon as the company is incorporated?", a: "Not automatically. GST registration is required once turnover crosses the threshold for the state, or immediately where the business falls in a category that must register regardless of turnover, such as inter-state supply of goods, e-commerce operators and those liable under reverse charge. AGILE-PRO-S filed with SPICe+ lets the application go in with the incorporation where registration is already needed." },
      { q: "Private limited or LLP for a Noida business?", a: "A private limited company is the usual answer where outside investment is expected, because equity, share transfers and employee share plans all work within a structure investors recognise. An LLP suits a firm funded by its own partners: there is no statutory audit until turnover exceeds Rs 40 lakh or contribution exceeds Rs 25 lakh, and the annual filings are two forms rather than the company set. The tax rates differ as well, so the choice is worth working through on your own numbers." },
      { q: "Is professional tax deducted from salaries at a Noida office?", a: "No. Uttar Pradesh does not levy professional tax, so an employer processing payroll from a Noida office has no professional tax registration, deduction or return for those employees. Provident fund, employees' state insurance and tax deducted at source on salary all apply as usual. An employer with staff in a state that does levy it will have obligations for those states only." },
      { q: "What must be filed in the first year after incorporation?", a: "The first auditor within 30 days, Form INC-20A within 180 days of incorporation, DIR-3 KYC for every director by 30 September, and then the annual accounts in AOC-4 within 30 days of the annual general meeting and the annual return in MGT-7 within 60 days of it. Missing AOC-4 or MGT-7 carries an additional fee of Rs 100 per day per form, with no upper limit." },
    ],
    relatedServices: ["llp-registration", "opc-registration", "udyam-registration", "startup-india-registration"],
    guides: ["company-registration-cost-timeline-documents", "private-limited-vs-llp-vs-opc-vs-proprietorship"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "itr-filing-in-rohini",
    officeSlug: "delhi",
    cityName: "Rohini, Delhi",
    parentService: "itr-filing",
    title: "ITR Filing in Rohini, North-West Delhi",
    h1: "ITR Filing in Rohini, Delhi",
    metaDescription:
      "Income tax returns filed from our Sector 24 office in Rohini: salaried, business, professional and capital gains returns, notices and refunds, north-west Delhi.",
    intro:
      "Income tax returns are prepared and filed from our Delhi office at First Floor, 83-84, Sector 24, Rohini, Delhi 110085, for individuals and businesses across Rohini, Pitampura, Shalimar Bagh, Prashant Vihar and the rest of north-west Delhi. Every return is filed on the Income Tax Department's e-filing portal, and both the processing and the assessment that may follow are centralised rather than handled by a local office.",
    sections: [
      ["h2", "Who needs to file"],
      ["ul", [
        "Anyone whose total income before deductions exceeds the basic exemption limit for the regime that applies to them.",
        "Anyone who wants a refund of tax deducted at source, which cannot be claimed without a return.",
        "A resident holding any asset outside India, or signing authority over a foreign account, regardless of income.",
        "Anyone meeting one of the spending tests that require a return irrespective of income, such as a large deposit in a current account, substantial expenditure on foreign travel, or an electricity bill above the prescribed amount.",
        "Every company and every firm, including an LLP, whether or not it has income.",
        "Anyone carrying forward a business or capital loss, which is only allowed where the return is filed by the original due date.",
      ]],
      ["h2", "Documents we ask for"],
      ["ul", [
        "Form 16 from each employer for the year, and Form 16A for other deducted income.",
        "The annual information statement and Form 26AS from the portal, which we reconcile against your own records before anything is filed.",
        "Bank interest certificates, and the capital gains statement from the broker or registrar for shares and mutual funds.",
        "For property sold: the sale deed, the purchase deed, and proof of improvement costs and transfer expenses.",
        "For business or professional income: the books, bank statements, and the GST returns for the year.",
        "Proof of the deductions being claimed, which we keep on file rather than send with the return.",
      ]],
      ["h2", "Why the Rohini office does not change your assessment jurisdiction"],
      ["p", "This surprises people who expect to deal with a local income tax office. Returns are processed by the Centralised Processing Centre at Bengaluru, wherever they are filed from. Scrutiny assessment, and most appeals at the first level, are conducted under the faceless scheme, which means the officer handling your case is allocated by the system and is not the one whose office is nearest to you. Correspondence arrives in the e-filing account and is answered there. What a nearby office is actually for is the work either side of that: assembling a reply, going through a capital gains computation with the papers on the table, and representation where a hearing is held in person."],
      ["h2", "The dates that matter"],
      ["table", {
        head: ["Return", "Ordinary due date", "Note"],
        rows: [
          ["Individuals and others not subject to audit", "31 July following the financial year", "Carrying a loss forward requires filing by this date"],
          ["Taxpayers subject to audit", "31 October following the financial year", "The tax audit report itself is due a month earlier"],
          ["Taxpayers with a transfer pricing report", "30 November following the financial year", "Form 3CEB is due with it"],
          ["Belated or revised return", "31 December following the financial year", "A belated return carries a late fee and loses the right to carry losses forward"],
          ["Updated return", "Within the period allowed under Section 139(8A)", "Additional tax applies and the period has been extended by recent amendment"],
        ],
      }],
      ["p", "Dates are extended by notification often enough that the table should be read as the ordinary position rather than the final word. The Income-tax Act, 2025 replaced the 1961 Act from 1 April 2026 and renumbers sections and forms; where a reference here is to the 1961 Act we say so, and the current position is confirmed against the portal before anything is filed."],
      ["h2", "North-west Delhi, and what we see here"],
      ["p", "The work from this office reflects the area. Rohini and Pitampura carry a large salaried population working across Delhi and Gurugram, so a great deal of it is salary returns where the question is the choice of regime, house property interest, and reconciling the annual information statement against what the employer actually reported. Netaji Subhash Place and the Rohini commercial sectors bring trading and distribution businesses, where the return follows the GST position and the audit threshold is the live question. A steady part is capital gains on residential property, which north Delhi families hold for long periods: there the computation turns on the cost of acquisition, the indexation position and whether a rollover exemption is available, and getting the papers together matters more than the filing itself."],
      ["h2", "After the return is filed"],
      ["ul", [
        "Verification within the prescribed period, electronically or by sending the signed acknowledgement, failing which the return is treated as never filed.",
        "The intimation under Section 143(1), which may adjust the return. A disagreement with it has its own short window and is dealt with online.",
        "Refunds credited to a pre-validated bank account in your own name; a mismatch in the account details is the common reason a refund fails.",
        "Any notice or communication, which arrives in the e-filing account and should be answered within the time it states.",
      ]],
    ],
    faqs: [
      { q: "Do I have to visit the Rohini office to file my return?", a: "No. Documents can be shared through a secure link and the return is filed on the portal, with the acknowledgement sent back by email. The office at Sector 24, Rohini is there for the occasions when going through papers in person is genuinely more useful, such as a property sale computation or assembling a reply to a notice." },
      { q: "Which income tax office handles my assessment if I live in Rohini?", a: "In practice, none in the usual sense. Returns are processed by the Centralised Processing Centre at Bengaluru, and scrutiny assessment and first-level appeals are conducted under the faceless scheme, so the officer is allocated by the system rather than by your address. Correspondence arrives in the e-filing account. Jurisdiction still exists on paper and can be seen in the portal profile, but it rarely determines who you deal with." },
      { q: "What is the due date for an individual return?", a: "31 July following the end of the financial year, where the taxpayer is not subject to audit. Filing by that date is also what preserves the right to carry a loss forward. A return filed after it, up to 31 December, is a belated return: it carries a late fee under Section 234F and loses the carry-forward. The dates are extended by notification often enough that the position should be confirmed for the year in question." },
      { q: "Old regime or new regime?", a: "It depends on the deductions you actually claim rather than the ones available. The new regime has lower rates and a wider slab structure but allows very few deductions; the old regime is usually better where housing loan interest, a let-out property loss, or substantial Chapter VI-A deductions are in play. The comparison is arithmetic and we run it both ways before filing rather than assuming." },
      { q: "I sold a flat in Rohini. What do you need?", a: "The sale deed and the purchase deed, proof of what was spent on improvement and on the transfer itself, and the TDS certificate where the buyer deducted tax under Section 194-IA. Where an exemption is being claimed by buying another property or by investing in specified bonds, we also need the dates and the amounts, because both exemptions run on strict time limits and the money may need to be parked in a capital gains account scheme before the due date for filing." },
      { q: "Can you handle a notice from an earlier year?", a: "Yes. Notices, intimations and scrutiny assessments are handled from this office, and the reply is filed through the e-filing account. What matters most is the date on the notice: each kind has its own response period, and asking for more time after it has run out is a weaker position than answering within it." },
    ],
    relatedServices: ["income-tax-notice", "capital-gains-tax", "tds-return-filing", "tax-planning"],
    guides: ["how-to-file-itr-online", "itr-due-dates-and-penalties", "old-vs-new-tax-regime"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "gst-registration-in-rohini",
    officeSlug: "delhi",
    cityName: "Rohini, Delhi",
    parentService: "gst-registration",
    title: "GST Registration in Rohini, Delhi",
    h1: "GST Registration in Rohini, Delhi",
    metaDescription:
      "GST registration for businesses in Rohini and north-west Delhi: thresholds, documents, Aadhaar authentication, verification and what follows the certificate.",
    intro:
      "GST registration for a business with its place of business in Rohini is an application for a registration in the State of Delhi, made on the common portal at gst.gov.in and granted under the Central Goods and Services Tax Act, 2017 and the Delhi Goods and Services Tax Act, 2017. We handle it from our office at First Floor, 83-84, Sector 24, Rohini, Delhi 110085.",
    sections: [
      ["h2", "When registration becomes compulsory"],
      ["p", "Two separate tests apply, and the second overrides the first. The turnover test: Delhi is a normal-category state, so the aggregate turnover threshold is Rs 40 lakh for a supplier dealing only in goods and Rs 20 lakh where any service is supplied. Aggregate turnover is computed across all of a person's registrations on the same PAN and across India, not state by state."],
      ["p", "The category test: certain persons must register irrespective of turnover. These include anyone making an inter-state supply of goods, a casual taxable person, a person liable to pay tax under reverse charge, an e-commerce operator and most persons supplying through one, an input service distributor, and a non-resident taxable person. A Rohini trader selling goods to a buyer in Uttar Pradesh is making an inter-state supply and is in this group from the first invoice, whatever the turnover."],
      ["h2", "Documents required"],
      ["ul", [
        "PAN of the business, and PAN and Aadhaar of the proprietor, each partner, or each director.",
        "A photograph and proof of appointment for the authorised signatory, with their Aadhaar linked to an active mobile number for authentication.",
        "Proof of the principal place of business in Delhi: the latest electricity bill or property tax receipt, the rent agreement where rented, and a consent letter where the premises belong to someone else.",
        "The certificate of incorporation or the partnership deed, depending on the constitution.",
        "A cancelled cheque or a bank statement showing the name, account number and IFSC. This may be supplied after registration, within the period allowed.",
        "A description of the goods or services supplied, with the HSN or SAC codes, which decides the rate position later.",
      ]],
      ["h2", "The process and the timelines the department works to"],
      ["ul", [
        "Part A of Form GST REG-01 submitted with the PAN, mobile number and email, which generates a temporary reference number.",
        "Part B submitted with the business details, the place of business, the authorised signatory and the uploaded documents.",
        "Aadhaar authentication of the promoters and the authorised signatory. Completing it is what keeps the application on the shorter track.",
        "Where Aadhaar authentication is completed and no risk flag arises, the officer has seven working days to grant or query. Where it is not completed, or where the application is flagged, physical verification of the premises follows and the period is thirty days.",
        "A query is raised in Form GST REG-03 and must be answered in Form GST REG-04 within seven working days, failing which the application is rejected and has to be made again.",
        "The registration certificate is issued in Form GST REG-06 with the GSTIN, effective from the date of liability where the application was made within thirty days of becoming liable.",
      ]],
      ["p", "These are the department's statutory periods, not a service commitment. The step most within your control is the premises documentation: an incomplete address proof, or a rent agreement that does not match the electricity bill, is the usual reason an application is queried."],
      ["h2", "What Delhi registration means in practice"],
      ["p", "GST is a state-wise registration on a national PAN. A business operating from Rohini and also from a warehouse across the border in Noida needs a Delhi registration and an Uttar Pradesh one, and a transfer of stock between them is a supply that has to be invoiced, even though it is the same legal person. This catches north-west Delhi distributors in particular, because the warehousing is so often on the Uttar Pradesh or Haryana side while the office stays in Rohini. The place from which a supply is actually made decides which registration invoices it, and getting that wrong creates a credit problem for the customer rather than only a compliance one."],
      ["h2", "What follows the certificate"],
      ["ul", [
        "The registration certificate displayed at the principal place of business and at every additional place, and the GSTIN shown on the signboard, which is a requirement rather than a formality.",
        "Invoices issued in the prescribed form, with e-invoicing where the turnover threshold for it is crossed, and e-way bills for consignments above the value limit.",
        "GSTR-1 and GSTR-3B each month, or quarterly under the QRMP scheme with monthly tax payment, and GSTR-9 annually where the turnover requires it.",
        "A Letter of Undertaking filed at the start of each financial year where supplies are zero-rated, before the first such supply of the year.",
        "A nil return still has to be filed. The late fee runs per day per return whether or not there was any activity.",
      ]],
    ],
    faqs: [
      { q: "What is the GST registration threshold for a business in Rohini?", a: "Delhi is a normal-category state, so the aggregate turnover threshold is Rs 40 lakh for a supplier dealing exclusively in goods and Rs 20 lakh where any service is supplied. Aggregate turnover is computed on the PAN across India and across all registrations, not for the Delhi business alone. The threshold is irrelevant where a category test applies, such as making an inter-state supply of goods." },
      { q: "How long does GST registration take?", a: "Where Aadhaar authentication is completed and no risk flag arises, the officer has seven working days to grant the registration or raise a query. Where authentication is not completed, or the application is flagged, physical verification of the premises follows and the period is thirty days. A query in Form GST REG-03 must be answered within seven working days or the application is rejected." },
      { q: "Can I register from a residential address in Rohini?", a: "Yes, where the activity is lawfully carried on there. What the application needs is consistent proof: the latest electricity bill or property tax receipt for the premises, a consent letter from the owner where the premises are not yours, and the rent agreement where rented. Mismatched documents are the most common reason an application is queried and the premises are then verified in person." },
      { q: "I have an office in Rohini and a godown in Noida. Do I need two registrations?", a: "Yes. GST registration is state-wise, so a place of business in Delhi and one in Uttar Pradesh need a registration in each state on the same PAN. A movement of stock between them is a supply between distinct persons and must be invoiced with tax, even though it is the same business. The invoicing has to follow the state from which the supply is actually made." },
      { q: "Should I opt for the composition scheme?", a: "It depends on who you sell to. The composition scheme replaces the ordinary rate with a low rate on turnover and reduces the return burden, but no input tax credit can be taken and none can be passed to the customer. It suits a business selling to consumers. It is usually the wrong choice for one selling to registered businesses, because the customer loses the credit and will price accordingly, and it is not available where any inter-state outward supply is made." },
      { q: "What happens if I register late?", a: "Liability to register arises when the threshold is crossed or a category test is met, and the application should be made within thirty days of that date. Registering within that period means the registration is effective from the date of liability, so credit on inputs held on that date can be claimed. Registering later means the effective date is the date the registration is granted, the earlier credit is lost, and tax remains payable for the intervening period along with interest and penalty." },
      { q: "Do I have to file returns if there was no business in a month?", a: "Yes. A nil GSTR-1 and GSTR-3B still have to be filed, and the late fee runs per day per return whether or not there was any activity. Continuous non-filing leads to the registration being suspended and then cancelled, and revoking a cancellation requires all the pending returns to be filed first, with the late fees." },
    ],
    relatedServices: ["gst-return-filing", "gst-refund", "gst-notice", "gst-cancellation"],
    guides: ["gst-registration-documents-eligibility-process", "gstr-1-vs-gstr-3b", "gst-late-fee-and-interest"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "12a-80g-registration-in-noida",
    officeSlug: "noida",
    cityName: "Noida",
    parentService: "12a-80g-registration",
    title: "12A & 80G Registration in Noida",
    h1: "12A and 80G Registration in Noida",
    metaDescription:
      "Section 12AB and 80G registration for Noida trusts, societies and Section 8 companies: Form 10A and Form 10AB, provisional and regular approval, and renewal.",
    intro:
      "Registration under Section 12AB exempts the income of a charitable or religious institution from tax, and approval under Section 80G lets its donors claim a deduction. Both are applied for on the income tax portal, in Form 10A for a new or provisional registration and Form 10AB for regular registration or renewal, and both are decided by the Commissioner of Income Tax (Exemptions) for the charge in which the institution is situated. We handle these applications for Noida and Greater Noida institutions from our head office at D-23, 3rd Floor, Sector 59, Noida 201309.",
    sections: [
      ["h2", "Who this applies to"],
      ["p", "Any institution in Noida or Greater Noida constituted for a charitable or religious purpose and wanting its income exempted: a public charitable trust registered with the Sub-Registrar in Gautam Buddh Nagar, a society registered under the Societies Registration Act, or a Section 8 company incorporated with the Registrar of Companies for Uttar Pradesh. The registration is on the institution, not the structure, so all three follow the same two applications."],
      ["h2", "Form 10A and Form 10AB: which one"],
      ["table", {
        head: ["Situation", "Form", "What is granted"],
        rows: [
          ["A newly formed institution that has not started activities", "10A", "Provisional registration, valid for three years"],
          ["Converting provisional registration to regular", "10AB", "Regular registration, valid for five years"],
          ["Renewing a regular registration before it expires", "10AB", "A further five years"],
          ["An institution already carrying on activities, applying for the first time", "10AB", "Regular registration, valid for five years"],
          ["80G approval, in each of the same situations", "10A or 10AB, matching the 12AB position", "Provisional or regular approval on the same cycle"],
        ],
      }],
      ["p", "Getting the form wrong is the most common reason an application fails, because the two are not interchangeable and each carries its own time limit. An institution that has already begun its activities cannot take the provisional route, and one holding provisional registration must apply in Form 10AB within the period prescribed after activities commence or before the provisional period expires, whichever is earlier."],
      ["h2", "Documents required"],
      ["ul", [
        "The instrument of creation: the registered trust deed, the memorandum and rules of the society, or the memorandum and articles of the Section 8 company.",
        "The registration certificate from the Sub-Registrar, the Registrar of Societies or the Registrar of Companies, as the case may be.",
        "PAN of the institution, and PAN and Aadhaar of each trustee, member or director.",
        "Audited accounts for up to the last three years where activities have begun, and a note on the activities actually carried on.",
        "Where registration is already held under any other law, or under FCRA, the certificate and its current status.",
        "The digital signature of the person authorised to verify the return, since the application is verified the same way.",
      ]],
      ["h2", "The process"],
      ["ul", [
        "The application filed on the income tax e-filing portal under the statutory forms section, in Form 10A or Form 10AB.",
        "The Commissioner (Exemptions) may call for documents or an explanation to satisfy himself about the genuineness of the activities and the objects. A reply within the time stated is what keeps the application alive.",
        "An order granting registration in Form 10AC for a provisional registration, or Form 10AD for a regular one, with a unique registration number.",
        "A rejection has to be preceded by an opportunity of being heard, and the order can be appealed to the Income Tax Appellate Tribunal.",
      ]],
      ["p", "The statute gives the Commissioner a period within which to pass the order; in practice the time taken depends on whether documents are called for. We do not state a processing date, because it is not ours to give."],
      ["h2", "What the institution must keep doing"],
      ["ul", [
        "File the return of income in Form ITR-7 every year, within the due date. Exemption is not available for a year in which the return is filed late.",
        "Get the accounts audited and file the audit report in Form 10B or Form 10BB, whichever applies, before the return.",
        "File the statement of donations in Form 10BD for donations received where 80G is claimed by the donor, and issue the certificate in Form 10BE to each donor.",
        "Apply for renewal in Form 10AB before the registration expires. Letting it lapse means applying afresh, and the exemption is at risk for the intervening period.",
        "Where foreign contribution is received, register separately under FCRA. Section 12AB and 80G do not permit it.",
      ]],
      ["h2", "The Noida position"],
      ["p", "Uttar Pradesh has no public trusts Act of its own and no charity commissioner, unlike Maharashtra and Gujarat. A public charitable trust in Noida is therefore created by a deed, stamped under the Uttar Pradesh stamp rates and registered with the Sub-Registrar having jurisdiction over Gautam Buddh Nagar, and there is no separate state charity registration to obtain afterwards. That makes the trust route administratively simpler here than in states that do have one, and it means the income tax registrations under 12AB and 80G are the substantive approvals the institution needs."],
    ],
    faqs: [
      { q: "What is the difference between Form 10A and Form 10AB?", a: "Form 10A is for a newly formed institution that has not yet begun its activities, and it leads to provisional registration valid for three years. Form 10AB is for converting that provisional registration to regular, for renewing a regular registration, and for an institution that has already begun activities and is applying for the first time. Regular registration runs for five years. The two are not interchangeable and each has its own time limit." },
      { q: "How long is 12A registration valid?", a: "Provisional registration granted on Form 10A runs for three years. Regular registration granted on Form 10AB runs for five years and then has to be renewed, again in Form 10AB, before it expires. The same cycle applies to 80G approval. Letting a registration lapse means applying afresh and puts the exemption for the intervening period at risk." },
      { q: "Does a Noida trust need to register with a charity commissioner?", a: "No. Uttar Pradesh has no public trusts Act of its own and no charity commissioner, unlike Maharashtra and Gujarat. A public charitable trust in Noida is created by a deed, stamped at the Uttar Pradesh rate and registered with the Sub-Registrar having jurisdiction over Gautam Buddh Nagar. There is no separate state charity registration after that." },
      { q: "Can we apply for 12A and 80G at the same time?", a: "Yes, and it is the usual course. They are separate applications on the same portal and are decided separately, but the documents overlap almost entirely and the cycles are aligned. 80G approval depends on the institution holding registration under 12AB, so the two are filed together rather than one after the other." },
      { q: "What is Form 10BD and who files it?", a: "Form 10BD is the statement of donations, filed by the institution for donations in respect of which the donor claims a deduction under 80G. After filing it, the institution issues a certificate to each donor in Form 10BE. A donor cannot sustain the deduction where the donation was not reported in Form 10BD, so this has become the practical control on 80G claims." },
      { q: "Why are applications rejected?", a: "Most often because the wrong form was used, because the objects in the instrument are not wholly charitable or permit application of income outside the objects, because the activities actually carried on do not match the stated objects, or because a query from the Commissioner was not answered within the time allowed. A rejection must be preceded by an opportunity of being heard and the order can be appealed to the Income Tax Appellate Tribunal." },
    ],
    relatedServices: ["trust-registration", "section-8-company", "fcra-registration", "csr-1-registration"],
    guides: ["section-8-company-ngo-registration-process"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "trust-registration-in-noida",
    officeSlug: "noida",
    cityName: "Noida",
    parentService: "trust-registration",
    title: "Charitable Trust Registration in Noida",
    h1: "Charitable Trust Registration in Noida",
    metaDescription:
      "Registering a public charitable trust in Noida: what the trust deed must contain, and stamping and registration with the Sub-Registrar in Gautam Buddh Nagar.",
    intro:
      "A public charitable trust is created when a settlor transfers property to trustees to hold for a charitable purpose, and it is constituted by a trust deed that is stamped and registered with the Sub-Registrar in whose sub-district the trust property or office lies. For a trust based in Noida that is a Sub-Registrar in Gautam Buddh Nagar. We draft the deed, attend the registration and handle the tax registrations that follow, from our head office at D-23, 3rd Floor, Sector 59, Noida 201309.",
    sections: [
      ["h2", "Trust, society or Section 8 company"],
      ["table", {
        head: ["", "Trust", "Society", "Section 8 company"],
        rows: [
          ["Constituted by", "A trust deed between settlor and trustees", "A memorandum signed by the founding members", "Incorporation under the Companies Act, 2013"],
          ["Registered with", "Sub-Registrar, Gautam Buddh Nagar", "Registrar of Societies, Uttar Pradesh", "Registrar of Companies, Kanpur"],
          ["Governing body", "Trustees, usually appointed for life or by the deed", "A governing council elected by the members", "A board of directors"],
          ["Ongoing compliance", "Lowest: income tax return and audit where applicable", "Moderate: annual list of members and state filings", "Highest: statutory audit, AOC-4, MGT-7, board and general meetings"],
          ["Typically suits", "A family or small charitable project with settled trustees", "A membership-based organisation", "An NGO seeking corporate donors, CSR funds or institutional grants"],
        ],
      }],
      ["p", "The trust is the lightest of the three to run and the least flexible to change, because the deed governs and amending it is awkward. A Section 8 company is the heaviest to run and the one corporate donors and CSR committees are most comfortable with. The choice should be made on who is expected to fund the work, not on which is quickest to register."],
      ["h2", "What the trust deed must contain"],
      ["ul", [
        "The name of the trust, and the names, addresses and photographs of the settlor and each trustee.",
        "The registered address of the trust, with proof of the premises and a no-objection letter from the owner where it is not the settlor's own.",
        "The objects, stated so that they are wholly charitable. Objects that permit application of income outside the charitable purposes are the usual reason a later 12AB application fails.",
        "The initial corpus settled on the trust, which is commonly a nominal sum paid by the settlor at the time of execution.",
        "The powers of the trustees, including investment powers, and the limits on them.",
        "How trustees are appointed, how a vacancy is filled, the quorum for a meeting, and how the deed may be amended.",
        "What happens to the property on dissolution, which must be transfer to another institution with similar objects and never distribution among the trustees.",
      ]],
      ["h2", "Registration with the Sub-Registrar"],
      ["ul", [
        "The deed is engrossed on stamp paper of the value required under the Uttar Pradesh stamp rates for the instrument, which depends on whether immovable property is being settled.",
        "An appointment is taken with the Sub-Registrar having jurisdiction over the address of the trust in Gautam Buddh Nagar.",
        "The settlor, the trustees and two witnesses attend in person with their identity proofs, and biometric and photographic capture is done at the office.",
        "The registration fee is paid and the registered deed is issued, usually the same day once the appointment is reached.",
        "PAN is then applied for in the name of the trust, and a bank account opened in its name, before any tax registration can be applied for.",
      ]],
      ["p", "Attendance in person is the part people underestimate. Every trustee named in the deed has to be present at the Sub-Registrar's office with original identity documents, and assembling them on one date is usually what sets the timetable, not the drafting."],
      ["h2", "Why Noida is simpler than some states"],
      ["p", "Uttar Pradesh has no public trusts legislation of its own and no charity commissioner. A public charitable trust registered in Maharashtra or Gujarat has to be registered with the Charity Commissioner under the state Act and files accounts with that office every year, in addition to anything the income tax law requires. In Uttar Pradesh there is no such second registration and no such annual state filing: the deed is registered under the Registration Act, 1908 with the Sub-Registrar and that is the end of the state-level process. What remains is the income tax side, which is where the substantive approvals are."],
      ["h2", "What follows registration"],
      ["ul", [
        "PAN in the name of the trust, and a bank account operated by the trustees.",
        "Registration under Section 12AB, applied for in Form 10A or Form 10AB depending on whether activities have begun, which is what exempts the trust's income.",
        "Approval under Section 80G, so that donors can claim a deduction, applied for on the same cycle.",
        "Registration under CSR-1 with the Registrar of Companies where the trust intends to receive corporate social responsibility funding.",
        "Registration under FCRA before any foreign contribution is received. Neither 12AB nor 80G permits it.",
        "The annual cycle: books maintained, accounts audited where the limits require it, the audit report in Form 10B or 10BB, the return in ITR-7, and Form 10BD for donations.",
      ]],
    ],
    faqs: [
      { q: "Where is a trust deed registered for a trust based in Noida?", a: "With the Sub-Registrar having jurisdiction over the address of the trust, in Gautam Buddh Nagar district. Registration is under the Registration Act, 1908. Uttar Pradesh has no charity commissioner and no state public trusts Act, so there is no second state registration after the deed is registered." },
      { q: "Does every trustee have to attend the registration?", a: "Yes. The settlor, the trustees named in the deed and two witnesses attend the Sub-Registrar's office in person with original identity proofs, and biometric and photographic capture is done there. Getting everyone to one appointment is usually what determines the timetable rather than the drafting of the deed." },
      { q: "How much stamp duty is payable on a trust deed in Uttar Pradesh?", a: "It depends on the instrument and on whether immovable property is being settled on the trust. A deed settling only a nominal cash corpus attracts the duty prescribed for that class of instrument, which is modest; a deed transferring immovable property is charged on the value of that property. The duty is set by the Uttar Pradesh stamp schedule and should be confirmed for the current rate before the deed is engrossed." },
      { q: "Can a trust be registered without owning property?", a: "Yes. A trust is validly created on the settlement of any property, and in practice a nominal cash corpus settled by the settlor at the time of execution is what most charitable trusts are created with. The trust can acquire property afterwards. What it does need is a registered address, with proof of the premises and a no-objection letter from the owner." },
      { q: "Is the trust's income automatically exempt once the deed is registered?", a: "No. Registration of the deed creates the trust; it does not exempt its income. Exemption comes from registration under Section 12AB with the income tax authorities, applied for in Form 10A or Form 10AB, and the exemption for a year is only available where the return for that year is filed within the due date. Approval under Section 80G, which lets donors claim a deduction, is a separate application again." },
      { q: "Trust or Section 8 company for an NGO in Noida?", a: "A trust is lighter to set up and to run and suits a family or small charitable project with settled trustees. A Section 8 company carries statutory audit, AOC-4, MGT-7 and board and general meeting requirements, but corporate donors and CSR committees are generally more comfortable with it, and institutional grant-makers often ask for it. Decide on who is expected to fund the work." },
      { q: "Can the trust receive foreign donations?", a: "Not without separate registration. Receiving foreign contribution requires registration or prior permission under the Foreign Contribution (Regulation) Act, 2010, which is granted by the Ministry of Home Affairs and has its own eligibility conditions, including a period of existence and a record of activity. Registration under Section 12AB and approval under 80G do not permit foreign contribution." },
    ],
    relatedServices: ["12a-80g-registration", "section-8-company", "fcra-registration", "csr-1-registration"],
    guides: ["section-8-company-ngo-registration-process"],
  },
];

/** The office behind a city-service page, for the address block and the schema. */
export const cityServiceOffice = (p) => office(p.officeSlug);

/** The city page that office belongs to, so each landing page links back to it. */
export const cityServiceCity = (p) => cities.find((c) => c.officeCity === p.officeSlug);

export const getCityService = (slug) => cityServices.find((p) => p.slug === slug);

export const cityServiceReviewed = lastReviewed;
