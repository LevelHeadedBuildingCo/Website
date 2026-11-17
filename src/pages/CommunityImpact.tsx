import { Link } from '../lib/router';
import { CTABand, PageHero, SectionHead } from '../components/ui';
import { ImpactDashboard } from '../components/ImpactDashboard';
import { ArrowRight, Blueprint, Book, Handshake, HardHat, House, KeyHouse, Rise, Users } from '../components/Icons';

const focus = [
  { title: 'Women entering construction', text: 'Low-barrier first steps (workshops, exploration and readiness) for women new to the industry.', Icon: HardHat },
  { title: 'Skills development', text: 'Practical, on-the-job learning tied to real Level Headed projects.', Icon: Book },
  { title: 'Mentorship', text: 'Experienced women guiding the next generation, one-to-one and in groups.', Icon: Users },
  { title: 'Paid employment pathways', text: 'Construction revenue funds real jobs, apprenticeships and paid learning.', Icon: Rise },
  { title: 'Leadership development', text: 'Clear routes from crew member to site lead, trainer and decision-maker.', Icon: Blueprint },
  { title: 'Community building', text: 'A network connecting tradeswomen, women-owned trades, mentors and clients.', Icon: Handshake },
  { title: 'Housing partnerships', text: 'Turnovers, repairs and future housing projects with providers and co-ops.', Icon: KeyHouse },
  { title: 'Industry collaboration', text: 'Working with contractors, colleges and employers to widen the pipeline.', Icon: House },
];

const support = [
  { title: 'Partnership', text: 'Bring us into projects, programs and housing initiatives.', to: '/partners#inquire', cta: 'Explore partnership' },
  { title: 'Mentorship', text: 'Share your experience with women entering and growing in the trades.', to: '/join-the-crew#crew-form', cta: 'Become a mentor' },
  { title: 'Referrals', text: 'Refer clients, tradeswomen or organizations who should know us.', to: '/contact?type=general', cta: 'Make a referral' },
  { title: 'Sponsorship', text: 'Sponsor workshops, gear, training seats or cohorts.', to: '/partners#inquire', cta: 'Discuss sponsorship' },
  { title: 'Collaboration', text: 'Research, events, advocacy and shared programs.', to: '/contact?type=partnership', cta: 'Start a conversation' },
];

export function CommunityImpact() {
  return (
    <>
      <PageHero eyebrow="Community & impact" title="A construction company that builds people, too." crumbs={[{ label: 'Community & Impact' }]}>
        Level Headed is a for-profit, women-led social enterprise. Our construction work funds real jobs; training and
        community build a stronger workforce; and housing partnerships expand our long-term impact.
      </PageHero>

      <section className="section paper" aria-labelledby="focus-title">
        <div className="container">
          <SectionHead eyebrow="Our focus" title="Where we’re putting our effort." id="focus-title" />
          <div className="grid grid-4">
            {focus.map(({ title, text, Icon }) => (
              <article className="card" key={title}>
                <span className="icon-tile"><Icon /></span>
                <h3 style={{ fontSize: '1.15rem' }}>{title}</h3>
                <p className="small muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="model-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">How the model works</p>
            <h2 id="model-title">Mission and margin, working together.</h2>
          </div>
          <ol className="check-list" style={{ fontSize: '1.08rem' }}>
            <li><strong>Construction and maintenance</strong> create revenue and real, paid work.</li>
            <li><strong>Training and mentorship</strong> are built into that work, so skills grow on actual projects.</li>
            <li><strong>Partnerships</strong> with housing providers, colleges and employers extend reach and opportunity.</li>
            <li><strong>Housing projects</strong>, when the work, people and financing support them, expand long-term impact.</li>
          </ol>
        </div>
      </section>

      <section className="section blueprint on-dark" aria-labelledby="dash-title">
        <div className="container">
          <SectionHead eyebrow="Impact dashboard" title="What we’ll report, and how." id="dash-title">
            Every figure here will be verified before it’s published, with the date it was last updated.
          </SectionHead>
          <ImpactDashboard />
        </div>
      </section>

      <section className="section paper" aria-labelledby="together-title">
        <div className="container">
          <SectionHead eyebrow="Get involved" title="The future is something we build together." id="together-title" center>
            There are many ways to support women in construction across Simcoe County, Georgian Bay and Muskoka.
          </SectionHead>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {support.map((s) => (
              <article className="card ivory" key={s.title}>
                <h3>{s.title}</h3>
                <p className="small muted">{s.text}</p>
                <div className="card-foot"><Link className="text-link" to={s.to}>{s.cta} <ArrowRight width={16} height={16} /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
