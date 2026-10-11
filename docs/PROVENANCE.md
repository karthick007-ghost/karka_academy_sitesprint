# Provenance & Asset Licensing Log

**Project:** Karka AI & Tech Academy Redesign  
**Team:** 2-Member Independent Team  
**Compliance Rule:** Every asset, font, and third-party library shipped in this project must be documented with source, license, and usage authorization. No third-party corporate logos or uncredited external materials are permitted.

---

## 1. Typography & Fonts

| Font Name | Usage | Source / Provider | License | Added By | Notes |
|---|---|---|---|---|---|
| **Fraunces** | Editorial Serif Headings (H1, H2, numerals) | Google Fonts via `next/font/google` | SIL Open Font License 1.1 | Team (Phase 0) | Self-hosted via Next.js font optimization; zero external font network requests. |
| **Instrument Sans** | Clean UI & Body Copy | Google Fonts via `next/font/google` | SIL Open Font License 1.1 | Team (Phase 0) | Self-hosted via Next.js; Latin character subset. |
| **Noto Serif Tamil** / **Noto Sans Tamil** | Regional Tamil typography fallback | Google Fonts via `next/font/google` | SIL Open Font License 1.1 | Team (Phase 0) | Dedicated Tamil script fallback for regional authentic accents. |

---

## 2. Iconography & Graphical Assets

| Asset / Library | Usage | Source / Provider | License | Added By | Notes |
|---|---|---|---|---|---|
| **Lucide React** | All system UI icons | npm (`lucide-react`) | ISC License | Team (Phase 0) | Modern, consistent stroke icons; tree-shaken. |
| **Custom SVG Mascot & Badges** | Hero visual and brand accents | Team created (`public/mascot/`, `src/components/ui/`) | Proprietary / Team-created | Team (Phase 0) | Fresh team-authored vectors inspired by `@karka.ai` brand aesthetic; no scraped files from `docs/site-audit/assets/`. |
| **Track Fallback Posters (SVGs)** | Light and dark mode fallback posters for 8 career tracks (`public/posters/fullstack-light.svg`, `public/posters/fullstack-dark.svg`, `public/posters/gen-ai-light.svg`, `public/posters/gen-ai-dark.svg`, `public/posters/data-science-light.svg`, `public/posters/data-science-dark.svg`, `public/posters/data-ml-light.svg`, `public/posters/data-ml-dark.svg`, `public/posters/design-light.svg`, `public/posters/design-dark.svg`, `public/posters/digital-media-light.svg`, `public/posters/digital-media-dark.svg`, `public/posters/marketing-light.svg`, `public/posters/marketing-dark.svg`, `public/posters/content-marketing-light.svg`, `public/posters/content-marketing-dark.svg`, `public/posters/cloud-devops-light.svg`, `public/posters/cloud-devops-dark.svg`, `public/posters/business-light.svg`, `public/posters/business-dark.svg`, `public/posters/business-nontech-light.svg`, `public/posters/business-nontech-dark.svg`) | Team created (`public/posters/`) | Proprietary / Team-created | Team (U3 Lead, Phase 2) | Procedurally matching 3D career track geometries; WCAG 2.2 AA compliant. |
| **Brand Reference Imagery** | Social brand reference (`brand/mascot-hero.jpg`, `brand/mascot-intern.jpg`) | Instagram reference | Fair use / Reference | Team (Phase 0) | Reference brand moodboard assets. |
| **Hiring Partner Representation** | Partner recognition section | Plain-text typography | N/A (Standard text) | Team (Phase 0) | **Zero third-party corporate logos used** (complies strictly with competition trademark rules). |

---

## 3. Core Open-Source Libraries

| Package | Purpose | License | Added By |
|---|---|---|---|
| `next` | React application framework & App Router | MIT | Team (Phase 0) |
| `react`, `react-dom` | UI component runtime | MIT | Team (Phase 0) |
| `tailwindcss` | Utility-first CSS engine | MIT | Team (Phase 0) |
| `@radix-ui/*` | Unstyled accessible UI primitives (Dialog, Tabs, Accordion) | MIT | Team (Phase 0) |
| `framer-motion` | Motion and reveal animations | MIT | Team (Phase 0) |
| `three`, `@react-three/*` | WebGL 3D Hero scene | MIT | Team (Phase 0) |
| `zod` | Type-safe schema validation (client & server) | MIT | Team (Phase 0) |
| `react-hook-form` | Form state management | MIT | Team (Phase 0) |
| `@upstash/ratelimit` | Rate limiting algorithm | MIT | Team (Phase 0) |
| `vitest`, `@testing-library/*` | Component and unit testing harness | MIT | Team (Phase 0) |
| `@playwright/test`, `axe-core` | E2E and WCAG 2.2 accessibility test suite | Apache 2.0 / MPL 2.0 | Team (Phase 0) |

---

## 4. Verification Check
- The `scripts/check-originality.ts` script programmatically verifies that all files in `public/` are cataloged in this document and ensures that no files from `docs/site-audit/assets/` have been copied into `src/` or `public/`.
