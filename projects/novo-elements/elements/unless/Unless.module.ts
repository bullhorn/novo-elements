// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { Unless } from './Unless';

@NgModule({
  imports: [CommonModule],
  declarations: [Unless],
  exports: [Unless],
})
export class UnlessModule {}
