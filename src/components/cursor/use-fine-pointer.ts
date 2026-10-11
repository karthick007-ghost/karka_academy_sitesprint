"use client";

import { useEffect, useState } from "react";

export interface FinePointerState {
  /** True when the primary pointer has fine resolution (mouse, trackpad) and can hover. */
  isFinePointer: boolean;
  /** True when the user has enabled prefers-reduced-motion in OS settings. */
  prefersReducedMotion: boolean;
  /**
   * True only if pointer is fine, hover is available, AND reduced-motion is FALSE.
   * Gating boolean required by Phase 2 cursor and pointer effects specification.
   */
  canRunEffects: boolean;
  /** True once client-side detection has run (SSR guard). */
  isReady: boolean;
}

/**
 * Checks whether an event target is an interactive form input
 * where custom cursor/pointer effects must be suppressed to preserve native text editing UX.
 */
export function isFormInput(target: EventTarget | null): boolean {
  if (!target) return false;
  
  if (typeof Element !== "undefined" && target instanceof Element) {
    const selector =
      "input, textarea, select, option, [contenteditable='true'], [role='textbox'], [role='searchbox'], [role='combobox']";
    return Boolean(target.matches(selector) || target.closest(selector));
  }
  
  // Fallback for non-standard target elements with closest
  const el = target as { closest?: (selector: string) => Element | null };
  if (typeof el.closest === "function") {
    return Boolean(
      el.closest(
        "input, textarea, select, option, [contenteditable='true'], [role='textbox'], [role='searchbox']"
      )
    );
  }
  
  return false;
}

/**
 * Hook to strictly gate fine-pointer, cursor, and tilt effects.
 *
 * Rules:
 * - Requires `(hover: hover) and (pointer: fine)`
 * - Rejects `prefers-reduced-motion: reduce`
 * - Rejects touch devices and coarse pointers
 * - Reacts to dynamic hardware and OS setting changes
 */
export function useFinePointer(): FinePointerState {
  const [state, setState] = useState<FinePointerState>({
    isFinePointer: false,
    prefersReducedMotion: false,
    canRunEffects: false,
    isReady: false,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateState = () => {
      const isFine = pointerQuery.matches;
      const isReduced = motionQuery.matches;
      setState({
        isFinePointer: isFine,
        prefersReducedMotion: isReduced,
        canRunEffects: isFine && !isReduced,
        isReady: true,
      });
    };

    updateState();

    const onPointerChange = () => updateState();
    const onMotionChange = () => updateState();

    if (pointerQuery.addEventListener) {
      pointerQuery.addEventListener("change", onPointerChange);
      motionQuery.addEventListener("change", onMotionChange);
    } else {
      // Fallback for older WebKit / Safari
      pointerQuery.addListener(onPointerChange);
      motionQuery.addListener(onMotionChange);
    }

    return () => {
      if (pointerQuery.removeEventListener) {
        pointerQuery.removeEventListener("change", onPointerChange);
        motionQuery.removeEventListener("change", onMotionChange);
      } else {
        pointerQuery.removeListener(onPointerChange);
        motionQuery.removeListener(onMotionChange);
      }
    };
  }, []);

  return state;
}
