import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import type { DateLike } from 'novo-elements/utils';
import { DateUtil } from 'novo-elements/utils';

@Component({
    selector: 'novo-year-select',
    templateUrl: './year-select.component.html',
    styleUrls: ['./year-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NovoYearSelectElement implements OnInit {
  @Input()
  minYear: string | number;
  @Input()
  maxYear: string | number;

  @Input()
  activeDate: DateLike = new Date();
  @Input()
  selected: DateLike[] = [];
  // Select callback for output
  @Output()
  select: EventEmitter<any> = new EventEmitter(false);

  // List of all years (generated in ngOnInit)
  years: Array<any> = [];

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {
    // Determine the year array
    const now = new Date();
    const start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
    const end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;
    const years = [];
    for (let i = start; i <= end; i++) {
      years.push(i);
    }
    this.years = years.reverse();
  }

  onSelect(event: Event, year: number) {
    // Helpers.swallowEvent(event);
    this.select.next({ event, year });
  }

  _isActive(year: number) {
    return this.activeDate && year === DateUtil.getYear(this.activeDate);
  }

  _isSelected(year: number) {
    return this.selected && year === DateUtil.getYear(this.selected[0]);
  }
}
