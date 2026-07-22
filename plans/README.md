# Animation Plans

Plans produced by `improve-animations` for the Noku PWA. Plans 001–003 were correctional fixes; plans 004–008 are the properly-specified implementations of the five animation opportunities identified by `find-animation-opportunities` (resident app). Plans 009–013 cover the five admin-app opportunities identified in the second `find-animation-opportunities` pass.

## Plans

| # | Title | Severity | Status | File(s) |
|---|---|---|---|---|
| 001 | Fix toast exit easing (ease-in → ease-out) | MEDIUM | DONE | `app/page.tsx` |
| 002 | Add prefers-reduced-motion to all keyframes | MEDIUM | DONE | `app/globals.css` |
| 003 | Raise successPop start scale from 0.5 to 0.7 | LOW | DONE | `app/globals.css` |
| 004 | Screen transitions with @starting-style | MEDIUM | DONE | `app/globals.css`, `app/page.tsx` |
| 005 | PaymentSuccess icon spring entrance + headline stagger | LOW | DONE | `app/globals.css`, `components/payment/PaymentSuccess.tsx` |
| 006 | RegistrationConfirmation entrance (same recipe) | LOW | DONE | `components/auth/RegistrationConfirmation.tsx` |
| 007 | Toast exit animation before unmount | MEDIUM | DONE | `app/globals.css`, `app/page.tsx` |
| 008 | Differentiated button press feedback | MEDIUM | DONE | `app/globals.css`, 8 component files |
| 009 | Admin toast enter/exit animation | MEDIUM | DONE | `app/globals.css`, 4 admin page files |
| 010 | Admin modal panel entry animation | MEDIUM | DONE | 3 modal component files |
| 011 | Admin primary button press feedback | MEDIUM | DONE | 5 admin component files |
| 012 | Admin content area route transition | MEDIUM | DONE | `app/admin/layout.tsx` |
| 013 | Admin mobile sidebar dropdown entry | LOW | DONE | `app/globals.css`, `app/admin/layout.tsx` |

## Recommended execution order

### Resident app (001–008 — all DONE)

Plans 004, 005, 007, and 008 are independent of each other and can execute in parallel (they touch different files). Plan 006 depends on 005.

```
004 ─────────────────────────────── execute independently
005 ──┐
      └─ 006  (006 needs successPop + fadeSlideUp keyframes from 005)
007 ─────────────────────────────── execute independently
008 ─────────────────────────────── execute independently
```

Simplest safe order if running sequentially: **004 → 007 → 008 → 005 → 006**

### Admin app (009–013)

009 must run before 013 (both append to globals.css; 013 appends after 009's block). 010 and 011 are independent. 012 is independent.

```
009 ──┐
      └─ 013  (013 appends CSS after 009's toast-enter block)
010 ─────────────────────────────── execute independently
011 ─────────────────────────────── execute independently
012 ─────────────────────────────── execute independently
```

Simplest safe order if running sequentially: **012 → 011 → 010 → 009 → 013**

## File conflict map (for parallel execution)

| File | Plans that touch it |
|---|---|
| `app/globals.css` | 004, 005, 007, 008, 009, 013 — run sequentially or serialize writes |
| `app/page.tsx` | 004, 007 — run sequentially |
| `app/admin/layout.tsx` | 012, 013 — run sequentially |
| `components/payment/PaymentSuccess.tsx` | 005 |
| `components/auth/RegistrationConfirmation.tsx` | 006 |
| `components/shared/BottomNav.tsx` | 008 |
| 4 admin page files | 009 only |
| 3 modal component files | 010 only |
| 5 admin component files | 011 only |

## Notes on plans 001–003

These plans were written as correctional fixes after an ad-hoc implementation introduced bugs (`ease-in` on exit, missing reduced-motion, oversized start scale). They have been executed and their changes applied. Plans 004–008 supersede and properly implement all five original suggestions from scratch.
