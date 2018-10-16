// NG2
import { Component } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';

@Component({
  selector: 'percentage-cell',
  template: `
        <div class="percentage" *ngIf="value || value === 0">{{ value | percent:'1.0-2' }}</div>
    `,
})
export class PercentageCell extends BaseRenderer {}
