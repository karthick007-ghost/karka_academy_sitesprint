import { describe, it, expect } from "vitest";
import { recommendTrack } from "@/lib/track-finder";

describe("recommendTrack", () => {
  it("routes school students to Python for Kids track regardless of other choices", () => {
    const result = recommendTrack({
      status: "school",
      interest: "apps",
      codingComfort: "none",
      goal: "explore",
    });

    expect(result.trackSlug).toBe("fullstack");
    expect(result.trackTitle).toBe("Python for Kids & Young Coders");
    expect(result.suggestedCourseSlugs).toContain("python-for-kids");
  });

  it("routes design interest to UI/UX track", () => {
    const result = recommendTrack({
      status: "college",
      interest: "design",
      codingComfort: "none",
      goal: "first-job",
    });

    expect(result.trackSlug).toBe("design");
    expect(result.trackTitle).toBe("UI/UX & Product Design");
    expect(result.suggestedCourseSlugs).toContain("ui-ux-design");
  });

  it("routes media interest to Digital Media track", () => {
    const result = recommendTrack({
      status: "graduate",
      interest: "media",
      codingComfort: "none",
      goal: "switch-career",
    });

    expect(result.trackSlug).toBe("digital-media");
    expect(result.trackTitle).toBe("Digital Media & Motion");
    expect(result.suggestedCourseSlugs).toContain("video-editing");
  });

  it("routes marketing interest to Growth & Digital Marketing track", () => {
    const result = recommendTrack({
      status: "working",
      interest: "marketing",
      codingComfort: "none",
      goal: "switch-career",
    });

    expect(result.trackSlug).toBe("content-marketing");
    expect(result.trackTitle).toBe("Growth & Digital Marketing");
    expect(result.suggestedCourseSlugs).toContain("digital-marketing");
  });

  it("routes business interest to Business & Non-tech track", () => {
    const result = recommendTrack({
      status: "graduate",
      interest: "business",
      codingComfort: "none",
      goal: "first-job",
    });

    expect(result.trackSlug).toBe("business-nontech");
    expect(result.suggestedCourseSlugs).toContain("tally");
  });

  it("routes data-ai with comfortable coding to Generative AI & LLM Engineering", () => {
    const result = recommendTrack({
      status: "college",
      interest: "data-ai",
      codingComfort: "comfortable",
      goal: "first-job",
    });

    expect(result.trackSlug).toBe("gen-ai");
    expect(result.trackTitle).toBe("Generative AI & LLM Engineering");
    expect(result.suggestedCourseSlugs).toContain("genai-foundations");
  });

  it("routes data-ai with none or some coding to Data Science & Analytics", () => {
    const result = recommendTrack({
      status: "graduate",
      interest: "data-ai",
      codingComfort: "some",
      goal: "first-job",
    });

    expect(result.trackSlug).toBe("data-ml");
    expect(result.trackTitle).toBe("Data Science & Analytics");
    expect(result.suggestedCourseSlugs).toContain("ai-data-science");
  });

  it("routes college students wanting apps to Full-Stack Developer Internship", () => {
    const result = recommendTrack({
      status: "college",
      interest: "apps",
      codingComfort: "some",
      goal: "college-skills",
    });

    expect(result.trackSlug).toBe("fullstack");
    expect(result.trackTitle).toBe("Full-Stack Developer Internship");
    expect(result.suggestedCourseSlugs).toContain("fullstack-internship");
  });

  it("routes graduate job seekers wanting apps to PAP Eligible Full-Stack track", () => {
    const result = recommendTrack({
      status: "graduate",
      interest: "apps",
      codingComfort: "none",
      goal: "first-job",
    });

    expect(result.trackSlug).toBe("fullstack");
    expect(result.trackTitle).toContain("PAP Eligible");
    expect(result.suggestedCourseSlugs).toContain("mern-fullstack");
  });
});
