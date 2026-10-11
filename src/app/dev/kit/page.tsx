"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sun,
  Moon,
  Sparkles,
  MoveHorizontal,
  Layers,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  Palette,
  Terminal,
  MousePointer,
  Box,
  Eye,
} from "lucide-react";
import { useTheme } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Marquee } from "@/components/ui/marquee";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { StatCounter } from "@/components/ui/stat-counter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { PapTimeline } from "@/components/sections/pap/pap-timeline";
import { SlidingPillNav, type SlidingPillItem } from "@/components/motion/sliding-pill";
import { KolamMandala, KolamHeader } from "@/components/ornament/kolam";
import { HeroScene } from "@/components/three/hero-scene";
import { GlobalCanvasSpikeDemo } from "@/components/three/global-canvas";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

import type { HTMLMotionProps } from "framer-motion";

// ============================================================================
// 1. INTERACTIVE TILT CARD WITH SPECULAR GLARE
// ============================================================================
interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

function TiltCard({ children, maxTilt = 12, className, ...props }: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });
  const prefersReduced = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 24,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective: 1000,
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-3xl transition-shadow duration-300 overflow-hidden cursor-pointer",
        isHovered ? "shadow-2xl" : "shadow-md",
        className
      )}
      {...props}
    >
      {/* Specular Glare Overlay */}
      {!prefersReduced && (
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.28), transparent 75%)`,
            opacity: isHovered ? 1 : 0,
          }}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 mix-blend-overlay"
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}

// ============================================================================
// 2. MAGNETIC BUTTON PRIMITIVE
// ============================================================================
interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

function MagneticButton({
  children,
  strength = 0.35,
  className,
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced) return;
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: prefersReduced ? 0 : springX,
        y: prefersReduced ? 0 : springY,
      }}
      className={cn(
        "relative inline-flex min-h-[44px] touch-target items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold transition-colors select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ============================================================================
// 3. SPOTLIGHT PANEL PRIMITIVE
// ============================================================================
interface SpotlightPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

function SpotlightPanel({
  children,
  spotlightColor = "rgba(255, 106, 43, 0.16)",
  className,
  ...props
}: SpotlightPanelProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={panelRef}
      onPointerEnter={() => setOpacity(1)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-ui/15 bg-elev p-6 sm:p-8 transition-colors",
        className
      )}
      {...props}
    >
      {/* Radial Dynamic Spotlight */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
          opacity,
        }}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 4. MAIN DEV KIT PAGE COMPONENT
// ============================================================================
export default function DevKitPage() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [activePillId, setActivePillId] = React.useState<string>("full-stack");
  const [kolamAnimated, setKolamAnimated] = React.useState<boolean>(true);

  const filterTabs: SlidingPillItem<string>[] = [
    { id: "full-stack", label: "Full-Stack Dev", badge: "PAP" },
    { id: "gen-ai", label: "Generative AI", badge: "Specialist" },
    { id: "cloud", label: "Cloud & DevOps", badge: "AWS" },
    { id: "design", label: "UI/UX Design", badge: "Figma" },
  ];

  return (
    <main className="min-h-screen bg-base text-primary transition-colors duration-200">
      <div className="container mx-auto px-4 py-12 space-y-20 max-w-7xl">
        {/* =================================================================
            HERO / HEADER
           ================================================================= */}
        <header className="space-y-6 text-center max-w-4xl mx-auto">
          <KolamHeader tamilWord="கற்க" label="Internal DevKit & Design Tokens" />

          <div className="inline-flex items-center gap-2 rounded-full border border-ui/20 bg-elev px-3.5 py-1 text-xs font-bold text-muted">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span>Internal Engineering Kitchen Sink</span>
            <span>•</span>
            <span className="font-mono text-accent">Next.js 16.4</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Design Tokens & <span className="text-accent">Component Sandbox</span>
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Exhaustive visual verification of WCAG 2.2 AA contrast ratios, light/dark semantic tokens,
            3D WebGL scissoring, glass surfaces, accessible carousel gestures, and PAP storytelling.
          </p>

          {/* Master Theme Toggle Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              className="inline-flex min-h-[44px] touch-target items-center gap-2.5 rounded-full border border-ui/30 bg-elev px-5 py-2 text-sm font-bold shadow-subtle hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 text-accent" />
                  <span>Switch to Light Paper Theme</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-accent" />
                  <span>Switch to Dark Night Theme</span>
                </>
              )}
            </button>

            <div className="rounded-full border border-ui/20 bg-sunken px-4 py-2 text-xs font-mono font-medium">
              Active Mode: <strong className="uppercase text-accent">{resolvedTheme}</strong>
            </div>
          </div>
        </header>

        {/* =================================================================
            1. THEME TOKENS & CONTRAST SWATCHES
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <Palette className="h-6 w-6 text-accent" />
              <span>1. Semantic Token Inspector</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Active CSS variables dynamically adapting between Paper (Light) and Night (Dark) surfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="rounded-2xl border border-ui/20 bg-base p-4 space-y-1 shadow-sm">
              <div className="h-8 w-full rounded-lg bg-base border border-ui/20" />
              <div className="font-mono text-xs font-bold">--bg</div>
              <div className="text-[11px] text-muted">Base Canvas</div>
            </div>

            <div className="rounded-2xl border border-ui/20 bg-elev p-4 space-y-1 shadow-sm">
              <div className="h-8 w-full rounded-lg bg-elev border border-ui/20" />
              <div className="font-mono text-xs font-bold">--bg-elev</div>
              <div className="text-[11px] text-muted">Elevated Card</div>
            </div>

            <div className="rounded-2xl border border-ui/20 bg-sunken p-4 space-y-1 shadow-sm">
              <div className="h-8 w-full rounded-lg bg-sunken border border-ui/20" />
              <div className="font-mono text-xs font-bold">--bg-sunken</div>
              <div className="text-[11px] text-muted">Recessed Well</div>
            </div>

            <div className="rounded-2xl border border-ui/20 bg-elev p-4 space-y-1 shadow-sm">
              <div className="h-8 w-full rounded-lg bg-saffron text-night-1 flex items-center justify-center font-bold text-xs">
                Saffron
              </div>
              <div className="font-mono text-xs font-bold text-saffron">--saffron</div>
              <div className="text-[11px] text-muted">#FF6A2B Brand</div>
            </div>

            <div className="rounded-2xl border border-ui/20 bg-elev p-4 space-y-1 shadow-sm">
              <div className="h-8 w-full rounded-lg bg-forest text-paper flex items-center justify-center font-bold text-xs">
                Forest
              </div>
              <div className="font-mono text-xs font-bold">--forest</div>
              <div className="text-[11px] text-muted">#0F3D2E Anchor</div>
            </div>

            <div className="rounded-2xl border border-ui/20 bg-elev p-4 space-y-1 shadow-sm">
              <div className="h-8 w-full rounded-lg bg-mint text-night flex items-center justify-center font-bold text-xs">
                Mint
              </div>
              <div className="font-mono text-xs font-bold text-mint">--mint</div>
              <div className="text-[11px] text-muted">#7BE0AD Accent</div>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. CAROUSEL PRIMITIVE WITH MOMENTUM DRAG & A11Y
           ================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ui/15 pb-3">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
                <MoveHorizontal className="h-6 w-6 text-accent" />
                <span>2. Accessible Carousel Primitive</span>
              </h2>
              <p className="text-sm text-muted mt-1">
                CSS scroll-snap with pointer drag momentum, live region announcements, keyboard Arrow navigation, and cursor pill.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
              <span>Touch Gestures + Momentum</span>
            </div>
          </div>

          <Carousel className="w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Career Track Modules Showcase (5 Slides)
              </span>
              <div className="flex items-center gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>

            <CarouselContent>
              {/* Slide 1 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all">
                  <div>
                    <Badge variant="saffron">PAP Eligible</Badge>
                    <h3 className="font-display text-2xl font-bold mt-4 mb-2">
                      Full-Stack Web & Mobile
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Master modern Next.js 16, React 19, TypeScript, PostgreSQL, and scalable microservices from the ground up.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ui/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-accent">₹0 Upfront Tuition</span>
                    <span className="text-muted">30 hrs/wk</span>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-mint/40 transition-all">
                  <div>
                    <Badge variant="mint">Specialist Track</Badge>
                    <h3 className="font-display text-2xl font-bold mt-4 mb-2">
                      Generative AI & Agentic Systems
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Deploy LLM architectures, RAG vector pipelines, autonomous agent workflows, and fine-tuned embeddings.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ui/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-mint">Neural Core</span>
                    <span className="text-muted">Live Lab</span>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-blue-400/40 transition-all">
                  <div>
                    <Badge variant="default">Infrastructure</Badge>
                    <h3 className="font-display text-2xl font-bold mt-4 mb-2">
                      Cloud & DevOps Engineering
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Container orchestration with Docker, Kubernetes, AWS infrastructure-as-code, and resilient CI/CD pipelines.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ui/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">AWS + Docker</span>
                    <span className="text-muted">Industry Grade</span>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all">
                  <div>
                    <Badge variant="forest">Commercial Studio</Badge>
                    <h3 className="font-display text-2xl font-bold mt-4 mb-2">
                      Agile Tribers Client Deliverables
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Real client pull requests, agile sprint planning, code reviews, and verifiable GitHub contributions.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ui/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-positive-text">Production Code</span>
                    <span className="text-muted">Verifiable Commits</span>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 5 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col justify-between shadow-subtle hover:border-accent/40 transition-all">
                  <div>
                    <Badge variant="saffron">Fixed Capped Fee</Badge>
                    <h3 className="font-display text-2xl font-bold mt-4 mb-2">
                      Flat ₹40,000 Placement Fee
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Pay only once after accepting an official engineering offer. Zero salary deductions, zero ongoing royalties.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ui/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-accent">₹40k Flat Cap</span>
                    <span className="text-muted">0% ISA Cut</span>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselDots className="mt-4" />
          </Carousel>
        </section>

        {/* =================================================================
            3. PAY AFTER PLACEMENT STORYTELLING (8-STEP TIMELINE)
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <span>3. Pay After Placement (PAP) 8-Step Storytelling</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Sticky scroll-linked 8-step journey with animated drawing progress spine, active step highlighting, and high-contrast glass cards.
            </p>
          </div>

          <div className="rounded-3xl border border-ui/15 bg-night-1 overflow-hidden">
            <PapTimeline onApplyClick={() => alert("Apply modal opened in production")} />
          </div>
        </section>

        {/* =================================================================
            4. 3D TRACK OBJECTS & HERO SOLAR SYSTEM PREVIEW
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <Box className="h-6 w-6 text-accent" />
              <span>4. 3D WebGL Track Glyphs & Hero Solar System</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Zero-lag Drei scissoring enforcing ≤ 1 WebGL context across the entire application with capability fallbacks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Global Canvas Multi-Viewport Scissoring */}
            <div className="lg:col-span-7">
              <GlobalCanvasSpikeDemo />
            </div>

            {/* Right: Hero Solar System Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <h3 className="font-display text-lg font-bold mb-3 self-start text-muted">
                Hero Solar System Celestial Core
              </h3>
              <HeroScene />
            </div>
          </div>
        </section>

        {/* =================================================================
            5. GLASS SURFACES (LIGHT VS DARK COMPARISON)
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <Layers className="h-6 w-6 text-accent" />
              <span>5. Glass Surfaces (Light vs Dark Recipes)</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Tested for WCAG 2.2 AA contrast compliance with fallback under reduced transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Light Glass Surface */}
            <div className="rounded-3xl p-8 bg-paper border border-ink/10 shadow-lg space-y-4">
              <Badge variant="default">Light Glass Recipe</Badge>
              <h3 className="font-display text-2xl font-bold text-ink">
                Warm Editorial Frosted Glass
              </h3>
              <p className="text-sm text-ink-2 leading-relaxed">
                <code className="text-xs font-mono bg-paper-2 px-1.5 py-0.5 rounded">
                  rgba(255, 255, 255, 0.62) + blur(16px) + border rgba(20, 23, 31, 0.08)
                </code>
              </p>
              <div className="glass-light p-6 rounded-2xl text-ink">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-3">
                  Tactile Surface
                </span>
                <p className="text-sm font-medium mt-1 text-ink">
                  High-contrast typography maintains 16.2:1 contrast against paper undertones.
                </p>
              </div>
            </div>

            {/* Dark Glass Surface */}
            <div className="rounded-3xl p-8 bg-night-1 border border-white/10 shadow-glass space-y-4">
              <Badge variant="mint">Dark Glass Recipe</Badge>
              <h3 className="font-display text-2xl font-bold text-night-text">
                Nocturne Luminescent Glass
              </h3>
              <p className="text-sm text-night-muted leading-relaxed">
                <code className="text-xs font-mono bg-night-2 px-1.5 py-0.5 rounded">
                  rgba(255, 255, 255, 0.08) + blur(18px) + border rgba(255, 255, 255, 0.14)
                </code>
              </p>
              <div className="glass-dark p-6 rounded-2xl text-night-text">
                <span className="text-xs font-bold uppercase tracking-wider text-mint">
                  Rim Illumination
                </span>
                <p className="text-sm font-medium mt-1 text-night-muted">
                  Subtle specular edge reflection and depth shadow for focal night moments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            6. TILT CARD WITH SPECULAR GLARE
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <MousePointer className="h-6 w-6 text-accent" />
              <span>6. 3D Tilt Card with Specular Glare</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Calculates 3D perspective orientation on hover with dynamic specular glare gradient. Automatically disables under prefers-reduced-motion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TiltCard maxTilt={14} className="border border-ui/20 bg-elev p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="saffron">Interactive 3D</Badge>
                  <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                </div>
                <h3 className="font-display text-3xl font-bold tracking-tight">
                  Hover & Tilt Card
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Move your pointer over this card to observe smooth 3D angular pitch, yaw, and responsive specular sheen.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-accent">
                  <span>Perspective ±14°</span>
                  <span>•</span>
                  <span>Specular Sheen Blend</span>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={14} className="border border-mint/30 bg-night-2 text-night-text p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="mint">Dark Specular</Badge>
                  <Code2 className="h-5 w-5 text-mint" />
                </div>
                <h3 className="font-display text-3xl font-bold text-night-text tracking-tight">
                  Night Glare Surface
                </h3>
                <p className="text-sm text-night-muted leading-relaxed">
                  Specular glare seamlessly adapts across high-contrast night surfaces with zero jagged clipping or stutter.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-mint">
                  <span>Spring Damping: 24</span>
                  <span>•</span>
                  <span>Zero Reduced-Motion Jitter</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* =================================================================
            7. MAGNETIC BUTTONS & SPOTLIGHT PANEL
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <Compass className="h-6 w-6 text-accent" />
              <span>7. Magnetic Buttons & Spotlight Panel</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Tactile micro-interactions: physical magnetic attraction pulling toward the cursor, paired with radial cursor spotlights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Magnetic Button Area */}
            <div className="rounded-3xl border border-ui/20 bg-elev p-8 flex flex-col justify-between space-y-6">
              <div>
                <Badge variant="default">Magnetic Physics</Badge>
                <h3 className="font-display text-2xl font-bold mt-3 mb-2">
                  Cursor Proximity Attraction
                </h3>
                <p className="text-sm text-muted">
                  Hover near and over the buttons below to observe smooth magnetic spring attraction.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center pt-4">
                <MagneticButton className="bg-saffron text-night-1 font-bold shadow-subtle hover:bg-saffron/90">
                  <span>Primary Magnetic</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </MagneticButton>

                <MagneticButton className="border border-forest/30 text-forest bg-transparent hover:bg-forest/5 dark:border-white/20 dark:text-night-text">
                  <span>Outline Magnetic</span>
                </MagneticButton>
              </div>
            </div>

            {/* Spotlight Panel */}
            <SpotlightPanel className="flex flex-col justify-between space-y-6">
              <div>
                <Badge variant="saffron">Cursor Illumination</Badge>
                <h3 className="font-display text-2xl font-bold mt-3 mb-2">
                  Radial Cursor Spotlight
                </h3>
                <p className="text-sm text-muted">
                  Move your mouse across this panel to see a warm saffron spotlight dynamically tracking your pointer coordinates.
                </p>
              </div>

              <div className="rounded-2xl border border-ui/10 bg-base/60 p-4 text-xs font-mono text-muted">
                radial-gradient(420px circle at mouse.x, mouse.y)
              </div>
            </SpotlightPanel>
          </div>
        </section>

        {/* =================================================================
            8. SLIDING PILL TABS
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
              <Eye className="h-6 w-6 text-accent" />
              <span>8. Sliding Pill Tabs (Roving Navigation)</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              Framer Motion layoutId animation with keyboard roving tabindex (ArrowLeft / ArrowRight).
            </p>
          </div>

          <div className="rounded-3xl border border-ui/20 bg-elev p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SlidingPillNav
                items={filterTabs}
                activeId={activePillId}
                onChange={setActivePillId}
                label="Career Track Navigation"
              />

              <span className="text-xs font-mono font-bold text-accent">
                Active Selection: {activePillId}
              </span>
            </div>

            <div className="rounded-2xl border border-ui/10 bg-sunken p-6 text-sm text-muted">
              {activePillId === "full-stack" && (
                <p>Full-Stack Engineering: 16 weeks of intensive frontend + backend + database architecture.</p>
              )}
              {activePillId === "gen-ai" && (
                <p>Generative AI Specialist: Vector embeddings, RAG pipelines, and agent orchestration.</p>
              )}
              {activePillId === "cloud" && (
                <p>Cloud & DevOps: Docker containerization, AWS serverless, and CI/CD pipelines.</p>
              )}
              {activePillId === "design" && (
                <p>UI/UX Product Design: Design systems, WCAG 2.2 accessibility, and Figma prototyping.</p>
              )}
            </div>
          </div>
        </section>

        {/* =================================================================
            9. KOLAM HERITAGE ORNAMENTS
           ================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ui/15 pb-3">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
                <Sparkles className="h-6 w-6 text-accent" />
                <span>9. Kolam Heritage Ornaments</span>
              </h2>
              <p className="text-sm text-muted mt-1">
                Authentic South Indian Sikku / Pulli Kolam procedural SVG geometry inspired by Kanyakumari heritage.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setKolamAnimated((prev) => !prev)}
            >
              Toggle Animation: {kolamAnimated ? "Enabled" : "Disabled"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col items-center justify-center space-y-4">
              <KolamMandala
                size={140}
                color="var(--saffron, #FF6A2B)"
                dotColor="#FFD166"
                animated={kolamAnimated}
              />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Electric Saffron
              </span>
            </div>

            <div className="rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col items-center justify-center space-y-4">
              <KolamMandala
                size={140}
                color="var(--mint, #7BE0AD)"
                dotColor="var(--saffron, #FF6A2B)"
                animated={kolamAnimated}
              />
              <span className="text-xs font-bold text-mint uppercase tracking-wider">
                Night Mint
              </span>
            </div>

            <div className="rounded-3xl border border-ui/20 bg-elev p-6 flex flex-col items-center justify-center space-y-4">
              <KolamMandala
                size={140}
                color="#B8964E"
                dotColor="#FF6A2B"
                animated={kolamAnimated}
              />
              <span className="text-xs font-bold text-gold uppercase tracking-wider">
                Traditional Gold
              </span>
            </div>
          </div>
        </section>

        {/* =================================================================
            10. CLASSIC PRIMITIVES (BUTTONS, BADGES, BENTO, STATS)
           ================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-ui/15 pb-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              10. Core Buttons, Badges & Bento
            </h2>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary Saffron</Button>
              <Button variant="secondary">Secondary Forest</Button>
              <Button variant="outline">Outline Forest</Button>
              <Button variant="saffronOutline">Outline Saffron</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" size="lg">Large Target (48px)</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-2 pt-4">
            <h3 className="font-display text-lg font-bold">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default Neutral</Badge>
              <Badge variant="saffron">Saffron Text Safe</Badge>
              <Badge variant="forest">Forest Brand</Badge>
              <Badge variant="night">Night Mint</Badge>
              <Badge variant="mint">Fresh Mint Light Green</Badge>
              <Badge variant="burgundy">Burgundy Old Money</Badge>
            </div>
          </div>

          {/* Bento */}
          <div className="space-y-2 pt-4">
            <h3 className="font-display text-lg font-bold">Bento Cards</h3>
            <BentoGrid>
              <BentoCard
                number={1}
                title="Pay After You Get Hired"
                description="Start with ₹0 upfront tuition. Settle our transparent ₹40,000 flat placement fee only after accepting an official offer."
                highlight
              />
              <BentoCard
                number={2}
                title="AI-First Practical Curriculum"
                description="Integrates modern generative AI workflows, agent architectures, and LLM tooling across all tracks."
              />
              <BentoCard
                number={3}
                title="Agile Tribers Production Studio"
                description="Graduate with real deployment code repositories built at our commercial product studio in Nagercoil."
              />
            </BentoGrid>
          </div>

          {/* Stats */}
          <div className="space-y-2 pt-4">
            <h3 className="font-display text-lg font-bold">Stat Counters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCounter value="37" label="Verified Courses" description="From School to Advanced" />
              <StatCounter value="8" label="Career Tracks" description="Industry Specialized" />
              <StatCounter value="30 hrs" label="Weekly Commitment" description="10 Live + 10 Lab + 10 Practice" />
              <StatCounter value="₹0" label="Upfront Tuition" description="Pay After Placement" />
            </div>
          </div>

          {/* Marquee */}
          <div className="space-y-2 pt-4">
            <h3 className="font-display text-lg font-bold">Hiring Partner Marquee</h3>
            <Marquee items={["Amazon", "TCS", "HCL", "Matrimony", "Novac", "Capecom", "Flow", "Sodisys"]} />
          </div>
        </section>
      </div>
    </main>
  );
}
