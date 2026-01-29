import * as i0 from '@angular/core';
import { HostBinding, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { _isNumberValue } from '@angular/cdk/coercion';
import * as i1 from '@angular/platform-browser';

// NG2
class NovoBoxElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
    }
    get display() {
        return 'block';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoBoxElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoBoxElement, isStandalone: false, selector: "novo-box", inputs: { direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.flex-wrap": "this.wrap", "style.gap": "this.gap" } }, ngImport: i0, template: ' <ng-content></ng-content> ', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoBoxElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-box',
                    template: ' <ng-content></ng-content> ',
                    standalone: false,
                }]
        }], propDecorators: { display: [{
                type: HostBinding,
                args: ['style.display']
            }], direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }], justify: [{
                type: HostBinding,
                args: ['style.justify-content']
            }, {
                type: Input
            }], wrap: [{
                type: HostBinding,
                args: ['style.flex-wrap']
            }, {
                type: Input
            }], gap: [{
                type: HostBinding,
                args: ['style.gap']
            }, {
                type: Input
            }] } });

// NG2
class NovoFlexElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
    }
    get display() {
        return 'flex';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFlexElement, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoFlexElement, isStandalone: false, selector: "novo-flex,novo-row", inputs: { direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.flex-wrap": "this.wrap", "style.gap": "this.gap" } }, ngImport: i0, template: ' <ng-content></ng-content> ', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFlexElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-flex,novo-row',
                    template: ' <ng-content></ng-content> ',
                    standalone: false,
                }]
        }], propDecorators: { display: [{
                type: HostBinding,
                args: ['style.display']
            }], direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }], justify: [{
                type: HostBinding,
                args: ['style.justify-content']
            }, {
                type: Input
            }], wrap: [{
                type: HostBinding,
                args: ['style.flex-wrap']
            }, {
                type: Input
            }], gap: [{
                type: HostBinding,
                args: ['style.gap']
            }, {
                type: Input
            }] } });
class NovoStackElement extends NovoFlexElement {
    constructor() {
        super(...arguments);
        this.direction = 'column';
        this.align = 'start';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStackElement, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoStackElement, isStandalone: false, selector: "novo-stack,novo-column", inputs: { direction: "direction", align: "align" }, host: { properties: { "style.flex-direction": "this.direction", "style.align-items": "this.align" } }, usesInheritance: true, ngImport: i0, template: ' <ng-content></ng-content> ', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoStackElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-stack,novo-column',
                    template: ' <ng-content></ng-content> ',
                    standalone: false,
                }]
        }], propDecorators: { direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }] } });

// NG2
class NovoGridElement {
    get display() {
        return 'grid';
    }
    get hb_gridCols() {
        if (_isNumberValue(this.columns)) {
            return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, 1fr)`);
        }
        return this._sanitizer.bypassSecurityTrustStyle(`${this.columns}`);
    }
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.direction = 'row';
        this.align = 'start';
        this.justify = 'flex-start';
        this.columns = '1';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoGridElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoGridElement, isStandalone: false, selector: "novo-grid", inputs: { direction: "direction", align: "align", justify: "justify", columns: "columns" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.grid-template-columns": "this.hb_gridCols" } }, ngImport: i0, template: ' <ng-content></ng-content> ', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoGridElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-grid',
                    template: ' <ng-content></ng-content> ',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { display: [{
                type: HostBinding,
                args: ['style.display']
            }], direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }], justify: [{
                type: HostBinding,
                args: ['style.justify-content']
            }, {
                type: Input
            }], columns: [{
                type: Input
            }], hb_gridCols: [{
                type: HostBinding,
                args: ['style.grid-template-columns']
            }] } });

class NovoFlexModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFlexModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoFlexModule, declarations: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement], imports: [CommonModule], exports: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFlexModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoFlexModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement],
                    exports: [NovoFlexElement, NovoStackElement, NovoGridElement, NovoBoxElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoBoxElement, NovoFlexElement, NovoFlexModule, NovoGridElement, NovoStackElement };
//# sourceMappingURL=novo-elements-elements-flex.mjs.map
