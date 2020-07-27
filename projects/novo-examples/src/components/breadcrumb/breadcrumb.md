# Breadcrumb [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/breadcrumb)

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy.

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
- When the application has multi-layer architecture.

## Examples

##### Static

Breadcrumbs can be use statical with the `novo-breadcrumb` and `novo-breadcrumb-item` elements. You can also set the breadcrumb item to have a menu too.

<code-example example="breadcrumb-usage"></code-example>

##### Dynamic

If you need to build the breadcrumbs dynamically based on data within the app you can use the `source` attribute pass the values of the breadcrumb.

<code-example example="breadcrumb-source-usage"></code-example>
