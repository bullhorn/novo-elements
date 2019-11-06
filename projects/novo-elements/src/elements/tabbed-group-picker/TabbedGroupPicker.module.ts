// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
// APP
import { NovoTabbedGroupPickerElement } from './TabbedGroupPicker';
import { NovoTabModule } from '../tabs/Tabs.module';
import { NovoListModule } from '../list/List.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoLabelService } from '../../services/novo-label-service';

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
