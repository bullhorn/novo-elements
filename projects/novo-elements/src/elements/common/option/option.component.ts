import { FocusableOption, FocusOptions, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { BooleanInput, Key } from '../../../utils';
import { NovoOptgroup, NovoOptgroupBase, NOVO_OPTGROUP } from './optgroup.component';
import { NovoOptionParentComponent, NOVO_OPTION_PARENT_COMPONENT } from './option-parent';

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;

/** Event object emitted by NovoOption when selected or deselected. */
export class NovoOptionSelectionChange {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: NovoOptionBase,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput = false,
  ) {}
}

@Directive()
export class NovoOptionBase implements FocusableOption, AfterViewChecked, OnDestroy {
  private _selected = false;
  private _active = false;
  private _disabled = false;
  private _mostRecentViewValue = '';
  private _clickCapture: Subscription;
  private _clickPassive: Subscription;

  /** TODO: deprecate maybe, check support for table headers */
  @BooleanInput()
  @Input()
  keepOpen: boolean = false;

  @BooleanInput()
  @Input()
  novoInert: boolean = false;

  /** If there is no parent then nothing is managing the selection. */
  get selectable() {
    return this._parent;
  }

  /** Whether the wrapping component is in multiple selection mode. */
  get multiple() {
    return this._parent && this._parent.multiple;
  }

  /** The form value of the option. */
  @Input() value: any;

  /** The unique ID of the option. */
  @Input() id: string = `novo-option-${_uniqueIdCounter++}`;

  /** Whether the option is disabled. */
  @Input()
  get disabled() {
    return (this.group && this.group.disabled) || this._disabled;
  }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Input()
  get selected() {
    return this._selected;
  }
  set selected(value: any) {
    this._selected = coerceBooleanProperty(value);
  }

  /** Event emitted when the option is selected or deselected. */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() readonly onSelectionChange = new EventEmitter<NovoOptionSelectionChange>();

  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  constructor(
    private _element: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(NOVO_OPTION_PARENT_COMPONENT) private _parent: NovoOptionParentComponent,
    @Optional() @Inject(NOVO_OPTGROUP) readonly group: NovoOptgroupBase,
  ) {
    // (click) is overridden when defined by user.
    this._clickCapture = fromEvent<MouseEvent>(this._element.nativeElement, 'click', { capture: true }).subscribe((evt: MouseEvent) => {
      this._handleDisabledClick(evt);
    });
    this._clickPassive = fromEvent<MouseEvent>(this._element.nativeElement, 'click').subscribe((evt: MouseEvent) => {
      setTimeout(() => this._handlePassiveClick(evt));
    });
  }

  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  get active(): boolean {
    return this._active;
  }

  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  get viewValue(): string {
    return (this._getHostElement().textContent || '').trim();
  }

  /** Selects the option. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      // this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      // this._emitSelectionChangeEvent();
    }
  }

  /** Sets focus onto this option. */
  focus(_origin?: FocusOrigin, options?: FocusOptions): void {
    // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
    // use `NovoOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
    const element = this._getHostElement();

    if (typeof element.focus === 'function') {
      element.focus(options);
    }
  }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles(): void {
    if (!this._active) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this.viewValue;
  }

  _handleDisabledClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }
  _handlePassiveClick(event: MouseEvent) {
    if (!this.novoInert) {
      this._selectViaInteraction();
    }
  }

  /** Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if (event.target instanceof HTMLInputElement && event.key === Key.Enter) {
      this._emitSelectionChangeEvent(!this.keepOpen);
    } else if (
      !(event.target instanceof HTMLInputElement) &&
      (event.key === Key.Enter || event.key === Key.Space) &&
      !hasModifierKey(event)
    ) {
      this._selectViaInteraction();
      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(!this.keepOpen);
    }
  }

  /**
   * Force a click event
   */
  _clickViaInteraction(): void {
    if (!this.disabled) {
      this._element.nativeElement.click();
    }
  }

  /**
   * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
   * attribute from single-selection, unselected options. Including the `aria-selected="false"`
   * attributes adds a significant amount of noise to screen-reader users without providing useful
   * information.
   */
  _getAriaSelected(): boolean | null {
    return this.selected || (this.multiple ? false : null);
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  /** Gets the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  ngAfterViewChecked() {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `novo-select`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    if (this._selected) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }
    }
  }

  ngOnDestroy() {
    this._stateChanges.complete();
    this._clickCapture.unsubscribe();
    this._clickPassive.unsubscribe();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit(new NovoOptionSelectionChange(this, isUserInput));
  }
}

/**
 * Single option inside of a `<novo-select>` element.
 */
@Component({
  selector: 'novo-option',
  exportAs: 'novoOption',
  host: {
    role: 'option',
    '[id]': 'id',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-selected]': '_getAriaSelected()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[class.novo-active]': 'active',
    '[class.novo-selected]': 'selectable && selected',
    '[class.novo-option-multiple]': 'multiple',
    '[class.novo-option-disabled]': 'disabled',
    '[class.novo-option-inert]': 'novoInert',
    '(keydown)': '_handleKeydown($event)',
    class: 'novo-option novo-focus-indicator',
  },
  inputs: ['selected', 'keepOpen', 'novoInert', 'value', 'disabled'],
  styleUrls: ['option.component.scss'],
  templateUrl: 'option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoOption extends NovoOptionBase {
  constructor(
    element: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(NOVO_OPTION_PARENT_COMPONENT) parent: NovoOptionParentComponent,
    @Optional() @Inject(NOVO_OPTGROUP) group: NovoOptgroup,
  ) {
    super(element, changeDetectorRef, parent, group);
  }
}

/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
export function _countGroupLabelsBeforeOption(
  optionIndex: number,
  options: QueryList<NovoOption>,
  optionGroups: QueryList<NovoOptgroup>,
): number {
  if (optionGroups.length) {
    let optionsArray = options.toArray();
    let groups = optionGroups.toArray();
    let groupCounter = 0;

    for (let i = 0; i < optionIndex + 1; i++) {
      if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
        groupCounter++;
      }
    }

    return groupCounter;
  }

  return 0;
}

/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function _getOptionScrollPosition(
  optionOffset: number,
  optionHeight: number,
  currentScrollPosition: number,
  panelHeight: number,
): number {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
}
