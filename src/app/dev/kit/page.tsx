import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Marquee } from "@/components/ui/marquee";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { StatCounter } from "@/components/ui/stat-counter";

export default function DevKitPage() {
  return (
    <main className="container mx-auto px-4 py-16 space-y-16">
      <SectionHeader
        badge="Design System Preview"
        tamilFlourish="கற்க"
        title="Component UI Kit &"
        highlight="Token Inspection"
        subtitle="Visual verification of accessible variants, WCAG AA contrast pairs, and responsive layouts."
      />

      {/* Buttons */}
      <section className="space-y-4">
        <h3 className="font-display text-2xl font-bold">Buttons & States</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Saffron</Button>
          <Button variant="secondary">Secondary Forest</Button>
          <Button variant="outline">Outline Forest</Button>
          <Button variant="saffronOutline">Outline Saffron</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" size="lg">Large Target (48px)</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h3 className="font-display text-2xl font-bold">Badges & Category Pills</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default Neutral</Badge>
          <Badge variant="saffron">Saffron Text Safe</Badge>
          <Badge variant="forest">Forest Brand</Badge>
          <Badge variant="night">Night Mint</Badge>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h3 className="font-display text-2xl font-bold">Cards (Paper & Glass)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="paper">
            <CardHeader>
              <CardTitle>Paper Surface</CardTitle>
              <CardDescription>Warm editorial tactile surface for primary information hierarchy.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-ink-2">Standard content sits cleanly with high legibility.</p>
            </CardContent>
          </Card>

          <Card variant="night">
            <CardHeader>
              <CardTitle className="text-night-text">Night Moment Card</CardTitle>
              <CardDescription className="text-night-muted">High-impact dark section moment with subtle rim illumination.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="night" size="sm">Explore Night Action</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Marquee */}
      <section className="space-y-4">
        <h3 className="font-display text-2xl font-bold">Accessible Marquee (Pausable on Hover)</h3>
        <Marquee items={["Amazon", "TCS", "HCL", "Matrimony", "Novac", "Capecom", "Flow", "Sodisys"]} />
      </section>

      {/* Bento Grid */}
      <section className="space-y-4">
        <h3 className="font-display text-2xl font-bold">Bento Grid</h3>
        <BentoGrid>
          <BentoCard
            number={1}
            title="Pay After You Get Hired"
            description="Start with ₹0 upfront tuition. You only pay after you receive and accept an official tech job offer."
            highlight
          />
          <BentoCard
            number={2}
            title="AI-First Practical Curriculum"
            description="Integrates modern generative AI workflows, agent architectures, and LLM tooling across all tracks."
          />
          <BentoCard
            number={3}
            title="Real Client Deliverables"
            description="Graduate with real deployment code repositories built at our Agile Tribers product studio."
          />
        </BentoGrid>
      </section>

      {/* Stats */}
      <section className="space-y-4">
        <h3 className="font-display text-2xl font-bold">Stat Counters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCounter value="37" label="Verified Courses" description="From School to Advanced" />
          <StatCounter value="8" label="Career Tracks" description="Industry Specialized" />
          <StatCounter value="30 hrs" label="Weekly Commitment" description="10 Live + 10 Lab + 10 Practice" />
          <StatCounter value="₹0" label="Upfront Tuition" description="Pay After Placement" />
        </div>
      </section>
    </main>
  );
}
