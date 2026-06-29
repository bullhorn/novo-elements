# Modern Theme — Component Migration (Track 2)

Make every novo-elements component render correctly under `[data-theme="modern"]` by consuming
the theme's CSS-var contract — no hardcoded/compile-time values for themeable properties. The
**Tier-3 component spec** (`novo-design-tokens/src/tokens/modern/components.figma-export.json`)
defines each component's target values.

## The recipe (per component)

1. Read the component's Tier-3 spec → target values for color / bg / border / radius / spacing /
   typography / states / focus-ring.
2. Replace hardcoded/SCSS values with `var(--token, <exact-current-value>)`. **The fallback is the
   current classic value, so classic is preserved by construction.**
3. Prefer the existing **semantic vars** (`--background-*`, `--text-*`, `--spacing-*`,
   `--font-size-*`) — the modern theme already overrides them. Add curated
   **`--novo-<component>-<part>`** vars only for component-specific values with no semantic
   equivalent (radius, component bg/border states, focus-rings).
4. Set the modern values for any new `--novo-*` vars in `styles/themes/modern.scss`.
5. Use the live helpers (`elevate`/`recede`/`darkenLive`) for derived hover/active states.
6. **Verify in the demo** (`npm start`, toggle the modern switch): classic visually identical,
   modern matches the Tier-3 spec.

> Note: themed component variants that set their own background (e.g. `button[theme="primary"]`)
> override the base — migrate the base first; handle variants as follow-ups.

## Checklist

### Wave 1 — foundational (record-page surfaces)
- [x] **button** (base) — `--novo-button-*` vars; bg/border/radius/padding/typography. _Follow-ups: focus-ring (blocked on Tier-3 focus tokens), hover/disabled states, size variants, themed variants._
- [ ] form / input
- [ ] card (CardContent / CardHeader)
- [ ] toolbar / header
- [ ] tabs
- [ ] badge / chip

### Wave 2
- [ ] navigation
- [ ] select / dropdown
- [ ] modal
- [ ] tooltip
- [ ] data-table
- [ ] date-picker

### Wave 3
- [ ] the long tail (track as picked up)

## Known blockers (from the Figma export)
- Tier-3 references 7 tokens absent from the current export: `color/brand/secondary/*`,
  `color/transparency/white-*`, `color/border/disabled`, `button` focus background. Components
  depending on these (input states, frosted card/header, focus-rings) need an updated export.
- Status/entity colors (`--color-positive`, etc.) are deferred (design sign-off pending).
