// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
import { NovoLabelService } from '../../../../services/novo-label-service';

@Component({
  selector: 'date-cell',
  template: `
        <div class="date-cell">
            <label>{{ getFormattedDate() }}</label>
        </div>
    `,
})
export class DateCell extends BaseRenderer {
  @Input()
  value: any;
  constructor(public labels: NovoLabelService) {
    super();
  }

  public getFormattedDate(): string {
    return this.labels.formatDate(this.value);
  }
}
