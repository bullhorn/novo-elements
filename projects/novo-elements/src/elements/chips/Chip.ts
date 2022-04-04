import { FocusableOption } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  Attribute,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Key } from '../../utils';
import { CanColor, CanColorCtor, CanSizeCtor, HasTabIndex, HasTabIndexCtor, mixinColor, mixinSize, mixinTabIndex } from '../common';

export interface IRemovable {
  remove: () => void;
  removable: boolean;
  disabled: boolean;
}

export const REMOVABLE_REF: InjectionToken<IRemovable> = new InjectionToken<IRemovable>('REMOVABLE_REF');

/** Represents an event fired on an individual `novo-chip`. */
export interface NovoChipEvent {
  /** The chip the event was fired on. */
  chip: NovoChipElement;
}

/** Event object emitted by NovoChip when selected or deselected. */
export class NovoChipSelectionChange {
  constructor(
    /** Reference to the chip that emitted the event. */
    public source: NovoChipElement,
    /** Whether the chip that emitted the event is selected. */
    public selected: boolean,
    /** Whether the selection change was a result of a user interaction. */
    public isUserInput = false,
  ) {}
}

// Boilerplate for applying mixins to NovoChipElement.
/** @docs-private */
class NovoChipBase {
  // abstract disabled: boolean;
  constructor(public _elementRef: ElementRef) {}
}

const NovoChipMixinBase: CanSizeCtor & CanColorCtor & HasTabIndexCtor & typeof NovoChipBase = mixinSize(
  mixinTabIndex(mixinColor(NovoChipBase, null), -1),
  'md',
);

/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
@Directive({
  selector: 'novo-chip-avatar, [novoChipAvatar]',
  host: { class: 'novo-chip-avatar' },
})
export class NovoChipAvatar {}

/**
 * Applies proper (click) support and adds styling for use with Bullhorn's "x" icon *
 * Example:
 *
 *     `<novo-chip>
 *       <novo-icon novoChipRemove>x</novo-icon>
 *     </novo-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `novo-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
@Directive({
  selector: '[novoChipRemove]',
  host: {
    class: 'novo-chip-remove',
    '(click)': '_handleClick($event)',
  },
})
export class NovoChipRemove {
  constructor(@Inject(REMOVABLE_REF) private _parentChip: IRemovable, elementRef: ElementRef<HTMLElement>) {
    if (elementRef.nativeElement.nodeName === 'BUTTON') {
      elementRef.nativeElement.setAttribute('type', 'button');
    }
  }

  /** Calls the parent chip's public `remove()` method if applicable. */
  _handleClick(event: Event): void {
    const parentChip = this._parentChip;
    if (parentChip.removable && !parentChip.disabled) {
      parentChip.remove();
    }

    // We need to stop event propagation because otherwise the event will bubble up to the
    // form field and cause the `onContainerClick` method to be invoked. This method would then
    // reset the focused chip that has been focused after chip removal. Usually the parent
    // the parent click listener of the `NovoChip` would prevent propagation, but it can happen
    // that the chip is being removed before the event bubbles up.
    event.stopPropagation();
  }
}

/**
 * Chip component. Used inside the NovoChipList component.
 */
@Component({
  selector: `novo-chip, [novo-chip]`,
  template: `<ng-content></ng-content>`,
  styleUrls: ['./Chip.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: ['color', 'tabIndex', 'size'],
  providers: [{ provide: REMOVABLE_REF, useExisting: NovoChipElement }],
  host: {
    class: 'novo-chip novo-focus-indicator',
    role: 'option',
    '[class.novo-chip-selectable]': 'selectable',
    '[class.novo-chip-selected]': 'selected',
    '[class.novo-chip-with-avatar]': 'avatar',
    '[class.novo-chip-with-trailing-icon]': 'removeIcon',
    '[class.novo-chip-disabled]': 'disabled',
    '[class._novo-animation-noopable]': '_animationsDisabled',
    '[attr.tabindex]': 'disabled ? null : tabIndex',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-selected]': 'ariaSelected',
    '(click)': '_handleClick($event)',
    // '(mouseenter)': '_handleActivate($event)',
    // '(mouseleave)': '_handleDeactivate($event)',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': 'focus()',
    '(blur)': '_blur()',
  },
})
export class NovoChipElement extends NovoChipMixinBase implements FocusableOption, OnDestroy, CanColor, HasTabIndex {
  /** Whether the chip has focus. */
  _hasFocus: boolean = false;

  /** Whether animations for the chip are enabled. */
  _animationsDisabled: boolean;

  /** Whether the chip list is selectable */
  _chipListSelectable: boolean = true;

  /** Whether the chip list is in multi-selection mode. */
  _chipListMultiple: boolean = false;

  /** Whether the chip list as a whole is disabled. */
  _chipListDisabled: boolean = false;

  /** The chip avatar */
  @ContentChild(NovoChipAvatar) avatar: NovoChipAvatar;

  /** The chip's remove toggler. */
  @ContentChild(NovoChipRemove) removeIcon: NovoChipRemove;

