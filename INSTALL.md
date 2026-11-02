# Waitlist add-on: "Interested in practising your Good Span?"

A new section for the **Memberships page**, placed straight after the three membership cards and before **"Human guidance when you need it"**. Its **I'm interested** button opens a short form: the level of support (Self, Core, Concierge or "I'm not sure yet"), an email address and consent, then **Keep me informed when memberships open**. Sign-ups go to your Google Sheet, in a new **Waitlist** tab.

This add-on changes nothing else on the site.

## What's in this folder

| File | Where it goes | What it does |
|---|---|---|
| `section.html` | Paste into `index.html` | The section and its pop-up form |
| `assets/css/waitlist.css` | Copy to `assets/css/` | Its styles (a separate file, so your existing CSS is untouched) |
| `assets/js/waitlist.js` | Copy to `assets/js/` | Opening the form, checks, sending, thank-you |
| `google-apps-script/Code.gs` | Paste into Google Apps Script | Saves sign-ups in the new **Waitlist** tab |

## Option 1: let Cursor install it

Copy this folder into your project (for example as `waitlist-addon/`), then paste this into Cursor:

```
Install the waitlist add-on from the waitlist-addon folder. Do not change anything else on the site.

1. Copy waitlist-addon/assets/css/waitlist.css to assets/css/waitlist.css, and waitlist-addon/assets/js/waitlist.js to assets/js/waitlist.js.
2. In index.html, on the Memberships page, find the section with the three membership cards (Self, Core, Concierge) and the section after it, "Human guidance when you need it". Paste the full contents of waitlist-addon/section.html between those two sections.
3. In the <head> of index.html, directly after the existing link to assets/css/styles.css, add:
   <link rel="stylesheet" href="assets/css/waitlist.css">
4. At the end of index.html, directly after the existing <script src="assets/js/main.js"></script>, add:
   <script src="assets/js/waitlist.js"></script>
5. Delete the waitlist-addon folder.
6. Show me `git status` and the Memberships page, then commit with the message "Memberships: waitlist section" and push.

Do not modify, reformat or "improve" any other file.
```

## Option 2: install it by hand

1. Copy `assets/css/waitlist.css` and `assets/js/waitlist.js` into the same folders in your project.
2. Open `index.html` and find the Memberships page (`<main … id="page-memberships">`). Find the section containing **"Human guidance when you need it"** and place your cursor just before its opening `<section`. Paste the full contents of `section.html` there.
3. In the `<head>`, after `<link rel="stylesheet" href="assets/css/styles.css">`, add:
   ```html
   <link rel="stylesheet" href="assets/css/waitlist.css">
   ```
4. At the end of the file, after `<script src="assets/js/main.js"></script>`, add:
   ```html
   <script src="assets/js/waitlist.js"></script>
   ```
5. Commit and push.

## Update the Google script (do this first)

Without this step, waitlist sign-ups are turned away by the script.

1. In Google Apps Script, replace everything in `Code.gs` with `google-apps-script/Code.gs`, and click **Save**. It still handles membership interest and newsletter sign-ups exactly as before.
2. Run **testSetup** once. You'll get a **Waitlist** tab (columns: Date, Email, Level of support, Consent, Page, Language) with a test row you can delete.
3. **Deploy → Manage deployments** → pencil icon → **Version: New version** → **Deploy**. This keeps your current web app link.

The add-on sends to the same web app as your other forms (it uses `INTEREST_ENDPOINT` from `main.js`), so no URL needs changing.

## Good to know

- **Opening the form from other buttons:** any button or link with `data-wl-open` opens it. Add `data-wl-level="Core"` (or `Self`, `Concierge`) to open it with that level already selected, for example on the Choose Core button.
- **The "January 2027" label** above the title is in `section.html`; delete the `<p class="tgs-wl__tag">…</p>` line to remove it.
- **Spelling:** the title uses British "practising", like the rest of the site.
- **Privacy Policy:** the consent line links to a placeholder (`href="#"`); point it to your Privacy Policy once it's live.
