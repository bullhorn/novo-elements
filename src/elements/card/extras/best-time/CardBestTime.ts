// NG2
import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'novo-card-best-time',
    template: `
        <label *ngIf="!hideLabel" [attr.data-automation-id]="dataAutomationId + '-label'">{{ label }}</label>
        <div class="best-time">
            <i [attr.data-automation-id]="dataAutomationId + '-icon'" [ngClass]="[timeIcon, timeStyle]"></i>
            <div class="time-and-day">
                <span class="time" [ngClass]="timeStyle" [attr.data-automation-id]="dataAutomationId + '-time'">{{ time }}</span>
                <div class="days" [attr.data-automation-id]="dataAutomationId + '-days'">
                    <span class="day" [class.active]="dayLowerCase === 'sunday'" [attr.data-automation-id]="'sunday'">S</span>
                    <span class="day" [class.active]="dayLowerCase === 'monday'" [attr.data-automation-id]="'monday'">M</span>
                    <span class="day" [class.active]="dayLowerCase === 'tuesday'" [attr.data-automation-id]="'tuesday'">T</span>
                    <span class="day" [class.active]="dayLowerCase === 'wednesday'" [attr.data-automation-id]="'wednesday'">W</span>
                    <span class="day" [class.active]="dayLowerCase === 'thursday'" [attr.data-automation-id]="'thursday'">T</span>
                    <span class="day" [class.active]="dayLowerCase === 'friday'" [attr.data-automation-id]="'friday'">F</span>
                    <span class="day" [class.active]="dayLowerCase === 'saturday'" [attr.data-automation-id]="'saturday'">S</span>
                </div>
            </div>
        </div>
    `
})
export class CardBestTimeElement implements OnChanges {
    @Input() label: string;
    @Input() time: string;
    @Input() day: string;
    @Input() hideLabel: boolean;

    timeIcon: string;
    timeStyle: string;
    dayLowerCase: string;
    dataAutomationId: string;

    ngOnChanges() {
        if (this.time) {
            let timeIconAndStyle = this.getTimeOfDayStyleAndIcon(this.time);
            this.timeIcon = timeIconAndStyle.icon;
            this.timeStyle = timeIconAndStyle.style;
            this.dayLowerCase = (this.day || '').toLowerCase();
            this.dataAutomationId = this.label ? this.label.replace(/\s+/g, '-').toLowerCase() : '';
        }
    }

    getTimeOfDayStyleAndIcon(time) {
        let icon = null;
        let style = null;
        let transformedTime = time.replace(/\s+/g, '-').toUpperCase();

        const TIMES = {
            morningTimes: {
                times: ['5-AM', '6-AM', '7-AM', '8-AM', '9-AM', '10-AM'],
                icon: 'bhi-coffee'
            },
            dayTimes: {
                times: ['11-AM', '12-PM', '1-PM', '2-PM', '3-PM', '4-PM', '5-PM', '6-PM'],
                icon: 'bhi-day'
            },
            eveningTimes: {
                times: ['7-PM', '8-PM', '9-PM', '10-PM', '11-PM', '12-AM', '1-AM', '2-AM', '3-AM', '4-AM'],
                icon: 'bhi-evening'
            }
        };

        for (let prop in TIMES) {
            if (TIMES[prop].times.indexOf(transformedTime) > -1) {
                icon = TIMES[prop].icon;
                if (icon === 'bhi-coffee') {
                    style = 'morning';
                } else if (icon === 'bhi-day') {
                    style = 'day';
                } else if (icon === 'bhi-evening') {
                    style = 'evening';
                }
            }
        }
        return { icon, style };
    }
}
