# Tiers

This file defines the boundary between the free and paid tiers. The boundary is load-bearing —
architecture decisions depend on it. Nothing moves across it casually.

**The rule:** the free tier proves quality. The paid tier saves time. Anything that takes a
competent developer more than a day to get right belongs in paid.

---

## Free — public, MIT

Someone can ship a small app on the free tier alone. That is deliberate, not an oversight.

- Expo + TypeScript strict configuration, path aliases
- Expo Router structure with typed routes — tabs, stack, and modal patterns
- Feature-first folder architecture, documented and justified
- Design token system — color, spacing, typography, radii, shadows, light/dark
- Core primitives — Button, Text, Input, Card, ListItem, Skeleton, EmptyState
- ESLint + Prettier + TypeScript + husky pre-commit
- Basic API client with interceptor scaffolding
- Documentation that reads like real documentation

## Paid — private repo, collaborator access on purchase

| Module            | What's in it                                                                                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth**          | sessionID + access/refresh token flow, single-device enforcement, silent refresh with request queueing, secure storage, biometric unlock, full screen set (login / register / OTP / forgot / reset) |
| **Offline**       | TanStack Query persistence, mutation queue with retry and conflict handling, network state UI, optimistic updates                                                                                   |
| **Push**          | Expo Notifications end-to-end, token registration and rotation, deep-link routing from notification payload, foreground/background/killed handling, permission priming UX                           |
| **CI/CD**         | EAS Build + Submit profiles (dev / preview / prod), EAS Update channels, GitHub Actions, version and build-number automation                                                                        |
| **Payments**      | RevenueCat integration, paywall screen, entitlement gating hook, restore purchases                                                                                                                  |
| **Observability** | Sentry with source maps and release tracking; PostHog behind a provider-agnostic adapter                                                                                                            |
| **Forms**         | Config-driven form engine (react-hook-form + Zod), field registry, validation patterns                                                                                                              |
| **Hardening**     | Error boundaries, crash-safe root, deep linking, app-state handling, i18n scaffold, permissions helpers                                                                                             |

---

## Pricing

| Item                              |                                                                |
| --------------------------------- | -------------------------------------------------------------- |
| Solo licence                      | $199                                                           |
| Team licence (up to 5 developers) | $499                                                           |
| Delivery                          | Private GitHub repo, automatic collaborator invite on purchase |
| Updates                           | Lifetime, via `git pull`                                       |
| Refunds                           | 14 days, no questions asked                                    |
| Support                           | GitHub Issues only. Best effort, 48 hours. No calls.           |

## The update commitment

Each new Expo SDK is supported within **two weeks** of its release.

This is a real obligation and it is stated deliberately. Most starter kits are abandoned inside a
year; this one is not going to be. Expo's recent cadence has been roughly quarterly — SDK 55 in
February 2026, 56 in May, 57 in June — so this is a standing commitment, not an occasional one.

## Where the boundary can move

It can't, without a deliberate decision. If a free-tier module starts doing paid-tier work, that is
a bug in the boundary and gets fixed by moving code back — not by quietly expanding the free tier.

Watch the reverse too: if people are shipping real production apps on the free tier without buying,
a paid module has leaked into it.
