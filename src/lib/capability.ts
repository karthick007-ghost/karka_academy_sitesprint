"use client";

import { useState, useEffect } from "react";

export interface DeviceCapabilities {
  canRender3D: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
  isLowEnd: boolean;
  isReady: boolean;
}

export function useCapability(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    canRender3D: false,
    prefersReducedMotion: false,
    saveData: false,
    isLowEnd: false,
    isReady: false,
  });

  useEffect(() => {
    // 1. Reduced Motion Check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = motionQuery.matches;

    // 2. Data Saver Check
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const saveData = Boolean(connection?.saveData);

    // 3. Hardware Specs Check
    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    const deviceMemory = nav.deviceMemory ?? 8;
    const hardwareConcurrency = nav.hardwareConcurrency ?? 8;
    const isLowEnd = deviceMemory < 4 || hardwareConcurrency < 4;

    // 4. WebGL2 Context Check
    let hasWebGL2 = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL2 = Boolean(canvas.getContext("webgl2"));
    } catch {
      hasWebGL2 = false;
    }

    const canRender3D = !prefersReducedMotion && !saveData && !isLowEnd && hasWebGL2;

    setCapabilities({
      canRender3D,
      prefersReducedMotion,
      saveData,
      isLowEnd,
      isReady: true,
    });
  }, []);

  return capabilities;
}
