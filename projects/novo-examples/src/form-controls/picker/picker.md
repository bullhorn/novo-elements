Picker [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/picker)
============================================================================================

The picker element (`input[picker]`) represents a control that presents a menu of options. The options within are set by the `items` attribute. Options can be pre\-pickered for the user using the `value` attribute.

  

##### Basic Examples

By clicking on the `input` element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.

<code-example example="basic-picker"></code-example>

##### Async Examples (With Infinite Scroll)

By clicking on the `input` element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.

<code-example example="async-picker"></code-example>

##### Formatted Picker Examples

By clicking on the `input` element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.

<code-example example="formatted-picker"></code-example>

##### Custom Picker Examples

By clicking on the `input` element, the options list will be displayed. picker any of the options by clicking on the item in the list. The value pickered will be displayed and the options list will be removed.

<code-example example="custom-picker-results"></code-example>

##### Overriding the Result Template

You can provide a string to override the base result template. You have access to `match` which is the data to be displayed.

<code-example example="override-template"></code-example>

##### Default Options

You can set a function or array for the default options on the config, for these options to appear when the user clicks in and doesn't have enough keys entered to perform a search

<code-example example="default-options-picker"></code-example>

##### Entity Single Picker

You can provide custom config to style the picker to select entities too!

<code-example example="entity-picker"></code-example>

##### Grouped Multi Picker (categories) with Picker

Having custom templates makes it easy to customize the functionality of the picker, here is an example of a category selector

<code-example example="grouped-picker"></code-example>
