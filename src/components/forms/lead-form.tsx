"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { careerTracks } from "@/content/tracks";

export interface LeadFormProps {
  defaultTrack?: string;
  defaultAudience?: "school" | "college" | "graduate" | "switcher" | "parent" | "other";
  source?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export function LeadForm({
  defaultTrack,
  defaultAudience = "graduate",
  source = "web-lead-form",
  onSuccess,
  compact = false,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    audience: defaultAudience,
    trackInterest: defaultTrack ?? "fullstack",
    mode: "offline" as "offline" | "online",
    notes: "",
    website: "", // Honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    // Basic client checks
    if (formData.name.trim().length < 2) {
      setErrorMessage("Please enter your full name (minimum 2 characters).");
      setStatus("error");
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!/^(?:(?:\+|0{0,2})91)?[6789]\d{9}$/.test(cleanPhone)) {
      setErrorMessage("Please enter a valid 10-digit Indian phone number.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          program: formData.trackInterest || "general-inquiry",
          consent: true,
          hp: formData.website || "",
          trackSource: source,
        }),
      });

      const data = await res.json();

      if (!res.ok || (!data.ok && !data.success)) {
        setStatus("error");
        setErrorMessage(data.error || "Submission could not be completed. Please call or WhatsApp us.");
        return;
      }

      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection or connect with us on WhatsApp.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-2xl border border-mint/30 bg-forest/20 p-6 text-center shadow-glass"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mint/20 text-mint text-xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-bold text-night-text">Application Received!</h3>
        <p className="mt-2 text-sm text-night-muted">
          Our admissions mentor in Nagercoil will connect with you within 24 hours on WhatsApp or call.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-pill bg-[#25D366] px-5 text-sm font-bold text-white transition hover:bg-[#20ba59]"
          >
            Chat with Mentor on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormData({
                name: "",
                phone: "",
                audience: defaultAudience,
                trackInterest: defaultTrack ?? "fullstack",
                mode: "offline",
                notes: "",
                website: "",
              });
            }}
            className="text-xs text-night-muted hover:text-night-text underline py-2"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot field (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-field">Leave this empty</label>
        <input
          type="text"
          id="website-field"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-saffron/40 bg-saffron/10 p-3 text-sm text-saffron font-medium"
        >
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="lead-name" className="block text-xs font-semibold uppercase tracking-wider text-night-muted mb-1.5">
          Full Name <span className="text-saffron">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          required
          placeholder="e.g. Anand Kumar"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-night-3 px-4 py-3 text-sm text-night-text placeholder:text-night-muted/50 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron transition"
        />
      </div>

      <div>
        <label htmlFor="lead-phone" className="block text-xs font-semibold uppercase tracking-wider text-night-muted mb-1.5">
          WhatsApp / Phone Number <span className="text-saffron">*</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          required
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-night-3 px-4 py-3 text-sm text-night-text placeholder:text-night-muted/50 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-audience" className="block text-xs font-semibold uppercase tracking-wider text-night-muted mb-1.5">
            Who are you?
          </label>
          <select
            id="lead-audience"
            value={formData.audience}
            onChange={(e) =>
              setFormData({
                ...formData,
                audience: e.target.value as "school" | "college" | "graduate" | "switcher" | "parent" | "other",
              })
            }
            className="w-full rounded-xl border border-white/10 bg-night-3 px-3 py-3 text-sm text-night-text focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron transition"
          >
            <option value="graduate">Recent Graduate (Job Seeker)</option>
            <option value="college">College Student</option>
            <option value="switcher">Career Switcher</option>
            <option value="school">School Student / Parent</option>
            <option value="parent">Parent Inquiring for Child</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="lead-track" className="block text-xs font-semibold uppercase tracking-wider text-night-muted mb-1.5">
            Program Track
          </label>
          <select
            id="lead-track"
            value={formData.trackInterest}
            onChange={(e) => setFormData({ ...formData, trackInterest: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-night-3 px-3 py-3 text-sm text-night-text focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron transition"
          >
            {careerTracks.map((track) => (
              <option key={track.slug} value={track.slug}>
                {track.title} {track.isPayAfterPlacement ? "(PAP)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-night-muted mb-1.5">
            Preferred Training Mode
          </span>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-night-text cursor-pointer">
              <input
                type="radio"
                name="training-mode"
                value="offline"
                checked={formData.mode === "offline"}
                onChange={() => setFormData({ ...formData, mode: "offline" })}
                className="accent-saffron text-saffron focus:ring-saffron"
              />
              In-Person Lab (Nagercoil Campus)
            </label>
            <label className="flex items-center gap-2 text-sm text-night-text cursor-pointer">
              <input
                type="radio"
                name="training-mode"
                value="online"
                checked={formData.mode === "online"}
                onChange={() => setFormData({ ...formData, mode: "online" })}
                className="accent-saffron text-saffron focus:ring-saffron"
              />
              Live Online
            </label>
          </div>
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full shadow-glow"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting Application..." : "Book Free Career Counselling"}
        </Button>
        <p className="mt-2 text-center text-[11px] text-night-muted">
          ₹0 upfront for eligible PAP tracks • No spam • Confidential mentor call
        </p>
      </div>
    </form>
  );
}
