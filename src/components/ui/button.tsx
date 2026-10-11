"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/cursor/magnetic";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "night" | "saffronOutline";
  size?: "sm" | "md" | "lg" | "icon";
  /**
   * Enables gentle magnetic cursor pull (<= 8px) on desktop fine-pointer devices.
   * Seamlessly ignored on touch screens and under prefers-reduced-motion.
   */
  magnetic?: boolean;
  /** Custom magnetic pull distance in pixels (clamped to <= 8px). Default 6 */
  magneticPull?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      magnetic = false,
      magneticPull = 6,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      // Primary: Saffron fill + Ink text (Contrast 6.27:1 - WCAG AA compliant)
      primary:
        "bg-saffron text-ink font-bold shadow-subtle hover:bg-saffron/90",
      secondary:
        "bg-forest text-paper font-semibold hover:bg-forest/90",
      outline:
        "border border-forest/30 text-forest bg-transparent hover:bg-forest/5",
      saffronOutline:
        "border border-saffron/40 text-saffron-ink bg-transparent hover:bg-saffron/10",
      ghost:
        "text-ink hover:bg-ink/5 active:bg-ink/10",
      night:
        "bg-mint text-night font-bold shadow-subtle hover:bg-mint/90 focus-visible:ring-mint focus-visible:ring-offset-night",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-sm",
      md: "min-h-[44px] px-5 py-2.5 text-sm rounded-md", // 44px min touch target
      lg: "min-h-[48px] px-7 py-3 text-base rounded-md",
      icon: "h-11 w-11 rounded-md flex items-center justify-center",
    };

    const buttonElement = (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base layout and typography
          "inline-flex items-center justify-center whitespace-nowrap text-center select-none font-medium",
          // Focus rings: 2px forest ring + 2px paper offset; on night/dark: mint ring + night offset
          "outline-none focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-forest dark:focus-visible:ring-mint",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-night",
          // Active press scale (.98) with spring-like cubic transition, bypassed under reduced-motion
          "active:scale-[0.98] motion-reduce:active:scale-100 transition-all duration-200",
          // Disabled state
          "disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );

    if (magnetic) {
      return (
        <Magnetic maxPull={magneticPull} disabled={disabled}>
          {buttonElement}
        </Magnetic>
      );
    }

    return buttonElement;
  }
);

Button.displayName = "Button";

export { Button };
