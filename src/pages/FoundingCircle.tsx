import fc from '../content/founding-circle.json';
import { Photo } from '../components/Photo';
import { SectionHead } from '../components/ui';
import { FoundingCircleForm } from '../components/forms/Forms';
import { RoofLine } from '../components/Icons';

const num = (i: number) => String(i + 1).padStart(2, '0');

/**
 * Private, unlisted invitation page (not in the menu or sitemap, marked noindex).
 * Edit the words in src/content/founding-circle.json.
 */
export function FoundingCircle() {
  return (
    <>
      <section className="hero blueprint on-dark" aria-labelledby="fc-title">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">{fc.eyebrow}</p>
            <h1 id="fc-title">{fc.title}</h1>
            <p className="lede">{fc.intro}</p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#share">Share your thoughts</a>
              <a className="btn btn-outline" href="#letter">Read the invitation</a>
            </div>
            <ul className="pillars" aria-label="Who we are">{fc.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="hero-media">
            <div className="hero-frame">
              <RoofLine className="hero-roof" />
              <Photo src="/images/brand/hero-portrait" alt="A woman in a navy Level Headed hoodie and cap on a timber-framed construction site." width={342} height={408} eager />
            </div>
            <p className="photo-note">Brand concept imagery</p>
          </div>
        </div>
      </section>

      <section className="section paper" id="letter" aria-labelledby="letter-title">
        <div className="container narrow">
          <p className="eyebrow">A personal invitation</p>
          <h2 id="letter-title">{fc.letter.heading}</h2>
          {fc.letter.body.split('\n\n').map((p, i) => <p className="lede" key={i}>{p}</p>)}
          <hr className="divider-copper" />
          <p className="mb-0" style={{ fontFamily: 'var(--font-slab)', fontSize: '1.4rem', fontWeight: 700 }}>{fc.letter.signature}</p>
          <p className="muted">{fc.letter.role}</p>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="who-title">
        <div className="container">
          <SectionHead eyebrow="01 / Who we are" title={fc.whoWeAre.heading} id="who-title">{fc.whoWeAre.text}</SectionHead>
          <div className="grid grid-3">
            {fc.whoWeAre.items.map((it) => (
              <article className="card pillar-card" key={it.title}>
                <h3 className="pillar-word">{it.title}</h3>
                <p className="muted">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section blueprint on-dark" aria-label="Mission and vision">
        <div className="container grid grid-2">
          <div><p className="eyebrow">Our mission</p><p className="quote-block">{fc.mission}</p></div>
          <div><p className="eyebrow">Our vision</p><p className="quote-block">{fc.vision}</p></div>
        </div>
      </section>

      <section className="section paper" aria-labelledby="why-title">
        <div className="container">
          <SectionHead eyebrow="02 / Why it matters" title={fc.whyItMatters.heading} id="why-title" />
          <div className="grid grid-2">
            {fc.whyItMatters.items.map((it) => (
              <article className="card ivory" key={it.title}><h3>{it.title}</h3><p>{it.text}</p></article>
            ))}
          </div>
          <p className="quote-block mt-3" style={{ maxWidth: '44rem' }}>{fc.whyItMatters.closing}</p>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="vision-title">
        <div className="container">
          <SectionHead eyebrow="03 / The vision" title={fc.fiveWays.heading} id="vision-title">{fc.fiveWays.text}</SectionHead>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {fc.fiveWays.items.map((it, i) => (
              <article className="card" key={it.title}>
                <span className="value-num">{num(i)}</span>
                <h3 className="varsity" style={{ textTransform: 'uppercase', fontSize: '1.35rem' }}>{it.title}</h3>
                <p className="small muted">{it.text}</p>
              </article>
            ))}
          </div>
          <ol className="chip-list mt-2" aria-label="Growth sequence">
            <li><strong>Start now:</strong></li>
            {fc.fiveWays.sequence.map((s, i) => <li key={s}>{i + 1}. {s}</li>)}
          </ol>
          <p className="notice">{fc.fiveWays.note}</p>
        </div>
      </section>

      <section className="section paper" aria-labelledby="services-title">
        <div className="container">
          <SectionHead eyebrow="Services" title="More than renovations." id="services-title">
            A practical mix of homeowner services, institutional work and off-site construction.
          </SectionHead>
          <div className="grid grid-3">
            {fc.services.map((s) => (
              <article className="card service-card" key={s.title}>
                <div className="media"><Photo src={s.image} alt="" /></div>
                <div className="body"><h3>{s.title}</h3><p>{s.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sage" aria-labelledby="training-title">
        <div className="container">
          <SectionHead eyebrow="Training" title="Women teaching women." id="training-title">
            Practical events for homeowners and skill-building pathways for future tradeswomen.
          </SectionHead>
          <div className="grid grid-3">
            {fc.training.map((t) => <article className="card" key={t.title}><h3>{t.title}</h3><p className="muted">{t.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section paper" aria-labelledby="brand-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow="Brand" title="Show the work. Celebrate women builders." id="brand-title" />
            <ol className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {fc.brand.map((b, i) => (
                <li key={b.title}><span className="value-num">{num(i)}</span><h3 style={{ fontSize: '1.15rem' }}>{b.title}</h3><p className="small muted">{b.text}</p></li>
              ))}
            </ol>
            <p className="notice">{fc.brandNote}</p>
          </div>
          <div className="framed"><Photo src="/images/brand/crew-portrait" alt="Concept of a Level Headed Crew hoodie worn on a construction site." width={280} height={408} /></div>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="capital-title">
        <div className="container">
          <SectionHead eyebrow="Funding & partners" title="Partnerships developed before commitments are made." id="capital-title" />
          <div className="grid grid-3">
            {fc.capital.map((c) => <article className="card" key={c.title}><h3 style={{ fontSize: '1.1rem' }}>{c.title}</h3><p className="small muted">{c.text}</p></article>)}
          </div>
          <p className="notice">{fc.capitalNote}</p>
        </div>
      </section>

      <section className="section paper" aria-labelledby="revenue-title">
        <div className="container">
          <SectionHead eyebrow="Revenue" title="Introduced in phases, not all at once." id="revenue-title" />
          <div className="grid grid-3">
            {fc.revenue.map((r) => <article className="card ivory" key={r.title}><p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{r.title}</p><p className="small mb-0">{r.text}</p></article>)}
          </div>
          <p className="notice">{fc.revenueNote}</p>
        </div>
      </section>

      <section className="section blueprint on-dark" aria-labelledby="how-title">
        <div className="container">
          <SectionHead eyebrow="04 / How we work" title="Good intentions need good systems." id="how-title" />
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            {fc.values.map((v, i) => (
              <div key={v.title}>
                <span className="value-num">{num(i)}</span>
                <h3 className="varsity" style={{ textTransform: 'uppercase', fontSize: '1.3rem' }}>{v.title}</h3>
                <p className="small muted">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="split mt-3" style={{ alignItems: 'start' }}>
            <div><p className="eyebrow">05 / The operating promise</p><h3 style={{ fontSize: '1.6rem' }}>Organized work. Clear accountability.</h3></div>
            <ol className="check-list">{fc.promise.map((p) => <li key={p}>{p}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section paper" aria-labelledby="circle-title">
        <div className="container">
          <SectionHead eyebrow="06 / The founding circle" title={fc.circle.heading} id="circle-title" />
          <div className="grid grid-3">
            {fc.circle.items.map((c) => <article className="card pillar-card" key={c.title}><h3>{c.title}</h3><p className="muted">{c.text}</p></article>)}
          </div>
          <p className="quote-block mt-3" style={{ maxWidth: '46rem', fontSize: '1.35rem' }}>{fc.circle.closing}</p>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="means-title">
        <div className="container">
          <SectionHead eyebrow="07 / What this means" title="A conversation first. Commitments later." id="means-title" />
          <div className="grid grid-2">
            <article className="card"><h3>What we can explore together</h3><p>{fc.expectations.explore}</p></article>
            <article className="card" style={{ borderLeft: '4px solid var(--copper)' }}><h3>What is not being promised</h3><p>{fc.expectations.notPromised}</p></article>
          </div>
        </div>
      </section>

      <section className="section paper" aria-labelledby="launch-title">
        <div className="container">
          <SectionHead eyebrow="Launch" title="The first 90 days." id="launch-title">
            A practical launch sequence, beginning now rather than waiting for a distant opening date.
          </SectionHead>
          <div className="grid grid-3">
            {fc.first90.map((p) => (
              <article className="card pillar-card" key={p.phase}>
                <h3 className="pillar-word"><small>{p.phase}</small>{p.title}</h3>
                <p className="small muted">{p.text}</p>
              </article>
            ))}
          </div>
          <h3 className="mt-3" style={{ fontSize: '1.6rem' }}>08 / The road ahead: launch now, scale responsibly.</h3>
          <ol className="grid grid-4" style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0' }}>
            {fc.roadAhead.map((r) => (
              <li className="card ivory" key={r.when}>
                <span className="status planned" style={{ marginBottom: '0.75rem' }}>{r.when}</span>
                <h3 style={{ fontSize: '1.15rem' }}>{r.title}</h3>
                <p className="small muted">{r.text}</p>
              </li>
            ))}
          </ol>
          <p className="notice">{fc.roadNote}</p>
        </div>
      </section>

      <section className="section blueprint on-dark cta-band" aria-labelledby="whyyou-title">
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>09 / Why you</p>
          <h2 id="whyyou-title" style={{ maxWidth: '22ch' }}>{fc.whyYou.heading}</h2>
          <p>{fc.whyYou.text}</p>
        </div>
      </section>

      <section className="section sage" id="share" aria-labelledby="share-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="sticky-col">
            <p className="eyebrow">10 / The next conversation</p>
            <h2 id="share-title">{fc.nextConversation.heading}</h2>
            <p>{fc.nextConversation.text}</p>
            <ol className="check-list" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {fc.nextConversation.prompts.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <p className="small muted">{fc.nextConversation.footnote}</p>
          </div>
          <div className="form-card"><FoundingCircleForm /></div>
        </div>
      </section>
    </>
  );
}
