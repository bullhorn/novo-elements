// NG2
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  HostBinding,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../utils/helpers/helpers.service';

export interface IRadio {
  checked?: boolean;
}

@Component({
  selector: 'novo-radio-group',
  template: '<ng-content></ng-content>',
})
export class NovoRadioGroupComponent {}

@Component({
  selector: 'novo-radio',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovoRadioComponent),
      multi: true,
    },
  ],
  template: `
        <input [name]="name" type="radio" [checked]="checked" [attr.id]="name" #radio (change)="select($event, radio)">
        <label [attr.for]="name" (click)="select($event, radio)">
            <button *ngIf="button" [ngClass]="{'has-icon': !!icon}" [theme]="theme" [state]="radio.checked ? 'checked' : 'unchecked'" [icon]="icon">{{ label }}</button>
            <div *ngIf="!button">
                <i [ngClass]="{'bhi-radio-empty': !radio.checked, 'bhi-radio-filled': radio.checked}"></i>
                {{ label }}
                <ng-content></ng-content>
            </div>
        </label>
    `,
})
export class NovoRadioComponent implements ControlValueAccessor {
  @HostBinding('class.vertical')
  @Input()
  public vertical: boolean = false;
  @Input() public name: string;
  @Input() public value: any;
  @Input() public checked: boolean;
  @Input() public label: string;
  @Input() public button: boolean = false;
  @Input() public theme: string = 'secondary';
  @Input() public icon: string;

  @Output() public change: EventEmitter<any> = new EventEmitter();

  public model: any;
  constructor(private ref: ChangeDetectorRef) {}

  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};

  /**
   * Handles the select of the radio button, will only change if a new radio is selected
   * @param event
   * @param radio
   */
  public select(event: MouseEvent, radio: IRadio): void {
    Helpers.swallowEvent(event);
    // Only change the checked state if this is a new radio, they are not toggle buttons
    if (!radio.checked) {
      radio.checked = !radio.checked;
      this.change.emit(this.value);
      this.onModelChange(this.value);
      this.ref.markForCheck();
    }
  }

  public writeValue(model: any): void {
    this.model = model;
    this.ref.markForCheck();
  }

  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
