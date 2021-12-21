// NG2
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput } from '../../utils';
// APP
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoCheckboxElement),
  multi: true,
};

/** Change event object emitted by NovoCheckbox. */
export class NovoCheckboxChange {
  /** The source NovoCheckbox of the event. */
  source: NovoCheckboxElement;
  /** The new `checked` value of the checkbox. */
  checked: boolean;
}

const LAYOUT_DEFAULTS = { iconStyle: 'box' };
let nextId = 0;
@Component({
  selector: 'novo-checkbox',
  providers: [CHECKBOX_VALUE_ACCESSOR],
  styleUrls: ['./Checkbox.scss'],
  template: `
    <div class="novo-checkbox-group" [class.checked]="checked" [class.disabled]="disabled">
      <input
        #input
        type="checkbox"
        [required]="required"
        [checked]="checked"
        [id]="id"
        [attr.name]="name"
        [attr.value]="value"
        [disabled]="disabled"
        [tabIndex]="tabIndex"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-checked]="_getAriaChecked()"
        [attr.aria-describedby]="ariaDescribedby"
        (change)="_onInteractionEvent($event)"
        (click)="_onInputClick($event)"
      />
      <label [attr.for]="name" (click)="select($event)" [class.disabled]="disabled">
        <i
          [class.bhi-checkbox-empty]="!checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-filled]="checked && !indeterminate && boxIcon"
          [class.bhi-checkbox-indeterminate]="indeterminate && boxIcon"
          [class.bhi-circle-o]="!checked && !indeterminate && !boxIcon"
          [class.bhi-check]="checked && !indeterminate && !boxIcon"
          [class.bhi-circle]="indeterminate && !boxIcon"
        ></i>
        <span *ngIf="label">{{ label }}</span>
        <span *ngIf="!label" class="novo-checkbox-text"><ng-content></ng-content></span>
      </label>
    </div>
  `,
  host: {
    class: 'novo-checkbox',
    '[class.has-label]': 'label',
  },
})
export class NovoCheckboxElement implements ControlValueAccessor, OnInit {
  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input('aria-label') ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby: string;

  private _uniqueId: string = `novo-checkbox-${++nextId}`;

  @Input()
  id: string = this._uniqueId;
  @Input()
  name: string = this._uniqueId;
  @Input()
  label: string;
  @Input()
  disabled: boolean = false;
  @Input()
  layoutOptions: { iconStyle?: string }; // TODO - avoid configs like this
  @Input()
  color: string;
  /** The value attribute of the native input element */
  @Input() value: string;
  @Input() tabIndex: number;

  /** Whether the checkbox is required. */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean;

  /** Whether the checkbox is checked. */
  @BooleanInput()
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (value !== this.checked) {
      this._checked = value;
      this._cdr.markForCheck();
    }
  }
  private _checked: boolean = false;

  @BooleanInput()
  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: boolean) {
    const changed = value !== this._indeterminate;
    this._indeterminate = coerceBooleanProperty(value);
    if (changed) {
      this.indeterminateChange.emit(this._indeterminate);
    }
    this._syncIndeterminate(this._indeterminate);
  }
  private _indeterminate: boolean = false;

  /** The native `<input type="checkbox">` element */
  @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() readonly change: EventEmitter<NovoCheckboxChange> = new EventEmitter<NovoCheckboxChange>();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();

  boxIcon: boolean = true;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private _cdr: ChangeDetectorRef, private _focusMonitor: FocusMonitor, @Attribute('tabindex') tabIndex: string) {
    // this.color = this.defaultColor = this._options.color || defaults.color;
    this.tabIndex = parseInt(tabIndex, 10) || 0;
  }

  ngOnInit() {
    this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
    this.boxIcon = this.layoutOptions.iconStyle === 'box';
  }

  select(event: Event) {
    Helpers.swallowEvent(event);
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onModelChange(this.checked);
      this.onSelect.emit({ originalEvent: event, value: this.checked });
    }
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any) {
    this.checked = !!value;
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

  _getAriaChecked(): 'true' | 'false' | 'mixed' {
    if (this.checked) {
      return 'true';
    }

    return this.indeterminate ? 'mixed' : 'false';
  }

  private _emitChangeEvent() {
    const event = new NovoCheckboxChange();
    event.source = this;
    event.checked = this.checked;

    this.onModelChange(this.checked);
    this.change.emit(event);

    // Assigning the value again here is redundant, but we have to do it in case it was
    // changed inside the `change` listener which will cause the input to be out of sync.
    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
    }
  }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   * Do not toggle on (change) event since IE doesn't fire change event when
   *   indeterminate checkbox is clicked.
   * @param event
   */
  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `checkbox` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
    if (!this.disabled) {
      // When user manually click on the checkbox, `indeterminate` is set to false.
      if (this.indeterminate) {
        Promise.resolve().then(() => {
          this._indeterminate = false;
          this.indeterminateChange.emit(this._indeterminate);
        });
      }
      this.toggle();
      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._emitChangeEvent();
    }
  }

  /** Focuses the checkbox. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (origin) {
      this._focusMonitor.focusVia(this._inputElement, origin, options);
    } else {
      this._inputElement.nativeElement.focus(options);
    }
  }

  _onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  private _syncIndeterminate(value: boolean) {
    const nativeCheckbox = this._inputElement;
    if (nativeCheckbox) {
      nativeCheckbox.nativeElement.indeterminate = value;
    }
  }
}
