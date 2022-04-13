// NG2
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
// Vendor
import { merge, of, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BooleanInput } from '../../utils';
// App
import { Key } from '../../utils/key-codes';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoButtonElement } from '../button';
import {
  CanDisableCtor,
  HasOverlayCtor,
  HasTabIndexCtor,
  mixinDisabled,
  mixinOverlay,
  mixinTabIndex,
  NovoOptgroup,
  NovoOption,
  NovoOptionSelectionChange,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition,
} from '../common';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';

@Directive({
  selector: '[dropdownTrigger]',
  host: {
    class: 'novo-dropdown-trigger',
  },
})
export class NovoDropDownTrigger {
  constructor(public element: ElementRef) {}
}

// Create Base Class from Mixins
// Boilerplate for applying mixins
class NovoDropdownBase {
  constructor() {}
}
const NovoDropdowMixins: HasOverlayCtor & CanDisableCtor & HasTabIndexCtor & typeof NovoDropdownBase = mixinOverlay(
  mixinTabIndex(mixinDisabled(NovoDropdownBase), 1),
);

@Component({
  selector: 'novo-dropdown',
  template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `,
  // providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoDropdownElement }],
  host: {
    '[attr.tabIndex]': 'disabled ? -1 : 0',
  },
})
export class NovoDropdownElement extends NovoDropdowMixins implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @Input()
  parentScrollSelector: string;
  @Input()
  parentScrollAction: string = 'close';
  @Input()
  containerClass: string;
  @Input()
  side:
    | 'default'
    | 'right'
    | 'above-below'
    | 'right-above-below'
    | 'center'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right' = 'default';
  @Input()
  scrollStrategy: 'reposition' | 'block' | 'close' = 'reposition';

  /**
   * Keep dropdown open after an item is selected
   */
  @Input()
  @BooleanInput()
  keepOpen: boolean = false;

  @Input()
  height: number;
  @Input()
  width: number = -1; // Defaults to dynamic width (no hardcoded width value and no host width lookup)
  @Input()
  appendToBody: boolean = false; // Deprecated
  @Output()
  toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  @ContentChild(NovoButtonElement)
  _button: NovoButtonElement;
  @ContentChild(NovoDropDownTrigger)
  _trigger: NovoDropDownTrigger;

  @ContentChildren(NovoOptgroup, { descendants: true })
  optionGroups: QueryList<NovoOptgroup>;
  @ContentChildren(NovoOption, { descendants: true })
  options: QueryList<NovoOption>;
  @ViewChild('panel')
  panel: ElementRef;

  private clickHandler: any;
  private closeHandler: any;
  private _selectedOptionChanges = Subscription.EMPTY;
  /** The Subject to complete all subscriptions when destroyed. */
  private _onDestroy: Subject<void> = new Subject();
  /** The FocusKeyManager which handles focus. */
  private _keyManager: ActiveDescendantKeyManager<NovoOption>;

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple: boolean = false;

  get button() {
    return this._trigger || this._button;
  }

  constructor(public element: ElementRef, private ref: ChangeDetectorRef) {
    super();
    this.clickHandler = this.togglePanel.bind(this);
    this.closeHandler = this.closePanel.bind(this);
  }

  public ngOnInit(): void {
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
  }

  public ngAfterContentInit(): void {
    // Add a click handler to the button to toggle the menu
    this.button.element.nativeElement.addEventListener('click', this.clickHandler);
    this.button.element.nativeElement.tabIndex = -1;
    this.options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this._initKeyManager();
      this._watchSelectionEvents();
    });
    this._initKeyManager();
    this._watchSelectionEvents();
    this.focus();
  }

  public ngAfterViewInit(): void {
    this._watchPanelEvents();
  }

  public ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    // Remove listener
    if (this.button) {
      this.button.element.nativeElement.removeEventListener('click', this.clickHandler);
    }
  }

  focus(options?: FocusOptions): void {
    if (!this.disabled) {
      this.element.nativeElement.focus(options);
    }
  }

  public set items(items: QueryList<NovoItemElement>) {
    // this._items = items;
    // this.activeIndex = -1;
    // // Get the innerText of all the items to allow for searching
    // this._textItems = items.map((item: NovoItemElement) => {
    //   return item.element.nativeElement.innerText;
    // });
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
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = key === Key.ArrowDown || key === Key.ArrowUp;
    const isTyping = manager.isTyping();
    const isInputField = event.target;
    if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.closePanel();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (!isTyping && (key === Key.Enter || key === Key.Space) && manager.activeItem && !hasModifierKey(event)) {
      event.preventDefault();
      this._multiple ? manager.activeItem._selectViaInteraction() : manager.activeItem._clickViaInteraction();
    } else if (!isTyping && this._multiple && ['a', 'A'].includes(key) && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.options.some((opt) => !opt.disabled && !opt.selected);
      this.options.forEach((option) => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else if (Key.Escape === key) {
      this.closePanel();
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;
      manager.onKeydown(event);
      if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }

  private _watchPanelEvents() {
    const panelStateChanges = merge(this.overlay.opening, this.overlay.closing);
    panelStateChanges.pipe(takeUntil(this._onDestroy)).subscribe((event: boolean) => this.toggled.emit(event));
  }

  private _watchSelectionEvents() {
    const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
    this._selectedOptionChanges.unsubscribe();
    this._selectedOptionChanges = selectionEvents.pipe(takeUntil(this._onDestroy)).subscribe((event: NovoOptionSelectionChange) => {
      // this.handleSelection(event.source, event.isUserInput);
      if (event.isUserInput && !this.multiple) {
        this._clearPreviousSelectedOption(this._keyManager.activeItem);
        if (!this.keepOpen && this.panelOpen) {
          this.closePanel();
          this.focus();
        }
      }
    });
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

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<NovoOption>(this.options).withTypeAhead(250).withHomeAndEnd();
    // .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.tabOut.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      if (this.panelOpen) {
        // Restore focus to the trigger before closing. Ensures that the focus
        // position won't be lost if the user got focus into the overlay.
        this.focus();
        this.closePanel();
      }
    });

    this._keyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      if (this.panelOpen && this.overlay) {
        this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0);
      }
    });
  }

  /** Scrolls the active option into view. */
  protected _scrollOptionIntoView(index: number): void {
    const labelCount = _countGroupLabelsBeforeOption(index, this.options, this.optionGroups);
    const itemHeight = this._getItemHeight();
    this.panel.nativeElement.scrollTop = _getOptionScrollPosition(
      (index + labelCount) * itemHeight,
      itemHeight,
      this.panel.nativeElement.scrollTop,
      this.panel.nativeElement.offsetHeight,
    );
  }

  /** Calculates the height of the select's options. */
  private _getItemHeight(): number {
    let [first] = this.options;
    if (first) {
      return first._getHostElement().offsetHeight;
    }
    return 0;
  }
}

// Deprecated below here ---------------------------

@Component({
  selector: 'item',
  template: '<novo-option><ng-content></ng-content></novo-option>',
  host: {
    '[class.disabled]': 'disabled',
    '[class.active]': 'active',
  },
})
export class NovoItemElement {
  @Input()
  public disabled: boolean;
  @Input()
  public keepOpen: boolean = false;
  @Output()
  public action: EventEmitter<any> = new EventEmitter();

  public active: boolean = false;

  constructor(private dropdown: NovoDropdownElement, public element: ElementRef) {
    notify(`'item' element has been deprecated. Please use 'novo-option' and 'novo-optgroup'.`);
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    // Poor man's disable
    if (!this.disabled) {
      // Close if keepOpen is false
      if (!this.keepOpen) {
        this.dropdown.closePanel();
      }
      // Emit the action
      this.action.emit({ originalEvent: event });
    }
  }
}

@Component({
  selector: 'list',
  template: '<ng-content></ng-content>',
})
export class NovoDropdownListElement implements AfterContentInit {
  @ContentChildren(NovoItemElement)
  public items: QueryList<NovoItemElement>;

  constructor(private dropdown: NovoDropdownElement) {
    notify(`'list' element has been deprecated. Please use novo-option and novo-optgroup.`);
  }

  public ngAfterContentInit(): void {
    this.dropdown.items = this.items;
    this.items.changes.subscribe(() => {
      this.dropdown.items = this.items;
    });
  }
}

@Component({
  selector: 'dropdown-item-header',
  template: '<ng-content></ng-content>',
})
export class NovoDropDownItemHeaderElement {
  constructor() {
    notify(`'dropdown-item-header' element has been deprecated. Please use novo-option and novo-optgroup.`);
  }
}
