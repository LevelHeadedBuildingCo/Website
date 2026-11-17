import type { ReactElement } from 'react';
import { articles, projects, site } from './content';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { OurWork, ProjectDetail } from './pages/OurWork';
import { Academy } from './pages/Academy';
import { JoinTheCrew } from './pages/JoinTheCrew';
import { CommunityImpact } from './pages/CommunityImpact';
import { Partners } from './pages/Partners';
import { Resources, ArticleDetail } from './pages/Resources';
import { Contact } from './pages/Contact';
import { Privacy, Terms, Accessibility } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { FoundingCircle } from './pages/FoundingCircle';
import foundingCircle from './content/founding-circle.json';

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object[];
}

interface StaticRoute { path: string; meta: PageMeta; render: () => ReactElement; priority?: number }

const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: site.companyName,
  description: 'Women-led construction company and workforce development social enterprise based in Midland, Ontario.',
  slogan: 'Changing who gets to build the future.',
  logo: '/brand/lh-logo-dark.png',
  image: '/images/brand/hero-portrait.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.contact.city,
    addressRegion: site.contact.province,
    addressCountry: 'CA',
    ...(site.contact.streetAddress ? { streetAddress: site.contact.streetAddress, postalCode: site.contact.postalCode } : {}),
  },
  areaServed: site.serviceArea.map((name) => ({ '@type': 'Place', name: `${name}, Ontario` })),
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
  knowsAbout: ['Renovations', 'Accessibility renovations', 'Social housing unit turnovers', 'Construction management', 'Panelized construction', 'Women in construction training'],
});

export const staticRoutes: StaticRoute[] = [
  {
    path: '/', priority: 1.0, render: () => <Home />,
    meta: {
      title: 'Level Headed Building Co. | Women-Led Construction Company in Midland, Ontario',
      description: 'A women-led construction company in Midland, Ontario. Renovations, accessibility upgrades, housing-provider unit turnovers and construction management across Simcoe County, Georgian Bay and Muskoka.',
      jsonLd: [orgLd()],
    },
  },
  {
    path: '/about', priority: 0.8, render: () => <About />,
    meta: {
      title: 'About Us | A Women-Led Construction Company in Ontario | Level Headed',
      description: 'Why Level Headed Building Co. exists: professional construction services delivered by experienced women, with real pathways for the next generation of tradeswomen.',
    },
  },
  {
    path: '/services', priority: 0.9, render: () => <Services />,
    meta: {
      title: 'Construction Services in Simcoe County, Georgian Bay & Muskoka | Level Headed',
      description: 'Residential renovations, accessibility upgrades, social and co-operative housing unit turnovers, construction management, consulting and panelized construction partnerships in Ontario.',
    },
  },
  {
    path: '/our-work', priority: 0.7, render: () => <OurWork />,
    meta: {
      title: 'Our Work | Construction Projects | Level Headed Building Co.',
      description: 'Residential, renovation, housing, commercial, panelized and community projects by Level Headed Building Co. in the Georgian Bay region.',
    },
  },
  {
    path: '/academy', priority: 0.9, render: () => <Academy />,
    meta: {
      title: 'Level Headed Academy | Women in Construction Training in Ontario',
      description: 'Women-only home maintenance workshops, trades career exploration, apprenticeship pathways, mentorship and leadership training in Midland and the Georgian Bay area.',
    },
  },
  {
    path: '/join-the-crew', priority: 0.9, render: () => <JoinTheCrew />,
    meta: {
      title: 'Join the Crew | Women in Trades Careers & Apprenticeships | Level Headed',
      description: 'Experienced tradeswomen, apprentices, site leaders and career changers: connect with a women-led construction company building something different in Ontario.',
    },
  },
  {
    path: '/community-impact', priority: 0.7, render: () => <CommunityImpact />,
    meta: {
      title: 'Community & Impact | A Women-in-Construction Social Enterprise | Level Headed',
      description: 'How Level Headed creates paid pathways, mentorship and leadership for women in construction, and how you can support the mission.',
    },
  },
  {
    path: '/partners', priority: 0.8, render: () => <Partners />,
    meta: {
      title: 'Partners & Opportunities | Housing, Workforce & Construction Partnerships',
      description: 'Municipalities, housing providers, developers, contractors, colleges and sponsors: partner with Level Headed on construction, housing and workforce development.',
    },
  },
  {
    path: '/resources', priority: 0.6, render: () => <Resources />,
    meta: {
      title: 'Resources & Events | Home Maintenance, Careers & Construction Advice',
      description: 'Practical home maintenance guidance, construction advice, women in construction career resources, and upcoming Level Headed events.',
    },
  },
  {
    path: '/contact', priority: 0.9, render: () => <Contact />,
    meta: {
      title: 'Contact Us | Request a Construction Quote | Level Headed Building Co.',
      description: 'Request a construction quote, ask about construction management, join the crew, or explore training and partnerships with Level Headed Building Co.',
    },
  },
  ...(foundingCircle.published ? [{
    // Private, unlisted invitation page: not in the menu or sitemap, and marked noindex.
    path: '/founding-circle', priority: 0, render: () => <FoundingCircle />,
    meta: {
      title: 'An Invitation to Build Something Different | Level Headed Founding Circle',
      description: 'A private invitation to help shape Level Headed Building Co., a women-owned, women-led construction company in Simcoe County, Ontario.',
      noindex: true,
    },
  }] : []),
  {
    path: '/privacy', priority: 0.2, render: () => <Privacy />,
    meta: { title: 'Privacy Policy | Level Headed Building Co.', description: 'How Level Headed Building Co. collects, uses and protects personal information.' },
  },
  {
    path: '/terms', priority: 0.2, render: () => <Terms />,
    meta: { title: 'Terms of Use | Level Headed Building Co.', description: 'Terms of use for the Level Headed Building Co. website.' },
  },
  {
    path: '/accessibility', priority: 0.2, render: () => <Accessibility />,
    meta: { title: 'Accessibility | Level Headed Building Co.', description: 'Our commitment to an accessible website and how to request information in another format.' },
  },
];

