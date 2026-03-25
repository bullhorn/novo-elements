import * as i0 from '@angular/core';
import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { OutsideClick } from 'novo-elements/utils';
import * as i2 from '@angular/common';
import * as i3 from 'novo-elements/elements/tabs';
import * as i4 from 'novo-elements/elements/list';

declare class NovoCategoryDropdownElement extends OutsideClick implements OnInit, OnDestroy {
    labels: NovoLabelService;
    _query: string;
    _categoryMap: any;
    _categories: string[];
    clickHandler: Function;
    _masterCategoryMap: any;
    _queryTimeout: any;
    persistSelection: boolean;
    closeOnSelect: boolean;
    search: any;
    footer: any;
    _select: EventEmitter<any>;
    categorySelected: EventEmitter<any>;
    set categories(categories: any);
    constructor(element: ElementRef, labels: NovoLabelService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onKeyDown(event: any): void;
    clearSelection(): void;
    select(event: any, item: any): void;
    onCategorySelected(category: any): void;
    clearQuery(event: any): void;
    queryCategories(query: any): void;
    executeClickCallback(event: any, link: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCategoryDropdownElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCategoryDropdownElement, "novo-category-dropdown", never, { "persistSelection": { "alias": "persistSelection"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "search": { "alias": "search"; "required": false; }; "footer": { "alias": "footer"; "required": false; }; "categories": { "alias": "categories"; "required": false; }; }, { "_select": "itemSelected"; "categorySelected": "categorySelected"; }, never, ["button"], false, never>;
}

declare class NovoCategoryDropdownModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCategoryDropdownModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoCategoryDropdownModule, [typeof NovoCategoryDropdownElement], [typeof i2.CommonModule, typeof i3.NovoTabModule, typeof i4.NovoListModule], [typeof NovoCategoryDropdownElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoCategoryDropdownModule>;
}

export { NovoCategoryDropdownElement, NovoCategoryDropdownModule };
