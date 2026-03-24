import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectorRef, DestroyRef, ElementRef, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
    private _changeDetectorRef;
    _container: any;
    private destroyRef;
    constructor(_changeDetectorRef: ChangeDetectorRef, _container: any, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone, destroyRef: DestroyRef);
    ngAfterContentInit(): void;
    getHostElement(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLayoutContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLayoutContent, "novo-layout-content", ["novoLayoutContent"], {}, {}, never, ["*"], false, never>;
}
