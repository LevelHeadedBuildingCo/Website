import { crewOpenings, crewPathways } from '../content';
import { Photo } from '../components/Photo';
import { EmptyState, PageHero, SectionHead } from '../components/ui';
import { CrewForm } from '../components/forms/Forms';
import { HardHat, Rise, Shield, Users } from '../components/Icons';

const promises = [
  { title: 'Gear and Facilities That Fit', text: 'Appropriately sized PPE and safe, respectful site facilities.', Icon: HardHat },
  { title: 'A Visible Route Up', text: 'Training, mentorship and clear paths to leadership and decision-making.', Icon: Rise },
  { title: 'Crews That Teach', text: 'Learning is part of every job, for apprentices and experienced trades alike.', Icon: Users },
  { title: 'Problems Handled Fairly', text: 'Issues are addressed directly, early and respectfully.', Icon: Shield },
];

export function JoinTheCrew() {
  return (
    <>
      <PageHero
        eyebrow="Level Headed Crew"
        title={<>Your Skills <span style={{ color: 'var(--copper-light)' }}>Belong Here.</span></>}
        crumbs={[{ label: 'Join the Crew' }]}
        aside={<img className="page-hero-badge" src="/brand/lh-crew-badge-dark.png" alt="Level Headed Crew badge" width={210} height={167} />}
      >
        Whether you’re an experienced tradeswoman, construction leader, apprentice, or exploring your first opportunity in the
        industry, we want to connect with women who are ready to build something different.
        <div className="btn-row mt-2"><a className="btn btn-primary" href="#crew-form">Join the Crew</a></div>
      </PageHero>

      <section className="section paper" aria-labelledby="pathways-title">
        <div className="container">
          <SectionHead eyebrow="Pathways" title="There’s More Than One Way Onto the Crew." id="pathways-title" />
          <div className="grid grid-4">
            {crewPathways.map((p, i) => (
              <article className="card pillar-card" key={p.title}>
                <span className="value-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p className="muted small">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section blueprint on-dark" aria-labelledby="promise-title">
        <div className="container split">
          <div>
            <p className="eyebrow">What you can expect</p>
            <h2 id="promise-title">A Workplace Designed with Women in Mind.</h2>
            <div className="grid grid-2 mt-2">
              {promises.map(({ title, text, Icon }) => (
                <div key={title}>
                  <span className="icon-tile"><Icon /></span>
                  <h3 style={{ fontSize: '1.1rem' }}>{title}</h3>
                  <p className="small" style={{ color: 'rgba(245,238,226,0.8)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="framed"><Photo src="/images/brand/crew-portrait" alt="A woman seen from behind wearing a navy Level Headed Crew hoodie on a construction site." width={280} height={408} /></div>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="openings-title">
        <div className="container">
          <SectionHead eyebrow="Current opportunities" title="Open Roles." id="openings-title" />
          {crewOpenings.length > 0 ? (
            <div className="grid grid-2">
              {crewOpenings.map((o) => (
                <article className="card" key={o.slug}>
                  <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{o.type} · {o.location}</p>
                  <h3>{o.title}</h3>
                  <p className="muted">{o.summary}</p>
                  <p className="small">Posted {o.postedDate}{o.closingDate ? ` · Apply by ${o.closingDate}` : ''}</p>
                  <div className="card-foot"><a className="btn btn-primary" href="#crew-form">Express interest</a></div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No Open Positions Right Now" action={<a className="btn btn-primary" href="#crew-form">Submit your interest</a>}>
              We’re building our founding crew and roster ahead of our first projects. Share your experience and interests below,
              and we’ll reach out when there’s a role, project or program that fits.
            </EmptyState>
          )}
        </div>
      </section>

      <section className="section paper" id="crew-form" aria-labelledby="crew-form-title">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">Employment interest</p>
            <h2 id="crew-form-title">Tell Us About You.</h2>
            <p className="muted">
              This form registers your interest in working, training or partnering with Level Headed. It isn’t an application for
              a specific job, and submitting it doesn’t guarantee employment. We read every submission.
            </p>
          </div>
          <div className="form-card"><CrewForm /></div>
          <p className="notice">
            Hiring and training programs will be administered in accordance with applicable Ontario employment standards and the
            Ontario Human Rights Code, including any special program provisions that apply. If you need an accommodation at any
            stage, please let us know in your message.
          </p>
        </div>
      </section>
    </>
  );
}
