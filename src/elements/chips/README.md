# Chips

## Usage
    import { NOVO_CHIPS_ELEMENTS } from 'novo-elements';

##### Properties
- `'placeholder' : String`
    * Defines the label to show if no value has been selected yet.
- `'source' : Object`
    * Defines the list of options the user can select from
    * if source has a `getLabels` callback, this is used to retrieve labels of all values with no available labels. `getLabels` is expected to return a promise.
- `'ngModel' : NgModel`
    * Defines the current value of the field
    * Can be two-way data bound with `[(ngModel)]="binding"`
