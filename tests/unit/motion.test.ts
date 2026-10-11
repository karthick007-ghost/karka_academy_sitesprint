import { describe, it, expect } from "vitest";
import {
  MOTION_DURATIONS,
  MOTION_MS,
  MOTION_EASINGS,
  MOTION_SPRINGS,
  MOTION_TRANSITIONS,
  getAccessibleTransition,
  getAccessibleVariants,
} from "@/lib/motion";

describe("Motion Tokens per docs/11 §4", () => {
  it("enforces micro duration within 120ms - 180ms", () => {
    expect(MOTION_MS.micro).toBeGreaterThanOrEqual(120);
    expect(MOTION_MS.micro).toBeLessThanOrEqual(180);
    expect(MOTION_DURATIONS.micro).toBeCloseTo(0.15, 2);
  });

  it("enforces UI duration within 200ms - 280ms", () => {
    expect(MOTION_MS.ui).toBeGreaterThanOrEqual(200);
    expect(MOTION_MS.ui).toBeLessThanOrEqual(280);
    expect(MOTION_DURATIONS.ui).toBeCloseTo(0.24, 2);
  });

  it("enforces reveal duration within 450ms - 700ms", () => {
    expect(MOTION_MS.reveal).toBeGreaterThanOrEqual(450);
    expect(MOTION_MS.reveal).toBeLessThanOrEqual(700);
    expect(MOTION_DURATIONS.reveal).toBeCloseTo(0.55, 2);
  });

  it("enforces page transition duration within 350ms - 450ms", () => {
    expect(MOTION_MS.page).toBeGreaterThanOrEqual(350);
    expect(MOTION_MS.page).toBeLessThanOrEqual(450);
    expect(MOTION_DURATIONS.page).toBeCloseTo(0.40, 2);
  });

  it("enforces stagger delay <= 60ms", () => {
    expect(MOTION_MS.stagger).toBeLessThanOrEqual(60);
    expect(MOTION_DURATIONS.stagger).toBeLessThanOrEqual(0.06);
  });

  it("provides standard out cubic-bezier easing", () => {
    expect(MOTION_EASINGS.out).toEqual([0.2, 0.7, 0.2, 1]);
    expect(MOTION_EASINGS.outCubic).toBe("cubic-bezier(0.2, 0.7, 0.2, 1)");
  });

  it("provides spring physics per docs/11 §4 { stiffness: 300, damping: 30 }", () => {
    expect(MOTION_SPRINGS.default).toEqual({
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
    expect(MOTION_SPRINGS.layout).toEqual({
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  });
});

describe("Reduced Motion Helpers", () => {
  it("returns base transition when reduced motion is false", () => {
    const base = MOTION_TRANSITIONS.ui;
    const result = getAccessibleTransition(base, { reducedMotion: false });
    expect(result).toBe(base);
  });

  it("returns instant transition when reduced motion is true by default", () => {
    const base = MOTION_TRANSITIONS.ui;
    const result = getAccessibleTransition(base, { reducedMotion: true });
    expect(result).toEqual(MOTION_TRANSITIONS.instant);
    expect(result).toHaveProperty("duration", 0);
  });

  it("returns fade-only transition when fallback is set to fade", () => {
    const base = MOTION_TRANSITIONS.ui;
    const result = getAccessibleTransition(base, {
      reducedMotion: true,
      fallback: "fade",
    });
    expect(result).toEqual(MOTION_TRANSITIONS.fadeOnly);
  });

  it("strips positional transforms in getAccessibleVariants", () => {
    const testVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      visible: { opacity: 1, y: 0, scale: 1 },
    };

    const accessible = getAccessibleVariants(testVariants, true);
    expect(accessible.hidden).toEqual({
      opacity: 0,
      transition: MOTION_TRANSITIONS.instant,
    });
    expect(accessible.visible).toEqual({
      opacity: 1,
      transition: MOTION_TRANSITIONS.instant,
    });
  });
});
