import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoButtonElement } from './Button';
import { NovoButtonModule } from './Button.module';

/**
 * Stories for `<novo-button>`.
 *
 * Convention reference for novo-elements stories:
 *   - Co-locate `<component>.stories.ts` next to the component source.
 *   - Use `moduleMetadata` to declare the component's NgModule (most novo-elements
 *     components are non-standalone).
 *   - Use `template` rather than `args`-only rendering whenever the component
 *     uses `<ng-content>` projection (which is most of them).
 *   - Provide these stories per component, in this order:
 *       1. UsageGuide  – design / when-to-use guidance (OPTIONAL — add only
 *                        for components where the consumer's main question is
 *                        "should I use this at all?" rather than "how do I?";
 *                        when present, this is the first story so it becomes
 *                        the docs page's Primary)
 *       2. Default     – the simplest possible rendering
 *       3. Variants    – theme / color / variant matrix (if applicable)
 *       4. Sizes       – size matrix (if applicable)
 *       5. States      – disabled / loading / error
 *       6. WithIcons   – icon-bearing variant (if applicable)
 *       7+. Specialized variants that need their own showcase (icon-only,
 *           floating action, inverse, etc.). One story per logical mode.
 *       Last. Playground – fully arg-typed interactive variant
 *   - Tag the meta with `'autodocs'` so Storybook auto-generates a Docs page
 *     from the stories. Keep the component-level description short — the
 *     stories themselves are the documentation. Reach for a co-located
 *     `<component>.mdx` only when curated narrative content is genuinely
 *     needed; do not use both at once.
 *   - Document each story with a JSDoc on the exported `Story` constant; the
 *     Docs page surfaces these as story descriptions.
 *   - Match the visible Controls to what the story's template actually binds:
 *       • Story template uses `[input]="input"` for every arg → no override.
 *       • Story binds only a subset → `parameters: { controls: { include: [...] } }`.
 *       • Story is a fixed matrix with hardcoded values → `parameters: { controls: { disable: true } }`.
 *     Showing controls that do nothing confuses users.
 *   - Story `title` follows `<Category>/<Component>` — see Tier groupings in
 *     the Phase 3 plan for category names.
 */
