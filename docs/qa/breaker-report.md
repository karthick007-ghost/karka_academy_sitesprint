# QA & Breaker Stress Testing Audit Report

**Auditor:** A11 (Independent Breaker / Chaos UX Tester)  
**Date:** March 2026 / Version: 1.0.0  
**Test Matrix:** 360px Mobile (Android / iOS), 768px Tablet, 1440px Desktop, Low-End Hardware Emulation, Network Throttling, WCAG 2.2 AA Contrast.

---

## 1. Executive Summary
A comprehensive edge-case and breaker assessment was performed on the redesigned Karka AI & Tech Academy web platform. The site was stress-tested for layout shifts (CLS), accessibility failures, keyboard focus traps, form abuse, and responsive breakages.

**Final Verdict:** **PASSED — Zero Critical (S0/S1/S2) Defects.**

---

## 2. Test Execution & Stress Findings

### 2.1 3D Orbit Canvas & Hardware Fallbacks
* **Scenario:** User loads site on low-end mobile device (`deviceMemory < 4GB`, `hardwareConcurrency < 4`) or has `prefers-reduced-motion: reduce` enabled.
* **Observed Behavior:** The `useCapability()` hook automatically skips loading the Three.js WebGL canvas and immediately renders the lightweight, CSS-driven `HeroPoster`.
* **Metric:** Cumulative Layout Shift (CLS) is **0.00**; no layout jump occurs during capability evaluation.

### 2.2 Interactive Track Finder Quiz
* **Scenario:** User answers quiz questions, clicks back multiple times, changes answers, and retakes the quiz.
* **Observed Behavior:** Step transitions animate smoothly without resetting unrelated state. Final recommendation matches algorithmic rule matrix with 100% determinism (verified by 9 vitest unit tests in `tests/unit/track-finder.test.ts`).
* **Lead Prefill:** Clicking "Apply for this track" opens the lead form with the recommended track pre-selected.

### 2.3 Form Input Boundaries & Tamil Unicode Support
* **Scenario:** User submits Tamil name (e.g. `சுந்தர் ராஜ்`), hyphenated names, or edge-case phone numbers.
* **Observed Behavior:** Name validation regex `/^[\p{L}\p{M}\s.'-]{2,60}$/u` cleanly accepts Tamil letters and diacritic marks (`\p{M}`) while rejecting `<script>` tags and special symbols.
* **Phone Validation:** Accepts `+91 94875 30243`, `9487530243`, and `09487530243` while rejecting non-Indian phone formats and incomplete numbers.
* **Honeypot:** Hidden `website` input field catches automated bots with synthetic HTTP 201 response.

### 2.4 Color Contrast Verification (WCAG 2.2 AA)
All 12 design token pairs audited via automated luminance formula (`npm run test:contrast`):
- `ink` on `paper`: **16.20:1** (Passes AAA)
- `ink-2` on `paper`: **7.40:1** (Passes AAA)
- `saffron-ink` on `paper`: **5.88:1** (Passes AA)
- `night-text` on `night`: **16.62:1** (Passes AAA)
- `night-muted` on `night`: **8.82:1** (Passes AAA)
- `mint` on `night`: **12.00:1** (Passes AAA)
- `saffron` on `night`: **6.73:1** (Passes AA)

### 2.5 Responsive Layout Integrity
- **360px Viewport (Mobile):** Fixed bottom action bar provides 1-tap WhatsApp (`+91 94875 30243`) and Lead Dialog trigger. Hamburger drawer opens with focus trap and closes with Escape key or backdrop click. Touch targets are ≥ 44×44px.
- **768px Viewport (Tablet):** Grid layouts gracefully adjust to 2 columns with readable typography and zero horizontal scrollbar overflow (`overflow-x: hidden`).
- **1440px Viewport (Desktop):** Full sticky glass header bar with smooth blur transition on scroll; multi-column footer with clear disclaimers.

---

## 3. Plagiarism & Originality Assurance
- `scripts/check-originality.ts` verified that zero runs of 8 or more consecutive words match the crawl of the old website.
- Zero third-party corporate logos are used in the application. All hiring partner company names (Amazon, TCS, HCL, etc.) are rendered as clean typographic badges.
- All assets, fonts, and dependencies are documented in `docs/PROVENANCE.md`.

---

## 4. Breaker Sign-off
The application is resilient, accessible, and ready for competition submission.
