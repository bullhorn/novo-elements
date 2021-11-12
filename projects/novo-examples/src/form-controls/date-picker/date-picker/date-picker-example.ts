import { Component } from '@angular/core';
import { NovoLabelService } from 'novo-elements';

//  Must add 'ExtendedLabelService' to your module file and
//  include it in the constructor of your component
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
  selectedDates: Date = new Date();
}
