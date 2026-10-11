"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";
import { Check, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export function PapSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Enroll with ₹0 Upfront",
      desc: "Clear our entrance aptitude screening. Zero initial tuition fee to start your full-stack journey.",
    },
    {
      num: "02",
      title: "Intensive 30 hrs/wk Sprints",
      desc: "10 hours of live mentorship, 10 hours of hands-on lab code, and 10 hours of client project deliverables at Agile Tribers.",
    },
    {
      num: "03",
      title: "Pay Only When Hired",
      desc: `A single fixed fee of ${siteConfig.papTermsAtAGlance.placementFee} is due only after you receive and accept your verifiable employment offer.`,
    },
  ];

  return (
    <section className="py-20 bg-base relative overflow-hidden" id="pap-model">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="mint">Zero Upfront Risk</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Learn First. Pay When Hired.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            We invest our time, mentors, and infrastructure in your growth. You don’t owe tuition until you successfully enter the software industry.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-3xl border border-ui/15 bg-elev p-8 shadow-sm hover:border-accent/40 transition-all duration-300"
            >
              <span className="font-mono text-3xl font-extrabold text-accent-text">
                {step.num}
              </span>
              <h3 className="mt-4 text-xl font-bold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Bento Card: Traditional Bootcamps vs Karka PAP */}
        <div className="mt-12 rounded-3xl border border-ui/15 bg-elev p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Transparent PAP Contract Terms */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-positive-text font-semibold text-sm">
                <ShieldCheck className="h-5 w-5" />
                <span>Transparent Contract Terms</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                How Our ₹0 Tuition Model Protects You
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Traditional institutes demand high fees before you write a single line of code. We align our incentives with your success.
              </p>

              <div className="space-y-3 pt-2">
                {siteConfig.papTermsAtAGlance.supportIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-primary font-medium">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-positive-text/15 text-positive-text border border-positive-text/25 shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button magnetic variant="primary" size="lg" className="shadow-subtle font-bold">
                      <Sparkles className="h-4 w-4 mr-2" />
                      <span>Apply for PAP Track</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Apply for Pay After Placement</DialogTitle>
                      <DialogDescription>
                        Complete this brief application to book an admissions aptitude interview.
                      </DialogDescription>
                    </DialogHeader>
                    <LeadForm
                      source="pap-section-apply"
                      defaultTrack="fullstack"
                      onSuccess={() => setTimeout(() => setDialogOpen(false), 2500)}
                      compact
                    />
                  </DialogContent>
                </Dialog>

                <Link href="/pay-after-placement">
                  <Button magnetic variant="outline" size="lg">
                    <span>Full Policy Details</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Side-by-Side Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-ui/15 bg-sunken p-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Traditional Bootcamps
                </span>
                <div className="text-2xl font-bold text-muted">₹80k - ₹1.5L</div>
                <div className="space-y-2 text-xs text-muted">
                  <div>✕ Upfront risk before learning</div>
                  <div>✕ Heavy EMI loans on student name</div>
                  <div>✕ Generic toy projects (To-Do apps)</div>
                  <div>✕ Mass 200+ batch sizes</div>
                  <div>✕ Fee kept even if not placed</div>
                </div>
              </div>

              <div className="rounded-2xl border border-positive-text/40 bg-positive-text/5 dark:bg-positive-text/10 p-6 space-y-4 shadow-sm relative">
                <div className="absolute top-3 right-3">
                  <Badge variant="mint">Karka Model</Badge>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-positive-text">
                  Karka AI Academy
                </span>
                <div className="text-3xl font-extrabold text-primary">₹0 Upfront</div>
                <div className="space-y-2 text-xs text-primary font-medium">
                  <div className="flex items-center gap-1.5 text-positive-text">
                    ✓ ₹0 tuition until placed
                  </div>
                  <div className="flex items-center gap-1.5 text-positive-text">
                    ✓ Fixed {siteConfig.papTermsAtAGlance.placementFee} flat fee
                  </div>
                  <div className="flex items-center gap-1.5 text-positive-text">
                    ✓ Agile Tribers commercial sprints
                  </div>
                  <div className="flex items-center gap-1.5 text-positive-text">
                    ✓ 1-on-1 mentor code reviews
                  </div>
                  <div className="flex items-center gap-1.5 text-positive-text">
                    ✓ Physical lab in Nagercoil
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PapSection;
