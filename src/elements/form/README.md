# Forms
Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'

## Usage

```javascript
import {NOVO_FORM_ELEMENTS} from 'novo-elements';
```

##### Properties
- `'name' : String`
    * Used to create a label:input association
- `'type' : String`
    * Defines the type of field
    * Available Values: `['text', 'radio', 'checkbox', 'date', 'select', 'picker']`
- `'options' : String`
    * Meta data for mulit-select form fields.
    * Available form fields: **select, picker, radio, checkbox**
- `'placeholder' : String`
    * Adds placeholder text to form field in empty state    
- `'multiple' : Bool`
    * Determines whether **pickers** can have multiple values.
- `'maxlength' : Number`
    * The maximum number of characters (Unicode code points) that the user can enter. If it is not specified, the user can enter an unlimited number of characters.
    * Works for textarea and textbox
