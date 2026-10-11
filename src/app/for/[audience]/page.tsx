import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/content/courses";
import { careerTracks } from "@/content/tracks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckCircle2, ArrowRight, Sparkles, Building2, Clock } from "lucide-react";

interface AudienceConfig {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  keyBenefits: string[];
  recommendedTrackSlugs: string[];
  formAudience: "college" | "graduate" | "switcher" | "school";
}

const audiencesMap: Record<string, AudienceConfig> = {
  college: {
    slug: "college",
    badge: "For College Students",
    title: "Build Real Software Products While Still in College",
    subtitle:
      "Tired of outdated university syllabuses and theoretical projects? Join Karka Academy to ship commercial client code at Agile Tribers and graduate with an unbeatable portfolio.",
    keyBenefits: [
      "Flexible evening and weekend lab hours in Nagercoil",
      "Verified commercial internship certificate from Agile Tribers",
      "Live 1-on-1 mentor guidance on data structures & web frameworks",
      "Direct campus placement advantage with real deployed GitHub repos",
    ],
    recommendedTrackSlugs: ["fullstack", "gen-ai", "design"],
    formAudience: "college",
  },
  "college-students": {
    slug: "college-students",
    badge: "For College Students",
    title: "Build Real Software Products While Still in College",
    subtitle:
      "Tired of outdated university syllabuses and theoretical projects? Join Karka Academy to ship commercial client code at Agile Tribers and graduate with an unbeatable portfolio.",
    keyBenefits: [
      "Flexible evening and weekend lab hours in Nagercoil",
      "Verified commercial internship certificate from Agile Tribers",
      "Live 1-on-1 mentor guidance on data structures & web frameworks",
      "Direct campus placement advantage with real deployed GitHub repos",
    ],
    recommendedTrackSlugs: ["fullstack", "gen-ai", "design"],
    formAudience: "college",
  },
  graduates: {
    slug: "graduates",
    badge: "For Recent Graduates",
    title: "₹0 Upfront Tuition. Pay Only When You Land Your Tech Job.",
    subtitle:
      "Graduated and struggling with mass applications and rejection emails? Our intensive 30 hrs/week Pay After Placement model trains you, mentors your interview skills, and connects you directly with hiring partners.",
    keyBenefits: [
      "₹0 upfront fees on eligible Pay After Placement tracks",
      "Fixed ₹40,000 flat fee only after you accept a job offer",
      "30 hours/week of rigorous hands-on lab code and mock drills",
      "Direct technical and HR interview rounds with partner networks",
    ],
    recommendedTrackSlugs: ["fullstack", "data-ml", "gen-ai"],
    formAudience: "graduate",
  },
  switchers: {
    slug: "switchers",
    badge: "For Career Switchers",
    title: "Transition into High-Paying Software & AI Engineering",
    subtitle:
      "Working in non-tech, operations, or BPO and want to switch into core technology? We teach fundamentals from scratch, pairing you with senior engineering mentors who have led tech teams at Wipro and Flow Global.",
    keyBenefits: [
      "Zero prior CS degree required — we start from first principles",
      "Mentored by Ex-CTO Sateesh Kumar (18+ years engineering leadership)",
      "Portfolio of production web and AI tools that impress hiring managers",
      "Weekend & hybrid evening lab availability in Nagercoil",
    ],
    recommendedTrackSlugs: ["fullstack", "design", "content-marketing"],
    formAudience: "switcher",
  },
  professionals: {
    slug: "professionals",
    badge: "For Working Professionals",
    title: "Upskill to Modern Generative AI & Cloud Architecture",
    subtitle:
      "Stay ahead of the curve. Master autonomous AI agents, enterprise RAG pipelines, and cloud microservices to command senior engineering compensation.",
    keyBenefits: [
      "Production LLM engineering: LangChain, Vector DBs, custom fine-tuning",
      "DevOps and Cloud containerization on modern AWS infrastructure",
      "Advanced 1-on-1 architectural reviews from senior industry architects",
      "Proprietary access to Infini AI sandbox and Spike assessment tools",
    ],
    recommendedTrackSlugs: ["gen-ai", "cloud-devops", "data-ml"],
    formAudience: "switcher",
  },
  school: {
    slug: "school",
    badge: "For School Students",
    title: "Ignite Logical Thinking & Coding from Grades 6 to 12",
    subtitle:
      "Give your child the unfair advantage of digital literacy, Python game development, and foundational artificial intelligence in a safe, fun, hands-on environment.",
    keyBenefits: [
      "Visual programming with Scratch advancing to real Python scripts",
      "Game development, interactive storytelling, and problem-solving",
      "Safe, supportive in-person lab environment in Nagercoil",
      "Weekend batches designed around school schedules",
    ],
    recommendedTrackSlugs: ["fullstack"],
    formAudience: "school",
  },
  "school-students": {
    slug: "school-students",
    badge: "For School Students",
    title: "Ignite Logical Thinking & Coding from Grades 6 to 12",
    subtitle:
      "Give your child the unfair advantage of digital literacy, Python game development, and foundational artificial intelligence in a safe, fun, hands-on environment.",
    keyBenefits: [
      "Visual programming with Scratch advancing to real Python scripts",
      "Game development, interactive storytelling, and problem-solving",
      "Safe, supportive in-person lab environment in Nagercoil",
      "Weekend batches designed around school schedules",
    ],
    recommendedTrackSlugs: ["fullstack"],
    formAudience: "school",
  },
};

export function generateStaticParams() {
  return Object.keys(audiencesMap).map((slug) => ({ audience: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const config = audiencesMap[audience];

  if (!config) {
    return { title: "Programs" };
  }

  return {
    title: `${config.badge} — Karka AI & Tech Academy`,
    description: config.subtitle,
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const config = audiencesMap[audience];

  if (!config) {
    notFound();
  }

  const matchingTracks = careerTracks.filter((t) =>
    config.recommendedTrackSlugs.includes(t.slug)
  );

  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-night-2 p-8 sm:p-12 shadow-glass">
          <div className="max-w-3xl space-y-4">
            <Badge variant="saffron">{config.badge}</Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night-text leading-tight">
              {config.title}
            </h1>
            <p className="text-base sm:text-lg text-night-muted leading-relaxed">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-night-text">
            Why Karka Academy is Built for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.keyBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-night-2 p-5 text-sm sm:text-base text-night-text shadow-glass"
              >
                <CheckCircle2 className="h-5 w-5 text-mint shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Tracks */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-night-text">
            Recommended Programs for Your Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingTracks.map((track) => (
              <div
                key={track.slug}
                className="rounded-3xl border border-white/10 bg-night-2 p-6 flex flex-col justify-between shadow-glass"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-saffron uppercase tracking-wider">
                      {track.title}
                    </span>
                    {track.isPayAfterPlacement && (
                      <Badge variant="mint" className="text-[10px]">
                        PAP Eligible
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-night-muted leading-relaxed">
                    {track.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-night-muted">
                    <Clock className="h-3.5 w-3.5 text-mint" />
                    <span>{track.duration}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/courses?track=${track.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-mint hover:underline"
                  >
                    <span>View track curriculum</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Form for this Audience */}
        <section className="rounded-3xl border border-white/15 bg-night-2 p-8 sm:p-12 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="mint">Direct Mentor Consultation</Badge>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-night-text">
                Speak with Admissions in Nagercoil
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                Have questions about schedules, fees, or course fit? Book a quick 15-minute phone or campus visit with an experienced technical mentor.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-night-1 p-6 shadow-glass">
                <LeadForm
                  defaultAudience={config.formAudience}
                  source={`landing-${config.slug}`}
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
