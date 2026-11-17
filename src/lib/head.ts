import type { PageMeta } from '../routes';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (base: string, p: string) => (/^https?:/.test(p) ? p : `${base.replace(/\/$/, '')}${p}`);
const DEFAULT_IMAGE = '/images/brand/hero-portrait.jpg';

function absolutizeLd(obj: object, base: string): string {
  // Turn root-relative asset paths in structured data into absolute URLs.
  const json = JSON.stringify(obj, (_k, v) => (typeof v === 'string' && /^\/(images|brand)\//.test(v) && base ? abs(base, v) : v));
  return json.replace(/</g, '\\u003c');
}

/** Head tags for the pre-rendered HTML of each page. */
export function renderHead(meta: PageMeta, path: string, siteUrl: string): string {
  const url = siteUrl ? abs(siteUrl, path === '/' ? '/' : path) : path;
  const image = siteUrl ? abs(siteUrl, meta.image || DEFAULT_IMAGE) : meta.image || DEFAULT_IMAGE;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    siteUrl && !meta.noindex ? `<link rel="canonical" href="${esc(url)}" />` : '',
    meta.noindex ? '<meta name="robots" content="noindex" />' : '',
    `<meta property="og:site_name" content="Level Headed Building Co." />`,
    `<meta property="og:type" content="${meta.type || 'website'}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    siteUrl ? `<meta property="og:url" content="${esc(url)}" />` : '',
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(meta.jsonLd || []).map((ld) => `<script type="application/ld+json">${absolutizeLd(ld, siteUrl)}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}

/** Keep the document head in sync during client-side navigation. */
export function applyHead(meta: PageMeta) {
  document.title = meta.title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (canonical) {
    const origin = new URL(canonical.getAttribute('href') || '/', window.location.href).origin;
    canonical.setAttribute('href', origin + window.location.pathname);
  }
}
