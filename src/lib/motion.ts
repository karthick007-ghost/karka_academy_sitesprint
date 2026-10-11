"use client";

import { useEffect, useState } from "react";
import type { TargetAndTransition, Transition, Variants } from "framer-motion";

/**
 * Standardized Motion Tokens for Karka Academy.
 * Sourced directly from docs/11 §4:
 * - Durations:
 *   - micro: 120–180ms
 *   - UI: 200–280ms
 *   - reveals: 450–700ms
 *   - page: 350–450ms
 *   - stagger: ≤ 60ms
 * - Easing: cubic-bezier(.2,.7,.2,1) (out)
 * - Spring: { stiffness: 300, damping: 30 }
 */

export const MOTION_DURATIONS = {
  /** Micro-interactions: hover states, active pill, clicks (120-180ms) */
  micro: 0.15,
  microFast: 0.12,
  microSlow: 0.18,

  /** UI transitions: dropdowns, modals, tab switching (200-280ms) */
  ui: 0.24,
  uiFast: 0.20,
  uiSlow: 0.28,

  /** Section reveals: scroll entrances, hero animations (450-700ms) */
  reveal: 0.55,
  revealFast: 0.45,
  revealSlow: 0.70,

  /** Page level view transitions: route change slides (350-450ms) */
  page: 0.40,
  pageFast: 0.35,
  pageSlow: 0.45,

  /** Stagger offset for list items: ≤ 60ms */
  stagger: 0.05,
} as const;

export const MOTION_MS = {
  micro: 150,
  microFast: 120,
  microSlow: 180,
  ui: 240,
  uiFast: 200,
  uiSlow: 280,
  reveal: 550,
  revealFast: 450,
  revealSlow: 700,
  page: 400,
  pageFast: 350,
  pageSlow: 450,
  stagger: 50,
} as const;

export const MOTION_EASINGS = {
  /** Standard out curve: cubic-bezier(.2, .7, .2, 1) */
  out: [0.2, 0.7, 0.2, 1] as const,
  outCubic: "cubic-bezier(0.2, 0.7, 0.2, 1)",
  inOut: [0.4, 0, 0.2, 1] as const,
  inOutCubic: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const MOTION_SPRINGS = {
  /** Standard spring for layout moves: stiffness 300, damping 30 */
  default: { type: "spring" as const, stiffness: 300, damping: 30 },
  layout: { type: "spring" as const, stiffness: 300, damping: 30 },
  /** Optimized spring for active pill / tab navigation */
  pill: { type: "spring" as const, stiffness: 350, damping: 32 },
  /** Gentle spring for subtle hover / badge bounces */
  gentle: { type: "spring" as const, stiffness: 220, damping: 28 },
} as const;

export const MOTION_TRANSITIONS = {
  micro: {
    duration: MOTION_DURATIONS.micro,
    ease: MOTION_EASINGS.out,
  } satisfies Transition,
  ui: {
    duration: MOTION_DURATIONS.ui,
    ease: MOTION_EASINGS.out,
  } satisfies Transition,
  reveal: {
    duration: MOTION_DURATIONS.reveal,
    ease: MOTION_EASINGS.out,
  } satisfies Transition,
  page: {
    duration: MOTION_DURATIONS.page,
    ease: MOTION_EASINGS.out,
  } satisfies Transition,
  spring: MOTION_SPRINGS.default satisfies Transition,
  instant: {
    duration: 0,
  } satisfies Transition,
  fadeOnly: {
    duration: MOTION_DURATIONS.micro,
    ease: "linear",
  } satisfies Transition,
} as const;

export const MOTION_VARIANTS: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: MOTION_TRANSITIONS.ui },
  },
  slideUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: MOTION_TRANSITIONS.reveal },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: MOTION_DURATIONS.stagger,
      },
    },
  },
  popLayoutItem: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: MOTION_SPRINGS.layout },
    exit: { opacity: 0, scale: 0.96, transition: { duration: MOTION_DURATIONS.micro } },
  },
};

/**
 * Checks whether the user has requested reduced motion.
 * SSR-safe, reactive to system preference changes.
 */
export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reducedMotion;
}

/**
 * Synchronous client-side check for reduced motion preference.
 * Returns false on SSR.
 */
export function isReducedMotionActive(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns an accessible transition object based on prefers-reduced-motion state.
 * Tiers:
 * - default: base transition
 * - instant: duration 0s
 * - fade: simple linear opacity fade without transforms
 */
export function getAccessibleTransition(
  baseTransition: Transition,
  options?: {
    reducedMotion?: boolean;
    fallback?: "instant" | "fade";
  }
): Transition {
  const isReduced =
    options?.reducedMotion ?? (typeof window !== "undefined" && isReducedMotionActive());

  if (!isReduced) return baseTransition;

  if (options?.fallback === "fade") {
    return MOTION_TRANSITIONS.fadeOnly;
  }
  return MOTION_TRANSITIONS.instant;
}

/**
 * Strips positional and scaling transforms from variants when reduced motion is preferred,
 * preserving only opacity changes for cognitive & vestibular comfort.
 */
export function getAccessibleVariants(
  variants: Variants,
  isReducedMotion: boolean
): Variants {
  if (!isReducedMotion) return variants;

  const accessible: Variants = {};
  for (const [key, target] of Object.entries(variants)) {
    if (typeof target === "object" && target !== null && !Array.isArray(target)) {
      const targetObj = target as { opacity?: number | string };
      const sanitized: TargetAndTransition = {
        transition: MOTION_TRANSITIONS.instant,
        opacity: "opacity" in targetObj ? targetObj.opacity : 1,
      };
      accessible[key] = sanitized;
    } else {
      accessible[key] = target;
    }
  }
  return accessible;
}
