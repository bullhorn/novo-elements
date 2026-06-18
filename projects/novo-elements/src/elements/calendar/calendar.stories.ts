import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, userEvent, waitFor } from 'storybook/test';

import { NovoCalendarElement } from './calendar.component';
import { NovoCalendarModule } from './Calendar.module';

/**
 * Stories for `<novo-calendar>`. Follows the conventions documented in
 * `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * `<novo-calendar>` is the visual month/year/day surface used internally by
 * the date-picker family. It is also exported as a standalone component so
 * consumers can drop an inline calendar onto a page — typically as a
 * dashboard filter, a date-driven sidebar, or any UI where a free-text date
 * input would be the wrong affordance.
 *
 * Composition vs. `<novo-date-picker-input>`:
 *   • Use `<novo-date-picker-input>` when the user needs to enter a date
 *     into a form. It wraps `<novo-calendar>` in a text input + CDK overlay.
 *   • Use `<novo-calendar>` directly when the calendar should be visible
 *     unconditionally — filters, "available dates" widgets, range editors.
 *
 * Selection modes are driven by `mode`:
 *   • `single`   — one date in/out (default).
 *   • `multiple` — a list of toggled dates.
 *   • `range`    — a contiguous start/end interval.
 *   • `week`     — a calendar week pinned to `weekStartsOn`.
 *
 * The component binds to a `Date[]` regardless of mode. Range/week store
 * `[start, end]`; multiple stores `[d1, d2, …]`. Use `[(selected)]` for
 * two-way binding (the demo example uses this) or read `selectedChange`.
 */
const meta: Meta<NovoCalendarElement> = {
  title: 'Calendar/Calendar',
  component: NovoCalendarElement,
  decorators: [
    moduleMetadata({
      imports: [NovoCalendarModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline calendar surface with month / year browsing and four selection ' +
          'modes (`single`, `multiple`, `range`, `week`). The same component powers ' +
          'the overlay inside `<novo-date-picker-input>` — reach for `<novo-calendar>` ' +
          'directly when the calendar should always be visible, e.g. as a dashboard ' +
          'filter.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range', 'week'],
      description:
        'Selection strategy. `single` (default) keeps one date; `multiple` toggles ' +
        'individual dates; `range` selects a contiguous interval (first click = start, ' +
        'second = end); `week` selects whole calendar weeks pinned to `weekStartsOn`.',
      table: { defaultValue: { summary: 'single' } },
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description:
        'First day of the week, `0` = Sunday … `6` = Saturday. Drives the column ' +
        'header order and (in `week` mode) the start of each selected interval.',
      table: { defaultValue: { summary: '0 (Sunday)' } },
    },
    numberOfMonths: {
      control: 'select',
      options: [1, 2, 3],
      description:
        'Number of month grids to render side-by-side. Useful for range pickers — ' +
        'two months let the user see and click both endpoints without paging.',
      table: { defaultValue: { summary: '1' } },
    },
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description:
        'When `numberOfMonths > 1`, controls whether additional months stack ' +
        '`vertical`ly or sit `horizontal`ly next to the first.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    activeView: {
      control: 'radio',
      options: ['days', 'months', 'years'],
      description:
        'Which sub-view is open. Defaults to `days`; clicking the month or year ' +
        'in the header swaps to the corresponding selector. Set explicitly to ' +
        'force the calendar open on the month or year picker.',
      table: { defaultValue: { summary: 'days' } },
    },
    minDate: {
      control: 'date',
      description: 'Earliest selectable date (inclusive). Earlier dates render disabled.',
    },
    maxDate: {
      control: 'date',
      description: 'Latest selectable date (inclusive). Later dates render disabled.',
    },
    disabledDateMessage: {
      control: 'text',
      description:
        'Tooltip shown when the user hovers a disabled (out-of-range) date. Prefer ' +
        'descriptive copy ("Date must be in the current quarter") over generic strings.',
    },
  },
};

