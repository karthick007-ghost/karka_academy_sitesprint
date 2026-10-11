"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, isFormInput } from "@/components/cursor/use-fine-pointer";

export type TiltCardTag =
  | "div"
  | "section"
  | "article"
  | "aside";

export interface TiltCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  children: React.ReactNode;
  className?: string;
  /**
   * Maximum tilt angle in degrees.
   * Strictly clamped to <= 5° per Phase 2 design specifications.
   * Default: 5.
   */
  maxTilt?: number;
  /** Whether to render dynamic moving specular glare reflection. Default: true */
  glare?: boolean;
  /** Maximum opacity of the specular glare reflection (<= 0.25 to protect contrast). Default: 0.18 */
  glareMaxOpacity?: number;
  /** Explicitly disable tilt interaction */
  disabled?: boolean;
  /** HTML tag or component to render as. Default: 'div' */
  as?: TiltCardTag;
}

/**
 * 3D Perspective Tilt Card with Specular Glare Reflection.
 *
 * Imparts subtle 3D perspective rotation (strictly clamped to ±5°) and dynamic specular glare.
 * Strictly gated behind `(hover: hover) and (pointer: fine)` and NOT `prefers-reduced-motion`.
 * On touch devices, mobile screens, or reduced motion, renders as an accessible flat card.
 */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      children,
      className,
      maxTilt = 5,
      glare = true,
      glareMaxOpacity = 0.18,
      disabled = false,
      as: Tag = "div",
      onPointerMove,
      onPointerLeave,
      onPointerEnter,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const cardRef = (forwardedRef as React.RefObject<HTMLDivElement | null>) || internalRef;
    const { canRunEffects, isReady } = useFinePointer();

    // Strict clamp: never exceed ±5 degrees
    const effectiveMaxTilt = Math.min(Math.max(1, maxTilt), 5);
    const effectiveGlareOpacity = Math.min(Math.max(0, glareMaxOpacity), 0.25);
    const isEnabled = canRunEffects && isReady && !disabled;

    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);

    // Natural spring physics for subtle tilt
    const springConfig = { stiffness: 280, damping: 24, mass: 0.6 };
    const rotateX = useSpring(rawRotateX, springConfig);
    const rotateY = useSpring(rawRotateY, springConfig);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isEnabled || !cardRef.current) {
          onPointerMove?.(e);
          return;
        }

        // Suppress tilt when typing inside form inputs
        if (isFormInput(e.target)) {
          rawRotateX.set(0);
          rawRotateY.set(0);
          setGlarePos((prev) => ({ ...prev, opacity: 0 }));
          onPointerMove?.(e);
          return;
        }

        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalized offsets from center (-0.5 to 0.5)
        const normX = x / rect.width - 0.5;
        const normY = y / rect.height - 0.5;

        // Calculate rotation angles (pointer at top tilts backward => -rotateX)
        const targetRotX = Math.max(
          -effectiveMaxTilt,
          Math.min(effectiveMaxTilt, -normY * (effectiveMaxTilt * 2))
        );
        const targetRotY = Math.max(
          -effectiveMaxTilt,
          Math.min(effectiveMaxTilt, normX * (effectiveMaxTilt * 2))
        );

        rawRotateX.set(targetRotX);
        rawRotateY.set(targetRotY);

        if (glare) {
          setGlarePos({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
            opacity: effectiveGlareOpacity,
          });
        }

        onPointerMove?.(e);
      },
      [
        isEnabled,
        cardRef,
        effectiveMaxTilt,
        effectiveGlareOpacity,
        glare,
        rawRotateX,
        rawRotateY,
        onPointerMove,
      ]
    );

    const handlePointerLeave = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        rawRotateX.set(0);
        rawRotateY.set(0);
        if (glare) {
          setGlarePos((prev) => ({ ...prev, opacity: 0 }));
        }
        onPointerLeave?.(e);
      },
      [rawRotateX, rawRotateY, glare, onPointerLeave]
    );

    const handlePointerEnter = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isEnabled || isFormInput(e.target)) {
          onPointerEnter?.(e);
          return;
        }
        if (glare) {
          setGlarePos((prev) => ({ ...prev, opacity: effectiveGlareOpacity }));
        }
        onPointerEnter?.(e);
      },
      [isEnabled, glare, effectiveGlareOpacity, onPointerEnter]
    );

    // Static fallback: mobile, touch screen, reduced motion, or disabled
    if (!isEnabled) {
      return React.createElement(
        Tag,
        {
          ref: cardRef,
          className: cn("rounded-lg border border-border-soft bg-bg-elev p-6", className),
          style,
          ...props,
        },
        children
      );
    }

    return (
      <div
        className="relative [perspective:1000px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          ref={cardRef}
          className={cn(
            "relative rounded-lg border border-border-soft bg-bg-elev p-6 transition-shadow duration-200",
            className
          )}
          style={{
            ...style,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerEnter={handlePointerEnter}
          {...props}
        >
          {/* Specular glare reflection overlay */}
          {glare && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] transition-opacity duration-300 ease-out"
              style={{
                opacity: glarePos.opacity,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)`,
                }}
              />
            </div>
          )}

          {/* Card content */}
          <div className="relative z-0 h-full w-full">{children}</div>
        </motion.div>
      </div>
    );
  }
);

TiltCard.displayName = "TiltCard";
