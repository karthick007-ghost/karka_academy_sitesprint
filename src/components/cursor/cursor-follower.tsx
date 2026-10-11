"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useFinePointer, isFormInput } from "./use-fine-pointer";

export interface CursorFollowerProps {
  /** Optional class name for custom styling */
  className?: string;
  /** Primary accent color ring class. Defaults to saffron with dark mode mint */
  accentClass?: string;
}

/**
 * Smooth trailing cursor ring.
 *
 * Scales up over interactive elements (buttons, links, triggers)
 * and displays contextual text pills ("View", "Drag", etc.) when hovering
 * elements with `data-cursor-text="View"`.
 *
 * Strictly disabled:
 * - On touch devices / coarse pointers
 * - When `prefers-reduced-motion` is active
 * - Inside `<input>`, `<textarea>`, `<select>`, and editable fields
 */
export function CursorFollower({
  className = "",
  accentClass,
}: CursorFollowerProps) {
  const { canRunEffects, isReady } = useFinePointer();

  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [contextText, setContextText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, snappy spring for cursor trailing
  const springConfig = { stiffness: 450, damping: 35, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!canRunEffects || !isReady) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    // Activate custom cursor mode (hides OS cursor via CSS cursor: none)
    document.body.classList.add("custom-cursor-active");

    const handlePointerMove = (e: PointerEvent) => {
      // Reject touch events directly if simulated
      if (e.pointerType === "touch") {
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
        return;
      }

      // Check form inputs: hide custom follower completely so native text caret is unobscured
      if (isFormInput(e.target)) {
        setIsVisible(false);
        setIsInteractive(false);
        setContextText(null);
        return;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Check interactive targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "button, a, [role='button'], summary, [data-cursor-interactive='true'], [data-cursor-interactive]"
      );
      setIsInteractive(Boolean(interactiveEl));

      // Check for contextual label
      const labeledEl = target.closest(
        "[data-cursor-text], [data-cursor-label], [data-cursor]"
      );
      if (labeledEl) {
        const text =
          labeledEl.getAttribute("data-cursor-text") ||
          labeledEl.getAttribute("data-cursor-label") ||
          labeledEl.getAttribute("data-cursor");
        if (text && text !== "true" && text.trim().length > 0) {
          setContextText(text.trim());
          return;
        }
      }
      setContextText(null);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsInteractive(false);
      setContextText(null);
      document.body.classList.remove("custom-cursor-active");
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add("custom-cursor-active");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [canRunEffects, isReady, mouseX, mouseY]);

  // Zero render on SSR, touch screens, or reduced-motion
  if (!canRunEffects || !isReady) {
    return null;
  }

  const defaultAccent =
    accentClass ||
    "border-saffron/70 bg-saffron/10 dark:border-mint/80 dark:bg-mint/15";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Precision cursor dot for instant click targeting */}
        {!contextText && (
          <div
            className={`absolute h-2 w-2 rounded-full transition-all duration-150 ${
              isInteractive
                ? "bg-saffron scale-125 dark:bg-mint shadow-sm"
                : "bg-saffron dark:bg-mint shadow-[0_0_8px_rgba(235,94,40,0.5)]"
            }`}
          />
        )}

        {/* Dynamic Trailing Ring */}
        <motion.div
          layout
          className={`flex items-center justify-center rounded-full border backdrop-blur-[2px] transition-colors duration-150 ${defaultAccent}`}
          animate={{
            width: contextText ? "auto" : isInteractive ? 48 : 26,
            height: contextText ? 32 : isInteractive ? 48 : 26,
            scale: isInteractive ? 1.05 : 1,
            borderRadius: contextText ? 999 : 9999,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait">
            {contextText && (
              <motion.span
                key={contextText}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.12 }}
                className="whitespace-nowrap px-3 text-[10px] font-bold tracking-wider uppercase text-ink dark:text-night-text select-none"
              >
                {contextText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
