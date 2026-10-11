"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

export interface ScrollProgressProps {
  /** Optional custom class names */
  className?: string;
  /** Hairline thickness in pixels. Default: 2 */
  height?: number;
  /** Custom gradient or color class. Default: 'bg-saffron' */
  colorClass?: string;
}

/**
 * Hairline Scroll Progress Indicator.
 *
 * Fixed at the top of the viewport to display page reading progress.
 * Hardware accelerated using CSS transform (scaleX) to prevent layout recalculations.
 * Bypasses spring physics when prefers-reduced-motion is active.
 */
export function ScrollProgress({
  className,
  height = 2,
  colorClass = "bg-saffron",
}: ScrollProgressProps) {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll();

  // Smooth, responsive spring interpolation
  const smoothScaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 38,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Choose spring interpolation for fine pointers, or direct scale for reduced-motion
  const scale = prefersReduced ? scrollYProgress : smoothScaleX;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={cn("h-full w-full origin-left", colorClass, className)}
        style={{
          scaleX: scale,
          transformOrigin: "0% 50%",
        }}
      />
    </div>
  );
}
