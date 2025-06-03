// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoTilesElement } from './Tiles';

@NgModule({
  imports: [CommonModule, NovoButtonModule, ReactiveFormsModule],
  declarations: [NovoTilesElement],
  exports: [NovoTilesElement],
})
export class NovoTilesModule {}
