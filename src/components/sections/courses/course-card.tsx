"use client";

import React from "react";
import Link from "next/link";
import { Course } from "@/content/schema";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { Course3DVisual } from "./course-3d-visual";
import { Clock, BookOpen, ArrowRight } from "lucide-react";

export interface CourseCardProps {
  course: Course;
}

/**
 * High-performance 3D Perspective Course Card:
 * Wrapped in TiltCard (fine-pointer gated <= 5° with dynamic specular glare)
 * Featuring live GPU-accelerated Course3DVisual 3D motion graphics and semantic token styling.
 */
export function CourseCard({ course }: CourseCardProps) {
  const isPap = course.track === "fullstack";

  return (
    <TiltCard
      maxTilt={5}
      glare
      glareMaxOpacity={0.15}
      className="rounded-3xl border border-border-soft bg-bg-elev p-6 flex flex-col justify-between shadow-sm hover:border-accent/40 transition-all duration-300 group"
    >
      <div>
        {/* Course 3D Motion Visual Viewport Header */}
        <div className="h-44 w-full rounded-2xl bg-bg-sunken/40 border border-border-soft overflow-hidden relative flex items-center justify-center mb-4 shadow-inner">
          <Course3DVisual
            track={course.track}
            slug={course.slug}
            title={course.title}
            className="h-full w-full"
          />
        </div>

        {/* Badges & Meta */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-saffron-ink dark:text-saffron">
            {course.track}
          </span>
          {isPap && (
            <Badge variant="mint" className="text-[10px]">
              PAP Eligible
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-text group-hover:text-accent transition-colors">
          {course.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-text-muted line-clamp-3 leading-relaxed mt-2">
          {course.summary}
        </p>

        {/* Modules count and duration */}
        <div className="flex items-center gap-4 text-xs text-text-muted pt-3">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-positive-text" />
            <span>{course.modules.length} Modules</span>
          </span>
          {course.duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-saffron" />
              <span>{course.duration}</span>
            </span>
          )}
        </div>

        {/* Tools Preview */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {course.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-border-soft bg-bg-sunken px-2 py-0.5 text-[10px] font-mono text-text"
            >
              {tool}
            </span>
          ))}
          {course.tools.length > 4 && (
            <span className="rounded-md border border-border-soft bg-bg-sunken px-1.5 py-0.5 text-[10px] font-mono text-text-muted">
              +{course.tools.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="mt-6 pt-4 border-t border-border-soft">
        <Link
          href={`/courses/${course.slug}`}
          className="flex items-center justify-between text-xs font-bold text-positive-text hover:text-accent transition group-hover:translate-x-0.5"
        >
          <span>View Curriculum & Projects</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </TiltCard>
  );
}

export default CourseCard;
