---
section: Components
page: Toolbar
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Toolbars are containers attached to the top or bottom of a page that contain actions and/or navigation.  Toolbars can stack on-top of each providing varying levels of content.  Toolbars usually act as headers or footers of the page.


</div>

<img src="assets/images/ToolbarOverview.png"/>

<div>

### Use When

- (✓) The page needs navigation to its various sections.
- (✓) The page needs to set the context of the page (ie. header with title)
- (✓) Global Actions, preferences, setting, filters need to be displayed.

</div>
<div>

### Don′t Use When

- (x) Don't use to divide/separate content.
- (x) Don’t use it to display multi-line text content.
- (x) Don't use it for background color only.

</div>
</novo-grid>

## Anatomy

<novo-flex justify="center">
  <img src="assets/images/ToolbarAnatomy.png">
</novo-flex>

## Options

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](https://via.placeholder.com/350x200)
>
> **Sizes**
>
> A toolbar container can be `sm`, `md`, or `lg`, which can be set by the `size` property. This will affect the height and horizontal padding of the container. Toolbars should all be the same size or stacked in descending sizes.

> ![placeholder](https://via.placeholder.com/350x200)
>
> **Dividers**
>
> Use `<novo-divider vertical>` to separate section in a toolbar row. Divider can be used to separate stacked toolbars but only when the toolbars are the same color.

> ![placeholder](https://via.placeholder.com/350x200)
>
> **Branding/Title**
>
> Branding in general should be setup on the left side of the toolbar. Your toolbar should either have a title or branding but not both.  

> ![placeholder](https://via.placeholder.com/350x200)
>
> **Menu or Icon**
>
> If you page has side navigation or a menu, than a menu icon can appear before the title or branding. If the toolbar doesn't need the `menu` icon, you may use and static icon to help add context to your title, but you should never have both.

> ![placeholder](https://via.placeholder.com/350x200)
>
> **Tabs**
>
> Whether or not your toolbar needs top level nav, tabs should always be positioned to the right of the icon or branding.


> ![placeholder](https://via.placeholder.com/350x200)
>
> **Search**
>
> You can include search functionality in your toolbar.


</novo-grid>


## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
