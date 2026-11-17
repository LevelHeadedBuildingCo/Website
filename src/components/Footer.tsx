import { Link } from '../lib/router';
import { site } from '../content';
import { Pillars } from './ui';

export function Footer() {
  const { contact } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/brand/lh-logo-light.png" alt="Level Headed Building Co." width={144} height={74} loading="lazy" />
            <p>A women-led construction company based in {site.locationLabel}, serving {site.serviceArea.slice(2).join(', ')} and surrounding communities.</p>
            <Pillars />
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/community-impact">Community &amp; Impact</Link></li>
              <li><Link to="/partners">Partners &amp; Opportunities</Link></li>
              <li><Link to="/resources">Resources &amp; Events</Link></li>
            </ul>
          </div>
          <div>
            <h2>Build &amp; Train</h2>
            <ul>
              <li><Link to="/services">Construction Services</Link></li>
              <li><Link to="/our-work">Our Work</Link></li>
              <li><Link to="/academy">Level Headed Academy</Link></li>
              <li><Link to="/join-the-crew">Join the Crew</Link></li>
            </ul>
          </div>
          <div>
            <h2>Get in touch</h2>
            <ul>
              <li><Link to="/contact?type=quote">Start a Project</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              {contact.email && <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
              {contact.phone && <li><a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a></li>}
              {site.social.map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.companyName.replace(/\.$/, '')}. All rights reserved.</span>
          <span>{site.imageryNote}</span>
          <span><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> · <Link to="/accessibility">Accessibility</Link></span>
        </div>
      </div>
    </footer>
  );
}
