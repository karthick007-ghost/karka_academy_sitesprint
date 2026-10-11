import { Project } from "./schema";

export interface ClientProject extends Project {
  id: string;
  client: string;
  techStack: string[];
  internDeliverables: string[];
}

export const realClientProjects: ClientProject[] = [
  {
    id: "flow-fintech-engine",
    slug: "fintech-micro-lending-portal",
    client: "Flow Global (Fintech)",
    title: "Fintech Micro-Lending Origination Portal",
    description:
      "Cloud-native loan origination and risk assessment platform designed for emerging market micro-finance institutions.",
    impact: "Reduced underwriting application latency by 45% through automated credit score parsing algorithms.",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    internDeliverables: [
      "Built multi-step loan KYC verification flow with real-time field validation",
      "Created transactional audit log microservice with PostgreSQL indexes",
      "Designed responsive loan officer approval dashboard with accessible UI tables",
    ],
    verified: "site",
  },
  {
    id: "karka-lms-portal",
    slug: "genai-customer-ops-copilot",
    client: "Karka Academy Platform",
    title: "Student LMS & Automated Code Evaluator",
    description:
      "Internal learning portal supporting live assignment submissions, automated Git webhook checking, and progress tracking.",
    impact: "Automated daily assignment grading for 100+ active learners with instant test case feedback.",
    techStack: ["React", "Express.js", "Python Runner", "Docker", "MongoDB"],
    stack: ["React", "Express.js", "Python Runner", "Docker", "MongoDB"],
    internDeliverables: [
      "Implemented secure sandboxed code execution environment in Docker",
      "Built real-time websocket leaderboard and student attendance tracker",
      "Integrated GitHub OAuth and automatic commit verification hooks",
    ],
    verified: "site",
  },
  {
    id: "retail-pos-analytics",
    slug: "iot-cold-chain-monitoring",
    client: "Regional Retail Network",
    title: "Multi-Store Retail POS & Inventory Analytics",
    description:
      "Real-time billing, inventory reconciliation, and sales trend analytics for multi-location regional merchants.",
    impact: "Synchronized offline POS sales across 5 regional stores with zero inventory drift.",
    techStack: ["React", "Node.js", "SQLite Local", "PostgreSQL Cloud", "Chart.js"],
    stack: ["React", "Node.js", "SQLite Local", "PostgreSQL Cloud", "Chart.js"],
    internDeliverables: [
      "Engineered offline-first IndexedDB cache with auto cloud synchronization",
      "Built GST-compliant thermal receipt generation service in browser",
      "Created executive revenue dashboard with period-over-period sales trends",
    ],
    verified: "site",
  },
];

export const projects: Project[] = realClientProjects;
