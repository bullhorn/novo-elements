import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { BreadcrumbElement } from './Breadcrumb';
import { BreadcrumbItemElement } from './breadcrumb-item/BreadcrumbItem';
import { BreadcrumbService } from './Breadcrumb.service';

@NgModule({
  imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule],
  exports: [BreadcrumbElement, BreadcrumbItemElement],
  declarations: [BreadcrumbElement, BreadcrumbItemElement],
  providers: [BreadcrumbService],
})
export class NovoBreadcrumbModule {}
