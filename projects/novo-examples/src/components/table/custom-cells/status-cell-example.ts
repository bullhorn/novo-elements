import { Component } from '@angular/core';
import { BaseRenderer } from 'novo-elements';

@Component({
  selector: 'status-cell-example',
  template: `
    <div class="status-cell">
      <i class="bhi-info"></i>
      <label>{{ value }}</label>
    </div>
  `,
})
export class StatusCellExample extends BaseRenderer {}
