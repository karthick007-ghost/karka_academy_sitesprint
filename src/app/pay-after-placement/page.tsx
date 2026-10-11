import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileText,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pay After Placement (PAP) Model",
  description:
    "Learn with ₹0 upfront tuition fees at Karka AI & Tech Academy in Nagercoil. Transparent ₹40,000 flat placement fee due only after accepting an official tech offer.",
};

export default function PayAfterPlacementPage() {
  const steps = [
    {
      num: "01",
      title: "Entrance Aptitude Screening",
      desc: "A basic logic, motivation, and analytical thinking evaluation. No prior coding background is required.",
    },
    {
      num: "02",
      title: "16 Weeks of Intensive Sprints",
      desc: "30 hours per week committed to live mentorship, daily hands-on lab programming, and commercial client sprints.",
    },
    {
      num: "03",
      title: "Agile Tribers Client Deliverables",
      desc: "Internship on production software products. You graduate with verifiable GitHub commits and code reviews.",
    },
    {
      num: "04",
      title: "Placement Grooming & Mock Drills",
      desc: "Comprehensive ATS resume audits, LinkedIn overhaul, and rigorous mock technical interview simulations.",
    },
    {
      num: "05",
      title: "Official Job Offer & Fixed ₹40k Fee",
      desc: `Upon receiving and accepting an official verifiable software job offer, you settle our flat fee of ${siteConfig.papTermsAtAGlance.placementFee}.`,
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="rounded-3xl border border-white/10 bg-night-2 p-8 sm:p-12 lg:p-16 shadow-glass text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="mint">Zero Financial Burden Upfront</Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-night-text leading-tight">
            Learn First. <span className="text-saffron">Pay When Hired.</span>
          </h1>

          <p className="text-base sm:text-lg text-night-muted leading-relaxed max-w-2xl mx-auto">
            We believe talent is universal, but upfront tuition capital is not. Karka Academy's Pay After Placement model eliminates financial anxiety so you can focus entirely on mastering engineering.
          </p>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-left">
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Upfront Tuition</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-mint mt-1">₹0</div>
              <span className="text-[11px] text-night-muted">Start with ₹0 risk</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Placement Fee</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-saffron mt-1">₹40,000</div>
              <span className="text-[11px] text-night-muted">Flat fixed fee</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Commitment</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-night-text mt-1">30 hrs/wk</div>
              <span className="text-[11px] text-night-muted">Rigorous lab drills</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-night-3/60 p-4">
              <span className="text-xs font-semibold text-night-muted uppercase">Third-Party Loan</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-mint mt-1">Zero</div>
              <span className="text-[11px] text-night-muted">No NBFC loan liability</span>
            </div>
          </div>
        </div>

        {/* 5-Step Roadmap */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="saffron">The Student Journey</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              How the PAP Agreement Works Step-by-Step
            </h2>
            <p className="text-sm text-night-muted">
              Clear expectations from day one with zero ambiguous clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-3xl border border-white/10 bg-night-2 p-6 flex flex-col justify-between shadow-glass"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-saffron/70">
                    {s.num}
                  </span>
                  <h3 className="font-display text-base font-bold text-night-text mt-3 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-night-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transparent Comparison Table */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="mint">Radical Transparency</Badge>
            <h2 className="font-display text-3xl font-bold text-night-text">
              How Karka PAP Differs from Other Bootcamps & ISAs
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 shadow-glass overflow-x-auto">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-night-muted">
                  <th className="py-4 px-4">Feature</th>
                  <th className="py-4 px-4 text-mint bg-forest/20 rounded-t-xl">Karka Academy (PAP)</th>
                  <th className="py-4 px-4">Traditional Bootcamps</th>
                  <th className="py-4 px-4">Percentage ISAs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-night-text">
                <tr>
                  <td className="py-4 px-4 font-semibold">Upfront Tuition</td>
                  <td className="py-4 px-4 font-bold text-mint bg-forest/10">₹0 Upfront</td>
                  <td className="py-4 px-4 text-night-muted">₹80,000 - ₹1,50,000</td>
                  <td className="py-4 px-4 text-night-muted">₹10,000 - ₹25,000 deposit</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Total Fee Cap</td>
                  <td className="py-4 px-4 font-bold text-mint bg-forest/10">Fixed ₹40,000 flat</td>
                  <td className="py-4 px-4 text-night-muted">Entire upfront amount</td>
                  <td className="py-4 px-4 text-night-muted">15-20% salary (₹1.5L - ₹3L)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Student Loan / NBFC</td>
                  <td className="py-4 px-4 font-bold text-mint bg-forest/10">None (Direct Agreement)</td>
                  <td className="py-4 px-4 text-night-muted">Mandatory Bank / NBFC EMI</td>
                  <td className="py-4 px-4 text-night-muted">Often tied to NBFC loan</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">If You Don't Get Placed</td>
                  <td className="py-4 px-4 font-bold text-mint bg-forest/10">You Pay ₹0 Tuition</td>
                  <td className="py-4 px-4 text-night-muted">Fee is never refunded</td>
                  <td className="py-4 px-4 text-night-muted">Complicated waiver rules</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Commercial Client Work</td>
                  <td className="py-4 px-4 font-bold text-mint bg-forest/10">Yes (Agile Tribers)</td>
                  <td className="py-4 px-4 text-night-muted">Generic clone projects</td>
                  <td className="py-4 px-4 text-night-muted">Standard toy assignments</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Student Rights & Obligations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-mint/30 bg-night-2 p-8 shadow-glass space-y-4">
            <div className="flex items-center gap-2 text-mint font-bold">
              <CheckCircle2 className="h-5 w-5" />
              <span>What We Provide Under the Contract</span>
            </div>
            <ul className="space-y-3 text-sm text-night-muted">
              {siteConfig.papTermsAtAGlance.supportIncluded.map((inc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-mint font-bold">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-saffron/30 bg-night-2 p-8 shadow-glass space-y-4">
            <div className="flex items-center gap-2 text-saffron font-bold">
              <Clock className="h-5 w-5" />
              <span>What We Expect From You as a Student</span>
            </div>
            <ul className="space-y-3 text-sm text-night-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-saffron font-bold">•</span>
                <span>Commitment of 30 hours per week (10 live + 10 lab + 10 homework)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-saffron font-bold">•</span>
                <span>Minimum 90% attendance in lectures and practical lab drills</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-saffron font-bold">•</span>
                <span>Timely completion of Agile Tribers client sprint milestones</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-saffron font-bold">•</span>
                <span>Professional conduct and participation in scheduled job interviews</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Application CTA Card */}
        <section className="rounded-3xl border border-white/15 bg-night-2 p-8 sm:p-12 shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="mint">Apply with ₹0 Upfront</Badge>
              <h3 className="font-display text-3xl font-bold text-night-text">
                Take the Next Step Towards Placement
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                Submit your details to schedule your entrance aptitude conversation with our admissions mentor in Nagercoil.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-night-1 p-6 shadow-glass">
                <LeadForm
                  defaultTrack="fullstack"
                  defaultAudience="graduate"
                  source="pap-page-apply"
                  compact
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
