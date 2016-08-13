// NG2
import { Component } from '@angular/core';

@Component({
    selector: 'novo-card-timeline',
    inputs: [
        'start',
        'end',
        'created'
    ],
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
export class CardTimelineElement {
    constructor() {
        this.now = new Date().getFullYear();
    }

    ngOnChanges() {
        this.length = ((this.end - this.start) / (this.now - this.created)) * 100;
        this.offset = ((this.start - this.created) * (100 / (this.now - this.created)));
    }
}
