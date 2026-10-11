# 10 — Research Findings (crawl of karka.academy) and How to Treat Them

Source: the team's own crawl (`docs/site-audit/`: `raw_crawl_data.json`, `content.json`, screenshots, assets), built by `audit_collector.js` + `build_content_json.js`. This file was written from reading those scripts. Anything here still has to be checked against `raw_crawl_data.json` (see §3).

## 1. New facts (tag `site`; academy must still confirm)
- **PAP fee figure:** the Roadmap page says "Pay ₹40,000 only after placement" (step 8). Still unknown: which courses it covers, instalments, minimum salary, payment window. The Terms page says PAP is governed by a separate admission agreement signed at enrolment.
- **8-step programme flow:** Join Foundation → Expert Learning → Shared Success (pay after placement) → Placement Training (2 weeks) → Free internship at Agile Tribers → Interview schedule → Success → Payment.
- **Full-time schedule:** 30 hrs/week = 10 live + 10 classroom practice + 10 home assignments, 5 days a week. Part-time: unknown.
- **Support list:** dedicated placement officer, 2 weeks placement training, portfolio creation, learn-till-placement (LTP), pay-after-placement (PAP), internship at an "AI First Product Studio", up to 3 months after-job support, monthly mentorship, 1:1 sessions.
- **Mentor/founder:** Sateesh Kumar, founder of Karka Software Academy | Agile Tribers; 18+ years; ex-CTO of Flow Global (UK fintech); worked with Wipro and Yatra.com.
- **37 course pages** exist (not ~24): school (Python for Kids, Java Basics, HTML & CSS, JavaScript Juniors), college (Frontend/Backend Mastery, UI/UX, Python/Java/React mini, SQL Mastery), career tracks, plus Automation Testing, Mobile App Development, Data Science Foundation. Course pages carry duration, level, lessons, mode, curriculum modules, FAQs.
- **Infini AI** flow: Register → Round 1 campus arena → top 3 per contest → Round 2 district finale. SiteSprint is "Website Design & Development".
- **Legal:** Terms say placement statistics are historical and not a guarantee; Terms say site content may not be reproduced without permission; Privacy mentions Google Analytics cookies.
- **Empty areas:** blog has no posts; the placements data endpoint returned zero records.

## 2. Red flags: do NOT ship these as-is
| # | Item | Problem | Treatment |
|---|---|---|---|
| 1 | "100% placement", "24 LPA highest", "50+ hiring partners", "120% average hike" | Contradicts the site's own Terms disclaimer; unsupported; only 8 logos appear | `todo` until the academy supplies evidence and a time period |
| 2 | Recent placements list is empty | No real learner placement records exist in the crawl | Placement wall waits for academy data; meanwhile show "how placement works" and the process, not fake people |
| 3 | Home testimonials (Priya, Arun, Vikram, Rahul, Karthik, Divya, Sneha, Anitha, Sandeep) | Generic first names, no role/company; look like template text | Exclude until the academy confirms they are real and gives permission |
| 4 | Course instructor fields | The script detected template names (John Doe, Sarah Connor, Alan Turing, Mike Tyson, Ethan Hunt, Diana Prince, Robert Downey) | Drop every instructor field |
| 5 | `studentBadge: '500+ Students'`, `level: 'Beginner to Advanced'`, `trainingMode: 'Offline / Online'` | These are **script defaults used when the regex found nothing**, i.e. invented data | Treat as `todo` unless the value is present in `raw_crawl_data.json` |
| 6 | Hardcoded organisation facts in `build_content_json.js` (legal name, founder, founding year 2020, postal code 629001, operating hours, Twitter, Maps link) | Typed into the script, not extracted | Spot-check each against raw data/screenshots; keep only what is confirmed |
| 7 | `googleMapsUrl: https://maps.app.goo.gl/karka-academy-nagercoil` | Looks made up | Use coordinates 8.1801487, 77.4311084 (from the live site's real map link) or omit |
| 8 | Curriculum modules parsed by regex | Fragile; may be wrong or truncated per course | Verify per course or mark `todo` |
| 9 | 5 of 6 FAQ answers are `todo` | Accordions did not expand during the crawl | Re-collect by clicking each one |
| 10 | Inconsistent numbers | 190+ vs 800+/900+ enrolments; identical "4.8 (200 ratings)" everywhere; Gabriel's role vs his UI/UX quote | Show none until reconciled |
| 11 | `brandData.detectedColors` | That is the **old site's** palette, not Instagram | Reference only; Instagram screenshots still needed |
| 12 | "Karka vs others" comparison table (all ticks for Karka) | Unsubstantiated competitor claims | Rewrite as a neutral "what you get at Karka" list |

## 3. Handling rules
1. **Keep `docs/site-audit/` local and git-ignored** (whole folder, including `content.json` and `raw_crawl_data.json`). Karka's Terms forbid reproducing site content without permission, and a public repo containing scraped copy hurts the originality case. `verify:originality` reads `content.json` locally; in CI it must skip with a warning if the file is missing. Run it locally before submission.
2. **Research tooling stays out of the app.** Move the scripts into `tools/site-audit/` with their own `package.json`, or keep them outside the repo. The root `package.json` belongs to the Next.js app; never merge the two. Never commit `node_modules`.
3. **Re-tag every content item.** `site` only if the value appears in `raw_crawl_data.json`; otherwise `todo`.
4. **Rewrite, don't paste.** All shipped copy is rewritten in the team's voice (`docs/09`).

## 4. Updated questions for the academy (add to `docs/handoffs/open-questions.md`)
1. Does ₹40,000 apply to every course? Instalments? Minimum salary? Payment window? What if not placed?
2. Evidence and time period for any placement statistic they want shown (highest package, rate, partners).
3. Real learner stories with name, role, company, photo permission; are the home testimonials real?
4. Real instructors per course (or drop).
5. Part-time schedule; operating hours; postal code; confirm legal name and founding year.
6. Permission to use logo and mascot; wording for the Agile Tribers relationship.

## 5. Where findings feed the build
| Finding | Used in |
|---|---|
| ₹40,000 + 8-step flow | PAP page and home PAP section ("Terms at a glance" with unknown fields as `todo`) |
| 30 hrs/week breakdown | "A week at Karka" component on course pages |
| Support list, after-job support | PAP page "what's included" |
| Founder bio | About page |
| 37 courses | `src/content/courses.ts`, Courses page, Track Finder mapping (extend tracks: school, college levels, testing, mobile) |
| Infini flow, contests | "Beyond the classroom" section |
| Legal disclaimers | Footer note; consent text must match the Privacy page wording |
