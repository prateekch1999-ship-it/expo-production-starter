# `src/components` — design system primitives

The shared component library. This is the product's main differentiator, so it is deliberately
ours: no React Native Paper, no NativeWind, no external UI kit.

## What belongs here

Primitives that are generic across features — `Button`, `Text`, `Input`, `Card`, `ListItem`,
`Skeleton`, `EmptyState`. If a component knows about a domain concept ("InvoiceRow"), it belongs in
that feature instead.

## Rules

- **Tokens only.** No hardcoded colors, spacing, font sizes, radii, or shadows. Every value comes
  from `src/theme`. This is the most common review failure — check it before calling a component
  done.
- **Styling is `StyleSheet.create` + token objects.** Zero runtime styling dependencies.
- Named exports. Functional components only.
- Each primitive handles its own disabled, loading, and pressed states where they apply.

## Adding a primitive

If a primitive is missing, build it. Installing a component library to save an afternoon defeats
the point of the kit.
