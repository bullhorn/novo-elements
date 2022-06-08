---
section: Components
page: Breadcrumbs
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

</div>

<img src="assets/images/BreadcrumbsOverview.png"/>

</novo-grid>

### Use When

- (✓) When the system has more than two layers in a hierarchy.
- (✓) When you need to inform the user of where they are.
- (✓) When the user may need to navigate back to a higher level.
- (✓) When the application has multi-layer architecture.


## Best Practices

- Ensure the content opened is highly correlated to the context that opened it. When showing a preview of a related content that can opened for various contexts, present the user with the data related to the context that opened it, rather than the same view.
- When using an aside to present the user with a form, ensure that it is beneficial to have the current view still available to the user, if not consider opening a new page.

## Accessibility

**Implementation**

This component is intended to follow the [Aria Breadcrumb Design Pattern](https://www.w3.org/TR/wai-aria-practices/#breadcrumb).