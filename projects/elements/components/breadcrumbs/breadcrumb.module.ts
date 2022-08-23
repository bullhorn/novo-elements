import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbItemElement } from './breadcrumb-item/breadcrumb-item';
import { BreadcrumbElement } from './breadcrumb';
import { NovoSearchBoxModule } from 'novo-elements/components/search';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoOptionModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule, NovoOptionModule],
  exports: [BreadcrumbElement, BreadcrumbItemElement],
  declarations: [BreadcrumbElement, BreadcrumbItemElement],
  providers: [BreadcrumbService],
})
export class NovoBreadcrumbModule {}
