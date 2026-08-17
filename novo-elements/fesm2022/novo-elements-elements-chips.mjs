import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/cdk/platform';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, Inject, EventEmitter, DOCUMENT, Output, Input, ContentChild, Optional, Attribute, ViewEncapsulation, Component, ContentChildren, Self, ChangeDetectionStrategy, forwardRef, Pipe, inject, ChangeDetectorRef, ViewContainerRef, ViewChild, NgModule } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject, merge, ReplaySubject } from 'rxjs';
import { take, takeUntil, startWith } from 'rxjs/operators';
import * as i3 from 'novo-elements/elements/common';
import { mixinSize, mixinTabIndex, mixinColor, mixinErrorState, NOVO_OPTION_PARENT_COMPONENT, NovoCommonModule, ErrorStateMatcher } from 'novo-elements/elements/common';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import * as i1$1 from '@angular/cdk/bidi';
import { SelectionModel } from '@angular/cdk/collections';
import * as i6 from 'novo-elements/elements/field';
import { NovoFieldControl, NovoFieldElement, NovoFieldModule } from 'novo-elements/elements/field';
import * as i1$2 from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import * as i4 from 'novo-elements/elements/picker';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i4$1 from 'novo-elements/elements/checkbox';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';

const REMOVABLE_REF = new InjectionToken('REMOVABLE_REF');
/** Event object emitted by NovoChip when selected or deselected. */
class NovoChipSelectionChange {
    constructor(
    /** Reference to the chip that emitted the event. */
    source, 
    /** Whether the chip that emitted the event is selected. */
    selected, 
    /** Whether the selection change was a result of a user interaction. */
    isUserInput = false) {
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
}
// Boilerplate for applying mixins to NovoChipElement.
/** @docs-private */
class NovoChipBase {
    // abstract disabled: boolean;
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const NovoChipMixinBase = mixinSize(mixinTabIndex(mixinColor(NovoChipBase, null), -1), 'md');
/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
class NovoChipAvatar {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipAvatar, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.19", type: NovoChipAvatar, isStandalone: false, selector: "novo-chip-avatar, [novoChipAvatar]", host: { classAttribute: "novo-chip-avatar" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipAvatar, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-chip-avatar, [novoChipAvatar]',
                    host: { class: 'novo-chip-avatar' },
                    standalone: false,
                }]
        }] });
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
class NovoChipRemove {
    constructor(_parentChip, elementRef) {
        this._parentChip = _parentChip;
        if (elementRef.nativeElement.nodeName === 'BUTTON') {
            elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    /** Calls the parent chip's public `remove()` method if applicable. */
    _handleClick(event) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipRemove, deps: [{ token: REMOVABLE_REF }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.19", type: NovoChipRemove, isStandalone: false, selector: "[novoChipRemove]", host: { listeners: { "click": "_handleClick($event)" }, classAttribute: "novo-chip-remove" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipRemove, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoChipRemove]',
                    host: {
                        class: 'novo-chip-remove',
                        '(click)': '_handleClick($event)',
                    },
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [REMOVABLE_REF]
                }] }, { type: i0.ElementRef }] });
/**
 * Chip component. Used inside the NovoChipList component.
 */
