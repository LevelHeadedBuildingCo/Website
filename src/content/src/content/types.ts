// Shapes of the editable content files in this folder.
// Edit the .json files (directly on GitHub, or through /admin) — not this file.

export type ServiceStatus = 'inquiries' | 'planned';

export interface SiteConfig {
  companyName: string;
  shortName: string;
  /** Production URL, e.g. https://www.yourdomain.ca — leave blank until the domain is confirmed. */
  siteUrl: string;
  locationLabel: string;
  serviceArea: string[];
  contact: {
    /** Leave blank until confirmed. Blank values are never shown on the site. */
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    hours: string;
  };
  social: { label: string; url: string }[];
  announcement: { enabled: boolean; text: string; linkLabel: string; linkUrl: string };
  newsletter: { enabled: boolean; heading: string; text: string };
  imageryNote: string;
  legal: { reviewed: boolean; effectiveDate: string; privacyContactEmail: string };
}

export interface Service {
  slug: string;
  title: string;
  status: ServiceStatus;
  statusNote?: string;
  summary: string;
  audience?: string;
  includes: string[];
  image?: string;
  imageAlt?: string;
  ctaLabel: string;
  ctaInquiry: string;
}

export type ProjectCategory =
  | 'Residential'
  | 'Renovations'
  | 'Housing'
  | 'Commercial'
  | 'Panelized Construction'
  | 'Community Projects';

export interface Project {
  slug: string;
  published: boolean;
  title: string;
  location: string;
  categories: ProjectCategory[];
  projectType: string;
  scope: string[];
  coverImage: string;
  coverAlt: string;
  gallery: { src: string; alt: string }[];
  description: string;
  challenges?: string;
  solutions?: string;
  outcomes?: string;
  testimonial?: { quote: string; name: string; role?: string; approved: boolean };
  completed?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  bioApproved: boolean;
  photo: string;
  photoAlt: string;
  photoApproved: boolean;
  published: boolean;
}

export interface AcademyProgram {
  slug: string;
  title: string;
  status: 'open' | 'planned' | 'waitlist';
  audience: string;
  summary: string;
  topics: string[];
}

export interface Workshop {
  slug: string;
  published: boolean;
  title: string;
  date: string; // ISO date, e.g. 2027-03-14
  time: string;
  location: string;
  description: string;
  capacity: string;
  cost: string;
  registration: 'open' | 'waitlist' | 'full' | 'closed' | 'interest';
  registrationUrl?: string;
}

export interface CrewPathway {
  title: string;
  text: string;
}

export interface CrewOpening {
  slug: string;
  published: boolean;
  title: string;
  type: string;
  location: string;
  summary: string;
  postedDate: string;
  closingDate?: string;
}

export interface Article {
  slug: string;
  published: boolean;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  seoTitle?: string;
  seoDescription?: string;
  body: string; // Markdown
}

export interface ImpactMetric {
  key: string;
  label: string;
  value: string; // leave blank until verified
  verified: boolean;
  asOf: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  approved: boolean;
}
