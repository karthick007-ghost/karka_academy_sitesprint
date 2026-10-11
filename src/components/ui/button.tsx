import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "night" | "saffronOutline";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      // Primary: Saffron fill + Ink text (Contrast 6.27:1 - WCAG AA compliant)
      primary:
        "bg-saffron text-ink font-bold shadow-subtle hover:bg-saffron/90 active:scale-[0.98] transition-all duration-200",
      secondary:
        "bg-forest text-paper font-semibold hover:bg-forest/90 active:scale-[0.98] transition-all duration-200",
      outline:
        "border border-forest/30 text-forest bg-transparent hover:bg-forest/5 active:scale-[0.98] transition-all duration-200",
      saffronOutline:
        "border border-saffron/40 text-saffron-ink bg-transparent hover:bg-saffron/10 active:scale-[0.98] transition-all duration-200",
      ghost:
        "text-ink hover:bg-ink/5 active:bg-ink/10 transition-colors duration-150",
      night:
        "bg-mint text-night font-bold shadow-subtle hover:bg-mint/90 active:scale-[0.98] transition-all duration-200",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-sm",
      md: "min-h-[44px] px-5 py-2.5 text-sm rounded-md", // 44px min touch target
      lg: "min-h-[48px] px-7 py-3 text-base rounded-md",
      icon: "h-11 w-11 rounded-md flex items-center justify-center",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-center select-none font-medium outline-none",
          "focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
