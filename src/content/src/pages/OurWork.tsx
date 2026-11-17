import { useState } from 'react';
import { Link } from '../lib/router';
import { projectCategories, projects } from '../content';
import type { Project, ProjectCategory } from '../content/types';
import { Photo } from '../components/Photo';
import { ButtonLink, CTABand, PageHero, PlaceholderPhoto } from '../components/ui';
import { ArrowRight } from '../components/Icons';

export function OurWork() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const visible = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter));
  const placeholderCats = filter === 'All' ? projectCategories : [filter];

  return (
    <>
      <PageHero eyebrow="Our work" title="Built Carefully. Shown Honestly." crumbs={[{ label: 'Our Work' }]}>
        Every project in this portfolio is real Level Headed work. We’re adding projects as they’re completed, with photos,
        scope and outcomes, and client words only when they’ve approved them.
      </PageHero>

      <section className="section paper" aria-labelledby="portfolio-title">
        <div className="container">
          <h2 id="portfolio-title" className="sr-only">Project Portfolio</h2>
          <div className="filters" role="group" aria-label="Filter projects by category">
            {(['All', ...projectCategories] as const).map((c) => (
              <button key={c} type="button" className="filter-btn" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {visible.length ? `Showing ${visible.length} project${visible.length === 1 ? '' : 's'}` : 'No completed projects in this category yet'}
          </p>

          {visible.length > 0 && (
            <div className="grid grid-3 mb-2">
              {visible.map((p) => (
                <Link to={`/our-work/${p.slug}`} className="project-card" key={p.slug}>
                  <div className="img-wrap"><Photo src={p.coverImage} alt={p.coverAlt} /></div>
                  <h3>{p.title}</h3>
                  <div className="project-meta">{p.projectType} · {p.location}</div>
                </Link>
              ))}
            </div>
          )}

          {visible.length === 0 && (
            <>
              <div className="grid grid-3">
                {placeholderCats.map((c) => <PlaceholderPhoto key={c} label="Coming soon" title={c} />)}
              </div>
              <p className="notice">
                We’re a new company and our first projects are still ahead of us. Rather than fill this page with stock photos,
                we’ll add each project as it’s completed. Have a project you’d like to see here?
              </p>
              <ButtonLink to="/contact?type=quote" arrow>Start a Project</ButtonLink>
            </>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}

export function ProjectDetail({ project: p }: { project: Project }) {
  const t = p.testimonial;
  return (
    <>
      <PageHero eyebrow={p.categories.join(' · ')} title={p.title} crumbs={[{ label: 'Our Work', to: '/our-work' }, { label: p.title }]}>
        {p.projectType} · {p.location}{p.completed ? ` · Completed ${p.completed}` : ''}
      </PageHero>
      <section className="section paper">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="framed"><Photo src={p.coverImage} alt={p.coverAlt} eager /></div>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>The Project</h2>
            {p.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            {p.scope.length > 0 && (<><h3>Scope</h3><ul className="check-list">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul></>)}
          </div>
        </div>
      </section>
      {(p.challenges || p.solutions || p.outcomes) && (
        <section className="section ivory">
          <div className="container grid grid-3">
            {p.challenges && <div className="card"><h3>The Challenge</h3><p>{p.challenges}</p></div>}
            {p.solutions && <div className="card"><h3>Our Solution</h3><p>{p.solutions}</p></div>}
            {p.outcomes && <div className="card"><h3>The Outcome</h3><p>{p.outcomes}</p></div>}
          </div>
        </section>
      )}
      {p.gallery.length > 0 && (
        <section className="section paper" aria-label="Project gallery">
          <div className="container grid grid-3">
            {p.gallery.map((g) => <div className="framed" key={g.src}><Photo src={g.src} alt={g.alt} /></div>)}
          </div>
        </section>
      )}
      {t && t.approved && t.quote && (
        <section className="section blueprint on-dark">
          <div className="container narrow center">
            <p className="quote-block">“{t.quote}”</p>
            <p className="muted">— {t.name}{t.role ? `, ${t.role}` : ''}</p>
          </div>
        </section>
      )}
      <section className="section tight paper">
        <div className="container"><Link to="/our-work" className="text-link">Back to all projects <ArrowRight width={16} height={16} /></Link></div>
      </section>
      <CTABand />
    </>
  );
}
