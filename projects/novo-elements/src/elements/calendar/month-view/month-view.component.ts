// NG2
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addDays, isAfter, isBefore, isSameDay, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import { BooleanInput } from '../../../utils';
import type { DateLike, Day, OverlayDate } from '../../date-picker/date-picker.types';

@Component({
  selector: 'novo-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoMonthViewElement implements OnInit {
  @Input()
  minDate: Date;
  @Input()
  maxDate: Date;
  @Input()
  activeDate: Date = new Date();
  // Weekstart must be 0-6 (Sunday - Saturday)
  @Input()
  selected: DateLike[] = [];
  @Input()
  preview: DateLike[] = [];
  @Input()
  overlays: OverlayDate[] = [];
  @Input()
  disabledDateMessage: string;

  @Input()
  @BooleanInput()
  isRange: boolean = false;

  @Input()
  @BooleanInput()
  @HostBinding('class.hide-overflow-days')
  public hideOverflowDays: boolean = false;

  _weekStartsOn: number = 0;

  @Input()
  get weekStartsOn(): number {
    return this._weekStartsOn;
  }
  set weekStartsOn(value) {
    this._weekStartsOn = value;
    this.weekdays = this.labels.getWeekdays(value);
    this.updateView(this.activeDate);
  }

  // Select callback for output
  @Output()
  select: EventEmitter<any> = new EventEmitter(false);
  // Select callback for output
  @Output()
  hover: EventEmitter<any> = new EventEmitter(false);

  // List of all the weekdays
  weekdays: string[] = this.labels.getWeekdays(this.weekStartsOn);
  // List of all months
  monthNames: string[] = this.labels.getMonths();

  monthLabel: string;
  weeks: any;

  constructor(
    public labels: NovoLabelService,
    private element: ElementRef,
    private cdr: ChangeDetectorRef,
    private _sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    // Set labels
    this.updateView(this.activeDate);
  }

  updateView(date: Date) {
    this.monthLabel = this.labels.formatDateWithFormat(this.activeDate, { month: 'short' });
    this.buildMonth(this.activeDate);
  }

  onSelect(event: Event, day: Day) {
    // Helpers.swallowEvent(event);
    this.select.next({ event, day });
    this.cdr.markForCheck();
  }

  onHover(event: Event, day: Day): void {
    this.isRange && this.hover.next({ event, day });
  }

  buildMonth(month: Date) {
    // Reset the weeks
    this.weeks = [];
    const start = startOfMonth(month);

    // House keeping variables to know when we are done building the month
    let done = false,
      date = startOfWeek(start, { weekStartsOn: this.weekStartsOn }),
      monthIndex = date.getMonth(),
      count = 0;

    while (!done) {
      // Build the days for the weeks
      this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });

      // Increment variables for the next iteration
      date = addDays(date, 7);
      done = count++ > 2 && monthIndex !== date.getMonth();
      monthIndex = date.getMonth();
    }
  }

  buildWeek(date: Date, month: Date): Array<Object> {
    // Build out of the days of the week
    const days = [];
    // Iterate over the days of the week
    for (let i = 0; i < 7; i++) {
      // Push a variable on the day array with lots of helpers to make the template easier
      days.push({
        name: this.weekdays[i],
        number: date.getDate(),
        isToday: isToday(date),
        date,
      });

      // Increment for the next iteration
      date = addDays(date, 1);
    }

    return days;
  }

  isDisabled(day: DateLike) {
    return (this.minDate && isBefore(day, this.minDate)) || (this.maxDate && isAfter(day, this.maxDate));
  }

  /** Returns whether a cell should be marked as selected. */
  _isSelected(value: DateLike) {
    return this.selected && this.selected.find((d) => isSameDay(d, value));
  }

  /** Returns whether a cell should be marked as preview. */
  _isPreview(value: DateLike) {
    return this.preview && this.preview.find((d) => isSameDay(d, value));
  }

  /** Returns whether a cell should be marked as an overlay. */
  _isOverlay(value: DateLike) {
    return this.overlays && this.overlays.find((o) => isSameDay(o.date, value));
  }

  /** Returns whether a cell should be marked as an overlay. */
  _hasOverlayType(value: DateLike) {
    let overlay = this.overlays && this.overlays.find((o) => isSameDay(o.date, value));
    return overlay ? overlay.type : null;
  }

  /** Gets whether a value is the start of the main range. */
  _isRangeStart(value: DateLike) {
    return isStart(value, this.selected, this.isRange);
  }

  /** Gets whether a value is the end of the main range. */
  _isRangeEnd(value: DateLike) {
    return isEnd(value, this.selected, this.isRange);
  }

  /** Gets whether a value is within the currently-selected range. */
  _isInRange(value: DateLike): boolean {
    return isInRange(value, this.selected, this.isRange);
  }

  /** Gets whether a value is the start of the preview range. */
  _isPreviewStart(value: DateLike) {
    return isStart(value, this.preview, this.isRange);
  }

  /** Gets whether a value is the end of the preview range. */
  _isPreviewEnd(value: DateLike) {
    return isEnd(value, this.preview, this.isRange);
  }

  /** Gets whether a value is inside the preview range. */
  _isInPreview(value: DateLike) {
    return isInRange(value, this.preview, this.isRange);
  }
}

/** Checks whether a value is the start of a range. */
function isStart(value: DateLike, range: DateLike[] | null, rangeEnabled: boolean): boolean {
  const [start, end] = range ?? [];
  return rangeEnabled && end !== null && !isSameDay(start, end) && value < end && isSameDay(value, start);
}

/** Checks whether a value is the end of a range. */
function isEnd(value: DateLike, range: DateLike[] | null, rangeEnabled: boolean): boolean {
  const [start, end] = range ?? [];
  return rangeEnabled && start !== null && !isSameDay(start, end) && value >= start && isSameDay(value, end);
}

/** Checks whether a value is inside of a range. */
function isInRange(value: DateLike, range: DateLike[] | null, rangeEnabled: boolean): boolean {
  const [start, end] = range ?? [];
  return rangeEnabled && start !== null && end !== null && !isSameDay(start, end) && value >= start && value <= end;
}
