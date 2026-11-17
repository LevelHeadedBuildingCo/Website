import { Link } from '../lib/router';
import { crewPathways, services, site, testimonials, workshopTopics } from '../content';
import { Photo } from '../components/Photo';
import { ButtonLink, CTABand, Pillars, PlaceholderPhoto, SectionHead, StatusBadge } from '../components/ui';
import { ImpactDashboard } from '../components/ImpactDashboard';
import { ArrowRight, Blueprint, Clipboard, HardHat, Hammer, Rise, RoofLine, Users } from '../components/Icons';

const pillars = [
  { word: 'Build', title: 'We Build', text: 'Quality construction delivered by experienced professionals.', Icon: Hammer, to: '/services' },
  { word: 'Train', title: 'We Train', text: 'Practical skills, mentorship, and pathways into construction careers.', Icon: HardHat, to: '/academy' },
  { word: 'Empower', title: 'We Empower', text: 'Meaningful opportunities for women to succeed and advance.', Icon: Rise, to: '/join-the-crew' },
  { word: 'Develop', title: 'We Develop', text: 'Housing, partnerships, construction capacity, and stronger communities.', Icon: Blueprint, to: '/partners' },
];

const promise = [
  'A clear scope and price before work starts',
  'One accountable lead for every project',
  'Respectful crews who treat your home with care',
  'Daily cleanup and honest, early communication',
];

