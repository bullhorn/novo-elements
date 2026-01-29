import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { EventEmitter, ViewChild, Input, Output, ContentChildren, Attribute, Optional, Inject, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { Subscription, fromEvent, merge, of, interval } from 'rxjs';
import { take, debounce } from 'rxjs/operators';
import { BooleanInput } from 'novo-elements/utils';
import * as i1 from 'novo-elements/elements/common';
import { mixinOverlay, mixinDisabled, NovoOverlayTemplateComponent, NovoOptgroup, NovoOption, NOVO_OPTION_PARENT_COMPONENT, NOVO_OVERLAY_CONTAINER, NovoOverlayModule, NovoOptionModule, NovoCommonModule } from 'novo-elements/elements/common';
import * as i3 from 'novo-elements/elements/field';
import { NOVO_FORM_FIELD, NovoFieldModule } from 'novo-elements/elements/field';
import * as i2 from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoChipsModule } from 'novo-elements/elements/chips';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Event object that is emitted when an autocomplete option is selected. */
class NovoOptionSelectedEvent {
    constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    source, 
    /** Option that was selected. */
    option) {
        this.source = source;
        this.option = option;
    }
}
// Boilerplate for applying mixins
class NovoAutocompleteBase {
    constructor() { }
}
const NovoAutocompleteMixins = mixinOverlay(mixinDisabled(NovoAutocompleteBase));
class NovoAutocompleteElement extends NovoAutocompleteMixins {
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this._formField?._control) {
            return this._formField._control.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        super();
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._activeOptionChanges = Subscription.EMPTY;
        this._selectedOptionChanges = Subscription.EMPTY;
        this._keyDownChanges = Subscription.EMPTY;
        /** Event that is emitted whenever an option from the list is selected. */
        this.optionSelected = new EventEmitter();
        /** Emits whenever an option is activated using the keyboard. */
        this.optionActivated = new EventEmitter();
        /** Key to use to trigger autocomplete. used for textarea. */
        this.triggerOn = (control) => control.focused;
        /** Function that maps an option's control value to its display value in the trigger. */
        this.displayWith = null;
        this._multiple = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    ngOnChanges(changes) {
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
        this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
        this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
            this.optionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
        });
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
        this._keyDownChanges = fromEvent(this.element.nativeElement, 'keydown').subscribe((event) => this._handleKeydown(event));
        this.options.changes.subscribe(() => {
            this._watchStateChanges();
            this._watchSelectionEvents();
            Promise.resolve().then(() => {
                this.checkSelectedOptions();
                if (this.makeFirstItemActive && this.options.length > 0) {
                    this._keyManager.setFirstItemActive();
                }
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
    _setTriggerValue(option) {
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
            }
            else if (controlType === 'chip-list') {
                const chipList = this._formField._control;
                const currentValue = this._formField._control.value;
                if (currentValue.includes(optionValue)) {
                    chipList.removeValue(optionValue);
                }
                else {
                    chipList.addValue(optionValue);
                }
            }
            else {
                let valueToEmit = optionValue;
                if (this.multiple) {
                    const currentValue = this._formField._control.value;
                    if (Array.isArray(currentValue)) {
                        if (currentValue.includes(optionValue)) {
                            valueToEmit = currentValue.filter((it) => it === optionValue);
                        }
                        else {
                            valueToEmit = [...currentValue, optionValue];
                        }
                    }
                    else if (currentValue === optionValue) {
                        valueToEmit = [];
                    }
                    else {
                        valueToEmit = [currentValue, optionValue];
                    }
                }
                this._formField._control.value = valueToEmit;
            }
        }
        else {
            console.warn('AutoComplete only intended to be used within a NovoField');
        }
        this._previousValue = optionValue;
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    _clearPreviousSelectedOption(skip) {
        this.options.forEach((option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    /** Emits the `select` event. */
    _emitSelectEvent(option) {
        const event = new NovoOptionSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    _setValueAndClose(event) {
        if (event && event.source) {
            if (!this.multiple) {
                this._clearPreviousSelectedOption(event.source);
            }
            this._setTriggerValue(event.source);
            this._emitSelectEvent(event.source);
            this._watchSelectionEvents();
        }
        if (!this.multiple) {
            this.closePanel();
        }
    }
    _watchSelectionEvents() {
        const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
        this._selectedOptionChanges.unsubscribe();
        this._selectedOptionChanges = selectionEvents.pipe(take(1)).subscribe((evt) => {
            this._setValueAndClose(evt);
        });
    }
    _watchStateChanges() {
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
    get activeOption() {
        if (this._keyManager) {
            return this._keyManager.activeItem;
        }
        return null;
    }
    _handleKeydown(event) {
        const key = event.key;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (key === "Escape" /* Key.Escape */ && !hasModifierKey(event)) {
            event.preventDefault();
        }
        if (this.activeOption && key === "Enter" /* Key.Enter */ && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            event.preventDefault();
        }
        else {
            const prevActiveItem = this._keyManager.activeItem;
            const isArrowKey = key === "ArrowUp" /* Key.ArrowUp */ || key === "ArrowDown" /* Key.ArrowDown */;
            if (this.panelOpen || key === "Tab" /* Key.Tab */) {
                this._keyManager.onKeydown(event);
            }
            else if (isArrowKey && !this.overlay.panelOpen) {
                this.openPanel();
            }
        }
    }
    checkSelectedOptions() {
        if (this.multiple && Array.isArray(this._formField._control.value)) {
            const value = this._formField._control.value;
            this.options.forEach((option) => option.deselect());
            value.forEach((currentValue) => this._selectValue(currentValue));
        }
    }
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    _selectValue(value) {
        const correspondingOption = this.options.find((option) => {
            return option.value === value;
        });
        correspondingOption?.select();
        return correspondingOption;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAutocompleteElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoAutocompleteElement, isStandalone: false, selector: "novo-autocomplete", inputs: { tabIndex: "tabIndex", triggerOn: "triggerOn", displayWith: "displayWith", ariaLabel: ["aria-label", "ariaLabel"], multiple: "multiple", disabled: "disabled", makeFirstItemActive: "makeFirstItemActive" }, outputs: { optionSelected: "optionSelected", optionActivated: "optionActivated" }, host: { properties: { "attr.tabindex": "disabled ? null : -1" }, classAttribute: "novo-autocomplete" }, providers: [
            { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement },
            { provide: NOVO_OVERLAY_CONTAINER, useExisting: NovoAutocompleteElement },
        ], queries: [{ propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoAutocomplete"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>", styles: [".novo-autocomplete-options{background-color:var(--background-bright);cursor:default;list-style:none;padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}\n"], dependencies: [{ kind: "component", type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }, { kind: "directive", type: i2.CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NovoAutocompleteElement.prototype, "disabled", null);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoAutocompleteElement.prototype, "makeFirstItemActive", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAutocompleteElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-autocomplete', host: {
                        class: 'novo-autocomplete',
                        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                        // consumer may have provided, while still being able to receive focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                    }, providers: [
                        { provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoAutocompleteElement },
                        { provide: NOVO_OVERLAY_CONTAINER, useExisting: NovoAutocompleteElement },
                    ], exportAs: 'novoAutocomplete', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<novo-overlay-template [parent]=\"element\" position=\"above-below\">\n  <div class=\"novo-autocomplete-options\" cdk-scrollable>\n    <ng-content></ng-content>\n  </div>\n</novo-overlay-template>", styles: [".novo-autocomplete-options{background-color:var(--background-bright);cursor:default;list-style:none;padding-inline-start:0px!important;box-shadow:0 -1px 3px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i3.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_FORM_FIELD]
                }] }], propDecorators: { optionGroups: [{
                type: ContentChildren,
                args: [NovoOptgroup, { descendants: true }]
            }], options: [{
                type: ContentChildren,
                args: [NovoOption, { descendants: true }]
            }], optionSelected: [{
                type: Output
            }], optionActivated: [{
                type: Output
            }], tabIndex: [{
                type: Input
            }], triggerOn: [{
                type: Input
            }], displayWith: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], multiple: [{
                type: Input
            }], disabled: [{
                type: Input
            }], makeFirstItemActive: [{
                type: Input
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });

class NovoAutoCompleteModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAutoCompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoAutoCompleteModule, declarations: [NovoAutocompleteElement], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule], exports: [NovoAutocompleteElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAutoCompleteModule, imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoAutoCompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, NovoFieldModule, NovoChipsModule],
                    declarations: [NovoAutocompleteElement],
                    exports: [NovoAutocompleteElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoAutoCompleteModule, NovoAutocompleteElement, NovoOptionSelectedEvent };
//# sourceMappingURL=novo-elements-elements-autocomplete.mjs.map
