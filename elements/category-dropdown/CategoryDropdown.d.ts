import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class NovoCategoryDropdownElement extends OutsideClick implements OnInit, OnDestroy {
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
    categories: any;
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
}