export default meta;
type Story = StoryObj<NovoCalendarElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Design and usage guide. Covers when to reach for an inline `<novo-calendar>`
 * vs. a form-input variant, the selection-mode taxonomy, and accessibility
 * notes that aren't obvious from the API.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use an inline calendar</h2>
        <p style="margin: 0 0 1.25rem;">
          <code>&lt;novo-calendar&gt;</code> is the bare calendar surface — no
          input box, no overlay, no chrome around it. Use it when the calendar
          should always be visible on the page: dashboard filters, "available
          dates" widgets, the date pane of a custom scheduling tool, or any UI
          where forcing the user to click into an input would feel heavy.
          For form input (single-date field, range field, etc.) pick the
          wrapper components from the date-picker family instead.
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
              ✓ Use a calendar when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>An always-visible calendar drives page content (filters, dashboards)</li>
              <li>The user needs to scan many dates at a glance before picking</li>
              <li>Selection is the user's primary task on the view</li>
              <li>You need range or week selection without a separate input pair</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use a calendar when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>The date is one field among many on a form — use <code>&lt;novo-date-picker-input&gt;</code></li>
              <li>The user also needs to enter a time — use <code>&lt;novo-date-time-picker&gt;</code></li>
              <li>The valid set is small and named (Q1 / Q2 / …) — use a select</li>
              <li>Vertical space is at a premium — open it in an overlay instead</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Selection modes</h2>
        <p style="margin: 0 0 1rem;">
          Picked via the <code>mode</code> input. All four modes bind to a
          <code>Date[]</code> — the array's interpretation depends on the mode.
        </p>
        <table style="
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        ">
          <thead>
            <tr style="background: #f6f8fa;">
              <th style="text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid #e1e4e8;">Mode</th>
              <th style="text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid #e1e4e8;">Array shape</th>
              <th style="text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid #e1e4e8;">Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>single</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>[d]</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;">A single date — birthdays, anchor dates.</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>multiple</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>[d1, d2, …]</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;">An arbitrary set of dates — availability blocks.</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>range</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;"><code>[start, end]</code></td>
              <td style="padding: 0.6rem 0.75rem; border-bottom: 1px solid #f0f2f4;">Contiguous intervals — reporting windows, leave plans.</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0.75rem;"><code>week</code></td>
              <td style="padding: 0.6rem 0.75rem;"><code>[weekStart, weekEnd]</code></td>
              <td style="padding: 0.6rem 0.75rem;">Whole calendar weeks — timesheet pickers, sprint views.</td>
            </tr>
          </tbody>
        </table>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <ol style="margin: 0 0 2rem; padding-left: 1.25rem;">
          <li>
            <strong>Header</strong> — month/year text and prev/next arrows.
            Clicking the month text swaps the body to a month picker; clicking
            the year text swaps to a year picker.
          </li>
          <li>
            <strong>Body</strong> — one of three views: day grid
            (<code>activeView="days"</code>, the default), month grid
            (<code>"months"</code>), or year grid (<code>"years"</code>).
          </li>
          <li>
            <strong>Day cell</strong> — each day is a <code>&lt;novo-button&gt;</code>
            with <code>aria-selected</code> and <code>aria-disabled</code>
            reflecting state. Hovering a disabled day surfaces
            <code>disabledDateMessage</code> as a tooltip.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Two-way binding</h2>
        <p style="margin: 0 0 1rem;">
          The component is not a <code>ControlValueAccessor</code> — it doesn't
          plug into <code>ngModel</code>. Bind directly to <code>selected</code>
          with banana-in-a-box syntax (the canonical example does exactly this):
        </p>
        <pre style="
          background: #f6f8fa;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 0.85rem;
          margin: 0 0 2rem;
        "><code>&lt;novo-calendar
  [(selected)]="selection"
  [activeDate]="activeDate"
  mode="range"
  [numberOfMonths]="2"&gt;
