/**
 * The Good Span: membership interest collector
 *
 * Receives sign-ups from the website's membership pop-up and adds one row per
 * submission to the "Interest" tab of the Google Sheet this script is attached to.
 *
 * Setup: see google-apps-script/SETUP.md
 */

// ---- Settings ----
// The Google Sheet that collects sign-ups:
// https://docs.google.com/spreadsheets/d/1-3vRQZfZp53PdXjHOITVTPPE1qRXr1yBOc6u-7c-ah0/edit
const SPREADSHEET_ID = '1-3vRQZfZp53PdXjHOITVTPPE1qRXr1yBOc6u-7c-ah0';
// The tab sign-ups are written to. It is created automatically, with headings, on the first sign-up.
const SHEET_NAME = 'Interest';
// Optional: get an email for every new sign-up. Leave empty ('') to switch off.
const NOTIFY_EMAIL = '';

const HEADERS = ['Date', 'Email', 'Tier', 'Option', 'Consent', 'Page', 'Language'];
const TIERS = ['Self', 'Core', 'Concierge'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Spam trap: real visitors never fill in the hidden "website" field.
  if (p.website) return json({ ok: true });

  const email = String(p.email || '').trim().toLowerCase();
  const tier = String(p.tier || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) return json({ ok: false, error: 'email' });
  if (TIERS.indexOf(tier) === -1) return json({ ok: false, error: 'tier' });

  const row = [
    new Date(),
    email,
    tier,
    clip(p.option, 80),
    p.consent === 'yes' ? 'Yes' : 'No',
    clip(p.page, 200),
    clip(p.language, 20),
  ];

  // Lock so that two sign-ups arriving at the same moment never overwrite each other.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New interest: ' + tier + (row[3] ? ' (' + row[3] + ')' : ''),
      email + ' registered interest in ' + tier + (row[3] ? ', ' + row[3] : '') + '.');
  }
  return json({ ok: true });
}

// Lets you open the web app URL in a browser to check it is live.
function doGet() {
  return ContentService.createTextOutput('The Good Span interest collector is running.');
}

function sheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

function clip(v, n) { return String(v || '').slice(0, n); }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to check the sheet is set up correctly. */
function testSetup() {
  doPost({ parameter: { email: 'test@example.com', tier: 'Core', option: '', consent: 'yes', page: '/test', language: 'en' } });
  Logger.log('Added a test row to the "' + SHEET_NAME + '" tab. Delete it once you have checked it.');
}
