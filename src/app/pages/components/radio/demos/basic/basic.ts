import { Component } from '@angular/core';

@Component({
  selector: 'demo-radio-basic',
  templateUrl: './basic.html',
})
export class DemoRadioComponent {

  public onChangeBasic(change: Event): void {
    console.log('Basic Radio Change:', change); // tslint:disable-line
  }
}
