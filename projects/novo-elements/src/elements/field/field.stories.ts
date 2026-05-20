import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';

import { NovoFieldElement } from './field';
import { NovoFieldModule } from './field.module';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';

/**
 * Stories for `<novo-field>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts` — see that
 * file for the full convention reference.
 *
 * `<novo-field>` is a wrapper, so every story renders it *containing* a
 * control (a `<input novoInput>` or a `<textarea novoInput>` / `<select
 * novoInput>`). An empty `<novo-field>` will throw `Missing Novo Control`
 * at runtime — every story here must include a `NovoFieldControl` child.
 */
const meta: Meta<NovoFieldElement> = {
  title: 'Form Controls/Field',
  component: NovoFieldElement,
  decorators: [
    moduleMetadata({
      // NovoFieldModule pulls in `<novo-label>`, the prefix/suffix
      // directives, hint, error, the `novoInput` directive, the format
      // directives (`dateFormat`, `timeFormat`, etc.), `<novo-picker-toggle>`,
      // and the `[picker]` directive. The peer modules below are imported
      // explicitly so story templates can use them inside the field:
      //
      //   NovoIconModule       — <novo-icon> inside novoPrefix / novoSuffix
      //   NovoCommonModule     — <novo-text> for prefix/suffix text labels
      //   NovoChipsModule      — <novo-chip> embedded inside a rich label
      //   NovoSelectModule     — <novo-select> as a NovoFieldControl
      //   NovoDatePickerModule, NovoTimePickerModule, NovoDateTimePickerModule
      //                        — inline picker components for the
      //                          `<novo-picker-toggle>` pattern
      imports: [
        NovoFieldModule,
        NovoIconModule,
        NovoCommonModule,
        NovoChipsModule,
        NovoSelectModule,
        NovoOptionModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoDateTimePickerModule,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper that gives a form control a label, hint, error message, and prefix/suffix affordances. ' +
          'Always wraps an `[novoInput]` control (native `<input>` / `<textarea>` / `<select>`, or one of the ' +
          'novo-elements pickers). Pick an `appearance` (`standard` / `fill` / `outline` / `list`) and a ' +
          '`layout` (`vertical` / `horizontal`) to match the form\'s visual treatment.',
      },
    },
  },
  argTypes: {
    appearance: {
      control: 'radio',
      options: ['standard', 'fill', 'outline', 'list'],
      description: 'Visual treatment for the field container.',
      table: { defaultValue: { summary: 'standard' } },
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Stacks the label above the input (`vertical`) or beside it (`horizontal`).',
      table: { defaultValue: { summary: 'vertical' } },
    },
    width: {
      control: 'text',
      description: 'Optional CSS width applied to the input container (e.g. `"320px"`, `"100%"`).',
    },
  },
};

export default meta;
type Story = StoryObj<NovoFieldElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to wrap a control in `<novo-field>`,
 * the anatomy of the wrapper, the four `appearance` treatments, and the
 * accessibility wiring it provides for free.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a field</h2>
        <p style="margin: 0 0 1.25rem;">
          A <strong>field</strong> wraps a form control to give it the standard
          novo-elements visual treatment — label, hint, error, and optional
          prefix/suffix affordances. "Form field" refers to the wrapper
          (<code>&lt;novo-field&gt;</code>); "form field control" refers to the
          input it contains (<code>&lt;input novoInput&gt;</code>,
          <code>&lt;textarea novoInput&gt;</code>, <code>&lt;novo-select&gt;</code>, etc.).
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
              ✓ Use a field when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Collecting free-form text or numeric input</li>
              <li>Wrapping a <code>&lt;novo-select&gt;</code> or date/time picker</li>
              <li>You need a labelled control with hint and/or error messaging</li>
              <li>You need prefix/suffix affordances (currency symbol, picker toggle icon, etc.)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a field when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user is selecting from a small fixed set — use a radio group or chips</li>
              <li>Toggling a boolean — use a checkbox or switch</li>
              <li>The control is purely display (read-only label) — use plain text</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          A field is composed of slots projected by selector. Only the
          <code>NovoFieldControl</code> (the <code>novoInput</code>-bearing
          element) is required — everything else is optional.
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
            src="/assets/images/FieldAnatomy.png"
            alt="Annotated field showing label, prefix, input, suffix, and hint slots"
            style="width: 100%; max-width: 420px; height: auto; display: block;"
          />
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li>
              <strong>Container</strong> — <code>&lt;novo-field&gt;</code> itself.
              <code>layout</code> sets horizontal vs. vertical;
              <code>appearance</code> sets the visual treatment.
            </li>
            <li>
              <strong>Label</strong> — <code>&lt;novo-label&gt;</code>. Clicking
              the label focuses the inner control.
            </li>
            <li>
              <strong>Prefix</strong> (optional) — any element with the
              <code>novoPrefix</code> attribute (icon, currency symbol, etc.).
            </li>
            <li>
              <strong>Input control</strong> — the projected
              <code>[novoInput]</code> element. <strong>Required.</strong>
            </li>
            <li>
              <strong>Suffix</strong> (optional) — any element with the
              <code>novoSuffix</code> attribute. Often a
              <code>&lt;novo-picker-toggle&gt;</code> for date/time fields.
            </li>
            <li>
              <strong>Hint / Error</strong> (optional) —
              <code>&lt;novo-hint&gt;</code> for helper text;
              <code>&lt;novo-error&gt;</code> for validation errors. When the
              control is in an error state, errors replace hints automatically.
            </li>
          </ol>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Appearances</h2>
        <p style="margin: 0 0 1rem;">
          Four <code>appearance</code> values cover the supported visual
          treatments. <code>standard</code> is the default and most common
          choice; the others suit specific surfaces.
        </p>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li><strong>standard</strong> — underlined input, no background. Default.</li>
          <li><strong>fill</strong> — tinted background, underline on focus.</li>
          <li><strong>outline</strong> — bordered container; useful on busy surfaces.</li>
          <li><strong>list</strong> — minimal treatment for read-mostly key/value lists.</li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <strong>The <code>&lt;novo-label&gt;</code> is wired to the inner
            control for free.</strong> Clicking the label focuses the input;
            screen readers announce the label as the control's accessible name.
          </li>
          <li>
            <strong>Hints are associated via <code>aria-describedby</code>.</strong>
            The wrapper stitches together the hint and error element ids and
            forwards them to the control automatically.
          </li>
          <li>
            <strong>Error state is driven by the inner control's <code>errorState</code>.</strong>
            With Angular forms, this flips when the underlying
            <code>FormControl</code> / <code>NgModel</code> is invalid <em>and</em>
            touched (or its parent form has been submitted). <code>&lt;novo-error&gt;</code>
            content replaces <code>&lt;novo-hint&gt;</code> content while
            <code>errorState</code> is true.
          </li>
          <li>
            <strong>Every field needs a label.</strong> Either project a
            <code>&lt;novo-label&gt;</code> or, when the control is labelled by
            external markup, set <code>aria-labelledby</code> on the input.
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
 * The simplest possible field — a label and a native text input. Every input
 * is bound so the panel's controls mutate the render. `<novo-field>` requires
 * a `NovoFieldControl` child; here that's the `<input novoInput>` element.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoInputModule } from 'novo-elements';

// <novo-field> requires a NovoFieldControl child (most commonly the novoInput
// directive on a native input/textarea/select). Empty fields throw
// "Missing Novo Control" at ngAfterContentInit.
@Component({
  selector: 'my-field-demo',
  imports: [NovoFieldModule, NovoInputModule],
  templateUrl: './my-field-demo.component.html',
})
export class MyFieldDemoComponent {
  appearance: 'standard' | 'fill' | 'outline' | 'list' = 'standard';
  layout: 'vertical' | 'horizontal' = 'vertical';
}

// component.html
<novo-field [appearance]="appearance" [layout]="layout">
  <novo-label>Favorite food</novo-label>
  <input novoInput type="text" placeholder="Ex. Pizza" />
</novo-field>`,
      },
    },
  },
  args: {
    appearance: 'standard',
    layout: 'vertical',
    width: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-field [appearance]="appearance" [layout]="layout" [width]="width">
        <novo-label>Favorite food</novo-label>
        <input novoInput type="text" placeholder="Ex. Pizza" value="Sushi" />
      </novo-field>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Appearances                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The four `appearance` values side-by-side. `standard` is the default and is
 * what most forms should use; `fill` and `outline` suit specific surfaces;
 * `list` is for compact read-mostly contexts.
 */
export const Appearances: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoInputModule } from 'novo-elements';

@Component({
  selector: 'my-appearances-demo',
  imports: [NovoFieldModule, NovoInputModule],
  templateUrl: './my-appearances-demo.component.html',
})
export class MyAppearancesDemoComponent {}

// component.html
<novo-field appearance="standard"><novo-label>Standard</novo-label><input novoInput type="text" /></novo-field>
<novo-field appearance="fill"><novo-label>Fill</novo-label><input novoInput type="text" /></novo-field>
<novo-field appearance="outline"><novo-label>Outline</novo-label><input novoInput type="text" /></novo-field>
<novo-field appearance="list"><novo-label>List</novo-label><input novoInput type="text" /></novo-field>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 360px;">
        <novo-field appearance="standard">
          <novo-label>Standard</novo-label>
          <input novoInput type="text" placeholder="Underlined" />
        </novo-field>
        <novo-field appearance="fill">
          <novo-label>Fill</novo-label>
          <input novoInput type="text" placeholder="Tinted background" />
        </novo-field>
        <novo-field appearance="outline">
          <novo-label>Outline</novo-label>
          <input novoInput type="text" placeholder="Bordered" />
        </novo-field>
        <novo-field appearance="list">
          <novo-label>List</novo-label>
          <input novoInput type="text" placeholder="Minimal" />
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. Layouts                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `layout="vertical"` stacks the label above the control (default).
 * `layout="horizontal"` places the label inline with the control — good for
 * forms with short labels or read-mostly key/value lists.
 */
export const Layouts: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoInputModule } from 'novo-elements';

@Component({
  selector: 'my-layouts-demo',
  imports: [NovoFieldModule, NovoInputModule],
  templateUrl: './my-layouts-demo.component.html',
})
export class MyLayoutsDemoComponent {}

// component.html
<novo-field layout="vertical"><novo-label>Vertical</novo-label><input novoInput type="text" /></novo-field>
<novo-field layout="horizontal"><novo-label>Horizontal</novo-label><input novoInput type="text" /></novo-field>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 420px;">
        <novo-field layout="vertical">
          <novo-label>Vertical</novo-label>
          <input novoInput type="text" placeholder="Stacked" />
        </novo-field>
        <novo-field layout="horizontal">
          <novo-label>Horizontal</novo-label>
          <input novoInput type="text" placeholder="Inline" />
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WithHint                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Project a `<novo-hint>` for helper text. Use `align="end"` to push a hint
 * to the trailing edge — handy for character counters or "optional" markers.
 * Hints are auto-wired to the control via `aria-describedby`.
 */
export const WithHint: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoInputModule } from 'novo-elements';

// align="end" pushes a hint to the trailing edge (counters, optional markers).
// Hints are auto-wired to the control via aria-describedby.
@Component({
  selector: 'my-hint-demo',
  imports: [NovoFieldModule, NovoInputModule],
  templateUrl: './my-hint-demo.component.html',
})
export class MyHintDemoComponent {}

// component.html
<novo-field>
  <novo-label>Username</novo-label>
  <input novoInput type="text" />
  <novo-hint>Must be unique across your organization</novo-hint>
</novo-field>

<novo-field>
  <novo-label>Bio</novo-label>
  <input novoInput type="text" maxlength="80" />
  <novo-hint>Brief description</novo-hint>
  <novo-hint align="end">5 / 80</novo-hint>
</novo-field>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 420px;">
        <novo-field>
          <novo-label>Username</novo-label>
          <input novoInput type="text" />
          <novo-hint>Must be unique across your organization</novo-hint>
        </novo-field>
        <novo-field>
          <novo-label>Bio</novo-label>
          <input novoInput type="text" maxlength="80" value="Hello" />
          <novo-hint>Brief description</novo-hint>
          <novo-hint align="end">5 / 80</novo-hint>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithError                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Project a `<novo-error>` for validation messaging. When the inner control's
 * `errorState` flips to `true` (typically: the `FormControl` is invalid *and*
 * touched), the error replaces any visible hints automatically.
 *
 * Here the field is bound to a reactive `FormControl` that's pre-marked
 * touched so the error renders on first paint.
 */
export const WithError: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoFieldModule + ReactiveFormsModule.
// <novo-error> is shown when the bound control's errorState flips true
// (invalid + touched, by default).
@Component({ ... })
export class MyValidatedFieldComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
}

// template
<novo-field>
  <novo-label>Email</novo-label>
  <input novoInput type="email" [formControl]="email" />
  <novo-error *ngIf="email.hasError('email')">Not a valid email address</novo-error>
  <novo-error *ngIf="email.hasError('required')">Email is required</novo-error>
</novo-field>`,
      },
    },
  },
  render: () => {
    const email = new FormControl('not-an-email', [Validators.required, Validators.email]);
    email.markAsTouched();
    return {
      props: { email },
      template: `
        <novo-field style="max-width: 360px; display: block;">
          <novo-label>Email</novo-label>
          <input novoInput type="email" [formControl]="email" />
          <novo-hint>We'll never share your address</novo-hint>
          <novo-error>Please enter a valid email address</novo-error>
        </novo-field>
      `,
    };
  },
  // Note — no `play` function. The natural smoke test would be "assert that
  // `<novo-error>` renders when the bound FormControl is invalid+touched."
  // But novo-field's error projection is gated on `_control.errorState`, and
  // `NovoInput.errorState` is declared `boolean = false` and *never assigned
  // anywhere in the codebase* — so the error block never renders, regardless
  // of validator state. See the ISSUES_BACKLOG entry for "NovoInput
  // errorState never updated". Until that's fixed, there's nothing for a
  // play to assert on; the visual story still demonstrates the intended
  // markup pattern for consumers.
};

