# Karka AI & Tech Academy — Modern Web Platform

> **Redesigned & Engineered for Karka AI & Tech Academy (Nagercoil, Tamil Nadu)**  
> **Competition Entry — 2-Member Engineering Team**  
> **Original Creative Work • Zero Plagiarism • WCAG 2.2 AA Compliant • Production Ready**

---

## 1. Project Vision & Mission

**Karka AI & Tech Academy** (`karka.academy`) is an AI-first software mentorship academy headquartered in Nagercoil, Kanyakumari District, Tamil Nadu. Designed for ambitious learners, college students, and career switchers across Tier-2/Tier-3 regions, Karka offers transparent **Pay After Placement (PAP)** training and real commercial client internships through its product studio, **Agile Tribers**.

This ground-up redesign transforms Karka's online presence into a standout, human-feeling, editorial experience: **"Neo-Classical Tamil Editorial × Glass Depth"**. It pairs regional heritage typography and cultural kolam motifs with modern glassmorphism, procedural 3D motion graphics, smooth directional view transitions, and radical fee transparency.

---

## 2. Standout Design Innovations & Highlights

### A. Neo-Classical Tamil Editorial × Glass Depth Aesthetics
* **Theme Parity (Light & Dark):**
  * **Light Mode (Dull Ivory & Royal Burgundy):** Eliminates harsh, eye-straining pure white `#FFFFFF` in favor of a soothing dull ivory canvas (`#FBF8F1` elevated cards, `#ECE5D8` sunken controls, `#F7F3EB` base), enriched with royal old-money burgundy (`#722030`) and soft ambient radial paint spray clouds.
  * **Dark Mode (Obsidian Slate & Luminous Accents):** High-contrast obsidian slate (`#0B0F14` base, `#161D26` elevated cards) with glowing rose burgundy (`#E27D90`), cyber saffron, and deep specular reflections.
* **Accessible Fresh Green:** Positive metrics, placement highlights, and success badges render in a fresh, readable light-green (`#15803D` in Light mode with 4.53:1 contrast / `#4ADE80` in Dark mode with 11.03:1 contrast).
* **Bespoke Typography:** Fraunces editorial serif for headlines and numerals, Instrument Sans for body copy, and authentic Tamil script fallback (`Noto Serif Tamil`).

### B. Procedural 3D Motion Visual Engine (All 37 Courses)
* **Zero WebGL Context Exhaustion:** Browsers hard-limit simultaneous WebGL contexts to 8–16 (crashing traditional Three.js grids). Our GPU-accelerated CSS-3D and procedural multi-layer vector engine (`Course3DVisual`) delivers rich, fluid **60 FPS 3D motion visuals across all 37 courses simultaneously**:
  * **Full-Stack & React:** 3D isometric glass code slabs, glowing `< / >` brackets, and floating database layers.
  * **Generative AI & LLM:** Rotating 3D neural lattice sphere, glowing synaptic nodes, and orbiting token sparks.
  * **Data Science & ML:** 3D faceted crystal prisms, oscillating multi-tier 3D bar chart pillars, and trend curves.
  * **UI/UX & Product Design:** 3D floating bezier vector handles, precision pen-nib stylus, and tilted glass artboards.
  * **Digital Media & Animation:** 3D isometric cinematic play-cube with optical refraction and camera iris rings.
  * **Cloud & DevOps:** 3D isometric cloud volumes, interlocking gear rings, and orbiting container pod cubes.
  * **Content Marketing & SEO:** 3D upward parabolic trajectory arrow and isometric broadcast megaphone.
  * **Business & Finance:** 3D crystalline abacus beads, isometric ledger block, and golden ratio growth signs.
* **Interactive Parallax Tilt & 100% Clickable Cards:** Every course card responds to cursor movement with realistic 3D perspective tilt (`TiltCard`). The **entire card** is wrapped in a keyboard-accessible Next.js `Link`, allowing visitors to click anywhere on the 3D visual, title, or summary to open the detailed curriculum.

