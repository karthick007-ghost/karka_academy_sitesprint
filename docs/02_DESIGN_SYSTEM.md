# 02 — Design System

## Chosen direction: "Quiet Luxury × Glass Moments"
**Why:** The PAP model asks people (and parents) to trust a young academy. An old-money editorial base (warm paper, deep forest green, serif display type, hairline rules, generous space) reads as credible and calm. Gen-Z energy comes from a single vibrant **saffron** accent, kinetic type, 3D and glassmorphism used **only in "night" moments** (hero, PAP, Infini). Restrained base, vibrant moments. It avoids the purple-gradient "AI startup" look most entries will share.

> The palette below is a proposal. The Brand agent must compare it with `brand/reference/` (Instagram screenshots) and the logo/mascot; if Instagram's dominant colour differs, change the **accent** only, in `tokens.css`, then re-run the contrast check. Don't touch the neutrals.

## Colour tokens
```css
:root {
  /* Light "paper" surfaces */
  --paper:#F7F3EC; --paper-2:#EFE8DB;
  --ink:#14171F;   --ink-2:#4A4F5C;  --ink-3:#6B6F7B;
  /* Brand */
  --saffron:#FF6A2B;  --saffron-ink:#A63A0B;      /* saffron-ink = text-safe version */
  --forest:#0F3D2E;                                /* deep green, premium anchor */
  --gold:#B8964E;  --gold-ink:#7A5F24;             /* gold = decorative only */
  /* Dark "night" surfaces */
  --night:#0B0F14; --night-2:#121821;
  --night-text:#F3EEE4; --night-muted:#A9B0BD; --mint:#7BE0AD;
}
```
### Verified contrast (computed WCAG ratios)
| Pair | Ratio | Rule |
|---|---|---|
| ink on paper | 16.2 | body text |
| ink-2 on paper | 7.4 | secondary text |
| ink-3 on paper | 4.54 | captions ≥14px, **paper only**, never on paper-2 |
| ink-2 on paper-2 | 6.72 | ok |
| saffron-ink (#A63A0B) on paper | 5.88 / paper-2 5.33 | accent text on light |
| **saffron on paper** | **2.58** | **never use as text.** Fills/decor only |
| ink on saffron | 6.27 | **primary button = saffron fill + ink text** (never white text) |
| forest on paper / paper on forest | 10.99 | ok both ways |
| gold on paper | 2.53 | decorative only; use gold-ink (5.44) for text |
| night-text on night | 16.62 | ok |
| night-muted on night / night-2 | 8.82 / 8.17 | ok |
| saffron on night | 6.73 | accent text on dark is ok |
| mint on night / on forest | 12.0 / 7.59 | success/positive accents |

Any new pair must be computed and added here before use.

## Typography (human, editorial)
- **Display:** *Fraunces* (variable, "soft" optical axis, warm, slightly quirky serif) for headings, big numerals, pull quotes.
- **Body/UI:** *Instrument Sans* (or Plus Jakarta Sans if Instrument Sans fails the Latin check) for text, buttons, nav.
- **Tamil:** *Noto Serif Tamil* (display accents) and *Noto Sans Tamil* (body) as fallbacks. Set `lang="ta"` on Tamil runs.
- Load via `next/font` (self-hosted; no third-party font request; CSP-friendly), `display: swap`, subset to Latin + Tamil, preload only the two weights above the fold.
- Fluid scale (clamp): `display 3rem→6rem`, `h1 2.25→4rem`, `h2 1.75→2.75`, `h3 1.25→1.75`, `body 1→1.125rem (line-height 1.6)`, `caption 0.875`. Max line length 68ch. Tabular numerals for stats. Fraunces tight tracking (-0.02em) only ≥ h2.

## Spacing, shape, elevation
- 4px base grid; section padding `clamp(4rem, 9vw, 8rem)`; container max 1200px; 16px mobile gutter.
- Radius: `sm 8`, `md 16`, `lg 28`, `pill 999`. Cards `lg`. Hairlines `1px solid rgba(20,23,31,.10)` on paper.
- Elevation = soft layered shadows (never one hard drop shadow): `0 1px 2px rgba(20,23,31,.06), 0 12px 32px -12px rgba(20,23,31,.18)`.
- Grain: 3% SVG noise overlay on paper surfaces (inline data URI, <1 KB) for a printed-paper feel.

## Glassmorphism recipe (night sections only)
```css
.glass {
  background: linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.04));
  backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 20px 60px -20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12);
}
@supports not (backdrop-filter: blur(1px)) { .glass { background: var(--night-2); } }
@media (prefers-reduced-transparency: reduce) { .glass { background: var(--night-2); backdrop-filter: none; } }
```
Rules: text on glass sits over an underlay of at least `rgba(11,15,20,.55)` so contrast holds on any pixels behind it; max 3 blurred layers on screen at once (GPU cost); no blur on mobile list items. Frosted-cream variant on paper: `rgba(255,255,255,.6)` + hairline, used for header and floating CTA bar only.

## 3D and motion
**3D hero ("Orbit"):** a soft-lit glass-like core with 8 small chips (one per career track) orbiting slowly; pointer parallax (desktop) / gentle auto-rotate (mobile); saffron rim light on night background. Built with react-three-fiber.
- Budget: ≤ 60k triangles, DPR capped at 1.5, one light + environment, no post-processing, no heavy transmission material (fake glass with fresnel + env map).
- Loads after first paint via dynamic import (`ssr:false`) **only if** `!prefers-reduced-motion`, `!saveData`, `deviceMemory ≥ 4` (or unknown), `hardwareConcurrency ≥ 4`, WebGL2 available. Otherwise show a pre-rendered **poster image** (same composition, WebP) with the same dimensions (no CLS).
- Pauses when off-screen (IntersectionObserver) and when tab hidden. Wrapped in an error boundary that falls back to the poster.
- Everything else "3D" is cheap CSS: `perspective` tilt cards (max ±6°, pointer only, disabled on touch and reduced motion), layered parallax on scroll via CSS `animation-timeline: scroll()` with a fallback.

**Motion principles:** purposeful, 150–250 ms for UI, 500–800 ms for reveals, easing `cubic-bezier(.2,.7,.2,1)`; stagger ≤ 60 ms; reveal-on-scroll once, never replay; no parallax that moves text; no autoplaying video with sound; everything off under `prefers-reduced-motion` (replace with instant state changes/fades).

## Components (build once, reuse)
Button (primary saffron/ink, secondary forest outline, ghost), Link, Chip, Badge ("Most popular"), Card (paper, glass, tilt), Bento grid, Section header (eyebrow + serif title), Stat counter, Accordion, Tabs/segmented control, Carousel (scroll-snap), Marquee (accessible, pausable), Modal/Drawer (focus trap, Esc, scroll lock), Form field set with inline errors, Toast, Sticky action bar, Skeletons, Video poster player.
States for every interactive: default, hover, focus-visible (2px forest ring + 2px paper offset; on night: mint ring), active, disabled, loading, error.

## Imagery and iconography
Real photos of the academy, mentors, learners (warm colour grade, consistent crop ratios). No generic stock handshakes. Reuse the robot mascot from the current site where it fits (e.g. as 3D chip or footer easter egg). Icons: Lucide, 1.5px stroke. Illustrations: sparing, flat, one palette.

## Anti-slop checklist (reviewers reject on sight)
No purple→blue gradients; no gradient text on body copy; no emoji as icons; no centred-everything layouts; no equal three-column "feature card" walls without hierarchy; no lorem ipsum; no fake logos; no stock-photo faces labelled as students; no 5-stars everywhere.

## Layout and responsiveness
Mobile-first breakpoints 360 / 480 / 768 / 1024 / 1280 / 1536. Test at 360×640 (smallest), 390×844, 768×1024, 1024×768, 1440×900, 1920×1080. No horizontal scroll at any width. Support up to 200% zoom and text-only zoom.

## Single-theme decision
Ship **one** editorial theme (paper + night sections) with no user-toggled dark mode in v1: halves visual-bug surface and keeps the brand consistent. Dark mode is a stretch goal after all gates pass.
