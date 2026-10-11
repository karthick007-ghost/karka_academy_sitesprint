import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { PapTimeline } from "@/components/sections/pap/pap-timeline";
import { KolamHeader } from "@/components/ornament/kolam";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { verifiedFaqs } from "@/content/faqs";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  PhoneCall,
  Coins,
  ArrowRight,
  FileCheck2,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pay After Placement (PAP) Model | ₹0 Upfront Tuition",
  description:
    "Learn with ₹0 upfront tuition fees at Karka AI & Tech Academy in Nagercoil. Transparent ₹40,000 flat placement fee due only after accepting an official tech offer. Zero NBFC bank loans.",
};

export default function PayAfterPlacementPage() {
  return (
    <div className="py-12 md:py-20 bg-base text-primary transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =================================================================
            1. HERO SECTION (SEMANTIC DUAL-THEME)
           ================================================================= */}
        <section className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 lg:p-16 shadow-subtle text-center max-w-4xl mx-auto space-y-6">
          <KolamHeader tamilWord="கற்க" label="Ethical Tech Pedagogy" />

          <Badge variant="mint">Zero Upfront Financial Risk</Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Learn First. <span className="text-accent-text">Pay When Hired.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            We believe talent is universal, but upfront tuition capital is not. Karka Academy's Pay After Placement model eliminates upfront anxiety so you can focus 100% on mastering modern software engineering.
          </p>

          {/* Key Stat / Terms Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-left">
            <div className="rounded-2xl border border-ui/15 bg-sunken p-4.5 space-y-1">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Upfront Tuition</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-positive-text">₹0</div>
              <span className="text-[11px] text-muted">Zero upfront fees</span>
            </div>

            <div className="rounded-2xl border border-ui/15 bg-sunken p-4.5 space-y-1">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Placement Fee</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-accent-text">₹40,000</div>
              <span className="text-[11px] text-muted">Fixed flat cap</span>
            </div>

            <div className="rounded-2xl border border-ui/15 bg-sunken p-4.5 space-y-1">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Weekly Drill</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">30 hrs/wk</div>
              <span className="text-[11px] text-muted">10 Live + 10 Lab + 10 Code</span>
            </div>

            <div className="rounded-2xl border border-ui/15 bg-sunken p-4.5 space-y-1">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Third-Party Loan</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-positive-text">0% (None)</div>
              <span className="text-[11px] text-muted">No NBFC debt liability</span>
            </div>
          </div>

          {/* Magnetic CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a href="#apply-section">
              <Button
                variant="primary"
                size="lg"
                magnetic={true}
                className="font-bold shadow-subtle flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Book Free Career Counselling</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </a>

            <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                magnetic={true}
                className="font-semibold"
              >
                <PhoneCall className="h-4 w-4 mr-2 text-positive-text" />
                <span>WhatsApp Admissions Mentor</span>
              </Button>
            </a>
          </div>
        </section>

        {/* =================================================================
            2. STICKY SCROLL-LINKED 8-STEP TIMELINE
           ================================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="saffron">The Complete Journey</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              How the PAP Agreement Works Step-by-Step
            </h2>
            <p className="text-sm text-muted">
              Complete transparency from entrance aptitude screening through commercial internship to offer letter settlement.
            </p>
          </div>

          <PapTimeline className="py-2" />
        </section>

        {/* =================================================================
            3. RADICAL TRANSPARENCY: COMPARISON TABLE
           ================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="mint">Radical Transparency</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              How Karka PAP Differs from Bootcamps & ISAs
            </h2>
            <p className="text-sm text-muted">
              We eliminated the predatory clauses commonly found in tech training contracts.
            </p>
          </div>

          <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 shadow-subtle overflow-x-auto space-y-6">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="border-b border-ui/15 text-xs font-bold uppercase tracking-wider text-muted">
                  <th className="py-4 px-4">Feature</th>
                  <th className="py-4 px-4 text-positive-text bg-positive-text/10 rounded-t-xl font-bold">
                    Karka Academy (PAP)
                  </th>
                  <th className="py-4 px-4">Traditional Bootcamps</th>
                  <th className="py-4 px-4">Percentage ISAs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ui/10 text-primary">
                <tr>
                  <td className="py-4 px-4 font-semibold">Upfront Tuition</td>
                  <td className="py-4 px-4 font-bold text-positive-text bg-positive-text/5">
                    ₹0 Upfront
                  </td>
                  <td className="py-4 px-4 text-muted">₹80,000 - ₹1,50,000</td>
                  <td className="py-4 px-4 text-muted">₹10,000 - ₹25,000 deposit</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Total Fee Cap</td>
                  <td className="py-4 px-4 font-bold text-positive-text bg-positive-text/5">
                    Fixed ₹40,000 Flat
                  </td>
                  <td className="py-4 px-4 text-muted">Entire upfront amount</td>
                  <td className="py-4 px-4 text-muted">15-20% salary (₹1.5L - ₹3L)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Student Loan / NBFC</td>
                  <td className="py-4 px-4 font-bold text-positive-text bg-positive-text/5">
                    None (Direct Trust Agreement)
                  </td>
                  <td className="py-4 px-4 text-muted">Mandatory Bank / NBFC EMI</td>
                  <td className="py-4 px-4 text-muted">Often tied to NBFC loan</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">If You Don't Get Placed</td>
                  <td className="py-4 px-4 font-bold text-positive-text bg-positive-text/5">
                    You Pay ₹0 Tuition
                  </td>
                  <td className="py-4 px-4 text-muted">Fee is never refunded</td>
                  <td className="py-4 px-4 text-muted">Complicated waiver clauses</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Commercial Client Work</td>
                  <td className="py-4 px-4 font-bold text-positive-text bg-positive-text/5">
                    Yes (Agile Tribers Studio)
                  </td>
                  <td className="py-4 px-4 text-muted">Generic clone projects</td>
                  <td className="py-4 px-4 text-muted">Standard toy assignments</td>
                </tr>
              </tbody>
            </table>

            {/* Old-Money Burgundy Trust Note */}
            <div className="rounded-2xl border border-burgundy/20 bg-burgundy-subtle p-4 sm:p-5 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-muted">
                <strong className="text-burgundy font-semibold">Old-Money Trust Standard: </strong>
                We never touch your future monthly paycheck. The flat ₹40,000 cap is the maximum fee you ever pay, and only after your verifiable employment offer letter is accepted.
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. STUDENT RIGHTS & OBLIGATIONS
           ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-ui/15 bg-elev p-8 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-positive-text font-bold">
              <CheckCircle2 className="h-5 w-5" />
              <span>What We Provide Under the Contract</span>
            </div>
            <ul className="space-y-3 text-sm text-muted">
              {siteConfig.papTermsAtAGlance.supportIncluded.map((inc, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-positive-text font-bold">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-burgundy/20 bg-elev p-8 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-burgundy font-bold">
              <Clock className="h-5 w-5 text-burgundy" />
              <span>What We Expect From You as a Student</span>
            </div>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-burgundy font-bold">•</span>
                <span>Commitment of 30 hours per week (10 live + 10 lab practice + 10 homework)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-burgundy font-bold">•</span>
                <span>Minimum 90% attendance in lectures and practical programming sessions</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-burgundy font-bold">•</span>
                <span>Active completion of Agile Tribers commercial sprint user stories</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-burgundy font-bold">•</span>
                <span>Professional conduct and participation in scheduled partner interviews</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =================================================================
            5. FAQ SECTION (OLD-MONEY BURGUNDY & DULL IVORY)
           ================================================================= */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="burgundy">Got Questions?</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted">
              Clear answers to the most common questions about our Pay After Placement model, eligibility, and fees.
            </p>
          </div>

          <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-10 shadow-subtle">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {verifiedFaqs.map((faq, idx) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-2xl border border-ui/15 bg-sunken px-5 py-2 transition-colors hover:border-ui/40"
                >
                  <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent-text hover:no-underline py-3">
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-burgundy">
                        0{idx + 1}.
                      </span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-7 text-sm text-muted leading-relaxed pb-3">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* =================================================================
            6. APPLICATION CTA CARD WITH FORM
           ================================================================= */}
        <section id="apply-section" className="rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="mint">Apply with ₹0 Upfront</Badge>
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Take the Next Step Towards Your Tech Career
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Submit your details to schedule your entrance aptitude conversation with our admissions mentors at our physical lab in Nagercoil.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-positive-text">
                <ShieldCheck className="h-4 w-4" />
                <span>No credit card required. No NBFC loan commitments.</span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-ui/15 bg-sunken p-6 shadow-sm">
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
