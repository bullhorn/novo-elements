import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1$1 from '@angular/cdk/stepper';
import { CdkStepLabel, CdkStepHeader, CdkStepperNext, CdkStepperPrevious, CdkStep, CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import * as i0 from '@angular/core';
import { Directive, Input, ChangeDetectionStrategy, Component, forwardRef, ContentChild, Inject, ContentChildren, ViewChildren, Optional, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from 'novo-elements/elements/icon';
import { NovoIconComponent, NovoIconModule } from 'novo-elements/elements/icon';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as i4 from '@angular/cdk/bidi';
import { takeUntil } from 'rxjs/operators';
import { PortalModule } from '@angular/cdk/portal';
import { NovoButtonModule } from 'novo-elements/elements/button';

class NovoStepLabel extends CdkStepLabel {
    constructor(template) {
        super(template);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepLabel, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoStepLabel, isStandalone: false, selector: "[novoStepLabel]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepLabel, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoStepLabel]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });

class NovoStepStatus {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepStatus, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoStepStatus, isStandalone: false, selector: "novo-step-status", inputs: { state: "state" }, host: { classAttribute: "novo-step-status" }, ngImport: i0, template: "<div class=\"novo-stepper-status-line\" [ngClass]=\"state\"></div>\n<div [ngSwitch]=\"state\" class=\"novo-stepper-status-icon\">\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'edit'\">check-circle</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'done'\">check-circle-filled</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchDefault>circle-o</novo-icon>\n</div>", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i2$1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepStatus, decorators: [{
            type: Component,
            args: [{ selector: 'novo-step-status', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'novo-step-status',
                    }, standalone: false, template: "<div class=\"novo-stepper-status-line\" [ngClass]=\"state\"></div>\n<div [ngSwitch]=\"state\" class=\"novo-stepper-status-icon\">\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'edit'\">check-circle</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchCase=\"'done'\">check-circle-filled</novo-icon>\n  <novo-icon color=\"positive\" *ngSwitchDefault>circle-o</novo-icon>\n</div>" }]
        }], ctorParameters: () => [], propDecorators: { state: [{
                type: Input
            }] } });

class NovoStepHeader extends CdkStepHeader {
    /** Index of the given step. */
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = coerceNumberProperty(value);
    }
    /** Whether the given step is selected. */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = coerceBooleanProperty(value);
    }
    /** Whether the given step label is active. */
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = coerceBooleanProperty(value);
    }
    /** Whether the given step label is active. */
    get touched() {
        return this.selected || this.state === 'edit' || this.state === 'done';
    }
    /** Whether the given step is optional. */
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    constructor(_focusMonitor, _element) {
        super(_element);
        this._focusMonitor = _focusMonitor;
        this._element = _element;
        _focusMonitor.monitor(_element.nativeElement, true);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._element.nativeElement);
    }
    /** Returns string label of given step if it is a text label. */
    _stringLabel() {
        return this.label instanceof NovoStepLabel ? null : this.label;
    }
    /** Returns NovoStepLabel if the label of given step is a template label. */
    _templateLabel() {
        return this.label instanceof NovoStepLabel ? this.label : null;
    }
    /** Returns the host HTML element. */
    _getHostElement() {
        return this._element.nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepHeader, deps: [{ token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoStepHeader, isStandalone: false, selector: "novo-step-header", inputs: { theme: "theme", color: "color", icon: "icon", state: "state", label: "label", iconOverrides: "iconOverrides", index: "index", selected: "selected", active: "active", optional: "optional" }, host: { attributes: { "role": "tab" }, classAttribute: "novo-step-header" }, usesInheritance: true, ngImport: i0, template: "<div [class.novo-step-icon]=\"touched\"\n  [class.novo-step-icon-not-touched]=\"!touched\">\n  <ng-container *ngIf=\"icon\">\n    <novo-icon raised=\"true\" [theme]=\"theme\">{{icon}}</novo-icon>\n  </ng-container>\n  <ng-container *ngIf=\"!icon\">\n    <span class=\"novo-step-number\">{{index + 1}}</span>\n  </ng-container>\n</div>\n<div class=\"novo-step-label\"\n  [class.novo-step-label-active]=\"active\"\n  [class.novo-step-label-selected]=\"selected\">\n  <!-- If there is a label template, use it. -->\n  <ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\">\n  </ng-container>\n  <!-- It there is no label template, fall back to the text label. -->\n  <div class=\"novo-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\n</div>\n<novo-step-status [state]=\"state\"></novo-step-status>", styles: [":host{overflow:visible;outline:none;cursor:pointer;position:relative}:host .novo-step-optional{font-size:12px}:host .novo-step-icon,:host .novo-step-icon-not-touched{border-radius:50%;height:24px;width:24px;align-items:center;justify-content:center;display:flex}:host .novo-step-icon .novo-step-number,:host .novo-step-icon-not-touched .novo-step-number{font-size:1em;min-width:1.6em;height:1.6em;box-shadow:2px 2px #0003;display:flex;align-items:center;justify-content:center;border-radius:4px}:host .novo-step-icon .novo-step-number{background:#4a89dc;color:#fff}:host .novo-step-icon-not-touched .novo-step-number{background:#a9adbb;color:#fff}:host .novo-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;text-align:center;padding:4px 0}:host .novo-step-text-label{text-align:center;text-overflow:ellipsis;overflow:hidden}:host.novo-vertical-stepper-header{display:flex;align-items:center;padding:24px;max-height:24px}:host.novo-vertical-stepper-header .novo-step-icon,:host.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:12px}[dir=rtl] :host.novo-vertical-stepper-header .novo-step-icon,[dir=rtl] :host.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:0;margin-left:12px}:host.novo-vertical-stepper-header novo-step-status{position:absolute;left:35px;top:25px;transform:scale(.8)}:host.novo-horizontal-stepper-header{display:flex;height:80px;flex-flow:column;overflow:visible;align-items:center;justify-content:center;padding:0 24px}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status{display:flex;width:100%;justify-content:center;align-items:center;position:absolute;height:1px;bottom:0}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line{width:100%;position:absolute}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line:before{content:\"\";display:block;width:calc(50% - 8px);margin-right:8px;border-bottom:1px solid #dbdbdb}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line:after{content:\"\";display:block;width:calc(50% - 8px);margin-left:calc(50% + 8px);margin-top:-1px;border-top:1px solid #dbdbdb}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line.edit:before{border-bottom:1px solid #4a89dc}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line.done:before{border-bottom:1px solid #4a89dc}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line.done:after{border-top:1px solid #4a89dc}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-icon{position:relative}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-icon:before{content:\"\";display:block;background:#fff;border-radius:50%;position:absolute;z-index:0;inset:1px}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-icon>*{position:relative;z-index:1}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2$1.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: NovoStepStatus, selector: "novo-step-status", inputs: ["state"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepHeader, decorators: [{
            type: Component,
            args: [{ selector: 'novo-step-header', host: {
                        class: 'novo-step-header',
                        role: 'tab',
                    }, preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div [class.novo-step-icon]=\"touched\"\n  [class.novo-step-icon-not-touched]=\"!touched\">\n  <ng-container *ngIf=\"icon\">\n    <novo-icon raised=\"true\" [theme]=\"theme\">{{icon}}</novo-icon>\n  </ng-container>\n  <ng-container *ngIf=\"!icon\">\n    <span class=\"novo-step-number\">{{index + 1}}</span>\n  </ng-container>\n</div>\n<div class=\"novo-step-label\"\n  [class.novo-step-label-active]=\"active\"\n  [class.novo-step-label-selected]=\"selected\">\n  <!-- If there is a label template, use it. -->\n  <ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\">\n  </ng-container>\n  <!-- It there is no label template, fall back to the text label. -->\n  <div class=\"novo-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\n</div>\n<novo-step-status [state]=\"state\"></novo-step-status>", styles: [":host{overflow:visible;outline:none;cursor:pointer;position:relative}:host .novo-step-optional{font-size:12px}:host .novo-step-icon,:host .novo-step-icon-not-touched{border-radius:50%;height:24px;width:24px;align-items:center;justify-content:center;display:flex}:host .novo-step-icon .novo-step-number,:host .novo-step-icon-not-touched .novo-step-number{font-size:1em;min-width:1.6em;height:1.6em;box-shadow:2px 2px #0003;display:flex;align-items:center;justify-content:center;border-radius:4px}:host .novo-step-icon .novo-step-number{background:#4a89dc;color:#fff}:host .novo-step-icon-not-touched .novo-step-number{background:#a9adbb;color:#fff}:host .novo-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;text-align:center;padding:4px 0}:host .novo-step-text-label{text-align:center;text-overflow:ellipsis;overflow:hidden}:host.novo-vertical-stepper-header{display:flex;align-items:center;padding:24px;max-height:24px}:host.novo-vertical-stepper-header .novo-step-icon,:host.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:12px}[dir=rtl] :host.novo-vertical-stepper-header .novo-step-icon,[dir=rtl] :host.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:0;margin-left:12px}:host.novo-vertical-stepper-header novo-step-status{position:absolute;left:35px;top:25px;transform:scale(.8)}:host.novo-horizontal-stepper-header{display:flex;height:80px;flex-flow:column;overflow:visible;align-items:center;justify-content:center;padding:0 24px}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status{display:flex;width:100%;justify-content:center;align-items:center;position:absolute;height:1px;bottom:0}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line{width:100%;position:absolute}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line:before{content:\"\";display:block;width:calc(50% - 8px);margin-right:8px;border-bottom:1px solid #dbdbdb}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line:after{content:\"\";display:block;width:calc(50% - 8px);margin-left:calc(50% + 8px);margin-top:-1px;border-top:1px solid #dbdbdb}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line.edit:before{border-bottom:1px solid #4a89dc}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line.done:before{border-bottom:1px solid #4a89dc}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-line.done:after{border-top:1px solid #4a89dc}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-icon{position:relative}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-icon:before{content:\"\";display:block;background:#fff;border-radius:50%;position:absolute;z-index:0;inset:1px}:host.novo-horizontal-stepper-header ::ng-deep .novo-step-status .novo-stepper-status-icon>*{position:relative;z-index:1}\n"] }]
        }], ctorParameters: () => [{ type: i1.FocusMonitor }, { type: i0.ElementRef }], propDecorators: { theme: [{
                type: Input
            }], color: [{
                type: Input
            }], icon: [{
                type: Input
            }], state: [{
                type: Input
            }], label: [{
                type: Input
            }], iconOverrides: [{
                type: Input
            }], index: [{
                type: Input
            }], selected: [{
                type: Input
            }], active: [{
                type: Input
            }], optional: [{
                type: Input
            }] } });

