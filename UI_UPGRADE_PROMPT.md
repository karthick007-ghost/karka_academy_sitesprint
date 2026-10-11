# UI UPGRADE PROMPT: the only prompt to run now (copy everything below the line into ONE Antigravity agent)

Use this when the site is already built (Next.js 16.4, React 19, Tailwind v3, Radix, r3f). It upgrades the UI/UX: depth, motion, 3D tied to the content, glass, cursor effects, and a full light + dark mode. Put `docs/11_UI_UPGRADE_SPEC.md` in the project first; it holds the details this prompt refers to.

---

You are **U0, the Orchestrator** for a team of parallel agents upgrading the UI/UX of the existing Karka AI & Tech Academy website, built for a 2-person competition entry. Run the whole upgrade in this one session. **Do not wait for further prompts.** Pause only for the plan approval in step 1. If you need a human decision, log it in `docs/handoffs/open-questions.md`, take a documented assumption, and continue.

## Goal
Take the current UI (dark, flat, text-only cards, no motion, no 3D, no light mode) to a standout, human-feeling, **modern + classic** experience: "Neo-Classical Tamil Editorial × Glass Depth". Required: **light and dark themes** with a toggle; **3D visuals related to the site's content**; glassmorphism; tab/filter changing effects; sliding effects; page transitions; cursor effects; micro-interactions; excellent UX on mobile first.

## Binding rules (read first)
`AGENTS.md`, `docs/02`, `docs/04`, `docs/05`, `docs/09`, `docs/10`, and **`docs/11_UI_UPGRADE_SPEC.md` (the spec for this work)**.
- **Originality:** the team's own design. Reference sites and component libraries (Magic UI, Aceternity UI, etc.) are inspiration or building blocks only: confirm a permissive licence, list them in `docs/PROVENANCE.md`, recompose and restyle so nothing is recognisable as a copied template. Do not clone any site. 3D objects are original procedural geometry; any downloaded model or image needs a licence and a provenance entry.
- **Truthfulness:** audit UI claims against `docs/10`. "VERIFIED CURRICULUMS", a "PAP ELIGIBLE" badge on every card, "₹0 Upfront", and "₹40,000 flat" must be driven by data flags and shown only when the academy has confirmed them; otherwise use neutral wording. Never invent numbers, names or testimonials.
- **No regressions:** all existing behaviour (filtering, Track Finder, forms, validation, rate limiting, headers/CSP) keeps working. `npm run verify:all` must stay green after every merge.
- **Performance and accessibility are gates:** budgets and rules in `docs/11` §8 (≤ 1 WebGL context; JS ≤ 170 KB gzip initial, 3D chunk ≤ 250 KB gzip lazy; LCP ≤ 2.2 s, CLS ≤ 0.05, INP ≤ 200 ms on the low-end profile, in both themes). WCAG 2.2 AA in both themes. Every effect honours `prefers-reduced-motion`, works with keyboard, and degrades by device tier; touch devices never get cursor effects.

## Workflow
1. **Plan:** read everything, inspect the running app and codebase, then post an implementation plan artifact (what exists, what changes, risks, file ownership). Wait for the human's approval of this plan only.
2. **Phase 0, baseline (U0 + U8):** run the app; capture baseline screenshots of every route at 360/768/1440 px, dark theme (current look); record Lighthouse and bundle sizes; inventory `tokens.css` and every hard-coded colour. Commit a baseline tag `ui-baseline`.
3. **Spawn parallel agents** (max 5 at once; fewer if rate-limited). Enforce ownership; cross-agent needs go through `docs/handoffs/`.

