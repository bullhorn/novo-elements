// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoCKEditorElement } from './CKEditor';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NovoCKEditorElement],
  exports: [NovoCKEditorElement],
})
export class NovoNovoCKEditorModule {}
