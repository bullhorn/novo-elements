import * as i0 from '@angular/core';
import { Component, Directive, Input, InjectionToken, EventEmitter, HostListener, Output, ContentChild, ContentChildren, ViewChild, ChangeDetectionStrategy, HostBinding, forwardRef, Optional, Self, Inject, Attribute, ViewEncapsulation, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import * as i2$1 from 'novo-elements/elements/common';
import { NovoLabel, NOVO_OVERLAY_CONTAINER, NovoOverlayTemplateComponent, NovoOverlayModule, NovoOptionModule, NovoCommonModule } from 'novo-elements/elements/common';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$4 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { BooleanInput, DateUtil } from 'novo-elements/utils';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { isValid } from 'date-fns';
import { MaskedRange, MaskedEnum } from 'imask';
import * as i1$2 from 'novo-elements/services';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1$3 from '@angular/cdk/platform';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import * as i3 from '@angular/cdk/text-field';

// NG2
class NovoErrorElement {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoErrorElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoErrorElement, isStandalone: false, selector: "novo-error", ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:flex;padding-bottom:5px;flex:1;font-size:.8em;color:#da4453}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoErrorElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-error', standalone: false, template: "<ng-content></ng-content>", styles: [":host{display:flex;padding-bottom:5px;flex:1;font-size:.8em;color:#da4453}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }] });

/** An interface which allows a control to work inside of a `NovoField`. */
class NovoFieldControl {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoFieldControl, isStandalone: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldControl, decorators: [{
            type: Directive
        }] });

// NG2
let nextUniqueId$1 = 0;
class NovoHintElement {
    constructor() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = `novo-hint-${nextUniqueId$1++}`;
    }
    ngOnInit() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoHintElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoHintElement, isStandalone: false, selector: "novo-hint", inputs: { align: "align", id: "id" }, host: { properties: { "class.novo-field-hint-end": "align === \"end\"", "attr.id": "id", "attr.align": "null" }, classAttribute: "novo-hint" }, ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1 0 auto;width:max-content;color:#9e9e9e;padding-bottom:.4rem;padding-top:.4rem}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host.novo-field-hint-end{order:1;text-align:right;align-content:end;justify-content:flex-end}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoHintElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-hint', host: {
                        class: 'novo-hint',
                        '[class.novo-field-hint-end]': 'align === "end"',
                        '[attr.id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    }, standalone: false, template: "<ng-content></ng-content>", styles: [":host{font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;display:flex;flex:1 0 auto;width:max-content;color:#9e9e9e;padding-bottom:.4rem;padding-top:.4rem}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-task{color:#4f5361}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host.novo-field-hint-end{order:1;text-align:right;align-content:end;justify-content:flex-end}\n"] }]
        }], propDecorators: { align: [{
                type: Input
            }], id: [{
                type: Input
            }] } });

// NG2
class NovoFieldPrefixDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldPrefixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoFieldPrefixDirective, isStandalone: false, selector: "[novoPrefix]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldPrefixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoPrefix]',
                    standalone: false
                }]
        }] });
class NovoFieldSuffixDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldSuffixDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoFieldSuffixDirective, isStandalone: false, selector: "[novoSuffix]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldSuffixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSuffix]',
                    standalone: false
                }]
        }] });
