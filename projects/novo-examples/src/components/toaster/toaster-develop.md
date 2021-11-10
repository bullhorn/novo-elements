---
section: Components
page: Toaster
title: Develop
order: 3
---

# Technical Details

Toasts are used as system notifications. They can contain custom text titles and messages, as well as any icons from bh\-icons and any color from our color palletes.

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/field)
- **module:** `import { NovoFieldModule } from 'novo-elements';`

**Usage**

```html
<novo-field layout="horizontal">
  <novo-label>Amount</novo-label>
  <input novoInput type="number" class="example-right-align" />
  <span novoPrefix>$&nbsp;</span>
  <span novoSuffix>.00</span>
  <novo-hint>Enter some money</novo-hint>
</novo-field>
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

## NovoFieldElement `novo-field`

The `novo-field` component expects 1 `button` or `novo-button` as the trigger for the menu list which is comprised of all the `novo-option` or `novo-optgroup` child components.

### Properties

<props-table component="NovoFieldElement"></props-table>

# Directive

## NovoInput `[novoInput]`

The `novoInput` component expects 1 `button` or `novo-button` as the trigger for the menu list which is comprised of all the `novo-option` or `novo-optgroup` child components.

### Properties

<props-table component="NovoInput"></props-table>
