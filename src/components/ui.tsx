import type { ReactNode } from 'react';
import { Link } from '../lib/router';
import { ArrowRight, CornerLines, House } from './Icons';

export function ButtonLink({ to, children, variant = 'primary', arrow, className = '' }: {
  to: string; children: ReactNode; variant?: 'primary' | 'navy' | 'outline'; arrow?: boolean; className?: string;
}) {
  return (
    <Link to={to} className={`btn btn-${variant} ${className}`}>
      {children}
      {arrow && <ArrowRight className="arrow" width={18} height={18} />}
    </Link>
  );
}

export function SectionHead({ eyebrow, title, children, center, id }: {
  eyebrow?: string; title: ReactNode; children?: ReactNode; center?: boolean; id?: string;
}) {
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {children && <div className="lede">{children}</div>}
    </div>
  );
}

export function Pillars({ className = '' }: { className?: string }) {
  return (
    <ul className={`pillars ${className}`} aria-label="Our four pillars">
      <li>Build</li><li>Train</li><li>Empower</li><li>Develop</li>
    </ul>
  );
}

export interface Crumb { label: string; to?: string }

export function PageHero({ eyebrow, title, children, aside, crumbs }: {
  eyebrow?: string; title: ReactNode; children?: ReactNode; aside?: ReactNode; crumbs?: Crumb[];
}) {
  return (
    <section className="page-hero blueprint on-dark">
      <div className="container">
        {crumbs && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={i}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        <div className="page-hero-grid">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {children && <div className="lede">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
      <CornerLines className="corner-lines" />
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    inquiries: 'Taking inquiries',
    planned: 'In development',
    open: 'Registration open',
    waitlist: 'Waitlist',
    full: 'Full',
    closed: 'Registration closed',
    interest: 'Register interest',
  };
  return <span className={`status ${status}`}>{labels[status] ?? status}</span>;
}

/** Elegant stand-in used wherever real project photography has not been supplied yet. */
export function PlaceholderPhoto({ label = 'Project photography', title, ratio }: { label?: string; title: string; ratio?: string }) {
  return (
    <div className="placeholder-photo blueprint" style={ratio ? { aspectRatio: ratio } : undefined} role="img" aria-label={`${title}: photograph coming soon`}>
      <CornerLines className="lines" preserveAspectRatio="xMidYMid slice" />
      <div>
        <div className="ph-label">{label}</div>
        <div className="ph-title">{title}</div>
      </div>
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}

export function CTABand({ title = "Let’s Build Something Different.", children }: { title?: string; children?: ReactNode }) {
  return (
    <section className="section blueprint cta-band on-dark" aria-labelledby="cta-band-title">
      <div className="container">
        <div className="rule-ornament"><House /></div>
        <h2 id="cta-band-title">{title}</h2>
        <p>{children ?? 'Whether you have a project to plan or a career to build, we’d like to hear from you.'}</p>
        <div className="btn-row">
          <ButtonLink to="/contact?type=quote" arrow>Start a Project</ButtonLink>
          <ButtonLink to="/join-the-crew" variant="outline">Join the Crew</ButtonLink>
        </div>
      </div>
    </section>
  );
}
