export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'Web Apps' | 'Dashboards' | 'AI & Full-Stack';
  subtitle: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  themeColor: string;
  glowColor: string;
  stats: { label: string; value: string }[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isGitHubLive?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'chatapp',
    number: '01',
    title: 'ChatApp',
    category: 'Web Apps',
    subtitle: 'Real-Time Communication Platform',
    description:
      'Real-time chat application with modern UI, authentication, instant messaging, and media sharing. Built with WebSocket connectivity for high responsiveness and seamless real-time conversations.',
    tags: ['MERN', 'Socket.io', 'TailwindCSS', 'JWT', 'Node.js'],
    repoUrl: 'https://github.com/Sourabh-sheoran/Chat-App-main',
    liveUrl: 'https://chat-app-x430.onrender.com',
    themeColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    stats: [
      { label: 'Latency', value: '< 45ms' },
      { label: 'Protocol', value: 'WebSockets' },
      { label: 'Auth', value: 'JWT + BCrypt' },
    ],
  },
  {
    id: 'soryat',
    number: '02',
    title: 'SORYAT',
    category: 'Web Apps',
    subtitle: 'Modern Digital Experience Platform',
    description:
      'High-performance web platform and digital experience developed with modern frontend architecture, fluid editorial aesthetics, responsive layouts, and reactive micro-interactions.',
    tags: ['TypeScript', 'React', 'TailwindCSS', 'Vite'],
    repoUrl: 'https://github.com/Sourabh-sheoran/SORYAT',
    liveUrl: 'https://soryat.vercel.app/',
    themeColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    stats: [
      { label: 'Architecture', value: 'Modern SPA' },
      { label: 'Performance', value: '99/100 Lighthouse' },
      { label: 'Type Safety', value: 'Strict TS' },
    ],
  },
  {
    id: 'instant-mechanic',
    number: '03',
    title: 'Instant Mechanic Dashboard',
    category: 'Dashboards',
    subtitle: 'On-Demand Automotive Telemetry & Service Dispatch',
    description:
      'Vehicle diagnostics, workshop dispatch, and telemetry analytics dashboard featuring live service job queues, mechanic status tracking, revenue KPIs, and interactive scheduling.',
    tags: ['TypeScript', 'Next.js', 'TailwindCSS', 'Analytics'],
    repoUrl: 'https://github.com/Sourabh-sheoran/instant-mechanic-dashboard',
    liveUrl: 'https://instantmec.vercel.app/',
    themeColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    stats: [
      { label: 'Active Bays', value: '12 Connected' },
      { label: 'Efficiency', value: '+34% Speed' },
      { label: 'Tracking', value: 'Live Telemetry' },
    ],
  },
  {
    id: 'galcare',
    number: '04',
    title: 'Galcare Pharmaceuticals',
    category: 'Web Apps',
    subtitle: 'Healthcare & Pharmaceutical Platform',
    description:
      'Enterprise pharmaceutical digital platform managing product cataloging, molecular batch specifications, clinical trial pipeline overviews, and healthcare inquiry routing.',
    tags: ['Full-Stack', 'React', 'Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/Sourabh-sheoran/Galcare-Pharmaceuticals',
    liveUrl: 'https://galcare.com/',
    themeColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    stats: [
      { label: 'Formulations', value: '140+ Listed' },
      { label: 'Compliance', value: 'ISO-9001' },
      { label: 'Pipeline', value: 'Phase III Trials' },
    ],
  },
  {
    id: 'smart-resume',
    number: '05',
    title: 'Smart Resume Skill Analyzer',
    category: 'AI & Full-Stack',
    subtitle: 'AI-Powered ATS Score & Skill Gap Checker',
    description:
      'Machine learning application that parses resumes against target job descriptions, computes real-time ATS match scores, detects missing industry keywords, and produces contextual suggestions.',
    tags: ['Python', 'Streamlit', 'NLP', 'Machine Learning', 'GenAI'],
    repoUrl: 'https://github.com/Sourabh-sheoran/smart-resume-skill-analyzer-ats-score-checker',
    liveUrl: 'https://smart-resume-skill-analyzer-ats-score-checker-avcsujymfsszn7tp.streamlit.app/',
    themeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    stats: [
      { label: 'Match Accuracy', value: '94.8%' },
      { label: 'NLP Engine', value: 'TF-IDF + LLM' },
      { label: 'Processing', value: 'Instant (< 2s)' },
    ],
  },
  {
    id: 'job-market',
    number: '06',
    title: 'Job Market & Salary Analytics',
    category: 'Dashboards',
    subtitle: 'Interactive Tech Compensation Intelligence',
    description:
      'Data intelligence dashboard visualizing tech hiring demand, salary percentiles across engineering specializations, geographic market distributions, and key compensation drivers.',
    tags: ['Power BI', 'DAX', 'Data Analysis', 'SQL', 'Excel'],
    repoUrl: 'https://github.com/Sourabh-sheoran/smart-job-market-salary-analytics-dashboard',
    themeColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    stats: [
      { label: 'Data Points', value: '45k+ Roles' },
      { label: 'Calculations', value: 'Custom DAX' },
      { label: 'Visuals', value: 'Dynamic Slicers' },
    ],
  },
  {
    id: 'cryptoapp',
    number: '07',
    title: 'CryptoApp Realtime Tracker',
    category: 'Web Apps',
    subtitle: 'Live Cryptocurrency Market Terminal',
    description:
      'Real-time cryptocurrency price tracker and analytical monitor with live market streaming, historical interactive charts, currency conversions, and volatility indicators.',
    tags: ['JavaScript', 'Python', 'REST API', 'WebSockets', 'Chart.js'],
    repoUrl: 'https://github.com/Sourabh-sheoran/CryptoApp',
    themeColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    stats: [
      { label: 'Assets', value: '250+ Tracked' },
      { label: 'Stream', value: 'Realtime Feed' },
      { label: 'Precision', value: 'Sub-second' },
    ],
  },
];
