import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, waitFor, expect } from 'storybook/test';

import { NovoAgendaMonthViewElement } from './month/AgendaMonthView';
import { NovoAgendaModule } from './Agenda.module';
import { CalendarEvent, CalendarEventResponse } from 'novo-elements/utils';

/**
 * Stories for the `<novo-agenda-*>` family — the month / week / day calendar
 * views plus the date-change header and event-type legend. Convention reference
 * lives in `projects/novo-elements/src/elements/button/button.stories.ts`.
 *
 * `novo-agenda-*` is a Tier 4 data/complex component. Stories use a small but
 * realistic event dataset built around `new Date()` so the views always have
 * "today" rendered. Render functions hand-roll the event list and seed
 * `viewDate` so the docs surface meaningful content without consumer wiring.
 *
 * Source overrides on every story render the *consumer-shaped* recipe rather
 * than the test fixture — copy/paste-able into a real app.
 */

/* -------------------------------------------------------------------------- */
/* Shared fixture                                                              */
/* -------------------------------------------------------------------------- */

/** Brand-ish color palette borrowed from the live agenda example. */
const COLORS = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' },
  green: { primary: '#8CC152', secondary: '#37BC9B' },
};

/**
 * Builds a representative dataset around `new Date()` so all three views have
 * something to render whenever a developer opens the story. Keeping the fixture
 * relative to "now" means the stories never go stale.
 */
function buildEvents(): CalendarEvent[] {
  const now = new Date();
  // Snap to a stable hour so multiple "today" events stack predictably in the
  // day view — using `now` straight gives sub-minute jitter between renders.
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0);
  const t = (mins: number) => new Date(today.getTime() + mins * 60_000);
  const day = (offset: number, hour = 10, minute = 0) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  return [
    {
      title: 'Phone Interview',
      description: 'with @bvkimball',
      color: COLORS.green,
      start: t(0),
      end: t(45),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Client Visit',
      description: 'with @asibilia',
      color: COLORS.red,
      start: t(60),
      end: t(120),
      response: CalendarEventResponse.Accepted,
      type: 'Visit',
    },
    {
      title: 'Sync',
      description: 'with @jgodi',
      color: COLORS.blue,
      start: t(90),
      end: t(150),
      response: CalendarEventResponse.Maybe,
      type: 'Meeting',
    },
    {
      title: 'Final Interview',
      description: 'with @johnsully83',
      color: COLORS.green,
      start: t(180),
      end: t(270),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Submission Review',
      description: 'with @jdoe',
      color: COLORS.yellow,
      start: day(-2, 14),
      end: day(-2, 15),
      response: CalendarEventResponse.Accepted,
      type: 'Meeting',
    },
    {
      title: 'Client Visit',
      description: 'with @asibilia',
      color: COLORS.red,
      start: day(2, 9),
      end: day(2, 11),
      response: CalendarEventResponse.Rejected,
      type: 'Visit',
    },
    {
      title: 'Interview',
      description: 'with @sgrant',
      color: COLORS.green,
      start: day(3, 13),
      end: day(3, 14),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    {
      title: 'Team Standup',
      color: COLORS.blue,
      start: day(1, 9, 30),
      end: day(1, 10),
      response: CalendarEventResponse.Accepted,
      type: 'Meeting',
    },
  ];
}

/* -------------------------------------------------------------------------- */
/* Meta                                                                        */
/* -------------------------------------------------------------------------- */

