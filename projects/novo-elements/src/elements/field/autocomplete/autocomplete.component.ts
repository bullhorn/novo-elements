import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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
import { merge, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NovoOptgroup, NovoOption, NovoOptionSelectionChange, NOVO_OPTION_PARENT_COMPONENT } from '../../common';
import { NovoOverlayTemplateComponent } from '../../overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';

/** Event object that is emitted when an autocomplete option is selected. */
export class NovoOptionSelectedEvent {
  constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    public source: NovoAutocompleteElement,
    /** Option that was selected. */
    public option: NovoOption,
  ) {}
}

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
export class NovoAutocompleteElement<T = any> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  private _stateChanges = Subscription.EMPTY;
  private _activeOptionChanges = Subscription.EMPTY;
  private _selectedOptionChanges = Subscription.EMPTY;

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

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Whether the toggle button is disabled. */
  @Input()
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
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<NovoOption>(this.options).withWrap();
    this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
      this.optionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
    });
    this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    this.options.changes.subscribe(() => {
      this._watchStateChanges();
      this._watchSelectionEvents();
    });
  }

  ngAfterViewInit() {
    this._watchStateChanges();
    this._watchSelectionEvents();
  }

  togglePanel(event?: Event) {
    this.cdr.detectChanges();
    if (!this.overlay.panelOpen) {
      this.openPanel(event);
    } else {
      this.closePanel(event);
    }
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(event?: Event): void {
    if (!this.overlay.panelOpen) {
      this.overlay.openPanel();
    }
  }

  closePanel(event?: Event): void {
    this.overlay.closePanel();
  }

  checkPanel() {
    if (this._formField._control.focused && this.element) {
      this.openPanel();
    }
  }

  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }

  private _setTriggerValue(value: any): void {
    const toDisplay = this.displayWith ? this.displayWith(value) : value;
    // Simply falling back to an empty string if the display value is falsy does not work properly.
    // The display value can also be the number zero and shouldn't fall back to an empty string.
    const inputValue = toDisplay != null ? toDisplay : '';
    // If it's used within a `NovoField`, we should set it through the property so it can go
    // through change detection.
    if (this._formField) {
      this._formField._control.value = inputValue;
    } else {
      // this._element.nativeElement.value = inputValue;
      console.warn(`AutoComplete only intended to be used within a NovoField`);
    }
    this._previousValue = inputValue;
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
      this._clearPreviousSelectedOption(event.source);
      this._setTriggerValue(event.source.value);
      // this._onChange(event.source.value);
      // this._element.nativeElement.focus();
      this._formField._control.focus();
      this._emitSelectEvent(event.source);
      this._watchSelectionEvents();
    }

    this.closePanel();
  }

  private _watchSelectionEvents() {
    const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
    this._selectedOptionChanges.unsubscribe();
    this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((evt: NovoOptionSelectionChange) => {
      this._setValueAndClose(evt);
    });
  }

  private _watchStateChanges() {
    const inputStateChanged = this._formField && this._formField._control ? this._formField._control.stateChanges : of();
    this._stateChanges.unsubscribe();
    this._stateChanges = merge(inputStateChanged).subscribe(() => {
      this.checkPanel();
      this.cdr.markForCheck();
    });
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
