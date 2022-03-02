---
section: Components
page: Progress
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/loading)
- **module:** `import { NovoProgressModule } from 'novo-elements';`

**Usage**

```html
<novo-progress total="300">
  <novo-progress-bar value="120" color="success"></novo-progress-bar>
  <novo-progress-bar value="40" color="negative"></novo-progress-bar>
</novo-progress>
```

# Roadmap

- [ ] Make color and theming consistent
- [ ] Dark Mode

# Components

## NovoProgressElement `novo-progress`

The `novo-progress` component displays the loading bar in a linear or radial line. This commonly used for showing the state of a long running process, like a file upload. The progress bar can also be used for reporting on progress made towards a goal, eg. 5 of 10 shifts filled.

### Properties

<props-table component="NovoProgressElement"></props-table>
