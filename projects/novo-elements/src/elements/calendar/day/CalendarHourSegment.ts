import { Component, Input, TemplateRef } from '@angular/core';
import { DayViewHourSegment } from '../../../utils/calendar-utils/CalendarUtils';

@Component({
  selector: 'novo-calendar-day-hour-segment',
  template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-hour-segment"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass">
        <div class="cal-time">
          {{ segment.date | hours:locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }">
    </ng-template>
  `,
})
export class NovoCalendarHourSegmentElement {
  @Input()
  segment: DayViewHourSegment;

  @Input()
  locale: string;

  @Input()
  customTemplate: TemplateRef<any>;
}
