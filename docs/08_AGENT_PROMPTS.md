# 08 — Per-Agent Prompts

You do not need to paste these yourself: `MASTER_PROMPT.md` makes the Orchestrator dispatch them automatically. (Only paste a block into its own agent if you want to rerun one agent manually.) Every prompt assumes the repo contains `AGENTS.md` and `docs/`.

Common footer (included in every prompt): *Follow `AGENTS.md`. Edit only files you own (`docs/06`). Finish with a walkthrough artifact: summary, commands run with real output, screenshots at 360/768/1440px, known issues. Do not mark yourself done; list the gates you passed and let A9 re-run them.*

---
## A1 — Content & Brand
Read `docs/01`, `docs/07`, `docs/10` (research findings and red flags), `docs/site-audit/content.clean.json` + `audit-report.md` (use ONLY items marked `site`; never the raw `content.json`), and every file in `brand/reference/` (Instagram screenshots, logo, mascot). There are ~37 courses, not 24; extend the track model accordingly.
1. Write `docs/brand-extraction.md`: dominant colours (hex), fonts/lettering style, imagery style, tone of captions, motifs. Compare with the proposed palette in `docs/02` and recommend whether the **accent** should change (never the neutrals).
2. Build `src/content/*` (typed data + Zod schema) from `docs/07`: site, tracks, courses (all ~24, deduped), placements, projects, faqs, testimonials. Every item gets a `verified` flag. Never invent numbers, names, salaries or fees; unknowns are `todo`.
3. Write final UI copy per `docs/01` §9: hero, PAP section, CTAs, FAQ rewrites, empty states, form messages. Keep the "No institute can promise a job. What we promise: you don't pay until you have one." line as a *proposed* PAP line.
4. Implement `scripts/verify-content.ts` (fails on `todo` in production, on lorem/TODO strings, on broken internal slugs, on missing alt).
5. **Originality:** the old site's text is reference only. Rewrite all copy in a fresh voice (facts stay, wording changes; no 8+ word runs from `docs/site-audit/content.json`). Create `docs/PROVENANCE.md` and `scripts/check-originality.ts` + `verify:originality` per `docs/09`. Never put downloaded old-site, Instagram or third-party-logo files in `public/`; show partner companies as plain text names.
6. Maintain `docs/handoffs/open-questions.md` with the academy data requests from `docs/07`.
Gate: `npm run verify:content` and `typecheck` green; unit tests for the script.

## A2 — Design System & UI Kit
Read `docs/02` closely.
1. Implement `src/styles/tokens.css` and Tailwind theme exactly from `docs/02`. Load Fraunces + Instrument Sans + Noto Tamil fallbacks with `next/font`.
2. Build all primitives listed in `docs/02` with every state, using Radix/React Aria for accessible behaviour. Glass and paper variants. Focus rings per spec. 44px targets.
3. Write `scripts/check-contrast.ts` that asserts every pair in the `docs/02` table meets its stated ratio; run it in `verify:all`.
4. Build a `/dev/kit` route (excluded from sitemap and production build) showing every component/state for visual review.
Gate: contrast script, lint/type, component tests, screenshots of `/dev/kit` at 360/768/1440.

