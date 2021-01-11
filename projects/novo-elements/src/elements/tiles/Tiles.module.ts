// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoTilesElement } from './Tiles';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [NovoTilesElement],
  exports: [NovoTilesElement],
})
export class NovoTilesModule {}
