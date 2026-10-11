import React from "react";
import type { Metadata } from "next";
import { realClientProjects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import {
  Code2,
  GitBranch,
  Building2,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Live Client Internships at Agile Tribers",
  description:
    "Gain real software engineering experience in Nagercoil. Build production features for commercial clients with senior mentor code reviews.",
};

export default function InternshipsPage() {
  const sprintSteps = [
    {
      step: "01",
      title: "Sprint Planning & Estimation",
      desc: "Receive real business feature specs from client stakeholders. Break down user stories into verifiable engineering tasks with story points.",
    },
    {
      step: "02",
      title: "Git Feature Branching",
      desc: "Implement modern Git trunk-based or GitFlow branch workflows. Write modular TypeScript code with strict linting and unit tests.",
    },
    {
      step: "03",
      title: "Peer & Senior Mentor Code Review",
      desc: "No code merges without review. Senior engineers review your Pull Requests for security, performance, and clean architecture.",
    },
    {
      step: "04",
      title: "Automated CI/CD & Cloud Deploy",
      desc: "Push code through automated GitHub Actions pipelines, Docker container builds, and staging environment verification.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-night-2 p-8 sm:p-12 lg:p-16 shadow-glass text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="mint">Agile Tribers Production Studio</Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-night-text leading-tight">
            Graduate with <span className="text-saffron">Commercial Client Code</span>.
          </h1>

          <p className="text-base sm:text-lg text-night-muted leading-relaxed max-w-2xl mx-auto">
            Hiring managers skip resumes that only show generic YouTube clones. At Karka Academy, every student delivers real software for live products through our affiliated development studio, Agile Tribers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Real Pull Requests</span>
              <div className="text-2xl font-bold text-night-text mt-1">Live GitHub PRs</div>
              <span className="text-[11px] text-night-muted">Audited by senior leads</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Deployment</span>
              <div className="text-2xl font-bold text-mint mt-1">Production Cloud</div>
              <span className="text-[11px] text-night-muted">Dockerized microservices</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Credential</span>
              <div className="text-2xl font-bold text-saffron mt-1">Experience Letter</div>
              <span className="text-[11px] text-night-muted">Agile Tribers Certificate</span>
            </div>
          </div>
        </div>

        {/* Real Client Case Studies */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="saffron">Production Case Studies</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              Real Client Systems Built by Karka Interns
            </h2>
            <p className="text-sm text-night-muted">
              Here are actual systems built and maintained by our learners during their cohort.
            </p>
          </div>

          <div className="space-y-8">
            {realClientProjects.map((project, idx) => (
              <div
                key={project.id}
                className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 shadow-glass"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Client & Overview */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-mint uppercase tracking-wider">
                        Client: {project.client}
                      </span>
                      <span className="rounded-pill bg-white/5 px-2.5 py-0.5 text-xs text-night-muted">
                        {project.impact}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-night-text">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-night-muted leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-night-muted block">
                        What Interns Architected:
                      </span>
                      <ul className="space-y-2 text-sm text-night-text">
                        {project.internDeliverables.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-mint shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Tech Architecture */}
                  <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-night-3/60 p-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-night-muted">
                      Production Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-xl border border-white/10 bg-night-2 px-3 py-1.5 text-xs font-mono font-medium text-night-text"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 text-xs text-night-muted space-y-2">
                      <div className="flex justify-between">
                        <span>Sprint Model:</span>
                        <span className="font-medium text-night-text">2-Week Agile Cadence</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Code Review:</span>
                        <span className="font-medium text-night-text">Senior Architect Gate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Step Sprint Rhythm */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="mint">Engineering Discipline</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              The Professional Sprint Cadence
            </h2>
            <p className="text-sm text-night-muted">
              We recreate the exact day-to-day workflow of modern high-growth tech companies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprintSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-3xl border border-white/10 bg-night-2 p-6 flex flex-col justify-between shadow-glass"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-saffron">
                    {step.step}
                  </span>
                  <h3 className="font-display text-lg font-bold text-night-text mt-3 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-night-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application CTA */}
        <section className="rounded-3xl border border-white/15 bg-night-2 p-8 sm:p-12 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="saffron">Join the Next Sprint</Badge>
              <h3 className="font-display text-3xl font-bold text-night-text">
                Apply for an Internship Cohort
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                Gain verifiable commercial experience that sets you apart from thousands of standard college applicants.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-night-1 p-6 shadow-glass">
                <LeadForm
                  defaultTrack="fullstack"
                  source="internships-page-apply"
                  compact
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
