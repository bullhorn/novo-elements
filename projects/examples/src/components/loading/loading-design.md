---
section: Components
page: Loading
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.

</div>

<img src="https://via.placeholder.com/350x250"/>

<div>

### Use When

- (✓) Loading content.
- (✓) Processing an long running action.

</div>
<div>

### Don′t Use When

- (x) When not loading data.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ModalAnatomy.png" width="450">

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

- Use spinner to display that an action invoked by the user is performing but not complete.
- Use loading when loading data from the server to intialize content.
- If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.
- If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.
- There should only be a single loading element on a page at one time.

## How to configure

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (✓) Always do this
>
> Explain this

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (x) Never do this
>
> Explain this

</novo-grid>

## Patterns

<novo-grid columns="2" align="start" gap="2rem">

> **Pattern**
>
> Why is it configured like this

![placeholder](https://via.placeholder.com/350x250)

> **Pattern**
>
> Why is it configured like this

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
