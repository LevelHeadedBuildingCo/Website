import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75,
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false, ...props,
});

export const ArrowRight = (p: P) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Chevron = (p: P) => (<svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>);
export const Menu = (p: P) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Close = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Check = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const House = (p: P) => (<svg {...base(p)}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>);
export const Hammer = (p: P) => (<svg {...base(p)}><path d="M14 4l6 6-2.5 2.5-6-6z" /><path d="M11.5 6.5L3 15l3 3 8.5-8.5" /></svg>);
export const HardHat = (p: P) => (<svg {...base(p)}><path d="M3 17h18" /><path d="M5 17v-3a7 7 0 0114 0v3" /><path d="M10 7.5V5h4v2.5" /></svg>);
export const Users = (p: P) => (<svg {...base(p)}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.6" /><path d="M16 14.2c2.9.3 5 2.7 5 5.8" /></svg>);
export const Rise = (p: P) => (<svg {...base(p)}><path d="M4 19h16" /><path d="M6 15l4-4 3 3 6-6" /><path d="M15 8h4v4" /></svg>);
export const Blueprint = (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="M7 16V9l5-3 5 3v7" /><path d="M10 16v-3h4v3" /></svg>);
export const Ruler = (p: P) => (<svg {...base(p)}><path d="M3 16.5L16.5 3 21 7.5 7.5 21z" /><path d="M7 12.5l1.5 1.5M10 9.5l1.5 1.5M13 6.5l1.5 1.5" /></svg>);
export const Handshake = (p: P) => (<svg {...base(p)}><path d="M2 12l4-4 4 2 3-2 3 1 6 3" /><path d="M6 8v6l5 4 2-1 4-3" /><path d="M11 12l2 2" /></svg>);
export const Calendar = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const Mail = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3 7l9 6 9-6" /></svg>);
export const Phone = (p: P) => (<svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>);
export const MapPin = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Book = (p: P) => (<svg {...base(p)}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19V5" /><path d="M8 7h7" /></svg>);
export const Shield = (p: P) => (<svg {...base(p)}><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>);
export const Leaf = (p: P) => (<svg {...base(p)}><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19l8-8" /></svg>);
export const Level = (p: P) => (<svg {...base(p)}><rect x="2" y="9" width="20" height="6" rx="1" /><rect x="10" y="10.5" width="4" height="3" rx="1.5" /></svg>);
export const Wrench = (p: P) => (<svg {...base(p)}><path d="M14.5 6.5a4 4 0 005 5L13 18a2.1 2.1 0 01-3-3z" /><path d="M14.5 6.5L12 4a4 4 0 00-5 5l2.5 2.5" /></svg>);
export const Panels = (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="7" height="16" /><rect x="14" y="4" width="7" height="16" /><path d="M3 12h7M14 12h7M6.5 4v16M17.5 4v16" /></svg>);
export const Clipboard = (p: P) => (<svg {...base(p)}><rect x="5" y="4" width="14" height="17" rx="1.5" /><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" /></svg>);
export const Building = (p: P) => (<svg {...base(p)}><path d="M4 21V5l8-2v18M12 8h8v13" /><path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" /><path d="M2 21h20" /></svg>);
export const KeyHouse = (p: P) => (<svg {...base(p)}><path d="M3 11l9-7 9 7v9H3z" /><circle cx="12" cy="13" r="2" /><path d="M12 15v3" /></svg>);
export const Spark = (p: P) => (<svg {...base(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></svg>);

/** The roofline motif from the LH mark — decorative linework only, not the logo. */
export const RoofLine = (p: P) => (
  <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" aria-hidden="true" focusable="false" {...p}>
    <path d="M10 56L100 6l90 50" />
  </svg>
);

/** Architectural corner linework used as restrained decoration. */
export const CornerLines = (p: P) => (
  <svg viewBox="0 0 340 340" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false" {...p}>
    <path d="M40 300L170 190l130 110" />
    <path d="M70 300V215M270 300V215M70 255h200M110 300v-75M150 300v-95M190 300v-95M230 300v-75" />
    <path d="M20 320h320M20 330h320" strokeDasharray="4 6" />
    <circle cx="170" cy="190" r="6" />
    <path d="M170 60v100M120 110h100" strokeDasharray="2 5" />
  </svg>
);
