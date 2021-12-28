---
section: Components
page: Agenda
title: Develop
order: 2
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/avatar)
- **module:** `import { NovoAgendaModule } form 'novo-elements';`

**Basic Usage**

```html
  <novo-agenda-month [(viewDate)]="viewDate" [events]="events"
    (dayClicked)="dayClicked($event.day.date)">
  </novo-agenda-month>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 6.0.0

_renamed to Agenda in this version_

# Components

## NovoAgendaMonthViewElement `novo-agenda-month`

Display `events` with a Month view calendar.
### Properties

<props-table component="NovoAgendaMonthViewElement"></props-table>

## NovoAgendaWeekViewElement `novo-agenda-month`

Display `events` within a Week view calendar.
### Properties

<props-table component="NovoAgendaWeekViewElement"></props-table>


## NovoAgendaDayViewElement `novo-agenda-month`

Display `events` within single day view
### Properties

<props-table component="NovoAgendaDayViewElement"></props-table>
