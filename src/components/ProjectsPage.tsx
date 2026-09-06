import { useState, useEffect } from 'react';
import {
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Monitor,
  RefreshCw,
  Star,
  GitBranch,
} from 'lucide-react';
import { Hero3DObject } from './Hero3DObject';
import { LaptopShowcase } from './LaptopShowcase';
import { TechStack3DGrid } from './TechStack3DGrid';
import { PROJECTS_DATA, type ProjectItem } from '../data/projectsData';
import { fetchUserGitHubProjects } from '../services/githubService';
import { Navbar } from './Navbar';
import { SourabhLogo } from './SourabhLogo';

const GithubIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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

interface ProjectsPageProps {
  onNavigateHome: () => void;
  onNavigateCertifications?: () => void;
  onNavigateContact?: () => void;
  onOpenContact: () => void;
}

export function ProjectsPage({
  onNavigateHome,
  onNavigateCertifications,
  onNavigateContact,
  onOpenContact,
}: ProjectsPageProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('chatapp');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamic GitHub Projects Integration
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [totalGithubRepos, setTotalGithubRepos] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  const loadGithubProjects = async (forceRefresh: boolean = false) => {
    setIsSyncing(true);
    try {
      const result = await fetchUserGitHubProjects('Sourabh-sheoran', forceRefresh);
      setProjectsList(result.projects);
      const ghLive = result.projects.filter((p) => p.isGitHubLive).length;
      setTotalGithubRepos(ghLive);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Failed to sync GitHub repos:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadGithubProjects(false);
  }, []);

  // Ensure document and body allow natural vertical scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevHtmlOverflow = document.documentElement.style.overflowY;
    const prevBodyOverflow = document.body.style.overflowY;
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';

    return () => {
      document.documentElement.style.overflowY = prevHtmlOverflow;
      document.body.style.overflowY = prevBodyOverflow;
    };
  }, []);

  const selectedProject =
    projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];

  const filteredProjects =
    activeCategory === 'All'
      ? projectsList
      : activeCategory === 'GitHub Live'
      ? projectsList.filter((p) => p.isGitHubLive)
      : projectsList.filter((p) => p.category === activeCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    scrollToSection('featured');
  };

  return (
    <div className="min-h-screen w-full bg-studio-dark text-[#efeee9] font-hn overflow-x-hidden selection:bg-white selection:text-black">
      {/* 1. Exact Default About Page Navigation */}
      <Navbar
        activeTab="projects"
        onNavigate={(tabId) => {
          if (tabId === 'about') onNavigateHome();
          else if (tabId === 'certifications' && onNavigateCertifications) {
            onNavigateCertifications();
          } else if (tabId === 'contact' && onNavigateContact) {
            onNavigateContact();
          }
        }}
        onOpenContact={onOpenContact}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Mobile Drawer Menu (z-50) matching About page */}
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
          {/* Drawer Top */}
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

            {/* Navigation Links */}
            <nav className="mt-8 flex flex-col gap-5">
              {[
                { name: 'About', href: '#about', id: 'about' },
                { name: 'Projects', href: '#projects', id: 'projects' },
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
                    } else if (link.id === 'contact') {
                      e.preventDefault();
                      onOpenContact();
                    }
                  }}
                  className={`text-2xl font-light tracking-tight transition-colors ${
                    link.id === 'projects' ? 'text-white font-normal' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Bottom */}
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

      {/* 2. Hero Section with 3D Continuous Rotary Hero Object */}
      <section className="relative min-h-[92vh] w-full pt-28 pb-16 px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col justify-between border-b border-white/10">
        <div className="w-full max-w-[1720px] mx-auto flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Huge Headline & Bio */}
            <div className="lg:col-span-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] uppercase tracking-[0.24em] text-white/70 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Selected Works & Interactive Demos</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[0.92]">
                ENGINEERED<br />
                EXPERIENCES<span className="text-white/40">.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl font-light leading-relaxed">
                A curated catalog of full-stack web applications, AI analyzers, and interactive
                dashboards. Each project is engineered with high performance, strict architecture,
                and modern visual aesthetics.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => scrollToSection('featured')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm hover:bg-white/90 active:scale-95 transition-all shadow-xl"
                >
                  <span>Explore 3D Showcase</span>
                  <ChevronDown size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('all-projects')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 text-white text-xs sm:text-sm hover:bg-white/10 transition-all"
                >
                  <span>All Projects ({projectsList.length})</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column: Three.js Continuous 360 Rotary 3D Hero Object */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] lg:min-h-[560px]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] max-w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl" />
              </div>

              <Hero3DObject className="w-full h-[450px] lg:h-[560px] z-10" />

              {/* Floating Badge */}
              <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-white/60">
                360° Realtime Rotary Motion
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section Footer Meta */}
        <div className="w-full max-w-[1720px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-6">
            <span>SHOWROOM // 2026 EDITION</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>INTERACTIVE PREVIEWS</span>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('featured')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </section>

      {/* 3. Section 01 —— 3D LAPTOP SHOWCASE (Dynamic Interactive Visualizer) */}
      <section id="featured" className="py-24 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Header & Quick Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3 text-xs tracking-[0.24em] text-white/55 uppercase font-medium">
              <span>01</span>
              <span className="w-8 h-[1px] bg-white/40" />
              <span>INTERACTIVE 3D SHOWCASE // {selectedProject.title}</span>
            </div>

            {/* Quick Project Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-white/40 mr-1 uppercase tracking-wider hidden sm:inline">
                Select Project:
              </span>
              {PROJECTS_DATA.map((p) => {
                const isActive = p.id === selectedProjectId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-lg scale-105'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: isActive ? '#000' : p.themeColor }}
                    />
                    <span>{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Showcase Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Active Project Details & Adaptive CTAs */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 mb-2">
                <span style={{ color: selectedProject.themeColor }} className="font-semibold">
                  {selectedProject.number}
                </span>
                <span>/</span>
                <span>{selectedProject.subtitle}</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {selectedProject.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Stats Chips */}
              <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-lg bg-white/[0.03] border border-white/10">
                {selectedProject.stats.map((st, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">{st.label}</div>
                    <div className="text-xs sm:text-sm font-semibold text-white mt-0.5" style={{ color: selectedProject.themeColor }}>
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedProject.tags.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full border border-white/20 bg-white/5 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Adaptive CTAs based on Demo vs Repository availability */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                {/* 1. Live Demo Button (if available) */}
                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-xs sm:text-sm hover:bg-white/90 active:scale-95 transition-all shadow-lg"
                  >
                    <span>View Live Demo</span>
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-xs sm:text-sm hover:bg-white/90 active:scale-95 transition-all shadow-lg"
                  >
                    <GithubIcon size={16} />
                    <span>View Repository</span>
                    <ArrowUpRight size={15} />
                  </a>
                )}

                {/* 2. Secondary Button */}
                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/5 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <GithubIcon size={15} />
                    <span>View Code</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] text-emerald-300">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Open-Source Verified</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right Col: 3D Laptop Showcase displaying Active Project */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <LaptopShowcase project={selectedProject} className="w-full max-w-2xl" />

              {/* Floating Editorial Words (Right Edge) */}
              <div className="hidden xl:flex flex-col text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium leading-loose pl-6 border-l border-white/10">
                <span>ACTIVE</span>
                <span>PREVIEW</span>
                <span>INTERACTIVE</span>
                <span>SHOWCASE</span>
                <span
                  className="w-2 h-2 rounded-full mt-2 animate-ping"
                  style={{ backgroundColor: selectedProject.themeColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 02 —— ALL PROJECTS (Engineered Works Grid) */}
      <section id="all-projects" className="py-24 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-[0.24em] text-white/55 uppercase font-medium mb-2">
                <span>02</span>
                <span className="w-8 h-[1px] bg-white/40" />
                <span>ALL PROJECTS</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Engineered Works
                </h2>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-normal border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>GitHub Linked: @Sourabh-sheoran</span>
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1.5 flex items-center gap-2 flex-wrap">
                <span>Any project pushed to GitHub is automatically synchronized here.</span>
                {totalGithubRepos > 0 && (
                  <span className="text-white/75 font-mono text-[11px]">
                    ({totalGithubRepos} live repos {lastSyncTime ? `• Last synced ${lastSyncTime}` : ''})
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Web Apps', 'Dashboards', 'AI & Full-Stack', 'GitHub Live'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      activeCategory === cat
                        ? 'bg-white text-black font-medium shadow'
                        : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Force Sync button */}
              <button
                type="button"
                onClick={() => loadGithubProjects(true)}
                disabled={isSyncing}
                title="Fetch latest repositories immediately from GitHub"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs text-white/80 hover:text-white transition-all disabled:opacity-50"
              >
                <RefreshCw size={12} className={isSyncing ? 'animate-spin text-emerald-400' : ''} />
                <span>{isSyncing ? 'Syncing...' : '↻ Sync GitHub'}</span>
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isActive = project.id === selectedProjectId;

              return (
                <div
                  key={project.id}
                  className={`group relative rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover-shimmer ${
                    isActive
                      ? 'border-white/60 bg-white/[0.08] shadow-[0_20px_45px_rgba(0,0,0,0.5)] ring-1 ring-white/30 scale-[1.01]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.07] shadow-md hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.7)]'
                  }`}
                  onClick={() => handleSelectProject(project.id)}
                >
                  {/* Top Ambient Glow */}
                  <div
                    className="absolute inset-x-0 top-0 h-1 transition-opacity duration-300"
                    style={{
                      backgroundColor: project.themeColor,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />

                  {/* Card Header & Preview Visual */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono text-white/40 tracking-wider">
                        {project.number}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.isGitHubLive && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                            <GitBranch size={10} />
                            <span>Live Git</span>
                          </span>
                        )}
                        {project.stars !== undefined && project.stars > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 border border-amber-500/20 text-amber-300">
                            <Star size={10} className="fill-amber-400 text-amber-400" />
                            <span>{project.stars}</span>
                          </span>
                        )}
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-black font-semibold text-[10px] tracking-wide animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            ACTIVE IN 3D
                          </span>
                        ) : (
                          <span className="text-[11px] uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mini Animated Mockup Banner with Hover Effect */}
                    <div className="relative w-full h-32 rounded-lg bg-black/40 border border-white/10 overflow-hidden mb-4 p-3 flex flex-col justify-between group-hover:border-white/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                        </div>
                        <span
                          className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${project.themeColor}22`,
                            color: project.themeColor,
                          }}
                        >
                          {project.id === 'chatapp' && 'WebSocket Chat'}
                          {project.id === 'soryat' && 'Design System'}
                          {project.id === 'instant-mechanic' && 'Telemetry Radar'}
                          {project.id === 'galcare' && 'Bio-Pharma R&D'}
                          {project.id === 'smart-resume' && 'AI ATS Engine'}
                          {project.id === 'job-market' && 'DAX Analytics'}
                          {project.id === 'cryptoapp' && 'Realtime Market'}
                          {!['chatapp', 'soryat', 'instant-mechanic', 'galcare', 'smart-resume', 'job-market', 'cryptoapp'].includes(project.id) &&
                            (project.subtitle || 'GitHub Live')}
                        </span>
                      </div>

                      {/* Dynamic Graphics inside mini mockup */}
                      <div className="flex items-center justify-center py-2 transition-transform duration-300 group-hover:scale-105">
                        {project.id === 'chatapp' && (
                          <div className="w-full space-y-1">
                            <div className="w-3/5 p-1 rounded bg-blue-600/40 text-[8px] text-white">Hey! Let's deploy today.</div>
                            <div className="w-1/2 p-1 rounded bg-white/10 text-[8px] text-white/80 ml-auto">Looks great! 🔥</div>
                          </div>
                        )}
                        {project.id === 'soryat' && (
                          <div className="text-center font-bold tracking-widest text-sm text-violet-300">
                            SORYAT // 60 FPS
                          </div>
                        )}
                        {project.id === 'instant-mechanic' && (
                          <div className="w-full flex items-center justify-around text-center">
                            <div>
                              <div className="text-xs font-bold text-orange-400">18</div>
                              <div className="text-[8px] text-white/40">Bays</div>
                            </div>
                            <div className="h-6 w-[1px] bg-white/10" />
                            <div>
                              <div className="text-xs font-bold text-emerald-400">96%</div>
                              <div className="text-[8px] text-white/40">Health</div>
                            </div>
                          </div>
                        )}
                        {project.id === 'galcare' && (
                          <div className="w-full flex items-center justify-center gap-2 text-cyan-300 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            <span>140+ Formulations Verified</span>
                          </div>
                        )}
                        {project.id === 'smart-resume' && (
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-400">
                              92%
                            </div>
                            <div className="text-[9px] text-emerald-300">AI ATS Match Score</div>
                          </div>
                        )}
                        {project.id === 'job-market' && (
                          <div className="w-full flex items-end gap-1.5 h-10 px-4">
                            <div className="flex-1 bg-yellow-400 h-6 rounded-t" />
                            <div className="flex-1 bg-amber-400 h-10 rounded-t" />
                            <div className="flex-1 bg-yellow-500 h-8 rounded-t" />
                            <div className="flex-1 bg-amber-500 h-5 rounded-t" />
                          </div>
                        )}
                        {project.id === 'cryptoapp' && (
                          <div className="w-full flex items-center justify-between px-2 text-xs">
                            <span className="text-white font-mono">$89,420</span>
                            <span className="text-emerald-400 text-[10px]">+4.2% ↑</span>
                          </div>
                        )}
                        {!['chatapp', 'soryat', 'instant-mechanic', 'galcare', 'smart-resume', 'job-market', 'cryptoapp'].includes(project.id) && (
                          <div className="w-full px-2.5 py-1.5 font-mono text-[9px] text-left text-white/80 bg-black/60 rounded border border-white/10 space-y-0.5">
                            <div className="text-emerald-400 flex items-center gap-1 truncate">
                              <span className="text-white/40">$</span> git clone github.com/Sourabh-sheoran/{project.id}
                            </div>
                            <div className="text-white/50 text-[8px] truncate">
                              ✓ {project.tags.slice(0, 3).join(' • ')}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-white/40 pt-1 border-t border-white/5">
                        <span>Click to preview in 3D</span>
                        <span className="text-white/70 group-hover:translate-x-0.5 transition-transform">
                          Showcase ↗
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-white/65 mt-2 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 text-[10px] rounded-full border border-white/10 bg-white/5 text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="px-6 py-3.5 bg-black/20 border-t border-white/10 flex items-center justify-between text-xs">
                    {/* Preview in 3D Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectProject(project.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-white/80 hover:text-white font-medium transition-colors"
                    >
                      <Monitor size={13} style={{ color: project.themeColor }} />
                      <span>Visualize in 3D</span>
                      <ArrowUpRight size={13} />
                    </button>

                    {/* Direct Links */}
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                        >
                          <span>Demo</span>
                          <ExternalLink size={11} />
                        </a>
                      )}

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors group/link"
                        title="View GitHub Repository"
                      >
                        <GithubIcon size={14} />
                        <span className="text-[11px] group-hover/link:underline">Repo</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GitHub CTA Bar */}
          <div className="mt-12 p-6 rounded-lg bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <GithubIcon size={22} className="text-white/90" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">Sourabh Sheoran on GitHub</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    Auto-Sync Active
                  </span>
                </div>
                <p className="text-xs text-white/50">
                  Any new repositories or updates pushed to @Sourabh-sheoran automatically show up in this portfolio.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => loadGithubProjects(true)}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs text-white transition-all disabled:opacity-50"
              >
                <RefreshCw size={13} className={isSyncing ? 'animate-spin text-emerald-400' : ''} />
                <span>{isSyncing ? 'Syncing...' : '↻ Sync Now'}</span>
              </button>

              <a
                href="https://github.com/Sourabh-sheoran"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-medium text-xs hover:bg-white/90 transition-all shadow-md"
              >
                <span>View GitHub Profile</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 03 —— TECH STACK (Tools I Work With) */}
      <section id="tech-stack" className="py-24 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/10">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs tracking-[0.24em] text-white/55 uppercase font-medium mb-3">
                <span>03</span>
                <span className="w-8 h-[1px] bg-white/40" />
                <span>TECH STACK</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Tools<br />I Work With
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed max-w-md">
                Technologies that help me build, analyze and create impactful solutions across frontend,
                backend, data pipelines and deployment.
              </p>
            </div>

            {/* Right: Native 3D Acrylic Glass Tech Tiles Grid */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
              <div className="relative w-full">
                <TechStack3DGrid />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 04 —— Let's Build Something Great (Footer CTA) */}
      <section className="py-24 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/10">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Let's Build<br />Something Great
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              I'm always open to discussing new opportunities, collaborations, or interesting ideas.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/40 bg-white text-black font-medium text-sm hover:bg-white/90 active:scale-95 transition-all shadow-xl"
            >
              <span>Get In Touch</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-8 px-6 sm:px-12 lg:px-16 xl:px-20 text-xs text-white/45 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 SOURABH SHEORAN — ALL RIGHTS RESERVED</span>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-white transition-colors"
          >
            Home / About
          </button>
          <a href="#featured" className="hover:text-white transition-colors">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