/* -------------------------------------------------------------------------- */
/* 7. WithPrefixSuffix                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Any element with the `novoPrefix` or `novoSuffix` attribute is projected
 * into the corresponding slot. Common patterns: a currency symbol prefix on a
 * numeric input, an icon suffix to toggle password visibility, or a
 * `<novo-picker-toggle>` suffix on a date/time field.
 */
export const WithPrefixSuffix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoIconModule, NovoInputModule } from 'novo-elements';

// novoPrefix / novoSuffix are attribute directives — any element carrying that
// attribute slots into the leading or trailing edge of the field. NovoIconModule
// is required for the <novo-icon> peer.
@Component({
  selector: 'my-prefix-suffix-demo',
  imports: [NovoFieldModule, NovoIconModule, NovoInputModule],
  templateUrl: './my-prefix-suffix-demo.component.html',
})
export class MyPrefixSuffixDemoComponent {}

// component.html
<novo-field>
  <novo-label>Search</novo-label>
  <novo-icon novoPrefix>search</novo-icon>
  <input novoInput type="text" placeholder="Type to filter..." />
</novo-field>

<novo-field>
  <novo-label>Amount</novo-label>
  <span novoPrefix>$</span>
  <input novoInput type="number" />
  <span novoSuffix>USD</span>
