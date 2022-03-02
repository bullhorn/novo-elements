---
section: Components
page: Tip Well
title: Develop
order: 3
---

# Technical Details

Tip Wells are used as ephemeral containers of helpful text. The importance of the content is usually short-lived and no longer needed once disseminated.

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tip-well)
- **module:** `import { NovoTipWellModule } from 'novo-elements';`

**Usage**

```html
<novo-tip-well name="Demo" icon="info">
  Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.
</novo-tip-well>
```

# Roadmap

- [x] Improve Typing Support
- [x] Dark Mode
- [ ] Create a Provider for TipWell states

# Changelog

### 6.0.0

**Deprecation**

- You should no longer use `tip` property and instead add the contents as children with the template.

# Components

## NovoTipWellElement `novo-tip-well`

The `novo-tip-well` component expects a `name` property, which will be used to store the state of the tipwell in local-storage.

### Properties

<props-table component="NovoTipWellElement"></props-table>

