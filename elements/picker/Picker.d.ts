import { EventEmitter, ElementRef, ViewContainerRef, OnInit, ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoOverlayTemplate } from '../overlay/Overlay';
/**
 * @name Picker
 *
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
export declare class NovoPickerElement implements OnInit {
    element: ElementRef;
    private componentUtils;
    private ref;
    results: ViewContainerRef;
    config: any;
    placeholder: string;
    clearValueOnSelect: boolean;
    closeOnSelect: boolean;
    selected: Array<any>;
    appendToBody: boolean;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: string;
    autoSelectFirstOption: boolean;
    overrideElement: ElementRef;
    disablePickerInput: boolean;
    private _disablePickerInput;
    changed: EventEmitter<any>;
    select: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    container: NovoOverlayTemplate;
    private input;
    closeHandler: any;
    isStatic: boolean;
    term: string;
    resultsComponent: any;
    popup: any;
    _value: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, componentUtils: ComponentUtils, ref: ChangeDetectorRef);
    ngOnInit(): void;
    private onDebouncedKeyup(event);
    /** BEGIN: Convienient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    readonly panelOpen: boolean;
    /** END: Convienient Panel Methods. */
    private show(term?);
    private hide();
    onKeyDown(event: KeyboardEvent): void;
    clearValue(wipeTerm: any): void;
    /**
     * @name onFocus
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event: any): void;
    /**
     * @name showResults
     *
     * @description This method creates an instance of the results (called popup) and adds all the bindings to that
     * instance.
     */
    showResults(term?: any): void;
    /**
     * @name hideResults
     *
     * @description - This method deletes the picker results from the DOM.
     */
    hideResults(err?: any): void;
    value: any;
    checkTerm(event: any): void;
    onTouched(event?: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
