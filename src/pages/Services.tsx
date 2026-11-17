import type { ComponentType, SVGProps } from 'react';
import { services } from '../content';
import type { Service } from '../content/types';
import { Photo } from '../components/Photo';
import { ButtonLink, CTABand, PageHero, StatusBadge } from '../components/ui';
import { Building, Clipboard, CornerLines, House, KeyHouse, Panels, Ruler, Wrench } from '../components/Icons';

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  residential: House,
  'commercial-institutional': Building,
  'social-cooperative-housing': KeyHouse,
  'panelized-construction': Panels,
  'construction-management': Clipboard,
  'construction-consulting': Ruler,
  'maintenance-property-improvements': Wrench,
  'housing-community-development': House,
};

export const inquiryLink = (s: Service) =>
  s.ctaInquiry === 'partnership' ? '/partners#inquire' : `/contact?type=${s.ctaInquiry}`;

export function Services() {
  return (
    <>
      <PageHero eyebrow="Construction services" title="Capable, careful construction, from repairs to housing." crumbs={[{ label: 'Construction Services' }]}>
        Residential, housing-provider, commercial and advisory services across Simcoe County, Georgian Bay, Muskoka and
        surrounding Ontario communities.
        <ul className="service-index" aria-label="Jump to a service">
          {services.map((s) => <li key={s.slug}><a href={`#${s.slug}`}>{s.title}</a></li>)}
        </ul>
      </PageHero>

      <section className="section tight ivory" aria-label="How we take on work">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Straight answers</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>We grow deliberately, and we’ll tell you what we can take on.</h2>
          </div>
          <div>
            <p>
              Every service is offered only when we have qualified people, insurance and compliance in place for it. Services
              marked <StatusBadge status="inquiries" /> are open for conversations and quotes now. Services marked{' '}
              <StatusBadge status="planned" /> are part of our plan and delivered through partners as capacity grows.
            </p>
            <p className="muted mb-0">Not sure where your project fits? Send us the details and we’ll give you a straight answer.</p>
          </div>
        </div>
      </section>

      <div className="section paper" style={{ paddingTop: 'clamp(1rem, 3vw, 2rem)' }}>
        <div className="container">
          {services.map((s, i) => {
            const Icon = icons[s.slug] ?? House;
            return (
              <section className="service-section" id={s.slug} key={s.slug} aria-labelledby={`${s.slug}-title`}>
                <div className={`split${i % 2 ? ' reverse' : ''}`}>
                  <div>
                    {s.image ? (
                      <div className="framed"><Photo src={s.image} alt={s.imageAlt || ''} /></div>
                    ) : (
                      <div className="placeholder-photo blueprint" aria-hidden="true">
                        <CornerLines className="lines" preserveAspectRatio="xMidYMid slice" />
                        <Icon width={88} height={88} style={{ position: 'relative', color: 'var(--copper-light)' }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <StatusBadge status={s.status} />
                    <h2 id={`${s.slug}-title`}>{s.title}</h2>
                    <p className="lede" style={{ fontSize: '1.12rem' }}>{s.summary}</p>
                    {s.audience && <p><strong>For:</strong> {s.audience}</p>}
                    <ul className="check-list">{s.includes.map((x) => <li key={x}>{x}</li>)}</ul>
                    {s.statusNote && <p className="service-note">{s.statusNote}</p>}
                    <ButtonLink to={inquiryLink(s)} arrow>{s.ctaLabel}</ButtonLink>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <CTABand title="Have a project in mind?">
        Tell us what you’re planning. We’ll respond with honest advice about scope, timing and whether we’re the right fit.
      </CTABand>
    </>
  );
}
