// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoTabModule } from 'novo-elements/elements/tabs';
import { NovoTabbedGroupPickerElement } from './TabbedGroupPicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    NovoChipsModule,
    NovoCommonModule,
    NovoIconModule,
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
