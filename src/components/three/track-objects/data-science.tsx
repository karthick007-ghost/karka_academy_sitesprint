"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { TrackObjectProps } from "./types";
import { useResolvedTheme, getTrackMaterial, getAccentMaterial, getGlassSlabMaterial } from "./materials";
import { useTrackAnimation } from "./use-track-animation";

/**
 * Data & ML Track 3D Procedural Object:
 * Geometric crystal bar chart / faceted prisms with data points.
 * Budget: ~360 triangles (well under 1500 triangle limit).
 */
export function DataScienceTrackObject({
  theme: propTheme,
  isHovered = false,
  paused = false,
  scale = 1,
  color = "#FFD166", // Cyber Gold
  secondaryColor = "#FF6A2B", // Electric Saffron
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: TrackObjectProps) {
  const rootRef = useRef<THREE.Group>(null);
  const dataPointsRef = useRef<THREE.Group>(null);

  const theme = useResolvedTheme(propTheme);
  const { isActive, prefersReducedMotion } = useTrackAnimation(rootRef, {
    paused,
    isHovered,
    baseSpeed: 0.42,
  });

  // Secondary floating animation for crystal data points
  useFrame(({ clock }) => {
    if (!dataPointsRef.current || !isActive || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    dataPointsRef.current.position.y = Math.sin(t * 2.8) * 0.04;
  });

  const baseMat = getGlassSlabMaterial(theme, color, isHovered);
  const prismMat = getTrackMaterial(theme, color, isHovered);
  const dataPointMat = getAccentMaterial(theme, secondaryColor, isHovered);
  const trendMat = getAccentMaterial(theme, "#10B981", isHovered);

  // 4 Ascending crystal bars [x, z, height]
  const columns = [
    { x: -0.42, z: -0.08, h: 0.38 },
    { x: -0.14, z: 0.08, h: 0.65 },
    { x: 0.14, z: -0.08, h: 0.95 },
    { x: 0.42, z: 0.08, h: 1.28 },
  ];

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      <ambientLight intensity={theme === "light" ? 0.9 : 0.6} />
      <directionalLight position={[3, 4, 2]} intensity={theme === "light" ? 1.5 : 2.0} color={color} />
      <pointLight position={[-2, 1, 1]} intensity={1.2} color={secondaryColor} />

      {/* Ground Foundation Slab */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.8]} />
        <meshStandardMaterial {...baseMat} />
      </mesh>

      {/* 4 Faceted Hexagonal Crystal Prisms (Ascending Bar Chart) */}
      {columns.map((col, idx) => (
        <mesh key={idx} position={[col.x, -0.45 + col.h / 2, col.z]}>
          <cylinderGeometry args={[0.09, 0.09, col.h, 6]} />
          <meshStandardMaterial {...prismMat} />
        </mesh>
      ))}

      {/* Floating Crystalline Data Points & Trendline */}
      <group ref={dataPointsRef}>
        {columns.map((col, idx) => (
          <mesh key={idx} position={[col.x, -0.45 + col.h + 0.14, col.z]} rotation={[0, idx * 0.4, 0]}>
            <octahedronGeometry args={[0.075, 0]} />
            <meshStandardMaterial {...dataPointMat} />
          </mesh>
        ))}

        {/* 3 Connecting Trend Segments */}
        {columns.slice(0, 3).map((col, idx) => {
          const next = columns[idx + 1];
          const p1 = new THREE.Vector3(col.x, -0.45 + col.h + 0.14, col.z);
          const p2 = new THREE.Vector3(next.x, -0.45 + next.h + 0.14, next.z);
          const mid = p1.clone().add(p2).multiplyScalar(0.5);
          const dir = p2.clone().sub(p1);
          const len = dir.length();

          return (
            <mesh
              key={idx}
              position={[mid.x, mid.y, mid.z]}
              quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())}
            >
              <cylinderGeometry args={[0.012, 0.012, len, 6]} />
              <meshStandardMaterial {...trendMat} />
            </mesh>
          );
        })}
      </group>

      {/* Dynamic Data Ellipse / Orbital Ring */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[0.78, 0.014, 6, 28]} />
        <meshStandardMaterial {...dataPointMat} />
      </mesh>
    </group>
  );
}

export default DataScienceTrackObject;
