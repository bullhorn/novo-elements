---
section: Components
page: Agenda
title: Design
order: 1
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">

<div>
Used to help display scheduled events for the day/week/month. The agenda component allow you to display events for any range grouped by days.  You can provide custom templates to each view to modify how the event is displayed and to add additional content.
</div>

![Overview](assets/images/AgendaDayView.png)

<div>

### Use When

- (✓) When representing scheduled events or a history of actions.

  The Agenda should be used to plot dates or events already tracked in the system and should be used as a way to visualize those events.

</div>

<div>

### Don′t Use When

- (x) Don't use to select a date or range of dates.

  While the Agenda and events can be interactive it should not be used to select dates.  Instead use the `calendar` or `date-picker`

</div>
</novo-grid>

## Best Practices

- Ensure the view has enough space to display the Agenda components, the often take up the whole page.
- Allow the user to switch between Month, Week, Day views of their data.
- Avoid showing to many types of events, the views will get bloated and hard to read.
## Options

<novo-grid columns="2" align="start" gap="2rem">

> **Month View**
>
> Used to present the user with a calendar of scheduled event for a month.  The event styles can be overridden with a custom template, this allows the implementation to determine how the display should change based on the context of the scheduled event.

![Month View](assets/images/AgendaMonthView.png)

![Week View](assets/images/AgendaWeekView.png)

> **Week View**
>
> The agenda's week view component can disply the scheduled events showing the 5-7 days of that week.  Unlike the Month View, events will be plotted vertically based on the time of day the event starts. Event containers height will only be as tall as the duration of the event.

> **Day View**
>
> Similar to the Week View but only display events for a single day.  This is helpful when the week view is very congested because this allows overlapping events to stack horizontally, allowing for better readability.

![Day View](assets/images/AgendaDayView.png)

</novo-grid>

## Accessibility

- If using an illustrative image for the supplement content, it’s generally safe to use an empty or null alternative text for example alt=""
