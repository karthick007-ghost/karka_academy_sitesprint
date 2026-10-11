"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e)}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`relative inline-flex h-11 w-11 touch-target items-center justify-center rounded-xl border border-ui/20 bg-elev/80 backdrop-blur-sm text-primary transition-colors hover:border-ui/50 hover:bg-elev focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${className}`}
    >
      <span className="sr-only">{label}</span>

      {/* Sun Icon (visible in dark mode) */}
      <Sun
        className={`h-5 w-5 transition-all duration-300 motion-reduce:duration-0 ${
          isDark
            ? "rotate-0 scale-100 text-accent opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        } absolute`}
        aria-hidden="true"
      />

      {/* Moon Icon (visible in light mode) */}
      <Moon
        className={`h-5 w-5 transition-all duration-300 motion-reduce:duration-0 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 text-primary opacity-100"
        } absolute`}
        aria-hidden="true"
      />
    </button>
  );
}
