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

**Form control two-way binding.** `FormsModule` and `ReactiveFormsModule` are imported globally via the `moduleMetadata` decorator in [.storybook/preview.ts](projects/novo-elements/.storybook/preview.ts). Form-control stories can use `[(ngModel)]` and reactive bindings without per-story imports.

**Global providers via `applicationConfig`.** A few novo-elements services are declared `@Injectable()` without `providedIn: 'root'` — the library exports a provider set (`NOVO_ELEMENTS_LABELS_PROVIDERS`) that consumers register at their application's root injector. Storybook needs the same registration via the `applicationConfig` decorator in [.storybook/preview.ts](projects/novo-elements/.storybook/preview.ts) so components like `<novo-slider>`, the date pickers, and form-error machinery don't throw NG0201 on render. When Tier 3+ components surface additional root-level provider needs (e.g. CDK `Overlay`, breakpoint observers, custom locale providers), add them to the same `providers` array — not per-story.

**Wrappers (`field`, `form`).** The wrapper components don't have meaningful standalone stories — always demo them *containing* their typical contents (an input/select/etc. inside a `<novo-field>`).

**Picker source data.** Stories for `<novo-select>`, `<novo-select-search>`, `<novo-autocomplete>`, and similar source-driven components use inline static option arrays per story. If duplication gets ugly later, promote to a shared mock-data module in `.storybook/`.

**`play` functions for interactive open states.** Stories where the meaningful visual is *after* a user interaction (calendar open, dropdown open, modal opened, etc.) must include a `play` function that drives the open. This is what makes visual regression (Chromatic / Playwright + test-runner) snapshot the interesting frame rather than the closed initial render.

```ts
import { userEvent, within, expect } from 'storybook/test';

export const Opened: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /pick a date/i }));
    await expect(canvas.getByRole('dialog')).toBeVisible();
  },
};
```

**CDK overlays portal to `document.body`.** Select panels, autocomplete overlays, color/date pickers, and any other CDK-overlay-backed surface are rendered outside the story's canvas root. Queries for elements inside the overlay must run against `document.body`, not `canvasElement`:

```ts
const canvas = within(canvasElement);
await userEvent.click(canvas.getByRole('combobox'));   // open

const body = within(document.body);                    // overlay lives here
await expect(await body.findByRole('listbox')).toBeVisible();
```

**Play parity across tiers.** Every Tier 2+ component should ship at least one play function — a smoke test that exercises the meaningful interaction (open the picker, click Next on the carousel, surface the validation error). The goal isn't coverage parity with unit tests; it's giving visual regression a deterministic interaction to snapshot per component.

**`<novo-button>` doesn't render a native `<button>` — click it by role, not by wrapper.** `<novo-button>` sets `role="button"` on its own host element and listens via `@HostListener('click')`. Two consequences for play functions:

- Use `canvas.findByRole('button', { name: /<text>/i })` to grab the trigger. `getByRole`/`findByRole` correctly resolves the novo-button host element.
- Do **not** put the `data-testid` on a wrapper (e.g. a custom `<demo-modal-trigger>`) and then `userEvent.click(wrapper)`. Clicks dispatched on a wrapper bubble *up* — they never reach the novo-button's click listener, so the play silently waits forever. Put the testid on the `<novo-button>` itself, or query by role.

**Scope overlay assertions to `.cdk-overlay-container`, not all of `document.body`.** When the trigger button text happens to match modal/popover content (e.g. trigger says "Edit Candidate", modal title says "Edit Candidate"), `within(document.body).findByText(...)` resolves both and throws on the ambiguity. Use `const overlay = within(document.querySelector('.cdk-overlay-container'))` to constrain queries to the popped-up content.

**Avoid `.toBeVisible()` during Angular animations.** Components like `<novo-expansion-panel>` use CSS height transitions on a wrapper while content nodes are recreated. A `findByText` that lands on a transitional empty `<p>` fails `toBeVisible` even though the panel is mid-open. Prefer `.toBeInTheDocument()` and assert the canonical ARIA signal (e.g. `aria-expanded="true"`) — wait on the signal, not on visual layout.

**`<novo-dropdown>` overlay anchors to the host element, not the trigger.** The dropdown uses `<novo-overlay-template [parent]="element">` where `element` is the `<novo-dropdown>` host. The host is `display: inline-block` by default, but CSS *blockifies* flex / grid children — putting `<novo-dropdown>` directly inside a `display: flex` or `display: grid` parent flips it to `display: block` and it stretches to fill the available row/cell. The overlay then anchors to the bottom of the full host, not just below the trigger button — symptom: panel pops up far below the trigger; in stretchy containers the panel can land hundreds of pixels off. Fixes (use whichever fits the story layout):

