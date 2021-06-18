---
section: Layouts
page: Tabs
title: Usage
order: 1
---

<novo-grid columns="2" align="start" gap="2rem">
  <novo-stack gap="2rem">
    <novo-title>Why?</novo-title>
    <novo-text>
      Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs in Bullhorn have two different themes; A 'color' theme for tabbed navigation on a colored background, and a 'white' theme for tabs on a white background.
    </novo-text>
  </novo-stack>
  <img src="https://via.placeholder.com/350x250"/>
  <novo-stack gap="2rem">
    <novo-title>When to Use</novo-title>
    <novo-text color="grass"><novo-icon mr="1rem">check</novo-icon>Do use navigate between content with a shared context.</novo-text>
    <novo-text>Use a notification modal to ask the user to confirm when performing an action that cannot be undone; such as deleting a record, navigating away from something unsaved, or converting a file.</novo-text>
  </novo-stack>
  <novo-stack gap="2rem">
    <novo-title>When <em>NOT</em> to Use</novo-title>
    <novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon>Don't use main page navigation</novo-text>
    <novo-text>Notification modals should **NOT** be used to confirm actions that have already completed. Conveying information that does not require action is not critical enough to fully obscure the main content instead. Use [toast](/components/toast) instead.</novo-text>
    <novo-text color="grapefruit"><novo-icon mr="1rem">times</novo-icon>Don't use toggle between option values</novo-text>
    <novo-text>While a tab list is similar to selection list it is not meant to provide a way to toggle between options for the display of a single item. Use [radio](/components/radio) or [radio](/components/select) instead.</novo-text>

  </novo-stack>
</novo-grid>
