---
section: Layouts
page: Tabs
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tabs)
- **module:** `import { NovoTabModule } form 'novo-elements/modal';`

**Basic Usage**

```html
<novo-nav [outlet]="ref">
  <novo-tab>Overview</novo-tab>
  <novo-tab>Activity</novo-tab>
</novo-nav>

<novo-nav-outlet #ref>
  <novo-nav-content>
    <h1>Overview</h1>
  </novo-nav-content>
  <novo-nav-content>
    <h1>Activity</h1>
  </novo-nav-content>
</novo-nav-outlet>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Deprecate `condensed` in favor of `size`
- [ ] Deprecate `novo-tab-link` and make router navigation easier...
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 5.0.0

_Should be backwards compatible_

# Components

## NovoNavElement `novo-nav`

All tabs must be incapsulated in a `novo-nav` container. The nav will control the context and active tab.

### Properties

| Name      | Type       | Default    | Description                                                             |
| :-------- | :--------- | :--------- | :---------------------------------------------------------------------- |
| theme     | _String_   | --         | Color theme used to display tab color.                                  |
| direction | _String_   | horizontal | The layout direction of the tabs. (`horizontal` or `vertical`)          |
| outlet    | _Ref_      | --         | refs to the `novo-tab-outlet` these navigation controls.                |
| router    | _NgRouter_ | --         | an instance of an angular router. Used when tabs are used for page nav. |
| condensed | _Boolean_  | false      | **Deprecated** used to show a more compact view.                        |

## NovoTabElement `novo-tab`

The core element for displaying tabs.

### Properties

| Name     | Type      | Default | Description                                                                                        |
| :------- | :-------- | :------ | :------------------------------------------------------------------------------------------------- |
| active   | _Boolean_ | false   | Whether this tab is current active tab. Can be set manually but value is controlled by `novo-nav`. |
| color    | _String_  | --      | highlight color to use when this tab is active.                                                    |
| disabled | _Object_  | false   | Whether the tab will accept user interactions.                                                     |

## NovoTabLinkElement `novo-tab-link`

Used instead of `novo-tab` when using router navigation.

### Properties

| Name     | Type      | Default | Description                                                                                       |
| :------- | :-------- | :------ | :------------------------------------------------------------------------------------------------ |
| active   | _Boolean_ | false   | Whether this tab is current active tab. Can be set manually but value is controlled by `novo-nav` |
| disabled | _Object_  | false   | Whether the tab will accept user interactions.                                                    |

## NovoNavOutletElement `novo-nav-outlet`

The Container for all the `novo-nav-content`. A `#` reference should be added an passed to the `novo-nav` component to link the content to the tab view. The order of the content should be the same as the tabs that control them.

## NovoNavContentElement `novo-nav-content`

Used to incapsulate the navigation content. This wrapper will ensure on the active content is displayed.
