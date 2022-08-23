---
section: Components
page: Pop Over
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Popovers are layered containers that hold additional information or controls. Popovers are containers used to display transient content such as menus, options, additional actions, and more. They visually stand out through stroke and drop shadow and float on top of the interface.


</div>

<img src="assets/images/PopoverOverview.png"/>

<div>

### Use When

- (✓) Displaying supplementary content or actions, without obscuring the page.
- (✓) Creating a menu by placing a list group inside of a popover.

</div>
<div>

### Don′t Use When

- (x) When content is 10 words or fewer. Instead, use a tooltip.
- (x) Requiring a user to complete a complex task. Instead, use a modal or a separate page.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/PopoverAnatomy.png" width="450">

<div>

1. **Content**<br>
   The pop-overs contents, defined based on the application needs and business use-cases.

1. **Trigger**<br>
   The element that anchors the popover and controls how the popover will be trigger (click, hover).

1. **Container**<br>
   The popover container will be positioned based on the alignment to the trigger element.

</div>
</novo-grid>


## Guidelines

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](assets/images/PopoverPointer.png)
>
> **With Pointer**
>
> By default, popovers have a pointers. Popovers without a pointer should be used when the trigger has a visually distinctive selected state, in order to show the connection between the popover and its trigger.
>
> Most Popovers should have a pointer which should be used to help show the connection to the trigger, in cases where the trigger is not easily identifiable.

> ![placeholder](assets/images/PopoverPosition.png)
>
> **Placement**
>
> A popover is positioned in relation to its source. The placement property values are the following: top, top left, top right, top start, top end, bottom, bottom left, bottom right, bottom start, bottom end, left, left top, left bottom, start, start top, start bottom, right, right top, right bottom, end, end top, end bottom. The default placement value is at the top.


</novo-grid>

## Accessibility

**Implementation**

the popover should follow the Aria `complementary` role [guidelines](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role).