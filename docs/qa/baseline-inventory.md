# Phase 0 Baseline Audit & Inventory Report

**Date:** March 2026  
**Auditor:** U0 (Orchestrator) + U8 (QA)  
**Git Baseline Commit:** Tag `ui-baseline`

---

## 1. Visual Snapshots Captured (24 Baseline Images)
All 8 core MVP routes captured across 360px mobile, 768px tablet, and 1440px desktop:
- `/` (Home): `home-mobile-360.png`, `home-tablet-768.png`, `home-desktop-1440.png`
- `/courses` (Courses): `courses-mobile-360.png`, `courses-tablet-768.png`, `courses-desktop-1440.png`
- `/courses/mern-fullstack` (Detail): `course-detail-mobile-360.png`, `course-detail-tablet-768.png`, `course-detail-desktop-1440.png`
- `/pay-after-placement` (PAP): `pap-mobile-360.png`, `pap-tablet-768.png`, `pap-desktop-1440.png`
- `/placements` (Placements): `placements-mobile-360.png`, `placements-tablet-768.png`, `placements-desktop-1440.png`
- `/internships` (Internships): `internships-mobile-360.png`, `internships-tablet-768.png`, `internships-desktop-1440.png`
- `/about` (About): `about-mobile-360.png`, `about-tablet-768.png`, `about-desktop-1440.png`
- `/contact` (Contact): `contact-mobile-360.png`, `contact-tablet-768.png`, `contact-desktop-1440.png`
*Stored at:* `docs/screenshots/baseline/`

---

## 2. Baseline Performance & Bundle Metrics
- **Static Pages Generated:** 61/61 static pages (`SSG`)
- **Build Compile Time:** 1786ms (Turbopack)
- **Static Page Generation Time:** 4.8s
- **Initial JS Bundle Budget:** ~115 KB gzip (well within ≤ 170 KB budget)
- **WebGL Contexts:** 1 (`hero-scene.tsx`)

---

## 3. Tokens & Hardcoded Color Inventory
### Existing Tokens (`src/styles/tokens.css`):
- Light palette: `--paper`, `--paper-2`, `--ink`, `--ink-2`, `--ink-3`, `--saffron-ink`, `--gold-ink`
- Brand accents: `--saffron`, `--forest`, `--gold`
- Dark palette: `--night`, `--night-1`, `--night-2`, `--night-3`, `--night-text`, `--night-muted`, `--mint`

### Hardcoded Hex References:
1. `src/app/layout.tsx`: `themeColor: "#0F3D2E"` (to be dynamically updated by theme)
2. `src/app/opengraph-image.tsx`: Satori flexbox inline styles (valid SVG image generation)
3. `src/components/three/hero-scene.tsx`: `color="#0F3D2E"`, `#FF6A2B`, `#7BE0AD` (to be overhauled into radiant celestial star)
4. `scripts/check-contrast.ts`: Test dictionary of hex codes

### Target Semantic Tokens Required (per `docs/11` §3):
`--bg`, `--bg-elev`, `--bg-sunken`, `--text`, `--text-muted`, `--accent`, `--accent-text`, `--positive-text`, `--border-ui`, `--border-soft`, `--focus`.
