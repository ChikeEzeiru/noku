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

## Admin Dashboard

### Structure

- Lives under app/admin/ with its own layout (sidebar navigation)
- Admin layout: app/admin/layout.tsx (sidebar on desktop, hamburger menu on mobile)
- Pages: dashboard, payments, fuel, residents, announcements, committee, settings
- Components: components/admin/{section}/

### Layout

- Desktop: fixed 256px sidebar on the left, content fills remaining width
- Mobile: hamburger menu in top header, content below
- No max-width constraint on content (unlike resident app's 430px)
- Responsive breakpoint: lg (1024px) switches between mobile and desktop layout

### Pages

- /admin — Dashboard home (stats, alerts, generator status widget, activity feed)
- /admin/payments — Unit-by-unit payment tracking, reminders, bulk actions
- /admin/fuel — Fuel purchase log, spending trend, budget projection, reconciliation
- /admin/residents — Roster management, household data, usage overview, flagged issues
- /admin/announcements — Create and broadcast, announcement history
- /admin/committee — Committee member management, add from residents or add new
- /admin/settings — Estate info, generator schedule, billing formula, payment settings, data & reports, danger zone

### Rules

- Same design tokens as resident app (noku-\* colors, rounded-card, DM Sans)
- No bottom navigation — sidebar only
- Tables on desktop, stacked cards on mobile
- All data hardcoded in components
- Shared components (stat cards, badges, tables) go in components/admin/shared/

### Responsive Behavior

**Breakpoint: lg (1024px)**

Desktop (≥1024px):

- Fixed 276px sidebar visible
- Content area fills remaining width
- Data tables render as full tables with sortable columns
- Stat cards in horizontal rows (3-4 across)
- Side-by-side layouts where appropriate (e.g. chart + list)
- Modals and slide-out panels for detail views

Mobile (<1024px):

- Sidebar collapses to hamburger menu in fixed top header
- Content area is full width with 16px horizontal padding
- Tables convert to stacked cards (one card per row)
- Stat cards stack in a 2x2 grid
- Side-by-side layouts stack vertically
- Detail views become full-screen pages instead of panels
- Charts simplify (fewer data points, larger touch targets)
- Bulk action buttons stack vertically or use a horizontal scroll
- Filter bars use horizontally scrollable pills instead of dropdowns

**General responsive rules:**

- Touch targets minimum 44px on mobile
- Font sizes don't change between breakpoints (already legible at 14px body)
- Spacing reduces slightly on mobile (p-6 desktop → p-4 mobile)
- No horizontal scrolling on any screen except filter pill rows
