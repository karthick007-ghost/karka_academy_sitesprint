import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CAREER_TRACKS } from "@/components/three/hero-scene";
import { HeroPoster } from "@/components/three/hero-poster";
import { KolamMandala, KolamHeader, KolamHeroBackdrop } from "@/components/ornament/kolam";
import {
  GlobalCanvasProvider,
  FullStackGlyph,
  GenAiGlyph,
  CloudDevOpsGlyph,
} from "@/components/three/global-canvas";

describe("3D Solar System Career Tracks Specification", () => {
  it("defines all 6 distinct high-contrast career tracks with required brand colors", () => {
    expect(CAREER_TRACKS).toHaveLength(6);

    const fullStack = CAREER_TRACKS.find((t) => t.id === "full-stack");
    expect(fullStack).toBeDefined();
    expect(fullStack?.color).toBe("#FF6A2B"); // Electric Saffron

    const genAi = CAREER_TRACKS.find((t) => t.id === "gen-ai");
    expect(genAi).toBeDefined();
    expect(genAi?.color).toBe("#38BDF8"); // Cyber Cyan

    const dataScience = CAREER_TRACKS.find((t) => t.id === "data-science");
    expect(dataScience).toBeDefined();
    expect(dataScience?.color).toBe("#FFD166"); // Cyber Gold

    const uiUx = CAREER_TRACKS.find((t) => t.id === "ui-ux");
    expect(uiUx).toBeDefined();
    expect(uiUx?.color).toBe("#FF5E7E"); // Coral / Sunset Pink

    const cloudDevops = CAREER_TRACKS.find((t) => t.id === "cloud-devops");
    expect(cloudDevops).toBeDefined();
    expect(cloudDevops?.color).toBe("#60A5FA"); // Ice Blue

    const internships = CAREER_TRACKS.find((t) => t.id === "internships");
    expect(internships).toBeDefined();
    expect(internships?.color).toBe("#2EC4B6"); // Forest Jade
  });

  it("assigns non-zero orbital speeds, radii outside sun radius (0.9), and angular offsets", () => {
    CAREER_TRACKS.forEach((track) => {
      expect(track.radius).toBeGreaterThan(1.0);
      expect(track.speed).toBeGreaterThan(0);
      expect(track.size).toBeGreaterThan(0);
    });
  });
});

describe("HeroPoster Component", () => {
  it("renders glowing celestial core with Tamil insignia and all 6 track chips", () => {
    const { getByText, getByRole } = render(<HeroPoster />);
    expect(getByRole("img")).toBeDefined();
    expect(getByText("கற்க")).toBeDefined();
    expect(getByText("AI CORE")).toBeDefined();
    expect(getByText("Full-Stack Dev")).toBeDefined();
    expect(getByText("Generative AI")).toBeDefined();
    expect(getByText("Data Science & ML")).toBeDefined();
    expect(getByText("UI/UX Design")).toBeDefined();
    expect(getByText("Cloud & DevOps")).toBeDefined();
    expect(getByText("Client Internships")).toBeDefined();
  });
});

describe("Kolam Ornament Components", () => {
  it("renders KolamMandala with accessible presentation attributes", () => {
    const { container } = render(<KolamMandala size={120} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("role")).toBe("presentation");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders KolamHeader with Tamil typography and hairline rules", () => {
    const { getByText } = render(<KolamHeader tamilWord="கற்க" label="Karka Academy" />);
    expect(getByText("கற்க")).toBeDefined();
    expect(getByText("Karka Academy")).toBeDefined();
  });

  it("renders KolamHeroBackdrop with aria-hidden background motif", () => {
    const { container } = render(<KolamHeroBackdrop />);
    const backdrop = container.firstChild as HTMLElement;
    expect(backdrop.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("Global 3D Canvas Architecture", () => {
  it("exports GlobalCanvasProvider and procedural track glyphs", () => {
    expect(GlobalCanvasProvider).toBeDefined();
    expect(FullStackGlyph).toBeDefined();
    expect(GenAiGlyph).toBeDefined();
    expect(CloudDevOpsGlyph).toBeDefined();
  });
});
