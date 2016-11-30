# DatePicker

## Usage
    import { NOVO_DATE_PICKER_ELEMENTS } from 'novo-elements';

##### Properties
- `'minYear' : number|string`
    * Specifies the lowest possible year to select from
- `'maxYear' : number|string`
    * Specifies the maximum possible year to select from
- `'start' : date`
    * Specifies the start date, will be unable to select dates before this
- `'end' : date`
    * Specifies the end date, will be unable to select dates after this
- `'range' : boolean : default: false`
    * Toggles calendar to use date range style picker

##### Properties
- `'onSelect'`
    * Fired when a new value is selected
    * `{ hours, minutes, meridian, date, moment, text }```
