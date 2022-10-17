import { Component } from '@angular/core';

/**
 * @title Tip Well with No Button Example
 */
@Component({
  selector: 'buttonless-tip-well-example',
  templateUrl: 'buttonless-tip-well-example.html',
  styleUrls: ['buttonless-tip-well-example.css'],
})
export class ButtonlessTipWellExample {
  public demoTip: string =
    'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';

  clearLocalStorage() {
    localStorage.removeItem('novo-tw_Demo');
    location.reload();
  }
}
