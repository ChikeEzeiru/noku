# 010 — Admin modal panel entry animation

- **Status**: TODO
- **Commit**: 33ea7a3
- **Severity**: MEDIUM
- **Category**: Preventing a jarring change
- **Estimated scope**: 3 modal component files, ~3 lines changed (no globals.css edit needed)

## Problem

Three admin modals open with a hard cut — the panel appears at full size with no entry animation. Each modal guards rendering with `if (!open) return null;`, then mounts the full panel immediately on the next render.

Affected files and lines:

**`components/admin/fuel/LogExpenseModal.tsx:257–266`**:
```tsx
if (!open) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/20" onClick={handleClose} />

    <div
      className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col max-h-[90vh]"
      style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
    >
```

**`components/admin/payments/SendReminderModal.tsx:219–226`**:
```tsx
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/20" onClick={onClose} />

    <div
      className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col"
      style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
    >
```

**`components/admin/announcements/CreateAnnouncementModal.tsx:271–278`**:
```tsx
if (!open) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/20" onClick={handleClose} />

    <div
      className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col"
      style={{ boxShadow: "0px 20px 24px -4px rgba(0,0,0,0.08), 0px 8px 8px -4px rgba(0,0,0,0.03), 0px 3px 3px -1.5px rgba(0,0,0,0.04)" }}
    >
```

## Target

Add `screen-enter` to the panel `<div>` in each modal. Because each modal guards rendering with `if (!open) return null;`, the panel remounts each time `open` becomes `true`, triggering `@starting-style` on every open — no JS changes needed.

**Note on transform-origin**: Per AUDIT.md, modals are **exempt** from the origin rule. They are centered overlays; `transform-origin: center` (the browser default) is correct. `screen-enter` uses `scale(0.97)` which scales from center — correct for modals.

### Target panel className for all three modals:

LogExpenseModal (has `max-h-[90vh]`):
```tsx
className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col max-h-[90vh] screen-enter"
```

SendReminderModal and CreateAnnouncementModal (no max-h):
```tsx
className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col screen-enter"
```

No changes to `app/globals.css` — `screen-enter` was added in Plan 004 and is already available:
```css
.screen-enter {
  transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
              transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}
@starting-style {
  .screen-enter { opacity: 0; transform: scale(0.97) translateY(4px); }
}
```

## Repo conventions to follow

- `screen-enter` is the repo's standard entry utility (first applied in Plan 004 to screen transitions, Plan 012 to the admin content area). Modals are the next natural application.
- `if (!open) return null;` pattern is preserved — `@starting-style` fires on every remount, which is the desired behavior (fresh entry animation on each open).
- No animation libraries — pure CSS via the existing utility.

## Steps

1. **`components/admin/fuel/LogExpenseModal.tsx`** — find the panel div at line 264:
   ```tsx
   className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col max-h-[90vh]"
   ```
   Replace with:
   ```tsx
   className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col max-h-[90vh] screen-enter"
   ```

2. **`components/admin/payments/SendReminderModal.tsx`** — find the panel div at line 224:
   ```tsx
   className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col"
   ```
   Replace with:
   ```tsx
   className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col screen-enter"
   ```

3. **`components/admin/announcements/CreateAnnouncementModal.tsx`** — find the panel div at line 276:
   ```tsx
   className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col"
   ```
   Replace with:
   ```tsx
   className="relative bg-white rounded-[16px] w-full max-w-[560px] flex flex-col screen-enter"
   ```

## Boundaries

- Do NOT change `if (!open) return null;` — it is load-bearing for the `@starting-style` remount trick.
- Do NOT animate the backdrop (`<div className="absolute inset-0 bg-black/20" ...>`) — it is fullscreen; scale animation would be imperceptible and opacity snap is fine.
- Do NOT touch any other className, layout, or JS logic.
- Do NOT edit `app/globals.css` — `screen-enter` already exists.
- Scope is exactly 3 files, 1 line change each.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Open LogExpenseModal (Fuel page → "Log Expense" button).
  2. Modal panel should scale from ~0.97 and fade in simultaneously over ~200 ms. It should feel like it pops forward from the center, not materialize instantly.
  3. Close and reopen — the entry animation should replay identically (remount fires `@starting-style` again).
  4. Repeat for SendReminderModal (Payments page) and CreateAnnouncementModal (Announcements page).
  5. In DevTools Animations panel at 10% speed: confirm `opacity` goes `0 → 1` and `transform` goes `scale(0.97) translateY(4px) → none`. Curve should start steep (fast start).
  6. Emulate `prefers-reduced-motion: reduce`: modal should fade in only, no scale or Y movement.
- **Done when**: all three modals appear with a 200 ms scale + fade entry instead of a hard cut.
