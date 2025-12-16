import { Directive } from '@angular/core';

@Directive({
    selector: '[prefix],[before]',
    standalone: false,
})
export class NovoPrefixDirective {}
