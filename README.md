# PrateekKit Starter

A production React Native starter kit built on Expo. TypeScript strict, file-based routing, a
token-based design system, and a feature-first architecture that stays readable as the app grows.

> **Status: in active development.** This repo is being built in the open over 10 weeks. What is
> listed under **What's here now** works and is verified. Everything else is on the roadmap and not
> yet written. Nothing below describes code that does not exist.

## What's here now

- Expo SDK 57 with TypeScript `strict: true` and zero `any`
- Expo Router with typed routes — tabs, stack, modal, dynamic route, and a 404 screen
- Path aliases (`@/*`) working across Metro, TypeScript, and Jest from a single `tsconfig.json`
- ESLint (flat config) + Prettier + a pre-commit hook via husky and lint-staged
- Feature-first folder architecture, documented per directory

## Roadmap

Design token system and core primitives · auth with refresh-token queueing · offline-first
mutations · push notifications · EAS CI/CD · payments · observability · a config-driven form engine.

The free/paid split is defined in [TIERS.md](./TIERS.md).

## Requirements

|              | Version                                                                           |
| ------------ | --------------------------------------------------------------------------------- |
| Node         | `^20.19.4 \|\| ^22.13.0 \|\| ^24.3.0 \|\| >= 25.0.0` (from `react-native@0.86.3`) |
| Expo SDK     | 57                                                                                |
| React Native | 0.86.3                                                                            |
| React        | 19.2.3                                                                            |
| TypeScript   | 6.0.x                                                                             |

Xcode for iOS, Android Studio for Android. Neither is needed to run in Expo Go.

## Quick start

```bash
npm install
npm start        # then press i for iOS, a for Android
```

## Scripts

| Script                            | What it does                                             |
| --------------------------------- | -------------------------------------------------------- |
| `npm start`                       | Start the dev server                                     |
| `npm run ios` / `npm run android` | Start and open a simulator/emulator                      |
| `npm run typecheck`               | `tsc --noEmit` — also validates every typed route `href` |
| `npm run lint`                    | ESLint via `expo lint`                                   |
| `npm run format`                  | Prettier write                                           |
| `npm run format:check`            | Prettier check — use this in CI                          |

## Project structure

```
src/
  app/          Expo Router routes only — thin, no logic
  features/     self-contained feature modules
  components/   shared design system primitives
  theme/        design tokens
  lib/          API client, storage, adapters
  utils/        pure functions
```

Each directory has its own `README.md` explaining what belongs there and what does not. Read those
before adding code — the architecture rules are enforced in review.

## Notes on the setup

**No web target.** `react-native-web` and the web output are removed. Every primitive has one
implementation, not two.

**React Compiler is on** (`experiments.reactCompiler`). Memoize only where there is a measurable
reason; the compiler handles the rest. Components must follow the rules of React strictly.

**Classic JS tabs, not `NativeTabs`.** `NativeTabs` is still `unstable_`-prefixed and cannot be
restyled with the token system. Tabs are imported from `expo-router/tabs`, not from the package
root — `Tabs` is not exported at the root in SDK 57.

**`expo prebuild` keeps working.** No patch that breaks ejection is accepted. `ios/` and `android/`
stay out of version control.

## License

Free tier: [MIT](./LICENSE).
