// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
// APP
import { NovoOptionComponent } from './option.component';
import { NovoOptionGroupComponent } from './option-group.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NovoOptionComponent, NovoOptionGroupComponent],
    exports: [NovoOptionComponent, NovoOptionGroupComponent],
})
export class NovoOptionModule {
}
