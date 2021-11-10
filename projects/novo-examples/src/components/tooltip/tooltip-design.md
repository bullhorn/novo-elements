---
section: Components
page: Tooltip
title: Design
order: 2
---

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ModalAnatomy.png" width="450">

<div>

1. **Icon**<br>
   Use an Icon to quickly convey context of the action. ie. If a file is ready to download, show a download or file icon.

1. **Title (Optional)**<br>
   Used to quickly describe the action that occurred. eg. File Uploaded!

1. **Message**<br>
   A longer description of the outcome of the related action.

1. **Follow-up Action (Optional)**<br>
   By default the a toast will always have a dismiss action, but can also have a follow up action related to the previous action, eg. Undo, Open, View....

</div>
</novo-grid>

## Best Practices

- Use a banner when a form can’t be saved, banner appears, should be dismissed manually
- Use a growl when something is successfully saved, growl should disappears after X seconds
- A toast should only have 1 follow-up action.
- If the toast has an follow-up action, i.e. Undo, View, etc, then dismiss the Toast manually…
- If a growl has no follow-up action, the toast should dismiss automatically after X seconds
- If the growl has under 30 characters, dismiss automatically after 3 seconds
- If the growl has between 30 and 100 characters, dismiss automatically after 10 seconds
- If the growl has over 100 characters, dismiss manually
- If the growl has over X characters or X lines of text, add a View More action

## Color

**How to use color**

Background utilises color to indicate status of the message. Icon is often synonymous with the status of the color, _e.g. warning icon goes with yellow background_

<novo-grid columns="2" align="start" gap="2rem">

> **Pattern**
>
> Yellow for warnings

![placeholder](https://via.placeholder.com/350x250)

> **Pattern**
>
> Green for successful actions

![placeholder](https://via.placeholder.com/350x250)

> **Pattern**
>
> Red for errors or unsuccessfully attempted actions

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## Behaviors

**Movement**

A toast appears through an animated movement to draw the users attention. A banner slides in from the top of the page. A growl slides in from the side of the screen on which it is located. Multiple growls will stack by moving to the background when a new one appears.

<novo-grid columns="2" align="start" gap="2rem">

> **Pattern**
>
> Yellow for warnings

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## How to configure

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (✓) Always do this
>
> Explain this

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (x) Never do this
>
> Explain this

</novo-grid>

## Patterns

<novo-grid columns="2" align="start" gap="2rem">

> **Pattern**
>
> Why is it configured like this

![placeholder](https://via.placeholder.com/350x250)

> **Pattern**
>
> Why is it configured like this

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
