"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, isFormInput } from "./use-fine-pointer";

export interface MagneticProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  children: React.ReactNode;
  className?: string;
  /**
   * Maximum pull displacement in pixels.
   * Strictly clamped to <= 8px per Phase 2 design specifications.
   * Default: 6px.
   */
  maxPull?: number;
  /** Attenuation factor for pointer distance. Default: 0.2 */
  strength?: number;
  /** Explicitly disable magnetic pull */
  disabled?: boolean;
}

/**
 * Magnetic interaction wrapper.
 *
 * Imparts a gentle magnetic pull (<= 8px) towards pointer with natural spring release.
 * Strictly gated behind `(hover: hover) and (pointer: fine)` and NOT `prefers-reduced-motion`.
 * Rejects touch devices and form inputs.
 */
export const Magnetic = React.forwardRef<HTMLDivElement, MagneticProps>(
  (
    {
      children,
      className,
      maxPull = 6,
      strength = 0.2,
      disabled = false,
      onPointerMove,
      onPointerLeave,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef = (forwardedRef as React.RefObject<HTMLDivElement | null>) || internalRef;
    const { canRunEffects } = useFinePointer();

    // Strict clamp: never exceed 8px
    const effectiveMaxPull = Math.min(Math.max(0, maxPull), 8);
    const isEnabled = canRunEffects && !disabled;

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Natural physical spring release matching docs/11 §4
    const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isEnabled || !containerRef.current) {
          onPointerMove?.(e);
          return;
        }

        // Never pull inside form inputs
        if (isFormInput(e.target)) {
          x.set(0);
          y.set(0);
          onPointerMove?.(e);
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        const clampedX = Math.max(-effectiveMaxPull, Math.min(effectiveMaxPull, deltaX));
        const clampedY = Math.max(-effectiveMaxPull, Math.min(effectiveMaxPull, deltaY));

        x.set(clampedX);
        y.set(clampedY);

        onPointerMove?.(e);
      },
      [isEnabled, containerRef, strength, effectiveMaxPull, x, y, onPointerMove]
    );

    const handlePointerLeave = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        x.set(0);
        y.set(0);
        onPointerLeave?.(e);
      },
      [x, y, onPointerLeave]
    );

    // Fallback: render static container without motion when effects are gated
    if (!isEnabled) {
      return (
        <div
          ref={containerRef}
          className={cn("inline-block", className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={containerRef}
        className={cn("inline-block will-change-transform", className)}
        style={{ x: springX, y: springY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Magnetic.displayName = "Magnetic";
