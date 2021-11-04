// NG
import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import {
  CanDisableCtor,
  CanRequireCtor,
  CanUpdateErrorStateCtor,
  ErrorStateMatcher,
  HasOverlayCtor,
  HasTabIndexCtor,
  mixinDisabled,
  mixinErrorState,
  mixinOverlay,
  mixinRequired,
  mixinTabIndex,
  NovoOptgroup,
  NovoOption,
  NovoOptionSelectionChange,
  NOVO_OPTION_PARENT_COMPONENT,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition,
} from '../common';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import { NovoFieldControl } from '../field';

// Value accessor for the component (supports ngModel)
// const SELECT_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NovoSelectElement),
//   multi: true,
// };

/** Change event object that is emitted when the select value has changed. */
export class NovoSelectChange {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: NovoSelectElement,
    /** Current value of the select that emitted the event. */
    public value: any,
  ) {}
}

// Create Base Class from Mixins
// Boilerplate for applying mixins
class NovoSelectBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
  ) {}
}
const NovoSelectMixins: HasOverlayCtor &
  CanRequireCtor &
  CanDisableCtor &
  HasTabIndexCtor &
  CanUpdateErrorStateCtor &
  typeof NovoSelectBase = mixinOverlay(mixinTabIndex(mixinRequired(mixinDisabled(mixinErrorState(NovoSelectBase)))));

let nextId = 0;

