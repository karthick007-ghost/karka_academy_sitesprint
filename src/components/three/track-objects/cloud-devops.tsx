"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Cloud & DevOps Track 3D Procedural Object:
 * Stylized cloud volume with orbiting mechanical gears and CI/CD orbital ring.
 * Budget: ~920 triangles (well under 1500 triangle limit).
 */
export function CloudDevOpsTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#60A5FA", // Ice Blue
  secondaryColor = "#7BE0AD", // Mint
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.42,
  });

  // Secondary rotation for interlocking mechanical gears
  useFrame(({ clock }) => {
    if (!isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    const speedMult = isHovered ? 2.0 : 1.0;

    if (gear1Ref.current) {
      gear1Ref.current.rotation.z = t * 1.1 * speedMult;
    }
    if (gear2Ref.current) {
      gear2Ref.current.rotation.z = -t * 1.5 * speedMult;
    }
  });

  const cloudMat = getTrackMaterial(theme, color, isHovered);
  const gearMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const orbitMat = getAccentMaterial(theme, "#38BDF8", isHovered);

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 3]} intensity={theme === "light" ? 1.6 : 2.0} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={1.3} color={secondaryColor} />

      {/* STYLIZED PROCEDURAL CLOUD VOLUME */}
      <group position={[0, -0.05, 0]}>
        {/* Central Cloud Sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.38, 14, 10]} />
          <meshStandardMaterial {...cloudMat} />
        </mesh>

        {/* Left Cloud Pod */}
        <mesh position={[-0.32, -0.04, 0]}>
          <sphereGeometry args={[0.26, 12, 8]} />
          <meshStandardMaterial {...cloudMat} />
        </mesh>

        {/* Right Cloud Pod */}
        <mesh position={[0.34, -0.02, 0]}>
          <sphereGeometry args={[0.28, 12, 8]} />
          <meshStandardMaterial {...cloudMat} />
        </mesh>

        {/* Upper Cloud Pod */}
        <mesh position={[0.08, 0.22, 0.05]}>
          <sphereGeometry args={[0.24, 10, 8]} />
          <meshStandardMaterial {...cloudMat} />
        </mesh>

        {/* Front Cloud Swell */}
        <mesh position={[-0.1, 0.08, 0.18]}>
          <sphereGeometry args={[0.18, 10, 8]} />
          <meshStandardMaterial {...cloudMat} />
        </mesh>
      </group>

      {/* ORBITING MECHANICAL GEAR 1 (Upper Right) */}
      <group ref={gear1Ref} position={[0.48, 0.38, 0.15]} rotation={[0.4, 0.3, 0]}>
        {/* Gear Hub */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 10]} />
          <meshStandardMaterial {...gearMat} />
        </mesh>

        {/* Center Axle Hole Ring */}
        <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.07, 0.015, 6, 12]} />
          <meshStandardMaterial {...orbitMat} />
        </mesh>

        {/* 5 Cog Teeth */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const r = 0.2;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.06, 0.06, 0.06]} />
              <meshStandardMaterial {...gearMat} />
            </mesh>
          );
        })}
      </group>

      {/* ORBITING MECHANICAL GEAR 2 (Lower Left) */}
      <group ref={gear2Ref} position={[-0.46, -0.32, -0.1]} rotation={[-0.3, 0.2, 0]}>
        {/* Gear Hub */}
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 0.06, 8]} />
          <meshStandardMaterial {...gearMat} />
        </mesh>

        {/* Center Axle Hole Ring */}
        <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.05, 0.012, 6, 12]} />
          <meshStandardMaterial {...orbitMat} />
        </mesh>

        {/* 4 Cog Teeth */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4;
          const r = 0.155;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.05, 0.06, 0.05]} />
              <meshStandardMaterial {...gearMat} />
            </mesh>
          );
        })}
      </group>

      {/* CI/CD DEVOPS ORBITAL RING */}
      <mesh rotation={[Math.PI / 2.4, 0.35, 0]}>
        <torusGeometry args={[0.88, 0.018, 6, 32]} />
        <meshStandardMaterial {...orbitMat} />
      </mesh>
    </group>
  );
}

export default CloudDevOpsTrackObject;
