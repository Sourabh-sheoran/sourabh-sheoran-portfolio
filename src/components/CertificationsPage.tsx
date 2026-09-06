import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Cloud,
  ShieldCheck,
  Layers,
  BarChart3,
  Database,
  Code2,
  Sparkles,
  Network,
  Award,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Certification3DHero } from './Certification3DHero';
import {
  CERTIFICATIONS_DATA,
  type SkillCompetency,
} from '../data/certificationsData';
import { getAssetUrl } from '../utils/assets';

// Brand Logos
const AwsLogo = ({ className = 'text-amber-400' }: { className?: string }) => (
  <div className={`flex flex-col items-start leading-none ${className}`}>
    <span className="font-black tracking-wider text-base">aws</span>
    <span className="text-[7.5px] tracking-widest text-white/50 uppercase font-mono">academy</span>
  </div>
);

const UdemyLogo = () => (
  <span className="font-bold text-[#b558f6] tracking-tight text-base flex items-center gap-0.5">
    <span className="text-lg font-serif">û</span>demy
  </span>
);

const CourseraLogo = () => (
  <span className="font-bold text-[#2a73cc] tracking-tight text-base">
    coursera
  </span>
);

const GoogleLogo = () => (
  <span className="font-semibold tracking-tight text-base flex items-center">
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

const EthnusLogo = () => (
  <div className="flex items-center gap-1.5 text-xs text-white/90">
    <div className="w-4 h-4 rounded-full border border-orange-400/80 flex items-center justify-center text-[8px] text-orange-300 font-bold bg-orange-500/10">
      e
    </div>
    <span className="font-semibold text-white/90 tracking-wide">ethnus</span>
  </div>
);

// Competency Icon Component
const CompetencyIcon = ({ icon }: { icon: SkillCompetency['icon'] }) => {
  switch (icon) {
    case 'cloud':
      return <Cloud size={20} className="text-white/80" />;
    case 'security':
      return <ShieldCheck size={20} className="text-white/80" />;
    case 'scale':
      return <Layers size={20} className="text-white/80" />;
    case 'optimize':
      return <BarChart3 size={20} className="text-white/80" />;
    case 'database':
      return <Database size={20} className="text-white/80" />;
    case 'code':
      return <Code2 size={20} className="text-white/80" />;
    case 'ai':
      return <Sparkles size={20} className="text-white/80" />;
    case 'network':
      return <Network size={20} className="text-white/80" />;
    default:
      return <Award size={20} className="text-white/80" />;
  }
};

interface CertificationsPageProps {
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateContact?: () => void;
  onNavigate?: (page: 'about' | 'projects' | 'certifications' | 'contact') => void;
  onOpenContact?: () => void;
}

export function CertificationsPage({
  onNavigateHome,
  onNavigateProjects,
  onNavigateContact,
  onNavigate,
  onOpenContact,
}: CertificationsPageProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedCert = CERTIFICATIONS_DATA[selectedIndex] || CERTIFICATIONS_DATA[0];

  const carouselRef = useRef<HTMLDivElement>(null);
  const featuredSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (idx: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.cert-rack-card');
    const targetCard = cards[idx];
    if (targetCard) {
      const containerWidth = container.clientWidth;
      const cardLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const targetScrollLeft = cardLeft - containerWidth / 2 + cardWidth / 2;

      // Purely scroll the horizontal carousel container — never touch window vertical scroll!
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  };

  // Continuously cycle through certificates every 4.5 seconds with smooth animation
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => {
        const next = (prev + 1) % CERTIFICATIONS_DATA.length;
        scrollToCard(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleSelectCert = (idx: number) => {
    setSelectedIndex(idx);
    scrollToCard(idx);
  };

  const handlePrev = () => {
    const nextIdx = selectedIndex > 0 ? selectedIndex - 1 : CERTIFICATIONS_DATA.length - 1;
    handleSelectCert(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = selectedIndex < CERTIFICATIONS_DATA.length - 1 ? selectedIndex + 1 : 0;
    handleSelectCert(nextIdx);
  };

  return (
    <div className="relative min-h-screen bg-studio-dark text-[#efeee9] font-hn antialiased selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-[20%] w-[700px] h-[700px] bg-white/[0.025] rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-[10%] w-[800px] h-[500px] bg-white/[0.018] rounded-full blur-[180px]" />
      </div>

      {/* Global Unified Navigation */}
      <Navbar
        activeTab="certifications"
        onNavigate={(tabId) => {
          if (tabId === 'about' && onNavigateHome) onNavigateHome();
          else if (tabId === 'projects' && onNavigateProjects) onNavigateProjects();
          else if (tabId === 'contact' && onNavigateContact) onNavigateContact();
          else if (onNavigate) onNavigate(tabId as any);
        }}
        onOpenContact={onOpenContact || (() => {})}
        onOpenDrawer={() => {}}
      />

      {/* ==================== 03 HERO SECTION ==================== */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/[0.07]">
        {/* Label & Number */}
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-8">
          <span className="text-white/80 font-mono">03</span>
          <span className="h-px w-8 bg-white/20" />
          <span className="font-mono">LEARN / CERTIFY / GROW</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Title & Intro */}
          <div className="lg:col-span-6 z-10">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6">
              Certifications
            </h1>
            <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-lg mb-10">
              Milestones that validate my skills, reflect my curiosity and fuel my journey in technology.
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('my-certifications');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all">
                <span className="text-sm transform group-hover:translate-y-0.5 transition-transform duration-300">
                  ↓
                </span>
              </div>
              <span>SCROLL TO EXPLORE</span>
            </button>
          </div>

          {/* Right 3D Interactive Plaque Scene & Editorial Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* 3D Certificate Monolith */}
            <div className="w-full">
              <Certification3DHero />
            </div>

            {/* Editorial Metadata Sidebar in Reference Image */}
            <div className="hidden xl:flex flex-col items-end absolute right-0 top-6 gap-6 text-right pointer-events-none select-none">
              <span className="text-xs font-mono text-white/40 tracking-widest">2026</span>
              <div className="text-[11px] font-mono tracking-widest uppercase text-white/30 space-y-1">
                <div>Learn</div>
                <div>Build</div>
                <div>Adapt</div>
                <div>Grow</div>
              </div>
              <p className="text-[11px] italic font-serif text-white/35 max-w-[140px] leading-snug">
                "Progress is a series of small certainties."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 01 MY CERTIFICATIONS (COVERFLOW / RACK) ==================== */}
      <section
        id="my-certifications"
        className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/[0.07]"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-3">
              <span className="text-white/80 font-mono">01</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="font-mono">MY CERTIFICATIONS</span>
            </div>
            <p className="text-sm sm:text-base text-white/60 font-light max-w-md">
              Certifications that have strengthened my foundation and expanded my skills.
            </p>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Certificate"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Certificate"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 3D Perspective Glass Cards Rack */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth items-stretch"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CERTIFICATIONS_DATA.map((cert, index) => {
            const isSelected = index === selectedIndex;

            return (
              <div
                key={cert.id}
                onClick={() => handleSelectCert(index)}
                className={`cert-rack-card hover-shimmer shrink-0 w-[270px] sm:w-[300px] rounded-2xl p-6 cursor-pointer select-none transition-all duration-500 relative flex flex-col justify-between overflow-hidden snap-center ${
                  isSelected
                    ? 'bg-[#282d36]/95 border-2 border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(255,255,255,0.15)] scale-[1.03] z-20'
                    : 'bg-[#1e2229]/75 border border-white/10 hover:border-white/25 hover:bg-[#252932]/90 scale-95 opacity-85 hover:opacity-100 hover:scale-[0.98]'
                }`}
                style={{
                  minHeight: '360px',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Top Glass Sheen */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                {/* Top Row: Brand Logo + 'CERTIFICATE' Badge */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    {cert.issuerLogo === 'aws' && <AwsLogo />}
                    {cert.issuerLogo === 'udemy' && <UdemyLogo />}
                    {cert.issuerLogo === 'coursera' && <CourseraLogo />}
                    {cert.issuerLogo === 'google' && <GoogleLogo />}
                    {cert.issuerLogo === 'ethnus' && <EthnusLogo />}
                    {cert.issuerLogo === 'certificate' && (
                      <span className="font-semibold text-white/80 text-sm">Official</span>
                    )}
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 border border-white/15 px-2 py-0.5 rounded-full font-mono bg-white/[0.02]">
                    CERTIFICATE
                  </span>
                </div>

                {/* Center Content */}
                <div className="relative z-10 my-auto py-6">
                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-1 font-light">
                    {cert.organization}
                  </p>

                  {/* Decorative Digital Signature Line */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-serif italic text-white/30">
                      Sourabh Sheoran
                    </span>
                    <span className="text-[10px] font-mono text-white/30 tracking-wider">
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Skills Tag + Circular Arrow Trigger */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <span className="text-[8px] uppercase tracking-widest text-white/40 font-mono truncate max-w-[190px]">
                    {cert.skillsList}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'border-white bg-white text-black shadow-lg shadow-white/20'
                        : 'border-white/20 text-white/60 group-hover:border-white/40'
                    }`}
                  >
                    <ArrowRight size={14} className={isSelected ? 'text-black' : 'text-white/70'} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== 02 FEATURED CERTIFICATION (INLINE PREVIEW) ==================== */}
      <section
        ref={featuredSectionRef}
        className="relative py-24 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/[0.07] scroll-mt-20"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase">
            <span className="text-white/80 font-mono">02</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="font-mono">FEATURED CERTIFICATION</span>
          </div>

          <p className="hidden md:block text-xs italic font-serif text-white/40">
            "Certifications turn learning into opportunities."
          </p>
        </div>

        {/* Featured Certificate Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: High-Res Certificate In-Page Preview */}
          <div className="lg:col-span-6">
            <div className="relative group rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-[#343842] via-[#252830] to-[#1c1e24] border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.08)] overflow-hidden">
              {/* Outer Glowing Edge */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 via-transparent to-white/10 rounded-2xl blur-sm pointer-events-none opacity-50" />

              {/* Certificate Canvas / Image Wrapper with Smooth Animation Key */}
              <div
                key={`preview-${selectedCert.id}`}
                className="relative rounded-xl overflow-hidden bg-[#0c0e10] border border-white/10 shadow-inner animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]"
              >
                {selectedCert.image ? (
                  <img
                    src={getAssetUrl(selectedCert.image)}
                    alt={selectedCert.title}
                    className="w-full h-auto object-contain max-h-[360px] sm:max-h-[440px] rounded-lg transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                ) : (
                  /* High-Fidelity Synthetic Certificate for Coursera Shares */
                  <div className="w-full aspect-[4/3] p-8 sm:p-10 flex flex-col justify-between bg-[#fbfbfc] text-[#1c2024] relative select-none">
                    {/* Watermark Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    {/* Top Header */}
                    <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                      {selectedCert.issuerLogo === 'google' ? (
                        <div className="text-2xl font-bold tracking-tight text-gray-900">
                          Google
                        </div>
                      ) : (
                        <div className="text-xl font-bold tracking-tight text-[#0056d2]">
                          coursera
                        </div>
                      )}
                      <div className="text-right">
                        <span className="text-[10px] tracking-widest font-mono uppercase text-gray-500">
                          COURSE CERTIFICATE
                        </span>
                      </div>
                    </div>

                    {/* Center Certificate Text */}
                    <div className="my-6">
                      <p className="text-xs text-gray-500 mb-2 font-mono">
                        {selectedCert.issueDate}
                      </p>
                      <h4 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight mb-2">
                        Sourabh Sheoran
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">
                        has successfully completed with distinction:
                      </p>
                      <h5 className="text-lg sm:text-xl font-semibold text-gray-900 border-l-2 border-blue-600 pl-3">
                        {selectedCert.title}
                      </h5>
                      <p className="text-[11px] text-gray-500 mt-2">
                        An online non-credit course authorized by {selectedCert.organization}
                      </p>
                    </div>

                    {/* Bottom Validation Bar */}
                    <div className="flex items-end justify-between pt-4 border-t border-gray-200 text-[10px] text-gray-500">
                      <div>
                        <div className="font-serif italic text-gray-700 text-sm">Sourabh</div>
                        <span>Verified Recipient</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-[9px]">Verify at:</span>
                        <span className="text-blue-600 truncate max-w-[200px] block">
                          coursera.org/verify
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Specs & One-Click Credential Verification */}
          <div
            key={`specs-${selectedCert.id}`}
            className="lg:col-span-6 flex flex-col justify-center animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]"
          >
            {/* Tag Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-md text-xs font-mono uppercase tracking-widest bg-white/[0.08] text-white/80 border border-white/15">
                {selectedCert.tags[0] || 'CERTIFIED'}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 leading-tight">
              {selectedCert.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8">
              {selectedCert.description}
            </p>

            {/* 4 Feature / Competency Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {selectedCert.competencies.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/[0.05] mb-2 text-white/90">
                    <CompetencyIcon icon={item.icon} />
                  </div>
                  <span className="text-xs font-medium text-white/90 leading-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons & Verification */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
              {/* Primary View Credential Link */}
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 font-medium text-xs sm:text-sm tracking-wide transition-all shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.3)] hover:translate-y-[-1px]"
              >
                <span>View Credential</span>
                <ArrowRight size={16} />
              </a>

              {/* Verified Metadata */}
              <div className="text-xs text-white/40 font-mono ml-auto">
                <span className="block sm:inline">
                  Issued by {selectedCert.organization.split('·')[0]}
                </span>
                <span className="hidden sm:inline mx-2">•</span>
                <span className="text-white/60">{selectedCert.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 CONTINUOUS LEARNING ==================== */}
      <section className="relative py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-8">
          <span className="text-white/80 font-mono">03</span>
          <span className="h-px w-8 bg-white/20" />
          <span className="font-mono">CONTINUOUS LEARNING</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Statement */}
          <div className="md:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Always <br />
              Exploring More
            </h2>
          </div>

          {/* Body Paragraph */}
          <div className="md:col-span-4">
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              I believe in continuous learning, staying updated with new technologies and building
              skills that create real-world impact.
            </p>
          </div>

          {/* Right Directional List in Reference Design */}
          <div className="md:col-span-3 flex items-start gap-4">
            <ArrowRight size={20} className="text-white/50 shrink-0 mt-0.5" />
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 space-y-1.5 leading-relaxed">
              <div>NEW GOALS</div>
              <div>NEW SKILLS</div>
              <div>A BRIGHTER TOMORROW</div>
            </div>
          </div>
        </div>

        {/* Curved Planet Horizon Glow as shown in Reference Image */}
        <div className="relative mt-20 h-44 sm:h-56 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#15191e] to-[#0a0c0e] flex items-center justify-center">
          {/* Planet Horizon Curve */}
          <div className="absolute -bottom-[280px] w-[1200px] h-[400px] rounded-[50%] bg-[#22272e] border-t-2 border-white/30 shadow-[0_-25px_80px_rgba(255,255,255,0.15)]" />
          {/* Atmospheric Star Dust */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.08] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 text-center px-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono mb-2">
              LIFELONG MASTERY
            </p>
            <p className="text-lg sm:text-xl text-white/80 font-light">
              Transforming curiosity into verified engineering excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/[0.08] py-8 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs tracking-widest text-white/40 font-mono gap-4">
        <span>SOURABH SHEORAN</span>
        <div className="flex items-center gap-4">
          <span className="h-px w-6 bg-white/20" />
          <span>KEEP LEARNING</span>
          <span className="h-px w-6 bg-white/20" />
        </div>
        <span>2026</span>
      </footer>
    </div>
  );
}