@Component({
  selector: 'novo-select',
  inputs: ['disabled', 'required', 'tabIndex'],
  providers: [
    { provide: NovoFieldControl, useExisting: NovoSelectElement },
    { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoSelectElement },
  ],
  template: `
    <div #dropdownElement (click)="togglePanel(); (false)" tabIndex="{{ disabled ? -1 : 0 }}" type="button">
      <span class="novo-select-placeholder" *ngIf="empty">{{ placeholder }}</span>
      <span class="novo-select-display-value" *ngIf="!empty">{{ displayValue }}</span>
      <i class="bhi-collapse"></i>
    </div>
    <novo-overlay-template
      [parent]="elementRef"
      [position]="position"
      [width]="overlayWidth"
      [height]="overlayHeight"
      (closing)="dropdown.nativeElement.focus()"
    >
      <div #panel class="novo-select-list" tabIndex="-1" [class.has-header]="headerConfig" [class.active]="panelOpen">
        <novo-option *ngIf="headerConfig" class="select-header" [class.open]="header.open">
          <novo-button *ngIf="!header.open" icon="add-thin" (click)="toggleHeader($event); (false)" tabIndex="-1" class="header">
            {{ headerConfig.label }}
          </novo-button>
          <div *ngIf="header.open" [ngClass]="{ active: header.open }">
            <input
              autofocus
              type="text"
              [placeholder]="headerConfig.placeholder"
              [attr.id]="name"
              autocomplete="off"
              [value]="header.value"
              [ngClass]="{ invalid: !header.valid }"
            />
            <footer>
              <novo-button (click)="toggleHeader($event, false)">{{ labels.cancel }}</novo-button>
              <novo-button (click)="saveHeader()" class="primary">{{ labels.save }}</novo-button>
            </footer>
          </div>
        </novo-option>
        <!-- Declarative Content Goes Here -->
        <ng-content></ng-content>
        <!-- Data Driven Content Goes Here -->
        <ng-container *ngFor="let option of filteredOptions; let i = index">
          <novo-option
            *ngIf="!option.divider; else divider"
            class="select-item"
            [class.active]="option.active"
            [attr.data-automation-value]="option.label"
            [value]="option.value"
          >
            <span [innerHtml]="highlight(option.label, filterTerm)"></span> <i *ngIf="option.active" class="bhi-check"></i>
          </novo-option>
          <ng-template #divider>
            <novo-divider class="select-item-divider" [class.with-label]="option.label" [class.without-label]="!option.label">
              {{ option?.label }}
            </novo-divider>
          </ng-template>
        </ng-container>
      </div>
    </novo-overlay-template>
  `,
})
export class NovoSelectElement
  extends NovoSelectMixins
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor, NovoFieldControl<any> {
  private _uniqueId: string = `novo-select-${++nextId}`;
  private _stateChanges = Subscription.EMPTY;
  private _activeOptionChanges = Subscription.EMPTY;
  private _selectedOptionChanges = Subscription.EMPTY;
  protected readonly _destroy = new Subject<void>();

  readonly controlType: string = 'select';

  /** @docs-private Implemented as part of NovoFieldControl. */
  lastKeyValue: string = null;
  /** @docs-private Implemented as part of NovoFieldControl.*/
  lastCaretPosition: number | null;

  _selectionModel: SelectionModel<NovoOption>;

  /** The aria-describedby attribute on the chip list for improved a11y. */
  _ariaDescribedby: string;
  /** Tab index for the chip list. */
  _tabIndex = 0;
  /** User defined tab index. */
  _userTabIndex: number | null = null;
  /** The FocusKeyManager which handles focus. */
  _keyManager: ActiveDescendantKeyManager<NovoOption>;

  @Input()
  id: string = this._uniqueId;
  @Input()
  name: string = this._uniqueId;
  @Input()
  options: Array<any>;
  @Input()
  placeholder: string = 'Select...';
  @Input()
  readonly: boolean;
  @Input()
  headerConfig: any;
  @Input()
  position: string = 'center';
  @Input()
  overlayWidth: number;
  @Input()
  overlayHeight: number;
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();
  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<NovoSelectChange> = new EventEmitter<NovoSelectChange>();
  /** Event that emits whenever the raw value of the select changes.*/
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Event emitted when the select has been opened. */
  @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(
    filter((o) => o),
    map(() => {}),
  );
  /** Event emitted when the select has been closed. */
  @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(
    filter((o) => !o),
    map(() => {}),
  );

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;
  /** * Function to compare the option values with the selected values. */
  @Input() compareWith: (o1: any, o2: any) => boolean = (o1: any, o2: any) => o1 === o2;

  header: any = {
    open: false,
    valid: true,
    value: '',
  };
  createdItem: any;
  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};
  filterTerm: string = '';
  filterTermTimeout;
  filteredOptions: any;
  disabled: boolean = false;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent, { static: true })
  overlay: NovoOverlayTemplateComponent;
  @ViewChild('dropdownElement', { static: true })
  dropdown: ElementRef;

  @ContentChildren(NovoOptgroup, { descendants: true })
  optionGroups: QueryList<NovoOptgroup>;
  @ContentChildren(NovoOption, { descendants: true })
  contentOptions: QueryList<NovoOption>;
  @ViewChildren(NovoOption)
  viewOptions: QueryList<NovoOption>;

  @ViewChild('panel')
  panel: ElementRef;

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    // Always re-assign an array, because it might have been mutated.
    if (newValue !== this._value || (this._multiple && Array.isArray(newValue))) {
      if (this.options) {
        this._setSelectionByValue(newValue);
      }
      this._value = newValue;
    }
  }
  private _value: any = null;

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple: boolean = false;

  /** Whether any radio buttons has focus. */
  get focused(): boolean {
    // todo: implement this.
    return false;
  }

  /** Implemented as part of NovoFieldControl. */
  get empty(): boolean {
    return this._value === null;
  }

  /** The currently selected option. */
  get selected(): NovoOption | NovoOption[] {
    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  /** The value displayed in the trigger. */
  get displayValue(): string {
    if (this.empty) {
      return '';
    }
    if (this._multiple) {
      const selectedOptions = this._selectionModel.selected.map((option) => this._getDisplayValue(option));
      return selectedOptions.join(', ');
    }
    return this._getDisplayValue(this._selectionModel.selected[0]);
  }

  constructor(
    public elementRef: ElementRef,
    public labels: NovoLabelService,
    public ref: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private ngZone: NgZone,
    defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
  ) {
    super(defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel<NovoOption>(this.multiple);
    this.stateChanges.next();
    this._initLegacyOptions();
    this.focusMonitor.monitor(this.dropdown.nativeElement).subscribe((origin) =>
      this.ngZone.run(() => {
        if (origin === 'keyboard' && !this.disabled) {
          this.openPanel();
        }
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
    // the parent form field know to run change detection when the disabled state changes.
    if (changes?.disabled) {
      this.stateChanges.next();
    }
    this._initLegacyOptions();
  }

  ngAfterViewInit() {
    // Initialize KeyManager to manage keyboard events
    this._initKeyManager();
    // Subscribe to NovoOption selections
    this._watchSelectionEvents();
    // Set initial value
    this._initializeSelection();
    // Listen to selection changes to select and deselect options
    this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe((event) => {
      event.added.forEach((option) => option.select());
      event.removed.forEach((option) => option.deselect());
    });
    // Listen to QueryList changes
    merge(this.contentOptions.changes, this.viewOptions.changes)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this._watchSelectionEvents();
        this._initializeSelection();
      });

    merge(this.overlay.opening, this.overlay.closing)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.openedChange.emit(this.panelOpen);
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this._stateChanges.unsubscribe();
    this._activeOptionChanges.unsubscribe();
    this._selectedOptionChanges.unsubscribe();
    this.focusMonitor.stopMonitoring(this.dropdown.nativeElement);
  }

  openPanel() {
    super.openPanel();
    this._highlightCorrectOption();
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
      this.stateChanges.next();
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    this._selectionModel.selected.forEach((option) => option.setInactiveStyles());
    this._selectionModel.clear();
    if (this.multiple && value) {
      value.forEach((currentValue: any) => this._selectValue(currentValue));
      this._sortValues();
    } else {
      const correspondingOption = this._selectValue(value);
      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what option the user interacted with last.
      if (correspondingOption) {
        this._keyManager.updateActiveItem(correspondingOption);
      } else if (!this.panelOpen) {
        // Otherwise reset the highlighted option. Note that we only want to do this while
        // closed, because doing it while open can shift the user's focus unnecessarily.
        this._keyManager.updateActiveItem(-1);
      }
    }
    this.ref.markForCheck();
  }

  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectValue(value: any): NovoOption | undefined {
    const allOptions = this._getOptions();
    const correspondingOption = allOptions.find((option: NovoOption) => {
      // Skip options that are already in the model. This allows us to handle cases
      // where the same primitive value is selected multiple times.
      if (this._selectionModel.isSelected(option)) {
        return false;
      }
      return option.value != null && this.compareWith(option.value, value);
    });

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  public select(option, i, fireEvents: boolean = true) {
    console.warn('select() method is deprecated');
  }
  public clear() {
    console.warn('clear() method is deprecated');
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  handleSelection(option: NovoOption, isUserInput: boolean = false): void {
    const wasSelected = this._selectionModel.isSelected(option);
    if (option.value == null && !this._multiple) {
      option.deselect();
      this._selectionModel.clear();
      if (this.value != null) {
        this._propagateChanges(option.value);
      }
    } else {
      if (wasSelected !== option.selected) {
        option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
      }
      if (isUserInput) {
        this._keyManager.setActiveItem(option);
      }
      if (this.multiple) {
        this._sortValues();
        if (isUserInput) {
          this.focus();
        }
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
    this.stateChanges.next();
    this._watchSelectionEvents();
  }

  private _getDisplayValue(option: NovoOption): string {
    if (!option) return '';
    const toDisplay = this.displayWith ? this.displayWith(option.value) : option.viewValue;
    // Simply falling back to an empty string if the display value is falsy does not work properly.
    // The display value can also be the number zero and shouldn't fall back to an empty string.
    const displayValue = toDisplay != null ? toDisplay : '';
    return displayValue;
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  private _clearPreviousSelectedOption(skip: NovoOption) {
    this._getOptions().forEach((option) => {
      if (option !== skip && option.selected) {
        option.deselect();
      }
    });
  }

  private _watchSelectionEvents() {
    const options = this._getOptions();
    const selectionEvents = options ? merge(...options.map((option) => option.onSelectionChange)) : of();
    this._selectedOptionChanges.unsubscribe();
    this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((event: NovoOptionSelectionChange) => {
      this.onModelTouched();
      this.handleSelection(event.source, event.isUserInput);
      if (event.isUserInput && !this.multiple && this.panelOpen) {
        this.closePanel();
        this.focus();
      }
    });
  }

  /** Handles all keydown events on the select. */
  @HostListener('keydown', ['$event'])
  _handleKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }
  }

  /** Handles keyboard events while the select is closed. */
  private _handleClosedKeydown(event: KeyboardEvent): void {
    const key = event.key;
    const isArrowKey = key === Key.ArrowDown || key === Key.ArrowUp || key === Key.ArrowLeft || key === Key.ArrowRight;
    const isOpenKey = key === Key.Enter || key === Key.Space;
    const manager = this._keyManager;
    // Open the select on ALT + arrow key to match the native <select>
    if ((!manager.isTyping() && isOpenKey && !hasModifierKey(event)) || ((this.multiple || event.altKey) && isArrowKey)) {
      event.preventDefault(); // prevents the page from scrolling down when pressing space
      this.openPanel();
    }
    // Allow changing value with arrow keys.
    // else if (!this.multiple) {
    //   const previouslySelectedOption = this.selected;
    //   manager.onKeydown(event);
    //   const selectedOption = this.selected;
    // }
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = key === Key.ArrowDown || key === Key.ArrowUp;
    const isTyping = manager.isTyping();

    if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.closePanel();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (!isTyping && (key === Key.Enter || key === Key.Space) && manager.activeItem && !hasModifierKey(event)) {
      event.preventDefault();
      manager.activeItem._selectViaInteraction();
    } else if (!isTyping && this._multiple && ['a', 'A'].includes(key) && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.options.some((opt) => !opt.disabled && !opt.selected);
      this.options.forEach((option) => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;
      manager.onKeydown(event);
      if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }

  writeValue(value: any): void {
    this.value = value;
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
    if (!this.disabled) {
      this.dropdown.nativeElement.focus(options);
    }
  }

  protected _getOptions() {
    return [...(this.viewOptions || []), ...(this.contentOptions || [])];
  }

  /** Sorts the selected values in the selected based on their order in the panel. */
  private _sortValues() {
    if (this.multiple) {
      // TODO.
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;
    if (this.multiple) {
      valueToEmit = (this.selected as NovoOption[]).map((option) => option.value);
    } else {
      valueToEmit = this.selected ? (this.selected as NovoOption).value : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this.onModelChange(valueToEmit);
    this.onSelect.emit({ selected: valueToEmit });
    this.selectionChange.emit(this._makeChangeEvent(valueToEmit));
    this.ref.markForCheck();
  }

  protected _makeChangeEvent(value: any) {
    return new NovoSelectChange(this, value);
  }

  /** Scrolls the active option into view. */
  protected _scrollOptionIntoView(index: number): void {
    const options = new QueryList<NovoOption>();
    options.reset(this._getOptions());
    const labelCount = _countGroupLabelsBeforeOption(index, options, this.optionGroups);
    const itemHeight = this._getItemHeight();
    this.panel.nativeElement.scrollTop = _getOptionScrollPosition(
      (index + labelCount) * itemHeight,
      itemHeight,
      this.panel.nativeElement.scrollTop,
      this.panel.nativeElement.offsetHeight,
    );
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<NovoOption>(this._getOptions()).withTypeAhead(100).withHomeAndEnd();
    // .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this.panelOpen) {
        // Select the active item when tabbing away. This is consistent with how the native
        // select behaves. Note that we only want to do this in single selection mode.
        if (!this.multiple && this._keyManager.activeItem) {
          this._keyManager.activeItem._selectViaInteraction();
        }
        // Restore focus to the trigger before closing. Ensures that the focus
        // position won't be lost if the user got focus into the overlay.
        this.focus();
        this.closePanel();
      }
    });

    this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this.panelOpen && this.overlay) {
        this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
      } else if (!this.panelOpen && !this.multiple && this._keyManager.activeItem) {
        this._keyManager.activeItem._selectViaInteraction();
      }
    });
  }

  /**
   * Highlights the selected item. If no option is selected, it will highlight
   * the first item instead.
   */
  private _highlightCorrectOption(): void {
    if (this._keyManager) {
      if (this.empty) {
        this._keyManager.setFirstItemActive();
      } else {
        this._keyManager.setActiveItem(this._value);
      }
    }
  }

  /** Calculates the height of the select's options. */
  private _getItemHeight(): number {
    let [first] = this._getOptions();
    if (first) {
      return first._getHostElement().offsetHeight;
    }
    return 0;
  }

  // TODO: Deprecate this
  private _initLegacyOptions() {
    if (this.options && this.options.length && typeof this.options[0] === 'string') {
      this.filteredOptions = this.options.map((item) => {
        return { value: item, label: item };
      });
    } else {
      this.filteredOptions = (this.options || [])
        .filter((item) => {
          return !item.readOnly;
        })
        .map((element) => {
          return {
            ...element,
            active: false,
          };
        });
    }
  }

  /**
   * TODO: Deprecate all header methods
   */
  toggleHeader(event, forceValue: boolean = false) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    // Reverse the active property (if forceValue, use that)
    this.header = {
      open: forceValue !== undefined ? forceValue : !this.header.open,
      value: '',
      valid: true,
    };
  }

  highlight(match, query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
  }

  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  saveHeader() {
    if (this.header.value) {
      this.headerConfig.onSave(this.header.value);
      this.createdItem = this.header.value;
      this.closePanel();
    } else {
      this.header.valid = false;
    }
  }

  /** Determines the `aria-activedescendant` to be set on the host. */
  _getAriaActiveDescendant(): string | null {
    if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
      return this._keyManager.activeItem.id;
    }

    return null;
  }
}
