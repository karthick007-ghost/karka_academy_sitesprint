# 04 — Security

A marketing site looks low-risk, but it collects **personal data** (name, phone) from many minors' parents and students, represents a brand people trust with money decisions, and is a favourite target for spam bots, defacement, and supply-chain attacks. Treat it accordingly.

## Assets and threats
| Asset | Threats | Primary controls |
|---|---|---|
| Lead PII (name, phone, email) | Leak, scraping, spam flooding, injection | Server validation, rate limit, bot checks, RLS, minimal retention, no PII in logs |
| Brand / page integrity | XSS, defacement, malicious third-party script | Strict CSP, no dynamic HTML, SRI/self-hosting, dependency hygiene |
| Availability / cost | Form flooding, 3D/asset abuse, serverless bill spikes | Rate limits, size caps, caching, no unbounded endpoints |
| Supply chain | Malicious/vulnerable npm packages, leaked secrets | Lockfile + `npm ci`, audit, Renovate/Dependabot, gitleaks, minimal deps |
| Visitors | Clickjacking, open redirects, tracking | `frame-ancestors 'none'`, no redirects from user input, cookieless analytics |

## Security headers (set in middleware / `next.config`)
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: (below)
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
X-Frame-Options: DENY            # legacy mirror of frame-ancestors
```
Remove `X-Powered-By`. No wildcard CORS on `/api/*` (same-origin only).

### CSP baseline
```
default-src 'self';
script-src 'self' 'nonce-<N>' 'strict-dynamic' https://challenges.cloudflare.com;
style-src 'self' 'nonce-<N>'; style-src-attr 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
media-src 'self';
connect-src 'self' https://challenges.cloudflare.com <analytics-host>;
frame-src https://challenges.cloudflare.com https://www.google.com/maps/ https://www.youtube-nocookie.com;
worker-src 'self' blob:;
object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
upgrade-insecure-requests;
report-to / report-uri → /api/csp-report (rate-limited, logged without PII)
```
`style-src-attr 'unsafe-inline'` is needed for animation libraries that write inline style attributes; keep `style-src` for stylesheets strict. Tighten `img-src` to explicit hosts if remote images exist. Roll out in **Report-Only first**, fix violations, then enforce. **Decision rule:** prefer nonce CSP; if it breaks static performance budgets (see `03`), fall back to a hash/`'self'` policy and write the trade-off in `docs/adr/0002-csp.md`. Never ship `script-src 'unsafe-eval'` (check that three/drei and Motion don't need it).

## Lead form hardening (defence in depth)
1. **Client:** Zod + inline errors (UX only, never trusted).
2. **Server:** content-type must be `application/json`; body ≤ 4 KB; verify `Origin`/`Sec-Fetch-Site` equals our site; reject otherwise.
3. **Rate limit:** 5 requests / 10 min / IP-hash and 3 / hour / phone; return `429` with `Retry-After`. Key = HMAC(IP, `IP_HASH_SALT`), never store raw IP.
4. **Zod parse (strict, `.strict()`)**: name 2–60 chars, letters/spaces/`.'-` (Unicode letters incl. Tamil); phone → normalised to E.164 India (`+91` + 10 digits starting 6–9); email optional RFC-sane ≤ 254; program ∈ allowlist; audience ∈ allowlist; consent === true; `consentVersion` matches current.
5. **Bot checks:** hidden honeypot field must be empty; `ts` time-trap (reject < 2 s or > 2 h); Turnstile token verified server-side with timeout.
6. **Output safety:** never reflect user input unescaped; React escapes by default; no `dangerouslySetInnerHTML` except audited, static JSON-LD (`JSON.stringify` then replace `<` with `<`).
7. **Email/Sink safety:** structured API fields only (no header concatenation → no header injection); parameterised queries/ORM only.
8. **Errors:** generic public messages; detailed errors server-side without PII.
9. **Data:** `leads` table with RLS enabled and **no public policies**; service-role key only on the server; retention 12 months (configurable) with a documented deletion path; store `consent_at`, `consent_text_version`.

## Frontend and content safety
- External links: `rel="noopener noreferrer"`; WhatsApp/tel links built from constants, user text always `encodeURIComponent`.
- Query params (`?track=`, `utm_*`) are parsed against allowlists/length caps, never rendered raw.
- Images: `next/image` `remotePatterns` allowlist (ideally none; self-host).
- MDX (blog): compiled at build from repo files only; no user-supplied MDX.
- No LLM chatbot/"Ask Spike" widget in v1 (prompt-injection, abuse and cost surface). Link out to Spike instead.
- Third-party scripts: Turnstile only (+ cookieless analytics). Each additional script needs an ADR.

## Dependencies and secrets
- Minimal dependency list; justify each in `docs/adr/`. Commit lockfile; CI uses `npm ci`. Pin Node via `.nvmrc`.
- `npm audit --omit=dev --audit-level=high` must pass; resolve or document exceptions. Enable Renovate/Dependabot. Check the framework's security advisories before release and upgrade to the patched version.
- `gitleaks` pre-commit and in CI. `.env*` git-ignored; only `.env.example` committed. Never prefix server secrets with `NEXT_PUBLIC_`. Grep the production bundle for secret names in `test:sec`.

## Privacy (India DPDP Act 2023 — design guidance, not legal advice)
Consent checkbox (unticked) with plain purpose ("so Karka can call you about the programme you chose"), link to Privacy Policy, record consent timestamp and wording version, collect only what's needed, provide a contact (contact@karka.academy) for access/deletion requests, no selling data, cookieless analytics. Special care: many visitors are under 18 → note in policy that minors should have parent/guardian consent; the academy's counsel must confirm wording.

## Security acceptance (see `05` for automated tests)
- `securityheaders`-style check: A+ equivalent; CSP enforced with zero violations on every route.
- Form abuse suite passes (oversize, XSS strings, SQLi strings, wrong origin, replay, rate limit, honeypot).
- No high/critical `npm audit` findings; gitleaks clean; bundle contains no server secrets.
- Red-team agent (A10) signs off with a written report, all High/Critical fixed and re-tested.
