import { Directive, EventEmitter, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[novoTableFilter]',
    inputs: ['config: novoTableFilter'],
    outputs: ['onFilterChange'],
    host: {
        '(input)': 'onChangeFilter($event)',
        '(click)': 'onClick($event)'
    }
})
export class TableFilter {
    constructor(element:ElementRef, renderer:Renderer) {
        this.element = element;
        this.renderer = renderer;
        this.onFilterChange = new EventEmitter();
    }

    ngOnInit() {
        this.ngOnChanges();
    }

    ngOnChanges() {
        this.renderer.setElementProperty(this.element, 'value', this.config.filter);
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
