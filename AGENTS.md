# AGENTS.md — Karka Academy Redesign

Every agent reads this file first, every session. If your tool also looks for `GEMINI.md` or `.agent/rules/`, copy this file there.

## Mission
Redesign and build a modern, responsive, high-performance website for **Karka AI & Tech Academy** (karka.academy, Nagercoil, Tamil Nadu). It must:
1. Reflect the brand seen on Instagram `@karka.ai` (see `brand/reference/`).
2. Showcase career tracks and the **Pay After Placement (PAP)** model clearly and honestly.
3. Highlight student placements and real internship projects.
4. Give a Gen-Z-friendly, mobile-first experience that converts visitors into enrolments (free career call, WhatsApp, apply).

Winning criteria: design quality, UX clarity, conversion thinking, performance, security, zero visible bugs.

## Read order
`docs/01_STRATEGY_AND_UX.md` → `docs/02_DESIGN_SYSTEM.md` → `docs/03_ARCHITECTURE_AND_STACK.md` → `docs/04_SECURITY.md` → `docs/05_QA_TEST_PLAN.md` → `docs/06_AGENT_ROSTER_AND_PHASES.md` → `docs/07_CONTENT_MODEL.md` → `docs/09_SUBMISSION_AND_RULES.md` → `docs/10_RESEARCH_FINDINGS.md`. Your own brief is in `docs/08_AGENT_PROMPTS.md`.

## Non-negotiables
1. **Truthful content.** Never invent statistics, salaries, fees, testimonials, company names, or student names. Use only data in `src/content/*` with a `verified` flag (`site` | `confirmed` | `todo`). `todo` values must render as hidden/omitted in production and fail `npm run verify:content`.
2. **Security by default.** Validate all input on the server (Zod), no `dangerouslySetInnerHTML` with dynamic data, strict CSP and security headers, no secrets in client bundles, no PII in logs. See `docs/04_SECURITY.md`.
3. **Accessibility is a gate, not a polish step.** WCAG 2.2 AA. Use only colour pairs approved in `docs/02_DESIGN_SYSTEM.md`. Respect `prefers-reduced-motion`, keyboard-only use, 44×44px touch targets.
4. **Performance budgets** (mobile, Slow 4G, mid-range Android): LCP ≤ 2.2s, CLS ≤ 0.05, INP ≤ 200ms, initial JS ≤ 170 KB gzip (3D chunk lazy-loaded, ≤ 250 KB gzip, skipped on low-end devices).
5. **No self-certification.** You do not mark your own work done. Done = the gates in your brief pass, evidence attached (command output, screenshots at 360/768/1440px, a recording for interactive flows), and the QA agent has re-run them.
6. **Zero console errors or warnings** on every route, in dev and production builds.
8. **Originality (competition rule).** The site must be original and created by our 2-person team. The old karka.academy site is *reference only*: reuse facts, never layout, visuals or wording (no run of 8+ words copied). Ship only team-made or clearly licensed assets, all listed in `docs/PROVENANCE.md`. No third-party company logos, no templates or copied designs. Full rules: `docs/09_SUBMISSION_AND_RULES.md`.
9. **Versions:** do not trust version numbers written in these docs. Run `npm view <pkg> version` and use current stable releases of Next.js, React, Tailwind, etc. Keep them on patched releases (frameworks have had serious security advisories, including a 2025 React Server Components RCE).

## Commands (Phase 0 creates all of these)
```
npm run dev            # local dev
npm run build && npm start
npm run lint           # eslint (+ jsx-a11y, security rules)
npm run typecheck      # tsc --noEmit, strict
npm run test           # vitest unit + component
npm run test:e2e       # playwright, all projects
npm run test:a11y      # axe on every route
npm run test:sec       # headers, CSP, form-abuse tests
npm run lighthouse     # lhci with budgets
npm run verify:content # no todo/lorem/placeholder in production data
npm run verify:originality # no copied copy/assets, provenance complete
npm run verify:all     # everything above, in order
```

## Conventions
- TypeScript strict, no `any` (use `unknown` + Zod). Server Components by default; `"use client"` only where needed.
- Styling: Tailwind with design tokens from `src/styles/tokens.css`. No hard-coded hex values in components.
- Content lives in `src/content/` as typed data validated by Zod at build time. Components never contain marketing copy literals beyond UI chrome.
- One component per file, named exports, co-located tests. Keep files under ~250 lines.
- Images: `next/image`, AVIF/WebP, explicit width/height, `priority` only on the LCP image. Alt text written by a human mindset (describe purpose, not "image of").
- Git: branch per agent `agent/<id>-<topic>`, small commits, conventional commit messages. Only edit files you own (see `docs/06`). Need a change elsewhere? Write a request in `docs/handoffs/<from>-to-<to>.md` and tell the orchestrator.

## When blocked or unsure
State the question, your best assumption, and proceed on that assumption while flagging it in `docs/handoffs/open-questions.md`. Do not stall, and do not silently guess about facts (fees, salaries, numbers); mark those `todo`.
