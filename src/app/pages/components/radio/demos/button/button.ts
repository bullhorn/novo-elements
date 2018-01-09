import { Component } from '@angular/core';

@Component({
  selector: 'demo-radio-button',
  templateUrl: './button.html',
})
export class DemoRadioButtonComponent {
  public onChangeButton(change: Event): void {
      console.log('Button Radio Change:', change); // tslint:disable-line
  }
}
