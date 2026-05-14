# Storybook integration plan — novo-elements

Consolidated plan for integrating Storybook into novo-elements. Tracks
decisions, conventions, and phased rollout.

Branch where the work started: `f/storybook-test`.

## Decisions captured

| Question | Answer |
|---|---|
| Is Storybook worth adding given novo-examples already exists? | Yes — for interactive controls, a11y panel, visual-regression hook. Long-term, fold examples into Storybook. |
| Pick Chromatic vs Playwright vs Loki for visual regression now? | **Defer.** Author stories with `play` functions so any tool fits later. |
| Migrate WDIO → Playwright? | Eventual, separate project. If/when that lands, Playwright + Storybook test-runner becomes the natural choice for VR. |
| MDX or autodocs for the Docs surface? | **Autodocs.** MDX buried examples below long-form prose. Use MDX only when stories alone genuinely can't carry the doc. |
| Compodoc on or off? | **On** — it's what populates the props table. |

---

## Phase 1 — Setup ✅ done

What landed:

- Storybook 10.3.6 init against `novo-elements` library project.
- `package.json`: `storybook` + `build-storybook` scripts; 9 Storybook devDeps; `@angular/*` bumped from `^20.3.18` → `^20.3.19` (peer-dep alignment).
- `angular.json`: `storybook` + `build-storybook` builder targets on `novo-elements`. `browserTarget: demo:build` (needed by start-storybook). Overrides for `assets: []` (demo's asset paths choke the legacy webpack builder).
- `projects/novo-elements/.storybook/main.ts`:
  - Addons: `a11y`, `docs`, `onboarding`.
  - `previewHead` injects the Bullhorn glyphicons + Montserrat CDN links (replicating demo's `index.html`).
  - `staticDirs` maps `projects/demo/assets` → `/assets` so design images are reusable.
  - `webpackFinal`:
    - Explicit subpath aliases for `novo-elements/{addons,elements,pipes,services,utils}` — works around the library's narrow `exports` field that blocks webpack subpath resolution.
    - `stats: 'errors-warnings'` with full error details so failures aren't silently swallowed.
- `projects/novo-elements/.storybook/preview.ts`:
  - `provideAnimations()` via `applicationConfig` decorator.
  - `docs.codePanel: true` — enables the bottom-dock Code panel for every story in Canvas mode.
- `projects/novo-elements/.storybook/tsconfig.json`: extends root `tsconfig.json` (not `tsconfig.build.json`, which points at `dist/`). Includes demo's polyfills so the ngtools webpack loader compiles it.
- 4 trailing commas stripped from `angular.json` (Angular tolerates them, Storybook doesn't).

Verified: both `npm run storybook` (dev server) and `npm run build-storybook` (static site → `dist/storybook/novo-elements`) succeed.

---

## Phase 2 — Conventions ✅ done

Reference component: **Button**, at `projects/novo-elements/src/elements/button/button.stories.ts`.

### Conventions established

**File location.** Co-locate `<component>.stories.ts` next to component source in `projects/novo-elements/src/elements/<component>/`. The glob in `main.ts` (`../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`) picks it up — no per-component config.

**Module wiring.** Use `moduleMetadata({ imports: [<Component>Module] })` — most novo-elements components are non-standalone.

**Rendering.** Use `template` (not args-only) for any component that uses `<ng-content>` projection — which is most of them.

**Story order** (per component, what's applicable):

1. **UsageGuide** — design / when-to-use guidance. Include for every Tier 1+ component; pull existing content from `projects/novo-examples/src/.../<component>-design.md` when available, generate otherwise. Carries `name: '📖 Usage Guide'` and `tags: ['!autodocs']`.
2. **Default** — the simplest interactive case; becomes the autodocs Primary story. Bind every input in the template so every control mutates the render.
3. **Variants** — theme/color matrix.
4. **Sizes** — size matrix.
5. **States** — disabled / loading / error.
6. **WithIcons** — icon-bearing.
7. **Specialized variants** — one story per logical mode (TwoIcons, IconOnly, Fab, etc.).
8. **Playground** *(last)* — every input bound, every control wired, full kitchen sink. Carries `name: '🎮 Playground'`.

**Controls matching.** Match visible controls to template bindings:

- Template binds every arg → no override.
- Template binds a subset → `parameters.controls.include: [...]`.
- Fixed matrix with hardcoded values → `parameters.controls.disable: true`.

**Docs surface.** `tags: ['autodocs']` on the meta. Keep `parameters.docs.description.component` short — stories carry the docs weight. JSDoc on each exported `Story` constant becomes its caption.

**Story display names.** Stories that aren't real component variants get an emoji prefix to differentiate in the sidebar:

- 📖 Usage Guide
- 🎮 Playground

**Docs-only stories.** Stories rendering narrative content (UsageGuide) carry `tags: ['!autodocs']` so they don't compete for the autodocs Primary slot or pollute the Stories list with empty frames. Sidebar entry remains.

**Image assets.** Reuse the existing design images from `projects/demo/assets/images/` via the `staticDirs` mapping. Reference as `/assets/images/<file>` (absolute path).

**Sidebar categories.** Two top-level categories so far:

- `Elements/<Component>` — visual / presentational components (Button, Icon, Avatar, Divider, Loading, Progress).
- `Form Controls/<Component>` — anything backed by `ngModel` / a `ControlValueAccessor` (Checkbox, Radio, Switch, Chips). Form controls will dominate Tier 2; expect this category to grow.

**Sidebar ordering.** Categories and components are sorted alphabetically by `title` via a `storySort` comparator in [.storybook/preview.ts](projects/novo-elements/.storybook/preview.ts); within a component, story order is preserved from the file's export order (so the curated UsageGuide → Default → … → Playground sequence stays intact).

**Typography size handling.** `TypographySize` (11 values incl. legacy `small`/`medium`/`large` aliases) applies *only* when a component's `size` input is declared with that exact type. Many components have their own size scale (Button: `sm`/`lg`; Avatar: `small`/`medium`/`large`; Loading/Spinner: `small`/`medium`/`large`). Only widen to 11 values + deprecation note when the source actually uses `TypographySize`.

**Typing stories that exercise a non-meta class.** When a story drives a *different* class than the meta's `component` (a sibling directive, an injected helper component, etc.), widen the local type:

```ts
export const Skeleton: StoryObj<NovoLoadingElement & { isLoading: boolean }> = { … };
```

This is required because Storybook's auto-derived `argTypes` lock to the meta component's inputs.

**Form control two-way binding.** Stories for `ngModel`-bound controls (checkbox, radio, switch, etc.) need `FormsModule` in `moduleMetadata.imports` and a story-local arg the template binds with `[(ngModel)]="..."`. For Tier 2 this should be promoted to a shared decorator in `.storybook/preview.ts` rather than repeated per story.

**Composing modules in story imports.** A component's NgModule typically imports its dependencies (`NovoIconModule`, etc.) for its *own* templates but doesn't necessarily re-export them. If a story's template uses a peer component directly (e.g. `<novo-icon>` inside a `<novo-chip>` story), you must explicitly import that peer's module in `moduleMetadata.imports` alongside the primary one. Symptom when missed: the peer element renders as a bare custom element with its inner text leaking through (no Angular component lifecycle, no styling).

### Sidebar order for Button (reference)

📖 Usage Guide → Default → Themes → Sizes → States → WithIcons → TwoIcons → IconOnly → Fab → 🎮 Playground

---

## Phase 3 — Tier 1 component coverage ✅ done

All 9 Tier 1 components have stories on `f/storybook-test`:

| Component | Title | Stories |
|---|---|---|
| icon | Elements/Icon | UsageGuide, Default, Entities, Sizes, Colors, Raised, Playground |
| checkbox | Form Controls/Checkbox | UsageGuide, Default, States, Indeterminate, ProjectedLabel, CheckList, Playground |
| radio | Form Controls/Radio | UsageGuide, Default, Vertical, ButtonStyle, WithIcons, Disabled, Playground |
| switch | Form Controls/Switch | UsageGuide, Default, Themes, States, WithLabel, CustomIcons, Playground |
| chips | Form Controls/Chips | UsageGuide, Default, Colors, Sizes, WithRemove, WithAvatar, Disabled, Formatted, Playground |
| avatar | Elements/Avatar | UsageGuide, Default, Sizes, Shapes, WithInitials, WithImage, Colors, Stack, Playground |
| divider | Elements/Divider | UsageGuide, Default, Horizontal, Vertical, Inset, Playground |
| loading | Elements/Loading | UsageGuide, Default, Line, Spinner, Sizes, Colors, SpinnerInverse, Playground |
| progress | Elements/Progress | UsageGuide, Default, Linear, Radial, Determinate, Indeterminate, Striped, Colors, MultiSegment, Disabled, Playground |

### Component-improvement follow-ups surfaced during Tier 1

Filed under Jira epic BH-101191 — Novo Elements improvements:

- BH-101192 — Avatar improvements: `background` getter crashes on undefined `source`; `ngOnInit` operator-precedence bug; `color` input is visually invisible by design; `<novo-avatar-stack>` hardcodes `+5` overflow label.
- BH-101194 — Remove or fix Loading skeleton directive: `[isLoading]` / `[skeleton]` / `[loaded]` trio has inverted boolean semantics, fails on initial paint, and appears unused in the main app. Leaning toward delete. Skeleton story was dropped from `loading.stories.ts` pending resolution.
- BH-101197 — Checkbox `layoutOptions`: source flags the input with `// TODO - avoid configs like this`; audit consumers, then deprecate or remove.
- BH-101198 — Progress `flash` parent mutation: `<novo-progress-bar>` writes to its parent's `fitContainer` from `ngOnInit`; move the decision into the container.
- BH-101199 — Loading `theme` `@deprecated` JSDoc: runtime `console.warn` exists, but no JSDoc tag so IDEs don't flag usages.

---

## Phase 4 — Tier 2: form controls (after Tier 1 lands)

- `field`, `form` wrappers
- `select`, `select-search`, `autocomplete`
- `date-picker`, `date-time-picker`
- `slider`, `color-picker`

Worth deciding here: how to handle form controls inside `ReactiveFormsModule` — likely a shared decorator that provides a `FormGroup` for stories that need binding.

---

## Phase 5 — Tier 3: composite + overlays

Where Storybook starts earning its keep — overlays are hard to demo in novo-examples.

- `modal`, `popover`, `dropdown`, `menu`, `tooltip` — need `play` functions to capture the *opened* state. **Author with `play` from the start** so visual regression later snapshots the right thing.
- `tabs`, `expansion`, `stepper`, `card`.

---

## Phase 6 — Tier 4: data/complex

- `data-table`, `simple-table`, `query-builder`, `picker`, `multi-picker`, `tabbed-group-picker`, `calendar`, `agenda`.

These will have the largest stories; budget more time per component.

---

## Phase 7 — Quality gates

After story coverage settles:

- **Visual regression** — pick from Chromatic / Playwright + test-runner / Loki. Defer until then.
- **a11y CI** — `addon-a11y` is already wired; make failures break CI for covered components.
- **Decide novo-examples future** — deprecate, fold into Storybook docs, or keep as marketing/landing. Don't let both rot.

---

## Open items / TODOs

- Consider a `storybook:fast` script that skips compodoc for faster local iteration.
- Revisit later: should UsageGuide entries live under a separate Storybook category (e.g. `Foundations/Button Usage`) rather than under the component? Decide when 2–3 components have UsageGuides.
