import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseRenderer } from '../base-renderer/BaseRenderer';

@Component({
    selector: 'date-cell',
    pipes: [
        DatePipe
    ],
    inputs: [
        'value'
    ],
    template: `
        <div class="date-cell">
            <label>{{ value | date }}</label>
        </div>
    `
})
export class DateCell extends BaseRenderer {}