class NovoChipElement extends NovoChipMixinBase {
    /** Whether the chip is selected. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const coercedValue = coerceBooleanProperty(value);
        if (coercedValue !== this._selected) {
            this._selected = coercedValue;
            this._dispatchSelectionChange();
        }
    }
    /** The value of the chip. Defaults to the content inside `<novo-chip>` tags. */
    get value() {
        return this._value !== undefined ? this._value : this._elementRef.nativeElement.textContent;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Whether or not the chip is selectable. When a chip is not selectable,
     * changes to its selected state are always ignored. By default a chip is
     * selectable, and it becomes non-selectable if its parent chip list is
     * not selectable.
     */
    get selectable() {
        return this._selectable && this._chipListSelectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
    }
    /** Whether the chip is disabled. */
    get disabled() {
        return this._chipListDisabled || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     */
    get removable() {
        return this._removable;
    }
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /** The ARIA selected applied to the chip. */
    get ariaSelected() {
        // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
        // it adds noise to NVDA users where "not selected" will be read out for each chip.
        return this.selectable && (this._chipListMultiple || this.selected) ? this.selected.toString() : null;
    }
    constructor(_elementRef, _ngZone, platform, _changeDetectorRef, _document, animationMode, tabIndex) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        /** Whether the chip has focus. */
        this._hasFocus = false;
        /** Whether the chip list is selectable */
        this._chipListSelectable = true;
        /** Whether the chip list allows toggling */
        this._chipListToggleable = true;
        /** Whether the chip list is in multi-selection mode. */
        this._chipListMultiple = false;
        /** Whether the chip list as a whole is disabled. */
        this._chipListDisabled = false;
        this._selected = false;
        this._selectable = false;
        this._disabled = false;
        this._removable = true;
        /** Emits when the chip is focused. */
        this._onFocus = new Subject();
        /** Emits when the chip is blured. */
        this._onBlur = new Subject();
        /** Emitted when the chip is selected or deselected. */
        this.selectionChange = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroyed = new EventEmitter();
        /** Emitted when a chip is to be removed. */
        this.removed = new EventEmitter();
        this._animationsDisabled = animationMode === 'NoopAnimations';
        this.tabIndex = tabIndex != null ? parseInt(tabIndex, 10) || -1 : -1;
    }
    ngOnDestroy() {
        this.destroyed.emit({ chip: this });
    }
    /** Selects the chip. */
    select() {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange();
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Deselects the chip. */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._dispatchSelectionChange();
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Select this chip and emit selected event */
    selectViaInteraction() {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange(true);
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Toggles the current selected state of this chip. */
    toggleSelected(isUserInput = false) {
        this._selected = !this.selected;
        this._dispatchSelectionChange(isUserInput);
        this._changeDetectorRef.markForCheck();
        return this.selected;
    }
    /** Allows for programmatic focusing of the chip. */
    focus() {
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
    remove() {
        if (this.removable) {
            this.removed.emit({ chip: this });
        }
    }
    /** Handles click events on the chip. */
    _handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
        if (this._chipListToggleable) {
            this.toggleSelected(true);
        }
    }
    /** Handle custom key presses. */
    _handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        switch (event.key) {
            case "Delete" /* Key.Delete */:
            case "Backspace" /* Key.Backspace */:
                // If we are removable, remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case " " /* Key.Space */:
                // If we are selectable, toggle the focused chip
                if (this.selectable) {
                    this.toggleSelected(true);
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            default:
                // No default action for other keys
                break;
        }
    }
    _blur() {
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
    _dispatchSelectionChange(isUserInput = false) {
        this.selectionChange.emit({
            source: this,
            isUserInput,
            selected: this._selected,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipElement, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.Platform }, { token: i0.ChangeDetectorRef, optional: true }, { token: DOCUMENT }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoChipElement, isStandalone: false, selector: "novo-chip, [novo-chip]", inputs: { color: "color", tabIndex: "tabIndex", size: "size", type: "type", selected: "selected", value: "value", selectable: "selectable", disabled: "disabled", removable: "removable" }, outputs: { selectionChange: "selectionChange", destroyed: "destroyed", removed: "removed" }, host: { attributes: { "role": "option" }, listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)", "focus": "focus()", "blur": "_blur()" }, properties: { "class.novo-chip-selectable": "selectable", "class.novo-chip-selected": "selected", "class.novo-chip-with-avatar": "avatar", "class.novo-chip-with-trailing-icon": "removeIcon", "class.novo-chip-disabled": "disabled", "class._novo-animation-noopable": "_animationsDisabled", "attr.tabindex": "disabled ? null : tabIndex", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-selected": "ariaSelected" }, classAttribute: "novo-chip novo-focus-indicator" }, providers: [{ provide: REMOVABLE_REF, useExisting: NovoChipElement }], queries: [{ propertyName: "avatar", first: true, predicate: NovoChipAvatar, descendants: true }, { propertyName: "removeIcon", first: true, predicate: NovoChipRemove, descendants: true }], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".novo-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-appearance:none;-moz-appearance:none;display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;background:var(--background-main);border:1px solid transparent;transition:all .2s ease-in-out;display:inline-flex;align-items:center;cursor:default;gap:var(--spacing-md);border-radius:var(--size-border-radius-round);padding:var(--spacing-none) var(--spacing-md);min-height:2.4rem;height:1px;max-width:100%}.novo-chip.text-capitalize{text-transform:capitalize}.novo-chip.text-uppercase{text-transform:uppercase}.novo-chip.text-nowrap{white-space:nowrap}.novo-chip.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-chip.text-size-default{font-size:inherit}.novo-chip.text-size-body{font-size:var(--font-size-body)}.novo-chip.text-size-xs{font-size:var(--font-size-xs)}.novo-chip.text-size-sm{font-size:var(--font-size-sm)}.novo-chip.text-size-md{font-size:var(--font-size-md)}.novo-chip.text-size-lg{font-size:var(--font-size-lg)}.novo-chip.text-size-xl{font-size:var(--font-size-xl)}.novo-chip.text-size-2xl{font-size:var(--font-size-2xl)}.novo-chip.text-size-3xl{font-size:var(--font-size-3xl)}.novo-chip.text-size-smaller{font-size:.8em}.novo-chip.text-size-larger{font-size:1.2em}.novo-chip.text-color-black{color:var(--color-black)}.novo-chip.text-color-white{color:var(--color-white)}.novo-chip.text-color-gray{color:var(--color-gray)}.novo-chip.text-color-grey{color:var(--color-grey)}.novo-chip.text-color-offWhite{color:var(--color-off-white)}.novo-chip.text-color-bright{color:var(--color-bright)}.novo-chip.text-color-light{color:var(--color-light)}.novo-chip.text-color-neutral{color:var(--color-neutral)}.novo-chip.text-color-dark{color:var(--color-dark)}.novo-chip.text-color-orange{color:var(--color-orange)}.novo-chip.text-color-navigation{color:var(--color-navigation)}.novo-chip.text-color-skyBlue{color:var(--color-sky-blue)}.novo-chip.text-color-steel{color:var(--color-steel)}.novo-chip.text-color-metal{color:var(--color-metal)}.novo-chip.text-color-sand{color:var(--color-sand)}.novo-chip.text-color-silver{color:var(--color-silver)}.novo-chip.text-color-stone{color:var(--color-stone)}.novo-chip.text-color-ash{color:var(--color-ash)}.novo-chip.text-color-anonymous{color:var(--color-anonymous)}.novo-chip.text-color-slate{color:var(--color-slate)}.novo-chip.text-color-onyx{color:var(--color-onyx)}.novo-chip.text-color-charcoal{color:var(--color-charcoal)}.novo-chip.text-color-moonlight{color:var(--color-moonlight)}.novo-chip.text-color-midnight{color:var(--color-midnight)}.novo-chip.text-color-darkness{color:var(--color-darkness)}.novo-chip.text-color-navy{color:var(--color-navy)}.novo-chip.text-color-aqua{color:var(--color-aqua)}.novo-chip.text-color-ocean{color:var(--color-ocean)}.novo-chip.text-color-mint{color:var(--color-mint)}.novo-chip.text-color-grass{color:var(--color-grass)}.novo-chip.text-color-sunflower{color:var(--color-sunflower)}.novo-chip.text-color-bittersweet{color:var(--color-bittersweet)}.novo-chip.text-color-grapefruit{color:var(--color-grapefruit)}.novo-chip.text-color-carnation{color:var(--color-carnation)}.novo-chip.text-color-lavender{color:var(--color-lavender)}.novo-chip.text-color-mountain{color:var(--color-mountain)}.novo-chip.text-color-info{color:var(--color-info)}.novo-chip.text-color-positive{color:var(--color-positive)}.novo-chip.text-color-success{color:var(--color-success)}.novo-chip.text-color-negative{color:var(--color-negative)}.novo-chip.text-color-danger{color:var(--color-danger)}.novo-chip.text-color-error{color:var(--color-error)}.novo-chip.text-color-warning{color:var(--color-warning)}.novo-chip.text-color-empty{color:var(--color-empty)}.novo-chip.text-color-disabled{color:var(--color-disabled)}.novo-chip.text-color-background{color:var(--color-background)}.novo-chip.text-color-backgroundDark{color:var(--color-background-dark)}.novo-chip.text-color-border{color:var(--color-border)}.novo-chip.text-color-border2{color:var(--color-border2)}.novo-chip.text-color-text{color:var(--color-text)}.novo-chip.text-color-presentation{color:var(--color-presentation)}.novo-chip.text-color-bullhorn{color:var(--color-bullhorn)}.novo-chip.text-color-pulse{color:var(--color-pulse)}.novo-chip.text-color-fastFind{color:var(--color-fast-find)}.novo-chip.text-color-toast{color:var(--color-toast)}.novo-chip.text-color-company{color:var(--color-company)}.novo-chip.text-color-candidate{color:var(--color-candidate)}.novo-chip.text-color-lead{color:var(--color-lead)}.novo-chip.text-color-contact{color:var(--color-contact)}.novo-chip.text-color-clientcontact{color:var(--color-clientcontact)}.novo-chip.text-color-opportunity{color:var(--color-opportunity)}.novo-chip.text-color-job{color:var(--color-job)}.novo-chip.text-color-joborder{color:var(--color-joborder)}.novo-chip.text-color-submission{color:var(--color-submission)}.novo-chip.text-color-sendout{color:var(--color-sendout)}.novo-chip.text-color-placement{color:var(--color-placement)}.novo-chip.text-color-note{color:var(--color-note)}.novo-chip.text-color-contract{color:var(--color-contract)}.novo-chip.text-color-task{color:var(--color-task)}.novo-chip.text-color-jobCode{color:var(--color-job-code)}.novo-chip.text-color-earnCode{color:var(--color-earn-code)}.novo-chip.text-color-invoiceStatement{color:var(--color-invoice-statement)}.novo-chip.text-color-billableCharge{color:var(--color-billable-charge)}.novo-chip.text-color-payableCharge{color:var(--color-payable-charge)}.novo-chip.text-color-user{color:var(--color-user)}.novo-chip.text-color-corporateUser{color:var(--color-corporate-user)}.novo-chip.text-color-distributionList{color:var(--color-distribution-list)}.novo-chip.text-color-credential{color:var(--color-credential)}.novo-chip.text-color-person{color:var(--color-person)}.novo-chip.margin-before{margin-top:.4rem}.novo-chip.margin-after{margin-bottom:.8rem}.novo-chip.text-length-small{max-width:40ch}.novo-chip.text-length-medium{max-width:55ch}.novo-chip.text-length-large{max-width:70ch}.novo-chip.text-weight-hairline{font-weight:var(--font-weight-hairline)}.novo-chip.text-weight-thin{font-weight:var(--font-weight-thin)}.novo-chip.text-weight-light{font-weight:var(--font-weight-light)}.novo-chip.text-weight-normal{font-weight:var(--font-weight-normal)}.novo-chip.text-weight-medium{font-weight:var(--font-weight-medium)}.novo-chip.text-weight-semibold{font-weight:var(--font-weight-semibold)}.novo-chip.text-weight-bold{font-weight:var(--font-weight-bold)}.novo-chip.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}.novo-chip.text-weight-heavy{font-weight:var(--font-weight-heavy)}.novo-chip.text-weight-lighter{font-weight:lighter}.novo-chip.text-weight-bolder{font-weight:bolder}.novo-chip.novo-chip-selectable{color:var(--selection)}.novo-chip.novo-chip-selectable:after{inset:0;position:absolute;border-radius:inherit;opacity:0;background-color:#000;content:\"\";pointer-events:none;transition:opacity .2s ease-in-out}.novo-chip.novo-chip-selectable:focus{outline:none;border:var(--border-width-thin) solid var(--selection)}.novo-chip.novo-chip-selectable:focus:after{opacity:.16}.novo-chip.novo-chip-selectable:hover{border:var(--border-width-thin) solid var(--selection)}.novo-chip.novo-chip-disabled{color:var(--text-main);opacity:.7;pointer-events:none}.novo-chip.novo-chip-disabled:after{opacity:0}.novo-chip.novo-chip-disabled .novo-chip-remove,.novo-chip.novo-chip-disabled .novo-chip-trailing-icon{cursor:default}.novo-chip .novo-chip-avatar::not(novo-icon){width:24px;height:24px}.novo-chip .novo-chip-avatar{margin-right:0rem;margin-left:0rem}.novo-chip .novo-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover;flex-shrink:0}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{margin-left:0rem;margin-right:0}.novo-chip .novo-chip-remove{color:var(--color-light)}.novo-chip:not(.novo-chip-disabled) .novo-chip-remove:hover{color:hsl(from var(--color-light) h s calc(l - 30))}.novo-chip.novo-size-xs{font-size:.8rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-xs);min-height:1.6rem;gap:var(--spacing-xs)}.novo-chip.novo-size-xs.novo-chip-with-avatar{padding-left:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs .novo-text{font-size:inherit}.novo-chip.novo-size-sm{font-size:1rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-sm);min-height:2rem;gap:var(--spacing-sm)}.novo-chip.novo-size-sm.novo-chip-with-avatar{padding-left:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm .novo-text{font-size:inherit}.novo-chip.novo-size-md{font-size:1.2rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-md);min-height:2.8rem;gap:var(--spacing-md)}.novo-chip.novo-size-md.novo-chip-with-avatar{padding-left:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md .novo-text{font-size:inherit}.novo-chip.novo-size-lg{font-size:1.4rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-lg);min-height:3.2rem;gap:var(--spacing-lg)}.novo-chip.novo-size-lg.novo-chip-with-avatar{padding-left:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg .novo-text{font-size:inherit}.novo-chip.novo-size-xl{font-size:1.8rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-xl);min-height:3.6rem;gap:var(--spacing-xl)}.novo-chip.novo-size-xl.novo-chip-with-avatar{padding-left:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl .novo-text{font-size:inherit}.novo-chip.novo-color-border-default>*{color:inherit}.novo-chip.novo-accent-border-default{border:1px solid}.novo-chip.novo-color-black{color:var(--color-contrast-black);background:var(--color-black)}.novo-chip.novo-color-black>*{color:inherit}.novo-chip.novo-accent-black{border:1px solid var(--color-black);color:var(--color-black)}.novo-chip.novo-color-white{color:var(--color-contrast-white);background:var(--color-white)}.novo-chip.novo-color-white>*{color:inherit}.novo-chip.novo-accent-white{border:1px solid var(--color-white);color:var(--color-white)}.novo-chip.novo-color-gray{color:var(--color-contrast-gray);background:var(--color-gray)}.novo-chip.novo-color-gray>*{color:inherit}.novo-chip.novo-accent-gray{border:1px solid var(--color-gray);color:var(--color-gray)}.novo-chip.novo-color-grey{color:var(--color-contrast-grey);background:var(--color-grey)}.novo-chip.novo-color-grey>*{color:inherit}.novo-chip.novo-accent-grey{border:1px solid var(--color-grey);color:var(--color-grey)}.novo-chip.novo-color-offWhite{color:var(--color-contrast-off-white);background:var(--color-off-white)}.novo-chip.novo-color-offWhite>*{color:inherit}.novo-chip.novo-accent-offWhite{border:1px solid var(--color-off-white);color:var(--color-off-white)}.novo-chip.novo-color-bright{color:var(--color-contrast-bright);background:var(--color-bright)}.novo-chip.novo-color-bright>*{color:inherit}.novo-chip.novo-accent-bright{border:1px solid var(--color-bright);color:var(--color-bright)}.novo-chip.novo-color-light{color:var(--color-contrast-light);background:var(--color-light)}.novo-chip.novo-color-light>*{color:inherit}.novo-chip.novo-accent-light{border:1px solid var(--color-light);color:var(--color-light)}.novo-chip.novo-color-neutral{color:var(--color-contrast-neutral);background:var(--color-neutral)}.novo-chip.novo-color-neutral>*{color:inherit}.novo-chip.novo-accent-neutral{border:1px solid var(--color-neutral);color:var(--color-neutral)}.novo-chip.novo-color-dark{color:var(--color-contrast-dark);background:var(--color-dark)}.novo-chip.novo-color-dark>*{color:inherit}.novo-chip.novo-accent-dark{border:1px solid var(--color-dark);color:var(--color-dark)}.novo-chip.novo-color-orange{color:var(--color-contrast-orange);background:var(--color-orange)}.novo-chip.novo-color-orange>*{color:inherit}.novo-chip.novo-accent-orange{border:1px solid var(--color-orange);color:var(--color-orange)}.novo-chip.novo-color-navigation{color:var(--color-contrast-navigation);background:var(--color-navigation)}.novo-chip.novo-color-navigation>*{color:inherit}.novo-chip.novo-accent-navigation{border:1px solid var(--color-navigation);color:var(--color-navigation)}.novo-chip.novo-color-skyBlue{color:var(--color-contrast-sky-blue);background:var(--color-sky-blue)}.novo-chip.novo-color-skyBlue>*{color:inherit}.novo-chip.novo-accent-skyBlue{border:1px solid var(--color-sky-blue);color:var(--color-sky-blue)}.novo-chip.novo-color-steel{color:var(--color-contrast-steel);background:var(--color-steel)}.novo-chip.novo-color-steel>*{color:inherit}.novo-chip.novo-accent-steel{border:1px solid var(--color-steel);color:var(--color-steel)}.novo-chip.novo-color-metal{color:var(--color-contrast-metal);background:var(--color-metal)}.novo-chip.novo-color-metal>*{color:inherit}.novo-chip.novo-accent-metal{border:1px solid var(--color-metal);color:var(--color-metal)}.novo-chip.novo-color-sand{color:var(--color-contrast-sand);background:var(--color-sand)}.novo-chip.novo-color-sand>*{color:inherit}.novo-chip.novo-accent-sand{border:1px solid var(--color-sand);color:var(--color-sand)}.novo-chip.novo-color-silver{color:var(--color-contrast-silver);background:var(--color-silver)}.novo-chip.novo-color-silver>*{color:inherit}.novo-chip.novo-accent-silver{border:1px solid var(--color-silver);color:var(--color-silver)}.novo-chip.novo-color-stone{color:var(--color-contrast-stone);background:var(--color-stone)}.novo-chip.novo-color-stone>*{color:inherit}.novo-chip.novo-accent-stone{border:1px solid var(--color-stone);color:var(--color-stone)}.novo-chip.novo-color-ash{color:var(--color-contrast-ash);background:var(--color-ash)}.novo-chip.novo-color-ash>*{color:inherit}.novo-chip.novo-accent-ash{border:1px solid var(--color-ash);color:var(--color-ash)}.novo-chip.novo-color-anonymous{color:var(--color-contrast-anonymous);background:var(--color-anonymous)}.novo-chip.novo-color-anonymous>*{color:inherit}.novo-chip.novo-accent-anonymous{border:1px solid var(--color-anonymous);color:var(--color-anonymous)}.novo-chip.novo-color-slate{color:var(--color-contrast-slate);background:var(--color-slate)}.novo-chip.novo-color-slate>*{color:inherit}.novo-chip.novo-accent-slate{border:1px solid var(--color-slate);color:var(--color-slate)}.novo-chip.novo-color-onyx{color:var(--color-contrast-onyx);background:var(--color-onyx)}.novo-chip.novo-color-onyx>*{color:inherit}.novo-chip.novo-accent-onyx{border:1px solid var(--color-onyx);color:var(--color-onyx)}.novo-chip.novo-color-charcoal{color:var(--color-contrast-charcoal);background:var(--color-charcoal)}.novo-chip.novo-color-charcoal>*{color:inherit}.novo-chip.novo-accent-charcoal{border:1px solid var(--color-charcoal);color:var(--color-charcoal)}.novo-chip.novo-color-moonlight{color:var(--color-contrast-moonlight);background:var(--color-moonlight)}.novo-chip.novo-color-moonlight>*{color:inherit}.novo-chip.novo-accent-moonlight{border:1px solid var(--color-moonlight);color:var(--color-moonlight)}.novo-chip.novo-color-midnight{color:var(--color-contrast-midnight);background:var(--color-midnight)}.novo-chip.novo-color-midnight>*{color:inherit}.novo-chip.novo-accent-midnight{border:1px solid var(--color-midnight);color:var(--color-midnight)}.novo-chip.novo-color-darkness{color:var(--color-contrast-darkness);background:var(--color-darkness)}.novo-chip.novo-color-darkness>*{color:inherit}.novo-chip.novo-accent-darkness{border:1px solid var(--color-darkness);color:var(--color-darkness)}.novo-chip.novo-color-navy{color:var(--color-contrast-navy);background:var(--color-navy)}.novo-chip.novo-color-navy>*{color:inherit}.novo-chip.novo-accent-navy{border:1px solid var(--color-navy);color:var(--color-navy)}.novo-chip.novo-color-aqua{color:var(--color-contrast-aqua);background:var(--color-aqua)}.novo-chip.novo-color-aqua>*{color:inherit}.novo-chip.novo-accent-aqua{border:1px solid var(--color-aqua);color:var(--color-aqua)}.novo-chip.novo-color-ocean{color:var(--color-contrast-ocean);background:var(--color-ocean)}.novo-chip.novo-color-ocean>*{color:inherit}.novo-chip.novo-accent-ocean{border:1px solid var(--color-ocean);color:var(--color-ocean)}.novo-chip.novo-color-mint{color:var(--color-contrast-mint);background:var(--color-mint)}.novo-chip.novo-color-mint>*{color:inherit}.novo-chip.novo-accent-mint{border:1px solid var(--color-mint);color:var(--color-mint)}.novo-chip.novo-color-grass{color:var(--color-contrast-grass);background:var(--color-grass)}.novo-chip.novo-color-grass>*{color:inherit}.novo-chip.novo-accent-grass{border:1px solid var(--color-grass);color:var(--color-grass)}.novo-chip.novo-color-sunflower{color:var(--color-contrast-sunflower);background:var(--color-sunflower)}.novo-chip.novo-color-sunflower>*{color:inherit}.novo-chip.novo-accent-sunflower{border:1px solid var(--color-sunflower);color:var(--color-sunflower)}.novo-chip.novo-color-bittersweet{color:var(--color-contrast-bittersweet);background:var(--color-bittersweet)}.novo-chip.novo-color-bittersweet>*{color:inherit}.novo-chip.novo-accent-bittersweet{border:1px solid var(--color-bittersweet);color:var(--color-bittersweet)}.novo-chip.novo-color-grapefruit{color:var(--color-contrast-grapefruit);background:var(--color-grapefruit)}.novo-chip.novo-color-grapefruit>*{color:inherit}.novo-chip.novo-accent-grapefruit{border:1px solid var(--color-grapefruit);color:var(--color-grapefruit)}.novo-chip.novo-color-carnation{color:var(--color-contrast-carnation);background:var(--color-carnation)}.novo-chip.novo-color-carnation>*{color:inherit}.novo-chip.novo-accent-carnation{border:1px solid var(--color-carnation);color:var(--color-carnation)}.novo-chip.novo-color-lavender{color:var(--color-contrast-lavender);background:var(--color-lavender)}.novo-chip.novo-color-lavender>*{color:inherit}.novo-chip.novo-accent-lavender{border:1px solid var(--color-lavender);color:var(--color-lavender)}.novo-chip.novo-color-mountain{color:var(--color-contrast-mountain);background:var(--color-mountain)}.novo-chip.novo-color-mountain>*{color:inherit}.novo-chip.novo-accent-mountain{border:1px solid var(--color-mountain);color:var(--color-mountain)}.novo-chip.novo-color-info{color:var(--color-contrast-info);background:var(--color-info)}.novo-chip.novo-color-info>*{color:inherit}.novo-chip.novo-accent-info{border:1px solid var(--color-info);color:var(--color-info)}.novo-chip.novo-color-positive{color:var(--color-contrast-positive);background:var(--color-positive)}.novo-chip.novo-color-positive>*{color:inherit}.novo-chip.novo-accent-positive{border:1px solid var(--color-positive);color:var(--color-positive)}.novo-chip.novo-color-success{color:var(--color-contrast-success);background:var(--color-success)}.novo-chip.novo-color-success>*{color:inherit}.novo-chip.novo-accent-success{border:1px solid var(--color-success);color:var(--color-success)}.novo-chip.novo-color-negative{color:var(--color-contrast-negative);background:var(--color-negative)}.novo-chip.novo-color-negative>*{color:inherit}.novo-chip.novo-accent-negative{border:1px solid var(--color-negative);color:var(--color-negative)}.novo-chip.novo-color-danger{color:var(--color-contrast-danger);background:var(--color-danger)}.novo-chip.novo-color-danger>*{color:inherit}.novo-chip.novo-accent-danger{border:1px solid var(--color-danger);color:var(--color-danger)}.novo-chip.novo-color-error{color:var(--color-contrast-error);background:var(--color-error)}.novo-chip.novo-color-error>*{color:inherit}.novo-chip.novo-accent-error{border:1px solid var(--color-error);color:var(--color-error)}.novo-chip.novo-color-warning{color:var(--color-contrast-warning);background:var(--color-warning)}.novo-chip.novo-color-warning>*{color:inherit}.novo-chip.novo-accent-warning{border:1px solid var(--color-warning);color:var(--color-warning)}.novo-chip.novo-color-empty{color:var(--color-contrast-empty);background:var(--color-empty)}.novo-chip.novo-color-empty>*{color:inherit}.novo-chip.novo-accent-empty{border:1px solid var(--color-empty);color:var(--color-empty)}.novo-chip.novo-color-disabled{color:var(--color-contrast-disabled);background:var(--color-disabled)}.novo-chip.novo-color-disabled>*{color:inherit}.novo-chip.novo-accent-disabled{border:1px solid var(--color-disabled);color:var(--color-disabled)}.novo-chip.novo-color-background{color:var(--color-contrast-background);background:var(--color-background)}.novo-chip.novo-color-background>*{color:inherit}.novo-chip.novo-accent-background{border:1px solid var(--color-background);color:var(--color-background)}.novo-chip.novo-color-backgroundDark{color:var(--color-contrast-background-dark);background:var(--color-background-dark)}.novo-chip.novo-color-backgroundDark>*{color:inherit}.novo-chip.novo-accent-backgroundDark{border:1px solid var(--color-background-dark);color:var(--color-background-dark)}.novo-chip.novo-color-border{color:var(--color-contrast-border);background:var(--color-border)}.novo-chip.novo-color-border>*{color:inherit}.novo-chip.novo-accent-border{border:1px solid var(--color-border);color:var(--color-border)}.novo-chip.novo-color-border2{color:var(--color-contrast-border2);background:var(--color-border2)}.novo-chip.novo-color-border2>*{color:inherit}.novo-chip.novo-accent-border2{border:1px solid var(--color-border2);color:var(--color-border2)}.novo-chip.novo-color-text{color:var(--color-contrast-text);background:var(--color-text)}.novo-chip.novo-color-text>*{color:inherit}.novo-chip.novo-accent-text{border:1px solid var(--color-text);color:var(--color-text)}.novo-chip.novo-color-presentation{color:var(--color-contrast-presentation);background:var(--color-presentation)}.novo-chip.novo-color-presentation>*{color:inherit}.novo-chip.novo-accent-presentation{border:1px solid var(--color-presentation);color:var(--color-presentation)}.novo-chip.novo-color-bullhorn{color:var(--color-contrast-bullhorn);background:var(--color-bullhorn)}.novo-chip.novo-color-bullhorn>*{color:inherit}.novo-chip.novo-accent-bullhorn{border:1px solid var(--color-bullhorn);color:var(--color-bullhorn)}.novo-chip.novo-color-pulse{color:var(--color-contrast-pulse);background:var(--color-pulse)}.novo-chip.novo-color-pulse>*{color:inherit}.novo-chip.novo-accent-pulse{border:1px solid var(--color-pulse);color:var(--color-pulse)}.novo-chip.novo-color-fastFind{color:var(--color-contrast-fast-find);background:var(--color-fast-find)}.novo-chip.novo-color-fastFind>*{color:inherit}.novo-chip.novo-accent-fastFind{border:1px solid var(--color-fast-find);color:var(--color-fast-find)}.novo-chip.novo-color-toast{color:var(--color-contrast-toast);background:var(--color-toast)}.novo-chip.novo-color-toast>*{color:inherit}.novo-chip.novo-accent-toast{border:1px solid var(--color-toast);color:var(--color-toast)}.novo-chip.novo-color-company{color:var(--color-contrast-company);background:var(--color-company)}.novo-chip.novo-color-company>*{color:inherit}.novo-chip.novo-accent-company{border:1px solid var(--color-company);color:var(--color-company)}.novo-chip.novo-color-candidate{color:var(--color-contrast-candidate);background:var(--color-candidate)}.novo-chip.novo-color-candidate>*{color:inherit}.novo-chip.novo-accent-candidate{border:1px solid var(--color-candidate);color:var(--color-candidate)}.novo-chip.novo-color-lead{color:var(--color-contrast-lead);background:var(--color-lead)}.novo-chip.novo-color-lead>*{color:inherit}.novo-chip.novo-accent-lead{border:1px solid var(--color-lead);color:var(--color-lead)}.novo-chip.novo-color-contact{color:var(--color-contrast-contact);background:var(--color-contact)}.novo-chip.novo-color-contact>*{color:inherit}.novo-chip.novo-accent-contact{border:1px solid var(--color-contact);color:var(--color-contact)}.novo-chip.novo-color-clientcontact{color:var(--color-contrast-clientcontact);background:var(--color-clientcontact)}.novo-chip.novo-color-clientcontact>*{color:inherit}.novo-chip.novo-accent-clientcontact{border:1px solid var(--color-clientcontact);color:var(--color-clientcontact)}.novo-chip.novo-color-opportunity{color:var(--color-contrast-opportunity);background:var(--color-opportunity)}.novo-chip.novo-color-opportunity>*{color:inherit}.novo-chip.novo-accent-opportunity{border:1px solid var(--color-opportunity);color:var(--color-opportunity)}.novo-chip.novo-color-job{color:var(--color-contrast-job);background:var(--color-job)}.novo-chip.novo-color-job>*{color:inherit}.novo-chip.novo-accent-job{border:1px solid var(--color-job);color:var(--color-job)}.novo-chip.novo-color-joborder{color:var(--color-contrast-joborder);background:var(--color-joborder)}.novo-chip.novo-color-joborder>*{color:inherit}.novo-chip.novo-accent-joborder{border:1px solid var(--color-joborder);color:var(--color-joborder)}.novo-chip.novo-color-submission{color:var(--color-contrast-submission);background:var(--color-submission)}.novo-chip.novo-color-submission>*{color:inherit}.novo-chip.novo-accent-submission{border:1px solid var(--color-submission);color:var(--color-submission)}.novo-chip.novo-color-sendout{color:var(--color-contrast-sendout);background:var(--color-sendout)}.novo-chip.novo-color-sendout>*{color:inherit}.novo-chip.novo-accent-sendout{border:1px solid var(--color-sendout);color:var(--color-sendout)}.novo-chip.novo-color-placement{color:var(--color-contrast-placement);background:var(--color-placement)}.novo-chip.novo-color-placement>*{color:inherit}.novo-chip.novo-accent-placement{border:1px solid var(--color-placement);color:var(--color-placement)}.novo-chip.novo-color-note{color:var(--color-contrast-note);background:var(--color-note)}.novo-chip.novo-color-note>*{color:inherit}.novo-chip.novo-accent-note{border:1px solid var(--color-note);color:var(--color-note)}.novo-chip.novo-color-contract{color:var(--color-contrast-contract);background:var(--color-contract)}.novo-chip.novo-color-contract>*{color:inherit}.novo-chip.novo-accent-contract{border:1px solid var(--color-contract);color:var(--color-contract)}.novo-chip.novo-color-task{color:var(--color-contrast-task);background:var(--color-task)}.novo-chip.novo-color-task>*{color:inherit}.novo-chip.novo-accent-task{border:1px solid var(--color-task);color:var(--color-task)}.novo-chip.novo-color-jobCode{color:var(--color-contrast-job-code);background:var(--color-job-code)}.novo-chip.novo-color-jobCode>*{color:inherit}.novo-chip.novo-accent-jobCode{border:1px solid var(--color-job-code);color:var(--color-job-code)}.novo-chip.novo-color-earnCode{color:var(--color-contrast-earn-code);background:var(--color-earn-code)}.novo-chip.novo-color-earnCode>*{color:inherit}.novo-chip.novo-accent-earnCode{border:1px solid var(--color-earn-code);color:var(--color-earn-code)}.novo-chip.novo-color-invoiceStatement{color:var(--color-contrast-invoice-statement);background:var(--color-invoice-statement)}.novo-chip.novo-color-invoiceStatement>*{color:inherit}.novo-chip.novo-accent-invoiceStatement{border:1px solid var(--color-invoice-statement);color:var(--color-invoice-statement)}.novo-chip.novo-color-billableCharge{color:var(--color-contrast-billable-charge);background:var(--color-billable-charge)}.novo-chip.novo-color-billableCharge>*{color:inherit}.novo-chip.novo-accent-billableCharge{border:1px solid var(--color-billable-charge);color:var(--color-billable-charge)}.novo-chip.novo-color-payableCharge{color:var(--color-contrast-payable-charge);background:var(--color-payable-charge)}.novo-chip.novo-color-payableCharge>*{color:inherit}.novo-chip.novo-accent-payableCharge{border:1px solid var(--color-payable-charge);color:var(--color-payable-charge)}.novo-chip.novo-color-user{color:var(--color-contrast-user);background:var(--color-user)}.novo-chip.novo-color-user>*{color:inherit}.novo-chip.novo-accent-user{border:1px solid var(--color-user);color:var(--color-user)}.novo-chip.novo-color-corporateUser{color:var(--color-contrast-corporate-user);background:var(--color-corporate-user)}.novo-chip.novo-color-corporateUser>*{color:inherit}.novo-chip.novo-accent-corporateUser{border:1px solid var(--color-corporate-user);color:var(--color-corporate-user)}.novo-chip.novo-color-distributionList{color:var(--color-contrast-distribution-list);background:var(--color-distribution-list)}.novo-chip.novo-color-distributionList>*{color:inherit}.novo-chip.novo-accent-distributionList{border:1px solid var(--color-distribution-list);color:var(--color-distribution-list)}.novo-chip.novo-color-credential{color:var(--color-contrast-credential);background:var(--color-credential)}.novo-chip.novo-color-credential>*{color:inherit}.novo-chip.novo-accent-credential{border:1px solid var(--color-credential);color:var(--color-credential)}.novo-chip.novo-color-person{color:var(--color-contrast-person);background:var(--color-person)}.novo-chip.novo-color-person>*{color:inherit}.novo-chip.novo-accent-person{border:1px solid var(--color-person);color:var(--color-person)}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-chip, [novo-chip]', template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, inputs: ['color', 'tabIndex', 'size'], providers: [{ provide: REMOVABLE_REF, useExisting: NovoChipElement }], host: {
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
                    }, standalone: false, styles: [".novo-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-webkit-appearance:none;-moz-appearance:none;display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;background:var(--background-main);border:1px solid transparent;transition:all .2s ease-in-out;display:inline-flex;align-items:center;cursor:default;gap:var(--spacing-md);border-radius:var(--size-border-radius-round);padding:var(--spacing-none) var(--spacing-md);min-height:2.4rem;height:1px;max-width:100%}.novo-chip.text-capitalize{text-transform:capitalize}.novo-chip.text-uppercase{text-transform:uppercase}.novo-chip.text-nowrap{white-space:nowrap}.novo-chip.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-chip.text-size-default{font-size:inherit}.novo-chip.text-size-body{font-size:var(--font-size-body)}.novo-chip.text-size-xs{font-size:var(--font-size-xs)}.novo-chip.text-size-sm{font-size:var(--font-size-sm)}.novo-chip.text-size-md{font-size:var(--font-size-md)}.novo-chip.text-size-lg{font-size:var(--font-size-lg)}.novo-chip.text-size-xl{font-size:var(--font-size-xl)}.novo-chip.text-size-2xl{font-size:var(--font-size-2xl)}.novo-chip.text-size-3xl{font-size:var(--font-size-3xl)}.novo-chip.text-size-smaller{font-size:.8em}.novo-chip.text-size-larger{font-size:1.2em}.novo-chip.text-color-black{color:var(--color-black)}.novo-chip.text-color-white{color:var(--color-white)}.novo-chip.text-color-gray{color:var(--color-gray)}.novo-chip.text-color-grey{color:var(--color-grey)}.novo-chip.text-color-offWhite{color:var(--color-off-white)}.novo-chip.text-color-bright{color:var(--color-bright)}.novo-chip.text-color-light{color:var(--color-light)}.novo-chip.text-color-neutral{color:var(--color-neutral)}.novo-chip.text-color-dark{color:var(--color-dark)}.novo-chip.text-color-orange{color:var(--color-orange)}.novo-chip.text-color-navigation{color:var(--color-navigation)}.novo-chip.text-color-skyBlue{color:var(--color-sky-blue)}.novo-chip.text-color-steel{color:var(--color-steel)}.novo-chip.text-color-metal{color:var(--color-metal)}.novo-chip.text-color-sand{color:var(--color-sand)}.novo-chip.text-color-silver{color:var(--color-silver)}.novo-chip.text-color-stone{color:var(--color-stone)}.novo-chip.text-color-ash{color:var(--color-ash)}.novo-chip.text-color-anonymous{color:var(--color-anonymous)}.novo-chip.text-color-slate{color:var(--color-slate)}.novo-chip.text-color-onyx{color:var(--color-onyx)}.novo-chip.text-color-charcoal{color:var(--color-charcoal)}.novo-chip.text-color-moonlight{color:var(--color-moonlight)}.novo-chip.text-color-midnight{color:var(--color-midnight)}.novo-chip.text-color-darkness{color:var(--color-darkness)}.novo-chip.text-color-navy{color:var(--color-navy)}.novo-chip.text-color-aqua{color:var(--color-aqua)}.novo-chip.text-color-ocean{color:var(--color-ocean)}.novo-chip.text-color-mint{color:var(--color-mint)}.novo-chip.text-color-grass{color:var(--color-grass)}.novo-chip.text-color-sunflower{color:var(--color-sunflower)}.novo-chip.text-color-bittersweet{color:var(--color-bittersweet)}.novo-chip.text-color-grapefruit{color:var(--color-grapefruit)}.novo-chip.text-color-carnation{color:var(--color-carnation)}.novo-chip.text-color-lavender{color:var(--color-lavender)}.novo-chip.text-color-mountain{color:var(--color-mountain)}.novo-chip.text-color-info{color:var(--color-info)}.novo-chip.text-color-positive{color:var(--color-positive)}.novo-chip.text-color-success{color:var(--color-success)}.novo-chip.text-color-negative{color:var(--color-negative)}.novo-chip.text-color-danger{color:var(--color-danger)}.novo-chip.text-color-error{color:var(--color-error)}.novo-chip.text-color-warning{color:var(--color-warning)}.novo-chip.text-color-empty{color:var(--color-empty)}.novo-chip.text-color-disabled{color:var(--color-disabled)}.novo-chip.text-color-background{color:var(--color-background)}.novo-chip.text-color-backgroundDark{color:var(--color-background-dark)}.novo-chip.text-color-border{color:var(--color-border)}.novo-chip.text-color-border2{color:var(--color-border2)}.novo-chip.text-color-text{color:var(--color-text)}.novo-chip.text-color-presentation{color:var(--color-presentation)}.novo-chip.text-color-bullhorn{color:var(--color-bullhorn)}.novo-chip.text-color-pulse{color:var(--color-pulse)}.novo-chip.text-color-fastFind{color:var(--color-fast-find)}.novo-chip.text-color-toast{color:var(--color-toast)}.novo-chip.text-color-company{color:var(--color-company)}.novo-chip.text-color-candidate{color:var(--color-candidate)}.novo-chip.text-color-lead{color:var(--color-lead)}.novo-chip.text-color-contact{color:var(--color-contact)}.novo-chip.text-color-clientcontact{color:var(--color-clientcontact)}.novo-chip.text-color-opportunity{color:var(--color-opportunity)}.novo-chip.text-color-job{color:var(--color-job)}.novo-chip.text-color-joborder{color:var(--color-joborder)}.novo-chip.text-color-submission{color:var(--color-submission)}.novo-chip.text-color-sendout{color:var(--color-sendout)}.novo-chip.text-color-placement{color:var(--color-placement)}.novo-chip.text-color-note{color:var(--color-note)}.novo-chip.text-color-contract{color:var(--color-contract)}.novo-chip.text-color-task{color:var(--color-task)}.novo-chip.text-color-jobCode{color:var(--color-job-code)}.novo-chip.text-color-earnCode{color:var(--color-earn-code)}.novo-chip.text-color-invoiceStatement{color:var(--color-invoice-statement)}.novo-chip.text-color-billableCharge{color:var(--color-billable-charge)}.novo-chip.text-color-payableCharge{color:var(--color-payable-charge)}.novo-chip.text-color-user{color:var(--color-user)}.novo-chip.text-color-corporateUser{color:var(--color-corporate-user)}.novo-chip.text-color-distributionList{color:var(--color-distribution-list)}.novo-chip.text-color-credential{color:var(--color-credential)}.novo-chip.text-color-person{color:var(--color-person)}.novo-chip.margin-before{margin-top:.4rem}.novo-chip.margin-after{margin-bottom:.8rem}.novo-chip.text-length-small{max-width:40ch}.novo-chip.text-length-medium{max-width:55ch}.novo-chip.text-length-large{max-width:70ch}.novo-chip.text-weight-hairline{font-weight:var(--font-weight-hairline)}.novo-chip.text-weight-thin{font-weight:var(--font-weight-thin)}.novo-chip.text-weight-light{font-weight:var(--font-weight-light)}.novo-chip.text-weight-normal{font-weight:var(--font-weight-normal)}.novo-chip.text-weight-medium{font-weight:var(--font-weight-medium)}.novo-chip.text-weight-semibold{font-weight:var(--font-weight-semibold)}.novo-chip.text-weight-bold{font-weight:var(--font-weight-bold)}.novo-chip.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}.novo-chip.text-weight-heavy{font-weight:var(--font-weight-heavy)}.novo-chip.text-weight-lighter{font-weight:lighter}.novo-chip.text-weight-bolder{font-weight:bolder}.novo-chip.novo-chip-selectable{color:var(--selection)}.novo-chip.novo-chip-selectable:after{inset:0;position:absolute;border-radius:inherit;opacity:0;background-color:#000;content:\"\";pointer-events:none;transition:opacity .2s ease-in-out}.novo-chip.novo-chip-selectable:focus{outline:none;border:var(--border-width-thin) solid var(--selection)}.novo-chip.novo-chip-selectable:focus:after{opacity:.16}.novo-chip.novo-chip-selectable:hover{border:var(--border-width-thin) solid var(--selection)}.novo-chip.novo-chip-disabled{color:var(--text-main);opacity:.7;pointer-events:none}.novo-chip.novo-chip-disabled:after{opacity:0}.novo-chip.novo-chip-disabled .novo-chip-remove,.novo-chip.novo-chip-disabled .novo-chip-trailing-icon{cursor:default}.novo-chip .novo-chip-avatar::not(novo-icon){width:24px;height:24px}.novo-chip .novo-chip-avatar{margin-right:0rem;margin-left:0rem}.novo-chip .novo-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover;flex-shrink:0}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.novo-chip .novo-chip-remove,.novo-chip .novo-chip-trailing-icon{margin-left:0rem;margin-right:0}.novo-chip .novo-chip-remove{color:var(--color-light)}.novo-chip:not(.novo-chip-disabled) .novo-chip-remove:hover{color:hsl(from var(--color-light) h s calc(l - 30))}.novo-chip.novo-size-xs{font-size:.8rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-xs);min-height:1.6rem;gap:var(--spacing-xs)}.novo-chip.novo-size-xs.novo-chip-with-avatar{padding-left:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xs) / 2)}.novo-chip.novo-size-xs .novo-text{font-size:inherit}.novo-chip.novo-size-sm{font-size:1rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-sm);min-height:2rem;gap:var(--spacing-sm)}.novo-chip.novo-size-sm.novo-chip-with-avatar{padding-left:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-sm) / 2)}.novo-chip.novo-size-sm .novo-text{font-size:inherit}.novo-chip.novo-size-md{font-size:1.2rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-md);min-height:2.8rem;gap:var(--spacing-md)}.novo-chip.novo-size-md.novo-chip-with-avatar{padding-left:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-md) / 2)}.novo-chip.novo-size-md .novo-text{font-size:inherit}.novo-chip.novo-size-lg{font-size:1.4rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-lg);min-height:3.2rem;gap:var(--spacing-lg)}.novo-chip.novo-size-lg.novo-chip-with-avatar{padding-left:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-lg) / 2)}.novo-chip.novo-size-lg .novo-text{font-size:inherit}.novo-chip.novo-size-xl{font-size:1.8rem;border-radius:var(--border-radius-round);padding:var(--spacing-none) var(--spacing-xl);min-height:3.6rem;gap:var(--spacing-xl)}.novo-chip.novo-size-xl.novo-chip-with-avatar{padding-left:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl.novo-chip-with-trailing-icon{padding-right:calc(var(--spacing-xl) / 2)}.novo-chip.novo-size-xl .novo-text{font-size:inherit}.novo-chip.novo-color-border-default>*{color:inherit}.novo-chip.novo-accent-border-default{border:1px solid}.novo-chip.novo-color-black{color:var(--color-contrast-black);background:var(--color-black)}.novo-chip.novo-color-black>*{color:inherit}.novo-chip.novo-accent-black{border:1px solid var(--color-black);color:var(--color-black)}.novo-chip.novo-color-white{color:var(--color-contrast-white);background:var(--color-white)}.novo-chip.novo-color-white>*{color:inherit}.novo-chip.novo-accent-white{border:1px solid var(--color-white);color:var(--color-white)}.novo-chip.novo-color-gray{color:var(--color-contrast-gray);background:var(--color-gray)}.novo-chip.novo-color-gray>*{color:inherit}.novo-chip.novo-accent-gray{border:1px solid var(--color-gray);color:var(--color-gray)}.novo-chip.novo-color-grey{color:var(--color-contrast-grey);background:var(--color-grey)}.novo-chip.novo-color-grey>*{color:inherit}.novo-chip.novo-accent-grey{border:1px solid var(--color-grey);color:var(--color-grey)}.novo-chip.novo-color-offWhite{color:var(--color-contrast-off-white);background:var(--color-off-white)}.novo-chip.novo-color-offWhite>*{color:inherit}.novo-chip.novo-accent-offWhite{border:1px solid var(--color-off-white);color:var(--color-off-white)}.novo-chip.novo-color-bright{color:var(--color-contrast-bright);background:var(--color-bright)}.novo-chip.novo-color-bright>*{color:inherit}.novo-chip.novo-accent-bright{border:1px solid var(--color-bright);color:var(--color-bright)}.novo-chip.novo-color-light{color:var(--color-contrast-light);background:var(--color-light)}.novo-chip.novo-color-light>*{color:inherit}.novo-chip.novo-accent-light{border:1px solid var(--color-light);color:var(--color-light)}.novo-chip.novo-color-neutral{color:var(--color-contrast-neutral);background:var(--color-neutral)}.novo-chip.novo-color-neutral>*{color:inherit}.novo-chip.novo-accent-neutral{border:1px solid var(--color-neutral);color:var(--color-neutral)}.novo-chip.novo-color-dark{color:var(--color-contrast-dark);background:var(--color-dark)}.novo-chip.novo-color-dark>*{color:inherit}.novo-chip.novo-accent-dark{border:1px solid var(--color-dark);color:var(--color-dark)}.novo-chip.novo-color-orange{color:var(--color-contrast-orange);background:var(--color-orange)}.novo-chip.novo-color-orange>*{color:inherit}.novo-chip.novo-accent-orange{border:1px solid var(--color-orange);color:var(--color-orange)}.novo-chip.novo-color-navigation{color:var(--color-contrast-navigation);background:var(--color-navigation)}.novo-chip.novo-color-navigation>*{color:inherit}.novo-chip.novo-accent-navigation{border:1px solid var(--color-navigation);color:var(--color-navigation)}.novo-chip.novo-color-skyBlue{color:var(--color-contrast-sky-blue);background:var(--color-sky-blue)}.novo-chip.novo-color-skyBlue>*{color:inherit}.novo-chip.novo-accent-skyBlue{border:1px solid var(--color-sky-blue);color:var(--color-sky-blue)}.novo-chip.novo-color-steel{color:var(--color-contrast-steel);background:var(--color-steel)}.novo-chip.novo-color-steel>*{color:inherit}.novo-chip.novo-accent-steel{border:1px solid var(--color-steel);color:var(--color-steel)}.novo-chip.novo-color-metal{color:var(--color-contrast-metal);background:var(--color-metal)}.novo-chip.novo-color-metal>*{color:inherit}.novo-chip.novo-accent-metal{border:1px solid var(--color-metal);color:var(--color-metal)}.novo-chip.novo-color-sand{color:var(--color-contrast-sand);background:var(--color-sand)}.novo-chip.novo-color-sand>*{color:inherit}.novo-chip.novo-accent-sand{border:1px solid var(--color-sand);color:var(--color-sand)}.novo-chip.novo-color-silver{color:var(--color-contrast-silver);background:var(--color-silver)}.novo-chip.novo-color-silver>*{color:inherit}.novo-chip.novo-accent-silver{border:1px solid var(--color-silver);color:var(--color-silver)}.novo-chip.novo-color-stone{color:var(--color-contrast-stone);background:var(--color-stone)}.novo-chip.novo-color-stone>*{color:inherit}.novo-chip.novo-accent-stone{border:1px solid var(--color-stone);color:var(--color-stone)}.novo-chip.novo-color-ash{color:var(--color-contrast-ash);background:var(--color-ash)}.novo-chip.novo-color-ash>*{color:inherit}.novo-chip.novo-accent-ash{border:1px solid var(--color-ash);color:var(--color-ash)}.novo-chip.novo-color-anonymous{color:var(--color-contrast-anonymous);background:var(--color-anonymous)}.novo-chip.novo-color-anonymous>*{color:inherit}.novo-chip.novo-accent-anonymous{border:1px solid var(--color-anonymous);color:var(--color-anonymous)}.novo-chip.novo-color-slate{color:var(--color-contrast-slate);background:var(--color-slate)}.novo-chip.novo-color-slate>*{color:inherit}.novo-chip.novo-accent-slate{border:1px solid var(--color-slate);color:var(--color-slate)}.novo-chip.novo-color-onyx{color:var(--color-contrast-onyx);background:var(--color-onyx)}.novo-chip.novo-color-onyx>*{color:inherit}.novo-chip.novo-accent-onyx{border:1px solid var(--color-onyx);color:var(--color-onyx)}.novo-chip.novo-color-charcoal{color:var(--color-contrast-charcoal);background:var(--color-charcoal)}.novo-chip.novo-color-charcoal>*{color:inherit}.novo-chip.novo-accent-charcoal{border:1px solid var(--color-charcoal);color:var(--color-charcoal)}.novo-chip.novo-color-moonlight{color:var(--color-contrast-moonlight);background:var(--color-moonlight)}.novo-chip.novo-color-moonlight>*{color:inherit}.novo-chip.novo-accent-moonlight{border:1px solid var(--color-moonlight);color:var(--color-moonlight)}.novo-chip.novo-color-midnight{color:var(--color-contrast-midnight);background:var(--color-midnight)}.novo-chip.novo-color-midnight>*{color:inherit}.novo-chip.novo-accent-midnight{border:1px solid var(--color-midnight);color:var(--color-midnight)}.novo-chip.novo-color-darkness{color:var(--color-contrast-darkness);background:var(--color-darkness)}.novo-chip.novo-color-darkness>*{color:inherit}.novo-chip.novo-accent-darkness{border:1px solid var(--color-darkness);color:var(--color-darkness)}.novo-chip.novo-color-navy{color:var(--color-contrast-navy);background:var(--color-navy)}.novo-chip.novo-color-navy>*{color:inherit}.novo-chip.novo-accent-navy{border:1px solid var(--color-navy);color:var(--color-navy)}.novo-chip.novo-color-aqua{color:var(--color-contrast-aqua);background:var(--color-aqua)}.novo-chip.novo-color-aqua>*{color:inherit}.novo-chip.novo-accent-aqua{border:1px solid var(--color-aqua);color:var(--color-aqua)}.novo-chip.novo-color-ocean{color:var(--color-contrast-ocean);background:var(--color-ocean)}.novo-chip.novo-color-ocean>*{color:inherit}.novo-chip.novo-accent-ocean{border:1px solid var(--color-ocean);color:var(--color-ocean)}.novo-chip.novo-color-mint{color:var(--color-contrast-mint);background:var(--color-mint)}.novo-chip.novo-color-mint>*{color:inherit}.novo-chip.novo-accent-mint{border:1px solid var(--color-mint);color:var(--color-mint)}.novo-chip.novo-color-grass{color:var(--color-contrast-grass);background:var(--color-grass)}.novo-chip.novo-color-grass>*{color:inherit}.novo-chip.novo-accent-grass{border:1px solid var(--color-grass);color:var(--color-grass)}.novo-chip.novo-color-sunflower{color:var(--color-contrast-sunflower);background:var(--color-sunflower)}.novo-chip.novo-color-sunflower>*{color:inherit}.novo-chip.novo-accent-sunflower{border:1px solid var(--color-sunflower);color:var(--color-sunflower)}.novo-chip.novo-color-bittersweet{color:var(--color-contrast-bittersweet);background:var(--color-bittersweet)}.novo-chip.novo-color-bittersweet>*{color:inherit}.novo-chip.novo-accent-bittersweet{border:1px solid var(--color-bittersweet);color:var(--color-bittersweet)}.novo-chip.novo-color-grapefruit{color:var(--color-contrast-grapefruit);background:var(--color-grapefruit)}.novo-chip.novo-color-grapefruit>*{color:inherit}.novo-chip.novo-accent-grapefruit{border:1px solid var(--color-grapefruit);color:var(--color-grapefruit)}.novo-chip.novo-color-carnation{color:var(--color-contrast-carnation);background:var(--color-carnation)}.novo-chip.novo-color-carnation>*{color:inherit}.novo-chip.novo-accent-carnation{border:1px solid var(--color-carnation);color:var(--color-carnation)}.novo-chip.novo-color-lavender{color:var(--color-contrast-lavender);background:var(--color-lavender)}.novo-chip.novo-color-lavender>*{color:inherit}.novo-chip.novo-accent-lavender{border:1px solid var(--color-lavender);color:var(--color-lavender)}.novo-chip.novo-color-mountain{color:var(--color-contrast-mountain);background:var(--color-mountain)}.novo-chip.novo-color-mountain>*{color:inherit}.novo-chip.novo-accent-mountain{border:1px solid var(--color-mountain);color:var(--color-mountain)}.novo-chip.novo-color-info{color:var(--color-contrast-info);background:var(--color-info)}.novo-chip.novo-color-info>*{color:inherit}.novo-chip.novo-accent-info{border:1px solid var(--color-info);color:var(--color-info)}.novo-chip.novo-color-positive{color:var(--color-contrast-positive);background:var(--color-positive)}.novo-chip.novo-color-positive>*{color:inherit}.novo-chip.novo-accent-positive{border:1px solid var(--color-positive);color:var(--color-positive)}.novo-chip.novo-color-success{color:var(--color-contrast-success);background:var(--color-success)}.novo-chip.novo-color-success>*{color:inherit}.novo-chip.novo-accent-success{border:1px solid var(--color-success);color:var(--color-success)}.novo-chip.novo-color-negative{color:var(--color-contrast-negative);background:var(--color-negative)}.novo-chip.novo-color-negative>*{color:inherit}.novo-chip.novo-accent-negative{border:1px solid var(--color-negative);color:var(--color-negative)}.novo-chip.novo-color-danger{color:var(--color-contrast-danger);background:var(--color-danger)}.novo-chip.novo-color-danger>*{color:inherit}.novo-chip.novo-accent-danger{border:1px solid var(--color-danger);color:var(--color-danger)}.novo-chip.novo-color-error{color:var(--color-contrast-error);background:var(--color-error)}.novo-chip.novo-color-error>*{color:inherit}.novo-chip.novo-accent-error{border:1px solid var(--color-error);color:var(--color-error)}.novo-chip.novo-color-warning{color:var(--color-contrast-warning);background:var(--color-warning)}.novo-chip.novo-color-warning>*{color:inherit}.novo-chip.novo-accent-warning{border:1px solid var(--color-warning);color:var(--color-warning)}.novo-chip.novo-color-empty{color:var(--color-contrast-empty);background:var(--color-empty)}.novo-chip.novo-color-empty>*{color:inherit}.novo-chip.novo-accent-empty{border:1px solid var(--color-empty);color:var(--color-empty)}.novo-chip.novo-color-disabled{color:var(--color-contrast-disabled);background:var(--color-disabled)}.novo-chip.novo-color-disabled>*{color:inherit}.novo-chip.novo-accent-disabled{border:1px solid var(--color-disabled);color:var(--color-disabled)}.novo-chip.novo-color-background{color:var(--color-contrast-background);background:var(--color-background)}.novo-chip.novo-color-background>*{color:inherit}.novo-chip.novo-accent-background{border:1px solid var(--color-background);color:var(--color-background)}.novo-chip.novo-color-backgroundDark{color:var(--color-contrast-background-dark);background:var(--color-background-dark)}.novo-chip.novo-color-backgroundDark>*{color:inherit}.novo-chip.novo-accent-backgroundDark{border:1px solid var(--color-background-dark);color:var(--color-background-dark)}.novo-chip.novo-color-border{color:var(--color-contrast-border);background:var(--color-border)}.novo-chip.novo-color-border>*{color:inherit}.novo-chip.novo-accent-border{border:1px solid var(--color-border);color:var(--color-border)}.novo-chip.novo-color-border2{color:var(--color-contrast-border2);background:var(--color-border2)}.novo-chip.novo-color-border2>*{color:inherit}.novo-chip.novo-accent-border2{border:1px solid var(--color-border2);color:var(--color-border2)}.novo-chip.novo-color-text{color:var(--color-contrast-text);background:var(--color-text)}.novo-chip.novo-color-text>*{color:inherit}.novo-chip.novo-accent-text{border:1px solid var(--color-text);color:var(--color-text)}.novo-chip.novo-color-presentation{color:var(--color-contrast-presentation);background:var(--color-presentation)}.novo-chip.novo-color-presentation>*{color:inherit}.novo-chip.novo-accent-presentation{border:1px solid var(--color-presentation);color:var(--color-presentation)}.novo-chip.novo-color-bullhorn{color:var(--color-contrast-bullhorn);background:var(--color-bullhorn)}.novo-chip.novo-color-bullhorn>*{color:inherit}.novo-chip.novo-accent-bullhorn{border:1px solid var(--color-bullhorn);color:var(--color-bullhorn)}.novo-chip.novo-color-pulse{color:var(--color-contrast-pulse);background:var(--color-pulse)}.novo-chip.novo-color-pulse>*{color:inherit}.novo-chip.novo-accent-pulse{border:1px solid var(--color-pulse);color:var(--color-pulse)}.novo-chip.novo-color-fastFind{color:var(--color-contrast-fast-find);background:var(--color-fast-find)}.novo-chip.novo-color-fastFind>*{color:inherit}.novo-chip.novo-accent-fastFind{border:1px solid var(--color-fast-find);color:var(--color-fast-find)}.novo-chip.novo-color-toast{color:var(--color-contrast-toast);background:var(--color-toast)}.novo-chip.novo-color-toast>*{color:inherit}.novo-chip.novo-accent-toast{border:1px solid var(--color-toast);color:var(--color-toast)}.novo-chip.novo-color-company{color:var(--color-contrast-company);background:var(--color-company)}.novo-chip.novo-color-company>*{color:inherit}.novo-chip.novo-accent-company{border:1px solid var(--color-company);color:var(--color-company)}.novo-chip.novo-color-candidate{color:var(--color-contrast-candidate);background:var(--color-candidate)}.novo-chip.novo-color-candidate>*{color:inherit}.novo-chip.novo-accent-candidate{border:1px solid var(--color-candidate);color:var(--color-candidate)}.novo-chip.novo-color-lead{color:var(--color-contrast-lead);background:var(--color-lead)}.novo-chip.novo-color-lead>*{color:inherit}.novo-chip.novo-accent-lead{border:1px solid var(--color-lead);color:var(--color-lead)}.novo-chip.novo-color-contact{color:var(--color-contrast-contact);background:var(--color-contact)}.novo-chip.novo-color-contact>*{color:inherit}.novo-chip.novo-accent-contact{border:1px solid var(--color-contact);color:var(--color-contact)}.novo-chip.novo-color-clientcontact{color:var(--color-contrast-clientcontact);background:var(--color-clientcontact)}.novo-chip.novo-color-clientcontact>*{color:inherit}.novo-chip.novo-accent-clientcontact{border:1px solid var(--color-clientcontact);color:var(--color-clientcontact)}.novo-chip.novo-color-opportunity{color:var(--color-contrast-opportunity);background:var(--color-opportunity)}.novo-chip.novo-color-opportunity>*{color:inherit}.novo-chip.novo-accent-opportunity{border:1px solid var(--color-opportunity);color:var(--color-opportunity)}.novo-chip.novo-color-job{color:var(--color-contrast-job);background:var(--color-job)}.novo-chip.novo-color-job>*{color:inherit}.novo-chip.novo-accent-job{border:1px solid var(--color-job);color:var(--color-job)}.novo-chip.novo-color-joborder{color:var(--color-contrast-joborder);background:var(--color-joborder)}.novo-chip.novo-color-joborder>*{color:inherit}.novo-chip.novo-accent-joborder{border:1px solid var(--color-joborder);color:var(--color-joborder)}.novo-chip.novo-color-submission{color:var(--color-contrast-submission);background:var(--color-submission)}.novo-chip.novo-color-submission>*{color:inherit}.novo-chip.novo-accent-submission{border:1px solid var(--color-submission);color:var(--color-submission)}.novo-chip.novo-color-sendout{color:var(--color-contrast-sendout);background:var(--color-sendout)}.novo-chip.novo-color-sendout>*{color:inherit}.novo-chip.novo-accent-sendout{border:1px solid var(--color-sendout);color:var(--color-sendout)}.novo-chip.novo-color-placement{color:var(--color-contrast-placement);background:var(--color-placement)}.novo-chip.novo-color-placement>*{color:inherit}.novo-chip.novo-accent-placement{border:1px solid var(--color-placement);color:var(--color-placement)}.novo-chip.novo-color-note{color:var(--color-contrast-note);background:var(--color-note)}.novo-chip.novo-color-note>*{color:inherit}.novo-chip.novo-accent-note{border:1px solid var(--color-note);color:var(--color-note)}.novo-chip.novo-color-contract{color:var(--color-contrast-contract);background:var(--color-contract)}.novo-chip.novo-color-contract>*{color:inherit}.novo-chip.novo-accent-contract{border:1px solid var(--color-contract);color:var(--color-contract)}.novo-chip.novo-color-task{color:var(--color-contrast-task);background:var(--color-task)}.novo-chip.novo-color-task>*{color:inherit}.novo-chip.novo-accent-task{border:1px solid var(--color-task);color:var(--color-task)}.novo-chip.novo-color-jobCode{color:var(--color-contrast-job-code);background:var(--color-job-code)}.novo-chip.novo-color-jobCode>*{color:inherit}.novo-chip.novo-accent-jobCode{border:1px solid var(--color-job-code);color:var(--color-job-code)}.novo-chip.novo-color-earnCode{color:var(--color-contrast-earn-code);background:var(--color-earn-code)}.novo-chip.novo-color-earnCode>*{color:inherit}.novo-chip.novo-accent-earnCode{border:1px solid var(--color-earn-code);color:var(--color-earn-code)}.novo-chip.novo-color-invoiceStatement{color:var(--color-contrast-invoice-statement);background:var(--color-invoice-statement)}.novo-chip.novo-color-invoiceStatement>*{color:inherit}.novo-chip.novo-accent-invoiceStatement{border:1px solid var(--color-invoice-statement);color:var(--color-invoice-statement)}.novo-chip.novo-color-billableCharge{color:var(--color-contrast-billable-charge);background:var(--color-billable-charge)}.novo-chip.novo-color-billableCharge>*{color:inherit}.novo-chip.novo-accent-billableCharge{border:1px solid var(--color-billable-charge);color:var(--color-billable-charge)}.novo-chip.novo-color-payableCharge{color:var(--color-contrast-payable-charge);background:var(--color-payable-charge)}.novo-chip.novo-color-payableCharge>*{color:inherit}.novo-chip.novo-accent-payableCharge{border:1px solid var(--color-payable-charge);color:var(--color-payable-charge)}.novo-chip.novo-color-user{color:var(--color-contrast-user);background:var(--color-user)}.novo-chip.novo-color-user>*{color:inherit}.novo-chip.novo-accent-user{border:1px solid var(--color-user);color:var(--color-user)}.novo-chip.novo-color-corporateUser{color:var(--color-contrast-corporate-user);background:var(--color-corporate-user)}.novo-chip.novo-color-corporateUser>*{color:inherit}.novo-chip.novo-accent-corporateUser{border:1px solid var(--color-corporate-user);color:var(--color-corporate-user)}.novo-chip.novo-color-distributionList{color:var(--color-contrast-distribution-list);background:var(--color-distribution-list)}.novo-chip.novo-color-distributionList>*{color:inherit}.novo-chip.novo-accent-distributionList{border:1px solid var(--color-distribution-list);color:var(--color-distribution-list)}.novo-chip.novo-color-credential{color:var(--color-contrast-credential);background:var(--color-credential)}.novo-chip.novo-color-credential>*{color:inherit}.novo-chip.novo-accent-credential{border:1px solid var(--color-credential);color:var(--color-credential)}.novo-chip.novo-color-person{color:var(--color-contrast-person);background:var(--color-person)}.novo-chip.novo-color-person>*{color:inherit}.novo-chip.novo-accent-person{border:1px solid var(--color-person);color:var(--color-person)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.Platform }, { type: i0.ChangeDetectorRef, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }], propDecorators: { avatar: [{
                type: ContentChild,
                args: [NovoChipAvatar]
            }], removeIcon: [{
                type: ContentChild,
                args: [NovoChipRemove]
            }], type: [{
                type: Input
            }], selected: [{
                type: Input
            }], value: [{
                type: Input
            }], selectable: [{
                type: Input
            }], disabled: [{
                type: Input
            }], removable: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], destroyed: [{
                type: Output
            }], removed: [{
                type: Output
            }] } });

