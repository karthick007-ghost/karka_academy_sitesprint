import React from "react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/content/site";
import { ExternalLink, Trophy, Cpu, Users2, Sparkles, Terminal } from "lucide-react";

export function EcosystemSection() {
  const pillars = [
    {
      title: "Foundational Logic & Systems",
      desc: "Develop core algorithmic problem solving, clean architecture patterns, and structured data flow before touching frameworks.",
      icon: Terminal,
    },
    {
      title: "Production Full-Stack Engineering",
      desc: "Build modern resilient web & cloud applications with TypeScript, React, Next.js, and Node.js microservices.",
      icon: Cpu,
    },
    {
      title: "Applied Generative AI Integration",
      desc: "Move beyond ChatGPT prompts: architect LLM agents, RAG pipelines, and automated vector search workflows.",
      icon: Sparkles,
    },
    {
      title: "Commercial Delivery at Agile Tribers",
      desc: "Participate in daily standups, Git branch PR reviews, and client sprint deadlines alongside senior engineers.",
      icon: Users2,
    },
  ];

  return (
    <section className="py-20 bg-base relative overflow-hidden" id="ecosystem">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="mint">Beyond Traditional Classrooms</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Our 4 Pillars & Tech Ecosystem
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Karka Academy isn't just a coaching center — we build platforms, organize state-level hackathons with cash prizes, and operate live software labs.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl border border-ui/15 bg-elev p-6 flex flex-col justify-between shadow-sm hover:border-accent/40 transition-all duration-300"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-positive-text/15 border border-positive-text/25 text-positive-text mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-accent-text uppercase tracking-wider block mb-1">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialized Platforms Bento: Infini AI & Spike AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Infini AI Card */}
          <div className="rounded-3xl border border-accent/30 bg-elev p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                  AI Innovation Lab
                </span>
                <span className="inline-flex items-center gap-1 rounded-pill bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-bold text-accent-text">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>₹1,00,000 Hackathon Prize</span>
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                Infini AI Platform
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                Karka Academy's proprietary AI sandbox where students build, benchmark, and deploy custom LLM applications. Host of Tamil Nadu's premier ₹1,00,000 AI Hackathon for college student innovators.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-ui/15 flex items-center justify-between relative z-10">
              <span className="text-xs text-muted font-mono">infini.karka.academy</span>
              <a
                href={siteConfig.platforms.infini}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-accent-text hover:underline"
              >
                <span>Visit Infini AI</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Spike AI Card */}
          <div className="rounded-3xl border border-positive-text/30 bg-elev p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-positive-text">
                  Production Studio
                </span>
                <span className="inline-flex items-center gap-1 rounded-pill bg-positive-text/15 border border-positive-text/30 px-3 py-1 text-xs font-bold text-positive-text">
                  <span>Agile Tribers Partner</span>
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                Spike AI & Agile Tribers
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                Our in-house commercial software lab where students spend up to 10 hours per week developing production SaaS code. Deliver commercial value before graduation.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-ui/15 flex items-center justify-between relative z-10">
              <span className="text-xs text-muted font-mono">spike.karka.academy</span>
              <a
                href={siteConfig.platforms.spike}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-positive-text hover:underline"
              >
                <span>Visit Spike AI</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcosystemSection;
