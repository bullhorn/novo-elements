---
section: Components
page: Avatar
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/avatar)
- **module:** `import { NovoAvatarModule } form 'novo-elements';`

**Basic Usage**

```html
<novo-avatar [source]="{name: 'Brian Kimball'}"></novo-avatar>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 5.0.0

_added in this version_

# Components

## NovoAvatarElement `novo-avatar`

All tabs must be incapsulated in a `novo-nav` container. The nav will control the context and active tab.

### Properties

| Name   | Type     | Default  | Description                                                                             |
| :----- | :------- | :------- | :-------------------------------------------------------------------------------------- |
| theme  | _String_ | --       | Color theme used.                                                                       |
| color  | _String_ | --       | Color theme used.                                                                       |
| label  | _String_ | --       | refs to the `novo-tab-outlet` these navigation controls.                                |
| source | _Object_ | --       | Object containing props used to generate avatar. `name`, `firstName`, or `profileImage` |
| size   | _Size_   | 'medium' | Determines the height and widht of the avatar. (`small`, `medium` or `large`)           |

## NovoAvatarStackElement `novo-avatar-stack`

An avatar stack displays a number of avatars grouped together in a row or list.

### Properties

| Name  | Type     | Default | Description                                             |
| :---- | :------- | :------ | :------------------------------------------------------ |
| total | _Number_ | --      | Used to calculate `+N` icon based on ViewChildren added |
