# 001 — Fix toast exit easing from ease-in to strong ease-out

- **Status**: TODO
- **Commit**: c4fb6db
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file, 1-line change

## Problem

The toast exit animation uses `ease-in`, which starts slowly and then accelerates. Per the animation audit playbook, **ease-in on UI is always a finding** — it starts slow, delaying the exact moment the user is watching. Because the toast lingers at full opacity for the first half of the animation before visibly moving, the exit feels sluggish rather than clean.

Location: `app/page.tsx`, the toast `className` template literal:

```tsx
/* app/page.tsx — current */
<div className={`absolute top-4 left-4 right-4 z-50 ${isToastExiting ? "animate-[fadeSlideOut_200ms_ease-in_forwards]" : "animate-[fadeSlideIn_0.25s_ease-out]"}`}>
```

The `ease-in` token sits in the exit branch of this template literal.

## Target

Replace `ease-in` with the repo's strong ease-out curve `cubic-bezier(0.23, 1, 0.32, 1)`. This matches the curve already used on the screen-enter animation (`screenEnter_200ms_cubic-bezier(0.23,1,0.32,1)`) and the AUDIT.md canonical `--ease-out` token. The exit will now start quickly and decelerate at the end — responsive, not hesitant.

```tsx
/* app/page.tsx — target */
<div className={`absolute top-4 left-4 right-4 z-50 ${isToastExiting ? "animate-[fadeSlideOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]" : "animate-[fadeSlideIn_0.25s_ease-out]"}`}>
```

## Repo conventions to follow

- Easing lives as inline Tailwind arbitrary values; the repo does not yet have CSS easing tokens, so inline the cubic-bezier directly.
- Exemplar using the same curve: `app/page.tsx` — the screen wrapper `animate-[screenEnter_200ms_cubic-bezier(0.23,1,0.32,1)_both]`.
- The entry branch (`fadeSlideIn_0.25s_ease-out`) is **not** in scope; leave it unchanged.

## Steps

1. Open `app/page.tsx`.
2. Find the toast `className` expression. The current text is:
   ```
   animate-[fadeSlideOut_200ms_ease-in_forwards]
   ```
3. Replace only that token — do not touch the surrounding template literal or the `fadeSlideIn` branch:
   ```
   animate-[fadeSlideOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]
   ```

## Boundaries

- Do NOT touch `app/globals.css` — the `fadeSlideOut` keyframe itself is correct; only the timing function passed at the call site changes.
- Do NOT touch the entry animation (`fadeSlideIn` branch).
- Do NOT change any other animation in `app/page.tsx`.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output (clean).
- **Feel check**:
  1. Trigger the issue-report flow, submit an issue, and watch the toast appear.
  2. Click the ✕ button to dismiss, or wait for auto-dismiss (~3.8 s).
  3. The toast should begin moving immediately (no pause at full opacity) and decelerate smoothly as it reaches -8px.
  4. In DevTools Animations panel, set playback to 10% speed and confirm the exit curve starts steep and flattens — not the reverse.
  5. Toggle `prefers-reduced-motion` in DevTools Rendering panel — toast exit should remain an opacity fade (movement is overridden by plan 002 if executed first; if not, it will still slide but the easing will be correct).
- **Done when**: the exit animation feels at least as snappy as the entry, with no visible hover at full opacity before the slide begins.