</novo-field>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 420px;">
        <novo-field>
          <novo-label>Amount</novo-label>
          <span novoPrefix>$&nbsp;</span>
          <input novoInput type="number" value="42" />
          <span novoSuffix>.00</span>
          <novo-hint>USD</novo-hint>
        </novo-field>
        <novo-field>
          <novo-label>Search</novo-label>
          <novo-icon novoPrefix>search</novo-icon>
          <input novoInput type="text" placeholder="Type to filter…" />
        </novo-field>
        <novo-field>
          <novo-label>Website</novo-label>
          <span novoPrefix>https://</span>
          <input novoInput type="text" placeholder="example.com" />
          <novo-icon novoSuffix>external-link</novo-icon>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. WithPickers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The canonical Bullhorn picker pattern: a `novoInput` text field with a
 * matching format directive (`dateFormat` / `timeFormat` / `dateTimeFormat`
 * / `dateRangeFormat`), paired via `[picker]` to an inline picker component
 * inside `<novo-picker-toggle novoSuffix>`. The toggle button opens the
 * picker as a CDK overlay positioned beneath the field.
 *
 * Prefer this composition over the legacy `<novo-date-picker-input>` /
 * `<novo-date-time-picker-input>` standalone components — those are
 * deprecated in favor of this pattern.
 */
