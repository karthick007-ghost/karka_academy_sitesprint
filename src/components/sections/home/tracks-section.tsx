"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { careerTracks } from "@/content/tracks";
import { ArrowRight, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { TrackFinder } from "@/components/sections/courses/track-finder";

export function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState<string>(careerTracks[0].slug);

  const active = careerTracks.find((t) => t.slug === selectedTrack) ?? careerTracks[0];

  return (
    <section className="py-20 bg-night-2 relative overflow-hidden" id="tracks">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="saffron">Industry Aligned</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night-text">
            Explore Our Career Tracks
          </h2>
          <p className="text-base sm:text-lg text-night-muted leading-relaxed">
            Engineered around the exact skills top tech companies hire for in 2026. Choose your path or take our quick finder quiz.
          </p>
        </div>

        {/* Track Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {careerTracks.map((track) => (
            <button
              key={track.slug}
              type="button"
              onClick={() => setSelectedTrack(track.slug)}
              className={`rounded-pill px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                selectedTrack === track.slug
                  ? "bg-saffron text-ink shadow-glow scale-105"
                  : "bg-night-3 text-night-muted hover:text-night-text hover:bg-white/10 border border-white/5"
              }`}
            >
              {track.title}
              {track.isPayAfterPlacement && (
                <span className="ml-1.5 rounded-full bg-forest px-1.5 py-0.5 text-[10px] font-bold text-mint">
                  PAP
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Track Highlight Card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-night-1 p-6 sm:p-10 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-saffron">
                  Cohort Track
                </span>
                {active.isPayAfterPlacement && (
                  <Badge variant="mint">Pay After Placement Eligible (₹0 Upfront)</Badge>
                )}
                <div className="flex items-center gap-1.5 text-xs text-night-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{active.duration}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-night-text">
                {active.title}
              </h3>

              <p className="text-sm sm:text-base text-night-muted leading-relaxed">
                {active.description}
              </p>

              {/* Skills Learned */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-night-muted block mb-2.5">
                  Core Skills & Technologies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-white/10 bg-night-3 px-3 py-1 text-xs font-medium text-night-text"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Count and CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href={`/courses?track=${active.slug}`}>
                  <Button variant="primary" size="md" className="shadow-glow font-bold w-full sm:w-auto">
                    <span>View {active.courseCount} Courses in this Track</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Browse All 37 Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Outcomes & Highlights */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-night-2 p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-night-text">
                Track Highlights
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-night-muted">
                {active.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-mint shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-white/10 text-xs text-night-muted flex items-center justify-between">
                <span>Lab access in Nagercoil</span>
                <span className="text-mint font-semibold">Live Mentor Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Track Finder Quiz */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-mint">
              Interactive Tool
            </span>
            <h3 className="text-2xl font-bold text-night-text">
              Not Sure Which Track Fits You Best?
            </h3>
            <p className="text-sm text-night-muted">
              Answer 4 quick questions and get an instant personalized recommendation.
            </p>
          </div>
          <TrackFinder />
        </div>
      </div>
    </section>
  );
}
