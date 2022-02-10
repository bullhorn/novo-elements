---
section: Components
page: Field
title: Design
order: 2
tag: experiment
---

<novo-grid columns="2" align="start" gap="2rem">
<div>

### Why?

A Field is a component used to wrap several Angular Material components and apply common Text field styles such as the underline, label and hint messages.

In this document, "form field" refers to the wrapper component `<novo-field>` and "form field control" refers to the component that the `<novo-field>` is wrapping (e.g. the input, textarea, select, etc.)

**Works with following input types**

- Default input, select, textarea
- novo-select
- novo-datepicker

</div>

<img src="assets/images/FieldOverview.png"/>

<div>

### Use When

- (✓) A user must enter text data

</div>
<div>

### Don′t Use When

- (x) Gathering multiple lines of text. Instead, use a text area.
- (x) Selecting value from preset list, use a select or radio.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/FieldAnatomy.png" width="450">

<div>

1. **Container**<br>
   Defines the layout for the form field (horizontal vs vertical)

1. **Input Prefix (Optional element)**<br>
   An element/icon displayed before the input. eg. \$

1. **Label**<br>
   A label for a group of menu actions.

1. **Input Control**<br>
   The element representing the input control: `input`, `select`, etc...

1. **Input Suffix (Optional element)**<br>
   The element/icon displayed after the input. eg. calendar icon for date picker.

1. **Helper/Error text (Optional element)**<br>
   Caption text to display helpful information, warnings, or errors.

</div>
</novo-grid>

## Best Practices

- Only supply placeholder text where clarification is required, try not to overuse it.
- Place labels directly above the input, and align to the left.

## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
