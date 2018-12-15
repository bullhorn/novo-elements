MultiPicker [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/multi-picker)
=======================================================================================================

The multipicker element (`multipicker`) represents a control that presents a menu of options of multiple types. The options within are set by the `source` attribute. Options can be pre\-selected for the user using the `ngModel` attribute. Multipicker is the multi\-category version of `chips`

.  

##### Basic Example

By clicking on the `multi-picker` element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be added to the list of selected values.

<code-example example="basic-multi-picker"></code-example>

##### Nested Example

The multipicker can also support a parent\-child relationship between the types, such as the relationship between a state with many cities or a department with users.

<code-example example="nested-multi-picker"></code-example>
