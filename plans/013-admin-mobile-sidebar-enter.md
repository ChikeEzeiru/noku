# 013 — Admin mobile sidebar dropdown entry animation

- **Status**: TODO
- **Commit**: 33ea7a3
- **Severity**: LOW
- **Category**: Preventing a jarring change
- **Estimated scope**: `app/globals.css` + `app/admin/layout.tsx`, ~15 lines total

## Problem

On mobile (< 1024 px), tapping the hamburger button expands the navigation dropdown with a hard cut — the nav panel snaps into view with no animation. The panel is conditionally rendered: `{sidebarOpen && <div ...>}`, so it mounts from scratch each tap, making `@starting-style` the right entry mechanism.

Current mobile nav panel at `app/admin/layout.tsx:226–247`:

```tsx
{sidebarOpen && (
  <div className="px-4 pb-4 bg-noku-surface border-b border-noku-rule">
    <p className={`${sectionLabel} pt-2`}>GENERAL</p>
    <nav className="flex flex-col mt-1">
      <NavItems
        items={generalNavItems}
        getClass={navItemClasses}
        isActive={isActive}
        onClick={() => setSidebarOpen(false)}
      />
    </nav>
    <p className={`${sectionLabel} pt-4`}>SETTINGS</p>
    <nav className="flex flex-col mt-1">
      <NavItems
        items={settingsNavItems}
        getClass={navItemClasses}
        isActive={isActive}
        onClick={() => setSidebarOpen(false)}
      />
    </nav>
  </div>
)}
```

## Target

Add a `sidebar-enter` CSS class (new — add to globals.css) to the dropdown div. The class applies entry via `@starting-style { opacity: 0; transform: translateY(-8px); }` with a 200 ms transition. The panel slides down from slightly above its settled position, matching the physical gesture (tap from above; panel arrives from above).

No exit animation — the panel is unmounted instantly when the user taps the hamburger again or selects a nav item. An exit animation would require the always-rendered pattern and an extra `isSidebarExiting` state, which is disproportionate for a mobile nav drawer that users see occasionally. A clean exit is fine.

### CSS to add to `app/globals.css` — append after the `toast-enter` / `toastOut` block added by Plan 009:

```css
/* Plan 013: admin mobile sidebar entry */
.sidebar-enter {
  transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
              transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

@starting-style {
  .sidebar-enter {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-enter { transition: opacity 150ms ease; }
  @starting-style { .sidebar-enter { transform: none; } }
}
```

### Updated dropdown div at `app/admin/layout.tsx:227`:

Before:
```tsx
<div className="px-4 pb-4 bg-noku-surface border-b border-noku-rule">
```
After:
```tsx
<div className="px-4 pb-4 bg-noku-surface border-b border-noku-rule sidebar-enter">
```

## Repo conventions to follow

- Same `@starting-style` + plain CSS class pattern as `screen-enter` (globals.css 105–131) and `toast-enter` (Plan 009).
- Direction: panel descends from the header, so entry direction is `translateY(-8px) → 0` (slide down into place).
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` throughout.
- Prefers-reduced-motion: opacity only, no Y movement.

## Steps

1. **`app/globals.css`** — append the CSS block above after the Plan 009 additions (after the `toastOut` reduced-motion block).

2. **`app/admin/layout.tsx:227`** — find the dropdown div:
   ```tsx
   <div className="px-4 pb-4 bg-noku-surface border-b border-noku-rule">
   ```
   Replace with:
   ```tsx
   <div className="px-4 pb-4 bg-noku-surface border-b border-noku-rule sidebar-enter">
   ```

## Boundaries

- Do NOT animate the desktop sidebar — it is always visible (not conditionally rendered), and `@starting-style` would only fire on initial page load, not on navigation.
- Do NOT change `{sidebarOpen && ...}` to an always-rendered pattern — the exit snap is acceptable and the added state management is not worth it.
- Do NOT change any nav link className, the hamburger button, or the mobile header.
- Scope is exactly 2 files, 1 CSS block + 1 className change.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check** (requires mobile viewport — use DevTools device emulation at ≤ 1024 px width):
  1. Tap the hamburger icon — the nav panel should slide down from `translateY(-8px)` and fade in over ~200 ms.
  2. Tap the hamburger again — panel should disappear instantly (no exit animation expected).
  3. Tap a nav link — panel disappears instantly as expected.
  4. Tap the hamburger again — entry animation plays again (remount fires `@starting-style`).
  5. In DevTools Animations panel at 10% speed: confirm `opacity` goes `0 → 1` and `transform` goes `translateY(-8px) → none`. Curve starts steep.
  6. Emulate `prefers-reduced-motion: reduce`: entry should fade in only, no Y movement.
- **Done when**: opening the mobile nav feels like a panel dropping into place rather than a pop-in.
