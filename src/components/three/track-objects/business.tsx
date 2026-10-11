"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial, getGlassSlabMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Business & Finance Track 3D Procedural Object:
 * Modern abacus beads / crystalline ledger bar with upward growth delta prism.
 * Budget: ~780 triangles (well under 1500 triangle limit).
 */
export function BusinessTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#059669", // Emerald Jade
  secondaryColor = "#B8964E", // Heritage Gold
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const deltaRef = useRef<THREE.Mesh>(null);
  const beadsRef = useRef<THREE.Group>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.42,
  });

  // Secondary animation for upward growth delta prism and sliding beads
  useFrame(({ clock }) => {
    if (!isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    if (deltaRef.current) {
      deltaRef.current.position.y = 0.52 + Math.sin(t * 2.5) * 0.05;
      deltaRef.current.rotation.y = t * 0.8;
    }

    if (beadsRef.current) {
      // Subtle rhythmic breathing of abacus beads
      const bead1 = beadsRef.current.children[0];
      if (bead1) bead1.position.x = -0.35 + Math.sin(t * 1.5) * 0.04;
      const bead4 = beadsRef.current.children[3];
      if (bead4) bead4.position.x = -0.2 + Math.cos(t * 1.8) * 0.04;
    }
  });

  const ledgerMat = getGlassSlabMaterial(theme, color, isHovered);
  const frameMat = getTrackMaterial(theme, color, isHovered);
  const railMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const beadMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const deltaMat = getAccentMaterial(theme, isHovered ? "#34D399" : color, isHovered);

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 3]} intensity={theme === "light" ? 1.5 : 2.0} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={1.3} color={secondaryColor} />

      {/* CRYSTALLINE LEDGER BASE BAR */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[1.25, 0.14, 0.55]} />
        <meshStandardMaterial {...ledgerMat} />
      </mesh>

      {/* Left Stanchion Frame */}
      <mesh position={[-0.56, -0.05, 0]}>
        <boxGeometry args={[0.08, 0.42, 0.5]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Right Stanchion Frame */}
      <mesh position={[0.56, -0.05, 0]}>
        <boxGeometry args={[0.08, 0.42, 0.5]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* DUAL GUIDE RAILS */}
      {/* Upper Rail */}
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1.08, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>

      {/* Lower Rail */}
      <mesh position={[0, -0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1.08, 8]} />
        <meshStandardMaterial {...railMat} />
      </mesh>

      {/* MODERN MINIMALIST ABACUS BEADS */}
      <group ref={beadsRef}>
        {/* Upper Rail Beads */}
        <mesh position={[-0.35, 0.08, 0]}>
          <torusGeometry args={[0.08, 0.032, 6, 16]} />
          <meshStandardMaterial {...beadMat} />
        </mesh>
        <mesh position={[0.05, 0.08, 0]}>
          <torusGeometry args={[0.08, 0.032, 6, 16]} />
          <meshStandardMaterial {...beadMat} />
        </mesh>
        <mesh position={[0.38, 0.08, 0]}>
          <torusGeometry args={[0.08, 0.032, 6, 16]} />
          <meshStandardMaterial {...beadMat} />
        </mesh>

        {/* Lower Rail Beads */}
        <mesh position={[-0.2, -0.12, 0]}>
          <torusGeometry args={[0.08, 0.032, 6, 16]} />
          <meshStandardMaterial {...beadMat} />
        </mesh>
        <mesh position={[0.16, -0.12, 0]}>
          <torusGeometry args={[0.08, 0.032, 6, 16]} />
          <meshStandardMaterial {...beadMat} />
        </mesh>
        <mesh position={[0.42, -0.12, 0]}>
          <torusGeometry args={[0.08, 0.032, 6, 16]} />
          <meshStandardMaterial {...beadMat} />
        </mesh>
      </group>

      {/* UPWARD GROWTH DELTA PRISM */}
      <mesh ref={deltaRef} position={[0, 0.52, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial {...deltaMat} />
      </mesh>

      {/* Growth Trend Impulse Ring */}
      <mesh rotation={[Math.PI / 2.3, 0.15, 0]}>
        <torusGeometry args={[0.78, 0.016, 6, 28]} />
        <meshStandardMaterial {...railMat} />
      </mesh>
    </group>
  );
}

export default BusinessTrackObject;
