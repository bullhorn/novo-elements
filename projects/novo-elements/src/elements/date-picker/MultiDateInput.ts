// NG
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import { Helpers } from '../../utils/Helpers';
// Vendor
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';

// Value accessor for the component (supports ngModel)
const MULTI_DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoMultiDateInputElement),
  multi: true,
};

@Component({
  selector: 'novo-multi-date-input',
  providers: [MULTI_DATE_VALUE_ACCESSOR],
  template: `
    <novo-chip-list>
      <novo-chip *ngFor="let date of value | default: []" (removed)="remove($event, date)">
        {{ date | date: format }}
        <novo-icon novoChipRemove>close</novo-icon>
      </novo-chip>
    </novo-chip-list>
    <!-- <div *ngIf="value.length > chipsCount">
      <ul class="summary">
        <li *ngFor="let type of notShown">+ {{ type.count }} {{ labels.more }} {{ type.type }}</li>
      </ul>
    </div> -->
    <div class="chip-input-container" (click)="_handleFocus($event)">
      <span class="placeholder" *ngIf="!value.length" data-automation-id="multi-date-input">{{ placeholder }}</span>
    </div>
    <novo-icon class="panel-toggle" [class.selected]="panelOpen" (click)="openPanel()">calendar</novo-icon>
    <label class="clear-all" *ngIf="value.length" (click)="clearValue()">{{ labels.clearAll }} <i class="bhi-times"></i></label>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-date-picker
        [start]="start"
        [end]="end"
        inline="true"
        mode="multiple"
        (onSelect)="setValueAndClose($event)"
        [(ngModel)]="value"
        [weekStart]="weekStart"
      ></novo-date-picker>
    </novo-overlay-template>
  `,
})
export class NovoMultiDateInputElement implements OnInit, ControlValueAccessor {
  public formattedStartDate: string = '';
  public formattedEndDate: string = '';
  private userDefinedFormat: boolean;

  @Input()
  name: string;
  @Input()
  start: Date;
  @Input()
  end: Date;
  @Input()
  placeholder: string;
  @Input()
  format: string = 'shortDate';
  @Input()
  allowInvalidDate: boolean = false;
  @Input()
  weekStart: number = 0;
  @Input()
  chipsCount: number = 5;
  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  private _value: Date[] = [];
  private _disabled: boolean = false;
  private notShown: any = {};

  @Input() get value(): Date[] {
    return this._value;
  }
  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this._setFormValue(value);
      this.onChangeCallback(this._value);
    }
  }

  // Disabled State
  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    private cdr: ChangeDetectorRef,
    public dateFormatService: DateFormatService,
  ) {
    this.placeholder = this.labels.dateFormatString().toUpperCase() || this.labels.dateFormatPlaceholder;
  }

  ngOnInit() {
    this.userDefinedFormat = this.format ? !this.format.match(/^(DD\/MM\/YYYY|MM\/DD\/YYYY)$/g) : false;
    // if (!this.userDefinedFormat && this.textMaskEnabled && !this.allowInvalidDate) {
    //   this.maskOptions = this.maskOptions || {
    //     mask: this.dateFormatService.getDateMask(),
    //     pipe: createAutoCorrectedDatePipe(this.format || this.labels.dateFormatString().toLowerCase()),
    //     keepCharPositions: false,
    //     guide: true,
    //   };
    // } else {
    //   this.maskOptions = { mask: false };
    // }
  }

  formatter(value) {
    const [dateTimeValue, formatted] = this.dateFormatService.parseString(value, false, 'date');
    return formatted;
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    if (!this.disabled) {
      this.panelOpen ? this.overlay.closePanel() : this.overlay.openPanel();
    }
  }
  closePanel(): void {
    this.overlay && this.overlay.closePanel();
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  /** END: Convenient Panel Methods. */

  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === Key.Escape || event.key === Key.Enter || event.key === Key.Tab) && this.panelOpen) {
      this.closePanel();
      event.stopPropagation();
    }
  }

  _handleBlur(event: FocusEvent): void {
    this.blurEvent.emit(event);
  }

  _handleFocus(event: FocusEvent): void {
    this.openPanel();
    this.focusEvent.emit(event);
  }

  remove(event: any, date: Date) {
    const current = new Set(this.value);
    if (current.has(date)) {
      current.delete(date);
    }
    this.value = [...current];
  }

  writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  };

  private onTouchedCallback = () => {
    // placeholder
  };

  private _setFormValue(value: Date[]): void {
    if (this.value) {
      // this.formattedStartDate = this.formatDateValue(this.value.startDate);
    }
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: Date[] = []): void {
    if (event) {
      this.value = event;
      this.change.emit(this.value);
    }
    // this.closePanel();
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearValue() {
    this.value = [];
    this.change.emit(this.value);
  }

  public get hasValue() {
    return !Helpers.isEmpty(this.value);
  }
}
