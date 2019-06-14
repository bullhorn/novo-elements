// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoCKEditorElement } from './CKEditor';
import { NovoPopOverModule } from '../popover/PopOver.module';
import { NovoButtonModule } from '../button/Button.module';

@NgModule({
  imports: [CommonModule, FormsModule, NovoPopOverModule, NovoButtonModule],
  declarations: [NovoCKEditorElement],
  exports: [NovoCKEditorElement],
})
export class NovoNovoCKEditorModule {}
