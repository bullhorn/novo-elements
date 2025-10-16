import { Directive } from '@angular/core';

/**
 * Directive for providing a custom clear-icon.
 * e.g.
 * <novo-select-search [formControl]="bankFilterCtrl">
 *   <novo-icon novoSelectSearchClear>x</novo-icon>
 * </novo-select-search>
 */
@Directive({
    selector: '[novoSelectSearchClear]',
    standalone: false
})
export class NovoSelectSearchClearDirective {}
