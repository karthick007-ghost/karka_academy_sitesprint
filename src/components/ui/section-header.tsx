import * as React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  badge?: string;
  tamilFlourish?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  nightMode?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  tamilFlourish,
  title,
  highlight,
  subtitle,
  align = "center",
  nightMode = false,
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 sm:mb-16 max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div className={cn("mb-4", isCenter ? "flex justify-center" : "")}>
          <Badge variant={nightMode ? "night" : "forest"}>{badge}</Badge>
        </div>
      )}

      <h2
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary"
      >
        {tamilFlourish && (
          <span
            lang="ta"
            className="mr-3 font-normal opacity-75 font-tamil text-2xl sm:text-3xl text-accent-text inline-block align-middle"
          >
            {tamilFlourish}
          </span>
        )}
        {title}{" "}
        {highlight && (
          <span className="text-accent-text">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed max-w-2xl text-muted",
            isCenter ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