&lt;/novo-calendar&gt;</code></pre>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>
            Every day cell sets <code>aria-selected</code> and
            <code>aria-disabled</code>; out-of-range cells additionally carry
            <code>title="…disabledDateMessage…"</code> as a fallback tooltip.
          </li>
          <li>
            <code>Tab</code> moves focus through day, prev/next, and view-swap
            controls in source order. <code>Enter</code> / <code>Space</code>
            activate a day cell (it's a <code>&lt;novo-button&gt;</code>).
          </li>
          <li>
            Provide <code>minDate</code> / <code>maxDate</code> + a meaningful
            <code>disabledDateMessage</code> when the selectable window is
            constrained — silently disabled days are confusing.
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
 * The simplest usage — a single-date calendar with two-way `selected`
 * binding. Every input on the meta is bound to the template; mutate any
 * control in the panel to see it reflected.
 */
export const Default: Story = {
  args: {
    mode: 'single',
    weekStartsOn: 0,
    numberOfMonths: 1,
    layout: 'horizontal',
    activeView: 'days',
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoCalendarModule } from 'novo-elements';

@Component({
  selector: 'my-calendar',
  imports: [NovoCalendarModule],
  templateUrl: './my-calendar.component.html',
})
export class MyCalendarComponent {
  activeDate = new Date();
  selection: Date[] = [];
}

// component.html
<novo-calendar
  [activeDate]="activeDate"
  [(selected)]="selection"
></novo-calendar>`,
      },
    },
  },
  render: (args) => ({
    props: { ...args, activeDate: new Date(), selection: [] as Date[] },
    template: `
      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
        [mode]="mode"
        [weekStartsOn]="weekStartsOn"
        [numberOfMonths]="numberOfMonths"
        [layout]="layout"
        [activeView]="activeView"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [disabledDateMessage]="disabledDateMessage"
      ></novo-calendar>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. Modes                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * All four selection strategies side-by-side. Click around to see how the
 * `selected` array is interpreted differently in each case — `range` and
 * `week` highlight a contiguous span; `multiple` toggles individual dates.
 */
export const Modes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Same component; the mode input swaps the selection strategy. -->
<novo-calendar mode="single"   [(selected)]="single"></novo-calendar>
<novo-calendar mode="multiple" [(selected)]="multi"></novo-calendar>
<novo-calendar mode="range"    [(selected)]="range"></novo-calendar>
<novo-calendar mode="week"     [(selected)]="week"></novo-calendar>`,
      },
    },
  },
  render: () => {
    const today = new Date();
    return {
      props: {
        activeDate: today,
        singleSel: [] as Date[],
        multiSel: [] as Date[],
        rangeSel: [] as Date[],
        weekSel: [] as Date[],
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(260px, max-content)); gap: 2rem; align-items: start;">
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">single</div>
            <novo-calendar [activeDate]="activeDate" [(selected)]="singleSel" mode="single"></novo-calendar>
          </div>
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">multiple</div>
            <novo-calendar [activeDate]="activeDate" [(selected)]="multiSel" mode="multiple"></novo-calendar>
          </div>
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">range</div>
            <novo-calendar [activeDate]="activeDate" [(selected)]="rangeSel" mode="range"></novo-calendar>
          </div>
          <div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">week</div>
            <novo-calendar [activeDate]="activeDate" [(selected)]="weekSel" mode="week"></novo-calendar>
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 4. RangeWithTwoMonths                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Range mode reads more naturally with two months side-by-side — the user
 * can see and click both endpoints without paging. Set
 * `numberOfMonths="2"` (or `3` for very wide displays). The optional
 * `layout="vertical"` flag stacks the extra months below the first instead
 * of beside it.
 */
export const RangeWithTwoMonths: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Two-month range picker — classic reporting-window UX. -->
<novo-calendar
  [(selected)]="range"
  mode="range"
  [numberOfMonths]="2"
></novo-calendar>`,
      },
    },
  },
  render: () => ({
    props: {
      activeDate: new Date(),
      range: [] as Date[],
    },
    template: `
      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="range"
        mode="range"
        [numberOfMonths]="2"
      ></novo-calendar>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. WeekStart                                                                */
/* -------------------------------------------------------------------------- */

/**
 * `weekStartsOn` controls which day the grid begins on, from `0` (Sunday)
 * through `6` (Saturday). Most of Europe and ISO 8601 use Monday; many
 * Middle Eastern locales use Saturday. The two side-by-side calendars
 * below render the same dates with two different starts.
 */
export const WeekStart: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- weekStartsOn: 0 = Sunday … 6 = Saturday. -->
<novo-calendar [(selected)]="selA" [weekStartsOn]="0"></novo-calendar>
<novo-calendar [(selected)]="selB" [weekStartsOn]="1"></novo-calendar>`,
      },
    },
  },
  render: () => ({
    props: {
      activeDate: new Date(),
      selA: [] as Date[],
      selB: [] as Date[],
    },
    template: `
      <div style="display: flex; gap: 2rem; align-items: start;">
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">Sunday start (US default)</div>
          <novo-calendar [activeDate]="activeDate" [(selected)]="selA" [weekStartsOn]="0"></novo-calendar>
        </div>
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">Monday start (ISO 8601 / EU)</div>
          <novo-calendar [activeDate]="activeDate" [(selected)]="selB" [weekStartsOn]="1"></novo-calendar>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithMinMax                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Constrain the selectable window with `minDate` / `maxDate`. Out-of-range
 * dates render with the `[disabled]` attribute on their day-cell button
 * and surface `disabledDateMessage` as a tooltip on hover.
 */
export const WithMinMax: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Restrict the selectable window to the next 14 days.
@Component({ ... })
export class BoundedCalendarComponent {
  activeDate = new Date();
  selection: Date[] = [];
  minDate = new Date();
  maxDate = (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d; })();
}

// template
<novo-calendar
  [activeDate]="activeDate"
  [(selected)]="selection"
  [minDate]="minDate"
  [maxDate]="maxDate"
  disabledDateMessage="Choose a date within the next two weeks"
></novo-calendar>`,
      },
    },
  },
  render: () => {
    const today = new Date();
    const max = new Date(today);
    max.setDate(today.getDate() + 14);
    return {
      props: {
        activeDate: today,
        selection: [] as Date[],
        minDate: today,
        maxDate: max,
        tooltip: 'Choose a date within the next two weeks',
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 360px;">
          <novo-calendar
            [activeDate]="activeDate"
            [(selected)]="selection"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [disabledDateMessage]="tooltip"
          ></novo-calendar>
          <div style="font-size: 0.85rem; color: #555;">
            Selectable: {{ minDate | date }} – {{ maxDate | date }}
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 7. PreselectedDates                                                         */
/* -------------------------------------------------------------------------- */

/**
 * The `selected` input accepts a `Date[]` so a calendar can be pre-populated
 * with known dates — useful for editing an existing record, or for a
 * "your availability" widget where the persisted state is restored on
 * load. Empty arrays render with no selection.
 */
export const PreselectedDates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'typescript',
        code: `// Hydrate the calendar from existing persisted state.
@Component({ ... })
export class PreselectedCalendarComponent {
  activeDate = new Date('2026-05-15');
  // The user's previously-saved availability — three dates this month.
  selection: Date[] = [
    new Date('2026-05-05'),
    new Date('2026-05-12'),
    new Date('2026-05-21'),
  ];
}

// template
<novo-calendar
  [activeDate]="activeDate"
  [(selected)]="selection"
  mode="multiple"
></novo-calendar>`,
      },
    },
  },
  render: () => {
    const anchor = new Date();
    anchor.setDate(1);
    const d1 = new Date(anchor); d1.setDate(5);
    const d2 = new Date(anchor); d2.setDate(12);
    const d3 = new Date(anchor); d3.setDate(21);
    return {
      props: {
        activeDate: anchor,
        selection: [d1, d2, d3],
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <novo-calendar
            [activeDate]="activeDate"
            [(selected)]="selection"
            mode="multiple"
          ></novo-calendar>
          <div style="font-size: 0.85rem; color: #555;">
            Selected ({{ selection.length }}):
            <span *ngFor="let d of selection; let last = last">
              {{ d | date:'mediumDate' }}<span *ngIf="!last">, </span>
            </span>
          </div>
        </div>
      `,
    };
  },
};

/* -------------------------------------------------------------------------- */
/* 8. MonthAndYearSelectors                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Open the calendar directly on the month-picker or year-picker view. The
 * header's month/year text is also clickable — try toggling between the
 * three sub-views inside one calendar by clicking the month, then the
 * year, then a day in the grid.
 */
export const MonthAndYearSelectors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- activeView: 'days' (default) | 'months' | 'years' -->
<novo-calendar [(selected)]="sel" activeView="months"></novo-calendar>
<novo-calendar [(selected)]="sel" activeView="years"></novo-calendar>`,
      },
    },
  },
  render: () => ({
    props: {
      activeDate: new Date(),
      monthSel: [] as Date[],
      yearSel: [] as Date[],
    },
    template: `
      <div style="display: flex; gap: 2rem; align-items: start;">
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">activeView="months"</div>
          <novo-calendar [activeDate]="activeDate" [(selected)]="monthSel" activeView="months"></novo-calendar>
        </div>
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">activeView="years"</div>
          <novo-calendar [activeDate]="activeDate" [(selected)]="yearSel" activeView="years"></novo-calendar>
        </div>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. NavigateMonths (play)                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Driven interaction: clicks the calendar's "next month" arrow and asserts
 * the header label updates. The arrows are `<novo-button>` instances with
 * `data-automation-id="calendar-next"` / `"calendar-previous"` — we scope
 * to those for stable lookup, and click by role (the host has
 * `role="button"`, not a native `<button>` underneath).
 */
export const NavigateMonths: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Calendar navigation arrows are <novo-button> instances with
     data-automation-id="calendar-previous" / "calendar-next". -->
<novo-calendar [activeDate]="activeDate" [(selected)]="sel"></novo-calendar>`,
      },
    },
  },
  render: () => ({
    props: {
      activeDate: new Date(2026, 4, 15), // May 2026 — stable so the assertion is reproducible
      selection: [] as Date[],
    },
    template: `
      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
      ></novo-calendar>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const readHeader = () =>
      canvasElement.querySelector(
        '[data-automation-id="header-month"]',
      ) as HTMLElement | null;

    await step('starts on May', async () => {
      await waitFor(() => {
        const header = readHeader();
        expect(header).not.toBeNull();
        expect(header!.textContent || '').toMatch(/May/i);
      });
    });

    await step('clicking "next" advances to June', async () => {
      // novo-button sets role="button" on its host; click the host directly so
      // the (click) listener fires (clicks on a wrapper bubble up but never
      // reach the host listener).
      const next = canvasElement.querySelector(
        '[data-automation-id="calendar-next"]',
      ) as HTMLElement;
      expect(next).not.toBeNull();
      await userEvent.click(next);

      await waitFor(() => {
        expect(readHeader()!.textContent || '').toMatch(/Jun/i);
      });
    });

    await step('clicking "previous" returns to May', async () => {
      const prev = canvasElement.querySelector(
        '[data-automation-id="calendar-previous"]',
      ) as HTMLElement;
      expect(prev).not.toBeNull();
      await userEvent.click(prev);

      await waitFor(() => {
        expect(readHeader()!.textContent || '').toMatch(/May/i);
      });
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 10. SelectDay (play)                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Driven interaction: clicks day "15" and asserts the cell's
 * `aria-selected` flips to `true`. Each day cell wraps a `<novo-button>`
 * with `data-automation-id="<day-number>"`, and the surrounding
 * `.calendar-date` div carries the `aria-selected` attribute.
 */
export const SelectDay: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'html',
        code: `<!-- Day cells expose data-automation-id="<n>" on both the wrapper and
     the inner <novo-button>; aria-selected lives on the wrapper. -->
<novo-calendar [activeDate]="activeDate" [(selected)]="sel"></novo-calendar>`,
      },
    },
  },
  render: () => ({
    props: {
      activeDate: new Date(2026, 4, 1), // May 1, 2026
      selection: [] as Date[],
    },
    template: `
      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
      ></novo-calendar>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const cellSel = '.calendar-date:not(.notinmonth)[data-automation-id="15"]';

    await step('day 15 starts unselected', async () => {
      const cells = canvasElement.querySelectorAll(
        '.calendar-date[data-automation-id="15"]',
      );
      expect(cells.length).toBeGreaterThan(0);
      const inMonth = canvasElement.querySelector(cellSel) as HTMLElement;
      expect(inMonth).toBeDefined();
      // The wrapper sets `aria-selected` to the bound date string (e.g.
      // "Fri May 15 2026 …") when the day is in the selection, and leaves
      // the attribute unset / null otherwise. So "unselected" reads as a
      // falsy attribute, not the literal string "false".
      expect(inMonth.getAttribute('aria-selected')).toBeFalsy();
    });

    await step('clicking day 15 selects it', async () => {
      // Click the inner novo-button (host has role="button").
      const button = canvasElement.querySelector(`${cellSel} novo-button`) as HTMLElement;
      expect(button).not.toBeNull();
      await userEvent.click(button);

      await waitFor(() => {
        const cell = canvasElement.querySelector(cellSel) as HTMLElement;
        // After selection, aria-selected becomes a truthy date string —
        // not the literal "true". Assert against truthiness, not a value.
        expect(cell.getAttribute('aria-selected')).toBeTruthy();
      });
    });
  },
};

