import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Validators } from '@angular/forms';
import { userEvent, waitFor, expect } from 'storybook/test';

import { NovoFormElement } from './Form';
import { NovoFormModule } from './Form.module';
import { NovoFormControl } from './NovoFormControl';
import { NovoFormGroup } from './NovoFormGroup';
import { TextBoxControl } from './controls/textbox/TextBoxControl';
import { TextAreaControl } from './controls/text-area/TextAreaControl';
import { CheckboxControl } from './controls/checkbox/CheckboxControl';
import { CheckListControl } from './controls/check-list/CheckListControl';
import { TilesControl } from './controls/tiles/TilesControl';
import { SwitchControl } from './controls/switch/SwitchControl';
import { SelectControl } from './controls/select/SelectControl';
import { RadioControl } from './controls/radio/RadioControl';
import { DateControl } from './controls/date/DateControl';
import { TimeControl } from './controls/time/TimeControl';
import { DateTimeControl } from './controls/date-time/DateTimeControl';
import { FileControl } from './controls/file/FileControl';
import { AddressControl } from './controls/address/AddressControl';
import type { NovoControlConfig } from './controls/BaseControl';

/**
 * Stories for `<novo-form>` — the static-form wrapper that hosts
 * `<novo-control>` children driven by control-config objects. Conventions are
 * documented in `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * Scope note (Phase 4 / Tier 2): the form module is large — DynamicForm,
 * ControlGroup, FieldInteractionApi, dozens of control-config types, etc. These
 * stories focus on the high-leverage public surface: a `<novo-form>` containing
 * a few `<novo-control>` elements bound to a `NovoFormGroup`, plus a single
 * representative `<novo-dynamic-form>` story.
 */

/**
 * Builds a `NovoFormGroup` from a list of control configs the same way
 * `FormUtils.toFormGroup` does — sidestepping the `FormUtils` injectable so
 * stories don't need DI plumbing.
 */
function buildForm(controls: NovoControlConfig[]): NovoFormGroup {
  const group: { [key: string]: NovoFormControl } = {};
  controls.forEach((control) => {
    const value = control.value == null ? '' : control.value;
    group[control.key] = new NovoFormControl(value, control);
  });
  return new NovoFormGroup(group);
}

