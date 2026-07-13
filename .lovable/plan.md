
# QVT-Care → Modern & Fully Functional (single-pass build)

Goal: turn the current mock-data UI into a real multi-tenant SaaS backed by Lovable Cloud, with strict anonymity, full RBAC, and a fresh Midnight Indigo visual identity. This is a big turn — I'll do it in one shot but implementation is grouped into 6 parts so nothing is dropped.

---

## Part 1 — Enable Lovable Cloud & core auth

- Enable Lovable Cloud (Supabase under the hood, invisible to users).
- Configure auth: email/password + Google.
- Add `/auth` public route (sign in / sign up), password reset, `/reset-password`.
- Add integration-managed `_authenticated` layout gate.
- Root `onAuthStateChange` listener + sign-out hygiene.

## Part 2 — Multi-tenant "Spaces" + Full RBAC schema

Tables (all with GRANTs + RLS):

- `spaces` — tenant company (id, name, space_key uuid, subscription_status, created_at).
- `space_members` — (space_id, user_id, joined_at). Enforces which spaces a user belongs to.
- `profiles` — (id=auth.uid, full_name, avatar_url, current_space_id, locale).
- `app_role` enum: `super_admin`, `hr_admin`, `manager`, `employee`.
- `user_roles` — (user_id, space_id, role) — scoped per space; separate table per security rules.
- `departments` — (id, space_id, name, name_ar, manager_user_id).
- `employees` — (id, space_id, department_id, user_id nullable, email, full_name, position, hire_date, status).

Security-definer helpers (avoid RLS recursion):
- `public.has_role(_user_id, _space_id, _role) → bool`
- `public.is_space_member(_user_id, _space_id) → bool`
- `public.current_space_id() → uuid` reads `profiles.current_space_id`.

RLS pattern for every space-scoped table: `USING (is_space_member(auth.uid(), space_id))`, with role-gated writes via `has_role(...)`. Super admin sees ONLY `spaces` metadata (no tenant tables).

Onboarding: HR Admin creates a Space at first login → gets a Space Key (shown once, copyable). Employees join via `/join` with Space Key + email domain match, or via HR-provisioned invite (single-use token).

## Part 3 — Strict-anonymity survey engine

Tables:
- `surveys` — (id, space_id, title, title_ar, description, methodology enum: `karasek`|`copsoq`|`custom`, status, opens_at, closes_at).
- `survey_questions` — (id, survey_id, order, type: `likert5`|`mcq`|`text`, prompt, prompt_ar, factor).
- `survey_participation` — (survey_id, user_id, participated_at). No response payload here. Unique(survey_id, user_id).
- `survey_responses` — (id, survey_id, department_id, submitted_at_bucket, factor, question_id, value_num, value_text). NO user_id, NO space FK back to person. `submitted_at_bucket` = daily bucket (not exact timestamp) to defeat timing correlation.
- Rotating-salt HMAC on participation flags via `pgcrypto` + server function; salt rotates monthly (stored in `space_secrets`).

Anonymity pipeline (implemented as two server functions in separate transactions):
1. `submitSurvey`: verifies not participated → INSERT `survey_participation` (only user↔survey flag).
2. Randomized-delay queue (0–120 s via server-side `setTimeout` before insert; response also enters a batch flush) → INSERT into `survey_responses` with NO user link.

Aggregate reads: k-anonymity guard — return department aggregates only if `count(distinct submission) ≥ 5`; else return `null` + "insufficient data" message.

## Part 4 — Anonymous feedback / whistleblowing portal

Tables:
- `feedback_tickets` — (id uuid, space_id, category, encrypted_subject, encrypted_content, status, department_hint, created_at_bucket, ticket_key_hash).
- `ticket_messages` — (id, ticket_id, author_role: `reporter`|`hr`, encrypted_content, created_at_bucket).

Flow:
- Employee submits ticket via server fn → returns a one-time **Ticket Access Key** (uuid + 6-word passphrase). Hashed with argon2/sha256 into `ticket_key_hash`. Not linked to user.
- Employee visits `/anonymous/ticket` and enters key to view/reply.
- HR sees tickets by `space_id`; replies as `hr`.
- Content encrypted at rest with a per-space content key (AES-GCM via server fn using `space_secrets`).

