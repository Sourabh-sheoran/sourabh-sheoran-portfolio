import { getAssetUrl } from '../utils/assets';

export interface SkillCompetency {
  title: string;
  icon: 'cloud' | 'security' | 'scale' | 'optimize' | 'database' | 'code' | 'ai' | 'network';
}

export interface CertificationItem {
  id: string;
  number: string;
  title: string;
  organization: string;
  issuerLogo: 'aws' | 'udemy' | 'ethnus' | 'coursera' | 'google' | 'certificate';
  description: string;
  tags: string[];
  skillsList: string;
  issueDate: string;
  year: string;
  credentialId?: string;
  regNo?: string;
  verifyUrl: string;
  image?: string;
  competencies: SkillCompetency[];
  glowColor: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'aws-solutions-architect',
    number: '01',
    title: 'AWS Academy Solution Architect',
    organization: 'Amazon Web Services · Ethnus <Codemithra />',
    issuerLogo: 'aws',
    description:
      'Learned to design scalable, secure, and cost-effective distributed systems on AWS. This certification strengthened my understanding of cloud architecture, high availability, and core cloud security.',
    tags: ['AWS', 'Architecture', 'Cloud'],
    skillsList: 'SKILLS • CLOUD • ARCHITECTURE',
    issueDate: 'Apr 25, 2025',
    year: '2025',
    credentialId: '9BJ9D936',
    regNo: '22BCE10695',
    verifyUrl: 'https://ethnus.com/certverify',
    image: getAssetUrl('certificates/aws-solutions-architect.png'),
    competencies: [
      { title: 'Cloud Architecture', icon: 'cloud' },
      { title: 'Security Best Practices', icon: 'security' },
      { title: 'Scalable Solutions', icon: 'scale' },
      { title: 'Cost Optimization', icon: 'optimize' },
    ],
    glowColor: 'rgba(255, 153, 0, 0.45)',
  },
  {
    id: 'nextjs-web-dev',
    number: '02',
    title: 'Next.js Web Dev: Master this Powerful React Framework',
    organization: 'Udemy · Meta Brains',
    issuerLogo: 'udemy',
    description:
      'Mastered the modern Next.js 14+ App Router, Server Components (RSC), SSR/SSG/ISR rendering paradigms, Server Actions, API routes, and full-stack performance optimization.',
    tags: ['Next.js', 'React', 'Full Stack'],
    skillsList: 'SKILLS • NEXT.JS • REACT • FULL STACK',
    issueDate: 'Jan 7, 2026',
    year: '2026',
    credentialId: 'UC-e8ac73a8-5ac9-46c7-9cf0-17271cdddf35',
    verifyUrl: 'https://www.udemy.com/certificate/UC-e8ac73a8-5ac9-46c7-9cf0-17271cdddf35/',
    image: getAssetUrl('certificates/nextjs-web-dev.png'),
    competencies: [
      { title: 'App Router & RSC', icon: 'code' },
      { title: 'SSR & Edge Rendering', icon: 'scale' },
      { title: 'Server Actions & APIs', icon: 'security' },
      { title: 'Production Performance', icon: 'optimize' },
    ],
    glowColor: 'rgba(164, 53, 240, 0.45)',
  },
  {
    id: 'google-networking',
    number: '03',
    title: 'The Bits and Bytes of Computer Networking',
    organization: 'Google · Coursera',
    issuerLogo: 'google',
    description:
      'In-depth study of computer networking fundamentals: the five-layer OSI/TCP-IP model, IP addressing & subnetting, routing algorithms, DNS, DHCP, NAT, and network cryptography.',
    tags: ['Google', 'Networking', 'Security'],
    skillsList: 'SKILLS • NETWORKING • TCP/IP • SECURITY',
    issueDate: 'Feb 7, 2024',
    year: '2024',
    credentialId: 'XSHTSNB3ZFZQ',
    verifyUrl: 'https://coursera.org/verify/XSHTSNB3ZFZQ',
    image: getAssetUrl('certificates/google-networking.png'),
    competencies: [
      { title: 'TCP/IP & OSI Models', icon: 'network' },
      { title: 'Routing & Subnetting', icon: 'scale' },
      { title: 'DNS & Infrastructure', icon: 'cloud' },
      { title: 'Network Security', icon: 'security' },
    ],
    glowColor: 'rgba(66, 133, 244, 0.45)',
  },
  {
    id: 'sql-data-analysts',
    number: '04',
    title: 'SQL for Data Analysts',
    organization: 'Udemy · Imran R (Chartered Engineer)',
    issuerLogo: 'udemy',
    description:
      'Gained hands-on knowledge of SQL for data analytics: complex relational joins, nested subqueries, window functions, CTEs, aggregation pipelines, and industry query optimization.',
    tags: ['SQL', 'Data Analysis', 'Relational DB'],
    skillsList: 'SKILLS • SQL • DATA ANALYSIS • QUERY OPTIMIZATION',
    issueDate: 'Nov 27, 2024',
    year: '2024',
    credentialId: 'UC-a30b8481-2006-4015-a4f2-b527eacbcd5d',
    verifyUrl: 'https://ude.my/UC-a30b8481-2006-4015-a4f2-b527eacbcd5d',
    image: getAssetUrl('certificates/udemy-sql.png'),
    competencies: [
      { title: 'Window Functions & CTEs', icon: 'database' },
      { title: 'Complex Joins & Aggs', icon: 'code' },
      { title: 'Data Cleaning & Prep', icon: 'scale' },
      { title: 'Query Performance Tuning', icon: 'optimize' },
    ],
    glowColor: 'rgba(164, 53, 240, 0.45)',
  },
  {
    id: 'mern-fullstack',
    number: '05',
    title: 'MERN Full Stack Development',
    organization: 'Ethnus <Codemithra />',
    issuerLogo: 'ethnus',
    description:
      'Completed an intensive engineering program spanning MongoDB, Express.js, React, Node.js, JWT authentication, state management, and cloud deployment pipelines.',
    tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
    skillsList: 'SKILLS • MERN • REACT • NODE • MONGODB',
    issueDate: 'Apr 25, 2025',
    year: '2025',
    credentialId: '34HSDX45',
    regNo: '22BCE10695',
    verifyUrl: 'https://ethnus.com/certverify',
    image: getAssetUrl('certificates/mern-fullstack.png'),
    competencies: [
      { title: 'React Frontend Architecture', icon: 'code' },
      { title: 'RESTful API Engineering', icon: 'scale' },
      { title: 'NoSQL Schema Modeling', icon: 'database' },
      { title: 'Auth & Route Protection', icon: 'security' },
    ],
    glowColor: 'rgba(249, 115, 22, 0.45)',
  },
  {
    id: 'google-ai-essentials',
    number: '06',
    title: 'Google AI Essentials',
    organization: 'Google · Coursera',
    issuerLogo: 'google',
    description:
      'Mastered foundational AI concepts and effective generative AI strategies from Google experts, focusing on prompt engineering, productivity augmentation, and AI ethics.',
    tags: ['Google', 'Generative AI', 'Prompt Engineering'],
    skillsList: 'SKILLS • GENERATIVE AI • PROMPT DESIGN • ETHICS',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://coursera.org/share/ee0beffd215e46179350ca9454f53425',
    competencies: [
      { title: 'Generative AI Principles', icon: 'ai' },
      { title: 'Prompt Crafting Strategies', icon: 'code' },
      { title: 'Responsible AI & Ethics', icon: 'security' },
      { title: 'Workflow Automation', icon: 'optimize' },
    ],
    glowColor: 'rgba(52, 168, 83, 0.45)',
  },
  {
    id: 'ai-data-analysis',
    number: '07',
    title: 'AI for Data Analysis',
    organization: 'Google · Coursera',
    issuerLogo: 'coursera',
    description:
      'Leveraged modern generative AI tools and LLMs to accelerate data exploration, anomaly detection, statistical pattern identification, and data storytelling.',
    tags: ['AI', 'Data Analysis', 'Coursera'],
    skillsList: 'SKILLS • AI FOR DATA • PATTERN RECOGNITION',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://coursera.org/share/04be59d9b2fe71c517022e0615252a1f',
    competencies: [
      { title: 'AI-Powered Insights', icon: 'ai' },
      { title: 'Data Summarization', icon: 'database' },
      { title: 'Pattern Recognition', icon: 'scale' },
      { title: 'Reporting Automation', icon: 'optimize' },
    ],
    glowColor: 'rgba(0, 86, 210, 0.45)',
  },
  {
    id: 'ai-content-creation',
    number: '08',
    title: 'AI for Content Creation',
    organization: 'Google · Coursera',
    issuerLogo: 'coursera',
    description:
      'Explored generative AI pipelines for content development, multimodal asset drafting, editorial iteration, and brand-consistent storytelling techniques.',
    tags: ['AI', 'Content Creation', 'Coursera'],
    skillsList: 'SKILLS • CONTENT AI • MULTIMODAL • STORYTELLING',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://coursera.org/share/609db93ec27988bee71ae5e5cd0daff5',
    competencies: [
      { title: 'Multimodal Generation', icon: 'ai' },
      { title: 'Content Iteration', icon: 'code' },
      { title: 'Style & Tone Alignment', icon: 'security' },
      { title: 'Creative Ideation', icon: 'optimize' },
    ],
    glowColor: 'rgba(234, 67, 53, 0.45)',
  },
  {
    id: 'ai-writing-communicating',
    number: '09',
    title: 'AI for Writing and Communicating',
    organization: 'Google · Coursera',
    issuerLogo: 'coursera',
    description:
      'Applied AI language models to refine technical documentation, articulate complex engineering decisions, and enhance professional communication clarity.',
    tags: ['AI', 'Technical Writing', 'Communication'],
    skillsList: 'SKILLS • TECHNICAL WRITING • CLARITY • COMM',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://coursera.org/share/8cdcb701b4a94fce46507d949febebb1',
    competencies: [
      { title: 'Technical Documentation', icon: 'code' },
      { title: 'Communication Synthesis', icon: 'ai' },
      { title: 'Audience Customization', icon: 'scale' },
      { title: 'Editing & Precision', icon: 'optimize' },
    ],
    glowColor: 'rgba(251, 188, 4, 0.45)',
  },
  {
    id: 'ai-research-insights',
    number: '10',
    title: 'AI for Research and Insights',
    organization: 'Google · Coursera',
    issuerLogo: 'coursera',
    description:
      'Harnessed generative AI for rapid literature synthesis, cross-referencing technical documentation, competitive tech analysis, and insight extraction.',
    tags: ['AI', 'Research', 'Insights'],
    skillsList: 'SKILLS • SYNTHESIS • RESEARCH • KNOWLEDGE',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://coursera.org/share/68b685e1a03a2958932250d02bec56b2',
    competencies: [
      { title: 'Rapid Synthesis', icon: 'ai' },
      { title: 'Source Evaluation', icon: 'security' },
      { title: 'Knowledge Mapping', icon: 'database' },
      { title: 'Trend Identification', icon: 'scale' },
    ],
    glowColor: 'rgba(66, 133, 244, 0.45)',
  },
  {
    id: 'ai-brainstorming-planning',
    number: '11',
    title: 'AI for Brainstorming and Planning',
    organization: 'Google · Coursera',
    issuerLogo: 'coursera',
    description:
      'Utilized AI models for structured product roadmapping, engineering architecture brainstorming, edge-case discovery, and agile task decomposition.',
    tags: ['AI', 'Planning', 'Product Strategy'],
    skillsList: 'SKILLS • ROADMAPPING • ARCHITECTURE • PLANNING',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://coursera.org/share/a5971f006f688c3baaf02eba2be17ab3',
    competencies: [
      { title: 'Architecture Brainstorming', icon: 'cloud' },
      { title: 'Edge Case Exploration', icon: 'security' },
      { title: 'Task Decomposition', icon: 'scale' },
      { title: 'Roadmap Structuring', icon: 'optimize' },
    ],
    glowColor: 'rgba(52, 168, 83, 0.45)',
  },
  {
    id: 'aws-cloud-foundations',
    number: '12',
    title: 'AWS Academy Cloud Foundations',
    organization: 'Amazon Web Services (AWS)',
    issuerLogo: 'aws',
    description:
      'Completed foundational training on cloud concepts, AWS core services (EC2, S3, RDS, IAM, VPC), pricing models, and security compliance principles.',
    tags: ['AWS', 'Cloud', 'Foundations'],
    skillsList: 'SKILLS • CLOUD COMPUTING • AWS SERVICES',
    issueDate: '2024',
    year: '2024',
    verifyUrl: 'https://www.credly.com/organizations/amazon-web-services/badges',
    competencies: [
      { title: 'Core AWS Services', icon: 'cloud' },
      { title: 'IAM & Security Groups', icon: 'security' },
      { title: 'Storage & Compute Tiers', icon: 'scale' },
      { title: 'Cloud Economics', icon: 'optimize' },
    ],
    glowColor: 'rgba(255, 153, 0, 0.45)',
  },
];
