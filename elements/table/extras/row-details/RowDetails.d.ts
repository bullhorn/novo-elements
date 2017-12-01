import { ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
export declare class RowDetails implements OnInit {
    private element;
    private componentUtils;
    container: ViewContainerRef;
    data: any;
    renderer: any;
    value: any;
    constructor(element: ElementRef, componentUtils: ComponentUtils);
    ngOnInit(): void;
}
