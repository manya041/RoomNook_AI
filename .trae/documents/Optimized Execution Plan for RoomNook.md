## Goals & Metrics
- Performance: key pages <1s TTI; Lighthouse ≥80 perf, ≥90 a11y
- Reliability: 99.9% uptime; robust error envelopes across APIs
- Conversion: improved discovery and assistant UX leading to higher bookmarks/applications
- UX Quality: smooth, high-class UI with tasteful animations/transitions, zero jank; honors accessibility preferences

## Current State Snapshot
- Backend: Express + Sequelize (MySQL), global error middleware, request validation via `express-validator`, JWT access token only
- Data: models present; runtime `sequelize.sync({ alter: true })`; SQL-based schema/index scripts
- Frontend: React + Redux; listings fetch with optional server filters; client-side filtering; no URL-state or pagination controls; limited UX polish
- AI: Hugging Face chat with fallback; no rate limiting or telemetry
- DevOps: no Docker/Compose/CI; no metrics or Sentry

## Phase Overview
- Phase 1 (Security & Foundations): config validation, uniform errors, rate limiting, auth upgrades, migrations
- Phase 2 (Listings & UX): server filters/pagination/sorting, URL-state, debounced search, owner/student flows, premium UI polish and motion
- Phase 3 (AI & Perf): assistant hardening, recommendation cache, metrics, SLOs
- Phase 4 (Deploy & Observability): Docker, reverse proxy (TLS, CORS), CI/CD, dashboards, backups; a11y & i18n

## Phase 1: Auth, Security, Config
- Strict config validation and centralized module
  - Introduce `config` loader with schema validation (e.g., `envalid`/`zod`), fail fast at boot
  - Enforce secure defaults (CORS domain, cookies, token TTLs)
- Uniform request validation and error envelope
  - Standard JSON error shape: `success=false`, `code`, `message`, `errors`, `requestId`
  - Response helpers + global error middleware unify format
- Rate limiting & sanitization for public endpoints
  - Per-IP/user `express-rate-limit` policies; gentle burst control on read endpoints
  - `helmet`, `hpp`, `xss-clean`; validate payload sizes and query lengths
- JWT improvements
  - Access (≈15m) + refresh (≈30d) rotation; refresh store (hashed) with revocation
  - Blacklist/denylist for compromised tokens; revoke on logout, role change, or deletion
  - Enforce `is_blocked` and `email_verified` in auth middleware
- Email verification & password reset
  - Token models with hashed tokens + expiry; email via SMTP; secure flows and throttling
- Migrations & seeders
  - Add Sequelize CLI; retire runtime `alter`
  - Migrate existing SQL schema into versioned migrations; indexes for filters: `location`, `rent_amount`, `room_type`, `verification_status`

## Phase 2: Listings & UX (Polish & Motion)
- Backend listings APIs
  - Pagination (page, limit), sorting (rent, recency, verification), faceted filters
  - Uniform envelope: `items`, `page`, `pageSize`, `totalItems`, `totalPages`
  - Validate filters, clamp ranges, safe defaults; ensure indexes used
- Frontend PgListings.jsx
  - Wire server-side pagination and sorting; UI controls for page/limit/sort
  - URL-based filters via query params; restore on refresh/back-forward
  - Debounced search for `location` (~250–400ms); persistent filters (URL + optional localStorage)
- Premium UI & UX polish
  - Design system: spacing/typography/color tokens; consistent components (buttons/cards/inputs)
  - Motion principles: subtle transitions for filter changes, page navigation, and modal dialogs
  - Micro-interactions: hover/press states, skeletons and shimmer loaders, empty/error states
  - Animations: CSS transitions and optional motion library for list entrance/exit, modal fade/scale, toasts
  - Accessibility: respect `prefers-reduced-motion`, focus management, keyboard navigation; no motion that hampers usability
  - Performance: zero-jank animations (transform/opacity), image lazy-loading, code-split heavy routes
- Owner/Student/Admin flows
  - Owner: listing CRUD, status/verification workflow, image uploads (presigned URLs)
  - Student: bookmarks, applications, saved filters, messaging preview
  - Admin: verification queue, moderation, user management

