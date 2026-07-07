@AGENTS.md

# Noku Prototype

## About

Mobile-responsive PWA prototype of a shared generator payment app for Lagos mini-estates. All data is simulated/hardcoded. No backend, no real payments.

## Design System

Configured in app/globals.css via @theme directive (Tailwind v4):

- Font: DM Sans (configured in layout.tsx via next/font, referenced as font-sans)
- Colors: use noku-\* prefix (noku-green, noku-amber, noku-red, noku-heading, noku-body, noku-secondary, noku-rule, noku-card, noku-surface)
- Card radius: rounded-card (12px)
- App max width: max-w-app (430px)
- DO NOT create a tailwind.config.ts file — this project uses Tailwind v4 CSS-first configuration

## Project Structure

- No src/ directory — app/ is at root level
- app/layout.tsx — root layout with DM Sans font and PWA config
- app/page.tsx — main app shell with state machine
- app/globals.css — Tailwind v4 theme config
- components/home/ — home screen components
- components/payment/ — payment flow components
- public/manifest.json — PWA manifest
- public/icons/ — app icons

## Architecture

- App shell with state machine in app/page.tsx
- State type: "home-unpaid" | "payment-review" | "payment-processing" | "payment-success" | "home-paid"
- Screen transitions managed via useState and setScreen
- 2-second simulated delay on payment processing

## Rules

- No backend, no database, no API calls
- All data hardcoded in components
- Mobile-first, max-w-app centered on desktop
- Use Tailwind classes exclusively, no inline styles
- Use noku-\* color tokens from @theme, never raw hex values
- Do NOT create tailwind.config.ts
