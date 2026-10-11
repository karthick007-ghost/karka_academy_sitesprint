"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial, getGlassSlabMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Full-Stack Track 3D Procedural Object:
 * Layered stack of glass slabs (Database, API, UI) with floating </> code bracket geometry.
 * Budget: ~380 triangles (well under 1500 triangle limit).
 */
export function FullstackTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#FF6A2B", // Electric Saffron
  secondaryColor = "#7BE0AD", // Mint
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bracketsRef = useRef<THREE.Group>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.45,
  });

  // Secondary gentle oscillation for floating brackets
  useFrame(({ clock }) => {
    if (!bracketsRef.current || !isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    bracketsRef.current.position.y = 0.55 + Math.sin(t * 2.5) * 0.05;
    bracketsRef.current.rotation.y = Math.sin(t * 1.2) * 0.15;
  });

  const baseMat = getGlassSlabMaterial(theme, color, isHovered);
  const midMat = getGlassSlabMaterial(theme, secondaryColor, isHovered);
  const topMat = getTrackMaterial(theme, color, isHovered);
  const bracketMat = getAccentMaterial(theme, isHovered ? "#FFFFFF" : color, isHovered);
  const pinMat = getAccentMaterial(theme, secondaryColor, isHovered);

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 3]} intensity={theme === "light" ? 1.5 : 2.0} color={color} />
      <pointLight position={[-2, -2, -1]} intensity={1.2} color={secondaryColor} />

      {/* Layer 1: Database Base Slab */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[1.2, 0.12, 1.0]} />
        <meshStandardMaterial {...baseMat} />
      </mesh>

      {/* Layer 2: API Logic Middle Slab */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.05, 0.12, 0.85]} />
        <meshStandardMaterial {...midMat} />
      </mesh>

      {/* Layer 3: Frontend UI Top Slab */}
      <mesh position={[0, 0.20, 0]}>
        <boxGeometry args={[0.9, 0.12, 0.7]} />
        <meshStandardMaterial {...topMat} />
      </mesh>

      {/* 4 Corner Connector Pins (Data Bus) */}
      {[
        [-0.42, -0.06, -0.32],
        [0.42, -0.06, -0.32],
        [-0.42, -0.06, 0.32],
        [0.42, -0.06, 0.32],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <cylinderGeometry args={[0.022, 0.022, 0.54, 8]} />
          <meshStandardMaterial {...pinMat} />
        </mesh>
      ))}

      {/* Enclosing Circular Data Bus Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.015, 8, 32]} />
        <meshStandardMaterial {...bracketMat} />
      </mesh>

      {/* Floating </> Code Bracket Geometry */}
      <group ref={bracketsRef} position={[0, 0.55, 0]}>
        {/* Left Bracket '<' */}
        <group position={[-0.32, 0, 0]}>
          {/* Upper stroke */}
          <mesh position={[0.04, 0.07, 0]} rotation={[0, 0, 0.65]}>
            <cylinderGeometry args={[0.022, 0.022, 0.20, 8]} />
            <meshStandardMaterial {...bracketMat} />
          </mesh>
          {/* Lower stroke */}
          <mesh position={[0.04, -0.07, 0]} rotation={[0, 0, -0.65]}>
            <cylinderGeometry args={[0.022, 0.022, 0.20, 8]} />
            <meshStandardMaterial {...bracketMat} />
          </mesh>
        </group>

        {/* Center Slash '/' */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.38]}>
          <cylinderGeometry args={[0.022, 0.022, 0.32, 8]} />
          <meshStandardMaterial {...bracketMat} />
        </mesh>

        {/* Right Bracket '>' */}
        <group position={[0.32, 0, 0]}>
          {/* Upper stroke */}
          <mesh position={[-0.04, 0.07, 0]} rotation={[0, 0, -0.65]}>
            <cylinderGeometry args={[0.022, 0.022, 0.20, 8]} />
            <meshStandardMaterial {...bracketMat} />
          </mesh>
          {/* Lower stroke */}
          <mesh position={[-0.04, -0.07, 0]} rotation={[0, 0, 0.65]}>
            <cylinderGeometry args={[0.022, 0.022, 0.20, 8]} />
            <meshStandardMaterial {...bracketMat} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default FullstackTrackObject;
