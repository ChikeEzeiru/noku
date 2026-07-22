# 005 — PaymentSuccess icon spring entrance with headline stagger

- **Status**: TODO
- **Commit**: 6e68a57
- **Severity**: LOW (delight — rare, first-time screen)
- **Category**: Delight / preventing a jarring change
- **Estimated scope**: 2 files (`app/globals.css`, `components/payment/PaymentSuccess.tsx`), ~20 lines

## Problem

The Payment Success screen appears instantly with no entrance motion. The green check icon and "Payment Successful!" headline render at full opacity from the first paint. This is one of the highest-emotion moments in the app (the user just paid) and the delight budget explicitly allows motion here.

Current state in `components/payment/PaymentSuccess.tsx:44–50`:

```tsx
<div
  className="w-10 h-10 rounded-lg bg-noku-success flex items-center justify-center"
  style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
>
  <CheckCircleIcon />
</div>
<p className="text-base font-medium text-noku-heading">Payment Successful!</p>
```

No animation. No delight.

## Target

The icon box springs in with a pop: `opacity: 0, scale(0.7)` → slight overshoot `scale(1.05)` → settled `scale(1)`, using a spring cubic-bezier, 300ms, 100ms delay. The headline fades and rises in 60ms after the icon animation starts (160ms delay total), 200ms, strong ease-out. Both use `animation-fill-mode: both` so they hold their start state during the delay.

**Why scale(0.7) not scale(0.97):** The AUDIT.md floor is for general UI entrances. A spring-popping icon on a rare success screen is explicitly in the delight tier where a more dramatic start is warranted. scale(0.7) is the floor that avoids the "appears from nothing" feeling while still delivering the pop.

### Keyframes to add to `app/globals.css` (after the `@keyframes shake` block):

```css
@keyframes successPop {
  0%   { opacity: 0; transform: scale(0.7); }
  70%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes successPop   { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeSlideUp  { from { opacity: 0; } to { opacity: 1; } }
}
```

### JSX changes in `components/payment/PaymentSuccess.tsx`:

Icon div — add animation class:
```tsx
<div
  className="w-10 h-10 rounded-lg bg-noku-success flex items-center justify-center animate-[successPop_300ms_cubic-bezier(0.34,1.56,0.64,1)_100ms_both]"
  style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)" }}
>
  <CheckCircleIcon />
</div>
```

Headline — add animation class:
```tsx
<p className="text-base font-medium text-noku-heading animate-[fadeSlideUp_200ms_cubic-bezier(0.23,1,0.32,1)_160ms_both]">Payment Successful!</p>
```

## Repo conventions to follow

- Animation as Tailwind arbitrary-value classes: `animate-[keyframeName_duration_easing_delay_fill]`.
- Keyframes defined in `app/globals.css` — the only file that holds animation definitions.
- Strong ease-out curve for entrances: `cubic-bezier(0.23, 1, 0.32, 1)` (AUDIT.md canonical `--ease-out`).
- Spring curve for the pop: `cubic-bezier(0.34, 1.56, 0.64, 1)` — this produces overshoot above scale(1) that the keyframe then settles from.
- Exemplar of the pattern: `app/globals.css` `@keyframes fadeSlideIn` (existing).

## Steps

1. **`app/globals.css`** — after the closing `}` of `@keyframes shake` (line 79), append exactly:
   ```css
   @keyframes successPop {
     0%   { opacity: 0; transform: scale(0.7); }
     70%  { transform: scale(1.05); }
     100% { opacity: 1; transform: scale(1); }
   }

   @keyframes fadeSlideUp {
     from { opacity: 0; transform: translateY(6px); }
     to   { opacity: 1; transform: translateY(0); }
   }

   @media (prefers-reduced-motion: reduce) {
     @keyframes successPop   { from { opacity: 0; } to { opacity: 1; } }
     @keyframes fadeSlideUp  { from { opacity: 0; } to { opacity: 1; } }
   }
   ```
   Note: if Plan 004 has already run, append after its additions, not inside them.

2. **`components/payment/PaymentSuccess.tsx:44`** — find the icon div's className:
   ```
   className="w-10 h-10 rounded-lg bg-noku-success flex items-center justify-center"
   ```
   Replace with:
   ```
   className="w-10 h-10 rounded-lg bg-noku-success flex items-center justify-center animate-[successPop_300ms_cubic-bezier(0.34,1.56,0.64,1)_100ms_both]"
   ```

3. **`components/payment/PaymentSuccess.tsx:50`** — find the headline:
   ```tsx
   <p className="text-base font-medium text-noku-heading">Payment Successful!</p>
   ```
   Replace with:
   ```tsx
   <p className="text-base font-medium text-noku-heading animate-[fadeSlideUp_200ms_cubic-bezier(0.23,1,0.32,1)_160ms_both]">Payment Successful!</p>
   ```

## Boundaries

- Do NOT touch any other component files.
- Do NOT change `style={{ boxShadow: … }}` on the icon div.
- Do NOT change the `CheckCircleIcon` SVG component.
- If `@keyframes successPop` already exists verbatim in globals.css (from a prior run), skip Step 1 and proceed to Steps 2–3.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Navigate to the payment success screen (complete the payment flow, or temporarily set `const [screen, setScreen] = useState<AppState>("payment-success")` in page.tsx).
  2. The green check icon should spring in from slightly smaller, overshoot momentarily, and settle. The "Payment Successful!" headline should fade up about a beat after the icon starts.
  3. In DevTools Animations panel at 10% speed: icon animation shows `opacity` going 0→1 and `transform` going `scale(0.7)` → `scale(1.05)` → `scale(1)`. Headline animation shows `opacity` 0→1 and `translateY(6px)` → `translateY(0)`, starting ~160ms after page render.
  4. Emulate `prefers-reduced-motion: reduce`: both icon and headline should simply fade in (no scale, no Y movement).
- **Done when**: the check icon visibly pops in with spring character and the headline fades up in its wake — the screen feels like a moment, not an instant.
