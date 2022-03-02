---
section: Layouts
page: Card
title: Design
order: 2
---

## Usage Guidelines

<novo-grid columns="2" align="start" gap="2rem">

<div>

### Use When

- (✓) When information can be grouped and the user might need access to multiple groups of information at once.

  TBW

- (✓) When providing a summary of content as an entry point to a larger grouping of information

  TBW

</div>
<div>

### Don′t Use When

- (x) When a lot of information on the card makes it too large. Instead consider using a modal or showing the information on a new page.

  TBW

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/ModalAnatomy.png" width="450">

<div>

1. **Header**<br>
   Cards can have a header row that always contains a title. If the card can be reordered on the page, a handle is placed left of the title that allows dragging of the card. Between the handle and the title an icon can be added. On the far right of the header row, actions can be added.

1. **Shadow**<br>
   Novo-elements has 5 elevation layers by default; cards should float just above the content they are contained within.

</div>
</novo-grid>

## Best Practices

- Card dimensions are based on its content and the container in which it resides.
- Apply custom heights and width to meet product requirements.
- Avoid the appearance of nested cards, and therefore don’t use cards within a modal or another card.
- When creating a group of cards, use consistently sized content within a grid or flex layout.

## Color

> > ![placeholder](https://via.placeholder.com/350x250)
> >
> > **Theme - background**
> >
> > Any theme color can be applied to tabs which will make the background color match the color.
> > Any theme color can be applied to tabs with the `color` attribute to change the text color
> > {.two-columns}

## Patterns

<novo-grid columns="2" align="start" gap="2rem">

> **Details Card**
>
> Cards can use a list to display information. In this case the label and content are ordered left to right. Every other row has a darker background to improve readability.

![placeholder](https://via.placeholder.com/350x250)

</novo-grid>

## Accessibility

- If using an illustrative image for the supplement content, it’s generally safe to use an empty or null alternative text for example alt=""
