"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { verifiedPlacements, gabrielVideoReview, placementPhases } from "@/content/placements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";
import { Play, Quote, Building2, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";

export default function PlacementsPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="saffron">Placement Records</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-night-text">
            Verified Placements from Nagercoil
          </h1>
          <p className="text-base sm:text-lg text-night-muted leading-relaxed">
            Our learners come from local colleges across Kanyakumari and southern Tamil Nadu and launch engineering careers at global software companies.
          </p>
        </div>

        {/* Video Spotlight: Gabriel Samraj */}
        <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Video Trigger */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-video w-full rounded-2xl bg-forest/40 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-night-1 via-transparent to-transparent opacity-80" />
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-saffron text-ink shadow-glow transition group-hover:scale-110 active:scale-95"
                  aria-label="Play Gabriel Samraj video testimonial"
                >
                  <Play className="h-7 w-7 fill-current ml-1" />
                </button>
                <div className="relative z-10 mt-4 text-xs font-semibold text-night-text uppercase tracking-wider">
                  Watch Gabriel's Journey ({gabrielVideoReview.duration})
                </div>
              </div>
            </div>

            {/* Right: Testimonial Quote */}
            <div className="lg:col-span-7 space-y-4">
              <Quote className="h-8 w-8 text-saffron/40" />
              <blockquote className="text-base sm:text-lg text-night-text leading-relaxed italic">
                "{gabrielVideoReview.summary}"
              </blockquote>
              <div className="pt-2">
                <div className="font-display text-lg font-bold text-night-text">
                  {gabrielVideoReview.studentName}
                </div>
                <div className="text-xs sm:text-sm text-night-muted">
                  {gabrielVideoReview.role} •{" "}
                  <span className="text-mint font-semibold">{gabrielVideoReview.company}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Dialog Modal */}
        <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
          <DialogContent className="sm:max-w-3xl p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{gabrielVideoReview.title}</DialogTitle>
              <DialogDescription>
                Verified student placement review at {gabrielVideoReview.company}
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video w-full rounded-xl overflow-hidden mt-3 bg-black">
              {videoModalOpen && (
                <iframe
                  src={gabrielVideoReview.youtubeEmbedUrl}
                  title={gabrielVideoReview.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* 3-Step Placement Grooming Pipeline */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="mint">Career Preparation</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              Our 3-Phase Placement System
            </h2>
            <p className="text-sm text-night-muted">
              We leave nothing to luck. Every candidate undergoes rigorous interview readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementPhases.map((phase) => (
              <div
                key={phase.step}
                className="rounded-3xl border border-white/10 bg-night-2 p-8 shadow-glass space-y-3"
              >
                <span className="font-mono text-2xl font-bold text-saffron">
                  Phase 0{phase.step}
                </span>
                <h3 className="font-display text-lg font-bold text-night-text">
                  {phase.title}
                </h3>
                <p className="text-xs sm:text-sm text-night-muted leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Placement Cards Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display text-3xl font-bold text-night-text">
              Alumni Hiring Records
            </h2>
            <p className="text-sm text-night-muted">
              Hired across enterprise service consultancies, growth tech firms, and product studios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {verifiedPlacements.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/5 bg-night-2 p-5 flex flex-col justify-between shadow-glass"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-mint uppercase tracking-wider">
                      {p.track}
                    </span>
                    <UserCheck className="h-4 w-4 text-mint/60" />
                  </div>
                  <h4 className="font-bold text-night-text text-base">{p.name}</h4>
                  <p className="text-xs text-night-muted mt-0.5">{p.role}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-night-text flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-saffron" />
                    <span>{p.company}</span>
                  </span>
                  <span className="text-[10px] text-night-muted">{p.packageRange}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plain Text Companies Marquee / List */}
        <section className="rounded-3xl border border-white/10 bg-night-2 p-8 text-center shadow-glass space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-night-muted">
            Organizations Where Karka Alumni Work
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {siteConfig.hiringPartnerNames.map((name) => (
              <span
                key={name}
                className="rounded-pill border border-white/10 bg-night-3 px-4 py-2 text-xs sm:text-sm font-semibold text-night-text"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Ethical Transparency Note */}
        <div className="rounded-2xl border border-white/5 bg-night-3/40 p-6 text-xs text-night-muted leading-relaxed">
          <div className="flex items-center gap-2 text-night-text font-bold mb-1">
            <ShieldCheck className="h-4 w-4 text-mint" />
            <span>Honest Placement Disclaimer</span>
          </div>
          Under consumer protection guidelines and our institutional values, Karka Academy does not advertise unconditional "100% placement guarantees." Placement outcomes depend on your consistent attendance, completing commercial client sprint milestones, passing technical mocks, and presenting yourself professionally during interviews.
        </div>

        {/* Application CTA */}
        <section className="rounded-3xl border border-white/15 bg-night-2 p-8 sm:p-12 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="mint">Ready for Career Growth?</Badge>
              <h3 className="font-display text-3xl font-bold text-night-text">
                Start Your Placement Journey
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                Connect with our admissions team to learn which track has the highest hiring demand right now.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-night-1 p-6 shadow-glass">
                <LeadForm
                  defaultAudience="graduate"
                  source="placements-page-cta"
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
