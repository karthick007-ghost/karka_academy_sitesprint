import { z } from "zod";

export const VerificationStatus = z.enum(["site", "confirmed", "todo"]);
export type VerificationStatus = z.infer<typeof VerificationStatus>;

export const CourseModuleSchema = z.object({
  step: z.number(),
  title: z.string(),
  topics: z.array(z.string()),
  verified: VerificationStatus,
});

export const CourseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  track: z.string(),
  audiences: z.array(z.string()),
  level: z.string(),
  duration: z.string().optional(),
  summary: z.string(),
  outcomes: z.array(z.string()),
  modules: z.array(CourseModuleSchema),
  tools: z.array(z.string()),
  internship: z.boolean(),
  verified: VerificationStatus,
});

export type Course = z.infer<typeof CourseSchema>;

export const TrackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  popular: z.boolean().default(false),
  verified: VerificationStatus,
});

export type Track = z.infer<typeof TrackSchema>;

export const PlacementSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  track: z.string(),
  quote: z.string().optional(),
  videoUrl: z.string().optional(),
  verified: VerificationStatus,
});

export type Placement = z.infer<typeof PlacementSchema>;

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  impact: z.string(),
  liveUrl: z.string().optional(),
  verified: VerificationStatus,
});

export type Project = z.infer<typeof ProjectSchema>;

export const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  verified: VerificationStatus,
});

export type Faq = z.infer<typeof FaqSchema>;
