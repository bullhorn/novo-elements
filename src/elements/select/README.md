# Select

## Usage
    import { NOVO_SELECT_ELEMENTS } from 'novo-elements';

##### Properties
- `'placeholder' : String`
    * Defines the label to show if no value has been selected yet.
- `'options' : Array`
    * Defines the list of options the user can select from.
- `'readonly' : bool`
    * Marks the component as read only.
- `'ngModel' : NgModel`
    * Defines the current value of the field
    * Can be two-way data bound with `[(ngModel)]="binding"`

#### Outputs
- `'onSelect': Function`
    * An event function that is fired when a option is selected