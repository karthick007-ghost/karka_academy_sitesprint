import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KolamHeader, KolamMandala } from "@/components/ornament/kolam";
import {
  UserCheck,
  Building2,
  MapPin,
  Sparkles,
  Award,
  Terminal,
  Cpu,
  Layers,
  Users2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Leadership | Karka AI & Tech Academy",
  description:
    "Learn about Karka AI & Tech Academy in Nagercoil. Founded by Ex-CTO Sateesh Kumar (18+ yrs experience) to democratize high-impact software engineering and AI education across Kanyakumari.",
};

export default function AboutPage() {
  const pillars = [
    {
      step: "01",
      icon: Terminal,
      title: "Algorithmic Logic First",
      desc: "Before writing frontend framework code, students master computational thinking, algorithmic problem-solving, clean code hygiene, and Data Structures in Python and TypeScript.",
    },
    {
      step: "02",
      icon: Layers,
      title: "Full-Stack System Engineering",
      desc: "Modern TypeScript, Next.js 16, Node.js microservices, relational and document databases (PostgreSQL, MongoDB), and secure token-based authentication architectures.",
    },
    {
      step: "03",
      icon: Cpu,
      title: "Applied Generative AI Tools",
      desc: "Learning to engineer with LLM orchestration, RAG vector pipelines, and autonomous agent systems rather than superficial prompting tricks.",
    },
    {
      step: "04",
      icon: Building2,
      title: "Commercial Delivery at Agile Tribers",
      desc: "Every student delivers live features for commercial clients at our in-house product studio, participating in daily standups, Git branch PRs, and Docker staging deploys.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-base text-primary transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =================================================================
            1. HERO SECTION (KOLAM ORNAMENT & TAMIL EDITORIAL AESTHETIC)
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 lg:p-16 shadow-subtle text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="flex justify-center">
            <KolamHeader tamilWord="கற்க" label="Karka AI & Tech Academy" />
          </div>

          <Badge variant="saffron">Our Guiding Mission</Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Democratizing <span className="text-accent-text">High-Impact Tech</span> from Nagercoil.
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Named after the sacred Tamil imperative <em>“கற்க கசடறக் கற்பவை”</em> (Learn thoroughly without flaws), Karka Academy exists to bridge the divide between conventional academic theory and high-bar software engineering in southern Tamil Nadu.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/courses">
              <Button variant="primary" size="lg" magnetic={true} className="font-bold">
                <span>Explore Career Tracks</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/pay-after-placement">
              <Button variant="outline" size="lg" magnetic={true} className="font-semibold">
                <span>View PAP Agreement</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* =================================================================
            2. THE NAGERCOIL / KANYAKUMARI REGIONAL TECH HUB VISION
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="mint">Regional Tech Hub</Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Why Build an AI & Tech Academy in Nagercoil?
              </h2>
              <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  For decades, aspiring software engineers from Kanyakumari District and southern Tamil Nadu faced an impossible dilemma: relocate to expensive tier-1 metros (Bengaluru, Chennai, Hyderabad) to pay exorbitant living costs, or settle for non-technical local jobs.
                </p>
                <p>
                  We built Karka Academy to shatter that barrier. Our physical software lab in Nagercoil provides silicon-valley grade mentorship, gigabit fibre infrastructure, high-performance workstations, and direct access to production codebases.
                </p>
                <p>
                  By cultivating top-tier engineering talent right here in Nagercoil, we empower local graduates to secure high-paying remote roles, regional IT appointments, and global software careers without having to leave their families behind.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="rounded-2xl border border-ui/15 bg-sunken p-4 space-y-1">
                  <div className="text-xl font-bold text-accent">Nagercoil Lab</div>
                  <span className="text-xs text-muted">Physical hands-on campus</span>
                </div>
                <div className="rounded-2xl border border-ui/15 bg-sunken p-4 space-y-1">
                  <div className="text-xl font-bold text-positive-text">100% Practical</div>
                  <span className="text-xs text-muted">Zero dry chalkboard lectures</span>
                </div>
              </div>
            </div>

            {/* Right: Traditional Kolam Mandala Motif Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="glass p-8 rounded-3xl border border-ui/20 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 max-w-sm w-full">
                <KolamMandala size={160} color="var(--saffron, #FF6A2B)" dotColor="#FFD166" animated={true} />
                <div>
                  <span lang="ta" className="font-tamil text-2xl font-bold text-accent-text block">
                    கற்க கசடற
                  </span>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    "Learn flawlessly what you must learn, then stand true to what you have learned."
                  </p>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted mt-2 block">
                    — Thirukkural 391
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. FOUNDER & CHIEF MENTOR SPOTLIGHT CARD
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Founder Stats */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 border border-accent/25 text-accent">
                <Award className="h-8 w-8" />
              </div>
              <Badge variant="forest">Engineering Leadership</Badge>
              <h3 className="font-display text-3xl font-bold tracking-tight">
                {siteConfig.leadership.founder}
              </h3>
              <p className="text-sm font-semibold text-accent">
                {siteConfig.leadership.role}
              </p>
              <div className="rounded-2xl border border-ui/15 bg-sunken p-4 space-y-1">
                <span className="text-xs font-semibold text-muted uppercase">Industry Experience</span>
                <div className="text-2xl font-extrabold text-positive-text">
                  {siteConfig.leadership.experienceYears} Years
                </div>
                <span className="text-[11px] text-muted">Architecting scalable platforms</span>
              </div>
            </div>

            {/* Right: Background & Track Record */}
            <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-ui/15 pt-6 lg:pt-0 lg:pl-8">
              <h4 className="font-display text-xl font-bold tracking-tight">
                Architectural Pedigree & Track Record
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                Prior to founding Karka Software Academy and Agile Tribers in Nagercoil, Sateesh led engineering teams at international technology companies, building mission-critical financial platforms and large-scale consumer applications.
              </p>

              <div className="space-y-3 pt-2">
                {siteConfig.leadership.background.map((bg, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-primary">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-positive-text/15 text-positive-text border border-positive-text/25 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>{bg}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Every student code review is guided by production architectural standards.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. FOUR PEDAGOGICAL PILLARS
           ================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="saffron">Our Curriculum Architecture</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              The 4 Core Pillars of Karka Engineering
            </h2>
            <p className="text-sm text-muted">
              Designed from first principles to train engineers who thrive in production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="rounded-3xl border border-ui/15 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200 space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-accent-text">
                        {pillar.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunken border border-ui/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================================
            5. VISIT CAMPUS IN NAGERCOIL
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle text-center max-w-3xl mx-auto space-y-6">
          <Badge variant="mint">Visit Us in Person</Badge>
          <h3 className="font-display text-3xl font-bold tracking-tight">
            Experience Our Software Lab Firsthand
          </h3>
          <p className="text-sm text-muted leading-relaxed max-w-xl mx-auto">
            Drop by our software lab in Nagercoil, meet our engineering mentors, sit in on a live programming drill, and understand our Pay After Placement model in person.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" magnetic={true} className="font-bold">
                <span>View Campus Address & Map</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <a href={`tel:${siteConfig.contact.phone}`}>
              <Button variant="outline" size="lg" magnetic={true} className="font-semibold">
                <span>Call Admissions: {siteConfig.contact.displayPhone}</span>
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
