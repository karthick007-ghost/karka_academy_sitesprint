import React from "react";
import type { Metadata } from "next";
import { courses } from "@/content/courses";
import { careerTracks } from "@/content/tracks";
import { CourseCatalog } from "@/components/sections/courses/course-catalog";
import { Badge } from "@/components/ui/badge";
import { TrackFinder } from "@/components/sections/courses/track-finder";

export const metadata: Metadata = {
  title: "Career Tracks & Courses",
  description:
    "Explore 37 verified technical courses in Nagercoil. Comprehensive Full-Stack, Generative AI, Data Science, and Design programs with transparent Pay After Placement.",
};

export default function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="saffron">Verified Curriculums</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-night-text">
            All 37 Career Programs & Specializations
          </h1>
          <p className="text-base sm:text-lg text-night-muted leading-relaxed">
            From foundational programming for beginners to advanced LLM engineering and commercial client internships. Filter by your preferred track below.
          </p>
        </div>

        {/* Catalog */}
        <CourseCatalog initialCourses={courses} tracks={careerTracks} />

        {/* Embedded Finder Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <Badge variant="mint">Interactive Career Quiz</Badge>
            <h2 className="text-2xl font-bold text-night-text">
              Unsure Where To Start?
            </h2>
            <p className="text-sm text-night-muted">
              Answer 4 questions to find the track matched to your background and career aspirations.
            </p>
          </div>
          <TrackFinder />
        </div>
      </div>
    </div>
  );
}
