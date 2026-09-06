import React, { useState } from 'react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  color: string;
  glowColor: string;
  icon: (props: { className?: string; color?: string }) => React.ReactNode;
}

// Crisp, scalable brand SVGs matching the exact editorial reference
const ReactIcon = ({ color = '#00d8ff' }: { color?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-9 h-9" fill="none">
    <circle cx="0" cy="0" r="2.05" fill={color} />
    <g stroke={color} strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = ({ color = '#ffffff' }: { color?: string }) => (
  <svg viewBox="0 0 180 180" className="w-8 h-8" fill="none">
    <circle cx="90" cy="90" r="90" fill="#000000" />
    <path
      d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
      fill={color}
    />
    <rect x="115" y="54" width="12" height="72" fill={color} />
  </svg>
);

const NodejsIcon = ({ color = '#539e43' }: { color?: string }) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
    <path
      d="M16 2L3 9.5V24.5L16 32L29 24.5V9.5L16 2Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M16 11V22M11 14L16 11L21 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 110 110" className="w-8 h-8">
    <path
      d="M54.5 10C35.2 10 36.5 18.3 36.5 18.3L36.6 27H55V29.7H29.1C18.1 29.7 10 38.2 10 54.3C10 70.3 16.5 73.8 24.8 73.8H30.4V65.8C30.4 56.4 38.3 48.6 47.7 48.6H66.2C71.7 48.6 76.1 44.2 76.1 38.7V24C76.1 16 69.3 10 54.5 10ZM45.2 17.5C47.8 17.5 49.9 19.6 49.9 22.2C49.9 24.8 47.8 26.9 45.2 26.9C42.6 26.9 40.5 24.8 40.5 22.2C40.5 19.6 42.6 17.5 45.2 17.5Z"
      fill="#387eb8"
    />
    <path
      d="M55.5 100C74.8 100 73.5 91.7 73.5 91.7L73.4 83H55V80.3H80.9C91.9 80.3 100 71.8 100 55.7C100 39.7 93.5 36.2 85.2 36.2H79.6V44.2C79.6 53.6 71.7 61.4 62.3 61.4H43.8C38.3 61.4 33.9 65.8 33.9 71.3V86C33.9 94 40.7 100 55.5 100ZM64.8 92.5C62.2 92.5 60.1 90.4 60.1 87.8C60.1 85.2 62.2 83.1 64.8 83.1C67.4 83.1 69.5 85.2 69.5 87.8C69.5 90.4 67.4 92.5 64.8 92.5Z"
      fill="#ffe052"
    />
  </svg>
);

const MongoIcon = ({ color = '#47a248' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path
      d="M12 2C12 2 6 8.5 6 14.5C6 18.5 8.7 21.8 12 22C15.3 21.8 18 18.5 18 14.5C18 8.5 12 2 12 2Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M12 2.5V21.5"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);

const SqlIcon = ({ color = '#00758f' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <ellipse cx="12" cy="6" rx="9" ry="3" stroke={color} strokeWidth="1.8" />
    <path d="M3 6V12C3 13.66 7.03 15 12 15C16.97 15 21 13.66 21 12V6" stroke={color} strokeWidth="1.8" />
    <path d="M3 12V18C3 19.66 7.03 21 12 21C16.97 21 21 19.66 21 18V12" stroke={color} strokeWidth="1.8" />
  </svg>
);

const PowerBiIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
    <rect x="5" y="16" width="5" height="12" rx="1.5" fill="#f2c811" />
    <rect x="13.5" y="10" width="5" height="18" rx="1.5" fill="#f2c811" />
    <rect x="22" y="4" width="5" height="24" rx="1.5" fill="#f2c811" />
  </svg>
);

const TailwindIcon = ({ color = '#38bdf8' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color}>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const GitIcon = ({ color = '#f05032' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <path
      d="M21.6 10.9L13.1 2.4C12.3 1.6 11.1 1.6 10.3 2.4L8.7 4L11.5 6.8C12.3 6.5 13.3 6.7 13.9 7.3C14.6 8 14.7 9 14.3 9.8L17.1 12.6C17.9 12.2 18.9 12.3 19.6 13C20.5 13.9 20.5 15.3 19.6 16.2C18.7 17.1 17.3 17.1 16.4 16.2C15.8 15.6 15.6 14.6 16 13.8L13.3 11.1V17.3C13.5 17.5 13.7 17.9 13.7 18.3C13.7 19.5 12.7 20.5 11.5 20.5C10.3 20.5 9.3 19.5 9.3 18.3C9.3 17.4 9.9 16.6 10.7 16.3V9.7C9.9 9.4 9.3 8.6 9.3 7.7C9.3 7.3 9.4 6.9 9.7 6.6L7 3.9L2.4 8.5C1.6 9.3 1.6 10.5 2.4 11.3L10.9 19.8C11.7 20.6 12.9 20.6 13.7 19.8L21.6 11.9C22.4 11.1 22.4 9.9 21.6 10.9Z"
      fill={color}
    />
  </svg>
);

const AwsIcon = ({ color = '#ff9900' }: { color?: string }) => (
  <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none">
    <path
      d="M19.5 19.5C16.8 21.2 13 22 9.5 22C4.5 22 1.5 20 1 19.5C0.8 19.3 0.9 19 1.2 19.1C3.5 20.2 6.5 20.8 9.5 20.8C12.5 20.8 16 20.1 19 18.7C19.4 18.5 19.7 18.9 19.5 19.5Z"
      fill={color}
    />
    <path
      d="M20.5 18C20 17.4 17.8 17.6 16.8 17.8C16.5 17.8 16.4 17.6 16.6 17.4C17.9 16.3 20.8 16.5 21.2 17C21.6 17.5 20.8 20.5 19.5 21.6C19.3 21.8 19.1 21.7 19.2 21.5C19.6 20.6 21 18.6 20.5 18Z"
      fill={color}
    />
    <text x="1" y="14" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">
      aws
    </text>
  </svg>
);

const TECH_CARDS: TechItem[] = [
  { id: 'react', name: 'React', category: 'Frontend', color: '#00d8ff', glowColor: 'rgba(0, 216, 255, 0.35)', icon: ReactIcon },
  { id: 'nextjs', name: 'Next.js', category: 'Fullstack', color: '#ffffff', glowColor: 'rgba(255, 255, 255, 0.35)', icon: NextjsIcon },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', color: '#539e43', glowColor: 'rgba(83, 158, 67, 0.35)', icon: NodejsIcon },
  { id: 'python', name: 'Python', category: 'AI & Data', color: '#ffd438', glowColor: 'rgba(255, 212, 56, 0.35)', icon: PythonIcon },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', color: '#47a248', glowColor: 'rgba(71, 162, 72, 0.35)', icon: MongoIcon },
  { id: 'sql', name: 'SQL', category: 'Database', color: '#00758f', glowColor: 'rgba(0, 117, 143, 0.35)', icon: SqlIcon },
  { id: 'powerbi', name: 'Power BI', category: 'Analytics', color: '#f2c811', glowColor: 'rgba(242, 200, 17, 0.35)', icon: PowerBiIcon },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Styling', color: '#38bdf8', glowColor: 'rgba(56, 189, 248, 0.35)', icon: TailwindIcon },
  { id: 'git', name: 'Git', category: 'DevOps', color: '#f05032', glowColor: 'rgba(240, 80, 50, 0.35)', icon: GitIcon },
  { id: 'aws', name: 'AWS', category: 'Cloud', color: '#ff9900', glowColor: 'rgba(255, 153, 0, 0.35)', icon: AwsIcon },
];

export function TechStack3DGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full py-4 select-none">
      {/* 3D Isometric / Staggered Acrylic Glass Cards Grid matching the exact reference */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 max-w-2xl mx-auto">
        {TECH_CARDS.map((tech) => {
          const isHovered = hoveredId === tech.id;
          const Icon = tech.icon;

          return (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredId(tech.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer"
              style={{
                perspective: '800px',
              }}
            >
              {/* 3D Acrylic Glass Card */}
              <div
                className={`relative flex flex-col items-center justify-between p-4 sm:p-5 h-32 sm:h-36 rounded-xl border transition-all duration-300 ease-out will-change-transform ${
                  isHovered
                    ? 'scale-105 -translate-y-2 border-white/60 bg-white/[0.14] shadow-[0_20px_35px_rgba(0,0,0,0.45)]'
                    : 'border-white/20 bg-white/[0.06] hover:border-white/40 hover:bg-white/[0.09] shadow-[0_12px_24px_rgba(0,0,0,0.25)]'
                }`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(0,0,0,0.45), 0 0 25px ${tech.glowColor}`
                    : '0 10px 25px rgba(0,0,0,0.25)',
                }}
              >
                {/* Frosted Glass Highlight Glare across upper slant */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.18] to-transparent rounded-t-xl pointer-events-none" />

                {/* Subtle Ambient Brand Aura on Hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${tech.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Icon with Hover Float */}
                <div className="relative z-10 flex items-center justify-center h-14 w-14 transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </div>

                {/* Label & Category */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                  <span
                    className={`text-[10px] tracking-wider uppercase font-normal transition-all duration-200 mt-0.5 ${
                      isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                    }`}
                    style={{ color: tech.color }}
                  >
                    {tech.category}
                  </span>
                </div>

                {/* Active Indicator Pip */}
                <div
                  className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                  style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
