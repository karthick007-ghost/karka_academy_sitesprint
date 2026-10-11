"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { verifiedPlacements, gabrielVideoReview } from "@/content/placements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowRight, Play, Quote, Building2, UserCheck } from "lucide-react";

export function PlacementsSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="py-20 bg-night-2 relative overflow-hidden" id="placements">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="saffron">Verified Outcomes</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night-text">
            From Nagercoil to Global Engineering Teams
          </h2>
          <p className="text-base sm:text-lg text-night-muted leading-relaxed">
            Real student journeys from local colleges to verified technology careers. Authentic reviews and transparent company hiring tracks.
          </p>
        </div>

        {/* Featured Video Spotlight: Gabriel Samraj */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-night-1 p-6 sm:p-10 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Video Play Card */}
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
                  Watch Student Story ({gabrielVideoReview.duration})
                </div>
              </div>
            </div>

            {/* Right: Quote & Details */}
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
                <div className="text-xs text-night-muted/80 mt-1">
                  Track: {gabrielVideoReview.track}
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

        {/* Verified Placement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {verifiedPlacements.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/5 bg-night-3/50 p-5 flex flex-col justify-between hover:border-white/20 transition-colors"
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

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-night-text flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-saffron" />
                  <span>{p.company}</span>
                </span>
                <span className="text-[10px] text-night-muted">{p.packageRange}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/placements">
            <Button variant="outline" size="lg">
              <span>View Full Placement Records & Verification</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
