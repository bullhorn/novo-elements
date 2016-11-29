// NG2
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'novo-card-timeline',
    template: `
        <div class="timeline-container">
            <div class="timeline-background">
                <div class="timeline" [style.width]="length + '%'" [style.margin-left]="offset + '%'" data-automation-id="timeline">
                    <div class="first annotate" [class.one]="start == end" [class.reverse]="start != end && ((end - start) < 3 || length < 22)" [class.overlap]="length < 22" data-automation-id="timeline-first">{{start}}</div>
                    <div class="last annotate" *ngIf="start != end" [class.reverse]="(end - start) < 3 && end != now && length >= 22" [class.smoosh]="length < 22" data-automation-id="timeline-last">{{end}}</div>
                    <div class="hidden-width" data-automation-id="timeline-hidden">{{length}}</div>
                </div>
            </div>
        </div>
    `
})
export class CardTimelineElement implements OnChanges {
    @Input() start:number;
    @Input() end:number;
    @Input() created:number;

    now:number = new Date().getFullYear();
    length:number;
    offset:number;

    ngOnChanges(changes?:SimpleChanges) {
        this.length = ((this.end - this.start) / (this.now - this.created)) * 100;
        this.offset = ((this.start - this.created) * (100 / (this.now - this.created)));
    }
}
