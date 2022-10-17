---
section: Components
page: Modals
title: Examples
order: 4
---

## Notification Modals

### Success

This modal uses only a primary action button. It is a confirmation that an action has been completed when the result is not immediately apparent. A workflow modal often transitions into a success modal.

<code-example example="success-modal"></code-example>

### Warning

Warning modals ask for additional confirmation to complete an action because the action is either irreversible or there is an exception. The first line should always clarify the action or eventual result.

<code-example example="warning-modal"></code-example>

### Error

Error modals indicate that an attempted action has failed. The first line should apologize and state the what happened. The second line should quickly attempt to explain to the user why this has happened, and instruct the user on the best course of action.

<code-example example="error-modal"></code-example>

### Custom

In the case where "Success", "Warning", and "Error" notifications aren't enough, use the custom notification. Custom notifications allow any of the Bullhorn Icons to be used in the notification.

<code-example example="custom-modal"></code-example>

## Workflow Modals

### Add

Add modals have a colored title bar based on the record type being created. Additionally, due to a greater than average amount of content, they have fixed footers.

<code-example example="modal-add-form"></code-example>

### Edit & Send

Edit, Send, and non\-Add workflow modals possess a plain header to remind the user of the action they are taking. They generally have a neutralizing button, and a primary button.

<code-example example="modal-edit-form"></code-example>
