import React from "react";
import { HeroSection } from "@/components/sections/home/hero-section";
import { ProofBar } from "@/components/sections/home/proof-bar";
import { PapSection } from "@/components/sections/home/pap-section";
import { TracksSection } from "@/components/sections/home/tracks-section";
import { InternshipsSection } from "@/components/sections/home/internships-section";
import { PlacementsSection } from "@/components/sections/home/placements-section";
import { EcosystemSection } from "@/components/sections/home/ecosystem-section";
import { FaqSection } from "@/components/sections/home/faq-section";
import { CtaSection } from "@/components/sections/home/cta-section";
import { KolamDivider } from "@/components/ornament/kolam";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/content/faqs";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-bg text-text min-h-screen">
      <OrganizationJsonLd />
      <FaqJsonLd faqs={faqs} />
      <HeroSection />
      <ProofBar />
      <KolamDivider variant="lotus" />
      <PapSection />
      <KolamDivider variant="lotus" />
      <TracksSection />
      <KolamDivider variant="lotus" />
      <InternshipsSection />
      <KolamDivider variant="lotus" />
      <PlacementsSection />
      <KolamDivider variant="lotus" />
      <EcosystemSection />
      <KolamDivider variant="lotus" />
      <FaqSection />
      <KolamDivider variant="lotus" />
      <CtaSection />
    </div>
  );
}
