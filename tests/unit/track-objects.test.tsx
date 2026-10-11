import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import fs from "fs";
import path from "path";
import {
  TrackObjectDispatcher,
  normalizeTrackId,
  getTrackMaterial,
  getAccentMaterial,
  getGlassSlabMaterial,
  FullstackTrackObject,
  GenAiTrackObject,
  DataScienceTrackObject,
  DesignTrackObject,
  DigitalMediaTrackObject,
  MarketingTrackObject,
  CloudDevOpsTrackObject,
  BusinessTrackObject,
  TrackObjectCanvas,
} from "@/components/three/track-objects";

describe("Track Object ID Normalization", () => {
  it("normalizes all 8 canonical career track IDs correctly", () => {
    expect(normalizeTrackId("fullstack")).toBe("fullstack");
    expect(normalizeTrackId("gen-ai")).toBe("gen-ai");
    expect(normalizeTrackId("data-science")).toBe("data-science");
    expect(normalizeTrackId("design")).toBe("design");
    expect(normalizeTrackId("digital-media")).toBe("digital-media");
    expect(normalizeTrackId("marketing")).toBe("marketing");
    expect(normalizeTrackId("cloud-devops")).toBe("cloud-devops");
    expect(normalizeTrackId("business")).toBe("business");
  });

  it("normalizes route slugs and aliases into canonical IDs", () => {
    expect(normalizeTrackId("full-stack")).toBe("fullstack");
    expect(normalizeTrackId("genai")).toBe("gen-ai");
    expect(normalizeTrackId("generative-ai")).toBe("gen-ai");
    expect(normalizeTrackId("data-ml")).toBe("data-science");
    expect(normalizeTrackId("datascience")).toBe("data-science");
    expect(normalizeTrackId("ui-ux")).toBe("design");
    expect(normalizeTrackId("uiux")).toBe("design");
    expect(normalizeTrackId("media")).toBe("digital-media");
    expect(normalizeTrackId("content-marketing")).toBe("marketing");
    expect(normalizeTrackId("growth-marketing")).toBe("marketing");
    expect(normalizeTrackId("devops")).toBe("cloud-devops");
    expect(normalizeTrackId("cloud")).toBe("cloud-devops");
    expect(normalizeTrackId("business-nontech")).toBe("business");
    expect(normalizeTrackId("finance")).toBe("business");
  });
});

describe("Theme-Aware Material Properties", () => {
  it("configures frosted translucent materials in light mode", () => {
    const mat = getTrackMaterial("light", "#FF6A2B", false);
    expect(mat.roughness).toBeGreaterThanOrEqual(0.35);
    expect(mat.metalness).toBeLessThanOrEqual(0.25);
    expect(mat.transparent).toBe(true);
    expect(mat.opacity).toBeLessThan(1.0);
    expect(mat.emissiveIntensity).toBeLessThanOrEqual(0.4);
  });

  it("configures glowing specular materials in dark mode", () => {
    const mat = getTrackMaterial("dark", "#FF6A2B", false);
    expect(mat.roughness).toBeLessThan(0.3);
    expect(mat.metalness).toBeGreaterThanOrEqual(0.7);
    expect(mat.emissiveIntensity).toBeGreaterThanOrEqual(0.5);
  });

  it("boosts emissive intensity when hovered in dark mode", () => {
    const normal = getTrackMaterial("dark", "#FF6A2B", false);
    const hovered = getTrackMaterial("dark", "#FF6A2B", true);
    expect(hovered.emissiveIntensity).toBeGreaterThan(normal.emissiveIntensity);
  });

  it("generates glass slab base materials with appropriate opacity and roughness", () => {
    const lightGlass = getGlassSlabMaterial("light", "#FF6A2B", false);
    expect(lightGlass.transparent).toBe(true);
    expect(lightGlass.roughness).toBeLessThan(0.3);

    const darkGlass = getGlassSlabMaterial("dark", "#FF6A2B", false);
    expect(darkGlass.transparent).toBe(true);
    expect(darkGlass.metalness).toBeGreaterThanOrEqual(0.5);
  });

  it("generates accent materials for rings and data nodes", () => {
    const accent = getAccentMaterial("dark", "#7BE0AD", false);
    expect(accent.color).toBe("#7BE0AD");
    expect(accent.emissiveIntensity).toBeGreaterThan(0.5);
  });
});

describe("Procedural 3D Track Components Export", () => {
  it("exports all 8 individual track object components", () => {
    expect(FullstackTrackObject).toBeDefined();
    expect(GenAiTrackObject).toBeDefined();
    expect(DataScienceTrackObject).toBeDefined();
    expect(DesignTrackObject).toBeDefined();
    expect(DigitalMediaTrackObject).toBeDefined();
    expect(MarketingTrackObject).toBeDefined();
    expect(CloudDevOpsTrackObject).toBeDefined();
    expect(BusinessTrackObject).toBeDefined();
  });

  it("exports the unified TrackObjectDispatcher", () => {
    expect(TrackObjectDispatcher).toBeDefined();
  });
});

describe("Fallback Posters Verification", () => {
  const publicPostersDir = path.join(process.cwd(), "public", "posters");

  const requiredPosters = [
    "fullstack-light.svg",
    "fullstack-dark.svg",
    "gen-ai-light.svg",
    "gen-ai-dark.svg",
    "data-science-light.svg",
    "data-science-dark.svg",
    "data-ml-light.svg",
    "data-ml-dark.svg",
    "design-light.svg",
    "design-dark.svg",
    "digital-media-light.svg",
    "digital-media-dark.svg",
    "marketing-light.svg",
    "marketing-dark.svg",
    "content-marketing-light.svg",
    "content-marketing-dark.svg",
    "cloud-devops-light.svg",
    "cloud-devops-dark.svg",
    "business-light.svg",
    "business-dark.svg",
    "business-nontech-light.svg",
    "business-nontech-dark.svg",
  ];

  it("contains all 22 required SVG poster files in public/posters/", () => {
    expect(fs.existsSync(publicPostersDir)).toBe(true);

    for (const filename of requiredPosters) {
      const filePath = path.join(publicPostersDir, filename);
      expect(fs.existsSync(filePath), `Poster ${filename} must exist`).toBe(true);
      const stat = fs.statSync(filePath);
      expect(stat.size).toBeGreaterThan(200); // Must have valid SVG content
    }
  });

  it("each poster contains valid SVG tags with responsive viewBox and aria-label", () => {
    for (const filename of requiredPosters) {
      const filePath = path.join(publicPostersDir, filename);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("<svg");
      expect(content).toContain('viewBox="0 0 400 400"');
      expect(content).toContain('role="img"');
      expect(content).toContain("aria-label");
      expect(content).toContain("</svg>");
    }
  });
});

describe("TrackObjectCanvas Component", () => {
  it("renders the lightweight fallback poster when 3D capability is not available", () => {
    const { getByRole } = render(
      <TrackObjectCanvas trackId="fullstack" theme="dark" altText="Fullstack Poster" />
    );
    const img = getByRole("img");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("/posters/fullstack-dark.svg");
    expect(img.getAttribute("alt")).toBe("Fullstack Poster");
  });
});

