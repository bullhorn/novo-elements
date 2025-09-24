// NG2
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NOVO_RADIO_GROUP, RadioGroup } from './tokens';

// make radio-buttons ids unique
let nextId = 0;

// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoRadioElement),
  multi: true,
};

@Component({
    selector: 'novo-radio',
    providers: [RADIO_VALUE_ACCESSOR],
    template: `
    <input
      type="radio"
      [id]="id"
      [name]="name"
      [checked]="_checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !_checked, checked: _checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="_checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !_checked, 'bhi-radio-filled': _checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `,
    styleUrls: ['./Radio.scss'],
    host: {
        '[class.vertical]': 'vertical',
    },
    standalone: false
})
export class NovoRadioElement implements ControlValueAccessor, OnInit {
  private _uniqueId: string = `novo-radio-${++nextId}`;
  private _value: boolean = false;
  _checked: boolean = false;

  @Input() id: string = this._uniqueId;
  @Input() name: string = this._uniqueId;
  @Input() tabindex: number = 0;
  @Input() vertical: boolean = false;
  @Input() label: string;
  @Input() button: boolean = false;
  @Input() theme: string = 'secondary';
  @Input() size: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() disabled: boolean;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    value = !!value;
    if (this._checked !== value) {
      this._checked = value;
      if (this._checked && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.value = this.value;
      }
      this.onChangeCallback(this._value);
    }
  }

  @Input()
  get value(): boolean {
    return this._value;
  }
  set value(value) {
    if (this.value !== value) {
      this._value = value;
      if (this.radioGroup) {
        this._checked = this.radioGroup.value === this.value;
      }
      this.onChangeCallback(this._value);
    }
  }

  constructor(@Inject(NOVO_RADIO_GROUP) @Optional() public radioGroup: RadioGroup, private ref: ChangeDetectorRef) {
    this.radioGroup = radioGroup;
  }

  ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      this.vertical = this.radioGroup.appearance === 'vertical';
      this.name = this.radioGroup.name;
      this.disabled = this.disabled || this.radioGroup.disabled;
    }
  }

  _onInputChange(event: Event) {
    event.stopPropagation();
    this.change.emit(event);

    this.checked = true;

    if (this.radioGroup) {
      this.radioGroup.value = this.value;
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
}
