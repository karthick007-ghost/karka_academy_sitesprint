# 01 — Strategy & UX

## 1. The brief, decoded
| Brief says | What it really demands |
|---|---|
| Modern, responsive, high-performance | Mobile-first (most Nagercoil learners and parents browse on mid-range Android), strict perf budgets, no heavy 3D on weak devices |
| Reflects Instagram @karka.ai brand | Vibrant, youthful, creator-style energy. Pull real colours/mascot/tone from `brand/reference/` screenshots and the site's logo + robot mascot |
| Career tracks + Pay After Placement | PAP must be the *clearest* thing on the site: how it works, terms at a glance, honest limits |
| Placements + real internship projects | Proof, not claims: named learners, companies, project case studies with stack, screenshots, live links |
| Gen-Z UX → enrolments | Short paths to action: WhatsApp, 2-field form, track quiz, sticky mobile CTA bar |

Note: the current site's Infini AI card lists a "SiteSprint — website building" contest. If this is that contest, re-read its rules (allowed tools, AI usage, originality, submission format, judging weights) and tell the orchestrator; this plan assumes a normal open build.

## 2. Audit of the current site (live, fetched Oct 2026)
**Works well, keep:** audience entry points (School / College / Graduates / Professionals), PAP 3-step explanation, 6-reason "Why Karka", four-pillar job-readiness idea, internship section, FAQ with honest placement answer, local SEO keywords, WhatsApp contact, Infini AI (₹1,00,000 prize pool) and Spike AI platform cards.

