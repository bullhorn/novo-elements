// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoTilesElement } from './Tiles';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [NovoTilesElement],
  exports: [NovoTilesElement],
})
export class NovoTilesModule {}
