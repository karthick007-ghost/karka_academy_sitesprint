import { Track } from "./schema";

export interface CareerTrack extends Track {
  duration: string;
  isPayAfterPlacement: boolean;
  skills: string[];
  outcomes: string[];
  courseCount: number;
}

export const careerTracks: CareerTrack[] = [
  {
    slug: "fullstack",
    title: "Full-Stack Development",
    description: "Build robust, scalable web products using modern React, Node.js, Python, or Java backends.",
    duration: "16 Weeks (30 hrs/wk)",
    isPayAfterPlacement: true,
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "REST & GraphQL"],
    outcomes: [
      "Ship commercial fullstack applications with TypeScript",
      "Deploy scalable cloud microservices and databases",
      "Deliver commercial client sprints at Agile Tribers",
      "Eligible for ₹0 upfront tuition Pay After Placement",
    ],
    courseCount: 11,
    popular: true,
    verified: "site",
  },
  {
    slug: "gen-ai",
    title: "Generative AI & LLMs",
    description: "Master modern AI workflows, prompt engineering, agentic systems, and LLM fine-tuning.",
    duration: "12 Weeks",
    isPayAfterPlacement: false,
    skills: ["Python", "FastAPI", "Prompt Engineering", "LangChain", "Vector DBs", "RAG Pipelines", "OpenAI / Claude APIs"],
    outcomes: [
      "Build autonomous multi-agent software pipelines",
      "Implement custom enterprise RAG on proprietary documents",
      "Fine-tune and benchmark open-source models",
      "Deploy scalable AI applications to cloud endpoints",
    ],
    courseCount: 4,
    popular: true,
    verified: "site",
  },
  {
    slug: "data-ml",
    title: "Data Science & Analytics",
    description: "Transform complex data into business intelligence with Python, SQL, PowerBI, and ML algorithms.",
    duration: "12 Weeks",
    isPayAfterPlacement: false,
    skills: ["Python", "SQL", "Pandas", "Scikit-Learn", "PowerBI", "Tableau", "Statistics", "Data Pipelines"],
    outcomes: [
      "Clean and analyze multi-million row datasets",
      "Build predictive machine learning pipelines",
      "Deliver interactive executive BI dashboards",
      "Automate data extraction, transformation, and load pipelines",
    ],
    courseCount: 5,
    popular: false,
    verified: "site",
  },
  {
    slug: "design",
    title: "UI/UX & Product Design",
    description: "Craft high-fidelity interfaces, conduct usability research, and design intuitive software systems.",
    duration: "10 Weeks",
    isPayAfterPlacement: false,
    skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Prototyping", "Design Tokens", "Usability Testing"],
    outcomes: [
      "Build responsive high-fidelity design systems in Figma",
      "Run user journey mapping and accessibility audits",
      "Deliver developer-ready component handoffs with tokens",
      "Master interactive micro-animations and user psychology",
    ],
    courseCount: 4,
    popular: false,
    verified: "site",
  },
  {
    slug: "digital-media",
    title: "Digital Media & Motion",
    description: "Professional video editing, dynamic motion graphics, and engaging multimedia storytelling.",
    duration: "8 Weeks",
    isPayAfterPlacement: false,
    skills: ["Premiere Pro", "After Effects", "Color Grading", "Audio Mixing", "Motion Graphics", "Social Storytelling"],
    outcomes: [
      "Create high-retention commercial video edits and reels",
      "Produce broadcast-quality YouTube and marketing content",
      "Design dynamic title animations and motion packages",
      "Master professional Lumetri color grading workflows",
    ],
    courseCount: 4,
    popular: false,
    verified: "site",
  },
  {
    slug: "content-marketing",
    title: "Growth & Digital Marketing",
    description: "Performance marketing, technical SEO analysis, AI copywriting, and audience acquisition.",
    duration: "8 Weeks",
    isPayAfterPlacement: false,
    skills: ["Technical SEO", "Google Analytics 4", "Meta Ads", "AI Copywriting", "Keyword Research", "Conversion Optimization"],
    outcomes: [
      "Drive organic search rankings to Page 1 for target keywords",
      "Run data-backed high-ROI advertising campaigns",
      "Build conversion funnels with AI-assisted copywriting",
      "Perform technical website audit and CRO analysis",
    ],
    courseCount: 4,
    popular: false,
    verified: "site",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    description: "Deploy and manage resilient cloud infrastructure using Docker, CI/CD pipelines, and AWS.",
    duration: "10 Weeks",
    isPayAfterPlacement: false,
    skills: ["Linux", "Docker", "Kubernetes", "AWS Cloud", "CI/CD Actions", "Terraform", "NGINX"],
    outcomes: [
      "Architect high-availability cloud infrastructure on AWS",
      "Automate zero-downtime deployment pipelines with GitHub Actions",
      "Containerize and orchestrate enterprise microservices",
      "Implement production monitoring and error logging",
    ],
    courseCount: 3,
    popular: false,
    verified: "site",
  },
  {
    slug: "business-nontech",
    title: "Business & Financial Operations",
    description: "Practical corporate accounting, modern Tally ERP, and business analysis essentials.",
    duration: "8 Weeks",
    isPayAfterPlacement: false,
    skills: ["Tally Prime", "GST Compliance", "Financial Statements", "Corporate Accounting", "Advanced Excel"],
    outcomes: [
      "Manage end-to-end corporate accounts and ledgers",
      "Execute automated GST, TDS, and payroll tax returns",
      "Prepare audit-ready balance sheets and P&L statements",
      "Build dynamic financial forecasting spreadsheets",
    ],
    courseCount: 2,
    popular: false,
    verified: "site",
  },
];

export const tracks: Track[] = careerTracks;
