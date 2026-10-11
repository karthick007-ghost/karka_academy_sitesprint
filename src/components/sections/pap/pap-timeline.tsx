"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Code2,
  Briefcase,
  Users2,
  Target,
  Sparkles,
  FileCheck2,
  Coins,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

export interface PapStep {
  step: number;
  numberStr: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  highlights: string[];
  metric?: string;
  metricLabel?: string;
}

export const PAP_STEPS: PapStep[] = [
  {
    step: 1,
    numberStr: "01",
    title: "Foundation Sprint",
    tagline: "Computational Thinking & Core Terminal",
    description:
      "Every candidate starts with essential analytical screening and computational foundations. You learn Git version control, Linux command line, and modular algorithmic decomposition with zero prior degree requirements.",
    icon: Code2,
    accentColor: "var(--saffron, #FF6A2B)",
    highlights: ["Logic & Problem Solving", "Git & Linux Terminal", "Mentor Aptitude Review"],
    metric: "Week 1-3",
    metricLabel: "Core Sprint",
  },
  {
    step: 2,
    numberStr: "02",
    title: "Expert Learning",
    tagline: "30 Hours/Week Intensive Immersion",
    description:
      "Engage in rigorous engineering practice with dedicated senior mentors in our physical Nagercoil lab. The curriculum blends 10 hours of live instruction, 10 hours of hands-on lab code drills, and 10 hours of project milestones every week.",
    icon: Clock,
    accentColor: "var(--mint, #7BE0AD)",
    highlights: ["Daily Live Mentorship", "Physical Lab in Nagercoil", "Peer Pair Programming"],
    metric: "30 hrs",
    metricLabel: "Weekly Commitment",
  },
  {
    step: 3,
    numberStr: "03",
    title: "Shared Success (₹0 Upfront)",
    tagline: "Zero Tuition Risk & Zero Bank Loans",
    description:
      "We put our conviction behind your career. You pay ₹0 upfront tuition fee to attend. There are no hidden third-party NBFC loans, no debt encumbrances, and no personal bank liabilities signed in your name.",
    icon: ShieldCheck,
    accentColor: "var(--mint, #7BE0AD)",
    highlights: ["₹0 Upfront Tuition", "No NBFC Loan Liabilities", "Direct Mutual Agreement"],
    metric: "₹0",
    metricLabel: "Upfront Cost",
  },
  {
    step: 4,
    numberStr: "04",
    title: "Placement Drills",
    tagline: "System Design & Technical Mock Interviews",
    description:
      "Prepare for demanding hiring evaluations. We conduct full Data Structures & Algorithms reviews, architectural problem solving, live whiteboard simulations, and thorough ATS-optimised resume rebuilding.",
    icon: Target,
    accentColor: "var(--saffron, #FF6A2B)",
    highlights: ["DSA & Architecture", "1-on-1 Mock Drills", "ATS Resume Overhaul"],
    metric: "100%",
    metricLabel: "Interview Preparedness",
  },
  {
    step: 5,
    numberStr: "05",
    title: "Agile Tribers Commercial Internship",
    tagline: "Production Deliverables, Not Toy Projects",
    description:
      "Transition from student assignments to production software at our commercial product studio, Agile Tribers. You work alongside full-time engineers, submit pull requests, resolve QA issues, and build verifiable GitHub commits.",
    icon: Briefcase,
    accentColor: "#38BDF8",
    highlights: ["Live Client Codebases", "Verifiable GitHub Commits", "Agile Sprint Cycles"],
    metric: "Live Code",
    metricLabel: "Real Deliverables",
  },
  {
    step: 6,
    numberStr: "06",
    title: "Interview Scheduling",
    tagline: "Direct Introductions to Hiring Networks",
    description:
      "Our corporate placement cell actively introduces your portfolio to partner tech organisations, regional IT powerhouses, and pan-India engineering startups looking for pre-trained full-stack talent.",
    icon: Users2,
    accentColor: "var(--saffron, #FF6A2B)",
    highlights: ["Direct Partner Referrals", "Coordinated Interview Slots", "HR Salary Strategy"],
    metric: "8+ Partners",
    metricLabel: "Active Hiring Pool",
  },
  {
    step: 7,
    numberStr: "07",
    title: "Offer Letter Accepted",
    tagline: "Your Engineering Career Begins",
    description:
      "You receive, evaluate, and accept an official, verifiable software employment offer letter. The milestone is only reached when you formally sign your employment contract.",
    icon: FileCheck2,
    accentColor: "var(--mint, #7BE0AD)",
    highlights: ["Official Tech Job Offer", "Verified Employment Contract", "Milestone Reached"],
    metric: "Hired!",
    metricLabel: "Career Launch",
  },
  {
    step: 8,
    numberStr: "08",
    title: "Fixed ₹40k Flat Placement Fee",
    tagline: "Transparent, Capped & Settled",
    description:
      "Once you are hired and receive your compensation, you settle our flat fee of ₹40,000. Unlike traditional Income Share Agreements (ISAs) that deduct 15–20% of your earnings for years, our fee is completely capped and transparent.",
    icon: Coins,
    accentColor: "var(--saffron, #FF6A2B)",
    highlights: ["Fixed ₹40,000 Flat Fee", "0% Future Salary Deduction", "Zero Ongoing Royalties"],
    metric: "₹40,000",
    metricLabel: "Flat Total Cap",
  },
];

