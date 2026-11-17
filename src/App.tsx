import { useEffect } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { applyHead } from './lib/head';
import { resolveRoute } from './routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function Shell() {
  const { path } = useRouter();
  const route = resolveRoute(path);
  useEffect(() => { applyHead(route.meta); }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1}>{route.element}</main>
      <Footer />
    </>
  );
}

export function App({ url }: { url: string }) {
  return (
    <RouterProvider initialPath={url}>
      <Shell />
    </RouterProvider>
  );
}
