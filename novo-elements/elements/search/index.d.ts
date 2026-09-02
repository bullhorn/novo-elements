import * as i0 from '@angular/core';
import { OnInit, AfterContentChecked, ElementRef, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from 'novo-elements/services';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/icon';
import * as i4 from 'novo-elements/elements/picker';
import * as i5 from 'novo-elements/elements/tooltip';
import * as i6 from 'novo-elements/elements/common';

/**
 * Marker directive for content projected into the leading (left) area of `novo-search`.
 * When present, the text input is hidden and the projected content fills its space.
 */
declare class NovoSearchLeadingContentDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSearchLeadingContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoSearchLeadingContentDirective, "[novo-search-leading-content]", never, {}, {}, never, never, false, never>;
}
declare class NovoSearchBoxElement implements ControlValueAccessor, OnInit, AfterContentChecked {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    private _zone;
    name: string;
    icon: string;
    position: string;
    placeholder: string;
    alwaysOpen: boolean;
    bordered: boolean;
    get hasBorder(): boolean;
    theme: string;
    color: string;
    closeOnSelect: boolean;
    displayField: string;
    displayValue: string;
    hint: string;
    keepOpen: boolean;
    hasBackdrop: boolean;
    allowPropagation: boolean;
    overrideElement: ElementRef;
    searchChanged: EventEmitter<string>;
    applySearch: EventEmitter<KeyboardEvent>;
    focused: boolean;
    value: any;
    leadingContent: NovoSearchLeadingContentDirective;
    get hasLeadingContent(): boolean;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    /** Element for the panel containing the autocomplete options. */
    overlay: any;
    input: any;
    private debounceSearchChange;
    private _hasLeadingContent;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, _zone: NgZone);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    showSearch(event?: any, forceClose?: boolean): void;
    onFocus(): void;
    onBlur(): void;
    onSelect(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    get active(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: KeyboardEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private _setValue;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSearchBoxElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSearchBoxElement, "novo-search", never, { "name": { "alias": "name"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "position": { "alias": "position"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "alwaysOpen": { "alias": "alwaysOpen"; "required": false; }; "bordered": { "alias": "bordered"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "displayField": { "alias": "displayField"; "required": false; }; "displayValue": { "alias": "displayValue"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; "allowPropagation": { "alias": "allowPropagation"; "required": false; }; "overrideElement": { "alias": "overrideElement"; "required": false; }; }, { "searchChanged": "searchChanged"; "applySearch": "applySearch"; }, ["leadingContent"], ["[novo-search-leading-content]", "[novo-search-trailing-action]", "*"], false, never>;
}

declare class NovoSearchBoxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSearchBoxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoSearchBoxModule, [typeof NovoSearchBoxElement, typeof NovoSearchLeadingContentDirective], [typeof i2.CommonModule, typeof i3.NovoIconModule, typeof i4.NovoPickerModule, typeof i5.NovoTooltipModule, typeof i6.NovoOverlayModule], [typeof NovoSearchBoxElement, typeof NovoSearchLeadingContentDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoSearchBoxModule>;
}

export { NovoSearchBoxElement, NovoSearchBoxModule, NovoSearchLeadingContentDirective };
