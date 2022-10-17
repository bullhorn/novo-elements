import { Component, Input, TemplateRef } from '@angular/core';
import { SourceConfig } from './breadcrumb.types';
import { NOVO_BREADCRUMB_REF } from './breadcrumb.tokens';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'novo-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss'],
  providers: [{ provide: NOVO_BREADCRUMB_REF, useExisting: BreadcrumbElement }],
})
export class BreadcrumbElement {
  @Input() separatorIcon: TemplateRef<any>;
  @Input() source: Array<SourceConfig> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  navigateTo($event, item) {
    this.breadcrumbService.navigateTo($event, item);
  }
}
