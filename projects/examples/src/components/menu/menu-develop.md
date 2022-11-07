---
section: Components
page: Menu
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading)
- **module:** `import { NovoMenuModule } from 'novo-elements';`

**Usage**

```html
<!-- Define a menu with a set of menuItems -->
<novo-menu #menu>
  <novo-option *menuItem (click)="handleViewDetails($event)">
    <novo-icon>preview</novo-icon>
    <span>View Details</span>
  </novo-option>
  <novo-divider *menuItem></novo-divider>
  <novo-option (click)="handleDelete($event)">
    <novo-icon>delete-o</novo-icon>
    <span>Delete Record</span>
  </novo-option>
</novo-menu>
<!-- Add menu attribute to link the menu to an element -->
<novo-button [menu]="menu">Actions</novo-button>
```

# Roadmap

- [ ] Dark Mode
- [ ] Consolidate with `novo-dropdown`

# Components

## NovoLoadingElement `novo-menu`

The `novo-menu` component is a hidden wrapper that holds the templates for a menu. When a menu is triggered by the element with the matching `[menu]` attribute, a new instance of the menuItems will be created and the context will be passed to

### Properties

<props-table component="MenuComponent"></props-table>

## MenuDirective `[menu]`

This will define an element as a trigger for the menu. Use the `#` notation to make a reference to the `novo-menu` container, then pass the reference as the value of the attribute to link them together. A menu can be shared between multiple triggers, use the `menuContext` attribute to perform actions based on that context. The context can be reference in the structural directive `menuItem` as the implicit value, ie `*menuItem="let item"`, `item` will be equal to `menuContext`.

```html
<novo-menu #menu>
  <novo-option *menuItem="let item" (click)="alert(item)">Speak</novo-option>
</novo-menu>
<!-- The speak action will display moooo! -->
<novo-button [menu]="menu" menuContext="mooooo!">Cow</novo-button>
<!-- The speak action will display bark! -->
<novo-button [menu]="menu" menuContext="bark!">Dog</novo-button>
```

### Properties

<props-table component="MenuDirective"></props-table>

## MenuItemDirective `*menuItem`

A structural directive to be used with `novo-option` to create menu items. The `menuContext` set on the trigger will be passed to the implicit value, ie `*menuItem="let item"`, `item` will be equal to `menuContext`.

### Properties

<props-table component="MenuItemDirective"></props-table>
