Field Interactions
==================

Field Interactions is a simple API that allows you to modify NovoForms based on field changes.

The Field Interaction API gives you a simple to use API object when writing your field interaction functions.

Look below for samples of what you can do with this API...

Configuration
-------------

Inspect Form Configuration on Field Getting Current Context Write Field Interaction

##### Inspect Form

There is a special `data-control-key` property added to the `novo-control` element.

You can inspec the DOM at the input and see the property to know what 'key' to use in the API

By default, if you are writing a Field Interaction for the active field you can use `API.getActiveKey()`

##### Configuration on Field

    event: 'change|focus|blur|init', script: Function, invokeOnInit?: boolean

The Field Interactions are configured on a per control basis. There are three scenarios in which they will be fired: 'change', 'focus' and 'blur'.

init -- gets fired only when the form is initialized

change -- gets fired when the value of the form control changes

focus -- gets fired when the field gets focused

blur -- gets fired when the field loses focus

The script function represents the function that will be fired for the event, you can see examples of these below.

Lastly, 'invokeOnInit' will also trigger the Field Interaction when the form is created as well.

##### Getting Current Context

If you need to write Field Interaction based on if you are on an add or edit page, or you need to know the current entity type and ID then you can get those via:

edit: 'API.isEdit'

entity: 'API.currentEntity'

id: 'API.currentEntityId'

##### Write Field Interaction

Writing Field Interactions is very simple. You can refer to all the examples below. If you ever get stuck, you can always open a [Github Issue](https://github.com/bullhorn/novo-elements/issues) as well!

**IMPORTANT**

When writing field interactions, you will be writing everything only the contents of the function. **You do not** write the surrounding function.

**All field interactions must be written in vanilla ES5 as well!**

  

Basic API
---------

Validation Mark Fields as Required Field Calculations & Modification Hide / Show Fields Enable / Disable Fields Messaging / Notifications Modifying Config on Static Pickers / Selects Using Globals Async Interactions Confirm Changes Adding / Removing Fields Add Tooltip

##### Validation

If you need to perform some custom validation on a field, you can use the API to quickly mark a field as invalid

<code-example example="fi-validation"></code-example>

##### Mark Fields as Required

If you need to mark fields as required or not based on some changes in the form, you can use the API to do that!

<code-example example="fi-required"></code-example>

##### Field Calculations & Modification

If you need to do some custom calculations based off other form data, you can do that easily with the API

<code-example example="fi-calculation"></code-example>

##### Hide / Show Fields

You can also hide or show certain fields based on interaction with the form. Note that the value is still present in the form's value

<code-example example="fi-hide-show"></code-example>

##### Enable / Disable Fields

You can also enable or disable certain fields based on interaction with the form. Note that the value is still present in the form's value but does not respond to any interactions

<code-example example="fi-enable-disable"></code-example>

##### Messaging / Notifications

You can trigger messages to users in a few different ways using the API

<code-example example="fi-messaging"></code-example>

##### Modifying Config on Static Pickers / Selects

You have full control over the control, you can modify the options array of static pickers and select controls!

<code-example example="fi-modify-options"></code-example>

##### Using Globals

Using the config from above, you can figure the API to have a set of global variables that you can key off of inside your field interactions

<code-example example="fi-globals"></code-example>

##### Async Interactions

You can perform async interactions and keep the form from saving by setting a loading state

<code-example example="fi-async"></code-example>

##### Confirm Changes

You can prompt the user if they want to update the field or not too!

<code-example example="fi-confirm"></code-example>

##### Adding / Removing Fields

With the API you can quickly add and remove fields on the form.

**ONLY WORKS WITH DYNAMIC FORMS**

<code-example example="fi-adding-removing"></code-example>

##### Add Tooltip

You are able to dynamically change a field's tooltip.

<code-example example="fi-tooltip"></code-example>

