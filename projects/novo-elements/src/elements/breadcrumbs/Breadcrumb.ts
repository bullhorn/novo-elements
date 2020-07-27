import { Component, Input, TemplateRef } from '@angular/core';
import { SourceConfig } from './Breadcrumb.types';
import { BreadcrumbService } from './Breadcrumb.service';

@Component({
  selector: 'novo-breadcrumb',
  templateUrl: './Breadcrumb.html',
  styleUrls: ['./Breadcrumb.scss'],
})
export class BreadcrumbElement {
  @Input() separatorIcon: TemplateRef<any>;
  @Input() source: Array<SourceConfig> = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  navigateTo($event, item) {
    this.breadcrumbService.navigateTo($event, item);
  }
}
