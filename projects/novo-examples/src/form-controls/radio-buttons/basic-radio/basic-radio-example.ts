import { Component } from '@angular/core';

/**
 * @title Basic Radio Button Usage
 */
@Component({
    selector: 'basic-radio-example',
    templateUrl: 'basic-radio-example.html',
    styleUrls: ['basic-radio-example.css'],
    standalone: false
})
export class BasicRadioExample {
  model: any = 'two';
  onChange(change: Event): void {
    console.log('Radio Change:', change); // tslint:disable-line
  }
}
