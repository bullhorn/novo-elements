import { Component } from '@angular/core';

/**
 * @title Compact Tip Well Example
 * @description Compact tip well with an icon-only close button. Useful for layouts where space is limited and a minimal design is preferred.
 */
@Component({
    selector: 'compact-tip-well-example',
    templateUrl: 'compact-tip-well-example.html',
    styleUrls: ['compact-tip-well-example.css'],
    standalone: false,
})
export class CompactTipWellExample {
  public demoTip: string =
    'Sed sodales ligula et fermentum bibendum. Aliquam tincidunt sagittis leo eget auctor. Fusce eu sagittis metus, ut viverra magna. Mauris mollis nisl nec libero tincidunt posuere.';

  public clearLocalStorage() {
    localStorage.removeItem('novo-tw_CompactDemo');
    location.reload();
  }
}
