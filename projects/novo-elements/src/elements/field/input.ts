/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { NovoFieldControl } from './field-control';

/**
 * This token is used to inject the object whose value should be set into `NovoInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `NovoInput` delegate the getting and setting of the
 * value to them.
 */
export const NOVO_INPUT_VALUE_ACCESSOR = new InjectionToken<{ value: any }>('NOVO_INPUT_VALUE_ACCESSOR');

// Invalid input type. Using one of these will throw an NovoInputUnsupportedTypeError.
const NOVO_INPUT_INVALID_TYPES = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit'];

let nextUniqueId = 0;

// Boilerplate for applying mixins to NovoInput.
class NovoInputBase {
  constructor(
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl,
  ) {}
}

/** Directive that allows a native input to work inside a `NovoField`. */
// tslint:disable: no-conflicting-lifecycle member-ordering
@Directive({
  selector: `input[novoInput], textarea[novoInput], select[novoInput]`,
  host: {
    class: 'novo-input-element',
    '[attr.id]': 'id',
    '[attr.placeholder]': 'placeholder',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.readonly]': 'readonly && !_isNativeSelect || null',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-required]': 'required.toString()',
    '[attr.autocomplete]': "'off'",
  },
  providers: [{ provide: NovoFieldControl, useExisting: NovoInput }],
})
export class NovoInput extends NovoInputBase implements NovoFieldControl<any>, OnChanges, OnDestroy, AfterViewInit, DoCheck {
  protected _uid = `novo-input-${nextUniqueId++}`;
  protected _previousNativeValue: any;
  private _inputValueAccessor: { value: any };
  /** The aria-describedby attribute on the input for improved a11y. */
  @HostBinding('attr.aria-describedby') _ariaDescribedby: string;

  /** Whether the component is being rendered on the server. */
  readonly _isServer: boolean;

  /** Whether the component is a native html select. */
  readonly _isNativeSelect: boolean;

  /** Whether the component is a textarea. */
  readonly _isTextarea: boolean;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  focused: boolean = false;

  errorState: boolean = false;

  /** @docs-private Implemented as part of NovoFieldControl. */
  lastKeyValue: string = null;
  /** @docs-private Implemented as part of NovoFieldControl.*/
  lastCaretPosition: number | null;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  readonly stateChanges: Subject<void> = new Subject<void>();

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  controlType: string = 'novo-input';

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  autofilled = false;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // Browsers may not fire the blur event if the input is disabled too quickly.
    // Reset from here to ensure that the element doesn't become stuck.
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }
  protected _disabled = false;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
  }
  protected _id: string;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input() placeholder: string;

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
  }
  protected _required = false;

  /** Input type of the element. */
  @Input()
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value || 'text';
    this._validateType();

    // When using Angular inputs, developers are no longer able to set the properties on the native
    // input element. To ensure that bindings for `type` work, we need to sync the setter
    // with the native property. Textarea elements don't support the type property or attribute.
    if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
      (this._elementRef.nativeElement as HTMLInputElement).type = this._type;
    }
  }
  protected _type = 'text';

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get value(): string {
    return this._inputValueAccessor.value;
  }
  set value(value: string) {
    if (value !== this.value) {
      this._inputValueAccessor.value = value;
      this.stateChanges.next();
    }
  }

  /** Whether the element is readonly. */
  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  protected _neverEmptyInputTypes = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week'].filter((t) =>
    getSupportedInputTypes().has(t),
  );

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    /** @docs-private */
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Self() @Inject(NOVO_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
    private _autofillMonitor: AutofillMonitor,
    ngZone: NgZone,
  ) {
    super(_parentForm, _parentFormGroup, ngControl);

    const element = this._elementRef.nativeElement;
    const nodeName = element.nodeName.toLowerCase();

    // If no input value accessor was explicitly specified, use the element as the input value
    // accessor.
    this._inputValueAccessor = inputValueAccessor || element;

    this._previousNativeValue = this.value;

    // Force setter to be called in case id was not specified.
    this.id = this.id;

    // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
    // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
    // exists on iOS, we only bother to install the listener on iOS.
    if (_platform.IOS) {
      ngZone.runOutsideAngular(() => {
        _elementRef.nativeElement.addEventListener('keyup', (event: Event) => {
          const el = event.target as HTMLInputElement;
          if (!el.value && !el.selectionStart && !el.selectionEnd) {
            // Note: Just setting `0, 0` doesn't fix the issue. Setting
            // `1, 1` fixes it for the first time that you type text and
            // then hold delete. Toggling to `1, 1` and then back to
            // `0, 0` seems to completely fix it.
            el.setSelectionRange(1, 1);
            el.setSelectionRange(0, 0);
          }
        });
      });
    }

    this._isServer = !this._platform.isBrowser;
    this._isNativeSelect = nodeName === 'select';
    this._isTextarea = nodeName === 'textarea';

    this.controlType = (this._elementRef.nativeElement as HTMLInputElement).type;
    if (this._isNativeSelect) {
      this.controlType = (element as HTMLSelectElement).multiple ? 'select-multiple' : 'select';
    } else if (this._isTextarea) {
      this.controlType = 'textarea';
    }
  }

  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((event) => {
        this.autofilled = event.isAutofilled;
        this.stateChanges.next();
      });
    }
  }

  ngOnChanges() {
    this.stateChanges.next();
  }

  ngOnDestroy() {
    this.stateChanges.complete();

    if (this._platform.isBrowser) {
      this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      // this.updateErrorState();
    }

    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    this._dirtyCheckNativeValue();
  }

  /** Focuses the input. */
  focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritten.
  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  _focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }

  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritten.
  @HostListener('input', ['$event'])
  _onInput(event: InputEvent) {
    // Listening to the input event wouldn't be necessary when the input is using the
    // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    this.lastKeyValue = event.data;
    if (this._isTextarea) {
      this.lastCaretPosition = (this._elementRef.nativeElement as HTMLTextAreaElement).selectionStart;
    }
  }

  /** Does some manual dirty checking on the native input `value` property. */
  protected _dirtyCheckNativeValue() {
    const newValue = this._elementRef.nativeElement.value;

    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }

  /** Make sure the input is a supported type. */
  protected _validateType() {
    if (NOVO_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw new Error(`Invalid Input Type: ${this._type}`);
    }
  }

  /** Checks whether the input type is one of the types that are never empty. */
  protected _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }

  /** Checks whether the input is invalid based on the native validation. */
  protected _isBadInput() {
    // The `validity` property won't be present on platform-server.
    const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  get empty(): boolean {
    return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  get shouldLabelFloat(): boolean {
    if (this._isNativeSelect) {
      // For a single-selection `<select>`, the label should float when the selected option has
      // a non-empty display value. For a `<select multiple>`, the label *always* floats to avoid
      // overlapping the label with the options.
      const selectElement = this._elementRef.nativeElement as HTMLSelectElement;
      const firstOption: HTMLOptionElement | undefined = selectElement.options[0];

      // On most browsers the `selectedIndex` will always be 0, however on IE and Edge it'll be
      // -1 if the `value` is set to something, that isn't in the list of options, at a later point.
      return (
        this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label)
      );
    } else {
      return this.focused || !this.empty;
    }
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  onContainerClick() {
    // Do not re-focus the input element if the element is already focused. Otherwise it can happen
    // that someone clicks on a time input and the cursor resets to the "hours" field while the
    // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
    if (!this.focused) {
      this.focus();
    }
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_readonly: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;

  // Accept `any` to avoid conflicts with other directives on `<input>` that may
  // accept different types.
  static ngAcceptInputType_value: any;
}
