import { Component } from '@angular/core';
import { NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Date Time Value Example
 */
@Component({
  selector: 'date-time-value-example',
  templateUrl: 'date-time-value-example.html',
  styleUrls: ['date-time-value-example.css'],
})
export class DateTimeValueExample {
  theme = NOVO_VALUE_THEME.DEFAULT;
  data: any = new Date().getTime();
  meta: any = {
    type: 'SCALAR',
    dataSpecialization: 'DATETIME',
    label: 'Date',
  };
}
