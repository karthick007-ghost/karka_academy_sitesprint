import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { LeadForm } from "@/components/forms/lead-form";
import { Phone, Mail, MapPin, MessageCircle, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Campus & Admissions",
  description:
    "Get in touch with Karka AI & Tech Academy in Nagercoil. Call +91 94875 30243, chat on WhatsApp, or visit our physical campus in Kanyakumari District.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-night-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="mint">We're Here in Nagercoil</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-night-text">
            Get in Touch with Admissions
          </h1>
          <p className="text-base sm:text-lg text-night-muted leading-relaxed">
            Whether you want to drop by our software lab, discuss our Pay After Placement model, or ask about batch timings, our admissions mentors are ready to assist.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Channel 1: Phone */}
          <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 flex flex-col justify-between shadow-glass space-y-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest border border-white/10 text-mint mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-night-text">Phone Call</h3>
              <p className="text-xs text-night-muted mt-1">
                Mon - Sat, 9:00 AM - 7:00 PM IST
              </p>
              <div className="mt-4 text-lg font-bold text-saffron">
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:underline">
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-xs font-bold text-mint hover:underline inline-flex items-center gap-1"
              >
                <span>Call admissions office →</span>
              </a>
            </div>
          </div>

          {/* Channel 2: WhatsApp */}
          <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 flex flex-col justify-between shadow-glass space-y-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-night-text">WhatsApp Direct</h3>
              <p className="text-xs text-night-muted mt-1">
                Quickest way to ask quick questions or syllabus PDFs
              </p>
              <div className="mt-4 text-sm font-semibold text-night-text">
                Instant chat with mentor
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#25D366] text-xs font-bold text-white transition hover:bg-[#20ba59] shadow-md"
              >
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Channel 3: Email */}
          <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 flex flex-col justify-between shadow-glass space-y-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest border border-white/10 text-saffron mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-night-text">Email Inquiries</h3>
              <p className="text-xs text-night-muted mt-1">
                For corporate partnerships & university outreach
              </p>
              <div className="mt-4 text-sm font-bold text-night-text">
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-xs font-bold text-saffron hover:underline inline-flex items-center gap-1"
              >
                <span>Send us an email →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Campus Location & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Campus Info & Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-night-2 p-6 sm:p-8 shadow-glass space-y-4">
              <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                <MapPin className="h-5 w-5" />
                <span>Nagercoil Main Campus</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-night-text">
                Visit Our Physical Lab
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                Karka Software Academy, Nagercoil, Kanyakumari District, Tamil Nadu 629001, India.
              </p>
              <div className="pt-2 text-xs text-night-muted space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-mint" />
                  <span>Lab Hours: Monday to Saturday, 9:00 AM – 7:30 PM</span>
                </div>
                <div>Walk-in campus visits welcomed; prior appointment recommended.</div>
              </div>

              {/* Map Container */}
              <div className="mt-6 aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-night-3 relative">
                <iframe
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karka Academy Nagercoil Location Map"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/15 bg-night-2 p-6 sm:p-8 shadow-glass">
              <h3 className="font-display text-2xl font-bold text-night-text mb-2">
                Send an Admissions Message
              </h3>
              <p className="text-xs text-night-muted mb-6">
                Fill out the form below. An admissions counselor will respond within 24 hours.
              </p>
              <LeadForm source="contact-page-form" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
