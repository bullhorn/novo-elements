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
      <novo-optgroup>
        <novo-option>Item 1</novo-option>
        <novo-option>Item 2</novo-option>
        <novo-option>Item 3</novo-option>
        <novo-option>Item 4</novo-option>
        <novo-option>Item 5</novo-option>
        <novo-option>Item 6</novo-option>
        <novo-option>Item 7</novo-option>
        <novo-option>Item 8</novo-option>
        <novo-option>Item 9</novo-option>
      </novo-optgroup>
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
