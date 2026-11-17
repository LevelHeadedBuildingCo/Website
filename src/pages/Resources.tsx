import { useState } from 'react';
import { marked } from 'marked';
import { Link } from '../lib/router';
import { articleCategories, articles, site, workshops } from '../content';
import type { Article } from '../content/types';
import { Photo } from '../components/Photo';
import { ButtonLink, CTABand, EmptyState, PageHero, SectionHead } from '../components/ui';
import { NewsletterForm } from '../components/forms/Forms';
import { ArrowRight } from '../components/Icons';

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

function ArticleCard({ a }: { a: Article }) {
  return (
    <Link to={`/resources/${a.slug}`} className="project-card">
      <div className="img-wrap"><Photo src={a.featuredImage} alt={a.featuredImageAlt} /></div>
      <p className="eyebrow" style={{ margin: '1rem 0 0.25rem', fontSize: '0.7rem' }}>{a.category}</p>
      <h3 style={{ marginTop: 0 }}>{a.title}</h3>
      <p className="small muted">{a.excerpt}</p>
    </Link>
  );
}

export function Resources() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? articles : articles.filter((a) => a.category === cat);
  return (
    <>
      <PageHero eyebrow="Resources & events" title="Practical Know-How, from People Who Build." crumbs={[{ label: 'Resources & Events' }]}>
        Home maintenance guidance, construction advice, career resources for women in the trades, and news from the crew.
      </PageHero>

      <section className="section paper" aria-labelledby="articles-title">
        <div className="container">
          <h2 id="articles-title" className="sr-only">Articles</h2>
          <div className="filters" role="group" aria-label="Filter resources by topic">
            {['All', ...articleCategories].map((c) => (
              <button key={c} type="button" className="filter-btn" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          {list.length > 0 ? (
            <div className="grid grid-3">{list.map((a) => <ArticleCard a={a} key={a.slug} />)}</div>
          ) : (
            <EmptyState title={cat === 'All' ? 'Our first articles are on the way' : `Nothing in “${cat}” yet`}
              action={<ButtonLink to="/contact?type=general" variant="outline">Suggest a topic</ButtonLink>}>
              We’re writing practical guides on home maintenance, hiring contractors, and building a career in the trades.
              Have a question you’d like us to answer?
            </EmptyState>
          )}
        </div>
      </section>

      <section className="section ivory" aria-labelledby="events-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Events</p>
            <h2 id="events-title">Workshops and Events.</h2>
            <p className="muted">
              Women-only home maintenance nights, DIY and repair workshops, and trades events are listed on the Academy page as
              soon as they’re scheduled.
            </p>
            <ButtonLink to="/academy#workshops" variant="navy" arrow>See workshops</ButtonLink>
          </div>
          <div>
            {workshops.length > 0 ? (
              <ul className="check-list">
                {workshops.map((w) => <li key={w.slug}><strong>{w.title}</strong>: {fmt(w.date)}, {w.location}</li>)}
              </ul>
            ) : (
              <EmptyState title="No Events Scheduled Yet" action={<ButtonLink to="/academy#interest">Get notified</ButtonLink>}>
                Register your interest and we’ll let you know when our first dates are set.
              </EmptyState>
            )}
          </div>
        </div>
      </section>

      {site.newsletter.enabled && (
        <section className="section paper" aria-labelledby="newsletter-title">
          <div className="container narrow">
            <SectionHead eyebrow="Newsletter" title={site.newsletter.heading} id="newsletter-title">{site.newsletter.text}</SectionHead>
            <div className="form-card"><NewsletterForm /></div>
          </div>
        </section>
      )}
      <CTABand />
    </>
  );
}

export function ArticleDetail({ article: a }: { article: Article }) {
  const html = marked.parse(a.body, { async: false }) as string;
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={a.category} title={a.title} crumbs={[{ label: 'Resources', to: '/resources' }, { label: a.title }]}>
        <div className="article-meta"><span>By {a.author}</span><time dateTime={a.date}>{fmt(a.date)}</time></div>
      </PageHero>
      <article className="section paper">
        <div className="container narrow">
          <div className="framed mb-2"><Photo src={a.featuredImage} alt={a.featuredImageAlt} eager /></div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-2"><Link className="text-link" to="/resources">All resources <ArrowRight width={16} height={16} /></Link></div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section ivory" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title">Related Articles</h2>
            <div className="grid grid-3">{related.map((r) => <ArticleCard a={r} key={r.slug} />)}</div>
          </div>
        </section>
      )}
      <CTABand />
    </>
  );
}
