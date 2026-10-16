# The Good Span website

The complete website: six pages, all photos, logos and fonts. It is a plain static site (HTML, CSS and a little JavaScript), so it needs no build step, no framework and no server code. Any static host can serve it.

## What's in the folder

```
thegoodspan-website/
├── index.html              all six pages (Home, How it works, Memberships, Evidence, About, Find your Good Span)
├── assets/
│   ├── css/styles.css      all styling, including the mobile menu and responsive layout
│   ├── js/main.js          page navigation, the mobile menu and the membership interest pop-up
│   ├── img/                23 photos + 2 logos (SVG)
│   └── fonts/              BST Bazaine (Thin, Light) and Archivo
├── google-apps-script/     Code.gs + SETUP.md: collects membership interest in a Google Sheet
├── .nojekyll               tells GitHub Pages to serve the files exactly as they are
└── README.md
```

Each page lives in `index.html` inside its own `<main id="page-...">` block, for example `<main id="page-memberships">`. Links between pages use addresses like `/#/memberships`, so every page can be linked to directly.

## 1. Open and preview it in Cursor

1. Unzip the folder and open it in Cursor (**File → Open Folder**).
2. To preview, open Cursor's terminal (**View → Terminal**) and run:
   ```
   python3 -m http.server 8000
   ```
   Then visit http://localhost:8000 in your browser. Stop the preview with `Ctrl + C`.

## 2. Put it on GitHub

In Cursor's terminal, from inside the folder:

```
git init
git add .
git commit -m "The Good Span website"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/thegoodspan-website.git
git push -u origin main
```

Create the empty repository on github.com first (**New repository**, without a README), then replace `YOUR-ACCOUNT` with your GitHub username or organisation.

## 3. Publish it on thegoodspan.com

**First, check where thegoodspan.com is hosted today.** Pointing the domain at a new host replaces the current site the moment the DNS change takes effect. If the current site is on a platform such as Webflow, Squarespace or WordPress, decide when to switch over before changing anything.

### Option A: GitHub Pages (free, simplest)

1. On GitHub, open the repository → **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
3. In the **Custom domain** box, enter `thegoodspan.com` and save. GitHub adds a `CNAME` file to the repository automatically.
4. At your domain registrar, set these DNS records:
   - Four **A** records for `thegoodspan.com`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A **CNAME** record for `www` pointing to `YOUR-ACCOUNT.github.io`
5. Once GitHub confirms the domain (this can take up to a few hours), tick **Enforce HTTPS**.

### Option B: Netlify, Vercel or Cloudflare Pages

Connect the GitHub repository, leave the build command empty and set the publish directory to the root (`/`). Then add `thegoodspan.com` as a custom domain and follow the host's DNS instructions. After that, every push to `main` publishes automatically.

## Membership interest pop-up

Until payments are live, **Choose Self**, **Try one month for €25**, **Choose Core** and **Choose Concierge** open a pop-up that collects the visitor's email and the plan they're interested in, and saves it to a Google Sheet. Follow `google-apps-script/SETUP.md` to connect it, then paste the web app URL into `INTEREST_ENDPOINT` at the top of the pop-up code in `assets/js/main.js`. Until you do, the pop-up runs in preview mode and sends nothing.

## Before going live: checklist

These are open items that the website itself can't resolve:

- [ ] **Interest pop-up connected:** `INTEREST_ENDPOINT` is set in `assets/js/main.js` and a test sign-up appears in the sheet.
- [ ] **Font licence.** The BST Bazaine files are **trial versions**. A web licence is needed before the site goes public.
- [ ] **"Book a Good Span Review"** buttons have no destination yet. Search `index.html` for `Book a Good Span Review` and replace `href="#"` with the booking link.
- [ ] **Privacy Policy and footer links** (Terms & Conditions, Privacy Policy, Cookie Policy, Community Guidelines) are placeholders. Search for `data-dead` to find them.
- [ ] **Photo branding.** Two photos show third-party logos: `boxing.jpg` (Top King shorts) and the shoe-painter photos `sneaker-close2.jpg` and `sneaker-wide.jpg` (Nike trainers, banners). Confirm you have clearance, or swap them.
- [ ] **Assessment link.** "Find my Good Span" goes to `https://thegoodspan-assessment.pages.dev/`. Update it if the evaluation moves to its own domain.
- [ ] **Cookies and analytics.** The site sets no cookies today. If you add analytics (such as Google Analytics), EU rules require a cookie consent banner.
- [ ] **Search engines.** All six pages live in one file, so search engines see one page. That's fine for launch. If SEO becomes a priority, the pages can later be split into separate files (for example `/memberships/`).

## Photo files

| File | Photo | Used on |
|---|---|---|
| `hero-hd.jpg` | Four members over tea, man mid-gesture | Home (hero) |
| `d-nutrition.jpg`, `step3.jpg`, `boxing.jpg`, `d-mind.jpg`, `d-connection.jpg`, `d-prevention.jpg` | The six dimension tiles (Nutrition, Sleep, Movement, Mind, Connection, Prevention) | Home |
| `step1.jpg` | Woman smiling at her results | Home, How it works, Find your Good Span |
| `step2.jpg` | Woman tasting from a spoon | Home, Find your Good Span |
| `sneaker-close2.jpg` | Shoe painter, close-up | Home (New Position step) |
| `connection.jpg` | The hug in the kitchen | Home (Connection) |
| `talk-hd.jpg` | Meet-up: man laughing, talking | How it works (hero) |
| `welcome-hd.jpg`, `pilot-hd.jpg` | Meet-up: welcome greeting, Pilot explaining | How it works |
| `sneaker-wide.jpg` | Shoe painter at his worktable | How it works (New Position) |
| `laugh-hd.jpg` | Meet-up: group laughing over tea | Memberships, Find your Good Span |
| `umbrella-hd.jpg`, `rooftop.jpg` | Group under a parasol; rooftop terrace | Memberships, About |
| `evidence.jpg` | Spice tin | Evidence (hero) |
| `joel.jpg`, `paint.jpg` | Joël's portrait; painter's hand | About |
| `greens.jpg`, `pegs.jpg` | Woman with greens; washing-line portrait | Find your Good Span |

To swap a photo, replace the file with one of the **same name**, or update the `src` in `index.html`. Keep photos at roughly the same size (1350–2600px wide) so they stay sharp.
