"use client";

import React from "react";

export interface KolamProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  color?: string;
  dotColor?: string;
  animated?: boolean;
}

/**
 * Authentic Tamil Sikku / Pulli Kolam (Knotted Loop Pattern)
 * Procedural original SVG geometry inspired by traditional South Indian
 * rice-flour floor art (Kanyakumari / Nagercoil heritage).
 * Includes stroke-dashoffset drawing animation, disabled under prefers-reduced-motion.
 */
export function KolamMandala({
  size = 120,
  className = "",
  color = "currentColor",
  dotColor = "var(--saffron, #FF6A2B)",
  animated = true,
  ...props
}: KolamProps) {
  const animClass = animated
    ? "motion-safe:animate-[kolamDraw_2.8s_cubic-bezier(0.4,0,0.2,1)_forwards] motion-reduce:stroke-dashoffset-0"
    : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      className={`select-none overflow-visible ${className}`}
      {...props}
    >
      <style>{`
        @keyframes kolamDraw {
          from { stroke-dashoffset: 600; opacity: 0.2; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes kolamSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Outer subtle decorative aura ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="4 6"
        strokeOpacity="0.3"
      />
      <circle
        cx="100"
        cy="100"
        r="78"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.2"
      />

      {/* Pulli (Dots) Grid - 5x5 Symmetric Traditional Dot Matrix */}
      <g fill={dotColor} fillOpacity="0.85">
        {/* Center dot */}
        <circle cx="100" cy="100" r="3" />
        {/* Ring 1 dots (4 cardinal) */}
        <circle cx="100" cy="70" r="2.5" />
        <circle cx="100" cy="130" r="2.5" />
        <circle cx="70" cy="100" r="2.5" />
        <circle cx="130" cy="100" r="2.5" />
        {/* Ring 1 dots (4 diagonal) */}
        <circle cx="78.8" cy="78.8" r="2.5" />
        <circle cx="121.2" cy="78.8" r="2.5" />
        <circle cx="78.8" cy="121.2" r="2.5" />
        <circle cx="121.2" cy="121.2" r="2.5" />
        {/* Outer cardinal tips */}
        <circle cx="100" cy="40" r="2" />
        <circle cx="100" cy="160" r="2" />
        <circle cx="40" cy="100" r="2" />
        <circle cx="160" cy="100" r="2" />
      </g>

      {/* Sinuous Interlaced Sikku Loops (Brahma Mudi 8-fold radial loops) */}
      <g
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="600"
        className={animClass}
      >
        {/* 4 Cardinal Interlacing Petals */}
        <path
          d="M 100,50 
             C 115,50 125,70 120,85 
             C 115,100 135,115 150,100 
             C 150,115 130,125 115,120 
             C 100,115 85,135 100,150 
             C 85,150 75,130 80,115 
             C 85,100 65,85 50,100 
             C 50,85 70,75 85,80 
             C 100,85 115,65 100,50 Z"
          strokeOpacity="0.9"
        />

        {/* 4 Diagonal Weaving Petals */}
        <path
          d="M 65,65
             C 80,55 105,75 100,90
             C 95,105 115,125 135,135
             C 120,145 95,125 100,110
             C 105,95 85,75 65,65 Z"
          strokeOpacity="0.75"
        />
        <path
          d="M 135,65
             C 145,80 125,105 110,100
             C 95,95 75,115 65,135
             C 55,120 75,95 90,100
             C 105,105 125,85 135,65 Z"
          strokeOpacity="0.75"
        />

        {/* Central Lotus Knot */}
        <path
          d="M 100,88
             C 108,88 112,94 112,100
             C 112,106 108,112 100,112
             C 92,112 88,106 88,100
             C 88,94 92,88 100,88 Z"
          strokeWidth="1.5"
          strokeOpacity="0.95"
        />

        {/* Outer Petal Flourishes */}
        <path
          d="M 100,35 C 108,42 108,48 100,54 C 92,48 92,42 100,35 Z"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
        <path
          d="M 100,165 C 108,158 108,152 100,146 C 92,152 92,158 100,165 Z"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
        <path
          d="M 35,100 C 42,108 48,108 54,100 C 48,92 42,92 35,100 Z"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
        <path
          d="M 165,100 C 158,108 152,108 146,100 C 152,92 158,92 165,100 Z"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
      </g>
    </svg>
  );
}

/**
 * Section Header Kolam with traditional Tamil Insignia and hairline rules
 */
export function KolamHeader({
  tamilWord = "கற்க",
  label = "Karka AI & Tech Academy",
  className = "",
}: {
  tamilWord?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-saffron select-none ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {/* Left Hairline Rule with Kolam Dot */}
      <div className="flex items-center gap-1.5 flex-1 max-w-[120px]">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-saffron/40 to-saffron" />
        <div className="h-1.5 w-1.5 rounded-full bg-saffron/80" />
      </div>

      {/* Central Kolam Motif & Outlined Tamil Typography */}
      <div className="flex items-center gap-2 px-2 py-0.5 rounded-full border border-saffron/20 bg-saffron/5 backdrop-blur-sm">
        <KolamMandala size={22} color="var(--saffron, #FF6A2B)" animated={false} />
        <span
          lang="ta"
          className="font-tamil text-base font-bold tracking-wider text-saffron drop-shadow-[0_0_8px_rgba(255,106,43,0.4)]"
        >
          {tamilWord}
        </span>
        {label && (
          <>
            <span className="text-white/20 text-xs">•</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-night-muted">
              {label}
            </span>
          </>
        )}
      </div>

      {/* Right Hairline Rule with Kolam Dot */}
      <div className="flex items-center gap-1.5 flex-1 max-w-[120px]">
        <div className="h-1.5 w-1.5 rounded-full bg-saffron/80" />
        <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-saffron/40 to-saffron" />
      </div>
    </div>
  );
}

/**
 * Large Subtle Kolam Hero Background Motif
 */
export function KolamHeroBackdrop({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Spinning decorative outer layer */}
        <div className="motion-safe:animate-[kolamSpinSlow_120s_linear_infinite] motion-reduce:animate-none opacity-20">
          <KolamMandala
            size={480}
            color="#FF6A2B"
            dotColor="#FFD166"
            animated={false}
          />
        </div>

        {/* Ambient Tamil Word Outlined in the Background */}
        <span
          lang="ta"
          className="absolute font-tamil text-[160px] font-black text-transparent select-none opacity-5 [-webkit-text-stroke:2px_#FF6A2B] pointer-events-none"
        >
          கற்க
        </span>
      </div>
    </div>
  );
}

export default KolamMandala;
