"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Course } from "@/content/schema";
import { CareerTrack } from "@/content/tracks";
import { Button } from "@/components/ui/button";
import { SlidingPillNav, type SlidingPillItem } from "@/components/motion/sliding-pill";
import { CourseCard } from "./course-card";
import { Search, Sparkles, XCircle } from "lucide-react";

interface CourseCatalogProps {
  initialCourses: Course[];
  tracks: CareerTrack[];
  initialTrack?: string;
}

export function CourseCatalog({ initialCourses, tracks, initialTrack }: CourseCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>(initialTrack ?? "all");
  const [papOnly, setPapOnly] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to auto-focus the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const clearFilters = () => {
    setSearch("");
    setSelectedTrack("all");
    setPapOnly(false);
  };

  // Build pill items for SlidingPillNav
  const trackPillItems: SlidingPillItem<string>[] = useMemo(() => {
    const allItem: SlidingPillItem<string> = {
      id: "all",
      label: `All Tracks (${initialCourses.length})`,
    };
    const trackItems = tracks
      .map((t) => {
        const count = initialCourses.filter((c) => c.track === t.slug).length;
        if (count === 0) return null;
        return {
          id: t.slug,
          label: `${t.title} (${count})`,
        };
      })
      .filter(Boolean) as SlidingPillItem<string>[];

    return [allItem, ...trackItems];
  }, [initialCourses, tracks]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Glass Toolbar */}
      <div className="rounded-3xl border border-border-soft bg-bg-elev p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box with '/' Focus Shortcut */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by skill, topic, or technology (e.g. React, Python, Figma)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border-soft bg-bg-sunken pl-10 pr-20 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1 rounded bg-bg px-1.5 py-0.5 text-[10px] font-mono font-bold text-text-muted border border-border-soft">
              <span>/</span>
            </div>
          </div>

          {/* PAP Toggle */}
          <button
            type="button"
            onClick={() => setPapOnly(!papOnly)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition border ${
              papOnly
                ? "bg-positive-text/15 border-positive-text text-positive-text shadow-sm"
                : "bg-bg-sunken border-border-soft text-text-muted hover:text-text"
            }`}
          >
            <Sparkles className="h-4 w-4 text-positive-text" />
            <span>Pay After Placement (₹0 Upfront) Only</span>
          </button>
        </div>

        {/* Track Filter Sliding Pills with Burgundy Ambient Spray */}
        <div className="relative pt-2 border-t border-border-soft overflow-x-auto pb-1 scrollbar-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] h-[90px] bg-[radial-gradient(ellipse_at_center,rgba(114,32,48,0.28)_0%,rgba(114,32,48,0.08)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(226,125,144,0.28)_0%,rgba(226,125,144,0.08)_50%,transparent_75%)] blur-xl pointer-events-none -z-10"
            aria-hidden="true"
          />
          <SlidingPillNav
            items={trackPillItems}
            activeId={selectedTrack}
            onChange={setSelectedTrack}
            layoutId="course-catalog-track-nav"
            label="Filter Courses by Career Track"
          />
        </div>
      </div>

      {/* Results Count & Clear Button */}
      <div className="flex items-center justify-between text-xs text-text-muted px-1">
        <span>Showing {filteredCourses.length} of {initialCourses.length} courses</span>
        {(search || selectedTrack !== "all" || papOnly) && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-saffron-ink dark:text-saffron hover:underline font-bold"
          >
            <XCircle className="h-3.5 w-3.5" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        /* Empty State with One-Click Reset Button */
        <div className="rounded-3xl border border-border-soft bg-bg-elev p-12 text-center shadow-sm space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10 text-saffron mb-2">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="font-display text-xl font-bold text-text">No courses found</h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            We couldn't find any courses matching your current search or filter combination.
          </p>
          <Button
            magnetic
            variant="primary"
            size="md"
            onClick={clearFilters}
            className="mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default CourseCatalog;
