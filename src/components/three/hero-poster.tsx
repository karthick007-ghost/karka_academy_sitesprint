import React from "react";

export function HeroPoster() {
  return (
    <div
      role="img"
      aria-label="Karka AI Career Tracks Orbit Visual"
      className="relative flex aspect-square w-full max-w-[480px] items-center justify-center rounded-3xl border border-white/10 bg-night-2 p-8 shadow-glass overflow-hidden"
    >
      {/* Background radial glows */}
      <div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-saffron/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-forest/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Orbit Rings */}
      <div className="absolute h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
      <div className="absolute h-96 w-96 rounded-full border border-dashed border-white/15" aria-hidden="true" />

      {/* Central Glass Core */}
      <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full glass border border-white/20 shadow-2xl text-center p-4">
        <span className="font-tamil text-2xl font-bold text-saffron select-none">கற்க</span>
        <span className="mt-1 text-[11px] font-bold tracking-widest uppercase text-mint">AI CORE</span>
      </div>

      {/* Orbiting Track Chips */}
      <div className="absolute top-10 left-12 z-20 rounded-pill glass px-3 py-1.5 text-xs font-semibold text-night-text border border-white/15 shadow-md">
        Full-Stack
      </div>
      <div className="absolute top-14 right-8 z-20 rounded-pill glass px-3 py-1.5 text-xs font-semibold text-saffron border border-saffron/30 shadow-md">
        Generative AI
      </div>
      <div className="absolute bottom-12 left-10 z-20 rounded-pill glass px-3 py-1.5 text-xs font-semibold text-mint border border-mint/30 shadow-md">
        Data Science
      </div>
      <div className="absolute bottom-16 right-10 z-20 rounded-pill glass px-3 py-1.5 text-xs font-semibold text-night-text border border-white/15 shadow-md">
        UI/UX Design
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 rounded-pill glass px-3 py-1.5 text-xs font-semibold text-night-muted border border-white/10 shadow-md">
        Cloud DevOps
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 rounded-pill glass px-3 py-1.5 text-xs font-semibold text-night-muted border border-white/10 shadow-md">
        Internships
      </div>
    </div>
  );
}
