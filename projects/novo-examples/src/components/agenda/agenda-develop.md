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

## NovoAgendaWeekViewElement `novo-agenda-month`

Display `events` within a Week view calendar.

## NovoAgendaDayViewElement `novo-agenda-month`

Display `events` within single day view
