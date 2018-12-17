Dropdown [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/dropdown)
================================================================================================

Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.

Types
-----

##### Dropdown Menu

This is a simple dropdown menu.

<code-example example="basic-drop-down"></code-example>


##### Dropdown Position Options

This is an example of how dropdowns can be positioned. Use the \[side\] input to specify how the popup positions or re\-positions itself on the page using a preferred location and one or more fallback locations:

<code-example example="position-drop-down"></code-example>

##### Lots of data!

Crazy large dropdown to demonstrate how the smart positioning works.

<code-example example="large-drop-down"></code-example>

##### Scrollable Container Class

This is an example of using a dropdown within a scrollable container. Simply place the directive cdkScrollable on the ancestor element that does the scrolling.

<code-example example="scrollable-drop-down"></code-example>

##### Custom Class

You can have custom classes on the dropdown container that opens up by using the "containerClass" property. Use scrollStrategy to close, block or reposition the dropdown when the parent scrolls. The default scrollStrategy is reposition.

<code-example example="custom-drop-down"></code-example>

##### Keep Open

You can set the "keepOpen" property on the "item" in order to keep it from closing the dropdown automatically.

<code-example example="multi-drop-down"></code-example>
