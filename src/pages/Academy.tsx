import { academyBadge, academyPrograms, workshopTopics, workshops } from '../content';
import type { Workshop } from '../content/types';
import { Photo } from '../components/Photo';
import { CTABand, EmptyState, PageHero, SectionHead, StatusBadge } from '../components/ui';
import { AcademyInterestForm } from '../components/forms/Forms';
import { Book, HardHat, Rise, Users } from '../components/Icons';

const pathway = [
  { step: 'Explore', title: 'Workshops & First Tools', text: 'Confidence-building, women-only sessions with tools and real materials.', Icon: Book },
  { step: 'Learn', title: 'Structured Training', text: 'Jobsite readiness, safety and practical skills, with real projects.', Icon: HardHat },
  { step: 'Apprentice', title: 'Paid Experience', text: 'Practical experience on Level Headed and partner jobs, with support and progression.', Icon: Users },
  { step: 'Lead', title: 'Leadership Growth', text: 'Teaching, site leadership and career advancement.', Icon: Rise },
];

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    month: d.toLocaleString('en-CA', { month: 'short' }),
    day: d.getDate(),
    full: d.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

function WorkshopCard({ w }: { w: Workshop }) {
  const d = formatDate(w.date);
  return (
    <article className="card workshop-card">
      <div className="date-block" aria-hidden="true"><span className="m">{d.month}</span><span className="d">{d.day}</span></div>
      <StatusBadge status={w.registration} />
      <h3 style={{ marginTop: '0.75rem' }}>{w.title}</h3>
      <p className="muted">{w.description}</p>
      <dl>
        <dt>Date</dt><dd>{d.full}{w.time ? `, ${w.time}` : ''}</dd>
        <dt>Where</dt><dd>{w.location}</dd>
        <dt>Capacity</dt><dd>{w.capacity}</dd>
        <dt>Cost</dt><dd>{w.cost}</dd>
      </dl>
      <div className="card-foot">
        {w.registration === 'open' && w.registrationUrl
          ? <a className="btn btn-primary" href={w.registrationUrl} target="_blank" rel="noopener noreferrer">Register</a>
          : <a className="btn btn-outline" href="#interest">{w.registration === 'full' ? 'Join the waitlist' : 'Register interest'}</a>}
      </div>
    </article>
  );
}

export function Academy() {
  return (
    <>
      <PageHero
        eyebrow="Level Headed Academy"
        title="Real Skills. Real Pathways. Women Teaching Women."
        crumbs={[{ label: 'Academy' }]}
        aside={academyBadge.src ? <img className="page-hero-badge" src={academyBadge.src} alt={academyBadge.alt} /> : undefined}
      >
        Practical training for women at every stage, from your first time holding a drill to leading a site. Our programs are
        in development now, launching alongside our first projects. Register your interest and help shape what we offer first.
        <div className="btn-row mt-2">
          <a className="btn btn-primary" href="#interest">Register interest</a>
          <a className="btn btn-outline" href="#workshops">Community workshops</a>
        </div>
      </PageHero>

      <section className="section paper" aria-labelledby="pathway-title">
        <div className="container">
          <SectionHead eyebrow="The pathway" title="From First Tools to Site Leadership." id="pathway-title">
            Training is built into how Level Headed works. Construction projects create paid, supervised experience, so learning
            leads somewhere real.
          </SectionHead>
          <ol className="grid grid-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pathway.map(({ step, title, text, Icon }, i) => (
              <li className="card pillar-card" key={step}>
                <Icon className="icon" />
                <h3 className="pillar-word"><small>Step {i + 1} · {step}</small>{title}</h3>
                <p className="muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="programs-title">
        <div className="container">
          <SectionHead eyebrow="Programs" title="What We’re Building." id="programs-title">
            Program details, dates and costs will be published here as each one launches.
          </SectionHead>
          <div className="grid grid-2">
            {academyPrograms.map((p) => (
              <article className="card" key={p.slug} id={p.slug}>
                <StatusBadge status={p.status} />
                <h3 style={{ marginTop: '0.85rem' }}>{p.title}</h3>
                <p>{p.summary}</p>
                <p className="small muted"><strong>For:</strong> {p.audience}</p>
                <ul className="chip-list" style={{ margin: '0.5rem 0 0' }}>{p.topics.map((t) => <li key={t}>{t}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper" id="workshops" aria-labelledby="workshops-title">
        <div className="container">
          <div className="split" style={{ alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <p className="eyebrow">Community workshops</p>
              <h2 id="workshops-title">Hands-On Confidence for Your Home.</h2>
              <p className="lede">
                Women-only evenings and weekend sessions in a welcoming, no-pressure setting. Bring your questions. Leave
                knowing how your home works, how to fix the small things, and when to call a licensed professional.
              </p>
            </div>
            <div className="framed"><Photo src="/images/brand/grab-bar" alt="A woman in safety glasses installs a grab bar in a tiled shower." /></div>
          </div>

          <div className="grid grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {workshopTopics.map((w) => (
              <div className="card ivory" key={w.title}>
                <h3 style={{ fontSize: '1.1rem' }}>{w.title}</h3>
                <p className="small muted">{w.text}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-3" style={{ fontSize: '1.6rem' }}>Upcoming Workshops</h3>
          {workshops.length > 0 ? (
            <div className="grid grid-3">{workshops.map((w) => <WorkshopCard w={w} key={w.slug} />)}</div>
          ) : (
            <EmptyState title="No Workshops Scheduled Yet" action={<a className="btn btn-primary" href="#interest">Tell me when dates are set</a>}>
              Our first women-only workshops are being planned now. Register your interest, and tell us which topics and times
              suit you, so we can schedule what people want most.
            </EmptyState>
          )}
        </div>
      </section>

      <section className="section sage" id="interest" aria-labelledby="interest-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="sticky-col">
            <p className="eyebrow">Register interest</p>
            <h2 id="interest-title">Help Shape the Academy.</h2>
            <p>
              Tell us what you’d like to learn and when you can attend. We’ll use your answers to plan our first programs and
              let you know as soon as registration opens.
            </p>
            <p className="small muted">No commitment, and no cost to register interest.</p>
          </div>
          <div className="form-card"><AcademyInterestForm /></div>
        </div>
      </section>
      <CTABand title="Ready to Build Your Skills?">Join the Crew to hear about training, apprenticeships and paid opportunities.</CTABand>
    </>
  );
}
