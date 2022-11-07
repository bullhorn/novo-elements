---
section: Components
page: Calendar
title: Develop
order: 2
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/calendar)
- **module:** `import { NovoCalendarModule } form 'novo-elements';`

**Basic Usage**

<typedef-example>
  <typedef-content>
    <novo-calendar
    [mode]="mode.value"
    [numberOfMonths]="months.value"
    ></novo-calendar>
  </typedef-content>
  <typedef-specs>
    <novo-label>Selection mode</novo-label>
    <novo-radio-group #mode appearance="vertical" value="single">
      <novo-radio name="mode" value="single">single</novo-radio>
      <novo-radio name="mode" value="multiple">multiple</novo-radio>
      <novo-radio name="mode" value="range">range</novo-radio>
      <novo-radio name="mode" value="week">week</novo-radio>
    </novo-radio-group>
    <novo-label># of Months</novo-label>
    <novo-radio-group #months appearance="vertical" value="1">
      <novo-radio name="months" value="1">1</novo-radio>
      <novo-radio name="months" value="2">2</novo-radio>
    </novo-radio-group>
  </typedef-specs>
  <typedef-snippet>
  
```html
<novo-calendar [activeDate]="birthday" mode="single" numberOfMonths="1"></novo-calendar>
```

  </typedef-snippet>
</typedef-example>


# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 6.0.0

_added in this version_

# Components

## NovoCalendarElement `novo-calendar`

All tabs must be incapsulated in a `novo-nav` container. The nav will control the context and active tab.

### Properties

<props-table component="NovoCalendarElement"></props-table>