**Gaps to fix (these are the redesign's opportunities):**
1. **Trust conflict:** hero shows "100% Placement" while the FAQ says placement can't be strictly guaranteed. Replace with specific, verifiable proof.
2. **PAP is vague:** no fee amount, minimum-salary threshold, payment window, or what happens if not placed. Add a "Terms at a glance" card (values `todo` until the academy confirms).
3. **Inconsistent/templated numbers:** "190+ enrolments" vs "800+" on different blocks; every course shows identical "4.8 (200 ratings)". Show only verified, consistent figures.
4. **Projects are claimed, not shown:** no gallery of real internship work. Build a project showcase (screenshots, stack, learner, mentor, live link).
5. **Placement logos duplicated** many times in the DOM (marquee repeated ~6×) → wasted weight. One accessible marquee, deduplicated.
6. **Course overload:** 6 course cards, then 8 track cards listing ~24 courses, overlapping. Use one structure: Track → Courses.
7. **Hero is text-only** and generic ("AI-Driven Software Developer"). Needs a memorable first impression and a clear single promise.
8. **Single video testimonial** and no learner photos/names on placements. Add real learner cards.

## 3. Audiences and jobs-to-be-done
| Audience | Real question | What we show first |
|---|---|---|
| Graduate / final-year student (primary) | "Will I actually get a job, and what if I can't pay?" | PAP explainer, placements, projects |
| Parent (decision-maker, often the visitor) | "Is this safe? Who are you? What's the catch?" | Terms at a glance, mentors, campus, honest FAQ, WhatsApp/phone |
| College student | "Can I build skills alongside college?" | Internship, short tracks |
| School student | "Is this for my child?" | Python for Kids, Infini AI |
| Working professional / switcher | "Can I switch into tech/AI?" | AI tracks, schedule, outcomes |

## 4. Positioning
**One-line promise:** *Learn first. Pay when you're hired.*
**Support line:** AI-first tech training in Nagercoil with live client internships and on-campus mentors.
**Differentiators vs online PAP players** (Masai, AccioJob, Sharpener etc. publish PAP terms prominently, so transparency is table stakes): physical labs + face-to-face mentors in Nagercoil, local hiring pipeline, AI-first curriculum, live client-project internships with certificate, Infini AI + Spike AI ecosystem.
**Brand story hook (confirm with academy):** "Karka" (கற்க) means *to learn* in Tamil. A small Tamil-script flourish gives the site regional authenticity that generic bootcamp sites lack.

## 5. Conversion architecture
Primary goal: **Book a free career call**. Secondary: **WhatsApp chat**, **Apply**.
- **Sticky header CTA** "Enroll Now" (glass bar). On mobile, a **bottom action bar**: WhatsApp · Call · Apply (never covers content or focus; hides when keyboard opens).
- **Track Finder (flagship interaction):** 4 questions, 60 seconds, recommends a track and pre-fills the lead form. Pure function, unit-tested (§8).
- **Lead form:** step 1 only name + phone + programme + consent. Optional details after success. Success state offers a pre-filled WhatsApp message.
- **CTA repetition:** hero, after PAP, after placements, final section, sticky bar. Same wording each time ("Book a free career call").
- **Objection handling in-flow:** PAP FAQ lives next to the PAP section (not just the footer).
- **Measurement:** privacy-friendly analytics (no cookies) with events: `cta_click`, `track_finder_complete`, `lead_submit`, `whatsapp_click`, `call_click`.

## 6. Sitemap
```
/                      Home
/courses               All tracks and courses (filter by audience/track)
/courses/[slug]        Course detail (curriculum, outcomes, project, duration, CTA)
/pay-after-placement   PAP: how it works, terms at a glance, FAQ, comparison vs upfront
/placements            Placement wall + learner stories (+ video)
/internships           Project showcase with case-study modals/pages
/for/[audience]        school-students | college-students | graduates | professionals
/about                 Story, mentors, campus
/roadmap               Free roadmap (lead magnet; optional)
/blog                  MDX list (stretch)
/contact               Form, map, WhatsApp, phone
/privacy-policy  /terms-of-service
404, error pages
```
MVP (must be flawless): Home, Courses, Course detail, PAP, Placements, Internships, Contact, legal, 404. Stretch: audience pages, About, Roadmap, Blog, Tamil toggle.

## 7. Home page, section by section
1. **Header** — glass bar, logo, audience nav (School · College · Graduates · Professionals), Courses, Placements, "Enroll Now". Mobile: full-screen menu, focus-trapped.
2. **Hero (night section)** — H1 "Learn first. Pay when you're hired." + support line; CTAs "Book a free career call" and "Find my track · 60 sec". Right: 3D scene (orbiting glass career-track chips around a core, see `02`). Tamil flourish "கற்க". Small "Our learners work at…" logo strip below.
3. **Proof bar** — 3–4 verified counters (learners trained, companies hiring, internship projects). Hidden if `todo`.
4. **Why Karka** — bento grid of the 6 reasons, tilt-on-hover cards, one large feature card for PAP.
5. **Pay After Placement** — scroll-driven 3 steps (Enroll & Learn → Get Job Ready → Get Paid, Not Billed), "Terms at a glance" card, honest line: *"No institute can promise a job. What we promise: you don't pay until you have one."* (needs academy approval), CTA.
6. **Career Tracks** — segmented control for 8 tracks; course cards with duration, level, outcome; audience filter chips.
7. **Track Finder** — inline quiz card.
8. **Internships & Projects** — featured project carousel (CSS scroll-snap, no heavy lib): screenshot, learner, stack tags, "what they built", live link.
9. **Placement Wall** — learner cards (photo, name, role, company), deduplicated logo marquee, video testimonials (poster image first, load video on click).
10. **Four Pillars** — Business communication · Modern apps · AI skills · Interview skills, as a sticky-stepper.
11. **Beyond the classroom** — Infini AI (₹1,00,000 prize pool, inter-college) and Spike AI cards linking out.
12. **FAQ** — accordion, `FAQPage` JSON-LD.
13. **Final CTA + lead form + map + WhatsApp.**
14. **Footer** — programmes, academy, contact, socials, legal.

## 8. Track Finder spec
Questions: (1) "I'm currently…" School / College / Graduate / Working. (2) "I enjoy…" Building apps / Data & AI / Designing / Creating content / Business & people. (3) "Coding comfort" None / Some / Comfortable. (4) "My goal" First job / Switch career / Skills alongside college / Just exploring.
Scoring: Q2 picks the track (apps→fullstack; data & AI→data-ml or genai by Q3; designing→design; content→digital-media or content-marketing; business→non-tech); Q1=School forces "Python for Kids"; Q3=None down-weights advanced courses. Output: top track + 1-line reason + 2 course suggestions + CTA with `?track=` (allowlist-validated). No data leaves the browser until the user submits the form.

## 9. Tone and microcopy
Warm, direct, confident, a little playful. Short sentences. Talk to the learner as "you". Plain English with light Tamil touches (opt-in). No jargon walls, no hype superlatives, no fake urgency. Buttons are verbs ("Book a free career call", "See the projects"). Errors are kind and specific ("Phone number should be 10 digits starting with 6–9").

## 10. Trust and compliance
- **Claims policy** in `07_CONTENT_MODEL.md`: every number has a source flag.
- **Consent (India DPDP Act 2023):** lead form has an unticked consent checkbox with plain-language purpose, link to privacy policy, stored consent timestamp + text version. (Design guidance, not legal advice; the academy should have counsel confirm.)
- Show who is behind the site (address, phone, email) in footer and contact.

## 11. How this maps to likely judging criteria
| Criterion | Where we win |
|---|---|
| Brand fit | Tokens from real brand assets; Tamil flourish; mascot reuse |
| UX | Track Finder, sticky mobile bar, clear PAP, 2-field form |
| Visual design | Quiet-luxury editorial base + vibrant saffron + selective 3D/glass |
| Performance | Budgets, lazy 3D, static generation |
| Conversion | Repeated single CTA, WhatsApp-first, objection handling |
| Engineering quality | Typed content, security headers, full test gates |
