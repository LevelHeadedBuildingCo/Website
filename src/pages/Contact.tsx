import { useEffect, useState, type ComponentType } from 'react';
import { useRouter } from '../lib/router';
import { site } from '../content';
import { PageHero } from '../components/ui';
import { AcademyInterestForm, ConsultingForm, CrewForm, GeneralForm, PartnerForm, QuoteForm } from '../components/forms/Forms';
import { Mail, MapPin, Phone } from '../components/Icons';

const types = [
  { key: 'quote', label: 'Request a Construction Quote', intro: 'Tell us about your project. Plans and photos help us give you useful advice sooner.' },
  { key: 'consulting', label: 'Construction Management & Consulting', intro: 'Planning, estimating, owner representation or operations support.' },
  { key: 'crew', label: 'Join the Crew', intro: 'Share your experience and interests. This isn’t an application for a specific job.' },
  { key: 'training', label: 'Training & Workshops', intro: 'Register interest in Academy programs and women-only workshops.' },
  { key: 'partnership', label: 'Partnerships & Sponsorship', intro: 'Housing, workforce, training and construction partnerships.' },
  { key: 'general', label: 'General Inquiry', intro: 'Anything else: questions, referrals, media or ideas.' },
] as const;
type Key = (typeof types)[number]['key'];

const forms: Record<Key, ComponentType> = {
  quote: QuoteForm, consulting: ConsultingForm, crew: CrewForm, training: () => <AcademyInterestForm />,
  partnership: PartnerForm, general: GeneralForm,
};

export function Contact() {
  const { search } = useRouter();
  const [type, setType] = useState<Key>('quote');

  useEffect(() => {
    const t = new URLSearchParams(search).get('type');
    if (t && types.some((x) => x.key === t)) setType(t as Key);
  }, [search]);

  const current = types.find((t) => t.key === type)!;
  const Form = forms[type];
  const { contact } = site;

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about what you’re building." crumbs={[{ label: 'Contact' }]}>
        Choose the option that fits best and we’ll route your message to the right person.
      </PageHero>

      <section className="section paper">
        <div className="container contact-grid">
          <div>
            <h2 className="sr-only">Inquiry type</h2>
            <div className="tabs" role="group" aria-label="What can we help with?">
              {types.map((t) => (
                <button key={t.key} type="button" className="tab" aria-pressed={type === t.key}
                  onClick={() => { setType(t.key); window.history.replaceState({}, '', `/contact?type=${t.key}`); }}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="form-card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{current.label}</h3>
              <p className="muted">{current.intro}</p>
              <Form key={type} />
            </div>
          </div>

          <aside className="card navy contact-aside" aria-label="Contact details" style={{ alignSelf: 'start' }}>
            <div className="item">
              <h3><MapPin width={18} height={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />Based in {site.locationLabel}</h3>
              <p className="small mb-0" style={{ color: 'rgba(245,238,226,0.8)' }}>
                Serving {site.serviceArea.join(', ')} and surrounding Ontario communities.
              </p>
            </div>
            {contact.email && (
              <div className="item">
                <h3><Mail width={18} height={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />Email</h3>
                <a className="text-link" href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            )}
            {contact.phone && (
              <div className="item">
                <h3><Phone width={18} height={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />Phone</h3>
                <a className="text-link" href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>
                {contact.hours && <p className="small mb-0">{contact.hours}</p>}
              </div>
            )}
            <div className="item" style={{ borderBottom: 0 }}>
              <h3>What happens next</h3>
              <ol className="small" style={{ paddingLeft: '1.1em', color: 'rgba(245,238,226,0.85)', margin: 0 }}>
                <li>We review every inquiry personally.</li>
                <li>We reach out to ask questions or book a conversation.</li>
                <li>For projects, we confirm scope before we talk price.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
