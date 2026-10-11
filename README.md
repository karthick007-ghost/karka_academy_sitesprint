# Karka Academy Website — Antigravity Build Kit

You only need to paste **one** prompt: `MASTER_PROMPT.md`. It runs everything (research cleanup → build → QA → release) and dispatches the per-agent briefs in `docs/08` by itself.

## Final folder arrangement
Create a folder `karka-academy/` and arrange it like this:

```
karka-academy/
├─ MASTER_PROMPT.md                ← the one prompt (copy its text into Antigravity)
├─ AGENTS.md                       ← rules every agent reads automatically
├─ .gitignore                      ← from this kit (hides site-audit, node_modules, .env)
├─ brand/
│  └─ reference/                   ← YOU add: 6–10 Instagram @karka.ai screenshots, logo, robot mascot
├─ docs/
│  ├─ 01_STRATEGY_AND_UX.md
│  ├─ 02_DESIGN_SYSTEM.md
│  ├─ 03_ARCHITECTURE_AND_STACK.md
│  ├─ 04_SECURITY.md
│  ├─ 05_QA_TEST_PLAN.md
│  ├─ 06_AGENT_ROSTER_AND_PHASES.md
│  ├─ 07_CONTENT_MODEL.md
│  ├─ 08_AGENT_PROMPTS.md
│  ├─ 09_SUBMISSION_AND_RULES.md
│  ├─ 10_RESEARCH_FINDINGS.md
│  └─ site-audit/                  ← YOUR crawl output (stays local, git-ignored)
│     ├─ raw_crawl_data.json
│     ├─ content.json
│     ├─ screenshots/
│     └─ assets/
└─ tools/
   └─ site-audit/                  ← YOUR old crawler files (not part of the website)
      ├─ package.json
      ├─ package-lock.json
      ├─ scrape_discover.js
      ├─ audit_collector.js
      └─ build_content_json.js
```
- **`node_modules`:** delete it. It's not needed and must never be committed.
- **Crawler scripts:** you don't need to run them again. If you ever do, the paths point at `docs/site-audit/` relative to the project root (run from `karka-academy/`).
- **The app itself** (Next.js, `src/`, its own `package.json`) is created by the agent in the project root. Don't create it yourself.

## How to run
1. Build the folder as above and open it in Antigravity.
2. Open the Agent Manager, start one new agent, paste the text of `MASTER_PROMPT.md`.
3. Approve the plan it posts (the only pause). It then runs all phases on its own.
4. When it finishes, read `docs/RELEASE_NOTES.md` and `docs/handoffs/open-questions.md`, send the questions to the academy, fill in the real data, and run `npm run verify:all` yourself.
5. Follow the GitHub checklist in `docs/09` and submit the repo URL.
