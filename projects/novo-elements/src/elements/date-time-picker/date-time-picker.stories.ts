import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, waitFor } from 'storybook/test';

import { NovoDateTimePickerInputElement } from './DateTimePickerInput';
import { NovoDateTimePickerModule } from './DateTimePicker.module';

/**
 * Stories for `<novo-date-time-picker-input>`. Follows the conventions
 * documented in `projects/novo-elements/src/elements/button/button.stories.ts`
 * — see that file for the full convention reference.
 *
 * Note: the date-time-picker is a *composition* of `<novo-date-picker>` and
 * `<novo-time-picker>` (it does not extend date-picker). The input variant
 * renders a date input and a time input side-by-side; the date input opens
 * its calendar in a CDK overlay attached to `document.body`.
 */
const meta: Meta<NovoDateTimePickerInputElement> = {
  title: 'Form Controls/Date Time Picker',
  component: NovoDateTimePickerInputElement,
  decorators: [
    moduleMetadata({
      imports: [NovoDateTimePickerModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A combined date + time picker. Renders two text inputs side-by-side — one for the date (with a calendar ' +
          'overlay) and one for the time — and emits a single `Date` value spanning both. Use when both the day and ' +
          'time-of-day matter (appointments, shift starts, deadlines). When only the calendar day matters, prefer ' +
          '`<novo-date-picker-input>` instead.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the date input.',
    },
    military: {
      control: 'boolean',
      description:
        'When `true`, the time input uses 24-hour formatting (e.g. `14:30`). When `false` (default), 12-hour with AM/PM.',
      table: { defaultValue: { summary: 'false' } },
    },
    start: {
      control: 'date',
      description:
        'Minimum selectable date. Dates before this are disabled in the calendar and rejected by the input.',
    },
    end: {
      control: 'date',
      description: 'Maximum selectable date. Dates after this are disabled.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, both inputs are non-interactive.',
      table: { defaultValue: { summary: 'false' } },
    },
    weekStart: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'First day of the week in the calendar (`0` = Sunday, `1` = Monday, …).',
      table: { defaultValue: { summary: '0' } },
    },
    disabledDateMessage: {
      control: 'text',
      description:
        'Message shown in the calendar overlay when a disabled date is hovered/selected.',
    },
    name: {
      control: 'text',
      description: 'Native `name` attribute forwarded to the underlying input — used by HTML form submission.',
    },
    format: {
      control: 'text',
      description:
        'Date format hint for the input mask. Passed through to the inner `novo-date-picker-input`.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoDateTimePickerInputElement & { value?: Date }>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for a date-time picker over a
 * plain date picker, value semantics (timezone / parsing), and accessibility
 * notes that aren't otherwise obvious from the API.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use a date-time picker</h2>
        <p style="margin: 0 0 1.25rem;">
          A date-time picker captures a single moment in time — a calendar day
          <em>and</em> a time-of-day, together. Use it when both halves of the
          value matter for the action the user is taking. When only the
          calendar day matters, reach for a plain
          <code>&lt;novo-date-picker-input&gt;</code>; when only the time
          matters, reach for <code>&lt;novo-time-picker-input&gt;</code>.
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
              ✓ Use a date-time picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Scheduling an appointment, meeting, or shift</li>
              <li>Capturing a deadline with a meaningful cutoff time</li>
              <li>Logging an event that occurred at a specific moment</li>
              <li>Filtering records by a precise timestamp</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a date-time picker when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Only the calendar day matters — use a date picker</li>
              <li>Only the time of day matters — use a time picker</li>
              <li>You need a date range — use the date-range input</li>
              <li>You need a recurring schedule — build it from primitives</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">
          The input variant composes two siblings into a single form control:
        </p>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Date input</strong> — a masked text input with a calendar
            trigger icon. Clicking the icon opens an overlaid
            <code>&lt;novo-date-picker&gt;</code>.
          </li>
          <li>
            <strong>Time input</strong> — a masked text input with a clock
            trigger icon. Clicking the icon opens an overlaid
            <code>&lt;novo-time-picker&gt;</code>. Format is controlled by the
            <code>military</code> input (12-hour with AM/PM by default,
            24-hour when <code>military="true"</code>).
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Value semantics</h2>
        <ul style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            The model value is a native JavaScript <code>Date</code>. Setting a
            string or numeric timestamp is accepted on write — the component
            parses it through <code>DateUtil</code> — but the model emitted on
            change is always a <code>Date</code> instance.
          </li>
          <li>
            <code>Date</code> objects carry no timezone — they represent an
            instant in UTC and render in the browser's local zone. If your
            app needs to display the same wall-clock moment for every viewer,
            convert at the boundary (server → fixed zone string → display).
          </li>
          <li>
            When the user fills in the date but not the time, the component
            defaults the time portion to <strong>noon</strong> (<code>12:00</code>)
            so the resulting <code>Date</code> is unambiguous across timezones.
          </li>
          <li>
            <code>start</code> and <code>end</code> bound the selectable date
            range; out-of-range entries are rejected on commit.
          </li>
        </ul>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Always wrap the input in a <code>&lt;novo-field&gt;</code> with a
            <code>&lt;novo-label&gt;</code> — the label is the input's
            accessible name.
          </li>
          <li>
            Both halves of the input accept keyboard typing with mask-driven
            auto-formatting; users don't need to open the overlay to enter a
            value.
          </li>
          <li>
            <code>Escape</code> closes either overlay. Inside the calendar,
            arrow keys move between days; <code>Enter</code> commits the
            highlighted day and shifts focus to the time field.
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
 * Default `<novo-date-time-picker-input>` usage — two-way binding via
 * `ngModel` emits a `Date` whenever either the date or time half changes.
 *
 * NOTE: `<novo-date-time-picker-input>` is the *deprecated* input variant.
 * The recommended modern composition is `<novo-field>` + `novoInput` +
 * `[picker]` + `<novo-picker-toggle>` wrapping a `<novo-date-time-picker>`.
 * This input cannot live inside a `<novo-field>` (it isn't a
 * `NovoFieldControl`), so stories here use a plain `<label>`.
 */
export const Default: Story = {
  args: {
    placeholder: 'MM/DD/YYYY',
    military: false,
    disabled: false,
    weekStart: 0,
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

@Component({
  selector: 'my-appointment',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>Appointment</label>
    <!-- DEPRECATED: <novo-date-time-picker-input> is the legacy input variant.
         Prefer the modern composition for new code:
         <novo-field>
           <novo-label>Appointment</novo-label>
           <input novoInput [(ngModel)]="value" [picker]="picker" />
           <novo-picker-toggle [for]="picker"></novo-picker-toggle>
           <novo-date-time-picker #picker></novo-date-time-picker>
         </novo-field>
    -->
    <novo-date-time-picker-input
      [(ngModel)]="value"
      placeholder="MM/DD/YYYY"
    ></novo-date-time-picker-input>
  \`,
})
export class MyAppointmentComponent {
  value: Date = new Date('2026-05-14T09:30:00');
}`,
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      value: new Date('2026-05-14T09:30:00'),
    },
    template: `
      <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
        Appointment
      </label>
      <novo-date-time-picker-input
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [military]="military"
        [disabled]="disabled"
        [weekStart]="weekStart"
      ></novo-date-time-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Min24Hour                                                                */
/* -------------------------------------------------------------------------- */

/**
 * 24-hour ("military") time formatting. Set `military="true"` to switch the
 * time input from 12-hour AM/PM to 24-hour. The date half is unaffected.
 */
export const Min24Hour: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

@Component({
  selector: 'my-military-time',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>12-hour (default)</label>
    <novo-date-time-picker-input [(ngModel)]="twelveHour"></novo-date-time-picker-input>

    <label>24-hour</label>
    <novo-date-time-picker-input
      [(ngModel)]="twentyFourHour"
      [military]="true"
    ></novo-date-time-picker-input>
  \`,
})
export class MyMilitaryTimeComponent {
  twelveHour: Date = new Date('2026-05-14T14:30:00');
  twentyFourHour: Date = new Date('2026-05-14T14:30:00');
}`,
      },
    },
  },
  render: () => ({
    props: {
      twelveHour: new Date('2026-05-14T14:30:00'),
      twentyFourHour: new Date('2026-05-14T14:30:00'),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 480px;">
        <div>
          <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
            12-hour (default)
          </label>
          <novo-date-time-picker-input [(ngModel)]="twelveHour"></novo-date-time-picker-input>
        </div>
        <div>
          <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
            24-hour
          </label>
          <novo-date-time-picker-input [(ngModel)]="twentyFourHour" [military]="true"></novo-date-time-picker-input>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. WithMinMax                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Bound the selectable range with `start` and `end`. Days outside the range
 * are visually disabled in the calendar overlay; typed-in dates outside the
 * range are rejected on commit.
 */
export const WithMinMax: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

@Component({
  selector: 'my-bounded-date',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>Date within May 2026</label>
    <novo-date-time-picker-input
      [(ngModel)]="value"
      [start]="start"
      [end]="end"
    ></novo-date-time-picker-input>
  \`,
})
export class MyBoundedDateComponent {
  value: Date = new Date('2026-05-14T10:00:00');
  start: Date = new Date('2026-05-01T00:00:00');
  end: Date = new Date('2026-05-31T23:59:59');
}`,
      },
    },
  },
  render: () => ({
    props: {
      value: new Date('2026-05-14T10:00:00'),
      start: new Date('2026-05-01T00:00:00'),
      end: new Date('2026-05-31T23:59:59'),
    },
    template: `
      <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
        Date within May 2026
      </label>
      <novo-date-time-picker-input
        [(ngModel)]="value"
        [start]="start"
        [end]="end"
      ></novo-date-time-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. Disabled                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Setting `disabled` on the input disables both the date and time halves
 * along with their overlay triggers.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

@Component({
  selector: 'my-readonly-timestamp',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>Read-only timestamp</label>
    <novo-date-time-picker-input
      [(ngModel)]="value"
      [disabled]="true"
    ></novo-date-time-picker-input>
  \`,
})
export class MyReadonlyTimestampComponent {
  value: Date = new Date('2026-05-14T09:30:00');
}`,
      },
    },
  },
  render: () => ({
    props: {
      value: new Date('2026-05-14T09:30:00'),
    },
    template: `
      <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
        Read-only timestamp
      </label>
      <novo-date-time-picker-input
        [(ngModel)]="value"
        [disabled]="true"
      ></novo-date-time-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. Required                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Mark the control as required for form validation. The `required` attribute
 * propagates to the inner date and time inputs and surfaces the standard
 * required-field indicator on the label.
 */
export const Required: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

@Component({
  selector: 'my-required-time',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>Start time <span style="color: #da4453;">*</span></label>
    <novo-date-time-picker-input
      [(ngModel)]="value"
      required
      name="startTime"
    ></novo-date-time-picker-input>
  \`,
})
export class MyRequiredTimeComponent {
  value: Date | null = null;
}`,
      },
    },
  },
  render: () => ({
    props: {
      value: null,
    },
    template: `
      <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
        Start time <span style="color: #da4453;">*</span>
      </label>
      <novo-date-time-picker-input
        [(ngModel)]="value"
        required
        name="startTime"
      ></novo-date-time-picker-input>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 7. Opened                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Calendar overlay opened, so visual-regression tooling snapshots the
 * interesting frame rather than the closed initial render. The `play`
 * function clicks the date input's calendar trigger icon, then asserts the
 * overlaid `<novo-date-picker>` is visible. The overlay is rendered into a
 * CDK portal on `document.body`, so the assertion uses `within(document.body)`.
 */
export const Opened: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

// The calendar overlay opens when the user clicks the date input or its
// calendar trigger icon — there is no public API to open it programmatically.
// This story uses a Storybook \`play\` function to click the input on render.
@Component({
  selector: 'my-pick-datetime',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>Pick a date and time</label>
    <novo-date-time-picker-input [(ngModel)]="value"></novo-date-time-picker-input>
  \`,
})
export class MyPickDatetimeComponent {
  value: Date = new Date('2026-05-14T09:30:00');
}`,
      },
    },
  },
  render: () => ({
    props: {
      value: new Date('2026-05-14T09:30:00'),
    },
    template: `
      <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
        Pick a date and time
      </label>
      <novo-date-time-picker-input [(ngModel)]="value"></novo-date-time-picker-input>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The inner `novo-date-picker-input` renders either a calendar icon
    // (`.bhi-calendar`, when empty) or a clear icon (`.bhi-times`, when
    // valued). Pre-populated above, so click the input itself to focus and
    // then click the calendar trigger to open the overlay.
    const dateInput = canvasElement.querySelector(
      'novo-date-picker-input input',
    ) as HTMLInputElement;
    await userEvent.click(dateInput);

    // The CDK overlay is portaled onto document.body — query there, not the
    // story canvas.
    const body = within(document.body);
    await waitFor(async () => {
      const calendar = body.queryAllByText(/sun|mon|tue|wed|thu|fri|sat/i);
      await expect(calendar.length).toBeGreaterThan(0);
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 8. Playground                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Sanity-check combinations or copy a code
 * snippet via the Source tab.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  args: {
    placeholder: 'MM/DD/YYYY',
    military: false,
    disabled: false,
    weekStart: 0,
    disabledDateMessage: '',
    name: '',
    format: '',
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts — every supported input wired up
import { FormsModule } from '@angular/forms';
import { NovoDateTimePickerModule } from 'novo-elements';

@Component({
  selector: 'my-datetime-playground',
  imports: [FormsModule, NovoDateTimePickerModule],
  template: \`
    <label>Date &amp; time</label>
    <novo-date-time-picker-input
      [(ngModel)]="value"
      [placeholder]="placeholder"
      [military]="military"
      [disabled]="disabled"
      [weekStart]="weekStart"
      [disabledDateMessage]="disabledDateMessage"
      [name]="name"
      [format]="format"
      [start]="start"
      [end]="end"
    ></novo-date-time-picker-input>
  \`,
})
export class MyDatetimePlaygroundComponent {
  value: Date = new Date('2026-05-14T09:30:00');
  placeholder = 'MM/DD/YYYY';
  military = false;
  disabled = false;
  weekStart = 0;
  disabledDateMessage: string | null = null;
  name: string | null = null;
  format: string | null = null;
  start: Date | null = null;
  end: Date | null = null;
}`,
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      value: new Date('2026-05-14T09:30:00'),
    },
    template: `
      <label style="display: block; font-size: 0.85rem; color: #4c545a; margin-bottom: 0.25rem;">
        Date &amp; time
      </label>
      <novo-date-time-picker-input
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [military]="military"
        [disabled]="disabled"
        [weekStart]="weekStart"
        [disabledDateMessage]="disabledDateMessage || null"
        [name]="name || null"
        [format]="format || null"
        [start]="start || null"
        [end]="end || null"
      ></novo-date-time-picker-input>
    `,
  }),
};
