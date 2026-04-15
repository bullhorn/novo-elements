import { AfterContentInit, Component } from '@angular/core';

/**
 * @title Basic Drop Down
 */
@Component({
    selector: 'basic-drop-down-example',
    templateUrl: 'basic-drop-down-example.html',
    styleUrls: ['basic-drop-down-example.css'],
    standalone: false,
})
export class BasicDropDownExample implements AfterContentInit {
  asyncItems: any[] = [];
  public clickMe(event?: string) {
    console.info(event);
  }

  async ngAfterContentInit() {
    this.asyncItems = await this.getAsyncItems();
  }

  async getAsyncItems() {
    return [...Array(10).keys()].map((it) => `Action ${it}`);
  }
}
