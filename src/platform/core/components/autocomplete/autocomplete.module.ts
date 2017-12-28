
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { NovoOverlayModule } from '../overlay';
import { NovoListModule } from '../list';
import { NovoAutocompleteComponent } from './autocomplete.component';
import { NovoAutocompleteDirective } from './autocomplete.directive';

@NgModule({
    imports: [NovoOverlayModule, NovoListModule, OverlayModule, CommonModule],
    exports: [NovoAutocompleteComponent, NovoAutocompleteDirective],
    declarations: [NovoAutocompleteComponent, NovoAutocompleteDirective],
})
export class NovoAutocompleteModule { }
