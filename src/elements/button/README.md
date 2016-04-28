# Button
A button clearly indicates a point of action for the user. Bullhorn buttons come in a variety of themes, custom tailored to fit your use-case.

## Usage
    import { NOVO_BUTTON_ELEMENTS } from 'novo-elements';

##### Properties
- `'theme' : String`
    * Defines the theme of the button
    * Available Values: `['primary', 'secondary', 'neutral', 'dialogue', 'negative', 'icon', 'header']`
- `'icon' : String`
    * Icon to be placed in the button
    * Available Values: `['check', 'send', 'collapse']`
- `'side' : String`
    * Defines what side to place the icon on a **dialogue** theme button.
    * Available Values: `['left', 'right']`
- `'inverse' : Bool`
    * Can be added to 'dialogue' theme buttons for buttons on a dark background