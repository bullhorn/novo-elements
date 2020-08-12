// NG2
import {
  ElementRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
// Vendor
import {
  isAfter,
  isBefore,
  isWithinRange,
  isSameDay,
  setMonth,
  setYear,
  endOfWeek,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isToday,
} from 'date-fns';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDatePickerElement),
  multi: true,
};

export interface RangeModel {
  startDate: Date;
  endDate: Date;
}
export type modelTypes = Date | Date[] | RangeModel;

export interface Day {
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  name?: string;
  number?: string | number;
}

export type DatePickerSelectModes = 'single' | 'multiple' | 'range' | 'week';

export type rangeSelectModes = 'startDate' | 'endDate';

@Component({
  selector: 'novo-date-picker',
  providers: [DATE_PICKER_VALUE_ACCESSOR],
  animations: [
    trigger('startDateTextState', [
      state(
        'startDate',
        style({
          opacity: '1.0',
        }),
      ),
      state(
        'endDate',
        style({
          opacity: '0.6',
        }),
      ),
      transition('startDate <=> endDate', animate('200ms ease-in')),
    ]),
    trigger('endDateTextState', [
      state(
        'startDate',
        style({
          opacity: '0.6',
        }),
      ),
      state(
        'endDate',
        style({
          opacity: '1.0',
        }),
      ),
      transition('startDate <=> endDate', animate('200ms ease-in')),
    ]),
    trigger('indicatorState', [
      state(
        'startDate',
        style({
          transform: 'translateX(0%)',
        }),
      ),
      state(
        'endDate',
        style({
          transform: 'translateX(100%)',
        }),
      ),
      transition('startDate <=> endDate', animate('200ms ease-in')),
    ]),
  ],
  template: `
    <div class="calendar">
      <div class="calendar-top" *ngIf="!inline && mode === 'single'">
        <h4 class="day" [attr.data-automation-id]="heading?.day">{{ heading?.day }}</h4>
        <h2 class="month" [attr.data-automation-id]="heading?.month">{{ heading?.month }}</h2>
        <h1 class="date" [attr.data-automation-id]="heading?.date">{{ heading?.date }}</h1>
        <h3 class="year" [attr.data-automation-id]="heading?.year">{{ heading?.year }}</h3>
      </div>
      <div class="date-range-tabs" *ngIf="range" [class.week-select-mode]="weekRangeSelect">
        <span
          class="range-tab"
          (click)="toggleRangeSelect('startDate')"
          [@startDateTextState]="rangeSelectMode"
          data-automation-id="calendar-start-date"
          >{{ startDateLabel }}</span
        >
        <span
          class="range-tab"
          (click)="toggleRangeSelect('endDate')"
          [@endDateTextState]="rangeSelectMode"
          data-automation-id="calendar-end-date"
          >{{ endDateLabel }}</span
        >
        <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
      </div>
      <div class="calendar-header">
        <span class="previous" (click)="prevMonth($event)" data-automation-id="calendar-previous"></span>
        <span class="heading">
          <span class="month" (click)="open($event, 'months')" data-automation-id="header-month">{{ monthLabel }}</span>
          <span class="year" (click)="open($event, 'years')" data-automation-id="header-year">{{ month?.getFullYear() }}</span>
        </span>
        <span class="next" (click)="nextMonth($event)" data-automation-id="calendar-next"></span>
      </div>
      <table class="calendar-content days" cellspacing="0" cellpadding="0" [hidden]="!(view == 'days')">
        <thead>
          <tr>
            <th *ngFor="let day of weekdays" title="{{ day }}" class="weekday" [attr.data-automation-id]="day.substr(0, 2)">
              {{ day.substr(0, 2) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let week of weeks">
            <td
              *ngFor="let day of week.days"
              [ngClass]="{
                today: day.isToday,
                notinmonth: day.date.getMonth() !== this.month.getMonth(),
                selected: isSelected(range, day.date),
                filler: isFiller(range, day.date),
                startfill: isStartFill(range, day.date),
                endfill: isEndFill(range, day.date),
                'selecting-range': isSelectingRange(range, day.date, hoverDay, rangeSelectMode, weekRangeSelect)
              }"
              (mouseover)="rangeHover($event, day)"
              [attr.data-automation-id]="day.number"
            >
              <button
                class="day"
                [attr.data-automation-id]="day.number"
                [disabled]="isDisabled(day.date, start, end)"
                (click)="select($event, day, true)"
              >
                {{ day.number }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <section class="calendar-content months" [hidden]="view !== 'months'">
        <div *ngFor="let month of months; let i = index" (click)="setMonth(i)">
          <div class="month" [ngClass]="{ selected: i === selected?.getMonth() }" [attr.data-automation-id]="month">{{ month }}</div>
        </div>
      </section>
      <section class="calendar-content years" [hidden]="view !== 'years'">
        <div *ngFor="let year of years" (click)="setYear(year)">
          <div class="year" [ngClass]="{ selected: year == selected?.getFullYear() }" [attr.data-automation-id]="year">{{ year }}</div>
        </div>
      </section>
      <div class="calendar-footer">
        <span (click)="setToday()" class="today" data-automation-id="calendar-today">{{ labels.today }}</span>
      </div>
    </div>
  `,
})
export class NovoDatePickerElement implements ControlValueAccessor, OnInit, OnChanges {
  @Input()
  minYear: string | number;
  @Input()
  maxYear: string | number;
  @Input()
  start: Date;
  @Input()
  end: Date;
  @Input()
  inline: boolean;
  @Input()
  weekStart: number = 0;
  // Select callback for output
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter(false);

