# 11 — UI Upgrade Spec: depth, motion, 3D, glass, light + dark

Applies to the **existing** build (Next.js 16.4, React 19, Tailwind v3 + `tokens.css`, Radix, r3f). It supersedes the "single theme" decision in `docs/02`: the site now ships **light and dark**. Everything else in `docs/02`–`docs/05` still binds (contrast, budgets, security, originality).

## 1. Diagnosis of the current Courses page
**Works:** clear hierarchy, strong serif headline, good dark base, saffron CTA, filter chips with counts, search, instant filtering, "PAP only" toggle.
**Missing / weak:**
- Flat surfaces: no depth, glass, light or texture. Cards and filter panel look identical.
- No imagery or 3D tied to the content: courses are text-only; nothing says "AI / design / data / cloud".
- No motion language: no tab/filter transitions, no page transitions, no scroll choreography, no hover feedback beyond colour.
- No light theme; no theme toggle.
- Header is crowded (8 items + CTA); group secondary links.
- Headline wraps with a one-word second line: use `text-wrap: balance`.
- Chip rows are two heavy rows; on mobile they must become a horizontal scroller with snap and fade edges.
- No regional identity beyond the Tamil word on the home page.

**Claim audit (UI copy vs `docs/10`):** "VERIFIED CURRICULUMS", "PAP ELIGIBLE" on every card, "₹0 Upfront" in the nav, and a "₹40,000 flat" fee are only allowed if the academy has confirmed them (which courses, which conditions). Until then use neutral wording ("Curriculum overview", no per-card PAP badge, "Pay after placement" without amounts). Do not remove the badge component; drive it from data (`papEligible: true | todo`).

## 2. Design language: "Neo-Classical Tamil Editorial × Glass Depth"
**Classic:** serif display type (Fraunces), hairline rules, section numerals (01, 02), generous margins, pull quotes, paper grain in light mode, kolam (rangoli line-pattern) ornaments, restrained palette.
**Modern:** glass surfaces, bento grids, kinetic type, soft 3D objects, scroll-linked motion, spotlight hover, magnetic buttons, view transitions.
**Rule:** classic structure, modern surface. Every effect must support comprehension (where am I, what changed, what can I press) and honour reduced motion.

## 3. Light and dark themes
### Semantic tokens (components use only these)
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F7F3EC` | `#0B0F14` |
| `--bg-elev` (cards) | `#FFFFFF` | `#121821` |
| `--bg-sunken` | `#EFE8DB` | `#0B0F14` |
| `--text` | `#14171F` (16.2) | `#F3EEE4` (16.6) |
| `--text-muted` | `#4A4F5C` (7.4 on bg, 8.19 on white) | `#A9B0BD` (8.82 on bg, 8.17 on elev) |
| `--accent` (fill) | `#FF6A2B` with `--on-accent` `#14171F` (6.27) | same |
| `--accent-text` | `#A63A0B` (5.88 on bg, 6.5 on white) | `#FF6A2B` (6.73 on bg, 6.24 on elev) |
| `--positive-text` | `#0B6B45` (5.93 bg / 6.56 white) | `#7BE0AD` (12.0 bg / 11.12 elev) |
| `--border-ui` (inputs, toggles; needs ≥3:1) | `#7C7768` (4.04 bg, 3.67 sunken) | `#6B7587` (4.14 bg, 3.84 elev) |
| `--border-soft` (decorative hairlines) | `rgba(20,23,31,.10)` | `rgba(255,255,255,.10)` |
| `--focus` ring (2px + 2px offset) | `#0F3D2E` (10.99) | `#7BE0AD` (12.0) |
Ratios above are computed WCAG ratios. `scripts/check-contrast.ts` must test **both** themes and fail the build on regressions. Saffron is never used as text in light mode.

### Behaviour
- Modes: **System (default) / Light / Dark**. Persist in a cookie (read on the server to set `data-theme` on `<html>`) so there is **no flash**; avoid inline scripts that break CSP (use the nonce approach or the cookie).
- Toggle: icon button in header (and in mobile menu) with accessible name and state. On click, use the **View Transitions API** for a circular reveal expanding from the button (`clip-path` on `::view-transition-new(root)`); fallback to a 200 ms crossfade; **instant** under `prefers-reduced-motion`. Update `<meta name="theme-color">` and `color-scheme`.
- Images/3D adapt: 3D scene uses different lighting and environment per theme; posters exist for both themes.
- Glass per theme: **dark** `rgba(255,255,255,.06–.10)` + blur 18px + 1px `rgba(255,255,255,.14)` border + inner top highlight; **light** `rgba(255,255,255,.62)` + blur 16px + 1px `rgba(20,23,31,.08)` border + soft shadow. Text on glass sits on an underlay that guarantees ≥4.5:1; `@supports not (backdrop-filter)` and `prefers-reduced-transparency` fall back to solid `--bg-elev`.

