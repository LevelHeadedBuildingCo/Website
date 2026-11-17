import { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { site } from '../content';
import { navigation } from './nav';
import { Chevron, Close, Menu } from './Icons';

export function Header() {
  const { path } = useRouter();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on navigation
  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false); }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const isActive = (to: string) => path === to || (to !== '/' && path.startsWith(to + '/'));

  return (
    <>
      {site.announcement.enabled && site.announcement.text && (
        <div className="announcement" role="region" aria-label="Announcement">
          {site.announcement.text}{' '}
          {site.announcement.linkUrl && <Link to={site.announcement.linkUrl}>{site.announcement.linkLabel || 'Learn more'}</Link>}
        </div>
      )}
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-link" aria-label="Level Headed Building Co. home">
            <img src="/brand/lh-logo-light.png" alt="Level Headed Building Co." width={112} height={54} />
          </Link>

          <nav className="primary-nav" aria-label="Main" ref={navRef}>
            <ul>
              {navigation.map((item, i) => {
                if (!item.children) {
                  return (
                    <li className="nav-item" key={item.label}>
                      <Link to={item.to!} className="nav-link" aria-current={isActive(item.to!) ? 'page' : undefined}>{item.label}</Link>
                    </li>
                  );
                }
                const groupActive = item.children.some((c) => isActive(c.to));
                const id = `menu-${i}`;
                return (
                  <li className={`nav-item${groupActive ? ' active' : ''}`} key={item.label}>
                    <button
                      type="button" className="nav-link" aria-expanded={openMenu === i} aria-controls={id}
                      onClick={() => setOpenMenu(openMenu === i ? null : i)}
                    >
                      {item.label}<Chevron className="chev" />
                    </button>
                    <ul id={id} className={`dropdown${openMenu === i ? ' open' : ''}`}>
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} aria-current={isActive(c.to) ? 'page' : undefined}>
                            {c.label}{c.blurb && <span>{c.blurb}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <Link to="/contact?type=quote" className="btn btn-primary header-cta">Start a Project</Link>
          </nav>

          <button
            type="button" className="menu-toggle" aria-expanded={mobileOpen} aria-controls="mobile-panel"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <Close /> : <Menu />}<span className="label">{mobileOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>

        <div id="mobile-panel" className={`mobile-panel${mobileOpen ? ' open' : ''}`} aria-label="Mobile">
          <nav aria-label="Mobile main">
            <ul>
              <li className="mobile-group"><Link to="/" aria-current={path === '/' ? 'page' : undefined}>Home</Link></li>
              {navigation.map((item) => (
                <li className="mobile-group" key={item.label}>
                  {item.children ? (
                    <>
                      <div className="mobile-group-title">{item.label}</div>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.to}><Link to={c.to} aria-current={isActive(c.to) ? 'page' : undefined}>{c.label}</Link></li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={item.to!} aria-current={isActive(item.to!) ? 'page' : undefined}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
            <Link to="/contact?type=quote" className="btn btn-primary">Start a Project</Link>
            <Link to="/join-the-crew" className="btn btn-outline" style={{ marginTop: '0.75rem' }}>Join the Crew</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
