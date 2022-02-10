---
section: Components
page: Tooltip
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Helper tooltips contain basic text that provides some additional information about an element.

</div>

<img src="assets/images/TooltipOverview.png"/>

<div>

### Use When

- (✓) Providing a short description of a page element or control.
- (✓) Describing the action of an icon-only button.
- (✓) Revealing the full text of truncated data.

</div>
<div>

### Don′t Use When

- (x) Providing a description longer than 10 words. Instead, use a popover.
- (x) Don't use tooltips to communicate crucial information

</div>
</novo-grid>

## Options

<novo-grid columns="2" align="start" gap="2rem">

> **Colors**
>
> Tooltips also come in semantic variants: informative (blue), positive (green), and negative (red). These use semantic colors to communicate the meaning.

![Tooltip Colors](assets/images/TooltipColor.png)

> **Sizing**
>
> When the label is too long for the available horizontal space, it wraps to form another line. To control the visually display text-length you can set the size of the tooltip with the `tooltip-size` property.

![Tooltip Size](assets/images/TooltipSize.png)

> **Placement**
>
> A tooltip is positioned in relation to its target. Placement property values are at the: `top`, `top left`, `top right`, `bottom`, `bottom left`, `bottom right`, `left`, `right`. The default placement value is at the top.

![Tooltip Placement](assets/images/TooltipPosition.png)

</novo-grid>


