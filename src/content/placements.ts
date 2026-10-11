import { Placement } from "./schema";

export interface VerifiedPlacementRecord extends Placement {
  id: string;
  packageRange: string;
}

export const gabrielVideoReview = {
  title: "Gabriel Samraj — Student Review & Placement Journey",
  studentName: "Gabriel Samraj",
  role: "Frontend Engineer",
  company: "Capecom Solutions",
  track: "Full-Stack Web Development",
  duration: "3:42 mins",
  summary:
    "Coming from Nagercoil with basic academic knowledge, Karka's practical lab drills and live client sprints prepared me for technical interviews. Within weeks of completing my track, I cracked multiple interview rounds at Capecom Solutions.",
  youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // Privacy-preserving fallback embed
};

export const verifiedPlacements: VerifiedPlacementRecord[] = [
  {
    id: "p1",
    name: "Gabriel Samraj",
    role: "Frontend Engineer",
    company: "Capecom Solutions",
    track: "Full-Stack Development",
    packageRange: "Verified Role",
    quote:
      "Karka's hands-on mentorship and modern curriculum gave me the practical confidence to design and build production-grade web interfaces that stood out to engineering managers.",
    videoUrl: "/videos/gabrielsamraj.mp4",
    verified: "site",
  },
  {
    id: "p2",
    name: "Alumni Batch 2024",
    role: "Full-Stack Engineer",
    company: "Amazon",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
  {
    id: "p3",
    name: "Alumni Batch 2024",
    role: "Systems Associate",
    company: "Tata Consultancy Services",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
  {
    id: "p4",
    name: "Alumni Batch 2024",
    role: "Software Engineer",
    company: "HCL Technologies",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
  {
    id: "p5",
    name: "Alumni Batch 2024",
    role: "Web Application Developer",
    company: "Matrimony.com",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
  {
    id: "p6",
    name: "Alumni Batch 2024",
    role: "Software Engineer",
    company: "Novac Technology Solutions",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
  {
    id: "p7",
    name: "Alumni Batch 2024",
    role: "Junior Developer",
    company: "Sodisys",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
  {
    id: "p8",
    name: "Alumni Batch 2024",
    role: "Full-Stack Developer",
    company: "Flow Global",
    track: "Full-Stack Development",
    packageRange: "Verified Placement",
    verified: "site",
  },
];

export const placements: Placement[] = verifiedPlacements;

export const placementPhases = [
  {
    step: 1,
    title: "1-on-1 Portfolio Architecture",
    description: "Build 3+ full-stack production repositories deployed live with verifiable code quality and documentation.",
  },
  {
    step: 2,
    title: "ATS-Optimized Profile Audit",
    description: "Align your resume, LinkedIn presence, and GitHub profile to pass algorithmic screening filters.",
  },
  {
    step: 3,
    title: "Technical Mock Interview Drills",
    description: "Real-time algorithmic challenges, system design walk-throughs, and live coding under senior mentor scrutiny.",
  },
];
