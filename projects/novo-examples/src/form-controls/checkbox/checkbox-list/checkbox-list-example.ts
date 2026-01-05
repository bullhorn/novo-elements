import { Component } from '@angular/core';

/**
 * @title Checkbox List Usage
 */
@Component({
    selector: 'checkbox-list-example',
    templateUrl: 'checkbox-list-example.html',
    styleUrls: ['checkbox-list-example.css'],
    standalone: false,
})
export class CheckboxListExample {
  options1: any[] = [
    {
      label: 'Unchecked',
      checked: false,
      value: 1,
    },
    {
      label: 'Checked',
      checked: true,
      value: 2,
    },
  ];
  options2: any[] = [
    {
      label: 'Unchecked',
      checked: false,
      value: 3,
    },
    {
      label: 'Checked',
      checked: true,
      value: 4,
    },
  ];
  onChange(change: Event): void {
    console.info('Checkbox Change:', change);
  }
}
