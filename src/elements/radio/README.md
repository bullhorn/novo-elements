# Radio
A radio button that can serve was a radio group in both horizontal and vertical format

## Usage
    import { NOVO_RADIO_ELEMENTS } from 'novo-elements';

##### Properties
- `'name' : String`
    * Defines the name of the radio input (common names group the radios)
- `'value' : String`
    * The value of the radio button, will be broad casted when the radio checked changes
- `'label' : String`
    * Optional label for the button
- `'checked' : boolean`
    * Initial checked state for the radio group (must only be one)
- `'vertical' : boolean`
    * Whether or not the radio group buttons are horizontal or vertical (defaults to false)
    
##### Events
- `'change'`
    * Gets triggered when the value changes in the radio group