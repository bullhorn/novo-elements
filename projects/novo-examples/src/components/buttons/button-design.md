---
section: Components
page: Button
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

A button clearly indicates a point of action for the user. Bullhorn buttons come in a variety of themes, custom tailored to fit your use\-case.

Bullhorn button themes were hand crafted to make your life easier. Most buttons used in the Bullhorn platform should utilize a `theme` attribute. Theme attributes provide access to every variation of Bullhorn UX approved buttons. Depending on the theme, some buttons may also utilize `icon`, `side`, and `inverse` attributes. Button are divided by function into four main categories: Primary, Secondary, Neutralizing, Subtractive. There are also three other button types that are independent of function: Dialogue, Icon, and Header.

</div>

<img src="assets/images/ButtonOverview.png"/>

<div>

### Use When

- (✓) Affording interaction to key behaviors and features.
- (✓) Confirming or submitting information entered into a form.
- (✓) Cancelling an action.
- (✓) Resetting a form or dataset.
- (✓) Closing a container or section.
- (✓) Opening a popover.
- (✓) Moving forward or backward through a stepper workflow.
- (✓) Creating an object within a group.
- (✓) Applying a non-critical action to a dataset.

</div>
<div>

### Don′t Use When

- (x) Displaying a collection of links to sections. Use links instead.
- (x) Linking to an external site. Use links instead.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ButtonAnatomy.png" width="450">

<div>

1. **Container**<br>
   The button container is displayed differently based on the type of button.

1. **Icon (Optional)**<br>
   Icons can be display to the left or right of the text.

1. **Text (Optional)**<br>
   Use text that conveys the action performed when clicked, this should be a Verb.

</div>
</novo-grid>


## Types

<novo-grid columns="2" align="start" gap="2rem">
<div>

1. **Basic**<br>
   The basic button is used when a light weight action is needed or when placed within a component that would make the button to noisy. ie.  When adding an actions button to a table row.

1. **Primary**<br>
   Should be used to draw attention to the user that this is the primary call to action for the current view. eg. Save on an Edit Page.

1. **Secondary**<br>
   This is used to convey Alternative actions that can be taken within a view that are important to the workflow.

1. **Standard**<br>
   Used to provide a equally weighted option that is optional when displayed next to a primary or secondary button.  eg. Close button for a Modal.

</div>

<img src="assets/images/ButtonTypes.png" width="450">

</novo-grid>

## Behaviors

<novo-grid columns="2" align="start" gap="2rem">

> **Icons**
>
> Buttons can be configured with an Icon (`icon="check"`) with `side="left"` or `side="right"`(default). The context should usually determine the placement of the icon. When the button text is a predicate, eg. **Add Candidate**, the `bhi-add` icon should be a prefix. When the button text is imperative, eg . **Save**, then icon should be display as a suffix. Exception may occur.

![placeholder](assets/images/ButtonWithIcon.png)

> **Only Icon**
>
> When spacing is limited and an actions meaning can be conveyed with just an icon, it is acceptable to use the `icon` or `fab` themed buttons.  In general icon buttons are used to help provide actions withing complex components, eg. next and previous in the `novo-calendar` or `novo-pagination` components.  The `novo-action` button is a wrapper for icon buttons to show in the `novo-header` action area.

![placeholder](assets/images/ButtonIcons.png)

</novo-grid>

## Accessibility

**Implementation**

Always include an `aria-label` or `aria-labelledby` attribute when using icon buttons. When the button is disabled `aria-disabled="true"` and `tabindex="-1"` should be set automatically by the component.
