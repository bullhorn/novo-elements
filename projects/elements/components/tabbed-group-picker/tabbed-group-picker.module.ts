// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoTabbedGroupPickerElement } from './tabbed-group-picker';
import { NovoTabModule } from 'novo-elements/components/tabs';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoFormExtrasModule } from 'novo-elements/components/form/extras';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoOptionModule } from 'novo-elements/common';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoLabelService } from 'novo-elements/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    NovoTabModule,
    NovoListModule,
    NovoFormExtrasModule,
    NovoButtonModule,
    NovoDropdownModule,
    NovoOptionModule,
    NovoCheckboxModule,
  ],
  providers: [NovoLabelService],
  declarations: [NovoTabbedGroupPickerElement],
  exports: [NovoTabbedGroupPickerElement],
})
export class NovoTabbedGroupPickerModule {}