export interface ResolvedRoute { element: ReactElement; meta: PageMeta; status: number }

export function resolveRoute(path: string): ResolvedRoute {
  const s = staticRoutes.find((r) => r.path === path);
  if (s) return { element: s.render(), meta: s.meta, status: 200 };

  const work = path.match(/^\/our-work\/([a-z0-9-]+)$/);
  if (work) {
    const p = projects.find((x) => x.slug === work[1]);
    if (p) {
      return {
        element: <ProjectDetail project={p} />, status: 200,
        meta: { title: `${p.title} | ${p.location} | Level Headed Building Co.`, description: p.description.slice(0, 155), image: `${p.coverImage}${/\.\w+$/.test(p.coverImage) ? '' : '.jpg'}` },
      };
    }
  }
  const art = path.match(/^\/resources\/([a-z0-9-]+)$/);
  if (art) {
    const a = articles.find((x) => x.slug === art[1]);
    if (a) {
      const image = `${a.featuredImage}${/\.\w+$/.test(a.featuredImage) ? '' : '.jpg'}`;
      return {
        element: <ArticleDetail article={a} />, status: 200,
        meta: {
          title: a.seoTitle || `${a.title} | Level Headed Building Co.`,
          description: a.seoDescription || a.excerpt,
          image, type: 'article',
          jsonLd: [{
            '@context': 'https://schema.org', '@type': 'Article', headline: a.title, datePublished: a.date,
            author: { '@type': 'Organization', name: a.author }, image,
            publisher: { '@type': 'Organization', name: site.companyName, logo: { '@type': 'ImageObject', url: '/brand/lh-logo-dark.png' } },
          }],
        },
      };
    }
  }
  return {
    element: <NotFound />, status: 404,
    meta: { title: 'Page not found | Level Headed Building Co.', description: 'The page you were looking for could not be found.', noindex: true },
  };
}

/** Every path that should be pre-rendered to static HTML (used by scripts/prerender.mjs). */
export function allPaths(): { path: string; priority: number }[] {
  return [
    ...staticRoutes.map((r) => ({ path: r.path, priority: r.priority ?? 0.5 })),
    ...projects.map((p) => ({ path: `/our-work/${p.slug}`, priority: 0.6 })),
    ...articles.map((a) => ({ path: `/resources/${a.slug}`, priority: 0.5 })),
  ];
}
