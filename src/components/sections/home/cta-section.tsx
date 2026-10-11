import React from "react";
import { Badge } from "@/components/ui/badge";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/content/site";
import { MessageCircle, Phone, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-bg relative overflow-hidden" id="apply">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest/10 dark:bg-forest/25 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-border-soft bg-bg-elev p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Conversion Pitch */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="mint">Limited Cohort Seats</Badge>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text leading-tight">
                Your Tech Career Starts in <span className="text-accent-text">Nagercoil</span>.
              </h2>

              <p className="text-base text-text-muted leading-relaxed">
                Take the first step today. Apply for our upcoming cohort or book a zero-pressure career consultation with our lead technical mentor.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-text font-medium">
                  <CheckCircle2 className="h-5 w-5 text-positive-text shrink-0" />
                  <span>₹0 upfront fee for eligible Pay After Placement tracks</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text font-medium">
                  <CheckCircle2 className="h-5 w-5 text-positive-text shrink-0" />
                  <span>Personalized 1-on-1 career path guidance</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text font-medium">
                  <CheckCircle2 className="h-5 w-5 text-positive-text shrink-0" />
                  <span>In-person physical lab in Nagercoil + live online options</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border-soft flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
                >
                  <Phone className="h-4 w-4 text-saffron" />
                  <span>Direct Call: {siteConfig.contact.displayPhone}</span>
                </a>
                <span className="hidden sm:inline text-text-muted/30">•</span>
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-positive-text hover:underline font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Quick WhatsApp Query</span>
                </a>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border-soft bg-bg p-6 sm:p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-text mb-1">
                  Book Free Career Counselling
                </h3>
                <p className="text-xs text-text-muted mb-6">
                  Fill in your details below and our team will get in touch within 24 hours.
                </p>
                <LeadForm source="home-bottom-cta-card" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
