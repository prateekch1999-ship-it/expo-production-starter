# CLAUDE.md

## What this repo is

A **commercial** React Native starter kit built with Expo, sold to other developers.

This is not an app. It is a product whose customers are senior engineers who will read every file. Code quality *is* the product. A clever shortcut that works is worse than a plain implementation that reads clearly, because a buyer who opens a file and doesn't immediately understand it asks for a refund.

Two tiers ship from this codebase:

- **Free tier** — public, MIT. Proves quality, acts as the funnel.
- **Paid tier** — private, $199. Everything that takes a competent developer more than a day to get right.

The free/paid boundary is defined in `TIERS.md` and is **load-bearing**. Never move a module across it without asking.

---

## Working protocol

**Non-negotiable. Follow this on every task.**

### 1. Discovery before code

Never write code in the same turn as your first look at a problem. Investigate, then report findings with **file paths and line numbers** for every claim. "The auth flow does X" is not acceptable; "`src/features/auth/api/client.ts:42` sets the header" is.

### 2. Verify versions — never recall them

Your training data is stale. Before adding or configuring any dependency:

- Check the actual installed version in `package.json` / lockfile.
- For anything new, check the registry for the current version and read the real docs.
- Expo SDK APIs change between releases. Assume nothing about `expo-notifications`, `expo-router`, `expo-secure-store`, or EAS config shape without confirming against current docs.

If you cannot verify something, say so explicitly. Do not fill the gap with a plausible guess.

### 3. Plan, then STOP

After discovery, present a plan: what you'll change, which files, in what order, and what could break.

**Then stop and wait for approval.** Do not begin implementation in the same turn. This applies to every task, including ones that look trivial.

### 4. Implement in reviewable slices

One coherent unit per turn. Not eight files at once. After each slice, state what changed and what's next — then stop again if the next slice involves a decision.

### 5. Flag decisions, don't make them

When you hit a fork with real trade-offs — a library choice, a data-shape decision, an API surface — present the options with trade-offs and stop. Do not pick and proceed.

### 6. No assumptions

Missing detail → ask a precise technical question. Never invent a requirement, an env var name, a backend contract, or an error shape.

---

## Locked decisions

Do not revisit these. Do not suggest alternatives unless a hard technical blocker is found — and then, raise it as a blocker and stop, don't route around it.

| Area | Decision |
|---|---|
| Framework | Expo, latest stable SDK |
| Ejectability | `expo prebuild` must keep working at all times |
| Router | Expo Router, file-based, typed routes |
| Language | TypeScript, `strict: true`. No `any`. No `@ts-ignore`. |
| Server state | TanStack Query |
| Client state | Zustand |
| Forms | react-hook-form + Zod |
| UI | **Own token-based primitives.** Not RN Paper, not NativeWind, not any external UI kit. |
| Styling | `StyleSheet.create` + token objects |
| Payments | RevenueCat |
| Errors | Sentry |
| Analytics | PostHog **behind a provider-agnostic adapter** — never call the PostHog SDK directly from feature code |

**On the UI layer:** the design system is the product's main differentiator. Never introduce an external component library "to save time." If a primitive is missing, build it.

**On the analytics adapter:** every analytics call goes through our own interface. The seam is deliberate — a future product depends on it.

---

## Architecture

### Feature-first

```
src/
  app/            # Expo Router routes only — thin, no logic
  features/       # self-contained: <feature>/{api,components,hooks,store,types}
  components/     # shared primitives (design system)
  theme/          # tokens: colors, spacing, typography, radii, shadows
  lib/            # api client, storage, analytics adapter, notifications
  utils/          # pure functions only
```

**Rules:**

- Routes in `app/` are thin. They compose feature components; they hold no business logic.
- Features do not import from other features. Shared code moves to `components/`, `lib/`, or `utils/`.
- No hardcoded colors, spacing, font sizes, or radii anywhere outside `theme/`. Not once. This is the most common review failure — check for it before saying a slice is done.
- `utils/` is pure functions. No side effects, no imports from `features/`.

### Every module must be removable

A buyer who doesn't want push notifications must be able to delete it in under 10 minutes. Modules are self-contained and documented with a "how to remove this" section. When adding a module, verify nothing outside it imports its internals.

---

## Code standards

- Functional components with hooks. No class components.
- Named exports. Default exports only where Expo Router requires them.
- Meaningful names. `handleRefreshTokenExpiry`, not `handleErr`.
- `useCallback` / `useMemo` / `memo` where there's a measurable reason — list rows, context values, expensive derivations. Not sprayed everywhere.
- Every async surface handles **loading, error, empty, and success**. All four. A screen missing an empty state is not done.
- Errors are typed and surfaced, never swallowed. No bare `catch {}`.
- Comments explain *why*, not *what*. If a line needs a comment to explain what it does, rewrite the line.
- No commented-out code. No `console.log` in committed code.

---

## Documentation is a deliverable

Docs ship with the code, not after. Every module needs:

1. What it does
2. How to configure it (every env var, every option)
3. **How to remove it**
4. What it deliberately doesn't handle, and where to extend

Refunds come from confusion, not from bugs. A module without docs is not finished.

---

## Anti-patterns — do not do these

- Installing a dependency to avoid writing 40 lines
- `any`, `@ts-ignore`, or non-null `!` to silence the compiler
- Hardcoded values that belong in `theme/`
- Business logic inside route files
- Cross-feature imports
- Direct SDK calls where an adapter exists
- Writing code before a plan is approved
- Claiming something works without having verified it

---

## Scope control

Ideas outside the current task go in `v2-ideas.md`. Do not build them. Do not build "while I'm in here" improvements. Scope creep is the most likely way this project fails.
