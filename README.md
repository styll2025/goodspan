# The Good Span website

The complete website: six pages, all photos, logos and fonts. It is a plain static site (HTML, CSS and a little JavaScript), so it needs no build step, no framework and no server code. Any static host can serve it.

## What's in the folder

```
thegoodspan-website/
├── index.html              Home
├── how-it-works/           How it works
├── memberships/            Memberships
├── evidence/               Evidence
├── about/                  About
├── find-your-good-span/    Find your Good Span
├── assets/
│   ├── css/styles.css      all styling, including the mobile menu and responsive layout
│   ├── js/main.js          legacy address redirects, mobile menu, membership pop-up and newsletter sign-up
│   ├── img/                23 photos + 2 logos (SVG)
│   └── fonts/              BST Bazaine (Thin, Light) and Archivo
├── robots.txt              tells search engines they may index the site
├── sitemap.xml             the six public page addresses
├── google-apps-script/     Code.gs + SETUP.md: collects membership interest and newsletter sign-ups in a Google Sheet
├── .nojekyll               tells GitHub Pages to serve the files exactly as they are
└── README.md
```

Each page is its own address, for example `https://thegoodspan.com/memberships/`. An older link such as `/#/memberships` still opens that page. The plans section is `https://thegoodspan.com/memberships/#plans`.

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

Until payments are live, **Choose Self**, **Choose Core** and **Choose Concierge** open a pop-up that collects the visitor's email and the plan they're interested in, and saves it to a Google Sheet. The one-month Self trial is an option inside the Self pop-up, not a separate card button. Follow `google-apps-script/SETUP.md` to connect it, then paste the web app URL into `INTEREST_ENDPOINT` at the top of the pop-up code in `assets/js/main.js`. Until you do, the pop-up runs in preview mode and sends nothing.

## Newsletter sign-up

Every page has a "Stay in the loop." band above the footer. Sign-ups go to `NEWSLETTER_ENDPOINT` in `assets/js/main.js`, a separate Google web app from membership interest. The web app must be deployed with **Who has access: Anyone**, or the sheet will not receive the addresses.

## Beta notice

A thin orange strip at the top of every page reads "The Good Span launches 1 January 2027. Subscribe to stay updated and be the first to hear when memberships open." and links to the Stay in the loop sign-up. On the legal pages, which have no sign-up band, it links to the homepage sign-up. The membership plans section also has a "Coming soon" notice: no payment is taken yet. When payments go live, remove the `<div class="tgs-beta" …>` block near the top of `index.html` and the `<div class="tgs-plans-notice" …>` block in the plans section.

## Before going live: checklist

These are open items that the website itself can't resolve:

- [ ] **Interest pop-up connected:** `INTEREST_ENDPOINT` is set in `assets/js/main.js` and a test sign-up appears in the sheet.
- [ ] **Font licence.** The BST Bazaine files are **trial versions**. A web licence is needed before the site goes public.
- [ ] **"Book a Good Span Review"** buttons have no destination yet. Search `index.html` for `Book a Good Span Review` and replace `href="#"` with the booking link.
- [x] **Footer legal links.** Terms & Conditions, Privacy Policy and Cookie Policy are published and linked. Community Guidelines is not in the footer.
- [ ] **Photo branding.** Two photos show third-party logos: `boxing.jpg` (Top King shorts) and the shoe-painter photos `sneaker-close2.jpg` and `sneaker-wide.jpg` (Nike trainers, banners). Confirm you have clearance, or swap them.
- [ ] **Assessment link.** "Start Your Free Evaluation" goes to `https://thegoodspan-assessment.pages.dev/`. Update it if the evaluation moves to its own domain.
- [ ] **Cookies and analytics.** The site sets no cookies today. If you add analytics (such as Google Analytics), EU rules require a cookie consent banner.
- [x] **Search engines.** Each page has its own address, title, description and canonical URL. `sitemap.xml` lists them. Old `/#/page` links still redirect.

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
