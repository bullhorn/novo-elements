import { ElementRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';
export declare class TableCell implements OnInit, OnDestroy {
    private element;
    private componentUtils;
    container: ViewContainerRef;
    column: any;
    row: any;
    form: FormGroup;
    hasEditor: boolean;
    value: any;
    private valueChangeSubscription;
    constructor(element: ElementRef, componentUtils: ComponentUtils);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: any): void;
}
