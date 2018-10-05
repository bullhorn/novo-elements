import { Component } from '@angular/core';
import { BaseRenderer } from 'novo-elements';

/**
 * @title Actions Cell Example
 */
@Component({
  selector: 'actions-cell-example',
  template: `
    <novo-dropdown parentScrollSelector=".table-container">
      <button type="button" theme="dialogue" icon="collapse">Actions!</button>
      <list>
        <item>Item 1</item>
        <item>Item 2</item>
        <item>Item 3</item>
        <item>Item 4</item>
        <item>Item 5</item>
        <item>Item 6</item>
        <item>Item 7</item>
        <item>Item 8</item>
        <item>Item 9</item>
      </list>
    </novo-dropdown>
  `,
})
export class ActionsCellExample extends BaseRenderer {
  constructor() {
    super();
  }

  getActionContext(data, meta) {
    return { item: data, meta };
  }
}
