# `src/app` — routes

Expo Router owns this directory. Every file here is a route or a layout — nothing else.

## Rules

- **Routes are thin.** A route file composes feature components and renders them. It holds no
  business logic, no data fetching, no validation.
- **No test files here.** Expo Router treats every file in this directory as a route. Put tests in
  `__tests__/` or next to the code they cover, outside `src/app`.
- **No shared components here.** They belong in `src/components` (design system) or
  `src/features/<feature>/components` (feature-specific).

## What a route may contain

Screen options, a layout wrapper, and a single feature component. If a route file grows past that,
the logic belongs in a feature.

```tsx
export default function ProfileScreen() {
  return <ProfileView />;
}
```

## Conventions

- Default exports only — Expo Router requires them. Everywhere else in the codebase uses named
  exports.
- Every screen is declared in its parent layout's `<Stack.Screen>` / `<Tabs.Screen>`. Not strictly
  required in SDK 57, but `expo-router@58` only renders declared screens.
- Typed routes are enabled. `href` values are checked at compile time; run `npm run typecheck` to
  catch a broken link before it ships.
