// NG2
import { Component, EventEmitter, forwardRef, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoRadioElement),
  multi: true,
};

@Component({
  selector: 'novo-radio-group',
  template: '<ng-content></ng-content>',
})
export class NovoRadioGroup {}

@Component({
  selector: 'novo-radio',
  providers: [RADIO_VALUE_ACCESSOR],
  template: `
        <input [name]="name" type="radio" [checked]="checked" [attr.id]="name" (change)="select($event)" [disabled]="disabled">
        <label [attr.for]="name" (click)="select($event)">
            <button *ngIf="button" [ngClass]="{'unchecked': !checked, 'checked': checked, 'has-icon': !!icon}" [theme]="theme" [icon]="icon">{{ label }}</button>
            <div *ngIf="!button">
                <i [ngClass]="{'bhi-radio-empty': !checked, 'bhi-radio-filled': checked}"></i>
                {{ label }}
                <ng-content></ng-content>
            </div>
        </label>
    `,
  host: {
    '[class.vertical]': 'vertical',
  },
})
export class NovoRadioElement implements ControlValueAccessor {
  @Input()
  name: string;
  @Input()
  value: any;
  @Input()
  checked: boolean;
  @Input()
  vertical: boolean;
  @Input()
  label: string;
  @Input()
  button: boolean = false;
  @Input()
  theme: string = 'secondary';
  @Input()
  icon: string;
  @Input()
  disabled: boolean = false;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private ref: ChangeDetectorRef) {}

  select(event) {
    Helpers.swallowEvent(event);
    // Only change the checked state if this is a new radio, they are not toggle buttons
    if (!this.checked) {
      this.checked = !this.checked;
      this.change.emit(this.value);
      this.onModelChange(this.value);
      this.ref.markForCheck();
    }
  }

  writeValue(model: any): void {
    this.model = model;
    this.ref.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
