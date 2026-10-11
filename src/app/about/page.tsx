import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Leadership",
  description:
    "Learn about Karka AI & Tech Academy in Nagercoil. Founded by Ex-CTO Sateesh Kumar (18+ yrs experience) to provide world-class software engineering and AI mentorship.",
};

export default function AboutPage() {
  const pillars = [
    {
      step: "01",
      title: "Algorithmic Logic First",
      desc: "Before writing React components, students master core problem-solving, clean code hygiene, and data structures.",
    },
    {
      step: "02",
      title: "Full-Stack System Engineering",
      desc: "Modern TypeScript, Next.js, relational and document databases, and secure authentication flows.",
    },
    {
      step: "03",
      title: "Applied Generative AI Tools",
      desc: "Learning to build with LLMs, prompt architectures, and vector search rather than superficial chatbots.",
    },
    {
      step: "04",
      title: "Commercial Delivery at Agile Tribers",
      desc: "Every student delivers live features for commercial clients, participating in daily standups and Git reviews.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-night-2 p-8 sm:p-12 lg:p-16 shadow-glass text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="saffron">Our Mission</Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-night-text leading-tight">
            Democratizing <span className="text-mint">High-Impact Tech</span> from Nagercoil.
          </h1>

          <p className="text-base sm:text-lg text-night-muted leading-relaxed max-w-2xl mx-auto">
            Karka AI & Tech Academy was founded with a singular purpose: to prove that world-class software engineers don’t just come from Tier-1 metros. With rigorous mentorship and commercial client sprints, talented youth from Kanyakumari District can compete with the best.
          </p>

          <div className="inline-flex items-center gap-2 rounded-pill border border-forest/40 bg-forest/20 px-4 py-2 text-xs font-semibold text-mint">
            <MapPin className="h-4 w-4" />
            <span>Nagercoil Campus • Kanyakumari District, Tamil Nadu</span>
          </div>
        </div>

        {/* Founder Spotlight Card */}
        <section className="rounded-3xl border border-white/10 bg-night-2 p-8 sm:p-12 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Founder Avatar / Graphic */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-forest/30 border border-white/10">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-night-2 border border-white/20 shadow-glass mb-4">
                <span className="font-tamil text-4xl font-bold text-saffron">க</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-night-text">
                {siteConfig.leadership.founder}
              </h2>
              <p className="text-xs text-mint font-semibold mt-1">
                {siteConfig.leadership.role}
              </p>
              <div className="mt-4 rounded-pill bg-white/5 px-3 py-1 text-xs text-night-muted">
                {siteConfig.leadership.experienceYears} Global Software Engineering
              </div>
            </div>

            {/* Right: Background & Track Record */}
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="mint">Chief Mentor Leadership</Badge>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-night-text">
                Mentorship Driven by Real Industry Experience
              </h3>
              <p className="text-sm sm:text-base text-night-muted leading-relaxed">
                Most commercial training academies are run by sales recruiters or junior instructors. Karka Academy's curriculums and engineering standards are designed and personally supervised by Sateesh Kumar.
              </p>

              <div className="space-y-3 pt-2">
                {siteConfig.leadership.background.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-night-text">
                    <span className="text-saffron font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-mint hover:underline"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Learning */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="saffron">Our Methodology</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              The 4 Pillars of Learning
            </h2>
            <p className="text-sm text-night-muted">
              How our students go from zero knowledge to shipping production software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.step}
                className="rounded-3xl border border-white/10 bg-night-2 p-6 flex flex-col justify-between shadow-glass"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-mint">
                    Pillar {p.step}
                  </span>
                  <h3 className="font-display text-lg font-bold text-night-text mt-3 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-night-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Facilities */}
        <section className="rounded-3xl border border-white/10 bg-night-2 p-8 sm:p-12 shadow-glass space-y-6">
          <div className="max-w-2xl space-y-2">
            <Badge variant="mint">Campus & Environment</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              Physical Lab Space in Nagercoil
            </h2>
            <p className="text-sm text-night-muted leading-relaxed">
              We provide a high-focus environment equipped with hardware workstations, high-speed fiber internet, and dedicated lab mentors ready to debug your code in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-5 space-y-2">
              <h4 className="font-bold text-night-text text-base">In-Person Collaboration</h4>
              <p className="text-xs text-night-muted">
                Pair programming with peers in a vibrant developer community setting.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-5 space-y-2">
              <h4 className="font-bold text-night-text text-base">Daily Mentor Debugging</h4>
              <p className="text-xs text-night-muted">
                Never get stuck for days on a compiler error or Git conflict.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-5 space-y-2">
              <h4 className="font-bold text-night-text text-base">Hybrid Online Options</h4>
              <p className="text-xs text-night-muted">
                Full online live streaming access for learners outside Nagercoil.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-night-text">
            Want to visit our campus in person?
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="shadow-glow">
                View Campus Location & Hours
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                Explore Available Tracks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
