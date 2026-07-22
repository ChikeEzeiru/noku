# 006 — RegistrationConfirmation icon entrance with headline stagger

- **Status**: TODO
- **Commit**: 6e68a57
- **Severity**: LOW (delight — rare, first-time screen)
- **Category**: Delight / preventing a jarring change
- **Estimated scope**: 1 file (`components/auth/RegistrationConfirmation.tsx`), ~2 lines changed
- **Depends on**: Plan 005 must run first (it adds the `successPop` and `fadeSlideUp` keyframes to globals.css)

## Problem

The Registration Confirmation screen is the first-run completion moment — the user has just finished setting up their account. The Noku logo illustration and "You're all set" heading render instantly with no entrance. This screen shares the same delight tier as the Payment Success screen and deserves the same treatment.

Current state in `components/auth/RegistrationConfirmation.tsx:49–62`:

```tsx
<div className="flex items-center justify-center">
  <Image
    src="/Images/Noku Logo Vector.svg"
    alt=""
    width={200}
    height={200}
    className="w-50 h-50 object-contain"
  />
</div>

{/* Content */}
<div className="flex flex-col gap-8">
  <div className="flex flex-col gap-2">
    <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
      You&apos;re all set,{" "}
```

No animation on the illustration wrapper or the headline.

## Target

Apply the same `successPop` spring entrance to the illustration wrapper div, and `fadeSlideUp` stagger to the headline — identical recipe to Plan 005, with a 100ms delay on the illustration and 160ms on the headline.

The keyframes (`successPop`, `fadeSlideUp`) and their reduced-motion overrides are defined in Plan 005's globals.css changes. **This plan assumes Plan 005 has already run.** If those keyframes are missing, add them from Plan 005's Step 1 first, then continue here.

### Illustration wrapper — add animation class:

```tsx
<div className="flex items-center justify-center animate-[successPop_300ms_cubic-bezier(0.34,1.56,0.64,1)_100ms_both]">
```

### Headline — add animation class:

```tsx
<p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px] animate-[fadeSlideUp_200ms_cubic-bezier(0.23,1,0.32,1)_160ms_both]">
  You&apos;re all set,{" "}
```

## Repo conventions to follow

- Exactly as Plan 005: Tailwind arbitrary-value animate classes, keyframes in globals.css.
- Exemplar: `components/payment/PaymentSuccess.tsx` after Plan 005 runs — the pattern is identical.

## Steps

1. Confirm `@keyframes successPop` and `@keyframes fadeSlideUp` exist in `app/globals.css`. If they do not, add them from Plan 005 Step 1 before continuing. If they do exist, proceed.

2. **`components/auth/RegistrationConfirmation.tsx:49`** — find the illustration wrapper div:
   ```tsx
   <div className="flex items-center justify-center">
   ```
   Replace with:
   ```tsx
   <div className="flex items-center justify-center animate-[successPop_300ms_cubic-bezier(0.34,1.56,0.64,1)_100ms_both]">
   ```

3. **`components/auth/RegistrationConfirmation.tsx:62`** — find the headline paragraph:
   ```tsx
               <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px]">
   ```
   Replace with:
   ```tsx
               <p className="text-[24px] font-semibold text-noku-heading leading-8 tracking-[-0.48px] animate-[fadeSlideUp_200ms_cubic-bezier(0.23,1,0.32,1)_160ms_both]">
   ```

## Boundaries

- Do NOT touch `app/globals.css` if the keyframes already exist from Plan 005.
- Do NOT touch any other files.
- Do NOT change the `<Image>` component, its props, or the `<span>` inside the headline.

## Verification

- **Mechanical**: `npx tsc --noEmit` — expect no output.
- **Feel check**:
  1. Navigate through the registration flow: invite code → confirm unit → create account → setup household → registration confirmation.
  2. On reaching the confirmation screen, the Noku logo should pop in with a spring, followed by the "You're all set" heading fading up.
  3. The motion should feel identical to the Payment Success check icon — same spring character, same stagger timing.
  4. Emulate `prefers-reduced-motion: reduce`: both should fade in only (opacity, no scale or Y movement).
- **Done when**: the registration confirmation screen has the same delight entrance as the payment success screen, making the two high-emotion moments feel visually consistent.
