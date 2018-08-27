// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';

@Component({
  selector: 'date-cell',
  template: `
        <div class="date-cell">
            <label>{{ value | date }}</label>
        </div>
    `,
})
export class DateCell extends BaseRenderer {
  @Input()
  value: any;
}
