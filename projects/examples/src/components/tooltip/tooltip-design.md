---
section: Components
page: Tooltip
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Tooltips are layered containers that provide basic identifying information about an elment.  The are usually triggered by hovering over the buttons and icons. Tooltips are meant to stand out visually through their contrasting container color to draw immediate attention to their contents.

</div>

<img src="assets/images/TooltipOverview.png"/>

<div>

![Good Usage](assets/images/TooltipGoodUsage.png)

### Use When

- (✓) Providing a short description of a page element or control.

  Page elements or contorls such as buttons and form fields can use tooltips for context.

- (✓) Describing the action of an icon-only button.
  
  In case icon images are hard to view or do not load, tooltips are used to describe their actions.

- (✓) Revealing the full text of truncated data.
  
  In a table view, a tooltip can help reveal header names which maybe truncated.

</div>
<div>

![Bad Usage](assets/images/TooltipBadUsage.png)

### Don′t Use When

- (x) Don't use for describing supplemental information.

  Consider using a [popover](#components/pop%20over/design) instead.

- (x) Don't use when interactions are needed from the user.

  If the information inside is used to exend a workflow or user interaction, consider using a [modal](#components/modal/design) or [popover](#components/pop%20over/design) instead.

- (x) Don't use tooltips to communicate crucial information

  If you have help text that must be read, consider using a [tip well](#components/tip%20well/design) instead.

- (x) Don't use to display a message based on incorrect action.

  Consider using a [toast](#components/toaster/design) instead.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/TooltipAnatomy.png" width="450">

<div>

1. **Container**<br>
   Contains the entire body of the tooltip. This container will be positioned based on the aligment of the trigger element. The container should appear elevated with a shadow to separate it form the page.  The height depends on the number of lines and the width is decided contextually based on when it looks best for the tooltip to split into another line.

1. **Trigger**<br>
   The triangular element that anchors the tooltip and controls how the tooltip wil be triggered via hover.

1. **Content**<br>
   The tooltip contents are defined based upon the application needs and business use-case.

</div>
</novo-grid>


## Best Practices

- Depending on usage a maximum of three lines in a tooltip is a good guideline, the tip is supposed to be quick and concise.
- When choosing which tooltip position to use, try not to block important content, and make sure that the tooltip is still on the screen and readable.
- For longer tooltips, choose an approriate width based on a readable line-length.

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
> A tooltip is positioned in relation to its source. The placement property values are at the: `top`, `top left`, `top right`, `bottom`, `bottom left`, `bottom right`, `left`, `right`. The default placement value is at the right.

![Tooltip Placement](assets/images/TooltipPosition.png)

</novo-grid>


