---
section: Form Controls
page: Date Picker
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/date-picker)
- **module:** `import { NovoDatePickerModule } from 'novo-elements';`

**Usage**

A `date-picker` can be used standalone, but typically it is displayed in an overlay triggered by an input. As of `v5` we have abstracted the functionality of the date picker it to 3 separate parts, the `date-picker` component to allow the selection of dates, the `dateFormat` directive to format dates to the correct format to display in the input, and the `novo-picker-toggle` which is used by various components to add an overlay to any `novo-field`.

The `date-picker` is built using the `novo-calendar` component examples of which can be seen [here](/components/calendar).

```html
<!-- Deprecated Usage -->
<novo-date-picker-input [(ngModel)]="date" format="mm/dd/yyyy"></novo-date-picker-input>
```

```html
<!-- Preferred Usage -->
<novo-field>
  <novo-label>Date of Birth</novo-label>
  <input novoInput dateFormat="iso8601" [picker]="datepicker" [(ngModel)]="date" />
  <novo-picker-toggle novoSuffix icon="calendar">
    <novo-date-picker #datepicker></novo-date-picker>
  </novo-picker-toggle>
</novo-field>
```

# Roadmap

- [ ] Make color and theming consistent
- [ ] Dark Mode
- [ ] Remove `DatePickerInputElement`

# Changelog

### 5.0.0

**Deprecation**

- `novo-date-picker-input` should no longer be used, instead use a `novo-field` with a date-picker toggle shown in the preferred usage example above.

# Directives

## NovoDateFormatDirective `[dateFormat]`

The `[dateFormat]` directive is used to specify the format the input should display "date" values in. Currently we are using `imask` and `angular-imask` library to provide these formats and create the auto-correction/completion when typing into the input field.

# Components

## NovoDatePickerInputElement `novo-date-picker-input`

The `novo-date-picker-input` is deprecated, but it still used with the dynamic form containers. It is a convienent wrapper componet for an input with a date picker trigger. Most inputs are just pass throughs to the `novo-date-picker` instance.

### Properties

<props-table component="NovoDatePickerInputElement"></props-table>

## NovoDatePickerElement `novo-date-picker`

The `novo-spinner` component displays the circular loading visual, usually used within the button to indicate the action is performing but not complete yet.

### Properties

<props-table component="NovoDatePickerElement"></props-table>
