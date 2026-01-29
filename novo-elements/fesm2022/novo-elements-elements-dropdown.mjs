import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { Directive, EventEmitter, HostListener, Input, ViewChild, ContentChildren, ContentChild, Output, Component, NgModule } from '@angular/core';
import { Subscription, Subject, merge, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NovoButtonElement } from 'novo-elements/elements/button';
import * as i1 from 'novo-elements/elements/common';
import { mixinOverlay, mixinTabIndex, mixinDisabled, _countGroupLabelsBeforeOption, _getOptionScrollPosition, NovoOverlayTemplateComponent, NovoOptgroup, NovoOption, NovoOverlayModule, NovoOptionModule } from 'novo-elements/elements/common';
import { notify, BooleanInput } from 'novo-elements/utils';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoDropDownTrigger {
    constructor(element) {
        this.element = element;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropDownTrigger, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDropDownTrigger, isStandalone: false, selector: "[dropdownTrigger]", host: { classAttribute: "novo-dropdown-trigger" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropDownTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dropdownTrigger]',
                    host: {
                        class: 'novo-dropdown-trigger',
                    },
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }] });
// Create Base Class from Mixins
// Boilerplate for applying mixins
class NovoDropdownBase {
    constructor() { }
}
const NovoDropdownMixins = mixinOverlay(mixinTabIndex(mixinDisabled(NovoDropdownBase), 1));
class NovoDropdownElement extends NovoDropdownMixins {
    /** Whether the user should be allowed to select multiple options. */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    /** Whether the dropdown should scroll to the active item whenever it is opened. */
    get scrollToActiveItemOnOpen() {
        return this._scrollToActiveItemOnOpen;
    }
    set scrollToActiveItemOnOpen(value) {
        this._scrollToActiveItemOnOpen = coerceBooleanProperty(value);
    }
    get button() {
        return this._trigger || this._button;
    }
    constructor(element, ref) {
        super();
        this.element = element;
        this.ref = ref;
        this.parentScrollAction = 'close';
        this.side = 'default';
        this.scrollStrategy = 'reposition';
        /**
         * Keep dropdown open after an item is selected
         */
        this.keepOpen = false;
        this.width = -1; // Defaults to dynamic width (no hardcoded width value and no host width lookup)
        this.appendToBody = false; // Deprecated
        this.toggled = new EventEmitter();
        this._selectedOptionChanges = Subscription.EMPTY;
        /** The Subject to complete all subscriptions when destroyed. */
        this._onDestroy = new Subject();
        this._multiple = false;
        this._scrollToActiveItemOnOpen = false;
        this.clickHandler = this.togglePanel.bind(this);
        this.closeHandler = this.closePanel.bind(this);
    }
    ngOnInit() {
        if (this.appendToBody) {
            notify('\'appendToBody\' has been deprecated. Please remove this attribute.');
        }
    }
    ngAfterContentInit() {
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
    ngAfterViewInit() {
        this._watchPanelEvents();
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
        // Remove listener
        if (this.button) {
            this.button.element.nativeElement.removeEventListener('click', this.clickHandler);
        }
    }
    focus(options) {
        if (!this.disabled) {
            this.element.nativeElement.focus(options);
        }
    }
    openPanel() {
        super.openPanel();
        if (this.scrollToActiveItemOnOpen) {
            this._scrollOptionIntoView(this.findFirstSelectedOptionIndex(this.options) || 0);
        }
    }
    findFirstSelectedOptionIndex(options) {
        return options.toArray().findIndex((option) => {
            return option.selected === true;
        });
    }
    set items(items) { }
    /** Handles all keydown events on the dropdown. */
    _handleKeydown(event) {
        if (!this.disabled) {
            this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
        }
    }
    /** Handles keyboard events while the dropdown is closed. */
    _handleClosedKeydown(event) {
        const key = event.key;
        const isArrowKey = key === "ArrowDown" /* Key.ArrowDown */ || key === "ArrowUp" /* Key.ArrowUp */ || key === "ArrowLeft" /* Key.ArrowLeft */ || key === "ArrowRight" /* Key.ArrowRight */;
        const isOpenKey = key === "Enter" /* Key.Enter */ || key === " " /* Key.Space */;
        const manager = this._keyManager;
        // Open the select on ALT + arrow key to match the native <select>
        if ((!manager.isTyping() && isOpenKey && !hasModifierKey(event)) || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.openPanel();
        }
    }
    /** Handles keyboard events when the dropdown is open. */
    _handleOpenKeydown(event) {
        const manager = this._keyManager;
        const key = event.key;
        const isArrowKey = key === "ArrowDown" /* Key.ArrowDown */ || key === "ArrowUp" /* Key.ArrowUp */;
        const isTyping = manager.isTyping();
        const isInputField = event.target;
        if (isArrowKey && event.altKey) {
            // Close the dropdown on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.closePanel();
            // Don't do anything in this case if the user is typing,
            // because the typing sequence can include the space key.
        }
        else if (!isTyping && (key === "Enter" /* Key.Enter */ || key === " " /* Key.Space */) && manager.activeItem && !hasModifierKey(event)) {
            event.preventDefault();
            this._multiple ? manager.activeItem._selectViaInteraction() : manager.activeItem._clickViaInteraction();
        }
        else if (!isTyping && this._multiple && ['a', 'A'].includes(key) && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some((opt) => !opt.disabled && !opt.selected);
            this.options.forEach((option) => {
                if (!option.disabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
        }
        else if ("Escape" /* Key.Escape */ === key) {
            this.closePanel();
        }
        else {
            const previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    }
    _watchPanelEvents() {
        const panelStateChanges = merge(this.overlay.opening, this.overlay.closing);
        panelStateChanges.pipe(takeUntil(this._onDestroy)).subscribe((event) => this.toggled.emit(event));
    }
    _watchSelectionEvents() {
        const selectionEvents = this.options ? merge(...this.options.map((option) => option.onSelectionChange)) : of();
        this._selectedOptionChanges.unsubscribe();
        this._selectedOptionChanges = selectionEvents.pipe(takeUntil(this._onDestroy)).subscribe((event) => {
            if (event.isUserInput && !this.multiple) {
                this._clearPreviousSelectedOption(this._keyManager.activeItem);
                event.source.select();
                if (!this.keepOpen && this.panelOpen) {
                    this.closePanel();
                    this.focus();
                }
            }
            else {
                event.source.select();
            }
        });
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
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    _initKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withTypeAhead(250).withHomeAndEnd();
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
    _scrollOptionIntoView(index) {
        const labelCount = _countGroupLabelsBeforeOption(index, this.options, this.optionGroups);
        const itemHeight = this._getItemHeight();
        this.panel.nativeElement.scrollTop = _getOptionScrollPosition((index + labelCount) * itemHeight, itemHeight, this.panel.nativeElement.scrollTop, this.panel.nativeElement.offsetHeight);
    }
    /** Calculates the height of the select's options. */
    _getItemHeight() {
        const [first] = this.options;
        if (first) {
            return first._getHostElement().offsetHeight;
        }
        return 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDropdownElement, isStandalone: false, selector: "novo-dropdown", inputs: { parentScrollSelector: "parentScrollSelector", parentScrollAction: "parentScrollAction", containerClass: "containerClass", side: "side", scrollStrategy: "scrollStrategy", keepOpen: "keepOpen", height: "height", width: "width", appendToBody: "appendToBody", multiple: "multiple", scrollToActiveItemOnOpen: "scrollToActiveItemOnOpen" }, outputs: { toggled: "toggled" }, host: { listeners: { "keydown": "_handleKeydown($event)" }, properties: { "attr.tabIndex": "disabled ? -1 : 0" } }, queries: [{ propertyName: "_button", first: true, predicate: NovoButtonElement, descendants: true }, { propertyName: "_trigger", first: true, predicate: NovoDropDownTrigger, descendants: true }, { propertyName: "optionGroups", predicate: NovoOptgroup, descendants: true }, { propertyName: "options", predicate: NovoOption, descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.max-height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{display:inline-block;position:relative;outline:none}:host ::ng-deep .novo-dropdown-trigger{cursor:pointer;-webkit-appearance:none}:host ::ng-deep button,:host ::ng-deep novo-button{position:relative;z-index:0}:host ::ng-deep button .novo-button-icon,:host ::ng-deep novo-button .novo-button-icon{font-size:.8em!important;width:1em!important;height:1em!important;margin:0 .5em}.dropdown-container{background-color:var(--background-bright, #f7f7f7);list-style:none;margin:0;padding:0;min-width:180px;margin-top:.5rem;margin-bottom:.5rem;box-shadow:0 4px 10px #00000040}.dropdown-container.has-height{overflow:auto}.dropdown-container ::ng-deep list dropdown-item-header{color:#9e9e9e;font-size:.8em;flex:1;font-weight:500;text-transform:uppercase;padding:.5rem 1rem;display:block}.dropdown-container ::ng-deep list hr{border:none;height:1px;background:#dbdbdb}.dropdown-container.novo-table-dropdown-cell ::ng-deep list{max-height:400px;display:block;overflow:auto;padding:5px 0}.dropdown-container.novo-table-dropdown-cell ::ng-deep item{height:30px!important;padding:0 16px!important}.dropdown-container.novo-table-dropdown-cell ::ng-deep item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}.dropdown-container.novo-table-dropdown-cell ::ng-deep item.active{font-weight:500}.dropdown-container.novo-table-dropdown-cell ::ng-deep dropdown-item-header{padding:0 10px!important}\n"], dependencies: [{ kind: "component", type: i1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }] }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoDropdownElement.prototype, "keepOpen", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-dropdown', template: `
    <ng-content select="button,novo-button,[dropdownTrigger]" #trigger></ng-content>
    <novo-overlay-template [parent]="element" [width]="width" [position]="side" [scrollStrategy]="scrollStrategy">
      <div #panel class="dropdown-container {{ containerClass }}" [style.max-height.px]="height" [class.has-height]="!!height">
        <ng-content></ng-content>
      </div>
    </novo-overlay-template>
  `, host: {
                        '[attr.tabIndex]': 'disabled ? -1 : 0',
                    }, standalone: false, styles: [":host{display:inline-block;position:relative;outline:none}:host ::ng-deep .novo-dropdown-trigger{cursor:pointer;-webkit-appearance:none}:host ::ng-deep button,:host ::ng-deep novo-button{position:relative;z-index:0}:host ::ng-deep button .novo-button-icon,:host ::ng-deep novo-button .novo-button-icon{font-size:.8em!important;width:1em!important;height:1em!important;margin:0 .5em}.dropdown-container{background-color:var(--background-bright, #f7f7f7);list-style:none;margin:0;padding:0;min-width:180px;margin-top:.5rem;margin-bottom:.5rem;box-shadow:0 4px 10px #00000040}.dropdown-container.has-height{overflow:auto}.dropdown-container ::ng-deep list dropdown-item-header{color:#9e9e9e;font-size:.8em;flex:1;font-weight:500;text-transform:uppercase;padding:.5rem 1rem;display:block}.dropdown-container ::ng-deep list hr{border:none;height:1px;background:#dbdbdb}.dropdown-container.novo-table-dropdown-cell ::ng-deep list{max-height:400px;display:block;overflow:auto;padding:5px 0}.dropdown-container.novo-table-dropdown-cell ::ng-deep item{height:30px!important;padding:0 16px!important}.dropdown-container.novo-table-dropdown-cell ::ng-deep item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}.dropdown-container.novo-table-dropdown-cell ::ng-deep item.active{font-weight:500}.dropdown-container.novo-table-dropdown-cell ::ng-deep dropdown-item-header{padding:0 10px!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { parentScrollSelector: [{
                type: Input
            }], parentScrollAction: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], side: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], toggled: [{
                type: Output
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], _button: [{
                type: ContentChild,
                args: [NovoButtonElement]
            }], _trigger: [{
                type: ContentChild,
                args: [NovoDropDownTrigger]
            }], optionGroups: [{
                type: ContentChildren,
                args: [NovoOptgroup, { descendants: true }]
            }], options: [{
                type: ContentChildren,
                args: [NovoOption, { descendants: true }]
            }], panel: [{
                type: ViewChild,
                args: ['panel']
            }], multiple: [{
                type: Input
            }], scrollToActiveItemOnOpen: [{
                type: Input
            }], _handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
// Deprecated below here ---------------------------
class NovoItemElement {
    constructor(dropdown, element) {
        this.dropdown = dropdown;
        this.element = element;
        this.keepOpen = false;
        this.action = new EventEmitter();
        this.active = false;
        notify('\'item\' element has been deprecated. Please use \'novo-option\' and \'novo-optgroup\'.');
    }
    onClick(event) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoItemElement, deps: [{ token: NovoDropdownElement }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoItemElement, isStandalone: false, selector: "item", inputs: { disabled: "disabled", keepOpen: "keepOpen" }, outputs: { action: "action" }, host: { listeners: { "click": "onClick($event)" }, properties: { "class.disabled": "disabled", "class.active": "active" } }, ngImport: i0, template: '<novo-option><ng-content></ng-content></novo-option>', isInline: true, dependencies: [{ kind: "component", type: i1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoItemElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'item',
                    template: '<novo-option><ng-content></ng-content></novo-option>',
                    host: {
                        '[class.disabled]': 'disabled',
                        '[class.active]': 'active',
                    },
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: NovoDropdownElement }, { type: i0.ElementRef }], propDecorators: { disabled: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], action: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class NovoDropdownListElement {
    constructor(dropdown) {
        this.dropdown = dropdown;
        notify('\'list\' element has been deprecated. Please use novo-option and novo-optgroup.');
    }
    ngAfterContentInit() {
        this.dropdown.items = this.items;
        this.items.changes.subscribe(() => {
            this.dropdown.items = this.items;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownListElement, deps: [{ token: NovoDropdownElement }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDropdownListElement, isStandalone: false, selector: "list", queries: [{ propertyName: "items", predicate: NovoItemElement }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownListElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'list',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: NovoDropdownElement }], propDecorators: { items: [{
                type: ContentChildren,
                args: [NovoItemElement]
            }] } });
class NovoDropDownItemHeaderElement {
    constructor() {
        notify('\'dropdown-item-header\' element has been deprecated. Please use novo-option and novo-optgroup.');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropDownItemHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDropDownItemHeaderElement, isStandalone: false, selector: "dropdown-item-header", ngImport: i0, template: '<ng-content></ng-content>', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropDownItemHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'dropdown-item-header',
                    template: '<ng-content></ng-content>',
                    standalone: false,
                }]
        }], ctorParameters: () => [] });

// NG2
class NovoDropdownModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownModule, declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger], imports: [NovoOverlayModule, NovoOptionModule], exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownModule, imports: [NovoOverlayModule, NovoOptionModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NovoOverlayModule, NovoOptionModule],
                    declarations: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger],
                    exports: [NovoDropdownElement, NovoItemElement, NovoDropdownListElement, NovoDropDownItemHeaderElement, NovoDropDownTrigger],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDropDownItemHeaderElement, NovoDropDownTrigger, NovoDropdownElement, NovoDropdownListElement, NovoDropdownModule, NovoItemElement };
//# sourceMappingURL=novo-elements-elements-dropdown.mjs.map
