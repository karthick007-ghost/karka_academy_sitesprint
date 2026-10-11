import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "saffron" | "forest" | "glass" | "night" | "mint" | "burgundy";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-border bg-bg-sunken text-text-muted font-medium",
    saffron: "border-accent/25 bg-accent/10 text-accent-text font-semibold",
    forest: "border-emerald-500/25 bg-emerald-500/10 text-positive-text font-semibold",
    glass: "glass text-text border-border",
    night: "border-emerald-500/25 bg-emerald-500/10 text-positive-text font-semibold",
    mint: "border-emerald-500/25 bg-emerald-500/10 text-positive-text font-semibold",
    burgundy: "border-burgundy/25 bg-burgundy-subtle text-burgundy font-semibold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-xs font-semibold uppercase tracking-wider select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
