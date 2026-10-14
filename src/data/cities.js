// City landing pages, served at /ca-in-{slug}.
// Build a page ONLY for cities the firm genuinely serves — each of these has an office in
// `offices` in firm.js, referenced by `officeCity`.
//
// Every city needs unique local content: never clone-swap names (doorway-page risk). What makes
// each of these pages different is the actual local position — which state's GST applies, which
// Registrar of Companies, whether the state levies professional tax, and the industries around
// that office. Those differences are real, so the pages do not read alike.
//
// `branchHead` is a team.js slug, and the branch head card renders only when it is set. It is
// deliberately empty for Noida and Meerut: nothing confirms who leads those offices, and
// inventing a name is not an option. Tracked in REVIEW.md.
//
// `geo` and `mapUrl` are deliberately empty. Supplying them makes the coordinates appear in
// that office's schema node and the "Get directions" button appear on the page; until then both
// are simply omitted. They live here rather than on the office in firm.js so that everything
// editable for a city page sits in one file; the office schema reads them back via cityByOffice().

const updatedAt = "2026-10-09"; // TODO: update when a partner re-reviews these pages

export const cities = [
  {
    slug: "noida",
    name: "Noida",
    officeCity: "noida",
    branchHead: "", // TODO: CLIENT TO CONFIRM who leads the head office
    nearby: ["Sector 59", "Sector 62", "Sector 63", "Greater Noida", "Noida Extension", "Ghaziabad"],
    geo: { lat: "", lng: "" }, // TODO: CLIENT TO CONFIRM - coordinates from Google Maps
    mapUrl: "", // TODO: CLIENT TO CONFIRM - Google Maps link; enables the "Get directions" button
    primaryKeyword: "chartered accountant in noida",
    secondaryKeywords: ["ca firm in noida", "ca in sector 62 noida", "chartered accountant greater noida", "gst consultant noida", "company registration noida"],
    updatedAt,
    title: "Chartered Accountant in Noida",
    metaDescription:
      "Chartered accountants at our head office in Sector 59, Noida: audit, income tax, GST, ROC and company registration for Noida and Greater Noida businesses.",
    intro:
      "Our head office is in Sector 59, Noida, and it is where most of our audit, tax and advisory work is coordinated from. Noida and Greater Noida sit in Gautam Buddh Nagar district, in Uttar Pradesh, which decides which GST jurisdiction and which Registrar of Companies your business falls under.",
    local: [
      {
        h: "Who we work with in Noida and Greater Noida",
        p: "The district's business mix is unusual in how sharply it splits. Along the Noida Expressway and in sectors 62, 63 and 125 the work is information technology, software services and business process operations, much of it exporting. Further out, through the Greater Noida and Noida Extension industrial areas, it is electronics assembly, component manufacturing, auto parts and packaging. The two groups need different things from an accountant: the first needs export documentation, employee share plans and investor-ready reporting, the second needs inventory records, working-capital finance and attention to input tax credit on capital goods.",
      },
      {
        h: "Your registrations follow Uttar Pradesh, not Delhi",
        p: "This matters more than most businesses expect when they move across the border. GST is registered state by state, so an office in Noida needs an Uttar Pradesh registration even if the promoters and the customers are in Delhi, and a business supplying from both needs one in each state. Company filings go to the Registrar of Companies for Uttar Pradesh rather than the Delhi registry. One point works in your favour: Uttar Pradesh does not levy professional tax, so salaries processed from a Noida office carry no professional tax deduction, registration or return at all — unlike the same payroll run from a state that levies it, such as Punjab.",
      },
      {
        h: "Export-led units and the Noida Special Economic Zone",
        p: "A substantial amount of the district's output leaves the country, and the GST treatment turns on how it is structured. Supplies to a special economic zone unit or developer are zero-rated, which means either paying IGST and claiming it back or supplying under a Letter of Undertaking and claiming the accumulated input tax credit instead. Software and services exporters face the same choice, with the added requirement of evidencing that payment was received in foreign exchange. Getting the Letter of Undertaking furnished for the financial year before the first export of the year is the step most often left late.",
      },
      {
        h: "Manufacturing, stock and bank finance",
        p: "For the manufacturing side of the district, the recurring issues are working capital and the records behind it. A business funded on a cash-credit limit against stock and book debts has to file stock statements each month, and drawing power is recalculated from them rather than fixed at the sanctioned limit. Where the limit crosses the bank's threshold, a periodic stock audit follows. The businesses that find this straightforward are the ones whose stock records already reconcile to their books and whose debtor ageing is maintained through the year, not assembled when the auditor arrives.",
      },
      {
        h: "Startups and newly incorporated companies",
        p: "Noida and Greater Noida see a steady flow of new incorporations, and the first year has a rhythm that catches founders out: the first auditor appointed within 30 days, the declaration of commencement of business within 180 days, GST registration where the activity requires it, and then the annual cycle of audit, AOC-4 and MGT-7. Where foreign investment comes in, there is a separate and unforgiving timetable under FEMA, with the FC-GPR filing due within 30 days of allotment and the annual FLA return every July thereafter.",
      },
      {
        h: "Working with us from the head office",
        p: "Because this is the head office, it is where most engagements are coordinated and where partner review happens. Most work is handled online, so documents can be shared securely and filing proof comes back by email wherever you are. Where meeting in person helps — at the start of an audit, for a notice hearing, or when going through a project report before it goes to a bank — the Sector 59 office is a short distance from the sector 62 and 63 business areas and reachable from Greater Noida and Ghaziabad.",
      },
    ],
    services: ["itr-filing", "gst-registration", "gst-refund", "private-limited-company-registration", "statutory-audit", "internal-audit", "payroll", "virtual-cfo"],
    faqs: [
      { q: "Where is your Noida office?", a: "Our head office is at D-23, 3rd Floor, Sector 59, Noida 201301. It is the firm's principal office and most engagements are coordinated from there. Sector 59 is close to the sector 62 and 63 business areas and is reachable from Greater Noida, Noida Extension and Ghaziabad." },
      { q: "Do I need an Uttar Pradesh GST registration if my office is in Noida?", a: "Yes, if you make supplies from that office. GST registration is state-specific, so a place of business in Noida needs a registration in Uttar Pradesh regardless of where the promoters live or the customers are. A business that supplies from both Noida and Delhi generally needs a registration in each state, and the invoicing has to follow the place from which the supply is actually made." },
      { q: "Which Registrar of Companies covers Noida?", a: "A company whose registered office is in Noida or Greater Noida falls under the Registrar of Companies for Uttar Pradesh, not the Delhi and Haryana registry. This affects where incorporation documents and annual filings go. It is a common point of confusion for businesses that operate across the national capital region but have their registered office on the Uttar Pradesh side." },
      { q: "Is professional tax deducted from salaries in Noida?", a: "No. Uttar Pradesh does not levy professional tax, so an employer processing payroll from a Noida office has no professional tax registration, deduction or return for those employees. Provident fund, employees' state insurance and tax deducted at source on salary all apply as usual. An employer with staff in Maharashtra or Punjab as well will have professional tax obligations for those states only." },
      { q: "Do you work with businesses in Greater Noida and Ghaziabad?", a: "Yes. Greater Noida, Noida Extension and Ghaziabad are all within the area served from this office, and the Uttar Pradesh position on GST and company filings is the same across them. Ghaziabad falls in a different district but the same state, so the registrations work the same way." },
      { q: "Can I work with you without visiting the office?", a: "Yes. Most filings, audits and advisory work are handled online: documents are shared through a secure link rather than open email, and you receive the filing acknowledgement and proof by email. The office is there for the occasions when meeting in person is genuinely more useful." },
    ],
  },

  {
    slug: "delhi",
    name: "Delhi",
    officeCity: "delhi",
    branchHead: "manish-goel",
    nearby: ["Rohini", "Pitampura", "Shalimar Bagh", "Netaji Subhash Place", "Punjabi Bagh", "North-West Delhi"],
    geo: { lat: "", lng: "" }, // TODO: CLIENT TO CONFIRM - coordinates from Google Maps
    mapUrl: "", // TODO: CLIENT TO CONFIRM - Google Maps link; enables the "Get directions" button
    primaryKeyword: "chartered accountant in delhi",
    secondaryKeywords: ["ca firm in rohini delhi", "ca in pitampura", "chartered accountant north west delhi", "gst consultant delhi", "roc delhi and haryana filing"],
    updatedAt,
    title: "Chartered Accountant in Delhi",
    metaDescription:
      "Chartered accountants at our Rohini office in Delhi, led by CA Manish Goel: income tax, GST, audit, ROC Delhi and Haryana filings and company registration.",
    intro:
      "Our Delhi office is at Sector 24, Rohini, in north-west Delhi, and is led by CA Manish Goel. A business registered in Delhi deals with Delhi GST and the Registrar of Companies for Delhi and Haryana — which is a different position from the same business operating from Noida, a few kilometres away in Uttar Pradesh.",
    local: [
      {
        h: "Rohini and north-west Delhi",
        p: "The area around the office — Rohini, Pitampura, Shalimar Bagh, Netaji Subhash Place and Punjabi Bagh — is largely trading, distribution, small-scale manufacturing and professional practices, with Netaji Subhash Place in particular holding a concentration of offices and commercial establishments. The work that comes from this base is steady rather than exotic: GST returns that have to reconcile month after month, books that will stand up to a notice, proprietorship and partnership structures that at some point need to become companies, and the annual audit and ROC cycle once they do.",
      },
      {
        h: "Delhi or Noida? The answer changes your filings",
        p: "Because the two offices are so close, this comes up constantly, and the answer is not a matter of preference. GST is registered state by state: a place of business in Delhi needs a Delhi registration, one in Noida needs an Uttar Pradesh registration, and a business supplying from both needs both. Company filings follow the registered office, so a Delhi address goes to the Registrar of Companies for Delhi and Haryana while a Noida address goes to the Uttar Pradesh registry. Neither Delhi nor Uttar Pradesh levies professional tax, so payroll is the same on both sides of that particular border. We work from offices in both places, so the question is which registrations your actual places of business require, not which office is nearer.",
      },
      {
        h: "Registrar of Companies, Delhi and Haryana",
        p: "Companies with their registered office in Delhi, and those in Haryana including Gurugram and Faridabad, fall under the same registry. For a group spread across the capital region that is a useful simplification on the Delhi and Haryana side, and a complication on the Uttar Pradesh side, where Noida and Ghaziabad entities file elsewhere. Incorporation, annual filings in AOC-4 and MGT-7, director KYC and any compounding or correspondence all follow the registry of the registered office.",
      },
      {
        h: "Trading and wholesale businesses",
        p: "For the trading and distribution businesses around this office, most difficulty traces back to records rather than to tax positions. Input tax credit depends on what suppliers have actually reported, so credit claimed on the strength of an invoice that never appears in the supplier's return becomes a notice later. Stock records matter both for the annual accounts and for any working-capital limit secured on stock. E-way bill requirements apply to movement of goods above the prescribed value, and the documentation has to match the invoice. A monthly reconciliation routine prevents most of the notices we are later asked to answer.",
      },
      {
        h: "Delhi-specific registrations beyond GST",
        p: "Depending on the activity and the premises, a Delhi business may also need registration under the Delhi Shops and Establishments provisions, a trade licence from the municipal corporation for certain activities, and labour registrations once the headcount crosses the applicable thresholds. These are separate from the central registrations and are decided by the activity and the address rather than by turnover, so they are worth settling when the premises are taken rather than after an inspection.",
      },
      {
        h: "Working with the Delhi office",
        p: "CA Manish Goel leads this office, with a background in information technology audit, bank audit and compliance advisory. Routine work is handled online with documents shared through a secure link, and the Rohini office is used for meetings where being in the room helps — going through an assessment, preparing for a hearing, or working through the opening position of a new engagement.",
      },
    ],
    services: ["itr-filing", "gst-registration", "gst-return-filing", "private-limited-company-registration", "annual-roc-filing", "statutory-audit", "income-tax-notice", "trademark-registration"],
    faqs: [
      { q: "Where is your Delhi office?", a: "At First Floor, 83-84, Sector 24, Rohini, Delhi 110085, in north-west Delhi. It is reachable from Pitampura, Shalimar Bagh, Netaji Subhash Place and Punjabi Bagh. The office is led by CA Manish Goel." },
      { q: "Who leads the Delhi office?", a: "CA Manish Goel heads the Delhi branch. He is a chartered accountant with the DISA qualification, and his work covers information technology audit, bank audit, overseas accounting and compliance advisory." },
      { q: "Which Registrar of Companies covers a company registered in Delhi?", a: "The Registrar of Companies for Delhi and Haryana, which also covers companies registered in Haryana including Gurugram and Faridabad. Incorporation documents, annual filings and any correspondence go to that registry. A company with its registered office in Noida or Ghaziabad instead falls under the Registrar for Uttar Pradesh." },
      { q: "I have offices in Delhi and Noida. Do I need two GST registrations?", a: "Generally yes. GST is registered state by state, and Delhi and Noida are in different states, so if you make supplies from a place of business in each you need a registration in each. Your invoicing then has to follow the place from which the supply is actually made rather than where the head office sits. We can map your locations and confirm what is required." },
      { q: "Is there professional tax in Delhi?", a: "No. Delhi does not levy professional tax, so payroll processed from a Delhi office has no professional tax registration, deduction or return. The same is true of Uttar Pradesh. An employer with staff in Maharashtra or Punjab will have professional tax obligations for those states." },
      { q: "Can I get a consultation without visiting the office?", a: "Yes. The first consultation can be held by phone or video, and documents are shared through a secure link rather than as open email attachments. The Rohini office is available where meeting in person is more useful, such as at the start of an audit or ahead of a hearing." },
    ],
  },

  {
    slug: "ludhiana",
    name: "Ludhiana",
    officeCity: "ludhiana",
    branchHead: "mehtaab-qureshi",
    nearby: ["Cheema Chowk", "Industrial Area-A", "Focal Point", "Gill Road", "Sahnewal", "Doraha"],
    geo: { lat: "", lng: "" }, // TODO: CLIENT TO CONFIRM - coordinates from Google Maps
    mapUrl: "", // TODO: CLIENT TO CONFIRM - Google Maps link; enables the "Get directions" button
    primaryKeyword: "chartered accountant in ludhiana",
    secondaryKeywords: ["ca firm in ludhiana", "stock audit ludhiana", "gst refund for exporters ludhiana", "punjab state development tax", "ca for hosiery manufacturers"],
    updatedAt,
    title: "Chartered Accountant in Ludhiana",
    metaDescription:
      "Chartered accountants in Industrial Area-A, Ludhiana, led by CA Mehtaab Qureshi: audit, GST refunds for exporters, stock audits and Punjab registrations.",
    intro:
      "Our Ludhiana office is at Industrial Area-A, Cheema Chowk, and is led by CA Mehtaab Qureshi. Ludhiana is one of the country's larger concentrations of small and medium manufacturing, and the work here reflects it: stock-backed working capital, export refunds, and the Punjab registrations that go with operating in the state.",
    local: [
      {
        h: "Ludhiana's manufacturing base",
        p: "Four clusters account for much of the city's output: hosiery and knitwear, bicycles and bicycle parts, auto components, and machine tools and light engineering. Most of it is small and medium enterprises, often family-run, frequently supplying larger assemblers or exporting directly. Two features shape the accounting. The first is seasonality — knitwear in particular builds inventory ahead of the winter season and realises it afterwards, so the working-capital position looks very different in August from February. The second is sub-contracting and job work, which has its own GST treatment for goods sent out and returned, and its own documentation.",
      },
      {
        h: "Exporters: the Letter of Undertaking, refunds and realisation",
        p: "A large share of the city's knitwear, bicycle parts and hand tools leaves the country, and the GST question is always the same: export on payment of IGST and claim it back, or export under a Letter of Undertaking and claim the accumulated input tax credit instead. The second route keeps working capital out of the tax system, which matters for a seasonal business, but the undertaking has to be furnished for the financial year before the exports are made, not afterwards. Claims then turn on reconciliation: invoice, shipping bill and return data agreeing, and for services, evidence that payment was received in foreign exchange. Most rejected refunds we see are reconciliation failures rather than questions of entitlement.",
      },
      {
        h: "Working capital secured on stock",
        p: "Manufacturing here runs substantially on cash-credit limits secured against stock and book debts, and that brings a monthly discipline. Stock statements go to the bank each month and drawing power is recalculated from them, so a statement not filed usually means the drawing power is restricted — which for a seasonal business can bite exactly when inventory is at its peak. Where the limit crosses the bank's threshold a periodic stock audit follows, examining physical stock against the statements, the valuation basis, the ageing of both stock and debtors, and whether creditors funding the stock have been deducted. Businesses that keep the records current find the audit straightforward; those that estimate the monthly statement do not.",
      },
      {
        h: "Punjab registrations, including a professional tax",
        p: "Punjab's position differs from Uttar Pradesh's in a way that catches businesses with offices in both. GST is registered in Punjab for a place of business in Ludhiana. Companies registered in Punjab fall under the Registrar of Companies at Chandigarh, which also covers Chandigarh itself. And unlike Uttar Pradesh and Delhi, Punjab does levy a professional tax: the Punjab State Development Tax, charged as a flat monthly amount on persons liable to income tax above the threshold the state Act sets, which means an employer processing payroll from Ludhiana has a monthly deduction and return that the same employer's Noida office does not.",
      },
      {
        h: "Project reports and bank finance",
        p: "Expansion here usually means machinery, and machinery usually means a term loan. What a lender assesses is whether the projected cash flow services the repayment with a margin, tested through the debt service coverage ratio year by year rather than on average, and whether the working capital the extra turnover will absorb has been accounted for. Applications are more often returned for a projection that cannot be reconciled with the GST returns and bank statements the lender can already see than for any doubt about the business itself. Where the proposal is for a micro or small enterprise, the credit guarantee scheme can allow lending without collateral, within its limits.",
      },
      {
        h: "Working with the Ludhiana office",
        p: "CA Mehtaab Qureshi leads this office, working in technology-driven audit, due diligence and income tax. The office is at Cheema Chowk, within reach of Industrial Area-A, Focal Point, Gill Road and the industrial belt towards Sahnewal. Routine compliance is handled online; stock audits, physical verification and the opening stages of a statutory audit are done on site.",
      },
    ],
    services: ["gst-refund", "stock-audit", "project-report", "statutory-audit", "gst-return-filing", "payroll", "tax-audit", "udyam-registration", "opc-registration"],
    faqs: [
      { q: "Where is your Ludhiana office?", a: "At 223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana 141003. It is within reach of Focal Point, Gill Road and the industrial belt towards Sahnewal. The office is led by CA Mehtaab Qureshi." },
      { q: "Who leads the Ludhiana office?", a: "CA Mehtaab Qureshi heads the Ludhiana branch. He is a chartered accountant with a forensic qualification, and his work covers technology-driven audit, due diligence, assurance technology and income tax." },
      { q: "Which Registrar of Companies covers a company registered in Punjab?", a: "The Registrar of Companies at Chandigarh, which covers Punjab and Chandigarh. Incorporation documents and annual filings for a company with its registered office in Ludhiana go there. A group with entities in Punjab and in Uttar Pradesh will be filing with two different registries on the same annual timetable." },
      { q: "Does Punjab have professional tax?", a: "Yes. Punjab levies the Punjab State Development Tax, which functions as the state's professional tax. It is charged as a flat monthly amount on persons liable to pay income tax whose income exceeds the threshold the state Act prescribes, and an employer deducts and pays it for employees in the state. This is a difference from Uttar Pradesh and Delhi, neither of which levies professional tax, so an employer with offices in Ludhiana and Noida has the obligation for the Ludhiana staff only." },
      { q: "Do you carry out stock audits for banks in Ludhiana?", a: "Yes. Stock audits are appointed by the lending bank rather than by the borrower, and the report goes to the bank. The work covers physical verification of stock against the statements submitted, the valuation basis, the ageing of stock and book debts, verification of debtors, and the drawing power the verified position supports after ineligible stock, creditors and the prescribed margin are taken out." },
      { q: "Can you help an exporter claim GST refunds?", a: "Yes, and it is a regular part of the work from this office. It covers furnishing the Letter of Undertaking for the financial year so exports can be made without paying IGST, preparing the refund claim with the statements and reconciliations the category requires, and replying to deficiency memos and show-cause notices. The two-year limit runs from the relevant date for the category, so claims are better started early than close to the limit." },
    ],
  },

  {
    slug: "meerut",
    name: "Meerut",
    officeCity: "meerut",
    branchHead: "", // TODO: CLIENT TO CONFIRM; no branch head is named for Meerut
    nearby: ["Mohiuddinpur", "Partapur", "Delhi Road", "Sports Goods Complex", "Modipuram", "Baghpat Road"],
    geo: { lat: "", lng: "" }, // TODO: CLIENT TO CONFIRM - coordinates from Google Maps
    mapUrl: "", // TODO: CLIENT TO CONFIRM - Google Maps link; enables the "Get directions" button
    primaryKeyword: "ca in meerut",
    secondaryKeywords: ["chartered accountant in meerut", "ca firm meerut", "ca for sports goods exporters", "gst consultant meerut", "sugar mill accounting meerut"],
    updatedAt,
    title: "Chartered Accountant in Meerut",
    metaDescription:
      "Chartered accountants in Meerut: audit, income tax, GST and compliance for sports goods makers, sugar and agriculture-linked businesses, and traders.",
    intro:
      "Our Meerut office is near the Mohiuddinpur sugar mill, opposite Canara Bank. Meerut's economy runs on sports goods, sugar and agriculture-linked processing, and trading, and each of those brings a distinct accounting pattern. Meerut is in Uttar Pradesh, so the GST and company law position is the same as for Noida.",
    local: [
      {
        h: "Sports goods and the export trade",
        p: "Meerut is one of India's long-established sports goods clusters, making cricket equipment, fitness goods and related products, much of it for export. For an exporting manufacturer the recurring questions are the zero-rating route — paying IGST and reclaiming it, or supplying under a Letter of Undertaking and claiming the accumulated credit — and the documentation that supports it: invoice and shipping bill data that reconciles with the GST returns, and evidence of realisation. An Import Export Code is needed before exporting at all. Many units here also work through job workers for stitching and finishing, which has its own treatment for goods sent out and returned.",
      },
      {
        h: "Sugar and agriculture-linked processing",
        p: "The sugar economy around Mohiuddinpur and the wider district shapes the accounting of anyone connected to it, including the traders and transporters who serve it. The dominant feature is seasonality: a crushing season concentrates purchases, production and inventory into part of the year, so working capital peaks sharply and then unwinds. That affects how a bank assesses a limit, because an annual average understates the peak requirement, and it affects stock valuation and the audit, because the year-end position may be nothing like the position during the season. Many agricultural supplies are also exempt or outside GST, which makes the treatment of input tax credit on common costs a live question rather than an academic one.",
      },
      {
        h: "Traders, distributors and transporters",
        p: "A large part of the district's business is distribution: buying, holding and moving goods. For these businesses the issues are practical. Input tax credit depends on suppliers actually reporting their invoices, so credit taken on an invoice that never appears in the supplier's return becomes a demand later. E-way bills are needed for movement above the prescribed value and the documentation has to match the invoice. Stock records serve both the accounts and any working-capital limit secured on stock. Where goods move interstate — and much of this trade does, towards Delhi and beyond — the place of supply determines which tax applies.",
      },
      {
        h: "Uttar Pradesh registrations",
        p: "Meerut businesses register for GST in Uttar Pradesh, and companies with their registered office here file with the Registrar of Companies for Uttar Pradesh rather than the Delhi and Haryana registry, despite Meerut's proximity to Delhi. Uttar Pradesh does not levy professional tax, so payroll carries no professional tax deduction or return — provident fund, employees' state insurance and tax deducted at source on salary apply as usual. Depending on the activity and the premises, shops and establishment registration, a trade licence or a factory licence may also be needed, and for a manufacturing unit those are decided by the activity rather than by turnover.",
      },
      {
        h: "Family businesses and the move to a company",
        p: "A good deal of business in the district is run as a proprietorship or a partnership, often across two or three generations, and at some point the question of incorporating comes up — usually prompted by a bank, a buyer who wants to deal with a company, or the need to bring the next generation in on a defined basis. The decision is worth taking on its own merits: a company brings limited liability, a clearer ownership record and easier access to finance, against annual audit, ROC filings and director obligations that a partnership does not carry. Conversion can be structured to be tax-neutral only if the conditions in the Income-tax Act are met, so the timing and the valuation matter.",
      },
      {
        h: "Working with the Meerut office",
        p: "The office is opposite Canara Bank, near the Mohiuddinpur sugar mill, on the Delhi road side of the city, and is reachable from Partapur, Modipuram and the sports goods manufacturing areas. Most compliance work is handled online with documents shared through a secure link and filing proof returned by email, with site visits for stock verification and the opening stages of an audit.",
      },
    ],
    services: ["gst-return-filing", "gst-refund", "itr-filing", "tax-audit", "stock-audit", "private-limited-company-registration", "project-report", "payroll"],
    faqs: [
      { q: "Where is your Meerut office?", a: "Opposite Canara Bank, near the Mohiuddinpur sugar mill, Meerut 250205. It is on the Delhi road side of the city and reachable from Partapur, Modipuram and the sports goods manufacturing areas. Engagements from this office are coordinated with the partners." },
      { q: "Which Registrar of Companies covers Meerut?", a: "The Registrar of Companies for Uttar Pradesh. Despite Meerut's proximity to Delhi, a company with its registered office here does not file with the Delhi and Haryana registry. Incorporation documents, annual filings in AOC-4 and MGT-7, and any correspondence go to the Uttar Pradesh registry." },
      { q: "Is there professional tax in Uttar Pradesh?", a: "No. Uttar Pradesh does not levy professional tax, so an employer processing payroll from Meerut has no professional tax registration, deduction or return. Provident fund, employees' state insurance and tax deducted at source on salary all apply in the normal way. Only employers with staff in states that levy it, such as Maharashtra or Punjab, have that obligation." },
      { q: "Do you work with sports goods manufacturers and exporters?", a: "Yes. The work typically covers the GST treatment of exports, including furnishing the Letter of Undertaking for the year and claiming refunds of accumulated input tax credit, the Import Export Code, job work documentation where stitching or finishing is sub-contracted, and the audit and tax compliance of the manufacturing entity itself." },
      { q: "Can you handle the seasonal working capital of a sugar-linked business?", a: "Yes, and the seasonality is the main point to get right. A crushing season concentrates purchases and inventory into part of the year, so the peak working-capital requirement is well above the annual average. A limit assessed on average figures leaves the business short at exactly the wrong time, which is why the assessment and the project report need to show the position month by month rather than annually." },
      { q: "Do I need to visit the office?", a: "Not for most work. Returns, audits and advisory work are handled with documents shared through a secure link, and you receive the filing acknowledgement by email. Site visits happen where the work requires them, such as physical verification of stock or the opening stages of a statutory audit." },
    ],
  },
];

export const getCity = (slug) => cities.find((c) => c.slug === slug);
export const cityByOffice = (officeSlug) => cities.find((c) => c.officeCity === officeSlug);
