import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { allPaths, resolveRoute } from './routes';
import { renderHead } from './lib/head';
import { site } from './content';

/** Used by scripts/prerender.mjs at build time. */
export function render(url: string, siteUrl: string) {
  const html = renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>,
  );
  const { meta, status } = resolveRoute(url);
  return { html, head: renderHead(meta, url, siteUrl), status };
}

export { allPaths, site };
