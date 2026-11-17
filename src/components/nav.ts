export interface NavChild { label: string; to: string; blurb?: string }
export interface NavItem { label: string; to?: string; children?: NavChild[] }

export const navigation: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: 'About Us', to: '/about', blurb: 'Our story, mission and leadership' },
      { label: 'Community & Impact', to: '/community-impact', blurb: 'The difference we’re here to make' },
      { label: 'Partners & Opportunities', to: '/partners', blurb: 'Work with us on projects and programs' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Construction Services', to: '/services', blurb: 'Residential, housing, commercial and more' },
      { label: 'Our Work', to: '/our-work', blurb: 'Project portfolio' },
    ],
  },
  { label: 'Academy', to: '/academy' },
  { label: 'Join the Crew', to: '/join-the-crew' },
  { label: 'Resources & Events', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];
