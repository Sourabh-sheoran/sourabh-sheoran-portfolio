import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getAssetUrl } from '../utils/assets';

interface MotionPortraitProps {
  imageSrc: string;
  altText?: string;
  className?: string;
  maxTilt?: number;       // Maximum tilt angle in degrees
  maxTranslate?: number;  // Maximum lateral shift in pixels
  enableGlare?: boolean;  // Dynamic specular light reflection
}

export const MotionPortrait: React.FC<MotionPortraitProps> = ({
  imageSrc,
  altText = 'Sourabh Sheoran',
  className = '',
  maxTilt = 8,
  maxTranslate = 14,
  enableGlare = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Physics states tracked in refs for 60/120fps performance without React re-renders
  const mousePos = useRef({ x: 0, y: 0, isHovered: false });
  const currentTransform = useRef({
    rotX: 0,
    rotY: 0,
    transX: 0,
    transY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });
  const targetTransform = useRef({
    rotX: 0,
    rotY: 0,
    transX: 0,
    transY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const animFrameId = useRef<number | null>(null);
  const clockRef = useRef(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Linear interpolation utility
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Mouse & touch handlers on window for seamless tracking anywhere
  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      // Calculate normalized position relative to viewport (-1 to 1)
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = (clientY / window.innerHeight) * 2 - 1;

      mousePos.current.x = normX;
      mousePos.current.y = normY;
      mousePos.current.isHovered = true;

      // Target 3D rotation & translation
      // Yaw (rotY) follows horizontal cursor; Pitch (rotX) follows vertical cursor
      targetTransform.current.rotY = normX * maxTilt;
      targetTransform.current.rotX = -normY * (maxTilt * 0.75);
      targetTransform.current.transX = normX * maxTranslate;
      targetTransform.current.transY = normY * (maxTranslate * 0.4);

      // Glare position (percentage across image)
      const glareX = ((clientX / window.innerWidth) * 100).toFixed(1);
      const glareY = ((clientY / window.innerHeight) * 100).toFixed(1);
      targetTransform.current.glareX = parseFloat(glareX);
      targetTransform.current.glareY = parseFloat(glareY);
      targetTransform.current.glareOpacity = 0.22;
    },
    [maxTilt, maxTranslate]
  );

  const handlePointerLeave = useCallback(() => {
    mousePos.current.isHovered = false;
    targetTransform.current.rotX = 0;
    targetTransform.current.rotY = 0;
    targetTransform.current.transX = 0;
    targetTransform.current.transY = 0;
    targetTransform.current.glareOpacity = 0;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);

    let lastTime = performance.now();

    const renderLoop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      clockRef.current += delta;

      // Subtle ambient breathing/floating oscillation when idle or subtle overlay
      const t = clockRef.current;
      const ambientSwayX = Math.sin(t * 0.8) * 3;
      const ambientSwayY = Math.cos(t * 1.1) * 3.5;
      const ambientTiltY = Math.sin(t * 0.6) * 1.2;
      const ambientTiltX = Math.cos(t * 0.7) * 0.8;

      // Damping factor for smooth ease-out (lerp)
      const damping = 0.075;
      const curr = currentTransform.current;
      const target = targetTransform.current;

      curr.rotX = lerp(curr.rotX, target.rotX + ambientTiltX, damping);
      curr.rotY = lerp(curr.rotY, target.rotY + ambientTiltY, damping);
      curr.transX = lerp(curr.transX, target.transX + ambientSwayX, damping);
      curr.transY = lerp(curr.transY, target.transY + ambientSwayY, damping);
      curr.glareX = lerp(curr.glareX, target.glareX, damping);
      curr.glareY = lerp(curr.glareY, target.glareY, damping);
      curr.glareOpacity = lerp(curr.glareOpacity, target.glareOpacity, damping);

      // Apply GPU-accelerated 3D matrix transform
      if (portraitRef.current) {
        portraitRef.current.style.transform = `
          perspective(1200px)
          translate3d(${curr.transX.toFixed(2)}px, ${curr.transY.toFixed(2)}px, 0px)
          rotateX(${curr.rotX.toFixed(2)}deg)
          rotateY(${curr.rotY.toFixed(2)}deg)
          scale(1.02)
        `;
      }

      // Apply shadow transform
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(${(curr.transX * 0.4).toFixed(2)}px) scaleX(1.1)`;
      }

      // Apply dynamic specular glare highlight
      if (glareRef.current && enableGlare) {
        glareRef.current.style.opacity = curr.glareOpacity.toFixed(3);
        glareRef.current.style.background = `radial-gradient(circle 380px at ${curr.glareX.toFixed(
          1
        )}% ${curr.glareY.toFixed(
          1
        )}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 75%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [handlePointerMove, handlePointerLeave, enableGlare]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-end justify-center pointer-events-none select-none ${className}`}
      style={{
        transformOrigin: 'bottom center',
        perspective: '1200px',
      }}
    >
      {/* Dynamic ambient ground shadow */}
      <div
        ref={shadowRef}
        className="absolute bottom-6 sm:bottom-8 w-[45%] h-6 bg-black/50 blur-xl rounded-full transition-opacity duration-700 pointer-events-none"
      />

      {/* Main Cutout Portrait with 3D transform & bottom pivot */}
      <div
        ref={portraitRef}
        className="relative h-[90vh] sm:h-[93vh] max-h-[960px] w-auto flex items-end justify-center will-change-transform pointer-events-none"
        style={{
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            // Fallback to local copy if remote path fails
            e.currentTarget.src = getAssetUrl('portrait.png');
          }}
          className={`h-full w-auto max-w-none object-contain object-bottom select-none transition-opacity duration-700 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.28))',
          }}
          draggable={false}
        />

        {/* Dynamic Specular Studio Lighting Sheen over the silhouette */}
        {enableGlare && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
            style={{
              WebkitMaskImage: `url(${imageSrc})`,
              maskImage: `url(${imageSrc})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'bottom center',
              maskPosition: 'bottom center',
              opacity: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