const meta: Meta<NovoButtonElement> = {
  title: 'Elements/Button',
  component: NovoButtonElement,
  decorators: [
    moduleMetadata({
      imports: [NovoButtonModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Clear point of action for the user. Pick a `theme` to match the button\'s role on the page — ' +
          '`primary` for the main call-to-action, `secondary` for an alternate, `standard` for cancel/neutral, ' +
          '`dialogue` when less visual weight is needed. See the stories below for the full set.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['standard', 'primary', 'secondary', 'dialogue', 'fab', 'icon'],
      description: 'Primary visual lever. Picks the button\'s visual treatment.',
      table: { defaultValue: { summary: 'dialogue' } },
    },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'success', 'warning', 'negative'],
      description:
        'Text/icon color. `success` is conventionally used for save/confirm; `negative` for delete/remove.',
    },
    size: {
      control: 'select',
      options: [undefined, 'sm', 'lg'],
      description: 'Button size. Defaults to medium when unset.',
    },
    side: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Side on which the primary icon renders.',
      table: { defaultValue: { summary: 'right' } },
    },
    icon: {
      control: 'text',
      description: 'Bullhorn icon name (without the `bhi-` prefix).',
    },
    secondIcon: {
      control: 'text',
      description: 'Optional second icon; renders opposite the primary icon.',
    },
    loading: {
      control: 'boolean',
      description: 'When `true`, the button becomes non-interactive and renders a spinner overlay.',
    },
    disabled: {
      control: 'boolean',
      description:
        'When `true`, the button is non-interactive. Automatically applies `aria-disabled="true"` and `tabindex="-1"`.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoButtonElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a button, when to use
 * something else (typically a link), the button's anatomy, the type taxonomy,
 * and accessibility requirements that aren't otherwise obvious from the API.
 *
 * This is a docs-only story — it renders narrative content rather than a
 * single component variant. Most components won't need one of these; add one
 * only when the consumer's main question is "*should I use this at all?*"
 * rather than "*how do I use it?*".
 */
export const UsageGuide: Story = {
  name: '📖 Usage Guide',
  // Exclude from the autodocs Docs page — the guide duplicates the page's
  // intent if rendered inline. Sidebar entry remains so it can be navigated
  // to directly. With UsageGuide excluded, Default becomes the autodocs
  // Primary story.
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #2d3137;
        max-width: 920px;
        line-height: 1.55;
      ">
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a button</h2>
        <p style="margin: 0 0 1.25rem;">
          A button is a point of <strong>action</strong>. If the user is performing
          something — saving, cancelling, opening a popover, advancing a step — a
          button is the right element. If the user is <em>navigating</em> to
          another view or an external page, use a link.
        </p>

        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        ">
          <section style="
            background: #f0f9f4;
            border-left: 4px solid #2ecc71;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #1e7e3f;">
              ✓ Use a button when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Confirming or submitting a form</li>
              <li>Cancelling an action</li>
              <li>Resetting a form or dataset</li>
              <li>Closing a container or section</li>
              <li>Opening a popover or modal</li>
              <li>Advancing through a stepper workflow</li>
              <li>Applying a non-critical action to a dataset</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a button when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Linking to another view — use a link</li>
              <li>Linking to an external site — use a link</li>
              <li>Displaying a collection of section links — use links</li>
              <li>Toggling state on/off — use a switch or checkbox</li>
              <li>Showing read-only status — use a badge or tag</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A button has three composable parts. The container is always present;
          icon and text are optional, but every button must have at least one of
          them — preferably text.
        </p>
        <div style="
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 1fr;
          gap: 1.5rem;
          align-items: center;
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <img
            src="/assets/images/ButtonAnatomy.png"
            alt="Annotated button showing container, icon, and text parts"
            style="width: 100%; max-width: 360px; height: auto; display: block;"
          />
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li>
              <strong>Container</strong> — provided by <code>theme</code>. The
              visual treatment (Primary, Secondary, Dialogue, etc.) is the main
              decision.
            </li>
            <li>
              <strong>Icon</strong> (optional) — set via <code>icon</code>;
              positioned by <code>side</code>. Prefer prefix for predicate
              labels ("Add Candidate"), suffix for imperatives ("Save").
            </li>
            <li>
              <strong>Text</strong> (optional but recommended) — should be a
              verb that names the action.
            </li>
          </ol>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Types</h2>
        <p style="margin: 0 0 1rem;">
          The button family covers four primary treatments. Pick by role on the
          page, not by appearance — and pair with <code>color</code> when the
          action carries semantic intent (save, delete, warn, etc.).
        </p>
        <div style="
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 1fr;
          gap: 1.5rem;
          align-items: start;
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <img
            src="/assets/images/ButtonTypes.png"
            alt="Four button treatments: standard, primary (solid), secondary (outline), dialogue"
            style="width: 100%; max-width: 420px; height: auto; display: block;"
          />
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li><strong>Basic</strong> — lightweight action, used where a normal button would feel noisy (e.g. row actions in a table).</li>
            <li><strong>Primary</strong> — primary call-to-action for the view (e.g. Save).</li>
            <li><strong>Secondary</strong> — alternative or second-major action.</li>
            <li><strong>Standard</strong> — equally-weighted neutral action, often Cancel/Close.</li>
          </ol>
        </div>

        <h3 style="margin: 0 0 0.5rem; font-size: 1.15rem;">Color × treatment matrix</h3>
        <p style="margin: 0 0 1rem;">
          Each treatment composes with a semantic <code>color</code>. The same
          intent reads differently depending on the container — pick the
          combination that matches both the action's weight and its tone.
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <img
            src="/assets/images/ButtonOverview.png"
            alt="Three rows showing dialogue, primary, and outlined buttons across default, success, error, and warning colors"
            style="width: 100%; max-width: 640px; height: auto; display: block; margin: 0 auto;"
          />
        </div>

        <h3 style="margin: 0 0 0.5rem; font-size: 1.15rem;">Icon-style buttons</h3>
        <p style="margin: 0 0 1rem;">
          When space is tight and the meaning is clear from the icon alone, the
          <code>icon</code> and <code>fab</code> themes drop the text entirely.
          Use sparingly — icon-only buttons must always carry an
          <code>aria-label</code>.
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <img
            src="/assets/images/ButtonIcons.png"
            alt="Variants of icon-only buttons: bare, square, fab, and large fab"
            style="width: 100%; max-width: 480px; height: auto; display: block; margin: 0 auto;"
          />
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <strong>Icon-only buttons must have an <code>aria-label</code></strong>.
            Without text content, screen readers have nothing to announce.
          </li>
          <li>
            When <code>disabled</code> is set, the component automatically
            applies <code>aria-disabled="true"</code> and
            <code>tabindex="-1"</code> — you don't need to add either yourself.
          </li>
          <li>
            <code>Enter</code> and <code>Space</code> activate the button. Both
            keys are automatically swallowed when the button is
            <code>disabled</code> or <code>loading</code>.
          </li>
          <li>
            Avoid relying on color alone (e.g. <code>color="negative"</code>) to
            convey meaning — pair with an icon or unambiguous label.
          </li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The simplest possible button — a `primary` theme with text content. All
 * inputs are bound so every control in the panel mutates the render; only
 * `theme` is pre-set, the rest stay unset and have no visible effect until
 * the user toggles them.
 */
export const Default: Story = {
  args: {
    theme: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-button
        [theme]="theme"
        [color]="color"
        [size]="size"
        [side]="side"
        [icon]="icon"
        [secondIcon]="secondIcon"
        [loading]="loading"
        [disabled]="disabled"
      >
        Click me
      </novo-button>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Themes                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Approved themes. Pick by **role**, not by appearance: `primary` for the main
 * call-to-action, `secondary` for an alternative, `standard` to cancel or stop
 * progress, `dialogue` when less visual weight is needed.
 */
export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        <novo-button theme="standard">Standard</novo-button>
        <novo-button theme="primary">Primary</novo-button>
        <novo-button theme="secondary">Secondary</novo-button>
        <novo-button theme="dialogue">Dialogue</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Three sizes. Omit `size` for the default medium — most usages should.
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <novo-button theme="primary" size="sm">Small</novo-button>
        <novo-button theme="primary">Default</novo-button>
        <novo-button theme="primary" size="lg">Large</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. States                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * `loading` and `disabled` are both non-interactive. `disabled` additionally
 * sets `aria-disabled="true"` and `tabindex="-1"` so the button is removed
 * from the focus order.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <novo-button theme="primary">Default</novo-button>
        <novo-button theme="primary" [loading]="true">Loading</novo-button>
        <novo-button theme="primary" [disabled]="true">Disabled</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithIcons                                                                */
/* -------------------------------------------------------------------------- */

/**
 * One or two Bullhorn icons. `side` controls the primary icon's position;
 * `secondIcon` automatically takes the opposite side. Prefer prefix (`left`)
 * for predicate text (*"Add Candidate"*), suffix (`right`) for imperatives
 * (*"Save"*).
 */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <novo-button theme="primary" icon="add" side="left">Add</novo-button>
        <novo-button theme="primary" icon="chevron-right" side="right">Next</novo-button>
        <novo-button theme="secondary" icon="search" secondIcon="caret">Search</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. TwoIcons                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Set both `icon` and `secondIcon` to render two icons. The primary icon's
 * position is controlled by `side`; the second icon automatically takes the
 * opposite side.
 *
 * Use sparingly — two icons can make a button noisy. Reach for this only when
 * the button performs an action *and* needs to signal a secondary affordance
 * (e.g. an Edit button that opens a configuration submenu).
 */
export const TwoIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        <novo-button theme="primary" icon="edit" secondIcon="arrow-right">Two Icons</novo-button>
        <novo-button theme="primary" icon="bolt" secondIcon="configure-o" side="right">Two Icons</novo-button>
        <novo-button theme="secondary" icon="search" secondIcon="caret">Search</novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. IconOnly                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The `icon` theme renders an **icon-only** button with no text. Use when
 * space is tight and the action's meaning is clear from the icon alone — most
 * commonly inside complex components (e.g. pagination next/previous, calendar
 * navigation).
 *
 * Always supply an `aria-label` — there's no text content for screen readers
 * to announce.
 */
export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <novo-button theme="icon" icon="print" aria-label="Print"></novo-button>
        <novo-button theme="icon" icon="edit" aria-label="Edit"></novo-button>
        <novo-button theme="icon" icon="trash-o" aria-label="Delete"></novo-button>
        <novo-button theme="icon" icon="search" aria-label="Search"></novo-button>
        <novo-button theme="icon" icon="more-vert" aria-label="More options"></novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Fab                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Floating action buttons — primary call-to-action with strong visual
 * emphasis. Always supply an `icon`. Pair with `color` (`success` / `warning`
 * / `negative` / analytics colors) to convey intent, and `inverse` to flip
 * the foreground when placed on a colored background.
 *
 * As with `icon`-themed buttons, supply an `aria-label`.
 */
export const Fab: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <novo-button theme="fab" color="success" icon="check" aria-label="Confirm"></novo-button>
        <novo-button theme="fab" color="warning" icon="caution-o" aria-label="Warning"></novo-button>
        <novo-button theme="fab" color="negative" icon="times" aria-label="Cancel"></novo-button>
        <novo-button theme="fab" icon="add" aria-label="Add" inverse></novo-button>
        <novo-button theme="fab" icon="neutral" aria-label="Disabled" disabled></novo-button>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    theme: 'primary',
    size: undefined,
    side: 'right',
    icon: '',
    secondIcon: '',
    loading: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-button
        [theme]="theme"
        [color]="color"
        [size]="size"
        [side]="side"
        [icon]="icon"
        [secondIcon]="secondIcon"
        [loading]="loading"
        [disabled]="disabled"
      >
        Playground
      </novo-button>
    `,
  }),
};
