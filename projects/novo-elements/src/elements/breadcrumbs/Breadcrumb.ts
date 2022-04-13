import { Component, Input, TemplateRef } from '@angular/core';
import { BreadcrumbService } from './Breadcrumb.service';
import { NOVO_BREADCRUMB_REF } from './Breadcrumb.tokens';
import { SourceConfig } from './Breadcrumb.types';

@Component({
  selector: 'novo-breadcrumb',
  templateUrl: './Breadcrumb.html',
  styleUrls: ['./Breadcrumb.scss'],
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