const NOVO_INPUT_UNDERLINED_TYPES = [
    'text',
    'date',
    'time',
    'datetime-local',
    'password',
    'email',
    'tel',
    'select',
    'textarea',
    'number',
    'novo-chip-list',
    'chip-list',
];
const NOVO_FORM_FIELD = new InjectionToken('NovoFormField');
class NovoFieldElement {
    constructor(_elementRef, _changeDetectorRef) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._labelClicks = Subscription.EMPTY;
        this.layout = 'vertical';
        this.appearance = 'standard';
        this._destroyed = new Subject();
        this.valueChanges = new EventEmitter();
        this.stateChanges = new EventEmitter();
    }
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin() {
        return this.customOverlayOrigin || this._inputContainerRef || this._elementRef;
    }
    ngAfterContentInit() {
        this._validateControlChild();
        const control = this._control;
        if (control.controlType) {
            this._elementRef.nativeElement.classList.add(`novo-field-type-${control.controlType}`);
            this._elementRef.nativeElement.setAttribute('data-control-type', control.controlType);
        }
        if (control.id) {
            this._elementRef.nativeElement.setAttribute('data-control-id', control.id);
        }
        if (control.ngControl?.name) {
            this._elementRef.nativeElement.setAttribute('data-control-key', control.ngControl.name);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        // tslint:disable-next-line:deprecation
        control.stateChanges.pipe(startWith(null)).subscribe(() => {
            this.stateChanges.next();
            this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        if (control.ngControl && control.ngControl.valueChanges) {
            control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe((v) => {
                this.valueChanges.next(v);
                this._changeDetectorRef.markForCheck();
            });
        }
        if (this._hasLabel()) {
            this._labelClicks = fromEvent(this._labelElement.nativeElement, 'click').subscribe(() => this._control.focus());
        }
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._labelClicks.unsubscribe();
    }
    /** Throws an error if the form field's control is missing. */
    _validateControlChild() {
        if (!this._control) {
            throw new Error('Missing Novo Control');
        }
    }
    blurEventIsInField(blurEvt) {
        return this._elementRef.nativeElement.contains(blurEvt.relatedTarget) || this._overlayElements.some(hasOverlay => hasOverlay.overlay?.isBlurRecipient(blurEvt));
    }
    _handleContainerClick(evt) {
        this._control.onContainerClick(evt);
    }
    _isUnderlinedInput() {
        return NOVO_INPUT_UNDERLINED_TYPES.includes(this._control.controlType);
    }
    /** Determines whether to display hints or errors. */
    _getDisplayedMessages() {
        return this._errorElements && this._errorElements.length > 0 && this._control.errorState ? 'error' : 'hint';
    }
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop) {
        const ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    }
    _hasLabel() {
        return !!this._labelElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoFieldElement, isStandalone: false, selector: "novo-field", inputs: { layout: "layout", appearance: "appearance", customOverlayOrigin: "customOverlayOrigin", width: "width" }, outputs: { valueChanges: "valueChanges", stateChanges: "stateChanges" }, host: { listeners: { "click": "_handleContainerClick($event)" }, properties: { "class.novo-field-layout-horizontal": "layout==\"horizontal\"", "class.novo-field-layout-vertical": "layout==\"vertical\"", "class.novo-field-appearance-standard": "appearance == \"standard\"", "class.novo-field-appearance-fill": "appearance == \"fill\"", "class.novo-field-appearance-outline": "appearance == \"outline\"", "class.novo-field-appearance-list": "appearance == \"list\"", "class.novo-field-appearance-underlined": "_isUnderlinedInput()", "class.novo-field-invalid": "_control.errorState", "class.novo-field-has-label": "_hasLabel()", "class.novo-field-no-label": "!_hasLabel()", "class.novo-field-disabled": "_control.disabled", "class.novo-field-autofilled": "_control.autofilled", "class.novo-focused": "_control.focused", "class.ng-untouched": "_shouldForward(\"untouched\")", "class.ng-touched": "_shouldForward(\"touched\")", "class.ng-pristine": "_shouldForward(\"pristine\")", "class.ng-dirty": "_shouldForward(\"dirty\")", "class.ng-valid": "_shouldForward(\"valid\")", "class.ng-invalid": "_shouldForward(\"invalid\")", "class.ng-pending": "_shouldForward(\"pending\")" }, classAttribute: "novo-field" }, providers: [{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }], queries: [{ propertyName: "_labelElement", first: true, predicate: NovoLabel, descendants: true }, { propertyName: "_control", first: true, predicate: NovoFieldControl, descendants: true }, { propertyName: "_hintElements", predicate: NovoHintElement }, { propertyName: "_errorElements", predicate: NovoErrorElement }, { propertyName: "_prefixElements", predicate: NovoFieldPrefixDirective }, { propertyName: "_suffixElements", predicate: NovoFieldSuffixDirective }, { propertyName: "_overlayElements", predicate: NOVO_OVERLAY_CONTAINER }], viewQueries: [{ propertyName: "_inputContainerRef", first: true, predicate: ["inputContainer"], descendants: true }], ngImport: i0, template: "<div class=\"novo-field-label\">\n  <ng-content select=\"novo-label\"></ng-content>\n</div>\n<div class=\"novo-field-input\" [style.width]=\"width\" #inputContainer>\n  <div class=\"novo-field-prefix\">\n    <ng-content select=\"[novoPrefix]\"></ng-content>\n  </div>\n  <div class=\"novo-field-infix\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"novo-field-suffix\">\n    <ng-content select=\"[novoSuffix]\"></ng-content>\n  </div>\n</div>\n<div class=\"novo-field-messages\" [ngSwitch]=\"_getDisplayedMessages()\">\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'error'\">\n    <ng-content select=\"novo-error\"></ng-content>\n  </div>\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'hint'\">\n    <ng-content select=\"novo-hint\"></ng-content>\n    <ng-content select=\"novo-hint[align=end]\"></ng-content>\n  </div>\n</div>", styles: [":host{display:grid;position:relative}:host.novo-field-layout-horizontal{grid-gap:0rem 1rem;grid-template-columns:150px minmax(min-content,max-content);grid-template-areas:\"label input\" \". messages\"}:host.novo-field-layout-vertical{grid-template-columns:minmax(min-content,100%);grid-template-rows:repeat(3,minmax(min-content,max-content));grid-template-areas:\"label\" \"input\" \"messages\";width:max-content}:host .novo-field-label{grid-area:label;display:grid;align-items:center}:host.novo-field-type-color .novo-field-input::ng-deep .novo-input-element{padding:0}:host.ng-invalid.ng-dirty.ng-touched .novo-field-input{border-bottom:1px solid #da4453!important}:host .novo-field-input{grid-area:input;display:grid;align-items:center;grid-template-columns:minmax(auto,max-content) 1fr minmax(auto,max-content);flex:1 1 100%;min-height:2.9rem}:host .novo-field-input::ng-deep .novo-input-element{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;border:none;background-image:none;background-color:transparent;box-shadow:none;padding:.4rem .2rem 0rem;border-bottom:none!important}:host .novo-field-input::ng-deep .novo-input-element.text-capitalize{text-transform:capitalize}:host .novo-field-input::ng-deep .novo-input-element.text-uppercase{text-transform:uppercase}:host .novo-field-input::ng-deep .novo-input-element.text-nowrap{white-space:nowrap}:host .novo-field-input::ng-deep .novo-input-element.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-field-input::ng-deep .novo-input-element.text-size-default{font-size:inherit}:host .novo-field-input::ng-deep .novo-input-element.text-size-body{font-size:1.3rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-xs{font-size:1rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-sm{font-size:1.2rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-md{font-size:1.3rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-lg{font-size:1.6rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-xl{font-size:2rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-2xl{font-size:2.6rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-3xl{font-size:3.2rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-smaller{font-size:.8em}:host .novo-field-input::ng-deep .novo-input-element.text-size-larger{font-size:1.2em}:host .novo-field-input::ng-deep .novo-input-element.text-color-black{color:#000}:host .novo-field-input::ng-deep .novo-input-element.text-color-white{color:#fff}:host .novo-field-input::ng-deep .novo-input-element.text-color-gray{color:#9e9e9e}:host .novo-field-input::ng-deep .novo-input-element.text-color-grey{color:#9e9e9e}:host .novo-field-input::ng-deep .novo-input-element.text-color-offWhite{color:#f7f7f7}:host .novo-field-input::ng-deep .novo-input-element.text-color-bright{color:#f7f7f7}:host .novo-field-input::ng-deep .novo-input-element.text-color-light{color:#dbdbdb}:host .novo-field-input::ng-deep .novo-input-element.text-color-neutral{color:#4f5361}:host .novo-field-input::ng-deep .novo-input-element.text-color-dark{color:#3d464d}:host .novo-field-input::ng-deep .novo-input-element.text-color-orange{color:#ff6900}:host .novo-field-input::ng-deep .novo-input-element.text-color-navigation{color:#202945}:host .novo-field-input::ng-deep .novo-input-element.text-color-skyBlue{color:#009bdf}:host .novo-field-input::ng-deep .novo-input-element.text-color-steel{color:#5b6770}:host .novo-field-input::ng-deep .novo-input-element.text-color-metal{color:#637893}:host .novo-field-input::ng-deep .novo-input-element.text-color-sand{color:#f4f4f4}:host .novo-field-input::ng-deep .novo-input-element.text-color-silver{color:#e2e2e2}:host .novo-field-input::ng-deep .novo-input-element.text-color-stone{color:#bebebe}:host .novo-field-input::ng-deep .novo-input-element.text-color-ash{color:#a0a0a0}:host .novo-field-input::ng-deep .novo-input-element.text-color-slate{color:#707070}:host .novo-field-input::ng-deep .novo-input-element.text-color-onyx{color:#526980}:host .novo-field-input::ng-deep .novo-input-element.text-color-charcoal{color:#282828}:host .novo-field-input::ng-deep .novo-input-element.text-color-moonlight{color:#1a242f}:host .novo-field-input::ng-deep .novo-input-element.text-color-midnight{color:#202945}:host .novo-field-input::ng-deep .novo-input-element.text-color-darkness{color:#161f27}:host .novo-field-input::ng-deep .novo-input-element.text-color-navy{color:#0d2d42}:host .novo-field-input::ng-deep .novo-input-element.text-color-aqua{color:#3bafda}:host .novo-field-input::ng-deep .novo-input-element.text-color-ocean{color:#4a89dc}:host .novo-field-input::ng-deep .novo-input-element.text-color-mint{color:#37bc9b}:host .novo-field-input::ng-deep .novo-input-element.text-color-grass{color:#8cc152}:host .novo-field-input::ng-deep .novo-input-element.text-color-sunflower{color:#f6b042}:host .novo-field-input::ng-deep .novo-input-element.text-color-bittersweet{color:#eb6845}:host .novo-field-input::ng-deep .novo-input-element.text-color-grapefruit{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-carnation{color:#d770ad}:host .novo-field-input::ng-deep .novo-input-element.text-color-lavender{color:#967adc}:host .novo-field-input::ng-deep .novo-input-element.text-color-mountain{color:#9678b6}:host .novo-field-input::ng-deep .novo-input-element.text-color-info{color:#4a89dc}:host .novo-field-input::ng-deep .novo-input-element.text-color-positive{color:#4a89dc}:host .novo-field-input::ng-deep .novo-input-element.text-color-success{color:#8cc152}:host .novo-field-input::ng-deep .novo-input-element.text-color-negative{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-danger{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-error{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-warning{color:#f6b042}:host .novo-field-input::ng-deep .novo-input-element.text-color-empty{color:#cccdcc}:host .novo-field-input::ng-deep .novo-input-element.text-color-disabled{color:#bebebe}:host .novo-field-input::ng-deep .novo-input-element.text-color-background{color:#f7f7f7}:host .novo-field-input::ng-deep .novo-input-element.text-color-backgroundDark{color:#e2e2e2}:host .novo-field-input::ng-deep .novo-input-element.text-color-presentation{color:#5b6770}:host .novo-field-input::ng-deep .novo-input-element.text-color-bullhorn{color:#ff6900}:host .novo-field-input::ng-deep .novo-input-element.text-color-pulse{color:#3bafda}:host .novo-field-input::ng-deep .novo-input-element.text-color-company{color:#39d}:host .novo-field-input::ng-deep .novo-input-element.text-color-candidate{color:#4b7}:host .novo-field-input::ng-deep .novo-input-element.text-color-lead{color:#a69}:host .novo-field-input::ng-deep .novo-input-element.text-color-contact{color:#fa4}:host .novo-field-input::ng-deep .novo-input-element.text-color-clientcontact{color:#fa4}:host .novo-field-input::ng-deep .novo-input-element.text-color-opportunity{color:#625}:host .novo-field-input::ng-deep .novo-input-element.text-color-job{color:#b56}:host .novo-field-input::ng-deep .novo-input-element.text-color-joborder{color:#b56}:host .novo-field-input::ng-deep .novo-input-element.text-color-submission{color:#a9adbb}:host .novo-field-input::ng-deep .novo-input-element.text-color-sendout{color:#747884}:host .novo-field-input::ng-deep .novo-input-element.text-color-placement{color:#0b344f}:host .novo-field-input::ng-deep .novo-input-element.text-color-note{color:#747884}:host .novo-field-input::ng-deep .novo-input-element.text-color-contract{color:#454ea0}:host .novo-field-input::ng-deep .novo-input-element.text-color-task{color:#4f5361}:host .novo-field-input::ng-deep .novo-input-element.text-color-jobCode{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-earnCode{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-invoiceStatement{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-billableCharge{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-payableCharge{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-user{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-corporateUser{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-distributionList{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-credential{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-person{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.margin-before{margin-top:.4rem}:host .novo-field-input::ng-deep .novo-input-element.margin-after{margin-bottom:.8rem}:host .novo-field-input::ng-deep .novo-input-element.text-length-small{max-width:40ch}:host .novo-field-input::ng-deep .novo-input-element.text-length-medium{max-width:55ch}:host .novo-field-input::ng-deep .novo-input-element.text-length-large{max-width:70ch}:host .novo-field-input::ng-deep .novo-input-element.text-weight-hairline{font-weight:100}:host .novo-field-input::ng-deep .novo-input-element.text-weight-thin{font-weight:200}:host .novo-field-input::ng-deep .novo-input-element.text-weight-light{font-weight:300}:host .novo-field-input::ng-deep .novo-input-element.text-weight-normal{font-weight:400}:host .novo-field-input::ng-deep .novo-input-element.text-weight-medium{font-weight:500}:host .novo-field-input::ng-deep .novo-input-element.text-weight-semibold{font-weight:600}:host .novo-field-input::ng-deep .novo-input-element.text-weight-bold{font-weight:700}:host .novo-field-input::ng-deep .novo-input-element.text-weight-extrabold{font-weight:800}:host .novo-field-input::ng-deep .novo-input-element.text-weight-heavy{font-weight:900}:host .novo-field-input::ng-deep .novo-input-element.text-weight-lighter{font-weight:lighter}:host .novo-field-input::ng-deep .novo-input-element.text-weight-bolder{font-weight:bolder}:host .novo-field-input::ng-deep .novo-input-element:focus{outline:none}:host .novo-field-input::ng-deep .novo-radio-group{padding:.5rem 0}:host .novo-field-input .novo-field-prefix{display:flex;align-items:center}:host .novo-field-input .novo-field-infix{display:flex;align-items:center;align-self:flex-end}:host .novo-field-input .novo-field-infix select,:host .novo-field-input .novo-field-infix::ng-deep .novo-input-element{width:100%}:host .novo-field-input .novo-field-suffix{display:flex;align-items:center}:host .novo-field-messages{grid-area:messages;display:grid}:host .novo-field-hint-wrapper{display:flex;flex-direction:column}:host::ng-deep .novo-date-range-format{min-width:22rem}\n", ":host.novo-field-appearance-standard.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid rgb(175.4891304348,184.7826086957,192.0108695652)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{border-bottom:1px solid #3d464d!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid #4a89dc!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid #da4453!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-disabled .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-disabled:not(.novo-focused):hover .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined .novo-field-input:disabled{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}\n", ":host.novo-field-appearance-fill.novo-field-layout-horizontal .novo-field-input{background:var(--background-main)}:host.novo-field-appearance-fill.novo-field-layout-vertical{background:var(--background-main)}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-label{padding-top:.5em;padding-left:.5em;padding-right:.5em}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-input{padding:0 .5em}:host.novo-field-appearance-fill.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid rgb(175.4891304348,184.7826086957,192.0108695652)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{border-bottom:1px solid #3d464d!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-label{color:#4a89dc!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid #4a89dc!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid #da4453!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-disabled .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-disabled:not(.novo-focused):hover .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined .novo-field-input:disabled{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}\n", ":host.novo-field-appearance-outline{border:1px solid rgb(175.4891304348,184.7826086957,192.0108695652)!important;border-radius:.4rem;padding:.5rem}:host.novo-field-appearance-outline.novo-field-layout-vertical .novo-field-label{background:#fff;margin-top:-1.5rem;margin-left:.5rem;width:max-content;padding:.5rem}:host.novo-field-appearance-outline:not(.novo-focused):hover{border:1px solid #3d464d!important}:host.novo-field-appearance-outline.novo-focused{border:1px solid #4a89dc!important}:host.novo-field-appearance-outline.novo-field-invalid{border:1px solid #da4453!important}\n", ":host.novo-field-appearance-list.novo-field-layout-horizontal{border-bottom:1px solid #f7f7f7!important;padding:.5rem 1.2rem;min-height:4.2rem}:host.novo-field-appearance-list.novo-field-layout-horizontal .novo-field-label{align-items:start;margin-top:.9rem}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-no-label{grid-template-columns:0px minmax(300px,600px);gap:0}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{background:#4a89dc26}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-focused .novo-field-label{color:#4a89dc!important}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-field-invalid .novo-field-label{color:#da4453!important}\n"], dependencies: [{ kind: "directive", type: i1$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-field', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-field',
                        '[class.novo-field-layout-horizontal]': 'layout=="horizontal"',
                        '[class.novo-field-layout-vertical]': 'layout=="vertical"',
                        '[class.novo-field-appearance-standard]': 'appearance == "standard"',
                        '[class.novo-field-appearance-fill]': 'appearance == "fill"',
                        '[class.novo-field-appearance-outline]': 'appearance == "outline"',
                        '[class.novo-field-appearance-list]': 'appearance == "list"',
                        '[class.novo-field-appearance-underlined]': '_isUnderlinedInput()',
                        '[class.novo-field-invalid]': '_control.errorState',
                        '[class.novo-field-has-label]': '_hasLabel()',
                        '[class.novo-field-no-label]': '!_hasLabel()',
                        '[class.novo-field-disabled]': '_control.disabled',
                        '[class.novo-field-autofilled]': '_control.autofilled',
                        '[class.novo-focused]': '_control.focused',
                        '[class.ng-untouched]': '_shouldForward("untouched")',
                        '[class.ng-touched]': '_shouldForward("touched")',
                        '[class.ng-pristine]': '_shouldForward("pristine")',
                        '[class.ng-dirty]': '_shouldForward("dirty")',
                        '[class.ng-valid]': '_shouldForward("valid")',
                        '[class.ng-invalid]': '_shouldForward("invalid")',
                        '[class.ng-pending]': '_shouldForward("pending")',
                    }, providers: [{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }], standalone: false, template: "<div class=\"novo-field-label\">\n  <ng-content select=\"novo-label\"></ng-content>\n</div>\n<div class=\"novo-field-input\" [style.width]=\"width\" #inputContainer>\n  <div class=\"novo-field-prefix\">\n    <ng-content select=\"[novoPrefix]\"></ng-content>\n  </div>\n  <div class=\"novo-field-infix\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"novo-field-suffix\">\n    <ng-content select=\"[novoSuffix]\"></ng-content>\n  </div>\n</div>\n<div class=\"novo-field-messages\" [ngSwitch]=\"_getDisplayedMessages()\">\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'error'\">\n    <ng-content select=\"novo-error\"></ng-content>\n  </div>\n  <div class=\"novo-field-hint-wrapper\" *ngSwitchCase=\"'hint'\">\n    <ng-content select=\"novo-hint\"></ng-content>\n    <ng-content select=\"novo-hint[align=end]\"></ng-content>\n  </div>\n</div>", styles: [":host{display:grid;position:relative}:host.novo-field-layout-horizontal{grid-gap:0rem 1rem;grid-template-columns:150px minmax(min-content,max-content);grid-template-areas:\"label input\" \". messages\"}:host.novo-field-layout-vertical{grid-template-columns:minmax(min-content,100%);grid-template-rows:repeat(3,minmax(min-content,max-content));grid-template-areas:\"label\" \"input\" \"messages\";width:max-content}:host .novo-field-label{grid-area:label;display:grid;align-items:center}:host.novo-field-type-color .novo-field-input::ng-deep .novo-input-element{padding:0}:host.ng-invalid.ng-dirty.ng-touched .novo-field-input{border-bottom:1px solid #da4453!important}:host .novo-field-input{grid-area:input;display:grid;align-items:center;grid-template-columns:minmax(auto,max-content) 1fr minmax(auto,max-content);flex:1 1 100%;min-height:2.9rem}:host .novo-field-input::ng-deep .novo-input-element{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;border:none;background-image:none;background-color:transparent;box-shadow:none;padding:.4rem .2rem 0rem;border-bottom:none!important}:host .novo-field-input::ng-deep .novo-input-element.text-capitalize{text-transform:capitalize}:host .novo-field-input::ng-deep .novo-input-element.text-uppercase{text-transform:uppercase}:host .novo-field-input::ng-deep .novo-input-element.text-nowrap{white-space:nowrap}:host .novo-field-input::ng-deep .novo-input-element.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .novo-field-input::ng-deep .novo-input-element.text-size-default{font-size:inherit}:host .novo-field-input::ng-deep .novo-input-element.text-size-body{font-size:1.3rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-xs{font-size:1rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-sm{font-size:1.2rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-md{font-size:1.3rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-lg{font-size:1.6rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-xl{font-size:2rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-2xl{font-size:2.6rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-3xl{font-size:3.2rem}:host .novo-field-input::ng-deep .novo-input-element.text-size-smaller{font-size:.8em}:host .novo-field-input::ng-deep .novo-input-element.text-size-larger{font-size:1.2em}:host .novo-field-input::ng-deep .novo-input-element.text-color-black{color:#000}:host .novo-field-input::ng-deep .novo-input-element.text-color-white{color:#fff}:host .novo-field-input::ng-deep .novo-input-element.text-color-gray{color:#9e9e9e}:host .novo-field-input::ng-deep .novo-input-element.text-color-grey{color:#9e9e9e}:host .novo-field-input::ng-deep .novo-input-element.text-color-offWhite{color:#f7f7f7}:host .novo-field-input::ng-deep .novo-input-element.text-color-bright{color:#f7f7f7}:host .novo-field-input::ng-deep .novo-input-element.text-color-light{color:#dbdbdb}:host .novo-field-input::ng-deep .novo-input-element.text-color-neutral{color:#4f5361}:host .novo-field-input::ng-deep .novo-input-element.text-color-dark{color:#3d464d}:host .novo-field-input::ng-deep .novo-input-element.text-color-orange{color:#ff6900}:host .novo-field-input::ng-deep .novo-input-element.text-color-navigation{color:#202945}:host .novo-field-input::ng-deep .novo-input-element.text-color-skyBlue{color:#009bdf}:host .novo-field-input::ng-deep .novo-input-element.text-color-steel{color:#5b6770}:host .novo-field-input::ng-deep .novo-input-element.text-color-metal{color:#637893}:host .novo-field-input::ng-deep .novo-input-element.text-color-sand{color:#f4f4f4}:host .novo-field-input::ng-deep .novo-input-element.text-color-silver{color:#e2e2e2}:host .novo-field-input::ng-deep .novo-input-element.text-color-stone{color:#bebebe}:host .novo-field-input::ng-deep .novo-input-element.text-color-ash{color:#a0a0a0}:host .novo-field-input::ng-deep .novo-input-element.text-color-slate{color:#707070}:host .novo-field-input::ng-deep .novo-input-element.text-color-onyx{color:#526980}:host .novo-field-input::ng-deep .novo-input-element.text-color-charcoal{color:#282828}:host .novo-field-input::ng-deep .novo-input-element.text-color-moonlight{color:#1a242f}:host .novo-field-input::ng-deep .novo-input-element.text-color-midnight{color:#202945}:host .novo-field-input::ng-deep .novo-input-element.text-color-darkness{color:#161f27}:host .novo-field-input::ng-deep .novo-input-element.text-color-navy{color:#0d2d42}:host .novo-field-input::ng-deep .novo-input-element.text-color-aqua{color:#3bafda}:host .novo-field-input::ng-deep .novo-input-element.text-color-ocean{color:#4a89dc}:host .novo-field-input::ng-deep .novo-input-element.text-color-mint{color:#37bc9b}:host .novo-field-input::ng-deep .novo-input-element.text-color-grass{color:#8cc152}:host .novo-field-input::ng-deep .novo-input-element.text-color-sunflower{color:#f6b042}:host .novo-field-input::ng-deep .novo-input-element.text-color-bittersweet{color:#eb6845}:host .novo-field-input::ng-deep .novo-input-element.text-color-grapefruit{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-carnation{color:#d770ad}:host .novo-field-input::ng-deep .novo-input-element.text-color-lavender{color:#967adc}:host .novo-field-input::ng-deep .novo-input-element.text-color-mountain{color:#9678b6}:host .novo-field-input::ng-deep .novo-input-element.text-color-info{color:#4a89dc}:host .novo-field-input::ng-deep .novo-input-element.text-color-positive{color:#4a89dc}:host .novo-field-input::ng-deep .novo-input-element.text-color-success{color:#8cc152}:host .novo-field-input::ng-deep .novo-input-element.text-color-negative{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-danger{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-error{color:#da4453}:host .novo-field-input::ng-deep .novo-input-element.text-color-warning{color:#f6b042}:host .novo-field-input::ng-deep .novo-input-element.text-color-empty{color:#cccdcc}:host .novo-field-input::ng-deep .novo-input-element.text-color-disabled{color:#bebebe}:host .novo-field-input::ng-deep .novo-input-element.text-color-background{color:#f7f7f7}:host .novo-field-input::ng-deep .novo-input-element.text-color-backgroundDark{color:#e2e2e2}:host .novo-field-input::ng-deep .novo-input-element.text-color-presentation{color:#5b6770}:host .novo-field-input::ng-deep .novo-input-element.text-color-bullhorn{color:#ff6900}:host .novo-field-input::ng-deep .novo-input-element.text-color-pulse{color:#3bafda}:host .novo-field-input::ng-deep .novo-input-element.text-color-company{color:#39d}:host .novo-field-input::ng-deep .novo-input-element.text-color-candidate{color:#4b7}:host .novo-field-input::ng-deep .novo-input-element.text-color-lead{color:#a69}:host .novo-field-input::ng-deep .novo-input-element.text-color-contact{color:#fa4}:host .novo-field-input::ng-deep .novo-input-element.text-color-clientcontact{color:#fa4}:host .novo-field-input::ng-deep .novo-input-element.text-color-opportunity{color:#625}:host .novo-field-input::ng-deep .novo-input-element.text-color-job{color:#b56}:host .novo-field-input::ng-deep .novo-input-element.text-color-joborder{color:#b56}:host .novo-field-input::ng-deep .novo-input-element.text-color-submission{color:#a9adbb}:host .novo-field-input::ng-deep .novo-input-element.text-color-sendout{color:#747884}:host .novo-field-input::ng-deep .novo-input-element.text-color-placement{color:#0b344f}:host .novo-field-input::ng-deep .novo-input-element.text-color-note{color:#747884}:host .novo-field-input::ng-deep .novo-input-element.text-color-contract{color:#454ea0}:host .novo-field-input::ng-deep .novo-input-element.text-color-task{color:#4f5361}:host .novo-field-input::ng-deep .novo-input-element.text-color-jobCode{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-earnCode{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-invoiceStatement{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-billableCharge{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-payableCharge{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-user{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-corporateUser{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-distributionList{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-credential{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.text-color-person{color:#696d79}:host .novo-field-input::ng-deep .novo-input-element.margin-before{margin-top:.4rem}:host .novo-field-input::ng-deep .novo-input-element.margin-after{margin-bottom:.8rem}:host .novo-field-input::ng-deep .novo-input-element.text-length-small{max-width:40ch}:host .novo-field-input::ng-deep .novo-input-element.text-length-medium{max-width:55ch}:host .novo-field-input::ng-deep .novo-input-element.text-length-large{max-width:70ch}:host .novo-field-input::ng-deep .novo-input-element.text-weight-hairline{font-weight:100}:host .novo-field-input::ng-deep .novo-input-element.text-weight-thin{font-weight:200}:host .novo-field-input::ng-deep .novo-input-element.text-weight-light{font-weight:300}:host .novo-field-input::ng-deep .novo-input-element.text-weight-normal{font-weight:400}:host .novo-field-input::ng-deep .novo-input-element.text-weight-medium{font-weight:500}:host .novo-field-input::ng-deep .novo-input-element.text-weight-semibold{font-weight:600}:host .novo-field-input::ng-deep .novo-input-element.text-weight-bold{font-weight:700}:host .novo-field-input::ng-deep .novo-input-element.text-weight-extrabold{font-weight:800}:host .novo-field-input::ng-deep .novo-input-element.text-weight-heavy{font-weight:900}:host .novo-field-input::ng-deep .novo-input-element.text-weight-lighter{font-weight:lighter}:host .novo-field-input::ng-deep .novo-input-element.text-weight-bolder{font-weight:bolder}:host .novo-field-input::ng-deep .novo-input-element:focus{outline:none}:host .novo-field-input::ng-deep .novo-radio-group{padding:.5rem 0}:host .novo-field-input .novo-field-prefix{display:flex;align-items:center}:host .novo-field-input .novo-field-infix{display:flex;align-items:center;align-self:flex-end}:host .novo-field-input .novo-field-infix select,:host .novo-field-input .novo-field-infix::ng-deep .novo-input-element{width:100%}:host .novo-field-input .novo-field-suffix{display:flex;align-items:center}:host .novo-field-messages{grid-area:messages;display:grid}:host .novo-field-hint-wrapper{display:flex;flex-direction:column}:host::ng-deep .novo-date-range-format{min-width:22rem}\n", ":host.novo-field-appearance-standard.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid rgb(175.4891304348,184.7826086957,192.0108695652)!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{border-bottom:1px solid #3d464d!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid #4a89dc!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid #da4453!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-disabled .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined.novo-field-disabled:not(.novo-focused):hover .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-standard.novo-field-appearance-underlined .novo-field-input:disabled{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}\n", ":host.novo-field-appearance-fill.novo-field-layout-horizontal .novo-field-input{background:var(--background-main)}:host.novo-field-appearance-fill.novo-field-layout-vertical{background:var(--background-main)}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-label{padding-top:.5em;padding-left:.5em;padding-right:.5em}:host.novo-field-appearance-fill.novo-field-layout-vertical .novo-field-input{padding:0 .5em}:host.novo-field-appearance-fill.novo-field-appearance-underlined .novo-field-input{border-bottom:1px solid rgb(175.4891304348,184.7826086957,192.0108695652)!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{border-bottom:1px solid #3d464d!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-label{color:#4a89dc!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-focused .novo-field-input{border-bottom:1px solid #4a89dc!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-invalid .novo-field-input{border-bottom:1px solid #da4453!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-disabled .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined.novo-field-disabled:not(.novo-focused):hover .novo-field-input{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}:host.novo-field-appearance-fill.novo-field-appearance-underlined .novo-field-input:disabled{color:#9e9e9e!important;border-bottom:1px dashed #9e9e9e!important}\n", ":host.novo-field-appearance-outline{border:1px solid rgb(175.4891304348,184.7826086957,192.0108695652)!important;border-radius:.4rem;padding:.5rem}:host.novo-field-appearance-outline.novo-field-layout-vertical .novo-field-label{background:#fff;margin-top:-1.5rem;margin-left:.5rem;width:max-content;padding:.5rem}:host.novo-field-appearance-outline:not(.novo-focused):hover{border:1px solid #3d464d!important}:host.novo-field-appearance-outline.novo-focused{border:1px solid #4a89dc!important}:host.novo-field-appearance-outline.novo-field-invalid{border:1px solid #da4453!important}\n", ":host.novo-field-appearance-list.novo-field-layout-horizontal{border-bottom:1px solid #f7f7f7!important;padding:.5rem 1.2rem;min-height:4.2rem}:host.novo-field-appearance-list.novo-field-layout-horizontal .novo-field-label{align-items:start;margin-top:.9rem}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-no-label{grid-template-columns:0px minmax(300px,600px);gap:0}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined:not(.novo-focused):hover .novo-field-input{background:#4a89dc26}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-focused .novo-field-label{color:#4a89dc!important}:host.novo-field-appearance-list.novo-field-layout-horizontal.novo-field-appearance-underlined.novo-field-invalid .novo-field-label{color:#da4453!important}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { _inputContainerRef: [{
                type: ViewChild,
                args: ['inputContainer']
            }], _labelElement: [{
                type: ContentChild,
                args: [NovoLabel]
            }], _hintElements: [{
                type: ContentChildren,
                args: [NovoHintElement]
            }], _errorElements: [{
                type: ContentChildren,
                args: [NovoErrorElement]
            }], _prefixElements: [{
                type: ContentChildren,
                args: [NovoFieldPrefixDirective]
            }], _suffixElements: [{
                type: ContentChildren,
                args: [NovoFieldSuffixDirective]
            }], _overlayElements: [{
                type: ContentChildren,
                args: [NOVO_OVERLAY_CONTAINER]
            }], _control: [{
                type: ContentChild,
                args: [NovoFieldControl]
            }], layout: [{
                type: Input
            }], appearance: [{
                type: Input
            }], customOverlayOrigin: [{
                type: Input
            }], width: [{
                type: Input
            }], valueChanges: [{
                type: Output
            }], stateChanges: [{
                type: Output
            }], _handleContainerClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoFieldsElement {
    constructor() {
        this._layout = 'horizontal';
        this._appearance = 'standard';
        this.fullWidth = false;
    }
    get layout() {
        return this._layout;
    }
    set layout(value) {
        if (this._layout !== value) {
            this._layout = value;
            this._updateFieldLayout();
        }
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateFieldAppearance();
        }
    }
    ngAfterContentInit() {
        this._updateFieldLayout();
        this._updateFieldAppearance();
    }
    _updateFieldLayout() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.layout = this.layout;
            });
        }
    }
    _updateFieldAppearance() {
        if (this._fields) {
            this._fields.forEach((field) => {
                field.appearance = this.appearance;
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldsElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoFieldsElement, isStandalone: false, selector: "novo-fields", inputs: { layout: "layout", appearance: "appearance", fullWidth: "fullWidth" }, host: { properties: { "class.novo-fieldset-appearance-standard": "appearance == \"standard\"", "class.novo-fieldset-appearance-fill": "appearance == \"fill\"", "class.novo-fieldset-appearance-outline": "appearance == \"outline\"", "class.novo-fieldset-appearance-list": "appearance == \"list\"", "class.full-width": "this.fullWidth" }, classAttribute: "novo-field" }, queries: [{ propertyName: "_fields", predicate: NovoFieldElement }], ngImport: i0, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:2.8rem 2rem}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate$1([
    BooleanInput(),
    __metadata$1("design:type", Boolean)
], NovoFieldsElement.prototype, "fullWidth", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldsElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-fields', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-field',
                        '[class.novo-fieldset-appearance-standard]': 'appearance == "standard"',
                        '[class.novo-fieldset-appearance-fill]': 'appearance == "fill"',
                        '[class.novo-fieldset-appearance-outline]': 'appearance == "outline"',
                        '[class.novo-fieldset-appearance-list]': 'appearance == "list"',
                    }, standalone: false, template: "<ng-content></ng-content>", styles: [":host{display:grid;grid-gap:2.8rem 2rem}:host.novo-fieldset-appearance-list{grid-gap:0rem}:host.full-width::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(300px,1fr);width:-webkit-fill-available}:host.full-width::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal{grid-template-columns:150px minmax(150px,1fr)}:host.full-width::ng-deep novo-field.novo-field-layout-horizontal .novo-input-element{width:100%}\n"] }]
        }], propDecorators: { _fields: [{
                type: ContentChildren,
                args: [NovoFieldElement]
            }], layout: [{
                type: Input
            }], appearance: [{
                type: Input
            }], fullWidth: [{
                type: HostBinding,
                args: ['class.full-width']
            }, {
                type: Input
            }] } });

