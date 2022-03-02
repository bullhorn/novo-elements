import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovoButtonModule } from '../button/Button.module';
import { NovoOptionModule } from '../common';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
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
