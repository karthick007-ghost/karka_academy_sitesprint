"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { verifiedFaqs } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { MessageCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section className="py-20 bg-night-2 relative overflow-hidden" id="faqs">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="saffron">Got Questions?</Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night-text">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-night-muted leading-relaxed">
            Everything you need to know about our Pay After Placement model, course structure, and campus in Nagercoil.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-night-1 p-6 sm:p-10 shadow-glass">
          <Accordion type="single" collapsible className="w-full">
            {verifiedFaqs.map((faq, idx) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>
                  <span className="pr-4 text-left">
                    <span className="text-saffron font-mono text-sm mr-2">0{idx + 1}.</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 text-night-muted text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 1-click WhatsApp fallback */}
        <div className="mt-10 text-center">
          <p className="text-sm text-night-muted mb-3">
            Still have questions about your background or course timing?
          </p>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20ba59] shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat Directly with Admissions on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
