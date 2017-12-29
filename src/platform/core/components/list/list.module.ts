import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoButtonModule } from './../button/button.module';
import { NovoIconModule } from './../icon/icon.module';
import { NovoListComponent, NovoListItemComponent, NovoListDividerComponent, NovoItemContentComponent } from './list.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoIconModule],
  declarations: [NovoListComponent, NovoListDividerComponent, NovoListItemComponent, NovoItemContentComponent],
  exports: [NovoListComponent, NovoListDividerComponent, NovoListItemComponent, NovoItemContentComponent],
})
export class NovoListModule {
}
