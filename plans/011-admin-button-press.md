# 011 — Admin primary button press feedback

- **Status**: TODO
- **Commit**: 33ea7a3
- **Severity**: MEDIUM
- **Category**: Feedback
- **Estimated scope**: 5 component files, ~5 className edits (no globals.css edit needed)

## Problem

Admin primary CTA buttons (dark `bg-[#2b2b22]`) and skeuomorphic secondary buttons (white + three-layer inset shadow) have no `:active` press feedback. The `btn-press-cta` and `btn-press-nav` utilities were implemented in Plan 008 (globals.css lines 134–152) and are used throughout the resident app, but no admin component uses them.

Confirmed locations missing press feedback:

**Dark CTA buttons (`btn-press-cta` needed)**:

`components/admin/fuel/LogExpenseModal.tsx:466`:
```tsx
className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
```

`components/admin/payments/LogExternalCollectionModal.tsx:437`:
```tsx
className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
```

`components/admin/payments/SendReminderModal.tsx:119` (inside a const string):
```tsx
className: "flex items-center gap-2 bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10",
```

`components/admin/announcements/CreateAnnouncementModal.tsx:357`:
```tsx
className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
```

**Skeuomorphic secondary buttons (`btn-press-nav` needed)**:

`components/admin/dashboard/GeneratorCard.tsx:57`:
```tsx
className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739]"
```

`components/admin/dashboard/GeneratorCard.tsx:60`:
```tsx
className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739]"
```

## Target

Existing utilities from `app/globals.css` (Plan 008, already implemented — no CSS changes needed):

```css
@utility btn-press-nav {
  transition-property: transform;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  &:not(:disabled):active { transform: scale(0.96); }
  @media (prefers-reduced-motion: reduce) {
    &:not(:disabled):active { transform: none; }
  }
}

@utility btn-press-cta {
  transition-property: transform;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  &:not(:disabled):active { transform: scale(0.98); }
  @media (prefers-reduced-motion: reduce) {
    &:not(:disabled):active { transform: none; }
  }
}
```

Add `btn-press-cta` to all 4 dark CTA buttons. Add `btn-press-nav` to both skeuomorphic secondary buttons.

Additionally: grep the admin codebase for any remaining `bg-\[#2b2b22\]` buttons not listed above, and for `inset 0px -2px 0px 0px rgba(0,0,0,0.05)` style strings (the skeuomorphic shadow signature) — apply the same classes to any found.

## Repo conventions to follow

- `btn-press-cta` is used on dark full-width CTAs in the resident app (e.g. `components/payment/PaymentSuccess.tsx`). Same class, same button color.
- `btn-press-nav` is used on white inset-shadow navigation buttons in the resident app.
- Never add `btn-press-*` to `<a>` tags, icon-only buttons, or disabled-only buttons.

## Steps

1. **`components/admin/fuel/LogExpenseModal.tsx:466`** — append `btn-press-cta` to the className:
   ```tsx
   className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed btn-press-cta"
   ```

2. **`components/admin/payments/LogExternalCollectionModal.tsx:437`** — same append:
   ```tsx
   className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed btn-press-cta"
   ```

3. **`components/admin/payments/SendReminderModal.tsx:119`** — this is inside a `className:` string inside a const. Append `btn-press-cta`:
   ```tsx
   className: "flex items-center gap-2 bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 btn-press-cta",
   ```

4. **`components/admin/announcements/CreateAnnouncementModal.tsx:357`** — same append:
   ```tsx
   className="bg-[#2b2b22] rounded-[8px] px-4 py-2.5 text-base font-semibold text-white border-2 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed btn-press-cta"
   ```

5. **`components/admin/dashboard/GeneratorCard.tsx:57`** — append `btn-press-nav`:
   ```tsx
   className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739] btn-press-nav"
   ```

6. **`components/admin/dashboard/GeneratorCard.tsx:60`** — same append:
   ```tsx
   className="flex-1 bg-white rounded-[8px] px-[14px] py-[10px] text-sm font-semibold text-[#474739] btn-press-nav"
   ```

7. **Sweep**: grep `-rn "bg-\[#2b2b22\]"` and `-rn "inset 0px -2px 0px 0px rgba(0,0,0,0.05)"` across `components/admin/` and `app/admin/`. Apply `btn-press-cta` or `btn-press-nav` to any remaining buttons not captured above.

## Boundaries

- Do NOT touch `app/globals.css` — utilities already exist.
- Do NOT add `btn-press-*` to links (`<a>`, `<Link>`), icon-only buttons, or text-only "See More" / "Cancel" buttons.
- Do NOT add `btn-press-*` to form inputs, selects, or checkboxes.
- Do NOT change any other className on the target buttons.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Open any admin modal and click the confirm/submit button — it should spring in slightly (scale 0.98) on press and snap back on release in ~100 ms.
  2. Hold the button down for 500 ms — the pressed scale should hold. Release — snap back immediately.
  3. On GeneratorCard, click "Override ON" or "Override OFF" — scale 0.96 on press, snap back on release.
  4. Disabled buttons (e.g. submit when required fields are empty) should show NO press effect.
  5. Emulate `prefers-reduced-motion: reduce` — buttons should press with no transform (no movement at all, even on active).
- **Done when**: every modal submit button gives tactile press feedback consistent with the resident payment flow buttons.