export const WithPickers: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NovoDatePickerModule,
  NovoDateTimePickerModule,
  NovoFieldModule,
  NovoInputModule,
  NovoTimePickerModule,
} from 'novo-elements';

// Picker toggles slot into novoSuffix and reference an inline picker via
// [picker]. NovoTimePickerModule / NovoDatePickerModule / NovoDateTimePickerModule
// provide the matching picker elements. Prefer this composition over the
// deprecated <novo-date-picker-input> / <novo-date-time-picker-input>.
@Component({
  selector: 'my-pickers-demo',
  imports: [
    FormsModule,
    NovoFieldModule,
    NovoInputModule,
    NovoTimePickerModule,
    NovoDatePickerModule,
    NovoDateTimePickerModule,
  ],
  templateUrl: './my-pickers-demo.component.html',
})
export class MyPickersDemoComponent {
  alarm: string | null = null;
  birthday: Date | null = null;
  schedule: Date | null = null;
  vacation: { startDate: Date; endDate: Date } | null = null;
}

// component.html
<novo-field>
  <novo-label>Set an Alarm</novo-label>
  <input novoInput [(ngModel)]="alarm" timeFormat="iso8601" [picker]="timepicker" />
  <novo-picker-toggle novoSuffix icon="clock">
    <novo-time-picker #timepicker></novo-time-picker>
  </novo-picker-toggle>
