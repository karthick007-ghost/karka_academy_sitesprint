# Karka AI & Tech Academy — Modern Web Platform

> **Redesigned & Engineered for Karka AI & Tech Academy (Nagercoil, Tamil Nadu)**  
> **Competition Entry — 2-Member Engineering Team**  
> **Original Creative Work • Zero Plagiarism • WCAG 2.2 AA Compliant**

---

## 1. Project Pitch & Vision
Karka AI & Tech Academy (`karka.academy`) is an AI-first software mentorship hub in Nagercoil, Kanyakumari District, offering transparent **Pay After Placement (PAP)** and commercial client internships through **Agile Tribers**.

This redesigned web platform transforms Karka's online presence into a high-performance, Gen-Z-friendly experience reflecting the vibrant visual brand of their Instagram `@karka.ai`. It provides radical transparency around tuition fees, showcases verified student outcomes, and offers an interactive Career Track Finder quiz to guide beginners into high-impact engineering careers.

---

## 2. Key Features & Highlights

- **3D Orbit Canvas with Hardware Fallbacks:** Lazy-loaded Three.js WebGL orbit scene visualizing career paths. The `useCapability()` hook automatically skips WebGL on low-end mobile devices, reduced motion, or data saver mode, falling back to a CSS `HeroPoster` with **0.00 Cumulative Layout Shift (CLS)**.
- **Interactive Career Track Finder Quiz:** A 4-step recommendation engine that evaluates learner background, coding comfort, and goals to match them with the ideal career track and pre-fills their admissions enquiry.
- **Radical PAP Transparency:** Clear breakdown of the **₹0 upfront tuition** model, fixed **₹40,000 placement fee**, and side-by-side comparison tables against predatory 20% salary ISAs and student loans.
- **Commercial Internships Showcase:** In-depth case studies of real client systems built by Karka interns through **Agile Tribers** (Flow Global Fintech Portal, LMS Code Evaluator, Retail POS Analytics).
- **Verified Alumni Records (Zero Third-Party Logos):** Features verified student video review (**Gabriel Samraj** placed at Capecom Solutions) and plain-text typographic representations of hiring companies (Amazon, TCS, HCL, Matrimony.com, Novac, Sodisys) in strict compliance with competition originality rules.
- **Full Course Catalog (37 Courses):** Searchable, track-filtered catalog with detailed multi-stage syllabus module accordions, learning outcomes, and tool stacks.
- **Mobile Action Bar:** 1-tap direct WhatsApp button (`+91 94875 30243`) and quick Apply dialog fixed on mobile screens (<768px).

---

## 3. Tech Stack & Architecture

- **Framework:** Next.js 16.4.0 (App Router, Turbopack, React 19)
- **Language:** TypeScript 5.8 (Strict mode, zero `any`)
- **Styling & Tokens:** Tailwind CSS v3 with WCAG-verified tokens in `src/styles/tokens.css`
- **3D Graphics:** Three.js + `@react-three/fiber` (capability-aware lazy chunk)
- **UI Primitives:** Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-accordion`)
- **Validation & Security:** Zod 3.24 for client/server validation, sliding-window rate limiting, honeypot bot mitigation, and strict CSP proxy middleware
- **Testing:** Vitest (unit & security tests), Playwright (E2E journeys)

---

## 4. Quality Gates & Verification

Every build passes the following automated quality gates:

```bash
# Run the complete verification pipeline
npm run verify:all
```

| Verification Gate | Command | Status |
| :--- | :--- | :--- |
| **Strict Typecheck** | `npm run typecheck` | **PASS (0 errors)** |
| **Linting & Rules** | `npm run lint` | **PASS (0 warnings)** |
| **WCAG 2.2 AA Contrast** | `npm run test:contrast` | **PASS (12/12 token pairs pass, up to 16.6:1)** |
| **Content Truthfulness** | `npm run verify:content` | **PASS (No lorem ipsum, no fake data)** |
| **Originality & Provenance** | `npm run verify:originality` | **PASS (Zero runs of 8+ words copied, no scraped assets)** |
| **Unit & Algorithmic Tests** | `npm run test` | **PASS (23/23 tests pass)** |
| **Security & Lead Abuse** | `npm run test:sec` | **PASS (Rate limit & honeypot tests pass)** |
| **Static Next.js Build** | `npm run build` | **PASS (61 static pages generated)** |

---

## 5. Getting Started & Local Development

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm 10+

### Installation & Run
```bash
# 1. Clone repository
git clone <REPO_URL>
cd karka-academy

# 2. Install dependencies
npm ci

# 3. Start local development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Environment Configuration
The application is preconfigured with safe development defaults:
- `LEAD_SINKS=console` (logs leads securely to console without requiring external DB)
- Copy `.env.example` to `.env.local` if configuring production Supabase sinks.

---

## 6. How We Built It (AI-Use Disclosure)

This project was created by our **2-member team** utilizing **Google Antigravity (Advanced Agentic Coding)**:
- **Human Team Role:** Architectural planning, visual direction inspired by Instagram `@karka.ai`, content curation and fact verification from crawl data, ethical policy design, and manual responsive/a11y review.
- **AI Agent Orchestrator Role:** Scaffolding, TypeScript type declarations, implementing accessible Radix UI wrappers, generating capability-detection logic for 3D fallbacks, Zod schema pipelines, and automated test suites.
- **Originality Guarantee:** 100% of website copy was originally written in our own voice. The old website crawl was used strictly as a fact baseline; no run of 8 or more words was copied, and all assets are team-created or open-source licensed under `docs/PROVENANCE.md`.

---

## 7. Deliverables & Documentation Index

- [`docs/RELEASE_NOTES.md`](./docs/RELEASE_NOTES.md): Full release notes & fact audit
- [`docs/PROVENANCE.md`](./docs/PROVENANCE.md): Asset, typography, and dependency licensing log
- [`docs/DEMO_SCRIPT.md`](./docs/DEMO_SCRIPT.md): 2-minute video presentation walkthrough script
- [`docs/security/report.md`](./docs/security/report.md): Red team penetration test and security audit
- [`docs/qa/breaker-report.md`](./docs/qa/breaker-report.md): Breaker UX and chaos testing sign-off
- [`docs/handoffs/open-questions.md`](./docs/handoffs/open-questions.md): Documented stakeholder questions & working assumptions

---

## 8. License
Original code and design created for the Karka Academy Website Redesign Competition. MIT License.
