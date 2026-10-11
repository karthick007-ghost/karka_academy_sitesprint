import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { KolamHeader } from "@/components/ornament/kolam";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Campus & Admissions | Karka AI Academy",
  description:
    "Get in touch with Karka AI & Tech Academy in Nagercoil. Call +91 94875 30243, chat on WhatsApp, or visit our physical software lab in Kanyakumari District, Tamil Nadu.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-base text-primary transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* =================================================================
            1. HERO SECTION (SEMANTIC TOKENS & KOLAM HEADER)
           ================================================================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <KolamHeader tamilWord="கற்க" label="Admissions & Campus Office" />
          <Badge variant="mint">Physical Lab in Nagercoil</Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Connect with Our <span className="text-accent-text">Mentors</span>
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Whether you want to drop by our software lab, discuss the Pay After Placement model, or review curriculum syllabus, our engineering mentors are available to assist you.
          </p>
        </section>

        {/* =================================================================
            2. THREE CONTACT CHANNELS
           ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Channel 1: Phone */}
          <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200 space-y-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-positive-text/15 border border-positive-text/25 text-positive-text mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">Direct Phone Call</h3>
              <p className="text-xs text-muted mt-1">
                Mon - Sat, 9:00 AM - 7:00 PM IST
              </p>
              <div className="mt-4 text-xl font-extrabold text-primary">
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:underline">
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-ui/10">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-xs font-bold text-positive-text hover:underline inline-flex items-center gap-1"
              >
                <span>Call admissions office →</span>
              </a>
            </div>
          </div>

          {/* Channel 2: WhatsApp */}
          <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:border-positive-text/50 transition-all duration-200 space-y-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-positive-text/15 border border-positive-text/25 text-positive-text mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">WhatsApp Admissions</h3>
              <p className="text-xs text-muted mt-1">
                Fastest channel for syllabus & batch queries
              </p>
              <div className="mt-4 text-xl font-extrabold text-positive-text">
                Instant Chat
              </div>
            </div>
            <div className="pt-4 border-t border-ui/10">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-positive-text hover:underline inline-flex items-center gap-1"
              >
                <span>Chat on WhatsApp →</span>
              </a>
            </div>
          </div>

          {/* Channel 3: Campus Lab */}
          <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all duration-200 space-y-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/15 border border-ui/15 text-accent-text mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">Physical Software Lab</h3>
              <p className="text-xs text-muted mt-1">
                {siteConfig.contact.city}, {siteConfig.contact.district}
              </p>
              <div className="mt-4 text-sm font-semibold text-primary">
                {siteConfig.contact.state}, {siteConfig.contact.country}
              </div>
            </div>
            <div className="pt-4 border-t border-ui/10">
              <a
                href="https://maps.google.com/?q=Karka+Software+Academy+Nagercoil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-accent-text hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Google Maps →</span>
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. TWO-COLUMN: GLASS CONTACT FORM & CAMPUS LAB MAP
           ================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Glass Lead Form */}
          <div className="lg:col-span-6 rounded-3xl border border-ui/15 bg-elev p-6 sm:p-10 shadow-subtle space-y-6">
            <div>
              <Badge variant="saffron">Admissions Inquiry</Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-2">
                Send an Admissions Message
              </h2>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                Fill in your details below and a mentor will get back to you within 24 business hours to discuss tracks and schedule your aptitude evaluation.
              </p>
            </div>

            <div className="rounded-2xl border border-ui/15 bg-sunken p-6 shadow-sm">
              <LeadForm source="contact-page" />
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-muted">
              <ShieldCheck className="h-4 w-4 text-positive-text shrink-0" />
              <span>Your contact details are strictly kept private and never shared with third parties.</span>
            </div>
          </div>

          {/* Right Column: Campus Details & Embedded Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Campus Info Card */}
            <div className="rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 shadow-subtle space-y-4">
              <div className="flex items-center gap-2 text-accent-text font-bold">
                <Clock className="h-5 w-5" />
                <span>Lab Visiting Hours</span>
              </div>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex justify-between py-1 border-b border-ui/10">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-primary">9:00 AM - 7:00 PM IST</span>
                </div>
                <div className="flex justify-between py-1 border-b border-ui/10">
                  <span>Saturday</span>
                  <span className="font-semibold text-primary">10:00 AM - 5:00 PM IST</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sunday</span>
                  <span className="text-muted italic">Closed (Lab projects only)</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Container */}
            <div className="rounded-3xl border border-ui/15 bg-elev p-4 shadow-subtle overflow-hidden">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-sunken">
                <iframe
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  title="Karka AI & Tech Academy Campus Location in Nagercoil"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map showing Karka Academy location in Nagercoil"
                />
              </div>

              <div className="mt-4 flex items-center justify-between px-2 text-xs text-muted">
                <span>Latitude: {siteConfig.contact.geo.lat}, Longitude: {siteConfig.contact.geo.lng}</span>
                <a
                  href="https://maps.google.com/?q=Karka+Software+Academy+Nagercoil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-accent-text hover:underline inline-flex items-center gap-1"
                >
                  <span>Directions</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
