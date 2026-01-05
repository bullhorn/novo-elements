import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, OnChanges, OnDestroy, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Key } from 'novo-elements/utils';
import { NovoChipsDefaultOptions, NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipList } from './ChipList';
import { NovoChipTextControl } from './ChipTextControl';
import { NovoFieldElement } from 'novo-elements/elements/field';
import { Subject } from 'rxjs';

/** Represents an input event on a `novoChipInput`. */
export interface NovoChipInputEvent {
  /** The native `<input>` element that the event is being fired for. */
  input: HTMLInputElement;

  /** The value of the input. */
  value: string;
}

// Increasing integer for generating unique ids.
let nextUniqueId = 0;

/**
 * Directive that adds chip-specific behaviors to an input element inside `<novo-form-field>`.
 * May be placed inside or outside of an `<novo-chip-list>`.
 */
@Directive({
    selector: 'input[novoChipInput]',
    exportAs: 'novoChipInput, novoChipInputFor',
    host: {
        class: 'novo-chip-input novo-input-element',
        '(keydown)': '_keydown($event)',
        '(blur)': '_blur($event)',
        '(focus)': '_focus()',
        '(input)': '_onInput()',
        '[id]': 'id',
        '[attr.disabled]': 'disabled || null',
        '[attr.placeholder]': 'placeholder || null',
        '[attr.aria-invalid]': 'chipList && chipList.ngControl ? chipList.ngControl.invalid : null',
        '[attr.aria-required]': 'chipList && chipList.required || null',
    },
    standalone: false,
})
export class NovoChipInput implements NovoChipTextControl, OnChanges, OnDestroy {
  /** Whether the control is focused. */
  focused: boolean = false;

  /**
   * Whether or not the chipEnd event will be emitted when the input is blurred.
   */
  @Input('novoChipInputAddOnBlur')
  get addOnBlur(): boolean {
    return this._addOnBlur;
  }
  set addOnBlur(value: boolean) {
    this._addOnBlur = coerceBooleanProperty(value);
  }
  _addOnBlur: boolean = false;

  /**
   * The list of key codes that will trigger a chipEnd event.
   *
   * Defaults to `[Key.Enter]`.
   */
  @Input('novoChipInputSeparatorKeyCodes')
  separatorKeyCodes: readonly string[] = this._defaultOptions.separatorKeyCodes;

  /** Emitted when a chip is to be added. */
  @Output('novoChipInputTokenEnd')
  chipEnd: EventEmitter<NovoChipInputEvent> = new EventEmitter<NovoChipInputEvent>();

  /** The input's placeholder text. */
  @Input() placeholder: string = '';

  /** Unique id for the input. */
  @Input() id: string = `novo-chip-list-input-${nextUniqueId++}`;

  /** Whether the input is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled || (this._chipList && this._chipList.disabled);
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean = false;

  /** Whether the input is empty. */
  get empty(): boolean {
    return !this._inputElement.value;
  }

  /** Getter for accessing chipList in templates */
  get chipList(): NovoChipList {
    return this._chipList;
  }

  /** The native input element to which this directive is attached. */
  protected _inputElement: HTMLInputElement;

  destroy$ = new Subject<void>();

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement>,
    @Inject(NOVO_CHIPS_DEFAULT_OPTIONS) private readonly _defaultOptions: NovoChipsDefaultOptions,
    @Optional() @Inject(NovoFieldElement) private readonly _field: NovoFieldElement,
    @Inject(forwardRef(() => NovoChipList)) private readonly _chipList: NovoChipList,
    @Optional() @Self() protected ngControl: NgControl,
  ) {
    this._inputElement = this._elementRef.nativeElement;
    this._chipList.registerInput(this);
  }

  ngOnChanges() {
    this._chipList.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Utility method to make host definition/tests more clear. */
  _keydown(event?: KeyboardEvent) {
    // Allow the user's focus to escape when they're tabbing forward. Note that we don't
    // want to do this when going backwards, because focus should go back to the first chip.
    if (event && event.key === Key.Tab && !hasModifierKey(event, 'shiftKey')) {
      this._chipList._allowFocusEscape();
    }

    this._emitChipEnd(event);
  }

  /** Checks to see if the blur should emit the (chipEnd) event. */
  _blur(blurEvent: FocusEvent) {
    if (this.addOnBlur) {
      this._emitChipEnd();
    } else if (!this._field.blurEventIsInField(blurEvent)) {
      this.clearValue();
    }
    this.focused = false;
    // Blur the chip list if it is not focused
    if (!this._chipList.focused) {
      this._chipList._blur();
    }
    this._chipList.stateChanges.next();
  }

  _focus() {
    this.focused = true;
    this._chipList.stateChanges.next();
  }

  /** Checks to see if the (chipEnd) event needs to be emitted. */
  _emitChipEnd(event?: KeyboardEvent) {
    if (!this._inputElement.value && !!event) {
      this._chipList._keydown(event);
    }
    if (!event || this._isSeparatorKey(event)) {
      this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });

      if (event) {
        event.preventDefault();
      }
    }
  }

  _onInput() {
    // Let chip list know whenever the value changes.
    this._chipList.stateChanges.next();
  }

  /** Focuses the input. */
  focus(options?: FocusOptions): void {
    this._inputElement.focus(options);
  }

  /** Clears the input. */
  clearValue(): void {
    this._inputElement.value = '';
    this.ngControl?.control?.setValue('');
  }

  /** Checks whether a keycode is one of the configured separators. */
  private _isSeparatorKey(event: KeyboardEvent) {
    return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.key);
  }

  static readonly ngAcceptInputType_addOnBlur: BooleanInput;
  static readonly ngAcceptInputType_disabled: BooleanInput;
}
