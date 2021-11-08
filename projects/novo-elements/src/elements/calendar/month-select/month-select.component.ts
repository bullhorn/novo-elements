// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getMonth } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import type { DateLike } from '../../date-picker/date-picker.types';

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
    return this.activeDate && month === getMonth(this.activeDate);
  }

  _isSelected(month: number) {
    return this.selected && month === getMonth(this.selected[0]);
  }
}