| Agent | Mission | Owns |
|---|---|---|
| **U1 Theme & Tokens** | Semantic tokens for light + dark exactly per `docs/11` §3; refactor every component to semantic tokens (no raw hex); theme toggle (System/Light/Dark), cookie-based no-flash, circular View-Transition reveal with fallbacks; both-theme contrast script | `src/styles/**`, theme provider/toggle, `scripts/check-contrast.ts`, `tailwind.config` |
| **U2 Motion & Transitions** | `src/lib/motion.ts` presets; Next 16.4 `<ViewTransition>` page transitions (directional, shared-element morph, anchored header, Suspense reveal); sliding tab/chip indicator, crossfade content, layout-animated grid, carousel primitive, scroll-linked storytelling, reveal/stagger, reduced-motion tiers | `src/lib/motion.ts`, `src/components/motion/**`, transition CSS |
| **U3 3D & Imagery** | One shared Canvas with drei `View`; hero Orbit; 8 original track objects; tier A/B/C fallbacks; posters for both themes; kolam SVG ornaments; Tamil "கற்க" display element | `src/components/three/**`, `public/posters/**`, `src/components/ornament/**` |
| **U4 Glass, Cursor & Surfaces** | Glass surfaces (both themes), elevation, grain; spotlight glow, magnetic buttons, follower ring with labels, tilt + glare cards (fine-pointer only, dynamic import); micro-interactions (press, underline, counters, skeleton shimmer, scroll progress, accessible word-reveal) | `src/components/ui/**`, `src/components/cursor/**` |
| **U5 Pages A** | Apply to Home and Courses per `docs/11` §6 (header regroup + glass, hero, glass filter panel with sliding pill, 3D course cards with morph to detail, bento rhythm, empty states) | `src/app/page.tsx`, `src/app/courses/**`, `src/components/layout/**`, home/courses sections |
| **U6 Pages B** | Apply to Pay After Placement (sticky storytelling, glass terms card), Placements, Internships (carousel), About, Contact, legal, 404 | those routes and sections |
| **U7 Perf & A11y Guard** | Audit every effect against budgets; tier logic; INP on 37-card filtering; focus order, focus rings in both themes, forced-colors; fixes via handoff | read-mostly; owns `src/lib/capability.ts` |
| **U8 QA** | Visual regression (routes × light/dark × 5 widths), both-theme axe + contrast, reduced-motion and touch-emulation runs, one-WebGL-context assertion, theme no-flash test, View Transition fallback tests, Lighthouse both themes; never weakens a test to pass | `tests/**`, CI config |
| **U9 Design Critic (independent)** | Browser-agent review at 360/768/1440 in both themes against the anti-slop checklist and `docs/11`; checks consistency, hierarchy, spacing rhythm, readability on glass, motion taste (too much or too little), and **similarity to any reference site** (flag anything that looks copied); files `docs/qa/ui-critique.md` and bugs | `docs/qa/**` only |

4. **Phases** (gate each with real evidence: command output, before/after screenshots in both themes, recordings of interactions):
   - **P1 Foundations (parallel U1, U2, U3 spike):** tokens + theme; motion system + transitions; 3D feasibility (single Canvas + Views on a mid-range profile). Gate: contrast script green in both themes, no theme flash, a demo route showing transitions, spike FPS/size numbers.
   - **P2 Components (parallel U3, U4, U2):** 3D track objects + posters; glass/cursor/tilt/micro-interactions; tabs/carousel/scroll primitives. Gate: each component has tests and a `/dev/kit` showcase (excluded from production) in both themes.
   - **P3 Pages (parallel U5, U6):** apply components. Gate: E2E journeys still pass; screenshots both themes.
   - **P4 Guard (parallel U7, U8, U9):** performance, accessibility, QA, critique. Fix loop with regression tests until no S0/S1/S2 remain.
   - **P5 Polish and release (U0):** update README screenshots (both themes), `docs/PROVENANCE.md`, `docs/RELEASE_NOTES.md` (what changed, remaining `todo` claims), run `npm ci && npm run verify:all` from a fresh clone.
5. **No self-certification.** U8 re-runs the full pipeline after every merge; U7/U9 are independent of the builders. Merge order: U1 → U2 → U3 → U4 → U5/U6 → U7 fixes.
6. **Taste bar:** restraint over spectacle. Motion must explain state (where am I, what changed, what can I press). If an effect hurts performance or readability, cut it. The site must be fully usable with every effect disabled.

## Definition of done
Light and dark parity on every route; 3D track objects on course cards and hero with working tier fallbacks; page transitions, filter/tab effects, sliders, glass and cursor effects working and degrading cleanly; contrast and axe green in both themes; one WebGL context; budgets met; `verify:all` and `verify:originality` pass from a fresh clone; U9 critique has no open S0/S1/S2; README and provenance updated.

## Final deliverables
Upgraded repo with passing CI; before/after screenshots (mobile + desktop, both themes) and a short screen recording of the transitions, theme toggle, filter effects and 3D cards; `docs/RELEASE_NOTES.md`; `docs/qa/ui-critique.md`; a 10-line summary.

Begin now: confirm you've read everything, then post your plan.
