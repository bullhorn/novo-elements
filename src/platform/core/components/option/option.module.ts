// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoOptionComponent } from './option.component';
import { NovoOptionGroupComponent } from './option-group.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoOptionComponent, NovoOptionGroupComponent],
    exports: [NovoOptionComponent, NovoOptionGroupComponent],
})
export class NovoOptionModule {
}
