---
section: Components
page: Modals
title: Usage
order: 1
---

<novo-grid columns="2" align="start" gap="2rem">
  <novo-stack gap="2rem">
    <novo-title>Why?</novo-title>
    <novo-text>
      Modals are pop\-up dialogues designed to grab attention and inform the user of something critical, force a decision, or extend a workflow. There are two categories of modals: notification and workflow. Regardless of type, a modal should have a maximum of two main buttons.
    </novo-text>
  </novo-stack>
  <img src="https://via.placeholder.com/350x250"/>
  <novo-stack gap="2rem">
    <novo-title>When to Use</novo-title>
    <novo-text color="grass"><novo-icon mr="1rem">check</novo-icon>Do use to confirm irreversible actions</novo-text>
    <novo-text>Use a notification modal to ask the user to confirm when performing an action that cannot be undone; such as deleting a record, navigating away from something unsaved, or converting a file.</novo-text>
    <novo-text color="grass"><novo-icon mr="1rem">check</novo-icon>Do use to confirm actions that will affect other records</novo-text>
    <novo-text>Use notification modals to make the user aware the their action will affect other records. The modal should ask them to confirm this action and explicitly say what the changes to the other records will be.</novo-text>
    <novo-text color="grass"><novo-icon mr="1rem">check</novo-icon>Do use for tasks related to the main content</novo-text>
    <novo-text>Workflow modals should always share context with the main content of the screen they are on top of.  For example, when assigning candidates to a shift in a Scheduler.</novo-text>
  </novo-stack>
  <novo-stack gap="2rem">
    <novo-title>When <em>NOT</em> to Use</novo-title>
    <novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon>Don't use to confirm an action that has already happened.</novo-text>
    <novo-text>Notification modals should **NOT** be used to confirm actions that have already completed. Conveying information that does not require action is not critical enough to fully obscure the main content instead. Use [toast](/components/toast) instead.</novo-text>
    <novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon>Don't use for a task unrelated to the main content</novo-text>
    <novo-text>Don't obscure the main content of the screen for a task that is not directly related to that content. Open a new page or a [slideout](/components/aside) instead.</novo-text>
  </novo-stack>
</novo-grid>
