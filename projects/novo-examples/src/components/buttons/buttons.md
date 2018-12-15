Button [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/button)
============================================================================================

A button clearly indicates a point of action for the user. Bullhorn buttons come in a variety of themes, custom tailored to fit your use\-case.

Themes
------

Bullhorn button themes were hand crafted to make your life easier. Most buttons used in the Bullhorn platform should utilize a `theme` attribute. Theme attributes provide access to every variation of Bullhorn UX approved buttons. Depending on the theme, some buttons may also utilize `icon`, `side`, and `inverse` attributes. Button are divided by function into four main categories: Primary, Secondary, Neutralizing, Subtractive. There are also three other button types that are independent of function: Dialogue, Icon, and Header.

## Colors

Acceptable colors include `Primary`, `Success`, `Warning`, `Negative`, and **all analytics colors** which can be found in the color section of the style guide.

<code-example example="button-overview"></code-example>
  
## Primary

Primary buttons are used to as primary calls\-to\-action. They should **always** get an `icon` attribute. Primary buttons with a "success" color `color="success"` are used for saving and will almost always contain a "check" icon. Negative color primary buttons `color="negative"` are used to delete, clear, or otherwise remove an extant element. Primary buttons should never have a `side` attribute.

<!-- Example: ButtonOverviewExample -->
<code-example example="button-primary"></code-example>

## Secondary

Secondary buttons are used as an alternative Primary button or when there is a second major action on a page. They usually appears only in Overview and Slideout headers. This theme with an `inverse` attribute is often used as the action button in dropdown menus.

<code-example example="button-secondary"></code-example>

Secondary buttons can also get an `inverse` attribute for use on a colored background.

<code-example example="button-inverse"></code-example>

## Dialogue

Similar to icon buttons, dialogue buttons require less visual dominance but often need additional helper text. Dialogue buttons _may_ contain **any** icon and a `side` may be specified eg:`side="right"` to place the icon on the right or left side of the text. Dialogue buttons may also use an `inverse` attribute to change its text color to white.

<code-example example="button-dialogue"></code-example>

## Standard

Standard buttons are the most generic button style. Standard buttons by default are styled identically to standard buttons with a `color="light"` attribute. Typically, a standard button is used to cancel an action, or to cease any additional progress. Although standard buttons _can_ get an `icon` attribute, they should almost never be used with an icon. If your proposed design calls for a standard button with an icon, consider using a different button theme, like dialogue.

<code-example example="button-standard"></code-example>

## Icon

The `icon` theme is used to create **icon\-only** buttons, which contain no text. They can occupy any of the four main functions but require far less visual dominance than normal buttons. Icon buttons **always** have an `icon` attribute and can use **any** icon. Icon buttons may also use an `inverse` attribute to change its icon color to white.

<code-example example="button-icon"></code-example>

## Fab

Fab buttons are used to as primary calls\-to\-action. They should **always** get an `icon` attribute. Fab buttons with a "success" color `color="success"` are used for saving and will almost always contain a "check" icon. Negative color primary buttons `color="negative"` are used to delete, clear, or otherwise remove an extant element. Fab buttons should never have a `side` attribute.

<code-example example="button-fab"></code-example>

## Dynamic

Button parameters can be dynamically set and change at runtime. The styles should change and be applied when the values change.

<code-example example="button-dynamic"></code-example>

## Loading

Buttons can display a loading state when given the "loading" parameter. When loading is true the button will be disabled and get a loading spinner.

<code-example example="button-loading"></code-example>
