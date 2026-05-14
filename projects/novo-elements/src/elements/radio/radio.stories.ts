import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { NovoRadioGroup } from './RadioGroup';
import { NovoRadioModule } from './Radio.module';

/**
 * Stories for `<novo-radio-group>` / `<novo-radio>`. Follows the conventions
 * documented in `projects/novo-elements/src/elements/button/button.stories.ts`
 * — see that file for the full convention reference.
 */
const meta: Meta<NovoRadioGroup> = {
  title: 'Form Controls/Radio',
  component: NovoRadioGroup,
  decorators: [
    moduleMetadata({
      imports: [NovoRadioModule, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-select control for a small set of mutually-exclusive options. Wrap a set of `<novo-radio>` items ' +
          'in a `<novo-radio-group>` and bind the group\'s value with `[(ngModel)]` (or a reactive form). Use the ' +
          '`button` flag on items for a segmented-button feel, with optional `icon` for icon-only chooses.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description:
        'Form `name` shared by every radio in the group. Auto-generated when unset — only override when posting to a server or for explicit a11y grouping.',
    },
    appearance: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout of the radios within the group.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    value: {
      control: 'text',
      description:
        'Currently-selected value. Matched against each child `<novo-radio>`\'s `value`. Typically bound with `[(ngModel)]` rather than set directly.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, disables every radio in the group.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the group as required for form validation.',
    },
    placeholder: {
      control: 'text',
      description: 'Field-level placeholder when used inside a `<novo-field>`.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoRadioGroup>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. When to reach for a radio group versus a checkbox or
 * select, the anatomy of the control, and the accessibility expectations.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a radio group</h2>
        <p style="margin: 0 0 1.25rem;">
          Use a radio group when the user must pick <strong>exactly one</strong> option
          from a small, fully-visible set. Radios trade screen real estate for
          glanceability — every choice is on screen at once, so the user can
          compare options without opening a dropdown.
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
              ✓ Use a radio group when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user must select exactly one option</li>
              <li>The list is short (roughly 2–7 options)</li>
              <li>All options should be visible at once for easy comparison</li>
              <li>You want to surface the available choices, not hide them</li>
              <li>You need a segmented-button or icon-picker (use <code>button</code>)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a radio group when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user can select multiple options — use a checkbox group</li>
              <li>The list is long — use a <code>select</code> or autocomplete picker</li>
              <li>It's a binary on/off — use a switch or single checkbox</li>
              <li>Selection should commit immediately as navigation — use tabs or a segmented control</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A radio control composes two elements: a <code>&lt;novo-radio-group&gt;</code>
          container that owns the selected <code>value</code> and shared
          <code>name</code>, and one or more <code>&lt;novo-radio&gt;</code> children
          that each declare a candidate <code>value</code> and a label.
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li>
              <strong>Group</strong> — <code>&lt;novo-radio-group&gt;</code>. Owns the
              selection, the shared form <code>name</code>, and the
              <code>appearance</code> (horizontal vs. vertical). Bind the
              selection with <code>[(ngModel)]</code> or a reactive form.
            </li>
            <li>
              <strong>Item</strong> — <code>&lt;novo-radio&gt;</code>. Each item has its
              own <code>value</code> (matched against the group's value) plus
              either projected text or a <code>label</code> input.
            </li>
            <li>
              <strong>Button variant</strong> — set <code>button="true"</code> on items
              to render as a segmented button. Combine with <code>theme="icon"</code>
              and an <code>icon</code> for an icon-only picker.
            </li>
          </ol>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Binding the value</h2>
        <p style="margin: 0 0 1rem;">
          The selected value lives on the <em>group</em>, not the individual
          radios. There are two patterns:
        </p>
        <div style="
          padding: 1.25rem;
          background: #f6f8fa;
          border-radius: 6px;
          margin-bottom: 2rem;
        ">
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li>
              <strong>Two-way binding (recommended)</strong> —
              <code>&lt;novo-radio-group [(ngModel)]="selected"&gt;</code>. Each
              child radio declares a <code>value</code>; the group syncs
              <code>selected</code> with whichever child's value matches.
            </li>
            <li>
              <strong>Imperative</strong> — set <code>[checked]</code> on
              individual <code>&lt;novo-radio&gt;</code> children and listen to
              their <code>(change)</code> event. Useful for static demos but
              awkward in forms.
            </li>
          </ol>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Every radio in a logical group <strong>must share a <code>name</code></strong>.
            The group sets this automatically when you wrap radios in
            <code>&lt;novo-radio-group&gt;</code>.
          </li>
          <li>
            Always provide a visible label — either as projected text or via the
            <code>label</code> input. Icon-only radio buttons should carry an
            <code>aria-label</code>.
          </li>
          <li>
            Disabling a radio removes it from the focus order and prevents
            selection. Disabling the group cascades to every child.
          </li>
          <li>
            Group label and helper text are handled by the enclosing
            <code>&lt;novo-field&gt;</code> — wrap the group in one when used
            inside a form for proper label/aria associations.
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
 * The simplest radio group — three plain text radios bound with
 * `[(ngModel)]`. The selected value flows out of the group, not the
 * individual items. Every group-level input is bound, so each control in the
 * panel mutates the render.
 */
export const Default: Story = {
  args: {
    appearance: 'horizontal',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: { ...args, model: 'two' },
    template: `
      <novo-radio-group
        [(ngModel)]="model"
        [name]="name"
        [appearance]="appearance"
        [disabled]="disabled"
        [required]="required"
        [placeholder]="placeholder"
      >
        <novo-radio value="one">Option one</novo-radio>
        <novo-radio value="two">Option two</novo-radio>
        <novo-radio value="three">Option three</novo-radio>
      </novo-radio-group>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Vertical                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Set `appearance="vertical"` on the group to stack the radios. Prefer this
 * when option labels are long, when comparison is easier line-by-line, or
 * when the group is the dominant element in its column.
 */
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { model: 'two' },
    template: `
      <novo-radio-group appearance="vertical" [(ngModel)]="model">
        <novo-radio value="one">Make me anything!</novo-radio>
        <novo-radio value="two" [disabled]="true">I'm disabled!</novo-radio>
        <novo-radio value="three">Really!</novo-radio>
      </novo-radio-group>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. ButtonStyle                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Set `button="true"` on each `<novo-radio>` to render the group as a
 * segmented button. Use this when the choice changes a view (sort order,
 * filter mode) and you want the selection to feel tactile rather than
 * formal.
 */
export const ButtonStyle: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { model: 'two' },
    template: `
      <novo-radio-group [(ngModel)]="model">
        <novo-radio button="true" name="button" value="one" label="One"></novo-radio>
        <novo-radio button="true" name="button" value="two" label="Two"></novo-radio>
        <novo-radio button="true" name="button" value="three" label="Three"></novo-radio>
        <novo-radio button="true" name="button" value="disabled" label="Disabled" [disabled]="true"></novo-radio>
      </novo-radio-group>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithIcons                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Combine `button="true"` with `theme="icon"` and an `icon` for an icon-only
 * picker — commonly used to switch between entity types or modes. Always
 * supply an `aria-label` on each item; the visual icon alone has nothing for
 * a screen reader to announce.
 */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { model: 'one' },
    template: `
      <novo-radio-group [(ngModel)]="model">
        <novo-radio button="true" theme="icon" icon="company" name="icon" value="one" aria-label="Company"></novo-radio>
        <novo-radio button="true" theme="icon" icon="job" name="icon" value="two" aria-label="Job"></novo-radio>
        <novo-radio button="true" theme="icon" icon="candidate" name="icon" value="three" aria-label="Candidate"></novo-radio>
        <novo-radio button="true" theme="icon" icon="opportunity" name="icon" value="disabled" [disabled]="true" aria-label="Opportunity"></novo-radio>
      </novo-radio-group>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Disable individual items by setting `[disabled]="true"` on the radio, or
 * disable every item at once by setting `[disabled]="true"` on the group.
 * Disabled items remain visible but are non-interactive and skipped in the
 * focus order.
 */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { individual: 'one', allDisabled: 'two' },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem;">One item disabled</h4>
          <novo-radio-group [(ngModel)]="individual">
            <novo-radio value="one">Enabled</novo-radio>
            <novo-radio value="two" [disabled]="true">Disabled</novo-radio>
            <novo-radio value="three">Enabled</novo-radio>
          </novo-radio-group>
        </div>
        <div>
          <h4 style="margin: 0 0 0.5rem;">Whole group disabled</h4>
          <novo-radio-group [(ngModel)]="allDisabled" [disabled]="true">
            <novo-radio value="one">Option one</novo-radio>
            <novo-radio value="two">Option two</novo-radio>
            <novo-radio value="three">Option three</novo-radio>
          </novo-radio-group>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every group-level input wired to a control. Sanity-check combinations or
 * copy a snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    appearance: 'horizontal',
    name: '',
    value: 'two',
    disabled: false,
    required: false,
    placeholder: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-radio-group
        [name]="name"
        [appearance]="appearance"
        [value]="value"
        [disabled]="disabled"
        [required]="required"
        [placeholder]="placeholder"
      >
        <novo-radio value="one">Option one</novo-radio>
        <novo-radio value="two">Option two</novo-radio>
        <novo-radio value="three">Option three</novo-radio>
      </novo-radio-group>
    `,
  }),
};
