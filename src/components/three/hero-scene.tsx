"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroPoster } from "./hero-poster";

function OrbitingNode({
  radius,
  speed,
  offset,
  color,
  size = 0.22,
}: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.position.y = Math.sin(t * 2) * 0.25;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function OrbitScene() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    const t = clock.getElapsedTime() * 0.4;
    coreRef.current.rotation.y = t;
    coreRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#FF6A2B" />
      <pointLight position={[-4, -3, -2]} intensity={0.8} color="#7BE0AD" />

      {/* Central Glass Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#0F3D2E"
          roughness={0.15}
          metalness={0.7}
          wireframe={false}
        />
      </mesh>

      {/* Orbit Rings (Lightweight Lineloops) */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0, 0]}>
        <torusGeometry args={[3.0, 0.015, 8, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      {/* Orbiting Career Track Nodes */}
      <OrbitingNode radius={2.2} speed={0.5} offset={0} color="#FF6A2B" />
      <OrbitingNode radius={2.2} speed={0.5} offset={Math.PI * 0.5} color="#7BE0AD" />
      <OrbitingNode radius={2.2} speed={0.5} offset={Math.PI} color="#B8964E" />
      <OrbitingNode radius={2.2} speed={0.5} offset={Math.PI * 1.5} color="#ffffff" />

      <OrbitingNode radius={3.0} speed={-0.35} offset={0.5} color="#FF6A2B" size={0.18} />
      <OrbitingNode radius={3.0} speed={-0.35} offset={Math.PI * 0.5 + 0.5} color="#7BE0AD" size={0.18} />
      <OrbitingNode radius={3.0} speed={-0.35} offset={Math.PI + 0.5} color="#ffffff" size={0.18} />
      <OrbitingNode radius={3.0} speed={-0.35} offset={Math.PI * 1.5 + 0.5} color="#A63A0B" size={0.18} />
    </>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasContextLost, setHasContextLost] = useState(false);

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

  if (hasContextLost) {
    return <HeroPoster />;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-square w-full max-w-[480px] items-center justify-center rounded-3xl border border-white/10 bg-night-2 shadow-glass overflow-hidden"
    >
      {/* Fallback poster while canvas hydrates */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <HeroPoster />
      </div>

      <Canvas
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "never"}
        camera={{ position: [0, 1.2, 5.2], fov: 45 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            setHasContextLost(true);
          });
        }}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
      >
        <OrbitScene />
      </Canvas>
    </div>
  );
}
export default HeroScene;
