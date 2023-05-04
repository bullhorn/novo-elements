import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCheckboxElement } from './Checkbox';
import { NovoCheckListElement } from './CheckList';

@NgModule({
  imports: [CommonModule, A11yModule, FormsModule],
  declarations: [NovoCheckboxElement, NovoCheckListElement],
  exports: [NovoCheckboxElement, NovoCheckListElement],
})
export class NovoCheckboxModule {}
