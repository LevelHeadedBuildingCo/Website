import siteJson from './site.json';
import servicesJson from './services.json';
import projectsJson from './projects.json';
import teamJson from './team.json';
import academyJson from './academy.json';
import workshopsJson from './workshops.json';
import crewJson from './crew.json';
import impactJson from './impact.json';
import testimonialsJson from './testimonials.json';
import articlesJson from './articles.json';
import type {
  AcademyProgram, Article, CrewOpening, CrewPathway, ImpactMetric, Project, ProjectCategory,
  Service, SiteConfig, TeamMember, Testimonial, Workshop,
} from './types';

/**
 * Drafts (published: false) are hidden on the live site. Set VITE_SHOW_DRAFTS=true
 * on a Cloudflare preview deployment, or run `npm run dev`, to review them first.
 */
export const showDrafts = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === 'true';
const live = <T extends { published: boolean }>(items: T[]) => items.filter((i) => i.published || showDrafts);

export const site = siteJson as SiteConfig;
export const services = servicesJson.items as Service[];
export const projects = live(projectsJson.items as Project[]);
export const team = live(teamJson.items as TeamMember[]);
export const academyPrograms = academyJson.programs as AcademyProgram[];
export const workshopTopics = academyJson.workshopTopics as { title: string; text: string }[];
export const academyBadge = { src: academyJson.badge as string, alt: academyJson.badgeAlt as string };
export const workshops = live(workshopsJson.items as Workshop[]).sort((a, b) => a.date.localeCompare(b.date));
export const crewPathways = crewJson.pathways as CrewPathway[];
export const crewOpenings = live(crewJson.openings as CrewOpening[]);
export const impactMetrics = impactJson.items as ImpactMetric[];
export const testimonials = (testimonialsJson.items as Testimonial[]).filter((t) => t.approved);
export const articles = live(articlesJson.items as Article[]).sort((a, b) => b.date.localeCompare(a.date));

export const projectCategories: ProjectCategory[] = [
  'Residential', 'Renovations', 'Housing', 'Commercial', 'Panelized Construction', 'Community Projects',
];

export const articleCategories = [
  'Women in Construction', 'Home Maintenance', 'Construction Advice', 'Career Development',
  'Training and Events', 'Housing and Community', 'Company News',
];

export const hasContact = Boolean(site.contact.email || site.contact.phone);
