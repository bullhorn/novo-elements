import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { NovoCheckboxElement } from './Checkbox';
import { NovoCheckboxModule } from './Checkbox.module';

/**
 * Stories for `<novo-checkbox>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 */
const meta: Meta<NovoCheckboxElement> = {
  title: 'Form Controls/Checkbox',
  component: NovoCheckboxElement,
  decorators: [
    moduleMetadata({
      imports: [NovoCheckboxModule, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A binary toggle for an individual option, or a multi-select within a group. Supports the standard ' +
          '`checked` / `indeterminate` / `disabled` states, integrates with `ngModel` and reactive forms via ' +
          '`ControlValueAccessor`, and ships a sibling `<novo-check-list>` for rendering a flat list of options.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'Label text rendered next to the box. When omitted, projected `<ng-content>` is used instead — useful for richer label markup.',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked. Two-way bindable via `ngModel` or `[(checked)]`.',
    },
    indeterminate: {
      control: 'boolean',
      description:
        'Renders the third "mixed" state — typically used on a parent checkbox when only some of its children are selected. ' +
        'Automatically clears on user click. Sets `aria-checked="mixed"`.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, the checkbox is non-interactive and visually muted.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the underlying native input as required for form validation.',
    },
    name: {
      control: 'text',
      description: 'Native input `name` attribute. Defaults to an auto-generated unique id.',
    },
    value: {
      control: 'text',
      description: 'Native input `value` attribute — useful when grouping checkboxes by `name` for form submission.',
    },
    color: {
      control: 'text',
      description: 'Optional color hook for theming the checked-state fill.',
    },
    tabIndex: {
      control: 'number',
      description: 'Tab order for the underlying input. Inherited from the host `tabindex` attribute by default.',
    },
    ariaLabel: {
      control: 'text',
      description: '`aria-label` for the input. Required when no visible `label` (or projected text) is present.',
    },
    ariaLabelledby: {
      control: 'text',
      description: '`aria-labelledby` — id of an external element labelling this checkbox. Takes precedence over `ariaLabel`.',
    },
    ariaDescribedby: {
      control: 'text',
      description: '`aria-describedby` — id of an external element providing additional description (e.g. helper text).',
    },
  },
};

export default meta;
type Story = StoryObj<NovoCheckboxElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a checkbox over a radio,
 * switch, or select; the anatomy of the control; the third "indeterminate"
 * state and how to use it; and accessibility requirements.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a checkbox</h2>
        <p style="margin: 0 0 1.25rem;">
          A checkbox represents a <strong>binary choice</strong>: either an
          option is selected or it isn't. Use one or more checkboxes when the
          user can toggle independent options on or off — for a mutually
          exclusive choice, reach for a radio group instead.
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
              ✓ Use a checkbox when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Toggling a single boolean setting (e.g. "Remember me")</li>
              <li>Selecting zero, one, or multiple items from a flat list of options</li>
              <li>Accepting terms or confirming an opt-in</li>
              <li>Indicating a partial-selection state on a parent (indeterminate)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a checkbox when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Exactly one option from a set must be chosen — use a radio group</li>
              <li>Immediately turning a system setting on/off — use a switch</li>
              <li>Selecting from a long list (10+ items) — use a multi-select</li>
              <li>Triggering an action — use a button</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A checkbox is composed of three parts. The box and label are always
          present in a labelled checkbox; the indeterminate glyph replaces the
          checkmark when the third state is set.
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Box</strong> — the interactive square. Empty when
            unchecked, filled with a checkmark when checked, and filled with a
            horizontal bar when indeterminate.
          </li>
          <li>
            <strong>Label</strong> — set via the <code>label</code> input or
            projected as <code>&lt;ng-content&gt;</code>. Clicking the label
            toggles the box. Omit only when the surrounding markup already
            labels the control via <code>aria-labelledby</code>.
          </li>
          <li>
            <strong>Helper / description</strong> (optional, external) — when
            the option needs more context, place helper text adjacent and wire
            it via <code>aria-describedby</code>.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">The indeterminate state</h2>
        <p style="margin: 0 0 1.25rem;">
          <code>indeterminate</code> is a <em>visual</em> third state — the
          underlying value is still boolean. Use it on a parent checkbox when
          its child checkboxes are partially selected. The component clears
          <code>indeterminate</code> automatically on the next user click, so
          you only need to set it, not unset it.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <strong>Every checkbox needs an accessible name.</strong> Provide
            it via the <code>label</code> input, projected text content, or
            <code>aria-label</code> / <code>aria-labelledby</code> when the
            visual label lives elsewhere.
          </li>
          <li>
            <code>Space</code> toggles the checkbox; <code>Tab</code> moves
            focus through the form as usual.
          </li>
          <li>
            The component sets <code>aria-checked</code> automatically —
            <code>"true"</code>, <code>"false"</code>, or <code>"mixed"</code>
            when <code>indeterminate</code> is set.
          </li>
          <li>
            Don't rely on color alone to convey selection state — the
            checkmark/empty glyph carries the meaning for users who can't see
            the fill color.
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
 * The simplest checkbox — a `label` plus two-way binding via `ngModel`. Every
 * input is bound so each control in the panel mutates the render; tick
 * `checked` in the controls panel to flip the box.
 */
export const Default: Story = {
  args: {
    label: 'I agree to the terms',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-checkbox
        [label]="label"
        [(ngModel)]="checked"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [required]="required"
        [name]="name"
        [value]="value"
        [color]="color"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby || null"
        [attr.aria-describedby]="ariaDescribedby || null"
      ></novo-checkbox>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. States                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * The six combinations of the three visual states (`checked`, `indeterminate`,
 * `disabled`). Indeterminate is purely a visual third state — the underlying
 * value remains boolean.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <novo-checkbox label="Unchecked"></novo-checkbox>
        <novo-checkbox label="Checked" [checked]="true"></novo-checkbox>
        <novo-checkbox label="Indeterminate" [checked]="true" [indeterminate]="true"></novo-checkbox>
        <novo-checkbox label="Disabled" [disabled]="true"></novo-checkbox>
        <novo-checkbox label="Disabled and Checked" [checked]="true" [disabled]="true"></novo-checkbox>
        <novo-checkbox label="Disabled and Indeterminate" [checked]="true" [indeterminate]="true" [disabled]="true"></novo-checkbox>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Indeterminate                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Canonical use of `indeterminate`: a parent checkbox reflecting the state of
 * its children. The parent shows the mixed glyph when some — but not all —
 * children are selected. The component clears `indeterminate` automatically
 * on the next user click, so you only need to drive it from your child state.
 */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      parentChecked: true,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <novo-checkbox label="Select all" [checked]="parentChecked" [indeterminate]="true"></novo-checkbox>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-left: 1.5rem;">
          <novo-checkbox label="Option A" [checked]="true"></novo-checkbox>
          <novo-checkbox label="Option B"></novo-checkbox>
          <novo-checkbox label="Option C" [checked]="true"></novo-checkbox>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. ProjectedLabel                                                           */
/* -------------------------------------------------------------------------- */

/**
 * When the `label` input isn't expressive enough, omit it and project richer
 * markup as content. The label still toggles the box on click.
 */
export const ProjectedLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <novo-checkbox>
          I accept the <a href="#" (click)="$event.stopPropagation()">Terms of Service</a>
        </novo-checkbox>
        <novo-checkbox>
          <strong>Email me</strong> about product updates
        </novo-checkbox>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. CheckList                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The sibling `<novo-check-list>` component renders a flat list of checkboxes
 * from an `options` array. Each option is `{ label, value, checked }`. The
 * component implements `ControlValueAccessor`, so the value emitted via
 * `ngModel` is the array of selected `value`s.
 */
export const CheckList: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      options1: [
        { label: 'Unchecked', checked: false, value: 1 },
        { label: 'Checked', checked: true, value: 2 },
        { label: 'Another option', checked: false, value: 3 },
      ],
      options2: [
        { label: 'Unchecked', checked: false, value: 4 },
        { label: 'Checked', checked: true, value: 5 },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Enabled</div>
          <novo-check-list [options]="options1"></novo-check-list>
        </div>
        <div>
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Disabled</div>
          <novo-check-list [options]="options2" [disabled]="true"></novo-check-list>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    label: 'Playground checkbox',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    name: '',
    value: '',
    color: '',
    tabIndex: 0,
    ariaLabel: '',
    ariaLabelledby: '',
    ariaDescribedby: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-checkbox
        [label]="label"
        [(ngModel)]="checked"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [required]="required"
        [name]="name"
        [value]="value"
        [color]="color"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby || null"
        [attr.aria-describedby]="ariaDescribedby || null"
      ></novo-checkbox>
    `,
  }),
};
