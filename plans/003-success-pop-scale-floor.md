# 003 — Raise successPop start scale from 0.5 to 0.7

- **Status**: TODO
- **Commit**: c4fb6db
- **Severity**: LOW
- **Category**: Physicality & origin
- **Estimated scope**: 1 file (`app/globals.css`), 1-line change

## Problem

The `successPop` keyframe starts at `scale(0.5)`:

```css
/* app/globals.css — current */
@keyframes successPop {
  0%   { opacity: 0; transform: scale(0.5); }
  70%  { transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
```

The audit playbook target for entrance animations is `scale(0.9–0.97)` — close to final size — plus `opacity: 0`. `scale(0.5)` puts the icon at half its rendered size (20×20px on a 40×40px element), which is at the dramatic end of the acceptable range. The spring overshoot to `scale(1.08)` amplifies this: the total travel is `0.5 → 1.08 → 1.0`, a 0.58-unit swing.

This is a judgment call for a rare/delight-tier moment, but it breaks the codified floor and can read as "too big a deal" for what is a compact icon next to a payment summary. Raising the floor to `scale(0.7)` still delivers a clear spring pop (total travel: `0.7 → 1.08 → 1.0`, a 0.38-unit swing) while feeling more grounded.

This keyframe is used in two places:
- `components/payment/PaymentSuccess.tsx` — the 40×40 green check icon
- `components/auth/RegistrationConfirmation.tsx` — the 200×200 Noku logo illustration

Both benefit from the tighter floor: the logo in particular scales from 100px to 216px at `scale(0.5)`, which can feel jarring on first-run screens.

## Target

```css
/* app/globals.css — target */
@keyframes successPop {
  0%   { opacity: 0; transform: scale(0.7); }
  70%  { transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
```

Only the `0%` frame changes. The spring overshoot (`1.08`) and settled value (`1`) are unchanged.

## Repo conventions to follow

- Keyframe definitions live in `app/globals.css`. Edit only that file.
- Exemplar of the expected scale range: `screenEnter` already uses `scale(0.97)` — this plan moves `successPop` closer to that spirit while keeping its spring character.

## Steps

1. Open `app/globals.css`.
2. Find the `@keyframes successPop` block. The `0%` frame currently reads:
   ```css
   0%   { opacity: 0; transform: scale(0.5); }
   ```
3. Change `scale(0.5)` to `scale(0.7)`:
   ```css
   0%   { opacity: 0; transform: scale(0.7); }
   ```
4. Leave the `70%` and `100%` frames untouched.

## Boundaries

- Do NOT touch `components/payment/PaymentSuccess.tsx` or `components/auth/RegistrationConfirmation.tsx` — the animation class strings in those files are correct and do not reference the scale value.
- Do NOT change the `70%` overshoot or `100%` settled frame.
- Do NOT change any other keyframe.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Navigate to the payment success screen (complete the payment flow or set `screen` state directly in DevTools).
  2. In DevTools Animations panel at 10% speed, watch the check icon entrance: it should start visibly smaller than final but not half-sized, spring past `scale(1)`, and settle cleanly.
  3. Navigate to the registration confirmation screen (complete the invite code + account setup flows). The Noku logo should pop in from roughly 70% of its final size — a light spring, not a dramatic reveal.
  4. Compare both before and after by toggling between `scale(0.5)` and `scale(0.7)` in DevTools inline style override — pick the one that feels intentional without feeling like a marketing splash.
- **Done when**: the icon and logo entrance reads as a confident spring-in rather than a dramatic scale-from-nothing, and the total visual travel feels proportionate to the screen's importance.
