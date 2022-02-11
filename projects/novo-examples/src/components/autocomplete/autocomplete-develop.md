---
section: Components
page: Autocomplete
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading)
- **module:** **part of** `NovoFieldModule`

**Usage**

```html
<novo-field class="example-full-width">
  <novo-label>Number</novo-label>
  <input type="text" novoInput placeholder="Pick one" autocomplete="off" />
  <novo-autocomplete>
    <novo-option [value]="1">One</novo-option>
    <novo-option [value]="2">Two</novo-option>
    <novo-option [value]="3">Three</novo-option>
  </novo-autocomplete>
</novo-field>
```

# Roadmap

- [ ] Default filtering of options
- [ ] Dark Mode

# Components

## NovoAutocompleteElement `novo-autocomplete`

The `novo-autocomplete` component automatically links its list of values to the the novoInput of the `novo-field`. Subscribe to value changes inorder to update your options list.

### Properties

<props-table component="NovoAutocompleteElement"></props-table>