/** Button that moves to the next step in a stepper workflow. */
class NovoStepperNext extends CdkStepperNext {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperNext, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoStepperNext, isStandalone: false, selector: "button[novoStepperNext],novo-button[novoStepperNext]", inputs: { type: "type" }, host: { properties: { "type": "type" }, classAttribute: "novo-stepper-next" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperNext, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[novoStepperNext],novo-button[novoStepperNext]',
                    host: {
                        class: 'novo-stepper-next',
                        '[type]': 'type',
                    },
                    inputs: ['type'],
                    standalone: false,
                }]
        }] });
/** Button that moves to the previous step in a stepper workflow. */
class NovoStepperPrevious extends CdkStepperPrevious {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperPrevious, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoStepperPrevious, isStandalone: false, selector: "button[novoStepperPrevious],novo-button[novoStepperPrevious]", inputs: { type: "type" }, host: { properties: { "type": "type" }, classAttribute: "novo-stepper-previous" }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperPrevious, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[novoStepperPrevious],novo-button[novoStepperPrevious]',
                    host: {
                        class: 'novo-stepper-previous',
                        '[type]': 'type',
                    },
                    inputs: ['type'],
                    standalone: false,
                }]
        }] });

/** Animations used by the Novo steppers. */
const novoStepperAnimations = {
    /** Animation that transitions the step along the X axis in a horizontal stepper. */
    horizontalStepTransition: trigger('stepTransition', [
        state('previous', style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
        state('current', style({ transform: 'none', visibility: 'visible' })),
        state('next', style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
        transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
    ]),
    /** Animation that transitions the step along the Y axis in a vertical stepper. */
    verticalStepTransition: trigger('stepTransition', [
        state('previous', style({ height: '0px', visibility: 'hidden' })),
        state('next', style({ height: '0px', visibility: 'hidden' })),
        state('current', style({ height: '*', visibility: 'visible' })),
        transition('* <=> current', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
};

class NovoStep extends CdkStep {
    constructor(stepper) {
        super(stepper);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStep, deps: [{ token: forwardRef(() => NovoStepper) }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoStep, isStandalone: false, selector: "novo-step", inputs: { theme: "theme", color: "color", icon: "icon" }, providers: [{ provide: CdkStep, useExisting: NovoStep }], queries: [{ propertyName: "stepLabel", first: true, predicate: NovoStepLabel, descendants: true }], usesInheritance: true, ngImport: i0, template: "<ng-template><ng-content></ng-content></ng-template>\n", styles: [":host.novo-stepper-vertical,:host.novo-stepper-horizontal{display:block}:host .novo-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center;justify-content:center;margin-bottom:1em;background:#f7f7f7}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;min-width:0px;height:80px}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}:host .novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}:host .novo-horizontal-content-container .novo-horizontal-stepper-content{overflow:hidden}:host .novo-horizontal-content-container .novo-horizontal-stepper-content[aria-expanded=false]{height:0}:host .novo-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] :host .novo-vertical-content-container{margin-left:0;margin-right:36px}:host .novo-vertical-content-container .novo-vertical-stepper-content{overflow:hidden}:host .novo-stepper-vertical-line:before{content:\"\";position:absolute;top:-16px;bottom:-16px;left:0;z-index:-1;border-left-width:1px;border-left-style:solid;border-left-color:#dbdbdb}[dir=rtl] :host .novo-stepper-vertical-line:before{left:auto;right:0}:host .novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:after{border-left-color:1px solid #4a89dc}:host .novo-vertical-content{padding:0 24px 24px}:host .novo-step:last-child .novo-vertical-content-container{border:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStep, decorators: [{
            type: Component,
            args: [{ selector: 'novo-step', preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: CdkStep, useExisting: NovoStep }], standalone: false, template: "<ng-template><ng-content></ng-content></ng-template>\n", styles: [":host.novo-stepper-vertical,:host.novo-stepper-horizontal{display:block}:host .novo-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center;justify-content:center;margin-bottom:1em;background:#f7f7f7}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;min-width:0px;height:80px}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}:host .novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}:host .novo-horizontal-content-container .novo-horizontal-stepper-content{overflow:hidden}:host .novo-horizontal-content-container .novo-horizontal-stepper-content[aria-expanded=false]{height:0}:host .novo-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] :host .novo-vertical-content-container{margin-left:0;margin-right:36px}:host .novo-vertical-content-container .novo-vertical-stepper-content{overflow:hidden}:host .novo-stepper-vertical-line:before{content:\"\";position:absolute;top:-16px;bottom:-16px;left:0;z-index:-1;border-left-width:1px;border-left-style:solid;border-left-color:#dbdbdb}[dir=rtl] :host .novo-stepper-vertical-line:before{left:auto;right:0}:host .novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:after{border-left-color:1px solid #4a89dc}:host .novo-vertical-content{padding:0 24px 24px}:host .novo-step:last-child .novo-vertical-content-container{border:none}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.CdkStepper, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NovoStepper)]
                }] }], propDecorators: { stepLabel: [{
                type: ContentChild,
                args: [NovoStepLabel]
            }], theme: [{
                type: Input
            }], color: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });
class NovoStepper extends CdkStepper {
    constructor() {
        super(...arguments);
        /** Consumer-specified template-refs to be used to override the header icons. */
        this._iconOverrides = {};
    }
    get completed() {
        try {
            const steps = this.steps.toArray();
            const length = steps.length - 1;
            return steps[length].completed && length === this.selectedIndex;
        }
        catch (err) {
            return false;
        }
    }
    ngAfterContentInit() {
        // Mark the component for change detection whenever the content children query changes
        this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
    }
    ngOnDestroy() { }
    complete() {
        try {
            const steps = this.steps.toArray();
            steps[this.selectedIndex].completed = true;
            this.next();
            this._stateChanged();
        }
        catch (err) {
            // do nothing
        }
    }
    getIndicatorType(index) {
        const steps = this.steps.toArray();
        if (index === this.selectedIndex) {
            if (steps[index] && index === steps.length - 1 && steps[index].completed) {
                return 'done';
            }
            return 'edit';
        }
        if (index < this.selectedIndex) {
            return 'done';
        }
        return 'none';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepper, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: NovoStepper, isStandalone: false, selector: "[novoStepper]", providers: [
            { provide: CdkStep, useExisting: NovoStep },
            { provide: CdkStepper, useExisting: NovoStepper },
        ], queries: [{ propertyName: "steps", predicate: NovoStep, descendants: true }, { propertyName: "_icons", predicate: NovoIconComponent }], viewQueries: [{ propertyName: "_stepHeader", predicate: NovoStepHeader, descendants: true }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoStepper]',
                    providers: [
                        { provide: CdkStep, useExisting: NovoStep },
                        { provide: CdkStepper, useExisting: NovoStepper },
                    ],
                    standalone: false,
                }]
        }], propDecorators: { _stepHeader: [{
                type: ViewChildren,
                args: [NovoStepHeader]
            }], steps: [{
                type: ContentChildren,
                args: [NovoStep, { descendants: true }]
            }], _icons: [{
                type: ContentChildren,
                args: [NovoIconComponent]
            }] } });
class NovoHorizontalStepper extends NovoStepper {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoHorizontalStepper, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoHorizontalStepper, isStandalone: false, selector: "novo-horizontal-stepper", host: { attributes: { "aria-orientation": "horizontal", "role": "tablist" }, classAttribute: "novo-stepper-horizontal" }, providers: [
            { provide: NovoStepper, useExisting: NovoHorizontalStepper },
            { provide: CdkStepper, useExisting: NovoHorizontalStepper },
        ], exportAs: ["novoHorizontalStepper"], usesInheritance: true, ngImport: i0, template: "<div class=\"novo-horizontal-stepper-header-container\">\n  <div class=\"novo-stepper-horizontal-line complete\"></div>\n  <ng-container *ngFor=\"let step of _steps; let i = index; let isLast = last\">\n    <novo-step-header class=\"novo-horizontal-stepper-header\"\n      (click)=\"step.select()\"\n      (keydown)=\"_onKeydown($event)\"\n      [tabIndex]=\"_getFocusIndex() === i ? 0 : -1\"\n      [id]=\"_getStepLabelId(i)\"\n      [attr.aria-controls]=\"_getStepContentId(i)\"\n      [attr.aria-selected]=\"selectedIndex == i\"\n      [index]=\"i\"\n      [theme]=\"step.theme\"\n      [color]=\"step.color\"\n      [icon]=\"step.icon\"\n      [state]=\"getIndicatorType(i)\"\n      [label]=\"step.stepLabel || step.label\"\n      [selected]=\"selectedIndex === i\"\n      [active]=\"step.completed || selectedIndex === i || !linear\"\n      [optional]=\"step.optional\"\n      [iconOverrides]=\"_iconOverrides\">\n    </novo-step-header>\n  </ng-container>\n  <div class=\"novo-stepper-horizontal-line\" [class.complete]=\"completed\"></div>\n</div>\n\n<div class=\"novo-horizontal-content-container\">\n  <div *ngFor=\"let step of _steps; let i = index\"\n    class=\"novo-horizontal-stepper-content\" role=\"tabpanel\"\n    [@stepTransition]=\"_getAnimationDirection(i)\"\n    [id]=\"_getStepContentId(i)\"\n    [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n    [attr.aria-expanded]=\"selectedIndex === i\">\n    <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n  </div>\n</div>", styles: [":host.novo-stepper-vertical,:host.novo-stepper-horizontal{display:block}:host .novo-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center;justify-content:center;margin-bottom:1em;background:#f7f7f7}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;min-width:0px;height:80px}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}:host .novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}:host .novo-horizontal-content-container .novo-horizontal-stepper-content{overflow:hidden}:host .novo-horizontal-content-container .novo-horizontal-stepper-content[aria-expanded=false]{height:0}:host .novo-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] :host .novo-vertical-content-container{margin-left:0;margin-right:36px}:host .novo-vertical-content-container .novo-vertical-stepper-content{overflow:hidden}:host .novo-stepper-vertical-line:before{content:\"\";position:absolute;top:-16px;bottom:-16px;left:0;z-index:-1;border-left-width:1px;border-left-style:solid;border-left-color:#dbdbdb}[dir=rtl] :host .novo-stepper-vertical-line:before{left:auto;right:0}:host .novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:after{border-left-color:1px solid #4a89dc}:host .novo-vertical-content{padding:0 24px 24px}:host .novo-step:last-child .novo-vertical-content-container{border:none}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NovoStepHeader, selector: "novo-step-header", inputs: ["theme", "color", "icon", "state", "label", "iconOverrides", "index", "selected", "active", "optional"] }], animations: [novoStepperAnimations.horizontalStepTransition], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoHorizontalStepper, decorators: [{
            type: Component,
            args: [{ selector: 'novo-horizontal-stepper', exportAs: 'novoHorizontalStepper', host: {
                        class: 'novo-stepper-horizontal',
                        'aria-orientation': 'horizontal',
                        role: 'tablist',
                    }, animations: [novoStepperAnimations.horizontalStepTransition], providers: [
                        { provide: NovoStepper, useExisting: NovoHorizontalStepper },
                        { provide: CdkStepper, useExisting: NovoHorizontalStepper },
                    ], preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div class=\"novo-horizontal-stepper-header-container\">\n  <div class=\"novo-stepper-horizontal-line complete\"></div>\n  <ng-container *ngFor=\"let step of _steps; let i = index; let isLast = last\">\n    <novo-step-header class=\"novo-horizontal-stepper-header\"\n      (click)=\"step.select()\"\n      (keydown)=\"_onKeydown($event)\"\n      [tabIndex]=\"_getFocusIndex() === i ? 0 : -1\"\n      [id]=\"_getStepLabelId(i)\"\n      [attr.aria-controls]=\"_getStepContentId(i)\"\n      [attr.aria-selected]=\"selectedIndex == i\"\n      [index]=\"i\"\n      [theme]=\"step.theme\"\n      [color]=\"step.color\"\n      [icon]=\"step.icon\"\n      [state]=\"getIndicatorType(i)\"\n      [label]=\"step.stepLabel || step.label\"\n      [selected]=\"selectedIndex === i\"\n      [active]=\"step.completed || selectedIndex === i || !linear\"\n      [optional]=\"step.optional\"\n      [iconOverrides]=\"_iconOverrides\">\n    </novo-step-header>\n  </ng-container>\n  <div class=\"novo-stepper-horizontal-line\" [class.complete]=\"completed\"></div>\n</div>\n\n<div class=\"novo-horizontal-content-container\">\n  <div *ngFor=\"let step of _steps; let i = index\"\n    class=\"novo-horizontal-stepper-content\" role=\"tabpanel\"\n    [@stepTransition]=\"_getAnimationDirection(i)\"\n    [id]=\"_getStepContentId(i)\"\n    [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n    [attr.aria-expanded]=\"selectedIndex === i\">\n    <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n  </div>\n</div>", styles: [":host.novo-stepper-vertical,:host.novo-stepper-horizontal{display:block}:host .novo-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center;justify-content:center;margin-bottom:1em;background:#f7f7f7}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;min-width:0px;height:80px}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}:host .novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}:host .novo-horizontal-content-container .novo-horizontal-stepper-content{overflow:hidden}:host .novo-horizontal-content-container .novo-horizontal-stepper-content[aria-expanded=false]{height:0}:host .novo-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] :host .novo-vertical-content-container{margin-left:0;margin-right:36px}:host .novo-vertical-content-container .novo-vertical-stepper-content{overflow:hidden}:host .novo-stepper-vertical-line:before{content:\"\";position:absolute;top:-16px;bottom:-16px;left:0;z-index:-1;border-left-width:1px;border-left-style:solid;border-left-color:#dbdbdb}[dir=rtl] :host .novo-stepper-vertical-line:before{left:auto;right:0}:host .novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:after{border-left-color:1px solid #4a89dc}:host .novo-vertical-content{padding:0 24px 24px}:host .novo-step:last-child .novo-vertical-content-container{border:none}\n"] }]
        }] });
