// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import type { DateLike } from 'novo-elements/utils';
import { DateUtil } from 'novo-elements/utils';

@Component({
  selector: 'novo-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoMonthSelectElement implements OnInit {
  @Input()
  activeDate: DateLike = new Date();
  @Input()
  selected: DateLike[] = [];

  // Select callback for output
  @Output()
  select: EventEmitter<any> = new EventEmitter(false);

  // List of all months
  monthNames: string[] = this.labels.getMonths();

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {}

  onSelect(event: Event, month: number) {
    // Helpers.swallowEvent(event);
    this.select.next({ event, month });
  }

  _isActive(month: number) {
    return this.activeDate && month === DateUtil.getMonth(this.activeDate);
  }

  _isSelected(month: number) {
    return this.selected && month === DateUtil.getMonth(this.selected[0]);
  }
}
