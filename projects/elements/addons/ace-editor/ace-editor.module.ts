// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAceEditor } from './ace-editor';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoAceEditor],
  exports: [NovoAceEditor],
})
export class NovoAceEditorModule {}
