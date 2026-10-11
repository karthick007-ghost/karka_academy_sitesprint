"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { HeroPoster } from "./hero-poster";

// ============================================================================
// DATA: 6 HIGH-CONTRAST CAREER TRACKS
// ============================================================================
export interface CareerTrack {
  id: string;
  name: string;
  category: string;
  color: string;
  secondaryColor?: string;
  size: number;
  radius: number;
  speed: number;
  offset: number;
  hasRing?: boolean;
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "full-stack",
    name: "Full-Stack Dev",
    category: "PAP Eligible",
    color: "#FF6A2B", // Electric Saffron
    size: 0.22,
    radius: 1.85,
    speed: 0.45,
    offset: 0,
    hasRing: false,
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    category: "Design",
    color: "#FF5E7E", // Coral / Sunset Pink
    size: 0.20,
    radius: 1.85,
    speed: 0.45,
    offset: Math.PI,
    hasRing: false,
  },
  {
    id: "gen-ai",
    name: "Generative AI",
    category: "Specialist",
    color: "#38BDF8", // Cyber Cyan
    secondaryColor: "#7BE0AD", // Mint
    size: 0.24,
    radius: 2.5,
    speed: 0.36,
    offset: 0.9,
    hasRing: true,
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    category: "Infrastructure",
    color: "#60A5FA", // Ice Blue
    size: 0.21,
    radius: 2.5,
    speed: 0.36,
    offset: Math.PI + 0.9,
    hasRing: false,
  },
  {
    id: "data-science",
    name: "Data Science & ML",
    category: "PAP Eligible",
    color: "#FFD166", // Cyber Gold
    secondaryColor: "#FF6A2B",
    size: 0.23,
    radius: 3.15,
    speed: 0.28,
    offset: 1.8,
    hasRing: true,
  },
  {
    id: "internships",
    name: "Client Internships",
    category: "Agile Tribers",
    color: "#2EC4B6", // Forest Jade
    size: 0.22,
    radius: 3.15,
    speed: 0.28,
    offset: Math.PI + 1.8,
    hasRing: false,
  },
];

// ============================================================================
// 1. THE SUN: RADIANT GLOWING CELESTIAL CORE
// ============================================================================
function CelestialSun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const corona1Ref = useRef<THREE.Mesh>(null);
  const corona2Ref = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25;
    }
    if (corona1Ref.current) {
      corona1Ref.current.rotation.z = t * 0.35;
      corona1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (corona2Ref.current) {
      corona2Ref.current.rotation.y = -t * 0.3;
      corona2Ref.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }
    if (auraRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.04;
      auraRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic central point light casting illumination onto all orbiting planets */}
      <pointLight position={[0, 0, 0]} intensity={4.5} color="#FF944D" distance={25} decay={1.8} />

      {/* Radiant Glowing Sun Sphere Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshStandardMaterial
          color="#FFB347"
          emissive="#FF6A2B"
          emissiveIntensity={2.5}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      {/* Translucent Coronal Ring 1 with Additive Blending */}
      <mesh ref={corona1Ref} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[1.15, 0.035, 16, 64]} />
        <meshBasicMaterial
          color="#FFB347"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Translucent Coronal Ring 2 with Additive Blending */}
      <mesh ref={corona2Ref} rotation={[-0.5, 0.6, 0.3]}>
        <torusGeometry args={[1.28, 0.025, 16, 64]} />
        <meshBasicMaterial
          color="#FF6A2B"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Solar Aura Shell with Additive Glow */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#FF944D"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Center Tamil "கற்க" Insignia with Warm Golden Glow inside the Core */}
      <Html center pointerEvents="none" zIndexRange={[120, 0]}>
        <div className="flex flex-col items-center justify-center text-center select-none transform-gpu pointer-events-none">
          <span
            lang="ta"
            className="font-tamil text-2xl sm:text-3xl font-black text-amber-50 drop-shadow-[0_0_18px_rgba(255,180,40,1)] tracking-wide"
          >
            கற்க
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FFF490] drop-shadow-[0_0_8px_rgba(255,120,0,0.95)]">
            AI CORE
          </span>
        </div>
      </Html>
    </group>
  );
}