  _mode: DatePickerSelectModes = 'single';
  _range: boolean;
  _weekRangeSelect: boolean;

  @Input()
  get mode(): DatePickerSelectModes {
    return this._mode;
  }
  set mode(value) {
    if (this._mode !== value) {
      this._mode = value;
    }
  }
  @Input()
  get range(): boolean {
    return ['range', 'week'].includes(this.mode) || this._range;
  }
  set range(value) {
    console.warn(`'range' property is deprecated, please use 'mode="range"'.`);
    if (this._range !== value) {
      this._range = value;
      this.mode = 'range';
    }
  }
  @Input()
  get weekRangeSelect(): boolean {
    return this._mode === 'week' || this._weekRangeSelect;
  }
  set weekRangeSelect(value) {
    console.warn(`'weekRangeSelect' property is deprecated, please use 'mode="week"'.`);
    if (this._weekRangeSelect !== value) {
      this._weekRangeSelect = value;
      this.mode = 'week';
    }
  }

  // List of all the weekdays
  weekdays: string[] = [];
  // List of all months
  months: string[] = [];
  // List of all years (generated in ngOnInit)
  years: Array<any> = [];
  // Default view mode (select days)
  view: string = 'days';
  heading: any;

  model: modelTypes;
  month: Date;
  monthLabel: string;
  weeks: any;

  selection: Date[] = [];
  prevSelected: Date;
  get selected() {
    return this.selection[0] || new Date();
  }
  startDateLabel: string;
  endDateLabel: string;
  // deprecate in favor of selection
  // selected: Date;
  // selectedLabel: string;
  // selected2: Date;
  // selected2Label: string;
  hoverDay: any;

  rangeSelectMode: rangeSelectModes = 'startDate';
  _onChange: Function = () => {};
  _onTouched: Function = () => {};

  constructor(public labels: NovoLabelService, private element: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Determine the year array
    const now = new Date();
    const start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
    const end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;

    for (let i = start; i <= end; i++) {
      this.years.push(i);
    }

    // Set weekdays / months
    this.weekdays = this.setupWeekdays();
    this.months = this.labels.getMonths();

    // Set labels
    this.updateView(this.model, false, true);
    this.updateSelection(this.model);
    this.updateHeading();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const weekRangeSelectChange: SimpleChange = changes['weekRangeSelect'];
    if (
      weekRangeSelectChange &&
      weekRangeSelectChange.currentValue !== weekRangeSelectChange.previousValue &&
      !weekRangeSelectChange.firstChange
    ) {
      this.clearRange();
    }
    const weekStartChanges: SimpleChange = changes['weekStart'];
    if (weekStartChanges && weekStartChanges.currentValue !== weekStartChanges.previousValue && !weekStartChanges.firstChange) {
      this.weekdays = this.setupWeekdays();
      this.updateView(this.model, false, false);
    }
  }

