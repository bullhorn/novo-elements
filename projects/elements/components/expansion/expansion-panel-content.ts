import { Directive, TemplateRef } from '@angular/core';

/**
 * Expansion panel content that will be rendered lazily
 * after the panel is opened for the first time.
 */
@Directive({
  selector: 'ng-template[matExpansionPanelContent]',
})
export class NovoExpansionPanelContent {
  constructor(public _template: TemplateRef<any>) {}
}
