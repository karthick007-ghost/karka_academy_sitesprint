"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface UseTrackAnimationOptions {
  paused?: boolean;
  isHovered?: boolean;
  baseSpeed?: number;
  hoverSpeedMultiplier?: number;
  floatAmplitude?: number;
  floatSpeed?: number;
}

export function useTrackAnimation(
  groupRef: React.RefObject<THREE.Group | null>,
  options: UseTrackAnimationOptions = {}
) {
  const {
    paused = false,
    isHovered = false,
    baseSpeed = 0.45,
    hoverSpeedMultiplier = 1.6,
    floatAmplitude = 0.06,
    floatSpeed = 1.8,
  } = options;

  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const currentSpeed = useRef(baseSpeed);

  useEffect(() => {
    // 1. Tab visibility listener
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // 2. Reduced motion media query
    let handleMotion: ((e: MediaQueryListEvent) => void) | null = null;
    let motionQuery: MediaQueryList | null = null;

    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);
      handleMotion = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      motionQuery.addEventListener("change", handleMotion);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (motionQuery && handleMotion) {
        motionQuery.removeEventListener("change", handleMotion);
      }
    };
  }, []);

  const isActive = isTabVisible && !paused;

  useFrame((state, delta) => {
    if (!groupRef.current || !isActive) return;

    if (prefersReducedMotion) {
      // Keep static dignified pose without continuous rotation
      groupRef.current.position.y = 0;
      return;
    }

    const targetSpeed = isHovered ? baseSpeed * hoverSpeedMultiplier : baseSpeed;
    // Smooth lerp speed
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 0.08);

    // Gentle Y rotation
    groupRef.current.rotation.y += delta * currentSpeed.current;

    // Gentle floating bobbing on Y axis
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * floatSpeed) * floatAmplitude;

    // Subtle breathing pitch tilt
    groupRef.current.rotation.x = Math.sin(t * 0.9) * 0.04;
    groupRef.current.rotation.z = Math.cos(t * 0.7) * 0.03;
  });

  return { isActive, isTabVisible, prefersReducedMotion };
}
