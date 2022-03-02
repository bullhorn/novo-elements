---
section: Components
page: Toolbar
title: Develop
order: 3
---

# Technical Details

Toolbars are used as ephemeral containers of helpful text. The importance of the content is usually short-lived and no longer needed once disseminated.

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/toolbar)
- **module:** `import { NovoToolbarModule } from 'novo-elements';`

**Usage**

```html
<novo-toolbar color="company" gap="1rem">
  <novo-icon>company</novo-icon>
  <novo-title>Taurus Industries</novo-title>
  <span class="example-spacer"></span>
  <novo-action icon="share" tooltip="Share"></novo-action>
  <novo-action icon="print" tooltip="Print"></novo-action>
  <novo-action icon="times" tooltip="Close"></novo-action>
</novo-toolbar>
```

# Roadmap

- [x] Improve Typing Support
- [x] Dark Mode

# Changelog

### 6.0.0

- Added in this version

# Components

## NovoToolbarElement `novo-toolbar`

The `novo-toolbar` component is just a container, look at patterns to determine correct usage.

### Properties

<props-table component="NovoToolbar"></props-table>


## NovoToolbarRowElement `novo-toolbar-row`

The `novo-toolbar-row` component is also just a container to help create multi-row toolbars, look at examples to determine correct usage.

### Properties

<props-table component="NovoToolbarRow"></props-table>

