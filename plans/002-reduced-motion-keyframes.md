# 002 — Add prefers-reduced-motion handling to all keyframe animations

- **Status**: TODO
- **Commit**: c4fb6db
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`app/globals.css`), ~15 lines added

## Problem

The existing `@media (prefers-reduced-motion: reduce)` block in `app/globals.css` only covers the global button press:

```css
/* app/globals.css — current, end of file */
@media (prefers-reduced-motion: reduce) {
  button:not(:disabled):active { transform: none; transition: none; }
}
```

Five other keyframe animations that move elements on screen are **not covered**:

| Keyframe | Movement | Where used |
|---|---|---|
| `screenEnter` | `scale(0.97) translateY(6px)` → settled | Every screen transition (`app/page.tsx`) |
| `successPop` | `scale(0.5)` → `scale(1.08)` → `scale(1)` | `PaymentSuccess.tsx`, `RegistrationConfirmation.tsx` |
| `fadeUp` | `translateY(6px)` → `translateY(0)` | Same two components, staggered headline |
| `fadeSlideIn` | `translateY(-8px)` → `translateY(0)` | Toast entry (`app/page.tsx`) |
| `fadeSlideOut` | `translateY(0)` → `translateY(-8px)` | Toast exit (`app/page.tsx`) |

Users who have enabled "Reduce Motion" in system preferences will see all position/scale changes. Per the audit playbook: **reduced motion means fewer and gentler animations, not zero — keep opacity transitions that aid comprehension, remove position changes.**

## Target

Inside a `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`, redefine each keyframe as an opacity-only fade. CSS `@keyframes` declared inside a media query override the global definition when the query matches — no JS required, no class changes needed.

```css
/* app/globals.css — target addition, extending the existing block */
@media (prefers-reduced-motion: reduce) {
  button:not(:disabled):active { transform: none; transition: none; }

  @keyframes screenEnter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes successPop {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeUp {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeSlideOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
}
```

Each animation retains its opacity arc (fade in or fade out) so state changes remain legible. All `transform` movement is dropped.

## Repo conventions to follow

- All animation definitions live in `app/globals.css`. This change adds only to that file.
- The existing reduced-motion block is at the bottom of the file — extend it in place rather than adding a second `@media` block.
- Exemplar of the pattern to extend: the existing `@media (prefers-reduced-motion: reduce)` block already in the file.

## Steps

1. Open `app/globals.css`.
2. Find the existing `@media (prefers-reduced-motion: reduce)` block at the bottom of the file. It currently reads:
   ```css
   @media (prefers-reduced-motion: reduce) {
     button:not(:disabled):active { transform: none; transition: none; }
   }
   ```
3. Replace it with the extended version that adds the five keyframe overrides inside the same block:
   ```css
   @media (prefers-reduced-motion: reduce) {
     button:not(:disabled):active { transform: none; transition: none; }

     @keyframes screenEnter {
       from { opacity: 0; }
       to   { opacity: 1; }
     }
     @keyframes successPop {
       from { opacity: 0; }
       to   { opacity: 1; }
     }
     @keyframes fadeUp {
       from { opacity: 0; }
       to   { opacity: 1; }
     }
     @keyframes fadeSlideIn {
       from { opacity: 0; }
       to   { opacity: 1; }
     }
     @keyframes fadeSlideOut {
       from { opacity: 1; }
       to   { opacity: 0; }
     }
   }
   ```
4. Do not change the global keyframe definitions above this block.

## Boundaries

- Do NOT touch any component files — this fix is CSS-only.
- Do NOT add new animation class names or change how animations are applied in JSX.
- Do NOT remove the global keyframe definitions (the `@keyframes` blocks outside the media query) — they must remain for non-reduced-motion users.
- If the file structure differs from the excerpt above (e.g. the media query has moved), locate it by searching for `prefers-reduced-motion` — there should be exactly one block.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. In Chrome DevTools → Rendering panel → Emulate CSS media feature → select `prefers-reduced-motion: reduce`.
  2. Navigate between screens: transitions should be opacity-only fades, no scale or Y movement.
  3. Reach the payment success screen: the check icon and headline should fade in without the spring pop or upward nudge.
  4. Trigger the issue toast: it should fade in and fade out with no vertical movement.
  5. Disable the emulation and confirm all movements return (normal users unaffected).
  6. In DevTools Animations panel at 10% speed, confirm zero `transform` changes appear in the animation timeline when reduced-motion is active.
- **Done when**: toggling `prefers-reduced-motion: reduce` in DevTools Rendering panel produces pure opacity fades on all five animations with zero position or scale change visible.
