// NG2
import { Directive, EventEmitter, ElementRef, OnInit, Input, Output } from '@angular/core';

@Directive({
    selector: '[novoThOrderable]',
    host: {
        '(dragstart)': 'onDragStart($event)',
        '(dragover)': 'onDragOver($event)',
        '(dragenter)': 'onDragEnter($event)',
        '(dragleave)': 'onDragLeave($event)',
        '(dragend)': 'onDragEnd($event)',
        '(drop)': 'onDrop($event)'
    }
})
export class ThOrderable implements OnInit {
    @Input('novoThOrderable') column: any;
    @Output() onOrderChange: EventEmitter<any> = new EventEmitter();

    table: any;
    clone: any;
    target: any;

    constructor(private element: ElementRef) {
        this.element = element;
    }

    ngOnInit() {
        if (this.column.ordering) {
            this.element.nativeElement.setAttribute('draggable', true);
            this.table = this.findTable(this.element.nativeElement);
        }
    }

    onDragStart(event?: any) {
        if (this.column.ordering) {
            this.element.nativeElement.classList.add('dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', JSON.stringify(this.column));

            this.clone = this.table.cloneNode(true);
            this.clone.style.position = 'absolute';
            this.clone.style.left = '100%';
            this.clone.style.width = '150px';
            this.deleteColumns(this.clone);
            document.body.appendChild(this.clone);
            event.dataTransfer.setDragImage(this.clone, 75, 30);
        }
    }

    get index() {
        const children = Array.prototype.slice.call(this.element.nativeElement.parentNode.children);
        return children.indexOf(this.element.nativeElement);
    }

    deleteColumns(tbl) {
        const allRows = tbl.rows;
        for (let i = 0; i < allRows.length; i++) {
            if (i > 10) {
                tbl.deleteRow(-1);
            } else {
                const cellLength = allRows[i].cells.length;
                for (let c = 0; c < cellLength; c++) {
                    if (c < this.index) {
                        allRows[i].deleteCell(0);
                    } else if (c > this.index) {
                        allRows[i].deleteCell(-1);
                    }
                }
            }
        }
    }

    findTable(start) {
        let htmlElementNode = start;
        while (htmlElementNode) {
            htmlElementNode = htmlElementNode.parentNode;
            if (htmlElementNode.tagName.toLowerCase() === 'table') {
                return htmlElementNode;
            }
        }
        return undefined;
    }

    onDrag(event?: any) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        return false;
    }

    onDragEnd(event?: any) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.element.nativeElement.classList.remove('over');
        this.element.nativeElement.classList.remove('dragging');
        document.body.removeChild(this.clone);
        return false;
    }

    onDrop(event?: any) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.element.nativeElement.classList.remove('over');
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));

        this.onOrderChange.emit({
            first: data,
            second: this.column
        });

        return false;
    }

    onDragOver(event?: any) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        event.dataTransfer.dropEffect = 'move';
        return false;
    }

    onDragEnter(event?: any) {
        this.element.nativeElement.classList.add('over');
        this.target = event.target;
    }

    onDragLeave(event?: any) {
        this.element.nativeElement.classList.remove('over');
    }
}
