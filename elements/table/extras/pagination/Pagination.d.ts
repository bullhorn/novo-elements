import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
export declare class Pagination implements OnInit, OnChanges {
    labels: NovoLabelService;
    page: number;
    totalItems: number;
    itemsPerPage: number;
    rowOptions: any;
    label: string;
    disablePageSelection: boolean;
    pageChange: EventEmitter<any>;
    itemsPerPageChange: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    pageSelectDisabled: boolean;
    maxPagesDisplayed: number;
    totalPages: number;
    pages: Array<any>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    getDefaultRowOptions(): {
        value: number;
        label: string;
    }[];
    onPageSizeChanged(event: any): void;
    selectPage(page: any, event?: any): void;
    noPrevious(): boolean;
    noNext(): boolean;
    makePage(number: any, text: any, isActive: any): {
        number: any;
        text: any;
        active: any;
    };
    getPages(currentPage: any, totalPages: any): any[];
    calculateTotalPages(): number;
}
