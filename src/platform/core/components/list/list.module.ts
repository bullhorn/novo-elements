// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/button.module';
import { NovoIconModule } from './../icon/icon.module';
import { NovoListComponent, NovoListItemComponent, NovoListDividerComponent } from './list.component';

@NgModule({
    imports: [CommonModule, NovoButtonModule, NovoIconModule],
    declarations: [NovoListComponent, NovoListDividerComponent, NovoListItemComponent],
    exports: [NovoListComponent, NovoListDividerComponent, NovoListItemComponent],
})
export class NovoListModule {
}
