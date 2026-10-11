"use client";

import React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import {
  MOTION_DURATIONS,
  MOTION_SPRINGS,
  usePrefersReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export type MotionGridTag = "div" | "section" | "ul" | "ol" | "main";

export interface MotionGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: MotionGridTag;
}

export interface MotionGridItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  /** Framer Motion layout mode: defaults to 'position' for silky transform-only reflows */
  layout?: boolean | "position" | "size";
  /** Optional layoutId for morphing elements across containers */
  layoutId?: string;
}

/**
 * Layout-animated container wrapping AnimatePresence mode="popLayout".
 * Allows cards and grid items to smoothly reflow when filters or queries change.
 */
export function MotionGrid({
  children,
  className,
  as: Component = "div",
  ...props
}: MotionGridProps) {
  const Tag = Component as "div";
  return (
    <Tag className={cn("relative", className)} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        {children}
      </AnimatePresence>
    </Tag>
  );
}

/**
 * Child item for MotionGrid.
 * Animates scale & opacity on mount/unmount and positional transform on reflow.
 * Strictly respects prefers-reduced-motion by bypassing animations.
 */
export function MotionGridItem({
  children,
  className,
  layout = "position",
  layoutId,
  ...props
}: MotionGridItemProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <div className={cn("w-full", className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      layout={layout}
      layoutId={layoutId}
      transition={MOTION_SPRINGS.layout}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.96,
        transition: { duration: MOTION_DURATIONS.micro },
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
