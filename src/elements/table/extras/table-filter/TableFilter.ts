// NG2
import { Directive, EventEmitter, ElementRef, Renderer, OnChanges, OnInit, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[novoTableFilter]',
    host: {
        '(input)': 'onChangeFilter($event)',
        '(click)': 'onClick($event)'
    }
})
export class TableFilter implements OnInit, OnChanges {
    @Input('novoTableFilter') config: any;
    @Output() onFilterChange: EventEmitter<any> = new EventEmitter();

    filterThrottle: any;

    constructor(private element: ElementRef, private renderer: Renderer) {
        this.element = element;
        this.renderer = renderer;
    }

    ngOnInit() {
        this.ngOnChanges();
    }

    ngOnChanges(changes?: SimpleChanges) {
        let label = '';
        if (this.config.freetextFilter) {
            label = this.config.freetextFilter;
        } else if (this.config.filter) {
            label = this.config.filter;
        }
        this.renderer.setElementProperty(this.element, 'value', label);
    }

    onChangeFilter(event) {
        clearTimeout(this.filterThrottle);
        this.filterThrottle = setTimeout(() => {
            this.config.filter = event.target.value;
            this.onFilterChange.emit({ filtering: this.config });
        }, 300);
    }

    onClick(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
