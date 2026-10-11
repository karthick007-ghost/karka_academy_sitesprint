import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "saffron" | "forest" | "glass" | "night";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border border-ink/10 bg-paper-2 text-ink-2",
    saffron: "border border-saffron/30 bg-saffron/10 text-saffron-ink",
    forest: "border border-forest/20 bg-forest/10 text-forest",
    glass: "glass text-night-text border-white/20",
    night: "border border-mint/30 bg-mint/10 text-mint",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wider select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
