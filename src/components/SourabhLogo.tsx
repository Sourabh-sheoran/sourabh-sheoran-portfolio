import React from 'react';

interface SourabhLogoProps {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

export const SourabhLogo: React.FC<SourabhLogoProps> = ({
  size = 28,
  className = '',
  withGlow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Subtle Ambient Radial Glow on Hover */}
      {withGlow && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sky-500/20 via-white/10 to-indigo-500/20 blur-sm opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#181920" />
            <stop offset="100%" stopColor="#090a0d" />
          </linearGradient>
          <linearGradient id="logoBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#71717a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="logoSilverPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F4F4F5" />
            <stop offset="100%" stopColor="#A1A1AA" />
          </linearGradient>
          <linearGradient id="logoSilverSecondary" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E4E4E7" />
            <stop offset="60%" stopColor="#A1A1AA" />
            <stop offset="100%" stopColor="#71717A" />
          </linearGradient>
          <linearGradient id="logoAccentCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <radialGradient id="logoInnerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Squircle Base Frame */}
        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="16"
          fill="url(#logoBgGrad)"
          stroke="url(#logoBorderGrad)"
          strokeWidth="1.75"
        />
        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="15"
          fill="url(#logoInnerGlow)"
        />

        {/* Architectural 'SS' Editorial Monogram */}
        <g>
          {/* Primary 'S' (Sourabh) - Bold Architectural Contour */}
          <path
            d="M41 20.5H26C22.686 20.5 20 23.186 20 26.5C20 29.814 22.686 32.5 26 32.5H38C41.314 32.5 44 35.186 44 38.5C44 41.814 41.314 44.5 38 44.5H23"
            stroke="url(#logoSilverPrimary)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary Echo 'S' (Sheoran) - Interlocking Accent Contour */}
          <path
            d="M44 26.5C44 23.186 41.314 20.5 38 20.5M26 44.5C22.686 44.5 20 41.814 20 38.5"
            stroke="url(#logoSilverSecondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Central Precision Diamond Core */}
          <rect
            x="30"
            y="30"
            width="4"
            height="4"
            transform="rotate(45 32 32)"
            fill="url(#logoAccentCore)"
          />

          {/* Signature Micro Dots */}
          <circle cx="43.5" cy="20.5" r="1.5" fill="#FFFFFF" />
          <circle cx="20.5" cy="44.5" r="1.5" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
};

export default SourabhLogo;
