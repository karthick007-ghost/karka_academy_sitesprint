# 03 — Architecture & Stack

> Versions: do **not** copy any version from here. Run `npm view <pkg> version` and use current stable.

## Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (App Router) + **React** + **TypeScript (strict)** | Static generation, image/font optimisation, server route handlers for the lead API, huge ecosystem, easy deploy |
| Styling | **Tailwind CSS** + CSS variables (`tokens.css`) | Fast, consistent, small CSS; tokens guarantee approved contrast pairs |
| UI primitives | **Radix UI** (or React Aria) for Dialog, Accordion, Tabs, Menu | Battle-tested accessibility (focus trap, ARIA) so we don't hand-roll it |
| Motion | **Motion** (Framer Motion) for reveals/layout; CSS for micro-interactions | Declarative, respects reduced motion with `MotionConfig` |
| 3D | **three** + **@react-three/fiber** + **@react-three/drei** (only needed helpers) | Hero only, lazy, with poster fallback |
| Forms/validation | **React Hook Form** + **Zod** (shared schema client+server) | One source of truth, safe server validation |
| Bot protection | **Cloudflare Turnstile** + honeypot + time-trap | Privacy-friendly, free |
| Rate limiting | **Upstash Redis** (`@upstash/ratelimit`); in-memory fallback in dev/test | Works on serverless |
| Lead storage | `LeadSink` adapters: `ConsoleSink` (dev/demo), `SupabaseSink` (Postgres + RLS), `ResendSink` (email to contact@karka.academy) | Site works with zero secrets for demos; production picks sinks via env |
| Content | Typed TS data + Zod schemas in `src/content/`; MDX (compile-time only) for blog | Type-safe, build-time validated, no CMS attack surface |
| SEO | Next Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD, dynamic OG images | Local SEO for Nagercoil/Kanyakumari |
| Analytics | Plausible or Vercel Analytics (cookieless) | No consent banner needed for analytics |
| Hosting | **Vercel** (alternatives: Cloudflare Pages, Netlify) | Edge CDN, preview deploys |
| Testing | **Vitest** + Testing Library, **Playwright** (+ **@axe-core/playwright**), **Lighthouse CI** | See `05` |
| Quality | ESLint (+ `jsx-a11y`, `eslint-plugin-security`), Prettier, `tsc --noEmit`, Husky + lint-staged, gitleaks | Catch bugs before CI |

Alternative considered: **Astro** (smaller JS for content sites). Rejected for this build because the interactive pieces (3D, Track Finder, forms, carousels) benefit from React islands and a single mental model; revisit only if the JS budget cannot be met.

## Rendering strategy
- All marketing pages **statically generated**. Only `/api/lead` is dynamic.
- Course/audience pages via `generateStaticParams` from `src/content`.
- Client components only for: header menu, track finder, lead form, carousel, accordion, 3D, counters.
- **CSP vs static caveat:** a per-request nonce CSP forces dynamic rendering. Decision rule in `04`: prefer strict nonce CSP; if mobile TTFB p75 > 600 ms or LCP budget fails because of it, use hash/`'self'`-based CSP and document the trade-off in `docs/adr/0002-csp.md`.

## Loading strategy
1. HTML + critical CSS + fonts (2 preloaded) → LCP element is the H1 text or hero poster (never the canvas).
2. After `requestIdleCallback`: capability check → dynamic import of `HeroScene` → crossfade poster→canvas (no layout shift).
3. Below-fold sections: `content-visibility: auto` + lazy images; carousels/marquee hydrate on visibility.
4. Videos: poster image only; load `<video>` on user click (`preload="none"`).
5. Third-party: Turnstile loads on form focus; map iframe `loading="lazy"` behind a click-to-load placeholder.

## Folder structure
```
karka-academy/
├─ AGENTS.md  GEMINI.md(optional)  README.md  .env.example  .nvmrc
├─ docs/ (these files) + docs/handoffs/ + docs/adr/
├─ brand/reference/            # Instagram screenshots, logo, mascot (user-provided)
├─ public/ (posters, og, icons, videos only if small)
├─ scripts/ verify-content.ts  check-contrast.ts
├─ src/
│  ├─ app/ (layout.tsx, page.tsx, courses/, pay-after-placement/, placements/, internships/, for/[audience]/, about/, contact/, api/lead/route.ts, error.tsx, not-found.tsx, sitemap.ts, robots.ts)
│  ├─ components/ ui/ sections/ forms/ three/ layout/
│  ├─ content/ site.ts tracks.ts courses.ts placements.ts projects.ts faqs.ts testimonials.ts schema.ts
│  ├─ lib/ schemas.ts security.ts rate-limit.ts lead-sinks/ analytics.ts seo.ts track-finder.ts utils.ts
│  ├─ middleware.ts (or proxy.ts per Next version)  # headers/CSP
│  └─ styles/ tokens.css globals.css
└─ tests/ unit/ component/ e2e/ security/ fixtures/
```

## Lead API contract (`POST /api/lead`)
Request (JSON, ≤ 4 KB): `{ name, phone, program, audience?, email?, consent:true, consentVersion, turnstileToken, hp:"", ts, utm? }`.
Responses: `201 {ok:true}` · `400 {ok:false, errors}` (field-level, no internals) · `403` (origin/captcha) · `413` · `429 {retryAfter}` · `500 {ok:false}` generic.
Server pipeline order: method/content-type → size cap → Origin check → rate limit → Zod parse → honeypot/time-trap → Turnstile verify → normalise phone → write sink(s) → respond. Idempotency: ignore duplicate (same phone+program within 10 min).

## Environment variables (`.env.example`, never commit real values)
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`(919487530243), `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `UPSTASH_REDIS_REST_URL/TOKEN`, `LEAD_SINKS` (e.g. `console` | `supabase,resend`), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `IP_HASH_SALT`. Validate with Zod at boot; fail fast in production, relaxed in dev.

## Error handling
`error.tsx`, `global-error.tsx`, `not-found.tsx` styled on-brand with a way back and WhatsApp link. 3D has its own error boundary. Form errors never expose stack traces. All `fetch` has timeouts and typed failures.

## i18n (stretch)
`next-intl` with `en` + `ta`; content files keyed per locale; Tamil typographic checks (line breaking, font fallback). Do not start until every MVP gate is green.
