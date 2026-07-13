# WellWork (QVT-Care)

## Overview
A multi-tenant SaaS platform for workplace well-being (QVT) monitoring — anonymized employee well-being scoring, RBAC (super_admin/hr_admin/manager/employee), department management, and compliance reporting (French "Loi 18-07"). Originally built with [Lovable](https://lovable.dev), imported from GitHub into Replit.

## Tech stack
- **Frontend**: React 19 + TanStack Start/Router + Vite + Tailwind CSS v4 + shadcn/radix UI components
- **Backend**: Supabase (Postgres + Auth + RLS) — external project (not a Replit DB), connection details in `.env`
- **Package manager**: bun (see `bun.lock`, `bunfig.toml`)

## Running the project
- Dev server: `bun run dev` (runs `vite dev`), bound to `0.0.0.0:5000` — wired up as the `Start application` workflow.
- Build: `bun run build` / `bun run build:dev`
- Lint/format: `bun run lint`, `bun run format`

### Replit-specific config
The `@lovable.dev/vite-tanstack-config` package auto-configures a dev server on host `::` port `8080`, tailored to Lovable's own sandbox. That IPv6 bind isn't supported in Replit's container, and Replit's preview requires port 5000. `vite.config.ts` overrides this via the `vite.server` option (`host: "0.0.0.0"`, `port: 5000`, `allowedHosts: true`). Do not remove this override.

## Backend / Supabase
- Connection info (project ref, publishable/anon key, URL) lives in `.env` and was carried over from the Lovable project — this points at an existing external Supabase project, not something set up on Replit.
- Schema migrations are in `supabase/migrations/`.
- `SUPABASE_SERVICE_ROLE_KEY` is set as a secret and powers `src/integrations/supabase/client.server.ts` (`supabaseAdmin`), used only in server-only code (never sent to the browser).

## Pricing plans & demo access-token gate
Two features on top of the base app, built but **not yet wired to the live database** (see "Still needed" below):

- **Pricing plans**: `public.plans` table (managed by `super_admin` at `/admin/plans`), rendered dynamically on the landing page (`#pricing` section in `src/routes/index.tsx` via `usePlans()`). Seeded with Free Demo / Basic / Premium / Enterprise.
- **Demo access-token gate**: anyone can request a demo via the "Demander une démo" dialog (inserts into `public.demo_requests`, RLS lets anonymous INSERT only). A `super_admin` reviews requests at `/admin/demo-requests` and approves/rejects — approval mints a one-time `access_token` (UUID) on the row. Signup (`/auth`) has an "I have a demo access token" toggle that validates the token+email pair via the `check_demo_access_token` RPC before creating the account, then redeems it via `redeem_demo_access_token`.
- Approve/reject run through TanStack Start server functions (`src/server/demoDecision.ts`) using the service-role client, so only a verified `super_admin` can mint tokens or read pending requests server-side.
- Email delivery of the token uses Resend (`RESEND_API_KEY` env var) if configured; if not, the endpoint just skips the email and the admin can copy the token directly from the `/admin/demo-requests` screen (a copy-to-clipboard token chip is shown there either way).

### Still needed before this feature is live
1. **Apply the migration**: `supabase/migrations/20260713100000_plans_demo_access.sql` creates `plans`, `demo_requests`, their RLS policies, and the two token RPCs. It has not been applied to the Supabase project yet — run it via the Supabase SQL Editor (or `psql` against `SUPABASE_DB_URL` once that connection works; the direct/IPv6-only host was unreachable from this container during development).
2. **Make yourself `super_admin`**: no signup flow grants this role. After the migration is applied, insert it manually once for the owner's account, e.g. `insert into public.user_roles (user_id, space_id, role) values ('<your-auth-user-id>', null, 'super_admin');` (global role — `space_id` must be `null`).
3. **Email sending (optional)**: connect the Resend integration and set `RESEND_API_KEY` (and optionally `RESEND_FROM_EMAIL`) to have approval/rejection emails sent automatically. Without it, the flow still works — the admin just copies the token manually from the review screen.

## User preferences
(none recorded yet)
