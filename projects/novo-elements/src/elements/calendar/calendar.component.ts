// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { addMonths, isDate, isSameDay, setMonth, setYear, startOfDay, startOfMonth, subMonths } from 'date-fns';
import { NovoLabelService } from '../../services/novo-label-service';
// APP
import { Helpers } from '../../utils/Helpers';
import type {
  DatePickerSelectModes,
  NovoDateSelectEvent,
  NovoDateSelectionStrategy,
  NovoMonthSelectEvent,
  NovoYearSelectEvent,
  OverlayDate,
} from '../date-picker/date-picker.types';
import { DefaultDateSelectionStrategy, MultiDateSelectionStrategy, RangeSelectionStrategy, WeekSelectionStrategy } from './strategies';

@Component({
  selector: 'novo-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class NovoCalendarElement implements OnInit {
  @Input()
  minYear: string | number;
  @Input()
  maxYear: string | number;
  @Input()
  minDate: string | number;
  @Input()
  maxDate: string | number;
  // Default view mode (select days)
  @Input()
  activeView: string = 'days';
  @Input()
  layout: string = 'horizontal';

  _selected: Date[] = [];
  @Input()
  get selected(): Date[] {
    return this._selected;
  }
  set selected(value) {
    this._selected = value ? value.filter(isDate).map((d) => startOfDay(d)) : [];
  }
  @Output()
  selectedChange: EventEmitter<Date[]> = new EventEmitter();
  @Input()
  preview: Date[] = [];
  @Output()
  previewChange: EventEmitter<Date[]> = new EventEmitter();
  @Output()
  activeDateChange: EventEmitter<Date> = new EventEmitter();

  @Input()
  overlays: OverlayDate[] = [];
  @Input()
  disabledDateMessage: string;

  _activeDate: Date = new Date();
  _mode: DatePickerSelectModes = 'single';
  _numberOfMonths: number[] = [0];
  _weekStartsOn: number = 0;
  _strategy: NovoDateSelectionStrategy<any> = new DefaultDateSelectionStrategy();

  months: any;

  @Input()
  get activeDate(): Date {
    return this._activeDate;
  }
  set activeDate(value) {
    if (!isSameDay(value, this._activeDate)) {
      this._activeDate = value;
      this.activeDateChange.next(value);
      this.updateView(value);
    }
  }

  @Input()
  get weekStartsOn(): number {
    return this._weekStartsOn;
  }
  set weekStartsOn(value) {
    this._weekStartsOn = value;
    if (this.mode === 'week') {
      this._strategy = new WeekSelectionStrategy(this.weekStartsOn);
    }
  }

  @Input()
  get numberOfMonths(): number {
    return this._numberOfMonths.length;
  }
  set numberOfMonths(value) {
    this._numberOfMonths = Array.from(Array(Number(value)).keys());
    this.updateView(this.activeDate);
  }

  @Input()
  get mode(): DatePickerSelectModes {
    return this._mode;
  }
  set mode(value) {
    if (this._mode !== value) {
      this._mode = value;
      switch (value) {
        case 'multiple':
          this._strategy = new MultiDateSelectionStrategy();
          break;
        case 'range':
          this._strategy = new RangeSelectionStrategy();
          break;
        case 'week':
          this._strategy = new WeekSelectionStrategy(this.weekStartsOn);
          break;
        case 'single':
        default:
          this._strategy = new DefaultDateSelectionStrategy();
          break;
      }
    }
  }

  @HostBinding('style.width')
  get hb_width() {
    if (this.layout === 'vertical') {
      return this._sanitizer.bypassSecurityTrustStyle(`min-content`);
    }
    return this._sanitizer.bypassSecurityTrustStyle(`min-content`);
  }

  @HostBinding('class.layout-horizontal')
  get hb_horiztonal() {
    return this.layout !== 'vertical';
  }

  @HostBinding('class.layout-vertical')
  get hb_vertical() {
    return this.layout === 'vertical';
  }

  constructor(
    public labels: NovoLabelService,
    private element: ElementRef,
    private cdr: ChangeDetectorRef,
    private _sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    if (!this.activeDate) {
      this.activeDate = this.selected.length ? this.selected[0] : new Date();
    }
    this.updateView(this.activeDate);
  }

  updateView(activeDate: Date) {
    this.activeDate = new Date(activeDate ? new Date(activeDate) : new Date());
    this.months = [];
    const month = startOfMonth(this.activeDate);
    for (const i of this._numberOfMonths) {
      const date = addMonths(month, i);
      const label = this.labels.formatDateWithFormat(date, { month: 'short' });
      this.months.push({ date, label });
    }
  }

  setToday() {
    const tmp = new Date();
    this.updateView(tmp);
    // Go back to days
    this.openView(null, 'days');
  }

  monthSelected({ event, month }: NovoMonthSelectEvent): void {
    const date = this.activeDate ? this.activeDate : new Date().getMonth();
    const tmp = setMonth(date, month);
    this.updateView(tmp);
    // Go back to days
    this.openView(null, 'days');
  }

  yearSelected({ event, year }: NovoYearSelectEvent): void {
    const date = this.activeDate ? this.activeDate : new Date();
    const tmp = setYear(date, year);
    this.updateView(tmp);
    // Go back to days
    this.openView(null, 'days');
  }

  dateSelected({ event, day }: NovoDateSelectEvent) {
    // Helpers.swallowEvent(event);
    this.selected = this._strategy.selectionFinished(day.date, this.selected, event);
    this.selectedChange.emit(this.selected);
    this.cdr.markForCheck();
  }

  updatePreview({ event, day }: NovoDateSelectEvent) {
    this.preview = this._strategy.createPreview(day.date, this.selected, event);
    this.previewChange.emit(this.preview);
  }

  prevMonth(event: Event): void {
    Helpers.swallowEvent(event);
    const tmp = subMonths(this.activeDate, 1);
    this.updateView(tmp);
  }

  nextMonth(event: Event): void {
    Helpers.swallowEvent(event);
    const tmp = addMonths(this.activeDate, 1);
    this.updateView(tmp);
  }

  openView(event: Event, type: string) {
    Helpers.swallowEvent(event);

    // If they click the toggle two time in a row, close it (go back to days)
    if (type === this.activeView) {
      this.activeView = 'days';
    } else {
      this.activeView = type;
    }

    // Make sure to scroll the selected one into view
    if (this.activeView === 'years' || this.activeView === 'months') {
      setTimeout(() => {
        const container = this.element.nativeElement.querySelector(`.calendar-content.${this.activeView}`);
        const selectedItem = this.element.nativeElement.querySelector(
          `.calendar-content.${this.activeView} .${this.activeView === 'years' ? 'year' : 'month'}.selected`,
        );
        if (container && selectedItem) {
          container.scrollTop = selectedItem.offsetTop - 100;
        }
      });
    }
  }

  _isRange() {
    return ['week', 'range'].includes(this.mode);
  }
}
