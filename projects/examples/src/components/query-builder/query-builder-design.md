---
section: Components
page: Query Builder
title: Design
order: 2
tag: experiment
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Asides are slideouts designed to provide a view into related content within the page without navigating away.  Asides work similar to Modal but the content is meant to be correlated and the workflow should be non-blocking.

</div>

<img src="assets/images/AsideOverview.png"/>

<div>

### Use When

- (✓) Providing supporting visual content, e.g., an image or chart, within the context of a larger composition
- (✓) The content provided doesn't block the workflow of the previous context.

</div>
<div>

### Don′t Use When

- (x) The content of the aside requires immediate action or response. Instead, use a modal.

</div>
</novo-grid>

## Best Practices

- Ensure the content opened is highly correlated to the context that opened it. When showing a preview of a related content that can opened for various contexts, present the user with the data related to the context that opened it, rather than the same view.
- When using an aside to present the user with a form, ensure that it is beneficial to have the current view still available to the user, if not consider opening a new page.

## Patterns

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (✓) Form Slideout
>
> Utilize the aside to open quick forms within the application. With the `aside` you can provide a workflow to enter data quickly while still provide a partial view of the parent context. This will allow the user to maintain context and see how the addition of new data affects there current view.

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (x) Record Preview
>
> Utilize the aside to open record previews within the application. With the `aside` you can allow the user to view a significant amount data about a related entity with losing the context of the current view.

</novo-grid>

## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
