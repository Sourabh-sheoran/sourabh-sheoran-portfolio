export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  isCurrent: boolean;
  featuredProject?: {
    name: string;
    tagline: string;
    description: string;
  };
  summary: string;
  responsibilities: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  glowColor: string;
  badge: string;
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'ariedge-ai',
    role: 'Full Stack Developer Intern',
    company: 'Ariedge.ai',
    companyUrl: 'https://ariedge.ai',
    period: 'Sep 2026 – Present',
    location: 'Remote',
    type: 'Internship',
    isCurrent: true,
    badge: 'Current Role',
    featuredProject: {
      name: 'BallotNow',
      tagline: 'Enterprise-Grade Live E-Voting Platform',
      description:
        'A next-generation electronic voting and governance platform ensuring transparent voter participation, candidate management, and real-time ballot tallying.',
    },
    summary:
      'Working on BallotNow across frontend and backend in a full-stack capacity, architecting scalable REST APIs, building interactive UI flows, and developing the candidate portal.',
    responsibilities: [
      'Engineered core features for BallotNow, a live e-voting platform, handling both UI client experiences and backend services.',
      'Designed and redesigned high-fidelity UI screens, optimizing user journey flows, accessibility, and visual aesthetics across existing pages.',
      'Constructed scalable backend routes and RESTful APIs, connecting them to React frontend with resilient error handling and fast data fetching.',
      'Spearheaded the Candidate Portal UI end-to-end with supporting API integration; debugged and resolved complex issues across UI and API layers.',
      'Collaborated closely with cross-functional engineering leads to ensure low-latency performance and high reliability for live election events.',
    ],
    technologies: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'REST APIs',
      'PostgreSQL',
      'Tailwind CSS',
      'Docker',
      'Git',
    ],
    metrics: [
      { label: 'Role Focus', value: 'Full-Stack' },
      { label: 'Key Product', value: 'BallotNow' },
      { label: 'Core Tech', value: 'MERN / TS' },
      { label: 'Work Mode', value: 'Remote' },
    ],
    accentColor: '#C6A15B',
    glowColor: 'rgba(198, 161, 91, 0.35)',
  },
  {
    id: 'galcare-pharma',
    role: 'Frontend Developer',
    company: 'Galcare Pharmaceuticals',
    companyUrl: 'https://galcare.com',
    period: 'May 2026 – Aug 2026',
    location: 'Hybrid',
    type: 'Internship',
    isCurrent: false,
    badge: 'Pharmaceutical Platform',
    featuredProject: {
      name: 'Galcare Enterprise Portal',
      tagline: 'Live Healthcare & Formulations Architecture',
      description:
        'Corporate pharmaceutical digital presence managing 140+ formulations, compliance portfolios, and clinical product discovery for healthcare practitioners.',
    },
    summary:
      'Built responsive, high-traffic user interfaces for a live pharmaceutical platform with 10,000+ daily visitors, delivering client presentations and rigorous QA accuracy.',
    responsibilities: [
      'Engineered responsive, accessible UI modules for a live pharmaceutical platform serving 10,000+ daily visitors within existing system architecture.',
      'Presented regular UI updates and design iterations directly to 15+ clients, driving a measurable 20% boost in user engagement.',
      'Conducted exhaustive cross-browser and cross-device testing across 10+ viewport matrix environments, achieving 99.9% layout accuracy before deployment.',
      'Optimized asset loading, web typography, and component render cycles for peak performance across slow network connections.',
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'REST APIs',
      'UI/UX Design',
      'Cross-Device QA',
    ],
    metrics: [
      { label: 'Daily Traffic', value: '10,000+' },
      { label: 'Client Engagement', value: '+20%' },
      { label: 'Layout Accuracy', value: '99.9%' },
      { label: 'Client Demos', value: '15+ Clients' },
    ],
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
  },
];

export const EDUCATION_DATA = {
  degree: 'B.Tech in Computer Science & Engineering',
  institution: 'Vellore Institute of Technology',
  campus: 'Bhopal, India',
  period: 'Sep 2022 – Oct 2026',
  highlights: [
    'Top 10 Finalist, Health4Hack Hackathon (IIIT Delhi)',
    'Top 50, JustPay National Hackathon',
    'Director of Event Management, Health-O-Tech Club (led 10+ workshops with 200+ attendees)',
    'Discipline Committee Lead, Advitya (VIT) – oversaw operations for 5000+ attendees',
    'Sponsorship & Marketing Coordinator, Pahadi Club & NSS Core Member (250+ service hours)',
  ],
};
