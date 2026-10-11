"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { MOTION_SPRINGS, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SlidingPillProps extends HTMLMotionProps<"span"> {
  /** Framer motion layoutId for tracking across sibling items */
  layoutId?: string;
  /** Custom className for pill background */
  className?: string;
  /** Optional custom spring configuration */
  spring?: typeof MOTION_SPRINGS.pill | typeof MOTION_SPRINGS.layout;
}

/**
 * Sliding active indicator pill using Framer Motion's layoutId and spring physics.
 * Adheres to WCAG 2.2 AA and automatically degrades to instant transitions on reduced motion.
 * Renders behind or above the active element with aria-hidden="true".
 */
export function SlidingPill({
  layoutId = "active-pill",
  className,
  spring = MOTION_SPRINGS.pill,
  ...props
}: SlidingPillProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.span
      layoutId={layoutId}
      transition={prefersReduced ? { duration: 0 } : spring}
      className={cn(
        "absolute inset-0 -z-0 rounded-full bg-saffron text-on-accent shadow-sm pointer-events-none",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export interface SlidingPillItem<T extends string | number> {
  id: T;
  label: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SlidingPillNavProps<T extends string | number> {
  items: SlidingPillItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layoutId?: string;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  pillClassName?: string;
  label?: string;
}

/**
 * Accessible roving-tabindex or tablist pill navigation component.
 * Keyboard accessible with ArrowLeft / ArrowRight support.
 */
export function SlidingPillNav<T extends string | number>({
  items,
  activeId,
  onChange,
  layoutId = "nav-pill",
  className,
  itemClassName,
  activeItemClassName,
  pillClassName,
  label = "Navigation filter",
}: SlidingPillNavProps<T>) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      onChange(items[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      onChange(items[prevIndex].id);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center max-w-full">
      {/* Old-Money Burgundy Paint Spray Atmospheric Backsplash */}
      <div
        className="absolute -inset-3 sm:-inset-5 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(114,32,48,0.32)_0%,rgba(114,32,48,0.12)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(226,125,144,0.30)_0%,rgba(226,125,144,0.10)_50%,transparent_75%)] blur-xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "inline-flex items-center gap-1 p-1 rounded-full bg-elev/90 border border-burgundy/25 backdrop-blur-md overflow-x-auto max-w-full scrollbar-none shadow-[0_0_20px_rgba(114,32,48,0.15)] dark:shadow-[0_0_24px_rgba(226,125,144,0.15)]",
          className
        )}
      >
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={String(item.id)}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1",
                isActive
                  ? cn("text-on-accent font-semibold", activeItemClassName)
                  : "text-muted hover:text-primary",
                item.disabled && "opacity-40 cursor-not-allowed",
                itemClassName
              )}
            >
              {isActive && (
                <SlidingPill layoutId={layoutId} className={pillClassName} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item.label}
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full font-bold",
                      isActive
                        ? "bg-on-accent/15 text-on-accent"
                        : "bg-ui/10 text-muted"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
