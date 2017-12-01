import { EventEmitter, ElementRef, OnInit } from '@angular/core';
export declare class ThOrderable implements OnInit {
    private element;
    column: any;
    onOrderChange: EventEmitter<any>;
    table: any;
    clone: any;
    target: any;
    constructor(element: ElementRef);
    readonly index: number;
    ngOnInit(): void;
    /**
     * @name onDragStart
     * @param event
     */
    onDragStart(event?: any): void;
    /**
     * @name deleteColumns
     * @param table
     */
    deleteColumns(table: {
        rows: Array<any>;
        deleteRow: Function;
    }): void;
    findTable(start: any): any;
    onDrag(event?: any): boolean;
    onDragEnd(event?: any): boolean;
    onDrop(event?: any): boolean;
    /**
     * @name onDragOver
     * @param event
     * @returns {boolean}
     */
    onDragOver(event: {
        preventDefault: Function;
        dataTransfer: {
            dropEffect: string;
        };
        stopPropagation: Function;
    }): false;
    onDragEnter(event: any): void;
    onDragLeave(event?: any): void;
}