</novo-field>

<novo-field>
  <novo-label>Date of Birth</novo-label>
  <input novoInput dateFormat="iso8601" [picker]="datepicker" [(ngModel)]="birthday" />
  <novo-picker-toggle novoSuffix icon="calendar">
    <novo-date-picker #datepicker></novo-date-picker>
  </novo-picker-toggle>
</novo-field>

<novo-field>
  <novo-label>Scheduled at</novo-label>
  <input novoInput dateFormat="iso8601" [picker]="datetimepicker" [(ngModel)]="schedule" />
  <novo-picker-toggle novoSuffix icon="calendar">
    <novo-date-time-picker #datetimepicker></novo-date-time-picker>
  </novo-picker-toggle>
</novo-field>

<novo-field>
  <novo-label>Need a Vacation?</novo-label>
  <input novoInput dateRangeFormat="iso8601" [picker]="rangepicker" [(ngModel)]="vacation" />
  <novo-picker-toggle novoSuffix icon="calendar">
    <novo-date-picker #rangepicker mode="range" numberOfMonths="2"></novo-date-picker>
  </novo-picker-toggle>
</novo-field>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      alarm: null,
      birthday: null,
      schedule: null,
      vacation: null,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 480px;">
        <novo-field>
          <novo-label>Alarm time</novo-label>
          <input novoInput timeFormat="iso8601" [picker]="timepicker" [(ngModel)]="alarm" />
          <novo-picker-toggle novoSuffix icon="clock">
            <novo-time-picker #timepicker></novo-time-picker>
          </novo-picker-toggle>
          <novo-hint>value: {{ alarm }}</novo-hint>
        </novo-field>

        <novo-field>
          <novo-label>Date of birth</novo-label>
          <input novoInput dateFormat="iso8601" [picker]="datepicker" [(ngModel)]="birthday" />
          <novo-picker-toggle novoSuffix icon="calendar">
            <novo-date-picker #datepicker></novo-date-picker>
          </novo-picker-toggle>
          <novo-hint>value: {{ birthday }}</novo-hint>
        </novo-field>

        <novo-field>
          <novo-label>Scheduled at</novo-label>
          <input novoInput dateFormat="iso8601" [picker]="datetimepicker" [(ngModel)]="schedule" />
          <novo-picker-toggle novoSuffix icon="calendar">
            <novo-date-time-picker #datetimepicker></novo-date-time-picker>
          </novo-picker-toggle>
          <novo-hint>value: {{ schedule }}</novo-hint>
        </novo-field>

        <novo-field>
          <novo-label>Vacation dates</novo-label>
          <input novoInput dateRangeFormat="iso8601" [picker]="rangepicker" [(ngModel)]="vacation" />
          <novo-picker-toggle novoSuffix icon="calendar">
            <novo-date-picker #rangepicker mode="range" numberOfMonths="2"></novo-date-picker>
          </novo-picker-toggle>
          <novo-hint>value: {{ vacation | json }}</novo-hint>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. WithNovoSelect                                                          */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-select>` implements `NovoFieldControl`, so it can be placed directly
 * inside `<novo-field>` — same slot structure as the native `<select>` row
 * in `ControlTypes`, but with the richer novo-select panel, multi-select,
 * search, and icon support. Use this instead of the native control whenever
 * you need styling consistency or features beyond the browser default.
 */
export const WithNovoSelect: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoFieldModule, NovoOptionModule, NovoSelectModule } from 'novo-elements';

// <novo-select> is a NovoFieldControl, so it slots into <novo-field> directly.
@Component({
  selector: 'my-select-field-demo',
  imports: [FormsModule, NovoFieldModule, NovoSelectModule, NovoOptionModule],
  templateUrl: './my-select-field-demo.component.html',
})
export class MySelectFieldDemoComponent {
  country: 'us' | 'ca' | 'uk' = 'us';
}

// component.html
<novo-field>
  <novo-label>Country</novo-label>
  <novo-select [(ngModel)]="country">
    <novo-option value="us">United States</novo-option>
    <novo-option value="ca">Canada</novo-option>
    <novo-option value="uk">United Kingdom</novo-option>
  </novo-select>
</novo-field>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 360px;">
        <novo-field>
          <novo-label>Effective on</novo-label>
          <novo-select value="08/01/2026">
            <novo-option value="08/01/2026">08/01/2026</novo-option>
            <novo-option value="09/01/2026">09/01/2026</novo-option>
            <novo-option value="10/01/2026">10/01/2026</novo-option>
          </novo-select>
        </novo-field>

        <novo-field>
          <novo-label>Priority</novo-label>
          <novo-icon novoPrefix>flag</novo-icon>
          <novo-select value="med">
            <novo-option value="low">Low</novo-option>
            <novo-option value="med">Medium</novo-option>
            <novo-option value="high">High</novo-option>
          </novo-select>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. NativeControlTypes                                                             */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-field>` wraps any control implementing `NovoFieldControl` — most
 * commonly the `novoInput` directive applied to a native `<input>`,
 * `<textarea>`, or `<select>`. The wrapper detects the control type and adds
 * a `data-control-type` attribute plus a `novo-field-type-*` class to itself,
 * so styles can specialize per control shape.
 *
 * This story shows every native HTML input type novo-field has been verified
 * with; see `WithPickers` and `WithNovoSelect` for the rich novo-element
 * controls.
 */
