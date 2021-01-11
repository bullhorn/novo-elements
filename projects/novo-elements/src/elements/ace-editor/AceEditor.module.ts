// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoAceEditor } from './AceEditor';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoAceEditor],
  exports: [NovoAceEditor],
})
export class NovoAceEditorModule {}
