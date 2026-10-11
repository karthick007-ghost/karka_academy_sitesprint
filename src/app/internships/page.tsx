import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { realClientProjects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { KolamHeader } from "@/components/ornament/kolam";
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
  GitPullRequest,
  Container,
  Check,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Agile Tribers Live Client Internships | Karka Academy",
  description:
    "Gain commercial software engineering experience in Nagercoil at Agile Tribers. Work on live client codebases, Git feature branches, senior peer PR reviews, and Dockerized deployments.",
};

export default function InternshipsPage() {
  const sprintSteps = [
    {
      step: "01",
      icon: Terminal,
      title: "Sprint Planning & User Stories",
      desc: "Receive real business specifications from product owners. Break down epics into verifiable engineering tasks with story points and acceptance criteria.",
    },
    {
      step: "02",
      icon: GitBranch,
      title: "Git Feature Branching",
      desc: "Work on isolated feature branches following conventional commits. Write modular TypeScript code with strict ESLint, type invariants, and unit tests.",
    },
    {
      step: "03",
      icon: GitPullRequest,
      title: "Senior Peer PR Reviews",
      desc: "No code merges to main without review. Senior engineering mentors review your Pull Requests for security, architecture, and query optimization.",
    },
    {
      step: "04",
      icon: Container,
      title: "CI/CD & Dockerized Deploys",
      desc: "Automated GitHub Actions pipelines validate linting and test coverage before building Docker containers and deploying to staging cloud clusters.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-base text-primary transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =================================================================
            1. HERO & 3D ROBOT MASCOT INTERN ARTWORK SECTION
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 lg:p-16 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <KolamHeader tamilWord="கற்க" label="Agile Tribers Product Studio" />

              <Badge variant="mint">Commercial Engineering Experience</Badge>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Graduate with <span className="text-accent-text">Commercial Client Code</span>.
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed">
                Most bootcamps end with toy clone projects (To-Do apps, Netflix clones) that hiring managers immediately disregard. At Karka Academy, you intern directly at <strong>Agile Tribers</strong>, our commercial product development studio in Nagercoil.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl border border-ui/15 bg-sunken p-4 space-y-1">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">GitHub Commits</span>
                  <div className="text-2xl font-bold text-primary">Verifiable</div>
                  <span className="text-[11px] text-muted">Public repo proof</span>
                </div>
                <div className="rounded-2xl border border-ui/15 bg-sunken p-4 space-y-1">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">Code Reviews</span>
                  <div className="text-2xl font-bold text-accent-text">1-on-1 PRs</div>
                  <span className="text-[11px] text-muted">Senior mentorship</span>
                </div>
                <div className="rounded-2xl border border-ui/15 bg-sunken p-4 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">Delivery Bar</span>
                  <div className="text-2xl font-bold text-positive-text">Production</div>
                  <span className="text-[11px] text-muted">Live client features</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a href="#projects-carousel">
                  <Button variant="primary" size="lg" magnetic={true} className="font-bold">
                    <span>Explore Case Studies</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <a href="#apply-internship">
                  <Button variant="outline" size="lg" magnetic={true} className="font-semibold">
                    <span>Apply for Studio Batch</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: AI-Generated 3D Robot Mascot Intern in Glass Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="glass p-3 sm:p-4 rounded-3xl border border-ui/20 shadow-2xl relative max-w-md w-full overflow-hidden group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-sunken">
                  <Image
                    src="/brand/mascot-intern.jpg"
                    alt="Karka AI & Tech Academy Robot Mascot Software Intern building commercial code at Agile Tribers studio"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-mint font-bold block mb-1">
                      Agile Tribers Studio Mascot
                    </span>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      Hands-on Engineering, Every Single Day
                    </h3>
                    <p className="text-xs text-white/80 mt-1">
                      Learners ship features directly to production staging clusters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. REAL WORKFLOWS: 4-STAGE AGILE DEVELOPMENT LIFECYCLE
           ================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="saffron">The Agile Tribers Lifecycle</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Real Engineering Workflows, Not Isolated Homework
            </h2>
            <p className="text-base text-muted leading-relaxed">
              We mirror the software development life-cycle (SDLC) used by high-performance engineering organizations worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprintSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="rounded-3xl border border-ui/15 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-accent-text">
                        {s.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunken border border-ui/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================================
            3. CAROUSEL PRIMITIVE: CLIENT CASE STUDIES WITH MOMENTUM DRAG
           ================================================================= */}
        <section id="projects-carousel" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ui/15 pb-4">
            <div>
              <Badge variant="mint">Production Portfolio</Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight mt-2">
                Agile Tribers Commercial Client Deliverables
              </h2>
              <p className="text-sm text-muted mt-1">
                Verified software products delivered by our student engineering teams. Drag or use arrow keys to navigate.
              </p>
            </div>
            <div className="text-xs font-mono font-semibold text-muted">
              {realClientProjects.length} Verified Case Studies
            </div>
          </div>

          <Carousel className="w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Swipeable Studio Case Studies
              </span>
              <div className="flex items-center gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>

            <CarouselContent>
              {realClientProjects.map((proj) => (
                <CarouselItem key={proj.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="h-full rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="forest">{proj.client}</Badge>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-positive-text">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Verified</span>
                        </div>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                        {proj.title}
                      </h3>

                      <p className="text-sm text-muted leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="space-y-2 pt-2 border-t border-ui/10">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                          Key Student Deliverables
                        </span>
                        {proj.internDeliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-muted">
                            <Check className="h-3.5 w-3.5 text-positive-text shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-ui/10">
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-ui/15 bg-sunken px-2 py-0.5 text-[11px] font-mono text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Impact Banner */}
                      <div className="rounded-xl border border-ui/10 bg-sunken p-3 text-xs text-muted">
                        <strong className="text-accent font-semibold block mb-0.5">Measurable Impact:</strong>
                        <span>{proj.impact}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselDots className="mt-4" />
          </Carousel>
        </section>

        {/* =================================================================
            4. APPLICATION CTA CARD
           ================================================================= */}
        <section id="apply-internship" className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="mint">Join the Next Studio Sprint</Badge>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Work on Real Commercial Systems
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Join our full-stack or AI career tracks to participate in Agile Tribers client deliverables and graduate with verifiable production commits.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-positive-text pt-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Mentored by senior engineering practitioners in Nagercoil.</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-ui/15 bg-sunken p-6 shadow-sm">
                <LeadForm
                  defaultTrack="fullstack"
                  defaultAudience="graduate"
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
