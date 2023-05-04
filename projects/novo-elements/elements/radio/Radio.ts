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
      [checked]="checked"
      [tabIndex]="tabindex"
      [disabled]="disabled"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
      (change)="_onInputChange($event)"
    />
    <label [attr.for]="id" [class.disabled]="disabled">
      <novo-button
        *ngIf="button"
        [ngClass]="{ unchecked: !checked, checked: checked, 'has-icon': !!icon }"
        [theme]="theme"
        [color]="checked ? color : null"
        [icon]="icon"
        [size]="size"
      >
        {{ label }}
      </novo-button>
      <div *ngIf="!button" class="novo-radio-button-label">
        <i [ngClass]="{ 'bhi-radio-empty': !checked, 'bhi-radio-filled': checked }"></i>
        {{ label }}
        <ng-content></ng-content>
      </div>
    </label>
  `,
  host: {
    '[class.vertical]': 'vertical',
  },
})
export class NovoRadioElement implements ControlValueAccessor, OnInit {
  private _uniqueId: string = `novo-radio-${++nextId}`;
  @Input() id: string = this._uniqueId;
  @Input() name: string = this._uniqueId;
  @Input() tabindex: number = 0;

  @Input()
  vertical: boolean = false;
  @Input()
  label: string;
  @Input()
  button: boolean = false;
  @Input()
  theme: string = 'secondary';
  @Input()
  size: string;
  @Input()
  icon: string;
  @Input()
  color: string;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  private _checked: boolean = false;
  private _value: boolean = false;
  private _disabled: boolean = false;

  @Input() get checked(): boolean {
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

  @Input() get value(): boolean {
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
  // Disabled State
  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  constructor(@Inject(NOVO_RADIO_GROUP) @Optional() public radioGroup: RadioGroup, private ref: ChangeDetectorRef) {
    this.radioGroup = radioGroup;
  }

  ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      this.vertical = this.radioGroup.appearance === 'vertical';
      this.name = this.radioGroup.name;
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
