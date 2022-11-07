// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuickNoteElement } from './quick-note';
import { QuickNoteResults } from './extras/quick-note-results/quick-note-results';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoListModule } from 'novo-elements/components/list';

@NgModule({
  imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoPipesModule],
  declarations: [QuickNoteElement, QuickNoteResults],
  exports: [QuickNoteElement, QuickNoteResults],
})
export class NovoQuickNoteModule {}
