// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoCKEditorElement } from './CKEditor';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NovoCKEditorElement],
  exports: [NovoCKEditorElement],
})
export class NovoNovoCKEditorModule {}
