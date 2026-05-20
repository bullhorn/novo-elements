import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoIconComponent } from './Icon';
import { NovoIconModule } from './Icon.module';

/**
 * Stories for `<novo-icon>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<NovoIconComponent> = {
  title: 'Elements/Icon',
  component: NovoIconComponent,
  decorators: [
    moduleMetadata({
      imports: [NovoIconModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper around the Bullhorn glyphicon font. Set the icon via the `name` input (or projected text content). ' +
          'Use `theme` to render the canonical color for an entity type (candidate / job / company / etc.); use ' +
          '`color` for one-off color overrides; use `raised` for the filled-background treatment.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Glyphicon name (without the `bhi-` prefix). Equivalent to projecting the name as text content.',
    },
    theme: {
      control: 'select',
      options: [undefined, 'candidate', 'job', 'company', 'submission', 'placement', 'lead', 'opportunity'],
      description: 'Entity theme — applies the canonical color for that entity type.',
    },
    color: {
      control: 'text',
      description: 'One-off color override (e.g. `positive`, `negative`, or any analytics color).',
    },
    size: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'small', 'medium', 'large'],
      description:
        'Typography-scale size token. Prefer `xs`–`4xl`. `small` / `medium` / `large` are **deprecated** aliases ' +
        'kept for back-compat; new code should use the t-shirt scale.',
    },
    shape: {
      control: 'select',
      options: ['box', 'circle'],
      description: 'Container shape when `raised` is set.',
      table: { defaultValue: { summary: 'box' } },
    },
    raised: {
      control: 'boolean',
      description: 'Render the icon on a filled colored background — pairs with `theme` or `color`.',
    },
    smaller: { control: 'boolean', description: 'Convenience size modifier — one step smaller than the inherited size.' },
    larger: { control: 'boolean', description: 'Convenience size modifier — one step larger than the inherited size.' },
    alt: {
      control: 'text',
      description: 'Accessible label. Required when the icon conveys meaning beyond decoration.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoIconComponent>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. When to reach for `<novo-icon>` versus a plain `<i>`
 * tag, the canonical entity colors, and accessibility requirements.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use an icon</h2>
        <p style="margin: 0 0 1.25rem;">
          Prefer <code>&lt;novo-icon&gt;</code> over a bare <code>&lt;i class="bhi-…"&gt;</code> —
          the wrapper gives you consistent sizing, color, and entity-theme
          handling. Reach for icons to reinforce text, signal state, or stand
          in for text when space is tight.
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
              ✓ Use an icon when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Reinforcing an action label (Save → check, Delete → trash)</li>
              <li>Signaling state — success, warning, error, info</li>
              <li>Representing an entity (candidate, job, company, etc.)</li>
              <li>Space is too tight for a text label and the meaning is unambiguous</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use an icon when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Decoration only — accessibility tools will still announce it</li>
              <li>The meaning isn't obvious from the glyph alone — add a label or tooltip</li>
              <li>You need brand or logo iconography — use SVG assets, not the glyph font</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Theme vs color</h2>
        <p style="margin: 0 0 1rem;">
          <strong>Theme</strong> applies the canonical Bullhorn color for an
          entity type. Use it when the icon <em>represents that entity</em>.
          <strong>Color</strong> is a one-off override — use when the color
          conveys state (success / warning / error) rather than entity.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Filled (raised)</h2>
        <p style="margin: 0 0 1.25rem;">
          The <code>raised</code> treatment puts the icon on a filled background
          using the chosen <code>theme</code> or <code>color</code>. Use when
          the icon needs to draw more attention — entity badges, primary
          callouts — or simply when the design calls for more visual weight.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <strong>Always set <code>alt</code></strong> when the icon conveys
            meaning. Without it, screen readers have nothing to announce.
          </li>
          <li>
            Decorative icons paired with adjacent text don't need a label, but
            they shouldn't be focusable — Storybook's a11y panel will flag
            issues.
          </li>
          <li>
            The component sets <code>role="img"</code> automatically.
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
 * The simplest icon — set `name` to a glyphicon. All inputs are bound so every
 * control in the panel mutates the render.
 */