export const NativeControlTypes: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoIconModule, NovoInputModule } from 'novo-elements';

// novoInput on any native input / textarea / select makes it a NovoFieldControl.
@Component({
  selector: 'my-native-controls-demo',
  imports: [NovoFieldModule, NovoIconModule, NovoInputModule],
  templateUrl: './my-native-controls-demo.component.html',
})
export class MyNativeControlsDemoComponent {
  hidePassword = true;
}

// component.html
<novo-field><novo-label>Email</novo-label><input novoInput type="email" /></novo-field>
<novo-field>
  <novo-label>Password</novo-label>
  <input novoInput [type]="hidePassword ? 'password' : 'text'" />
  <novo-icon novoSuffix (click)="hidePassword = !hidePassword">
    {{ hidePassword ? 'overview' : 'hidden' }}
  </novo-icon>
</novo-field>
<novo-field><novo-label>Color</novo-label><input novoInput type="color" /></novo-field>
<novo-field><novo-label>Volume</novo-label><input novoInput type="range" min="0" max="100" /></novo-field>
<novo-field><novo-label>Birthday</novo-label><input novoInput type="date" /></novo-field>
<novo-field><novo-label>End Time</novo-label><input novoInput type="time" /></novo-field>
<novo-field><novo-label>Appointment</novo-label><input novoInput type="datetime-local" /></novo-field>
<novo-field><novo-label>Number</novo-label><input novoInput type="number" min="0" max="100" /></novo-field>
<novo-field><novo-label>Notes</novo-label><textarea novoInput></textarea></novo-field>
<novo-field>
  <novo-label>Native select</novo-label>
  <select novoInput>
    <option value="pink">Pink</option>
    <option value="purple">Purple</option>
  </select>
