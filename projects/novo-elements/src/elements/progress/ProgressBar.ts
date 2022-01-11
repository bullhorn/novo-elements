// NG2
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import type { NovoProgressElement } from './Progress';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './ProgressConstants';

// make radio-button-group ids unique
let nextId = 0;

// Value accessor for the component (supports ngModel)
const PROGRESS_BAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoProgressBarElement),
  multi: true,
};

@Component({
  selector: 'novo-progress-bar',
  styleUrls: ['./ProgressBar.scss'],
  providers: [PROGRESS_BAR_VALUE_ACCESSOR],
  template: `
    <div *ngIf="isLinear()" class="progress-bar"></div>
    <svg *ngIf="isRadial()" width="120" height="120">
      <circle
        [style.strokeDasharray]="circumference"
        [style.strokeDashoffset]="dashoffset"
        [attr.r]="radius"
        cx="60"
        cy="60"
        stroke-width="4"
        fill="transparent"
        class="progress__value"
      />
      <!-- <text x="18" y="20.35" class="percentage">30%</text> -->
    </svg>
  `,
})
export class NovoProgressBarElement implements ControlValueAccessor, OnInit {
  private _uniqueId: string = `novo-progress-${++nextId}`;
  @HostBinding('class')
  public appearance: ProgressAppearance = ProgressAppearance.LINEAR;
  @Input() id: string = this._uniqueId;
  @Input() name: string = this._uniqueId;
  @Input() tabindex: number = 0;
  @Input() label: string;
  @Input() theme: string;
  @Input() color: string;
  @Input() indeterminate: boolean = false;
  // Radial Value
  public radius = 54;
  public circumference = 2 * Math.PI * this.radius;
  public dashoffset: number;

  @HostBinding('class.striped')
  @Input()
  striped: boolean = false;

  @HostBinding('class.animated')
  @Input()
  animated: boolean = false;

  @HostBinding('style.width')
  get width() {
    if (this.isRadial()) {
      return `100%`;
    }
    return `${this._percent * 100}%`;
  }

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  private _percent: number = 0;
  private _value: number = 0;
  private _disabled: boolean = false;

  @Input() get value(): number {
    return this._value;
  }
  set value(value) {
    if (this.value !== value) {
      this._value = value;
      if (this.progress) {
        this._percent = this.value / this.progress.total;
      } else {
        this._percent = value;
      }
      this.dashoffset = this.circumference * (1 - this._percent);
      this.onChangeCallback(this._value);
    }
  }
  // Disabled State
  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled || (this.progress != null && this.progress.disabled);
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  constructor(private ref: ChangeDetectorRef, @Optional() @Inject(NOVO_PROGRESS_CONTAINER) public progress: any) {
    // NovoProgressElement
    this.progress = progress;
  }

  ngOnInit() {
    if (this.indeterminate) {
      this.striped = true;
      this.animated = true;
      this._value = this.progress?.total || 100;
    }
    if (this.progress) {
      this._percent = this._value / this.progress.total;
      this.appearance = this.progress.appearance;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.ref.markForCheck();
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

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  isLinear() {
    return this.appearance === ProgressAppearance.LINEAR;
  }

  isRadial() {
    return this.appearance === ProgressAppearance.RADIAL;
  }
}