class NovoVerticalStepper extends NovoStepper {
    constructor(dir, changeDetectorRef, elementRef) {
        super(dir, changeDetectorRef, elementRef);
        this.orientation = 'vertical';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoVerticalStepper, deps: [{ token: i4.Directionality, optional: true }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoVerticalStepper, isStandalone: false, selector: "novo-vertical-stepper", host: { attributes: { "aria-orientation": "vertical", "role": "tablist" }, classAttribute: "novo-stepper-vertical" }, providers: [
            { provide: NovoStepper, useExisting: NovoVerticalStepper },
            { provide: CdkStepper, useExisting: NovoVerticalStepper },
        ], exportAs: ["novoVerticalStepper"], usesInheritance: true, ngImport: i0, template: "<div class=\"novo-step\" *ngFor=\"let step of _steps; let i = index; let isLast = last\">\n  <novo-step-header class=\"novo-vertical-stepper-header\"\n    (click)=\"step.select()\"\n    (keydown)=\"_onKeydown($event)\"\n    [tabIndex]=\"_getFocusIndex() == i ? 0 : -1\"\n    [id]=\"_getStepLabelId(i)\"\n    [attr.aria-controls]=\"_getStepContentId(i)\"\n    [attr.aria-selected]=\"selectedIndex === i\"\n    [index]=\"i\"\n    [theme]=\"step.theme\"\n    [color]=\"step.color\"\n    [icon]=\"step.icon\"\n    [state]=\"getIndicatorType(i)\"\n    [label]=\"step.stepLabel || step.label\"\n    [selected]=\"selectedIndex === i\"\n    [active]=\"step.completed || selectedIndex === i || !linear\"\n    [optional]=\"step.optional\"\n    [iconOverrides]=\"_iconOverrides\">\n  </novo-step-header>\n\n  <div class=\"novo-vertical-content-container\" [class.novo-stepper-vertical-line]=\"!isLast\"\n    [ngClass]=\"getIndicatorType(i)\">\n    <div class=\"novo-vertical-stepper-content\" role=\"tabpanel\"\n      [@stepTransition]=\"_getAnimationDirection(i)\"\n      [id]=\"_getStepContentId(i)\"\n      [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n      [attr.aria-expanded]=\"selectedIndex === i\">\n      <div class=\"novo-vertical-content\">\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n      </div>\n    </div>\n  </div>\n</div>", styles: [":host.novo-stepper-vertical,:host.novo-stepper-horizontal{display:block}:host .novo-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center;justify-content:center;margin-bottom:1em;background:#f7f7f7}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;min-width:0px;height:80px}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}:host .novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}:host .novo-horizontal-content-container .novo-horizontal-stepper-content{overflow:hidden}:host .novo-horizontal-content-container .novo-horizontal-stepper-content[aria-expanded=false]{height:0}:host .novo-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] :host .novo-vertical-content-container{margin-left:0;margin-right:36px}:host .novo-vertical-content-container .novo-vertical-stepper-content{overflow:hidden}:host .novo-stepper-vertical-line:before{content:\"\";position:absolute;top:-16px;bottom:-16px;left:0;z-index:-1;border-left-width:1px;border-left-style:solid;border-left-color:#dbdbdb}[dir=rtl] :host .novo-stepper-vertical-line:before{left:auto;right:0}:host .novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:after{border-left-color:1px solid #4a89dc}:host .novo-vertical-content{padding:0 24px 24px}:host .novo-step:last-child .novo-vertical-content-container{border:none}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NovoStepHeader, selector: "novo-step-header", inputs: ["theme", "color", "icon", "state", "label", "iconOverrides", "index", "selected", "active", "optional"] }], animations: [novoStepperAnimations.verticalStepTransition], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoVerticalStepper, decorators: [{
            type: Component,
            args: [{ selector: 'novo-vertical-stepper', exportAs: 'novoVerticalStepper', host: {
                        class: 'novo-stepper-vertical',
                        'aria-orientation': 'vertical',
                        role: 'tablist',
                    }, animations: [novoStepperAnimations.verticalStepTransition], providers: [
                        { provide: NovoStepper, useExisting: NovoVerticalStepper },
                        { provide: CdkStepper, useExisting: NovoVerticalStepper },
                    ], preserveWhitespaces: false, changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div class=\"novo-step\" *ngFor=\"let step of _steps; let i = index; let isLast = last\">\n  <novo-step-header class=\"novo-vertical-stepper-header\"\n    (click)=\"step.select()\"\n    (keydown)=\"_onKeydown($event)\"\n    [tabIndex]=\"_getFocusIndex() == i ? 0 : -1\"\n    [id]=\"_getStepLabelId(i)\"\n    [attr.aria-controls]=\"_getStepContentId(i)\"\n    [attr.aria-selected]=\"selectedIndex === i\"\n    [index]=\"i\"\n    [theme]=\"step.theme\"\n    [color]=\"step.color\"\n    [icon]=\"step.icon\"\n    [state]=\"getIndicatorType(i)\"\n    [label]=\"step.stepLabel || step.label\"\n    [selected]=\"selectedIndex === i\"\n    [active]=\"step.completed || selectedIndex === i || !linear\"\n    [optional]=\"step.optional\"\n    [iconOverrides]=\"_iconOverrides\">\n  </novo-step-header>\n\n  <div class=\"novo-vertical-content-container\" [class.novo-stepper-vertical-line]=\"!isLast\"\n    [ngClass]=\"getIndicatorType(i)\">\n    <div class=\"novo-vertical-stepper-content\" role=\"tabpanel\"\n      [@stepTransition]=\"_getAnimationDirection(i)\"\n      [id]=\"_getStepContentId(i)\"\n      [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n      [attr.aria-expanded]=\"selectedIndex === i\">\n      <div class=\"novo-vertical-content\">\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n      </div>\n    </div>\n  </div>\n</div>", styles: [":host.novo-stepper-vertical,:host.novo-stepper-horizontal{display:block}:host .novo-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center;justify-content:center;margin-bottom:1em;background:#f7f7f7}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;min-width:0px;height:80px}:host .novo-horizontal-stepper-header-container .novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}:host .novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}:host .novo-horizontal-content-container .novo-horizontal-stepper-content{overflow:hidden}:host .novo-horizontal-content-container .novo-horizontal-stepper-content[aria-expanded=false]{height:0}:host .novo-vertical-content-container{margin-left:36px;border:0;position:relative}[dir=rtl] :host .novo-vertical-content-container{margin-left:0;margin-right:36px}:host .novo-vertical-content-container .novo-vertical-stepper-content{overflow:hidden}:host .novo-stepper-vertical-line:before{content:\"\";position:absolute;top:-16px;bottom:-16px;left:0;z-index:-1;border-left-width:1px;border-left-style:solid;border-left-color:#dbdbdb}[dir=rtl] :host .novo-stepper-vertical-line:before{left:auto;right:0}:host .novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:before{border-left-color:1px solid #4a89dc}:host .novo-stepper-vertical-line.done:after{border-left-color:1px solid #4a89dc}:host .novo-vertical-content{padding:0 24px 24px}:host .novo-step:last-child .novo-vertical-content-container{border:none}\n"] }]
        }], ctorParameters: () => [{ type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }] });

class NovoStepperModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperModule, declarations: [NovoHorizontalStepper,
            NovoVerticalStepper,
            NovoStep,
            NovoStepLabel,
            NovoStepper,
            NovoStepHeader,
            NovoStepStatus,
            NovoStepperNext,
            NovoStepperPrevious], imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule], exports: [NovoHorizontalStepper,
            NovoVerticalStepper,
            NovoStep,
            NovoStepLabel,
            NovoStepper,
            NovoStepHeader,
            NovoStepStatus,
            NovoStepperNext,
            NovoStepperPrevious] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperModule, imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStepperModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PortalModule, NovoButtonModule, CdkStepperModule, NovoIconModule, A11yModule],
                    exports: [
                        NovoHorizontalStepper,
                        NovoVerticalStepper,
                        NovoStep,
                        NovoStepLabel,
                        NovoStepper,
                        NovoStepHeader,
                        NovoStepStatus,
                        NovoStepperNext,
                        NovoStepperPrevious,
                    ],
                    declarations: [
                        NovoHorizontalStepper,
                        NovoVerticalStepper,
                        NovoStep,
                        NovoStepLabel,
                        NovoStepper,
                        NovoStepHeader,
                        NovoStepStatus,
                        NovoStepperNext,
                        NovoStepperPrevious,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoHorizontalStepper, NovoStep, NovoStepHeader, NovoStepLabel, NovoStepStatus, NovoStepper, NovoStepperModule, NovoStepperNext, NovoStepperPrevious, NovoVerticalStepper, novoStepperAnimations };
//# sourceMappingURL=novo-elements-elements-stepper.mjs.map
