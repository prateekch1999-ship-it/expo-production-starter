# `src/features` — feature modules

One directory per feature. Each is self-contained and removable.

```
features/
  <feature>/
    api/         server calls, TanStack Query hooks
    components/  UI used only by this feature
    hooks/       feature-specific hooks
    store/       Zustand slices
    types/       types and Zod schemas
```

Not every feature needs all five. Create what the feature actually uses.

## The one rule that matters

**Features never import from other features.** If two features need the same thing, it moves:

| Shared thing                 | Where it goes    |
| ---------------------------- | ---------------- |
| UI primitive                 | `src/components` |
| API client, storage, adapter | `src/lib`        |
| Pure function                | `src/utils`      |
| Design token                 | `src/theme`      |

A cross-feature import is the first step toward a codebase where nothing can be deleted. When you
feel the urge, that is the signal to promote the shared code, not to reach sideways.

## Removability

A buyer must be able to delete a feature directory and have the app still build. That means:

- Nothing outside the feature imports its internals.
- Its routes in `src/app` are deleted alongside it.
- Anything it registered (a store slice, a query key, a deep link) is documented in the feature's
  own `README.md` under **How to remove this**.
