import { CTABand, PageHero, SectionHead } from '../components/ui';
import { PartnerForm, partnerTypes } from '../components/forms/Forms';
import { Blueprint, Book, Building, Handshake, KeyHouse, Panels, Rise, Users } from '../components/Icons';

const opportunities = [
  { title: 'Construction Contracts', text: 'Renovation, repair, accessibility and facility work delivered with clear scope and accountability.', Icon: Building },
  { title: 'Panelized Construction Delivery', text: 'Panelized additions, accessory units and housing through fabrication and installation partners.', Icon: Panels },
  { title: 'Workforce Development', text: 'Co-designed programs that move women into skilled, paid construction roles.', Icon: Rise },
  { title: 'Training Sponsorships', text: 'Sponsor workshop seats, gear, cohorts or trainer development.', Icon: Book },
  { title: 'Mentorship', text: 'Connect your experienced people with emerging tradeswomen.', Icon: Users },
  { title: 'Housing Partnerships', text: 'Unit turnovers, maintenance programs and future attainable-housing projects.', Icon: KeyHouse },
  { title: 'Community Workshops', text: 'Host or co-deliver women-only home maintenance and skills events.', Icon: Handshake },
  { title: 'Employment Pathways', text: 'Placement, apprenticeship and hiring partnerships with employers and colleges.', Icon: Blueprint },
];

export function Partners() {
  return (
    <>
      <PageHero eyebrow="Partners & opportunities" title="Let’s Build Capacity Together." crumbs={[{ label: 'Partners & Opportunities' }]}>
        We work with organizations that share our commitment to quality construction, better housing and real opportunities
        for women in the trades.
        <div className="btn-row mt-2"><a className="btn btn-primary" href="#inquire">Start a partnership conversation</a></div>
      </PageHero>

      <section className="section paper" aria-labelledby="who-title">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Who we partner with</p>
            <h2 id="who-title">Built for Collaboration.</h2>
            <p className="muted">
              From housing providers who need dependable turnovers, to colleges and workforce organizations building pathways
              into the trades, partnership is central to how Level Headed grows.
            </p>
          </div>
          <ul className="chip-list" style={{ marginTop: 0 }}>
            {partnerTypes.filter((t) => t !== 'Other').map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="section ivory" aria-labelledby="opps-title">
        <div className="container">
          <SectionHead eyebrow="Opportunities" title="Ways to Work Together." id="opps-title" />
          <div className="grid grid-4">
            {opportunities.map(({ title, text, Icon }) => (
              <article className="card" key={title}>
                <span className="icon-tile"><Icon /></span>
                <h3 style={{ fontSize: '1.15rem' }}>{title}</h3>
                <p className="small muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper" id="inquire" aria-labelledby="inquire-title">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">Partnership inquiry</p>
            <h2 id="inquire-title">Tell Us What You Have in Mind.</h2>
            <p className="muted">We’ll follow up to set up a conversation. There’s no obligation, just a chance to explore fit.</p>
          </div>
          <div className="form-card"><PartnerForm /></div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
