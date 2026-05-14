import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoProgressElement } from './Progress';
import { NovoProgressModule } from './Progress.module';

/**
 * Stories for `<novo-progress>` and its inner `<novo-progress-bar>`. Follows
 * the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * The progress family uses a container/child pattern: `<novo-progress>` wraps
 * one or more `<novo-progress-bar>` children. The container owns layout
 * options (`appearance`, `total`, `striped`, `radius`); each bar owns its own
 * `value`, `color`, and animation flags.
 */
const meta: Meta<NovoProgressElement> = {
  title: 'Elements/Progress',
  component: NovoProgressElement,
  decorators: [
    moduleMetadata({
      imports: [NovoProgressModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Quantifiable progress indicator. Use when you can measure how much of a task is complete (e.g. ' +
          '"40 of 100"). Reach for a loading spinner instead when the work is indeterminate or the duration ' +
          'is unknown. Compose `<novo-progress>` (the container) with one or more `<novo-progress-bar>` children — ' +
          'the container sets the layout (`linear` vs `radial`) and total, the bars set per-segment value and color.',
      },
    },
  },
  argTypes: {
    appearance: {
      control: 'radio',
      options: ['linear', 'radial'],
      description:
        'Layout of the progress indicator. `linear` is a horizontal bar; `radial` is a circular ring (best for ' +
        'compact dashboards or KPI tiles).',
      table: { defaultValue: { summary: 'linear' } },
    },
    total: {
      control: 'number',
      description:
        'Denominator for child bar values. Each bar\'s `value` is rendered as `value / total`. Defaults to `100` ' +
        '(so a child `value="40"` renders as 40%).',
      table: { defaultValue: { summary: '100' } },
    },
    radius: {
      control: 'number',
      description:
        'Radius (in px) of the radial ring. Only applies when `appearance="radial"`. Multiple bars in the same ' +
        'container automatically step down by 5px per bar to render as concentric rings.',
      table: { defaultValue: { summary: '54' } },
    },
    striped: {
      control: 'boolean',
      description: 'Renders a diagonal stripe pattern on the bar fill. Pair with `animated` on the bar for motion.',
    },
    color: {
      control: 'select',
      options: [undefined, 'positive', 'success', 'warning', 'negative', 'info'],
      description: 'Container-level color override. Per-bar `color` on the child takes precedence.',
    },
    theme: {
      control: 'text',
      description: 'Container-level theme (entity color). Per-bar `theme` on the child takes precedence.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, the container and all child bars render in a muted, non-interactive style.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoProgressElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a progress indicator versus
 * a spinner, the container/child anatomy, and the determinate / indeterminate /
 * flash modes.
 */
export const UsageGuide: Story = {
  name: '📖 Usage Guide',
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use progress</h2>
        <p style="margin: 0 0 1.25rem;">
          A progress indicator answers <strong>"how much is done?"</strong>.
          Reach for it when you can quantify the work — a file upload, a
          multi-step import, a metric like "40 of 100 candidates submitted".
          If the work is unknown in duration or you can't measure completion,
          use a <strong>loading spinner</strong> instead.
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
              ✓ Use progress when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Tracking a long-running action with measurable steps</li>
              <li>Displaying metrics that read naturally as a bar or ring</li>
              <li>Showing per-segment breakdowns (success / failure / warning counts)</li>
              <li>Visualizing portion-of-whole on a dashboard tile</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use progress when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Loading content of unknown duration — use a spinner</li>
              <li>Initializing a page or pane — use the loading element</li>
              <li>Showing a single boolean state — use a badge or icon</li>
              <li>The bar's percent isn't actually meaningful to the user</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          Progress is a two-part composition. The container holds layout; the
          children hold values.
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong><code>&lt;novo-progress&gt;</code></strong> — container.
            Owns <code>appearance</code> (linear vs radial), <code>total</code>
            (the denominator), <code>radius</code> (radial only), and the
            container-level <code>striped</code> / <code>disabled</code> /
            <code>color</code> defaults.
          </li>
          <li>
            <strong><code>&lt;novo-progress-bar&gt;</code></strong> — one per
            value segment. Owns <code>value</code>, per-bar
            <code>color</code> / <code>theme</code>, and the animation flags
            <code>indeterminate</code>, <code>animated</code>, <code>flash</code>.
            Multiple bars in the same container render stacked (linear) or
            concentric (radial).
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">How value works</h2>
        <p style="margin: 0 0 1rem;">
          Each child bar's fill is <code>value / total</code>. The container's
          <code>total</code> defaults to <code>100</code>, so a child with
          <code>value="40"</code> renders as 40%. Set
          <code>total</code> to override the denominator — useful for showing
          raw counts (e.g. <code>total="300"</code> with bars of value 120 and
          40 reading directly as "120 of 300" and "40 of 300").
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Modes</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Determinate</strong> — the default. Set
            <code>value</code> on each bar.
          </li>
          <li>
            <strong>Indeterminate</strong> — set <code>indeterminate="true"</code>
            on the bar. The bar fills the container and animates a striped
            sweep. Use only when the work is in progress but progress can't
            be measured. (For "unknown total but spin", a loading spinner is
            usually a better fit.)
          </li>
          <li>
            <strong>Flash</strong> — set <code>flash="true"</code> on the bar.
            Renders a continuously sweeping highlight; the container auto-fits
            to its parent width. Use for transient "we're doing something"
            states that don't need an indeterminate bar's heft.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Pair the indicator with a visible <strong>numeric label</strong>
            (e.g. "40 of 100") or an adjacent text status. The bar alone
            isn't announced as a quantity by screen readers.
          </li>
          <li>
            For long-running tasks, keep the value updating — a stuck bar
            looks like a frozen UI.
          </li>
          <li>
            Avoid relying on color alone to convey segment meaning
            (success / warning / negative) — back it with a label or icon.
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
 * The simplest progress — a linear bar with a single value. Controls map to
 * the container; bind a child `<novo-progress-bar>` with a `value`.
 */
export const Default: Story = {
  args: {
    appearance: 'linear' as any,
    total: 100,
    striped: false,
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, value: 40 },
    template: `
      <novo-progress
        [appearance]="appearance"
        [total]="total"
        [striped]="striped"
        [color]="color"
        [theme]="theme"
        [disabled]="disabled"
      >
        <novo-progress-bar [value]="value"></novo-progress-bar>
      </novo-progress>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Linear                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Linear progress bars at various fill levels. The container's `total`
 * defaults to `100`, so the child `value` reads directly as a percent.
 */
export const Linear: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <novo-progress>
          <novo-progress-bar value="10"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="40"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="75"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="100"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Radial                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Set `appearance="radial"` on the container to render a circular ring.
 * Multiple bars in the same radial container render as concentric rings —
 * each child's radius automatically steps down by 5px so they don't overlap.
 */
export const Radial: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <novo-progress appearance="radial">
          <novo-progress-bar value="70"></novo-progress-bar>
        </novo-progress>
        <novo-progress appearance="radial" total="60">
          <novo-progress-bar value="50" color="success"></novo-progress-bar>
          <novo-progress-bar value="40" color="negative"></novo-progress-bar>
          <novo-progress-bar value="30" color="warning"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Determinate                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Determinate progress — the bar's fill reflects an explicit `value` you set.
 * Use whenever you can measure how much of the task is complete.
 */
export const Determinate: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <novo-progress>
          <novo-progress-bar value="25"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="60"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="90"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Indeterminate                                                           */
/* -------------------------------------------------------------------------- */

/**
 * `indeterminate="true"` fills the bar and animates a striped sweep. Use only
 * when the work is genuinely unmeasurable — for unknown-duration loads a
 * spinner is usually a better fit.
 *
 * The `flash` variant is a lighter-weight alternative that sweeps a single
 * highlight across the container, auto-fitting it to the parent width.
 */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <div style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #555;">indeterminate</div>
          <novo-progress>
            <novo-progress-bar indeterminate="true"></novo-progress-bar>
          </novo-progress>
        </div>
        <div class="resizable" style="width: 100%;">
          <div style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #555;">flash</div>
          <novo-progress>
            <novo-progress-bar flash="true"></novo-progress-bar>
          </novo-progress>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Striped                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `striped` renders a diagonal hatch on the fill. Pair with `animated` on the
 * child bar to make the stripes scroll — handy when you want to signal active
 * work while still showing a measurable value.
 */
export const Striped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <novo-progress striped="true">
          <novo-progress-bar value="40"></novo-progress-bar>
        </novo-progress>
        <novo-progress striped="true">
          <novo-progress-bar value="70" animated="true"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Colors                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Per-bar semantic `color`. Use to convey segment meaning — `success` for
 * completed, `warning` for at-risk, `negative` for failed. Pair with a label
 * so meaning doesn't rely on color alone.
 */
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <novo-progress>
          <novo-progress-bar value="60" color="success"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="60" color="warning"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="60" color="negative"></novo-progress-bar>
        </novo-progress>
        <novo-progress>
          <novo-progress-bar value="60" color="info"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. MultiSegment                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Stack multiple `<novo-progress-bar>` children inside one container to render
 * a multi-segment bar. Set `total` to the absolute denominator so each
 * segment reads as a raw count (e.g. `total="300"`, segments of 120 and 40
 * read as "120 of 300" + "40 of 300").
 */
export const MultiSegment: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <novo-progress total="300">
          <novo-progress-bar value="120" color="success"></novo-progress-bar>
          <novo-progress-bar value="40" color="negative"></novo-progress-bar>
        </novo-progress>
        <novo-progress appearance="radial" total="60">
          <novo-progress-bar value="50" color="success"></novo-progress-bar>
          <novo-progress-bar value="40" color="negative"></novo-progress-bar>
          <novo-progress-bar value="30" color="warning"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. Disabled                                                               */
/* -------------------------------------------------------------------------- */

/**
 * `disabled` on the container mutes both the container and all child bars.
 * Bars also accept their own `disabled` for per-segment control.
 */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <novo-progress disabled="true">
          <novo-progress-bar value="40"></novo-progress-bar>
        </novo-progress>
        <novo-progress disabled="true" appearance="radial">
          <novo-progress-bar value="70"></novo-progress-bar>
        </novo-progress>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 11. Playground                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Every container input wired to a control, plus a single child bar with
 * adjustable `value`. Sanity-check combinations or copy a snippet via the
 * Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    appearance: 'linear' as any,
    total: 100,
    radius: 54,
    striped: false,
    color: undefined,
    theme: undefined,
    disabled: false,
  },
  argTypes: {
    // Extra control just for the child bar value — not a container input,
    // hence the loose typing.
    ['value' as any]: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Value of the child `<novo-progress-bar>`. Rendered as `value / total`.',
    },
  },
  render: (args: any) => ({
    props: { ...args, value: args.value ?? 40 },
    template: `
      <novo-progress
        [appearance]="appearance"
        [total]="total"
        [radius]="radius"
        [striped]="striped"
        [color]="color"
        [theme]="theme"
        [disabled]="disabled"
      >
        <novo-progress-bar [value]="value"></novo-progress-bar>
      </novo-progress>
    `,
  }),
};
