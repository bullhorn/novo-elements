Tabs [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/tabs)
========================================================================================

Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets. Tabs in Bullhorn have two different themes; A 'color' theme for tabbed navigation on a colored background, and a 'white' theme for tabs on a white background.

Themes
------

##### Color

Colored background tab navigation gets the theme `theme="color"`

<code-example example="tabs-color"></code-example>


##### White

White background tab navigation gets the theme `theme="white"`

<code-example example="tabs-color"></code-example>

Styles
------

Condensed tabs to help utilize more space with `condensed="true"`

<code-example example="tabs-condensed"></code-example>

Types
-----

##### Vertical

Vertical tabs get a direction attribute `direction="vertical"`

<code-example example="tabs-vertical"></code-example>

##### Button Tab Bars

Tabbed Button Bars get a similar style treatment to the `"header"` theme button.

<!-- <code-example example="tabs-condensed"></code-example> -->

As Application Routing Mechanism
--------------------------------

Follows the same color/white theme as above, but doesn't use the "novo\-tabs" tag and you have to add the classes and html accordingly. The header will now control and route your application and put the content in the "router\-outlet" and look/feel like our tabs component.

<code-example example="tabs-router"></code-example>