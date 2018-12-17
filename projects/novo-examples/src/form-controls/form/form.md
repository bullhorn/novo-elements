Forms [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/form)
=========================================================================================

Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'

Static Form
-----------

Static forms `<novo-form />`.

##### Textbox Based Controls

<code-example example="text-based-controls"></code-example>

##### Checkbox Controls

<code-example example="check-box-controls"></code-example>

##### File Input Controls

<code-example example="file-input-controls"></code-example>

##### Calendar Controls

<code-example example="calendar-input-controls"></code-example>

##### Picker Controls

<code-example example="picker-controls"></code-example>

##### Address Controls

<code-example example="address-control"></code-example>

Dynamic Form
------------

Dynamic forms are composed of one element, `<novo-dynamic-form [controls]="controls"/>` and allow you to pass in the controls and form and it will create the form for you.

##### Basic

<code-example example="dynamic-form"></code-example>

##### Vertical

<code-example example="vertical-dynamic-form"></code-example>

##### Fieldsets

<code-example example="dynamic-form-field-sets"></code-example>

##### Updating Fields/Status

<code-example example="updating-form"></code-example>


##### Disabled Field States

<code-example example="disabled-form"></code-example>
