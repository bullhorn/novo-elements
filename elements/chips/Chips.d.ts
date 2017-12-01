import { EventEmitter, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
export declare class NovoChipElement {
    type: string;
    select: EventEmitter<any>;
    remove: EventEmitter<any>;
    entity: string;
    _type: string;
    onRemove(e: any): boolean;
    onSelect(e: any): boolean;
}
export declare class NovoChipsElement implements OnInit {
    element: ElementRef;
    private componentUtils;
    labels: NovoLabelService;
    closeOnSelect: boolean;
    placeholder: string;
    source: any;
    type: any;
    disablePickerInput: boolean;
    private _disablePickerInput;
    changed: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    preview: ViewContainerRef;
    items: Array<any>;
    selected: any;
    config: any;
    model: any;
    itemToAdd: any;
    popup: any;
    _value: any;
    _items: ReplaySubject<{}>;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    ngOnInit(): void;
    value: any;
    clearValue(): void;
    setItems(): void;
    getLabelFromOptions(value: any): {
        value: any;
        label: any;
    };
    deselectAll(event?: any): void;
    select(event?: any, item?: any): void;
    onTyping(event?: any): void;
    onFocus(event?: any): void;
    add(event: any): void;
    remove(event: any, item: any): void;
    onKeyDown(event: any): void;
    onTouched(e: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview(): void;
    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview(): void;
}
