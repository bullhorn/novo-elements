import { Component } from '@angular/core';
import { NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Multi Option Value Example
 */
@Component({
  selector: 'multi-option-value-example',
  templateUrl: 'multi-option-value-example.html',
  styleUrls: ['multi-option-value-example.css'],
})
export class MultiOptionValueExample {
  public theme = NOVO_VALUE_THEME.DEFAULT;
  public data: any = ['1', '3'];
  public meta: any = {
    name: 'status',
    label: 'Status',
    inputType: 'SELECT',
    options: [
      { label: 'New Lead', value: '1' },
      { label: 'Old Lead', value: '2' },
      { label: 'Active', value: '3' },
      { label: 'Archived', value: '4' },
    ],
  };
}
