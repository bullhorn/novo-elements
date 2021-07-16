---
section: Components
page: Modals
title: Usage
order: 1
---

<novo-grid columns="2" align="start" gap="2rem">
<div>

### Why?

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
