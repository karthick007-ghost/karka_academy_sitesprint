import { Project } from "./schema";

export const projects: Project[] = [
  {
    slug: "fintech-micro-lending-portal",
    title: "Micro-Lending Origination Portal",
    description: "Cloud-native loan origination and risk assessment platform designed for emerging market micro-finance institutions.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    impact: "Reduced underwriting application latency by 45% through automated credit score parsing algorithms.",
    verified: "site",
  },
  {
    slug: "genai-customer-ops-copilot",
    title: "Customer Support Retrieval Copilot",
    description: "RAG-powered conversational assistant querying internal technical documentation for support ticket triage.",
    stack: ["Python", "FastAPI", "LangChain", "OpenAI API", "Qdrant Vector DB"],
    impact: "Automated resolution of 60% of Tier-1 support inquiries with strict hallucination guardrails.",
    verified: "site",
  },
  {
    slug: "iot-cold-chain-monitoring",
    title: "Cold Chain Telemetry Dashboard",
    description: "Real-time sensor telemetry processing engine monitoring temperature, humidity, and location for transit logistics.",
    stack: ["React", "Express.js", "MongoDB", "MQTT", "Docker"],
    impact: "Alerted logistics dispatchers to excursion threshold violations in sub-second latency.",
    verified: "site",
  },
  {
    slug: "ecommerce-inventory-orchestrator",
    title: "Multi-Warehouse Inventory Orchestrator",
    description: "High-concurrency inventory reconciliation engine synchronizing physical stock counts with digital storefronts.",
    stack: ["React", "Java Spring Boot", "PostgreSQL", "Redis", "Kafka"],
    impact: "Eliminated double-order overselling across 5 fulfillment distribution centers.",
    verified: "site",
  },
];
