"use client";

import React, { useState, useRef, useId } from "react";
import { normalizeTrackId } from "@/components/three/track-objects/types";

export interface Course3DVisualProps {
  track: string;
  slug?: string;
  title?: string;
  className?: string;
}

/**
 * Course3DVisual:
 * High-fidelity, GPU-accelerated 3D Motion Visual Engine for course cards.
 * 
 * Provides continuous 3D multi-axis motion, depth layering (translateZ),
 * specular reflections, and reactive perspective tilt on hover across ALL 37 courses.
 * Eliminates WebGL context exhaustion (max 8-16 contexts) while delivering
 * rich 60 FPS 3D visuals on every single course card simultaneously.
 */
export function Course3DVisual({
  track,
  slug = "",
  title = "",
  className = "",
}: Course3DVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, isHovered: false });
  const rawId = useId();
  const id = rawId.replace(/:/g, "_");

  const canonical = normalizeTrackId(track);

  // Mouse move perspective tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle +-12 deg tilt
    const rx = ((y - centerY) / centerY) * -12;
    const ry = ((x - centerX) / centerX) * 12;

    setTilt({ rx, ry, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, isHovered: false });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden select-none perspective-800 flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Radial Glow Cloud */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          tilt.isHovered ? "opacity-90 scale-110" : "opacity-60 scale-100"
        }`}
        style={{
          background: getAmbientGradient(canonical),
        }}
      />

      {/* 3D Coordinate Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: tilt.isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04)`
            : "rotateX(6deg) rotateY(-6deg) scale(1)",
        }}
      >
        {/* Plane 1: Background Orbital Grid & Aura (translateZ -15px) */}
        <div
          className="absolute w-36 h-36 rounded-full border border-ui/10 dark:border-white/10 animate-spin-3d pointer-events-none"
          style={{
            transform: "translateZ(-15px)",
            borderStyle: "dashed",
          }}
        />

        {/* Plane 2: Translucent Frosted Glass Pedestal (translateZ 0px) */}
        <div
          className="absolute w-28 h-28 rounded-2xl bg-gradient-to-br from-bg-elev/80 to-bg-sunken/40 backdrop-blur-md border border-ui/15 dark:border-white/10 shadow-sm transition-transform duration-300 pointer-events-none"
          style={{
            transform: "translateZ(0px) rotateX(45deg) rotateZ(45deg)",
          }}
        />

        {/* Plane 3: Core 3D Motion Object (translateZ 28px) */}
        <div
          className="relative z-10 preserve-3d transition-transform duration-500 animate-float-slow"
          style={{
            transform: "translateZ(28px)",
          }}
        >
          {renderTrack3DGeometry(canonical, id, tilt.isHovered)}
        </div>

        {/* Plane 4: Foreground Floating Badges / Particles (translateZ 45px) */}
        <div
          className="absolute pointer-events-none preserve-3d"
          style={{
            transform: "translateZ(45px)",
          }}
        >
          {renderFloatingAccents(canonical, slug, id, tilt.isHovered)}
        </div>
      </div>
    </div>
  );
}

/**
 * Returns ambient radial spray gradient matching track persona
 */
function getAmbientGradient(track: string): string {
  switch (track) {
    case "fullstack":
      return "radial-gradient(circle at 50% 50%, rgba(235,94,40,0.18) 0%, rgba(21,128,61,0.08) 50%, transparent 75%)";
    case "gen-ai":
      return "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.22) 0%, rgba(235,94,40,0.10) 50%, transparent 75%)";
    case "data-science":
      return "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.20) 0%, rgba(21,128,61,0.10) 50%, transparent 75%)";
    case "design":
      return "radial-gradient(circle at 50% 50%, rgba(226,125,144,0.22) 0%, rgba(235,94,40,0.12) 50%, transparent 75%)";
    case "digital-media":
      return "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.20) 0%, rgba(139,92,246,0.10) 50%, transparent 75%)";
    case "marketing":
      return "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.22) 0%, rgba(114,32,48,0.12) 50%, transparent 75%)";
    case "cloud-devops":
      return "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.22) 0%, rgba(16,185,129,0.10) 50%, transparent 75%)";
    case "business":
      return "radial-gradient(circle at 50% 50%, rgba(114,32,48,0.20) 0%, rgba(235,94,40,0.10) 50%, transparent 75%)";
    default:
      return "radial-gradient(circle at 50% 50%, rgba(235,94,40,0.15) 0%, transparent 70%)";
  }
}

/**
 * Procedural 3D SVG Geometry for the 8 Career Track Archetypes
 */
