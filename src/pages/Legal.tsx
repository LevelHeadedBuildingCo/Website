import type { ReactNode } from 'react';
import { Link } from '../lib/router';
import { site } from '../content';
import { PageHero } from '../components/ui';

function LegalPage({ title, crumb, children }: { title: string; crumb: string; children: ReactNode }) {
  const { legal } = site;
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ label: crumb }]}>
        {legal.effectiveDate ? `Effective ${legal.effectiveDate}.` : 'Effective date to be confirmed.'}
      </PageHero>
      <section className="section paper">
        <div className="container narrow prose">
          {!legal.reviewed && (
            <p className="service-note" role="note">
              This page is a draft and is being reviewed. If you have questions in the meantime, please <Link to="/contact?type=general">contact us</Link>.
            </p>
          )}
          {children}
        </div>
      </section>
    </>
  );
}

const privacyContact = () =>
  site.legal.privacyContactEmail
    ? <a href={`mailto:${site.legal.privacyContactEmail}`}>{site.legal.privacyContactEmail}</a>
    : <Link to="/contact?type=general">our contact form</Link>;

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" crumb="Privacy">
      <p>
        {site.companyName} (“Level Headed”, “we”, “us”) respects your privacy. This policy explains what personal information we
        collect through this website, why we collect it, and how we protect it, in keeping with Canada’s Personal Information
        Protection and Electronic Documents Act (PIPEDA).
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Inquiries:</strong> your name, contact details, project location, and the project details, files and photos you choose to send.</li>
        <li><strong>Employment and training interest:</strong> contact details, experience, qualifications, preferences, and any resume you upload.</li>
        <li><strong>Partnership inquiries:</strong> your name, organization, role and contact details.</li>
        <li><strong>Newsletter:</strong> your email address and name, if you subscribe.</li>
        <li><strong>Website analytics:</strong> privacy-friendly, aggregated usage data (Cloudflare Web Analytics does not use cookies or track you across sites).</li>
      </ul>
      <h2>How we use it</h2>
      <p>We use your information only to respond to you, provide quotes and services, consider you for employment, training or partnership opportunities, send newsletters you asked for, and improve our website. We do not sell personal information.</p>
      <h2>Consent</h2>
      <p>By submitting a form, you consent to our use of the information as described on that form and in this policy. You may withdraw consent at any time by contacting us.</p>
      <h2>Spam protection</h2>
      <p>Our forms use Cloudflare Turnstile to block automated spam. Turnstile processes limited technical information about your browser to make this check.</p>
      <h2>Storage, security and service providers</h2>
      <p>
        Form submissions are transmitted securely and delivered to our team by email through a service provider. Resumes and
        files may be stored in secure, access-restricted cloud storage. Our providers may process information outside Canada,
        and it may be subject to the laws of those jurisdictions. We limit access to people who need it.
      </p>
      <h2>Retention</h2>
      <p>We keep inquiry information only as long as needed to respond and for our business records. Employment interest and resumes are kept for up to 24 months unless you ask us to delete them sooner.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete the personal information we hold about you. Contact us through {privacyContact()}.</p>
      <h2>Changes</h2>
      <p>We may update this policy. The effective date at the top of the page shows when it last changed.</p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage title="Terms of Use" crumb="Terms">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Information only</h2>
      <p>Content on this site, including resources and home maintenance guidance, is general information. It is not professional advice for your specific situation. Some work legally requires a licensed professional or permit; when in doubt, consult a qualified professional.</p>
      <h2>Quotes and services</h2>
      <p>Nothing on this website is an offer or a binding quote. Services, programs and availability are confirmed only in a written agreement.</p>
      <h2>Employment and training</h2>
      <p>Submitting an interest form does not create an offer of employment, training placement, ownership or partnership.</p>
      <h2>Imagery</h2>
      <p>{site.imageryNote}</p>
      <h2>Intellectual property</h2>
      <p>The Level Headed name, logos and site content belong to {site.companyName}. Please do not reuse them without permission.</p>
      <h2>Limitation of liability</h2>
      <p>To the extent permitted by law, we are not liable for losses arising from use of this website or reliance on its general information.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.</p>
    </LegalPage>
  );
}

export function Accessibility() {
  return (
    <LegalPage title="Accessibility" crumb="Accessibility">
      <p>
        We want everyone to be able to use this website. It is designed to meet the Web Content Accessibility Guidelines (WCAG)
        2.1 Level AA, in keeping with the Accessibility for Ontarians with Disabilities Act (AODA).
      </p>
      <h2>What we’ve done</h2>
      <ul>
        <li>Keyboard navigation with visible focus and a skip link.</li>
        <li>Colour contrast that meets AA guidelines.</li>
        <li>Descriptive text alternatives for images.</li>
        <li>Labelled forms with clear error messages.</li>
        <li>Respect for reduced-motion settings.</li>
      </ul>
      <h2>Need something in another format?</h2>
      <p>If any part of this site is hard to use, or you need information or a form in another format, please <Link to="/contact?type=general">contact us</Link> and we’ll help.</p>
    </LegalPage>
  );
}
