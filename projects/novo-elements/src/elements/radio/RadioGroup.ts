// NG2
import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from '../common';
import { NovoFieldControl } from '../field';
import { NovoRadioElement } from './Radio';
import { NOVO_RADIO_GROUP } from './tokens';

// make radio-button-group ids unique
let nextId = 0;
// Value accessor for the component (supports ngModel)
const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoRadioGroup),
  multi: true,
};

// Boilerplate for applying mixins
class NovoRadioGroupBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
  ) {}
}
const NovoRadioGroupMixins: CanUpdateErrorStateCtor & typeof NovoRadioGroupBase = mixinErrorState(NovoRadioGroupBase);

@Component({
  selector: 'novo-radio-group',
  providers: [
    RADIOGROUP_VALUE_ACCESSOR,
    { provide: NOVO_RADIO_GROUP, useExisting: NovoRadioGroup },
    { provide: NovoFieldControl, useExisting: NovoRadioGroup },
  ],
  template: '<ng-content></ng-content>',
  host: {
    class: 'novo-radio-group',
    '[class.novo-radio-group-appearance-horizontal]': 'appearance=="horizontal"',
    '[class.novo-radio-group-appearance-vertical]': 'appearance=="vertical"',
  },
})
export class NovoRadioGroup extends NovoRadioGroupMixins implements NovoFieldControl<any>, ControlValueAccessor, AfterContentInit {
  private _uniqueId: string = `novo-radio-group-${++nextId}`;
  /** The aria-describedby attribute on the chip list for improved a11y. */
  _ariaDescribedby: string;
  /** Tab index for the chip list. */
  _tabIndex = 0;
  /** User defined tab index. */
  _userTabIndex: number | null = null;
  /** The FocusKeyManager which handles focus. */
  _keyManager: FocusKeyManager<NovoRadioElement>;

  readonly controlType: string = 'radio-group';
  /** @docs-private Implemented as part of NovoFieldControl. */
  lastKeyValue: string = null;
  /** @docs-private Implemented as part of NovoFieldControl.*/
  lastCaretPosition: number | null;

  @Input() id: string = this._uniqueId;
  @Input() tabindex: number = 0;
  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher: ErrorStateMatcher;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  // @Output() focused = new EventEmitter();

  @ContentChildren(forwardRef(() => NovoRadioElement), { descendants: true })
  _radios: QueryList<NovoRadioElement>;

  @Input()
  get appearance(): any {
    return this._appearance;
  }

  set appearance(value) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._updateRadioButtonAppearance();
    }
  }

  @Input() get value(): any {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedRadioFromValue();
      this.onChangeCallback(this._value);
    }
  }

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (this._name !== value) {
      this._updateRadioButtonNames();
    }
  }

  @HostBinding('class.disabled')
  @Input()
  get disabled(): boolean {
    return this.ngControl ? !!this.ngControl.disabled : this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._updateRadioButtonDisabled();
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  /** Implemented as part of NovoFieldControl. */
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }

  get selected(): NovoRadioElement {
    return this._selected;
  }

  protected _name: string = this._uniqueId;
  protected _value: boolean = false;
  protected _selected: NovoRadioElement;
  protected _required: boolean = false;
  protected _disabled: boolean = false;
  protected _placeholder: string;
  protected _appearance: 'horizontal' | 'vertical' = 'horizontal';

  ngAfterContentInit() {
    this._updateRadioButtonAppearance();
    this._updateRadioButtonNames();
    this._updateSelectedRadioFromValue();
  }

  writeValue(value: any): void {
    this.value = value;
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

  private _updateRadioButtonAppearance(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.vertical = this.appearance === 'vertical';
      });
    }
  }

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
      });
    }
  }

  private _updateRadioButtonDisabled(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.disabled = this.disabled;
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  /** Whether any radio buttons has focus. */
  get focused(): boolean {
    // todo: implement this.
    return false;
  }

  /** Implemented as part of NovoFieldControl. */
  get empty(): boolean {
    return this.value === null;
  }

  /** Implemented as part of NovoFieldControl. */
  get shouldLabelFloat(): boolean {
    return !this.empty || this.focused;
  }

  /** Implemented as part of NovoFieldControl. */
  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  /** Implemented as part of NovoFieldControl. */
  onContainerClick(event: MouseEvent) {
    this.focus();
  }

  /**
   * Focuses the first non-disabled chip in this chip list, or the associated input when there
   * are no eligible chips.
   */
  focus(options?: FocusOptions): void {
    if (this.disabled) {
      return;
    }
    // TODO
  }
}
