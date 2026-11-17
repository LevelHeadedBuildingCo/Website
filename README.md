# Level Headed Building Co. website

The website for Level Headed Building Co., a women-led construction company in Midland, Ontario.

- **Stack:** React 19, Vite, TypeScript, plain CSS design system, Cloudflare Pages and Pages Functions
- **Pages:** Home, About, Construction Services, Our Work (+ project pages), Academy, Join the Crew, Community & Impact, Partners, Resources & Events (+ article pages), Contact, Privacy, Terms, Accessibility, 404
- **Every page is pre-rendered to static HTML** at build time, so it's fast and search-engine friendly. React then takes over for menus, filters and forms.
- **Content lives in `src/content/*.json`.** You can edit it on GitHub or through the visual editor at `/admin`. See **CONTENT-GUIDE.md**.
- **What to do before launch:** see **LAUNCH-CHECKLIST.md**.

---

## 1. Run it on your computer

You need [Node.js 20+](https://nodejs.org).

```bash
npm install
npm run dev          # http://localhost:5173 (drafts are visible in dev)
```

To test the production build **and the form function** locally:

```bash
cp .dev.vars.example .dev.vars   # fill in test keys
npm run preview                  # builds, then serves with Cloudflare's local runtime
```

The `.dev.vars.example` file includes Cloudflare's **test** Turnstile secret, which always passes. Pair it with the test site key `1x00000000000000000000AA` in `.env.local`.

## 2. Put the code on GitHub

1. Create a **private** repository on GitHub (e.g. `level-headed-site`).
2. Upload this folder, or from a terminal:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/level-headed-site.git
   git push -u origin main
   ```

## 3. Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → choose the repo.
2. Build settings:
   | Setting | Value |
   |---|---|
   | Framework preset | None (or Vite) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Production branch | `main` |
3. **Settings → Variables and Secrets** (Production, and Preview if you want forms there too):

   | Name | Type | Value |
   |---|---|---|
   | `SITE_URL` | Text | `https://www.yourdomain.ca` |
   | `VITE_TURNSTILE_SITE_KEY` | Text | Turnstile site key |
   | `TURNSTILE_SECRET_KEY` | **Secret** | Turnstile secret key |
   | `RESEND_API_KEY` | **Secret** | Resend API key |
   | `FORM_FROM_EMAIL` | Text | `Level Headed Website <website@yourdomain.ca>` |
   | `FORM_TO_EMAIL` | Text | inbox that receives submissions |
   | `FORM_TO_EMAIL_CREW` etc. | Text | optional per-form inboxes (`_QUOTE`, `_CONSULTING`, `_CREW`, `_TRAINING`, `_PARTNERSHIP`, `_GENERAL`, `_NEWSLETTER`) |
   | `CF_WEB_ANALYTICS_TOKEN` | Text | optional (see Analytics) |

   Build-time values (`SITE_URL`, `VITE_*`, `CF_WEB_ANALYTICS_TOKEN`) take effect on the **next deploy**. Use **Deployments → Retry deployment** after changing them.
4. **Custom domain:** project → **Custom domains → Set up a domain**.

Every push to `main` deploys automatically. Other branches get their own preview URL, which is marked `noindex`.

## 4. Forms: how they work

All forms post to `functions/api/submit.ts`, a Cloudflare Pages Function. It:

1. checks the hidden honeypot field, required fields and consent,
2. **verifies the Cloudflare Turnstile token on the server**,
3. stores resumes, plans and photos in a **private R2 bucket** if one is bound as `UPLOADS`. Otherwise it attaches them to the email,
4. sends the submission to your inbox through **Resend**, with reply-to set to the sender.

The visitor sees "success" **only after Resend confirms delivery**. If the keys aren't configured, the form tells the visitor it wasn't sent. It never fakes a confirmation.

**Set up Turnstile:** Cloudflare dashboard → **Turnstile → Add widget** → add your domain (and `*.pages.dev` for previews) → copy the site key and secret key.

**Set up Resend:** create an account at resend.com → **Domains → Add domain** → add the DNS records it gives you (easy if your DNS is on Cloudflare) → **API Keys → Create**. Use an address on that verified domain for `FORM_FROM_EMAIL`.

**Private file storage (recommended for resumes):**
1. Cloudflare → **R2 → Create bucket** → `level-headed-uploads` (keep it private: no public access).
2. Pages project → **Settings → Bindings → Add → R2 bucket** → variable name `UPLOADS` → select the bucket → redeploy.
3. Submission emails then list the file location instead of attaching it. Download files from the R2 dashboard. Delete old resumes in line with your privacy policy (24 months in the draft). You can automate this with an R2 lifecycle rule.

Want a different email provider (Postmark, Mailgun, SendGrid)? Only the `fetch('https://api.resend.com/emails', …)` block in `submit.ts` changes.

## 5. Analytics

The simplest option: Pages project → **Metrics → Web Analytics → Enable**. This is cookie-free, so no consent banner is needed. Alternatively, set `CF_WEB_ANALYTICS_TOKEN` and the beacon is added to every page at build time. The Content-Security-Policy in `public/_headers` already allows it.

## 6. SEO

- Unique titles and descriptions for every page are in `src/routes.tsx`. Articles and projects use their own SEO fields.
- `sitemap.xml` and `robots.txt` are generated at build time from `SITE_URL`.
- Structured data: `GeneralContractor` (home) and `Article` (articles). No street address is published until you add one.
- After launch: add the site to **Google Search Console** and **Bing Webmaster Tools**, submit `https://www.yourdomain.ca/sitemap.xml`, and create a **Google Business Profile** (service-area business, with your address hidden if you work from home).

## 7. Project structure

```
functions/api/submit.ts   Form handler (Turnstile + Resend + R2)
public/                   Static files: logos (brand/), photos (images/), _headers, admin/ (CMS)
scripts/prerender.mjs     Pre-renders pages, writes sitemap.xml and robots.txt
src/content/              ← All editable content (JSON)
src/components/           Header, footer, UI kit, icons, forms
src/pages/                One file per page
src/styles/global.css     Design system: colours, type, layout, components
src/routes.tsx            Page list, titles, descriptions, structured data
```

## 8. Design system

| Token | Value | Use |
|---|---|---|
| Navy | `#172437` | anchor colour: header, hero, dark sections |
| Ivory | `#F5EEE2` | open, welcoming sections |
| Copper | `#B8734E` | rules, icons, frames, large type |
| Copper (deep) | `#9C5A37` | buttons and small copper text (passes WCAG AA) |
| Copper (light) | `#D4946E` | copper text on navy (passes WCAG AA) |
| Sage | `#87917B` / light `#DDE1D5` | selective supporting sections |

Type: **Alfa Slab One** (varsity display, used sparingly), **Roboto Slab** (headings), **Inter** (body). All three are loaded from Google Fonts.

Reusable components in `src/components/ui.tsx`: `ButtonLink`, `SectionHead`, `PageHero`, `Pillars`, `StatusBadge`, `PlaceholderPhoto`, `EmptyState`, `CTABand`. Plus `Photo`, `ImpactDashboard` and the form kit in `components/forms/`.

## 9. Notes for developers

- `npm run typecheck` runs TypeScript. The Vite build doesn't type-check, so run this before big changes.
- The router (`src/lib/router.tsx`) is a small dependency-free one. Pages are pre-rendered to `dist/<page>.html`, which Cloudflare serves at clean URLs (`/about`).
- New page: create it in `src/pages/`, add it to `staticRoutes` in `src/routes.tsx`, and link it from `src/components/nav.ts`.
- Tailwind CSS can be added later if you like. The current design system is plain CSS with variables, so it has no build dependency.
