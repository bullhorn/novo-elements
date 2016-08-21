// NG2
import { Component } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';

@Component({
    selector: 'date-cell',
    inputs: ['value'],
    template: `
        <div class="date-cell">
            <label>{{ value | date }}</label>
        </div>
    `
})
export class DateCell extends BaseRenderer {
}
