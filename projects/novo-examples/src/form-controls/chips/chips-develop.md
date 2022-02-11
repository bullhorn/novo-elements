---
section: Form Controls
page: Chips
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/chips)
- **module:** **part of** `NovoChipsModule`

**Usage**

```html
<novo-chip-list>
  <novo-chip>Celtics</novo-chips>
  <novo-chip>Bulls</novo-chips>
</novo-chip-list>
```

# Roadmap

- [x] Dark Mode
- [x] Chip List


# Changelog

### 6.0.0

Chips are now separated into their atomic parts: `novo-chip`, `novo-chip-list`, `novo-chip-input`.


# Components

## NovoChipElement `novo-chip`

The `novo-chip` component is the lowest level component for the chips module.  Contains all the styles contained with a single chip.  This component can start being used for more use-cases other than the multi-select picker.

### Properties

<props-table component="NovoChipElement"></props-table>

## NovoChipListElement `novo-chip-list`

The `novo-chip-list` is just a container to wrap many chips within.  This should control basic flow and layout of the contained chips.

### Properties

<props-table component="NovoChipListElement"></props-table>