</novo-field>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { hidePassword: true },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 1.5rem; max-width: 720px;">
        <novo-field>
          <novo-label>Text</novo-label>
          <input novoInput type="text" placeholder="Free-form text" />
        </novo-field>

        <novo-field>
          <novo-label>Email</novo-label>
          <input novoInput type="email" placeholder="you@example.com" />
        </novo-field>

        <novo-field>
          <novo-label>Password</novo-label>
          <input novoInput [type]="hidePassword ? 'password' : 'text'" value="hunter2" />
          <novo-icon novoSuffix (click)="hidePassword = !hidePassword">
            {{ hidePassword ? 'overview' : 'hidden' }}
          </novo-icon>
        </novo-field>

        <novo-field>
          <novo-label>Number</novo-label>
          <input novoInput type="number" min="0" max="100" value="50" />
        </novo-field>

        <novo-field>
          <novo-label>Color</novo-label>
          <input novoInput type="color" value="#4a89dc" />
        </novo-field>

        <novo-field>
          <novo-label>Range</novo-label>
          <input novoInput type="range" min="0" max="100" value="60" step="10" />
        </novo-field>

        <novo-field>
          <novo-label>Date</novo-label>
          <input novoInput type="date" />
        </novo-field>

        <novo-field>
          <novo-label>Time</novo-label>
          <input novoInput type="time" />
        </novo-field>

        <novo-field>
          <novo-label>Datetime-local</novo-label>
          <input novoInput type="datetime-local" />
        </novo-field>

        <novo-field>
          <novo-label>Native select</novo-label>
          <select novoInput>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
            <option value="sparkles">Sparkles</option>
          </select>
        </novo-field>

        <novo-field style="grid-column: 1 / -1;">
          <novo-label>Textarea</novo-label>
          <textarea novoInput rows="3" placeholder="Multi-line text"></textarea>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 11. RichLabel                                                               */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-label>` is projected as-is — any markup is allowed. Use this to
 * embed status indicators (chips) or icons alongside the label text, e.g.
 * to mark a current value or flag a deprecation.
 *
 * Keep this surgical: rich labels add visual weight, so reserve them for
 * cases where the metadata is genuinely useful at-a-glance.
 */
export const RichLabel: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoChipsModule, NovoFieldModule, NovoFlexModule, NovoInputModule } from 'novo-elements';

// <novo-label> projects any markup, so labels can carry chips, icons, or
// arbitrary text. Keep this surgical — rich labels add visual weight.
@Component({
  selector: 'my-rich-label-demo',
  imports: [NovoChipsModule, NovoFieldModule, NovoFlexModule, NovoInputModule],
  templateUrl: './my-rich-label-demo.component.html',
})
export class MyRichLabelDemoComponent {}

// component.html
<novo-field>
  <novo-label>
    <novo-flex justify="space-between">
      <span>Effective On</span>
      <novo-chip size="sm" color="success">current</novo-chip>
    </novo-flex>
  </novo-label>
  <input novoInput type="date" />
</novo-field>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 360px;">
        <novo-field>
          <novo-label>
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
              <span>Effective on</span>
              <novo-chip size="sm" color="success">current</novo-chip>
            </div>
          </novo-label>
          <input novoInput type="text" value="08/01/2026" />
        </novo-field>

        <novo-field>
          <novo-label>
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
              <span>Legacy code</span>
              <novo-chip size="sm" color="warning">deprecated</novo-chip>
            </div>
          </novo-label>
          <input novoInput type="text" value="LEG-001" />
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 12. Disabled                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Disabling the inner control propagates a `novo-field-disabled` class to the
 * wrapper. Apply `disabled` on the input element (or via Angular forms);
 * `<novo-field>` itself has no `disabled` input.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoInputModule } from 'novo-elements';

// <novo-field> has no disabled input — apply disabled on the inner control
// (or via reactive forms). The wrapper picks up novo-field-disabled.
@Component({
  selector: 'my-disabled-field-demo',
  imports: [NovoFieldModule, NovoInputModule],
  templateUrl: './my-disabled-field-demo.component.html',
})
export class MyDisabledFieldDemoComponent {}

// component.html
<novo-field>
  <novo-label>Enabled</novo-label>
  <input novoInput type="text" />
</novo-field>
<novo-field>
  <novo-label>Disabled</novo-label>
  <input novoInput type="text" disabled />
</novo-field>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 360px;">
        <novo-field>
          <novo-label>Enabled</novo-label>
          <input novoInput type="text" value="Editable" />
          <novo-hint>You can change this</novo-hint>
        </novo-field>
        <novo-field>
          <novo-label>Disabled</novo-label>
          <input novoInput type="text" value="Read-only" disabled />
          <novo-hint>This value is locked</novo-hint>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 13. Required                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Mark the inner control `required` (or wire a `Validators.required`
 * reactive control) to flag the field as mandatory. `<novo-field>` reflects
 * the control's required state via standard `ng-*` classes on its host.
 */
export const Required: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoInputModule } from 'novo-elements';

// required on the inner control surfaces a required marker on the label.
@Component({
  selector: 'my-required-field-demo',
  imports: [NovoFieldModule, NovoInputModule],
  templateUrl: './my-required-field-demo.component.html',
})
export class MyRequiredFieldDemoComponent {}

// component.html
<novo-field>
  <novo-label>Email</novo-label>
  <input novoInput type="email" required />
</novo-field>`,
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 360px;">
        <novo-field>
          <novo-label>Full name</novo-label>
          <input novoInput type="text" required />
          <novo-hint>Required</novo-hint>
        </novo-field>
        <novo-field>
          <novo-label>Nickname</novo-label>
          <input novoInput type="text" />
          <novo-hint>Optional</novo-hint>
        </novo-field>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 14. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoFieldModule, NovoIconModule, NovoInputModule } from 'novo-elements';

