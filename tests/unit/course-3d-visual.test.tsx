import React from "react";
import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Course3DVisual } from "@/components/sections/courses/course-3d-visual";

describe("Course3DVisual Component", () => {
  const tracks = [
    "fullstack",
    "data-ml",
    "design",
    "business-nontech",
    "gen-ai",
    "digital-media",
    "content-marketing",
    "cloud-devops",
  ];

  it("renders rich 3D motion visuals for all 8 curriculum tracks", () => {
    tracks.forEach((track) => {
      const { container } = render(
        <Course3DVisual track={track} slug={`test-${track}`} title={`Test ${track}`} />
      );
      expect(container.firstChild).toBeDefined();
      expect(container.querySelector("svg")).toBeTruthy();
    });
  });

  it("applies aria-hidden for accessibility", () => {
    const { container } = render(
      <Course3DVisual track="fullstack" slug="mern-fullstack" title="MERN Full Stack" />
    );
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("handles mouse hover and leave perspective tilt without errors", () => {
    const { container } = render(
      <Course3DVisual track="gen-ai" slug="genai-mastery" title="GenAI Mastery" />
    );
    const stage = container.firstChild as HTMLElement;

    // Simulate mouse move
    fireEvent.mouseMove(stage, { clientX: 100, clientY: 80 });
    // Simulate mouse leave
    fireEvent.mouseLeave(stage);
  });
});
