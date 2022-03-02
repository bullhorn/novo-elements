---
section: Components
page: Dropdown
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/dropdown)
- **module:** `import { NovoDropdownModule } from 'novo-elements';`

**Basic Usage**

```html
<novo-dropdown>
  <novo-button theme="secondary" icon="collapse">Actions</novo-button>
  <novo-option (click)="alert('Item 1')">Menu Item 1</novo-option>
  <novo-option (click)="alert('Item 2')">Menu Item 2</novo-option>
</novo-dropdown>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 5.0.0

**Deprecation**

- You should no longer use `list` and `item` components, these are non-standard components and have been replaced with `novo-option` as used in the usage above.

# Components

## NovoDropdownElement `novo-dropdown`

The `novo-dropdown` component expects 1 `button` or `novo-button` as the trigger for the menu list which is comprised of all the `novo-option` or `novo-optgroup` child components.

### Properties

<props-table component="NovoDropdownElement"></props-table>
