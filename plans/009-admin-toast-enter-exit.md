# 009 — Admin toast enter/exit animation

- **Status**: TODO
- **Commit**: 33ea7a3
- **Severity**: MEDIUM
- **Category**: Preventing a jarring change
- **Estimated scope**: `app/globals.css` + 4 admin page files, ~35 lines total

## Problem

Four admin pages share identical toast markup that snaps in with no animation and disappears instantly when `setToastMsg(null)` unmounts it. The toast sits at `bottom-6 right-6`; it should enter sliding up from below and exit the same edge (down).

Toast JSX in `app/admin/fuel/page.tsx:157–165` (identical in payments/page.tsx:118–126, page.tsx:284–292, announcements/page.tsx:445–453):

```tsx
{toastMsg && (
  <div
    className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 text-sm font-medium text-white rounded-[10px] px-4 py-3"
    style={{ background: "#2b2b22", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
  >
    <CheckCircleIcon />
    {toastMsg}
  </div>
)}
```

State and timer in `app/admin/fuel/page.tsx:51–60` (same pattern in all 4 files):

```tsx
const [toastMsg, setToastMsg] = useState<string | null>(null);
const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

function showToast(msg: string) {
  if (toastTimer.current) clearTimeout(toastTimer.current);
  setToastMsg(msg);
  toastTimer.current = setTimeout(() => setToastMsg(null), 3500);
}
```

When `setToastMsg(null)` fires, the element unmounts immediately with no exit.

## Target

**Entry** — add `toast-enter` CSS class (defined in globals.css). React mounts the element when `toastMsg` becomes truthy; `@starting-style` fires on that first paint, sliding the toast in from `translateY(8px)`.

**Exit** — add `isToastExiting` state + `dismissToast()`. The function sets `isToastExiting: true` first (element stays mounted, exit keyframe plays), then 200 ms later clears both states (element unmounts). The timer in `showToast` targets `dismissToast()` at 3300 ms (3300 + 200 exit = 3500 ms total visible).

### CSS to add to `app/globals.css` — append after last `@utility` block:

```css
/* Plan 009: admin toast enter/exit */
.toast-enter {
  transition: opacity 200ms ease,
              transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

@starting-style {
  .toast-enter {
    opacity: 0;
    transform: translateY(8px);
  }
}

@keyframes toastOut {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(8px); }
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter { transition: opacity 150ms ease; }
  @starting-style { .toast-enter { transform: none; } }
  @keyframes toastOut { from { opacity: 1; } to { opacity: 0; } }
}
```

### State change — add one line after `toastMsg` in each of the 4 files:

Before:
```tsx
const [toastMsg, setToastMsg] = useState<string | null>(null);
```
After:
```tsx
const [toastMsg,      setToastMsg]      = useState<string | null>(null);
const [isToastExiting, setIsToastExiting] = useState(false);
```

### New `dismissToast` function — insert immediately after `showToast` closes in each file:

```tsx
function dismissToast() {
  setIsToastExiting(true);
  setTimeout(() => { setToastMsg(null); setIsToastExiting(false); }, 200);
}
```

### `showToast` changes — two edits per file:

1. Reset any in-progress exit before showing a new toast. Add `setIsToastExiting(false);` on the first line inside `showToast`, before `setToastMsg(msg)`.
2. Change the auto-dismiss timer: `setTimeout(() => setToastMsg(null), 3500)` → `setTimeout(() => dismissToast(), 3300)`.

Full updated `showToast`:
```tsx
function showToast(msg: string) {
  if (toastTimer.current) clearTimeout(toastTimer.current);
  setIsToastExiting(false);
  setToastMsg(msg);
  toastTimer.current = setTimeout(() => dismissToast(), 3300);
}
```

### Toast JSX — update the `className` to include `toast-enter` and the conditional exit animation:

Before (all 4 files):
```tsx
className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 text-sm font-medium text-white rounded-[10px] px-4 py-3"
```
After:
```tsx
className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 text-sm font-medium text-white rounded-[10px] px-4 py-3 toast-enter${isToastExiting ? " animate-[toastOut_200ms_cubic-bezier(0.23,1,0.32,1)_forwards]" : ""}`}
```

## Repo conventions to follow

- Same `@starting-style` + `.class-name` pattern as the existing `screen-enter` utility (globals.css lines 105–131).
- Same keyframe-exit + `isToastExiting` pattern as planned in `007-toast-exit-animation.md`.
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for both entry transition and exit keyframe.
- Prefers-reduced-motion: preserve opacity fade; strip Y movement.
- No animation libraries — keyframes in globals.css, applied via Tailwind arbitrary-value class.

## Steps

1. **`app/globals.css`** — append the CSS block above after the last `@utility btn-press-cta` block (currently ending ~line 152).

2. **`app/admin/fuel/page.tsx`** — apply all four JS changes (new state, `dismissToast`, updated `showToast`, updated toast JSX).

3. **`app/admin/payments/page.tsx`** — same four changes as step 2.

4. **`app/admin/page.tsx`** — same four changes.

5. **`app/admin/announcements/page.tsx`** — same four changes.

## Boundaries

- Do NOT touch the toast card's visual design, colors, or any other className besides the outer wrapper's `className`.
- Do NOT change any component files — only the 4 page files and globals.css.
- Do NOT add any new imports — `useState` is already imported in all 4 files.
- Do NOT change `toastTimer` ref or `useEffect` cleanup — they remain as-is.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. In any admin page, trigger an action that shows the toast (e.g. log a fuel expense).
  2. Toast should slide up from below (`translateY(8px) → 0`) and fade in simultaneously over ~200 ms.
  3. After ~3.3 s, toast should slide back down and fade out over ~200 ms before unmounting.
  4. In DevTools Animations panel at 10% speed: confirm `transform` goes `translateY(8px) → translateY(0)` on entry, and `translateY(0) → translateY(8px)` on exit. Curve should start steep (strong ease-out = immediate departure).
  5. Trigger a new toast while one is exiting — the entry should take over cleanly (no flash of the exiting state).
  6. Emulate `prefers-reduced-motion: reduce` — both entry and exit should fade opacity only, no Y movement.
- **Done when**: toast slides in from the bottom-right corner and departs the same edge, instead of blinking in and out.