/** Injection token to be used to override the default options for the chips module. */
const NOVO_CHIPS_DEFAULT_OPTIONS = new InjectionToken('novo-chips-default-options');

// Boilerplate for applying mixins to NovoChipList.
/** @docs-private */
class NovoChipListBase {
    constructor(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
const _NovoChipListMixinBase = mixinErrorState(NovoChipListBase);
// Increasing integer for generating unique ids for chip-list components.
let nextUniqueId$1 = 0;
/** Change event object that is emitted when the chip list value has changed. */
class NovoChipListChange {
    constructor(
    /** Chip list that emitted the event. */
    source, 
    /** Value of the chip list when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
}
/**
 * A chip list component (named ChipList for its similarity to the List component).
 */
class NovoChipList extends _NovoChipListMixinBase {
    /** The array of selected chips inside chip list. */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /** The ARIA role applied to the chip list. */
    get role() {
        return this.empty ? null : 'listbox';
    }
    /** Whether the user should be allowed to select multiple chips. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /** Whether chips in this list can be toggled by user interaction */
    get chipsToggleable() {
        return this._chipsToggleable;
    }
    set chipsToggleable(value) {
        this._chipsToggleable = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /** Whether the chips should appear stacked instead of a row. */
    get stacked() {
        return this._stacked;
    }
    set stacked(value) {
        this._stacked = coerceBooleanProperty(value);
    }
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        this._compareWith = fn;
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.writeValue(value);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id() {
        return this._chipInput ? this._chipInput.id : this._uid;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get placeholder() {
        return this._chipInput ? this._chipInput.placeholder : this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /** Whether any chips or the novoChipInput inside of this chip-list has focus. */
    get focused() {
        return (this._chipInput && this._chipInput.focused) || this._hasFocusedChip();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get empty() {
        return (!this._chipInput || this._chipInput.empty) && (!this.chips || this.chips.length === 0);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        return !this.empty || this.focused;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled() {
        return this.ngControl ? !!this.ngControl.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /**
     * Whether or not this chip list is selectable. When a chip list is not selectable,
     * the selected states for all the chips inside the chip list are always ignored.
     */
    get selectable() {
        return this._selectable;
    }
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
        if (this.chips) {
            this.chips.forEach((chip) => (chip._chipListSelectable = this._selectable));
        }
    }
    set tabIndex(value) {
        this._userTabIndex = value;
        this._tabIndex = value;
    }
    /** Combined stream of all of the child chips' selection change events. */
    get chipSelectionChanges() {
        return merge(...this.chips.map((chip) => chip.selectionChange));
    }
    /** Combined stream of all of the child chips' focus change events. */
    get chipFocusChanges() {
        return merge(...this.chips.map((chip) => chip._onFocus));
    }
    /** Combined stream of all of the child chips' blur change events. */
    get chipBlurChanges() {
        return merge(...this.chips.map((chip) => chip._onBlur));
    }
    /** Combined stream of all of the child chips' remove change events. */
    get chipRemoveChanges() {
        return merge(...this.chips.map((chip) => chip.removed));
    }
    constructor(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, 
    /** @docs-private */
    ngControl) {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this.ngControl = ngControl;
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.controlType = 'chip-list';
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        this._lastDestroyedChipIndex = null;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new Subject();
        /** Uid of the chip list */
        this._uid = `novo-chip-list-${nextUniqueId$1++}`;
        /** Tab index for the chip list. */
        this._tabIndex = 0;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use _tabIndex
         */
        this._userTabIndex = null;
        /** Function when touched */
        this._onTouched = () => { };
        /** Function when changed */
        this._onChange = () => { };
        this._multiple = false;
        this._chipsToggleable = true;
        this._stacked = false;
        this._compareWith = (o1, o2) => o1 === o2;
        this._required = false;
        this._disabled = false;
        /** Orientation of the chip list. */
        this.ariaOrientation = 'horizontal';
        this._selectable = true;
        /** Event emitted when the selected chip list value has been changed by the user. */
        this.change = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the chip-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        this.valueChange = new EventEmitter();
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    ngAfterContentInit() {
        this._keyManager = new FocusKeyManager(this.chips)
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
            Promise.resolve().then(() => {
                this._syncChipsState();
            });
            this._resetChips();
            if (this._value !== undefined) {
                Promise.resolve().then(() => {
                    this._setSelectionByValue(this._value, false);
                });
            }
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
        this._selectionModel = new SelectionModel(this.multiple, undefined, false);
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
    registerInput(inputElement) {
        this._chipInput = inputElement;
        // We use this attribute to match the chip list to its input in test harnesses.
        // Set the attribute directly here to avoid "changed after checked" errors.
        this._elementRef.nativeElement.setAttribute('data-novo-chip-input', inputElement.id);
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this._value = value;
        if (this.chips && this.chips.length > 0) {
            this._setSelectionByValue(value, false);
        }
        this.stateChanges.next();
    }
    addValue(value) {
        this.value = [...this.value, value];
        this._chipInput.clearValue();
    }
    removeValue(value) {
        if (this.value && Array.isArray(this.value)) {
            this.value = this.value.filter((it) => !this.compareWith(it, value));
        }
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick(event) {
        if (!this._originatesFromChip(event)) {
            this.focus();
        }
    }
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    focus(options) {
        if (this.disabled) {
            return;
        }
        // TODO: ARIA says this should focus the first `selected` chip if any are selected.
        // Focus on first element if there's no chipInput inside chip-list
        if (this._chipInput && this._chipInput.focused) {
            // do nothing
        }
        else if (this._chipInput) {
            Promise.resolve().then(() => this._focusInput(options));
            this.stateChanges.next();
        }
        else if (this.chips.length > 0) {
            this._keyManager.setFirstItemActive();
            this.stateChanges.next();
        }
    }
    /** Attempt to focus an input if we have one. */
    _focusInput(options) {
        if (this._chipInput) {
            this._chipInput.focus(options);
        }
    }
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _keydown(event) {
        const target = event.target;
        // If they are on an empty input and hit backspace, focus the last chip
        if (event.key === "Backspace" /* Key.Backspace */ && this._isInputEmpty(target)) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else if (target && target.classList.contains('novo-chip')) {
            this._keyManager.onKeydown(event);
            this.stateChanges.next();
        }
    }
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    _updateTabIndex() {
        // If we have 0 chips, we should not allow keyboard focus
        this._tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
    }
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    _updateFocusForDestroyedChips() {
        // Move focus to the closest chip. If no other chips remain, focus the chip-list itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this.chips.length) {
                const newChipIndex = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
                this._keyManager.setActiveItem(newChipIndex);
            }
            else {
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
    _isValidIndex(index) {
        return index >= 0 && index < this.chips.length;
    }
    _isInputEmpty(element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            const input = element;
            return !input.value;
        }
        return false;
    }
    _setSelectionByValue(value, isUserInput = true) {
        this._clearSelection();
        this.chips.forEach((chip) => chip.deselect());
        if (Array.isArray(value)) {
            value.forEach((currentValue) => this._selectValue(currentValue, isUserInput));
            this._sortValues();
        }
        else {
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
    _selectValue(value, isUserInput = true) {
        const correspondingChip = this.chips.find((chip) => {
            return chip.value != null && this._compareWith(chip.value, value);
        });
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
            this._selectionModel.select(correspondingChip);
        }
        return correspondingChip;
    }
    _initializeSelection() {
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
    _clearSelection(skip) {
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
    _sortValues() {
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
    _propagateChanges(fallbackValue) {
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map((chip) => chip.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this.change.emit(new NovoChipListChange(this, valueToEmit));
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
            }
            else {
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
    _resetChips() {
        this._dropSubscriptions();
        this._listenToChipsFocus();
        this._listenToChipsSelection();
        this._listenToChipsRemoved();
    }
    _dropSubscriptions() {
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
    _listenToChipsSelection() {
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
    _listenToChipsFocus() {
        this._chipFocusSubscription = this.chipFocusChanges.subscribe((event) => {
            const chipIndex = this.chips.toArray().indexOf(event.chip);
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
    _listenToChipsRemoved() {
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
    _originatesFromChip(event) {
        let currentElement = event.target;
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            if (currentElement.classList.contains('novo-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
    /** Checks whether any of the chips is focused. */
    _hasFocusedChip() {
        return this.chips && this.chips.some((chip) => chip._hasFocus);
    }
    /** Syncs the list's state with the individual chips. */
    _syncChipsState() {
        if (this.chips) {
            this.chips.forEach((chip) => {
                chip._chipListDisabled = this._disabled;
                chip._chipListMultiple = this.multiple;
                chip._chipListSelectable = this.selectable;
                chip._chipListToggleable = this.chipsToggleable;
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipList, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1$1.Directionality, optional: true }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.ErrorStateMatcher }, { token: i2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoChipList, isStandalone: false, selector: "novo-chip-list", inputs: { errorStateMatcher: "errorStateMatcher", multiple: "multiple", chipsToggleable: "chipsToggleable", stacked: "stacked", compareWith: "compareWith", value: "value", required: "required", placeholder: "placeholder", disabled: "disabled", ariaOrientation: ["aria-orientation", "ariaOrientation"], selectable: "selectable", tabIndex: "tabIndex" }, outputs: { change: "change", valueChange: "valueChange" }, host: { listeners: { "focus": "focus()", "blur": "_blur()", "keydown": "_keydown($event)" }, properties: { "attr.tabindex": "disabled ? null : _tabIndex", "attr.aria-describedby": "_ariaDescribedby || null", "attr.aria-required": "role ? required : null", "attr.aria-disabled": "disabled.toString()", "attr.aria-invalid": "errorState", "attr.aria-multiselectable": "multiple", "attr.role": "role", "class.novo-chip-list-empty": "empty", "class.novo-chip-list-has-value": "!empty", "class.novo-chip-list-stacked": "stacked", "class.novo-chip-list-focused": "focused", "class.novo-chip-list-disabled": "disabled", "class.novo-chip-list-invalid": "errorState", "class.novo-chip-list-required": "required", "attr.aria-orientation": "ariaOrientation", "id": "_uid" }, classAttribute: "novo-chip-list" }, providers: [
            { provide: NovoFieldControl, useExisting: NovoChipList },
            { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
        ], queries: [{ propertyName: "chips", predicate: NovoChipElement, descendants: true }], exportAs: ["novoChipList"], usesInheritance: true, ngImport: i0, template: '<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>', isInline: true, styles: [".novo-chip-list{overflow:hidden}.novo-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;gap:8px}.novo-chip-list-stacked{flex:1}.novo-chip-list-stacked .novo-chip-list-wrapper{flex-direction:column;align-items:flex-start}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip{width:100%;height:2.8rem}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-remove,.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-trailing-icon{margin-left:auto}.novo-chip-list-stacked .novo-chip-list-wrapper input.novo-chip-input{flex:1 0 auto}novo-field.novo-focused input.novo-chip-input{flex:1 0 100px}input.novo-chip-input{width:20px;margin:0 4px;flex:1 0 20px;line-height:1.5}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipList, decorators: [{
            type: Component,
            args: [{ selector: 'novo-chip-list', template: '<div class="novo-chip-list-wrapper"><ng-content></ng-content></div>', exportAs: 'novoChipList', host: {
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
                    }, providers: [
                        { provide: NovoFieldControl, useExisting: NovoChipList },
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoChipList },
                    ], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, styles: [".novo-chip-list{overflow:hidden}.novo-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;gap:8px}.novo-chip-list-stacked{flex:1}.novo-chip-list-stacked .novo-chip-list-wrapper{flex-direction:column;align-items:flex-start}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip{width:100%;height:2.8rem}.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-remove,.novo-chip-list-stacked .novo-chip-list-wrapper .novo-chip .novo-chip-trailing-icon{margin-left:auto}.novo-chip-list-stacked .novo-chip-list-wrapper input.novo-chip-input{flex:1 0 auto}novo-field.novo-focused input.novo-chip-input{flex:1 0 100px}input.novo-chip-input{width:20px;margin:0 4px;flex:1 0 20px;line-height:1.5}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1$1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i3.ErrorStateMatcher }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }], propDecorators: { errorStateMatcher: [{
                type: Input
            }], multiple: [{
                type: Input
            }], chipsToggleable: [{
                type: Input
            }], stacked: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], value: [{
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], ariaOrientation: [{
                type: Input,
                args: ['aria-orientation']
            }], selectable: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], change: [{
                type: Output
            }], valueChange: [{
                type: Output
            }], chips: [{
                type: ContentChildren,
                args: [NovoChipElement, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }] } });

// Increasing integer for generating unique ids.
let nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<novo-form-field>`.
 * May be placed inside or outside of an `<novo-chip-list>`.
 */
class NovoChipInput {
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    get addOnBlur() {
        return this._addOnBlur;
    }
    set addOnBlur(value) {
        this._addOnBlur = coerceBooleanProperty(value);
    }
    /** Whether the input is disabled. */
    get disabled() {
        return this._disabled || (this._chipList && this._chipList.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Whether the input is empty. */
    get empty() {
        return !this._inputElement.value;
    }
    /** Getter for accessing chipList in templates */
    get chipList() {
        return this._chipList;
    }
    constructor(_elementRef, _defaultOptions, _field, _chipList, ngControl) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        this._field = _field;
        this._chipList = _chipList;
        this.ngControl = ngControl;
        /** Whether the control is focused. */
        this.focused = false;
        this._addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipEnd event.
         *
         * Defaults to `[Key.Enter]`.
         */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /** Emitted when a chip is to be added. */
        this.chipEnd = new EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Setting to false prevents input from being cleared when focus is lost. */
        this.clearOnBlur = true;
        /** Unique id for the input. */
        this.id = `novo-chip-list-input-${nextUniqueId++}`;
        this._disabled = false;
        this.destroy$ = new Subject();
        this._inputElement = this._elementRef.nativeElement;
        this._chipList.registerInput(this);
    }
    ngOnChanges() {
        this._chipList.stateChanges.next();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /** Utility method to make host definition/tests more clear. */
    _keydown(event) {
        // Allow the user's focus to escape when they're tabbing forward. Note that we don't
        // want to do this when going backwards, because focus should go back to the first chip.
        if (event && event.key === "Tab" /* Key.Tab */ && !hasModifierKey(event, 'shiftKey')) {
            this._chipList._allowFocusEscape();
        }
        this._emitChipEnd(event);
    }
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur(blurEvent) {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        else if (this.clearOnBlur && !this._field?.blurEventIsInField(blurEvent)) {
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
    _emitChipEnd(event) {
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
    focus(options) {
        this._inputElement.focus(options);
    }
    /** Clears the input. */
    clearValue() {
        this._inputElement.value = '';
        this.ngControl?.control?.setValue('');
    }
    /** Checks whether a keycode is one of the configured separators. */
    _isSeparatorKey(event) {
        return !hasModifierKey(event) && new Set(this.separatorKeyCodes).has(event.key);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipInput, deps: [{ token: i0.ElementRef }, { token: NOVO_CHIPS_DEFAULT_OPTIONS }, { token: NovoFieldElement, optional: true }, { token: forwardRef(() => NovoChipList) }, { token: i2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.19", type: NovoChipInput, isStandalone: false, selector: "input[novoChipInput]", inputs: { addOnBlur: ["novoChipInputAddOnBlur", "addOnBlur"], separatorKeyCodes: ["novoChipInputSeparatorKeyCodes", "separatorKeyCodes"], placeholder: "placeholder", clearOnBlur: "clearOnBlur", id: "id", disabled: "disabled" }, outputs: { chipEnd: "novoChipInputTokenEnd" }, host: { listeners: { "keydown": "_keydown($event)", "blur": "_blur($event)", "focus": "_focus()", "input": "_onInput()" }, properties: { "id": "id", "attr.disabled": "disabled || null", "attr.placeholder": "placeholder || null", "attr.aria-invalid": "chipList && chipList.ngControl ? chipList.ngControl.invalid : null", "attr.aria-required": "chipList && chipList.required || null" }, classAttribute: "novo-chip-input novo-input-element" }, exportAs: ["novoChipInput", "novoChipInputFor"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipInput, decorators: [{
            type: Directive,
            args: [{
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
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_CHIPS_DEFAULT_OPTIONS]
                }] }, { type: i6.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NovoFieldElement]
                }] }, { type: NovoChipList, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NovoChipList)]
                }] }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }], propDecorators: { addOnBlur: [{
                type: Input,
                args: ['novoChipInputAddOnBlur']
            }], separatorKeyCodes: [{
                type: Input,
                args: ['novoChipInputSeparatorKeyCodes']
            }], chipEnd: [{
                type: Output,
                args: ['novoChipInputTokenEnd']
            }], placeholder: [{
                type: Input
            }], clearOnBlur: [{
                type: Input
            }], id: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class AvatarTypePipe {
    transform(item, type) {
        return (type || item?.value?.searchEntity || '').toLowerCase();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: AvatarTypePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: AvatarTypePipe, isStandalone: false, name: "avatarType" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: AvatarTypePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'avatarType',
                    standalone: false,
                }]
        }] });

// NG2
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoChipsElement),
    multi: true,
};
class NovoChipsElement {
    set disablePickerInput(v) {
        this._disablePickerInput = coerceBooleanProperty(v);
    }
    get disablePickerInput() {
        return this._disablePickerInput;
    }
    constructor(element, componentUtils, labels) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.labels = labels;
        this.CHIPS_SHOWN_MAX = 999;
        this.closeOnSelect = false;
        this.placeholder = '';
        this.allowCustomValues = false;
        this._disablePickerInput = false;
        this.size = 'md';
        this.changed = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.typing = new EventEmitter();
        this.items = [];
        this.selected = null;
        this.config = {};
        // private data model
        this._value = '';
        this._items = new ReplaySubject(1);
        // Placeholders for the callbacks
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.changeRef = inject(ChangeDetectorRef);
    }
    ngOnInit() {
        this.hiddenChipsLimit = this.source.hiddenChipsLimit;
        this._hiddenChipsLimit = this.hiddenChipsLimit; // copy of original chip limit
        this.setItems();
    }
    get value() {
        return this._value;
    }
    set value(selected) {
        this.itemToAdd = '';
        this._value = selected;
    }
    clearValue() {
        this.items = [];
        this.updateHiddenChips();
        this._items.next(this.items);
        this.value = null;
        this._propagateChanges();
    }
    getDynamicClasses(item) {
        const classFunction = this.source?.classFunction;
        if (typeof classFunction !== 'function') {
            return null;
        }
        return classFunction(item?.value || item) ?? null;
    }
    setItems() {
        this.items = [];
        if (this.model && Array.isArray(this.model)) {
            const noLabels = [];
            for (const item of this.model) {
                let label;
                if (this.source && this.source.format && Helpers.validateInterpolationProps(this.source.format, item)) {
                    label = Helpers.interpolate(this.source.format, item);
                }
                if (this.source && label && label !== this.source.format) {
                    this.items.push({
                        value: item.value || item,
                        label,
                    });
                }
                else if (this.source.getLabels && typeof this.source.getLabels === 'function') {
                    noLabels.push(item);
                }
                else if (this.source.options && Array.isArray(this.source.options)) {
                    this.items.push(this.getLabelFromOptions(item));
                }
                else if (this.source.categoryMap && this.source.categoryMap.size) {
                    this.items.push(item);
                }
                else {
                    this.items.push({
                        value: item,
                        label: item,
                    });
                }
            }
            if (noLabels.length > 0 && this.source && this.source.getLabels && typeof this.source.getLabels === 'function') {
                this.source.getLabels(noLabels).then((result) => {
                    for (const value of result) {
                        if (value.hasOwnProperty('label')) {
                            this.items.push({
                                value,
                                label: value.label,
                            });
                        }
                        else if (this.source.options && Array.isArray(this.source.options)) {
                            this.items.push(this.getLabelFromOptions(value));
                        }
                        else {
                            this.items.push(value);
                        }
                    }
                    this.updateHiddenChips();
                    this._finalizeItemValue();
                    this._updateOverlay();
                });
            }
        }
        this.updateHiddenChips();
        this._finalizeItemValue();
    }
    getLabelFromOptions(value) {
        let id = value;
        let optLabel = this.source.options.find((val) => val.value === value);
        if (!optLabel && value.hasOwnProperty('id')) {
            optLabel = this.source.options.find((val) => val.value === value.id);
            id = value.id;
        }
        return {
            value: id,
            label: optLabel ? optLabel.label : value,
        };
    }
    deselectAll(event) {
        this.selected = null;
        this.hidePreview();
    }
    select(event, item) {
        this.blur.emit(event);
        this.deselectAll();
        this.selected = item;
        this.showPreview();
    }
    deselect(event, item) {
        this.blur.emit(event);
        this.deselectAll();
    }
    onTyping(event) {
        this.typing.emit(event);
    }
    onFocus(event) {
        this.deselectAll();
        this.element.nativeElement.classList.add('selected');
        this.focus.emit(event);
    }
    add(event) {
        if (event && !(event instanceof Event)) {
            this.items.push(event);
            this.updateHiddenChips();
            this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
            // Set focus on the picker
            const input = this.element.nativeElement.querySelector('novo-picker > input');
            if (input) {
                input.focus();
            }
        }
        this._items.next(this.items);
        this._propagateChanges();
    }
    updateHiddenChips() {
        this.hiddenChipsCount = Math.max(0, this.items.length - this._hiddenChipsLimit);
        if (!this.hiddenChipsCount && this.hiddenChipsLimit === this.CHIPS_SHOWN_MAX) {
            this.hiddenChipsLimit = this._hiddenChipsLimit; // reset hiddenChipsLimit to original #
        }
    }
    toggleHiddenChips() {
        this.hiddenChipsLimit = this.hiddenChipsLimit === this.CHIPS_SHOWN_MAX ? this._hiddenChipsLimit : this.CHIPS_SHOWN_MAX;
    }
    remove(event, item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.updateHiddenChips();
        this.deselectAll();
        this.value = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
        this._items.next(this.items);
        this._propagateChanges();
    }
    onKeyDown(event) {
        if (event.key === "Backspace" /* Key.Backspace */) {
            if (event.target && event.target.value.length === 0 && this.items.length) {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (this.selected) {
                    this.remove(event, this.selected);
                }
                else {
                    this.select(event, this.items[this.items.length - 1]);
                }
            }
        }
    }
    // Set touched on blur
    onTouched(e) {
        this.element.nativeElement.classList.remove('selected');
        this.onModelTouched();
        this.blur.emit(e);
    }
    writeValue(model) {
        this.model = model;
        this.setItems();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this._disablePickerInput = disabled;
    }
    _finalizeItemValue() {
        this._items.next(this.items);
        const valueToSet = this.source && this.source.valueFormatter ? this.source.valueFormatter(this.items) : this.items.map((i) => i.value);
        if (Helpers.isBlank(this.value) !== Helpers.isBlank(valueToSet) || JSON.stringify(this.value) !== JSON.stringify(valueToSet)) {
            this.value = valueToSet;
        }
    }
    /** Emits change event to set the model value. */
    _propagateChanges(fallbackValue) {
        this.changed.emit({ value: this.value?.length ? this.value : '', rawValue: this.items });
        this.onModelChange(this.value);
        this._updateOverlay();
    }
    _updateOverlay() {
        if (this.picker?.container?.overlayRef) {
            setTimeout(() => {
                if (this.picker?.container?.overlayRef) {
                    this.picker.container.overlayRef.updatePosition();
                    if (this.picker?.popup?.instance) {
                        this.picker.popup.instance.selected = this.picker.selected;
                    }
                    this.changeRef.detectChanges();
                }
            });
        }
    }
    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview() {
        if (this.source.previewTemplate) {
            if (!this.popup) {
                this.popup = this.componentUtils.append(this.source.previewTemplate, this.preview);
            }
            this.popup.instance.match = { data: this.selected.data ?? this.selected.value };
        }
    }
    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview() {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipsElement, deps: [{ token: i0.ElementRef }, { token: i1$2.ComponentUtils }, { token: i1$2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoChipsElement, isStandalone: false, selector: "chips,novo-chips", inputs: { closeOnSelect: "closeOnSelect", placeholder: "placeholder", source: "source", maxlength: "maxlength", type: "type", allowCustomValues: "allowCustomValues", disablePickerInput: "disablePickerInput", overrideElement: "overrideElement", width: "width", minWidth: "minWidth", size: "size", value: "value" }, outputs: { changed: "changed", focus: "focus", blur: "blur", typing: "typing" }, host: { properties: { "class.with-value": "items.length > 0", "class.disabled": "disablePickerInput" } }, providers: [CHIPS_VALUE_ACCESSOR$1], viewQueries: [{ propertyName: "preview", first: true, predicate: ["preview"], descendants: true, read: ViewContainerRef }, { propertyName: "picker", first: true, predicate: ["picker"], descendants: true }], ngImport: i0, template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async | slice: 0:hiddenChipsLimit"
        [ngClass]="getDynamicClasses(item)"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        [size]="size"
        [value]="item.value || item"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="item | avatarType:type as avatarType" class="txc-{{ avatarType }}" novoChipAvatar>circle</novo-icon>
        <span class="chip-label">{{ item.label }}</span>
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          #picker
          clearValueOnSelect="true"
          [closeOnSelect]="closeOnSelect"
          [config]="source"
          [disablePickerInput]="disablePickerInput"
          [placeholder]="placeholder"
          [(ngModel)]="itemToAdd"
          (select)="add($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus($event)"
          (typing)="onTyping($event)"
          (blur)="onTouched($event)"
          [selected]="items"
          [width]="width"
          [minWidth]="minWidth"
          [overrideElement]="overrideElement || element"
          [allowCustomValues]="allowCustomValues"
        >
          <ng-content/>
        </novo-picker>
      </div>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `, isInline: true, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid hsl(from var(--color-dark) h s calc(l + 45));transition:all .2s ease-in-out;position:relative;padding:2px 0}:host .hidden-chips-toggle{cursor:pointer;padding-left:.5rem;line-height:2.7rem}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid hsl(from var(--color-dark) h s calc(l + 15))}:host.selected,:host.selected:hover{border-bottom:1px solid var(--color-positive)}:host.selected+i,:host.selected:hover+i{color:var(--color-positive)}:host.disabled{border-bottom-style:dashed!important}:host .novo-chip-container{flex:1;display:flex;flex-flow:row wrap;gap:.4rem;align-items:center}:host .chip-input-container{flex:1 15rem;padding-left:var(--spacing-md)}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .chip-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:var(--color-negative);cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:var(--font-color-base)}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:hsl(from var(--color-positive) h s calc(l + 35))}:host picker-results novo-list novo-list-item:hover{background-color:hsl(from var(--color-positive) h s calc(l + 35))}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#fff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}\n"], dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "allowCustomValues", "width", "minWidth", "allowTabNavigation", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing", "tab"] }, { kind: "component", type: i5.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i3.NovoLabel, selector: "novo-label,[novo-label]", inputs: ["id"] }, { kind: "component", type: NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: NovoChipAvatar, selector: "novo-chip-avatar, [novoChipAvatar]" }, { kind: "directive", type: NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.SlicePipe, name: "slice" }, { kind: "pipe", type: AvatarTypePipe, name: "avatarType" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipsElement, decorators: [{
            type: Component,
            args: [{ selector: 'chips,novo-chips', providers: [CHIPS_VALUE_ACCESSOR$1], template: `
    <div class="novo-chip-container">
      <novo-chip
        *ngFor="let item of _items | async | slice: 0:hiddenChipsLimit"
        [ngClass]="getDynamicClasses(item)"
        [class.selected]="item == selected"
        [selectable]="true"
        [disabled]="disablePickerInput"
        [size]="size"
        [value]="item.value || item"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        (deselect)="deselect($event, item)"
      >
        <novo-icon *ngIf="item | avatarType:type as avatarType" class="txc-{{ avatarType }}" novoChipAvatar>circle</novo-icon>
        <span class="chip-label">{{ item.label }}</span>
        <novo-icon *ngIf="!disablePickerInput" novoChipRemove>x</novo-icon>
      </novo-chip>
      <div *ngIf="hiddenChipsCount" class="hidden-chips-toggle" (click)="toggleHiddenChips()">
        <novo-label *ngIf="hiddenChipsLimit !== CHIPS_SHOWN_MAX" color="positive">+ {{ hiddenChipsCount }} {{ labels.more }} </novo-label>
        <novo-label *ngIf="hiddenChipsLimit === CHIPS_SHOWN_MAX" color="positive"><novo-icon>sort-asc</novo-icon> {{labels.showLess}}</novo-label>
      </div>
      <div class="chip-input-container" *ngIf="!maxlength || (maxlength && items.length < maxlength)">
        <novo-picker
          #picker
          clearValueOnSelect="true"
          [closeOnSelect]="closeOnSelect"
          [config]="source"
          [disablePickerInput]="disablePickerInput"
          [placeholder]="placeholder"
          [(ngModel)]="itemToAdd"
          (select)="add($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus($event)"
          (typing)="onTyping($event)"
          (blur)="onTouched($event)"
          [selected]="items"
          [width]="width"
          [minWidth]="minWidth"
          [overrideElement]="overrideElement || element"
          [allowCustomValues]="allowCustomValues"
        >
          <ng-content/>
        </novo-picker>
      </div>
    </div>
    <div class="preview-container">
      <span #preview></span>
    </div>
    <i class="bhi-search" [class.has-value]="items.length" *ngIf="!disablePickerInput"></i>
    <label class="clear-all" *ngIf="items.length && !disablePickerInput" (click)="clearValue()"
      >{{ labels.clearAll }} <i class="bhi-times"></i
    ></label>
  `, host: {
                        '[class.with-value]': 'items.length > 0',
                        '[class.disabled]': 'disablePickerInput',
                    }, standalone: false, styles: [":host{width:100%;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-start;border-bottom:1px solid hsl(from var(--color-dark) h s calc(l + 45));transition:all .2s ease-in-out;position:relative;padding:2px 0}:host .hidden-chips-toggle{cursor:pointer;padding-left:.5rem;line-height:2.7rem}:host.with-value{margin-bottom:20px}:host:hover{border-bottom:1px solid hsl(from var(--color-dark) h s calc(l + 15))}:host.selected,:host.selected:hover{border-bottom:1px solid var(--color-positive)}:host.selected+i,:host.selected:hover+i{color:var(--color-positive)}:host.disabled{border-bottom-style:dashed!important}:host .novo-chip-container{flex:1;display:flex;flex-flow:row wrap;gap:.4rem;align-items:center}:host .chip-input-container{flex:1 15rem;padding-left:var(--spacing-md)}:host .chip-input-container input{padding-top:0;border:none;background:transparent!important;width:100%}:host .chip-input-container input:focus{outline:none}:host .chip-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host label.clear-all{flex:1 100%;position:absolute;right:0;bottom:-20px;font-size:.9rem;color:var(--color-negative);cursor:pointer;display:flex;align-items:center}:host label.clear-all i{font-size:.7rem;padding-bottom:2px;margin-left:5px}:host i.bhi-search{position:absolute;bottom:8px;right:0;font-size:1.1em;color:var(--font-color-base)}:host+i{position:absolute;right:0;bottom:7px}:host.with-value{margin-bottom:0}:host novo-picker{position:inherit;padding-bottom:0}:host novo-picker>::ng-deep input{border:none;border-bottom:none!important}:host novo-picker>::ng-deep input:disabled{border-bottom:none!important}:host novo-picker>::ng-deep i{display:none}:host novo-picker div.picker-results-container{left:0}:host picker-results{position:absolute;color:#000}:host picker-results novo-list{max-height:49vh;overflow:auto}:host picker-results novo-list novo-list-item{flex:0 0;transition:background-color .25s}:host picker-results novo-list novo-list-item>div{width:100%}:host picker-results novo-list novo-list-item.active{background-color:hsl(from var(--color-positive) h s calc(l + 35))}:host picker-results novo-list novo-list-item:hover{background-color:hsl(from var(--color-positive) h s calc(l + 35))}:host picker-results novo-list novo-list-item item-content{flex-flow:row wrap}:host picker-results novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host picker-results .error-results,:host picker-results .no-recents,:host picker-results .null-results{text-align:center;padding:1em 0 4em}:host picker-results .error-results>i,:host picker-results .no-recents>i,:host picker-results .null-results>i{font-size:3em;margin:.5em;color:#0000004d}:host picker-results .error-results>h4,:host picker-results .error-results>p,:host picker-results .no-recents>h4,:host picker-results .no-recents>p,:host picker-results .null-results>h4,:host picker-results .null-results>p{margin:0;max-width:none;padding:0}:host picker-results .error-results>h4,:host picker-results .no-recents>h4,:host picker-results .null-results>h4{font-weight:500}:host picker-results section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}:host .preview-container entity-picker-result{background:#fff;position:absolute;top:100%;left:0;width:100%;min-width:180px;max-height:49vh;overflow:auto;z-index:9001;border:1px solid #4a89dc;transition:all .2s ease-in-out}:host .preview-container entity-picker-result .novo-list-item{flex:0 0}:host .preview-container entity-picker-result .novo-list-item>div{width:100%}:host .preview-container entity-picker-result .novo-list-item .novo-item-content{flex-flow:row wrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>*{flex:0 0 33%;white-space:nowrap}:host .preview-container entity-picker-result .novo-list-item .novo-item-content>p{min-width:15em;font-size:.9em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;padding-right:1em}entity-chip-results{max-width:none!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$2.ComponentUtils }, { type: i1$2.NovoLabelService }], propDecorators: { closeOnSelect: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], source: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], type: [{
                type: Input
            }], allowCustomValues: [{
                type: Input
            }], disablePickerInput: [{
                type: Input
            }], overrideElement: [{
                type: Input
            }], width: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], size: [{
                type: Input
            }], changed: [{
                type: Output
            }], focus: [{
                type: Output
            }], blur: [{
                type: Output
            }], typing: [{
                type: Output
            }], preview: [{
                type: ViewChild,
                args: ['preview', { read: ViewContainerRef }]
            }], picker: [{
                type: ViewChild,
                args: ['picker', { static: false }]
            }], value: [{
                type: Input
            }] } });

// NG2
// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoRowChipsElement),
    multi: true,
};
class NovoRowChipElement extends NovoChipElement {
    onSelect(e) {
        return false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRowChipElement, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoRowChipElement, isStandalone: false, selector: "novo-row-chip", host: { attributes: { "role": "option" }, listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)", "focus": "focus()", "blur": "_blur()" }, properties: { "attr.tabindex": "disabled ? null : tabIndex", "class.novo-row-chip-selected": "selected", "class.novo-row-chip-with-trailing-icon": "removeIcon", "class.novo-row-chip-disabled": "disabled", "attr.disabled": "disabled || null", "attr.aria-disabled": "disabled.toString()", "attr.aria-selected": "ariaSelected" }, classAttribute: "novo-row-chip novo-focus-indicator" }, usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRowChipElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-row-chip',
                    template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      <i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
    </div>
  `,
                    host: {
                        class: 'novo-row-chip novo-focus-indicator',
                        '[attr.tabindex]': 'disabled ? null : tabIndex',
                        role: 'option',
                        '[class.novo-row-chip-selected]': 'selected',
                        '[class.novo-row-chip-with-trailing-icon]': 'removeIcon',
                        '[class.novo-row-chip-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-selected]': 'ariaSelected',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                    },
                    standalone: false,
                }]
        }] });
class NovoRowChipsElement extends NovoChipsElement {
    constructor(element, componentUtils, labels) {
        super(element, componentUtils, labels);
        this.closeOnSelect = true;
    }
    onKeyDown(event) {
        return;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRowChipsElement, deps: [{ token: i0.ElementRef }, { token: i1$2.ComponentUtils }, { token: i1$2.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.19", type: NovoRowChipsElement, isStandalone: false, selector: "novo-row-chips", inputs: { closeOnSelect: "closeOnSelect" }, host: { properties: { "class.with-value": "items.length > 0" } }, providers: [CHIPS_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" [style.flexBasis.px]="column.width || 200" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div
        class="column-data"
        [class.show-overflow]="column.showOverflow"
        [class.editable]="column.editable"
        [style.flexBasis.px]="column.width || 200"
        *ngFor="let column of source.columns"
      >
        <ng-container *ngIf="column.editable">
          <novo-checkbox *ngIf="column.type === 'checkbox'" [(ngModel)]="item.value[column.name]" [disabled]="!column.editable"></novo-checkbox>
          <novo-field *ngIf="column.type !== 'checkbox'">
            <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
          </novo-field>
        </ng-container>
        <ng-container *ngIf="!column.editable">
          <span>{{ column.data(item) }}</span>
        </ng-container>
      </div>
    </novo-row-chip>
    <novo-picker
      clearValueOnSelect="true"
      [closeOnSelect]="closeOnSelect"
      [config]="source"
      [disablePickerInput]="disablePickerInput"
      [hidden]="disablePickerInput"
      [placeholder]="placeholder"
      [(ngModel)]="itemToAdd"
      (select)="add($event)"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (typing)="onTyping($event)"
      (blur)="onTouched($event)"
      [selected]="items"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-flow:column;gap:.8rem}:host ::ng-deep .novo-row-chips-columns{display:flex;align-items:flex-end;margin-bottom:1em}:host ::ng-deep .novo-row-chips-columns .column-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1;margin-right:1em}:host ::ng-deep .novo-row-chips-columns .column-label.text-capitalize{text-transform:capitalize}:host ::ng-deep .novo-row-chips-columns .column-label.text-uppercase{text-transform:uppercase}:host ::ng-deep .novo-row-chips-columns .column-label.text-nowrap{white-space:nowrap}:host ::ng-deep .novo-row-chips-columns .column-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-default{font-size:inherit}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-body{font-size:var(--font-size-body)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xs{font-size:var(--font-size-xs)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-sm{font-size:var(--font-size-sm)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-md{font-size:var(--font-size-md)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-lg{font-size:var(--font-size-lg)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xl{font-size:var(--font-size-xl)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-2xl{font-size:var(--font-size-2xl)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-3xl{font-size:var(--font-size-3xl)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-smaller{font-size:.8em}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-larger{font-size:1.2em}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-black{color:var(--color-black)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-white{color:var(--color-white)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-gray{color:var(--color-gray)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grey{color:var(--color-grey)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-offWhite{color:var(--color-off-white)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bright{color:var(--color-bright)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-light{color:var(--color-light)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-neutral{color:var(--color-neutral)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-dark{color:var(--color-dark)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-orange{color:var(--color-orange)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navigation{color:var(--color-navigation)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-skyBlue{color:var(--color-sky-blue)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-steel{color:var(--color-steel)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-metal{color:var(--color-metal)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sand{color:var(--color-sand)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-silver{color:var(--color-silver)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-stone{color:var(--color-stone)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ash{color:var(--color-ash)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-anonymous{color:var(--color-anonymous)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-slate{color:var(--color-slate)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-onyx{color:var(--color-onyx)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-charcoal{color:var(--color-charcoal)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-moonlight{color:var(--color-moonlight)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-midnight{color:var(--color-midnight)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-darkness{color:var(--color-darkness)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navy{color:var(--color-navy)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-aqua{color:var(--color-aqua)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ocean{color:var(--color-ocean)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mint{color:var(--color-mint)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grass{color:var(--color-grass)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sunflower{color:var(--color-sunflower)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bittersweet{color:var(--color-bittersweet)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grapefruit{color:var(--color-grapefruit)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-carnation{color:var(--color-carnation)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lavender{color:var(--color-lavender)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mountain{color:var(--color-mountain)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-info{color:var(--color-info)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-positive{color:var(--color-positive)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-success{color:var(--color-success)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-negative{color:var(--color-negative)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-danger{color:var(--color-danger)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-error{color:var(--color-error)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-warning{color:var(--color-warning)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-empty{color:var(--color-empty)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-disabled{color:var(--color-disabled)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-background{color:var(--color-background)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-backgroundDark{color:var(--color-background-dark)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-border{color:var(--color-border)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-border2{color:var(--color-border2)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-text{color:var(--color-text)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-presentation{color:var(--color-presentation)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bullhorn{color:var(--color-bullhorn)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-pulse{color:var(--color-pulse)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-fastFind{color:var(--color-fast-find)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-toast{color:var(--color-toast)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-company{color:var(--color-company)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-candidate{color:var(--color-candidate)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lead{color:var(--color-lead)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contact{color:var(--color-contact)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-clientcontact{color:var(--color-clientcontact)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-opportunity{color:var(--color-opportunity)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-job{color:var(--color-job)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-joborder{color:var(--color-joborder)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-submission{color:var(--color-submission)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sendout{color:var(--color-sendout)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-placement{color:var(--color-placement)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-note{color:var(--color-note)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contract{color:var(--color-contract)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-task{color:var(--color-task)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-jobCode{color:var(--color-job-code)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-earnCode{color:var(--color-earn-code)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-billableCharge{color:var(--color-billable-charge)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-payableCharge{color:var(--color-payable-charge)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-user{color:var(--color-user)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-corporateUser{color:var(--color-corporate-user)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-distributionList{color:var(--color-distribution-list)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-credential{color:var(--color-credential)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-person{color:var(--color-person)}:host ::ng-deep .novo-row-chips-columns .column-label.margin-before{margin-top:.4rem}:host ::ng-deep .novo-row-chips-columns .column-label.margin-after{margin-bottom:.8rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-small{max-width:40ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-medium{max-width:55ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-large{max-width:70ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-thin{font-weight:var(--font-weight-thin)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-light{font-weight:var(--font-weight-light)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-normal{font-weight:var(--font-weight-normal)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-medium{font-weight:var(--font-weight-medium)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bold{font-weight:var(--font-weight-bold)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-lighter{font-weight:lighter}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bolder{font-weight:bolder}:host ::ng-deep .novo-row-chips-columns .column-label:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data{display:flex;align-items:center;background:transparent!important;border:none;border-bottom:1px dashed hsl(from var(--color-dark) h s calc(l + 30));border-radius:0;outline:none;height:2em;width:100%;margin:0 1em 0 0}:host ::ng-deep .novo-row-chips-columns .column-data.editable{border-bottom:none}:host ::ng-deep .novo-row-chips-columns .column-data.editable input{background:none;border:none}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow{height:unset}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow span{overflow:visible;text-overflow:unset;max-height:unset}:host ::ng-deep .novo-row-chips-columns .column-data:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data span{color:inherit;align-items:flex-start;display:flex;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;line-height:1em;max-height:2em;min-height:1em}:host ::ng-deep .novo-row-chips-columns i.bhi-delete-o{color:var(--color-negative)}:host .novo-chip.novo-row-chip{padding:0}:host .novo-row-chips-empty-message{font-style:italic;color:#9e9e9e}:host i{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4$1.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i4.NovoPickerElement, selector: "novo-picker", inputs: ["config", "placeholder", "clearValueOnSelect", "closeOnSelect", "selected", "appendToBody", "parentScrollSelector", "parentScrollAction", "containerClass", "side", "autoSelectFirstOption", "overrideElement", "maxlength", "allowCustomValues", "width", "minWidth", "allowTabNavigation", "disablePickerInput"], outputs: ["changed", "select", "focus", "blur", "typing", "tab"] }, { kind: "component", type: i6.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i6.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "component", type: NovoRowChipElement, selector: "novo-row-chip" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoRowChipsElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-row-chips', providers: [CHIPS_VALUE_ACCESSOR], host: {
                        '[class.with-value]': 'items.length > 0',
                    }, template: `
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" [style.flexBasis.px]="column.width || 200" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div
        class="column-data"
        [class.show-overflow]="column.showOverflow"
        [class.editable]="column.editable"
        [style.flexBasis.px]="column.width || 200"
        *ngFor="let column of source.columns"
      >
        <ng-container *ngIf="column.editable">
          <novo-checkbox *ngIf="column.type === 'checkbox'" [(ngModel)]="item.value[column.name]" [disabled]="!column.editable"></novo-checkbox>
          <novo-field *ngIf="column.type !== 'checkbox'">
            <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
          </novo-field>
        </ng-container>
        <ng-container *ngIf="!column.editable">
          <span>{{ column.data(item) }}</span>
        </ng-container>
      </div>
    </novo-row-chip>
    <novo-picker
      clearValueOnSelect="true"
      [closeOnSelect]="closeOnSelect"
      [config]="source"
      [disablePickerInput]="disablePickerInput"
      [hidden]="disablePickerInput"
      [placeholder]="placeholder"
      [(ngModel)]="itemToAdd"
      (select)="add($event)"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (typing)="onTyping($event)"
      (blur)="onTouched($event)"
      [selected]="items"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `, standalone: false, styles: [":host{display:flex;flex-flow:column;gap:.8rem}:host ::ng-deep .novo-row-chips-columns{display:flex;align-items:flex-end;margin-bottom:1em}:host ::ng-deep .novo-row-chips-columns .column-label{font-weight:500;word-break:word-break;overflow-wrap:break-word;line-height:1.375;color:var(--text-muted);font-size:var(--font-size-label);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1;margin-right:1em}:host ::ng-deep .novo-row-chips-columns .column-label.text-capitalize{text-transform:capitalize}:host ::ng-deep .novo-row-chips-columns .column-label.text-uppercase{text-transform:uppercase}:host ::ng-deep .novo-row-chips-columns .column-label.text-nowrap{white-space:nowrap}:host ::ng-deep .novo-row-chips-columns .column-label.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-default{font-size:inherit}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-body{font-size:var(--font-size-body)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xs{font-size:var(--font-size-xs)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-sm{font-size:var(--font-size-sm)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-md{font-size:var(--font-size-md)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-lg{font-size:var(--font-size-lg)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-xl{font-size:var(--font-size-xl)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-2xl{font-size:var(--font-size-2xl)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-3xl{font-size:var(--font-size-3xl)}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-smaller{font-size:.8em}:host ::ng-deep .novo-row-chips-columns .column-label.text-size-larger{font-size:1.2em}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-black{color:var(--color-black)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-white{color:var(--color-white)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-gray{color:var(--color-gray)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grey{color:var(--color-grey)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-offWhite{color:var(--color-off-white)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bright{color:var(--color-bright)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-light{color:var(--color-light)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-neutral{color:var(--color-neutral)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-dark{color:var(--color-dark)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-orange{color:var(--color-orange)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navigation{color:var(--color-navigation)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-skyBlue{color:var(--color-sky-blue)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-steel{color:var(--color-steel)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-metal{color:var(--color-metal)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sand{color:var(--color-sand)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-silver{color:var(--color-silver)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-stone{color:var(--color-stone)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ash{color:var(--color-ash)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-anonymous{color:var(--color-anonymous)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-slate{color:var(--color-slate)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-onyx{color:var(--color-onyx)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-charcoal{color:var(--color-charcoal)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-moonlight{color:var(--color-moonlight)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-midnight{color:var(--color-midnight)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-darkness{color:var(--color-darkness)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-navy{color:var(--color-navy)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-aqua{color:var(--color-aqua)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-ocean{color:var(--color-ocean)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mint{color:var(--color-mint)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grass{color:var(--color-grass)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sunflower{color:var(--color-sunflower)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bittersweet{color:var(--color-bittersweet)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-grapefruit{color:var(--color-grapefruit)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-carnation{color:var(--color-carnation)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lavender{color:var(--color-lavender)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-mountain{color:var(--color-mountain)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-info{color:var(--color-info)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-positive{color:var(--color-positive)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-success{color:var(--color-success)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-negative{color:var(--color-negative)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-danger{color:var(--color-danger)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-error{color:var(--color-error)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-warning{color:var(--color-warning)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-empty{color:var(--color-empty)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-disabled{color:var(--color-disabled)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-background{color:var(--color-background)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-backgroundDark{color:var(--color-background-dark)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-border{color:var(--color-border)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-border2{color:var(--color-border2)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-text{color:var(--color-text)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-presentation{color:var(--color-presentation)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-bullhorn{color:var(--color-bullhorn)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-pulse{color:var(--color-pulse)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-fastFind{color:var(--color-fast-find)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-toast{color:var(--color-toast)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-company{color:var(--color-company)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-candidate{color:var(--color-candidate)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-lead{color:var(--color-lead)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contact{color:var(--color-contact)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-clientcontact{color:var(--color-clientcontact)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-opportunity{color:var(--color-opportunity)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-job{color:var(--color-job)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-joborder{color:var(--color-joborder)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-submission{color:var(--color-submission)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-sendout{color:var(--color-sendout)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-placement{color:var(--color-placement)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-note{color:var(--color-note)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-contract{color:var(--color-contract)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-task{color:var(--color-task)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-jobCode{color:var(--color-job-code)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-earnCode{color:var(--color-earn-code)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-invoiceStatement{color:var(--color-invoice-statement)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-billableCharge{color:var(--color-billable-charge)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-payableCharge{color:var(--color-payable-charge)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-user{color:var(--color-user)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-corporateUser{color:var(--color-corporate-user)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-distributionList{color:var(--color-distribution-list)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-credential{color:var(--color-credential)}:host ::ng-deep .novo-row-chips-columns .column-label.text-color-person{color:var(--color-person)}:host ::ng-deep .novo-row-chips-columns .column-label.margin-before{margin-top:.4rem}:host ::ng-deep .novo-row-chips-columns .column-label.margin-after{margin-bottom:.8rem}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-small{max-width:40ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-medium{max-width:55ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-length-large{max-width:70ch}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-hairline{font-weight:var(--font-weight-hairline)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-thin{font-weight:var(--font-weight-thin)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-light{font-weight:var(--font-weight-light)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-normal{font-weight:var(--font-weight-normal)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-medium{font-weight:var(--font-weight-medium)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-semibold{font-weight:var(--font-weight-semibold)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bold{font-weight:var(--font-weight-bold)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-extrabold{font-weight:var(--font-weight-extrabold)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-heavy{font-weight:var(--font-weight-heavy)}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-lighter{font-weight:lighter}:host ::ng-deep .novo-row-chips-columns .column-label.text-weight-bolder{font-weight:bolder}:host ::ng-deep .novo-row-chips-columns .column-label:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data{display:flex;align-items:center;background:transparent!important;border:none;border-bottom:1px dashed hsl(from var(--color-dark) h s calc(l + 30));border-radius:0;outline:none;height:2em;width:100%;margin:0 1em 0 0}:host ::ng-deep .novo-row-chips-columns .column-data.editable{border-bottom:none}:host ::ng-deep .novo-row-chips-columns .column-data.editable input{background:none;border:none}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow{height:unset}:host ::ng-deep .novo-row-chips-columns .column-data.show-overflow span{overflow:visible;text-overflow:unset;max-height:unset}:host ::ng-deep .novo-row-chips-columns .column-data:first-of-type{flex:0 0 275px}:host ::ng-deep .novo-row-chips-columns .column-data span{color:inherit;align-items:flex-start;display:flex;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;line-height:1em;max-height:2em;min-height:1em}:host ::ng-deep .novo-row-chips-columns i.bhi-delete-o{color:var(--color-negative)}:host .novo-chip.novo-row-chip{padding:0}:host .novo-row-chips-empty-message{font-style:italic;color:#9e9e9e}:host i{cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$2.ComponentUtils }, { type: i1$2.NovoLabelService }], propDecorators: { closeOnSelect: [{
                type: Input
            }] } });

// NG2
class NovoChipsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoChipsModule, declarations: [NovoChipElement,
            NovoChipAvatar,
            NovoChipRemove,
            NovoChipInput,
            NovoChipList,
            NovoChipsElement,
            NovoRowChipElement,
            NovoRowChipsElement,
            AvatarTypePipe], imports: [CommonModule, FormsModule, NovoCheckboxModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule], exports: [NovoChipElement,
            NovoChipAvatar,
            NovoChipRemove,
            NovoChipInput,
            NovoChipList,
            NovoChipsElement,
            NovoRowChipElement,
            NovoRowChipsElement,
            AvatarTypePipe] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipsModule, providers: [
            ErrorStateMatcher,
            {
                provide: NOVO_CHIPS_DEFAULT_OPTIONS,
                useValue: {
                    separatorKeyCodes: ["Enter" /* Key.Enter */],
                },
            },
        ], imports: [CommonModule, FormsModule, NovoCheckboxModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoCheckboxModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule],
                    declarations: [
                        NovoChipElement,
                        NovoChipAvatar,
                        NovoChipRemove,
                        NovoChipInput,
                        NovoChipList,
                        NovoChipsElement,
                        NovoRowChipElement,
                        NovoRowChipsElement,
                        AvatarTypePipe,
                    ],
                    exports: [
                        NovoChipElement,
                        NovoChipAvatar,
                        NovoChipRemove,
                        NovoChipInput,
                        NovoChipList,
                        NovoChipsElement,
                        NovoRowChipElement,
                        NovoRowChipsElement,
                        AvatarTypePipe,
                    ],
                    providers: [
                        ErrorStateMatcher,
                        {
                            provide: NOVO_CHIPS_DEFAULT_OPTIONS,
                            useValue: {
                                separatorKeyCodes: ["Enter" /* Key.Enter */],
                            },
                        },
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AvatarTypePipe, NOVO_CHIPS_DEFAULT_OPTIONS, NovoChipAvatar, NovoChipElement, NovoChipInput, NovoChipList, NovoChipListChange, NovoChipRemove, NovoChipSelectionChange, NovoChipsElement, NovoChipsModule, NovoRowChipElement, NovoRowChipsElement, REMOVABLE_REF };
//# sourceMappingURL=novo-elements-elements-chips.mjs.map
