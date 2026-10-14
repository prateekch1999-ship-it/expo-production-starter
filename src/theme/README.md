# `src/theme` — design tokens

Every visual constant in the app. Colors, spacing, typography, radii, shadows, and the light/dark
resolution that sits on top of them.

## Why this exists

A buyer changes their brand by editing this directory and nothing else. That only holds if the rule
below is absolute.

## The rule

**No hardcoded colors, spacing, font sizes, or radii anywhere outside this directory. Not once.**

Layout values that carry no design meaning — `flex: 1`, `alignItems: 'center'`,
`justifyContent: 'space-between'` — are not tokens and stay inline.

## Structure

Tokens are plain objects, not a runtime theming library. They are imported directly and resolved at
module scope, so there is no provider to configure and no performance cost.

> Not yet implemented — the token system lands in Week 2. This README describes the contract it
> will satisfy.
