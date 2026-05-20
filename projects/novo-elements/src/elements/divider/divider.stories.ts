import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoDividerComponent } from './divider.component';
import { NovoDividerModule } from './divider.module';

/**
 * Stories for `<novo-divider>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<NovoDividerComponent> = {
  title: 'Elements/Divider',
  component: NovoDividerComponent,
  decorators: [
    moduleMetadata({
      imports: [NovoDividerModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A thin rule that separates groups of related content. Renders horizontally by default; ' +
          'set `vertical` for inline separators between elements on the same row. Use `inset` to ' +
          'align the start of the rule with content that has a fixed left offset (e.g. a list with leading avatars).',
      },
    },
  },
  argTypes: {
    vertical: {
      control: 'boolean',
      description:
        'When `true`, the divider is rendered vertically — a thin right-border with horizontal margin. ' +
        'Use between inline elements on the same row (e.g. toolbar action groups).',
      table: { defaultValue: { summary: 'false' } },
    },
    inset: {
      control: 'boolean',
      description:
        'When `true`, the horizontal rule is indented from the leading edge by a fixed amount (80px). ' +
        'Use to align the divider with content that sits past a fixed-width leading column — for ' +
        'instance, list rows with avatars or icons. Has no effect when `vertical` is `true`.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<NovoDividerComponent>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. When to reach for a divider, when whitespace or a
 * heading would communicate the same break more cleanly, and the accessibility
 * implications of using `role="separator"` versus a purely decorative rule.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a divider</h2>
        <p style="margin: 0 0 1.25rem;">
          A divider is a thin rule that visually separates two groups of related
          content. Reach for it when the relationship between adjacent groups is
          close enough that whitespace alone doesn't clearly signal the break,
          but where promoting one group to its own heading would be heavier than
          the content warrants.
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
              ✓ Use a divider when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Separating rows in a list where each row is otherwise visually similar</li>
              <li>Splitting groups inside a menu, dropdown, or toolbar</li>
              <li>Breaking a single panel into distinct content zones without adding a heading</li>
              <li>Separating inline action groups in a toolbar (use <code>vertical</code>)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a divider when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Whitespace already makes the grouping obvious — prefer the lighter solution</li>
              <li>The two groups are conceptually distinct — promote one to a heading (<code>h2</code>/<code>h3</code>) instead</li>
              <li>You need a decorative flourish — that's a styling concern, not a separator</li>
              <li>Inside a flex/grid layout that already provides <code>gap</code> spacing</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Horizontal vs. vertical</h2>
        <p style="margin: 0 0 1rem;">
          The default orientation is <strong>horizontal</strong> — a block-level
          rule that spans the parent's width. Set <code>vertical</code> to flip
          it inline, suitable for separating items on the same row.
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 1rem;
        ">
          <div style="margin-bottom: 0.5rem; color: #57606a; font-size: 0.875rem;">Horizontal</div>
          <div>Group A</div>
          <novo-divider></novo-divider>
          <div>Group B</div>
        </div>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <div style="margin-bottom: 0.5rem; color: #57606a; font-size: 0.875rem;">Vertical</div>
          <div style="display: flex; align-items: center; height: 1.5rem;">
            <span>Action A</span>
            <novo-divider vertical></novo-divider>
            <span>Action B</span>
            <novo-divider vertical></novo-divider>
            <span>Action C</span>
          </div>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Inset</h2>
        <p style="margin: 0 0 1rem;">
          The <code>inset</code> variant indents the rule from the leading edge
          by a fixed amount. Use it when the divider sits in a list where each
          row has a fixed-width leading element (an avatar, an icon, a
          checkbox) — the inset aligns the rule with the row's content rather
          than its leading column.
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <div style="display: flex; gap: 1rem; align-items: center; padding: 0.5rem 0;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #d0d7de; flex: none;"></div>
            <div>Row one</div>
          </div>
          <novo-divider inset></novo-divider>
          <div style="display: flex; gap: 1rem; align-items: center; padding: 0.5rem 0;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #d0d7de; flex: none;"></div>
            <div>Row two</div>
          </div>
          <novo-divider inset></novo-divider>
          <div style="display: flex; gap: 1rem; align-items: center; padding: 0.5rem 0;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #d0d7de; flex: none;"></div>
            <div>Row three</div>
          </div>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            The component sets <code>role="separator"</code> automatically and
            mirrors orientation via <code>aria-orientation</code> — assistive
            tech will announce the grouping break.
          </li>
          <li>
            <strong>Purely decorative dividers should not be announced.</strong>
            If the rule is a visual flourish rather than a semantic separator
            (a border, an underline), use a styled <code>&lt;div&gt;</code> or a
            CSS <code>border</code> — or override the role with
            <code>role="presentation"</code> on the host element so it's ignored
            by screen readers.
          </li>
          <li>
            Don't use a divider as a substitute for a heading. Headings give
            screen-reader users a navigable outline of the page; dividers do
            not.
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
 * The simplest divider — a horizontal rule between two blocks of content. Both
 * inputs are bound so every control in the panel mutates the render.
 */
