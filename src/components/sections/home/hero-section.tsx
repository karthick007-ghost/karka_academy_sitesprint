"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroPoster } from "@/components/three/hero-poster";
import { useCapability } from "@/lib/capability";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";
import { ArrowRight, Sparkles, CheckCircle2, PhoneCall } from "lucide-react";

// Lazy load 3D scene only on capable client devices
const LazyHeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <HeroPoster />,
  }
);

export function HeroSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { canRender3D, isReady } = useCapability();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest/20 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-[300px] h-[300px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tamil Hook & Trust Pill */}
            <div className="inline-flex items-center gap-2 rounded-pill border border-saffron/30 bg-saffron/10 px-4 py-1.5 backdrop-blur-md">
              <span className="font-tamil font-bold text-saffron text-sm">கற்க</span>
              <span className="text-white/20">•</span>
              <span className="text-xs font-semibold text-night-text uppercase tracking-wider">
                Learn First. Pay When Hired.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-night-text leading-[1.1]">
              Launch Your <span className="text-saffron">AI & Tech Career</span> from Nagercoil.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-night-muted max-w-2xl leading-relaxed">
              Master Full-Stack Engineering, Generative AI, and Data Science through live client sprints at Agile Tribers. Zero upfront tuition on eligible Pay After Placement tracks.
            </p>

            {/* Key Value Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-night-text/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                <span>₹0 tuition until you land an offer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                <span>Live commercial client sprints</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                <span>30 hrs/week hands-on lab mentoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                <span>Physical campus in Nagercoil + Online</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="primary" size="lg" className="shadow-glow font-bold text-base">
                    <PhoneCall className="h-5 w-5 mr-2" />
                    <span>Book Free Career Counselling</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Talk to an Admissions Mentor</DialogTitle>
                    <DialogDescription>
                      Get unbiased guidance on whether Full-Stack, AI, or Design matches your goals.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm
                    source="hero-primary-cta"
                    onSuccess={() => setTimeout(() => setDialogOpen(false), 2500)}
                    compact
                  />
                </DialogContent>
              </Dialog>

              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
                  <span>Explore 37 Courses</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Footnote */}
            <p className="text-xs text-night-muted pt-1">
              Next batch starts soon at Nagercoil campus • Limited seats per cohort
            </p>
          </div>

          {/* Right Column: 3D Scene or High-fidelity Fallback Poster */}
          <div className="lg:col-span-5 flex justify-center items-center">
            {isReady && canRender3D ? (
              <LazyHeroScene />
            ) : (
              <HeroPoster />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
