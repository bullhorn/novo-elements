---
section: Components
page: Breadcrumbs
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/breadcrumbs)
- **module:** `import { NovoBreadcrumbModule } form 'novo-elements';`

**Basic Usage**

```html
<novo-breadcrumb>
  <novo-breadcrumb-item>
    <a routerLink="/components/get-start">Home</a>
  </novo-breadcrumb-item>
  <novo-breadcrumb-item>
    <span>Components</span>
  </novo-breadcrumb-item>
</novo-breadcrumb>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 5.0.0

_new in v5_

# Components

## NovoBreadcrumbElement `novo-breadcrumb`

Container Element for the card. Can optionally contain `novo-card-header`, `novo-card-footer`, and `novo-card-content` to provide a better layout to the card when displaying more structured data.

### Properties

| Name          | Type             | Default | Description                                                 |
| :------------ | :--------------- | :------ | :---------------------------------------------------------- |
| source        | _SourceConfig[]_ | --      | used for dynamic breadcrumbs in a more imperative approach. |
| separatorIcon | _TemplateRef_    | --      | defaults to template with slash character.                  |

## NovoBreadcrumbItemElement `novo-breadcrumb-item`

Represents an section in the breadcrumb list, can be an anchor tag to link to previous content, static text, or a dropdown...

### Properties

| Name               | Type           | Default | Description |
| :----------------- | :------------- | :------ | :---------- |
| showMenu           | boolean        | false   | TBW         |
| customMenuTemplate | _TemplateRef_  | --      | TBW         |
| menuList           | _MenuConfig[]_ | --      | TBW         |
| isSearch           | _boolean_      | false   | TBW         |