const meta: Meta<NovoFormElement> = {
  title: 'Form Controls/Form',
  component: NovoFormElement,
  decorators: [
    moduleMetadata({
      imports: [NovoFormModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`<novo-form>` is the static-form wrapper. It accepts a `NovoFormGroup` via the `[form]` ' +
          'input and renders `<novo-control>` children configured by typed `*Control` objects ' +
          '(`TextBoxControl`, `SelectControl`, `CheckboxControl`, …). Each control config carries its ' +
          'own label, validators, and behaviour — the form layer composes labels, required indicators, ' +
          'and error messaging on top. For configuration-driven forms with fieldsets, use ' +
          '`<novo-dynamic-form>` (also exported from this module).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<NovoFormElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                              */
/* -------------------------------------------------------------------------- */

/**
 * When to reach for `<novo-form>` vs. `<novo-dynamic-form>` vs. composing
 * `<novo-field>` directly. Covers the form-config pattern and the role of
 * each piece.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a form</h2>
        <p style="margin: 0 0 1.25rem;">
          Reach for <code>&lt;novo-form&gt;</code> when you want a small,
          curated set of fields wired up by hand — a settings panel, an inline
          edit, a contact form. Each field is a typed control-config object
          (<code>TextBoxControl</code>, <code>SelectControl</code>,
          <code>CheckboxControl</code>, …) and is rendered through
          <code>&lt;novo-control&gt;</code>. The form layer composes the label,
          required indicator, focus state, and error messaging on top.
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
              ✓ Use <code>&lt;novo-form&gt;</code> when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>You have a fixed, known-at-author-time set of fields</li>
              <li>You want consistent error / required / validation chrome across them</li>
              <li>You're building a settings panel, simple create dialog, or inline edit</li>
            </ul>
          </section>

          <section style="
            background: #eef4fb;
            border-left: 4px solid #3498db;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #1f5e8c;">
              → Use <code>&lt;novo-dynamic-form&gt;</code> when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Fields come from a backend meta-model (entity definitions, schema, etc.)</li>
              <li>You want grouped <em>fieldsets</em> with titles / icons</li>
              <li>You need "show all" / "show required-only" affordances out of the box</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Control config</strong> — a <code>TextBoxControl</code>,
            <code>SelectControl</code>, etc. Carries the field's
            <code>key</code>, <code>label</code>, <code>type</code>,
            <code>validators</code>, and any control-specific options.
          </li>
          <li>
            <strong><code>NovoFormGroup</code></strong> — the reactive form
            container. Built from control configs (typically via
            <code>FormUtils.toFormGroup(controls)</code>); each entry is a
            <code>NovoFormControl</code> that extends Angular's
            <code>FormControl</code> with the config metadata.
          </li>
          <li>
            <strong><code>&lt;novo-form&gt;</code></strong> — receives the
            form group via <code>[form]</code>. Hosts <code>&lt;novo-control&gt;</code>
            children inside its projected slot.
          </li>
          <li>
            <strong><code>&lt;novo-control&gt;</code></strong> — pairs a
            control config with the form group and renders the correct input
            (textbox, select, checkbox, …) with labels, required marker, and
            error messages.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Validation &amp; errors</h2>
        <p style="margin: 0 0 1.25rem;">
          Pass standard Angular validators on the control config's
          <code>validators</code> array, or set shorthands like
          <code>required: true</code>, <code>minlength</code>,
          <code>maxlength</code>, and <code>type: 'email'</code> — the base
          control wires those into the validator list for you. Error messages
          appear under the field once the control is marked dirty (i.e. after
          the user has interacted with it).
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Other things to know</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Use <code>form.showOnlyRequired(false)</code> /
            <code>form.showAllFields()</code> to toggle visibility of optional
            fields — handy on long edit screens.
          </li>
          <li>
            <code>form.value</code> returns <code>form.getRawValue()</code>;
            <code>form.isValid</code> is shorthand for <code>form.valid</code>.
          </li>
          <li>
            Field-level behaviour (conditional show/hide, cross-field rules,
            modal confirmations) is driven by the
            <code>FieldInteractionApi</code> — declared via the
            <code>interactions</code> array on each control config. Out of
            scope for these stories.
          </li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Minimal static form — three fields wired through a `NovoFormGroup`.
 * Demonstrates the canonical wiring: build a `*Control` config per field,
 * compose them into a form group, hand the group to `<novo-form>` and each
 * config to its `<novo-control>`.
 */
export const Default: Story = {
  parameters: {
    controls: { disable: true },
    // Surface the canonical wiring in the Source panel — consumers copy this
    // shape into their own component to author a form. The auto-extracted
    // story source would show buildForm() helpers and template strings; this
    // shows the recipe instead.
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormUtils } from 'novo-elements';
import { TextBoxControl, TextAreaControl } from 'novo-elements';

@Component({ ... })
export class MyFormComponent implements OnInit {
  firstName = new TextBoxControl({
    key: 'firstName', label: 'First Name', placeholder: 'Jane',
  });
  lastName = new TextBoxControl({
    key: 'lastName', label: 'Last Name', placeholder: 'Doe',
  });
  notes = new TextAreaControl({
    key: 'notes', label: 'Notes', placeholder: 'Anything we should know?',
  });
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([
      this.firstName, this.lastName, this.notes,
    ]);
  }
}

// component.html
<novo-form [form]="form">
  <div class="novo-form-row">
    <novo-control [form]="form" [control]="firstName"></novo-control>
  </div>
  <div class="novo-form-row">
    <novo-control [form]="form" [control]="lastName"></novo-control>
  </div>
  <div class="novo-form-row">
    <novo-control [form]="form" [control]="notes"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const firstName = new TextBoxControl({
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Jane',
    });
    const lastName = new TextBoxControl({
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Doe',
    });
    const notes = new TextAreaControl({
      key: 'notes',
      label: 'Notes',
      placeholder: 'Anything we should know?',
    });
    const form = buildForm([firstName, lastName, notes]);
    return {
      props: {
        form,
        firstName,
        lastName,
        notes,
      },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row">
            <novo-control [form]="form" [control]="firstName"></novo-control>
          </div>
          <div class="novo-form-row">
            <novo-control [form]="form" [control]="lastName"></novo-control>
          </div>
          <div class="novo-form-row">
            <novo-control [form]="form" [control]="notes"></novo-control>
          </div>
        </novo-form>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 3. WithValidation                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Required + email + min-length validation. The form layer surfaces a
 * standard error message under each field once the user has interacted with
 * it (the control becomes "dirty" after typing or blurring).
 *
 * A `play` function types an invalid value into the email field, blurs it,
 * and asserts that the error message appears in the DOM.
 */
export const WithValidation: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Validators } from '@angular/forms';
import { FormUtils, TextBoxControl } from 'novo-elements';

@Component({ ... })
export class MyValidatedFormComponent implements OnInit {
  email = new TextBoxControl({
    key: 'email', type: 'email', label: 'Email',
    required: true, placeholder: 'you@example.com',
  });
  password = new TextBoxControl({
    key: 'password', type: 'password', label: 'Password',
    required: true, minlength: 8,
    validators: [Validators.minLength(8)],
  });
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([this.email, this.password]);
  }
}

// component.html — error messaging is composed by <novo-control> based on
// the validator set on the FormControl. Standard required / minlength /
// maxlength / email-format errors render automatically.
<novo-form [form]="form">
  <div class="novo-form-row">
    <novo-control [form]="form" [control]="email"></novo-control>
  </div>
  <div class="novo-form-row">
    <novo-control [form]="form" [control]="password"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const email = new TextBoxControl({
      key: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'you@example.com',
    });
    const password = new TextBoxControl({
      key: 'password',
      label: 'Password',
      required: true,
      minlength: 8,
      type: 'password',
      validators: [Validators.minLength(8)],
    });
    const form = buildForm([email, password]);
    return {
      props: {
        form,
        email,
        password,
      },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row">
            <novo-control [form]="form" [control]="email"></novo-control>
          </div>
          <div class="novo-form-row">
            <novo-control [form]="form" [control]="password"></novo-control>
          </div>
        </novo-form>
        <div style="margin-top: 1rem; font-family: monospace; font-size: 0.85rem; color: #586069;">
          Valid: {{ form.valid }}
        </div>
      `,
    };
  },
  play: async ({ canvasElement, step }) => {
    // Each `<novo-control>` initially renders a fallback `<input type="text">`
    // (unbound) and only swaps in the real template-driven input on a
    // setTimeout in ngOnInit. Wait for the real password input — it carries
    // `type="password"` from the TextBoxControl config — before interacting.
    // The fallback silently accepts keystrokes without updating the
    // FormControl, so validators would never fire.
    let passwordInput: HTMLInputElement | null = null;
    await step('Wait for the form template to finish initializing', async () => {
      await waitFor(async () => {
        passwordInput = canvasElement.querySelector(
          'input[type="password"]',
        ) as HTMLInputElement | null;
        await expect(passwordInput).not.toBeNull();
      });
    });

    await step('Focus the password field', async () => {
      await userEvent.click(passwordInput!);
    });

    await step('Type a too-short password (3 chars, minLength is 8)', async () => {
      await userEvent.type(passwordInput!, 'abc');
    });

    await step('Tab away to fire blur and mark the control touched', async () => {
      await userEvent.tab();
    });

    await step('Verify the minlength error message appears', async () => {
      await waitFor(async () => {
        const error = canvasElement.querySelector('.field-message .error-text');
        await expect(error).not.toBeNull();
      });
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 4. TextControls                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Text-based controls. `TextBoxControl` covers seven typed variants
 * (`text` / `email` / `number` / `currency` / `float` / `percentage` plus
 * the masked variant) under one config class. `TextAreaControl` wraps
 * a multi-line input. Use these for any single-value text capture; reach
 * for `<novo-input>` directly only when you need control over the layout
 * outside the form framework.
 */
export const TextControls: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormUtils, TextBoxControl, TextAreaControl } from 'novo-elements';

@Component({ ... })
export class MyTextFormComponent implements OnInit {
  // TextBoxControl supports several typed variants via the \`type\` config:
  // 'text' (default), 'email', 'number', 'currency', 'float', 'percentage'.
  // Set \`textMaskEnabled: true\` plus \`maskOptions\` to drive the imask
  // integration for masked input (hex codes, phone numbers, etc.).
  controls = [
    new TextBoxControl({ key: 'text', label: 'Text', required: true }),
    new TextBoxControl({ key: 'email', type: 'email', label: 'Email' }),
    new TextBoxControl({ key: 'number', type: 'number', label: 'Number' }),
    new TextBoxControl({
      key: 'currency', type: 'currency', label: 'Currency',
      currencyFormat: '$ USD',
    }),
    new TextBoxControl({ key: 'float', type: 'float', label: 'Float' }),
    new TextBoxControl({
      key: 'percentage', type: 'percentage', label: 'Percent', required: true,
    }),
    new TextBoxControl({
      key: 'textmask', label: 'Text with hex mask',
      maxlength: 10,
      textMaskEnabled: true,
      maskOptions: { mask: /^[\\da-fA-F]{0,10}$/, keepCharPositions: false, guide: false },
    }),
    new TextAreaControl({ key: 'textarea', label: 'Text Area' }),
  ];
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup(this.controls);
  }
}

// component.html
<novo-form [form]="form">
  <div class="novo-form-row" *ngFor="let control of controls">
    <novo-control [form]="form" [control]="control"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const text = new TextBoxControl({ key: 'text', label: 'Text', value: 'HI', required: true });
    const email = new TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
    const number = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
    const currency = new TextBoxControl({
      type: 'currency',
      key: 'currency',
      label: 'Currency',
      currencyFormat: '$ USD',
    });
    const float = new TextBoxControl({ type: 'float', key: 'float', label: 'Float' });
    const percentage = new TextBoxControl({
      type: 'percentage',
      key: 'percentage',
      label: 'Percent',
      required: true,
    });
    const textMask = new TextBoxControl({
      key: 'textmask',
      maxlength: 10,
      label: 'Text with hex mask',
      textMaskEnabled: true,
      maskOptions: { mask: /^[\da-fA-F]{0,10}$/, keepCharPositions: false, guide: false },
      value: '9F',
    });
    const textarea = new TextAreaControl({ key: 'textarea', label: 'Text Area', value: '' });

    const controls = [text, email, number, currency, float, percentage, textMask, textarea];
    const form = buildForm(controls);
    return {
      props: { form, controls },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row" *ngFor="let control of controls">
            <novo-control [form]="form" [control]="control"></novo-control>
          </div>
        </novo-form>
        <pre style="margin-top: 1rem; font-size: 0.85rem; color: #5b6770;">Value: {{ form.value | json }}</pre>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 5. CheckboxControls                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Boolean and selection controls. `CheckboxControl` and `SwitchControl`
 * are single-value booleans; `CheckListControl` and `TilesControl` are
 * multi-option pickers — pick `TilesControl` when the options carry
 * additional metadata or need to read as buttons.
 */
export const CheckboxControls: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import {
  FormUtils,
  CheckboxControl, SwitchControl,
  CheckListControl, TilesControl,
} from 'novo-elements';

@Component({ ... })
export class MyCheckboxFormComponent implements OnInit {
  controls = [
    // Single-value booleans
    new CheckboxControl({ key: 'check', label: 'Checkbox', checkboxLabel: 'Checkbox' }),
    new SwitchControl({ key: 'switch', label: 'Switch', checkboxLabel: 'Switch' }),

    // Multi-option pickers
    new CheckListControl({
      key: 'checklist', label: 'Check List',
      options: ['One', 'Two', 'Three'],
    }),
    new TilesControl({
      key: 'tiles', label: 'Tiles',
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ],
    }),
  ];
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup(this.controls);
  }
}

// component.html
<novo-form [form]="form">
  <div class="novo-form-row" *ngFor="let control of controls">
    <novo-control [form]="form" [control]="control"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const check = new CheckboxControl({ key: 'check', label: 'Checkbox', checkboxLabel: 'Checkbox' });
    const switchCtl = new SwitchControl({ key: 'switch', label: 'Switch', checkboxLabel: 'Switch' });
    const checkList = new CheckListControl({
      key: 'checklist',
      label: 'Check List',
      options: ['One', 'Two', 'Three'],
    });
    const tiles = new TilesControl({
      key: 'tiles',
      label: 'Tiles',
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ],
    });

    const controls = [check, switchCtl, checkList, tiles];
    const form = buildForm(controls);
    return {
      props: { form, controls },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row" *ngFor="let control of controls">
            <novo-control [form]="form" [control]="control"></novo-control>
          </div>
        </novo-form>
        <pre style="margin-top: 1rem; font-size: 0.85rem; color: #5b6770;">Value: {{ form.value | json }}</pre>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 6. CalendarControls                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Date, time, and date-time controls. Each renders the corresponding
 * picker overlay inside a `<novo-field>` and emits a `Date` (or
 * `{ startDate, endDate }` for ranges). For full picker stories, see the
 * Date Picker / Date Time Picker pages in `Form Controls/`.
 */
export const CalendarControls: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import {
  FormUtils,
  DateControl, TimeControl, DateTimeControl,
} from 'novo-elements';

@Component({ ... })
export class MyCalendarFormComponent implements OnInit {
  // Each control wires the matching picker overlay automatically and
  // emits a \`Date\` (or \`{ startDate, endDate }\` for date ranges).
  controls = [
    new DateControl({ key: 'date', label: 'Date' }),
    new TimeControl({ key: 'time', label: 'Time' }),
    new DateTimeControl({ key: 'datetime', label: 'Date and Time' }),
  ];
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup(this.controls);
  }
}

// component.html
<novo-form [form]="form">
  <div class="novo-form-row" *ngFor="let control of controls">
    <novo-control [form]="form" [control]="control"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const date = new DateControl({ key: 'date', label: 'Date' });
    const time = new TimeControl({ key: 'time', label: 'Time' });
    const datetime = new DateTimeControl({ key: 'datetime', label: 'Date and Time' });

    const controls = [date, time, datetime];
    const form = buildForm(controls);
    return {
      props: { form, controls },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row" *ngFor="let control of controls">
            <novo-control [form]="form" [control]="control"></novo-control>
          </div>
        </novo-form>
        <pre style="margin-top: 1rem; font-size: 0.85rem; color: #5b6770;">Value: {{ form.value | json }}</pre>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 7. PickerControls                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Single-select pickers. `SelectControl` renders a dropdown; `RadioControl`
 * renders a radio group. Both bind a single value from an `options` array
 * with `{ label, value }` entries.
 */
export const PickerControls: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormUtils, SelectControl, RadioControl } from 'novo-elements';

@Component({ ... })
export class MyPickerFormComponent implements OnInit {
  controls = [
    new SelectControl({
      key: 'role', label: 'Role',
      options: [
        { label: 'Admin',          value: 'admin' },
        { label: 'Recruiter',      value: 'recruiter' },
        { label: 'Hiring Manager', value: 'manager' },
      ],
    }),
    new RadioControl({
      key: 'status', label: 'Status',
      options: [
        { label: 'Active',   value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Archived', value: 'archived' },
      ],
    }),
  ];
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup(this.controls);
  }
}

// component.html
<novo-form [form]="form">
  <div class="novo-form-row" *ngFor="let control of controls">
    <novo-control [form]="form" [control]="control"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const role = new SelectControl({
      key: 'role',
      label: 'Role',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Recruiter', value: 'recruiter' },
        { label: 'Hiring Manager', value: 'manager' },
      ],
    });
    const status = new RadioControl({
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Archived', value: 'archived' },
      ],
    });

    const controls = [role, status];
    const form = buildForm(controls);
    return {
      props: { form, controls },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row" *ngFor="let control of controls">
            <novo-control [form]="form" [control]="control"></novo-control>
          </div>
        </novo-form>
        <pre style="margin-top: 1rem; font-size: 0.85rem; color: #5b6770;">Value: {{ form.value | json }}</pre>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 8. FileControls                                                            */
/* -------------------------------------------------------------------------- */

/**
 * File upload control. `FileControl` exposes single- and multi-file modes
 * via the `multiple` config; the rendered widget includes drag-and-drop,
 * filename listing, and removal affordances.
 */
export const FileControls: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormUtils, FileControl } from 'novo-elements';

@Component({ ... })
export class MyFileFormComponent implements OnInit {
  controls = [
    new FileControl({ key: 'attachment',  label: 'Attachment' }),
    new FileControl({ key: 'attachments', label: 'Attachments', multiple: true }),
  ];
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup(this.controls);
  }
}

// component.html — \`layout="vertical"\` stacks the file controls so each
// upload affordance gets full row width.
<novo-form [form]="form" layout="vertical">
  <div class="novo-form-row" *ngFor="let control of controls">
    <novo-control [form]="form" [control]="control"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    const singleFile = new FileControl({ key: 'attachment', label: 'Attachment' });
    const multiFile = new FileControl({
      key: 'attachments',
      label: 'Attachments',
      multiple: true,
    } as NovoControlConfig);

    const controls = [singleFile, multiFile];
    const form = buildForm(controls);
    return {
      props: { form, controls },
      template: `
        <novo-form [form]="form" layout="vertical">
          <div class="novo-form-row" *ngFor="let control of controls">
            <novo-control [form]="form" [control]="control"></novo-control>
          </div>
        </novo-form>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 9. AddressControl                                                          */
/* -------------------------------------------------------------------------- */

/**
 * `AddressControl` renders a composite address form — address1, address2,
 * city, state, zip/postal code, country — under a single control config
 * and emits an object value with the same shape.
 */
export const AddressControlStory: Story = {
  name: 'AddressControl',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormUtils, AddressControl } from 'novo-elements';

@Component({ ... })
export class MyAddressFormComponent implements OnInit {
  // AddressControl is config-driven. The \`config\` map declares which
  // address fields render — anything not declared is hidden. The bound
  // value is an object keyed by field name.
  address = new AddressControl({
    key: 'address',
    label: 'Mailing address',
    config: {
      address1: { label: 'Address line 1' },
      address2: { label: 'Address line 2' },
      city:     { label: 'City' },
      state:    { label: 'State' },
      zip:      { label: 'Zip code' },
      countryID: { label: 'Country' },
    },
    value: {},
  });
  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([this.address]);
  }
}

// component.html
<novo-form [form]="form">
  <div class="novo-form-row">
    <novo-control [form]="form" [control]="address"></novo-control>
  </div>
</novo-form>`,
      },
    },
  },
  render: () => {
    // AddressControl is config-driven: every field in `config` is rendered;
    // any field not declared defaults to `hidden: true` and disappears. The
    // value is an object keyed by field name.
    const address = new AddressControl({
      key: 'address',
      label: 'Mailing address',
      config: {
        address1: { label: 'Address line 1' },
        address2: { label: 'Address line 2' },
        city: { label: 'City' },
        state: { label: 'State' },
        zip: { label: 'Zip code' },
        countryID: { label: 'Country' },
      },
      value: {},
    } as NovoControlConfig);
    const form = buildForm([address]);
    return {
      props: { form, control: address },
      template: `
        <novo-form [form]="form">
          <div class="novo-form-row">
            <novo-control [form]="form" [control]="control"></novo-control>
          </div>
        </novo-form>
        <pre style="margin-top: 1rem; font-size: 0.85rem; color: #5b6770;">Value: {{ form.value | json }}</pre>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 10. DynamicForm                                                            */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-dynamic-form>` is the configuration-driven sibling of
 * `<novo-form>`. Instead of authoring each `<novo-control>` by hand, hand it
 * an array of *fieldsets* — each fieldset is a `{ title, icon, controls }`
 * group, and the dynamic form renders the whole thing.
 *
 * One representative story; the full surface (entity meta → fieldsets via
 * `FormUtils.toFieldSets`, custom templates, field interactions) is out of
 * scope for Tier 2 — see the examples app for those.
 */
export const DynamicForm: Story = {
  parameters: {
    controls: { disable: true },
    // Canonical wiring for the dynamic-form pattern — control configs +
    // fieldset groupings + single `<novo-dynamic-form>` element.
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormUtils } from 'novo-elements';
import {
  TextBoxControl, SelectControl, CheckboxControl,
} from 'novo-elements';

@Component({ ... })
export class MyDynamicFormComponent implements OnInit {
  firstName = new TextBoxControl({ key: 'firstName', label: 'First Name', required: true });
  lastName  = new TextBoxControl({ key: 'lastName',  label: 'Last Name',  required: true });
  email     = new TextBoxControl({ key: 'email', type: 'email', label: 'Email', required: true });
  role      = new SelectControl({
    key: 'role', label: 'Role',
    options: [
      { label: 'Admin',          value: 'admin' },
      { label: 'Recruiter',      value: 'recruiter' },
      { label: 'Hiring Manager', value: 'manager' },
    ],
  });
  subscribed = new CheckboxControl({ key: 'subscribed', label: 'Subscribe to product updates' });

  // Fieldsets are { title, icon, controls } groupings rendered as labelled
  // sections inside the dynamic form.
  fieldsets = [
    { title: 'Identity', icon: 'bhi-user',     controls: [this.firstName, this.lastName] },
    { title: 'Account',  icon: 'bhi-settings', controls: [this.email, this.role, this.subscribed] },
  ];

  form!: NovoFormGroup;

  constructor(private formUtils: FormUtils) {}

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([
      this.firstName, this.lastName, this.email, this.role, this.subscribed,
    ]);
  }
}

// component.html
<novo-dynamic-form [form]="form" [fieldsets]="fieldsets"></novo-dynamic-form>`,
      },
    },
  },
  render: () => {
    const firstName = new TextBoxControl({
      key: 'firstName',
      label: 'First Name',
      required: true,
    });
    const lastName = new TextBoxControl({
      key: 'lastName',
      label: 'Last Name',
      required: true,
    });
    const email = new TextBoxControl({
      key: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    });
    const role = new SelectControl({
      key: 'role',
      label: 'Role',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Recruiter', value: 'recruiter' },
        { label: 'Hiring Manager', value: 'manager' },
      ],
    });
    const subscribed = new CheckboxControl({
      key: 'subscribed',
      label: 'Subscribe to product updates',
    });

    const fieldsets = [
      {
        title: 'Identity',
        icon: 'bhi-user',
        controls: [firstName, lastName],
      },
      {
        title: 'Account',
        icon: 'bhi-settings',
        controls: [email, role, subscribed],
      },
    ];
    const form = buildForm([firstName, lastName, email, role, subscribed]);
    return {
      props: {
        form,
        fieldsets,
      },
      template: `
        <novo-dynamic-form [form]="form" [fieldsets]="fieldsets"></novo-dynamic-form>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* Playground — intentionally omitted                                         */
/* -------------------------------------------------------------------------- */
//
// `<novo-form>` has no useful Playground story. Other Tier 2 components have
// a small, flat set of input props that argTypes controls can drive in
// isolation; `<novo-form>` is configuration-driven — its surface is a
// `NovoFormGroup` plus per-field `*Control` configs, not a handful of
// individual `@Input()`s. The category-specific stories above
// (`TextControls`, `CheckboxControls`, `CalendarControls`, `PickerControls`,
// `FileControls`, `AddressControl`, `DynamicForm`) already exercise the
// realistic combinations a Playground would otherwise try to fold into one
// story; collapsing them into a single args-driven panel would either lose
// most of that signal or require a bespoke meta-config UI.
//
// If a future change makes a small subset of form inputs (e.g. `layout`,
// `hideLabel`) worth exposing as controls, add a Playground story then.
