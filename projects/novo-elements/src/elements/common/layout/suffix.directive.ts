import { Directive } from '@angular/core';

@Directive({
    selector: '[suffix],[after]',
    standalone: false
})
export class NovoSuffixDirective {}
