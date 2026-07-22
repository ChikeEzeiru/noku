# 004 — Screen transitions with @starting-style

- **Status**: TODO
- **Commit**: 6e68a57
- **Severity**: MEDIUM
- **Category**: Preventing a jarring change
- **Estimated scope**: 2 files (`app/globals.css`, `app/page.tsx`), ~15 lines total

## Problem

Every screen change in `app/page.tsx` is an instant swap — the old screen disappears and the new one appears in a single paint with no bridge. With 20+ distinct screens in the state machine, this reads as teleportation rather than navigation.

Current parent structure in `app/page.tsx:192–194`:

```tsx
<div className="w-full max-w-app bg-noku-bg min-h-screen relative overflow-hidden pt-11">
  {screen === "splash" && (
    <SplashScreen onDone={() => setScreen("start")} />
  )}
  {/* …19 more conditional screen blocks… */}
  <StatusBar />
  <HomeIndicator />
```

No transition, no wrapper element, no entering animation on any screen.

## Target

Wrap all screen conditionals (from `{screen === "splash"…}` through the last `{screen === "bank-transfer"…}`) in a single `<div key={screen} className="screen-enter">`. The `key={screen}` causes React to remount this div on every screen change, triggering `@starting-style` on the freshly mounted element. CSS transitions on `.screen-enter` animate from the `@starting-style` values to the settled state.

**Why `@starting-style` over keyframes:** CSS transitions are interruptible — if the user navigates again mid-transition, the old wrapper unmounts and the new one starts fresh from `opacity: 0`. Keyframes restart from zero and cannot retarget.

### globals.css additions (append after the `@keyframes shake` block):

```css
.screen-enter {
  transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
              transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

@starting-style {
  .screen-enter {
    opacity: 0;
    transform: scale(0.97) translateY(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .screen-enter {
    transition: opacity 150ms ease-out;
  }
  @starting-style {
    .screen-enter {
      opacity: 0;
      transform: none;
    }
  }
}
```

### page.tsx wrapper (around screen conditionals only — not StatusBar/HomeIndicator/Toast):

```tsx
<div key={screen} className="screen-enter">
  {screen === "splash" && (
    <SplashScreen onDone={() => setScreen("start")} />
  )}
  {/* …all other screen conditionals… */}
  {screen === "bank-transfer" && (
    <BankTransfer
      onBack={() => setScreen("add-payment-method")}
      onConfirm={() => setScreen(addMethodReturn)}
    />
  )}
</div>
```

## Repo conventions to follow

- No animation libraries installed; plain CSS in `app/globals.css` is the convention.
- Easing token used by AUDIT.md as the canonical strong ease-out: `cubic-bezier(0.23, 1, 0.32, 1)`.
- `@starting-style` is supported in Chrome 117+, Firefox 129+, Safari 17.5+ — acceptable for this PWA's target browsers.
- Tailwind v4 CSS-first config: do NOT create `tailwind.config.ts`. Add plain CSS to `app/globals.css`.

## Steps

1. **`app/globals.css`** — after the closing `}` of `@keyframes shake` (currently at line 79), append the `.screen-enter` block, `@starting-style`, and `@media (prefers-reduced-motion)` exactly as shown in the Target section above.

2. **`app/page.tsx`** — find the first screen conditional (currently line 193):
   ```tsx
         {screen === "splash" && (
   ```
   Insert `<div key={screen} className="screen-enter">` on the line immediately before it, so it reads:
   ```tsx
         <div key={screen} className="screen-enter">
         {screen === "splash" && (
   ```

3. **`app/page.tsx`** — find the `<StatusBar />` line. The line before it is the last screen conditional closing brace. Insert `</div>` between the last screen block and `<StatusBar />`:
   ```tsx
         )}
   
         </div>
   
         <StatusBar />
   ```

4. Do not move `<StatusBar />`, `<HomeIndicator />`, or the toast `{showIssueToast && …}` block inside the wrapper — they must stay outside it.

## Boundaries

- Do NOT touch any individual screen component files.
- Do NOT add animation to `<StatusBar />`, `<HomeIndicator />`, or the toast.
- Do NOT use `@keyframes` for this feature — the `@starting-style` + CSS transition approach is intentional.
- Do NOT add a second wrapper or change the parent `<div className="w-full max-w-app…">` element.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Navigate between Home, Fund, Payments, Updates, Profile via the bottom nav. Each tab switch should fade + very slightly scale up (barely perceptible scale, clear fade).
  2. In DevTools Animations panel at 10% speed: confirm the transition fires on the `.screen-enter` div, shows both `opacity` and `transform` properties animating, and uses a deceleration curve (steep start, flat end).
  3. Tap tabs rapidly: the previous transition should cancel instantly as the new screen mounts — no ghost of the old animation lingering.
  4. Emulate `prefers-reduced-motion: reduce` in DevTools Rendering panel: transitions should be opacity-only (no scale or Y movement) at 150ms.
  5. `@starting-style` check: open DevTools Elements panel, switch screens, and watch the `.screen-enter` div get remounted — it should start at `opacity: 0; transform: scale(0.97) translateY(4px)` for one paint, then transition to settled.
- **Done when**: every screen change has a visible but snappy fade-in entrance that feels like forward navigation, with no flash of unstyled content between screens.
