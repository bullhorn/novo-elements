import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { NovoIconModule } from '../icon/Icon.module';
import { NovoChipElement } from './Chip';
import { NovoChipsModule } from './Chips.module';

/**
 * Stories for `<novo-chip>` (and its grouping container `<novo-chip-list>`).
 * Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * The primary component is `<novo-chip>`: a small inline token used to
 * represent keywords, people, or selected values. Chips are typically rendered
 * as content (between the tags), and grouped inside a `<novo-chip-list>` for
 * layout. The fully form-controlled `<novo-chips>` picker isn't storied here
 * — it requires a configured picker `source` object that's outside the scope
 * of a UI component story; see the `novo-examples` chips pages for that
 * usage.
 */
const meta: Meta<NovoChipElement> = {
  title: 'Form Controls/Chips',
  component: NovoChipElement,
  decorators: [
    moduleMetadata({
      // NovoChipsModule imports NovoIconModule internally for its own
      // templates but does NOT re-export it. Story templates declare
      // `<novo-icon>` directly, so we need NovoIconModule in scope here too.
      imports: [NovoChipsModule, NovoIconModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact token that represents a piece of data — a keyword, a person, a selected value. ' +
          'Chips are content-projected: put the visible label between `<novo-chip>` tags, optionally with ' +
          'a `novoChipAvatar` icon prefix and a `novoChipRemove` close icon suffix. Group them inside a ' +
          '`<novo-chip-list>` for layout. Pair with `color` for semantic intent and `size` to match the ' +
          'surrounding density.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [undefined, 'positive', 'success', 'negative', 'warning', 'info', 'ocean', 'candidate', 'job', 'company'],
      description:
        'Semantic color treatment. Use entity colors (`candidate`, `job`, `company`, …) when the chip ' +
        'represents an entity; use state colors (`success`, `negative`, `warning`, `info`) when the chip ' +
        'reflects status.',
    },
    size: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Chip size. Defaults to `md`.',
      table: { defaultValue: { summary: 'md' } },
    },
    selectable: {
      control: 'boolean',
      description:
        'When `true`, the chip can be selected by click or `Space`. Selection state is reflected via ' +
        '`aria-selected` and the `.novo-chip-selected` class. Defaults to `false` when used outside a ' +
        '`<novo-chip-list>`.',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is currently selected. Has no visible effect unless `selectable` is set.',
    },
    removable: {
      control: 'boolean',
      description:
        'Whether the chip can be removed. When `true`, pressing `Delete`/`Backspace` while focused, or ' +
        'clicking a projected `novoChipRemove` element, emits `(removed)`. Defaults to `true` — but a ' +
        'remove control only shows if you project one.',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'When `true`, the chip is non-interactive. Sets `aria-disabled="true"` and suppresses click, ' +
        'keyboard, and remove handlers.',
    },
    value: {
      control: 'text',
      description:
        'The chip\'s underlying value. Defaults to the chip\'s text content — set explicitly when the ' +
        'visible label differs from the value you want to track (e.g. an id behind a display name).',
    },
  },
};

export default meta;
type Story = StoryObj<NovoChipElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. When to reach for a chip, the chip's anatomy, and
 * accessibility requirements. Pulled from the Chips design docs.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a chip</h2>
        <p style="margin: 0 0 1.25rem;">
          Chips show the user that a view or component represents data from
          multiple contexts. They can present as keywords, people, or selected
          values — whether as a form input or as filter criteria. Reach for
          chips when several discrete tokens need to coexist in the same row.
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
              ✓ Use a chip when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Showing the selected values of a multi-select picker</li>
              <li>Displaying applied filter criteria that the user can remove</li>
              <li>Presenting a list of keywords, skills, or tags</li>
              <li>Representing referenced people or entities inline with text</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a chip when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user can only make a single selection — use a picker or radio</li>
              <li>You need a read-only status indicator — use a badge or tag</li>
              <li>Each item needs its own click target with rich content — use a card</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A chip has up to four composable parts. The container and text are
          always present; the avatar and remove icon are optional and
          content-projected.
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li>
              <strong>Container</strong> — the chip itself. Styled by
              <code>color</code> and sized by <code>size</code>.
            </li>
            <li>
              <strong>Avatar / Indicator</strong> (optional) — project an icon
              tagged with <code>novoChipAvatar</code> for an entity-style
              prefix. Use the entity icon/color combo to convey type.
            </li>
            <li>
              <strong>Text</strong> — the visible label. Plain projected text
              content; the chip's <code>value</code> defaults to this string.
            </li>
            <li>
              <strong>Remove button</strong> (optional) — project an icon
              tagged with <code>novoChipRemove</code> for the trailing close
              affordance. Clicking it emits <code>(removed)</code>; the chip
              is <em>not</em> torn down automatically — the parent decides
              what to do.
            </li>
          </ol>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Color vs accent</h2>
        <p style="margin: 0 0 1.25rem;">
          The chip exposes both <code>color</code> (filled treatment) and
          <code>accent</code> (subtle outline treatment) so the same semantic
          intent can be expressed with different visual weight. Reach for
          <code>accent</code> when several chips share a row and a solid
          background would overwhelm the surface.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Behavior</h2>
        <ul style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li>
            <strong>Text overflow</strong> — when the chip text is too long
            for the available horizontal space, it truncates. Pair with a
            tooltip on hover to reveal the full text.
          </li>
          <li>
            <strong>Chip list overflow</strong> — when horizontal space is
            limited in a <code>&lt;novo-chip-list&gt;</code>, the chips wrap
            onto another line.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Each chip has <code>role="option"</code>; the list container
            (<code>&lt;novo-chip-list&gt;</code>) acts as the listbox.
          </li>
          <li>
            <code>Delete</code> and <code>Backspace</code> trigger
            <code>(removed)</code> when a chip is focused and
            <code>removable</code>.
          </li>
          <li>
            <code>Space</code> toggles selection when the chip is
            <code>selectable</code>.
          </li>
          <li>
            <code>disabled</code> chips set <code>aria-disabled="true"</code>
            and ignore keyboard and click input.
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
 * The simplest chip — text content inside a `<novo-chip>` tag. Every input is
 * bound so every control in the panel mutates the render.
 */
export const Default: Story = {
  args: {
    color: undefined,
    size: 'md',
    selectable: false,
    selected: false,
    removable: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-chip
        [color]="color"
        [size]="size"
        [selectable]="selectable"
        [selected]="selected"
        [removable]="removable"
        [disabled]="disabled"
        [value]="value"
      >
        Chip Label
      </novo-chip>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Colors                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Semantic `color` treatment. Use state colors (`success`, `negative`,
 * `warning`, `info`) when the chip reflects status, and entity colors
 * (`candidate`, `job`, `company`, etc.) when the chip represents an entity
 * of that type.
 */
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <novo-chip-list>
        <novo-chip>Default</novo-chip>
        <novo-chip color="success">Success</novo-chip>
        <novo-chip color="negative">Negative</novo-chip>
        <novo-chip color="warning">Warning</novo-chip>
        <novo-chip color="info">Info</novo-chip>
        <novo-chip color="ocean">Ocean</novo-chip>
        <novo-chip color="candidate">Candidate</novo-chip>
        <novo-chip color="job">Job</novo-chip>
        <novo-chip color="company">Company</novo-chip>
      </novo-chip-list>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Sizes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Five sizes following the t-shirt scale. Omit `size` for the default `md` —
 * most usages should.
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <novo-chip size="xs">Extra small</novo-chip>
        <novo-chip size="sm">Small</novo-chip>
        <novo-chip size="md">Medium</novo-chip>
        <novo-chip size="lg">Large</novo-chip>
        <novo-chip size="xl">Extra large</novo-chip>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithRemove                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Removable chips — project an icon tagged with `novoChipRemove` to render
 * the trailing close affordance. Clicking it emits `(removed)`; the chip is
 * **not** torn down automatically. The parent typically removes the
 * corresponding value from the backing array in response.
 */
export const WithRemove: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <novo-chip-list>
        <novo-chip>
          Angular
          <novo-icon novoChipRemove>times</novo-icon>
        </novo-chip>
        <novo-chip color="success">
          TypeScript
          <novo-icon novoChipRemove>times</novo-icon>
        </novo-chip>
        <novo-chip color="ocean">
          Storybook
          <novo-icon novoChipRemove>times</novo-icon>
        </novo-chip>
      </novo-chip-list>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithAvatar                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Avatar-prefixed chips — project an icon tagged with `novoChipAvatar` for
 * an entity-style leading indicator. Pair the icon's color with the chip's
 * `color` to convey what type the chip represents (candidate, job, company,
 * etc.).
 */
export const WithAvatar: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <novo-chip-list>
        <novo-chip color="candidate">
          <novo-icon novoChipAvatar>candidate</novo-icon>
          Jane Doe
        </novo-chip>
        <novo-chip color="job">
          <novo-icon novoChipAvatar>job</novo-icon>
          Senior Engineer
        </novo-chip>
        <novo-chip color="company">
          <novo-icon novoChipAvatar>company</novo-icon>
          Acme Corp
        </novo-chip>
      </novo-chip-list>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `disabled` makes the chip non-interactive. It sets
 * `aria-disabled="true"`, ignores clicks and key presses, and suppresses
 * the `novoChipRemove` handler even if the icon is projected.
 */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <novo-chip-list>
        <novo-chip disabled>Disabled</novo-chip>
        <novo-chip disabled color="success">
          <novo-icon novoChipAvatar>check</novo-icon>
          Disabled with avatar
        </novo-chip>
        <novo-chip disabled>
          Disabled removable
          <novo-icon novoChipRemove>times</novo-icon>
        </novo-chip>
      </novo-chip-list>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. Formatted                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Chips are content-projected, so the visible label can be any combination
 * of icons, text, and inline elements. Use `value` to track an underlying
 * id while showing a custom-formatted display label.
 */
export const Formatted: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <novo-chip-list>
        <novo-chip color="candidate" value="1234">
          <novo-icon novoChipAvatar>candidate</novo-icon>
          <strong>Jane Doe</strong>&nbsp;— Senior Engineer
          <novo-icon novoChipRemove>times</novo-icon>
        </novo-chip>
        <novo-chip color="job" value="job-42">
          <novo-icon novoChipAvatar>job</novo-icon>
          <strong>#42</strong>&nbsp;Frontend Engineer
          <novo-icon novoChipRemove>times</novo-icon>
        </novo-chip>
        <novo-chip color="info">
          <novo-icon novoChipAvatar>bell</novo-icon>
          3 new notifications
        </novo-chip>
      </novo-chip-list>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    color: undefined,
    size: 'md',
    selectable: true,
    selected: false,
    removable: true,
    disabled: false,
    value: 'chip-1',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-chip
        [color]="color"
        [size]="size"
        [selectable]="selectable"
        [selected]="selected"
        [removable]="removable"
        [disabled]="disabled"
        [value]="value"
      >
        <novo-icon novoChipAvatar>candidate</novo-icon>
        Playground Chip
        <novo-icon novoChipRemove>times</novo-icon>
      </novo-chip>
    `,
  }),
};
