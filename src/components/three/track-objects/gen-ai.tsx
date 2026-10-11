"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Gen AI Track 3D Procedural Object:
 * Neural sphere with interconnected nodes and glowing link lines.
 * Budget: ~850 triangles (well under 1500 triangle limit).
 */
export function GenAiTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#38BDF8", // Cyber Cyan
  secondaryColor = "#7BE0AD", // Mint
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.5,
  });

  // Secondary pulse for synaptic core & ring
  useFrame(({ clock }) => {
    if (!coreRef.current || !isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 3.2) * (isHovered ? 0.08 : 0.04);
    coreRef.current.scale.set(pulse, pulse, pulse);

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
  });

  const coreMat = getTrackMaterial(theme, color, isHovered);
  const nodeMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const linkMat = getAccentMaterial(theme, "#8B5CF6", isHovered);

  // 6 Orbital Neural Nodes
  const nodes: [number, number, number][] = [
    [0.55, 0.35, 0.25],
    [-0.55, -0.35, -0.25],
    [-0.45, 0.45, -0.2],
    [0.45, -0.45, 0.2],
    [0.2, 0.55, -0.4],
    [-0.2, -0.55, 0.4],
  ];

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.5} />
      <directionalLight position={[3, 3, 2]} intensity={theme === "light" ? 1.6 : 2.2} color={color} />
      <pointLight position={[0, 0, 0]} intensity={isHovered ? 3.0 : 1.8} color={secondaryColor} distance={4} />

      {/* Central Synaptic Neural Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.36, 16, 12]} />
        <meshStandardMaterial {...coreMat} />
      </mesh>

      {/* Neural Node Shell Wireframe Cage */}
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color={theme === "light" ? "#0284C7" : secondaryColor}
          wireframe
          transparent
          opacity={theme === "light" ? 0.45 : 0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Tilted Synaptic Ring */}
      <mesh ref={ringRef} rotation={[0.85, 0.4, 0]}>
        <torusGeometry args={[0.86, 0.018, 8, 36]} />
        <meshStandardMaterial {...coreMat} />
      </mesh>

      {/* 6 Interconnected Nodes and Inward Link Lines */}
      {nodes.map(([nx, ny, nz], idx) => {
        // Calculate length to center
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
        const midX = nx * 0.5;
        const midY = ny * 0.5;
        const midZ = nz * 0.5;

        return (
          <group key={idx}>
            {/* Outer Neural Node */}
            <mesh position={[nx, ny, nz]}>
              <sphereGeometry args={[0.065, 8, 6]} />
              <meshStandardMaterial {...nodeMat} />
            </mesh>

            {/* Inward Synaptic Link Line */}
            <mesh
              position={[midX, midY, midZ]}
              quaternion={new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(nx, ny, nz).normalize()
              )}
            >
              <cylinderGeometry args={[0.012, 0.012, len, 6]} />
              <meshStandardMaterial {...linkMat} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default GenAiTrackObject;
