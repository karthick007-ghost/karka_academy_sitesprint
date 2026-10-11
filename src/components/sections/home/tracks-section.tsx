"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { careerTracks } from "@/content/tracks";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { TrackFinder } from "@/components/sections/courses/track-finder";
import { SlidingPillNav, type SlidingPillItem } from "@/components/motion/sliding-pill";
import { TrackObjectCanvas } from "@/components/three/track-objects";

export function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState<string>(careerTracks[0].slug);

  const active = careerTracks.find((t) => t.slug === selectedTrack) ?? careerTracks[0];

  const pillItems: SlidingPillItem<string>[] = careerTracks.map((track) => ({
    id: track.slug,
    label: (
      <span className="flex items-center gap-1.5">
        <span>{track.title}</span>
        {track.isPayAfterPlacement && (
          <span className="rounded-full bg-positive-text/15 border border-positive-text/30 px-2 py-0.5 text-[10px] font-bold text-positive-text">
            PAP
          </span>
        )}
      </span>
    ),
  }));

  return (
    <section className="py-20 bg-base relative overflow-hidden" id="tracks">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="saffron">Industry Aligned</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Explore Our Career Tracks
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Engineered around the exact skills top tech companies hire for in 2026. Choose your path or take our quick finder quiz.
          </p>
        </div>

        {/* Track Filter Sliding Pills with Burgundy Paint Spray Ambient Backdrop */}
        <div className="relative mt-12 flex justify-center">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[95vw] h-[160px] bg-[radial-gradient(ellipse_at_center,rgba(114,32,48,0.38)_0%,rgba(114,32,48,0.15)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(226,125,144,0.38)_0%,rgba(226,125,144,0.12)_50%,transparent_75%)] blur-2xl pointer-events-none -z-10"
            aria-hidden="true"
          />
          <SlidingPillNav
            items={pillItems}
            activeId={selectedTrack}
            onChange={setSelectedTrack}
            layoutId="home-career-tracks-nav"
            label="Career Tracks Selector"
          />
        </div>

        {/* Active Track Highlight Card with 3D Procedural Model */}
        <div className="mt-10 rounded-3xl border border-ui/15 bg-elev p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 bg-burgundy/15 dark:bg-burgundy/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Track Info */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                  Cohort Track
                </span>
                {active.isPayAfterPlacement && (
                  <Badge variant="mint">Pay After Placement Eligible (₹0 Upfront)</Badge>
                )}
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{active.duration}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                {active.title}
              </h3>

              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {active.description}
              </p>

              {/* Skills Learned */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2.5">
                  Core Skills & Technologies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-ui/15 bg-sunken px-3 py-1 text-xs font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Count and CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href={`/courses?track=${active.slug}`}>
                  <Button magnetic variant="primary" size="md" className="shadow-subtle font-bold w-full sm:w-auto">
                    <span>View {active.courseCount} Courses in this Track</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button magnetic variant="outline" size="md" className="w-full sm:w-auto">
                    Browse All 37 Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Center Column: 3D Procedural Track Geometry Viewport */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <div className="h-64 sm:h-72 w-full rounded-2xl border border-ui/15 bg-sunken/40 overflow-hidden relative shadow-inner flex items-center justify-center">
                <TrackObjectCanvas
                  trackId={active.slug}
                  altText={`${active.title} 3D geometry`}
                  className="h-full w-full"
                />
              </div>
              <span className="mt-2 text-[11px] font-mono text-muted uppercase tracking-wider text-center">
                Interactive 3D {active.title} Model
              </span>
            </div>

            {/* Right Column: Outcomes & Highlights */}
            <div className="lg:col-span-4 rounded-2xl border border-ui/15 bg-sunken/60 p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                Track Highlights
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-muted">
                {active.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-positive-text shrink-0 mt-0.5" />
                    <span className="text-primary font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-ui/15 text-xs text-muted flex items-center justify-between">
                <span>Lab access in Nagercoil</span>
                <span className="text-positive-text font-semibold">Live Mentor Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Track Finder Quiz */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-positive-text">
              Interactive Tool
            </span>
            <h3 className="text-2xl font-bold text-primary">
              Not Sure Which Track Fits You Best?
            </h3>
            <p className="text-sm text-muted">
              Answer 4 quick questions and get an instant personalized recommendation.
            </p>
          </div>
          <TrackFinder />
        </div>
      </div>
    </section>
  );
}

export default TracksSection;
