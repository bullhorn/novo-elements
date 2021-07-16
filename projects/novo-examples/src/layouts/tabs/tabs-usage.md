---
section: Layouts
page: Tabs
title: Usage
order: 1
---

<novo-grid columns="2" align="start" gap="2rem">
<div>

### Why?

Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs are used to section information over multiple pages within the same context. Only a single tab can be open at a time, allowing the user to focus on the information that the tab contains.

</div>

<img src="/assets/images/ButtonOverview.png"/>

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