function renderTrack3DGeometry(track: string, id: string, isHovered: boolean) {
  switch (track) {
    case "fullstack":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(235,94,40,0.25)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`fs_g1_${id}`} x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EB5E28" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id={`fs_g2_${id}`} x1="20" y1="30" x2="80" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15803D" stopOpacity="0.8" />
              <stop offset="1" stopColor="#4ADE80" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Lower 3D Server Glass Slab */}
          <path
            d="M50 78L18 60L50 42L82 60L50 78Z"
            fill={`url(#fs_g1_${id})`}
            fillOpacity="0.35"
            stroke="#EB5E28"
            strokeWidth="1.5"
          />
          <path d="M18 60V66L50 84L82 66V60L50 78L18 60Z" fill="#EB5E28" fillOpacity="0.6" />

          {/* Middle 3D Logic Slab */}
          <path
            d="M50 58L22 42L50 26L78 42L50 58Z"
            fill="currentColor"
            className="text-bg-elev/90"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          <path d="M22 42V47L50 63L78 47V42L50 58L22 42Z" fill="#D97706" fillOpacity="0.4" />

          {/* Upper Glass Code Slab */}
          <path
            d="M50 38L26 24L50 10L74 24L50 38Z"
            fill={`url(#fs_g2_${id})`}
            stroke="#15803D"
            strokeWidth="1.5"
          />
          <path d="M26 24V28L50 42L74 28V24L50 38L26 24Z" fill="#15803D" fillOpacity="0.5" />

          {/* Floating Neon Code Brackets */}
          <g className={`transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
            <path
              d="M40 20L34 24L40 28"
              stroke="#FBF8F1"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M60 20L66 24L60 28"
              stroke="#FBF8F1"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M53 18L47 30"
              stroke="#EB5E28"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    case "gen-ai":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(139,92,246,0.3)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id={`ai_core_${id}`} cx="50" cy="50" r="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="0.7" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#4C1D95" />
            </radialGradient>
            <linearGradient id={`ai_ring_${id}`} x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EB5E28" />
              <stop offset="1" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          {/* Orbiting Synaptic Ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="36"
            ry="18"
            transform="rotate(-25 50 50)"
            stroke={`url(#ai_ring_${id})`}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Core AI Synaptic Sphere */}
          <circle cx="50" cy="50" r="22" fill={`url(#ai_core_${id})`} />
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="none"
            stroke="#C084FC"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Specular Highlight */}
          <ellipse cx="44" cy="42" rx="7" ry="4" transform="rotate(-30 44 42)" fill="#FFFFFF" fillOpacity="0.45" />

          {/* Interconnected Neural Synapse Network */}
          <g stroke="#F3E8FF" strokeWidth="1.2" strokeLinecap="round">
            <line x1="38" y1="46" x2="50" y2="38" />
            <line x1="50" y1="38" x2="62" y2="46" />
            <line x1="38" y1="46" x2="45" y2="58" />
            <line x1="62" y1="46" x2="55" y2="58" />
            <line x1="45" y1="58" x2="55" y2="58" />
          </g>

          {/* Synapse Nodes */}
          <circle cx="38" cy="46" r="3" fill="#EB5E28" />
          <circle cx="50" cy="38" r="3.5" fill="#4ADE80" />
          <circle cx="62" cy="46" r="3" fill="#FACC15" />
          <circle cx="45" cy="58" r="2.8" fill="#38BDF8" />
          <circle cx="55" cy="58" r="2.8" fill="#F43F5E" />

          {/* Orbiting Spark */}
          <circle cx="78" cy="38" r="2.5" fill="#EB5E28" className="animate-ping opacity-75" />
        </svg>
      );

    case "data-science":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(6,182,212,0.25)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`ds_bar1_${id}`} x1="20" y1="40" x2="35" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="1" stopColor="#0891B2" />
            </linearGradient>
            <linearGradient id={`ds_bar2_${id}`} x1="42" y1="25" x2="58" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15803D" />
              <stop offset="1" stopColor="#4ADE80" />
            </linearGradient>
            <linearGradient id={`ds_bar3_${id}`} x1="65" y1="15" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EB5E28" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* 3D Isometric Base Plate */}
          <path
            d="M50 82L15 62L50 42L85 62L50 82Z"
            fill="currentColor"
            className="text-bg-elev/80"
            stroke="#0891B2"
            strokeWidth="1.2"
          />

          {/* 3D Bar 1 (Height 32) */}
          <g transform="translate(0, 4)">
            <path d="M30 65L20 59V45L30 51V65Z" fill="#0891B2" />
            <path d="M30 65L40 59V45L30 51V65Z" fill="#06B6D4" fillOpacity="0.8" />
            <path d="M30 51L20 45L30 39L40 45L30 51Z" fill="#67E8F9" />
          </g>

          {/* 3D Bar 2 (Height 48) */}
          <g transform="translate(0, 0)">
            <path d="M50 65L40 59V32L50 38V65Z" fill="#15803D" />
            <path d="M50 65L60 59V32L50 38V65Z" fill="#22C55E" fillOpacity="0.8" />
            <path d="M50 38L40 32L50 26L60 32L50 38Z" fill="#86EFAC" />
          </g>

          {/* 3D Bar 3 (Height 62) */}
          <g transform="translate(0, -6)">
            <path d="M70 65L60 59V20L70 26V65Z" fill="#C2410C" />
            <path d="M70 65L80 59V20L70 26V65Z" fill="#EB5E28" fillOpacity="0.8" />
            <path d="M70 26L60 20L70 14L80 20L70 26Z" fill="#FDBA74" />
          </g>

          {/* 3D Parabolic Trend Curve */}
          <path
            d="M28 42Q50 22 72 12"
            stroke="#FBF8F1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
          <circle cx="72" cy="12" r="3.5" fill="#EB5E28" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case "design":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(226,125,144,0.3)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`des_nib_${id}`} x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#722030" />
              <stop offset="0.6" stopColor="#E27D90" />
              <stop offset="1" stopColor="#EB5E28" />
            </linearGradient>
            <linearGradient id={`des_plate_${id}`} x1="15" y1="25" x2="85" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBF8F1" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ECE5D8" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Tilted Glass Design Artboard */}
          <rect
            x="24"
            y="20"
            width="52"
            height="52"
            rx="12"
            transform="rotate(12 50 46)"
            fill={`url(#des_plate_${id})`}
            stroke="#E27D90"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* 3D Bezier Vector Curve */}
          <path
            d="M26 62C38 35 62 70 74 32"
            stroke="#EB5E28"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Anchor Handle Control Points */}
          <circle cx="26" cy="62" r="3.5" fill="#722030" stroke="#FBF8F1" strokeWidth="1.5" />
          <circle cx="74" cy="32" r="3.5" fill="#15803D" stroke="#FBF8F1" strokeWidth="1.5" />

          {/* Precision Pen-Nib Stylus */}
          <g transform="translate(50, 44) rotate(-35) translate(-50, -44)">
            <path
              d="M50 20L62 38L56 62H44L38 38L50 20Z"
              fill={`url(#des_nib_${id})`}
              stroke="#FBF8F1"
              strokeWidth="1.5"
            />
            <line x1="50" y1="20" x2="50" y2="44" stroke="#FBF8F1" strokeWidth="1.5" />
            <circle cx="50" cy="46" r="2.2" fill="#FBF8F1" />
          </g>
        </svg>
      );

    case "digital-media":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(244,63,94,0.25)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`dm_cube_${id}`} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F43F5E" />
              <stop offset="0.6" stopColor="#E11D48" />
              <stop offset="1" stopColor="#881337" />
            </linearGradient>
            <linearGradient id={`dm_prism_${id}`} x1="35" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#F43F5E" />
            </linearGradient>
          </defs>

          {/* Film Strip Orbiting Arc */}
          <ellipse
            cx="50"
            cy="50"
            rx="38"
            ry="20"
            transform="rotate(25 50 50)"
            stroke="#FB7185"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />

          {/* 3D Isometric Play-Prism Cube */}
          {/* Top Face */}
          <path d="M50 20L76 34L50 48L24 34L50 20Z" fill="#FDA4AF" />
          {/* Left Face */}
          <path d="M24 34L50 48V78L24 64V34Z" fill="#E11D48" />
          {/* Right Face */}
          <path d="M76 34L50 48V78L76 64V34Z" fill="#9F1239" />

          {/* Optical Floating Play Glyph */}
          <path
            d="M44 40L62 50L44 60V40Z"
            fill="#FFFFFF"
            className="drop-shadow-sm"
          />
        </svg>
      );

    case "marketing":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`mkt_cone_${id}`} x1="20" y1="30" x2="80" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id={`mkt_arrow_${id}`} x1="30" y1="70" x2="70" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15803D" />
              <stop offset="1" stopColor="#4ADE80" />
            </linearGradient>
          </defs>

          {/* Upward Growth Trend Arc */}
          <path
            d="M20 75C35 72 50 55 75 25"
            stroke="#F59E0B"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* 3D Launch Arrow Head */}
          <path
            d="M62 23L78 22L77 38"
            stroke="#F59E0B"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3D Isometric Megaphone Cone */}
          <path
            d="M32 44L56 32V68L32 56V44Z"
            fill={`url(#mkt_cone_${id})`}
            stroke="#B45309"
            strokeWidth="1.2"
          />
          <ellipse cx="32" cy="50" rx="4" ry="6" fill="#78350F" />
          <ellipse cx="56" cy="50" rx="5" ry="18" fill="#FDE68A" stroke="#B45309" strokeWidth="1.2" />

          {/* Broadcast Waves */}
          <path
            d="M66 40C70 45 70 55 66 60"
            stroke="#EB5E28"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M74 34C80 43 80 57 74 66"
            stroke="#EB5E28"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
        </svg>
      );

    case "cloud-devops":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(14,165,233,0.25)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`cld_g1_${id}`} x1="15" y1="25" x2="85" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id={`cld_pod_${id}`} x1="30" y1="40" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* 3D Cloud Volume */}
          <path
            d="M32 56C25 56 20 50 20 43C20 37 25 31 31 31C32 24 38 18 47 18C55 18 62 23 64 30C69 30 74 35 74 41C74 47 69 52 64 53C61 55 58 56 55 56H32Z"
            fill={`url(#cld_g1_${id})`}
            fillOpacity="0.85"
            stroke="#BAE6FD"
            strokeWidth="1.5"
          />

          {/* Specular Edge Highlight */}
          <path
            d="M32 32C36 24 43 20 50 20C57 20 62 24 64 29"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* Interlocking 3D Container Pod (Docker / K8s Cube) */}
          <g transform="translate(14, 18)">
            {/* Top Face */}
            <path d="M36 40L48 33L60 40L48 47L36 40Z" fill="#6EE7B7" />
            {/* Left Face */}
            <path d="M36 40L48 47V61L36 54V40Z" fill="#10B981" />
            {/* Right Face */}
            <path d="M60 40L48 47V61L60 54V40Z" fill="#047857" />
          </g>

          {/* Orbiting Sync Pipeline Ring */}
          <ellipse
            cx="50"
            cy="52"
            rx="36"
            ry="18"
            transform="rotate(-15 50 52)"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>
      );

    case "business":
      return (
        <svg
          className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(114,32,48,0.25)] transition-transform duration-300"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`biz_cube_${id}`} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#722030" />
              <stop offset="0.7" stopColor="#581624" />
              <stop offset="1" stopColor="#3C0E18" />
            </linearGradient>
            <linearGradient id={`biz_gold_${id}`} x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* 3D Isometric Ledger Block */}
          {/* Top Face */}
          <path d="M50 24L76 38L50 52L24 38L50 24Z" fill="#E27D90" />
          {/* Left Face */}
          <path d="M24 38L50 52V76L24 62V38Z" fill="#722030" />
          {/* Right Face */}
          <path d="M76 38L50 52V76L76 62V38Z" fill="#4C121F" />

          {/* Crystalline Abacus Beads Wire */}
          <line x1="30" y1="26" x2="70" y2="74" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="42" cy="40" r="4.5" fill={`url(#biz_gold_${id})`} stroke="#FDE68A" strokeWidth="1.2" />
          <circle cx="58" cy="60" r="5" fill="#15803D" stroke="#86EFAC" strokeWidth="1.2" />

          {/* Rupee / Metric Growth Sign */}
          <text
            x="50"
            y="43"
            fontSize="14"
            fontWeight="bold"
            fill="#FBF8F1"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            ₹
          </text>
        </svg>
      );

    default:
      return null;
  }
}

