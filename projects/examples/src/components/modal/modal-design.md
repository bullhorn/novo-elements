---
section: Components
page: Modals
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

A modal is a pop-up dialog that appears on top of the main content, requiring the user to focus only on the content that the modal presents.

Modals are used to inform the user of something critical, force a decision, or extend a series of tasks. There are two categories of modals in the system: confirmation and workflow.

</div>

<img src="https://via.placeholder.com/350x250"/>

<div>

### Use When

- (✓) Do use to confirm irreversible actions:

  Use a notification modal to ask the user to confirm when performing an irreversible action such as deleting a record, navigating away from something unsaved, or converting a file.

- (✓) Do use to confirm actions that will affect other records:

  Use notification modals to make the user aware that their action will affect other records. The modal should ask them to confirm this action and explicitly say what the changes to other records will be. (find an example for this - deleting shifts could work, sending out bulk emails)

- (✓) Do use for a task related to the main content:

  Workflow modals should always be related to the main content of the screen they are on top of. For example, when assigning candidates to shifts in the Scheduler.

</div>
<div>

### Don′t Use When

- (x) Don’t use to confirm an action that has already happened:

  Don’t use a notification modal to confirm an action that has already been completed. Conveying information that does not require action is not critical enough to fully obscure the main content of the page. Use a [toast](/components/toast) instead.

- (x) Don’t use for a task unrelated to the main content:

  Don’t obscure the main content of the screen for a task that is not directly related to the subject matter of that screen. Open a new page or use a [slideout](/components/aside) instead.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ModalAnatomy.png" width="450">

<div>

1. **Container**<br>
   Description and purpose of this element

1. **Header**<br>
   Description and purpose of this element

1. **Icon (Optional)**<br>
   Description and purpose of this element

1. **Title (Optional)**<br>
   Description and purpose of this element

1. **Content**<br>
   Description and purpose of this element

1. **Footer**<br>
   Description and purpose of this element

</div>
</novo-grid>

## Best Practices

- (✓) Do Use Multiple Columns to make content digestible:

  If a Modal contains a lot of data, multiple columns help to make sure the user doesn’t miss any aspects of the task at hand. (Example - Make Offer modal from shifts, conflict management from shifts)

- (x) Don’t Use a lot of scrolling in a narrow space:

  Too much scrolling makes content hard to digest, and can cause the user to miss important information or steps in a task.

  Consider using a full page or a slideout if the modal can’t display the full content without significant scrolling.

### Footer Usage

- The footer will usually be comprised of Primary button and a ‘Standard’ button
- If there’s more than one action available from the modal, use a Secondary button for the less important of those actions.
- If the primary action off of the modal is DESTRUCTIVE, use a red Primary button. RED ($grapefruit, $negative)

## Color

> > ![placeholder](https://via.placeholder.com/350x250)
> >
> > - (✓) Do use color to relate modals in a multi-step workflow:
> >
> > Carry over the Entity color from the main content of the screen if the task in the modal is directly related to that Entity. (Ex: adding a shift)
>
> > ![placeholder](https://via.placeholder.com/350x250)
> >
> > - (x) Don’t use an Entity Color for something unrelated:
> >
> > Don’t use an Entity color in the header of a modal if the task is not directly related to that Entity. Instead, make reference to the entity elsewhere in the modal if necessary.
> > {.two-columns}

## Accessibility

- (✓) Do use multiple avenues to convey meaning

  Using color, iconography, and text together to convey a warning makes it clearer for people to understand. (show delete modal that is right)

- (x) Don’t rely on just color to convey meaning

  Using color alone to indicate a destructive action may not be clear to everyone. (show a modal with red yes button but no ‘delete’ in the text or trashcan)

### Keyboard Behaviors

When a dialog opens, focus moves to an element inside the dialog. See notes below regarding initial focus placement.

- Tab:
  - Moves focus to the next tabbable element inside the dialog.
  - If focus is on the last tabbable element inside the dialog, moves focus to the first tabbable element inside the dialog.
- Shift + Tab:
  - Moves focus to the previous tabbable element inside the dialog.
  - If focus is on the first tabbable element inside the dialog, moves focus to the last tabbable element inside the dialog.
- Escape: Closes the dialog.

### Roles, States, and Properties

The element that contains all elements of the dialog, including the alert message and any dialog buttons, has role `alertdialog`.

- The element with role alertdialog has either:
  - A value for aria-labelledby that refers to the element containing the title of the dialog if the dialog has a visible label.
  - A value for aria-label if the dialog does not have a visible label.
- The element with role alertdialog has a value set for aria-describedby that refers to the element containing the alert message.

## Behaviors

**Workflow modals** should be triggered either from a button or link on the main content of the screen to initiate a workflow (add shift, add certification)

**Confirmation Modals** should be triggered immediately as the action they are confirming is triggered. (example: after ‘delete record’ is clicked from action dropdown)

### Expansion

If the content in the modal gets bigger, the modal should expand before adding scrolling.

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
