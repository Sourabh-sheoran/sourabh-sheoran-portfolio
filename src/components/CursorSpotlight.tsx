import React, { useEffect, useState, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setMounted(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, [role="button"], .interactive-hover');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for the ambient spotlight
    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Large Ambient Specular Spotlight (500x500 radial glow) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full will-change-transform pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(56, 189, 248, 0.02) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 2. Micro Cursor Ring & Dot with magnetic hover expansion */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 -ml-4 -mt-4 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
            isHovered
              ? 'w-10 h-10 -ml-1 -mt-1 border border-white/60 bg-white/10 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
              : 'w-8 h-8 border border-white/20 bg-white/[0.02]'
          }`}
        >
          <div
            className={`rounded-full transition-all duration-150 ${
              isHovered ? 'w-1.5 h-1.5 bg-white shadow-sm' : 'w-1 h-1 bg-white/70'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default CursorSpotlight;
