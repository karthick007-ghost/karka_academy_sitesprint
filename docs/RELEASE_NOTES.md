# Release Notes & Verified Claims Documentation

**Version:** 1.0.0 (Production Redesign Release)  
**Date:** March 2026  
**Project:** Karka AI & Tech Academy Website Redesign  
**Repository:** Original Competition Submission (2-Person Engineering Team)

---

## 1. Overview of Redesign
This release is a complete, original rewrite and ground-up architectural rebuild of `karka.academy`. Designed for Gen-Z learners and ambitious students in Nagercoil, Kanyakumari District, and southern Tamil Nadu, the platform presents a modern, high-contrast visual identity inspired by Instagram `@karka.ai`, transparent Pay After Placement mechanics, and verifiable student outcomes.

---

## 2. Verified Claims Audit Table

Every claim rendered on the live website is backed by verified data from the academy crawl and documented in `src/content/`:

| Dimension | Live Fact Rendered on Site | Source & Verification Status |
| :--- | :--- | :--- |
| **Academy Name** | Karka AI & Tech Academy | Verified (`site`) |
| **Location** | Nagercoil, Kanyakumari District, Tamil Nadu 629001 | Verified (`site`) |
| **Founder & Mentor** | Sateesh Kumar (Ex-CTO Flow Global, Wipro, Yatra) | Verified (`site`) |
| **Experience** | 18+ Years Global Software Engineering | Verified (`site`) |
| **Phone Number** | `+91 94875 30243` | Verified (`site`) |
| **Email Address** | `contact@karka.academy` | Verified (`site`) |
| **WhatsApp Direct** | `https://wa.me/919487530243` | Verified (`site`) |
| **Pay After Placement Fee** | ₹0 upfront tuition; ₹40,000 flat fee upon placement | Verified (`site`) |
| **Weekly Commitment** | 30 hours (10 live + 10 lab drills + 10 assignments) | Verified (`site`) |
| **Course Count** | 37 Curated Technical & Career Courses | Verified (`site`) |
| **Client Studio** | Agile Tribers | Verified (`site`) |
| **Student Review** | Gabriel Samraj (Placed at Capecom Solutions) | Verified (`site`) |
| **Infini AI Platform** | `https://infini.karka.academy/` (₹1,00,000 Hackathon) | Verified (`site`) |
| **Spike AI Platform** | `https://spike.karka.academy/` | Verified (`site`) |

---

## 3. Deliberately Purged / Omitted Fabrications
In strict compliance with our Non-Negotiable Truthfulness Policy (`AGENTS.md`):
1. **Unverifiable Student Counts:** Dropped unverified template badges such as "500+ Students" or "1000+ Enrolled".
2. **Template Instructors:** Purged placeholder instructor cards (*John Doe*, *Sarah Connor*). Only verified leadership (*Sateesh Kumar*) is featured.
3. **Unconfirmed Testimonials:** Dropped all template reviews (*Priya, Arun, Vikram, Rahul*). Featured exclusively the verified student video testimonial (*Gabriel Samraj*).
4. **False 100% Placement Guarantees:** Replaced misleading guarantees with an explicit, honest disclaimer explaining that placement requires active participation, attendance, and sprint completion.
5. **Third-Party Company Logos:** Replaced all third-party corporate logos with clean typographic badge tags (Amazon, TCS, HCL, Matrimony.com, Novac, Sodisys).

---

## 4. Key Architectural Deliverables
- **Next.js 16 App Router + React 19:** 61 statically pre-rendered pages (`SSG`).
- **3D Orbit Canvas + Capability-Aware Fallback:** Three.js orbit scene lazy-loaded, automatically degrades to static CSS `HeroPoster` on low-end hardware, reduced motion, or data-saver mode.
- **Career Track Finder Quiz:** 4-step recommendation algorithm with instant pre-filling into lead capture.
- **Enterprise Security:** Strict CSP in `src/proxy.ts`, sliding window rate limiting, and honeypot bot trap on `/api/lead`.
- **WCAG 2.2 AA Contrast Compliance:** 27/27 color token pairs verified with automated luminance scripts across Light and Dark themes.

---

## 5. UI Upgrade & Aesthetic Innovations
1. **Neo-Classical Tamil Editorial × Glass Depth Palette:**
   - **Light Theme:** Soft, soothing dull ivory canvas (`#FBF8F1` elevated, `#ECE5D8` sunken, `#F7F3EB` base) eliminating eye strain from stark pure white, paired with deep royal burgundy (`#722030`) and ambient radial paint spray clouds.
   - **Dark Theme:** High-contrast obsidian slate (`#0B0F14` base, `#161D26` elevated) with glowing rose burgundy (`#E27D90`) accents and deep specular reflections.
   - **Accessible Fresh Green:** Upgraded positive metrics and success badges to readable fresh light-green (`#15803D` in Light mode with 4.53:1 contrast / `#4ADE80` in Dark mode with 11.03:1 contrast).
2. **Procedural 3D Motion Visual Engine across all 37 Courses:**
   - Replaced multi-context WebGL canvases (which exhausted browser limits after 8–16 cards) with a lightweight, GPU-accelerated CSS-3D and procedural multi-layer vector motion engine (`Course3DVisual`).
   - Every single course card on `/courses` now displays a custom, rotating 3D visual with real z-depth, continuous floating rotation, and interactive perspective tilt on cursor hover.
3. **Unified Single Custom Cursor:**
   - Completely resolved dual-pointer issues by toggling `.custom-cursor-active` on fine-pointer devices, hiding the OS arrow (`cursor: none !important`) so only the sleek precision dot and morphing trailing ring are visible.
   - Fully accessible: natively disabled on mobile/touch screens and `prefers-reduced-motion`, automatically switches to standard I-beam typing carets inside form fields.
4. **Comprehensive Audience & Journey Hubs:**
   - Fully overhauled `/for/college`, `/for/graduates`, `/for/switchers` with complete Light/Dark parity, dull ivory cards, and high-contrast typography.
   - Redesigned 8-step Pay After Placement interactive timeline with ivory milestone cards, burgundy guarantee callout, and live step progress tracking.

