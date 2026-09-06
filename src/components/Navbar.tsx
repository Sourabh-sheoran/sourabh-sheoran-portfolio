import { Menu } from 'lucide-react';

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

const GithubIcon = () => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

interface NavbarProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onOpenContact?: () => void;
  onOpenDrawer: () => void;
  className?: string;
}

export function Navbar({
  activeTab,
  onNavigate,
  onOpenContact: _onOpenContact,
  onOpenDrawer,
  className = 'absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 pt-6 sm:px-12 sm:pt-8 lg:px-16 anim-fade-up',
}: NavbarProps) {
  const handleNavClick = (linkId: string) => {
    onNavigate(linkId);
  };

  return (
    <header className={className}>
      {/* Brand / Name Link with Custom Portfolio Monogram Logo matching design */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('about');
        }}
        className="group flex items-center gap-3 tracking-[0.14em] text-sm transition-all duration-200"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#242126] border border-white/25 flex items-center justify-center text-[#F5F1EA] font-bold text-xs sm:text-sm shadow-md group-hover:border-[#C6A15B]/60 transition-colors">
          S
        </div>
        <span className="font-medium tracking-[0.14em] text-xs sm:text-sm group-hover:tracking-[0.16em] transition-all duration-200">
          <span className="text-[#C6A15B] font-semibold">SOURABH</span>{' '}
          <span className="text-[#F5F1EA]">SHEORAN</span>
        </span>
      </a>

      {/* Desktop Navigation & Editorial Group */}
      <div className="hidden md:flex items-center gap-7 lg:gap-10">
        {/* Navigation Links in Navbar Text #D8D4DA */}
        <nav className="flex items-center gap-6 text-sm font-normal">
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#F5F1EA] font-medium'
                    : 'text-[#D8D4DA]/80 hover:text-[#F5F1EA]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C6A15B] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Thin Vertical Divider */}
        <div className="h-4 w-[1px] bg-[#D8D4DA]/25" />

        {/* Social Icons with real user URLs in Navbar Text #D8D4DA */}
        <div className="flex items-center gap-4 text-[#D8D4DA]/80">
          <a
            href="https://www.instagram.com/soouuraabbh/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-[#F5F1EA] hover:scale-110 transition-all duration-200"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/sourabh-sheoran-8173281a8/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#F5F1EA] hover:scale-110 transition-all duration-200"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/Sourabh-sheoran"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-[#F5F1EA] hover:scale-110 transition-all duration-200"
          >
            <GithubIcon />
          </a>
          <a
            href="mailto:sourabhsheoran695@gmail.com"
            aria-label="Email"
            className="hover:text-[#F5F1EA] hover:scale-110 transition-all duration-200"
          >
            <MailIcon />
          </a>
        </div>

        {/* Let's Connect CTA Button as shown in Reference Header */}
        <button
          onClick={() => onNavigate('contact')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8D4DA]/30 hover:border-[#D8D4DA]/70 bg-white/[0.04] hover:bg-white/10 text-xs font-medium text-[#D8D4DA] hover:text-[#F5F1EA] transition-all duration-200"
        >
          <span>Let's Connect</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        onClick={onOpenDrawer}
        aria-label="Open menu"
        className="md:hidden text-white focus:outline-none p-1"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
