import { useEffect, useRef, useState } from 'react';

interface Laptop3DMockupProps {
  className?: string;
}

export function Laptop3DMockup({ className = '' }: Laptop3DMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);

  // Dynamic values driven by high-performance requestAnimationFrame loop
  const [motion, setMotion] = useState({
    rotY: 0,
    rotX: 0,
    floatY: 0,
    reflectionPos: 50,
    shadowScale: 1,
    shadowOpacity: 0.42,
  });

  useEffect(() => {
    const startTime = performance.now();

    const updateLoop = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Damped smooth mouse interpolation (spring feel)
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.05;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.05;

      // Showroom-style continuous slow oscillation around vertical Y-axis:
      // Gently moves from slight left-facing (-6.5deg) to slight right-facing (+6.5deg) and back
      // Slow, cinematic 8.5-second loop
      const cycle = elapsed * 0.74; // ~8.5s per cycle
      const baseYRot = Math.sin(cycle) * 6.5;
      const baseXRot = Math.cos(cycle * 0.9) * 1.2;

      // Extremely subtle floating up-and-down movement (approx +/- 6px)
      const floatY = Math.sin(cycle * 1.2) * 6;

      // Realistic soft reflection gliding across screen & body as laptop turns
      // Reflection moves oppositely to rotation to simulate fixed studio light
      const reflectionPos = 50 + Math.sin(cycle) * 35;

      // Soft contact shadow reacts in sync with floating height
      const shadowScale = 1 - (floatY / 6) * 0.04;
      const shadowOpacity = 0.42 - (floatY / 6) * 0.08;

      setMotion({
        rotY: baseYRot + mouseCurrentRef.current.x * 3.5,
        rotX: baseXRot - mouseCurrentRef.current.y * 2.5,
        floatY,
        reflectionPos,
        shadowScale,
        shadowOpacity,
      });

      animRef.current = requestAnimationFrame(updateLoop);
    };

    animRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseTargetRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  };

  const handleMouseLeave = () => {
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{
        perspective: '1300px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Rotating & Floating Laptop Stage */}
      <div
        className="relative w-full max-w-[620px] transition-transform duration-75 will-change-transform flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateY(${motion.floatY}px) rotateY(${motion.rotY}deg) rotateX(${motion.rotX}deg)`,
        }}
      >
        {/* The Exact Laptop Mockup Image with 100% preserved ChatApp UI */}
        <div className="relative w-full">
          <img
            src="/laptop_clean.png"
            alt="ChatApp 3D Laptop Mockup"
            className="w-full h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] pointer-events-none"
            draggable={false}
          />

          {/* Realistic Soft Light Reflection Sheen gliding over screen & body - strictly clipped to laptop silhouette */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 transition-opacity duration-300"
            style={{
              WebkitMaskImage: "url('/laptop_clean.png')",
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: "url('/laptop_clean.png')",
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              background: `linear-gradient(115deg, 
                transparent ${motion.reflectionPos - 28}%, 
                rgba(255, 255, 255, 0.12) ${motion.reflectionPos - 12}%, 
                rgba(255, 255, 255, 0.45) ${motion.reflectionPos}%, 
                rgba(255, 255, 255, 0.12) ${motion.reflectionPos + 12}%, 
                transparent ${motion.reflectionPos + 28}%)`,
            }}
          />

          {/* Subtle Glass Glare Accent - strictly clipped to laptop silhouette */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
            style={{
              WebkitMaskImage: "url('/laptop_clean.png')",
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: "url('/laptop_clean.png')",
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              background: `radial-gradient(ellipse at ${motion.reflectionPos}% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>

      {/* Realistic Soft Floor Contact Shadow that breathes with the 3D float */}
      <div
        className="w-[82%] h-8 mt-[-10px] pointer-events-none transition-all duration-75 blur-md"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 45%, transparent 75%)',
          transform: `scale(${motion.shadowScale})`,
          opacity: motion.shadowOpacity,
        }}
      />
    </div>
  );
}