/* -------------------------------------------------------------------------- */
/* 11. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Every input wired to a control. Mutate `mode`, `numberOfMonths`,
 * `weekStartsOn`, etc. and watch the calendar reflow.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { NovoCalendarModule } from 'novo-elements';

@Component({
  selector: 'my-calendar-playground',
  imports: [NovoCalendarModule],
  templateUrl: './my-calendar-playground.component.html',
})
export class MyCalendarPlaygroundComponent {
  activeDate = new Date();
  selection: Date[] = [];
  mode: 'single' | 'multiple' | 'range' | 'week' = 'range';
  numberOfMonths = 2;
  weekStartsOn = 0;
}

// component.html
<novo-calendar
  [activeDate]="activeDate"
  [(selected)]="selection"
  [mode]="mode"
  [numberOfMonths]="numberOfMonths"
  [weekStartsOn]="weekStartsOn"
></novo-calendar>`,
      },
    },
  },
  args: {
    mode: 'range',
    weekStartsOn: 0,
    numberOfMonths: 2,
    layout: 'horizontal',
    activeView: 'days',
    disabledDateMessage: 'This date is outside the selectable range',
  },
  render: (args) => ({
    props: { ...args, activeDate: new Date(), selection: [] as Date[] },
    template: `
      <novo-calendar
        [activeDate]="activeDate"
        [(selected)]="selection"
        [mode]="mode"
        [weekStartsOn]="weekStartsOn"
        [numberOfMonths]="numberOfMonths"
        [layout]="layout"
        [activeView]="activeView"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [disabledDateMessage]="disabledDateMessage"
      ></novo-calendar>
    `,
  }),
};
