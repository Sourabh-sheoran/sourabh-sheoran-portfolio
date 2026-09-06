import React, { useState, useEffect, useRef } from 'react';
import { getAssetUrl } from '../utils/assets';

interface MediaFeed {
  id: 'instagram' | 'linkedin';
  title: string;
  handle: string;
  url: string;
  badgeColor: string;
  glowColor: string;
  accentGradient: string;
  mp4Src: string;
  movSrc: string;
  description: string;
}

const FEEDS: MediaFeed[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    handle: '@soouuraabbh',
    url: 'https://www.instagram.com/soouuraabbh/?hl=en',
    badgeColor: '#E1306C',
    glowColor: 'rgba(225, 48, 108, 0.22)',
    accentGradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
    mp4Src: getAssetUrl('videos/insta.mp4'),
    movSrc: getAssetUrl('videos/insta.mov'),
    description: 'Visual stories, creative design & live updates',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    handle: 'Sourabh Sheoran',
    url: 'https://www.linkedin.com/in/sourabh-sheoran-8173281a8/',
    badgeColor: '#0A66C2',
    glowColor: 'rgba(10, 102, 194, 0.22)',
    accentGradient: 'from-[#0A66C2] via-[#0077B5] to-[#00A0DC]',
    mp4Src: getAssetUrl('videos/linkdin.mp4'),
    movSrc: getAssetUrl('videos/linkdin.mov'),
    description: 'Professional journey, projects & endorsements',
  },
];

