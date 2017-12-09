import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NovoTilesComponent } from './tiles.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [NovoTilesComponent],
  exports: [NovoTilesComponent],
})
export class NovoTilesModule {
}
