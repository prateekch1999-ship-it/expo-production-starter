# `src/lib` — infrastructure

Cross-cutting infrastructure with side effects: the API client, secure storage, the analytics
adapter, notifications, and similar.

## `lib` vs `utils`

|                                       | `src/lib` | `src/utils` |
| ------------------------------------- | --------- | ----------- |
| Side effects                          | Yes       | Never       |
| Talks to the network, disk, or an SDK | Yes       | Never       |
| Needs mocking in tests                | Usually   | Never       |

If it is a pure function, it belongs in `src/utils`.

## Adapters

Third-party SDKs are wrapped, never called directly from feature code. Analytics is the clearest
case: feature code calls our own interface, and the PostHog implementation sits behind it. The seam
is deliberate — swapping providers must be a one-file change.

The same applies to anything else a buyer might replace: payments, error reporting, storage.

## Removability

Each module in here gets its own `README.md` covering what it does, every configuration option and
environment variable, **how to remove it**, and what it deliberately does not handle.
