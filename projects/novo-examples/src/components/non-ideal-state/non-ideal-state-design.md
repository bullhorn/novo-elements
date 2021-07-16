---
section: Components
page: Non Ideal State
title: Design
order: 2
---

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ModalAnatomy.png" width="450">

<div>

1. **Title**<br>
   Briefly summarizes what went wrong (or right).

1. **Message**<br>
   Provides additional context and offers guidance on next steps.

1. **Icon (Optional)**<br>
   Should be avoided unless absolutely necessary, primarily used for mobile or responsive design

1. **List (Optional)**<br>
   Lists out criteria or additional options.

1. **Action (Optional)**<br>
   Displays interactive content (eg. Button) that allow a user to take an action as a result of the non ideal state.

</div>
</novo-grid>

## Best Practices

- Center non-ideal states horizontally and vertically within their container.

- When including an action, use the corresponding size variation. For example, a large empty state should use a large button.

- Non-ideal states include a maximum width to ensure optimal typographic line lengths and will scale down fluidly on smaller viewports.

## Patterns

<novo-grid columns="2" align="start" gap="2rem">

> **Data Table Empty States**
>
> Data Tables inherently have an non-ideal states when no records currently exist. It is a good pattern to provide this context to the user but also to provide them with an action to "Add your first record".

![placeholder](https://via.placeholder.com/350x250)

> **Picker no search results**
>
> Whenever a component or view has a search feature you will always create a non-ideal state when the search returns no matching records. Best practice would be to provide a list of alternative search options.

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## Accessibility

- Never rely on an empty state’s icon alone to communicate meaning. Craft your empty state’s text content to provide a user with everything they need to know, even if they are unable to see the page.
- Reference the accessibility guidelines for buttons when including an action in the empty state.
- Add role="presentation" to purely decorational empty state icons to ensure they are ignored by screen readers.