## 4. Motion system (one source of truth: `src/lib/motion.ts` + CSS variables)
- Durations: micro 120–180 ms; UI 200–280 ms; reveals 450–700 ms; page 350–450 ms. Easing: `cubic-bezier(.2,.7,.2,1)` (out), spring `{stiffness:300, damping:30}` for layout moves.
- Animate **transform and opacity only** (plus `clip-path` for the theme reveal and `filter: blur` ≤ 3px briefly). No layout-thrashing animations.
- Reveal-on-scroll once, staggered ≤ 60 ms, never replay on scroll-up.
- Reduced motion tiers: (1) no motion, instant state change; (2) keep opacity fades only. Respect the OS setting and offer no toggle that overrides it.
- No scroll-jacking and no smooth-scroll hijack libraries in v1. Use native scroll plus CSS scroll-driven animations and `IntersectionObserver`.
- Performance: ≤ 60 ms input response on mid-range Android; `will-change` only during an animation; pause everything off-screen and in hidden tabs.

## 5. Effects catalogue (each needs: spec, fallback, test)
### 5.1 Page transitions (Next.js 16.4 + React `<ViewTransition>`)
Per the Next.js guide, view transitions work in the App Router without config and route navigations activate them; `<Link transitionTypes={[...]}>` marks direction. Build:
- **Directional slides:** list → detail = `nav-forward` (content slides left, 60 px + fade); back = `nav-back`. Wrap each `page.tsx` (not the layout) in `<ViewTransition>` with enter/exit maps and `default="none"`.
- **Shared-element morph:** a course card's title/media morphs into the course detail header (`name={\`course-${slug}\`}`, `share="morph"`). Same name on both sides.
- **Anchored header:** give the header `viewTransitionName: 'site-header'` and neutralise its group animation so it never slides.
- **Suspense reveal:** skeleton slides down/fades out, content slides up/fades in (asymmetric 150/210/400 ms).
- Always add `::view-transition { pointer-events: none }` and the reduced-motion override. Browsers without support just navigate normally; test Firefox and Safari fallbacks.

### 5.2 Tab, filter and list effects
- **Sliding indicator:** active tab/chip pill glides between items (Motion `layoutId`), with a spring; keyboard arrow navigation (Radix Tabs / roving tabindex).
- **Content change:** same-route crossfade with a 12 px directional offset based on tab order; container height animates to avoid jumps.
- **Course grid filtering:** cards use layout animation (`AnimatePresence mode="popLayout"`) so they reflow smoothly; the "Showing X of 37" count animates; empty state is illustrated and offers "Clear filters".
- **PAP toggle:** switch with a knob spring and a subtle glow; no confetti.
- **Mobile chips:** horizontally scrollable, snap, edge fade masks, active chip auto-centres.

### 5.3 Sliding and scroll choreography
- **Carousels** (projects, learner stories, course highlights): CSS scroll-snap + pointer drag with momentum, progress bar, arrow buttons, keyboard and screen-reader labelling, `aria-roledescription="carousel"`.
- **Pay After Placement storytelling:** sticky section where the 8 steps advance with scroll (CSS `animation-timeline: scroll()` with an IntersectionObserver fallback); a vertical progress line draws as you scroll.
- **Marquee** for partner names (plain text), pausable, duplicated once, `aria-hidden` clone.
- **Section numerals and rules** slide/draw in on entry.

### 5.4 Glass and depth
Sticky header turns glass after 8 px scroll (blur + border fade); filter panel, floating action bar, modals and "Terms at a glance" card use glass; cards use elevation shadows + inner highlight; optional grain overlay (≤1 KB data URI). Max 3 blurred layers on screen; no blur on long mobile lists.

### 5.5 3D and imagery tied to the site
- **One WebGL context only.** Use a single r3f `<Canvas>` with drei `<View>` regions (it scissors one canvas into many scenes that follow their HTML boxes); never one canvas per card.
- **Hero "Orbit":** glass-like core with 8 orbiting track chips; pointer parallax on desktop, gentle drift on mobile.
- **Track objects** (small, low-poly, soft-lit, one per track), rendered in course cards and track headers: Full-stack = layered stack of glass slabs with `</>`; Gen AI = neural-sphere (nodes + links); Data/ML = bar/line "crystal" chart; Design = pen-nib/bezier handle; Digital media = play-button prism; Content & marketing = megaphone/speech-bubble; Cloud & DevOps = cloud with orbiting gears; Business/finance = abacus/ledger. Original, procedural geometry (no downloaded models). If a model file is used, it must be licensed and listed in `docs/PROVENANCE.md`.
- **Tiers:** (A) capable desktop: live 3D; (B) mid mobile: 3D only for the focused card, 30 fps cap, DPR ≤ 1.25; (C) low-end / `saveData` / reduced motion / no WebGL2: pre-rendered WebP posters (both themes), zero CLS. Context loss → poster.
- **Kolam ornament:** original SVG line patterns (dots-and-loops) drawn with animated `stroke-dashoffset` behind headers and section dividers; static under reduced motion. Tamil word "கற்க" large, outlined, with a slow parallax; keep `lang="ta"` and a Tamil-capable font.