export const IPhoneShowcase: React.FC = () => {
  const [feedIndex, setFeedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const phoneContainerRef = useRef<HTMLDivElement | null>(null);
  const instaVideoRef = useRef<HTMLVideoElement | null>(null);
  const linkedinVideoRef = useRef<HTMLVideoElement | null>(null);

  const currentFeed = FEEDS[feedIndex];

  // Helper to ensure video is configured with muted DOM property and started
  const playVideoSafe = (video: HTMLVideoElement | null) => {
    if (!video) return;
    try {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      (video as any).webkitPlaysInline = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPaused(false))
          .catch(() => {
            // Autoplay might be deferred until user interaction
            setIsPaused(true);
          });
      }
    } catch {
      setIsPaused(true);
    }
  };

  // Continuous auto-shuffle timer without any external force (every 6 seconds)
  useEffect(() => {
    const CYCLE_DURATION = 6000;
    const INTERVAL_STEP = 50;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (INTERVAL_STEP / CYCLE_DURATION) * 100;
        if (next >= 100) {
          setFeedIndex((idx) => (idx + 1) % FEEDS.length);
          return 0;
        }
        return next;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(progressTimer);
  }, []);

  // Ensure active video is playing whenever feed changes
  useEffect(() => {
    const activeVideo = feedIndex === 0 ? instaVideoRef.current : linkedinVideoRef.current;
    if (activeVideo) {
      playVideoSafe(activeVideo);
    }
  }, [feedIndex]);

  // IntersectionObserver: when phone enters viewport on scroll, trigger playback
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideoSafe(instaVideoRef.current);
            playVideoSafe(linkedinVideoRef.current);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (phoneContainerRef.current) {
      observer.observe(phoneContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Wake up video playback on any page interaction (scroll, click, touch)
  useEffect(() => {
    const wakeUpVideos = () => {
      const activeVideo = feedIndex === 0 ? instaVideoRef.current : linkedinVideoRef.current;
      playVideoSafe(activeVideo);
    };

    window.addEventListener('pointerdown', wakeUpVideos, { passive: true });
    window.addEventListener('touchstart', wakeUpVideos, { passive: true });
    window.addEventListener('scroll', wakeUpVideos, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', wakeUpVideos);
      window.removeEventListener('touchstart', wakeUpVideos);
      window.removeEventListener('scroll', wakeUpVideos);
    };
  }, [feedIndex]);

  const handlePhoneClick = () => {
    const activeVideo = feedIndex === 0 ? instaVideoRef.current : linkedinVideoRef.current;
    if (activeVideo && activeVideo.paused) {
      playVideoSafe(activeVideo);
      return;
    }
    window.open(currentFeed.url, '_blank');
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 select-none">
      {/* Ambient Platform Glow that smoothly shifts between Instagram Pink and LinkedIn Blue */}
      <div
        className="absolute w-[360px] h-[520px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 -z-10"
        style={{
          background: `radial-gradient(circle, ${currentFeed.glowColor} 0%, rgba(255,255,255,0.02) 70%, transparent 100%)`,
        }}
      />

      {/* Dynamic Advertisement Header Pill */}
      <div className="mb-5 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md transition-all duration-500 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: currentFeed.badgeColor }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: currentFeed.badgeColor }}
          />
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase text-white/60">
          LIVE SHOWCASE •{' '}
          <span className="text-white font-semibold">{currentFeed.title}</span>
        </span>
        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden ml-1">
          <div
            className="h-full transition-all duration-75 ease-linear rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: currentFeed.badgeColor,
            }}
          />
        </div>
      </div>

      {/* Main iPhone Body Container */}
      <div
        ref={phoneContainerRef}
        className="relative group cursor-pointer"
        onClick={handlePhoneClick}
      >
        {/* Physical External Buttons */}
        {/* Left: Action button */}
        <div className="absolute -left-[3px] top-[115px] w-[3px] h-[26px] bg-[#3a3a42] rounded-l-sm" />
        {/* Left: Volume Up */}
        <div className="absolute -left-[3px] top-[155px] w-[3px] h-[50px] bg-[#3a3a42] rounded-l-sm" />
        {/* Left: Volume Down */}
        <div className="absolute -left-[3px] top-[215px] w-[3px] h-[50px] bg-[#3a3a42] rounded-l-sm" />
        {/* Right: Power / Siri Button */}
        <div className="absolute -right-[3px] top-[170px] w-[3px] h-[75px] bg-[#3a3a42] rounded-r-sm" />

        {/* Outer Phone Bezel with Titanium Edge Finish */}
        <div className="relative w-[300px] sm:w-[320px] h-[610px] sm:h-[650px] rounded-[52px] p-[10px] bg-[#1a1a20] border-[4px] border-[#383842] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08),0_0_35px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1">
          {/* Inner Screen Bezel */}
          <div className="relative w-full h-full rounded-[42px] bg-black overflow-hidden border border-white/10 flex flex-col justify-between">
            {/* Top Speaker Ear Slit */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#232328] rounded-full z-40 pointer-events-none" />

            {/* Apple Dynamic Island matching iPhone 15/16 Pro */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-[25px] bg-black rounded-full z-40 flex items-center justify-between px-3 border border-white/[0.08] shadow-md pointer-events-none opacity-90">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0c0c14] border border-[#2b2b3b]/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: currentFeed.badgeColor }}
                />
                <div className="w-2.5 h-2.5 rounded-full bg-[#11111a] border border-[#2a2a38]" />
              </div>
            </div>

            {/* Video Screens Viewport Container */}
            <div className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-black">
              {/* Instagram Video Layer */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  currentFeed.id === 'instagram'
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <video
                  ref={(el) => {
                    instaVideoRef.current = el;
                    if (el) {
                      el.muted = true;
                      el.defaultMuted = true;
                      el.playsInline = true;
                    }
                  }}
                  src={getAssetUrl('videos/insta.mp4')}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => playVideoSafe(e.currentTarget)}
                  onLoadedData={(e) => playVideoSafe(e.currentTarget)}
                  onPlay={() => {
                    if (feedIndex === 0) setIsPaused(false);
                  }}
                  onPause={() => {
                    if (feedIndex === 0) setIsPaused(true);
                  }}
                  onEnded={(e) => {
                    e.currentTarget.currentTime = 0;
                    playVideoSafe(e.currentTarget);
                  }}
                  className="w-full h-full object-cover object-top"
                >
                  <source src={getAssetUrl('videos/insta.mp4')} type="video/mp4" />
                  <source src={getAssetUrl('videos/insta.mov')} type="video/quicktime" />
                </video>
              </div>

              {/* LinkedIn Video Layer */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  currentFeed.id === 'linkedin'
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <video
                  ref={(el) => {
                    linkedinVideoRef.current = el;
                    if (el) {
                      el.muted = true;
                      el.defaultMuted = true;
                      el.playsInline = true;
                    }
                  }}
                  src={getAssetUrl('videos/linkdin.mp4')}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => playVideoSafe(e.currentTarget)}
                  onLoadedData={(e) => playVideoSafe(e.currentTarget)}
                  onPlay={() => {
                    if (feedIndex === 1) setIsPaused(false);
                  }}
                  onPause={() => {
                    if (feedIndex === 1) setIsPaused(true);
                  }}
                  onEnded={(e) => {
                    e.currentTarget.currentTime = 0;
                    playVideoSafe(e.currentTarget);
                  }}
                  className="w-full h-full object-cover object-top"
                >
                  <source src={getAssetUrl('videos/linkdin.mp4')} type="video/mp4" />
                  <source src={getAssetUrl('videos/linkdin.mov')} type="video/quicktime" />
                </video>
              </div>

              {/* Fallback Tap to Play Indicator if autoplay blocked by strict browser policy */}
              {isPaused && (
                <div
                  className="absolute inset-0 z-25 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    const activeVideo = feedIndex === 0 ? instaVideoRef.current : linkedinVideoRef.current;
                    playVideoSafe(activeVideo);
                  }}
                >
                  <div className="px-4 py-2 rounded-full bg-white/20 border border-white/40 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-pulse">
                    <span className="text-sm">▶</span>
                    <span>Tap to Play Live Demo</span>
                  </div>
                </div>
              )}

              {/* Screen Glass Glare / Specular Reflection Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.08] pointer-events-none z-20" />
            </div>

            {/* In-Phone Bottom Interactive Action Banner (Advertisement style) */}
            <div className="relative z-30 mt-auto pb-4 px-4 pointer-events-auto">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(currentFeed.url, '_blank');
                }}
                className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-xl flex items-center justify-between transition-all duration-500 hover:border-white/40 hover:bg-black/80 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md"
                    style={{ backgroundColor: currentFeed.badgeColor }}
                  >
                    {currentFeed.id === 'instagram' ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-white leading-tight">
                      {currentFeed.handle}
                    </div>
                    <div className="text-[10px] text-white/50">
                      Tap anywhere to visit
                    </div>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-colors">
                  <span className="text-xs">↗</span>
                </div>
              </div>

              {/* Apple Home Bar */}
              <div className="w-32 h-1 bg-white/60 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>

        {/* Realistic Shadow Cast Beneath Phone */}
        <div className="w-[260px] h-6 bg-black/70 blur-xl rounded-full mx-auto -mt-2 pointer-events-none" />
      </div>

      {/* Direct Indicator / External Interaction Links */}
      <div className="mt-4 flex items-center gap-4">
        {FEEDS.map((feed, idx) => {
          const isActive = idx === feedIndex;
          return (
            <button
              key={feed.id}
              onClick={(e) => {
                e.stopPropagation();
                setFeedIndex(idx);
                setProgress(0);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-white/15 text-white border border-white/20 shadow-md scale-105'
                  : 'bg-white/5 text-white/40 border border-transparent hover:text-white/70'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: feed.badgeColor }}
              />
              <span>{feed.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IPhoneShowcase;
