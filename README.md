# AI60 Growth Engine

Next.js campaign simulation for **Build Your First AI Project in 60 Minutes**. The target is 500 registrations in seven days with a ₹2,000 simulated budget. Registrations require a configured Supabase project; the app does not create fake signups.

## Install and run

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set real values in `.env.local` before trying registration or analytics. Open http://localhost:3000. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` before deploying.

## Supabase setup

Create a Supabase Free project and run [supabase/schema.sql](supabase/schema.sql) in its SQL editor. The schema creates `registrations` with unique normalized email and referral code, referral foreign key, useful indexes, validation checks, and row level security. The browser does not query the table. Next.js route handlers use the current Supabase secret key server side; **never** prefix this key with `NEXT_PUBLIC_` or expose it in client code. Add these environment variables locally and in deployment settings:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: public key reserved for future browser-side Supabase features; currently unused because calls go through Next.js routes.
- `SUPABASE_SECRET_KEY`: secret key, server only.
- `NEXT_PUBLIC_SITE_URL`: deployed origin for server generated links; the browser uses its current origin.

## Data flow

The form captures `source`, `campus`, and `ref` URL parameters centrally in `lib/attribution.ts` and keeps them in session storage through navigation. `POST /api/registrations` validates fields, normalizes email, checks duplicates and referral ownership, generates a cryptographically random readable code, and inserts one row. Database unique constraints handle concurrent duplicates and rare code collisions. A successful insert is the only path to the success page. Referral links use `/?ref=AI60-XXXXXXXXX&source=referrals` and work in new browser sessions. The code is verified against existing database rows before it is accepted.

`GET /api/analytics` calculates live test counts from database registrations. Public results contain first names, colleges, codes, and aggregate counts; emails and phones are never returned. Click and conversion metrics are untracked. Demo fixtures remain in `mock-data` for reference but are excluded from live totals and rankings.

Example campaign URLs:

```text
http://localhost:3000/?source=campus-club&campus=MSRIT
http://localhost:3000/?source=whatsapp-community
http://localhost:3000/?source=email
http://localhost:3000/?source=linkedin
http://localhost:3000/?ref=AI60-AB1234567&source=referrals
```

## Deploy

Deploy the repository to a Next.js compatible host such as Vercel. Set the three environment variables in the host settings, run the SQL schema in Supabase, and set `NEXT_PUBLIC_SITE_URL` to the exact public origin. Build with `npm run build`. Submit a direct and referred test registration, confirm duplicate rejection, and inspect the live dashboard and leaderboard. Because this is a simulation, keep any seeded numbers visibly labeled **DEMO DATA — CAMPAIGN SIMULATION** if they are displayed again.
