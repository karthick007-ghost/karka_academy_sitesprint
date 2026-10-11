import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { realClientProjects } from "@/content/projects";
import { ArrowRight, Code2, Layers, CheckCircle2 } from "lucide-react";

export function InternshipsSection() {
  return (
    <section className="py-20 bg-night-1 relative overflow-hidden" id="internships">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="mint">Agile Tribers Client Sprints</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night-text">
            No Toy Projects. Real Client Code.
          </h2>
          <p className="text-base sm:text-lg text-night-muted leading-relaxed">
            Every learner at Karka Academy ships commercial features for live software products through Agile Tribers. Your GitHub will show production-ready engineering, not generic clones.
          </p>
        </div>

        {/* 3 Projects Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {realClientProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 flex flex-col justify-between shadow-glass hover:border-mint/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-mint uppercase tracking-wider">
                    {project.client}
                  </span>
                  <span className="rounded-pill bg-white/5 px-2.5 py-1 text-[11px] font-medium text-night-muted">
                    {project.impact}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-night-text">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-night-muted leading-relaxed">
                  {project.description}
                </p>

                {/* What Interns Built */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-night-muted block mb-2">
                    Intern Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-night-text/90">
                    {project.internDeliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-mint shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-night-3 px-2 py-0.5 text-[10px] font-mono text-night-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/internships">
            <Button variant="outline" size="lg">
              <span>Explore Internship Structure & Case Studies</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