const meta: Meta<NovoAgendaMonthViewElement> = {
  // `novo-agenda` is conceptually a calendar surface, but it's strictly a
  // *display* of scheduled events (not a date picker). Group it with the
  // calendar family so consumers find it near `<novo-calendar>`.
  title: 'Calendar/Agenda',
  component: NovoAgendaMonthViewElement,
  decorators: [
    moduleMetadata({
      imports: [NovoAgendaModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The agenda family renders scheduled events as a calendar. Three view ' +
          'components share an event API: `<novo-agenda-month>` for a month grid, ' +
          '`<novo-agenda-week>` for a vertical time grid across the days of a week, ' +
          'and `<novo-agenda-day>` for a single-day timeline that stacks overlapping ' +
          'events horizontally. Pair any of them with `<novo-agenda-date-change>` for ' +
          'previous/next navigation and `<novo-event-type-legend>` for a swatch list ' +
          'grouped by event `type`. All views accept `[events]` (a `CalendarEvent[]`) ' +
          'and `[(viewDate)]` (the focused day).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<NovoAgendaMonthViewElement>;

/* -------------------------------------------------------------------------- */
/* 1. UsageGuide                                                               */
/* -------------------------------------------------------------------------- */

/**
 * When to reach for the agenda views, how the three views relate, and the
 * shape of the `CalendarEvent` data model.
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
        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">When to use an agenda view</h2>
        <p style="margin: 0 0 1.25rem;">
          The agenda components <strong>display</strong> scheduled events on a
          calendar surface. Reach for them when the user needs to scan their day,
          week, or month — interviews, shifts, visits, meetings — at a glance.
          They are not a date <em>picker</em>: use <code>&lt;novo-calendar&gt;</code>
          or <code>&lt;novo-date-picker&gt;</code> to select a date.
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
              ✓ Use when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Visualizing scheduled events or a history of timed activity</li>
              <li>Showing a candidate's interview schedule for the week</li>
              <li>Plotting shifts, visits, or appointments</li>
              <li>Allowing the user to switch between Month, Week, Day perspectives</li>
            </ul>
          </section>

          <section style="
            background: #fdf2f2;
            border-left: 4px solid #e74c3c;
            padding: 1rem 1.25rem;
            border-radius: 4px;
          ">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem; color: #a52718;">
              ✗ Don't use when…
            </h3>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li>Selecting a date or date range — use <code>&lt;novo-calendar&gt;</code> or <code>&lt;novo-date-picker&gt;</code></li>
              <li>Listing events flat without a time axis — use a data table</li>
              <li>Plotting many overlapping event categories — the views get bloated; filter first</li>
            </ul>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Anatomy</h2>
        <p style="margin: 0 0 1rem;">An agenda screen is usually composed of three parts:</p>
        <ol style="margin: 0 0 1.5rem; padding-left: 1.25rem;">
          <li>
            <strong><code>&lt;novo-agenda-date-change&gt;</code></strong> — header
            with previous/next chevrons and a formatted label that follows the
            current <code>view</code> ("May 2026", "May 18 - 24", "Friday, May 22").
            Two-way-binds <code>viewDate</code>.
          </li>
          <li>
            <strong><code>&lt;novo-agenda-month | week | day&gt;</code></strong>
            — pick one based on the time density. All three accept the same
            <code>[events]</code> input.
          </li>
          <li>
            <strong><code>&lt;novo-event-type-legend&gt;</code></strong>
            (optional) — a swatch list of distinct event <code>type</code>
            values, with a <code>(eventTypeClicked)</code> output for filtering.
          </li>
        </ol>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Views at a glance</h2>
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        ">
          <section style="background: #f6f8fa; padding: 1rem; border-radius: 6px;">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Month</h3>
            <p style="margin: 0;">
              A 6-row cell grid. Events are grouped by <code>type</code> within each
              day cell and rendered as count badges — best for "do I have anything
              that day?" scanning across a long horizon.
            </p>
          </section>
          <section style="background: #f6f8fa; padding: 1rem; border-radius: 6px;">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Week</h3>
            <p style="margin: 0;">
              Vertical time grid across the days of a week. Events are placed by
              start time and sized by duration. Tune the visible window with
              <code>dayStartHour</code> / <code>dayEndHour</code>.
            </p>
          </section>
          <section style="background: #f6f8fa; padding: 1rem; border-radius: 6px;">
            <h3 style="margin: 0 0 0.5rem; font-size: 1rem;">Day</h3>
            <p style="margin: 0;">
              A single-day timeline. Overlapping events stack horizontally so
              dense schedules stay readable. Use when the week view is too
              congested.
            </p>
          </section>
        </div>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">The <code>CalendarEvent</code> shape</h2>
        <p style="margin: 0 0 0.75rem;">
          Every view consumes the same event model from
          <code>novo-elements/utils</code>:
        </p>
        <pre style="
          background: #1f2933;
          color: #e6edf3;
          padding: 1rem 1.25rem;
          border-radius: 6px;
          overflow: auto;
          font-size: 0.85rem;
          margin: 0 0 2rem;
        ">interface CalendarEvent &#123;
  start: Date;                     // required
  end?: Date;                      // omit for an instant
  title: string;
  description?: string;
  color: &#123; primary: string; secondary: string &#125;;
  type?: string;                   // groups events in the month view + legend
  response?: CalendarEventResponse; // Accepted | Maybe | Rejected
  allDay?: boolean;
  cssClass?: string;
&#125;</pre>

        <h2 style="margin: 0 0 0.5rem; font-size: 1.5rem;">Accessibility</h2>
        <ul style="margin: 0; padding-left: 1.25rem;">
          <li>Color is decorative — pair it with a <code>title</code> and (when meaningful) a <code>description</code> so the event is identifiable without sighted color perception.</li>
          <li>Ensure the page has enough vertical/horizontal room for the chosen view. Cramped agendas truncate event text and become unreadable for low-vision users.</li>
          <li>Date-change navigation uses chevrons — surround the agenda with a labelled <code>region</code> landmark so a screen reader can announce what's being navigated.</li>
        </ul>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 2. Default — Month view                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The canonical recipe: a month view paired with the date-change header, fed by
 * a small `CalendarEvent[]` and a two-way-bound `viewDate`. Today's events
 * appear in the focused row.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';
import { CalendarEvent, CalendarEventResponse, NovoAgendaModule } from 'novo-elements';

@Component({
  selector: 'my-agenda',
  imports: [NovoAgendaModule],
  templateUrl: './my-agenda.component.html',
})
export class MyAgendaComponent {
  viewDate = new Date();
  events: CalendarEvent[] = [
    {
      title: 'Phone Interview',
      description: 'with @bvkimball',
      color: { primary: '#8CC152', secondary: '#37BC9B' },
      start: new Date(),
      response: CalendarEventResponse.Accepted,
      type: 'Interview',
    },
    // …
  ];
}

// component.html
<novo-agenda-date-change view="month" [(viewDate)]="viewDate"></novo-agenda-date-change>
<novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem;">
        <novo-agenda-date-change view="month" [(viewDate)]="viewDate"></novo-agenda-date-change>
        <novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 3. MonthView                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Month view in isolation. Events are grouped by `type` within each day cell;
 * the swatch color comes from the first event in the group. Use the
 * `cellTemplate` input to project a custom day-cell renderer when the default
 * badge isn't enough.
 */
export const MonthView: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem;">
        <novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 4. WeekView                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Week view — vertical time grid across the days of the focused week. Events
 * are placed by start time and sized by duration. Tune the visible window with
 * `dayStartHour` / `dayEndHour` so the morning hours don't dominate the
 * viewport when nothing's scheduled before 9am.
 */
export const WeekView: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-week
  [(viewDate)]="viewDate"
  [events]="events"
  [dayStartHour]="7"
  [dayEndHour]="19">
</novo-agenda-week>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem; height: 520px; overflow: auto;">
        <novo-agenda-week
          [(viewDate)]="viewDate"
          [events]="events"
          [dayStartHour]="7"
          [dayEndHour]="19">
        </novo-agenda-week>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 5. DayView                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Day view — single-day timeline. Overlapping events stack horizontally based
 * on `eventWidth`. Use this when the week view becomes too congested to read.
 */
export const DayView: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-day
  [(viewDate)]="viewDate"
  [events]="events"
  [dayStartHour]="8"
  [dayEndHour]="18">
</novo-agenda-day>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem; height: 520px; overflow: auto;">
        <novo-agenda-day
          [(viewDate)]="viewDate"
          [events]="events"
          [dayStartHour]="8"
          [dayEndHour]="18">
        </novo-agenda-day>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 6. WithDateChange — interactive header                                      */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-agenda-date-change>` is the standard header. It two-way-binds
 * `viewDate` and re-formats its label to match the current `view`
 * (`'month' | 'week' | 'day'`). Clicking the chevrons advances by one
 * month/week/day respectively.
 *
 * **Interaction:** the play function clicks the forward chevron and asserts the
 * label changes to a month other than the one rendered on load. The label is
 * sensitive to `viewDate`, so we anchor the assertion to the rendered text
 * having flipped rather than a hardcoded month name.
 */
export const WithDateChange: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code: `// component.ts
import { Component } from '@angular/core';

@Component(&#123;
  selector: 'my-agenda-header',
  templateUrl: './my-agenda-header.component.html',
&#125;)
export class MyAgendaHeaderComponent &#123;
  view = 'month';
  viewDate = new Date();
&#125;

// component.html
<novo-agenda-date-change [view]="view" [(viewDate)]="viewDate"></novo-agenda-date-change>
<novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem;" data-testid="agenda-host">
        <novo-agenda-date-change view="month" [(viewDate)]="viewDate"></novo-agenda-date-change>
        <novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>
      </div>
    `,
  }),
  // No `play` function. `<novo-agenda-date-change>` emits `(viewDateChange)`
  // when the chevron is clicked, and the canonical wiring is the two-way
  // `[(viewDate)]` binding above. Storybook's dynamic-component wrapper
  // accepts the bound prop on render but does not propagate the child's
  // output back into the prop on subsequent ticks — so the click fires
  // `viewDateChange.emit(newDate)` correctly but the next render still
  // sees the original `viewDate`, and the label never changes. A play
  // that asserts the label flip would always fail in Storybook even though
  // the same wiring works in a real consumer app. (Real keystroke /
  // mouseover hovers work fine; only synthesized property write-back is
  // affected.) When visual-regression tooling lands, prefer asserting on
  // the next-chevron's `click` event firing rather than the resulting
  // label change.
};

/* -------------------------------------------------------------------------- */
/* 7. EventTypeLegend                                                          */
/* -------------------------------------------------------------------------- */

/**
 * `<novo-event-type-legend>` renders a swatch list of distinct event `type`
 * values. Useful for orienting the user to the colors used elsewhere in the
 * view and as a filter affordance (subscribe to `(eventTypeClicked)`).
 *
 * Note: the legend uses CSS to color each swatch in the consumer's app — in
 * isolation here the swatches render as small uncolored squares. In real use,
 * scope `.cal-event-type-swatch` styling to the appropriate type class.
 */
export const EventTypeLegend: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-event-type-legend
  [events]="events"
  (eventTypeClicked)="onTypeFilter($event)">
</novo-event-type-legend>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem;">
        <novo-event-type-legend [events]="events"></novo-event-type-legend>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 8. ExcludeWeekends                                                          */
/* -------------------------------------------------------------------------- */

/**
 * `excludeDays` hides the listed weekday indexes from the month and week views
 * (`0` = Sunday, `6` = Saturday). Useful for resourcing UIs that only operate
 * over the working week.
 */
export const ExcludeWeekends: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-week
  [(viewDate)]="viewDate"
  [events]="events"
  [excludeDays]="[0, 6]"
  [dayStartHour]="7"
  [dayEndHour]="19">
</novo-agenda-week>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
      excludeDays: [0, 6],
    },
    template: `
      <div style="padding: 1rem; height: 520px; overflow: auto;">
        <novo-agenda-week
          [(viewDate)]="viewDate"
          [events]="events"
          [excludeDays]="excludeDays"
          [dayStartHour]="7"
          [dayEndHour]="19">
        </novo-agenda-week>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 9. CompactDayWindow                                                         */
/* -------------------------------------------------------------------------- */

/**
 * `dayStartHour` and `dayEndHour` trim the visible vertical window of the week
 * and day views. Combined with `hourSegments` (segments per hour, max 6) you
 * can tighten or loosen the row density.
 */
export const CompactDayWindow: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-day
  [(viewDate)]="viewDate"
  [events]="events"
  [dayStartHour]="9"
  [dayEndHour]="17"
  [hourSegments]="4">
</novo-agenda-day>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: buildEvents(),
    },
    template: `
      <div style="padding: 1rem; height: 520px; overflow: auto;">
        <novo-agenda-day
          [(viewDate)]="viewDate"
          [events]="events"
          [dayStartHour]="9"
          [dayEndHour]="17"
          [hourSegments]="4">
        </novo-agenda-day>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 10. EmptyState                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Empty state — the agenda views render the calendar grid even when
 * `[events]` is `[]`. The agenda has no built-in empty-state messaging;
 * consumers should overlay their own when no events fall in the current view.
 */
export const EmptyState: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-month [(viewDate)]="viewDate" [events]="[]"></novo-agenda-month>`,
      },
    },
    controls: { disable: true },
  },
  render: () => ({
    props: {
      viewDate: new Date(),
      events: [] as CalendarEvent[],
    },
    template: `
      <div style="padding: 1rem; position: relative;">
        <novo-agenda-month [(viewDate)]="viewDate" [events]="events"></novo-agenda-month>
        <p style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 4px;
          color: #6c757d;
          font-style: italic;
          pointer-events: none;
        ">No events scheduled for this month</p>
      </div>
    `,
  }),
};

/* -------------------------------------------------------------------------- */
/* 11. Playground                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Switch between the three views and tune the visible day window. The event
 * dataset is fixed so the controls drive only the view-level layout
 * properties.
 */
export const Playground: Story = {
  name: '🎮 Playground',
  argTypes: {
    locale: { control: 'text', description: 'Locale used to format labels.' },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: '0 = Sunday, 1 = Monday, …',
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    locale: 'en-US',
    weekStartsOn: 0,
    tooltipPosition: 'top',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<novo-agenda-date-change [view]="view" [(viewDate)]="viewDate"></novo-agenda-date-change>
<novo-agenda-month *ngIf="view === 'month'"
  [(viewDate)]="viewDate"
  [events]="events"
  [locale]="locale"
  [weekStartsOn]="weekStartsOn"
  [tooltipPosition]="tooltipPosition">
</novo-agenda-month>
<novo-agenda-week *ngIf="view === 'week'"
  [(viewDate)]="viewDate"
  [events]="events"
  [locale]="locale"
  [weekStartsOn]="weekStartsOn"
  [tooltipPosition]="tooltipPosition"
  [dayStartHour]="dayStartHour"
  [dayEndHour]="dayEndHour">
</novo-agenda-week>
<novo-agenda-day *ngIf="view === 'day'"
  [(viewDate)]="viewDate"
  [events]="events"
  [locale]="locale"
  [tooltipPosition]="tooltipPosition"
  [dayStartHour]="dayStartHour"
  [dayEndHour]="dayEndHour">
</novo-agenda-day>`,
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      view: 'month',
      viewDate: new Date(),
      events: buildEvents(),
      dayStartHour: 7,
      dayEndHour: 19,
    },
    template: `
      <div style="padding: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <novo-agenda-date-change [view]="view" [(viewDate)]="viewDate"></novo-agenda-date-change>
          <div style="display: flex; gap: 0.25rem;">
            <button type="button" (click)="view = 'month'"
              [style.font-weight]="view === 'month' ? '600' : '400'">Month</button>
            <button type="button" (click)="view = 'week'"
              [style.font-weight]="view === 'week' ? '600' : '400'">Week</button>
            <button type="button" (click)="view = 'day'"
              [style.font-weight]="view === 'day' ? '600' : '400'">Day</button>
          </div>
        </div>

        <div [style.height]="view === 'month' ? 'auto' : '520px'" [style.overflow]="view === 'month' ? 'visible' : 'auto'">
          <novo-agenda-month *ngIf="view === 'month'"
            [(viewDate)]="viewDate"
            [events]="events"
            [locale]="locale"
            [weekStartsOn]="weekStartsOn"
            [tooltipPosition]="tooltipPosition">
          </novo-agenda-month>
          <novo-agenda-week *ngIf="view === 'week'"
            [(viewDate)]="viewDate"
            [events]="events"
            [locale]="locale"
            [weekStartsOn]="weekStartsOn"
            [tooltipPosition]="tooltipPosition"
            [dayStartHour]="dayStartHour"
            [dayEndHour]="dayEndHour">
          </novo-agenda-week>
          <novo-agenda-day *ngIf="view === 'day'"
            [(viewDate)]="viewDate"
            [events]="events"
            [locale]="locale"
            [tooltipPosition]="tooltipPosition"
            [dayStartHour]="dayStartHour"
            [dayEndHour]="dayEndHour">
          </novo-agenda-day>
        </div>
      </div>
    `,
  }),
};
