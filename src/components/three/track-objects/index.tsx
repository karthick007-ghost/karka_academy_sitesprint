"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { useCapability } from "@/lib/capability";
import { TrackObjectProps, TrackId, normalizeTrackId } from "./types";
import { FullstackTrackObject } from "./fullstack";
import { GenAiTrackObject } from "./gen-ai";
import { DataScienceTrackObject } from "./data-science";
import { DesignTrackObject } from "./design";
import { DigitalMediaTrackObject } from "./digital-media";
import { MarketingTrackObject } from "./marketing";
import { CloudDevOpsTrackObject } from "./cloud-devops";
import { BusinessTrackObject } from "./business";
import { useResolvedTheme } from "./materials";

export * from "./types";
export * from "./materials";
export * from "./use-track-animation";
export * from "./fullstack";
export * from "./gen-ai";
export * from "./data-science";
export * from "./design";
export * from "./digital-media";
export * from "./marketing";
export * from "./cloud-devops";
export * from "./business";

export interface TrackObjectDispatcherProps extends TrackObjectProps {
  trackId: TrackId;
}

/**
 * Unified Track Object Dispatcher:
 * Takes a `trackId` (normalized across all routing slugs) and renders the
 * corresponding procedural 3D Three.js geometry with gentle floating animation and
 * theme-aware materials (frosted translucent in light mode, glowing specular in dark mode).
 */
export function TrackObjectDispatcher({
  trackId,
  theme,
  isHovered = false,
  paused = false,
  scale = 1,
  color,
  secondaryColor,
  position,
  rotation,
}: TrackObjectDispatcherProps) {
  const canonicalId = normalizeTrackId(trackId);

  const sharedProps: TrackObjectProps = {
    theme,
    isHovered,
    paused,
    scale,
    color,
    secondaryColor,
    position,
    rotation,
  };

  switch (canonicalId) {
    case "fullstack":
      return <FullstackTrackObject {...sharedProps} />;
    case "gen-ai":
      return <GenAiTrackObject {...sharedProps} />;
    case "data-science":
      return <DataScienceTrackObject {...sharedProps} />;
    case "design":
      return <DesignTrackObject {...sharedProps} />;
    case "digital-media":
      return <DigitalMediaTrackObject {...sharedProps} />;
    case "marketing":
      return <MarketingTrackObject {...sharedProps} />;
    case "cloud-devops":
      return <CloudDevOpsTrackObject {...sharedProps} />;
    case "business":
      return <BusinessTrackObject {...sharedProps} />;
    default:
      return <FullstackTrackObject {...sharedProps} />;
  }
}

export interface TrackObjectCanvasProps {
  trackId: TrackId;
  theme?: "light" | "dark";
  isHovered?: boolean;
  paused?: boolean;
  className?: string;
  altText?: string;
}

/**
 * Helper component that renders an isolated, high-performance WebGL Canvas
 * for a track object with automatic device-capability checking and fallback poster.
 */
export function TrackObjectCanvas({
  trackId,
  theme: propTheme,
  isHovered = false,
  paused = false,
  className = "w-full h-full",
  altText,
}: TrackObjectCanvasProps) {
  const { canRender3D, isReady } = useCapability();
  const theme = useResolvedTheme(propTheme);
  const canonicalId = normalizeTrackId(trackId);

  const posterSrc = `/posters/${canonicalId}-${theme}.svg`;

  // Fallback poster when 3D is not ready, disabled, or low-end device
  if (!isReady || !canRender3D) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt={altText ?? `${trackId} track visual representation`}
          className="h-full w-full object-contain p-2"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="pointer-events-none"
      >
        <TrackObjectDispatcher
          trackId={trackId}
          theme={theme}
          isHovered={isHovered}
          paused={paused}
        />
      </Canvas>
    </div>
  );
}

export default TrackObjectDispatcher;
