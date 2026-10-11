"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MOTION_DURATIONS,
  MOTION_EASINGS,
  usePrefersReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export type RevealTag = "div" | "section" | "article" | "aside" | "span" | "header" | "footer" | "main";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Direction of entrance translation */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Slide distance in pixels (defaults to 20px) */
  distance?: number;
  /** Delay in seconds before animating starts (defaults to 0) */
  delay?: number;
  /** Duration in seconds (defaults to MOTION_DURATIONS.reveal = 0.55s) */
  duration?: number;
  /** IntersectionObserver threshold (0 to 1, default 0.1) */
  threshold?: number;
  /** IntersectionObserver rootMargin (default "0px 0px -40px 0px") */
  rootMargin?: string;
  /** Optional HTML tag or container (default 'div') */
  as?: RevealTag;
  className?: string;
}

/**
 * Lightweight IntersectionObserver-based reveal component.
 * - Animates transform and opacity only (compositor friendly).
 * - Fires exactly once (never replays on scroll-up).
 * - Pauses execution when offscreen or when page tab is hidden.
 * - Cleans up `will-change` immediately upon animation completion.
 * - Bypasses animations instantly when prefers-reduced-motion is active.
 */
export function Reveal({
  children,
  direction = "up",
  distance = 20,
  delay = 0,
  duration = MOTION_DURATIONS.reveal,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  as: Component = "div",
  className,
  style,
  ...props
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (document.hidden) {
            const onVisibilityChange = () => {
              if (!document.hidden) {
                document.removeEventListener("visibilitychange", onVisibilityChange);
                setIsVisible(true);
                setIsAnimating(true);
              }
            };
            document.addEventListener("visibilitychange", onVisibilityChange);
          } else {
            setIsVisible(true);
            setIsAnimating(true);
          }

          observer?.disconnect();
          observer = null;
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer?.disconnect();
    };
  }, [prefersReduced, threshold, rootMargin]);

  const getOffset = () => {
    if (direction === "none" || isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === ref.current) {
      setIsAnimating(false);
    }
  };

  const Tag = Component as "div";

  if (prefersReduced) {
    return (
      <Tag ref={ref} className={className} style={style} {...props}>
        {children}
      </Tag>
    );
  }

  const computedStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: getOffset(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: MOTION_EASINGS.outCubic,
    transitionDelay: `${delay}s`,
    willChange: isAnimating ? "opacity, transform" : "auto",
  };

  return (
    <Tag
      ref={ref}
      className={cn("motion-reveal", className)}
      style={computedStyle}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {children}
    </Tag>
  );
}

export interface RevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  as?: RevealTag;
}

export function RevealGroup({
  children,
  stagger = MOTION_DURATIONS.stagger,
  direction = "up",
  distance = 20,
  duration = MOTION_DURATIONS.reveal,
  className,
  as: Component = "div",
  ...props
}: RevealGroupProps) {
  const childArray = React.Children.toArray(children);
  const Tag = Component as "div";

  return (
    <Tag className={className} {...props}>
      {childArray.map((child, index) => (
        <Reveal
          key={React.isValidElement(child) && child.key ? child.key : index}
          delay={index * stagger}
          direction={direction}
          distance={distance}
          duration={duration}
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
