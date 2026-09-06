import { useState, type FormEvent } from 'react';
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { IPhoneShowcase } from './IPhoneShowcase';
import { ContactGlobe3D } from './ContactGlobe3D';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ContactPageProps {
  onNavigateHome?: () => void;
  onNavigateProjects?: () => void;
  onNavigateCertifications?: () => void;
  onNavigate?: (page: 'about' | 'projects' | 'certifications' | 'contact') => void;
  onOpenContact?: () => void;
}

export function ContactPage({
  onNavigateHome,
  onNavigateProjects,
  onNavigateCertifications,
  onNavigate,
  onOpenContact,
}: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Direct mailto trigger with prefilled body
    const mailtoUrl = `mailto:sourabhsheoran695@gmail.com?subject=${encodeURIComponent(
      subject || `Contact from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.open(mailtoUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = `Hello Sourabh, my name is ${name || 'someone'}. ${
      message ? `Message: ${message}` : 'I would like to connect with you!'
    }`;
    window.open(`https://wa.me/917056426775?text=${encodeURIComponent(text)}`, '_blank');
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
        activeTab="contact"
        onNavigate={(tabId) => {
          if (tabId === 'about' && onNavigateHome) onNavigateHome();
          else if (tabId === 'projects' && onNavigateProjects) onNavigateProjects();
          else if (tabId === 'certifications' && onNavigateCertifications) onNavigateCertifications();
          else if (onNavigate) onNavigate(tabId as any);
        }}
        onOpenContact={onOpenContact || (() => {})}
        onOpenDrawer={() => {}}
      />

      {/* ==================== 04 HERO SECTION ==================== */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/[0.07]">
        {/* Label & Number matching reference prototype */}
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-8">
          <span className="text-white/80 font-mono">04</span>
          <span className="h-px w-8 bg-white/20" />
          <span className="font-mono">LET'S BUILD TOGETHER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Title & Statement */}
          <div className="lg:col-span-6 z-10">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6">
              Get In <br />
              Touch
            </h1>
            <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-lg mb-10">
              Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
              Let's create something meaningful together.
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('contact-form-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all">
                <span className="text-sm transform group-hover:translate-y-0.5 transition-transform duration-300">
                  ↓
                </span>
              </div>
              <span>SCROLL TO CONNECT</span>
            </button>
          </div>

          {/* Right 3D Scene & Editorial Side Rail */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Apple iPhone Dummy Screen Mockup displaying Instagram & LinkedIn Live Videos */}
            <div className="w-full">
              <IPhoneShowcase />
            </div>

            {/* Editorial Vertical Index matching reference image */}
            <div className="hidden xl:flex flex-col items-end absolute right-0 top-6 gap-6 text-right pointer-events-none select-none">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-mono text-white/90">01 Say Hello</span>
              </div>
              <div className="text-[11px] font-mono tracking-wider text-white/40 space-y-2 border-r border-white/15 pr-3">
                <div>02 Drop a Message</div>
                <div>03 Let's Collaborate</div>
                <div>04 Create Impact</div>
              </div>
              <p className="text-[11px] italic font-serif text-white/35 max-w-[140px] leading-snug">
                "Great ideas start with a simple conversation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 01 & 02 & 03: CONTACT FORM & INFO GRID ==================== */}
      <section
        id="contact-form-section"
        className="relative py-24 px-6 sm:px-12 max-w-7xl mx-auto border-b border-white/[0.07] scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ================= LEFT COLUMN: SEND A MESSAGE ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-4">
                <span className="text-white/80 font-mono">01</span>
                <span className="h-px w-8 bg-white/20" />
                <span className="font-mono">SEND A MESSAGE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3 leading-tight">
                I'm Always Open <br />
                to New Opportunities
              </h2>
              <p className="text-sm text-white/50 font-light mb-8">
                Fill out the form and I'll get back to you as soon as possible.
              </p>

              {/* Form Component */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] text-sm text-white placeholder-white/40 outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] text-sm text-white placeholder-white/40 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div className="relative">
                  <FileText
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] text-sm text-white placeholder-white/40 outline-none transition-all duration-200"
                  />
                </div>

                {/* Row 3: Message Textarea */}
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute left-4 top-4 text-white/40 pointer-events-none"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.06)] text-sm text-white placeholder-white/40 outline-none resize-none transition-all duration-200"
                  />
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white text-black hover:bg-white/90 font-medium text-sm tracking-wide transition-all shadow-[0_10px_25px_rgba(255,255,255,0.18)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.28)] hover:translate-y-[-1px]"
                    >
                      <span>Send Message</span>
                      <ArrowRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium transition-all"
                      title="Direct WhatsApp chat"
                    >
                      <span>WhatsApp</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/40 font-mono">
                    <span>Let's turn ideas into reality.</span>
                    <span className="h-px w-6 bg-white/20" />
                  </div>
                </div>

                {/* Confirmation Notice */}
                {isSubmitted && (
                  <div className="flex items-center gap-2 p-3 mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                    <CheckCircle size={16} />
                    <span>Email client opened! You can also chat directly via WhatsApp.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: CONTACT INFO & CONNECT ELSEWHERE ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            {/* 02 — CONTACT INFO */}
            <div>
              <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-6">
                <span className="text-white/80 font-mono">02</span>
                <span className="h-px w-8 bg-white/20" />
                <span className="font-mono">CONTACT INFO</span>
              </div>

              <div className="space-y-3.5">
                {/* Email Card */}
                <a
                  href="mailto:sourabhsheoran695@gmail.com"
                  className="group hover-shimmer flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.7)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80 group-hover:border-white/40 group-hover:text-white group-hover:scale-105 transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-white/50 font-mono">
                        Email
                      </h4>
                      <p className="text-sm font-medium text-white tracking-wide">
                        sourabhsheoran695@gmail.com
                      </p>
                      <span className="text-[11px] text-white/40 font-light">
                        Drop me an email anytime
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>

                {/* Phone / WhatsApp Card */}
                <a
                  href="https://wa.me/917056426775"
                  target="_blank"
                  rel="noreferrer"
                  className="group hover-shimmer flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.7)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80 group-hover:border-white/40 group-hover:text-white group-hover:scale-105 transition-all">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-white/50 font-mono">
                        Phone / WhatsApp
                      </h4>
                      <p className="text-sm font-medium text-white tracking-wide">
                        +91 70564 26775
                      </p>
                      <span className="text-[11px] text-white/40 font-light">
                        Feel free to call or WhatsApp
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>

                {/* Location Card */}
                <div className="group hover-shimmer flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-white/50 font-mono">
                        Location
                      </h4>
                      <p className="text-sm font-medium text-white tracking-wide">
                        Hansi, Haryana, India
                      </p>
                      <span className="text-[11px] text-white/40 font-light">
                        Open to remote & on-site opportunities
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* 03 — CONNECT ELSEWHERE */}
            <div>
              <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-4">
                <span className="text-white/80 font-mono">03</span>
                <span className="h-px w-8 bg-white/20" />
                <span className="font-mono">CONNECT ELSEWHERE</span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sourabh-sheoran-8173281a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="group hover-shimmer flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-all duration-300 aspect-[1/1]"
                >
                  <LinkedinIcon size={20} />
                  <div>
                    <h5 className="text-xs font-medium text-white">LinkedIn</h5>
                    <span className="text-[10px] text-white/40 group-hover:text-white/70 flex items-center gap-1 mt-0.5">
                      Let's network <ArrowRight size={10} />
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Sourabh-sheoran"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/30 transition-all duration-300 aspect-[1/1]"
                >
                  <GithubIcon size={20} />
                  <div>
                    <h5 className="text-xs font-medium text-white">GitHub</h5>
                    <span className="text-[10px] text-white/40 group-hover:text-white/70 flex items-center gap-1 mt-0.5">
                      Check my code <ArrowRight size={10} />
                    </span>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/soouuraabbh/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/30 transition-all duration-300 aspect-[1/1]"
                >
                  <InstagramIcon size={20} />
                  <div>
                    <h5 className="text-xs font-medium text-white">Instagram</h5>
                    <span className="text-[10px] text-white/40 group-hover:text-white/70 flex items-center gap-1 mt-0.5">
                      Follow journey <ArrowRight size={10} />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 04 LET'S COLLABORATE & 3D EARTH ==================== */}
      <section className="relative py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase mb-8">
          <span className="text-white/80 font-mono">04</span>
          <span className="h-px w-8 bg-white/20" />
          <span className="font-mono">LET'S COLLABORATE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Value Proposition */}
          <div className="lg:col-span-6 z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
              Build <br />
              Something Great
            </h2>
            <p className="text-base text-white/60 font-light leading-relaxed mb-8 max-w-lg">
              Whether it's a project, internship, job opportunity, or just a discussion about technology,
              I'm always excited to connect with like-minded people.
            </p>

            {/* 3 Pillars matching prototype */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 font-mono border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Open to Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Collaborate on Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Always up for New Ideas</span>
              </div>
            </div>
          </div>

          {/* Right 3D Earth / Orbit Scene */}
          <div className="lg:col-span-6">
            <ContactGlobe3D />
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-white/[0.08] py-8 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs tracking-widest text-white/40 font-mono gap-4">
        <span>SOURABH SHEORAN</span>
        <div className="flex items-center gap-4">
          <span className="h-px w-6 bg-white/20" />
          <span>THANKS FOR REACHING OUT</span>
          <span className="h-px w-6 bg-white/20" />
        </div>
        <span>2026</span>
      </footer>
    </div>
  );
}
