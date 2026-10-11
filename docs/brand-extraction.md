# Brand Extraction & Identity Analysis

**Subject:** Instagram `@karka.ai` vs Current Site Audit  
**Author:** A1 (Content & Brand Lead)  
**Date:** October 2026

---

## 1. Visual Audit of Instagram `@karka.ai` Reference Media
Reviewing the 6 high-resolution Instagram post and story screenshots in `brand/reference/`:
- **Dominant Energy:** High-contrast, vibrant creator aesthetic with punchy warmth. Strong orange/saffron accents paired with deep dark surfaces and warm cream underlays.
- **Key Motifs:** Clean geometric cards, punchy typography, bold single-accent highlights rather than generic purple-to-blue gradients.
- **Tone of Captions:** Direct, community-grounded, motivating, action-oriented. Speaks to aspiring tech learners in Tier 2/3 Tamil Nadu looking for tangible career outcomes.
- **Logo & Mascot:** Clean sans-serif wordmark "KARKA" paired with a friendly, high-tech AI Robot Mascot.

---

## 2. Comparison: Old Site vs Instagram vs Redesign Direction

| Dimension | Old Live Site (`karka.academy`) | Instagram (`@karka.ai`) | Our Redesign Direction | Rationale |
|---|---|---|---|---|
| **Primary Theme** | Purple/Plum (`#4a044e`) & Fuchsia | Vibrant Orange/Saffron & Dark Contrasts | **"Quiet Luxury × Saffron Glass"** | Purges the generic AI-startup purple gradient while elevating institutional trust for parents and learners. |
| **Neutral Base** | Pure `#ffffff` + cold `#0f172a` | Deep Night + Warm Tones | **Paper (`#F7F3EC`) + Forest (`#0F3D2E`)** | Warm editorial paper gives a tactile, credible feel; deep forest green anchors stability and trust. |
| **Accent Color** | Fuchsia / Amber gradient | Vivid Saffron/Orange | **Saffron (`#FF6A2B`) & Saffron-Ink (`#A63A0B`)** | Direct match to the Instagram creator energy; verified contrast on both dark and light surfaces. |
| **Typography** | Generic mixed sans | Modern bold sans | **Fraunces + Instrument Sans + Noto Tamil** | Editorial serif for gravitas, clean sans for UI ergonomics, native Tamil fallback for regional authenticity. |

---

## 3. Recommended Token Palette (Approved)
The proposed design tokens in `docs/02_DESIGN_SYSTEM.md` and `src/styles/tokens.css` perfectly synthesize the Instagram aesthetic with parental trust:
- `--paper: #F7F3EC` / `--paper-2: #EFE8DB`
- `--ink: #14171F` / `--ink-2: #4A4F5C` / `--ink-3: #6B6F7B`
- `--saffron: #FF6A2B` / `--saffron-ink: #A63A0B` (Text-safe variant, 5.88:1 on paper)
- `--forest: #0F3D2E` (10.99:1 on paper)
- `--night: #0B0F14` / `--night-2: #121821` / `--night-text: #F3EEE4` / `--mint: #7BE0AD`
