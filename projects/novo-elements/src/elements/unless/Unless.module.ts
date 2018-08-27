// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { Unless } from './Unless';

@NgModule({
  imports: [CommonModule],
  declarations: [Unless],
  exports: [Unless],
})
export class UnlessModule {}
