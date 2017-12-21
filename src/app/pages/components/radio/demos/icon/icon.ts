import { Component } from '@angular/core';

@Component({
  selector: 'demo-radio-icon',
  templateUrl: './icon.html',
})
export class DemoRadioIconComponent {
  public onChangeIcon(change: Event): void {
      console.log('Icon Radio Change:', change); // tslint:disable-line
  }
}
