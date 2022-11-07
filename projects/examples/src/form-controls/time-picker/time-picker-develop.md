---
section: Form Controls
page: Time Picker
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/time-picker)
- **module:** `import { NovoTimePickerModule } from 'novo-elements';`

**Usage**

A `novo-date-time-picker` can be used standalone, but typically it is displayed in an overlay triggered by an input. This component is merely are wrapper around the `novo-date-picker` and the `novo-time-picker` components with a transition between them.

```html
<!-- Deprecated Usage -->
<novo-time-picker-input [(ngModel)]="time"></novo-time-picker-input>
```

```html
<!-- Preferred Usage -->
<novo-field>
  <novo-label>Set an Alarm</novo-label>
  <input novoInput [(ngModel)]="time" timeFormat="iso8601" [picker]="timepicker" />
  <novo-picker-toggle novoSuffix icon="clock">
    <novo-time-picker #timepicker></novo-time-picker>
  </novo-picker-toggle>
</novo-field>
```

# Roadmap

- [ ] Make color and theming consistent
- [ ] Dark Mode
- [ ] Remove `NovoTimePickerInputElement`

# Changelog

### 5.0.0

**Deprecation**

- `novo-time-picker-input` should no longer be used, instead use a `novo-field` with a picker toggle shown in the preferred usage example above.

# Directives

## NovoTimeFormatDirective `[timeFormat]`

The `[timeFormat]` directive is used to specify the format the input should display "date" values in. Currently we are using `imask` and `angular-imask` library to provide these formats and create the auto-correction/completion when typing into the input field.

# Components

## NovoTimePickerInputElement `novo-time-picker-input`

The `novo-time-picker-input` is deprecated, but it still used with the dynamic form containers. It is a convienent wrapper componet for an input with a time picker trigger. Most inputs are just pass throughs to the `novo-time-picker` instance.

### Properties

<props-table component="NovoTimePickerInputElement"></props-table>

## NovoTimePickerElement `novo-time-picker`

The `novo-time-picker` component is used to allow the user to select the time of the day similar to the browsers native time picker. The main benefit is that we can control timezones and formatting based on user and agency configuration rather than using the computers default settings.

### Properties

<props-table component="NovoTimePickerElement"></props-table>
