## Vision & Outcomes
- Build a best‑in‑class PG discovery platform with personalized matches, robust auth/security, and delightful UX
- Targets: fast (<1s TTI key pages), reliable (99.9% uptime), high quality (>80 perf, >90 a11y), strong conversion

## Architecture & Stability
- Strict environment config validation and secrets handling; centralized config module
- Uniform request validation and consistent error envelope across all routes
- Rate limiting, input sanitization, and safe defaults for public endpoints

## Authentication & Security
- Email verification and password reset flows (secure tokens & expiry)
- JWT improvements: access+refresh rotation, token blacklist for compromised tokens
- Consolidated role guards and route policies; audit logs for sensitive actions

## Data Model & Migrations
- Introduce Sequelize CLI migrations and seeders; retire runtime schema alter
- Add indexes for filters (location, rent_amount, room_type, verification_status)
- Normalize amenities/images; store images in object storage with presigned uploads

## PG Listings & Search
- Backend: pagination, sorting, faceted filters; return counts and pages
- Frontend (PgListings.jsx): wire to server‑side pagination; URL‑based filters; debounced search; persistent state
- Advanced search: location radius, price bands, amenities, verification

## Owner/Student/Admin UX
- Owner: listing CRUD, status/verification workflow, image uploads, analytics
- Student: bookmarks, applications, saved filters, application messaging
- Admin: verification queue, moderation, user management tools

## AI Assistant & Recommendations (Added)
- Validation & graceful fallback in aiController.js (already structured) with standardized error responses
- HF Token & Model: configure `HF_TOKEN`; evaluate a stronger chat model; tune tokens/temperature
- Data pipeline: verified/active filters; eager load owner and roommate profile relationships
- Caching: per‑profile recommendation cache with TTL and invalidation on profile update
- Rate limiting: per IP/user for assistant endpoints; protect from abuse
- Telemetry: log assistant latency, failures; expose Prometheus metrics; Sentry errors
- Frontend (ChatAssistant.jsx): robust error states, typing indicator, retry, consistent recommendation cards; quick query shortcuts
- Tests: no‑auth vs auth personalization, HF failure fallback, load tests at target RPS

## Performance & Reliability
- HTTP caching for read endpoints; per‑user caches for recommendations
- Optimize Sequelize queries and projections; ensure indexes used
- Frontend: route code splitting, prefetch, skeletons, error boundaries; image lazy‑loading

## Observability & Analytics
- Structured logging with request IDs; error tracking via Sentry
- Prometheus metrics (latency/error/db timing) with Grafana dashboards; uptime checks
- Privacy‑aware analytics for funnels: registration → search → contact/application

## Deployment Preparation (Added)
- Dockerize backend and frontend; docker‑compose with MySQL and object storage
- Environment & secrets via `.env`/secret manager; no secrets in source
- Migrations step in CI/CD before app start; seed data for staging
- Reverse proxy (Nginx/Traefik): TLS, compression, static caching, secure headers; CORS locked to production domain
- Scaling: stateless backend with horizontal scaling; tuned DB pool sizes; health checks
- Backups/DR: scheduled MySQL dumps, object storage lifecycle; restore drills

## CI/CD
- Pipeline: lint → tests → build → docker image → migrations → deploy; staging then prod
- Versioned releases, rollback strategy, automated smoke tests

## QA & Testing
- Unit (Jest) for utils/controllers; Supertest APIs; Playwright/Cypress E2E flows
- Contract tests for axios clients; mock server utilities; realistic seed data

## Accessibility & i18n
- Keyboard nav, focus management, ARIA, contrast; audit with tooling
- i18n (react‑i18next); locale‑aware currency (₹) and date formats

## Monetization & Growth
- Owner subscription tiers and analytics; student concierge premium
- Referral codes, lead forms, consented email campaigns

## Milestones
- Phase 1: Auth/security + migrations + rate limiting
- Phase 2: Listings & UX (server filters/pagination, owner/student flows)
- Phase 3: AI robustness + caching + telemetry; performance optimizations
- Phase 4: Deployment (Docker, proxy, TLS, CI/CD), observability, backups; a11y & i18n

## Acceptance Criteria
- Assistant returns reliable answers with fallback; metrics show stable latency/error rates
- PgListings filters and pagination correct; URL state persisted
- CI/CD runs migrations, builds images, deploys; HTTPS enabled; CORS restricted
- Dashboards and alerts active; a11y and i18n checks pass