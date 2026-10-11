"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Content & Marketing Track 3D Procedural Object:
 * Stylized geometric megaphone with expanding broadcast soundwave arcs and speech facet.
 * Budget: ~430 triangles (well under 1500 triangle limit).
 */
export function MarketingTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#F97316", // Bright Tangerine
  secondaryColor = "#EAB308", // Electric Gold
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const wavesRef = useRef<THREE.Group>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.44,
  });

  // Secondary pulse for expanding soundwave arcs
  useFrame(({ clock }) => {
    if (!wavesRef.current || !isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    const wavePulse = 1 + Math.sin(t * 3.0) * (isHovered ? 0.08 : 0.04);
    wavesRef.current.scale.set(wavePulse, wavePulse, wavePulse);
  });

  const hornMat = getTrackMaterial(theme, color, isHovered);
  const waveMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const handleMat = getAccentMaterial(theme, "#FF6A2B", isHovered);

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 3]} intensity={theme === "light" ? 1.5 : 2.0} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={1.3} color={secondaryColor} />

      {/* STYLIZED GEOMETRIC MEGAPHONE */}
      <group position={[-0.15, 0, 0]}>
        {/* Conical Horn Body */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.14, 0.72, 12]} />
          <meshStandardMaterial {...hornMat} />
        </mesh>

        {/* Front Emitter Bell Rim Ring */}
        <mesh position={[0.46, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.38, 0.024, 6, 24]} />
          <meshStandardMaterial {...waveMat} />
        </mesh>

        {/* Rear Driver Cap Sphere */}
        <mesh position={[-0.26, 0, 0]}>
          <sphereGeometry args={[0.17, 10, 8]} />
          <meshStandardMaterial {...handleMat} />
        </mesh>

        {/* Angled Grip Handle */}
        <mesh position={[-0.08, -0.32, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.08, 0.32, 0.1]} />
          <meshStandardMaterial {...handleMat} />
        </mesh>

        {/* Top Sight Bar / Button */}
        <mesh position={[0.06, 0.22, 0]}>
          <boxGeometry args={[0.22, 0.04, 0.06]} />
          <meshStandardMaterial {...waveMat} />
        </mesh>
      </group>

      {/* EXPANDING BROADCAST SOUNDWAVES / SPEECH FACET */}
      <group ref={wavesRef} position={[0.35, 0, 0]}>
        {/* Soundwave Arc 1 */}
        <mesh position={[0.12, 0, 0]} rotation={[0, Math.PI / 2, -Math.PI / 3]}>
          <torusGeometry args={[0.54, 0.018, 6, 20, Math.PI * 0.65]} />
          <meshStandardMaterial {...waveMat} />
        </mesh>

        {/* Soundwave Arc 2 */}
        <mesh position={[0.32, 0, 0]} rotation={[0, Math.PI / 2, -Math.PI / 3.4]}>
          <torusGeometry args={[0.74, 0.018, 6, 24, Math.PI * 0.6]} />
          <meshStandardMaterial {...hornMat} />
        </mesh>

        {/* Floating Geometric Speech Bubble Accent */}
        <mesh position={[0.22, 0.38, 0.1]}>
          <octahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial {...waveMat} />
        </mesh>
      </group>
    </group>
  );
}

export default MarketingTrackObject;
