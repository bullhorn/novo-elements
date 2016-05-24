import { Directive, Input, Output, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import { isPropertyUpdated } from '@angular/common/src/forms/directives/shared';

@Directive({
    selector: '[contentEditableModel]',
    host: {
        '(input)': 'onInput()'
    }
})
export class ContentEditableModel implements OnChanges {
    @Input('contentEditableModel') model:any;
    @Output('contentEditableModelChange') update = new EventEmitter();

    lastModelValue:any;

    constructor(element:ElementRef) {
        this.element = element;
    }

    ngOnChanges(changes) {
        if (isPropertyUpdated(changes, this.lastModelValue)) {
            this.lastModelValue = this.model;
            this.element.nativeElement.innerHTML = this.model || '';
        }
    }

    onInput() {
        let value = this.element.nativeElement.innerHTML;
        this.lastModelValue = value;
        this.update.emit(value);
        return true;
    }
}