export const Default: Story = {
  args: {
    name: 'candidate',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- NovoIconModule -->
<novo-icon name="candidate"></novo-icon>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-icon
        [name]="name"
        [theme]="theme"
        [color]="color"
        [size]="size"
        [shape]="shape"
        [raised]="raised"
        [smaller]="smaller"
        [larger]="larger"
        [alt]="alt"
      ></novo-icon>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Entities                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Entity-themed icons. Each Bullhorn entity has a canonical color — set
 * `theme="<entity>"` to apply it. Use these wherever you visually represent
 * the entity itself.
 */
export const Entities: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-icon theme="candidate" alt="Candidate">candidate</novo-icon>
<novo-icon theme="job" alt="Job">job</novo-icon>
<novo-icon theme="company" alt="Company">company</novo-icon>
<novo-icon theme="lead" alt="Lead">lead</novo-icon>
<novo-icon theme="opportunity" alt="Opportunity">opportunity</novo-icon>
<novo-icon theme="submission" alt="Submission">star-o</novo-icon>
<novo-icon theme="placement" alt="Placement">star</novo-icon>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; font-size: 2rem;">
        <novo-icon theme="candidate" alt="Candidate">candidate</novo-icon>
        <novo-icon theme="job" alt="Job">job</novo-icon>
        <novo-icon theme="company" alt="Company">company</novo-icon>
        <novo-icon theme="lead" alt="Lead">lead</novo-icon>
        <novo-icon theme="opportunity" alt="Opportunity">opportunity</novo-icon>
        <novo-icon theme="submission" alt="Submission">star-o</novo-icon>
        <novo-icon theme="placement" alt="Placement">star</novo-icon>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Typography-scale sizing via the `size` input. Prefer the t-shirt scale
 * (`xs`–`4xl`). The `small` / `medium` / `large` aliases are kept for
 * back-compat but **deprecated** — new code should use the modern scale.
 *
 * The `smaller` / `larger` convenience flags are a quick relative tweak when
 * the parent already has a size set.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Prefer the t-shirt scale (xs..4xl). small/medium/large are deprecated aliases. -->
<novo-icon size="xs" alt="xs">candidate</novo-icon>
<novo-icon size="sm" alt="sm">candidate</novo-icon>
<novo-icon size="md" alt="md">candidate</novo-icon>
<novo-icon size="lg" alt="lg">candidate</novo-icon>
<novo-icon size="xl" alt="xl">candidate</novo-icon>
<novo-icon size="2xl" alt="2xl">candidate</novo-icon>
<novo-icon size="3xl" alt="3xl">candidate</novo-icon>
<novo-icon size="4xl" alt="4xl">candidate</novo-icon>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: baseline; flex-wrap: wrap;">
        <novo-icon size="xs" alt="xs">candidate</novo-icon>
        <novo-icon size="sm" alt="sm">candidate</novo-icon>
        <novo-icon size="md" alt="md">candidate</novo-icon>
        <novo-icon size="lg" alt="lg">candidate</novo-icon>
        <novo-icon size="xl" alt="xl">candidate</novo-icon>
        <novo-icon size="2xl" alt="2xl">candidate</novo-icon>
        <novo-icon size="3xl" alt="3xl">candidate</novo-icon>
        <novo-icon size="4xl" alt="4xl">candidate</novo-icon>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Colors                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * One-off `color` overrides. Prefer `theme` when the icon represents an
 * entity; reach for `color` when the color signals state instead (success,
 * warning, negative).
 */
export const Colors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<novo-icon color="positive" alt="Success">check</novo-icon>
<novo-icon color="warning" alt="Warning">caution-o</novo-icon>
<novo-icon color="negative" alt="Error">times</novo-icon>
<novo-icon color="info" alt="Info">info</novo-icon>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; font-size: 2rem;">
        <novo-icon color="positive" alt="Success">check</novo-icon>
        <novo-icon color="warning" alt="Warning">caution-o</novo-icon>
        <novo-icon color="negative" alt="Error">times</novo-icon>
        <novo-icon color="info" alt="Info">info</novo-icon>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Raised                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * The `raised` treatment puts the icon on a filled background using the
 * `theme` or `color` value. Useful for entity badges and primary call-out
 * iconography.
 */
export const Raised: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- raised puts the icon on a filled background using the theme color -->
<novo-icon theme="candidate" raised alt="Candidate">candidate</novo-icon>
<novo-icon theme="job" raised alt="Job">job</novo-icon>
<novo-icon theme="company" raised alt="Company">company</novo-icon>
<novo-icon theme="submission" raised alt="Submission">star-o</novo-icon>
<novo-icon theme="placement" raised alt="Placement">star</novo-icon>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <novo-icon theme="candidate" raised alt="Candidate">candidate</novo-icon>
        <novo-icon theme="job" raised alt="Job">job</novo-icon>
        <novo-icon theme="company" raised alt="Company">company</novo-icon>
        <novo-icon theme="submission" raised alt="Submission">star-o</novo-icon>
        <novo-icon theme="placement" raised alt="Placement">star</novo-icon>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-icon name="candidate" size="lg" alt="Candidate"></novo-icon>`,
      },
    },
  },
  args: {
    name: 'candidate',
    theme: undefined,
    color: undefined,
    size: 'lg',
    shape: 'box',
    raised: false,
    smaller: false,
    larger: false,
    alt: 'Candidate',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-icon
        [name]="name"
        [theme]="theme"
        [color]="color"
        [size]="size"
        [shape]="shape"
        [raised]="raised"
        [smaller]="smaller"
        [larger]="larger"
        [alt]="alt"
      ></novo-icon>
    `,
  }),
};
