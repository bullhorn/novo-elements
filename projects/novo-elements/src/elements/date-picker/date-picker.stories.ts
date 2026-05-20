import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, waitFor, expect } from 'storybook/test';

import { NovoRadioModule } from '../radio/Radio.module';
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoDatePickerModule } from './DatePicker.module';

/**
 * Stories for the `novo-date-picker` family. Follows the conventions
 * documented in `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * The family ships four cooperating components:
 *   • `<novo-date-picker>`           — the calendar surface itself; can be used
 *                                       standalone as an inline filter.
 *   • `<novo-date-picker-input>`     — single-date text input + overlay calendar.
 *                                       The primary form-control entry point.
 *   • `<novo-date-range-input>`      — two text inputs that share a single
 *                                       calendar overlay; binds to a `{ startDate,
 *                                       endDate }` value.
 *   • `<novo-multi-date-input>`      — a chip list backed by an overlay calendar
 *                                       in `mode="multiple"`; binds to a `Date[]`.
 *
 * The overlay is a CDK overlay rendered in `document.body` (via
 * `<novo-overlay-template>`), so any `play` function that needs to interact
 * with the calendar must scope its queries to `document.body` rather than the
 * story's `canvasElement`.
 */
const meta: Meta<NovoDatePickerInputElement> = {
  title: 'Form Controls/Date Picker',
  component: NovoDatePickerInputElement,
  decorators: [
    moduleMetadata({
      // CustomWeekStart uses `<novo-radio button>` for the day-of-week
      // selector; per the Phase 4 convention, peer modules used in a
      // story template must be imported explicitly.
      imports: [NovoDatePickerModule, NovoRadioModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-date, multi-date, and range pickers for form input. The primary entry point is ' +
          '`<novo-date-picker-input>` — a text input backed by an overlay calendar. Use ' +
          '`<novo-date-range-input>` for a `{ startDate, endDate }` range, and ' +
          '`<novo-multi-date-input>` for an arbitrary list of dates. The bare ' +
          '`<novo-date-picker>` is also usable standalone as an inline calendar (e.g. as a filter).',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description:
        'Placeholder shown when the input is empty. Defaults to the locale-aware date format placeholder ' +
        'from `NovoLabelService`.',
    },
    format: {
      control: 'select',
      options: [undefined, 'MM/DD/YYYY', 'DD/MM/YYYY', 'MMM DD, YYYY', 'ddd MMM DD, YYYY'],
      description:
        'Display format for the input. The two canonical formats `MM/DD/YYYY` and `DD/MM/YYYY` engage ' +
        'the input mask; other formats render unmasked. Default falls through to the locale format from ' +
        '`NovoLabelService`.',
    },
    start: {
      control: 'date',
      description: 'Minimum selectable date (inclusive). Dates before this render as disabled in the calendar.',
    },
    end: {
      control: 'date',
      description: 'Maximum selectable date (inclusive). Dates after this render as disabled in the calendar.',
    },
    weekStart: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description:
        'First day of the week, `0` = Sunday … `6` = Saturday. Affects the calendar grid layout; the ' +
        'default is Sunday.',
      table: { defaultValue: { summary: '0 (Sunday)' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'When `true`, the input is non-interactive and the calendar overlay will not open. Also reflected ' +
        'via the `.disabled` host class.',
    },
    hideFooter: {
      control: 'boolean',
      description: 'Hide the calendar footer entirely (the `Today` button and any projected save/cancel buttons).',
    },
    hideToday: {
      control: 'boolean',
      description: 'Hide just the `Today` quick-jump button in the footer.',
    },
    hasButtons: {
      control: 'boolean',
      description:
        'Render explicit `Cancel` / `Save` footer buttons. When set, selection no longer auto-commits — ' +
        'the user must click `Save`. Emits `onSave` / `onCancel` events.',
    },
    disabledDateMessage: {
      control: 'text',
      description: 'Tooltip text shown when hovering over a disabled date (outside `start` / `end`).',
    },
    allowInvalidDate: {
      control: 'boolean',
      description:
        'When `true`, the input emits the typed value even before it constitutes a valid date — useful ' +
        'for two-pass validation. Disables the input mask.',
    },
    textMaskEnabled: {
      control: 'boolean',
      description: 'Whether to apply the imask date mask. Only honored when `allowInvalidDate` is `false`.',
    },
    name: {
      control: 'text',
      description: 'Native `name` attribute on the underlying input. Useful when binding via template-driven forms.',
    },
    dateForInitialView: {
      control: 'date',
      description:
        'A date/month to anchor the initial calendar view on, distinct from the selected value. Lets you ' +
        'open the picker on a different month than the current selection.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoDatePickerInputElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to use a date picker (vs. a date-time
 * picker or a range), which variant of the family to pick, the value shapes
 * each one binds to, and locale/format notes.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a date picker</h2>
        <p style="margin: 0 0 1.25rem;">
          Use a date picker whenever the user must enter a calendar date —
          birthdays, effective dates, start/end ranges, filter windows, etc.
          The picker combines a free-text input (so power users can type) with
          an overlay calendar (so casual users can click). Prefer it over a
          bare <code>&lt;input type="date"&gt;</code> for cross-browser
          consistency and locale-aware formatting.
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
              ✓ Use a date picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The user needs to enter a calendar date as part of a form</li>
              <li>You need locale-aware date formatting and validation</li>
              <li>Selecting a date range (<code>&lt;novo-date-range-input&gt;</code>)</li>
              <li>Selecting multiple discrete dates (<code>&lt;novo-multi-date-input&gt;</code>)</li>
              <li>An inline calendar should drive filtering of page content (<code>&lt;novo-date-picker&gt;</code> standalone)</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a date picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The date also needs a time-of-day component — use <code>&lt;novo-date-time-picker&gt;</code></li>
              <li>You only need a free-form text input (e.g. "any text describing when") — use <code>&lt;novo-text-input&gt;</code></li>
              <li>The user is picking a duration (X days/weeks) rather than a date — use a numeric input</li>
              <li>The valid set of dates is very small and named (e.g. "Q1 / Q2 / Q3 / Q4") — use a select</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Picking a variant</h2>
        <p style="margin: 0 0 1rem;">
          The family ships four cooperating components. Pick by the shape of
          the value you need to bind to.
        </p>
        <table style="
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        ">
          <thead>
            <tr style="background: #f6f8fa;">
              <th style="text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid #e1e4e8;">Component</th>
              <th style="text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid #e1e4e8;">Value shape</th>
              <th style="text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid #e1e4e8;">Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>&lt;novo-date-picker-input&gt;</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>Date</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;">Single-date form input. The default choice.</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>&lt;novo-date-range-input&gt;</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>&#123; startDate: Date, endDate: Date &#125;</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;">Two-input range. Supports <code>mode="range"</code> and <code>mode="week"</code>.</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>&lt;novo-multi-date-input&gt;</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>Date[]</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;">Multiple discrete dates, rendered as removable chips.</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0.75rem;"><code>&lt;novo-date-picker&gt;</code></td>
              <td style="padding: 0.6rem 0.75rem;"><code>Date</code> / <code>Date[]</code> / range — depends on <code>mode</code></td>
              <td style="padding: 0.6rem 0.75rem;">Inline calendar without an input — for filters and dashboards.</td>
            </tr>
          </tbody>
        </table>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Format and locale</h2>
        <p style="margin: 0 0 1rem;">
          The two canonical numeric formats <code>MM/DD/YYYY</code> and
          <code>DD/MM/YYYY</code> engage the imask plugin to auto-format input
          as the user types. Custom <code>format</code> values (e.g.
          <code>MMM DD, YYYY</code>) disable masking and rely on
          <code>date-fns</code> formatting on blur. Omit <code>format</code> to
          fall through to the locale-aware default supplied by
          <code>NovoLabelService</code>.
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Preferred composition (v5+)</h2>
        <p style="margin: 0 0 1rem;">
          For new code, the recommended pattern composes <code>&lt;novo-field&gt;</code>,
          the <code>[novoInput]</code> directive, the <code>[dateFormat]</code>
          directive, and a <code>&lt;novo-picker-toggle&gt;</code> that hosts a
          plain <code>&lt;novo-date-picker&gt;</code>. This gives you full label
          / hint / error slots alongside the calendar:
        </p>
        <pre style="
          background: #f6f8fa;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 0.85rem;
          margin: 0 0 2rem;
        "><code>&lt;novo-field&gt;
  &lt;novo-label&gt;Date of Birth&lt;/novo-label&gt;
  &lt;input novoInput dateFormat="iso8601" [picker]="datepicker" [(ngModel)]="date" /&gt;
  &lt;novo-picker-toggle novoSuffix icon="calendar"&gt;
    &lt;novo-date-picker #datepicker&gt;&lt;/novo-date-picker&gt;
  &lt;/novo-picker-toggle&gt;
&lt;/novo-field&gt;</code></pre>
        <p style="margin: 0 0 2rem;">
          The stories below demonstrate the simpler standalone
          <code>&lt;novo-date-picker-input&gt;</code> API, which remains supported
          and is the right pick for terser use cases (data-table filters, etc.).
        </p>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            <strong>Provide a label.</strong> Wrap the input in a
            <code>&lt;novo-field&gt;</code> with <code>&lt;novo-label&gt;</code>,
            or place an external <code>&lt;label for="…"&gt;</code> bound to the
            input's <code>name</code>.
          </li>
          <li>
            <code>Tab</code> moves into the input; <code>Enter</code> /
            <code>Escape</code> / <code>Tab</code> commit the typed value and
            close the overlay.
          </li>
          <li>
            When a date falls outside <code>start</code> / <code>end</code>, the
            calendar disables it and shows <code>disabledDateMessage</code> on
            hover. Prefer descriptive copy ("Date must be after the start date")
            over generic strings.
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
 * The simplest single-date input. Every input on the meta is bound, so
 * mutating any control in the panel updates the rendered picker — change
 * `format`, toggle `weekStart`, set `start` / `end`, etc.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoDatePickerModule + FormsModule.
@Component({ ... })
export class MyDateFieldComponent {
  selected = new Date();
}

// template — emits a native Date through ngModel.
<novo-date-picker-input [(ngModel)]="selected"></novo-date-picker-input>`,
      },
    },
  },
  args: {
    weekStart: 0,
    disabled: false,
    hideFooter: false,
    hideToday: false,
    hasButtons: false,
    allowInvalidDate: false,
    textMaskEnabled: true,
  },
  render: (args) => ({
    props: { ...args, selected: new Date() },
    template: `
      <novo-date-picker-input
        [(ngModel)]="selected"
        [placeholder]="placeholder"
        [format]="format"
        [start]="start"
        [end]="end"
        [weekStart]="weekStart"
        [disabled]="disabled"
        [hideFooter]="hideFooter"
        [hideToday]="hideToday"
        [hasButtons]="hasButtons"
        [disabledDateMessage]="disabledDateMessage"
        [allowInvalidDate]="allowInvalidDate"
        [textMaskEnabled]="textMaskEnabled"
        [name]="name"
        [dateForInitialView]="dateForInitialView"
      ></novo-date-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. WithMinMax                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Constrain the selectable range with `start` (min) and `end` (max). Dates
 * outside the window render disabled in the calendar; hovering one surfaces
 * `disabledDateMessage` as a tooltip.
 */
export const WithMinMax: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// Constrain the selectable range with [start] and [end]. Days outside the
// range are visually disabled and typed-in dates outside are rejected on commit.
@Component({ ... })
export class MyBoundedDateComponent {
  selected = new Date();
  start = new Date('2026-01-01');
  end = new Date('2026-12-31');
}

// template
<novo-date-picker-input
  [(ngModel)]="selected"
  [start]="start"
  [end]="end"
  disabledDateMessage="Date must be in 2026"
></novo-date-picker-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);
    return {
      props: {
        selected: today,
        minDate,
        maxDate,
        tooltip: 'Must be within the next 7 days',
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <novo-date-picker-input
            [(ngModel)]="selected"
            [start]="minDate"
            [end]="maxDate"
            [disabledDateMessage]="tooltip"
          ></novo-date-picker-input>
          <div style="font-size: 0.85rem; color: #555;">
            Selectable window: {{ minDate | date }} – {{ maxDate | date }}
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Range                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-date-range-input>` binds two inputs to a single
 * `{ startDate, endDate }` value and shares a calendar overlay. Set
 * `mode="week"` to constrain selection to whole calendar weeks.
 */
export const Range: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// <novo-date-range-input> binds an object: { startDate, endDate }.
// Set mode="week" to pick a calendar week instead of an arbitrary range.
@Component({ ... })
export class MyRangeComponent {
  range: { startDate: Date | null; endDate: Date | null } = {
    startDate: new Date('2026-05-01'),
    endDate:   new Date('2026-05-14'),
  };
}

// template
<novo-date-range-input [(ngModel)]="range"></novo-date-range-input>
<novo-date-range-input [(ngModel)]="range" mode="week"></novo-date-range-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      range: { startDate: null, endDate: null },
      weekRange: { startDate: null, endDate: null },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 480px;">
        <div>
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Range (mode="range")</div>
          <novo-date-range-input [(ngModel)]="range" mode="range"></novo-date-range-input>
        </div>
        <div>
          <div style="font-weight: 600; margin-bottom: 0.25rem;">Week (mode="week")</div>
          <novo-date-range-input [(ngModel)]="weekRange" mode="week"></novo-date-range-input>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. MultiDate                                                                */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-multi-date-input>` collects an arbitrary list of dates and renders
 * them as removable chips. The bound value is `Date[]`. The overlay calendar
 * runs in `mode="multiple"`; clicking a date toggles it in the list.
 */
export const MultiDate: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// <novo-multi-date-input> binds an array of Date.
@Component({ ... })
export class MyMultiDateComponent {
  dates: Date[] = [new Date('2026-05-01'), new Date('2026-05-14')];
}

// template — selected dates render as chips inside the input.
<novo-multi-date-input [(ngModel)]="dates"></novo-multi-date-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { dates: [] as Date[] },
    template: `
      <novo-multi-date-input [(ngModel)]="dates"></novo-multi-date-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `disabled` makes the input non-interactive; the calendar overlay will not
 * open. The `.disabled` host class is applied for downstream styling hooks.
 */
export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoDatePickerModule } from 'novo-elements';

@Component({
  selector: 'my-disabled-date-picker',
  imports: [FormsModule, NovoDatePickerModule],
  templateUrl: './my-disabled-date-picker.component.html',
})
export class MyDisabledDatePickerComponent {
  selected: Date = new Date();
}

// component.html
<novo-date-picker-input [(ngModel)]="selected" [disabled]="true"></novo-date-picker-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { selected: new Date() },
    template: `
      <novo-date-picker-input
        [(ngModel)]="selected"
        [disabled]="true"
      ></novo-date-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. WithSaveButtons                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Set `hasButtons` to render explicit `Cancel` / `Save` footer buttons.
 * Selection no longer auto-commits — the calendar stays open and emits via
 * `onSave` / `onCancel` instead. Useful when an accidental click would be
 * costly.
 */
export const WithSaveButtons: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoDatePickerModule } from 'novo-elements';

// hasButtons flips the picker into explicit Save / Cancel mode — selection no
// longer auto-commits; the calendar stays open until Save or Cancel is clicked.
@Component({
  selector: 'my-save-buttons-date-picker',
  imports: [FormsModule, NovoDatePickerModule],
  templateUrl: './my-save-buttons-date-picker.component.html',
})
export class MySaveButtonsDatePickerComponent {
  selected: Date = new Date();
}

// component.html
<novo-date-picker-input [(ngModel)]="selected" [hasButtons]="true"></novo-date-picker-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { selected: new Date() },
    template: `
      <novo-date-picker-input
        [(ngModel)]="selected"
        [hasButtons]="true"
      ></novo-date-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. CustomWeekStart                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The `weekStart` input controls which day the calendar grid starts on:
 * `0` = Sunday … `6` = Saturday. The inline `<novo-date-picker>` is bound
 * to a `Date` via `ngModel` and to the selected radio's value via
 * `weekStart`; switching the radio shifts the column headers and grid
 * layout in place.
 *
 * Useful for locale-driven configuration (most of Europe uses Monday;
 * ISO 8601 uses Monday; Middle Eastern locales often use Saturday).
 */
export const CustomWeekStart: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// NovoDatePickerModule + NovoRadioModule + FormsModule.
// weekStart: 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
@Component({ ... })
export class MyWeekStartComponent {
  weekStart = 0;
  selected = new Date();
}

// template — inline <novo-date-picker> calendar, driven by a radio-group
// segmented control bound to weekStart.
<novo-radio-group appearance="horizontal" [(ngModel)]="weekStart">
  <novo-radio button [value]="0" label="Sunday"></novo-radio>
  <novo-radio button [value]="1" label="Monday"></novo-radio>
  <novo-radio button [value]="2" label="Tuesday"></novo-radio>
  <novo-radio button [value]="3" label="Wednesday"></novo-radio>
  <novo-radio button [value]="4" label="Thursday"></novo-radio>
  <novo-radio button [value]="5" label="Friday"></novo-radio>
  <novo-radio button [value]="6" label="Saturday"></novo-radio>
</novo-radio-group>

<novo-date-picker [(ngModel)]="selected" [weekStart]="weekStart"></novo-date-picker>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      weekStart: 0,
      selected: new Date(),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 720px;">
        <novo-radio-group
          appearance="horizontal"
          [(ngModel)]="weekStart"
        >
          <novo-radio button [value]="0" label="Sunday"></novo-radio>
          <novo-radio button [value]="1" label="Monday"></novo-radio>
          <novo-radio button [value]="2" label="Tuesday"></novo-radio>
          <novo-radio button [value]="3" label="Wednesday"></novo-radio>
          <novo-radio button [value]="4" label="Thursday"></novo-radio>
          <novo-radio button [value]="5" label="Friday"></novo-radio>
          <novo-radio button [value]="6" label="Saturday"></novo-radio>
        </novo-radio-group>

        <div style="font-size: 1rem; color: #4c545a;">
          Value {{ selected | date:'longDate' }}
        </div>

        <novo-date-picker
          [(ngModel)]="selected"
          [weekStart]="weekStart"
        ></novo-date-picker>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. Opened                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * The picker with its overlay calendar driven open by a `play` function — the
 * visual-regression-friendly state. The overlay renders in a CDK portal
 * attached to `document.body`, not inside the story's `canvasElement`, so the
 * assertion uses `within(document.body)` to find the `<novo-date-picker>`
 * element.
 */
export const Opened: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoDatePickerModule } from 'novo-elements';

// Same as Default; the overlay calendar opens on input focus or click.
@Component({
  selector: 'my-opened-date-picker',
  imports: [FormsModule, NovoDatePickerModule],
  templateUrl: './my-opened-date-picker.component.html',
})
export class MyOpenedDatePickerComponent {
  selected: Date = new Date();
}

// component.html
<novo-date-picker-input [(ngModel)]="selected"></novo-date-picker-input>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: { selected: new Date() },
    template: `
      <novo-date-picker-input [(ngModel)]="selected"></novo-date-picker-input>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Focus the input — focus also triggers `openPanel()` (see DatePickerInput.ts).
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input);
    // The calendar mounts inside a CDK overlay attached to document.body, so
    // queries against `canvasElement` won't see it. The calendar template has
    // no semantic role/grid markup, so we wait for the `<novo-calendar>`
    // custom element to land in the body and assert it's visible.
    await waitFor(
      () => {
        const calendar = document.body.querySelector('novo-calendar');
        expect(calendar).not.toBeNull();
        expect(calendar as HTMLElement).toBeVisible();
      },
      { timeout: 2000 },
    );
  },
};

/* -------------------------------------------------------------------------- */
/* 10. Playground                                                              */
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
import { FormsModule } from '@angular/forms';
import { NovoDatePickerModule } from 'novo-elements';

@Component({
  selector: 'my-date-picker-playground',
  imports: [FormsModule, NovoDatePickerModule],
  templateUrl: './my-date-picker-playground.component.html',
})
export class MyDatePickerPlaygroundComponent {
  selected: Date = new Date();
  weekStart = 0;
  format = 'MM/DD/YYYY';
  disabled = false;
  hasButtons = false;
}

// component.html
<novo-date-picker-input
  [(ngModel)]="selected"
  [weekStart]="weekStart"
  [format]="format"
  [disabled]="disabled"
  [hasButtons]="hasButtons"
></novo-date-picker-input>`,
      },
    },
  },
  name: '🎮 Playground',
  args: {
    placeholder: '',
    format: undefined,
    weekStart: 0,
    disabled: false,
    hideFooter: false,
    hideToday: false,
    hasButtons: false,
    allowInvalidDate: false,
    textMaskEnabled: true,
    name: 'playground-date',
    disabledDateMessage: 'This date is outside the selectable range',
  },
  render: (args) => ({
    props: { ...args, selected: new Date() },
    template: `
      <novo-date-picker-input
        [(ngModel)]="selected"
        [placeholder]="placeholder"
        [format]="format"
        [start]="start"
        [end]="end"
        [weekStart]="weekStart"
        [disabled]="disabled"
        [hideFooter]="hideFooter"
        [hideToday]="hideToday"
        [hasButtons]="hasButtons"
        [disabledDateMessage]="disabledDateMessage"
        [allowInvalidDate]="allowInvalidDate"
        [textMaskEnabled]="textMaskEnabled"
        [name]="name"
        [dateForInitialView]="dateForInitialView"
      ></novo-date-picker-input>
    `,
  }),
};
