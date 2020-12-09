// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoListModule } from '../list/List.module';
import { NovoTabModule } from '../tabs/Tabs.module';
// APP
import { NovoTabbedGroupPickerElement } from './TabbedGroupPicker';

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
  ],
  providers: [NovoLabelService],
  declarations: [NovoTabbedGroupPickerElement],
  exports: [NovoTabbedGroupPickerElement],
})
export class NovoTabbedGroupPickerModule {}
