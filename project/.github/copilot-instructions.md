## Project snapshot

- Framework: Next.js (App Router, Next v16)
- Language: TypeScript + React 19
- DB: Prisma + PostgreSQL (see `prisma/schema.prisma`)
- UI: Bootstrap + Tailwind present; components use plain React + client components

## Quick dev commands

- Start dev server: `npm run dev` (runs `next dev`)
- Build: `npm run build`
- Start production: `npm run start`
- Lint: `npm run lint` (calls `eslint`)
- Prisma: migrations exist under `prisma/migrations` — use `npx prisma migrate dev` or `npx prisma db push` as appropriate.

## High-level architecture & conventions

- App Router layout lives under `app/`. Pages and route handlers are colocated (e.g. `app/api/*`).
- Server-side code and DB client: `app/server/db.ts` exports a single `prisma` instance used by API routes.
- API handlers follow Next.js route handler exports (`export async function GET/POST(req: Request) { ... }`) and return `NextResponse`.
- Components grouped by domain under `app/interface/components/` (e.g. `ator`, `geradora`, `tecnologia`). Many components are client components and start with `"use client"`.
- Forms typically live in `app/interface/*` and use `react-imask`/`IMaskInput` for formatted inputs.

## Data patterns & gotchas

- Prisma models use `BigInt` for IDs. API handlers consistently serialize BigInt values before returning JSON:

  ```ts
  JSON.parse(JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v))
  ```

  Follow this pattern when returning DB rows from route handlers to avoid JSON errors.

- Some API handlers use raw SQL via `prisma.$queryRaw` to compare masked fields (see `app/api/ator/by-document/route.ts`) — be careful with SQL injection and prefer parameterized queries.

- Date parsing: some POST handlers (e.g. `app/api/geradora/route.ts`) perform custom parsing of user-provided date strings (`DD/MM/YYYY` or with time). Reuse `parseDateField` logic if adding similar routes.

## Prop and callback naming

- Components use explicit callback prop names that matter. Example: `StepAtor` expects `onCreated` (not `onAtorSelect`). Always open the component file under `app/interface/components/<domain>/` to confirm prop names and types before calling.

## API patterns and examples

- Creating an actor (POST): `POST /api/ator` — body `{ nome, telefone, email, cnpj_cpf }` returns created actor (BigInt ids serialized).
- Lookup by document (GET): `GET /api/ator/by-document?cnpj_cpf=...` — returns 204 when not found.
- Creating geradora (POST): `POST /api/geradora` — body includes `municipio_id`, `ator_id`, `tecnologia`, with optional date strings that the route parses.

## Integration points & environment

- Database connection string: `DATABASE_URL` (used by Prisma). Ensure env var is available in local/dev environment.
- Third-party libraries used: `react-imask`, `react-hook-form`, `zod` (present in deps), `bootstrap`.

## How to add/modify an API route

1. Create `app/api/<resource>/route.ts` (or nested folders) and export `GET`, `POST`, etc.
2. Use `prisma` from `app/server/db.ts` for DB operations.
3. Serialize BigInt values before returning JSON (see above).
4. Return appropriate HTTP codes: 201 for created resources, 204 when nothing to return, 400 for validation errors.

## Style / testing notes for agents

- Keep new React components as either client (`"use client"`) or server components deliberately; default to client for interactive forms.
- When editing forms, prefer existing input patterns (IMask for CPF/CNPJ, bootstrap classes for layout).
- Avoid changing global layout or CSS infra: `app/layout.tsx` centralizes fonts and globals.

## Useful files to inspect first

- [app/layout.tsx](app/layout.tsx)
- [app/page.tsx](app/page.tsx)
- [app/server/db.ts](app/server/db.ts)
- [prisma/schema.prisma](prisma/schema.prisma)
- [app/api/ator/route.ts](app/api/ator/route.ts)
- [app/api/ator/by-document/route.ts](app/api/ator/by-document/route.ts)
- `app/interface/components/` folder (component patterns and prop names)

---

If anything here is unclear or you want the file to be stricter (add examples for common changes, CI steps, or test commands), tell me which sections to expand and I will iterate. 