### C. Unified Single Custom Cursor
* **Zero Dual-Cursor Glitch:** Automatically hides the native OS arrow on fine-pointer desktop screens (`cursor: none !important`), displaying exclusively the sleek custom cursor.
* **Precision Targeting:** Features a crisp central precision dot for exact click alignment, paired with a spring-trailing follower ring that dynamically scales and morphs into contextual text pills (`"View"`, `"Drag"`) when hovering interactive elements.
* **Accessibility Guard:** Automatically disabled on touch screens, mobile viewports, and under `prefers-reduced-motion`; automatically restores native I-beam typing carets inside form fields.

### D. Professional Moving Hiring Partners Marquee (Left to Right)
* **Smooth Infinite Glide:** Continuous horizontal ticker moving smoothly from **left to right** (`@keyframes marquee-reverse`) with soft edge fade gradient masks and hover-to-pause inspection.
* **Custom Stylized Vector Emblems:** Distinctive geometric tech marks for verified hiring partners:
  * **Amazon:** Amber emblem with tech swoosh & stylized monogram (*Cloud & E-Commerce*).
  * **Tata Consultancy Services (TCS):** Geometric tech hexagon with cyber node vectors (*Global IT Services*).
  * **HCL Technologies:** Indigo shield with digital enterprise matrix (*Enterprise Cloud & AI*).
  * **Matrimony.com:** Warm rose dual-heart infinity emblem (*Consumer Internet Tech*).
  * **Novac Technology Solutions:** Emerald & teal dynamic "N" crest (*FinTech & Cloud Platforms*).
  * **Capecom Solutions:** Maritime compass wave mark (*Maritime & Enterprise Software*).
  * **Flow Global:** Purple & mint fintech liquid infinity loop (*UK FinTech Lending Engine*).
  * **Sodisys:** Amber isometric software core cube matrix (*Core Software & Automation*).

### E. Radical Pay After Placement (PAP) Transparency
* **Honest Terms:** Crystal-clear breakdown of **₹0 upfront tuition** and the fixed **₹40,000 flat placement fee**, payable only after securing and accepting an official offer letter.
* **Interactive 8-Step Timeline:** Sticky scroll-linked journey from Foundation Sprint to Commercial Client Internship to Hiring Drills, with live progress tracking and dull ivory milestone cards.
* **Dedicated Audience Hubs:** Fully styled landing pages with full light/dark theme parity for College Students (`/for/college`), Recent Graduates (`/for/graduates`), and Career Switchers (`/for/switchers`).

---

