# Connect the membership pop-up to a Google Sheet

This takes about 10 minutes. You'll end up with a Google Sheet that gets a new row every time someone registers interest on the website:

| Date | Email | Tier | Option | Consent | Page | Language |
|---|---|---|---|---|---|---|
| 16/10/2026 10:42 | ana@example.com | Self | One-month trial (€25) | Yes | /#/memberships/plans | pt-PT |
| 16/10/2026 11:05 | marta@example.com | Core | | Yes | /#/memberships/plans | en-GB |

## 1. Create the sheet and paste the script

1. Create a new Google Sheet, for example **"The Good Span: membership interest"**. Use the Google account that should own the data.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete everything in the editor, paste in the full contents of `Code.gs`, and click **Save** (the disk icon).
4. Optional: to get an email for every new sign-up, put your address in `NOTIFY_EMAIL` at the top, for example `const NOTIFY_EMAIL = 'hello@thegoodspan.com';`.

## 2. Check it works

1. In the function menu at the top of the editor, choose **testSetup** and click **Run**.
2. Google asks for permission the first time. Click **Review permissions**, choose your account, then **Advanced → Go to (project name) → Allow**. This allows the script to write to *this* sheet (and send the notification email, if you turned that on).
3. Go back to the sheet. There's now an **Interest** tab with headings and one test row. Delete the test row.

## 3. Publish it as a web app

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** and copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy…/exec`.

"Anyone" only means the website can *send* sign-ups to the script. Nobody can read the sheet through it; the sheet stays private to you.

## 4. Paste the URL into the website

**Already done for The Good Span:** `assets/js/main.js` is set to
`https://script.google.com/macros/s/AKfycbzhYXNj7269278GSDccQ7tGHyM-v3_bEnIMnj26jx4cR2T_QmxpqyUrxTZXFKfEj9qR/exec`.
If you ever create a new deployment (which gives a new URL), update it like this:

1. In Cursor, open `assets/js/main.js` and find this line:
   ```js
   var INTEREST_ENDPOINT = '';
   ```
2. Paste your URL between the quotes:
   ```js
   var INTEREST_ENDPOINT = 'https://script.google.com/macros/s/AKfy…/exec';
   ```
3. Save, commit and push. Once the site has updated, submit a test sign-up on the Memberships page and check that it appears in the sheet.

While `INTEREST_ENDPOINT` is empty, the pop-up runs in **preview mode**: every step works, but nothing is sent. That's how it behaves in the shareable preview link.

## If you change the script later

After editing `Code.gs`, go to **Deploy → Manage deployments**, click the pencil icon, set **Version: New version**, then **Deploy**. This keeps the same URL, so the website doesn't need changing.

## Good to know

- **Consent:** the form can't be submitted without the consent tickbox, and every row records "Consent: Yes". When you email these people, include an unsubscribe link, and link the Privacy Policy once it's live (it's still a placeholder in the pop-up).
- **Spam:** the form has a hidden trap field that bots fill in and people don't. Those submissions are silently ignored.
- **Duplicates:** if someone signs up twice, you'll see two rows. In the sheet, **Data → Data cleanup → Remove duplicates** on the Email column tidies this up.
- **When payments go live:** point the Choose Self, Choose Core, Choose Concierge and Try one month buttons to checkout instead. In `index.html`, search for `data-interest` to find them.
