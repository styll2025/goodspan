/**
 * The Good Span: website sign-up collector
 *
 * Receives two kinds of sign-up from the website and adds one row per submission
 * to the Google Sheet below:
 *   - Membership interest (pop-up on Choose Self / Core / Concierge) → "Interest" tab
 *   - Newsletter ("Stay in the loop." band above the footer)          → "Newsletter" tab
 * Each tab is created automatically, with headings, on its first sign-up.
 */

// ---- Settings ----
// The Google Sheet that collects sign-ups:
// https://docs.google.com/spreadsheets/d/1-3vRQZfZp53PdXjHOITVTPPE1qRXr1yBOc6u-7c-ah0/edit
const SPREADSHEET_ID = '1-3vRQZfZp53PdXjHOITVTPPE1qRXr1yBOc6u-7c-ah0';
// Optional: get an email for every new sign-up. Leave empty ('') to switch off.
const NOTIFY_EMAIL = '';

const INTEREST = { name: 'Interest', headers: ['Date', 'Email', 'Tier', 'Option', 'Consent', 'Page', 'Language'] };
const NEWSLETTER = { name: 'Newsletter', headers: ['Date', 'Email', 'Consent', 'Page', 'Language'] };
const TIERS = ['Self', 'Core', 'Concierge'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Spam trap: real visitors never fill in the hidden "website" field.
  if (p.website) return json({ ok: true });

  const email = String(p.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) return json({ ok: false, error: 'email' });
  const consent = p.consent === 'yes' ? 'Yes' : 'No';

  let tab, row, subject;
  if (p.form === 'newsletter') {
    tab = NEWSLETTER;
    row = [new Date(), email, consent, clip(p.page, 200), clip(p.language, 20)];
    subject = 'New newsletter subscriber';
  } else {
    const tier = String(p.tier || '').trim();
    if (TIERS.indexOf(tier) === -1) return json({ ok: false, error: 'tier' });
    const option = clip(p.option, 80);
    tab = INTEREST;
    row = [new Date(), email, tier, option, consent, clip(p.page, 200), clip(p.language, 20)];
    subject = 'New interest: ' + tier + (option ? ' (' + option + ')' : '');
  }

  // Lock so that two sign-ups arriving at the same moment never overwrite each other.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet(tab).appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, subject, email + ': ' + subject + '.');
  return json({ ok: true });
}

// Lets you open the web app URL in a browser to check it is live.
function doGet() {
  return ContentService.createTextOutput('The Good Span sign-up collector is running.');
}

function sheet(tab) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(tab.name);
  if (!sh) {
    sh = ss.insertSheet(tab.name);
    sh.appendRow(tab.headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, tab.headers.length).setFontWeight('bold');
  }
  return sh;
}

function clip(v, n) { return String(v || '').slice(0, n); }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor: adds one test row to each tab. Delete them once checked. */
function testSetup() {
  doPost({ parameter: { email: 'test@example.com', tier: 'Core', option: '', consent: 'yes', page: '/test', language: 'en' } });
  doPost({ parameter: { form: 'newsletter', email: 'test@example.com', consent: 'yes', page: '/test', language: 'en' } });
  Logger.log('Added a test row to the "Interest" and "Newsletter" tabs. Delete them once you have checked them.');
}
