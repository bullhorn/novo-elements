import { OnChanges, SimpleChanges } from '@angular/core';
export declare class CardTimelineElement implements OnChanges {
    start: number;
    end: number;
    created: number;
    now: number;
    length: number;
    offset: number;
    ngOnChanges(changes?: SimpleChanges): void;
}
