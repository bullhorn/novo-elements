import { OnChanges, SimpleChanges } from '@angular/core';
export declare class CardBestTimeElement implements OnChanges {
    label: string;
    time: string;
    day: string;
    hideLabel: boolean;
    timeIcon: string;
    timeStyle: string;
    dayLowerCase: string;
    dataAutomationId: string;
    ngOnChanges(changes?: SimpleChanges): void;
    getTimeOfDayStyleAndIcon(time: any): {
        icon: any;
        style: any;
    };
}
