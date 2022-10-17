---
section: Form Controls
page: Date Time Picker
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/date-time-picker)
- **module:** `import { NovoDateTimePickerModule } from 'novo-elements';`

**Usage**

A `novo-date-time-picker` can be used standalone, but typically it is displayed in an overlay triggered by an input. This component is merely are wrapper around the `novo-date-picker` and the `novo-time-picker` components with a transition between them.

```html
<!-- Deprecated Usage -->
<novo-date-time-picker-input [(ngModel)]="dateTimeInput"></novo-date-time-picker-input>
```

```html
<!-- Preferred Usage -->
<novo-field>
  <novo-label>Date of Birth</novo-label>
  <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" [(ngModel)]="date" />
  <novo-picker-toggle novoSuffix icon="calendar">
    <novo-date-time-picker #datetimepicker></novo-date-time-picker>
  </novo-picker-toggle>
</novo-field>
```

# Roadmap

- [ ] Make color and theming consistent
- [ ] Dark Mode
- [ ] Remove `DateTimePickerInputElement`

# Changelog

### 5.0.0

**Deprecation**

- `novo-date-time-picker-input` should no longer be used, instead use a `novo-field` with a picker toggle shown in the preferred usage example above.

# Directives

## NovoDateTimeFormatDirective `[dateTimeFormat]`

The `[dateTimeFormat]` directive is used to specify the format the input should display "date" values in. Currently we are using `imask` and `angular-imask` library to provide these formats and create the auto-correction/completion when typing into the input field.

# Components

## NovoDateTimePickerInputElement `novo-date-picker-input`

The `novo-date-time-picker-input` is deprecated, but it still used with the dynamic form containers. It is a convienent wrapper componet for an input with a date picker trigger. Most inputs are just pass throughs to the `novo-date-picker` or `novo-time-picker` instance.

### Properties

<props-table component="NovoDatePickerInputElement"></props-table>

## NovoDateTimePickerElement `novo-date-time-picker`

The `novo-spinner` component displays the circular loading visual, usually used within the button to indicate the action is performing but not complete yet.

### Properties

<props-table component="NovoDatePickerElement"></props-table>
