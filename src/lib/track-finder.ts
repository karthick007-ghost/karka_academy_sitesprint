export interface TrackFinderAnswers {
  status: "school" | "college" | "graduate" | "working";
  interest: "apps" | "data-ai" | "design" | "media" | "marketing" | "business";
  codingComfort: "none" | "some" | "comfortable";
  goal: "first-job" | "switch-career" | "college-skills" | "explore";
}

export interface TrackRecommendation {
  trackSlug: string;
  trackTitle: string;
  reason: string;
  suggestedCourseSlugs: string[];
}

export function recommendTrack(answers: TrackFinderAnswers): TrackRecommendation {
  // Rule 1: School students always route to school foundation programs
  if (answers.status === "school") {
    return {
      trackSlug: "fullstack",
      trackTitle: "Python for Kids & Young Coders",
      reason: "Designed specifically for school students to build logical thinking and interactive games.",
      suggestedCourseSlugs: ["python-for-kids"],
    };
  }

  // Rule 2: Design interest
  if (answers.interest === "design") {
    return {
      trackSlug: "design",
      trackTitle: "UI/UX & Product Design",
      reason: "Perfect for visual thinkers who want to create modern digital interfaces and apps.",
      suggestedCourseSlugs: ["ui-ux-design", "graphic-designing"],
    };
  }

  // Rule 3: Digital Media interest
  if (answers.interest === "media") {
    return {
      trackSlug: "digital-media",
      trackTitle: "Digital Media & Motion",
      reason: "Focuses on high-impact video editing, visual storytelling, and post-production.",
      suggestedCourseSlugs: ["video-editing", "multimedia-animation"],
    };
  }

  // Rule 4: Marketing interest
  if (answers.interest === "marketing") {
    return {
      trackSlug: "content-marketing",
      trackTitle: "Growth & Digital Marketing",
      reason: "Combines technical SEO, data-driven campaign analytics, and AI copywriting.",
      suggestedCourseSlugs: ["digital-marketing", "seo-analyst"],
    };
  }

  // Rule 5: Business & Non-tech interest
  if (answers.interest === "business") {
    return {
      trackSlug: "business-nontech",
      trackTitle: "Business & Financial Operations",
      reason: "Build practical expertise in corporate financial accounting and Tally ERP systems.",
      suggestedCourseSlugs: ["hr-finance", "tally", "business-analyst"],
    };
  }

  // Rule 6: Data & AI interest
  if (answers.interest === "data-ai") {
    if (answers.codingComfort === "comfortable") {
      return {
        trackSlug: "gen-ai",
        trackTitle: "Generative AI & LLM Engineering",
        reason: "Leverages your programming foundations to build autonomous agents and RAG pipelines.",
        suggestedCourseSlugs: ["genai-foundations", "ai-data-science"],
      };
    }
    return {
      trackSlug: "data-ml",
      trackTitle: "Data Science & Analytics",
      reason: "Structured entry into data analysis, statistical modeling, and business intelligence.",
      suggestedCourseSlugs: ["ai-data-science", "data-analytics-ai"],
    };
  }

  // Default: Building Apps (Fullstack)
  if (answers.status === "college") {
    return {
      trackSlug: "fullstack",
      trackTitle: "Full-Stack Developer Internship",
      reason: "Gain live client project experience at Agile Tribers alongside your college degree.",
      suggestedCourseSlugs: ["fullstack-internship", "mern-fullstack"],
    };
  }

  return {
    trackSlug: "fullstack",
    trackTitle: "Full-Stack Development (PAP Eligible)",
    reason: "Our most in-demand placement track: master React, Node.js, and cloud deployments with ₹0 upfront fees.",
    suggestedCourseSlugs: ["mern-fullstack", "react-python-fullstack"],
  };
}
