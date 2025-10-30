import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, ElementRef, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NovoRailComponent extends CdkScrollable implements AfterContentInit {
    constructor(elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRailComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRailComponent, "novo-rail", never, {}, {}, never, ["*"], false, never>;
}