- Prefer a block-flow wrapper (plain divs / inline-block dropdowns flowing naturally) — no blockification, host sizes to trigger.
- If you need a flex/grid layout for spacing, wrap each `<novo-dropdown>` in a plain `<span>` (or other inline element) so the *span* gets blockified instead and the dropdown keeps its intrinsic shrink-wrapping.
- Inline `style="display: inline-block;"` on `<novo-dropdown>` itself does **not** work inside flex/grid — blockification overrides the inline style. Use the wrapper-span pattern.

Pre-selecting state for selection-based components (multi-select dropdown, indeterminate checkboxes, etc.) reads better at-a-glance than a play that toggles a few items, but for visual-regression you usually want both: pre-select for the static snapshot, and use `play` to open the panel so the selected state is actually visible.

**Only bind template inputs that match keys in `args`.** A story template like `[fooEnabled]="enabled"` references `args.enabled` — if `args` doesn't define `enabled`, the binding resolves to `undefined`. For components that treat undefined as a meaningful negative state, that silently breaks the story. Concrete example: tooltip's `[tooltipActive]="undefined"` flipped the directive's internal active signal to falsy, so `mouseenter` short-circuited before ever calling `show()` and no tooltip ever appeared. Trim render templates to the inputs args sets, and put the full input surface in Playground.

**Composing modules in story imports.** A component's NgModule typically imports its dependencies (`NovoIconModule`, etc.) for its *own* templates but doesn't necessarily re-export them. If a story's template uses a peer component directly (e.g. `<novo-icon>` inside a `<novo-chip>` story), you must explicitly import that peer's module in `moduleMetadata.imports` alongside the primary one. Symptom when missed: the peer element renders as a bare custom element with its inner text leaking through (no Angular component lifecycle, no styling) — no console error, so it's easy to miss until visual review. Recurring offenders worth memorizing:

- `<novo-icon>` lives in `NovoIconModule`, not re-exported by `NovoChipsModule` or `NovoFieldModule`.
- `<novo-option>` and `<novo-optgroup>` live in `NovoOptionModule` (under `novo-elements/elements/common`), not re-exported by `NovoSelectModule` / `NovoAutocompleteModule` / `NovoSelectSearchModule`.
- `<novo-text>` lives in `NovoCommonModule`.

**Escape literal braces in UsageGuide template strings.** Story `template:` strings are parsed by Angular as templates, so any literal `{` triggers interpolation parsing and crashes the story with "Unexpected character EOF" if no closing `}}` follows. When showing example object literals (`{ r: 218, g: 66, b: 83 }`) or code snippets in a UsageGuide, escape the braces as HTML entities (`&#123;` / `&#125;`) — or use the Angular-recommended `{{ '{' }}` interpolation. Pure text outside angle brackets is the most common offender.

**Canonical-recipe source overrides.** Storybook's auto-extracted "Show code" for a story shows the render-function source — which includes story plumbing (helper functions used to sidestep DI, template strings with `props` references, etc.) that a consumer can't copy verbatim. When the auto-extracted source doesn't match the shape a consumer would write in their own app, override `parameters.docs.source.code` with a hand-written recipe: typically a `@Component({...})` shell with the canonical inputs and matching template. Both the Docs view's "Show code" toggle and the bottom-dock Code panel render this override. Worth doing on every story for `form`, `dynamic-form`, and any other component where the story uses helper utilities the consumer wouldn't.

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

### Component-improvement follow-ups

Findings flagged during the Storybook rollout. Filed against the team's
internal issue tracker; the highlights below capture each one's substance:

- **Avatar** — `background` getter crashes on undefined `source`; `ngOnInit` operator-precedence bug; `color` input is visually invisible by design; `<novo-avatar-stack>` hardcodes `+5` overflow label.
- **Loading skeleton directive** — `[isLoading]` / `[skeleton]` / `[loaded]` trio has inverted boolean semantics, fails on initial paint, and appears unused in the main app. Leaning toward delete. Skeleton story was dropped from `loading.stories.ts` pending resolution.
- **Checkbox `layoutOptions`** — source flags the input with `// TODO - avoid configs like this`; audit consumers, then deprecate or remove.
- **Progress `flash` parent mutation** — `<novo-progress-bar>` writes to its parent's `fitContainer` from `ngOnInit`; move the decision into the container.
- **Loading `theme` `@deprecated` JSDoc** — runtime `console.warn` exists, but no JSDoc tag so IDEs don't flag usages.

A working list of unfiled findings surfaced during story work is maintained outside the public repo; promote items into the tracker as they're worth fixing.

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
