# Updating the website: content guide

All the words, projects, programs and settings on the site live in **`src/content/`** as simple JSON files. When you change one and save it to GitHub, Cloudflare rebuilds the site. It goes live in about a minute.

There are three ways to edit, from easiest to most technical.

---

## Option A: the visual editor at `/admin` (recommended)

A free, Git-based content manager (Decap CMS) is built in. It gives you forms, image uploads and a Publish button. Every save becomes a commit on GitHub, so you always have a full history.

**One-time setup (about 20 minutes, or ask your developer):**

1. **GitHub OAuth app:** GitHub → Settings → Developer settings → **OAuth Apps → New**.
   - Homepage URL: `https://www.yourdomain.ca`
   - Callback URL: your OAuth proxy URL plus `/callback` (next step)
2. **OAuth proxy on Cloudflare:** Decap needs a tiny helper to log in with GitHub. Deploy the free open-source **`sveltia-cms-auth`** Worker (it works with Decap). Its README has a one-click "Deploy to Cloudflare" button. Add your GitHub Client ID and Secret as the Worker's variables.
3. In **`public/admin/config.yml`**, replace:
   - `repo: REPLACE-GITHUB-USER/level-headed-site` with your repo
   - `base_url: https://REPLACE-OAUTH-WORKER.workers.dev` with your Worker URL
4. Commit, wait for the deploy, and visit `https://www.yourdomain.ca/admin`. Log in with GitHub.

Anyone you add as a collaborator on the GitHub repo can then edit the site.

## Option B: edit directly on GitHub

1. Open your repo on github.com → `src/content/` → click a file (e.g. `workshops.json`).
2. Click the ✏️ pencil, make your change, then **Commit changes**.
3. Cloudflare redeploys automatically.

Be careful with commas and quotes. GitHub flags broken JSON, and if a build fails, the old site stays live. Nothing breaks publicly.

## Option C: on your computer

`npm run dev`, edit the files, and the browser updates instantly. Commit and push when you're happy.

---

## What lives where

| To change… | Edit | Notes |
|---|---|---|
| Email, phone, address, social links | `site.json → contact, social` | **Blank fields are hidden.** Only fill in confirmed details. |
| Announcement bar | `site.json → announcement` | Set `enabled: true` |
| Newsletter signup | `site.json → newsletter` | Turn on only when your inbox or list is ready |
| Website address (SEO) | `site.json → siteUrl` or the `SITE_URL` variable | |
| Privacy/terms "draft" notice | `site.json → legal.reviewed: true` | After legal review |
| Services | `services.json` | `status`: `inquiries` (taking inquiries) or `planned` (in development) |
| Projects / portfolio | `projects.json` | See below |
| Team & founder bio | `team.json` | Bio and photo show only when `bioApproved` / `photoApproved` are `true` |
| Academy programs & topics | `academy.json` | Add `badge` (image path) once the Academy badge is approved |
| Workshop dates | `workshops.json` | Hidden unless `published: true` |
| Job openings | `crew.json → openings` | Only real, approved vacancies |
| Impact numbers | `impact.json` | Shown only when `value` is filled **and** `verified: true` |
| Testimonials | `testimonials.json` | Shown only when `approved: true` (get written permission) |
| Articles | `articles.json` | `body` is Markdown |
| Page titles & search descriptions | `src/routes.tsx` | |
| Founding Circle invitation page | `founding-circle.json` | Private page at `/founding-circle`: not in the menu, not in Google. Edit on GitHub. Set `published: false` to take it offline. |

### Drafts

Projects, workshops, job openings, articles and team members all have **`published`**. When it's `false`, the item stays hidden on the live site. Each file starts with a template entry set to `false` so you can copy it.

To preview drafts before publishing, push to a branch other than `main`. Then, on that preview deployment, set the variable `VITE_SHOW_DRAFTS=true`. Or run `npm run dev`, where drafts always show.

### Adding a project

1. Upload photos to `public/images/uploads/` (the visual editor does this for you). Use JPG or WebP, about 1600px wide, under 500 KB. [Squoosh](https://squoosh.app) shrinks them for free.
2. Copy the template entry in `projects.json` and change `slug` (e.g. `midland-accessible-bathroom`). This becomes `/our-work/midland-accessible-bathroom`.
3. Fill in the title, location, categories, scope, description, challenges, solutions and outcomes. Write a short description of each photo (`coverAlt`) for screen-reader users.
4. Add a testimonial only with the client's written permission, and set `approved: true`.
5. Set `published: true`. The project then appears on Our Work, gets its own page, and is added to the sitemap.

### Replacing photos

The site currently uses illustrative brand imagery cropped from your brand boards (`public/images/brand/`). To swap in real photography:

- **Hero:** replace `public/images/brand/hero-portrait.jpg` and `.webp` with a photo of the same name, in portrait orientation, at least 900 × 1080.
- **Service photos:** set `image` in `services.json` to your new upload, e.g. `/images/uploads/turnover-1.jpg`.
- **Logos:** put the approved vector or high-resolution logo files in `public/brand/` with the same file names. Ask your designer for transparent PNG or SVG versions on dark and light backgrounds.

All people shown in brand photography should be women. Don't present stock or AI-generated images as real Level Headed projects, staff or clients.
