import { EventEmitter, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class NovoSearchBoxElement implements ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    private _zone;
    name: string;
    icon: string;
    placeholder: string;
    alwaysOpen: boolean;
    theme: string;
    closeOnSelect: boolean;
    displayField: string;
    displayValue: string;
    hint: string;
    searchChanged: EventEmitter<string>;
    focused: boolean;
    value: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    /** Element for the panel containing the autocomplete options. */
    overlay: any;
    input: any;
    private debounceSearchChange;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, _zone: NgZone);
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event?: any, forceClose?: boolean): void;
    onFocus(): void;
    onBlur(): void;
    /** BEGIN: Convienient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    readonly panelOpen: boolean;
    readonly active: boolean;
    /** END: Convienient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private _setValue(value);
    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip: any): void;
}
