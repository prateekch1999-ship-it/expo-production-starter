# `src/utils` — pure functions

Formatting, parsing, validation helpers, and small pure transforms.

## Rules

- **Pure only.** No network, no disk, no SDK calls, no `Date.now()` captured at module scope, no
  React.
- **No imports from `src/features`.** Utils sit at the bottom of the dependency graph; nothing here
  should know a feature exists.
- Every function is independently testable with no mocks. If a helper needs a mock to test, it is
  infrastructure and belongs in `src/lib`.
