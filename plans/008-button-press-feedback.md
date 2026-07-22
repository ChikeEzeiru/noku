# 008 — Differentiated button press feedback

- **Status**: TODO
- **Commit**: 6e68a57
- **Severity**: MEDIUM
- **Category**: Feedback
- **Estimated scope**: 9 files (`app/globals.css` + 8 component files), ~10 class additions

## Problem

No pressable element in the app has `:active` feedback — buttons feel unresponsive on mobile where hover doesn't exist. Two tiers of press feedback are needed based on button size:

- **Nav tab buttons** (small, icon + label): compress more — `scale(0.96)`
- **Full-width CTA buttons** (large, primary green): compress less — `scale(0.98)`

AUDIT.md: *"Press feedback: `transform: scale(0.97)` on `:active` with `transition: transform 160ms ease-out`. Keep it subtle (0.95–0.98)."*

Duration target for this app: 100ms (snappier feel appropriate for a mobile PWA).

### Affected buttons confirmed by grep:

**Nav tab (1 button, 1 file):**
- `components/shared/BottomNav.tsx:78` — inactive tab `<button>` (active tab is a `<div>`, exempt)

**Full-width CTA (8 buttons, 7 files):**
- `components/payment/PaymentReview.tsx:212`
- `components/payment/AddPaymentMethod.tsx:196`
- `components/payment/BankTransfer.tsx:141`
- `components/payment/AddCard.tsx:188`
- `components/payment/PaymentSuccess.tsx:97`
- `components/report/ReportIssue1.tsx:102`
- `components/report/ReportIssue2.tsx:247`
- `components/report/ReportIssue3.tsx:153`

## Target

Define two `@utility` classes in `app/globals.css` (Tailwind v4 convention). Add `btn-press-nav` to the BottomNav button and `btn-press-cta` to each of the 8 CTA buttons.

### Utilities to add to `app/globals.css`:

```css
@utility btn-press-nav {
  transition-property: transform;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  &:not(:disabled):active { transform: scale(0.96); }
  @media (prefers-reduced-motion: reduce) {
    &:not(:disabled):active { transform: none; }
  }
}

@utility btn-press-cta {
  transition-property: transform;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  &:not(:disabled):active { transform: scale(0.98); }
  @media (prefers-reduced-motion: reduce) {
    &:not(:disabled):active { transform: none; }
  }
}
```

### BottomNav — `components/shared/BottomNav.tsx:78`:

Before:
```tsx
<button
  key={id}
  onClick={() => onNavigate(id)}
  className="flex-1 h-full flex flex-col items-center justify-center gap-1 rounded-[16px]"
  style={{ color: "#abab9c" }}
>
```
After:
```tsx
<button
  key={id}
  onClick={() => onNavigate(id)}
  className="flex-1 h-full flex flex-col items-center justify-center gap-1 rounded-[16px] btn-press-nav"
  style={{ color: "#abab9c" }}
>
```

### CTA buttons — add `btn-press-cta` to the className of each:

**`components/payment/PaymentReview.tsx:212`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75 btn-press-cta"
```

**`components/payment/AddPaymentMethod.tsx:196`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 btn-press-cta"
```

**`components/payment/BankTransfer.tsx:141`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 btn-press-cta"
```

**`components/payment/AddCard.tsx:188`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 btn-press-cta"
```

**`components/payment/PaymentSuccess.tsx:97`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 btn-press-cta"
```

**`components/report/ReportIssue1.tsx:102`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 btn-press-cta"
```

**`components/report/ReportIssue2.tsx:247`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 btn-press-cta"
```

**`components/report/ReportIssue3.tsx:153`**
```
className="w-full bg-noku-brand-mid text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-1 btn-press-cta"
```

## Repo conventions to follow

- Tailwind v4 `@utility` directive in `app/globals.css` is the correct way to define custom utility classes in this project.
- Do NOT create `tailwind.config.ts` — this project uses CSS-first Tailwind v4 configuration.
- Exemplar of existing `@utility` usage: `app/globals.css` lines 58–64 (`bg-noku-warm-card`, `bg-noku-payment-item`).

## Steps

1. **`app/globals.css`** — after the last existing content in the file, append the two `@utility` blocks exactly as shown in the Target section.

2. **`components/shared/BottomNav.tsx:81`** — add `btn-press-nav` to the end of the inactive button's `className` string.

3. **Each of the 8 CTA files** — add `btn-press-cta` to the end of the listed button's `className` string. Process each file independently; stop and report if the exact className string isn't found at the cited line (may indicate drift).

## Boundaries

- Do NOT add `btn-press-nav` to the active tab (which is a `<div>`, not a `<button>`, and is not interactive).
- Do NOT add press feedback to secondary/outlined buttons (the white "Back", "Edit", small action buttons) — this plan is scoped to nav tabs and primary CTA buttons only.
- Do NOT touch any other files.
- Do NOT use a global `button:active` rule — the differentiated scale values require targeted classes.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check** (best tested on a real device or mobile emulation in DevTools):
  1. Tap and hold each bottom nav tab: the button should compress to ~96% of its size while held.
  2. Tap and hold a primary green CTA button (e.g. "Report Issue"): it should compress to ~98% — slightly less than the nav tab.
  3. Release: both should spring back immediately.
  4. The active nav tab (the `<div>`) should NOT compress — it has no press feedback.
  5. Emulate `prefers-reduced-motion: reduce`: pressing buttons should show no transform change.
  6. In DevTools at 10% speed (Animations panel), tap a button: confirm a `transform: scale(0.96)` or `scale(0.98)` appears during the active state and resolves on release.
- **Done when**: every pressable CTA and nav tab gives tactile compression feedback on tap, with no feedback on disabled buttons or the active nav tab.
