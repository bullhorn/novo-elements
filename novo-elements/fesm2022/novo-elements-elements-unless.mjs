import * as i0 from '@angular/core';
import { Input, Directive, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import { CommonModule } from '@angular/common';

// NG2
class Unless {
    constructor(templateRef, viewContainer, security, destroyRef) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.security = security;
        this.destroyRef = destroyRef;
        this.permissions = '';
        this.isDisplayed = false;
        const sub = this.security.subscribe(this.check.bind(this));
        this.destroyRef.onDestroy(() => {
            // If Security uses an old definition, subscribe will return void/undefined.
            try {
                sub?.unsubscribe();
            }
            catch { }
        });
    }
    set bhUnless(value) {
        this.permissions = value || '';
        this.check();
    }
    check() {
        let display = false;
        if (~this.permissions.indexOf('||')) {
            const ps = this.permissions.split('||');
            for (const p of ps) {
                if (this.security.has(p.trim())) {
                    display = true;
                }
            }
        }
        else {
            display = this.permissions.split('&&').every((p) => this.security.has(p.trim()));
        }
        if (display) {
            if (!this.isDisplayed) {
                this.isDisplayed = true;
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
        else {
            this.isDisplayed = false;
            this.viewContainer.clear();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: Unless, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i1.Security }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.17", type: Unless, isStandalone: false, selector: "[bhUnless]", inputs: { bhUnless: "bhUnless" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: Unless, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bhUnless]',
                    standalone: false,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.Security }, { type: i0.DestroyRef }], propDecorators: { bhUnless: [{
                type: Input
            }] } });

// NG2
class UnlessModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: UnlessModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.17", ngImport: i0, type: UnlessModule, declarations: [Unless], imports: [CommonModule], exports: [Unless] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: UnlessModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.17", ngImport: i0, type: UnlessModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [Unless],
                    exports: [Unless],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Unless, UnlessModule };
//# sourceMappingURL=novo-elements-elements-unless.mjs.map
