// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoCKEditorElement } from './CKEditor';
import { NovoPopOverModule } from '../popover/PopOver.module';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPopOverModule],
  declarations: [NovoCKEditorElement],
  exports: [NovoCKEditorElement],
})
export class NovoNovoCKEditorModule {}
