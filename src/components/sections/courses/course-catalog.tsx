"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Course } from "@/content/schema";
import { CareerTrack } from "@/content/tracks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, Sparkles, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

interface CourseCatalogProps {
  initialCourses: Course[];
  tracks: CareerTrack[];
  initialTrack?: string;
}

export function CourseCatalog({ initialCourses, tracks, initialTrack }: CourseCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrack ?? "all");
  const [papOnly, setPapOnly] = useState(false);

  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      // Track match
      if (selectedTrack !== "all" && course.track !== selectedTrack) {
        return false;
      }

      // PAP filter
      if (papOnly && course.track !== "fullstack") {
        return false;
      }

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesSummary = course.summary.toLowerCase().includes(q);
        const matchesTools = course.tools.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTools) {
          return false;
        }
      }

      return true;
    });
  }, [initialCourses, selectedTrack, papOnly, search]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Toolbar */}
      <div className="rounded-2xl border border-white/10 bg-night-2 p-4 sm:p-6 shadow-glass space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-night-muted" />
            <input
              type="text"
              placeholder="Search by skill, topic, or technology (e.g. React, Python, Figma)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-night-3 pl-10 pr-4 py-2.5 text-sm text-night-text placeholder:text-night-muted/50 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron transition"
            />
          </div>

          {/* PAP Toggle */}
          <button
            type="button"
            onClick={() => setPapOnly(!papOnly)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition border ${
              papOnly
                ? "bg-forest border-mint text-mint shadow-md"
                : "bg-night-3 border-white/10 text-night-muted hover:text-night-text"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Pay After Placement (₹0 Upfront) Only</span>
          </button>
        </div>

        {/* Track Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setSelectedTrack("all")}
            className={`rounded-pill px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedTrack === "all"
                ? "bg-saffron text-ink font-bold shadow-glow"
                : "bg-night-3 text-night-muted hover:text-night-text border border-white/5"
            }`}
          >
            All Tracks ({initialCourses.length})
          </button>
          {tracks.map((t) => {
            const count = initialCourses.filter((c) => c.track === t.slug).length;
            if (count === 0) return null;
            return (
              <button
                key={t.slug}
                type="button"
                onClick={() => setSelectedTrack(t.slug)}
                className={`rounded-pill px-3.5 py-1.5 text-xs font-semibold transition ${
                  selectedTrack === t.slug
                    ? "bg-saffron text-ink font-bold shadow-glow"
                    : "bg-night-3 text-night-muted hover:text-night-text border border-white/5"
                }`}
              >
                {t.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-night-muted px-1">
        <span>Showing {filteredCourses.length} of {initialCourses.length} courses</span>
        {(search || selectedTrack !== "all" || papOnly) && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedTrack("all");
              setPapOnly(false);
            }}
            className="text-saffron hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isPap = course.track === "fullstack";
            return (
              <div
                key={course.slug}
                className="rounded-3xl border border-white/10 bg-night-2 p-6 flex flex-col justify-between shadow-glass hover:border-saffron/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-saffron">
                      {course.track}
                    </span>
                    {isPap && (
                      <Badge variant="mint" className="text-[10px]">
                        PAP Eligible
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-night-text group-hover:text-saffron transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-night-muted line-clamp-3 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Modules count and duration */}
                  <div className="flex items-center gap-4 text-xs text-night-muted pt-1">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-mint" />
                      <span>{course.modules.length} Modules</span>
                    </span>
                    {course.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-saffron" />
                        <span>{course.duration}</span>
                      </span>
                    )}
                  </div>

                  {/* Tools preview */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {course.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-night-3 px-2 py-0.5 text-[10px] font-mono text-night-text/80"
                      >
                        {tool}
                      </span>
                    ))}
                    {course.tools.length > 4 && (
                      <span className="rounded-md bg-night-3 px-1.5 py-0.5 text-[10px] font-mono text-night-muted">
                        +{course.tools.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex items-center justify-between text-xs font-bold text-mint hover:text-white transition group-hover:translate-x-0.5"
                  >
                    <span>View Curriculum & Projects</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-night-2 p-12 text-center shadow-glass space-y-4">
          <p className="text-base text-night-muted">
            No courses found matching your current filter criteria.
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSearch("");
              setSelectedTrack("all");
              setPapOnly(false);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
