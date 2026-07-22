# 007 — Toast exit animation before unmount

- **Status**: TODO
- **Commit**: 6e68a57
- **Severity**: MEDIUM
- **Category**: Spatial consistency / preventing a jarring change
- **Estimated scope**: 2 files (`app/globals.css`, `app/page.tsx`), ~20 lines

## Problem

The "Issue reported" toast in `app/page.tsx` enters with a slide-down animation (`fadeSlideIn`) but unmounts instantly with no exit — it simply blinks out of existence. Per the audit playbook: *"dismissable surfaces exit the same edge they entered."* The toast enters from the top (slides down from `translateY(-8px)`); it must exit the same way (slides back up to `translateY(-8px)`).

Current toast JSX in `app/page.tsx:431–454`:

```tsx
{showIssueToast && (
  <div className="absolute top-4 left-4 right-4 z-50 animate-[fadeSlideIn_0.25s_ease-out]">
    <div
      className="bg-white border border-noku-border-primary rounded-xl p-4 flex flex-col gap-1.5"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-noku-text-mid">Issue reported</p>
        <button
          onClick={() => setShowIssueToast(false)}
          className="text-noku-text-dim p-0.5"
        >
```

Current state variable in `app/page.tsx:106`:
```tsx
const [showIssueToast, setShowIssueToast] = useState(false);
```

Current auto-dismiss in `app/page.tsx:148`:
```tsx
setTimeout(() => setShowIssueToast(false), 4000);
```

When `showIssueToast` becomes false, the toast unmounts without any exit animation.

## Target

Add an `isToastExiting` boolean state. A `dismissToast()` function sets `isToastExiting: true`, waits 200ms for the exit animation to complete, then sets `showIssueToast: false` and resets `isToastExiting`. The toast's wrapper div applies either the exit or entry animation class based on `isToastExiting`.

Exit easing: `cubic-bezier(0.23, 1, 0.32, 1)` (strong ease-out, starts fast — the toast leaves immediately). Duration: 200ms. **Never use `ease-in` for exits** — it starts slow, making the exit feel sticky.

### Keyframe to add to `app/globals.css`:

```css
@keyframes fadeSlideOut {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes fadeSlideOut { from { opacity: 1; } to { opacity: 0; } }
}
```

### State change in `app/page.tsx` — add one line after the existing toast state:

Before (line 106):
```tsx
const [showIssueToast, setShowIssueToast] = useState(false);
```
After:
```tsx
const [showIssueToast, setShowIssueToast] = useState(false);
const [isToastExiting, setIsToastExiting] = useState(false);
```

### Auto-dismiss change in `app/page.tsx` — swap the `setTimeout` call (line 148):

Before:
```tsx
setTimeout(() => setShowIssueToast(false), 4000);
```
After:
```tsx
setTimeout(() => dismissToast(), 3800);
```
(3800ms gives 200ms for the exit animation, totalling ≈4s visible before fully gone.)

### New `dismissToast` function — insert immediately after `handleSubmitIssue` closes:

```tsx
function dismissToast() {
  setIsToastExiting(true);
  setTimeout(() => { setShowIssueToast(false); setIsToastExiting(false); }, 200);
}
```

### Toast JSX changes in `app/page.tsx`:

Wrapper div className — switch from static to conditional:
```tsx
{showIssueToast && (
  <div className={`absolute top-4 left-4 right-4 z-50 ${isToastExiting ? "animate-[fadeSlideOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]" : "animate-[fadeSlideIn_0.25s_ease-out]"}`}>
```

Close button `onClick` — use `dismissToast` instead of direct state setter:
```tsx
<button
  onClick={dismissToast}
  className="text-noku-text-dim p-0.5"
>
```

## Repo conventions to follow

- State management with `useState` + `setTimeout`; no animation libraries.
- Keyframes in `app/globals.css`; animation applied via Tailwind arbitrary-value classes.
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for exits (same strong ease-out as entrances — fast start, responsive feel).
- Exemplar: the existing `animate-[fadeSlideIn_0.25s_ease-out]` entry class.

## Steps

1. **`app/globals.css`** — after the last `@keyframes` block (or after Plan 004/005 additions if those have run), append:
   ```css
   @keyframes fadeSlideOut {
     from { opacity: 1; transform: translateY(0); }
     to   { opacity: 0; transform: translateY(-8px); }
   }

   @media (prefers-reduced-motion: reduce) {
     @keyframes fadeSlideOut { from { opacity: 1; } to { opacity: 0; } }
   }
   ```

2. **`app/page.tsx`** — find line 106 (`const [showIssueToast…`). Add the exiting state on the next line:
   ```tsx
   const [showIssueToast, setShowIssueToast] = useState(false);
   const [isToastExiting, setIsToastExiting] = useState(false);
   ```

3. **`app/page.tsx`** — find `setTimeout(() => setShowIssueToast(false), 4000)` (currently inside `handleSubmitIssue`). Replace with:
   ```tsx
   setTimeout(() => dismissToast(), 3800);
   ```

4. **`app/page.tsx`** — immediately after the closing `}` of `handleSubmitIssue`, add the `dismissToast` function:
   ```tsx
   function dismissToast() {
     setIsToastExiting(true);
     setTimeout(() => { setShowIssueToast(false); setIsToastExiting(false); }, 200);
   }
   ```

5. **`app/page.tsx`** — find the toast wrapper div (currently `<div className="absolute top-4 left-4 right-4 z-50 animate-[fadeSlideIn_0.25s_ease-out]">`). Replace with:
   ```tsx
   <div className={`absolute top-4 left-4 right-4 z-50 ${isToastExiting ? "animate-[fadeSlideOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]" : "animate-[fadeSlideIn_0.25s_ease-out]"}`}>
   ```

6. **`app/page.tsx`** — find `onClick={() => setShowIssueToast(false)}` on the toast close button. Replace with:
   ```tsx
   onClick={dismissToast}
   ```

## Boundaries

- Do NOT touch any component files outside `app/page.tsx` and `app/globals.css`.
- Do NOT change the toast card's visual design, padding, or text.
- Do NOT change the toast entry animation (`fadeSlideIn_0.25s_ease-out`) — only the exit branch is new.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Complete the issue report flow to trigger the toast.
  2. Click the ✕ button: the toast should slide back up (to `translateY(-8px)`) and fade out simultaneously, disappearing in ~200ms.
  3. Wait for auto-dismiss (~3.8s visible): same exit animation plays before the toast unmounts.
  4. In DevTools Animations panel at 10% speed during exit: confirm `opacity` goes 1→0 and `transform` goes `translateY(0)` → `translateY(-8px)`. Confirm the curve starts steep (fast start = immediate departure).
  5. Emulate `prefers-reduced-motion: reduce`: exit should fade out only (no Y movement).
- **Done when**: the toast leaves the screen with the same elegance it arrived — sliding up and out — instead of blinking away.
