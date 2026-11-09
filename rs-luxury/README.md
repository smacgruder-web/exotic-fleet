# RS Luxury — Maryland exotic rentals

Modern rebuild of the RS Luxury National Harbor / DMV experience (exotics, Sprinters, chauffeur) with phase-1 AI fleet match, quote estimator, lead intake, and specials messaging.

## Stack

- Next.js App Router + TypeScript + Tailwind
- Editable fleet / specials / site copy in `content/*.json`
- Lead CRM stubs → `data/leads.json` locally; Postgres-ready via `migrations/001_leads.sql` + `cursor-app.json`

## Develop

```bash
npm install
npm run dev
```

## Key routes

| Path | Role |
| --- | --- |
| `/` | Brand home + AI fleet match + specials |
| `/maryland-exotic-car-rentals` | Maryland exotic landing |
| `/fleet` | Full editable inventory |
| `/sprinter-vans` | Sprinter path |
| `/luxury-chauffeur-service` | Chauffeur path |
| `/book` | Intake / Book Now |
| `/concierge` | Lead status + notes desk |

## Rates

Only archive-confirmed daily rates are shown as numbers. Unconfirmed vehicles are **price on request** — see `docs` recreation brief. Do not invent rates.

## Secrets (optional)

| Name | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Optional LLM wrapper for chat language (rules engine works without it) |
| `DATABASE_URL` | Postgres when publishing with Cursor apps-database |
| `TWILIO_*` | Phase-2 SMS concierge (not wired yet; phone/SMS deep links work) |
