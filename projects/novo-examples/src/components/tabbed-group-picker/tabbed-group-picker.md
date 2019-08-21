Tabbed Group Picker [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tabbed-group-picker)
============================================================================================

Tabbed Group Picker allows for nested selection of groups and members via a tabbed interface.

## Basic

In its most basic usage, Tabbed Group Picker allows for selection of arbitrary sets of data that have no group/member relationship. Each data set appears on its own tab. The values returned must be javascript primitives (typically string or number).

<code-example example="tabbed-group-picker-basic"></code-example>

## Quick Select

Tabbed Group Picker provides a configurable quick select interface. For each quick select item, the developer provides the data type, values (or the 'all' flag), and a label. Tabbed Group Picker builds the quick select menu and synchronizes the quick select checkboxes with the data checkboxes (in both directions). 

<code-example example="tabbed-group-picker-quick-select"></code-example>
