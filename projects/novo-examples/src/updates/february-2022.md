---
section: updates
page: v6
title: February 2022
order: 3
---

🚀 February 2022 (version 6 - Golden)
===========================

**Release v6.0.0**: This release contains several component updates and additional new components. Initial refactoring of component architecture to support future efforts to improve the design systems consistency along with improvements to the developer experience.

Note: This update is a major release which includes changes that require updates to your code. When updating to Novo Elements V6 from prior versions, the following commands are required:

First follow the steps to update your angular app to [Version 10](https://update.angular.io/?v=9.0-10.0)

```
npm install --save timezone-support@2 novo-design-tokens@0 angular-imask@6 imask@6
npm install --save novo-elements@6
ng update novo-elements --migrate-only --from=0.0.0 --to=6.0.0 --force --allow-dirty  
```

For any issues that are not corrected with the above command, please ask questions in the [Q&A Page](https://github.com/bullhorn/novo-elements/discussions/categories/q-a) in github.

Welcome to the February 2022 release of Novo Elements. There are many updates in this version that we hope you will like, some of the key highlights include:

- [Development Principle](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#dev-principle) - Philosophy on why we are making these changes.
- [Improved Documentation](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#improved-docs) - Check out the new Design & Developer Guideline.
- [Design Token & Themes](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#design-tokens) - The Bullhorn brand has evolved and the design system.
- **New Components**
  -   [Aside](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#aside) - A replacement implementation for Preview slideouts, that is easy to use and works like modals.
  -   [Autocomplete](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#autocomplete) - Low-level feature to help composability of custom pickers.
  -   [Avatar](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#avatar) - Display user and entity images with fallback display.
  -   [Breadcrumbs](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#breadcrumbs) - Show nested navigation hierarchy.
  -   [Menu](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#menu) - Coalesce options into floating overlay with a myriad of trigger functionality.
  -   [Layout](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#layouts) - Easy to setup layouts with side navigation.
  -   [Color Picker](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#color-picker) - Pick a color, works with form inputs.
  -   [Toolbar](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#toolbar) - More flexible toolbar control, to use for page headers or navigation.
- **Updated Components**
  -   [Calendar](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#calendar) - Support for multi-day selection, multi-month view, and can now be used independant of the data picker.
  -   [Modal](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#modals) - New animation and more events to better control Modals.
  -   [Chips](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#chips) - Still a WIP, but Chip, ChipList and ChipInput are now independant components that can be composed together separately.
  -   [Select & Dropdown](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#select) - Overhaul of these component to consolidate functionality into the new `novo-option` component, to create a more declarative design.
- [Preview Features](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#preview-features) - Check some new features that are still in development.
- [Notable Changes](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#notable-changes) - We changed some things, we fixed some things, hopefully left everything better than before!


> If you'd like to read these release notes online, go to [Updates](https://bullhorn.github.io/novo-elements/updates) on [bullhorn.github.io/novo-elements](https://bullhorn.github.io/novo-elements).

**Notice**: Want to try new features as soon as possible? You can always view the `upcoming` relase documentation for the [Next Branch](https://bullhorn.github.io/novo-elements). The code is available on [Github](https://github.com/bullhorn/novo-elements/tree/next) follow the guides to build and try the latest updates as soon as they are available.


## Development Principles [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#dev-principle){#dev-principle}

The overall philosophy for the changes and improvement for the design system stems from the core principle of making each component more declarative vs imperative. To illustrate this with an example:

**Source Options**

```ts
public options: Array<any> = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Zero', value: 0 },
  { label: 'Four', value: 4, readOnly: true },
];
```

**Old Way (Imperative)**

```html
<novo-select formControlName="example" [options]="options"></novo-select>
```

**New and Shiny Way (Declarative)**

```html
<novo-select formControlName="example">
  <novo-option *ngFor="let option of options" [value]="option.value" [disabled]="option.readonly">
    <novo-icon>calculator<novo-icon>
    <span>&#123;&#123;option.label&#125;&#125;<span>
  </novo-option>
</novo-select>
```

While the **New and Shiny Way** might seem verbose, it actually creates infinite flexibility within the implementation.  When the developer is composing features within their application, the component will support things like adding icons on the left and right, displaying two rows of info in the options, alternatively before in our imperative design the design system would have to have be augmented to support subtle new variants.


## Improved Documentation [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#improved-documentation){#improved-documentation}

The number one complaint we heard about the design system was that the documentation was sparse and not helpful. With the help of the UX teams we have Audited more than half of the components in the design system and added guidelines on the appropiate usage.  Developer docs with implementation and api details as well as an improvement to the Examples.

![Design Guideline & Best Practices](assets/images/updates/v6/v6-improved-docs.gif){width=640px}

## Design Token & Themes [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#design-tokens){#design-tokens}

A significant milestone was reached in v6 which is to create a [Style Dictionary](https://github.com/amzn/style-dictionary) to isolate our variables into a [design tokens library](https://github.com/bullhorn/novo-design-tokens).  A Style Dictionary uses design tokens to define styles once and use those styles on any platform or language. This will allow the novo design system to help us create a coheosive look and feel across all our product suites regardless of the technologies being used. It also helps create better structure of our variables and tokens to ensure ease of use.

Future Plans are to:

- Create a base Bullhorn css stylesheet.
- Migrate all web tokens from sass variable to css variables 


New Components[#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#new-components){#new-components}
--------------------------------------------------------------------

### Aside [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#aside){#aside}

Asides are slideouts designed to provide a view into related content within the page without navigating away. Asides work similar to Modal but the content is meant to be correlated and the workflow should be non-blocking.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/aside/design).


![New Aside Component](assets/images/updates/v6/v6-aside.gif){width=640px}

* * * * *

### Autocomplete [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#auto-complete){#auto-complete}

The autocomplete component is designed to provide a list of options as the user types that can be used to set the field value. The component can be used to set more complex data to the form. Usually the input does not require a valid option to be selected.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/autocomplete/design).

![New Autocomplete Component](assets/images/AutocompleteOverview.png){width=640px}

* * * * *

### Avatar [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#avatar){#avatar}

Avatars are images used to represent users and organizations. They typically are squares with rounded edges.

An avatar acts as a proxy for a user or entity (such as a company) in a product. They're often combined with status or presence indicators to give more context. Users generally upload their own image, otherwise, a default image is displayed

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/avatar/design).

![New Avatar Component](assets/images/AvatarOverview.png){width=640px}

* * * * *

### Breadcrumbs [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#breadcrumbs){#breadcrumbs}

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/breadcrumbs/design).

* * * * *

### Menu [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#menu){#menu}

Menu allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.

Menus are contextual and all for actions to be performed based upon the context of the trigger or selection. Menus are great for consolidating many actions available to the user and can be used in a variety of different ways. Menus can be triggered from any element but usually limited to links, button, and icons.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/menu/design).

![New Menu Component](assets/images/MenuOverview.png){width=640px}

* * * * *

### Layout [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#layout){#layout}

This is a series of components that introduce the ability to configure your application layout, we introduce the a new side navigation panel that can dock on the left or right or hide and collapse to make a more responsive application. 

Check out the [example](https://bullhorn.github.io/novo-elements/docs/#/layouts/sidenav) to learn more.

![New Layout Components](assets/images/updates/v6/v6-sidenav.gif){width=640px}

* * * * *

### Color Picker [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#color-picker){#color-picker}

Color Picker allow users to easily select a color swatch. It comes in a handful of varieties based on the content of the field.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/form-controls/color-picker).

* * * * *

### Toolbar [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#toolbar){#toolbar}

Toolbars are containers attached to the top or bottom of a page that contain actions and/or navigation. Toolbars can stack on-top of each providing varying levels of content. Toolbars usually act as headers or footers of the page.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/toolbar/design).

![New Toolbar Component](assets/images/ToolbarOverview.png){width=640px}

Updated Components [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#updated-components){#updated-components}
--------------------------------------------------------------------

### Calendar [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#calendar){#calendar}

The calendar has been refactored into smaller components to allow for a cleaner implementation when composing for the datepicker. Support for multi-day selection and multi-month view have been added. see new props below:

| Prop | Type | Description |
| --- | --- | --- |
| `mode` | `string` | The selection mode. Possible values are `single`, `multiple`, `range`, `week`  |
| `numberOfMonths` | `number` | Defaults to `1`, the calendar should flex and wrap within the view. |

* * * * *

### Modal [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#modal){#modal}

There are two objects injected into the Modal `NovoModalRef` and `NovoModalParams`.  Typing support for the NovoModalParams is difficult.  You no longer need to do this you only need the single reference to `NovoModalRef` which now accepts a generic. `ref:NovoModalRef<DeleteModalParams>` will now type the `ref.params`.

`NovoModalRef` used to only have the `onClosed` which returns a promise with and value returned from the Modal to the calling component.  We have added two new observables for `beforeClose` and `afterClosed` in order to 

Modals now have a smooth animation when opened and closed.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/modals/design).

* * * * *

### Chips [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#chips){#chips}

This milestone, we introduce the Side Panel, a new surface in the workbench opposite the Side Bar, where you can house views from the Side Bar or the bottom Panel. Unlike moving the bottom Panel to the left or the right of the editor, the new Side Panel works in addition to the bottom Panel so you can see more sets of views at once.

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/form-controls/chips/design).

* * * * *

### Select & DropDowns [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#option){#option}

We already talked about the change from imperative to declarative. We have consolidated all of our display of option/menu-items used by many components into a single implmenation of `novo-option` and groupings with `novo-optgroup`.  Several new patterns for searching within optgroups are works in progress, but coming soon.  The major change is how to migrate `novo-dropdown` contents to the new implementation.

**Old Way**

```html
<novo-dropdown>
  <button>trigger</button>
  <list>
    <dropdown-item-header>Cats</dropdown-item-header>
    <item (action)="action('1')">Persian</item>
    <item (action)="action('2')">Maine Coon</item>
    <dropdown-item-header>Dogs</dropdown-item-header>
    <item (action)="action('3')">Cocker Spaniel</item>
    <item (action)="action('4')">Poodle</item>
  </list>
</novo-dropdown>
```

**New and Shiny Way**

```html
<novo-dropdown>
  <button>trigger</button>
  <novo-optgroup label="Cats">
    <novo-option (action)="action('1')">Persian</novo-option>
    <novo-option (action)="action('2')">Maine Coon</novo-option>
  <novo-optgroup>
  <novo-optgroup label="Dogs">
    <novo-option (action)="action('3')">Cocker Spaniel</novo-option>
    <novo-option (action)="action('4')">Poodle</novo-option>
  <novo-optgroup>
</novo-dropdown>
```

Preview Features [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#preview-features){#preview-features}
--------------------------------------------------------------------

### Utility Directives [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#utility-directives){#utility-directives}

Composing layouts is difficult especially when you need to create css classes for all your container.  It gets very repetitive add `display: flex` and `flex-direction: row`.  Now we have new utility components and directive to compose the general layout of a page without writing any css.  The goal is reduce application specific css to zero.  Here are the new features we have added to support this.

- `<novo-box>`
- `<novo-flex>` or `<novo-row>`
- `<novo-stack>` or `<novo-col>`

| prop | CSS Property | Description |
| --- | --- | --- |
| `direction` | `flex-direction` | `Use flex or stack, but you can overried if needed` |
| `align` | `align-items` | `Aligns the content along the primary axis` |
| `justify` | `justify-content` | `Aligns the content along the secondary axis` |

In addition to these layout components you can add directives (attributes) to any element on your page. All of these elements are **theme aware** as in they will look up the value from the design token library and use that value.

| Prop | CSS Property | Design Token |
| --- | --- | --- |
| `margin` | `margin` | `spacing` |
| `mt`, `marginTop` | `margin-top` | `spacing` |
| `mr`, `marginRight` | `margin-right` | `spacing` |
| `mb`, `marginBottom` | `margin-bottom` | `spacing` |
| `ml`, `marginLeft` | `margin-left` | `spacing` |
| `mx` | `margin-left` and `margin-right` | `spacing` |
| `my` | `margin-top` and `margin-bottom` | `spacing` |
| `padding` | `padding` | `spacing` |
| `pt`, `paddingTop` | `padding-top` | `spacing` |
| `pr`, `paddingRight` | `padding-right` | `spacing` |
| `pb`, `paddingBottom` | `padding-bottom` | `spacing` |
| `pl`, `paddingLeft` | `padding-left` | `spacing` |
| `px` | `padding-left` and `padding-right` | `spacing` |
| `py` | `padding-top` and `padding-bottom` | `spacing` |
| `bg` | `background-color` | `color` |
| `color` | `color` | `color` |
| `accent` | `class` | `color` |
| `theme` | `class` | `color` |

For Example:

```html
<!-- This will create a row with three columns each containing a stacked icon over text -->
<novo-flex gap="lg">
  <novo-stack padding="md" bg="candidate">
    <novo-icon>candidate</novo-icon>
    <novo-text>Ferdinand del Toro</novo-text>
  </novo-stack>
  <novo-stack padding="md" bg="candidate">
    <novo-icon>contact</novo-icon>
    <novo-text>Ferdinand del Toro</novo-text>
  </novo-stack>
  <novo-stack padding="md" bg="company">
    <novo-icon mb="sm">company</novo-icon>
    <novo-text>Bullhorn</novo-text>
  </novo-stack>
</novo-flex>
```

### New Field Component [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#field){#field}

A new experimental `novo-field` component has been added to help improve the future of `novo-form` (which it is not currently using).  The `novo-field` and its supporting cast of components and directives makes it really easy to compose static forms.


```html
<form [formGroup]="data">
  <novo-fields appearance="filled" layout="vertical" [fullWidth]="true">
    <!-- Notice the novoInput directive -->
    <novo-field>
      <novo-label>Pick a Number?</novo-label>
      <input novoInput type="number" placeholder="Ex. 12" [formControl]="numberControl" min="10" />
      <novo-error *ngIf="numberControl.invalid">Minimum: 10</novo-error>
    </novo-field>
    <!-- Easily attach pickers or custom autocompletes to a novoInput -->
    <novo-field>
      <novo-label>Date of Birth</novo-label>
      <input novoInput dateFormat [picker]="datepicker" [formControl]="dateControl" />
      <novo-picker-toggle novoSuffix icon="calendar">
        <novo-date-picker #datepicker></novo-date-picker>
      </novo-picker-toggle>
    </novo-field>
  </novo-fields>
</form>
```

View the docs to [read more](https://bullhorn.github.io/novo-elements/docs/#/components/field/design).


Notable changes [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#notable-changes){#notable-changes}
--------------------------------------------------------------------

-   `novo-table` is now deprecated use `novo-data-table` instead
-   `appendToBody` on dropdowns and pickers is deprecated
-   `list` and `item` are not valid web-component or angular standard tags.  use `novo-list` and `novo-list-item`, but use `novo-option` and `novo-optgroup` inside of a dropdown.
-   `list` and `item` are not valid web-component or angular standard tags.  use `novo-list` and `novo-list-item`, but use `novo-option` and `novo-optgroup` inside of a dropdown.
-   `range` input on `date-picker` is deprecated please use `mode="range"`
-   `week` input on `date-picker` is deprecated please use `mode="week"`


Thank you [#](https://bullhorn.github.io/novo-elements/docs/#/updates/v6#thanks){#thanks}
--------------------------------------------------------------------

Last but certainly not least, a big *Thank You* to the contributors of Novo Elements throughout the years. For this release a special shout out to our developers Dan Voegelin and Charles Barnes, the automation team for helping us test the changes: Jon Eman, Tiffany Bertolozzi, Tony Phu and Ashley Schroeder, and our UX Team include but not limited to: Jon Braun, Madeliene Valcour, Katie Todd, Daniel Long, Angela Wang and Gloria Nam.

