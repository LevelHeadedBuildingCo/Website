import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type AnchorHTMLAttributes, type MouseEvent, type ReactNode,
} from 'react';

/** Tiny dependency-free router. Every page is also pre-rendered to static HTML at build time. */

export function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0] || '/';
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
  return clean;
}

interface RouterState {
  path: string;
  search: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterState>({ path: '/', search: '', navigate: () => {} });

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(initialPath));
  // Query strings are not part of the pre-rendered HTML, so read them after hydration.
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(window.location.search);
    const onPop = () => {
      setPath(normalizePath(window.location.pathname));
      setSearch(window.location.search);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.href);
    const samePage = normalizePath(url.pathname) === normalizePath(window.location.pathname);
    window.history.pushState({}, '', url.pathname + url.search + url.hash);
    setPath(normalizePath(url.pathname));
    setSearch(url.search);
    requestAnimationFrame(() => {
      if (url.hash) {
        document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ block: 'start' });
      } else if (!samePage) {
        window.scrollTo(0, 0);
      }
      if (!samePage) {
        // Move focus to the main region so keyboard and screen-reader users land on the new page.
        const main = document.getElementById('main');
        main?.focus({ preventScroll: true });
      }
    });
  }, []);

  const value = useMemo(() => ({ path, search, navigate }), [path, search, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const external = /^(https?:|mailto:|tel:)/.test(to);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || external || rest.target === '_blank') return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...(external && !to.startsWith('mailto:') && !to.startsWith('tel:') ? { rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}
