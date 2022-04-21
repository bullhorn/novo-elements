---
section: Components
page: Calendar
title: Design
order: 1
---

## Usage

<novo-grid columns="2" align="start" gap="2rem">

<div>

Calendars allow users to easily select dates. It comes in a handful of varieties based on the data the user is trying to enter, ie. A Single Date, Date Ranges, or Multiple Dates. 

The `novo-calendar` component is used to select a dates in a reactive way to be used in the presentation or filtering of data within a view container. The `novo-calendar` component is not a FormControl itself but is use in the `novo-date-picker` component when selecting dates.

</div>

![placeholder](assets/images/CalendarOverview.png)

<div>

### Use When

- (✓) When the user needs to select a date to control or filter data on the page.

  The `novo-calendar` component by itself is just a way to store a date or date range value in the view model.  These date can be used to manipulate the UI.  


</div>

<div>

### Don′t Use When

- (x) When you are capturing dates as part of a Form.

  If you need to store the date(s) in a Form with validation, you should use the `date-picker` component, which wraps the calendar in a FormControl.

</div>
</novo-grid>

## Anatomy

<novo-grid columns="2" align="start" gap="2rem">

<img src="assets/images/CalendarAnatomy.png" width="450">

<div>

1. **Month/Year Indicator**<br>
   These indicators are clickable and will diplay a Month or Year selection view.

1. **Next/Prev Buttons**<br>
   These buttons will control the current viewable month, allowing the user to move the view forward and backwards a month.

1. **Current Date**<br>
   The current date should always have an indicator to help the user 

1. **Selected Date**<br>
   Selected Date(s) will be highlighted as such.  When a range of dates are selected the selection will appear continous.

</div>
</novo-grid>

## Best Practices

- Card dimensions are based on its content and the container in which it resides.
- Apply custom heights and width to meet product requirements.
- Avoid the appearance of nested cards, and therefore don’t use cards within a modal or another card.
- When creating a group of cards, use consistently sized content within a grid or flex layout.


## Behaviors

<novo-grid columns="2" align="start" gap="2rem">

> ![placeholder](assets/images/CalendarMultiMonth.png)
>
> **Multiple Months**
>
> Sometimes dates and ranges are more valueable to see over the multiple months, 
> for this reason the component allows you to show consecutive months in the view.
> The view is responsive and will show the months horizontally first, to have a vertical
> list just set a fixed width on the container.

> ![placeholder](assets/images/CalendarRange.png)
>
> **Range Selection**
>
> When selection a range of dates...

> ![placeholder](assets/images/CalendarWeek.png)
>
> **Week Selection**
>
> Sometimes selecting the by a fixed range of dates, like the week is necessary to ensure the right data is selected. For example, when selecting a pay period or work week.  Using this selection mode with the appropriate `weekStart` property to set which day the week starts on.


</novo-grid>

## Accessibility

- If using an illustrative image for the supplement content, it’s generally safe to use an empty or null alternative text for example alt=""






