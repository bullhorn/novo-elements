// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';
import { QuickNoteElement } from './QuickNote';

@NgModule({
  imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoPipesModule],
  declarations: [QuickNoteElement, QuickNoteResults],
  exports: [QuickNoteElement, QuickNoteResults],
})
export class NovoQuickNoteModule {}
