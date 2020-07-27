import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbItemElement } from './breadcrumb-item/BreadcrumbItem';
import { BreadcrumbElement } from './Breadcrumb';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon/Icon.module';

import { BreadcrumbService } from './Breadcrumb.service';

@NgModule({
  imports: [CommonModule, RouterModule, NovoDropdownModule, NovoSearchBoxModule, NovoButtonModule, NovoIconModule],
  exports: [BreadcrumbElement, BreadcrumbItemElement],
  declarations: [BreadcrumbElement, BreadcrumbItemElement],
  providers: [BreadcrumbService],
})
export class NovoBreadcrumbModule {}
