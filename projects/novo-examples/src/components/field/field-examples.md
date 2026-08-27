---
section: Components
page: Field
title: Examples
order: 4
---

## Basic Usage

`novo-field` wraps any supported control — text inputs, textareas, date/time pickers, selects, and chip-based pickers —
and provides a consistent label, hint, and error surface. Use `novoInput` on native `<input>` and `<textarea>` elements,
`novo-select` for dropdowns, and `novo-chip-list` with `novo-autocomplete` for single- or multi-value pickers.

<code-example example="field-usage"></code-example>

## Anatomy

Form fields consists of the following parts:

- Container
- Leading icon (Optional element)
- Label
- Placeholder/Input text
- Trailing icon (Optional element)
- Helper text/Error text (Optional element)

See how they are used below...

<code-example example="field-anatomy"></code-example>

## Native Controls

The following input types can be used with novoInput:

- Text: text, password, email, search, tel, url, number
- Date: date, datetime-local, month, week, time
- Other: color, range

<code-example example="field-native"></code-example>

## Form Controls

How to use form fields tied to a form with FormControls and validation

<code-example example="form-usage"></code-example>
