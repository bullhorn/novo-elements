---
section: Components
page: Icon
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

If you want to use bullhorn icons, it is easier to use the `novo-icon` element to style them. You can always style them within the `i` tag too.

**Use When**

- (✓) Additional context for action is required.
- (✓) Help user easily identify what action does.
- (✓) Help identify state, ie. error, warning, etc.
- (✓) Spacing is limited.

</div>

<img src="https://via.placeholder.com/350x250"/>

</novo-grid>

## Best Practices

- Use spinner to display that an action invoked by the user is performing but not complete.
- Use loading when loading data from the server to intialize content.
- If a spinner is triggered by a button, place the spinner in the button, and disable the button while the spinner is visible.
- If only a portion of a page is loading new content or being updated, place the loading element in that part of the page.
- There should only be a single loading element on a page at one time.

## Variations

<novo-grid columns="2" align="start" gap="2rem">

> **Color**
>
> Use color to convey additional meaning when displaying icons. Application colors such as `success` and `negative` can help express the meaning of the context being used.  Entity colors such as `job` and `candidate` can help the user identify context quickly when parsing large amounts of data.

> **Filled**
>
> Icons can have color and optionally you can set the background color to show as well. This creates a visual emphasis on the icon and context it is describing. This style can be used when it is important to draw more attention to an item or when it asthetically makes sense for the icon to have a heavier presence in the UI.

</novo-grid>

## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
