import { Component, LOCALE_ID } from '@angular/core';
import { NovoLabelService } from 'novo-elements';

export class ExtendedLabelService extends NovoLabelService {
  dateFormat = 'dd/mm/yyyy';
  dateFormatPlaceholder = 'DD/MM/YYYY';
}

/**
 * @title Date Example
 */
@Component({
  selector: 'date-picker-example',
  templateUrl: 'date-picker-example.html',
  styleUrls: ['date-picker-example.css'],
})
export class DatePickerExample {
  dateOne: Date = new Date();
  dateTwo: Date = new Date();
}
