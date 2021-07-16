---
section: Utils
page: Toaster
title: Usage
order: 1
---

<novo-grid columns="2" align="start" gap="2rem">
<div>

### Why?

A toast provides feedback about an operation while maintaining visibility and interaction with the current activity. It conveys information to the user that is not critical and does not require specific attention. A toast does not prevent the user from continuing their activity.

When the user is not presented with some form of confirmation about the completion of the action.

**Works with following input types**

- Default input, select, textarea
- novo-select
- novo-datepicker

</div>

<img src="https://via.placeholder.com/350x250"/>

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
