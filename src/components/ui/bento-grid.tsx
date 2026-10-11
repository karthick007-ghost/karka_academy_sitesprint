import * as React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  title,
  number,
  description,
  highlight = false,
}: {
  className?: string;
  title: string;
  number?: string | number;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-lg p-6 sm:p-8 transition-all duration-300",
        highlight
          ? "bg-forest text-paper shadow-xl lg:col-span-2"
          : "bg-paper border border-ink/10 shadow-subtle hover:border-forest/30 hover:shadow-md",
        className
      )}
    >
      <div>
        {number && (
          <span
            className={cn(
              "font-display text-3xl sm:text-4xl font-bold opacity-30 select-none block mb-4",
              highlight ? "text-mint" : "text-ink"
            )}
          >
            {typeof number === "number" ? String(number).padStart(2, "0") : number}
          </span>
        )}
        <h3
          className={cn(
            "font-display text-xl sm:text-2xl font-bold tracking-tight mb-3",
            highlight ? "text-paper" : "text-ink"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-base leading-relaxed",
            highlight ? "text-paper/80" : "text-ink-2"
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
