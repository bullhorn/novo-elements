---
section: Layouts
page: Card
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/card)
- **module:** `import { NovoCardModule } form 'novo-elements';`

**Basic Usage**

```html
<novo-card>
  <novo-card-header>
    <novo-title>Ferdinand the Bull</novo-title>
    <novo-action icon="times" tooltip="Close Card"></novo-action>
  </novo-card-header>
  <novo-card-content>
    <novo-card-content condensed>
    <novo-list class="bgc-off-white-striped" direction="vertical">
      <novo-value row label="Author" data="Munro Leaf"></novo-value>
      <novo-value row label="Cover artist" data="Robert Lawson"></novo-value>
      <novo-value row label="Language" data="English"></novo-value>
      <novo-value row label="Published" data="1936"></novo-value>
      <novo-value row label="Genre" data="Childrens"></novo-value>
    </novo-list>
  </novo-card-content>
  <novo-card-footer>
    <novo-button> PIN <novo-icon>pin</novo-icon> </novo-button>
    <novo-button> SHARE <novo-icon>share</novo-icon> </novo-button>
  </novo-card-footer>
</novo-card>
```

# Roadmap

- [x] Improve Typing Support
- [ ] Make color and theming consistent
- [ ] Dark Mode

# Changelog

### 5.0.0

**Deprecation**

- Switch to declarative component design vs old imperative design. Using the input attributes to set header values should be replaced by adding `novo-card-header` component following appropriate patterns per design system. This approach might seem like more code but it enables a more flexible component when creating new patterns.

::: dont Stop using imperative propeties
Explain this
:::

```html
<novo-card
  [title]="'All Attributes'"
  icon="activity"
  [loading]="loading"
  [message]="message"
  [messageIcon]="messageIcon"
  [refresh]="refresh"
  [move]="move"
  [close]="close"
  (onRefresh)="onRefresh()"
  (onClose)="onClose()"
  [padding]="padding"
>
  Stop using this pattern
</novo-card>
```

::: do Add structured content to create your layout
Explain this
:::

```html
<novo-card>
  <novo-card-header>
    <novo-title>Title</novo-title>
    <novo-action icon="times" tooltip="Close Card"></novo-action>
  </novo-card-header>
  <novo-card-content> Any Content Can Go Here </novo-card-content>
  <novo-card-footer>
    <novo-button> Action <novo-icon>arrow-right</novo-icon> </novo-button>
  </novo-card-footer>
</novo-card>
```

# Components

## NovoCardElement `novo-card`

Container Element for the card. Can optionally contain `novo-card-header`, `novo-card-footer`, and `novo-card-content` to provide a better layout to the card when displaying more structured data.

### Properties

| Name | Type | Default | Description |
| :---------- | :-------- | :------ | :------------------------------------------------------------------------------- | |
| padding | _Boolean_ | true | **deprecated** whether the card has padding by default. |
| config | _Object_ | {} | **deprecated** |
| title | _String_ | -- ' | **deprecated** Text to display in header |
| message | _String_ | -- | **deprecated** Displays a warning message when the card has an error or warning. |
| messageIcon | _String_ | -- | **deprecated** Icon to display in the banner with `message`. |
| icon | _String_ | -- | **deprecated** Icon to display in header with the title. |
| iconTooltip | _String_ | -- | **deprecated** Tooltip for the icon in the header. |
| refresh | _Boolean_ | -- | **deprecated** Show refresh button in header. |
| close | _Boolean_ | -- | **deprecated** Show close button in header. |
| inline | _Boolean_ | -- | **wip** Whether the card is render as display: `block` or `inline-block`. |
| inset | _String_ | -- | **wip** Inset padding to add to the card |

## NovoCardHeader `novo-card-header`

Container row for the card header

## NovoCardContent `novo-card-content`

Container row for the card content

## NovoCardFooter `novo-card-footer`

Container row for the card footer
