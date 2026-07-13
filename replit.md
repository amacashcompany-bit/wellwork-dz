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

## User preferences
(none recorded yet)
