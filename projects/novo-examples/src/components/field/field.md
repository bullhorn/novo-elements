# Field [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/field)

A Field is a component used to wrap several Angular Material components and apply common Text field styles such as the underline, label and hint messages.

In this document, "form field" refers to the wrapper component `<novo-form-field>` and "form field control" refers to the component that the `<novo-form-field>` is wrapping (e.g. the input, textarea, select, etc.)

##### Works with following input types

- Default input, select, textarea
- novo-select
- novo-datepicker

## Examples

##### Basic Usage

tbw...

<code-example example="field-usage"></code-example>

##### Anatomy

Form fields consists of the following parts:

- Container
- Leading icon (Optional element)
- Label
- Placeholder/Input text
- Trailing icon (Optional element)
- Helper text/Error text (Optional element)

See how they are used below...

<code-example example="field-anatomy"></code-example>

##### Native Controls

The following input types can be used with novoInput:

- Text: text, password, email, search, tel, url, number
- Date: date, datetime-local, month, week, time
- Other: color, range

<code-example example="field-native"></code-example>

##### Form Controls

How to use form fields tied to a form with FormControls and validation

<code-example example="form-usage"></code-example>
