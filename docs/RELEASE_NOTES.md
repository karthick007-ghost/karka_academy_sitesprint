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
- **Next.js 16 App Router + React 19:** 60 statically pre-rendered pages (`SSG`).
- **3D Orbit Canvas + Capability-Aware Fallback:** Three.js orbit scene lazy-loaded, automatically degrades to static CSS `HeroPoster` on low-end hardware, reduced motion, or data-saver mode.
- **Career Track Finder Quiz:** 4-step recommendation algorithm with instant pre-filling into lead capture.
- **Enterprise Security:** Strict CSP in `src/proxy.ts`, sliding window rate limiting, and honeypot bot trap on `/api/lead`.
- **WCAG 2.2 AA Contrast Compliance:** 12/12 color pairs verified with automated luminance tests.
