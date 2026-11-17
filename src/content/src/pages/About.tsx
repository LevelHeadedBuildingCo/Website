import { team } from '../content';
import { Photo } from '../components/Photo';
import { CTABand, PageHero, PlaceholderPhoto, SectionHead } from '../components/ui';
import { Leaf, Level, Rise, Users } from '../components/Icons';

const values = [
  { title: 'People First', text: 'Safe, respectful, supportive workplaces where people can do their best work.', Icon: Users },
  { title: 'Skill & Growth', text: 'Real learning, practical development, and lasting careers.', Icon: Rise },
  { title: 'Community Impact', text: 'Creating opportunities and building stronger, more inclusive communities.', Icon: Level },
  { title: 'Sustainable Building', text: 'Thoughtful construction practices that serve people and the environment.', Icon: Leaf },
];

const approach = [
  { word: 'Level', text: 'Measure, check and stay calm.' },
  { word: 'Straight', text: 'Tell the truth early, including mistakes.' },
  { word: 'Teach', text: 'Make learning part of every job.' },
  { word: 'Respect Homes', text: 'Treat every client’s space with care.' },
  { word: 'Respect People', text: 'Address problems directly and fairly.' },
];

const operatingPromise = [
  'Every project has a scope, price, budget and accountable lead.',
  'Site teams know who decides what, and when to escalate.',
  'Estimating, purchasing, scheduling and job costing support the field.',
  'Clients know what is happening, who is coming and what changed.',
  'Women get appropriate gear, safe facilities and a visible route to leadership.',
];

export function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="We Believe Construction Can Be Done Differently." crumbs={[{ label: 'About Us' }]}>
        The industry needs skilled people, better systems, stronger leadership and more opportunities for women. Level Headed
        brings experienced women together to deliver professional construction services while creating pathways for the next
        generation.
      </PageHero>

      <section className="section paper" aria-labelledby="story">
        <div className="container split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story">Two Problems. One Better Way.</h2>
            <p>
              Homeowners and housing providers deserve clear pricing, reliable communication, respectful service and work done
              carefully in the places people depend on. Women deserve real access to trades careers: equipment and sites that
              work for them, skilled mentorship, and pathways to decision-making.
            </p>
            <p>
              Level Headed Building Co. was founded in Midland, Ontario to answer both. Our answer isn’t just a promise to do
              things differently. It’s a company designed differently from day one: a for-profit construction business where
              the work itself funds training, mentorship and paid opportunities for women.
            </p>
          </div>
          <div className="framed">
            <Photo src="/images/brand/crew-group" alt="A group of women in Level Headed caps and hoodies gathered on a timber-framed site, one wearing a Crew hoodie." width={360} height={234} />
          </div>
        </div>
      </section>

      <section className="section blueprint on-dark" aria-label="Mission and vision">
        <div className="container grid grid-2">
          <div>
            <p className="eyebrow">Our mission</p>
            <p className="quote-block">
              To transform the construction industry by delivering exceptional building services, creating meaningful
              opportunities for women, and developing the skills, leadership, and partnerships needed to build stronger communities.
            </p>
          </div>
          <div>
            <p className="eyebrow">Our vision</p>
            <p className="quote-block">
              A construction industry where women are represented, respected, supported, and empowered to build successful
              careers at every level.
            </p>
          </div>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="values">
        <div className="container">
          <SectionHead eyebrow="Our values" title="What We Stand On." id="values" />
          <div className="grid grid-4">
            {values.map(({ title, text, Icon }) => (
              <article className="card" key={title}>
                <span className="icon-tile"><Icon /></span>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper" aria-labelledby="approach">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="Good Intentions Need Good Systems." id="approach">
            How we behave on every job, and the operating promise behind it.
          </SectionHead>
          <div className="grid grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {approach.map((a, i) => (
              <div className="card ivory" key={a.word}>
                <span className="value-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="varsity" style={{ fontSize: '1.45rem', textTransform: 'uppercase' }}>{a.word}</h3>
                <p className="muted">{a.text}</p>
              </div>
            ))}
          </div>
          <div className="split mt-3" style={{ alignItems: 'start' }}>
            <h3 style={{ fontSize: '1.6rem' }}>Organized Work. Clear Accountability.</h3>
            <ul className="check-list">{operatingPromise.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="leadership">
        <div className="container">
          <SectionHead eyebrow="Our leadership" title="Women-Led, from the Ground Up." id="leadership" />
          <div className="grid" style={{ gap: '3rem' }}>
            {team.map((m) => (
              <article className="team-card" key={m.name}>
                <div className="team-photo">
                  {m.photo && m.photoApproved
                    ? <Photo src={m.photo} alt={m.photoAlt} />
                    : <PlaceholderPhoto label="Portrait" title="Photo Coming Soon" ratio="4 / 5" />}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.7rem', marginBottom: '0.2rem' }}>{m.name}</h3>
                  <p className="eyebrow" style={{ marginBottom: '1rem' }}>{m.role}</p>
                  {m.bioApproved
                    ? m.bio.split('\n\n').map((para, i) => <p key={i}>{para}</p>)
                    : <p className="muted">A full biography is coming soon.</p>}
                </div>
              </article>
            ))}
            <p className="notice mt-0">
              As our founding circle comes together, we’ll introduce the women helping lead Level Headed in construction,
              professional services, training and community.
            </p>
          </div>
        </div>
      </section>

      <section className="section paper" aria-labelledby="commitment">
        <div className="container narrow center">
          <p className="eyebrow">Our commitment to women in construction</p>
          <h2 id="commitment">Not a Side Program. The Way the Company Runs.</h2>
          <p className="lede" style={{ margin: '0 auto 1.5rem' }}>
            Paid work funds real jobs. Training and mentorship are built into every project. Crews get gear that fits, safe
            facilities and a visible route to leadership. And as we grow, women will shape the work, lead the teams and help
            build stronger homes and communities.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
