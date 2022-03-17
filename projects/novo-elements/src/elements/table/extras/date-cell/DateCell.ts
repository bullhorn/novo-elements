// NG2
import { Component, Input } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';

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
