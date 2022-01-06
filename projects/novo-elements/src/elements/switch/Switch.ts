// NG2
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, Key } from '../../utils';

// Value accessor for the component (supports ngModel)
const SWITCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoSwitchElement),
  multi: true,
};

@Component({
  selector: 'novo-switch',
  providers: [SWITCH_VALUE_ACCESSOR],
  template: `
    <div (click)="toggle($event)">
      <div class="novo-switch-container">
        <div class="novo-switch-bar"></div>
        <div class="novo-switch-thumb-container">
          <div class="novo-switch-thumb">
            <novo-icon *ngIf="!model" smaller>{{ icons[0] }}</novo-icon>
            <novo-icon *ngIf="model" smaller>{{ icons[1] }}</novo-icon>
          </div>
        </div>
      </div>
      <div class="novo-switch-label"><ng-content></ng-content></div>
    </div>
  `,
  host: {
    role: 'checkbox',
    class: 'novo-switch',
    '[attr.aria-checked]': 'model',
    '[attr.aria-disabled]': 'disabled',
    '(keydown)': 'onKeydown($event)',
    '[class]': 'theme',
  },
})
export class NovoSwitchElement implements ControlValueAccessor {
  @Input()
  theme: string = 'ocean';

  @Input()
  icons: [string, string] = ['x', 'check'];

  @Input()
  @BooleanInput()
  @HostBinding('class.novo-switch-disabled')
  disabled: boolean = false;

  @Output()
  onChange: EventEmitter<any> = new EventEmitter();

  model: boolean;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private ref: ChangeDetectorRef) {}

  onKeydown(event: KeyboardEvent) {
    if (event.key === Key.Space) {
      event.preventDefault();
      this.toggle(event);
    }
  }

  toggle(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (this.disabled) {
      return;
    }

    this.model = !this.model;
    this.onChange.next(this.model);
    this.onModelChange(this.model);
    this.ref.markForCheck();
  }

  writeValue(model: boolean): void {
    this.model = model;
    this.ref.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