  setupWeekdays(): string[] {
    let weekdays = this.labels.getWeekdays();
    // Weekstart must be 0-6 (Sunday - Saturday)
    if (!Helpers.isBlank(this.weekStart) && this.weekStart > 0 && this.weekStart <= 6) {
      const newStart = weekdays.splice(this.weekStart);
      weekdays = [...newStart, ...weekdays];
    }
    return weekdays;
  }

  isSelectingRange(range, day, hoverDay, rangeSelectMode, weekRangeSelect) {
    if (range && !weekRangeSelect && hoverDay && this.prevSelected) {
      let dates = [hoverDay, this.prevSelected].sort((a, b) => a.getTime() - b.getTime());
      return isWithinRange(day, dates[0], dates[1]);
    }
    return false;
  }

  isEndFill(range, day) {
    const [start, end] = this.selection ?? [];
    if (range && start && end) {
      return !isSameDay(start, end) && isSameDay(day, end) && isAfter(day, start);
    }
    return false;
  }

  isStartFill(range, day) {
    const [start, end] = this.selection ?? [];
    if (range && end && start) {
      return !isSameDay(start, end) && isSameDay(day, start) && isBefore(day, end);
    }
    return false;
  }

  isFiller(range, day) {
    const [start, end] = this.selection ?? [];
    if (range && end && start) {
      return (isAfter(day, start) && isBefore(day, end)) || isSameDay(day, start) || isSameDay(day, end);
    }
    return false;
  }

  isSelected(range, day) {
    return this.selection && this.selection.includes(day);
  }

  isDisabled(day, start, end) {
    return isBefore(day, start) || isAfter(day, end);
  }

  updateView(date, fireEvents: boolean, markedSelected: boolean) {
    if (date && date.startDate === null) {
      this.clearRange();
    } else {
      if (!date) {
        this.clearRange();
      }
      let value: any = date ? new Date(date) : new Date();
      value = this.removeTime(value);
      this.month = new Date(value);
      this.monthLabel = this.labels.formatDateWithFormat(this.month, { month: 'short' });

      const start = new Date(value.getTime());
      start.setDate(1);
      this.removeTime(start.setDate(1));
      this.buildMonth(start, this.month);

      if (date && markedSelected) {
        this.select(null, { date: value }, fireEvents);
      }
    }
  }

  updateSelection(date) {
    if (!date || (date && date.startDate === null)) {
      return this.clearRange();
    }
    switch (this.mode) {
      case 'multiple':
        this.selection = date;
        break;
      case 'range':
        this.selection = [date.startDate, date.endDate].filter(Boolean);
        break;
      case 'week':
        this.selection = [date.startDate, date.endDate].filter(Boolean);
        break;
      case 'single':
      default:
        this.selection = [date];
        break;
    }
  }

  setToday() {
    const tmp = new Date();
    this.updateView(tmp, true, true);
    // Go back to days
    this.open(null, 'days');
  }

  clearRange() {
    this.selection = [];
  }

  setMonth(month: number): void {
    const date = this.month ? this.month : new Date();
    const tmp = setMonth(date, month);
    this.updateView(tmp, true, false);
    // Go back to days
    this.open(null, 'days');
  }

  setYear(year: number): void {
    const date = this.month ? this.month : new Date();
    const tmp = setYear(date, year);
    this.updateView(tmp, true, false);
    // Go back to days
    this.open(null, 'days');
  }

  select(event: Event, day: Day, fireEvents: boolean) {
    Helpers.swallowEvent(event);
    if (this.mode === 'multiple') {
      let current = new Set(this.selection);
      if (current.has(day.date)) {
        current.delete(day.date);
      } else {
        current.add(day.date);
      }
      this.selection = [...current];
    } else if (this.mode === 'week') {
      let start = startOfWeek(day.date, { weekStartsOn: this.weekStart });
      let end = endOfWeek(day.date, { weekStartsOn: this.weekStart });
      this.selection = [start, end];
    } else if (this.range) {
      let current = [day.date, this.prevSelected].filter(Boolean);
      this.prevSelected = day.date;
      this.selection = current.sort((a, b) => a.getTime() - b.getTime());
    } else {
      this.selection = [day.date];
    }
    if (fireEvents) {
      // Emit our output
      if (this.range && this.selection.length === 2) {
        this.fireRangeSelect();
        // Also, update the ngModel
        let model = {
          startDate: this.selection[0],
          endDate: this.selection[1],
        };
        this._onChange(model);
        this.model = model;
      } else if (this.mode === 'multiple') {
        this.fireSelect();
        // Also, update the ngModel
        this._onChange(this.selection);
        this.model = this.selection;
      } else {
        this.fireSelect();
        // Also, update the ngModel
        this._onChange(this.selection[0]);
        this.model = this.selection[0];
      }
    }
    this.updateHeading();
    this.cdr.markForCheck();
  }

