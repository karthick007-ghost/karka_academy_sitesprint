"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/content/site";
import { Menu, X, ChevronDown, PhoneCall, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Courses", href: "/courses" },
    { label: "Pay After Placement", href: "/pay-after-placement", badge: "₹0 Upfront" },
    { label: "Placements", href: "/placements" },
    { label: "Internships", href: "/internships" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const audienceLinks = [
    { label: "For College Students", href: "/for/college" },
    { label: "For Recent Graduates", href: "/for/graduates" },
    { label: "For Career Switchers", href: "/for/switchers" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-bg/85 backdrop-blur-md shadow-glass"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent rounded-xl p-1"
            aria-label="Karka Academy Home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-elev border border-ui/20 shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-tamil text-xl font-bold text-accent select-none">க</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-text group-hover:text-accent transition-colors">
                KARKA <span className="text-positive-text font-mono text-xs sm:text-sm font-bold">AI</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-text-muted">
                Tech Academy • Nagercoil
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-accent-text bg-accent/10 font-bold"
                      : "text-text-muted hover:text-text hover:bg-bg-elev"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 inline-block rounded-pill bg-positive-text/15 px-2 py-0.5 text-[10px] font-bold text-positive-text border border-positive-text/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Audience Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-muted hover:text-text rounded-lg transition-colors focus:outline-none"
                aria-haspopup="true"
              >
                <span>For You</span>
                <ChevronDown className="h-4 w-4 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute right-0 top-full pt-2 w-52 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                <div className="rounded-2xl bg-elev border border-ui/15 text-primary p-2 shadow-2xl backdrop-blur-lg">
                  {audienceLinks.map((aud) => (
                    <Link
                      key={aud.href}
                      href={aud.href}
                      className="block px-3 py-2 text-xs font-semibold text-primary rounded-xl hover:bg-sunken hover:text-burgundy transition-colors"
                    >
                      {aud.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="primary" size="md" className="shadow-glow">
                  <PhoneCall className="h-4 w-4 mr-1.5" />
                  <span>Book Career Call</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Talk to an Industry Mentor</DialogTitle>
                  <DialogDescription>
                    Schedule a free 1-on-1 career counselling session at our Nagercoil lab or via video call.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm
                  source="header-cta"
                  onSuccess={() => {
                    setTimeout(() => setDialogOpen(false), 2500);
                  }}
                  compact
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-elev text-text focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-bg/95 backdrop-blur-xl animate-fade-in flex flex-col p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-elev border border-ui/20 shadow-sm">
                <span className="font-tamil text-lg font-bold text-accent">க</span>
              </div>
              <span className="font-bold text-text">
                KARKA <span className="text-positive-text font-mono text-xs sm:text-sm font-bold">AI</span> ACADEMY
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col py-6 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between py-2 text-base font-semibold text-text hover:text-accent transition-colors"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-pill bg-positive-text/15 px-2.5 py-0.5 text-xs font-bold text-positive-text border border-positive-text/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-4 border-t border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-3">
                Tailored Guides
              </span>
              <div className="flex flex-col space-y-2">
                {audienceLinks.map((aud) => (
                  <Link
                    key={aud.href}
                    href={aud.href}
                    className="text-sm text-text-muted hover:text-burgundy transition-colors py-1"
                  >
                    {aud.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Actions in Drawer */}
          <div className="mt-auto pt-6 border-t border-border space-y-3">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  size="lg"
                  magnetic
                  className="w-full font-bold shadow-glow"
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  <span>Book Free Career Call</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Talk to an Industry Mentor</DialogTitle>
                  <DialogDescription>
                    Schedule a free 1-on-1 career counselling session at our Nagercoil lab or via video call.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm
                  source="mobile-nav-cta"
                  onSuccess={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => setDialogOpen(false), 2500);
                  }}
                  compact
                />
              </DialogContent>
            </Dialog>

            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center rounded-pill bg-[#075E54] px-5 text-sm font-bold text-white transition hover:bg-[#128C7E] shadow-sm"
            >
              Chat on WhatsApp ({siteConfig.contact.displayPhone})
            </a>
          </div>
        </div>
      )}
    </>
  );
}
