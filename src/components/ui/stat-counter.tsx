"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
  nightMode?: boolean;
}

export function StatCounter({
  value,
  label,
  description,
  className,
  nightMode = false,
}: StatCounterProps) {
  return (
    <div className={cn("flex flex-col text-center sm:text-left", className)}>
      <div
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight tabular-nums",
          nightMode ? "text-mint" : "text-saffron-ink"
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-2 text-sm sm:text-base font-bold tracking-wide uppercase",
          nightMode ? "text-night-text" : "text-ink"
        )}
      >
        {label}
      </div>
      {description && (
        <div
          className={cn(
            "mt-1 text-xs sm:text-sm",
            nightMode ? "text-night-muted" : "text-ink-3"
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
