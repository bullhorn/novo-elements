---
section: Components
page: Tooltip
title: Develop
order: 3
---

# Technical Details

Tooltips are used as system notifications. They can contain custom text titles and messages, as well as any icons from bh\-icons and any color from our color palletes.

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tooltip)
- **module:** `import { NovoTooltipModule } from 'novo-elements';`

**Usage**

```html
<novo-field layout="horizontal">
  <novo-label tooltip="This Field is REQUIRED" tooltipPosition="top-left">Amount</novo-label>
  <input novoInput type="number" class="example-right-align" />
</novo-field>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 6.0.0

_none_
# Components

## TooltipDirective `[tooltip]`

Adds a tooltip to the element the directive is attached too. Use the input option to align and control how the tooltip displays.
### Properties

<props-table component="TooltipDirective"></props-table>
