---
section: Layouts
page: Tabs
title: Design
order: 2
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">
<div>

Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs are used to section information over multiple pages within the same context. Only a single tab can be open at a time, allowing the user to focus on the information that the tab contains.

</div>

<img src="assets/images/ButtonOverview.png"/>

<div>

### Use When

- (✓) When a page contains a lot of information that can be clearly grouped and named.

  E.g. A Candidate record page can be split up into Work History, Credentials, Education, etc.

- (✓) For top level page navigation

  For example: Vertical tabs can be used in a side navigation to switch between pages or bottom tabs can be used in mobile.

</div>
<div>

### Don′t Use When

- (x) Do not use to separate related content into multiple parts or break up (inter)actions that are important to continue with the user’s workflow.

  A user should be able to start and finish an action within a single tab. Instead consider using a Stepper component. Within a form, to organize and grouping fields together use a section divider.

- (x) Do not use when the users needs to see the information on each tab at the same time.

  If users need to see correlated content that is not on the tab they are viewing, consider using a Slideout. Or when data needs to be grouped further, use Cards.

- (x) Do not use to control the view of a single component, instead use radio buttons or tiles (button bar / segmented button).

  Don’t use tab to switch table data between states (past, present) (original, adjusted).

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ModalAnatomy.png" width="450">

<div>

1. **Container**<br>
   Tabs consist of a title that is descriptive of the information it holds. The currently selected tab is indicated by a colored bar that sits either below or left of the title (depending on the configuration). When the amount of tabs doesn't fit in the given space, a dropdown labeled More is added to the far right side of the tab bar. This dropdown contains all the overflowing tabs.

1. **Active Indicator**<br>
   This is the visual symbol that represents which tab is currently active or being viewed.

1. **Leading Icon (Optional)**<br>
   Should be avoided unless absolutely necessary, primarily used for mobile or responsive design

1. **Trailing Icon (Optional)**<br>
   Should be avoided unless absolutely necessary, primarily used to display status to user

</div>
</novo-grid>

## Best Practices

- Tab labels should provide clear and concise descriptions of the content within
  Avoid having more than 2 words unless the name of a product or entity prevents this.

- Tab contents should be categorically independent from the content of other tabs, so the user is not confused by where information might be.

## Color

> > ![placeholder](https://via.placeholder.com/350x250)
> >
> > **Theme - background**
> >
> > Any theme color can be applied to tabs which will make the background color match the color.
> > Any theme color can be applied to tabs with the `color` attribute to change the text color
>
> > ![placeholder](https://via.placeholder.com/350x250)
> >
> > **Regular tabs**
> >
> > The currently selected tab is indicated by the blue title and the blue bar that sits below or left of the title. The other tabs are using a grey font.
>
> > ![placeholder](https://via.placeholder.com/350x250)
> >
> > **White tabs**
> >
> > When tabs are used on a colored background, e.g. on a slide out, the currently selected tab is indicated by the white title and the white bar that sits below or left of the title. The other tabs are using a white font with a 70% opacity, leaving the background color to shine through.
> > {.two-columns}

## How to configure

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (✓) Horizontal Tabs
>
> This is the default behavior

> ![placeholder](https://via.placeholder.com/350x250)
>
> - (x) Vertical Tabs
>
> TBW...

</novo-grid>

## Patterns

<novo-grid columns="2" align="start" gap="2rem">

> **Tab with Status**
>
> When displaying a status for tab to the user add a trailing icon to that tab. eg. if the tab has an error state use a trailing icon[color=negative] for that tab.

![placeholder](https://via.placeholder.com/350x250)

> **White tabs**
>
> When tabs are used on a colored background, e.g. on a slide out, the currently selected tab is indicated by the white title and the white bar that sits below or left of the title. The other tabs are using a white font with a 70% opacity, leaving the background color to shine through.

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## Accessibility

- When implementing logic to update which tab item is active be sure to account for triggering the state on click, touch, and keyboard interactions.
- `<novo-tabs>` should include the aria `tablist` role and novo-tab should include the aria tab role.
- If used for page navigation then novo-tabs should include the aria `nav` role
