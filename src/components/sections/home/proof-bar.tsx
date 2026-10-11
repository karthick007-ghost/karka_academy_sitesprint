import React from "react";
import { siteConfig } from "@/content/site";

export function ProofBar() {
  const stats = [
    { value: "₹0", label: "Upfront Tuition", sublabel: "Pay when hired on PAP tracks" },
    { value: "30 hrs", label: "Weekly Commitment", sublabel: "Live labs + sprint assignments" },
    { value: "37", label: "In-Demand Courses", sublabel: "From GenAI to Full-Stack" },
    { value: "100%", label: "Real Client Sprints", sublabel: "Via Agile Tribers live tech stack" },
  ];

  return (
    <section className="border-y border-white/10 bg-night-2 py-10 relative overflow-hidden" aria-label="Placement Proof and Key Metrics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-2xl border border-white/5 bg-night-3/50 backdrop-blur-sm">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-saffron tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-bold text-night-text">{s.label}</div>
              <div className="mt-0.5 text-xs text-night-muted">{s.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Plain Text Alumni Hiring Partners Bar (Zero Third-Party Logos) */}
        <div className="mt-10 pt-8 border-t border-white/10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-night-muted mb-4">
            Alumni Hired Across Renowned Technology Teams (Verified Records)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {siteConfig.hiringPartnerNames.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-pill border border-white/10 bg-night-3 px-4 py-2 text-xs sm:text-sm font-semibold text-night-text hover:border-mint/40 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