@Component({
  selector: 'my-field-playground',
  imports: [NovoFieldModule, NovoIconModule, NovoInputModule],
  templateUrl: './my-field-playground.component.html',
})
export class MyFieldPlaygroundComponent {
  appearance: 'standard' | 'fill' | 'outline' | 'list' = 'standard';
  layout: 'vertical' | 'horizontal' = 'vertical';
  width = '';
}

// component.html
<novo-field [appearance]="appearance" [layout]="layout" [width]="width">
  <novo-label>Playground field</novo-label>
  <novo-icon novoPrefix>search</novo-icon>
  <input novoInput type="text" placeholder="Type something…" />
  <novo-icon novoSuffix>close</novo-icon>
  <novo-hint>Helper text</novo-hint>
</novo-field>`,
      },
    },
  },
  name: '🎮 Playground',
  args: {
    appearance: 'standard',
    layout: 'vertical',
    width: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <novo-field [appearance]="appearance" [layout]="layout" [width]="width">
        <novo-label>Playground field</novo-label>
        <novo-icon novoPrefix>search</novo-icon>
        <input novoInput type="text" placeholder="Type something…" />
        <novo-icon novoSuffix>close</novo-icon>
        <novo-hint>Helper text</novo-hint>
      </novo-field>
    `,
  }),
};
