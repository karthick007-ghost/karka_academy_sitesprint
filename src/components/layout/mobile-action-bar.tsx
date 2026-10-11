"use client";

import React, { useState } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { siteConfig } from "@/content/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/forms/lead-form";

export function MobileActionBar() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <aside
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-bg/90 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <a
          href={siteConfig.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#075E54] px-3 text-xs font-bold text-white transition active:scale-95 shadow-md"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-saffron px-3 text-xs font-bold text-ink transition active:scale-95 shadow-glow"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Apply / Call</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect with Admissions</DialogTitle>
              <DialogDescription>
                Schedule your free session with a mentor at our Nagercoil center.
              </DialogDescription>
            </DialogHeader>
            <LeadForm
              source="mobile-bottom-bar"
              onSuccess={() => {
                setTimeout(() => setDialogOpen(false), 2500);
              }}
              compact
            />
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  );
}
