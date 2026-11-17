# Pre-launch checklist

Everything below needs a decision, a confirmation or a configuration before the site goes public. Nothing on the site currently claims a credential, project, partner, testimonial, statistic, job or event that hasn't been confirmed.

## 🟣 Founding Circle page (`/founding-circle`)
- [ ] Set `FORM_TO_EMAIL_FOUNDING` to the inbox where you want feedback (otherwise it goes to `FORM_TO_EMAIL`)
- [ ] Send yourself a test before sharing the link
- [ ] Remember it's unlisted, not password-protected: anyone with the link can read it. For a password, add Cloudflare Access (Zero Trust → Access → Applications) on `/founding-circle`. It's free for up to 50 people.

## 🔴 Must do before launch

### Brand assets
- [ ] **Approved logo files.** The site uses logos cropped from the brand board, which are low resolution. Supply high-res transparent PNG or SVG files for: main logo on dark (`public/brand/lh-logo-light.png`), main logo on light (`lh-logo-dark.png`), Crew badge (`lh-crew-badge-dark.png`) and the favicon.
- [ ] **Academy badge.** No approved Academy badge was supplied. Add it via `academy.json → badge` and it appears on the Academy page.
- [ ] **Brand colours.** The site uses the colours from the build brief: navy `#172437`, ivory `#F5EEE2`, copper `#B8734E`, sage `#87917B`. The apparel board lists slightly different values (navy `#0E2744`, sage `#C7D0BC`). Confirm which set is final.
- [ ] **Imagery.** All current photos are illustrative AI brand imagery. The footer says so, and the hero is captioned. Replace them with real photography (with signed model releases) when available, then update `site.json → imageryNote`.

### Business details
- [ ] **Domain** purchased and `SITE_URL` set in Cloudflare.
- [ ] **Public email, phone and address** confirmed and entered in `site.json`. They stay hidden until then. Consider a service-area-only listing if you work from home.
- [ ] **Business registration name** confirmed as "Level Headed Building Co."
- [ ] **Founder biography and photo** approved. A draft bio is in `team.json` with `bioApproved: false`. Edit it, then flip it to `true`.
- [ ] **Service statuses** reviewed in `services.json`. Confirm which services you're truly ready to quote, given insurance, WSIB and qualified people. Paid work isn't planned until early 2027, so consider whether "Taking inquiries" or "Opening 2027" reads better.

### Forms (they won't send until these are done)
- [ ] Turnstile widget created; `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` set
- [ ] Resend account created, domain verified; `RESEND_API_KEY`, `FORM_FROM_EMAIL`, `FORM_TO_EMAIL` set
- [ ] R2 bucket created and bound as `UPLOADS` (strongly recommended for resumes)
- [ ] Redeploy, then **send a real test from every form**: quote, consulting, crew (with resume), training, partnership and general
- [ ] Decide who answers each inquiry type, and how quickly. Consider per-type inboxes (`FORM_TO_EMAIL_CREW`, etc.)

### Legal (drafts need review)
- [ ] **Privacy policy** reviewed by a lawyer (PIPEDA): retention periods, R2/US data processing by providers, resume handling
- [ ] **Terms of use** reviewed
- [ ] **Employment/hiring note** on Join the Crew reviewed. If you run women-only hiring or training, confirm it is structured as a special program under s.14 of the Ontario Human Rights Code
- [ ] **Women-only workshops:** confirm the approach with your lawyer (special program / services)
- [ ] Set `site.json → legal.reviewed: true` and `effectiveDate`

## 🟡 Should do at or soon after launch
- [ ] Enable Cloudflare Web Analytics
- [ ] Google Search Console + Bing Webmaster Tools; submit `/sitemap.xml`
- [ ] Google Business Profile (service-area business: Midland, Simcoe County, Georgian Bay, Muskoka)
- [ ] Set up the `/admin` visual editor (CONTENT-GUIDE.md, Option A)
- [ ] Self-host the Google Fonts if you want to remove the third-party font request (small privacy and speed gain)
- [ ] Run a Lighthouse check (Chrome DevTools) on the live site and an accessibility check with a screen reader
- [ ] Add social links to `site.json → social` once accounts exist

## 🟢 When content is real
- [ ] First completed projects → `projects.json` (with client permission for photos and quotes)
- [ ] First workshop dates → `workshops.json` (with a registration link, e.g. Eventbrite or Zeffy)
- [ ] First verified impact figures → `impact.json` (`verified: true`, with an "as of" date)
- [ ] First articles → `articles.json`
- [ ] Turn on the newsletter (`site.json → newsletter.enabled`) once you have a list tool or inbox process
- [ ] Partners: only list organizations with a signed agreement and logo permission

## What's built and tested
- 13 pages + project and article templates + 404, all pre-rendered with unique titles, descriptions, Open Graph tags and canonical URLs
- Responsive layouts checked at 1366px desktop and 390px mobile; no horizontal scrolling
- Keyboard: skip link, focus styles, dropdowns close with Esc, focus moves to the new page on navigation
- Forms tested end to end against the real Pages Function with simulated Turnstile/Resend/R2:
  - rejected without a spam-check token
  - delivered with a valid token, routed to per-type inbox, resume stored in R2
  - shows "not sent" when keys are missing
- Portfolio and resource filters; empty states that say "coming soon", never fake content
- WCAG AA colour contrast for text and buttons
