---
section: Components
page: Field
title: Usage
order: 1
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

<img src="https://via.placeholder.com/350x250"/>

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
