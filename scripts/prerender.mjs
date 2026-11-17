// Pre-renders every page to static HTML after `vite build`, then writes sitemap.xml and robots.txt.
// Each route becomes its own HTML file (e.g. /about -> dist/about.html), which Cloudflare Pages
// serves at the clean URL /about. Search engines and social previews get full content and metadata.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, process.env.SSR_OUT_DIR || 'dist-ssr');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const entry = ['entry-server.js', 'entry-server.mjs'].map((f) => path.join(ssrDir, f)).find((f) => fs.existsSync(f));
if (!entry) throw new Error(`SSR bundle not found in ${ssrDir}`);
const { render, allPaths, site } = await import(pathToFileURL(entry).href);

const siteUrl = (process.env.SITE_URL || site.siteUrl || '').replace(/\/$/, '');
if (!siteUrl) {
  console.warn('\n⚠  SITE_URL is not set (and siteUrl is blank in src/content/site.json).');
  console.warn('   Pages will build without canonical URLs, and sitemap.xml will be skipped.');
  console.warn('   Set SITE_URL in Cloudflare Pages → Settings → Environment variables before launch.\n');
}

const analyticsToken = process.env.CF_WEB_ANALYTICS_TOKEN;
const analytics = analyticsToken
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${analyticsToken.replace(/[^a-zA-Z0-9]/g, '')}"}'></script>`
  : '';

function outFile(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, `${route.replace(/^\//, '')}.html`);
}

function page(route) {
  const { html, head } = render(route, siteUrl);
  return template
    .replace('<!--head-->', `${head}\n    ${analytics}`)
    .replace('<!--app-html-->', html);
}

const routes = allPaths();
for (const { path: route } of routes) {
  const file = outFile(route);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route));
  console.log(`  ✓ ${route}`);
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));
console.log('  ✓ 404.html');

const today = new Date().toISOString().slice(0, 10);
if (siteUrl) {
  const urls = routes
    .filter((r) => r.priority > 0.2)
    .map((r) => `  <url><loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
    .join('\n');
  fs.writeFileSync(path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log('  ✓ sitemap.xml');
}

// Block indexing on preview deployments (anything other than the production URL).
const isProduction = !process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_BRANCH === (process.env.PRODUCTION_BRANCH || 'main');
const robots = isProduction
  ? `User-agent: *\nAllow: /\nDisallow: /admin/\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`
  : 'User-agent: *\nDisallow: /\n';
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);
console.log(`  ✓ robots.txt (${isProduction ? 'production' : 'preview: noindex'})`);

if (!process.env.KEEP_SSR) fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`\nPre-rendered ${routes.length + 1} pages.`);