## Phase 3: AI Robustness, Caching, Telemetry
- Assistant validation & graceful fallback
  - Strict input validation (length limits, allowed modes), standardized error responses
  - Clear 503/429 states; user-friendly frontend fallbacks (typing indicator, retry)
- HF token & model configuration
  - `HF_TOKEN` and `HF_MODEL` env; evaluate stronger chat models; tune `max_tokens`/`temperature`
- Recommendation data pipeline
  - Filter by `verified/active`; eager-load owner/roommate relations
  - Projection to only needed fields
- Caching
  - Per-profile recommendation cache with TTL; invalidate on profile update
  - Start with in-memory LRU; optional Redis drop-in if needed
- Rate limiting & protection
  - Per IP and per user caps for AI endpoints; burst handling; audit logs
- Telemetry
  - Prometheus metrics (latency, errors, DB timing) + `/metrics`
  - Sentry for backend errors; structured logging with request IDs
  - Frontend event tracking for assistant usage and UX interactions

## Phase 4: Deployment & Observability
- Dockerize backend/frontend; compose with MySQL and object storage (MinIO/S3-compatible)
  - Environment & secrets via `.env`/secret manager; no secrets in source
- Reverse proxy (Nginx/Traefik)
  - TLS, compression, static caching, secure headers; CORS locked to prod domain
- CI/CD pipeline
  - lint → tests → build → image → migrations → deploy; staging then prod
  - Smoke tests, versioned releases, rollback strategy
- Scaling & Reliability
  - Stateless backend; tuned DB pool sizes; health checks
  - Backups/DR: scheduled dumps, object storage lifecycle; restore drills
- A11y & i18n
  - Keyboard navigation, focus management, ARIA, contrast; react-i18next; locale currency (₹) and date formats

## Cross-Cutting Performance
- HTTP caching for read endpoints (ETag/Cache-Control)
- Optimize Sequelize queries; ensure indexes hit; targeted projections
- Frontend: route code splitting, prefetch, skeletons, error boundaries, image lazy-loading; motion optimized via transform/opacity

## Testing & QA
- Unit tests (Jest) for utils/controllers; Supertest for APIs; Playwright/Cypress E2E
- Contract tests for axios clients; mock server utilities; realistic seed data
- Load tests for assistant at target RPS; auth vs no-auth personalization
- Visual regression tests for UI and motion states; accessibility audits

## Acceptance Criteria (Revalidated)
- Assistant: reliable answers with graceful fallback; metrics show stable latency/error rates
- Listings: filters, sorting, pagination correct; URL state persists; counts and pages accurate
- CI/CD: migrations run, images built, deploy to staging→prod; HTTPS enabled; CORS restricted
- Observability: dashboards and alerts active; Sentry capturing errors; `/metrics` scraped
- Performance/A11y/UX: TTI <1s key pages; Lighthouse ≥80 perf, ≥90 a11y; smooth, tasteful animations; honors reduced-motion

## Risks & Mitigations
- Migration risk: introduce Sequelize CLI alongside existing SQL; validate on staging with snapshot tests
- Token security: store hashed refresh tokens; add revocation checks in middleware; short-lived access
- Model cost/latency: configurable HF model; fallback and caching; rate limiting with clear UX
- Motion performance: use GPU-friendly properties; audit FPS; avoid layout thrash; reduce motion when requested
- CORS/Proxy: lock origins in config; automated smoke tests post-deploy

## Timeline (Indicative, Parallel Where Safe)
- Week 1–2: Phase 1 foundations (config, errors, rate limits, JWT + refresh, migrations skeleton)
- Week 3–4: Phase 2 listings API + frontend wiring (URL-state, pagination, debounce, UI polish/motion)
- Week 5: Phase 3 assistant robustness, caching, telemetry
- Week 6: Phase 4 Docker/Compose, proxy, CI/CD, a11y/i18n pass, backups

## Deliverables Summary
- Centralized validated config; uniform error responses; secure auth with rotation & revocation
- Server-side listings with pagination/sorting/filters; URL-driven frontend with debounced search and polished animations/transitions
- Assistant with validation, caching, rate limits, metrics, and Sentry
- Dockerized stack with reverse proxy; CI/CD pipeline running migrations; dashboards and backups