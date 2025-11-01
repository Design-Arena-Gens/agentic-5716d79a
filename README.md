# Agent Texter

Personalized outreach agent that texts your customers and clients in your own voice. Built with Next.js 14, OpenAI for tone-matching rewrites, and Twilio for SMS delivery. Ready to deploy on Vercel.

## Features

- Customer roster with tone/time insights and quick multi-select targeting.
- Persona controls to toggle mimic mode, pick tonal presets, and add signature guidance.
- AI-assisted rewrite using OpenAI `gpt-4.1-mini` when mimic mode is enabled.
- Twilio-backed SMS delivery with per-recipient personalization.
- Activity feed capturing delivery status, Twilio SIDs, and error diagnostics.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and plug in your credentials.

## Environment

Duplicate `.env.example` and supply values:

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

> The Supabase keys are optional placeholders for future CRM syncs.

## Deployment

The project is configured for Vercel. Once env vars are configured in the Vercel dashboard, deploy with:

```bash
vercel deploy --prod
```
