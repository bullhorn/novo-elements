import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DayViewHourSegment } from 'novo-elements/utils';

@Component({
  selector: 'novo-agenda-day-hour-segment',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-hour-segment"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        <div class="cal-time">
          {{ segment.date | hours: locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }"
    >
    </ng-template>
  `,
})
export class NovoAgendaHourSegmentElement {
  @Input()
  segment: DayViewHourSegment;

  @Input()
  locale: string;

  @Input()
  customTemplate: TemplateRef<any>;
}
