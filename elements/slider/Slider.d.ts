import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class NovoSliderElement implements OnInit, OnDestroy {
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
    handleKeyDown(event: any): void;
    changeSlide(direction: any): void;
}
