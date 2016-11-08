# PICKER

The picker is a Directive that should be placed on an `input` element to add auto-complete functionality.

## Usage
    import { NOVO_PICKER_ELEMENTS } from 'novo-elements';

##### Properties
- `'picker' : Object`
    * should contain `options` and `field` to use.
- `'ngModel' : NgModel`
    * Defines the current value of the field
    * Can be two-way data bound with `[(ngModel)]="binding"`
