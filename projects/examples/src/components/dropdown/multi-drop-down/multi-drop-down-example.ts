import { Component } from '@angular/core';

/**
 * @title Multi Drop Down
 */
@Component({
  selector: 'multi-drop-down-example',
  templateUrl: 'multi-drop-down-example.html',
  styleUrls: ['multi-drop-down-example.css'],
})
export class MultiDropDownExample {
  public clickMe(data: string): void {
    console.log('CLICKED!', data); // tslint:disable-line
  }
}