## 3. Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.4.0 (App Router, Turbopack, React 19) |
| **Language** | TypeScript 5.8 (Strict Mode, 0 `any`, full Zod typing) |
| **Styling & Design Tokens** | Tailwind CSS v3 with semantic design tokens (`src/styles/tokens.css`) |
| **3D & Motion** | Procedural CSS-3D Transforms, Three.js + `@react-three/fiber` (Lazy-loaded hero orbit), Framer Motion |
| **UI Primitives** | Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-accordion`, `@radix-ui/react-slot`) |
| **Security & Rate Limiting** | Strict CSP Proxy Middleware, Upstash Sliding-Window Rate Limiting, Honeypot Bot Mitigation |
| **Testing Harness** | Vitest (Unit & Component Tests), Playwright + Axe-Core (E2E & WCAG 2.2 Accessibility) |

---

## 4. Automated Quality Gates & Verification

Every pull request and build passes the complete automated verification pipeline:

```bash
# Run the complete verification pipeline in order
npm run verify:all
```

| Verification Gate | Command | Status | Result / Metrics |
| :--- | :--- | :--- | :--- |
| **TypeScript Typecheck** | `npm run typecheck` | **PASS** | `tsc --noEmit` (0 errors) |
| **Code Linting** | `npm run lint` | **PASS** | `eslint .` (0 errors, 0 warnings) |
| **Unit & Component Tests** | `npm run test` | **PASS** | **13 suites, 88/88 tests green** |
| **WCAG 2.2 AA Contrast** | `npm run test:contrast` | **PASS** | **27/27 token pairs pass** (Light & Dark, up to 16.89:1) |
| **Content Truthfulness** | `npm run verify:content` | **PASS** | Zero unverified claims, no fake testimonials |
| **Originality & Provenance** | `npm run verify:originality` | **PASS** | 100% original team work, 0 copied phrases of 8+ words |
| **Next.js Production Build** | `npm run build` | **PASS** | **All 61 static & dynamic routes compiled with Turbopack** |

---

## 5. Getting Started & Local Development

### Prerequisites
* **Node.js:** `v20.x` or later (LTS recommended)
* **npm:** `v10.x` or later

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/karthick007-ghost/karka_academy_sitesprint.git
cd karka_academy_sitesprint

# 2. Install dependencies cleanly
npm ci

# 3. Start local development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Key Commands
```bash
npm run dev             # Start Turbopack local development server
npm run build           # Build optimized Next.js production bundle
npm start               # Run Next.js production server
npm run typecheck       # Run strict TypeScript check
npm run lint            # Run ESLint with jsx-a11y and security rules
npm run test            # Run Vitest test suites (88 tests)
npm run test:contrast   # Run automated WCAG 2.2 AA luminance contrast audit
npm run verify:content  # Verify content truthfulness flags
npm run verify:originality # Verify originality and asset provenance
npm run verify:all      # Execute full verification pipeline in order
```

---

## 6. Project Structure

```
karka_academy/
├── docs/                   # Architectural specs, strategy & compliance docs
│   ├── 02_DESIGN_SYSTEM.md # Color palettes, tokens & typography rules
│   ├── 11_UI_UPGRADE_SPEC.md # Neo-classical UI upgrade specification
│   ├── PROVENANCE.md       # Asset, font & library licensing log
│   └── RELEASE_NOTES.md    # Detailed release notes & fact audit
├── public/                 # Static assets, posters & brand artwork
│   ├── brand/              # AI-generated Pixar-style 3D mascots
│   ├── posters/            # Fallback posters for 3D career tracks
│   └── favicon.ico
├── src/
│   ├── app/                # Next.js App Router routes (61 pages)
│   │   ├── courses/        # Course catalog & [slug] curriculum pages
│   │   ├── for/            # Audience hubs (college, graduates, switchers)
│   │   ├── pay-after-placement/ # Interactive PAP journey & comparison
│   │   ├── placements/     # Verified alumni records & video reviews
│   │   └── internships/    # Agile Tribers commercial capstones
│   ├── components/
│   │   ├── cursor/         # Unified custom cursor & fine-pointer guards
│   │   ├── forms/          # Zod-validated lead capture & honeypot traps
│   │   ├── layout/         # Glass header, footer & mobile action bar
│   │   ├── motion/         # View transitions & sliding pill navigation
│   │   ├── ornament/       # Procedural SVG Tamil Kolam dividers
│   │   ├── sections/       # Modular page sections & Course3DVisual
│   │   ├── theme/          # Circular reveal theme provider & toggle
│   │   ├── three/          # WebGL orbit scene & procedural track geometry
│   │   └── ui/             # Radix primitives, tilt cards & glass surfaces
│   ├── content/            # Typed, truthfulness-flagged curriculum data
│   ├── lib/                # Device capability detection, schemas & utils
│   └── styles/
│       ├── globals.css     # 3D transforms, custom cursor & View Transitions
│       └── tokens.css      # Dull ivory, burgundy & obsidian design tokens
└── tests/                  # Unit, security, contrast & a11y test suites
```

---

## 7. AI-Use Disclosure & Originality Guarantee

This project was engineered by our **2-member independent team** pairing with **Google Antigravity**:
* **Human Team Role:** Strategic UX vision, brand translation from Instagram `@karka.ai`, factual verification of academy mentorship data, ethical policy design, and rigorous visual QA across mobile and desktop.
* **AI Pair-Programming Role:** Rapid component scaffolding, mathematical 3D vector geometry generation, automated luminance contrast mathematics, and Zod schema validation pipelines.
* **Originality Guarantee:** 100% of website layouts, typography hierarchies, vector illustrations, and copy were authored originally for this competition. The old academy site was used strictly as a baseline of factual records; no run of 8+ words was copied, and zero third-party corporate trademarks were scraped.

---

## 8. License

Created for the Karka Academy Website Redesign Competition. Released under the [MIT License](LICENSE).