## A3 — Frontend A: Home
Compose the home page from `docs/01` §7 using A1 data and A2 primitives. You own header, footer, hero shell (H1, CTAs, logo strip, lazy `HeroScene` import with poster fallback from A6), proof bar, Why Karka bento, PAP section (scroll-driven steps + terms card), tracks section, 4 pillars, FAQ, final CTA + form (A7's form logic).
Requirements: mobile-first, sticky mobile action bar, one deduplicated accessible logo marquee, `content-visibility:auto` below the fold, no CLS, reduced-motion safe.
Gate: E2E journey 1, 2 (with A4's Track Finder), 8, 10, 11, 12; Lighthouse mobile ≥ 90 on `/`.

## A4 — Frontend B: Courses & Audiences
Build `/courses` (track segmented control + audience chips + search), `/courses/[slug]` (hero, outcomes, curriculum, tools, project, duration, sticky CTA, JSON-LD hook for A8), `/for/[audience]` pages, and the **Track Finder** per `docs/01` §8 with a pure, exhaustively unit-tested `src/lib/track-finder.ts` and `?track=` allowlist handling.
Gate: unit tests cover every answer combination; E2E journeys 2, 3, 4; axe clean.

## A5 — Frontend C: Trust Pages
Build `/pay-after-placement` (how it works, terms-at-a-glance card, honest FAQ, comparison of upfront-fee vs PAP stated neutrally), `/placements` (learner cards, deduped logos, video poster-first), `/internships` (project showcase, modal or detail pages with focus trap), `/about`, `/contact` (form, click-to-load map, WhatsApp, phone), legal pages, branded 404.
`todo` data must degrade gracefully (section hidden, not broken) in dev and fail the production content check.
Gate: E2E journeys 5, 6, 7; axe clean; keyboard walkthrough recorded.

## A6 — 3D & Motion
Build `src/components/three/HeroScene` per `docs/02` (Orbit scene, budgets, capability gate, pause off-screen, context-loss + error-boundary fallback to poster). Generate the poster WebP from the same scene (script in `scripts/`). Provide `useCapability()`, reveal-on-scroll utilities, tilt-card hook (disabled on touch/reduced motion), animated counter honouring reduced motion.
Measure and report: triangles, DPR, JS size of the lazy chunk (≤ 250 KB gzip), FPS on a throttled profile, CLS = 0 on poster→canvas swap.
Gate: E2E journey 9 & 11; Lighthouse mobile unaffected (3D not in the critical path).

## A7 — Backend & Security
Implement `docs/04` and the `docs/03` lead API contract: Zod `.strict()` schemas shared with client, `/api/lead` pipeline, Turnstile verify, honeypot/time-trap, rate limiting (Upstash + in-memory fallback), `LeadSink` adapters (console, Supabase with RLS migration SQL, Resend), env validation, security headers + CSP (Report-Only first, then enforce; apply the decision rule), `/api/csp-report`, form hook + component logic for A3/A5 to style. Include `supabase/migrations/*.sql`.
Gate: unit tests for schemas/rate-limit/sinks; `test:sec` abuse suite green (coordinate with A9); no secrets in bundle.

## A8 — SEO, Performance & A11y
Metadata API per route, `sitemap.ts`, `robots.ts`, dynamic OG images, JSON-LD (`EducationalOrganization` + `LocalBusiness` with geo, `Course`, `FAQPage`; escape `<`). Audit bundle (`@next/bundle-analyzer`), images, fonts, third-party scripts, layout shift. Run axe + manual a11y review; file fixes as handoffs to the owning agent with exact selectors/lines.
Gate: unique titles/descriptions, valid structured data, budgets met on all MVP routes.

## A9 — QA Engineer
Implement everything in `docs/05`: Vitest/Testing Library, Playwright with the 5-project matrix + low-end profile, axe, visual regression baselines, Lighthouse CI budgets, link crawl, `test:sec`, GitHub Actions workflow running `verify:all` on PRs. Add stable `data-testid`s via handoff requests only. Console-error/network-failure guard in a shared Playwright fixture.
Re-run the **entire** pipeline after every merge; report failures with logs to the owning agent. You may not weaken a test to make it pass.
Gate: `npm run verify:all` green from a clean `npm ci`.

## A10 — Red-Team Security Reviewer (read-only on code)
Attack the running preview and review source against `docs/04`: headers/CSP bypass attempts, XSS vectors (query params, form echo, JSON-LD), form abuse, rate-limit evasion (header spoofing, rotating IPs, case/format tricks on phone), origin/CSRF checks, SSRF/open-redirect, dependency and secret scan (`npm audit`, `gitleaks`), bundle inspection, source-map exposure, error leakage, third-party script risk. Write `docs/security/report.md` with severity, proof, fix guidance. After owners fix, re-test and sign off. Do not edit source.

## A11 — Breaker / UX Reviewer (no access to implementation notes)
Use the browser agent to run the bug-bash charter in `docs/05` across the device matrix and produce `docs/qa/breaker-report.md` with screenshots/recordings. Also review: hierarchy, rhythm, copy tone, "human feel", glass-area contrast, anti-slop checklist from `docs/02`, and whether a first-time parent understands PAP in 10 seconds. File bugs as `docs/qa/bugs/BUG-###.md`; re-verify fixes. Do not edit source.