/**
 * Foreground floating badges & micro-tokens with dynamic translation
 */
function renderFloatingAccents(track: string, slug: string, id: string, isHovered: boolean) {
  switch (track) {
    case "fullstack":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-saffron/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-saffron-ink dark:text-saffron shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-positive-text animate-pulse" />
          <span>FSD 3D</span>
        </div>
      );

    case "gen-ai":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "-translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>LLM 3D</span>
        </div>
      );

    case "data-science":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-cyan-600 dark:text-cyan-400 shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>DATA 3D</span>
        </div>
      );

    case "design":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-burgundy/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-burgundy shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "-translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-burgundy animate-pulse" />
          <span>UI/UX 3D</span>
        </div>
      );

    case "digital-media":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-rose-600 dark:text-rose-400 shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>VFX 3D</span>
        </div>
      );

    case "marketing":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "-translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>SEO 3D</span>
        </div>
      );

    case "cloud-devops":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-sky-600 dark:text-sky-400 shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>OPS 3D</span>
        </div>
      );

    case "business":
      return (
        <div
          className={`flex items-center gap-1.5 rounded-full border border-burgundy/30 bg-bg-elev/90 px-2 py-0.5 text-[9px] font-mono font-bold text-burgundy shadow-sm backdrop-blur-md transition-all duration-300 ${
            isHovered ? "-translate-x-3 -translate-y-3 scale-110" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-positive-text animate-pulse" />
          <span>FIN 3D</span>
        </div>
      );

    default:
      return null;
  }
}

export default Course3DVisual;
