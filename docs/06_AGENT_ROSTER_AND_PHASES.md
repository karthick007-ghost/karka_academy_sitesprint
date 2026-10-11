# 06 — Agent Roster, File Ownership & Phases

Antigravity runs multiple agents in parallel (Manager view). Parallelism only works if agents don't edit the same files, so ownership is explicit. If you hit model rate limits, run 3 agents at a time in the order given. If the model picker allows it, give the strongest reasoning model to A0, A7, A9, A10; faster models to the frontend agents.

## Roster
| ID | Agent | Mission | Owns (may edit) | Must not touch |
|---|---|---|---|---|
| A0 | **Orchestrator / Architect** | Scaffold, contracts, merge, resolve conflicts, final release | `package.json`, configs, `src/app/layout.tsx`, `docs/handoffs/*`, `docs/adr/*`, `README.md` | feature internals |
| A1 | **Content & Brand** | Typed content layer, copy, brand extraction from `brand/reference/`, `verify-content` | `src/content/**`, `scripts/verify-content.ts`, `docs/07` updates | UI components |
| A2 | **Design System & UI Kit** | `tokens.css`, fonts, Tailwind theme, all primitives in `components/ui`, contrast script | `src/styles/**`, `src/components/ui/**`, `scripts/check-contrast.ts`, `tailwind.config` | sections/pages |
| A3 | **Frontend A — Home** | Home page sections 2–6, 10–14 (header/footer, hero shell, proof bar, why, PAP section, tracks, pillars, FAQ, final CTA) | `src/app/page.tsx`, `src/components/layout/**`, `src/components/sections/home/**` | other routes |
| A4 | **Frontend B — Courses & audiences** | `/courses`, `/courses/[slug]`, `/for/[audience]`, Track Finder UI + logic | `src/app/courses/**`, `src/app/for/**`, `src/components/sections/courses/**`, `src/lib/track-finder.ts` | home, API |
| A5 | **Frontend C — Trust pages** | `/pay-after-placement`, `/placements`, `/internships`, `/about`, `/contact`, legal, 404 | those routes + `src/components/sections/trust/**` | home, API |
| A6 | **3D & Motion** | `HeroScene`, poster generation, capability detection, tilt cards, reveal utilities, reduced-motion handling | `src/components/three/**`, `src/lib/capability.ts`, `public/posters/**`, motion utils | page composition (A3 imports yours) |
| A7 | **Backend & Security** | `/api/lead`, schemas, sinks, rate limit, Turnstile, middleware/headers/CSP, env validation, CSP report endpoint | `src/app/api/**`, `src/lib/{schemas,security,rate-limit}.ts`, `src/lib/lead-sinks/**`, `middleware.ts`, `src/components/forms/**`(logic) | UI styling |
| A8 | **SEO, Performance & A11y** | Metadata, JSON-LD, sitemap/robots, OG images, bundle/image audits, a11y fixes via handoffs | `src/lib/seo.ts`, `src/app/{sitemap,robots}.ts`, `public/og/**` + handoff requests | feature logic |
| A9 | **QA Engineer** | Test harness + all suites in `05`, CI workflow, Lighthouse budgets | `tests/**`, `playwright.config.ts`, `vitest.config.ts`, `lighthouserc.json`, `.github/workflows/**` | `src/**` (except test ids via handoff) |
| A10 | **Red-Team Security Reviewer** | Independent security audit; writes report; verifies fixes | `docs/security/**` only (read-only on code) | all code |
| A11 | **Breaker / UX Reviewer** | Manual bug-bash + design/copy critique with browser agent | `docs/qa/**` only | all code |

Shared contracts (single owner, others consume):
- **Content schema & data** → A1. **Tokens & primitives** → A2. **API & form schema** (`src/lib/schemas.ts`) → A7. **`HeroScene` props** → A6. Changes need a handoff note and A0's approval.

## Phases and gates
**Phase 0 — Foundation (A0 alone).** Scaffold repo, install deps, add all npm scripts from `AGENTS.md`, empty-but-valid route stubs, `.env.example`, CI skeleton, strict TS/ESLint, copy docs into `docs/`. *Gate:* `npm run build`, `lint`, `typecheck` pass on the empty shell; commit baseline.

**Phase 1 — Contracts (parallel: A1, A2, A7, A9).** A1 content schemas + data + brand extraction report; A2 tokens + fonts + primitives + contrast script; A7 schemas + `/api/lead` + middleware headers (CSP Report-Only) + sinks; A9 test harness + first smoke tests. *Gate:* contrast script green; API abuse tests green; content verify runs; harness runs on stubs.

**Phase 2 — Build (parallel: A3, A4, A5, A6).** Frontend agents compose pages from A1 data + A2 primitives; A6 delivers `HeroScene` + poster + capability gate; A3 integrates hero. *Gate per agent:* lint/type/unit + their E2E journeys + screenshots at 360/768/1440 attached.

**Phase 3 — Hardening (parallel: A8, A9, A7).** SEO/JSON-LD/OG; perf + bundle audit; full test suites; CSP moved Report-Only → enforced. *Gate:* gates 1–9 green.

**Phase 4 — Independent attack (parallel: A10, A11; then fix loop).** Red team and Breaker report; owners fix; A9 re-runs everything; A10/A11 re-verify. *Gate:* exit criteria in `05`.

**Phase 5 — Release (A0).** Fresh clone → `npm ci` → `verify:all` → deploy preview → smoke test on real phones → production deploy → record demo video + screenshots → `docs/RELEASE_NOTES.md` listing every `site`-sourced (unconfirmed) claim and open questions for the academy.

## Handoff protocol
- Message format in `docs/handoffs/<from>-to-<to>.md`: *what you need, why, acceptance check, deadline phase*.
- Every agent ends its task with an **Artifact/walkthrough**: what changed, commands run with output, screenshots/recordings, known issues. Include real output, never "tests pass" without evidence.
- A0 merges in this order: A2 → A1 → A7 → A6 → A3/A4/A5 → A8 → A9; re-runs `verify:all` after each merge.
