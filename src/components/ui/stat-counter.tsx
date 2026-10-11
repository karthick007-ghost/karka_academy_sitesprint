"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
}

export function StatCounter({
  value,
  label,
  description,
  className,
}: StatCounterProps) {
  return (
    <div className={cn("flex flex-col text-center sm:text-left", className)}>
      <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight tabular-nums text-accent-text">
        {value}
      </div>
      <div className="mt-2 text-sm sm:text-base font-bold tracking-wide uppercase text-primary">
        {label}
      </div>
      {description && (
        <div className="mt-1 text-xs sm:text-sm text-muted">
          {description}
        </div>
      )}
    </div>
  );
}