export interface PapTimelineProps {
  className?: string;
  onApplyClick?: () => void;
}

export function PapTimeline({ className, onApplyClick }: PapTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const prefersReduced = usePrefersReducedMotion();

  // Scroll Progress linking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Detect which step is active via IntersectionObserver
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stepElements = container.querySelectorAll<HTMLElement>("[data-pap-step]");
    if (stepElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.getAttribute("data-pap-step"));
            if (!Number.isNaN(stepIndex)) {
              setActiveStep(stepIndex);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    stepElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(`[data-pap-step="${index}"]`);
    if (target) {
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
    }
  };

  const currentStepData = PAP_STEPS[activeStep] || PAP_STEPS[0];

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12", className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* ===================================================================
            LEFT COLUMN: STICKY PROGRESS & SUMMARY DASHBOARD (Desktop)
           =================================================================== */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 shadow-subtle backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-ui/15 pb-4">
                <Badge variant="mint">PAP Contract Journey</Badge>
                <div className="font-mono text-sm font-bold text-accent-text">
                  Step 0{activeStep + 1} / 0{PAP_STEPS.length}
                </div>
              </div>

              {/* Dynamic Active Step Announcement */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Active Milestone
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                  {currentStepData.title}
                </h3>
                <p className="text-sm font-medium text-accent-text">
                  {currentStepData.tagline}
                </p>
              </div>

              {/* Interactive Mini-Stepper */}
              <div className="mt-6 pt-4 border-t border-ui/15">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted block mb-3">
                  8-Stage Verification Track
                </span>
                <div className="relative">
                  {/* Burgundy paint spray behind mini-stepper tabs */}
                  <div
                    className="absolute -inset-2.5 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(114,32,48,0.32)_0%,rgba(114,32,48,0.10)_50%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(226,125,144,0.30)_0%,rgba(226,125,144,0.10)_50%,transparent_75%)] blur-lg pointer-events-none -z-10"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5" role="tablist" aria-label="Step navigation">
                    {PAP_STEPS.map((step, idx) => {
                      const isPassed = idx < activeStep;
                      const isCurrent = idx === activeStep;

                      return (
                        <button
                          key={step.step}
                          type="button"
                          role="tab"
                          aria-selected={isCurrent}
                          aria-label={`Jump to Step ${step.step}: ${step.title}`}
                          onClick={() => scrollToStep(idx)}
                          className={cn(
                            "flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 border",
                            isCurrent
                              ? "bg-accent text-on-accent border-accent shadow-sm scale-105"
                              : isPassed
                              ? "bg-positive-text/10 text-positive-text border-positive-text/20 hover:bg-positive-text/20"
                              : "bg-sunken text-muted border-ui/15 hover:border-ui/40 hover:text-primary"
                          )}
                        >
                          <span>{step.numberStr}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Key Highlights Card - The Karka Guarantee */}
              <div className="mt-6 rounded-2xl border border-burgundy/20 bg-burgundy-subtle p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-burgundy uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-burgundy" />
                  <span className="text-burgundy font-bold">THE KARKA GUARANTEE</span>
                </div>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">Upfront Tuition</span>
                    <span className="font-bold text-positive-text">₹0 (Zero Risk)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">Placement Fee</span>
                    <span className="font-bold text-accent-text">Fixed ₹40,000 Flat</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">Third-Party Loans</span>
                    <span className="font-bold text-primary">None (No NBFCs)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">Ongoing Deductions</span>
                    <span className="font-bold text-primary">0% of salary</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onApplyClick}
                  className="w-full font-bold shadow-subtle flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Apply with ₹0 Upfront</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* ===================================================================
            RIGHT COLUMN: 8-STEP SCROLL-LINKED TIMELINE CARDS
           =================================================================== */}
        <div className="lg:col-span-7 relative">
          {/* Animated Vertical Progress Line Container */}
          <div
            className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-ui/20 -translate-x-1/2 select-none"
            aria-hidden="true"
          >
            {/* Animated drawing progress bar */}
            {!prefersReduced ? (
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-accent via-positive-text to-accent rounded-full shadow-sm"
              />
            ) : (
              <div
                style={{ height: `${((activeStep + 1) / PAP_STEPS.length) * 100}%` }}
                className="w-full bg-accent rounded-full"
              />
            )}
          </div>

          {/* Steps List */}
          <ol className="space-y-8 sm:space-y-12 list-none p-0 m-0">
            {PAP_STEPS.map((item, index) => {
              const Icon = item.icon;
              const isCurrent = activeStep === index;
              const isPassed = index < activeStep;

              return (
                <li
                  key={item.step}
                  data-pap-step={index}
                  className="relative pl-14 sm:pl-20 transition-all duration-300"
                >
                  {/* Step Node Marker on the Line */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute left-6 sm:left-8 top-6 -translate-x-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                      isCurrent
                        ? "border-accent bg-elev text-accent-text shadow-glow scale-110"
                        : isPassed
                        ? "border-positive-text bg-elev text-positive-text"
                        : "border-ui/20 bg-elev text-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors duration-200",
                        isCurrent ? "text-accent-text" : isPassed ? "text-positive-text" : "text-muted"
                      )}
                    />
                  </div>

                  {/* Step Card Container */}
                  <div
                    className={cn(
                      "transition-all duration-300",
                      isCurrent
                        ? "rounded-3xl border-2 border-accent/60 bg-elev p-6 sm:p-8 shadow-subtle ring-1 ring-accent/20"
                        : "rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 shadow-subtle hover:border-ui/40 transition-colors"
                    )}
                  >
                    {/* Header: Number, Step Title, Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl sm:text-3xl font-extrabold text-accent-text">
                          {item.numberStr}
                        </span>
                        <h4 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">
                          {item.title}
                        </h4>
                      </div>

                      {item.metric && (
                        <div className="rounded-full border border-positive-text/30 bg-positive-text/10 px-3 py-1 text-xs font-bold text-positive-text flex items-center gap-1.5">
                          <span>{item.metric}</span>
                          <span className="opacity-40">•</span>
                          <span className="text-[10px] text-muted font-normal uppercase">
                            {item.metricLabel}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="text-sm font-medium text-burgundy dark:text-burgundy mb-3">
                      {item.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Highlights Pills */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-ui/10">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ui/15 bg-sunken px-3 py-1 text-xs font-medium text-primary"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-positive-text" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default PapTimeline;
