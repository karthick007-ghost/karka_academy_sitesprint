import React from "react";
import { StatCounter } from "@/components/ui/stat-counter";
import { HiringPartnersMarquee } from "./hiring-partners-marquee";

export function ProofBar() {
  const stats = [
    { value: "₹0", label: "Upfront Tuition", sublabel: "Pay when hired on PAP tracks" },
    { value: "30 hrs", label: "Weekly Commitment", sublabel: "Live labs + sprint assignments" },
    { value: "37", label: "In-Demand Courses", sublabel: "From GenAI to Full-Stack" },
    { value: "100%", label: "Real Client Sprints", sublabel: "Via Agile Tribers live tech stack" },
  ];

  return (
    <section
      className="border-y border-ui/15 bg-elev py-10 relative overflow-hidden"
      aria-label="Placement Proof and Key Metrics"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl border border-ui/15 bg-sunken backdrop-blur-sm transition-all hover:border-accent/40 shadow-sm"
            >
              <StatCounter
                value={s.value}
                label={s.label}
                description={s.sublabel}
                className="items-center"
              />
            </div>
          ))}
        </div>

        {/* Professional Moving Alumni Hiring Partners Marquee (Left to Right) */}
        <div className="mt-10 pt-8 border-t border-ui/15 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5">
            Alumni Hired Across Renowned Technology Teams (Verified Records)
          </p>
          <HiringPartnersMarquee />
        </div>
      </div>
    </section>
  );
}

export default ProofBar;
