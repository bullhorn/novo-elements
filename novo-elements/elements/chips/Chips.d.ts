import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { NovoPickerElement } from 'novo-elements/elements/picker';
import { ElementSize } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
export declare class NovoChipsElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    private componentUtils;
    labels: NovoLabelService;
    readonly CHIPS_SHOWN_MAX = 999;
    closeOnSelect: boolean;
    placeholder: string;
    source: any;
    maxlength: any;
    type: any;
    allowCustomValues: boolean;
    set disablePickerInput(v: boolean);
    get disablePickerInput(): boolean;
    private _disablePickerInput;
    overrideElement: ElementRef;
    width: string;
    minWidth: string;
    size: ElementSize;
    changed: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    preview: ViewContainerRef;
    picker: NovoPickerElement;
    items: any[];
    selected: any;
    config: any;
    model: any;
    itemToAdd: any;
    popup: any;
    hiddenChipsLimit: number;
    hiddenChipsCount: number;
    _value: any;
    _items: ReplaySubject<any[]>;
    _hiddenChipsLimit: number;
    onModelChange: Function;
    onModelTouched: Function;
    changeRef: ChangeDetectorRef;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    ngOnInit(): void;
    get value(): any;
    set value(selected: any);
    clearValue(): void;
    setItems(): void;
    getLabelFromOptions(value: any): {
        value: any;
        label: any;
    };
    deselectAll(event?: any): void;
    select(event?: any, item?: any): void;
    deselect(event?: any, item?: any): void;
    onTyping(event?: any): void;
    onFocus(event?: any): void;
    add(event: any): void;
    updateHiddenChips(): void;
    toggleHiddenChips(): void;
    remove(event: any, item: any): void;
    onKeyDown(event: any): void;
    onTouched(e: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    private _finalizeItemValue;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    private _updateOverlay;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoChipsElement, "chips,novo-chips", never, { "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "source": { "alias": "source"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "type": { "alias": "type"; "required": false; }; "allowCustomValues": { "alias": "allowCustomValues"; "required": false; }; "disablePickerInput": { "alias": "disablePickerInput"; "required": false; }; "overrideElement": { "alias": "overrideElement"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "size": { "alias": "size"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "changed": "changed"; "focus": "focus"; "blur": "blur"; "typing": "typing"; }, never, ["*"], false, never>;
}
