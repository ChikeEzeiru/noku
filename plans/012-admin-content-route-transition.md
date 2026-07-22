# 012 — Admin content area route transition

- **Status**: TODO
- **Commit**: 33ea7a3
- **Severity**: MEDIUM
- **Category**: Preventing a jarring change
- **Estimated scope**: 1 file (`app/admin/layout.tsx`), 1 line changed

## Problem

Navigating between admin pages (Home → Payments → Fuel → Residents…) replaces the content area with a hard cut — the new page appears instantly at full opacity with no transition. The resident app's screen transitions use `screen-enter` (Plan 004), but the admin content div in `app/admin/layout.tsx` does not.

Current content wrapper at `app/admin/layout.tsx:252`:

```tsx
<div className="bg-white min-h-screen lg:rounded-tl-[12px] lg:border lg:border-noku-rule mt-14 lg:mt-0 p-6 lg:p-8">
  {children}
</div>
```

`screen-enter` is already defined in `app/globals.css` (Plan 004, lines 105–131) — no CSS change needed.

## Target

Add `screen-enter` to the content wrapper className:

```tsx
<div className="bg-white min-h-screen lg:rounded-tl-[12px] lg:border lg:border-noku-rule mt-14 lg:mt-0 p-6 lg:p-8 screen-enter">
  {children}
</div>
```

The `screen-enter` utility applies:
```css
transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
            transform 200ms cubic-bezier(0.23, 1, 0.32, 1);

@starting-style {
  opacity: 0;
  transform: scale(0.97) translateY(4px);
}
```

On each route change, Next.js App Router unmounts and remounts `{children}`. Because the content `<div>` persists across routes (it is in the layout, not the page), the `@starting-style` fires on the `{children}` content itself only if child elements have `screen-enter`. This plan adds it to the wrapper div so that the whole content surface transitions in on first render; for per-page animation the correct location is the page root div in each `app/admin/*/page.tsx` file, but applying it to the layout wrapper gives the most consistent behavior with the least change.

## Repo conventions to follow

- `screen-enter` was designed for this exact use case — it is the repo's standard page/screen entry utility.
- Already applied to resident-side screens (app/page.tsx state machine transitions in Plan 004).
- Easing `cubic-bezier(0.23, 1, 0.32, 1)` and 200 ms duration are the established values.

## Steps

1. **`app/admin/layout.tsx:252`** — find the content wrapper div:
   ```tsx
   <div className="bg-white min-h-screen lg:rounded-tl-[12px] lg:border lg:border-noku-rule mt-14 lg:mt-0 p-6 lg:p-8">
   ```
   Replace with:
   ```tsx
   <div className="bg-white min-h-screen lg:rounded-tl-[12px] lg:border lg:border-noku-rule mt-14 lg:mt-0 p-6 lg:p-8 screen-enter">
   ```

## Boundaries

- Do NOT touch `app/globals.css` — `screen-enter` already exists.
- Do NOT touch the sidebar, the mobile header, or any other element in the layout.
- Scope is exactly 1 file, 1 line changed.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Load any admin page and click a sidebar nav link to switch pages.
  2. The new page content should fade and scale in over ~200 ms. It should feel like the page surface comes forward rather than snapping into place.
  3. In DevTools Animations panel at 10% speed during navigation: confirm `opacity` goes `0 → 1` and `transform` goes `scale(0.97) translateY(4px) → none`. Curve starts steep.
  4. Emulate `prefers-reduced-motion: reduce`: navigation should show only an opacity fade (no scale or Y movement) over 150 ms.
- **Done when**: switching admin pages feels like a soft reveal rather than a hard cut.