  @Input() type: string;
  /** Whether the chip is selected. */
  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    const coercedValue = coerceBooleanProperty(value);

    if (coercedValue !== this._selected) {
      this._selected = coercedValue;
      this._dispatchSelectionChange();
    }
  }
  protected _selected: boolean = false;

  /** The value of the chip. Defaults to the content inside `<novo-chip>` tags. */
  @Input()
  get value(): any {
    return this._value !== undefined ? this._value : this._elementRef.nativeElement.textContent;
  }
  set value(value: any) {
    this._value = value;
  }
  protected _value: any;

  /**
   * Whether or not the chip is selectable. When a chip is not selectable,
   * changes to its selected state are always ignored. By default a chip is
   * selectable, and it becomes non-selectable if its parent chip list is
   * not selectable.
   */
  @Input()
  get selectable(): boolean {
    return this._selectable && this._chipListSelectable;
  }
  set selectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);
  }
  protected _selectable: boolean = false;

  /** Whether the chip is disabled. */
  @Input()
  get disabled(): boolean {
    return this._chipListDisabled || this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  protected _disabled: boolean = false;

  /**
   * Determines whether or not the chip displays the remove styling and emits (removed) events.
   */
  @Input()
  get removable(): boolean {
    return this._removable;
  }
  set removable(value: boolean) {
    this._removable = coerceBooleanProperty(value);
  }
  protected _removable: boolean = true;

  /** Emits when the chip is focused. */
  readonly _onFocus = new Subject<NovoChipEvent>();

  /** Emits when the chip is blured. */
  readonly _onBlur = new Subject<NovoChipEvent>();

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<NovoChipSelectionChange> = new EventEmitter<NovoChipSelectionChange>();

  /** Emitted when the chip is destroyed. */
  @Output() readonly destroyed: EventEmitter<NovoChipEvent> = new EventEmitter<NovoChipEvent>();

  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<NovoChipEvent> = new EventEmitter<NovoChipEvent>();

  /** The ARIA selected applied to the chip. */
  get ariaSelected(): string | null {
    // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
    // it adds noise to NVDA users where "not selected" will be read out for each chip.
    return this.selectable && (this._chipListMultiple || this.selected) ? this.selected.toString() : null;
  }

  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
    platform: Platform,
    @Optional()
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) _document: any,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string,
    @Attribute('tabindex') tabIndex?: string,
  ) {
    super(_elementRef);
    this._animationsDisabled = animationMode === 'NoopAnimations';
    this.tabIndex = tabIndex != null ? parseInt(tabIndex, 10) || -1 : -1;
  }

  ngOnDestroy() {
    this.destroyed.emit({ chip: this });
  }

  /** Selects the chip. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._dispatchSelectionChange();
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Deselects the chip. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._dispatchSelectionChange();
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Select this chip and emit selected event */
  selectViaInteraction(): void {
    if (!this._selected) {
      this._selected = true;
      this._dispatchSelectionChange(true);
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Toggles the current selected state of this chip. */
  toggleSelected(isUserInput: boolean = false): boolean {
    this._selected = !this.selected;
    this._dispatchSelectionChange(isUserInput);
    this._changeDetectorRef.markForCheck();
    return this.selected;
  }

  /** Allows for programmatic focusing of the chip. */
  focus(): void {
    if (!this._hasFocus) {
      this._elementRef.nativeElement.focus();
      this._onFocus.next({ chip: this });
    }
    this._hasFocus = true;
  }

  /**
   * Allows for programmatic removal of the chip. Called by the NovoChipList when the DELETE or
   * BACKSPACE keys are pressed.
   *
   * Informs any listeners of the removal request. Does not remove the chip from the DOM.
   */
  remove(): void {
    if (this.removable) {
      this.removed.emit({ chip: this });
    }
  }

  /** Handles click events on the chip. */
  _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
    this.toggleSelected(true);
  }

  /** Handle custom key presses. */
  _handleKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case Key.Delete:
      case Key.Backspace:
        // If we are removable, remove the focused chip
        this.remove();
        // Always prevent so page navigation does not occur
        event.preventDefault();
        break;
      case Key.Space:
        // If we are selectable, toggle the focused chip
        if (this.selectable) {
          this.toggleSelected(true);
        }
        // Always prevent space from scrolling the page since the list has focus
        event.preventDefault();
        break;
    }
  }

  _blur(): void {
    // When animations are enabled, Angular may end up removing the chip from the DOM a little
    // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
    // that moves focus not the next item. To work around the issue, we defer marking the chip
    // as not focused until the next time the zone stabilizes.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this._ngZone.run(() => {
        this._hasFocus = false;
        this._onBlur.next({ chip: this });
      });
    });
  }

  private _dispatchSelectionChange(isUserInput = false) {
    this.selectionChange.emit({
      source: this,
      isUserInput,
      selected: this._selected,
    });
  }

  static ngAcceptInputType_selected: BooleanInput;
  static ngAcceptInputType_selectable: BooleanInput;
  static ngAcceptInputType_removable: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_tabIndex: NumberInput;
}