export function Home() {
  const featured = services.filter((s) => s.image).slice(0, 5);
  return (
    <>
      {/* HERO */}
      <section className="hero blueprint on-dark" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">Women-led construction · {site.locationLabel}</p>
            <h1 id="hero-title">Changing who gets to <em>build the future.</em></h1>
            <p className="lede">
              We’re a women-led construction company building exceptional spaces, developing skilled tradespeople, and
              creating real opportunities for women in construction.
            </p>
            <div className="btn-row">
              <ButtonLink to="/contact?type=quote" arrow>Start Your Project</ButtonLink>
              <ButtonLink to="/join-the-crew" variant="outline">Join the Crew</ButtonLink>
            </div>
            <Pillars />
          </div>
          <div className="hero-media">
            <div className="hero-frame">
              <RoofLine className="hero-roof" />
              <Photo src="/images/brand/hero-portrait" alt="A woman in a navy Level Headed Building Co. hoodie and cap stands on a timber-framed construction site."
                width={342} height={408} eager />
              <div className="hero-tag"><strong>Women-owned. Women-led.</strong>Built to last.</div>
            </div>
            <p className="photo-note">Illustrative brand imagery</p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section paper" aria-labelledby="what-we-do">
        <div className="container">
          <SectionHead eyebrow="What we do" title="A construction company with a mission built in." id="what-we-do">
            We aren’t a charity that happens to do construction. We’re a professional construction business, and the way we
            operate creates real pathways for women to enter, grow, lead and thrive in the industry.
          </SectionHead>
          <div className="grid grid-4">
            {pillars.map(({ word, title, text, Icon, to }) => (
              <article className="card pillar-card" key={word}>
                <Icon className="icon" />
                <h3 className="pillar-word"><small>{word}</small>{title}</h3>
                <p className="muted">{text}</p>
                <div className="card-foot"><Link to={to} className="text-link">Learn more <ArrowRight width={16} height={16} /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section ivory" aria-labelledby="services-title">
        <div className="container">
          <SectionHead eyebrow="Our services" title="Dependable construction for homes, housing providers and organizations." id="services-title">
            We’re starting with small, high-trust jobs close to home, and growing deliberately into larger projects as our crews do.
          </SectionHead>
          <div className="grid grid-3">
            {featured.map((s) => (
              <Link to={`/services#${s.slug}`} className="card service-card" key={s.slug}>
                <div className="media"><Photo src={s.image!} alt={s.imageAlt || ''} /></div>
                <div className="body">
                  <StatusBadge status={s.status} />
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="text-link">Explore service <ArrowRight width={16} height={16} /></span>
                </div>
              </Link>
            ))}
            <Link to="/services#construction-management" className="card navy service-card" style={{ justifyContent: 'center' }}>
              <div className="body">
                <span className="icon-tile"><Clipboard /></span>
                <h3>Construction Management &amp; Consulting</h3>
                <p style={{ color: 'rgba(245,238,226,0.8)' }}>Planning, estimating, scheduling, cost control and owner representation from people who have run the work.</p>
                <span className="text-link">See advisory services <ArrowRight width={16} height={16} /></span>
              </div>
            </Link>
          </div>
          <div className="center mt-3"><ButtonLink to="/services" variant="navy" arrow>All construction services</ButtonLink></div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section paper" aria-labelledby="work-title">
        <div className="container">
          <div className="split" style={{ alignItems: 'end', marginBottom: '2.5rem' }}>
            <div className="section-head mb-0" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Featured work</p>
              <h2 id="work-title" className="mb-0">Real work, shown as it’s completed.</h2>
            </div>
            <p className="muted mb-0">
              We only show real Level Headed work, so this portfolio will grow as projects are completed: renovations,
              accessibility upgrades, housing turnovers and more.
            </p>
          </div>
          <div className="grid grid-3">
            <PlaceholderPhoto title="Accessibility renovation" />
            <PlaceholderPhoto title="Housing unit turnover" />
            <PlaceholderPhoto title="Residential renovation" />
          </div>
          <div className="mt-2"><Link to="/our-work" className="text-link">Visit the portfolio <ArrowRight width={16} height={16} /></Link></div>
        </div>
      </section>

      {/* MEET LEVEL HEADED */}
      <section className="section ivory" aria-labelledby="meet-title">
        <div className="container split">
          <div className="framed">
            <Photo src="/images/brand/kitchen-consult" alt="A woman contractor reviews plans with an older homeowner at her kitchen counter." width={383} height={336} />
          </div>
          <div>
            <p className="eyebrow">Meet Level Headed</p>
            <h2 id="meet-title">Craftsmanship and opportunity, built into how we work.</h2>
            <p>
              Level Headed Building Co. is a women-owned, women-led construction company based in Midland, Ontario. We bring
              experienced construction professionals and skilled tradeswomen together to deliver organized, careful work and
              to open the door for the next generation.
            </p>
            <p className="muted">Good intentions need good systems. Every client can count on:</p>
            <ul className="check-list">{promise.map((p) => <li key={p}>{p}</li>)}</ul>
            <ButtonLink to="/about" variant="outline" arrow>Our story</ButtonLink>
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section className="section sage" aria-labelledby="academy-title">
        <div className="container split reverse">
          <div className="framed">
            <Photo src="/images/brand/drill-siding" alt="A woman wearing safety glasses and gloves drives a screw into siding with a cordless drill." width={359} height={234} />
          </div>
          <div>
            <p className="eyebrow">The Level Headed Academy</p>
            <h2 id="academy-title">Women teaching women, from first tools to site leadership.</h2>
            <p>
              We’re building practical training for every stage: women-only home maintenance nights, trades career
              exploration, apprenticeship pathways, mentorship and leadership development.
            </p>
            <ul className="chip-list" aria-label="Example workshop topics">
              {workshopTopics.slice(0, 6).map((w) => <li key={w.title}>{w.title}</li>)}
            </ul>
            <div className="btn-row">
              <ButtonLink to="/academy" variant="navy" arrow>Explore Training</ButtonLink>
              <ButtonLink to="/academy#interest" variant="outline">Register interest</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE CREW */}
      <section className="section blueprint crew-band on-dark" aria-labelledby="crew-title">
        <div className="container split">
          <div>
            <p className="eyebrow">Level Headed Crew</p>
            <h2 id="crew-title" className="crew-headline">Your skills <span>belong here.</span></h2>
            <p className="lede" style={{ color: 'rgba(245,238,226,0.85)' }}>
              Experienced tradeswomen, site leaders, apprentices and women exploring their first opportunity in the industry:
              we want to connect with women who are ready to build something different.
            </p>
            <ul className="chip-list">{crewPathways.slice(0, 6).map((p) => <li key={p.title}>{p.title}</li>)}</ul>
            <ButtonLink to="/join-the-crew" arrow>Join the Crew</ButtonLink>
          </div>
          <div style={{ justifySelf: 'center', textAlign: 'center' }}>
            <div className="crew-badge-wrap">
              <img src="/brand/lh-crew-badge-dark.png" alt="Level Headed Crew badge" width={210} height={167} loading="lazy" />
            </div>
            <div className="grid grid-2 mt-2" style={{ maxWidth: 420, textAlign: 'left' }}>
              <div><Users width={28} height={28} style={{ color: 'var(--copper-light)' }} /><p className="small mt-0">Crews that teach as they build</p></div>
              <div><HardHat width={28} height={28} style={{ color: 'var(--copper-light)' }} /><p className="small mt-0">Gear and facilities that fit</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="section paper" aria-labelledby="impact-title">
        <div className="container">
          <SectionHead eyebrow="Our impact" title="We’ll measure what matters, and only report what’s real." id="impact-title">
            Our impact dashboard will track women trained, jobs created, mentorship hours, projects delivered and career
            progression as our work begins.
          </SectionHead>
          <ImpactDashboard light />
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section ivory" aria-labelledby="testimonials-title">
          <div className="container">
            <SectionHead eyebrow="In their words" title="What people say." id="testimonials-title" />
            <div className="grid grid-3">
              {testimonials.slice(0, 3).map((t) => (
                <figure className="card" key={t.name + t.quote.slice(0, 20)} style={{ margin: 0 }}>
                  <blockquote className="quote-block" style={{ fontSize: '1.15rem', margin: 0 }}>“{t.quote}”</blockquote>
                  <figcaption className="small muted mt-2">{t.name}{t.context ? `, ${t.context}` : ''}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
