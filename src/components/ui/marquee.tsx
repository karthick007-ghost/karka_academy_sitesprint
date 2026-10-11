"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speedSec?: number;
}

export function Marquee({ items, className, speedSec = 28 }: MarqueeProps) {
  // Deduplicate array once and concatenate for seamless continuous CSS scroll
  const duplicated = [...items, ...items];

  return (
    <div
      role="region"
      aria-label="Hiring Partners List"
      className={cn(
        "group relative flex overflow-hidden select-none py-4 border-y border-ink/5 bg-paper-2/40",
        className
      )}
    >
      <div
        className="flex shrink-0 items-center justify-around gap-12 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {duplicated.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="text-base sm:text-lg font-bold tracking-wide text-muted uppercase whitespace-nowrap hover:text-accent-text transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center justify-around gap-12 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {duplicated.map((item, idx) => (
          <span
            key={`dup-${item}-${idx}`}
            className="text-base sm:text-lg font-bold tracking-wide text-muted uppercase whitespace-nowrap hover:text-accent-text transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
