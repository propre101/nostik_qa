# Hicham Nostik Live — Anonymous Q&A

A secure, anonymous Q&A platform for live-stream shows. No login, no tracking for public users.

## Tech Stack

- **Next.js 15** (App Router) — full-stack framework
- **Tailwind CSS** + **shadcn/ui** — styling and components
- **Supabase** — PostgreSQL database + admin auth
- **patreon** — VIP question Starting at $5/month

## Setup

### 1. Clone & Install

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL schema in the Supabase SQL Editor:

```bash
# Copy the contents of supabase/schema.sql and execute it
```

3. Create an admin user in **Authentication > Users > Add User** (email + password).


### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

### 4. Run

```bash
npm run dev
```

- Public Q&A: [http://localhost:3000](http://localhost:3000)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Admin Dashboard: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Home — Free & VIP question forms
│   ├── success/page.tsx                  # Post-submission confirmation
│   ├── admin/
│   │   ├── login/page.tsx                # Admin login (Supabase Auth)
│   │   └── dashboard/page.tsx            # Admin dashboard (protected)
│   └── api/
│       └── stripe/
│           ├── checkout/route.ts         # Creates Stripe Checkout session
│           ├── webhook/route.ts          # Stripe webhook (production)
│           └── webhook/success/route.ts  # Post-payment redirect handler
├── components/
│   ├── free-question-form.tsx
│   ├── vip-question-form.tsx
│   └── admin/
│       ├── stats-cards.tsx
│       ├── question-card.tsx
│       ├── question-feed.tsx
│       └── logout-button.tsx
├── lib/
│   ├── actions.ts                        # Server actions (CRUD)
│   ├── stripe.ts                         # Stripe client
│   ├── utils.ts                          # shadcn/ui utils
│   └── supabase/
│       ├── client.ts                     # Browser Supabase client
│       ├── server.ts                     # Server Supabase client
│       └── middleware.ts                 # Auth middleware helper
├── middleware.ts                          # Route protection
└── supabase/
    └── schema.sql                        # Database schema + RLS policies
```

## Security Model

| Role            | SELECT | INSERT | UPDATE | DELETE |
|-----------------|--------|--------|--------|--------|
| `anon` (public) | No     | Yes    | No     | No     |
| `authenticated` | Yes    | Yes    | Yes    | Yes    |

- Public users can only insert questions — no reading, editing, or deleting.
- Admin routes are protected by middleware + server-side auth checks.
- VIP questions are only inserted after verified Stripe payment.
- No cookies, sessions, or tracking for public visitors.
