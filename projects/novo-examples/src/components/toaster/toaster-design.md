---
section: Components
page: Toaster
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

A toast provides feedback about an operation while maintaining visibility and interaction with the current activity. It conveys information to the user that is not critical and does not require specific attention. A toast does not prevent the user from continuing their activity.

When the user is not presented with some form of confirmation about the completion of the action.

**Works with following input types**

- Default input, select, textarea
- novo-select
- novo-datepicker

</div>

<img src="assets/images/ToastBanners.png"/>

<div>

### Use When

- (✓) Use a Banner when a form cannot be saved to show an error occurred.
- (✓) Use a Banner when an action can’t be completed due to an error or failure.
- (✓) Use a Growl when an action is successfully performed and the context, i.e. modal, is no longer available.
- (✓) When an action happens asynchronously, e.g. file upload.

</div>
<div>

### Don′t Use When

- (x) Don’t use it to confirm an action, a toast should be reactive not pro-active.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ToastBanners.png" width="450">

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

## Behaviors

**Movement**

A toast appears through an animated movement to draw the users attention. A banner slides in from the top of the page. A growl slides in from the side of the screen on which it is located. Multiple growls will stack by moving to the background when a new one appears.

<novo-grid columns="2" align="start" gap="2rem">

> **Embedded**
>
> Banners should be used as static notifications, usually shown at the top of content.

![placeholder](assets/images/ToastEmbedded.png)

> **Position**
>
> Growl notifications can be displayed at the top, left, right, bottom or corner of the page. Notification will also stack on top of each other until dismissed.  In general that an application use the same location for all growl notications, so the user will know where to look for them.

![placeholder](assets/images/ToastLayout.png)

> **Actions**
>
> Growls and Banners can have actions that can be invoked before being dismissed.  This action should be contextual to the action that triggered the toast in the first place.  eg. Actions like "Undo" or "See more" are common use-case, this helps create a workflow that is streamlined for the user but provides optional actions when needed.

![placeholder](assets/images/ToastGrowlAction.png)

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


## Accessibility

**Implementation**

Always include an `alt` attribute describing the information that is visually displayed in the image.
