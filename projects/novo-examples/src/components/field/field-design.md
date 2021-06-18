---
section: Components
page: Field
title: Design
order: 2
---

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

- Only supply placeholder text where clarification is required, try not to overuse it.
- Place labels directly above the input, and align to the left.

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
