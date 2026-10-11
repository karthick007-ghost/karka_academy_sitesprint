import { z } from "zod";

export const ALLOWED_PROGRAMS = [
  "general-inquiry",
  "mern-fullstack",
  "ai-data-science",
  "ui-ux-design",
  "genai-foundations",
  "fullstack-internship",
  "python-for-kids",
  "cloud-devops",
  "digital-marketing",
] as const;

export const ALLOWED_AUDIENCES = [
  "school-students",
  "college-students",
  "graduates",
  "professionals",
] as const;

// Strict Indian phone validation: 10 digits starting with 6-9 (accepts +91, 0 prefix, spaces/dashes)
export const phoneRegex = /^(?:(?:\+|0{0,2})91\s*[-]?\s*|[0]?)?[6789]\d{9}$/;

// Name allows unicode letters & combining marks (including Tamil), spaces, apostrophes, dots, and hyphens
export const nameRegex = /^[\p{L}\p{M}\s.'-]{2,60}$/u;

export const LeadSubmissionSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name cannot exceed 60 characters")
      .regex(nameRegex, "Name contains invalid characters"),
    phone: z
      .string()
      .regex(phoneRegex, "Phone must be a valid 10-digit Indian mobile number starting with 6–9"),
    email: z.string().email("Invalid email address").max(254).optional().or(z.literal("")),
    program: z.string().default("general-inquiry"),
    audience: z.enum(ALLOWED_AUDIENCES).optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "You must consent to be contacted by Karka Academy" }),
    }),
    consentVersion: z.string().default("v1.0-dpdp2023"),
    hp: z.string().default(""), // Honeypot field captured for bot trap
    ts: z.number().optional(), // Time trap: must be between 2s and 2h
    turnstileToken: z.string().optional(),
    trackSource: z.string().optional(),
  })
  .strict();

export type LeadSubmission = z.infer<typeof LeadSubmissionSchema>;
