---
section: Components
page: Autocomplete
title: Design
order: 2
---

 ## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

The autocomplete component is designed to provide a list of options as the user types that can be used to set the field value.  The component can be used to set more complex data to the form. Usually the input does not require a valid option to be selected.


</div>

<img src="assets/images/AutocompleteOverview.png"/>

<div>

### Use When

- (✓) A list of possible values are known but not required.

</div>
<div>

### Don′t Use When

- (x) The form field requires the value to be one of the predefined options. use a select or picker instead.

</div>
</novo-grid>

## Best Practices

- Use spinner to display that an action invoked by the user is performing but not complete.
- Use loading when loading data from the server to intialize content.
- If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.
- If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.
- There should only be a single loading element on a page at one time.

## Behaviors

<novo-grid columns="2" align="start" gap="2rem">

> **Sizing**
>
> A popovers width should match the width of the input it is correlated to a min width of 15rem is set to avoid readability issues.  The popover have a fixed height and should be scrollable, a persistent scrollbar should be visible if this is the case.

> **Multiple Selections**
>
> When the input allows multiple selection the autocomplete popover should add values to the input as a comma-separated list.  The component can be paired with a chip-list as-well.

</novo-grid>

## Accessibility

**KeyBoard Controls**

The user should be able to use the `up` and `own` arrows to navigate between options and press `enter` to select the active option.

**Implementation**

The component should follow the [ARIA combobox interaction](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html) pattern and have a role of `combobox`.