# Select [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/select)

The select element (`novo-select`) represents a control that presents a menu of options. The options within are set by the `items` attribute. Options can be pre\-selected for the user using the `value` attribute.

##### Basic Examples

By clicking on the `novo-select` element, the options list will be displayed. Select any of the options by clicking on the item in the list. The value selected will be displayed and the options list will be removed.

<code-example example="basic-select"></code-example>

##### Basic Selections With Search

Use the `novo-select-search` to provide searching functionality to the select component. Can be used to support remote options.

<code-example example="basic-select-with-search"></code-example>

##### Lots of Options

The most common need for the `select` component is when there are too many options that would fit on on the screen. The options list will display appropriately and scroll as needed.

<code-example example="long-select"></code-example>

##### Multiple Selections

When many option can be selected, use the `multiple` attribute which allows for a simple iterface to select multiple options.

<code-example example="multiple-select"></code-example>

##### Multiple Selections With Search

The `novo-select-search` is compatible with the `multiple` option as well.

<code-example example="multiple-select-with-search"></code-example>
