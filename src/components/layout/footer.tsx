import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { careerTracks } from "@/content/tracks";
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev pt-16 pb-28 md:pb-16 text-text">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-elev border border-ui/20 shadow-sm">
                <span className="font-tamil text-xl font-bold text-accent">க</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-text">
                  KARKA <span className="text-positive-text font-mono text-sm">AI</span>
                </span>
                <span className="text-[11px] font-medium tracking-wider uppercase text-text-muted">
                  Tech Academy • Nagercoil
                </span>
              </div>
            </Link>

            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              Empowering youth from Tier 2/3 towns in Tamil Nadu with cutting-edge AI, Full-Stack engineering, and verified internships. ₹0 upfront tuition on eligible placement tracks.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg-sunken text-text-muted hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="Follow Karka Academy on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg-sunken text-text-muted hover:text-mint hover:border-mint/40 transition-colors"
                aria-label="Connect with Karka Academy on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg-sunken text-text-muted hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="Visit Karka Academy on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Career Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Career Tracks
            </h4>
            <ul className="space-y-2 text-sm">
              {careerTracks.slice(0, 5).map((track) => (
                <li key={track.slug}>
                  <Link
                    href={`/courses?track=${track.slug}`}
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    {track.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text hover:underline pt-1"
                >
                  View all 37 courses →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Platforms */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Programs & Trust
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/pay-after-placement"
                  className="text-text-muted hover:text-positive-text transition-colors"
                >
                  Pay After Placement (PAP)
                </Link>
              </li>
              <li>
                <Link
                  href="/internships"
                  className="text-text-muted hover:text-text transition-colors"
                >
                  Agile Tribers Internships
                </Link>
              </li>
              <li>
                <Link
                  href="/placements"
                  className="text-text-muted hover:text-text transition-colors"
                >
                  Alumni Placements
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.platforms.infini}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors"
                >
                  <span>Infini AI Platform</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.platforms.spike}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors"
                >
                  <span>Spike AI Assessments</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Nagercoil Campus
            </h4>
            <div className="space-y-2.5 text-sm text-text-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent-text mt-0.5 shrink-0" />
                <span>
                  Karka Software Academy, Nagercoil, Kanyakumari District, Tamil Nadu 629001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-positive-text shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-text transition-colors"
                >
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-text shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-text transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-bold text-positive-text hover:underline"
                >
                  Campus map & directions →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 rounded-2xl border border-border bg-bg-sunken p-4 text-xs text-text-muted leading-relaxed">
          <strong className="text-text font-semibold">Transparency & Placement Policy: </strong>
          Karka Academy operates a clear Pay After Placement model with ₹0 upfront tuition fee for qualified students on select career tracks. We do not claim arbitrary 100% placement guarantees; placement readiness requires active participation, completing real client sprints, and maintaining regular attendance.
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} Karka AI & Tech Academy. Designed & Built for Competition Entry.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-text transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-text transition-colors">
              Contact
            </Link>
            <span className="text-text-muted/40">•</span>
            <span className="text-positive-text font-medium">Original Work by Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
