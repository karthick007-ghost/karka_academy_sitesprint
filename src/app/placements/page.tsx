"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { verifiedPlacements, gabrielVideoReview, placementPhases } from "@/content/placements";
import { KolamHeader } from "@/components/ornament/kolam";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";
import {
  Play,
  Quote,
  Building2,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Code2,
  FileCheck2,
  Target,
  Sparkles,
} from "lucide-react";

export default function PlacementsPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="py-12 md:py-20 bg-base text-primary transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =================================================================
            1. HERO SECTION (SEMANTIC TOKENS)
           ================================================================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <KolamHeader tamilWord="கற்க" label="Placement Track Records" />
          <Badge variant="saffron">Verified Alumni Network</Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Verified Placements from <span className="text-accent-text">Nagercoil</span>
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Our learners come from local colleges across Kanyakumari and southern Tamil Nadu, mastering modern full-stack and AI engineering to crack roles at prominent technology employers.
          </p>
        </section>

        {/* =================================================================
            2. VIDEO SPOTLIGHT: GABRIEL SAMRAJ IN GLASS FRAME
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-10 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Video Trigger with Glass Card */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-video w-full rounded-2xl bg-sunken border border-ui/15 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-saffron text-night-1 shadow-glow transition-transform group-hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label="Play Gabriel Samraj video testimonial"
                >
                  <Play className="h-7 w-7 fill-current ml-1" />
                </button>
                <div className="relative z-10 mt-4 text-xs font-semibold text-white uppercase tracking-wider">
                  Watch Gabriel's Journey ({gabrielVideoReview.duration})
                </div>
              </div>
            </div>

            {/* Right: Testimonial Quote & Details */}
            <div className="lg:col-span-7 space-y-4">
              <Quote className="h-8 w-8 text-saffron/40" />
              <blockquote className="text-base sm:text-lg text-primary leading-relaxed italic">
                "{gabrielVideoReview.summary}"
              </blockquote>
              <div className="pt-2 border-t border-ui/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {gabrielVideoReview.studentName}
                  </h3>
                  <p className="text-xs text-muted">
                    {gabrielVideoReview.role} • {gabrielVideoReview.track}
                  </p>
                </div>
                {/* Plain typographic company pill - no corporate logos */}
                <div className="rounded-full border border-ui/20 bg-sunken px-3.5 py-1 text-xs font-mono font-bold text-accent">
                  {gabrielVideoReview.company}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Playback Modal Dialog */}
        <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
          <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-elev border-ui/20">
            <DialogHeader className="p-4 border-b border-ui/10">
              <DialogTitle className="text-lg font-bold">
                {gabrielVideoReview.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted">
                {gabrielVideoReview.studentName} sharing his placement transition into {gabrielVideoReview.company}.
              </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={gabrielVideoReview.youtubeEmbedUrl}
                title={gabrielVideoReview.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* =================================================================
            3. VERIFIED PLACEMENT CARDS WITH TYPOGRAPHIC PILLS
           ================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ui/15 pb-4">
            <div>
              <Badge variant="mint">Verified Roles</Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight mt-2">
                Recent Alumni Engineering Appointments
              </h2>
              <p className="text-sm text-muted mt-1">
                Transparent placement records backed by verified employment offers across partner networks.
              </p>
            </div>
            <div className="text-xs font-mono font-semibold text-muted">
              {verifiedPlacements.length} Placement Records
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedPlacements.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-ui/15 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200 space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-positive-text flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4" />
                      <span>{p.packageRange}</span>
                    </span>
                    <Badge variant="default">{p.track.split(" ")[0]}</Badge>
                  </div>

                  {/* Plain text typographic company badge - No third-party corporate logos per competition rules */}
                  <div className="pt-1">
                    <span className="inline-block rounded-xl border border-ui/20 bg-sunken px-3 py-1 font-mono text-sm font-extrabold text-accent">
                      {p.company}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight pt-1">
                    {p.role}
                  </h3>

                  <p className="text-xs text-muted">
                    {p.name}
                  </p>

                  {p.quote && (
                    <p className="text-xs text-muted italic border-l-2 border-saffron/40 pl-2.5 mt-2 leading-relaxed">
                      "{p.quote}"
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-ui/10 text-[11px] text-muted flex items-center justify-between">
                  <span>Alumni Status</span>
                  <span className="font-semibold text-positive-text">Active Engineer</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            4. 3-STEP PLACEMENT GROOMING TIMELINE
           ================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="saffron">Placement Preparation</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Our 3-Phase Placement Grooming Pipeline
            </h2>
            <p className="text-sm text-muted">
              Rigorous preparation ensuring you clear algorithmic, architectural, and culture fit interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placementPhases.map((phase) => (
              <div
                key={phase.step}
                className="rounded-3xl border border-ui/15 bg-elev p-8 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200 space-y-4"
              >
                <div>
                  <span className="font-mono text-3xl font-extrabold text-accent-text">
                    0{phase.step}
                  </span>
                  <h3 className="font-display text-xl font-bold mt-4 mb-2 tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {phase.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-ui/10 flex items-center gap-1.5 text-xs font-semibold text-positive-text">
                  <UserCheck className="h-4 w-4" />
                  <span>Mandatory Completion Gate</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            5. PLACEMENT APPLICATION CALL TO ACTION
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="mint">Join the Next Placement Cohort</Badge>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Launch Your Software Engineering Career
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Connect with our admissions mentors to discuss career tracks, Pay After Placement eligibility, and the upcoming batch start date.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-positive-text">
                <Sparkles className="h-4 w-4" />
                <span>₹0 upfront tuition fees for qualified applicants.</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-ui/15 bg-sunken p-6 shadow-sm">
                <LeadForm
                  defaultTrack="fullstack"
                  defaultAudience="graduate"
                  source="placements-page-apply"
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