const NOVO_INPUT_FORMAT = new InjectionToken('NovoInputFormat');
var DATE_FORMATS;
(function (DATE_FORMATS) {
    DATE_FORMATS["DATE"] = "date";
    DATE_FORMATS["ISO8601"] = "iso8601";
    DATE_FORMATS["STRING"] = "string";
    DATE_FORMATS["YEAR_MONTH_DAY"] = "yyyy-mm-dd";
})(DATE_FORMATS || (DATE_FORMATS = {}));

const DATEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateFormatDirective),
    multi: true,
};
class NovoDateFormatDirective extends IMaskDirective {
    constructor(labels, dateFormatService) {
        super();
        this.labels = labels;
        this.dateFormatService = dateFormatService;
        this.valueChange = new EventEmitter();
        this.dateFormat = DATE_FORMATS.DATE;
        this.unmask = 'typed'; // typing is to work around angular-imask bug
        this.imask = {
            mask: Date,
            pattern: this.dateFormatService.dateFormatAsImaskPattern,
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1900, 0, 1),
            max: new Date(2100, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (date) => this.formatValue(date, { userDateFormat: this.labels.dateFormatString() }),
            parse: (str) => DateUtil.parse(str, { userDateFormat: this.labels.dateFormatString().toUpperCase() }),
            blocks: {
                d: {
                    mask: MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
            },
        };
    }
    normalize(value) {
        const pattern = this.labels.dateFormatString().toUpperCase();
        if (!value) {
            return "";
        }
        return DateUtil.format(DateUtil.parse(value, { userDateFormat: this.labels.dateFormatString() }), pattern);
    }
    formatAsIso(date) {
        if (date && isValid(date)) {
            return date.toISOString().slice(0, 10);
        }
        return null;
    }
    formatYearMonthDay(date) {
        if (date && isValid(date)) {
            return DateUtil.format(date, 'YYYY-MM-DD');
        }
        return null;
    }
    formatValue(value, options) {
        if (value == null)
            return '';
        const dateFormat = this.labels.dateFormatString().toUpperCase();
        const date = DateUtil.parse(value, options);
        if (isValid(date)) {
            return DateUtil.format(date, dateFormat);
        }
        return this.normalize(value);
    }
    writeValue(value) {
        const initialValue = this['_initialValue'];
        if (initialValue != null && value === initialValue) {
            // This value has already been formatted from the first call to writeValue, simply use it.
            super.writeValue(initialValue);
        }
        else {
            super.writeValue(this.formatValue(value));
            this.valueChange.emit(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted = date;
            switch (this.dateFormat) {
                case DATE_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case DATE_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                case DATE_FORMATS.YEAR_MONTH_DAY:
                    formatted = this.formatYearMonthDay(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateFormatDirective, deps: [{ token: i1$2.NovoLabelService }, { token: i1$2.DateFormatService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDateFormatDirective, isStandalone: false, selector: "input[dateFormat]", inputs: { dateFormat: "dateFormat" }, host: { classAttribute: "novo-date-format" }, providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateFormat]',
                    host: {
                        class: 'novo-date-format',
                    },
                    providers: [DATEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateFormatDirective }],
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$2.NovoLabelService }, { type: i1$2.DateFormatService }], propDecorators: { dateFormat: [{
                type: Input
            }] } });

const DATERANGEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateRangeFormatDirective),
    multi: true,
};
class NovoDateRangeFormatDirective extends IMaskDirective {
    constructor(labels, dateFormat) {
        super();
        this.labels = labels;
        this.dateFormat = dateFormat;
        this.valueChange = new EventEmitter();
        this.dateRangeFormat = DATE_FORMATS.DATE;
        this.unmask = false;
        this.imask = {
            mask: `${this.dateFormat.dateFormatAsImaskPattern} - ${this.dateFormat.dateFormatAsImaskPattern}`,
            overwrite: true,
            autofix: true,
            lazy: false,
            blocks: {
                d: {
                    mask: MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
            },
        };
    }
    normalize(value, options) {
        const pattern = this.labels.dateFormatString().toUpperCase();
        return DateUtil.format(value ? DateUtil.parse(value, options) : null, pattern);
    }
    formatAsIso(value) {
        if (!value)
            return '';
        const { startDate, endDate } = value;
        if (startDate && isValid(startDate) && endDate && isValid(endDate)) {
            const startIso = startDate.toISOString().slice(0, 10);
            const endIso = endDate.toISOString().slice(0, 10);
            return `${startIso}/${endIso}`;
        }
        return null;
    }
    formatValue(value) {
        if (!value)
            return '';
        const { startDate, endDate } = value;
        return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
    }
    formatDate(source) {
        const dateRangeFormat = this.labels.dateFormatString().toUpperCase();
        const date = DateUtil.parse(source);
        if (isValid(date)) {
            return DateUtil.format(date, dateRangeFormat);
        }
        return this.normalize(source);
    }
    writeValue(value) {
        if (this['_initialValue'] && value === this['_initialValue']) {
            // if this call is coming from the super class, skip through.
            // If we ever wanted to reduce the need for this hack/workaround, we could refactor
            // IMaskDirective to exist as a child portion of DateRangeFormatDirective.
            super.writeValue(value);
            return;
        }
        const formattedValue = this.formatValue(value);
        if (formattedValue !== this.maskValue) {
            super.writeValue(this.formatValue(value));
            this.onChange(this.formatValue(value));
            this.valueChange.emit(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = (input) => {
            if (this.validate(input)) {
                const dates = this.extractDatesFromInput(input);
                let formatted = dates;
                switch (this.dateRangeFormat) {
                    case DATE_FORMATS.ISO8601:
                        formatted = this.formatAsIso(dates);
                        break;
                    case DATE_FORMATS.STRING:
                        formatted = this.formatValue(dates);
                        break;
                    default:
                        formatted = dates;
                        break;
                }
                this.valueChange.emit(dates);
                fn(formatted);
            }
        };
    }
    extractDatesFromInput(value) {
        const [startStr, endStr] = value.split(' - ');
        const startDate = DateUtil.parse(startStr, { userDateFormat: this.labels.dateFormatString() });
        const endDate = DateUtil.parse(endStr, { userDateFormat: this.labels.dateFormatString() });
        return { startDate, endDate };
    }
    validate(dateStr) {
        const { startDate, endDate } = this.extractDatesFromInput(dateStr);
        return isValid(startDate) && isValid(endDate);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateRangeFormatDirective, deps: [{ token: i1$2.NovoLabelService }, { token: i1$2.DateFormatService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDateRangeFormatDirective, isStandalone: false, selector: "input[dateRangeFormat]", inputs: { dateRangeFormat: "dateRangeFormat" }, host: { classAttribute: "novo-date-range-format" }, providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateRangeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateRangeFormat]',
                    host: {
                        class: 'novo-date-range-format',
                    },
                    providers: [DATERANGEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateRangeFormatDirective }],
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$2.NovoLabelService }, { type: i1$2.DateFormatService }], propDecorators: { dateRangeFormat: [{
                type: Input
            }] } });

const DATETIMEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimeFormatDirective),
    multi: true,
};
class NovoDateTimeFormatDirective extends IMaskDirective {
    constructor(labels, dateFormat) {
        super();
        this.labels = labels;
        this.dateFormat = dateFormat;
        this.valueChange = new EventEmitter();
        this.military = false;
        this.dateTimeFormat = DATE_FORMATS.DATE;
        this.initFormatOptions();
    }
    initFormatOptions() {
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        this.unmask = 'typed'; // typing is to work around angular-imask bug
        let pattern = `${this.dateFormat.dateFormatAsImaskPattern}, HH:mm`;
        if (!this.military) {
            pattern += ' aa';
        }
        this.imask = {
            mask: Date,
            pattern,
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1900, 0, 1),
            max: new Date(2100, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (date) => this.formatValue(date, { userDateFormat: this.labels.dateFormatString() }),
            parse: (str) => DateUtil.parse(str, { userDateFormat: this.labels.dateFormatString().toUpperCase() }),
            blocks: {
                d: {
                    mask: MaskedRange,
                    placeholderChar: 'D',
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: MaskedRange,
                    placeholderChar: 'M',
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: MaskedRange,
                    placeholderChar: 'Y',
                    from: 1900,
                    to: 9999,
                },
                HH: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                ss: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: MaskedEnum,
                    placeholderChar: '-',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['military', 'dateFormat'].includes(key))) {
            this.initFormatOptions();
        }
    }
    _checkInput(event) {
        if (document.activeElement === event.target) {
            const text = event.target.value;
            const dateTime = text.split(', ');
            const hour = dateTime[1].slice(0, 2);
            if ((this.military && Number(dateTime[1][0]) > 2) || (!this.military && Number(dateTime[1][0]) > 1)) {
                event.preventDefault();
                const value = `0${dateTime[1]}`;
                event.target.value = value;
            }
            if (!this.military) {
                const input = dateTime[1].substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
                const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
                if (timePeriod) {
                    event.target.value = `${dateTime[0]}, ${dateTime[1].slice(0, 5)} ${timePeriod}`;
                }
                if (event.target.selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
                    event.target.value = `${dateTime[0]}, 01:${event.target.value.slice(3, event.target.value.length)}`;
                }
            }
        }
    }
    _handleBlur(event) {
        const text = event.target.value;
        const dateTime = text.split(', ');
        const hour = dateTime[1].slice(0, 2);
        if (!this.military) {
            const input = dateTime[1].substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
            const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
            if (this.hourOneFormatRequired(hour)) {
                event.target.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
            }
            if (!timePeriod) {
                event.target.value = `${dateTime[0]}, ${dateTime[1].slice(0, 5)} --`;
            }
        }
    }
    _handleKeydown(event) {
        const input = event.target;
        const dateTime = input.value.split(', ');
        const hour = dateTime[1].slice(0, 2);
        if (event.key === "Backspace" /* Key.Backspace */ && input.selectionStart === dateTime[1].length) {
            event.target.value = `${dateTime[1].slice(0, 5)} --`;
        }
        else if (event.key === "Tab" /* Key.Tab */ && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            input.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
            input.setSelectionRange(15, 15);
        }
        else if (event.key === "ArrowRight" /* Key.ArrowRight */ && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
            input.value = `${dateTime[0]}, 01:${dateTime[1].slice(3, dateTime[1].length)}`;
            input.setSelectionRange(14, 14);
        }
    }
    normalize(value, options) {
        const pattern = this.labels.dateFormatString().toUpperCase();
        return DateUtil.format(value ? DateUtil.parse(value, options) : null, pattern);
    }
    formatAsIso(date) {
        if (date && isValid(date)) {
            return date.toISOString();
        }
        return null;
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, meridian] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(meridian)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
    convertTime24to12(time24h) {
        if (time24h.length === 5) {
            const date = DateUtil.parse(`2020-01-01T${time24h}`);
            return DateUtil.format(date, 'hh:mm A');
        }
        return time24h;
    }
    formatValue(value, options) {
        if (value == null)
            return '';
        // Use `parse` because it keeps dates in locale
        const date = DateUtil.parse(value, options);
        if (isValid(date)) {
            const dateFormat = `${this.labels.dateFormatString().toUpperCase()}, ${this.military ? 'HH:mm' : 'hh:mm A'}`;
            return DateUtil.format(date, dateFormat);
        }
        return this.normalize(value, options);
    }
    writeValue(value) {
        const initialValue = this['_initialValue'];
        if (initialValue != null && value === initialValue) {
            // This value has already been formatted from the first call to writeValue, simply use it.
            super.writeValue(initialValue);
        }
        else {
            super.writeValue(this.formatValue(value));
            this.valueChange.emit(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted;
            switch (this.dateTimeFormat) {
                case DATE_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case DATE_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
    hourOneFormatRequired(hourInput) {
        return hourInput === '-1' || hourInput === '1-';
    }
    get initialValue() {
        return this.maskValue;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimeFormatDirective, deps: [{ token: i1$2.NovoLabelService }, { token: i1$2.DateFormatService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoDateTimeFormatDirective, isStandalone: false, selector: "input[dateTimeFormat]", inputs: { military: "military", dateTimeFormat: "dateTimeFormat" }, host: { listeners: { "input": "_checkInput($event)", "blur": "_handleBlur($event)", "keydown": "_handleKeydown($event)" }, classAttribute: "novo-date-time-format" }, providers: [DATETIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateTimeFormatDirective }], usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[dateTimeFormat]',
                    host: {
                        class: 'novo-date-time-format',
                        '(input)': '_checkInput($event)',
                        '(blur)': '_handleBlur($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    providers: [DATETIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoDateTimeFormatDirective }],
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$2.NovoLabelService }, { type: i1$2.DateFormatService }], propDecorators: { military: [{
                type: Input
            }], dateTimeFormat: [{
                type: Input
            }] } });

const TIMEFORMAT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimeFormatDirective),
    multi: true,
};
var TIME_FORMATS;
(function (TIME_FORMATS) {
    TIME_FORMATS["DATE"] = "date";
    TIME_FORMATS["ISO8601"] = "iso8601";
    TIME_FORMATS["STRING"] = "string";
})(TIME_FORMATS || (TIME_FORMATS = {}));
class NovoTimeFormatDirective extends IMaskDirective {
    constructor(labels, cdr) {
        super();
        this.labels = labels;
        this.cdr = cdr;
        this.valueChange = new EventEmitter();
        this.military = false;
        this.timeFormat = TIME_FORMATS.DATE;
        this.initFormatOptions();
    }
    ngOnChanges(changes) {
        if (Object.keys(changes).some((key) => ['military', 'timeFormat'].includes(key))) {
            this.initFormatOptions();
        }
    }
    initFormatOptions() {
        const amFormat = this.labels.timeFormatAM.toUpperCase();
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        this.unmask = 'typed'; // typing is to work around angular-imask bug
        this.imask = {
            mask: Date,
            pattern: this.military ? 'HH:mm' : 'hh:mm aa',
            overwrite: true,
            autofix: true,
            lazy: false,
            min: new Date(1970, 0, 1),
            max: new Date(2100, 0, 1),
            prepare: (str) => str.toUpperCase(),
            format: (value) => this.formatValue(value),
            parse: (str) => {
                const time = this.convertTime12to24(str);
                return DateUtil.parse(`${DateUtil.format(Date.now(), 'YYYY-MM-DD')}T${time}`);
            },
            blocks: {
                HH: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 23,
                },
                hh: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 1,
                    to: 12,
                },
                mm: {
                    mask: MaskedRange,
                    placeholderChar: '-',
                    maxLength: 2,
                    from: 0,
                    to: 59,
                },
                aa: {
                    mask: MaskedEnum,
                    placeholderChar: '-',
                    enum: ['AM', 'PM', 'am', 'pm', amFormat, pmFormat],
                },
            },
        };
    }
    _checkInput(event) {
        if (document.activeElement === event.target) {
            const text = event.target.value;
            const hour = text.slice(0, 2);
            if ((this.military && Number(text[0]) > 2) || (!this.military && Number(text[0]) > 1)) {
                event.preventDefault();
                const value = `0${text}`;
                event.target.value = value;
            }
            if (!this.military) {
                const input = text.substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
                const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
                if (timePeriod) {
                    event.target.value = `${text.slice(0, 5)} ${timePeriod}`;
                }
                if (event.target.selectionStart >= 3 && this.hourOneFormatRequired(hour)) {
                    event.target.value = `01:${event.target.value.slice(3, event.target.value.length)}`;
                }
            }
        }
    }
    _handleBlur(event) {
        const text = event.target.value;
        const hour = text.slice(0, 2);
        if (!this.military) {
            const input = text.substr(5, 4).replace(/\-/g, '').trim().slice(0, 2);
            const timePeriod = this.imask.blocks.aa.enum.find((it) => it[0] === input[0]);
            if (this.hourOneFormatRequired(hour)) {
                event.target.value = `01:${text.slice(3, text.length)}`;
            }
            if (!timePeriod) {
                event.target.value = `${text.slice(0, 5)} --`;
            }
        }
    }
    _handleKeydown(event) {
        const input = event.target;
        const hour = input.value.slice(0, 2);
        if (event.key === "Backspace" /* Key.Backspace */ && input.selectionStart === input.value.length) {
            event.target.value = `${input.value.slice(0, 5)} --`;
        }
        else if (event.key === "Tab" /* Key.Tab */ && input.selectionStart <= 2 && this.hourOneFormatRequired(hour)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            input.value = `01:${input.value.slice(3, input.value.length)}`;
            input.setSelectionRange(3, 3);
        }
        else if (event.key === "ArrowRight" /* Key.ArrowRight */ && input.selectionStart >= 2 && this.hourOneFormatRequired(hour)) {
            input.value = `01:${input.value.slice(3, input.value.length)}`;
            input.setSelectionRange(2, 2);
        }
    }
    normalize(value) {
        if (this.military) {
            return this.convertTime12to24(value);
        }
        return this.convertTime24to12(value);
    }
    formatValue(value) {
        const date = DateUtil.parse(value);
        if (isValid(date)) {
            const pattern = this.military ? 'HH:mm' : 'hh:mm A';
            return DateUtil.format(date, pattern);
        }
        return this.normalize(value);
    }
    formatAsIso(date) {
        if (date && isValid(date)) {
            return DateUtil.format(date, 'HH:mm');
        }
        return null;
    }
    convertTime12to24(time12h) {
        const pmFormat = this.labels.timeFormatPM.toUpperCase();
        const [time, meridian] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (['PM', pmFormat].includes(meridian)) {
            hours = `${parseInt(hours, 10) + 12}`.padStart(2, '0');
        }
        return `${hours}:${minutes}`;
    }
    convertTime24to12(time24h) {
        if (time24h.length === 5) {
            const date = DateUtil.parse(`2020-01-01T${time24h}`);
            return DateUtil.format(date, 'hh:mm A');
        }
        return time24h;
    }
    writeValue(value) {
        super.writeValue(this.formatValue(value));
        this.valueChange.emit(value);
    }
    registerOnChange(fn) {
        this.onChange = (date) => {
            let formatted = date;
            switch (this.timeFormat) {
                case TIME_FORMATS.ISO8601:
                    formatted = this.formatAsIso(date);
                    break;
                case TIME_FORMATS.STRING:
                    formatted = this.formatValue(date);
                    break;
                default:
                    formatted = date;
                    break;
            }
            this.valueChange.emit(date);
            fn(formatted);
        };
    }
    hourOneFormatRequired(hourInput) {
        return hourInput === '-1' || hourInput === '1-';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTimeFormatDirective, deps: [{ token: i1$2.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoTimeFormatDirective, isStandalone: false, selector: "input[timeFormat]", inputs: { military: "military", timeFormat: "timeFormat" }, host: { listeners: { "input": "_checkInput($event)", "blur": "_handleBlur($event)", "keydown": "_handleKeydown($event)" }, classAttribute: "novo-time-format" }, providers: [TIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoTimeFormatDirective }], usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoTimeFormatDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[timeFormat]',
                    host: {
                        class: 'novo-time-format',
                        '(input)': '_checkInput($event)',
                        '(blur)': '_handleBlur($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    providers: [TIMEFORMAT_VALUE_ACCESSOR, { provide: NOVO_INPUT_FORMAT, useExisting: NovoTimeFormatDirective }],
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i1$2.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { military: [{
                type: Input
            }], timeFormat: [{
                type: Input
            }] } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This token is used to inject the object whose value should be set into `NovoInput`. If none is
 * provided, the native `HTMLInputElement` is used. Directives like `MatDatepickerInput` can provide
 * themselves for this token, in order to make `NovoInput` delegate the getting and setting of the
 * value to them.
 */
const NOVO_INPUT_VALUE_ACCESSOR = new InjectionToken('NOVO_INPUT_VALUE_ACCESSOR');
// Invalid input type. Using one of these will throw an NovoInputUnsupportedTypeError.
const NOVO_INPUT_INVALID_TYPES = ['button', 'file', 'hidden', 'image', 'radio', 'reset', 'submit'];
let nextUniqueId = 0;
// Boilerplate for applying mixins to NovoInput.
class NovoInputBase {
    constructor(_parentForm, _parentFormGroup, 
    /** @docs-private */
    ngControl) {
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
}
/** Directive that allows a native input to work inside a `NovoField`. */
// tslint:disable: no-conflicting-lifecycle member-ordering
class NovoInput extends NovoInputBase {
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this._uid;
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
    }
    /** Input type of the element. */
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get value() {
        return this._inputValueAccessor.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
            this.stateChanges.next();
        }
    }
    /** Whether the element is readonly. */
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        this._readonly = coerceBooleanProperty(value);
    }
    constructor(_elementRef, _platform, 
    /** @docs-private */
    ngControl, _parentForm, _parentFormGroup, inputValueAccessor, _autofillMonitor, ngZone) {
        super(_parentForm, _parentFormGroup, ngControl);
        this._elementRef = _elementRef;
        this._platform = _platform;
        this.ngControl = ngControl;
        this._autofillMonitor = _autofillMonitor;
        this._uid = `novo-input-${nextUniqueId++}`;
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.focused = false;
        this.errorState = false;
        /** @docs-private Implemented as part of NovoFieldControl. */
        this.lastKeyValue = null;
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.stateChanges = new Subject();
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.controlType = 'novo-input';
        /**
         * Implemented as part of NovoFieldControl.
         * @docs-private
         */
        this.autofilled = false;
        this._disabled = false;
        this._required = false;
        this._type = 'text';
        this._readonly = false;
        this._neverEmptyInputTypes = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week'].filter((t) => getSupportedInputTypes().has(t));
        this.onSelect = new EventEmitter();
        const element = this._elementRef.nativeElement;
        const nodeName = element.nodeName.toLowerCase();
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        this._inputValueAccessor = inputValueAccessor || element;
        this._previousNativeValue = this.value;
        // Force setter to be called in case id was not specified.
        this.id = this.id;
        // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
        // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
        // exists on iOS, we only bother to install the listener on iOS.
        if (_platform.IOS) {
            ngZone.runOutsideAngular(() => {
                _elementRef.nativeElement.addEventListener('keyup', (event) => {
                    const el = event.target;
                    if (!el.value && !el.selectionStart && !el.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        el.setSelectionRange(1, 1);
                        el.setSelectionRange(0, 0);
                    }
                });
            });
        }
        this._isServer = !this._platform.isBrowser;
        this._isNativeSelect = nodeName === 'select';
        this._isTextarea = nodeName === 'textarea';
        this.controlType = this._elementRef.nativeElement.type;
        if (this._isNativeSelect) {
            this.controlType = element.multiple ? 'select-multiple' : 'select';
        }
        else if (this._isTextarea) {
            this.controlType = 'textarea';
        }
    }
    ngAfterViewInit() {
        if (this._platform.isBrowser) {
            this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((event) => {
                this.autofilled = event.isAutofilled;
                this.stateChanges.next();
            });
        }
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        if (this._platform.isBrowser) {
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
    }
    ngDoCheck() {
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    }
    /** Focuses the input. */
    focus(options) {
        this._elementRef.nativeElement.focus(options);
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _focusChanged(isFocused) {
        if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    _onInput(event) {
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
        this.lastKeyValue = event.data;
        if (this._isTextarea) {
            this.lastCaretPosition = this._elementRef.nativeElement.selectionStart;
        }
    }
    /** Does some manual dirty checking on the native input `value` property. */
    _dirtyCheckNativeValue() {
        const newValue = this._elementRef.nativeElement.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
    /** Make sure the input is a supported type. */
    _validateType() {
        if (NOVO_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw new Error(`Invalid Input Type: ${this._type}`);
        }
    }
    /** Checks whether the input type is one of the types that are never empty. */
    _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    }
    /** Checks whether the input is invalid based on the native validation. */
    _isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get empty() {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    get shouldLabelFloat() {
        if (this._isNativeSelect) {
            // For a single-selection `<select>`, the label should float when the selected option has
            // a non-empty display value. For a `<select multiple>`, the label *always* floats to avoid
            // overlapping the label with the options.
            const selectElement = this._elementRef.nativeElement;
            const firstOption = selectElement.options[0];
            // On most browsers the `selectedIndex` will always be 0, however on IE and Edge it'll be
            // -1 if the `value` is set to something, that isn't in the list of options, at a later point.
            return (this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label));
        }
        else {
            return this.focused || !this.empty;
        }
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    /**
     * Implemented as part of NovoFieldControl.
     * @docs-private
     */
    onContainerClick() {
        // Do not re-focus the input element if the element is already focused. Otherwise it can happen
        // that someone clicks on a time input and the cursor resets to the "hours" field while the
        // "minutes" field was actually clicked. See: https://github.com/angular/components/issues/12849
        if (!this.focused) {
            this.focus();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoInput, deps: [{ token: i0.ElementRef }, { token: i1$3.Platform }, { token: i2.NgControl, optional: true, self: true }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: NOVO_INPUT_VALUE_ACCESSOR, optional: true, self: true }, { token: i3.AutofillMonitor }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoInput, isStandalone: false, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: { disabled: "disabled", id: "id", placeholder: "placeholder", required: "required", type: "type", value: "value", readonly: "readonly" }, outputs: { onSelect: "onSelect" }, host: { listeners: { "focus": "_focusChanged(true)", "blur": "_focusChanged(false)", "input": "_onInput($event)" }, properties: { "attr.id": "id", "attr.placeholder": "placeholder", "disabled": "disabled", "required": "required", "attr.readonly": "readonly && !_isNativeSelect || null", "attr.aria-invalid": "errorState", "attr.aria-required": "required.toString()", "attr.autocomplete": "'off'", "attr.aria-describedby": "this._ariaDescribedby" }, classAttribute: "novo-input-element" }, providers: [{ provide: NovoFieldControl, useExisting: NovoInput }], usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoInput, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[novoInput], textarea[novoInput], select[novoInput]`,
                    host: {
                        class: 'novo-input-element',
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[attr.readonly]': 'readonly && !_isNativeSelect || null',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.autocomplete]': "'off'",
                    },
                    providers: [{ provide: NovoFieldControl, useExisting: NovoInput }],
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1$3.Platform }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }, {
                    type: Inject,
                    args: [NOVO_INPUT_VALUE_ACCESSOR]
                }] }, { type: i3.AutofillMonitor }, { type: i0.NgZone }], propDecorators: { _ariaDescribedby: [{
                type: HostBinding,
                args: ['attr.aria-describedby']
            }], disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }], readonly: [{
                type: Input
            }], _focusChanged: [{
                type: HostListener,
                args: ['focus', ['true']]
            }, {
                type: HostListener,
                args: ['blur', ['false']]
            }], _onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onSelect: [{
                type: Output
            }] } });

/** Directive used to connect an input to a MatDatepicker. */
class NovoPickerDirective {
    /** The datepicker that this input is associated with. */
    set picker(picker) {
        if (picker) {
            this._picker = picker;
            picker.registerOnChange((value) => this.updateValue(value));
        }
    }
    constructor(_elementRef, formatter) {
        this._elementRef = _elementRef;
        this.formatter = formatter;
        /**
         * `autocomplete` attribute to be set on the input element.
         * @docs-private
         */
        this.autocompleteAttribute = 'off';
        if (!this.formatter) {
            console.warn('Picker directive is missing required formatter');
        }
        this.formatter?.valueChange.subscribe((value) => {
            this.updatePicker(value);
        });
    }
    updateValue(value) {
        this.formatter.writeValue(value);
    }
    updatePicker(value) {
        if (this._picker) {
            this._picker.writeValue(value);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerDirective, deps: [{ token: i0.ElementRef }, { token: NOVO_INPUT_FORMAT, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoPickerDirective, isStandalone: false, selector: "input[picker]", inputs: { picker: "picker", autocompleteAttribute: ["autocomplete", "autocompleteAttribute"] }, host: { properties: { "attr.autocomplete": "autocompleteAttribute" }, classAttribute: "novo-has-picker" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[picker]',
                    host: {
                        class: 'novo-has-picker',
                        '[attr.autocomplete]': 'autocompleteAttribute',
                    },
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }, {
                    type: Inject,
                    args: [NOVO_INPUT_FORMAT]
                }] }], propDecorators: { picker: [{
                type: Input
            }], autocompleteAttribute: [{
                type: Input,
                args: ['autocomplete']
            }] } });

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoPickerToggleElement {
    /** Whether the toggle button is disabled. */
    get disabled() {
        if (this._disabled === undefined && this.picker) {
            return this.picker.disabled;
        }
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    constructor(_elementRef, cdr, defaultTabIndex, _formField) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._formField = _formField;
        this._stateChanges = Subscription.EMPTY;
        this._onDestroy = new Subject();
        /** Determines whether the overlay is triggered on input focus or solely button click. */
        this.triggerOnFocus = false;
        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    }
    ngOnChanges(changes) {
        if (changes.picker) {
            this._watchStateChanges();
        }
    }
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    ngAfterViewInit() {
        this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
    }
    checkPanel() {
        if (this.triggerOnFocus && this._formField._control.focused) {
            this.openPanel();
        }
    }
    togglePanel(event) {
        this.cdr.detectChanges();
        this.overlay.parent = this.element;
        if (!this.overlay.panelOpen) {
            this.openPanel(event);
        }
        else {
            this.closePanel(event);
        }
    }
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event) {
        if (!this.overlay.panelOpen) {
            this.overlay.parent = this.element;
            this.overlay.openPanel();
        }
    }
    closePanel(event) {
        this.overlay.closePanel();
    }
    get panelOpen() {
        return this.overlay && this.overlay.panelOpen;
    }
    _watchStateChanges() {
        this._formField._control?.stateChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.checkPanel();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerToggleElement, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: 'tabindex', attribute: true }, { token: NOVO_FORM_FIELD, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoPickerToggleElement, isStandalone: false, selector: "novo-picker-toggle", inputs: { picker: ["for", "picker"], icon: "icon", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], triggerOnFocus: "triggerOnFocus", overlayId: "overlayId", width: "width", disabled: "disabled" }, host: { listeners: { "focus": "_button.focus()" }, properties: { "attr.tabindex": "disabled ? null : -1", "class.novo-toggle-active": "picker && picker.opened", "class.novo-accent": "picker && picker.color === \"accent\"", "class.novo-warn": "picker && picker.color === \"warn\"" }, classAttribute: "novo-picker-toggle" }, viewQueries: [{ propertyName: "_button", first: true, predicate: ["button"], descendants: true }, { propertyName: "overlay", first: true, predicate: NovoOverlayTemplateComponent, descendants: true }], exportAs: ["novoPickerToggle"], usesOnChanges: true, ngImport: i0, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [width]=\"width\" [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>", dependencies: [{ kind: "component", type: i1$4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i2$1.NovoOverlayTemplateComponent, selector: "novo-overlay-template", inputs: ["position", "scrollStrategy", "width", "minWidth", "height", "closeOnSelect", "hasBackdrop", "parent"], outputs: ["select", "opening", "closing", "backDropClicked"] }, { kind: "directive", type: i2$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoPickerToggleElement.prototype, "triggerOnFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoPickerToggleElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-picker-toggle', host: {
                        class: 'novo-picker-toggle',
                        // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                        // consumer may have provided, while still being able to receive focus.
                        '[attr.tabindex]': 'disabled ? null : -1',
                        '[class.novo-toggle-active]': 'picker && picker.opened',
                        '[class.novo-accent]': 'picker && picker.color === "accent"',
                        '[class.novo-warn]': 'picker && picker.color === "warn"',
                        '(focus)': '_button.focus()',
                    }, exportAs: 'novoPickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<novo-button\n  #button\n  theme=\"icon\"\n  [icon]=\"icon\"\n  [attr.aria-haspopup]=\"'dialog'\"\n  [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n  [disabled]=\"disabled\"\n  (click)=\"togglePanel($event)\"></novo-button>\n\n<novo-overlay-template [width]=\"width\" [parent]=\"element\" position=\"above-below\">\n  <ng-content></ng-content>\n</novo-overlay-template>" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_FORM_FIELD]
                }] }], propDecorators: { picker: [{
                type: Input,
                args: ['for']
            }], icon: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], triggerOnFocus: [{
                type: Input
            }], overlayId: [{
                type: Input
            }], width: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _button: [{
                type: ViewChild,
                args: ['button']
            }], overlay: [{
                type: ViewChild,
                args: [NovoOverlayTemplateComponent]
            }] } });

// NG2
class NovoFieldModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldModule, declarations: [NovoFieldElement,
            NovoHintElement,
            NovoErrorElement,
            NovoInput,
            NovoFieldPrefixDirective,
            NovoFieldSuffixDirective,
            NovoFieldsElement,
            NovoTimeFormatDirective,
            NovoDateFormatDirective,
            NovoDateTimeFormatDirective,
            NovoDateRangeFormatDirective,
            NovoPickerToggleElement,
            NovoPickerDirective], imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule], exports: [NovoFieldElement,
            NovoHintElement,
            NovoErrorElement,
            NovoInput,
            NovoFieldPrefixDirective,
            NovoFieldSuffixDirective,
            NovoFieldsElement,
            NovoTimeFormatDirective,
            NovoDateFormatDirective,
            NovoDateRangeFormatDirective,
            NovoDateTimeFormatDirective,
            NovoPickerToggleElement,
            NovoPickerDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldModule, imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule],
                    declarations: [
                        NovoFieldElement,
                        NovoHintElement,
                        NovoErrorElement,
                        NovoInput,
                        NovoFieldPrefixDirective,
                        NovoFieldSuffixDirective,
                        NovoFieldsElement,
                        NovoTimeFormatDirective,
                        NovoDateFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoDateRangeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                    ],
                    exports: [
                        NovoFieldElement,
                        NovoHintElement,
                        NovoErrorElement,
                        NovoInput,
                        NovoFieldPrefixDirective,
                        NovoFieldSuffixDirective,
                        NovoFieldsElement,
                        NovoTimeFormatDirective,
                        NovoDateFormatDirective,
                        NovoDateRangeFormatDirective,
                        NovoDateTimeFormatDirective,
                        NovoPickerToggleElement,
                        NovoPickerDirective,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DATEFORMAT_VALUE_ACCESSOR, DATERANGEFORMAT_VALUE_ACCESSOR, DATETIMEFORMAT_VALUE_ACCESSOR, DATE_FORMATS, NOVO_FORM_FIELD, NOVO_INPUT_FORMAT, NOVO_INPUT_VALUE_ACCESSOR, NovoDateFormatDirective, NovoDateRangeFormatDirective, NovoDateTimeFormatDirective, NovoErrorElement, NovoFieldControl, NovoFieldElement, NovoFieldModule, NovoFieldPrefixDirective, NovoFieldSuffixDirective, NovoFieldsElement, NovoHintElement, NovoInput, NovoPickerDirective, NovoPickerToggleElement, NovoTimeFormatDirective, TIMEFORMAT_VALUE_ACCESSOR, TIME_FORMATS };
//# sourceMappingURL=novo-elements-elements-field.mjs.map
