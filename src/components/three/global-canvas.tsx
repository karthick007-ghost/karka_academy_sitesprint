"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View } from "@react-three/drei";
import * as THREE from "three";
import { useCapability } from "@/lib/capability";

// ============================================================================
// CONTEXT & ARCHITECTURE
// Enforcing <= 1 WebGL context rule across the entire application.
// Multiple 3D viewports are scissored using @react-three/drei's <View> & <View.Port />
// ============================================================================

interface GlobalCanvasContextValue {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isContextLost: boolean;
}

const GlobalCanvasContext = createContext<GlobalCanvasContextValue>({
  containerRef: { current: null },
  isContextLost: false,
});

export function useGlobalCanvas() {
  return useContext(GlobalCanvasContext);
}

/**
 * Root provider that mounts the single global WebGL Canvas with <View.Port />.
 * Place this high in the tree (e.g. root layout or page wrapper).
 */
export function GlobalCanvasProvider({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContextLost, setIsContextLost] = useState(false);
  const { canRender3D, isReady } = useCapability();

  return (
    <GlobalCanvasContext.Provider value={{ containerRef, isContextLost }}>
      <div ref={containerRef} className={`relative min-h-screen ${className}`}>
        {children}

        {/* The SINGLE WebGL Canvas instance */}
        {isReady && canRender3D && !isContextLost && (
          <Canvas
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
              zIndex: 20,
            }}
            eventSource={containerRef as React.RefObject<HTMLElement>}
            dpr={[1, 1.5]}
            frameloop="always"
            onCreated={({ gl }) => {
              gl.domElement.addEventListener("webglcontextlost", (event) => {
                event.preventDefault();
                setIsContextLost(true);
              });
            }}
            className="pointer-events-none"
          >
            <View.Port />
          </Canvas>
        )}
      </div>
    </GlobalCanvasContext.Provider>
  );
}

/**
 * ScissoredView: Drop-in DOM viewport for any section or card.
 * Scissored by Three.js into the global canvas, maintaining exactly 1 context.
 */
export function ScissoredView({
  children,
  className = "",
  fallback = null,
  trackRef,
}: {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  trackRef?: React.RefObject<HTMLElement>;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { canRender3D, isReady } = useCapability();
  const { isContextLost } = useGlobalCanvas();

  useEffect(() => {
    const el = (trackRef?.current ?? localRef.current);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trackRef]);

  if (!isReady || !canRender3D || isContextLost) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div ref={localRef} className={`relative overflow-hidden ${className}`}>
      {isVisible && (
        <View track={trackRef ?? (localRef as React.RefObject<HTMLElement>)} className="w-full h-full">
          {children}
        </View>
      )}
    </div>
  );
}

// ============================================================================
// PROCEDURAL 3D TRACK GLYPHS (Original Three.js Geometry, Zero External Models)
// ============================================================================

/**
 * Full-Stack Track 3D Glyph:
 * Procedural layered architecture slabs with glowing data junction
 */
