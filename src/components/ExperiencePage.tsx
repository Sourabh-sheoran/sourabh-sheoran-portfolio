import { useState } from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Code2,
  Building2,
  Layers,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { SourabhLogo } from './SourabhLogo';
import { Experience3DHero } from './Experience3DHero';
import {
  EXPERIENCES_DATA,
  EDUCATION_DATA,
} from '../data/experienceData';

const InstagramIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

interface ExperiencePageProps {
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateCertifications: () => void;
  onNavigateContact: () => void;
  onOpenContact: () => void;
}

export function ExperiencePage({
  onNavigateHome,
  onNavigateProjects,
  onNavigateCertifications,
  onNavigateContact,
  onOpenContact,
}: ExperiencePageProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES_DATA[0].id);

  const currentExp =
    EXPERIENCES_DATA.find((e) => e.id === activeExpId) || EXPERIENCES_DATA[0];

  return (
    <div className="min-h-screen w-full bg-studio-dark text-[#efeee9] font-hn overflow-x-hidden selection:bg-[#C6A15B]/30 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        activeTab="experience"
        onNavigate={(tabId) => {
          if (tabId === 'about') onNavigateHome();
          else if (tabId === 'projects') onNavigateProjects();
          else if (tabId === 'certifications') onNavigateCertifications();
          else if (tabId === 'contact') onNavigateContact();
        }}
        onOpenContact={onOpenContact}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* 2. Hero Section with 3D Object */}
      <section className="relative pt-28 sm:pt-36 pb-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Title & Overview */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 w-max mb-5 text-[#C6A15B] text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CURRENTLY WORKING AT ARIEDGE.AI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F5F1EA] leading-[1.15]">
              Experience &amp; <br />
              <span className="text-[#C6A15B]">Engineering Career.</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#C9C5CC] font-normal leading-relaxed max-w-xl">
              Building resilient web architectures, enterprise full-stack solutions,
              and intuitive interfaces. Currently developing core features for{' '}
              <span className="text-white font-medium">BallotNow</span> at{' '}
              <span className="text-[#C6A15B] font-medium">Ariedge.ai</span>.
            </p>

            {/* Quick Metrics Strip */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  2+
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  Industry Roles
                </div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-bold text-[#C6A15B] tracking-tight">
                  Live
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  E-Voting Platform
                </div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="text-lg sm:text-2xl font-bold text-sky-400 tracking-tight">
                  10k+
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  Daily Users Served
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Beacon */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full max-w-[480px] aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <Experience3DHero />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between text-[11px] text-white/40 font-mono">
                <span>// LIVE 3D PREVIEW</span>
                <span>INTERACTIVE TILT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Experience Timeline & Detail Card */}
      <section className="relative py-12 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Work History
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1">
              Select an experience to inspect detailed contributions, tech stacks, and metrics.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {EXPERIENCES_DATA.map((exp) => {
              const isSelected = exp.id === activeExpId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#C6A15B] text-[#1a1c20] font-semibold shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{exp.company}</span>
                  {exp.isCurrent && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-black' : 'bg-emerald-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {EXPERIENCES_DATA.map((exp) => {
              const isSelected = exp.id === activeExpId;
              if (!isSelected) return null;

              return (
                <div
                  key={exp.id}
                  className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 shadow-2xl relative overflow-hidden anim-fade-up"
                  style={{
                    borderColor: `${exp.accentColor}33`,
                  }}
                >
                  {/* Accent Top Border Glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${exp.accentColor}, transparent)`,
                    }}
                  />

                  {/* Header Row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        {exp.isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Current
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-white/5 text-white/60 border border-white/10">
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-white/70">
                        <span className="font-semibold text-[#C6A15B] flex items-center gap-1.5">
                          <Building2 size={14} />
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-white/50">
                          <Calendar size={13} />
                          {exp.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-white/50">
                          <MapPin size={13} />
                          {exp.location} ({exp.type})
                        </span>
                      </div>
                    </div>

                    {exp.companyUrl && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
                      >
                        <span>Visit Company</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  {/* Featured Product Highlight (e.g., BallotNow) */}
                  {exp.featuredProject && (
                    <div className="mt-6 p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#C6A15B] flex items-center gap-1.5">
                          <Sparkles size={12} />
                          Core Product In Development
                        </span>
                        <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-white/10">
                          {exp.featuredProject.name}
                        </span>
                      </div>
                      <div className="font-medium text-sm text-white/90">
                        {exp.featuredProject.tagline}
                      </div>
                      <p className="text-xs sm:text-[13px] text-white/60 mt-1 leading-relaxed">
                        {exp.featuredProject.description}
                      </p>
                    </div>
                  )}

                  {/* Responsibilities / Impact list */}
                  <div className="mt-6">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                      <Layers size={13} />
                      Key Contributions &amp; Scope
                    </h4>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-relaxed group"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-[#C6A15B] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                          />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                      <Code2 size={13} />
                      Technologies &amp; Tools Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] text-white/90 border border-white/10 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side Column: Metrics & Timeline Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Metrics Breakdown */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
                Role Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {currentExp.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/40 border border-white/5"
                  >
                    <div className="text-xs text-white/40">{metric.label}</div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Experience Selector List */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                <Briefcase size={14} />
                All Engagements
              </h3>
              <div className="space-y-3">
                {EXPERIENCES_DATA.map((exp) => {
                  const isSelected = exp.id === activeExpId;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExpId(exp.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-white/[0.08] border-[#C6A15B] text-white shadow-lg'
                          : 'bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs sm:text-sm text-white">
                          {exp.company}
                        </div>
                        <div className="text-[11px] text-white/50 mt-0.5">
                          {exp.role}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-white/40 block">
                          {exp.period.split('–')[0]}
                        </span>
                        {exp.isCurrent && (
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Education & Leadership Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                <GraduationCap size={15} />
                Education
              </h3>
              <div className="font-bold text-sm text-white">
                {EDUCATION_DATA.institution}
              </div>
              <div className="text-xs text-[#C6A15B] mt-0.5">
                {EDUCATION_DATA.degree}
              </div>
              <div className="text-[11px] text-white/40 mt-1">
                {EDUCATION_DATA.campus} • {EDUCATION_DATA.period}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1.5">
                  <Trophy size={12} className="text-[#C6A15B]" />
                  Leadership &amp; Achievements
                </h4>
                <ul className="space-y-1.5">
                  {EDUCATION_DATA.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-[11px] text-white/70 flex items-start gap-2"
                    >
                      <span className="text-[#C6A15B] font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Call-To-Action Banner */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#1c1f24] via-[#121417] to-[#0b0d0f] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking for a dedicated developer?
            </h3>
            <p className="text-sm text-white/60 mt-2 max-w-lg">
              Explore my live full-stack projects or connect with me to discuss upcoming
              opportunities, internships, and engineering roles.
            </p>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={onNavigateProjects}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <span>View Projects</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-lg bg-[#C6A15B] hover:bg-[#d6b66a] text-[#1a1c20] text-xs font-bold transition-all shadow-[0_4px_20px_rgba(198,161,91,0.3)]"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* 5. Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        <aside
          className={`absolute top-0 bottom-0 right-0 w-[78%] max-w-sm bg-[#222224] p-8 flex flex-col justify-between transition-transform duration-400 ease-out ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <SourabhLogo size={24} />
                <span className="font-semibold text-xs tracking-widest text-white">
                  SOURABH SHEORAN
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="text-white hover:opacity-75 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-5">
              {[
                { name: 'About', href: '#about', id: 'about' },
                { name: 'Projects', href: '#projects', id: 'projects' },
                { name: 'Experience', href: '#experience', id: 'experience' },
                { name: 'Certifications', href: '#certifications', id: 'certifications' },
                { name: 'Contact', href: '#contact', id: 'contact' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setDrawerOpen(false);
                    if (link.id === 'about') {
                      e.preventDefault();
                      onNavigateHome();
                    } else if (link.id === 'projects') {
                      e.preventDefault();
                      onNavigateProjects();
                    } else if (link.id === 'certifications') {
                      e.preventDefault();
                      onNavigateCertifications();
                    } else if (link.id === 'contact') {
                      e.preventDefault();
                      onOpenContact();
                    }
                  }}
                  className={`text-2xl font-light tracking-tight transition-colors ${
                    link.id === 'experience'
                      ? 'text-white font-normal'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">
              Connect
            </p>
            <div className="flex items-center gap-5 text-white/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                <LinkedinIcon />
              </a>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenContact();
                }}
                className="hover:text-white focus:outline-none"
              >
                <MailIcon />
              </button>
            </div>
            <div className="mt-6 text-[10px] text-white/40 tracking-wider">
              © 2026 SOURABH SHEORAN
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