### 5.6 Cursor and pointer effects (fine pointer only)
Enable only when `(hover: hover) and (pointer: fine)` and not reduced motion. Never hide the native cursor.
- **Spotlight glow** on cards/panels following the pointer (CSS vars `--mx/--my`, a radial gradient overlay).
- **Magnetic primary buttons** (≤ 8 px pull, spring back).
- **Follower ring** (small, lags slightly) that grows on interactive elements and shows a label ("Drag", "View") on carousels/cards. Off inside form fields and on touch.
- **Tilt cards** (±5°) with moving glare; off on touch.
All handlers use passive listeners and `requestAnimationFrame`, no per-event React state.

### 5.7 Micro-interactions
Press state (scale .98), animated link underline, counter roll-up (static under reduced motion), skeleton shimmer, toast with spring, scroll-progress hairline at the top, heading word-reveal (split by CSS/spans with the full text in `aria-label`), copy-to-clipboard confirmations, focus ring animation, success check draw on form submit.

## 6. Courses page, concretely
1. **Header:** logo, 4 primary links (Courses, Pay After Placement, Placements, Internships), "More" menu (About, Contact, For You), theme toggle, CTA. Glass on scroll.
2. **Hero:** badge (neutral wording until claims confirmed), balanced headline, kolam line art, floating 3D track objects drifting in parallax behind the text (tier-aware).
3. **Filter panel (glass):** search with keyboard shortcut `/`, PAP toggle, track chips with sliding pill and counts, sort control, "Clear filters".
4. **Course card:** 3D track object top-right (View), track label, title, 1-line outcome, duration/level chips (only if confirmed), hover: spotlight + tilt + "Peek curriculum" reveal; click: shared-element morph to the detail page.
5. **Grid:** bento rhythm (1 large featured card per 6), layout-animated reflow, skeleton on load, animated count.
6. **Empty and error states:** illustrated, on-brand.

## 7. Reference sites: inspiration only, never to be copied
Originality rule (`docs/09`) applies. Study the *principle*, then design our own.
| Reference | Learn this (principle) |
|---|---|
| [Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions) (opened) | Shared-element morph, directional slides, anchored header, reduced-motion handling, with working demo and CSS |
| [drei `View` docs](https://drei.docs.pmnd.rs/portals/view) (opened) | Many 3D scenes on one canvas via scissoring, following HTML elements |
| [Linear](https://linear.app) (opened) | Dark-first restraint, one clear type scale, editorial "Fig" captions, product-led visuals |
| [Magic UI](https://www.magicui.design) (opened) | Open-source animated React/Tailwind/Motion components (e.g. animated theme toggler, marquee). Licence not stated on the page: check the GitHub repo before use |
| [Aceternity UI](https://ui.aceternity.com) (opened) | 3D card, glare card, glowing effect, aurora and beam backgrounds. Some assets are premium: check the Licence page before use |
| [Motion](https://motion.dev) (not opened) | Layout animations, shared layout (`layoutId`), springs, `AnimatePresence` |
| [Awwwards gallery](https://www.awwwards.com/websites/) (not opened) | Browse "Site of the Day" winners for motion, typography and layout ideas |
| Stripe, Vercel, Arc websites (not opened, from general knowledge) | Gradient/glass depth, scroll storytelling, polished light and dark parity |
How to use libraries: building blocks only, MIT/permissive licence confirmed, each listed in `docs/PROVENANCE.md`, and **re-styled and recomposed** so nothing is recognisable as a copied template. Never paste a template's page layout.

## 8. Performance and safety guards for effects
- Initial JS stays ≤ 170 KB gzip; 3D chunk ≤ 250 KB gzip, lazy, after idle; **≤ 1 WebGL context** (assert in tests).
- LCP ≤ 2.2 s, CLS ≤ 0.05, INP ≤ 200 ms on the low-end profile in both themes.
- Effects degrade by tier; the site is fully usable with every effect disabled.
- No new third-party scripts. CSP unchanged (no `unsafe-eval`).
- Cursor and tilt code is pointer-only; touch devices never download it (dynamic import behind a media-query check).

## 9. Test additions (`docs/05`)
- Visual regression: every MVP route × light/dark × 360/768/1024/1440/1920.
- Contrast script covers both themes; axe runs in both themes; forced-colors mode checked.
- Theme: no flash on load (screenshot at first paint), persistence across reload, system-change follows, toggle keyboard-operable, reveal animation absent under reduced motion.
- Transitions: directional nav works in Chromium; Firefox and Safari fall back gracefully; no click loss during a transition.
- Effects: cursor effects absent on touch emulation; spotlight/tilt don't cause long tasks; reduced-motion run shows no motion; carousel keyboard and screen-reader checks.
- 3D: one canvas only; tier fallback verified; context-loss simulated; CLS 0 on poster→canvas swap.
- Performance: Lighthouse on both themes, mobile and desktop; INP measured on filter interactions with all 37 cards.
