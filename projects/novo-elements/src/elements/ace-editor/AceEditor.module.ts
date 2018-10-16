// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoAceEditor } from './AceEditor';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoAceEditor],
  exports: [NovoAceEditor],
})
export class NovoAceEditorModule {}
