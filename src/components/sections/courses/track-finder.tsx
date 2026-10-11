"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recommendTrack, TrackFinderAnswers, TrackRecommendation } from "@/lib/track-finder";
import { LeadForm } from "@/components/forms/lead-form";

export function TrackFinder() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Partial<TrackFinderAnswers>>({
    status: undefined,
    interest: undefined,
    codingComfort: undefined,
    goal: undefined,
  });
  const [result, setResult] = useState<TrackRecommendation | null>(null);
  const [showApplyForm, setShowApplyForm] = useState<boolean>(false);

  const handleSelect = (key: keyof TrackFinderAnswers, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate result
      const rec = recommendTrack(updated as TrackFinderAnswers);
      setResult(rec);
      setStep(5);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setShowApplyForm(false);
    setStep(1);
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-10 shadow-glass">
      {/* Quiz Progress */}
      {step <= 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-night-muted uppercase tracking-wider mb-2">
            <span>Career Finder Quiz</span>
            <span>Step {step} of 4</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-night-3 overflow-hidden">
            <div
              className="h-full bg-saffron transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
              role="progressbar"
              aria-valuenow={(step / 4) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-night-text mb-2">
            Where are you currently at in your journey?
          </h3>
          <p className="text-sm text-night-muted mb-6">
            We offer dedicated paths tailored to different stages of learning and employment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "graduate", title: "Recent Graduate", desc: "Completed degree & hunting for my first tech role" },
              { id: "college", title: "College Student", desc: "Currently pursuing B.E / B.Tech / B.Sc / BCA" },
              { id: "working", title: "Working Professional", desc: "Looking to switch into higher-paying tech careers" },
              { id: "school", title: "School Student (Grade 6-12)", desc: "Want to learn coding, logical thinking & AI" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect("status", opt.id)}
                className="flex flex-col text-left p-4 rounded-2xl border border-white/10 bg-night-3 hover:border-saffron/50 hover:bg-night-3/80 focus:outline-none focus:ring-2 focus:ring-saffron transition text-night-text"
              >
                <span className="font-semibold text-base text-night-text">{opt.title}</span>
                <span className="text-xs text-night-muted mt-1">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-night-text mb-2">
            What area of technology interests you most?
          </h3>
          <p className="text-sm text-night-muted mb-6">
            Choose what you naturally enjoy creating or exploring.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "apps", title: "Building Web & Mobile Apps", desc: "React, Node.js, databases, end-to-end fullstack" },
              { id: "data-ai", title: "Data Science & Generative AI", desc: "Python, AI models, LLMs, machine learning" },
              { id: "design", title: "UI/UX & Product Design", desc: "Figma wireframes, user journeys, visual aesthetics" },
              { id: "media", title: "Digital Media & Video Editing", desc: "Premiere, motion graphics, content storytelling" },
              { id: "marketing", title: "Growth & Digital Marketing", desc: "SEO, campaign performance, AI copy, analytics" },
              { id: "business", title: "Business Operations & Accounts", desc: "Tally ERP, GST compliance, financial workflows" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect("interest", opt.id)}
                className="flex flex-col text-left p-4 rounded-2xl border border-white/10 bg-night-3 hover:border-saffron/50 hover:bg-night-3/80 focus:outline-none focus:ring-2 focus:ring-saffron transition text-night-text"
              >
                <span className="font-semibold text-base text-night-text">{opt.title}</span>
                <span className="text-xs text-night-muted mt-1">{opt.desc}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-6 text-xs text-night-muted hover:text-night-text underline"
          >
            ← Back to previous question
          </button>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-night-text mb-2">
            How comfortable are you with programming right now?
          </h3>
          <p className="text-sm text-night-muted mb-6">
            Be completely honest — our programs are designed for all levels from scratch.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "none", title: "Total Beginner — Zero Coding Experience", desc: "Non-CS background or haven't written code before" },
              { id: "some", title: "Some Basics / Academic Exposure", desc: "Know syntax like if-else, loops in C/Java/Python" },
              { id: "comfortable", title: "Comfortable Coding", desc: "Can build simple scripts, want production-grade engineering" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect("codingComfort", opt.id)}
                className="flex flex-col text-left p-4 rounded-2xl border border-white/10 bg-night-3 hover:border-saffron/50 hover:bg-night-3/80 focus:outline-none focus:ring-2 focus:ring-saffron transition text-night-text"
              >
                <span className="font-semibold text-base text-night-text">{opt.title}</span>
                <span className="text-xs text-night-muted mt-1">{opt.desc}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-6 text-xs text-night-muted hover:text-night-text underline"
          >
            ← Back to previous question
          </button>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="animate-fade-in">
          <h3 className="text-xl sm:text-2xl font-bold text-night-text mb-2">
            What is your primary goal right now?
          </h3>
          <p className="text-sm text-night-muted mb-6">
            We will calibrate the placement model and internship intensity to match.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "first-job", title: "Land My First Tech Job", desc: "Fastest path to placement with ₹0 upfront fee" },
              { id: "switch-career", title: "Switch to Higher-Growth Tech", desc: "Transition from non-tech or BPO to core software" },
              { id: "college-skills", title: "Hands-on Internship Experience", desc: "Work on live client products while in college" },
              { id: "explore", title: "Build Cool Personal Projects", desc: "Master new tech tools and creative software" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect("goal", opt.id)}
                className="flex flex-col text-left p-4 rounded-2xl border border-white/10 bg-night-3 hover:border-saffron/50 hover:bg-night-3/80 focus:outline-none focus:ring-2 focus:ring-saffron transition text-night-text"
              >
                <span className="font-semibold text-base text-night-text">{opt.title}</span>
                <span className="text-xs text-night-muted mt-1">{opt.desc}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="mt-6 text-xs text-night-muted hover:text-night-text underline"
          >
            ← Back to previous question
          </button>
        </div>
      )}

      {/* Step 5: Result Card */}
      {step === 5 && result && (
        <div className="animate-fade-in text-left">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="saffron">Recommended For You</Badge>
            <span className="text-xs text-night-muted font-medium">Personalized Track</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-night-text">
            {result.trackTitle}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-night-muted leading-relaxed">
            {result.reason}
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-night-3 p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-night-muted block mb-3">
              Suggested Courses To Explore:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.suggestedCourseSlugs.map((cSlug) => (
                <Link
                  key={cSlug}
                  href={`/courses/${cSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-mint/30 bg-mint/10 px-3.5 py-1.5 text-xs font-semibold text-mint hover:bg-mint/20 transition"
                >
                  <span>View Syllabus</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Row */}
          {!showApplyForm ? (
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                className="shadow-glow"
                onClick={() => setShowApplyForm(true)}
              >
                Apply for this Track
              </Button>
              <Link href={`/courses`}>
                <Button variant="outline" size="lg" className="w-full">
                  Browse All 37 Courses
                </Button>
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-night-muted hover:text-night-text underline text-center sm:ml-auto py-2"
              >
                Retake Quiz
              </button>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-night-text">Apply for {result.trackTitle}</h4>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="text-xs text-night-muted hover:text-night-text underline"
                >
                  Close Form
                </button>
              </div>
              <LeadForm
                defaultTrack={result.trackSlug}
                source="track-finder-quiz"
                compact
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
