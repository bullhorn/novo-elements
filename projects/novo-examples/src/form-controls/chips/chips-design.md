---
section: Form Controls
page: Chips
title: Design
order: 2
---

 ## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Chips show the user that a view or component represents data from multiple contexts. They can present as keywords, people or selected values, whether as an form input or filter criteria.

</div>

<img src="assets/images/ChipsOverview.png"/>

<div>

### Use When

- (✓) When you can select multiple items in a picker and you have selected the item.

</div>
<div>

### Don′t Use When

- (x) When the user is only allowed to make a single selection from a picker input.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ChipsAnatomy.png" width="450">

<div>

1. **Container**<br>
   This defines the boundaries of the chip.

1. **Remove Button (Optional)**<br>
   Chips that can be removed should include the ‘close’ icon. 

1. **Text**<br>
   This will contain the display value of the chip.

1. **Indicator/Avatar/Icon**<br>
   To convey additional context to the user about the type of content, use the Chip Indicator. ie, This should be set to the contact icon and color when displaying contact data vs the candidate icon and color when the Chip represents a selected candidate

1. **Preview (optional)**<br>
   Additional details can be displayed in a Chip Preview PopOver, see [New Component] 

</div>
</novo-grid>

## Behaviors

<novo-grid columns="2" align="start" gap="2rem">

> **Text Overflow**
>
> When the chip text is too long for the available horizontal space, it truncates. The full text should be revealed with a tooltip on hover.

> **Chip List Overflow**
>
> When horizontal space is limited in a chip list, the individual chips wrap to form another line.

</novo-grid>

## Accessibility

**KeyBoard Controls**

The user should be able to use the `up` and `own` arrows to navigate between options and press `enter` to select the active option.

**Implementation**

The component should follow the [ARIA combobox interaction](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html) pattern and have a role of `combobox`.