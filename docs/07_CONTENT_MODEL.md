# 07 — Content Model & Claims Policy

Source: current karka.academy (fetched Oct 2026). Everything marked `site` was on the live site; the academy must confirm it before final submission. `todo` means *unknown, do not invent.*

## `verified` flag
`site` = taken from the current website · `confirmed` = academy confirmed in writing · `todo` = missing. Production build fails on `todo`.

## Claims policy
| Claim | Status | Rule |
|---|---|---|
| "100% Placement" (hero on current site) | conflicts with FAQ ("can't strictly guarantee") | **Do not use.** Replace with a specific, defined stat once confirmed (e.g. "N learners placed since YYYY") |
| "Pay after you get hired, ₹0 upfront tuition" | `site` | Keep; confirm whether any registration/material fee exists |
| "Guaranteed minimum salary" | `site`, amount missing | Show amount only when `confirmed`; otherwise omit the phrase |
| Enrolment counts (800+, 650+, 450+, 200+, 800+, 900+) | `site`, inconsistent with "190+" | Show only if reconciled and `confirmed` |
| "4.8 (200 ratings)" on every course | `site`, identical everywhere | Show as one aggregate with source, or omit |
| Course duration "6 to 8 months" | `site` (FAQ) | Keep per course once confirmed |
| Hiring partner logos | `site` | Amazon, TCS, HCL, Matrimony.com, Novac, Capecom, Flow, Sodisys. Confirm usage permission |
| Infini AI prize pool ₹1,00,000, rounds, contests | `site` | Keep |

## Site facts
```ts
site = {
  name: "Karka AI & Tech Academy", short: "Karka Academy",
  tagline: "The one and only exclusive AI Learning Center in Nagercoil",  // site
  address: "Nagercoil, Tamil Nadu, India",  // full street address: todo
  geo: { lat: 8.1801487, lng: 77.4311084 },  // from the site's Google Maps link
  phone: "+91 9487530243", whatsapp: "919487530243", email: "contact@karka.academy",
  social: { instagram: "https://www.instagram.com/karka.ai/", facebook: "https://www.facebook.com/karka.academy", linkedin: "https://www.linkedin.com/company/karka-academy/" },
  platforms: { infini: "https://infini.karka.academy/", spike: "https://spike.karka.academy/" },
}
```

## Audiences
`school-students`, `college-students`, `graduates`, `professionals` (slugs and nav labels as on the live site).

## Tracks → courses (from the live "Choose Your Career Track")
| Track slug | Courses |
|---|---|
| fullstack (Most popular) | MERN Fullstack · React + Java Fullstack · React + Python Fullstack |
| gen-ai | Generative AI Foundations · Generative AI Mastery · Gen AI (LLM) Developer |
| data-ml | AI & Data Science · Data Analytics with AI · Data Engineering |
| design | UI/UX Design · Web Designing · Graphic Designing |
| digital-media | Video Editing · Graphic Designing · Multimedia & Animation |
| content-marketing | Digital Marketing · SEO Analyst · Storytelling & Content Writing |
| other-tech | Cloud & DevOps · Data Engineering · Data Analytics with AI |
| non-tech | HR & Finance · Tally · Business Analyst |
Plus **Python for Kids** (school) and **Full Stack Developer Internship** (students). Duplicates across tracks (Graphic Designing, Data Engineering, Data Analytics with AI) → one course entity referenced by multiple tracks.

Existing course slugs: `mern-fullstack`, `ai-data-science`, `ui-ux-design`, `python-for-kids`, `fullstack-internship`, `genai-foundations`. Create slugs for the rest. Per-course `todo` fields: fee, syllabus modules, tools list, level, schedule, outcomes. A1 may draft **syllabus outlines** from general industry knowledge but must flag them `todo` until the academy confirms.

## Existing copy to reuse (rewrite for tone, keep meaning)
- **PAP:** "Learn from real mentors → get job ready (resume, portfolio, interview prep) → share your success once placed." Included: 1:1 mentorship, placement training, resume & LinkedIn preparation, mock interviews, job referral support.
- **Why Karka (6):** 1 Pay after you get hired · 2 AI-first curriculum · 3 Live internships over paper certificates · 4 Continuous on-site expert mentorship · 5 Direct regional & global hiring pipelines · 6 4-pillar job readiness.
- **4 pillars:** Business communication (listening, speaking, reading, writing) · Modern apps (web/mobile, data analytics, UI/UX, digital marketing) · AI skills (prompt engineering, AI automation, AI tools, LLM) · Interview skills (ATS-friendly profile, mock interview, group discussion, presentation).
- **Internship:** real client projects, project portfolio, collaboration, internship certificate.
- **FAQ (6):** What is PAP · Is placement guaranteed · Who are the mentors · Need a coding/CSE background (no) · How long (6–8 months) · Internship/project experience (yes).
- **Learner testimonial (`site`):** Gabriel Samraj, Frontend Developer, UI/UX course ("a game-changer… passionate instructors… up-to-date curriculum"); video at `/videos/gabrielsamraj.mp4`. Other learner names on the site (Prabin, Shiju, Kishore, Sridevi, REC): role/company/quote = `todo`.

## Data to request from the academy (put in `docs/handoffs/open-questions.md`)
1. Instagram brand colours/fonts/logo files + mascot source art.
2. PAP terms: fee per course, minimum salary threshold, payment window, instalments, what happens if not placed, any registration fee.
3. Verified numbers: learners trained, learners placed (+ period), partner companies, internship projects.
4. 6–10 learner placements with photo permission (name, role, company, quote).
5. 4–6 internship projects: title, learner, mentor, stack, 2 screenshots, live link, one-paragraph story.
6. Mentor profiles and campus photos; full street address; opening hours.
7. Permission to use partner logos; whether Tamil version is wanted.

## Zod schema sketch (`src/content/schema.ts`)
```ts
const Verified = z.enum(["site","confirmed","todo"]);
Course = { slug, title, track, audiences[], level, duration?, summary, outcomes[], modules[]?, tools[]?, internship:boolean, verified }
Placement = { name, role, company, track, photo?, quote?, year?, verified }
Project = { slug, title, learner, mentor?, stack[], summary, images[], liveUrl?, verified }
Faq = { q, a, verified }
```
`todo` fields are optional in dev and must resolve before a production build passes.
