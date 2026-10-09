# Review needed before launch

Things a partner must confirm, correct or supply. Written during the SEO/GEO upgrade
(branch `seo-geo-upgrade`, October 2026). Each entry says what to check and where.

Sections:

- [Facts to verify](#facts-to-verify)
- [Income-tax Act 2025 updates needed](#income-tax-act-2025-updates-needed)
- [Missing firm data](#missing-firm-data)
- [Partner decisions](#partner-decisions)
- [Engineering notes](#engineering-notes)

---

## Facts to verify

Every legal or regulatory claim written without full certainty, with the page it appears on
and the official source to check it against. Pages state these conservatively
("as prescribed", "the time limit set by the rules") wherever the exact figure was not certain,
so none of the entries below is a stated figure that could be wrong — they are claims a partner
should confirm, and in several cases figures a partner may want to **add** once confirmed.

Items marked **stated** give a specific figure on the page and must be checked.
Items marked *hedged* are deliberately vague on the page; confirming them is an opportunity to
make the page more specific and more useful, not a correction.

### Audit and assurance

| Page | Claim | Check against |
|---|---|---|
| `/services/audit-assurance/bank-audit` | *hedged* — RBI guidelines on appointment of statutory central auditors and statutory auditors: eligibility, rotation, cooling-off and the ceiling on concurrent assignments | [rbi.org.in notifications](https://www.rbi.org.in/Scripts/NotificationUser.aspx) — current circular on appointment of SCAs/SAs |
| `/services/audit-assurance/bank-audit` | *hedged* — LFAR format and its contents are prescribed by the RBI | RBI circular prescribing the current LFAR format |
| `/services/audit-assurance/bank-audit` | *hedged* — branch audits run "usually April and May"; described as practice, not rule | No source needed; confirm it matches the firm's experience |
| `/services/audit-assurance/concurrent-audit` | *hedged* — the RBI framework's coverage expectations, branch selection basis, reporting frequency and rotation | Current RBI circular on concurrent audit in banks |
| `/services/audit-assurance/concurrent-audit` | **stated** — a concurrent auditor cannot also be the statutory auditor of the same bank | RBI guidelines and the ICAI ethical standards on independence |
| `/services/audit-assurance/stock-audit` | Illustrative only — margins of 25% on stock and 40% on book debts, and the drawing power method | Labelled illustrative on the page; these are sanction terms, not statute. No statutory source exists |
| `/services/audit-assurance/internal-audit` | **stated** — Section 138 / Rule 13 thresholds: listed companies; unlisted public with paid-up capital ≥ ₹50 crore, turnover ≥ ₹200 crore, bank/PFI borrowings > ₹100 crore or deposits ≥ ₹25 crore; private with turnover ≥ ₹200 crore or borrowings > ₹100 crore | [Companies (Accounts) Rules, 2014, Rule 13](https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/rules.html) — **highest priority: these are the only hard numbers on that page** |

### GST

| Page | Claim | Check against |
|---|---|---|
| `/services/gst/gst-refund` | **stated** — two-year time limit from the relevant date, and the relevant date definitions per category | [CGST Act s.54](https://cbic-gst.gov.in/cbec-gst-act-rules.html) |
| `/services/gst/gst-refund` | *hedged* — provisional refund for zero-rated supplies described as "the major part of the claim"; the percentage is not stated | CGST Rules, Rule 91 — confirm the current percentage, then consider stating it |
| `/services/gst/gst-refund` | **stated** — interest payable if the refund is not issued within 60 days of a complete application; rate not stated | CGST Act s.56 — confirm the period and the rate |
| `/services/gst/gst-refund` | **stated** — the inverted duty formula works on credit on inputs, so input services and capital goods are excluded | CGST Rules, Rule 89(5) |
| `/services/gst/gst-refund` | *hedged* — acknowledgement and deficiency memo issued "within the period prescribed" | CGST Rules, Rules 90 and 91 — confirm the 15-day period |
| `/services/gst/gst-refund` | **stated** — form numbers RFD-01, RFD-02, RFD-03, RFD-05, RFD-06 and RFD-11 | Current forms on the [GST portal](https://www.gst.gov.in/) |

### Income tax

| Page | Claim | Check against |
|---|---|---|
| `/services/income-tax/tds-return-filing` | **stated** — quarterly return dates 31 July, 31 October, 31 January, 31 May | [incometax.gov.in](https://www.incometax.gov.in/iec/foportal/) |
| `/services/income-tax/tds-return-filing` | **stated** — deposit by the 7th of the following month, and 30 April for March | Income-tax Rules, Rule 30 |
| `/services/income-tax/tds-return-filing` | **stated** — Form 16 by 15 June; Form 16A quarterly | Income-tax Rules, Rule 31 |
| `/services/income-tax/tds-return-filing` | **stated** — s.234E fee of ₹200 per day capped at the tax deducted; s.271H penalty referred to without figures | Sections 234E and 271H — confirm the 271H range before any figure is added |
| `/services/income-tax/income-tax-appeal` | **stated** — CIT(A) 30 days from service; ITAT 60 days from communication; High Court 120 days | Sections 249, 253 and 260A |
| `/services/income-tax/income-tax-appeal` | *hedged* — the class of cases assigned to the Joint Commissioner (Appeals) | Section 246 and the scheme notified for JCIT(A) |
| `/services/income-tax/income-tax-appeal` | *hedged* — stay of demand described as "a specified proportion" with discretion to vary; the 20% figure is **not** stated | Current CBDT instruction / office memorandum on stay of demand. Confirm before adding a figure, as this is administrative practice, not statute |
| `/services/income-tax/income-tax-appeal` | **stated** — a chartered accountant may appear before CIT(A) and ITAT; High Court and Supreme Court proceedings are conducted by advocates | Section 288 and the Advocates Act. Also confirm the sentence that partners appear before the High Courts, which is taken from the existing site |
| `/services/international-tax-fema/15ca-15cb` | **stated** — ₹5 lakh threshold applies to the **aggregate** of chargeable remittances in the financial year, not per remittance | [Income-tax Rules, Rule 37BB](https://incometaxindia.gov.in/pages/rules/income-tax-rules-1962.aspx) |
| `/services/international-tax-fema/15ca-15cb` | **stated** — the Part A/B/C/D descriptions of Form 15CA | Rule 37BB |
| `/services/international-tax-fema/15ca-15cb` | *hedged* — the list of specified payments outside the reporting requirement is described in general terms, with examples; the page does not enumerate it | Rule 37BB(3) and the specified list — confirm the current list before enumerating |
| `/services/international-tax-fema/15ca-15cb` | *hedged* — s.271-I penalty stated as "the amount the section prescribes" | Section 271-I — confirm the ₹1 lakh figure before stating it |
| `/services/international-tax-fema/15ca-15cb` | **stated** — Form 10F is now generally filed electronically by the non-resident | Confirm the current position, including any exemption for non-residents without a PAN |
| `/services/international-tax-fema/transfer-pricing` | **stated** — Form 3CEB due one month before the return date, "which has been 31 October"; return "which has been 30 November" | Confirm for the year in question; both have been extended in several years |
| `/services/international-tax-fema/transfer-pricing` | **stated** — documentation threshold "has been ₹1 crore"; specified domestic transaction threshold "has been ₹20 crore" | Rule 10D and s.92BA. Also confirm **which classes** of transaction remain within SDT after the amendments |
| `/services/international-tax-fema/transfer-pricing` | *hedged* — master file and CbCR thresholds described without figures | Rules 10DA and 10DB — confirm the consolidated revenue and transaction value thresholds, and the CbCR threshold |
| `/services/international-tax-fema/transfer-pricing` | **stated** — s.271BA penalty of ₹1,00,000; s.271AA and s.271G described as percentage-based without the percentage | Confirm the percentage (believed 2%) before stating it |
| `/services/international-tax-fema/transfer-pricing` | *hedged* — safe harbour eligible transactions, margins and period | Current safe harbour notification, Rules 10TA–10TG |

### FEMA

| Page | Claim | Check against |
|---|---|---|
| `/services/international-tax-fema/fema-compliance` | **stated** — FC-GPR within 30 days of **allotment** (not of receipt of funds) | [RBI FEMA](https://www.rbi.org.in/scripts/Fema.aspx) and the FIRMS user manual |
| `/services/international-tax-fema/fema-compliance` | **stated** — FC-TRS within 60 days; the trigger is described as "transfer or receipt or remittance of the consideration, whichever applies" | Confirm the precise trigger, which has been stated differently in different sources |
| `/services/international-tax-fema/fema-compliance` | **stated** — FLA return by 15 July; filed on the RBI survey portal, not FIRMS; nil/unaudited filing then revised | Confirm, including **whether LLPs are within scope** (the page says "limited liability partnership or other specified entity") |
| `/services/international-tax-fema/fema-compliance` | **stated** — annual performance report for overseas investment by 31 December | Overseas Investment Rules and Regulations, 2022 |
| `/services/international-tax-fema/fema-compliance` | *hedged* — ECB monthly return "within the period prescribed after the close of each month" | RBI master direction on external commercial borrowings — confirm the ECB-2 date |
| `/services/international-tax-fema/fema-compliance` | *hedged* — late submission fee described without the computation method or figures | Current RBI framework on the late submission fee, which has been revised more than once |

### Payroll and labour

| Page | Claim | Check against |
|---|---|---|
| `/services/accounting-bookkeeping/payroll` | **stated** — PF deposit and ECR, and ESI contribution, both by the 15th of the following month | [epfindia.gov.in](https://www.epfindia.gov.in/) and [esic.gov.in](https://www.esic.gov.in/) |
| `/services/accounting-bookkeeping/payroll` | *hedged* — PF and ESI wage ceilings and contribution rates are deliberately **not** stated | Confirm current ceilings and rates, then consider adding them |
| `/services/accounting-bookkeeping/payroll` | **stated** — Uttar Pradesh does not levy professional tax | State position; confirm with the UP commercial tax department |
| `/services/accounting-bookkeeping/payroll` | **stated** — Punjab levies the Punjab State Development Tax as a flat monthly amount on persons liable to income tax above a threshold | Punjab State Development Tax Act, 2018. Figure (believed ₹200 per month, income above ₹2.5 lakh) is **not** stated on the page; confirm before adding |
| `/services/accounting-bookkeeping/payroll` | **stated** — Maharashtra levies professional tax on a slab basis with an annual ceiling and a higher deduction in one month, with slabs that "have applied" differently to men and women | Maharashtra professional tax legislation; confirm the current slabs and whether the gender distinction still applies |
| `/services/accounting-bookkeeping/payroll` | *hedged* — gratuity "qualifying period of continuous service" and the formula, without the 5-year figure or the ceiling | Payment of Gratuity Act — confirm before adding figures |
| `/services/accounting-bookkeeping/payroll` | **stated** — the four labour codes were brought into force in **November 2025**, central rules notified during **2026**, state rules still being notified in parts, and the statutory wage definition affects PF and gratuity computation | **Highest priority on this page.** [labour.gov.in](https://labour.gov.in/). This came from secondary sources, not a primary notification. Confirm the commencement date, the central rules date, and the state-by-state position for Uttar Pradesh, Maharashtra and Punjab |

### Business advisory

| Page | Claim | Check against |
|---|---|---|
| `/services/business-advisory/project-report` | *hedged* — CGTMSE guarantee ceiling, PMEGP and Mudra slabs are described without figures | [cgtmse.in](https://www.cgtmse.in/) and [msme.gov.in](https://msme.gov.in/) — confirm current ceilings before adding figures |
| `/services/business-advisory/project-report` | Illustrative only — the DSCR worked example, the working-capital holding periods and the 25% margin | Labelled illustrative; these are lender terms, not statute |

### NGO, trust and not-for-profit

| Page | Claim | Check against |
|---|---|---|
| `/services/ngo-trust/trust-registration` | *hedged* — "within the period the Registration Act allows" for presenting the deed | Registration Act, 1908 — confirm the period (believed 4 months) before stating it |
| `/services/ngo-trust/trust-registration` | **stated** — Maharashtra public trusts are registered with the Charity Commissioner under the Maharashtra Public Trusts Act, 1950, with continuing annual obligations | [charity.maharashtra.gov.in](https://charity.maharashtra.gov.in/) |
| `/services/ngo-trust/trust-registration` | **stated** — Uttar Pradesh, Delhi and Punjab have **no** equivalent public trusts Act, so the deed alone is the registration | **Verify each state individually.** This is a legal claim about three states and is the main risk on this page |
| `/services/ngo-trust/12a-80g-registration` | **stated** — provisional registration runs 3 years; regular registration 5 years, with 80G aligned | [incometax.gov.in](https://www.incometax.gov.in/iec/foportal/) and the Income-tax Rules |
| `/services/ngo-trust/12a-80g-registration` | **stated** — Form 10AB due 6 months before provisional registration expires **or** within 6 months of commencing activities, **whichever is earlier** | **Highest priority on this page**, because the page makes a point of the second limb catching organisations out. Confirm against the current Rules |
| `/services/ngo-trust/12a-80g-registration` | **stated** — Form 10BD by 31 May, then Form 10BE certificates to donors | Income-tax Rules; confirm the Form 10BE issue date |
| `/services/ngo-trust/12a-80g-registration` | *hedged* — the 80G deduction is "a specified proportion" and cash donations above "the prescribed limit" are not deductible | Section 80G — confirm the proportion (commonly 50%) and the cash limit (commonly ₹2,000) before adding figures |
| `/services/ngo-trust/12a-80g-registration` | *hedged* — audit "in the prescribed form where income exceeds the threshold" | Confirm the Form 10B / 10BB thresholds and which form applies |
| `/services/ngo-trust/fcra-registration` | **stated** — registration valid 5 years; renewal at least 6 months before expiry; FC-4 by 31 December including a nil return | [fcraonline.nic.in](https://fcraonline.nic.in/) |
| `/services/ngo-trust/fcra-registration` | **stated** — commonly stated eligibility of 3 years' existence and ₹15 lakh spent on objects over the preceding 3 years, with the Ministry able to relax | Page already says "confirm the current figures". Verify on the FCRA portal |
| `/services/ngo-trust/fcra-registration` | **stated** — all foreign contributions must be received in a designated account at **State Bank of India, New Delhi Main Branch**; a utilisation account may be elsewhere | FCRA as amended in 2020 |
| `/services/ngo-trust/fcra-registration` | **stated** — transfer of foreign contributions to any other person or organisation is prohibited, including to another FCRA holder | Section 7 as amended in 2020 |
| `/services/ngo-trust/fcra-registration` | *hedged* — the administrative expenditure cap is described without the percentage | Confirm the current cap (reduced by the 2020 amendments, believed to 20%) before adding a figure |
| `/services/ngo-trust/fcra-registration` | **stated** — quarterly disclosure of receipts on the organisation's website | Confirm this requirement is still in force |
| `/services/ngo-trust/fcra-registration` | **Open legislative change** — a **Foreign Contribution (Regulation) Amendment Bill, 2026** was reported during 2026. The page states no figure that depends on it and the `dueNote` says further amendments have been under consideration. **Check its status before publishing**, as it may alter registration, renewal or transfer rules |
| `/services/ngo-trust/csr-1-registration` | **stated** — Form CSR-1 under the Companies (CSR Policy) Rules, 2014; prerequisites of 12A, 80G and a track record for entities not established by the funding company; certification by a practising CA, CS or CMA | [mca.gov.in](https://www.mca.gov.in/) and [csr.gov.in](https://www.csr.gov.in/) |
| `/services/ngo-trust/csr-1-registration` | *hedged* — company CSR applicability thresholds and the spending proportion are described without figures | Section 135 — confirm net worth ₹500 crore / turnover ₹1,000 crore / net profit ₹5 crore and the 2% figure before adding them |
| `/services/ngo-trust/csr-1-registration` | *hedged* — Form CSR-2 due date described as "the date prescribed for the financial year" | Confirm the current due date |

### City pages

The local content on each city page turns on the state position, so these are the claims to check.
They are the same facts on every page that mentions them, so correcting one means correcting all.

| Page | Claim | Check against |
|---|---|---|
| `/ca-in-noida`, `/ca-in-meerut` | **stated** — Uttar Pradesh levies **no** professional tax, so payroll from Noida or Meerut carries no PT registration, deduction or return | UP commercial tax department. Repeated on `/services/accounting-bookkeeping/payroll` |
| `/ca-in-delhi` | **stated** — Delhi levies **no** professional tax | Delhi trade and taxes department |
| `/ca-in-ludhiana` | **stated** — Punjab levies the Punjab State Development Tax as the state's professional tax, a flat monthly amount on persons liable to income tax above a threshold | Punjab State Development Tax Act, 2018. The ₹200 figure is **not** stated on the page |
| `/ca-in-mumbai` | **stated** — Maharashtra levies professional tax on a slab basis with an annual ceiling, and there are **two** registrations (employer and own-account) | Maharashtra professional tax legislation. Confirm both registrations and the current slabs |
| `/ca-in-noida`, `/ca-in-meerut` | **stated** — companies registered in Noida, Greater Noida and Meerut file with the Registrar of Companies for **Uttar Pradesh**, not the Delhi and Haryana registry | mca.gov.in — confirm the registry and its location |
| `/ca-in-delhi` | **stated** — the Registrar of Companies for **Delhi and Haryana** covers Delhi, Gurugram and Faridabad | mca.gov.in |
| `/ca-in-ludhiana` | **stated** — companies registered in Punjab file with the Registrar of Companies at **Chandigarh**, which also covers Chandigarh | mca.gov.in |
| `/ca-in-mumbai` | **stated** — the Registrar of Companies for Maharashtra **at Mumbai** | mca.gov.in |
| `/ca-in-mumbai` | **stated** — a public charitable trust in Mumbai is registered with the Charity Commissioner under the Maharashtra Public Trusts Act, 1950, with continuing annual obligations | [charity.maharashtra.gov.in](https://charity.maharashtra.gov.in/). Repeated on `/services/ngo-trust/trust-registration` |
| `/ca-in-noida` | **stated** — supplies to a special economic zone unit or developer are zero-rated; the Noida Special Economic Zone is referred to generally | CGST/IGST Act. Confirm the firm actually serves NSEZ units before leaning on this |
| `/ca-in-ludhiana`, `/ca-in-meerut` | Descriptive — the industry clusters named (hosiery and knitwear, bicycles and parts, auto components, machine tools in Ludhiana; sports goods, sugar and agriculture-linked processing in Meerut) | Not legal claims, but confirm they match the firm's actual client base rather than the city's general reputation |
| `/ca-in-delhi` | **stated** — a Delhi business may need Shops and Establishments registration, a municipal trade licence and labour registrations depending on activity and premises | Delhi labour department and the municipal corporation |

### Not a legal claim, but confirm the framing

| Page | Point |
|---|---|
| `/services/accounting-bookkeeping/virtual-cfo` | The page states that a virtual CFO engagement does **not** constitute appointment to the statutory office of chief financial officer or any key managerial position under the Companies Act, and does not make the adviser a director or officer. Confirm this framing is how the partners want the service positioned, since it is also a liability question |
| `/services/accounting-bookkeeping/virtual-cfo` | The page states that where the firm acts as virtual CFO, the statutory audit of that company is held by another firm. Confirm this is the firm's actual policy |
| `/services/audit-assurance/bank-audit` | RBI Category-I and CAG of India empanelment is stated once, factually, in the intro and once in an FAQ. Confirm both empanelments are current |

---

## Income-tax Act 2025 updates needed

The Income-tax Act, 2025 replaced the Income-tax Act, 1961 from 1 April 2026. It uses
"tax year" in place of previous year / assessment year, and renumbers sections and forms.
New pages use the familiar 1961 references in titles, headings and keywords (because that is
how people still search) and name the 2025 Act's equivalent only where it is certain.

This section lists **existing** pages and articles that cite 1961 sections or forms and should
be reviewed. Per the brief, these are listed only — existing legal content was not rewritten.

### Existing pages and articles that cite 1961 sections or the old terminology

**Listed only — none of this content was rewritten**, as instructed. What each page needs is a
decision on whether to keep the 1961 reference (which is how people still search), add the 2025
Act equivalent alongside it, or add the shared transition note. The 16 new pages already carry
the note where it matters; these are the pages written earlier.

Note that "assessment year" and "previous year" are the terminology the 2025 Act replaces with
"tax year", so a page using those terms needs a decision even where it cites no section number.

| Page | References found | Suggested action |
|---|---|---|
| `/services/audit-assurance/tax-audit` | s.44AB, s.44AD, s.44ADA, s.271B, "assessment year" | Highest priority: the whole page is built on 44AB. Add the transition note and consider naming the 2025 Act equivalent |
| `/services/income-tax/income-tax-notice` | s.139(9), s.143(1), s.142(1), s.148, "assessment year" | Add the transition note; the notice section numbers are what clients quote, so keep them |
| `/services/income-tax/itr-filing` | s.234F, "assessment year" | Add the transition note; "assessment year" appears in the due-date table |
| `/services/audit-assurance/statutory-audit` | s.44AB | Single passing reference; the note is probably enough |
| `/services/business-registration/section-8-company` | s.12A, s.80G | Now that `/services/ngo-trust/12a-80g-registration` exists and carries the note, link to it |
| `/services/international-tax-fema/nri-tax-filing` | "assessment year" | Terminology only |
| `/services/business-registration/udyam-registration` | s.43B | The 43B(h) MSME payment rule; confirm the 2025 Act equivalent |
| `/insights/tax-audit-section-44ab-limits-applicability` | s.44AB, s.44AD, s.44ADA, "assessment year", "previous year" | Highest priority among the articles — the title itself names 44AB |
| `/insights/how-to-reply-income-tax-notice` | s.143(1), s.139(9), s.142(1), s.148, "assessment year" | Add the note |
| `/insights/capital-gains-tax-shares-property-mutual-funds` | s.54, s.54F, s.54E | Exemption sections; confirm the 2025 Act numbering |
| `/insights/itr-due-dates-and-penalties` | s.234F, "assessment year" | Add the note |
| `/insights/nri-income-tax-filing-tds-dtaa-basics` | s.195 | Add the note |
| `/insights/statutory-audit-vs-tax-audit-vs-internal-audit` | s.44AB | Single reference |
| `/insights/how-to-file-itr-online` | "assessment year" | Terminology only |
| `/insights/old-vs-new-tax-regime` | "assessment year" | Terminology only |
| `/insights/tds-rates-and-due-dates-chart` | "Income-tax Act, 1961" | Already names the Act explicitly, which is the clearest form |

The article template already carries a standing footer note ("Section references are to the
Income-tax Act, 1961 unless stated; the Income-tax Act, 2025 applies to later periods with
renumbered sections"), so every article above has partial coverage already. The service pages
written before this round have no equivalent note; adding `ITA_2025_NOTE` to the ones in the table
would be the smallest change that covers them.

### Section mapping gathered during this work

Reported mappings from the 1961 Act to the 2025 Act, collected from secondary sources that agree
with each other (including a mapping document circulated as ICAI material). **None of these is
stated as a section number on any page** — the new pages use the 1961 numbering with the standard
transition note, exactly as the brief requires. Confirm against the official mapping before adding
any 2025 Act number to the site.

| Provision (1961 Act) | Reported equivalent (2025 Act) | Appears on |
|---|---|---|
| s.44AB — tax audit | s.63 | `/services/audit-assurance/tax-audit` (existing page) |
| s.12A / 12AA / 12AB — trust registration | s.332 | `/services/ngo-trust/12a-80g-registration` |
| s.80G — deduction for donations | s.133 | `/services/ngo-trust/12a-80g-registration` |
| ss.92–92F — transfer pricing | ss.161–173 | `/services/international-tax-fema/transfer-pricing` |
| s.92 — arm's length computation | s.161 | as above |
| s.92A — associated enterprise | s.162 | as above |
| s.92B — international transaction | s.163 | as above |
| s.92BA — specified domestic transaction | s.164 | as above |
| s.92C — determination of ALP | s.165 | as above |
| s.92E — accountant's report | s.172 | as above |

Source to check against: the ICAI section-mapping material and the Act as published on
[incometaxindia.gov.in](https://incometaxindia.gov.in/). The transfer pricing page carries its own
tailored version of the transition note naming ss.92–92F; the other income-tax pages carry the
shared note in `ITA_2025_NOTE` (`src/data/content/new-services-2026.js`), which names no new numbers.

### Where the shared transition note appears

`ITA_2025_NOTE` is rendered as a "A note on the Income-tax Act, 2025" section on:
`/services/income-tax/tds-return-filing`, `/services/income-tax/income-tax-appeal`,
`/services/international-tax-fema/15ca-15cb`, `/services/accounting-bookkeeping/payroll` and
`/services/ngo-trust/12a-80g-registration`. The transfer pricing page has its own variant.
Editing the constant updates all of them at once.

---

## Missing firm data

Leave these empty in `src/data/firm.js` / `src/data/cities.js` until confirmed: the UI and the
structured data both hide empty values, so nothing breaks while they are blank.

| What | Where it goes | Notes |
|---|---|---|
| Ludhiana office PIN code | `offices` in `src/data/firm.js` | The profile address ("223, First Floor, Industrial Area-A, Cheema Chowk, Ludhiana") has no PIN. Not invented. |
| Meerut office building number | `offices` in `src/data/firm.js` | Address is only "Opp. Canara Bank, Near Mohiuddinpur Sugar Mill, Meerut - 250205". |
| Office hours | `firm.hours` | Currently empty. Needed before `openingHoursSpecification` can go into the office schema. |
| Map links (5 offices) | `mapUrl` per office | Google Maps share link per office. The "Get directions" link on each city page renders only once this is set. |
| Coordinates (5 offices) | `geo: { lat, lng }` per office | From Google Maps. `geo` goes into the office schema only once set. |
| Branch head — Noida | `branchHead` in `src/data/cities.js` | `team.js` does not say who leads the head office. The Founding Partner was **not** named as Noida head because nothing confirms it. Set the team slug and the branch head card appears automatically. |
| Branch head — Mumbai | `branchHead` in `src/data/cities.js` | Not named anywhere. Not invented. The Mumbai page's FAQ says so explicitly; revise that answer when a head is appointed. |
| Branch head — Meerut | `branchHead` in `src/data/cities.js` | Not named anywhere. Not invented. The Meerut page says engagements are coordinated with the partners. |
| ICAI Firm Registration Number | `firm.icaiFrn` | Currently empty; the footer line renders only when set. |
| LinkedIn company page URL | `firm.social.linkedin` | **Cleared** during this work: `https://www.linkedin.com/company/phmg-associates` did not resolve to a real page. Restore only once the company page exists, or the `sameAs` in the organisation schema points at a 404. |
| Google Business Profile URLs (5) | `firm.social.googleBusiness` + per office | Needed for local SEO. See `docs/off-page-seo.md`. |
| Reviewer per page | `reviewedBy` on services and articles | Left empty deliberately. Set a team slug per page and the visible "Reviewed by" line and the schema `reviewedBy` both appear. |

---

## Partner decisions

| Decision | Current state | Why it needs a decision |
|---|---|---|
| Client list | `firm.showClientList` is `true`, so the client strip with its 16 named clients renders as before. Its heading changed from "Trusted by banks, PSUs and businesses across sectors" to "Banks, PSUs and businesses we have worked with". | Naming clients may fall foul of the ICAI restrictions on advertising and on disclosing client relationships, and the firm may not have each client's consent. Set `showClientList: false` in `src/data/firm.js` to hide the section without deleting the names. |
| "GST Litigation Specialists" | Changed to **"GST Litigation & Advisory"** in `firm.empanelments`, because "Specialists" is a self-description the ICAI rules discourage. | Confirm the replacement wording. Note the other two entries (RBI Category-I, CAG of India) are factual empanelments and were left as they are. |
| Whether consultations are in fact free | All "free consultation" and "free quote" wording is replaced with neutral equivalents ("Book a consultation", "Request a quote"); every button, form and route is unchanged. | If the first consultation genuinely is free, decide whether saying so is acceptable under the current ICAI guidance. The neutral wording is safe either way, which is why it was chosen. |
| Homepage hero wording | "Your Trusted Partner in Financial Success" / "Expert Accounting Solutions for a Stronger Tomorrow" / "a leading Chartered Accountant firm" are replaced with "Chartered Accountants since 2014" / "Audit, Tax and Advisory for Indian Business" / the factual credentials. | This is the most visible copy on the site. Confirm the replacements read the way the partners want before launch. |
| Office hours | `firm.hours` and every office's `hours` are empty, and the "available 24/7" claim was removed because nothing supported it. | Supplying real hours makes the hours line appear on each city page and adds `openingHoursSpecification` to that office's schema, which helps local search. |

---

## Engineering notes

| Note | Detail |
|---|---|
| `public/phmg-main.zip` | A 10.5 MB archive sits in `public/`. Anything in `public/` is served, so a deploy from this working directory would publish it at `/phmg-main.zip`. It is now in `.gitignore` so it stays out of git, but **delete or move it before deploying from this directory.** |
| `check-seo` word measurement | `scripts/check-seo.mjs` counted words inside `<article>`, but on the service template `<article>` closes before the process steps and FAQs, so ~500 visible words per page went uncounted and all 20 published service pages failed the 1,200-word gate. It now counts `<main>` minus the shared CTA band (which marks itself `data-seo-skip`), matching the comment the script always carried. Note the effective floor includes shared chrome (hero, lead form, process, FAQs, related), so 1,200 is a weaker bar than it appears — judge new pages on the `sections` content, not the total. |
| Pre-existing lint errors | `Header.js` had two `react-hooks/set-state-in-effect` errors (`npm run lint` failed on `main` before this work). Both were "close the menu on route change" effects; they now reset during render, which is React's documented pattern for this and removes a cascading render. |
| Redirect status code | Next.js emits **308** for `permanent: true`, not 301. Equivalent for search engines; Next uses 308 to preserve the request method. |
| `next/image` `priority` is deprecated in Next 16 | The hero images used the `priority` prop, which Next 16 deprecated in favour of `preload`. The practical effect was that **no hero image carried `fetchpriority="high"` at all**, so the LCP hint the code appeared to set was not being emitted. Following the Next 16 docs ("in most cases you should use `loading=\"eager\"` or `fetchPriority=\"high\"` instead of `preload`"), the heroes now set `fetchPriority="high"` and `loading="eager"` directly. Verified in the built HTML on every template. |
| Image sources recompressed | `who-we-serve.jpg` 4.75 MB → 196 KB, `banner.png` 1.87 MB → `banner.jpg` 139 KB, `images/stock-audit.png` 1.98 MB → `stock-audit.jpg` 187 KB. 8.7 MB → 522 KB in total, each under the ~400 KB target. The two PNGs were photographs, which is why they were so large; they are JPEG now and the three references in the code were updated. `who-we-serve.jpg` was also capped at 2400px wide (from 4896px) because next/image generates every rendered size from it and the layout never requests more — re-runnable with `node scripts/optimise-images.mjs`. |
| `check-content.mjs --all` is still red, deliberately | The default run gates this round's pages and warns on older ones. `--all` turns the warnings into failures and currently reports ~90 items of pre-existing structural debt on the 20 older service pages: thin `sections` (146–577 words against the 600 target), no question-shaped H2, no official-sources link block, 4 secondary keywords instead of 5–8, and `related` entries pointing at catalog slugs that have no content (`tax-planning`, `gst-annual-return`, `belated-revised-itr`, `trader-tax-filing`, `company-closure`, `capital-gains-tax`, `mergers-acquisitions`, `partnership-firm-registration`). None of this was in scope — the brief said not to rewrite existing content — but it is now measured, so bringing those pages up to the same standard is a well-defined piece of follow-up work. |
| Near-duplicate keywords (pre-existing) | `docs/keyword-map.csv` already pairs "section 8 company registration" (service) with "section 8 company registration process" (article), and "nri tax filing" (service) with "nri income tax in india" (article). Not flagged by the duplicate check and not introduced here, but worth a look when the keyword map is next reviewed. |
