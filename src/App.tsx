import { useState, useEffect } from 'react';
import { ContactModal } from './components/ContactModal';
import { ProjectsPage } from './components/ProjectsPage';
import { CertificationsPage } from './components/CertificationsPage';
import { ContactPage } from './components/ContactPage';
import { Navbar } from './components/Navbar';
import { SourabhLogo } from './components/SourabhLogo';
import { CursorSpotlight } from './components/CursorSpotlight';
import { getAssetUrl } from './utils/assets';

// Crisp inline SVGs matching exact editorial design from screenshot
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

const ArrowRightIcon = ({ className = '' }: { className?: string }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 350) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-7 right-7 z-40 w-11 h-11 rounded-full bg-[#16171e]/90 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-300 group"
    >
      <span className="text-sm font-bold group-hover:-translate-y-0.5 transition-transform duration-200">
        ↑
      </span>
    </button>
  );
};

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#projects') return 'projects';
      if (window.location.hash === '#certifications') return 'certifications';
      if (window.location.hash === '#contact') return 'contact';
    }
    return 'about';
  });

  // Listen to hash changes
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#projects') {
        setActiveTab('projects');
      } else if (window.location.hash === '#certifications') {
        setActiveTab('certifications');
      } else if (window.location.hash === '#contact') {
        setActiveTab('contact');
      } else if (window.location.hash === '#about' || window.location.hash === '') {
        setActiveTab('about');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Lock scroll when mobile drawer or contact modal is open
  useEffect(() => {
    if (drawerOpen || contactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen, contactOpen]);

  const handleNavClick = (linkId: string) => {
    setActiveTab(linkId);
    window.location.hash = linkId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user navigated to the Projects Page
  if (activeTab === 'projects') {
    return (
      <div key="projects" className="page-entrance min-h-screen">
        <CursorSpotlight />
        <ProjectsPage
          onNavigateHome={() => {
            setActiveTab('about');
            window.location.hash = 'about';
          }}
          onNavigateCertifications={() => {
            setActiveTab('certifications');
            window.location.hash = 'certifications';
          }}
          onNavigateContact={() => {
            setActiveTab('contact');
            window.location.hash = 'contact';
          }}
          onOpenContact={() => setContactOpen(true)}
        />
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        <ScrollToTopButton />
      </div>
    );
  }

  // If user navigated to the Certifications Page
  if (activeTab === 'certifications') {
    return (
      <div key="certifications" className="page-entrance min-h-screen">
        <CursorSpotlight />
        <CertificationsPage
          onNavigateHome={() => {
            setActiveTab('about');
            window.location.hash = 'about';
          }}
          onNavigateProjects={() => {
            setActiveTab('projects');
            window.location.hash = 'projects';
          }}
          onNavigateContact={() => {
            setActiveTab('contact');
            window.location.hash = 'contact';
          }}
          onOpenContact={() => setContactOpen(true)}
        />
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        <ScrollToTopButton />
      </div>
    );
  }

  // If user navigated to the Contact Page
  if (activeTab === 'contact') {
    return (
      <div key="contact" className="page-entrance min-h-screen">
        <CursorSpotlight />
        <ContactPage
          onNavigateHome={() => {
            setActiveTab('about');
            window.location.hash = 'about';
          }}
          onNavigateProjects={() => {
            setActiveTab('projects');
            window.location.hash = 'projects';
          }}
          onNavigateCertifications={() => {
            setActiveTab('certifications');
            window.location.hash = 'certifications';
          }}
          onOpenContact={() => setContactOpen(true)}
        />
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        <ScrollToTopButton />
      </div>
    );
  }

  return (
    <main className="relative min-h-[100dvh] h-auto lg:h-[100dvh] w-full overflow-hidden bg-studio-editorial text-[#F5F1EA] select-none font-hn page-entrance flex flex-col justify-between">
      <CursorSpotlight />
      {/* 1. Shared Header matching default About page in Navbar Text #D8D4DA */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavClick}
        onOpenContact={() => setContactOpen(true)}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Main Hero Visual Area */}
      <div className="relative flex-1 w-full min-h-[72vh] lg:min-h-0 flex items-center">
        {/* 2. Top-Left Tagline: FULL-STACK DEVELOPER in Normal Text #C9C5CC */}
        <div
          className="absolute left-6 sm:left-12 lg:left-16 top-[15vh] sm:top-[17vh] z-25 anim-fade-up pointer-events-none"
          style={{ animationDelay: '200ms' }}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#C9C5CC] font-mono font-medium">
            FULL-STACK DEVELOPER
          </span>
        </div>

        {/* 3. Big Background Text: Sourabh Sheoran (#B8B2BB, 20-30% opacity) behind portrait */}
        <div
          className="absolute inset-x-0 top-[13vh] sm:top-[15vh] z-10 overflow-hidden pointer-events-none select-none flex justify-center items-center anim-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="font-hn font-bold tracking-tight text-[#B8B2BB] opacity-[0.24] text-[13vh] sm:text-[21vh] leading-none whitespace-nowrap">
            Sourabh Sheoran
          </h2>
        </div>

        {/* 4. Left Hero Column: Headline, Intro Paragraph, Action Buttons (z-30) */}
        <div
          className="absolute left-6 sm:left-12 lg:left-16 top-[33vh] sm:top-[35vh] lg:top-[36vh] z-30 max-w-[320px] sm:max-w-[420px] anim-fade-up pointer-events-auto"
          style={{ animationDelay: '400ms' }}
        >
          {/* Hero Headline in Main Heading #F5F1EA & Accent / Highlight #C6A15B */}
          <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-medium text-[#F5F1EA] tracking-tight leading-[1.14]">
            Turning ideas into<br />
            <span className="text-[#C6A15B]">real products.</span>
          </h1>

          {/* Intro Paragraph in Normal Text #C9C5CC */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-[13.5px] text-[#C9C5CC] font-normal leading-relaxed max-w-[360px]">
            I'm Sourabh Sheoran, a Full-Stack Developer who loves building modern web
            applications, exploring data and creating solutions that make an impact.
          </p>

          {/* Action Buttons: View My Work (#C6A15B) & Get In Touch (Bordered #F5F1EA) */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3.5">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('projects');
              }}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-[#C6A15B] hover:bg-[#D6B66A] text-[#242126] font-semibold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(198,161,91,0.25)] hover:shadow-[0_6px_25px_rgba(214,182,106,0.35)] active:scale-[0.98] transition-all duration-200"
            >
              <span>View My Work</span>
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg border border-[#C9C5CC]/30 hover:border-[#F5F1EA] bg-white/[0.02] hover:bg-white/[0.06] text-[#F5F1EA] font-medium text-xs sm:text-sm tracking-wide active:scale-[0.98] transition-all duration-200"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* 5. Center Cutout Portrait: Exactly positioned as in photo */}
        <div className="absolute inset-x-0 bottom-0 top-[6vh] sm:top-[5vh] z-20 pointer-events-none flex justify-center items-end">
          <div className="relative h-full pointer-events-auto cursor-pointer group flex justify-center items-end">
            <img
              src={getAssetUrl('portrait.png')}
              onError={(e) => {
                e.currentTarget.src = 'https://lh3.googleusercontent.com/d/1CJ5byO3U_Dg9lpYWkFHU87NlA6k4zd3T';
              }}
              alt="Sourabh Sheoran"
              className="h-full w-auto max-w-none object-contain object-bottom select-none transition-all duration-500 ease-out group-hover:scale-[1.015] group-hover:-translate-y-1 group-hover:brightness-105"
              style={{
                filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.35))',
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* 6. Right Editorial Accents matching Image 2 */}
        <div className="hidden lg:flex flex-col items-end absolute right-12 sm:right-16 top-[42vh] z-25 pointer-events-none select-none">
          {/* Vertical Accent Line in #C6A15B */}
          <div className="w-[1.5px] h-20 bg-[#C6A15B] opacity-80 mb-6 mr-3" />
          {/* Crescent Glow Ornament */}
          <div className="w-20 h-20 rounded-full border-r-[2.5px] border-white/20 transform rotate-12 blur-[0.4px] mb-8 mr-1" />
          {/* Homage Title with gold tick line */}
          <div className="flex items-center gap-3 text-right">
            <span className="w-6 h-[1.5px] bg-[#C6A15B]" />
            <div className="flex flex-col text-[10px] font-mono tracking-[0.2em] uppercase text-[#C9C5CC]">
              <span>A HOMAGE TO</span>
              <span className="text-[#F5F1EA] font-semibold">SOURABH SHEORAN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Bottom Color Palette Swatch Bar as specified in Image 1 and Image 2 */}
      <div className="relative z-30 w-full bg-[#242126] border-t border-white/[0.08] px-4 py-3 sm:py-3.5 select-none shrink-0 anim-fade-up">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 sm:gap-6 py-1 scrollbar-none">
          {/* 1. Background */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#6A656E] border border-white/20 shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Background</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#6A656E</span>
            </div>
          </div>

          {/* 2. Main Heading */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F5F1EA] border border-black/20 shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Main Heading</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#F5F1EA</span>
            </div>
          </div>

          {/* 3. Normal Text */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C9C5CC] shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Normal Text</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#C9C5CC</span>
            </div>
          </div>

          {/* 4. Accent / Highlight */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C6A15B] shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Accent / Highlight</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#C6A15B</span>
            </div>
          </div>

          {/* 5. Button Hover */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#D6B66A] shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Button Hover</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#D6B66A</span>
            </div>
          </div>

          {/* 6. Big Background Text */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#B8B2BB] opacity-80 shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Big Background Text</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#B8B2BB (20–30%)</span>
            </div>
          </div>

          {/* 7. Button Text / Dark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#242126] border border-white/20 shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Button Text / Dark</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#242126</span>
            </div>
          </div>

          {/* 8. Navbar Text */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#D8D4DA] shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-[#C9C5CC] font-medium leading-tight">Navbar Text</span>
              <span className="text-[9px] sm:text-[10px] text-[#D8D4DA]/60 font-mono">#D8D4DA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Dedicated Contact Page Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* 9. Mobile Drawer Menu (z-50) */}
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
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setDrawerOpen(false);
                    if (link.id === 'contact') {
                      e.preventDefault();
                      setContactOpen(true);
                    }
                    handleNavClick(link.id);
                  }}
                  className={`text-2xl font-light tracking-tight transition-colors ${
                    activeTab === link.id ? 'text-white font-normal' : 'text-white/70 hover:text-white'
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
                  setContactOpen(true);
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
    </main>
  );
}
