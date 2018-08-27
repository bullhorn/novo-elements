// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoLoadingModule } from './../loading/Loading.module';
import { NovoListModule } from './../list/List.module';
import { QuickNoteElement } from './QuickNote';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';

@NgModule({
  imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule],
  declarations: [QuickNoteElement, QuickNoteResults],
  exports: [QuickNoteElement, QuickNoteResults],
  entryComponents: [QuickNoteResults],
})
export class NovoQuickNoteModule {}