  eventData(date: Date) {
    return {
      year: date.getFullYear(),
      month: this.labels.formatDateWithFormat(date, { month: 'long' }),
      day: this.labels.formatDateWithFormat(date, { weekday: 'long' }),
      date,
    };
  }

  fireSelect() {
    if (this.mode === 'multiple') {
      this.onSelect.next(this.selection);
    } else {
      this.onSelect.next(this.eventData(this.selection[0]));
    }
  }

  fireRangeSelect() {
    // Make sure the start date is before the end date
    if (this.selection.length === 2) {
      const [start, end] = this.selection;
      this.onSelect.next({
        startDate: this.eventData(start),
        endDate: this.eventData(end),
      });
    }
  }

  open(event: Event, type: string) {
    Helpers.swallowEvent(event);

    // If they click the toggle two time in a row, close it (go back to days)
    if (type === this.view) {
      this.view = 'days';
    } else {
      this.view = type;
    }

    // Make sure to scroll the selected one into view
    if (this.view === 'years' || this.view === 'months') {
      setTimeout(() => {
        const container = this.element.nativeElement.querySelector(`.calendar-content.${this.view}`);
        const selectedItem = this.element.nativeElement.querySelector(
          `.calendar-content.${this.view} .${this.view === 'years' ? 'year' : 'month'}.selected`,
        );
        if (container && selectedItem) {
          container.scrollTop = selectedItem.offsetTop - 100;
        }
      });
    }

    this.updateHeading();
  }

  prevMonth(event: Event): void {
    Helpers.swallowEvent(event);
    const tmp = subMonths(this.month, 1);
    this.updateView(tmp, false, false);
  }

  nextMonth(event: Event): void {
    Helpers.swallowEvent(event);
    const tmp = addMonths(this.month, 1);
    this.updateView(tmp, false, false);
  }

  updateHeading() {
    if (this.selection.length) {
      this.heading = {
        month: this.labels.formatDateWithFormat(this.selection[0], { month: 'long' }),
        year: this.selection[0].getFullYear(),
        day: this.labels.formatDateWithFormat(this.selection[0], { weekday: 'long' }),
        date: this.selection[0].getDate(),
      };
    }
    if (this.selection.length) {
      this.startDateLabel = this.labels.formatDateWithFormat(this.selection[0], {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } else {
      this.startDateLabel = this.labels.startDate;
    }
    if (this.selection.length === 2) {
      this.endDateLabel = this.labels.formatDateWithFormat(this.selection[1], {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } else {
      this.endDateLabel = this.labels.endDate;
    }
  }

  /**
   * Remove the time aspect of the date
   * @param date
   * @returns with time stripped out
   */
  removeTime(date: any): Date {
    const ret = new Date(date);
    ret.setHours(12);
    ret.setSeconds(0);
    ret.setMilliseconds(0);
    return ret;
  }

  buildMonth(start: Date, month: Date) {
    // Reset the weeks
    this.weeks = [];

    // House keeping variables to know when we are done building the month
    let done = false,
      date = startOfWeek(start, { weekStartsOn: this.weekStart }),
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

  toggleRangeSelect(range: rangeSelectModes): void {
    this.rangeSelectMode = range;
    if (range === 'startDate' && this.selection.length) {
      this.updateView(this.selection[0], false, false);
    }
    if (range === 'endDate' && this.selection.length === 2) {
      this.updateView(this.selection[1], false, false);
    }
  }

  rangeHover(event: Event, day: Day): void {
    this.hoverDay = day.date;
  }

  // ValueAccessor Functions
  writeValue(model: modelTypes): void {
    this.model = model;
    if (this.mode === 'multiple') {
      this.selection = this.model as Date[];
    }
    if (Helpers.isDate(model)) {
      this.updateView(model, false, true);
    }
  }

  registerOnChange(fn: Function): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }
}
