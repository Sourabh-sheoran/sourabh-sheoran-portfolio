import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Send,
  Smile,
  MoreVertical,
  Phone,
  Video,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Wrench,
  Sparkles,
  BarChart3,
  Coins,
} from 'lucide-react';
import type { ProjectItem } from '../data/projectsData';
import { PROJECTS_DATA } from '../data/projectsData';

interface LaptopShowcaseProps {
  project?: ProjectItem;
  className?: string;
}

export function LaptopShowcase({ project = PROJECTS_DATA[0], className = '' }: LaptopShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMessage, setActiveMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey! Are you free now?', time: '10:42 AM' },
    { id: 2, sender: 'me', text: 'Yes, working on the new feature.', time: '10:43 AM' },
    { id: 3, sender: 'them', text: 'Looks great! 🔥', time: '10:44 AM' },
    { id: 4, sender: 'me', text: "Let's deploy it today.", time: '10:45 AM' },
  ]);

  const [motion, setMotion] = useState({
    rotY: -4,
    rotX: 3,
    floatY: 0,
    reflectionPos: 50,
  });

  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const updateLoop = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Damped mouse parallax
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.05;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.05;

      // Showroom continuous slow oscillation (-6deg to +6deg) when not directly hovered
      const cycle = elapsed * 0.72; // ~8.7s cycle
      const baseRotY = isHovered ? 0 : Math.sin(cycle) * 6.2;
      const baseRotX = isHovered ? 1.5 : Math.cos(cycle * 0.8) * 1.5 + 2.5;
      const floatY = isHovered ? -8 : Math.sin(cycle * 1.1) * 5.5;
      const reflectionPos = 50 + Math.sin(cycle) * 32;

      setMotion({
        rotY: baseRotY + mouseCurrentRef.current.x * 4,
        rotX: baseRotX - mouseCurrentRef.current.y * 3,
        floatY,
        reflectionPos,
      });

      animRef.current = requestAnimationFrame(updateLoop);
    };

    animRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseTargetRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'me', text: activeMessage, time: 'Now' },
    ]);
    setActiveMessage('');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center select-none py-4 ${className}`}
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 48%',
      }}
    >
      {/* 3D Laptop Container with smooth transform transition */}
      <div
        className="relative w-full max-w-[580px] transition-transform duration-500 ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateY(${motion.floatY}px) rotateY(${motion.rotY}deg) rotateX(${motion.rotX}deg) ${
            isHovered ? 'scale(1.035)' : 'scale(1)'
          }`,
        }}
      >
        {/* ==================== LAPTOP SCREEN (LID) ==================== */}
        <div
          className="relative w-full aspect-[16/10] rounded-t-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#2a2b30] via-[#1d1e22] to-[#121316] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col transition-all duration-300"
          style={{
            boxShadow: isHovered
              ? `0 25px 60px rgba(0,0,0,0.75), 0 0 35px ${project.glowColor}`
              : '0 20px 45px rgba(0,0,0,0.55)',
          }}
        >
          {/* Top Bezel: Camera notch */}
          <div className="absolute top-1 inset-x-0 flex justify-center items-center gap-1.5 z-30 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0b0d] border border-white/20 flex items-center justify-center">
              <div
                className="w-0.5 h-0.5 rounded-full"
                style={{ backgroundColor: project.themeColor }}
              />
            </div>
          </div>

          {/* Screen Inner Display Frame */}
          <div className="relative w-full h-full rounded-lg bg-[#0e0f12] overflow-hidden flex border border-white/10 text-white font-sans text-xs">
            {/* Soft Screen Glare Reflection that glides as the laptop rotates */}
            <div
              className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-30 transition-opacity duration-300"
              style={{
                background: `linear-gradient(115deg, 
                  transparent ${motion.reflectionPos - 30}%, 
                  rgba(255, 255, 255, 0.08) ${motion.reflectionPos - 10}%, 
                  rgba(255, 255, 255, 0.35) ${motion.reflectionPos}%, 
                  rgba(255, 255, 255, 0.08) ${motion.reflectionPos + 10}%, 
                  transparent ${motion.reflectionPos + 30}%)`,
              }}
            />

            {/* ---------- DYNAMIC PROJECT SCREEN CONTENT ---------- */}
            <div className="w-full h-full flex flex-col transition-opacity duration-300">
              {/* 1. CHATAPP UI */}
              {project.id === 'chatapp' && (
                <div className="w-full h-full flex">
                  {/* Left Sidebar: Contacts */}
                  <div className="w-36 sm:w-44 bg-[#141519] border-r border-white/10 flex flex-col shrink-0">
                    <div className="p-2 sm:p-2.5 border-b border-white/10 flex items-center justify-between">
                      <span className="font-semibold text-white tracking-tight text-[11px] sm:text-xs">
                        ChatApp
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="px-2 py-1.5 border-b border-white/5">
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-[10px] text-white/50">
                        <Search size={10} />
                        <span>Search...</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
                      {[
                        { name: 'Sourabh', status: 'Online', online: true, active: true },
                        { name: 'Priyanshu', status: 'Online', online: true },
                        { name: 'Aman', status: 'Away', away: true },
                        { name: 'Nikhil', status: 'Offline' },
                        { name: 'Sakshi', status: 'Online', online: true },
                      ].map((c) => (
                        <div
                          key={c.name}
                          className={`flex items-center gap-2 p-1.5 sm:p-2 transition-colors cursor-pointer ${
                            c.active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-[10px] font-medium text-white shrink-0">
                            {c.name[0]}
                            <span
                              className={`absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full border border-black ${
                                c.online ? 'bg-emerald-400' : c.away ? 'bg-amber-400' : 'bg-slate-500'
                              }`}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-medium truncate">{c.name}</div>
                            <div className="text-[9px] text-white/40 truncate">{c.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Active Chat */}
                  <div className="flex-1 flex flex-col bg-[#191a1f] min-w-0">
                    <div className="px-3 py-2 bg-[#17181d] border-b border-white/10 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-semibold text-white">
                          S
                        </div>
                        <div>
                          <div className="font-medium text-[11px] leading-tight">Sourabh</div>
                          <div className="text-[9px] text-emerald-400 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            Online
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/50">
                        <Video size={12} className="hover:text-white cursor-pointer" />
                        <Phone size={11} className="hover:text-white cursor-pointer" />
                        <MoreVertical size={12} className="hover:text-white cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex-1 p-2.5 sm:p-3 overflow-y-auto flex flex-col gap-2">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-[10px] sm:text-[11px] shadow-sm leading-snug transition-transform ${
                              m.sender === 'me'
                                ? 'bg-[#3b5bf5] text-white rounded-br-none hover:scale-[1.02]'
                                : 'bg-[#25262c] text-white/90 border border-white/5 rounded-bl-none hover:scale-[1.02]'
                            }`}
                          >
                            <span>{m.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleSendMessage}
                      className="p-1.5 sm:p-2 bg-[#141519] border-t border-white/10 flex items-center gap-1.5 shrink-0"
                    >
                      <div className="flex-1 relative flex items-center">
                        <input
                          type="text"
                          value={activeMessage}
                          onChange={(e) => setActiveMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="w-full pl-2.5 pr-7 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
                        />
                        <Smile size={12} className="absolute right-2 text-white/40 hover:text-white/80 cursor-pointer" />
                      </div>
                      <button
                        type="submit"
                        className="p-1 rounded-md bg-[#3b5bf5] hover:bg-[#2e4ee6] text-white flex items-center justify-center transition-colors shadow"
                      >
                        <Send size={11} />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* 2. SORYAT REAL LIVE HOMEPAGE */}
              {project.id === 'soryat' && (
                <div className="w-full h-full flex flex-col bg-[#0a0a0a] text-white p-3 sm:p-4 overflow-y-auto font-sans select-none">
                  {/* Real Soryat Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold tracking-widest text-xs text-white">SORYAT</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono">
                        DEMO-FIRST
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[10px] text-white/70">
                      <span className="text-white font-medium">Services</span>
                      <span className="hover:text-white cursor-pointer">Portfolio</span>
                      <span className="hover:text-white cursor-pointer">Pricing</span>
                      <span className="hover:text-white cursor-pointer">About</span>
                      <span className="hover:text-white cursor-pointer">Contact</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-[9px] bg-white/10 rounded px-1 py-0.5 text-white/80">
                        <span className="font-semibold text-white">₹</span>
                        <span className="mx-0.5">·</span>
                        <span>$</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/30 text-white font-medium">
                        Login
                      </span>
                    </div>
                  </div>

                  {/* Soryat Hero Section */}
                  <div className="flex-1 flex flex-col justify-center py-2 text-center">
                    <h3 className="text-base sm:text-xl font-normal tracking-tight text-white font-serif leading-tight">
                      Engineering Digital Excellence
                    </h3>
                    <p className="text-[9.5px] text-white/70 mt-1 max-w-sm mx-auto leading-relaxed font-light">
                      Delivering high-performance web development, AI solutions, SEO, and research paper services globally. Experience your working software on staging before full payment.
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-2.5">
                      <a
                        href="https://soryat.vercel.app/portfolio"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-full bg-white text-black font-semibold text-[9px] flex items-center gap-1 hover:bg-white/90 shadow"
                      >
                        <span>View Portfolio</span>
                        <ExternalLink size={9} />
                      </a>
                      <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[9px] text-white/80">
                        Explore Services
                      </span>
                    </div>

                    {/* Real Live Stats Counter Grid */}
                    <div className="grid grid-cols-4 gap-1.5 mt-3 p-2 rounded-lg bg-white/[0.04] border border-white/10 text-center">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white font-serif">100+</div>
                        <div className="text-[7.5px] uppercase tracking-wider text-white/50">Projects</div>
                      </div>
                      <div className="border-l border-white/10">
                        <div className="text-xs sm:text-sm font-bold text-white font-serif">99%</div>
                        <div className="text-[7.5px] uppercase tracking-wider text-white/50">Satisfaction</div>
                      </div>
                      <div className="border-l border-white/10">
                        <div className="text-xs sm:text-sm font-bold text-emerald-400 font-serif">₹10Cr+</div>
                        <div className="text-[7.5px] uppercase tracking-wider text-white/50">Revenue Gen</div>
                      </div>
                      <div className="border-l border-white/10">
                        <div className="text-xs sm:text-sm font-bold text-white font-serif">15+</div>
                        <div className="text-[7.5px] uppercase tracking-wider text-white/50">Countries</div>
                      </div>
                    </div>

                    {/* Real Service Cards Preview */}
                    <div className="grid grid-cols-3 gap-1.5 mt-2">
                      <div className="p-1.5 rounded bg-white/[0.03] border border-white/10 text-left hover:border-violet-400/40 transition-colors">
                        <div className="text-[7.5px] font-mono text-violet-300 font-bold uppercase">ENGINEERING</div>
                        <div className="text-[9px] font-bold text-white truncate">Full-Stack Web Dev</div>
                        <div className="text-[8px] text-emerald-400 mt-0.5 font-semibold">₹15,000 · Demo First</div>
                      </div>
                      <div className="p-1.5 rounded bg-white/[0.03] border border-white/10 text-left hover:border-violet-400/40 transition-colors">
                        <div className="text-[7.5px] font-mono text-violet-300 font-bold uppercase">GEN AI & AGENTS</div>
                        <div className="text-[9px] font-bold text-white truncate">AI Agent Systems</div>
                        <div className="text-[8px] text-emerald-400 mt-0.5 font-semibold">₹25,000 · Demo First</div>
                      </div>
                      <div className="p-1.5 rounded bg-white/[0.03] border border-white/10 text-left hover:border-violet-400/40 transition-colors">
                        <div className="text-[7.5px] font-mono text-violet-300 font-bold uppercase">RANKING</div>
                        <div className="text-[9px] font-bold text-white truncate">SEO & Growth</div>
                        <div className="text-[8px] text-emerald-400 mt-0.5 font-semibold">₹5,000/mo · Proven</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. INSTANT MECHANIC REAL LIVE OPERATIONS DASHBOARD */}
              {project.id === 'instant-mechanic' && (
                <div className="w-full h-full flex flex-col bg-[#0f172a] text-slate-100 p-3 sm:p-4 overflow-hidden font-sans select-none">
                  {/* Real Instant Mechanic Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white shadow">
                        <Wrench size={13} />
                      </div>
                      <div>
                        <div className="font-bold text-xs tracking-tight text-white">Instant Mechanic</div>
                        <div className="text-[8px] text-indigo-300">Live Operations Dashboard</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[9px]">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Dispatch Online</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Fleet GPS Active
                      </span>
                    </div>
                  </div>

                  {/* Real Live Dashboard View */}
                  <div className="flex-1 grid grid-cols-12 gap-2 my-2">
                    {/* Left 7 Cols: Simulated Interactive GPS Radar Map */}
                    <div className="col-span-7 bg-[#1e293b] rounded-lg border border-slate-700/60 p-2 flex flex-col justify-between relative overflow-hidden">
                      <div className="flex items-center justify-between text-[9px] text-slate-400 z-10">
                        <span className="font-medium text-slate-200">Live Service Radius (Delhi NCR)</span>
                        <span className="text-indigo-400">3 Mechanics En Route</span>
                      </div>

                      {/* Map Grid Graphic Simulation */}
                      <div className="relative w-full h-24 my-1 rounded bg-[#0f172a] border border-slate-700/80 overflow-hidden flex items-center justify-center">
                        {/* Map Grid Lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:14px_14px]" />
                        
                        {/* Radar Pulse */}
                        <div className="w-16 h-16 rounded-full border border-indigo-500/30 animate-ping pointer-events-none" />
                        
                        {/* Vehicle Pins */}
                        <div className="absolute top-4 left-6 flex items-center gap-1 bg-indigo-600 text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
                          <span>🚐 Van #04 (6m)</span>
                        </div>
                        <div className="absolute bottom-3 right-8 flex items-center gap-1 bg-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
                          <span>🔧 Scout #02</span>
                        </div>
                        <div className="absolute top-8 right-14 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      </div>

                      <div className="flex items-center justify-between text-[8px] text-slate-400 z-10">
                        <span>Avg Response: 14 mins</span>
                        <span className="text-emerald-400 font-semibold">98.2% On-Time</span>
                      </div>
                    </div>

                    {/* Right 5 Cols: Active Dispatch Requests */}
                    <div className="col-span-5 flex flex-col justify-between gap-1.5">
                      <div className="p-2 rounded-lg bg-[#1e293b] border border-slate-700/60 text-[9px]">
                        <div className="text-slate-400 font-medium text-[8px] uppercase">Active Request #104</div>
                        <div className="font-bold text-white mt-0.5">Emergency Battery Boost</div>
                        <div className="text-indigo-300 mt-0.5 text-[8px]">BMW 320d · Connaught Place</div>
                        <div className="mt-1 flex items-center justify-between pt-1 border-t border-slate-700 text-[8px]">
                          <span className="text-emerald-400 font-semibold">Mechanic Assigned</span>
                          <span className="text-slate-300">ETA 6m</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-[#1e293b] border border-slate-700/60 text-[9px]">
                        <div className="text-slate-400 font-medium text-[8px] uppercase">Workshop Bay 02</div>
                        <div className="font-bold text-white mt-0.5">Brake Rotor Diagnostic</div>
                        <div className="w-full h-1 rounded-full bg-slate-700 mt-1 overflow-hidden">
                          <div className="h-full bg-indigo-500 w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Bottom Telemetry Stats */}
                  <div className="pt-1.5 border-t border-indigo-500/20 flex items-center justify-between text-[9px] text-slate-400">
                    <span>18 Dispatches Today · $14,850 GMV</span>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                      <span>OPEN LIVE APP</span>
                      <ExternalLink size={9} />
                    </span>
                  </div>
                </div>
              )}

              {/* 4. GALCARE PHARMACEUTICALS REAL LIVE HOMEPAGE */}
              {project.id === 'galcare' && (
                <div className="w-full h-full flex flex-col bg-[#070d17] text-white p-3 sm:p-4 overflow-y-auto font-sans select-none">
                  {/* Real Galcare Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs tracking-wider text-white flex items-center gap-1">
                        <span className="text-cyan-400">GALCARE</span>
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[10px] text-white/75">
                      <span className="text-white font-medium">Home</span>
                      <span className="hover:text-white cursor-pointer">About Us</span>
                      <span className="hover:text-white cursor-pointer">Products</span>
                      <span className="hover:text-white cursor-pointer">Manufacturing</span>
                      <span className="hover:text-white cursor-pointer">News</span>
                    </div>
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-cyan-500 text-black font-semibold shadow">
                      Partner With Us
                    </span>
                  </div>

                  {/* Real Galcare Hero */}
                  <div className="flex-1 flex flex-col justify-center py-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[8px] text-white/80 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Since 2008
                      </span>
                      <span className="text-[8px] text-cyan-300 font-medium">WHO-GMP Certified</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                      Innovation in Dermatology.{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                        Trusted by Healthcare Professionals.
                      </span>
                    </h3>

                    <p className="text-[9px] text-white/70 mt-1 max-w-sm leading-relaxed">
                      Specialty skincare and pharmaceutical formulations backed by science, trusted by over 30,000 dermatologists across 26 states in India.
                    </p>

                    {/* Real Live Featured Products Showcase */}
                    <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                      {[
                        { name: 'GRAZIA UP GOLD', type: 'Serum · 50ml', active: 'Tranexamic & Ferulic' },
                        { name: 'NAX-B GEL', type: 'Acne Care', active: 'Clindamycin + Benzoyl' },
                        { name: 'REDO PLUS', type: 'Hair Serum', active: 'Redensyl + Procapil' },
                        { name: 'SUNKAGE PRO', type: 'Sunscreen 50+', active: 'Micronized Zinc' },
                      ].map((prod, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-md bg-white/[0.04] border border-cyan-500/20 text-left hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                        >
                          <div className="text-[8px] font-bold text-white truncate">{prod.name}</div>
                          <div className="text-[7.5px] text-cyan-300 font-medium">{prod.type}</div>
                          <div className="text-[7px] text-white/50 truncate mt-0.5">{prod.active}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[8px] text-white/50 mt-2.5 pt-1.5 border-t border-white/10">
                      <span>30,000+ Doctors Trust Us · 26 States Coverage</span>
                      <span className="text-cyan-300 font-semibold flex items-center gap-1">
                        <span>EXPLORE PRODUCTS</span>
                        <ExternalLink size={8} />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SMART RESUME SKILL ANALYZER UI */}
              {project.id === 'smart-resume' && (
                <div className="w-full h-full flex flex-col bg-[#0d1612] p-3 sm:p-4 text-white overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-emerald-400" />
                      <span className="font-bold text-xs tracking-wider text-white">
                        AI RESUME SKILL ANALYZER
                      </span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      NLP Engine Active
                    </span>
                  </div>

                  <div className="flex-1 flex gap-3 items-center py-2">
                    {/* Score Ring */}
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex flex-col items-center justify-center bg-black/40 shrink-0">
                      <span className="text-xl font-bold text-emerald-400 leading-none">92%</span>
                      <span className="text-[8px] uppercase tracking-wider text-white/60 mt-1">ATS SCORE</span>
                    </div>

                    {/* Breakdown */}
                    <div className="flex-1 space-y-1.5 text-[10px]">
                      <div>
                        <div className="flex items-center gap-1 text-emerald-300 font-medium mb-1">
                          <CheckCircle2 size={11} className="text-emerald-400" />
                          <span>Matched Key Skills (14/15)</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {['Python', 'NLP', 'FastAPI', 'React', 'Data Structures'].map((s) => (
                            <span
                              key={s}
                              className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="flex items-center gap-1 text-amber-300 font-medium mb-1">
                          <AlertCircle size={11} className="text-amber-400" />
                          <span>Recommended Keyword Enhancements</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {['Docker Compose', 'CI/CD Pipelines'].map((s) => (
                            <span
                              key={s}
                              className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px]"
                            >
                              + {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[9px] text-white/50">
                    <span>Parsed against Target Job: Senior Full-Stack & AI Engineer</span>
                    <span className="text-emerald-400 font-medium">STREAMLIT DEPLOYED ✓</span>
                  </div>
                </div>
              )}

              {/* 6. JOB MARKET & SALARY ANALYTICS UI */}
              {project.id === 'job-market' && (
                <div className="w-full h-full flex flex-col bg-[#141209] p-3 sm:p-4 text-white overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-yellow-500/20">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={14} className="text-yellow-400" />
                      <span className="font-bold text-xs tracking-wider text-white">
                        SALARY ANALYTICS POWER BI
                      </span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/30">
                      DAX Engine
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center py-1">
                    <div className="text-[9px] text-white/50 mb-2">
                      Compensation Distribution by Engineering Role (USD / Year)
                    </div>

                    {/* Bar Chart Simulation */}
                    <div className="space-y-1.5">
                      {[
                        { role: 'AI & ML Engineer', salary: '$152,000', pct: 95, color: 'bg-yellow-400' },
                        { role: 'Full-Stack Developer', salary: '$128,000', pct: 80, color: 'bg-amber-400' },
                        { role: 'Cloud DevOps Architect', salary: '$140,000', pct: 88, color: 'bg-yellow-500' },
                        { role: 'Data Analytics Engineer', salary: '$118,000', pct: 72, color: 'bg-amber-500' },
                      ].map((bar, i) => (
                        <div key={i} className="flex items-center text-[10px] gap-2">
                          <span className="w-32 truncate text-white/80">{bar.role}</span>
                          <div className="flex-1 h-3 rounded bg-white/5 overflow-hidden">
                            <div
                              className={`h-full ${bar.color} rounded transition-all duration-700`}
                              style={{ width: `${bar.pct}%` }}
                            />
                          </div>
                          <span className="w-14 text-right font-medium text-yellow-300 text-[9px]">
                            {bar.salary}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-yellow-500/20 flex items-center justify-between text-[9px] text-white/50">
                    <span>Dataset: 45,000+ verified global tech compensation reports</span>
                    <span className="text-yellow-400 font-medium">VIEW DAX SLICERS →</span>
                  </div>
                </div>
              )}

              {/* 7. CRYPTOAPP REALTIME TRACKER UI */}
              {project.id === 'cryptoapp' && (
                <div className="w-full h-full flex flex-col bg-[#140b15] p-3 sm:p-4 text-white overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-pink-500/20">
                    <div className="flex items-center gap-2">
                      <Coins size={14} className="text-pink-400" />
                      <span className="font-bold text-xs tracking-wider text-white">
                        CRYPTO TERMINAL
                      </span>
                    </div>
                    <div className="text-[10px] text-pink-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                      <span>WebSockets Streaming</span>
                    </div>
                  </div>

                  {/* Tickers */}
                  <div className="grid grid-cols-3 gap-2 my-2">
                    {[
                      { sym: 'BTC/USDT', price: '$89,420', chg: '+4.2%' },
                      { sym: 'ETH/USDT', price: '$3,845', chg: '+3.1%' },
                      { sym: 'SOL/USDT', price: '$184.2', chg: '+8.6%' },
                    ].map((t, idx) => (
                      <div key={idx} className="p-2 rounded bg-white/5 border border-white/10">
                        <div className="text-[9px] text-white/50">{t.sym}</div>
                        <div className="text-xs font-bold text-white mt-0.5">{t.price}</div>
                        <div className="text-[8px] text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp size={8} />
                          <span>{t.chg}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart sparkline preview */}
                  <div className="flex-1 bg-black/40 rounded border border-white/10 p-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] text-white/50">
                      <span>BTC / USD — 24H Trend</span>
                      <span className="text-emerald-400">High: $90,120</span>
                    </div>
                    {/* SVG Sparkline */}
                    <svg viewBox="0 0 300 60" className="w-full h-10 stroke-pink-400 fill-none" strokeWidth="2">
                      <path d="M0,45 Q30,55 60,35 T120,40 T180,15 T240,25 T300,8" />
                    </svg>
                    <div className="flex justify-between text-[8px] text-white/40">
                      <span>00:00 UTC</span>
                      <span>12:00 UTC</span>
                      <span>LIVE</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-pink-500/20 flex items-center justify-between text-[9px] text-white/50">
                    <span>Currency conversion & order book sync ready</span>
                    <span className="text-pink-400 font-medium">VIEW CODEBASE →</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================== LAPTOP BASE (KEYBOARD DECK) ==================== */}
        <div
          className="relative w-[105%] -left-[2.5%] h-5 sm:h-6 rounded-b-xl bg-gradient-to-b from-[#40424a] via-[#2f3137] to-[#1e1f23] border-x border-b border-white/20 shadow-xl flex items-center justify-center"
          style={{
            transform: 'rotateX(55deg)',
            transformOrigin: 'top center',
          }}
        >
          {/* Thumb Notch Opening */}
          <div className="w-14 h-1 rounded-full bg-black/50 border-t border-white/20 -mt-1" />

          {/* Side Ports */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-1.5 h-1 rounded-xs bg-black/60 border border-white/10" />
            <div className="w-1.5 h-1 rounded-xs bg-black/60 border border-white/10" />
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1 rounded-xs bg-black/60 border border-white/10" />
          </div>
        </div>
      </div>

      {/* ==================== SOFT GROUND CONTACT SHADOW ==================== */}
      <div
        className="w-[85%] max-w-[500px] h-8 mt-1 pointer-events-none transition-all duration-300 blur-lg"
        style={{
          background: `radial-gradient(ellipse at center, ${project.glowColor} 0%, rgba(0, 0, 0, 0.4) 40%, transparent 80%)`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          opacity: isHovered ? 0.6 : 0.4,
        }}
      />
    </div>
  );
}
