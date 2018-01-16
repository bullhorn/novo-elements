import { Component } from '@angular/core';

@Component({
  selector: 'demo-radio-vertical',
  templateUrl: './vertical.html',
})
export class DemoRadioVerticalComponent {
  public onChangeVertical(change: Event): void {
    console.log('Vertical Radio Change:', change); // tslint:disable-line
  }
}
