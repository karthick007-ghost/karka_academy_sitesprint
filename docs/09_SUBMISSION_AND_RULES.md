# 09 — Competition Rules, Originality & Submission

## Organiser rules (as given)
- Team size: **2 members**
- Redesign the Karka website with **your own creative approach**
- Submit the **GitHub URL**
- Hosting is an **add-on** (bonus, not required)
- The website must be **original and created by the team**
- **Plagiarism or copied designs are not allowed**
- Follow all event guidelines and **maintain professionalism**

Open questions to confirm with the organisers in writing: Are AI coding tools allowed, and must their use be disclosed? What is the deadline and judging weight? Any required stack, repo format, or README content?

## Team roles (2 humans)
| Person | Owns | Reviews |
|---|---|---|
| Member 1 | Design, content, frontend (A2, A3, A4, A5, A6) | Backend/security output |
| Member 2 | Backend, security, QA, SEO, deployment (A7, A8, A9, A10, A11) | Frontend output |
Both: read every merged PR, run the site locally, and be able to explain any file. Both make real commits so the GitHub history shows two authors. Agents are tools; the team is the author.

## Originality policy
| Allowed | Not allowed |
|---|---|
| Karka's facts: course names, tracks, PAP terms, contact details, FAQ meaning | Copying the old site's layout, section order, or visuals pixel-for-pixel |
| Rewriting copy **in your own words and voice** | Pasting the old site's paragraphs, headings or testimonials verbatim (short factual items like course names are fine) |
| Your own layout, illustration, icons, 3D scene, animations, colour usage | Templates, themes, UI kits or Dribbble/Behance/Awwwards designs reproduced or "adapted" |
| Open-source libraries and fonts with a licence that permits use (MIT, OFL, etc.) | Competitors' (Masai, AccioJob, etc.) text, layout or assets |
| Karka's own logo and mascot **if** the academy permits, listed in provenance | Third-party company logos (Amazon, TCS, HCL…) without permission; use plain text names instead |
| Placeholder-free, truthful data supplied by the academy | Invented numbers, student names, photos, testimonials, fees |
| Stock/AI imagery **only** with a clear licence, labelled in provenance | Images downloaded from Google, Instagram or other sites without rights |

**Reference vs shipped.** `docs/site-audit/` (the research output) is *reference only*. Its downloaded `assets/` and `screenshots/` folders are git-ignored and never shipped. Anything in `public/` must be listed in `docs/PROVENANCE.md`.

## Provenance log (`docs/PROVENANCE.md`, required)
Table with: file or library · what it is · source URL or "created by team" · licence · who added it · permission note. Fonts (Fraunces, Instrument Sans, Noto Tamil: SIL OFL), icons (Lucide: ISC), libraries, any Karka-supplied assets, any AI-generated images (tool + prompt summary).

## Originality gate (`npm run verify:originality`, part of `verify:all`)
`scripts/check-originality.ts` must:
1. Compare all shipped text (`src/content/**`, page copy) with `docs/site-audit/content.json` and fail if any run of **8+ consecutive words** matches (ignore names, course titles, phone/email, and a short allowlist).
2. Fail if any file in `public/` is missing from `docs/PROVENANCE.md`.
3. Fail if `public/` contains files whose names or hashes match items in `docs/site-audit/assets/` unless listed as "Karka-supplied, permission confirmed".
4. Print a report listing the closest matches for human review.
This is a heuristic, not proof; the team still reviews by eye.

## AI-use disclosure
Add an "How we built it" section to the README: tools used (e.g. Antigravity, models), what the team wrote or decided by hand (concept, design direction, content choices, review, tests), and that all code was reviewed and understood by both members. If the organisers require a specific disclosure format, follow theirs.

## GitHub submission checklist
- [ ] Public repo (or judges added as collaborators), clear name e.g. `karka-academy-redesign`
- [ ] **README** with: project pitch (one paragraph), screenshots (mobile + desktop), demo GIF/video link, live URL (if hosted), feature list (Track Finder, PAP explainer, projects, 3D hero), tech stack and why, architecture sketch, setup in ≤ 5 commands, scripts table, test/QA results summary, security notes, performance scores, team names and roles, AI-use disclosure, credits, licence
- [ ] `.env.example` only; no secrets in history (`gitleaks` clean)
- [ ] `docs/PROVENANCE.md` complete; `verify:all` passes from a fresh clone
- [ ] `LICENSE` for the team's code; note that Karka's name, logo and content belong to Karka
- [ ] Both members have commits; history is readable, no giant "final" commit; no leftover `todo` data, dead code or debug logs
- [ ] Tag `v1.0-submission` and submit the repo URL exactly as the form asks
- [ ] Open the repo in a private window and confirm a stranger can read it and run it

## Hosting add-on
Deploy the finished build to Vercel (or similar) **after** all gates pass; add the URL to the README. The site must work in demo mode with no secrets (`LEAD_SINKS=console`). Say plainly in the README that the demo form does not store real enquiries unless sinks are configured.

## Professionalism
Respectful, accurate copy; no fake urgency or inflated claims; no offensive or political content; credit sources; meet the deadline and the submission format; reply to organisers politely and promptly.