## Part 5 — Alerts, action plans, library, events, ERP, reports

- `alerts` — auto-generated when department burnout index >75% or satisfaction drops >30% MoM. Cron via `pg_cron` at `/api/public/cron/scan-alerts` (HMAC-verified).
- `action_plans` — (id, space_id, title, owner_user_id, department_id, priority, deadline, status, linked_alert_id) + `action_plan_tasks`.
- `library_items` + `library_categories` (Markdown articles, tags).
- `events` (workshops) + `event_registrations`.
- `messages` — broadcasts with `message_reads` for read receipts (non-anonymous channel).
- `erp_metrics` — (space_id, department_id, month, absenteeism_rate, turnover_rate, avg_tenure). Public API endpoint `/api/public/integration/metrics` with HMAC signature per space.
- Reports: server function that computes multi-tab CSV/XLSX + PDF via `@react-pdf/renderer` (worker-safe). Excel via `exceljs`.

Karasek / COPSOQ scoring: server fn computes per-department indices from `survey_responses` (respecting k≥5), stored in `space_kpi_snapshots` for dashboard charts.

## Part 6 — Midnight Indigo visual redesign

Design tokens in `src/styles.css`:

```
--background: oklch(0.08 0.04 275)         /* #0a0a1a */
--surface:    oklch(0.16 0.06 275)         /* #141432 */
--brand:      oklch(0.55 0.22 275)         /* #4f46e5 */
--brand-glow: oklch(0.75 0.16 292)         /* #a78bfa */
--foreground: oklch(0.98 0.01 275)
--muted-fg:   oklch(0.70 0.03 275)
--border:     oklch(0.28 0.05 275)
--success/warning/danger tuned to indigo palette
--gradient-brand: linear-gradient(135deg, var(--brand), var(--brand-glow))
--gradient-hero: radial-gradient(circle at 30% 20%, var(--brand)/25%, transparent 60%)
--shadow-glow: 0 20px 60px -20px color-mix(in oklab, var(--brand) 40%, transparent)
```

Typography via `<link>` in `__root.tsx`: Space Grotesk (headings) + DM Sans (body). `@theme` maps `--font-display` / `--font-sans`.

UI passes:
- Dark-first (light mode still supported via existing `.dark` toggle inverted → make dark the default).
- Sidebar: glassmorphic `bg-surface/60 backdrop-blur` with indigo gradient active states.
- KPI cards: gradient borders, glow on hover, animated sparklines.
- Charts (Recharts): all color tokens re-pointed at new palette; grids softer, tooltips glass.
- Auth pages: split-screen with animated indigo aurora background.
- Framer-motion page transitions + staggered card entrances.
- New landing `/` — hero + product tour + Law 18-07 compliance strip + CTA to sign in.

## Technical notes

- Server functions in `src/lib/*.functions.ts` with `requireSupabaseAuth`.
- Public endpoints under `src/routes/api/public/*` (ERP ingest, cron, webhook) with HMAC verification.
- `space_secrets` table holds per-space HMAC salt + content encryption key, service-role only.
- All new tables get GRANTs + RLS + policies in a single migration.
- All existing mock-data pages get rewired to `useSuspenseQuery` + `queryOptions` pattern.
- `useStore` (Zustand) kept for UI-only state (language, sidebar collapse); domain data moves to TanStack Query.

## What will be visible after this turn

1. `/` landing (redesigned) → `/auth` login/signup.
2. HR admin flow: create space → invite employees → build first Karasek survey → see dashboard once ≥5 responses.
3. Employee flow: join space → take survey (strict-anonymity path) → submit anonymous feedback → get ticket key → check ticket status.
4. Alerts trigger + action plan creation + library + events + messages.
5. ERP metrics POST endpoint documented in Settings.
6. Full Midnight Indigo redesign across all pages.

## Risks I'm flagging up front

- One-turn scope is aggressive; some polish (PDF templates, k-anonymity edge cases, ERP correlation charts) may need a follow-up pass.
- Email delivery for invites uses Lovable Cloud built-in auth emails; a branded transactional-email flow would need Resend later.
- MFA is scaffolded (hooks in place) but full TOTP enrollment UI can land in a follow-up if the turn gets too long.

Approve to build, or tell me what to trim.
