/**
 * PHMG & Associates — form webhook for Google Sheets.
 *
 * Receives one submission from the website (src/lib/email.js → sendToSheet) and appends it as a
 * row. One tab per form, created with its header row the first time that form is submitted.
 *
 * SETUP
 *   1. Create a Google Sheet. Extensions → Apps Script. Delete the sample code, paste this file.
 *   2. Put a long random string in SECRET below. Generate one with:  openssl rand -hex 24
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as:       Me
 *        Who has access:   Anyone
 *      "Anyone" is required — the website's server calls this with no Google login. The SECRET is
 *      what stops anyone else writing rows.
 *   4. Copy the /exec URL it gives you.
 *   5. In the site's environment (Vercel → Settings → Environment Variables), set:
 *        SHEETS_WEBHOOK_URL   = that /exec URL
 *        SHEETS_WEBHOOK_TOKEN = the same SECRET
 *      Redeploy the site so the new variables are picked up.
 *
 * CHANGING THIS FILE LATER
 *   Apps Script serves the version you deployed, not the version you last saved. After editing,
 *   Deploy → Manage deployments → edit the existing one → Version: New version → Deploy. That
 *   keeps the same /exec URL, so nothing on the website needs changing.
 *
 * ADDING A FIELD
 *   Add it to the matching `columns` list below and redeploy. Existing rows keep their old shape;
 *   the new column is filled from the next submission onwards. Column order here is the column
 *   order in the sheet, so put a new field at the end unless you want to rearrange the tab too.
 */

// Must match SHEETS_WEBHOOK_TOKEN in the website's environment. Never leave this empty: an empty
// secret is rejected below rather than allowed through.
const SECRET = 'PASTE_A_LONG_RANDOM_STRING_HERE';

// `form` is the name the website sends. `columns` are the keys it sends inside `data`, in the
// order they should appear after the Received timestamp.
const FORMS = {
  contact: {
    tab: 'Enquiries',
    columns: ['name', 'phone', 'email', 'service', 'city', 'slot', 'message', 'consent', 'page'],
  },
  careers: {
    tab: 'Applications',
    columns: ['name', 'phone', 'email', 'role', 'location', 'qualification', 'experience', 'cv', 'message', 'consent', 'page'],
  },
  newsletter: {
    tab: 'Newsletter',
    columns: ['email', 'page'],
  },
};

// Friendlier header text than the raw field names.
const HEADINGS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  service: 'Service',
  city: 'City',
  slot: 'Preferred time',
  message: 'Message',
  consent: 'Consent given',
  page: 'Submitted from',
  role: 'Role',
  location: 'Preferred location',
  qualification: 'Qualification',
  experience: 'Experience',
  cv: 'CV link',
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return reply({ ok: false, error: 'no body' });

    const body = JSON.parse(e.postData.contents);

    // Reject before touching the sheet. An unset SECRET fails closed rather than open.
    if (!SECRET || SECRET === 'PASTE_A_LONG_RANDOM_STRING_HERE' || body.token !== SECRET) {
      return reply({ ok: false, error: 'unauthorised' });
    }

    const config = FORMS[body.form];
    if (!config) return reply({ ok: false, error: 'unknown form: ' + body.form });

    const data = body.data || {};
    const row = config.columns.map(function (key) {
      const value = data[key];
      return value === undefined || value === null ? '' : String(value);
    });

    // One lock for the whole script: two submissions landing together must not write to the same
    // row. appendRow is not atomic across concurrent executions without this.
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      sheetFor(config).appendRow([new Date()].concat(row));
    } finally {
      lock.releaseLock();
    }

    return reply({ ok: true });
  } catch (err) {
    // Logged to Apps Script → Executions, so a failure is visible without the website knowing.
    console.error(err);
    return reply({ ok: false, error: String(err) });
  }
}

/** Visiting the /exec URL in a browser should say something useful, not throw. */
function doGet() {
  return reply({ ok: true, message: 'PHMG form webhook is deployed. It accepts POST requests only.' });
}

function sheetFor(config) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(config.tab);
  if (!sheet) sheet = ss.insertSheet(config.tab);

  if (sheet.getLastRow() === 0) {
    const header = ['Received'].concat(config.columns.map(function (key) {
      return HEADINGS[key] || key;
    }));
    sheet.appendRow(header);
    sheet.getRange(1, 1, 1, header.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once from the Apps Script editor (select it, press Run) to check the sheet side works
 * before touching the website. It writes one obvious test row to the Enquiries tab.
 */
function testAppend() {
  const result = doPost({
    postData: {
      contents: JSON.stringify({
        token: SECRET,
        form: 'contact',
        data: {
          name: 'TEST ROW — delete me',
          phone: '+91 96677 22802',
          email: 'test@example.com',
          service: 'Audit & Assurance',
          city: 'Noida',
          message: 'Written by testAppend() in the Apps Script editor.',
          consent: 'on',
          page: 'https://www.phmgindia.com/contact',
        },
      }),
    },
  });
  console.log(result.getContent());
}
