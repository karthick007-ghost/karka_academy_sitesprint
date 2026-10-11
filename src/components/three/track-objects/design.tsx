"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Design Track 3D Procedural Object:
 * Stylized pen-nib / 3D bezier handle curve.
 * Budget: ~490 triangles (well under 1500 triangle limit).
 */
export function DesignTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#FF5E7E", // Coral / Sunset Pink
  secondaryColor = "#8B5CF6", // Brand Violet
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.45,
  });

  // Secondary bezier handles sway
  useFrame(({ clock }) => {
    if (!handleRef.current || !isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    handleRef.current.rotation.z = Math.sin(t * 1.8) * 0.12;
  });

  const nibMat = getTrackMaterial(theme, color, isHovered);
  const bezierMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const anchorMat = getAccentMaterial(theme, isHovered ? "#FFFFFF" : color, isHovered);

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 3]} intensity={theme === "light" ? 1.5 : 2.0} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={1.2} color={secondaryColor} />

      {/* STYLIZED 3D PEN-NIB */}
      <group position={[0, -0.05, 0]}>
        {/* Tapered Faceted 4-Sided Nib Tip */}
        <mesh position={[0, -0.22, 0]} rotation={[0, Math.PI / 4, Math.PI]}>
          <coneGeometry args={[0.26, 0.68, 4]} />
          <meshStandardMaterial {...nibMat} />
        </mesh>

        {/* Nib Collar / Ferrule Ring */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.16, 16]} />
          <meshStandardMaterial {...bezierMat} />
        </mesh>

        {/* Nib Upper Barrel */}
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.26, 16]} />
          <meshStandardMaterial {...nibMat} />
        </mesh>

        {/* Central Breather Hole Ring */}
        <mesh position={[0, -0.05, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.045, 0.012, 6, 16]} />
          <meshStandardMaterial {...anchorMat} />
        </mesh>

        {/* Center Ink Slit Line */}
        <mesh position={[0, -0.22, 0.09]}>
          <boxGeometry args={[0.015, 0.42, 0.04]} />
          <meshStandardMaterial {...bezierMat} />
        </mesh>
      </group>

      {/* 3D BEZIER CURVE & TANGENT HANDLES */}
      <group ref={handleRef} position={[0, 0.08, 0]}>
        {/* Arching Bezier Curve Spline Segment */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.68, 0.016, 8, 32, Math.PI * 1.1]} />
          <meshStandardMaterial {...bezierMat} />
        </mesh>

        {/* Tangent Vector Handle Bar */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, 1.1, 8]} />
          <meshStandardMaterial {...anchorMat} />
        </mesh>

        {/* Left Vector Handle Anchor Cube */}
        <mesh position={[-0.55, 0, 0]}>
          <boxGeometry args={[0.075, 0.075, 0.075]} />
          <meshStandardMaterial {...anchorMat} />
        </mesh>

        {/* Right Vector Handle Anchor Cube */}
        <mesh position={[0.55, 0, 0]}>
          <boxGeometry args={[0.075, 0.075, 0.075]} />
          <meshStandardMaterial {...anchorMat} />
        </mesh>

        {/* Center Vector Anchor Node */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.065, 0]} />
          <meshStandardMaterial {...nibMat} />
        </mesh>
      </group>
    </group>
  );
}

export default DesignTrackObject;
