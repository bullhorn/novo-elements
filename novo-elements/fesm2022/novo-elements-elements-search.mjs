import { ENTER } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, HostBinding, ViewChild, Output, Input, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from 'novo-elements/services';
import * as i4 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i2 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i3 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { CommonModule } from '@angular/common';
import { NovoPickerModule } from 'novo-elements/elements/picker';

// NG2
// Value accessor for the component (supports ngModel)
const SEARCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSearchBoxElement),
    multi: true,
};
class NovoSearchBoxElement {
    constructor(element, labels, _changeDetectorRef, _zone) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        this._zone = _zone;
        this.icon = 'search';
        this.position = 'bottom-left';
        this.placeholder = 'Search...';
        this.alwaysOpen = false;
        this.color = 'positive';
        this.closeOnSelect = true;
        this.keepOpen = false;
        this.hasBackdrop = false;
        this.allowPropagation = false;
        this.searchChanged = new EventEmitter();
        this.applySearch = new EventEmitter();
        this.focused = false;
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
    }
    ngOnInit() {
        if (this.overrideElement) {
            this.element = this.overrideElement;
        }
    }
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event, forceClose = false) {
        if (!this.panelOpen) {
            // Reset search
            // Set focus on search
            setTimeout(() => {
                const element = this.input.nativeElement;
                if (element) {
                    element.focus();
                }
            }, 10);
        }
        else {
            this.closePanel();
        }
    }
    onFocus() {
        this._zone.run(() => {
            this.focused = true;
            this.openPanel();
        });
    }
    onBlur() {
        if (!this.keepOpen || !this.panelOpen) {
            this.focused = false;
        }
    }
    onSelect() {
        if (!this.keepOpen) {
            this.closePanel();
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel() {
        this.overlay.openPanel();
    }
    closePanel() {
        setTimeout(() => this.overlay.closePanel());
        this.focused = false;
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    get active() {
        return this.panelOpen || this.alwaysOpen;
    }
    /** END: Convenient Panel Methods. */
    _handleKeydown(event) {
        if ((event.key === "Escape" /* Key.Escape */ || event.key === "Enter" /* Key.Enter */ || event.key === "Tab" /* Key.Tab */) && this.panelOpen) {
            if (event.keyCode === ENTER) {
                this.applySearch.emit(event);
            }
            this.closePanel();
            if (!this.allowPropagation) {
                event.stopPropagation();
            }
        }
    }
    _handleInput(event) {
        if (document.activeElement === event.target) {
            this.value = event.target.value;
            this._onChange(event.target.value);
            if (this.debounceSearchChange) {
                clearTimeout(this.debounceSearchChange);
            }
            this.debounceSearchChange = setTimeout(() => {
                this.searchChanged.emit(event.target.value);
            }, 400);
        }
    }
    writeValue(value) {
        this._setValue(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    _setValue(value) {
        this.value = value;
        let toDisplay = value;
        if (value && this.displayField) {
            toDisplay = value.hasOwnProperty(this.displayField) ? value[this.displayField] : value;
        }
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        this.displayValue = toDisplay ? toDisplay : '';
        this.input.nativeElement.value = this.displayValue;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.value) {
            this._setValue(event.value);
            this._onChange(event.value);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip) {
        this.writeValue(null);
        this._onChange(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSearchBoxElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoSearchBoxElement, isStandalone: false, selector: "novo-search", inputs: { name: "name", icon: "icon", position: "position", placeholder: "placeholder", alwaysOpen: "alwaysOpen", theme: "theme", color: "color", closeOnSelect: "closeOnSelect", displayField: "displayField", displayValue: "displayValue", hint: "hint", keepOpen: "keepOpen", hasBackdrop: "hasBackdrop", allowPropagation: "allowPropagation", overrideElement: "overrideElement" }, outputs: { searchChanged: "searchChanged", applySearch: "applySearch" }, host: { properties: { "class.always-open": "this.alwaysOpen", "class.focused": "this.focused", "class.active": "this.active" } }, providers: [SEARCH_VALUE_ACCESSOR], viewQueries: [{ propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
    <!-- SEARCH ICON -->
    <novo-icon (click)="showSearch($event)" [tooltip]="hint" tooltipPosition="bottom">{{ icon }}</novo-icon>
    <!-- SEARCH INPUT -->
    <input
      type="text"
      [attr.name]="name"
      [attr.value]="displayValue"
      [attr.placeholder]="placeholder"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      #input
      data-automation-id="novo-search-input"
    />
    <!-- SEARCH OVERLAY -->
    <novo-overlay-template
      [parent]="element"
      [closeOnSelect]="closeOnSelect"
      [position]="position"
      [hasBackdrop]="hasBackdrop"
      (select)="onSelect()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `, isInline: true, styles: [":host{display:grid;grid-template-areas:\"icon input\";grid-template-columns:3.2rem 1fr;grid-template-rows:1fr;align-items:center;height:3.2rem;background:#fff;font-size:1.4rem;border:1px solid #dbdbdb;border-radius:.2rem;max-width:400px;min-width:100px;transition:all .25s ease-in-out}:host[size=small]{font-size:1rem;height:2.4rem;grid-template-columns:2.4rem 1fr}:host[size=large]{font-size:1.8rem;height:4rem;grid-template-columns:4rem 1fr}:host>button[theme][theme=fab]{width:2.8em;height:2.8em;min-height:2.8em}:host>input{height:100%;display:block;background:transparent;position:relative;color:var(--text-main);z-index:10;border:none;transition:all .25s;backface-visibility:hidden}:host>input:focus,:host>input:active{outline:none}:host novo-icon{color:var(--text-main)}:host.focused{border:1px solid var(--selection)}:host.focused>novo-icon{color:var(--selection)!important}:host.focused[color=black]>novo-icon{color:#000!important}:host.focused[color=white]>novo-icon{color:#fff!important}:host.focused[color=gray]>novo-icon{color:#9e9e9e!important}:host.focused[color=grey]>novo-icon{color:#9e9e9e!important}:host.focused[color=offWhite]>novo-icon{color:#f7f7f7!important}:host.focused[color=bright]>novo-icon{color:#f7f7f7!important}:host.focused[color=light]>novo-icon{color:#dbdbdb!important}:host.focused[color=neutral]>novo-icon{color:#4f5361!important}:host.focused[color=dark]>novo-icon{color:#3d464d!important}:host.focused[color=orange]>novo-icon{color:#ff6900!important}:host.focused[color=navigation]>novo-icon{color:#202945!important}:host.focused[color=skyBlue]>novo-icon{color:#009bdf!important}:host.focused[color=steel]>novo-icon{color:#5b6770!important}:host.focused[color=metal]>novo-icon{color:#637893!important}:host.focused[color=sand]>novo-icon{color:#f4f4f4!important}:host.focused[color=silver]>novo-icon{color:#e2e2e2!important}:host.focused[color=stone]>novo-icon{color:#bebebe!important}:host.focused[color=ash]>novo-icon{color:#a0a0a0!important}:host.focused[color=slate]>novo-icon{color:#707070!important}:host.focused[color=onyx]>novo-icon{color:#526980!important}:host.focused[color=charcoal]>novo-icon{color:#282828!important}:host.focused[color=moonlight]>novo-icon{color:#1a242f!important}:host.focused[color=midnight]>novo-icon{color:#202945!important}:host.focused[color=darkness]>novo-icon{color:#161f27!important}:host.focused[color=navy]>novo-icon{color:#0d2d42!important}:host.focused[color=aqua]>novo-icon{color:#3bafda!important}:host.focused[color=ocean]>novo-icon{color:#4a89dc!important}:host.focused[color=mint]>novo-icon{color:#37bc9b!important}:host.focused[color=grass]>novo-icon{color:#8cc152!important}:host.focused[color=sunflower]>novo-icon{color:#f6b042!important}:host.focused[color=bittersweet]>novo-icon{color:#eb6845!important}:host.focused[color=grapefruit]>novo-icon{color:#da4453!important}:host.focused[color=carnation]>novo-icon{color:#d770ad!important}:host.focused[color=lavender]>novo-icon{color:#967adc!important}:host.focused[color=mountain]>novo-icon{color:#9678b6!important}:host.focused[color=info]>novo-icon{color:#4a89dc!important}:host.focused[color=positive]>novo-icon{color:#4a89dc!important}:host.focused[color=success]>novo-icon{color:#8cc152!important}:host.focused[color=negative]>novo-icon{color:#da4453!important}:host.focused[color=danger]>novo-icon{color:#da4453!important}:host.focused[color=error]>novo-icon{color:#da4453!important}:host.focused[color=warning]>novo-icon{color:#f6b042!important}:host.focused[color=empty]>novo-icon{color:#cccdcc!important}:host.focused[color=disabled]>novo-icon{color:#bebebe!important}:host.focused[color=background]>novo-icon{color:#f7f7f7!important}:host.focused[color=backgroundDark]>novo-icon{color:#e2e2e2!important}:host.focused[color=presentation]>novo-icon{color:#5b6770!important}:host.focused[color=bullhorn]>novo-icon{color:#ff6900!important}:host.focused[color=pulse]>novo-icon{color:#3bafda!important}:host.focused[color=company]>novo-icon{color:#39d!important}:host.focused[color=candidate]>novo-icon{color:#4b7!important}:host.focused[color=lead]>novo-icon{color:#a69!important}:host.focused[color=contact]>novo-icon{color:#fa4!important}:host.focused[color=clientcontact]>novo-icon{color:#fa4!important}:host.focused[color=opportunity]>novo-icon{color:#625!important}:host.focused[color=job]>novo-icon{color:#b56!important}:host.focused[color=joborder]>novo-icon{color:#b56!important}:host.focused[color=submission]>novo-icon{color:#a9adbb!important}:host.focused[color=sendout]>novo-icon{color:#747884!important}:host.focused[color=placement]>novo-icon{color:#0b344f!important}:host.focused[color=note]>novo-icon{color:#747884!important}:host.focused[color=contract]>novo-icon{color:#454ea0!important}:host.focused[color=task]>novo-icon{color:#4f5361!important}:host.focused[color=jobCode]>novo-icon{color:#696d79!important}:host.focused[color=earnCode]>novo-icon{color:#696d79!important}:host.focused[color=invoiceStatement]>novo-icon{color:#696d79!important}:host.focused[color=billableCharge]>novo-icon{color:#696d79!important}:host.focused[color=payableCharge]>novo-icon{color:#696d79!important}:host.focused[color=user]>novo-icon{color:#696d79!important}:host.focused[color=corporateUser]>novo-icon{color:#696d79!important}:host.focused[color=distributionList]>novo-icon{color:#696d79!important}:host.focused[color=credential]>novo-icon{color:#696d79!important}:host.focused[color=person]>novo-icon{color:#696d79!important}header novo-search.always-open:not(.focused) button{background:#ffffff40!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input{background-color:#ffffff40!important;border-color:#ffffff40!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input::placeholder{color:#cccdcc!important}\n"], dependencies: [{ kind: "component", type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "directive", type: i3.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "component", type: i4.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSearchBoxElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-search', providers: [SEARCH_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <!-- SEARCH ICON -->
    <novo-icon (click)="showSearch($event)" [tooltip]="hint" tooltipPosition="bottom">{{ icon }}</novo-icon>
    <!-- SEARCH INPUT -->
    <input
      type="text"
      [attr.name]="name"
      [attr.value]="displayValue"
      [attr.placeholder]="placeholder"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      #input
      data-automation-id="novo-search-input"
    />
    <!-- SEARCH OVERLAY -->
    <novo-overlay-template
      [parent]="element"
      [closeOnSelect]="closeOnSelect"
      [position]="position"
      [hasBackdrop]="hasBackdrop"
      (select)="onSelect()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `, standalone: false, styles: [":host{display:grid;grid-template-areas:\"icon input\";grid-template-columns:3.2rem 1fr;grid-template-rows:1fr;align-items:center;height:3.2rem;background:#fff;font-size:1.4rem;border:1px solid #dbdbdb;border-radius:.2rem;max-width:400px;min-width:100px;transition:all .25s ease-in-out}:host[size=small]{font-size:1rem;height:2.4rem;grid-template-columns:2.4rem 1fr}:host[size=large]{font-size:1.8rem;height:4rem;grid-template-columns:4rem 1fr}:host>button[theme][theme=fab]{width:2.8em;height:2.8em;min-height:2.8em}:host>input{height:100%;display:block;background:transparent;position:relative;color:var(--text-main);z-index:10;border:none;transition:all .25s;backface-visibility:hidden}:host>input:focus,:host>input:active{outline:none}:host novo-icon{color:var(--text-main)}:host.focused{border:1px solid var(--selection)}:host.focused>novo-icon{color:var(--selection)!important}:host.focused[color=black]>novo-icon{color:#000!important}:host.focused[color=white]>novo-icon{color:#fff!important}:host.focused[color=gray]>novo-icon{color:#9e9e9e!important}:host.focused[color=grey]>novo-icon{color:#9e9e9e!important}:host.focused[color=offWhite]>novo-icon{color:#f7f7f7!important}:host.focused[color=bright]>novo-icon{color:#f7f7f7!important}:host.focused[color=light]>novo-icon{color:#dbdbdb!important}:host.focused[color=neutral]>novo-icon{color:#4f5361!important}:host.focused[color=dark]>novo-icon{color:#3d464d!important}:host.focused[color=orange]>novo-icon{color:#ff6900!important}:host.focused[color=navigation]>novo-icon{color:#202945!important}:host.focused[color=skyBlue]>novo-icon{color:#009bdf!important}:host.focused[color=steel]>novo-icon{color:#5b6770!important}:host.focused[color=metal]>novo-icon{color:#637893!important}:host.focused[color=sand]>novo-icon{color:#f4f4f4!important}:host.focused[color=silver]>novo-icon{color:#e2e2e2!important}:host.focused[color=stone]>novo-icon{color:#bebebe!important}:host.focused[color=ash]>novo-icon{color:#a0a0a0!important}:host.focused[color=slate]>novo-icon{color:#707070!important}:host.focused[color=onyx]>novo-icon{color:#526980!important}:host.focused[color=charcoal]>novo-icon{color:#282828!important}:host.focused[color=moonlight]>novo-icon{color:#1a242f!important}:host.focused[color=midnight]>novo-icon{color:#202945!important}:host.focused[color=darkness]>novo-icon{color:#161f27!important}:host.focused[color=navy]>novo-icon{color:#0d2d42!important}:host.focused[color=aqua]>novo-icon{color:#3bafda!important}:host.focused[color=ocean]>novo-icon{color:#4a89dc!important}:host.focused[color=mint]>novo-icon{color:#37bc9b!important}:host.focused[color=grass]>novo-icon{color:#8cc152!important}:host.focused[color=sunflower]>novo-icon{color:#f6b042!important}:host.focused[color=bittersweet]>novo-icon{color:#eb6845!important}:host.focused[color=grapefruit]>novo-icon{color:#da4453!important}:host.focused[color=carnation]>novo-icon{color:#d770ad!important}:host.focused[color=lavender]>novo-icon{color:#967adc!important}:host.focused[color=mountain]>novo-icon{color:#9678b6!important}:host.focused[color=info]>novo-icon{color:#4a89dc!important}:host.focused[color=positive]>novo-icon{color:#4a89dc!important}:host.focused[color=success]>novo-icon{color:#8cc152!important}:host.focused[color=negative]>novo-icon{color:#da4453!important}:host.focused[color=danger]>novo-icon{color:#da4453!important}:host.focused[color=error]>novo-icon{color:#da4453!important}:host.focused[color=warning]>novo-icon{color:#f6b042!important}:host.focused[color=empty]>novo-icon{color:#cccdcc!important}:host.focused[color=disabled]>novo-icon{color:#bebebe!important}:host.focused[color=background]>novo-icon{color:#f7f7f7!important}:host.focused[color=backgroundDark]>novo-icon{color:#e2e2e2!important}:host.focused[color=presentation]>novo-icon{color:#5b6770!important}:host.focused[color=bullhorn]>novo-icon{color:#ff6900!important}:host.focused[color=pulse]>novo-icon{color:#3bafda!important}:host.focused[color=company]>novo-icon{color:#39d!important}:host.focused[color=candidate]>novo-icon{color:#4b7!important}:host.focused[color=lead]>novo-icon{color:#a69!important}:host.focused[color=contact]>novo-icon{color:#fa4!important}:host.focused[color=clientcontact]>novo-icon{color:#fa4!important}:host.focused[color=opportunity]>novo-icon{color:#625!important}:host.focused[color=job]>novo-icon{color:#b56!important}:host.focused[color=joborder]>novo-icon{color:#b56!important}:host.focused[color=submission]>novo-icon{color:#a9adbb!important}:host.focused[color=sendout]>novo-icon{color:#747884!important}:host.focused[color=placement]>novo-icon{color:#0b344f!important}:host.focused[color=note]>novo-icon{color:#747884!important}:host.focused[color=contract]>novo-icon{color:#454ea0!important}:host.focused[color=task]>novo-icon{color:#4f5361!important}:host.focused[color=jobCode]>novo-icon{color:#696d79!important}:host.focused[color=earnCode]>novo-icon{color:#696d79!important}:host.focused[color=invoiceStatement]>novo-icon{color:#696d79!important}:host.focused[color=billableCharge]>novo-icon{color:#696d79!important}:host.focused[color=payableCharge]>novo-icon{color:#696d79!important}:host.focused[color=user]>novo-icon{color:#696d79!important}:host.focused[color=corporateUser]>novo-icon{color:#696d79!important}:host.focused[color=distributionList]>novo-icon{color:#696d79!important}:host.focused[color=credential]>novo-icon{color:#696d79!important}:host.focused[color=person]>novo-icon{color:#696d79!important}header novo-search.always-open:not(.focused) button{background:#ffffff40!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input{background-color:#ffffff40!important;border-color:#ffffff40!important;color:#4a89dc40!important}header novo-search.always-open:not(.focused) input::placeholder{color:#cccdcc!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], propDecorators: { name: [{
                type: Input
            }], icon: [{
                type: Input
            }], position: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], alwaysOpen: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.always-open']
            }], theme: [{
                type: Input
            }], color: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], displayField: [{
                type: Input
            }], displayValue: [{
                type: Input
            }], hint: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], allowPropagation: [{
                type: Input
            }], overrideElement: [{
                type: Input
            }], searchChanged: [{
                type: Output
            }], applySearch: [{
                type: Output
            }], focused: [{
                type: HostBinding,
                args: ['class.focused']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }], input: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }] } });

// NG2
class NovoSearchBoxModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSearchBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoSearchBoxModule, declarations: [NovoSearchBoxElement], imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule], exports: [NovoSearchBoxElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSearchBoxModule, imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoSearchBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoIconModule, NovoPickerModule, NovoTooltipModule, NovoOverlayModule],
                    declarations: [NovoSearchBoxElement],
                    exports: [NovoSearchBoxElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoSearchBoxElement, NovoSearchBoxModule };
//# sourceMappingURL=novo-elements-elements-search.mjs.map
