import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, interval, merge, of, Subscription } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { BooleanInput, Key } from '../../../utils';
import type { NovoChipList } from '../../chips';
import {
  CanDisable,
  CanDisableCtor,
  HasOverlayCtor,
  mixinDisabled,
  mixinOverlay,
  NovoOptgroup,
  NovoOption,
  NovoOptionSelectionChange,
  NOVO_OPTION_PARENT_COMPONENT,
} from '../../common';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';
import { NovoFieldControl } from '../field-control';

/** Event object that is emitted when an autocomplete option is selected. */
export class NovoOptionSelectedEvent {
  constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    public source: NovoAutocompleteElement,
    /** Option that was selected. */
    public option: NovoOption,
  ) {}
}

// Boilerplate for applying mixins
class NovoAutocompleteBase {
  constructor() {}
}
const NovoAutocompleteMixins: HasOverlayCtor & CanDisableCtor & typeof NovoAutocompleteBase = mixinOverlay(
  mixinDisabled(NovoAutocompleteBase),
);

@Component({
  selector: 'novo-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
  host: {
    class: 'novo-autocomplete',
    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
    // consumer may have provided, while still being able to receive focus.
    '[attr.tabindex]': 'disabled ? null : -1',
  },
  providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement }],
  exportAs: 'novoAutocomplete',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoAutocompleteElement
  extends NovoAutocompleteMixins
  implements CanDisable, AfterContentInit, AfterViewInit, OnChanges, OnDestroy
{
  private _stateChanges = Subscription.EMPTY;
  private _activeOptionChanges = Subscription.EMPTY;
  private _selectedOptionChanges = Subscription.EMPTY;
  private _keyDownChanges = Subscription.EMPTY;

  /** Manages active item in option list based on key events. */
  private _keyManager: ActiveDescendantKeyManager<NovoOption>;

  /** Old value of the native input. Used to work around issues with the `input` event on IE. */
  private _previousValue: string | number | null;

  @ContentChildren(NovoOptgroup, { descendants: true }) optionGroups: QueryList<NovoOptgroup>;
  @ContentChildren(NovoOption, { descendants: true }) options: QueryList<NovoOption>;

  /** Event that is emitted whenever an option from the list is selected. */
  @Output() readonly optionSelected: EventEmitter<NovoOptionSelectedEvent> = new EventEmitter<NovoOptionSelectedEvent>();
  /** Emits whenever an option is activated using the keyboard. */
  @Output() readonly optionActivated: EventEmitter<NovoOptionSelectedEvent> = new EventEmitter<NovoOptionSelectedEvent>();

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Key to use to trigger autocomplete. used for textarea. */
  @Input() triggerOn: (control: NovoFieldControl<any>) => boolean = (control) => control.focused;

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple: boolean = false;

  /** Whether the toggle button is disabled. */
  @Input()
  @BooleanInput()
  get disabled(): boolean {
    if (this._disabled === undefined && this._formField?._control) {
      return this._formField._control.disabled;
    }
    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  element: ElementRef;

  constructor(
    private _elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string,
    @Optional() @Inject(NOVO_FORM_FIELD) private _formField: NovoFieldElement,
  ) {
    super();
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this._watchStateChanges();
    this._watchSelectionEvents();
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
    this._activeOptionChanges.unsubscribe();
    this._selectedOptionChanges.unsubscribe();
    this._keyDownChanges.unsubscribe();
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<NovoOption>(this.options).withWrap();
    this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
      this.optionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
    });
    this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    this._keyDownChanges = fromEvent(this.element.nativeElement, 'keydown').subscribe((event: KeyboardEvent) => this._handleKeydown(event));
    this.options.changes.subscribe(() => {
      this._watchStateChanges();
      this._watchSelectionEvents();
      Promise.resolve().then(() => {
        this.checkSelectedOptions();
      });
    });
  }

  ngAfterViewInit() {
    this._watchStateChanges();
    this._watchSelectionEvents();
  }

  checkPanel() {
    const isTriggered = this.triggerOn(this._formField._control);
    if (isTriggered && this.element) {
      this.openPanel();
    }
  }

  private _setTriggerValue(option: NovoOption): void {
    const toDisplay = this.displayWith ? this.displayWith(option) : option?.viewValue;
    // Simply falling back to an empty string if the display value is falsy does not work properly.
    // The display value can also be the number zero and shouldn't fall back to an empty string.
    const displayValue = toDisplay != null ? toDisplay : '';
    const optionValue = option.value;
    // If it's used within a `NovoField`, we should set it through the property so it can go
    // through change detection.
    if (this._formField) {
      const { controlType, lastCaretPosition = 0 } = this._formField._control;
      if (controlType === 'textarea') {
        const currentValue = this._formField._control.value.split('');
        currentValue.splice(lastCaretPosition, 0, displayValue);
        this._formField._control.value = currentValue.join('');
      } else if (controlType === 'chip-list') {
        const chipList = this._formField._control as NovoChipList;
        const currentValue = this._formField._control.value;
        if (currentValue.includes(optionValue)) {
          chipList.removeValue(optionValue);
        } else {
          chipList.addValue(optionValue);
        }
      } else {
        let valueToEmit: any = optionValue;
        if (this.multiple) {
          const currentValue = this._formField._control.value;
          if (Array.isArray(currentValue)) {
            if (currentValue.includes(optionValue)) {
              valueToEmit = currentValue.filter((it) => it === optionValue);
            } else {
              valueToEmit = [...currentValue, optionValue];
            }
          } else if (currentValue === optionValue) {
            valueToEmit = [];
          } else {
            valueToEmit = [currentValue, optionValue];
          }
        }
        this._formField._control.value = valueToEmit;
      }
    } else {
      // this._element.nativeElement.value = inputValue;
      console.warn(`AutoComplete only intended to be used within a NovoField`);
    }
    this._previousValue = optionValue;
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  private _clearPreviousSelectedOption(skip: NovoOption) {
    this.options.forEach((option) => {
      if (option !== skip && option.selected) {
        option.deselect();
      }
    });
  }

  /** Emits the `select` event. */
  private _emitSelectEvent(option: NovoOption): void {
    const event = new NovoOptionSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  private _setValueAndClose(event: NovoOptionSelectionChange | null): void {
    if (event && event.source) {
      if (!this.multiple) this._clearPreviousSelectedOption(event.source);
      this._setTriggerValue(event.source);
      // this._onChange(event.source.value);
      // this._element.nativeElement.focus();
      // this._formField._control.focus();
      this._emitSelectEvent(event.source);
      this._watchSelectionEvents();
    }

    if (!this.multiple) this.closePanel();
  }

  private _watchSelectionEvents() {
    const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
    this._selectedOptionChanges.unsubscribe();
    this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((evt: NovoOptionSelectionChange) => {
      this._setValueAndClose(evt);
    });
  }

  private _watchStateChanges() {
    const inputStateChanged = this._formField.stateChanges;
    this._stateChanges.unsubscribe();
    this._stateChanges = merge(inputStateChanged)
      .pipe(debounce(() => interval(10)))
      .subscribe(() => {
        this.checkSelectedOptions();
        this.checkPanel();
        this.cdr.markForCheck();
      });
  }

  /** The currently active option, coerced to MatOption type. */
  get activeOption(): NovoOption | null {
    if (this._keyManager) {
      return this._keyManager.activeItem;
    }

    return null;
  }

  _handleKeydown(event: KeyboardEvent): void {
    const key = event.key;

    // Prevent the default action on all escape key presses. This is here primarily to bring IE
    // in line with other browsers. By default, pressing escape on IE will cause it to revert
    // the input value to the one that it had on focus, however it won't dispatch any events
    // which means that the model value will be out of sync with the view.
    if (key === Key.Escape && !hasModifierKey(event)) {
      event.preventDefault();
    }

    if (this.activeOption && key === Key.Enter && this.panelOpen) {
      this.activeOption._selectViaInteraction();
      // this._resetActiveItem();
      event.preventDefault();
    } else {
      const prevActiveItem = this._keyManager.activeItem;
      const isArrowKey = key === Key.ArrowUp || key === Key.ArrowDown;

      if (this.panelOpen || key === Key.Tab) {
        this._keyManager.onKeydown(event);
      } else if (isArrowKey && !this.overlay.panelOpen) {
        this.openPanel();
      }

      // if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
      //   this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
      // }
    }
  }

  private checkSelectedOptions() {
    if (this.multiple && Array.isArray(this._formField._control.value)) {
      const value = this._formField._control.value;
      this.options.forEach((option) => option.deselect());
      value.forEach((currentValue: any) => this._selectValue(currentValue));
    }
  }
  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectValue(value: any): NovoOption | undefined {
    const correspondingOption = this.options.find((option: NovoOption) => {
      return option.value === value;
    });
    correspondingOption?.select();
    return correspondingOption;
  }
}
