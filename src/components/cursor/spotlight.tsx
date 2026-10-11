"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer, isFormInput } from "./use-fine-pointer";

export type SpotlightTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "main"
  | "nav";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /** Radius of the radial spotlight in pixels. Default 360 */
  size?: number;
  /** Color/tint of the spotlight highlight. Default subtle saffron-tinted ambient shine */
  color?: string;
  /** Explicitly disable spotlight */
  disabled?: boolean;
  /** HTML tag or container element to render as. Default 'div' */
  as?: SpotlightTag;
}

/**
 * Spotlight container component.
 *
 * Casts a subtle radial gradient highlight following the mouse pointer via CSS variables `--mx` and `--my`.
 * Strictly gated behind `(hover: hover) and (pointer: fine)` and NOT `prefers-reduced-motion`.
 * Suppresses effect when pointer is over form inputs or touch devices.
 */
export const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      children,
      className,
      size = 360,
      color = "rgba(255, 106, 43, 0.08)",
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
    const containerRef = (forwardedRef as React.RefObject<HTMLDivElement | null>) || internalRef;
    const { canRunEffects } = useFinePointer();

    const isEnabled = canRunEffects && !disabled;

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isEnabled || !containerRef.current) {
          onPointerMove?.(e);
          return;
        }

        // Suppress highlight inside form inputs
        if (isFormInput(e.target)) {
          containerRef.current.style.setProperty("--spotlight-opacity", "0");
          onPointerMove?.(e);
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        containerRef.current.style.setProperty("--mx", `${x}px`);
        containerRef.current.style.setProperty("--my", `${y}px`);
        containerRef.current.style.setProperty("--spotlight-opacity", "1");

        onPointerMove?.(e);
      },
      [isEnabled, containerRef, onPointerMove]
    );

    const handlePointerLeave = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (containerRef.current) {
          containerRef.current.style.setProperty("--spotlight-opacity", "0");
        }
        onPointerLeave?.(e);
      },
      [containerRef, onPointerLeave]
    );

    const handlePointerEnter = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isEnabled || isFormInput(e.target)) {
          onPointerEnter?.(e);
          return;
        }
        if (containerRef.current) {
          containerRef.current.style.setProperty("--spotlight-opacity", "1");
        }
        onPointerEnter?.(e);
      },
      [isEnabled, containerRef, onPointerEnter]
    );

    return React.createElement(
      Tag,
      {
        ref: containerRef,
        className: cn("relative overflow-hidden", className),
        onPointerMove: handlePointerMove,
        onPointerLeave: handlePointerLeave,
        onPointerEnter: handlePointerEnter,
        style: {
          ...style,
          "--spotlight-size": `${size}px`,
        } as React.CSSProperties,
        ...props,
      },
      <>
        {/* Spotlight specular highlight overlay */}
        {isEnabled && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-300 ease-out"
            style={{
              opacity: "var(--spotlight-opacity, 0)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(var(--spotlight-size, ${size}px) circle at var(--mx, -1000px) var(--my, -1000px), ${color}, transparent 80%)`,
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-[1] h-full w-full">{children}</div>
      </>
    );
  }
);

Spotlight.displayName = "Spotlight";