// ============================================================================
// 2. ORBITING PLANET WITH CRISP SPATIAL BADGE
// ============================================================================
function OrbitingPlanet({
  track,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}: {
  track: CareerTrack;
  isHovered: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onSelect: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * track.speed + track.offset;
    const x = Math.cos(t) * track.radius;
    const z = Math.sin(t) * track.radius;
    // Gentle inclination wave so orbits are dynamic and non-planar
    const y = Math.sin(t * 1.5) * 0.16;
    meshRef.current.position.set(x, y, z);
  });

  return (
    <group ref={meshRef}>
      {/* 3D Planet Sphere with Specular Highlights */}
      <mesh
        scale={isHovered ? 1.35 : 1}
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHover(track.id);
        }}
        onPointerLeave={() => onLeave()}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(track.id);
        }}
      >
        <sphereGeometry args={[track.size, 32, 32]} />
        <meshStandardMaterial
          color={track.color}
          roughness={0.15}
          metalness={0.5}
          emissive={track.color}
          emissiveIntensity={isHovered ? 1.2 : 0.45}
        />
      </mesh>

      {/* Procedural Planetary Ring for specialist tracks (Gen AI, Data Science) */}
      {track.hasRing && (
        <mesh rotation={[1.1, 0.4, 0]}>
          <torusGeometry args={[track.size * 1.6, 0.015, 8, 48]} />
          <meshBasicMaterial
            color={track.secondaryColor ?? track.color}
            transparent
            opacity={isHovered ? 0.9 : 0.65}
          />
        </mesh>
      )}

      {/* Crisp, High-Contrast Spatial Course Badge (Unclipped, Never Occluded) */}
      <Html
        position={[0, track.size + 0.38, 0]}
        center
        distanceFactor={8}
        zIndexRange={[110, 0]}
        occlude={false}
        pointerEvents="auto"
      >
        <button
          type="button"
          onMouseEnter={() => onHover(track.id)}
          onMouseLeave={() => onLeave()}
          onClick={() => onSelect(track.id)}
          className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold tracking-tight shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isHovered
              ? "scale-110 border-white bg-night-1 text-white ring-2 ring-white/50"
              : "border border-white/30 bg-night-1/90 text-white hover:border-white/80 hover:bg-night-1"
          }`}
          style={{
            borderColor: isHovered ? track.color : "rgba(255, 255, 255, 0.35)",
            boxShadow: isHovered
              ? `0 0 18px ${track.color}`
              : "0 6px 20px -2px rgba(0, 0, 0, 0.8)",
          }}
          aria-label={`View ${track.name} course track`}
        >
          <span
            className="h-2 w-2 rounded-full transition-transform duration-200 group-hover:scale-125"
            style={{
              backgroundColor: track.color,
              boxShadow: `0 0 8px ${track.color}`,
            }}
          />
          <span className="font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {track.name}
          </span>
        </button>
      </Html>
    </group>
  );
}

// ============================================================================
// 3. COMPLETE ORBITAL SCENE
// ============================================================================
function SolarSystemScene({
  hoveredTrack,
  onHoverTrack,
  onLeaveTrack,
  onSelectTrack,
}: {
  hoveredTrack: string | null;
  onHoverTrack: (id: string) => void;
  onLeaveTrack: () => void;
  onSelectTrack: (id: string) => void;
}) {
  return (
    <>
      {/* Balanced Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, -4, -4]} intensity={0.7} color="#38BDF8" />

      {/* Glowing Star in Center */}
      <CelestialSun />

      {/* Luminous Orbital Path Rings */}
      <group rotation={[0.35, 0, 0]}>
        {/* Orbit Ring 1: Radius 1.85 */}
        <mesh>
          <torusGeometry args={[1.85, 0.012, 16, 96]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Orbit Ring 2: Radius 2.5 */}
        <mesh>
          <torusGeometry args={[2.5, 0.012, 16, 96]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Orbit Ring 3: Radius 3.15 */}
        <mesh>
          <torusGeometry args={[3.15, 0.012, 16, 96]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.20}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Orbiting Career Track Planets in Tilted Plane */}
      <group rotation={[0.35, 0, 0]}>
        {CAREER_TRACKS.map((track) => (
          <OrbitingPlanet
            key={track.id}
            track={track}
            isHovered={hoveredTrack === track.id}
            onHover={onHoverTrack}
            onLeave={onLeaveTrack}
            onSelect={onSelectTrack}
          />
        ))}
      </group>
    </>
  );
}

// ============================================================================
// 4. MAIN EXPORTED HERO SCENE COMPONENT
// ============================================================================
export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasContextLost, setHasContextLost] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSelectTrack = (id: string) => {
    // Navigate or scroll smoothly to courses
    window.location.href = `/courses?track=${id}`;
  };

  if (hasContextLost) {
    return <HeroPoster />;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full max-w-[500px] items-center rounded-3xl border border-white/10 bg-night-2/95 shadow-glass p-2 sm:p-3 overflow-visible"
    >
      {/* 3D WebGL Canvas (Isolated and clean, NO static poster bleed underneath!) */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
        <Canvas
          dpr={[1, 1.5]}
          frameloop={isVisible ? "always" : "never"}
          camera={{ position: [0, 3.4, 7.8], fov: 42 }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault();
              setHasContextLost(true);
            });
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <SolarSystemScene
            hoveredTrack={hoveredTrack}
            onHoverTrack={setHoveredTrack}
            onLeaveTrack={() => setHoveredTrack(null)}
            onSelectTrack={handleSelectTrack}
          />
        </Canvas>
      </div>

      {/* Accessible Interactive Track Strip for Instant Human Readability */}
      <div className="mt-2.5 flex w-full flex-wrap items-center justify-center gap-1.5 px-2 pb-1">
        {CAREER_TRACKS.map((track) => {
          const isActive = hoveredTrack === track.id;
          return (
            <button
              key={track.id}
              type="button"
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
              onClick={() => handleSelectTrack(track.id)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "scale-105 border-white bg-night-1 text-white shadow-md ring-1 ring-white/40"
                  : "border-white/10 bg-night-1/60 text-night-muted hover:border-white/30 hover:bg-night-1/90 hover:text-white"
              }`}
              style={{
                borderColor: isActive ? track.color : undefined,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              <span>{track.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HeroScene;
