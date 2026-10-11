import React from "react";

export function HeroPoster() {
  return (
    <div
      role="img"
      aria-label="Karka AI Career Tracks Celestial Orbit Visual"
      className="relative flex flex-col aspect-square w-full max-w-[500px] items-center justify-center rounded-3xl border border-white/10 bg-night-2/95 p-6 shadow-glass overflow-hidden"
    >
      {/* Background radial celestial glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-saffron/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-mint/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Luminous Orbital Rings */}
      <div
        className="absolute h-56 w-56 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        aria-hidden="true"
      />
      <div
        className="absolute h-80 w-80 rounded-full border border-dashed border-white/25"
        aria-hidden="true"
      />
      <div
        className="absolute h-[380px] w-[380px] rounded-full border border-white/15"
        aria-hidden="true"
      />

      {/* Central Radiant Celestial Star Core */}
      <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#FFB347] via-[#FF6A2B] to-[#D94E15] border-2 border-amber-300 shadow-[0_0_50px_rgba(255,106,43,0.8),_inset_0_0_20px_rgba(255,240,160,0.6)] text-center p-4">
        {/* Pulsing Coronal Halo */}
        <div className="absolute -inset-2.5 rounded-full border border-amber-400/40 animate-pulse pointer-events-none" />
        <span
          lang="ta"
          className="font-tamil text-3xl font-black text-amber-50 select-none drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
        >
          கற்க
        </span>
        <span className="mt-0.5 text-[10px] font-black tracking-[0.2em] uppercase text-amber-100 drop-shadow-[0_0_6px_rgba(255,106,43,0.8)]">
          AI CORE
        </span>
      </div>

      {/* Distinct Orbiting Planets with High-Contrast Badges */}

      {/* Orbit 1: Full-Stack Dev (Electric Saffron) */}
      <div className="absolute top-16 left-14 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-night-1/90 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF6A2B] shadow-[0_0_8px_#FF6A2B]" />
        <span>Full-Stack Dev</span>
      </div>

      {/* Orbit 1: UI/UX Design (Coral / Sunset Pink) */}
      <div className="absolute bottom-16 right-14 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-night-1/90 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5E7E] shadow-[0_0_8px_#FF5E7E]" />
        <span>UI/UX Design</span>
      </div>

      {/* Orbit 2: Generative AI (Cyber Cyan / Mint) */}
      <div className="absolute top-20 right-10 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-night-1/90 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
        <span>Generative AI</span>
      </div>

      {/* Orbit 2: Cloud & DevOps (Ice Blue) */}
      <div className="absolute bottom-20 left-10 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-night-1/90 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]" />
        <span>Cloud & DevOps</span>
      </div>

      {/* Orbit 3: Data Science & ML (Cyber Gold) */}
      <div className="absolute top-6 right-24 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-night-1/90 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166] shadow-[0_0_8px_#FFD166]" />
        <span>Data Science & ML</span>
      </div>

      {/* Orbit 3: Client Internships (Forest Jade) */}
      <div className="absolute bottom-6 left-24 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-night-1/90 px-3 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2EC4B6] shadow-[0_0_8px_#2EC4B6]" />
        <span>Client Internships</span>
      </div>
    </div>
  );
}

export default HeroPoster;
