import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/content/courses";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  Building2,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} Course in Nagercoil`,
    description: course.summary,
  };
}

import { CourseJsonLd } from "@/components/seo/json-ld";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const isPap = course.track === "fullstack";

  return (
    <div className="py-10 md:py-16 bg-night-1">
      <CourseJsonLd course={course} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-night-muted">
          <Link href="/" className="hover:text-night-text transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <Link href="/courses" className="hover:text-night-text transition-colors">
            Courses
          </Link>
          <ChevronRight className="h-3 w-3 opacity-50" />
          <span className="text-saffron font-medium truncate max-w-[200px] sm:max-w-none">
            {course.title}
          </span>
        </nav>

        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 shadow-glass">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-saffron">
                {course.track} track
              </span>
              {isPap && (
                <Badge variant="mint">Pay After Placement (₹0 Upfront)</Badge>
              )}
              <span className="rounded-pill bg-white/5 px-2.5 py-0.5 text-xs text-night-muted">
                {course.level}
              </span>
              {course.duration && (
                <span className="flex items-center gap-1 text-xs text-night-muted">
                  <Clock className="h-3.5 w-3.5 text-mint" />
                  <span>{course.duration}</span>
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night-text leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-night-muted leading-relaxed">
              {course.summary}
            </p>
          </div>
        </div>

        {/* Content Layout: Main Info + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Learning Outcomes */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-night-text">
                What You Will Achieve
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-night-2 p-4 text-sm text-night-text"
                  >
                    <CheckCircle2 className="h-5 w-5 text-mint shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum Breakdown */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-night-text">
                  Curriculum & Syllabus Modules
                </h2>
                <span className="text-xs text-night-muted">
                  {course.modules.length} Detailed Stages
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-night-2 p-6 shadow-glass">
                <Accordion type="single" collapsible className="w-full" defaultValue="module-1">
                  {course.modules.map((m) => (
                    <AccordionItem key={m.step} value={`module-${m.step}`}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 text-left">
                          <span className="font-mono text-xs font-bold text-saffron bg-saffron/10 px-2.5 py-1 rounded-lg">
                            Stage 0{m.step}
                          </span>
                          <span>{m.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-12 pt-2 space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-night-muted block mb-1">
                            Key Topics Covered:
                          </span>
                          <ul className="space-y-1.5 text-sm text-night-text/90">
                            {m.topics.map((t, tidx) => (
                              <li key={tidx} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Tools & Tech Stack */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-night-text">
                Tools & Technologies You'll Master
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {course.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-xl border border-white/10 bg-night-2 px-4 py-2 text-xs sm:text-sm font-semibold text-night-text shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Commercial Client Deliverable Note */}
            <section className="rounded-3xl border border-mint/30 bg-forest/20 p-6 sm:p-8 space-y-3 shadow-glass">
              <div className="flex items-center gap-2 text-mint font-bold text-sm">
                <Building2 className="h-5 w-5" />
                <span>Agile Tribers Production Deliverable</span>
              </div>
              <h3 className="text-xl font-bold text-night-text">
                Real Commercial Project Portfolio
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                As part of this course, you will deliver features for live software products operated by Agile Tribers. Your GitHub will show real Pull Requests, code reviews from senior engineers, and verifiable production impact.
              </p>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            {/* Quick Facts Card */}
            <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 shadow-glass space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-night-muted block">
                  Tuition Fee Structure
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-saffron">
                    {isPap ? "₹0 Upfront" : "Transparent"}
                  </span>
                  {isPap && (
                    <span className="text-xs text-mint font-semibold">Pay After Placement</span>
                  )}
                </div>
                {isPap && (
                  <p className="mt-1 text-xs text-night-muted">
                    Pay only {siteConfig.papTermsAtAGlance.placementFee} after accepting an official job offer.
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10 text-xs text-night-text">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-night-muted">Location:</span>
                  <span className="font-semibold">Nagercoil Lab + Online</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-night-muted">Mentorship:</span>
                  <span className="font-semibold">1-on-1 Code Reviews</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-night-muted">Internship:</span>
                  <span className="font-semibold text-mint">Included (Agile Tribers)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-night-muted">Certificate:</span>
                  <span className="font-semibold">Verified Completion</span>
                </div>
              </div>

              {/* Quick WhatsApp Mentor Button */}
              <a
                href={`${siteConfig.contact.whatsappLink}%20regarding%20${encodeURIComponent(course.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold text-white transition hover:bg-[#20ba59] shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask Mentor on WhatsApp</span>
              </a>
            </div>

            {/* Quick Enrolment Form Card */}
            <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 shadow-glass">
              <h3 className="font-display text-lg font-bold text-night-text mb-1">
                Apply for this Program
              </h3>
              <p className="text-xs text-night-muted mb-4">
                Reserve your seat for the upcoming batch in Nagercoil.
              </p>
              <LeadForm
                defaultTrack={course.track}
                source={`course-detail-${course.slug}`}
                compact
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
