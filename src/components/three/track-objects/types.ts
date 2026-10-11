/**
 * Track Object Types & Normalization
 * 3D Procedural Career Track Geometries
 */

export type CanonicalTrackId =
  | "fullstack"
  | "gen-ai"
  | "data-science"
  | "design"
  | "digital-media"
  | "marketing"
  | "cloud-devops"
  | "business";

export type TrackId =
  | CanonicalTrackId
  | "data-ml"
  | "datascience"
  | "ui-ux"
  | "uiux"
  | "media"
  | "content-marketing"
  | "growth-marketing"
  | "devops"
  | "cloud"
  | "business-nontech"
  | "finance"
  | (string & {});

export interface TrackObjectProps {
  /** Explicit theme override; if omitted, automatically tracks DOM theme */
  theme?: "light" | "dark";
  /** Emphasized visual glow and faster interactive rotation on card hover */
  isHovered?: boolean;
  /** When true or when tab is hidden, halts rotation updates */
  paused?: boolean;
  /** Scale multiplier (defaults to 1) */
  scale?: number;
  /** Primary brand color override */
  color?: string;
  /** Secondary accent color override */
  secondaryColor?: string;
  /** Additional group positioning */
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Normalizes any incoming route slug or track name to one of the 8 canonical track IDs
 */
export function normalizeTrackId(id: string): CanonicalTrackId {
  const clean = id.toLowerCase().trim().replace(/_/g, "-");

  if (clean.includes("full") || clean.includes("stack") || clean.includes("fsd")) {
    return "fullstack";
  }
  if (clean.includes("gen") || clean.includes("ai") || clean.includes("llm")) {
    return "gen-ai";
  }
  if (clean.includes("data") || clean.includes("ml") || clean.includes("science") || clean.includes("analytics")) {
    return "data-science";
  }
  if (clean.includes("design") || clean.includes("ui") || clean.includes("ux")) {
    return "design";
  }
  if (clean.includes("media") || clean.includes("video") || clean.includes("motion")) {
    return "digital-media";
  }
  if (clean.includes("market") || clean.includes("content") || clean.includes("growth") || clean.includes("seo")) {
    return "marketing";
  }
  if (clean.includes("cloud") || clean.includes("devops") || clean.includes("aws") || clean.includes("docker")) {
    return "cloud-devops";
  }
  if (clean.includes("business") || clean.includes("finance") || clean.includes("account") || clean.includes("nontech")) {
    return "business";
  }

  // Fallback default
  return "fullstack";
}
