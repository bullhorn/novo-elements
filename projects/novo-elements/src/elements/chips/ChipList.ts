import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { Key } from 'novo-elements/utils';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState, NOVO_OPTION_PARENT_COMPONENT } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { NovoChipElement, NovoChipEvent, NovoChipSelectionChange } from './Chip';
import { NovoChipTextControl } from './ChipTextControl';

// Boilerplate for applying mixins to NovoChipList.
/** @docs-private */
class NovoChipListBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl,
  ) {}
}
const _NovoChipListMixinBase: CanUpdateErrorStateCtor & typeof NovoChipListBase = mixinErrorState(NovoChipListBase);

// Increasing integer for generating unique ids for chip-list components.
let nextUniqueId = 0;

/** Change event object that is emitted when the chip list value has changed. */
export class NovoChipListChange {
  constructor(
    /** Chip list that emitted the event. */
    public source: NovoChipList,
    /** Value of the chip list when the event was emitted. */
    public value: any,
  ) {}
}

/**
 * A chip list component (named ChipList for its similarity to the List component).
 */
@Component({
  selector: 'novo-chip-list',
  template: `<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>`,
  exportAs: 'novoChipList',
  host: {
    '[attr.tabindex]': 'disabled ? null : _tabIndex',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[attr.aria-required]': 'role ? required : null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': 'errorState',
    '[attr.aria-multiselectable]': 'multiple',
    '[attr.role]': 'role',
    '[class.novo-chip-list-empty]': 'empty',
    '[class.novo-chip-list-has-value]': '!empty',
    '[class.novo-chip-list-stacked]': 'stacked',
    '[class.novo-chip-list-focused]': 'focused',
    '[class.novo-chip-list-disabled]': 'disabled',
    '[class.novo-chip-list-invalid]': 'errorState',
    '[class.novo-chip-list-required]': 'required',
    '[attr.aria-orientation]': 'ariaOrientation',
    class: 'novo-chip-list',
    '(focus)': 'focus()',
    '(blur)': '_blur()',
    '(keydown)': '_keydown($event)',
    '[id]': '_uid',
  },
  providers: [
    { provide: NovoFieldControl, useExisting: NovoChipList },
    { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
  ],
  // styleUrls: ['./ChipList.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoChipList
  extends _NovoChipListMixinBase
  implements NovoFieldControl<any>, ControlValueAccessor, AfterViewInit, AfterContentInit, DoCheck, OnInit, OnDestroy, CanUpdateErrorState
{
  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  readonly controlType: string = 'chip-list';

  /**
   * When a chip is destroyed, we store the index of the destroyed chip until the chips
   * query list notifies about the update. This is necessary because we cannot determine an
   * appropriate chip that should receive focus until the array of chips updated completely.
   */
  private _lastDestroyedChipIndex: number | null = null;

  /** Subject that emits when the component has been destroyed. */
  private _destroyed = new Subject<void>();

  /** Subscription to focus changes in the chips. */
  private _chipFocusSubscription: Subscription | null;

  /** Subscription to blur changes in the chips. */
  private _chipBlurSubscription: Subscription | null;

  /** Subscription to selection changes in chips. */
  private _chipSelectionSubscription: Subscription | null;

  /** Subscription to remove changes in chips. */
  private _chipRemoveSubscription: Subscription | null;

  /** The chip input to add more chips */
  protected _chipInput: NovoChipTextControl;

  /** Uid of the chip list */
  _uid: string = `novo-chip-list-${nextUniqueId++}`;

  /** The aria-describedby attribute on the chip list for improved a11y. */
  _ariaDescribedby: string;

  /** Tab index for the chip list. */
  _tabIndex = 0;

  /**
   * User defined tab index.
   * When it is not null, use user defined tab index. Otherwise use _tabIndex
   */
  _userTabIndex: number | null = null;

  /** The FocusKeyManager which handles focus. */
  _keyManager: FocusKeyManager<NovoChipElement>;

  /** Function when touched */
  _onTouched = () => {};

  /** Function when changed */
  _onChange: (value: any) => void = () => {};

  _selectionModel: SelectionModel<NovoChipElement>;

  /** The array of selected chips inside chip list. */
  get selected(): NovoChipElement[] | NovoChipElement {
    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  /** The ARIA role applied to the chip list. */
  get role(): string | null {
    return this.empty ? null : 'listbox';
  }

  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher: ErrorStateMatcher;

  /** Whether the user should be allowed to select multiple chips. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
    this._syncChipsState();
  }
  private _multiple: boolean = false;

  /** Whether the chips should appear stacked instead of a row. */
  @Input()
  get stacked(): boolean {
    return this._stacked;
  }
  set stacked(value: boolean) {
    this._stacked = coerceBooleanProperty(value);
  }
  private _stacked: boolean = false;

  /**
   * A function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  @Input()
  get compareWith(): (o1: any, o2: any) => boolean {
    return this._compareWith;
  }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    this._compareWith = fn;
    if (this._selectionModel) {
      // A different comparator means the selection could change.
      this._initializeSelection();
    }
  }
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }
  protected _value: any;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  get id(): string {
    return this._chipInput ? this._chipInput.id : this._uid;
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
  protected _required: boolean = false;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get placeholder(): string {
    return this._chipInput ? this._chipInput.placeholder : this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  protected _placeholder: string;

  /** Whether any chips or the novoChipInput inside of this chip-list has focus. */
  get focused(): boolean {
    return (this._chipInput && this._chipInput.focused) || this._hasFocusedChip();
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  get empty(): boolean {
    return (!this._chipInput || this._chipInput.empty) && (!this.chips || this.chips.length === 0);
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  get shouldLabelFloat(): boolean {
    return !this.empty || this.focused;
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get disabled(): boolean {
    return this.ngControl ? !!this.ngControl.disabled : this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._syncChipsState();
  }
  protected _disabled: boolean = false;

  /** Orientation of the chip list. */
  @Input('aria-orientation') ariaOrientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Whether or not this chip list is selectable. When a chip list is not selectable,
   * the selected states for all the chips inside the chip list are always ignored.
   */
  @Input()
  get selectable(): boolean {
    return this._selectable;
  }
  set selectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);

    if (this.chips) {
      this.chips.forEach((chip) => (chip._chipListSelectable = this._selectable));
    }
  }
  protected _selectable: boolean = true;

  @Input()
  set tabIndex(value: number) {
    this._userTabIndex = value;
    this._tabIndex = value;
  }

  /** Combined stream of all of the child chips' selection change events. */
  get chipSelectionChanges(): Observable<NovoChipSelectionChange> {
    return merge(...this.chips.map((chip) => chip.selectionChange));
  }

  /** Combined stream of all of the child chips' focus change events. */
  get chipFocusChanges(): Observable<NovoChipEvent> {
    return merge(...this.chips.map((chip) => chip._onFocus));
  }

  /** Combined stream of all of the child chips' blur change events. */
  get chipBlurChanges(): Observable<NovoChipEvent> {
    return merge(...this.chips.map((chip) => chip._onBlur));
  }

  /** Combined stream of all of the child chips' remove change events. */
  get chipRemoveChanges(): Observable<NovoChipEvent> {
    return merge(...this.chips.map((chip) => chip.removed));
  }

  /** Event emitted when the selected chip list value has been changed by the user. */
  @Output() readonly change: EventEmitter<NovoChipListChange> = new EventEmitter<NovoChipListChange>();

  /**
   * Event that emits whenever the raw value of the chip-list changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   * @docs-private
   */
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  /** The chip components contained within this chip list. */
  @ContentChildren(NovoChipElement, {
    // We need to use `descendants: true`, because Ivy will no longer match
    // indirect descendants if it's left as false.
    descendants: true,
  })
  chips: QueryList<NovoChipElement>;

  /** @docs-private Implemented as part of NovoFieldControl. */
  lastKeyValue: string = null;
  /** @docs-private Implemented as part of NovoFieldControl.*/
  lastCaretPosition: number | null;

  constructor(
    protected _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() private _dir: Directionality,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    /** @docs-private */
    @Optional() @Self() public ngControl: NgControl,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit() {
    this._keyManager = new FocusKeyManager<NovoChipElement>(this.chips)
      .withWrap()
      .withVerticalOrientation()
      .withHomeAndEnd()
      .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');

    if (this._dir) {
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe((dir) => this._keyManager.withHorizontalOrientation(dir));
    }

    this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._allowFocusEscape();
    });

    // When the list changes, re-subscribe
    this.chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      if (this.disabled) {
        // Since this happens after the content has been
        // checked, we need to defer it to the next tick.
        Promise.resolve().then(() => {
          this._syncChipsState();
        });
      }

      this._resetChips();
      // Check to see if we need to update our tab index
      this._updateTabIndex();

      // Check to see if we have a destroyed chip and need to refocus
      this._updateFocusForDestroyedChips();

      this.stateChanges.next();
    });
  }

  ngAfterViewInit() {
    // Reset chips selected/deselected status
    this._initializeSelection();
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel<NovoChipElement>(this.multiple, undefined, false);
    this.stateChanges.next();
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();

      if (this.ngControl.disabled !== this._disabled) {
        this.disabled = !!this.ngControl.disabled;
      }
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this.stateChanges.complete();

    this._dropSubscriptions();
  }

  /** Associates an HTML input element with this chip list. */
  registerInput(inputElement: NovoChipTextControl): void {
    this._chipInput = inputElement;

    // We use this attribute to match the chip list to its input in test harnesses.
    // Set the attribute directly here to avoid "changed after checked" errors.
    this._elementRef.nativeElement.setAttribute('data-novo-chip-input', inputElement.id);
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any): void {
    if (this.chips) {
      this._setSelectionByValue(value, false);
      this.stateChanges.next();
    }
  }

  addValue(value: any): void {
    this.value = [...this.value, value];
    this._chipInput.clearValue();
  }

  removeValue(value: any): void {
    if (this.value) {
      this.value = this.value.filter((it) => !this.compareWith(it, value));
    }
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  onContainerClick(event: MouseEvent) {
    if (!this._originatesFromChip(event)) {
      this.focus();
    }
  }

  /**
   * Focuses the first non-disabled chip in this chip list, or the associated input when there
   * are no eligible chips.
   */
  focus(options?: FocusOptions): void {
    if (this.disabled) {
      return;
    }

    // TODO: ARIA says this should focus the first `selected` chip if any are selected.
    // Focus on first element if there's no chipInput inside chip-list
    if (this._chipInput && this._chipInput.focused) {
      // do nothing
    } else if (this._chipInput) {
      Promise.resolve().then(() => this._focusInput(options));
      this.stateChanges.next();
    } else if (this.chips.length > 0) {
      this._keyManager.setFirstItemActive();
      this.stateChanges.next();
    }
  }

  /** Attempt to focus an input if we have one. */
  _focusInput(options?: FocusOptions) {
    if (this._chipInput) {
      this._chipInput.focus(options);
    }
  }

  /**
   * Pass events to the keyboard manager. Available here for tests.
   */
  _keydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    // If they are on an empty input and hit backspace, focus the last chip
    if (event.key === Key.Backspace && this._isInputEmpty(target)) {
      this._keyManager.setLastItemActive();
      event.preventDefault();
    } else if (target && target.classList.contains('novo-chip')) {
      this._keyManager.onKeydown(event);
      this.stateChanges.next();
    }
  }

  /**
   * Check the tab index as you should not be allowed to focus an empty list.
   */
  protected _updateTabIndex(): void {
    // If we have 0 chips, we should not allow keyboard focus
    this._tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
  }

  /**
   * If the amount of chips changed, we need to update the
   * key manager state and focus the next closest chip.
   */
  protected _updateFocusForDestroyedChips() {
    // Move focus to the closest chip. If no other chips remain, focus the chip-list itself.
    if (this._lastDestroyedChipIndex != null) {
      if (this.chips.length) {
        const newChipIndex = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
        this._keyManager.setActiveItem(newChipIndex);
      } else {
        this.focus();
      }
    }

    this._lastDestroyedChipIndex = null;
  }

  /**
   * Utility to ensure all indexes are valid.
   *
   * @param index The index to be checked.
   * @returns True if the index is valid for our list of chips.
   */
  private _isValidIndex(index: number): boolean {
    return index >= 0 && index < this.chips.length;
  }

  private _isInputEmpty(element: HTMLElement): boolean {
    if (element && element.nodeName.toLowerCase() === 'input') {
      let input = element as HTMLInputElement;
      return !input.value;
    }

    return false;
  }

  _setSelectionByValue(value: any, isUserInput: boolean = true) {
    this._clearSelection();
    this.chips.forEach((chip) => chip.deselect());

    if (Array.isArray(value)) {
      value.forEach((currentValue) => this._selectValue(currentValue, isUserInput));
      this._sortValues();
    } else {
      const correspondingChip = this._selectValue(value, isUserInput);

      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what chip the user interacted with last.
      if (correspondingChip) {
        if (isUserInput) {
          this._keyManager.setActiveItem(correspondingChip);
        }
      }
    }
  }

  /**
   * Finds and selects the chip based on its value.
   * @returns Chip that has the corresponding value.
   */
  private _selectValue(value: any, isUserInput: boolean = true): NovoChipElement | undefined {
    const correspondingChip = this.chips.find((chip) => {
      return chip.value != null && this._compareWith(chip.value, value);
    });

    if (correspondingChip) {
      isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
      this._selectionModel.select(correspondingChip);
    }

    return correspondingChip;
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.ngControl) {
        this.value = this.ngControl.value;
      }
    });
  }

  /**
   * Deselects every chip in the list.
   * @param skip Chip that should not be deselected.
   */
  private _clearSelection(skip?: NovoChipElement): void {
    this._selectionModel.clear();
    this.chips.forEach((chip) => {
      if (chip !== skip) {
        chip.deselect();
      }
    });
    this.stateChanges.next();
  }

  /**
   * Sorts the model values, ensuring that they keep the same
   * order that they have in the panel.
   */
  private _sortValues(): void {
    if (this._multiple) {
      this._selectionModel.clear();

      this.chips.forEach((chip) => {
        if (chip.selected) {
          this._selectionModel.select(chip);
        }
      });
      this.stateChanges.next();
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (Array.isArray(this.selected)) {
      valueToEmit = this.selected.map((chip) => chip.value);
    } else {
      valueToEmit = this.selected ? this.selected.value : fallbackValue;
    }
    this._value = valueToEmit;
    this.change.emit(new NovoChipListChange(this, valueToEmit));
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this._changeDetectorRef.markForCheck();
  }

  /** When blurred, mark the field as touched when focus moved outside the chip list. */
  _blur() {
    if (!this._hasFocusedChip()) {
      this._keyManager.setActiveItem(-1);
    }

    if (!this.disabled) {
      if (this._chipInput) {
        // If there's a chip input, we should check whether the focus moved to chip input.
        // If the focus is not moved to chip input, mark the field as touched. If the focus moved
        // to chip input, do nothing.
        // Timeout is needed to wait for the focus() event trigger on chip input.
        setTimeout(() => {
          if (!this.focused) {
            this._markAsTouched();
          }
        });
      } else {
        // If there's no chip input, then mark the field as touched.
        this._markAsTouched();
      }
    }
  }

  /** Mark the field as touched */
  _markAsTouched() {
    this._onTouched();
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }

  /**
   * Removes the `tabindex` from the chip list and resets it back afterwards, allowing the
   * user to tab out of it. This prevents the list from capturing focus and redirecting
   * it back to the first chip, creating a focus trap, if it user tries to tab away.
   */
  _allowFocusEscape() {
    if (this._tabIndex !== -1) {
      this._tabIndex = -1;

      setTimeout(() => {
        this._tabIndex = this._userTabIndex || 0;
        this._changeDetectorRef.markForCheck();
      });
    }
  }

  private _resetChips() {
    this._dropSubscriptions();
    this._listenToChipsFocus();
    this._listenToChipsSelection();
    this._listenToChipsRemoved();
  }

  private _dropSubscriptions() {
    if (this._chipFocusSubscription) {
      this._chipFocusSubscription.unsubscribe();
      this._chipFocusSubscription = null;
    }

    if (this._chipBlurSubscription) {
      this._chipBlurSubscription.unsubscribe();
      this._chipBlurSubscription = null;
    }

    if (this._chipSelectionSubscription) {
      this._chipSelectionSubscription.unsubscribe();
      this._chipSelectionSubscription = null;
    }

    if (this._chipRemoveSubscription) {
      this._chipRemoveSubscription.unsubscribe();
      this._chipRemoveSubscription = null;
    }
  }

  /** Listens to user-generated selection events on each chip. */
  private _listenToChipsSelection(): void {
    this._chipSelectionSubscription = this.chipSelectionChanges.subscribe((event) => {
      event.source.selected ? this._selectionModel.select(event.source) : this._selectionModel.deselect(event.source);

      // For single selection chip list, make sure the deselected value is unselected.
      if (!this.multiple) {
        this.chips.forEach((chip) => {
          if (!this._selectionModel.isSelected(chip) && chip.selected) {
            chip.deselect();
          }
        });
      }

      if (event.isUserInput) {
        this._propagateChanges();
      }
    });
  }

  /** Listens to user-generated selection events on each chip. */
  private _listenToChipsFocus(): void {
    this._chipFocusSubscription = this.chipFocusChanges.subscribe((event) => {
      let chipIndex: number = this.chips.toArray().indexOf(event.chip);

      if (this._isValidIndex(chipIndex)) {
        this._keyManager.updateActiveItem(chipIndex);
      }
      this.stateChanges.next();
    });

    this._chipBlurSubscription = this.chipBlurChanges.subscribe(() => {
      this._blur();
      this.stateChanges.next();
    });
  }

  private _listenToChipsRemoved(): void {
    this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((event) => {
      const chip = event.chip;
      const chipIndex = this.chips.toArray().indexOf(event.chip);
      this.removeValue(chip.value);
      // In case the chip that will be removed is currently focused, we temporarily store
      // the index in order to be able to determine an appropriate sibling chip that will
      // receive focus.
      if (this._isValidIndex(chipIndex) && chip._hasFocus) {
        this._lastDestroyedChipIndex = chipIndex;
      }
      this.stateChanges.next();
    });
  }

  /** Checks whether an event comes from inside a chip element. */
  private _originatesFromChip(event: Event): boolean {
    let currentElement = event.target as HTMLElement | null;

    while (currentElement && currentElement !== this._elementRef.nativeElement) {
      if (currentElement.classList.contains('novo-chip')) {
        return true;
      }

      currentElement = currentElement.parentElement;
    }

    return false;
  }

  /** Checks whether any of the chips is focused. */
  private _hasFocusedChip() {
    return this.chips && this.chips.some((chip) => chip._hasFocus);
  }

  /** Syncs the list's state with the individual chips. */
  private _syncChipsState() {
    if (this.chips) {
      this.chips.forEach((chip) => {
        chip._chipListDisabled = this._disabled;
        chip._chipListMultiple = this.multiple;
        chip._chipListSelectable = this.selectable;
      });
    }
  }

  static ngAcceptInputType_multiple: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_selectable: BooleanInput;
}
