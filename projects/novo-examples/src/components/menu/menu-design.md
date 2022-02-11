---
section: Components
page: Menu
title: Design
order: 2
---


## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Menu allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.

Menus are contextual and all for actions to be performed based upon the context of the trigger or selection. Menus are great for consolidating many actions available to the user and can be used in a variety of different ways. Menus can be triggered from any element but usually limited to links, button, and icons.

</div>

<img src="assets/images/MenuOverview.png"/>

<div>

### Use When

- (✓) Displaying multiple actions to perform on an item or selection
- (✓) Processing an long running action.

</div>
<div>

### Don′t Use When

- (x) To select a value, use a select
- (x) Top Level Page Actions, use a Dropdown.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/MenuAnatomy.png" width="450">

<div>

1. **Container**<br>
   Defines the layout for the form field (horizontal vs vertical)

1. **Option**<br>
   An element/icon displayed before the input. eg. \$

1. **Divider**<br>
   A label for a group of menu actions.

1. **SubMenu Indicator**<br>
   The element representing the input control: `input`, `select`, etc...

</div>
</novo-grid>

## Best Practices

- Organize actions in groups divided by rules. This helps users remember command locations, or find less used commands based on proximity to others. One should also group sets of mutually exclusive or multiple selectable options.
- Use icons sparingly, for high value commands, and don’t mix icons with selection checks, as it makes parsing commands difficult.
- Avoid submenus of submenus as they can be difficult to invoke or remember.

## Behaviors

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](assets/images/MenuScrollable.png)
>
> **Scrolling**
>
> If not all of the options can be presented within the view, then the menu
> should be scrollable.  To prevent confusion with the user that the only
> options available are those viewable, a persistent scrollbar should be 
> shown.

> ![placeholder](assets/images/MenuPosition.png)
>
> **Position**
>
> The menu should be placed differently based on the context that triggers
> it.  For DropDown Menu the Menu should be placed below the button, aligned
> right or left based on the alignment of the button within its layout.
> ie. if the button is positioned at the end of a header (flex-end) then the
> right side of the menu should align with the right side of the button.
>
> If there is not enough room below an button it is acceptable for the menu
> to drop up instead.

> ![placeholder](assets/images/MenuContext.png)
>
> **Context Menu**
>
> A button is not required to trigger a menu. Any element can be set to trigger a menu
> on click or right-click.  Context Menus can provide addition data to be used when 
> displaying the menu. eg. Menu items can be hidden/shown based on the values within 
> that context and context can be passed to the click actions.

> ![placeholder](assets/images/MenuOverview.png)
>
> **Cascading Menu**
>
> *Beta*  When the large variety of options are available to the user, categorize these
> options to create multiple levels of hierarchy.
> 
> SubMenus are just menus triggered of a menu-item of parent. SubMenus shoudld appear to
> the right or left of parent list items, depending on available space.

</novo-grid>

## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
