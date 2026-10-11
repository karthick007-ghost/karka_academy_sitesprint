"use client";

import { useState, useEffect } from "react";

export interface MeshMaterialConfig {
  color: string;
  roughness: number;
  metalness: number;
  transparent: boolean;
  opacity: number;
  emissive: string;
  emissiveIntensity: number;
}

/**
 * Resolves theme ("light" | "dark") inside R3F scenes
 * Supports explicit prop override, or automatically inspects document[data-theme]
 */
export function useResolvedTheme(propTheme?: "light" | "dark"): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (propTheme) return propTheme;
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "light" || attr === "dark") return attr;
      return typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (propTheme) {
      setTheme(propTheme);
      return;
    }
    const updateTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "light" || attr === "dark") {
        setTheme(attr);
      } else {
        setTheme(typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      }
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => observer.disconnect();
  }, [propTheme]);

  return theme;
}

/**
 * Procedural standard material configuration adhering to:
 * - Light Mode: Clean frosted translucent materials (roughness 0.38, metalness 0.15, transparent opacity 0.88)
 * - Dark Mode: Glowing specular cyber materials (roughness 0.18, metalness 0.75, luminous emissive)
 */
export function getTrackMaterial(
  theme: "light" | "dark",
  primaryColor: string,
  isHovered: boolean = false
): MeshMaterialConfig {
  const isLight = theme === "light";

  if (isLight) {
    return {
      color: primaryColor,
      roughness: 0.38,
      metalness: 0.15,
      transparent: true,
      opacity: 0.88,
      emissive: primaryColor,
      emissiveIntensity: isHovered ? 0.35 : 0.08,
    };
  }

  // Dark Mode
  return {
    color: primaryColor,
    roughness: 0.18,
    metalness: 0.75,
    transparent: false,
    opacity: 1.0,
    emissive: primaryColor,
    emissiveIntensity: isHovered ? 1.4 : 0.6,
  };
}

/**
 * Secondary accent material (accent rings, data nodes, glass slabs)
 */
export function getAccentMaterial(
  theme: "light" | "dark",
  accentColor: string,
  isHovered: boolean = false
): MeshMaterialConfig {
  const isLight = theme === "light";

  if (isLight) {
    return {
      color: accentColor,
      roughness: 0.32,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
      emissive: accentColor,
      emissiveIntensity: isHovered ? 0.45 : 0.15,
    };
  }

  // Dark Mode
  return {
    color: accentColor,
    roughness: 0.12,
    metalness: 0.85,
    transparent: false,
    opacity: 1.0,
    emissive: accentColor,
    emissiveIntensity: isHovered ? 1.8 : 0.9,
  };
}

/**
 * Frosted glass slab base material
 */
export function getGlassSlabMaterial(
  theme: "light" | "dark",
  tintColor: string,
  isHovered: boolean = false
): MeshMaterialConfig {
  const isLight = theme === "light";

  if (isLight) {
    return {
      color: "#FFFFFF",
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
      emissive: tintColor,
      emissiveIntensity: isHovered ? 0.25 : 0.05,
    };
  }

  // Dark Mode
  return {
    color: "#121821",
    roughness: 0.2,
    metalness: 0.65,
    transparent: true,
    opacity: 0.85,
    emissive: tintColor,
    emissiveIntensity: isHovered ? 0.8 : 0.3,
  };
}