export const Default: Story = {
  args: {
    vertical: false,
    inset: false,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- NovoDividerModule -->
<div>
  <div>Content above the divider</div>
  <novo-divider></novo-divider>
  <div>Content below the divider</div>
</div>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <div>Content above the divider</div>
        <novo-divider [vertical]="vertical" [inset]="inset"></novo-divider>
        <div>Content below the divider</div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Horizontal                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The default orientation. A block-level rule that spans the parent's full
 * width. Use to separate stacked groups of related content.
 */
export const Horizontal: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<div>
  <div>First section</div>
  <novo-divider></novo-divider>
  <div>Second section</div>
  <novo-divider></novo-divider>
  <div>Third section</div>
</div>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 360px;">
        <div style="padding: 0.5rem 0;">First section</div>
        <novo-divider></novo-divider>
        <div style="padding: 0.5rem 0;">Second section</div>
        <novo-divider></novo-divider>
        <div style="padding: 0.5rem 0;">Third section</div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Vertical                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Set `vertical` to render an inline rule between elements on the same row.
 * The vertical divider carries its own horizontal margin — drop it directly
 * between items inside a flex/inline-flex container.
 */
export const Vertical: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<div style="display: flex; align-items: center; height: 1.5rem;">
  <span>Edit</span>
  <novo-divider vertical></novo-divider>
  <span>Duplicate</span>
  <novo-divider vertical></novo-divider>
  <span>Delete</span>
</div>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; height: 1.5rem;">
        <span>Edit</span>
        <novo-divider vertical></novo-divider>
        <span>Duplicate</span>
        <novo-divider vertical></novo-divider>
        <span>Delete</span>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Inset                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The `inset` variant indents the rule from the leading edge by a fixed amount
 * (80px). Use in lists with a leading avatar or icon column so the rule aligns
 * with the row's content rather than the row's container.
 */
export const Inset: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Inset (80px) aligns the rule with the row content rather than
     the leading avatar/icon column. -->
<div>
  <div class="row"><img class="avatar" /> Alex Morgan</div>
  <novo-divider inset></novo-divider>
  <div class="row"><img class="avatar" /> Jamie Rivera</div>
  <novo-divider inset></novo-divider>
  <div class="row"><img class="avatar" /> Sam Patel</div>
</div>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 360px;">
        <div style="display: flex; gap: 1rem; align-items: center; padding: 0.5rem 0;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #d0d7de; flex: none;"></div>
          <div>Alex Morgan</div>
        </div>
        <novo-divider inset></novo-divider>
        <div style="display: flex; gap: 1rem; align-items: center; padding: 0.5rem 0;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #d0d7de; flex: none;"></div>
          <div>Jamie Rivera</div>
        </div>
        <novo-divider inset></novo-divider>
        <div style="display: flex; gap: 1rem; align-items: center; padding: 0.5rem 0;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #d0d7de; flex: none;"></div>
          <div>Sam Patel</div>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Toggle `vertical` to flip orientation;
 * `inset` only affects the horizontal layout.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    vertical: false,
    inset: false,
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-divider [vertical]="false" [inset]="false"></novo-divider>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div [style.display]="vertical ? 'flex' : 'block'" [style.alignItems]="vertical ? 'center' : null" [style.height]="vertical ? '1.5rem' : null" style="max-width: 360px;">
        <span>Item A</span>
        <novo-divider [vertical]="vertical" [inset]="inset"></novo-divider>
        <span>Item B</span>
      </div>
    `,
  }),
};
