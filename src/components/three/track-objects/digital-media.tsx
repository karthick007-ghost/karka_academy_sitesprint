"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Digital Media Track 3D Procedural Object:
 * Floating faceted play-button prism with orbiting camera aperture frame.
 * Budget: ~420 triangles (well under 1500 triangle limit).
 */
export function DigitalMediaTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#E11D48", // Vibrant Crimson/Magenta
  secondaryColor = "#9333EA", // Electric Purple
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const prismRef = useRef<THREE.Group>(null);
  const apertureRef = useRef<THREE.Mesh>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.48,
  });

  // Secondary rotation for aperture ring & subtle play button float
  useFrame(({ clock }) => {
    if (!isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();

    if (prismRef.current) {
      prismRef.current.position.y = Math.sin(t * 2.6) * 0.04;
    }
    if (apertureRef.current) {
      apertureRef.current.rotation.z = -t * 0.35;
    }
  });

  const playMat = getTrackMaterial(theme, color, isHovered);
  const coreMat = getAccentMaterial(theme, isHovered ? "#FFB347" : "#FFFFFF", isHovered);
  const frameMat = getAccentMaterial(theme, secondaryColor, isHovered);

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 3]} intensity={theme === "light" ? 1.6 : 2.2} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={1.4} color={secondaryColor} />

      {/* FLOATING FACETED PLAY-BUTTON PRISM */}
      <group ref={prismRef}>
        {/* Outer Faceted 3-Sided Triangular Prism */}
        <mesh rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.55, 0.55, 0.22, 3]} />
          <meshStandardMaterial {...playMat} />
        </mesh>

        {/* Inner Glowing Core Triangle */}
        <mesh rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.36, 0.36, 0.25, 3]} />
          <meshStandardMaterial {...coreMat} />
        </mesh>
      </group>

      {/* ORBITING CAMERA APERTURE / MEDIA FRAME */}
      <mesh ref={apertureRef} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[0.82, 0.02, 6, 24]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Concentric Timeline Reel Ring */}
      <mesh rotation={[-0.4, -0.3, 0]}>
        <torusGeometry args={[0.98, 0.014, 6, 32]} />
        <meshStandardMaterial {...playMat} />
      </mesh>

      {/* 4 Viewfinder Frame Markers */}
      {[
        [-0.55, 0.55, 0],
        [0.55, 0.55, 0],
        [-0.55, -0.55, 0],
        [0.55, -0.55, 0],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh position={[x > 0 ? -0.04 : 0.04, 0, 0]}>
            <boxGeometry args={[0.1, 0.025, 0.025]} />
            <meshStandardMaterial {...frameMat} />
          </mesh>
          <mesh position={[0, y > 0 ? -0.04 : 0.04, 0]}>
            <boxGeometry args={[0.025, 0.1, 0.025]} />
            <meshStandardMaterial {...frameMat} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default DigitalMediaTrackObject;
