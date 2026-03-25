import * as i0 from '@angular/core';
import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/button';

declare class NovoSliderElement implements OnInit, OnDestroy {
    private element;
    labels: NovoLabelService;
    slides: any;
    currentSlide: number;
    start: boolean;
    end: boolean;
    currSlides: Array<any>;
    handleKeyDownFunc: any;
    currentClass: string;
    constructor(element: ElementRef, labels: NovoLabelService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    handleKeyDown(event: KeyboardEvent): void;
    changeSlide(direction: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSliderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSliderElement, "novo-slider", never, { "slides": { "alias": "slides"; "required": false; }; }, {}, never, ["div[slide]", "button"], false, never>;
}

declare class NovoSliderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSliderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoSliderModule, [typeof NovoSliderElement], [typeof i2.CommonModule, typeof i3.NovoButtonModule], [typeof NovoSliderElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoSliderModule>;
}

export { NovoSliderElement, NovoSliderModule };