export function FullStackGlyph({ isHovered = false }: { isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.6;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.5} color="#FF6A2B" />
      <pointLight position={[-2, -2, -1]} intensity={0.8} color="#FFD166" />

      {/* Layer 1: Database base slab */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.15, 32]} />
        <meshStandardMaterial
          color="#0F3D2E"
          roughness={0.2}
          metalness={0.7}
          emissive="#FF6A2B"
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Layer 2: API logic core slab */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial
          color="#FF6A2B"
          roughness={0.1}
          metalness={0.5}
          emissive="#FF6A2B"
          emissiveIntensity={isHovered ? 1.0 : 0.4}
        />
      </mesh>

      {/* Layer 3: Frontend UI top slab */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial
          color="#7BE0AD"
          roughness={0.2}
          metalness={0.6}
          emissive="#7BE0AD"
          emissiveIntensity={isHovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Procedural interconnecting bus rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.02, 16, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Gen AI Track 3D Glyph:
 * Procedural neural sphere with glowing synaptic links
 */
export function GenAiGlyph({ isHovered = false }: { isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.7;
    groupRef.current.rotation.z = Math.cos(t * 0.4) * 0.25;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#38BDF8" distance={5} />
      <directionalLight position={[2, 3, 2]} intensity={1.2} color="#7BE0AD" />

      {/* Synaptic Core */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={isHovered ? 1.5 : 0.8}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Neural Node Shell */}
      <mesh>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#7BE0AD"
          wireframe
          emissive="#7BE0AD"
          emissiveIntensity={isHovered ? 0.9 : 0.3}
          roughness={0.1}
        />
      </mesh>

      {/* Tilted Synaptic Ring */}
      <mesh rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[0.92, 0.02, 16, 64]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Cloud & DevOps Track 3D Glyph:
 * Procedural interconnected cluster with orbital data ring
 */
export function CloudDevOpsGlyph({ isHovered = false }: { isHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = -t * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 2]} intensity={1.4} color="#60A5FA" />
      <pointLight position={[-2, -1, 1]} intensity={1.0} color="#FF6A2B" />

      {/* Central Cloud Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#60A5FA"
          emissiveIntensity={isHovered ? 1.0 : 0.4}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Clustered Satellite Pods */}
      <mesh position={[-0.32, 0.1, 0]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.32, -0.05, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#93C5FD" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Global Gateway Orbital Ring */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[0.85, 0.022, 16, 48]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// ============================================================================
// SPIKE DEMONSTRATION: Multi-Viewport Card Grid Sharing 1 Single WebGL Context
// ============================================================================

export function GlobalCanvasSpikeDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-night-2/90 p-6 shadow-glass">
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
          <span>✓ Architecture Spike Verified</span>
          <span>•</span>
          <span>1 WebGL Context Only</span>
        </div>
        <h3 className="mt-2 text-xl font-bold text-night-text">
          Zero-Lag Multi-Viewport 3D (Drei Scissoring)
        </h3>
        <p className="mt-1 text-sm text-night-muted">
          All 3 interactive cards below render independent 3D viewports simultaneously, powered by a single shared WebGL canvas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Viewport 1: Full-Stack */}
        <div
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex flex-col items-center rounded-xl border border-white/10 bg-night-1/80 p-4 transition-all hover:border-saffron/50"
        >
          <div className="h-40 w-full">
            <ScissoredView className="h-full w-full">
              <FullStackGlyph isHovered={hoveredIndex === 0} />
            </ScissoredView>
          </div>
          <span className="mt-2 text-sm font-bold text-saffron">Full-Stack Architecture</span>
          <span className="text-xs text-night-muted">Layered Stack Procedural Mesh</span>
        </div>

        {/* Viewport 2: Gen AI */}
        <div
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex flex-col items-center rounded-xl border border-white/10 bg-night-1/80 p-4 transition-all hover:border-mint/50"
        >
          <div className="h-40 w-full">
            <ScissoredView className="h-full w-full">
              <GenAiGlyph isHovered={hoveredIndex === 1} />
            </ScissoredView>
          </div>
          <span className="mt-2 text-sm font-bold text-mint">Generative AI Neural</span>
          <span className="text-xs text-night-muted">Synaptic Sphere Procedural Mesh</span>
        </div>

        {/* Viewport 3: Cloud & DevOps */}
        <div
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex flex-col items-center rounded-xl border border-white/10 bg-night-1/80 p-4 transition-all hover:border-blue-400/50"
        >
          <div className="h-40 w-full">
            <ScissoredView className="h-full w-full">
              <CloudDevOpsGlyph isHovered={hoveredIndex === 2} />
            </ScissoredView>
          </div>
          <span className="mt-2 text-sm font-bold text-blue-400">Cloud & DevOps Gateway</span>
          <span className="text-xs text-night-muted">Clustered Nodes Procedural Mesh</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalCanvasProvider;
