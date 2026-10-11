# 05 — QA & Test Plan ("no bugs" = gates + independent verification)

Zero defects can't be *proven*; it's approached by layered automated gates, cross-device checks, and an independent agent whose job is to break the site. **No agent verifies its own work.**

## Gate pipeline (`npm run verify:all`, in this order; any failure stops the line)
| # | Gate | Tool | Pass criteria |
|---|---|---|---|
| 1 | Types | `tsc --noEmit` (strict) | 0 errors |
| 2 | Lint | ESLint (+ jsx-a11y, security) + Prettier check | 0 errors, 0 warnings |
| 3 | Content | `verify:content` | no `todo` values, no lorem/TODO/placeholder strings in production data; all internal links resolve; every image has alt |
| 4 | Unit/component | Vitest + Testing Library | all pass; coverage ≥ 85% on `src/lib`, ≥ 70% overall |
| 5 | Build | `next build` | no warnings; route table matches sitemap |
| 6 | E2E | Playwright | all pass on 5 projects (below); **zero console errors/warnings** and zero failed network requests per page |
| 7 | A11y | axe-core on every route + manual keyboard script | 0 serious/critical; keyboard path works end-to-end |
| 8 | Security | `test:sec` | headers present, CSP no violations, abuse suite passes, no secrets in bundle, `npm audit` clean |
| 9 | Performance | Lighthouse CI (mobile + desktop) | mobile: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95; desktop Perf ≥ 95; LCP ≤ 2.2s, CLS ≤ 0.05, TBT ≤ 200ms; JS/CSS budgets from `AGENTS.md` |
| 10 | Visual regression | Playwright screenshots | no unintended diffs at 360/768/1024/1440/1920 (baselines reviewed by A11 agent) |
| 11 | Link/crawl | crawl all internal + external links | no 404/5xx; external links allowed to be flaky only if whitelisted |

## Playwright projects (device/browser matrix)
Chromium desktop · Firefox desktop · WebKit desktop · **Pixel 7** (Chromium mobile) · **iPhone 14** (WebKit mobile) · plus a **low-end profile**: CPU 4× throttle, Slow 4G, `deviceMemory=2`, `saveData` → asserts the 3D poster fallback is used and budgets hold. Also runs with `prefers-reduced-motion: reduce` and forced-colors.

## Test inventory (minimum)
**Unit (Vitest)**
- `track-finder`: every answer combination maps to a valid track; School → Python for Kids; unknown input rejected.
- `schemas`: phone normalisation (+91, spaces, leading 0, 10 vs 9 vs 11 digits, starts with 5 → invalid), name rules (Tamil letters ok, digits/emoji/HTML rejected), consent required, program/audience allowlists.
- `rate-limit`: 6th request in window → 429; window reset; per-phone limit.
- `lead-sinks`: console sink; Supabase/Resend sinks mocked; failure of one sink doesn't leak details.
- `seo`: JSON-LD valid JSON, `<` escaped; canonical URLs correct.
- `verify-content`: fails on `todo`, passes on `site`/`confirmed`.
- Contrast script: all token pairs listed in `02` meet their stated ratio.

**Component**: Header menu (open/close, focus trap, Esc), Accordion (keyboard), Tabs, Carousel (keyboard/swipe), Lead form (errors, loading, success, failure), Sticky action bar (hides on keyboard/overlap), Counter (reduced motion → final value instantly).

**E2E journeys**
1. Home loads, hero visible, H1 correct, no console errors, no layout shift (CLS measured).
2. Visitor → Track Finder → result → "Book a call" → form prefilled → submit → success → WhatsApp link correct and encoded.
3. Header audience nav → each `/for/*` page loads; breadcrumbs/back work.
4. Courses filter by audience/track; course detail renders curriculum + CTA; unknown slug → styled 404.
5. PAP page: terms card, FAQ accordion, CTA.
6. Placements/Internships: gallery navigation, video loads only on click, modals trap focus and close with Esc.
7. Contact: form validation errors (each field), server 400 shown field-level, 429 shown kindly, offline state handled.
8. Mobile: sticky bar doesn't cover form fields/focus; menu usable at 360px; tap targets ≥ 44px (assert bounding boxes).
9. 3D: capability check true → canvas appears, no CLS, pauses off-screen; false → poster only; WebGL context loss → poster fallback (simulated).
10. Keyboard only: tab order logical, visible focus everywhere, skip link works, no traps.
11. Reduced motion: no scroll-triggered motion, no auto-rotating 3D, counters static.
12. Zoom 200% and text-only zoom: no clipped/overlapping content, no horizontal scroll.

**Security (`tests/security`)**: all headers on all route types (HTML, API, static assets); CSP Report-Only → enforced with zero `securitypolicyviolation` events across the crawl; `/api/lead` abuse cases — missing/extra fields, 10 KB body, wrong content-type, wrong Origin, XSS payloads (`<script>`, `"><img onerror>`), SQLi strings, header-injection newlines, unicode edge cases, replay of same token, 6 rapid requests, honeypot filled, bad Turnstile token; ensure responses never echo raw input or stack traces; production bundle grep for `SERVICE_ROLE`, `SECRET`, `sk_`; `npm audit`; gitleaks.

**SEO/Structured data**: sitemap lists all MVP routes; robots ok; each page has unique title (≤ 60) and description (≤ 160); canonical; OG/Twitter images render; JSON-LD (`EducationalOrganization`/`LocalBusiness` with address + geo, `Course`, `FAQPage`) validates; `lang` attribute; hreflang if i18n.

## Manual bug-bash charter (A11 "Breaker")
Fresh eyes, no access to implementation notes. Spend a full pass trying to break: rapid clicking, back/forward, refresh mid-submit, double-submit, slow/offline network, tiny and huge viewports, rotate device, zoom, long names, emoji, paste weird text, disable JS, block 3D/WebGL, ad-blocker, Safari quirks (100vh, backdrop-filter, sticky). Also a **human-feel review**: copy tone, hierarchy, spacing rhythm, alignment, contrast in glass areas (screenshot-sample worst-case), any "AI slop" per `02`. Output: `docs/qa/breaker-report.md` with severity, repro steps, screenshots.

## Severity and exit criteria
S0 (data loss, security hole, crash, broken primary CTA) · S1 (broken journey, a11y blocker, console error) · S2 (visual/UX defect) · S3 (nit).
**Release only when:** all 11 gates green on a clean `npm ci && verify:all` run, **0 open S0/S1/S2**, S3 listed, red-team report signed off, Breaker report re-verified after fixes, and a final fresh-clone smoke test passes.

## Bug loop
Reporter files `docs/qa/bugs/BUG-###.md` (severity, steps, expected/actual, evidence) → owner agent fixes with a regression test → QA re-runs the failing gate **and** the full pipeline → Breaker re-checks. Never close a bug without a test that fails before the fix.
