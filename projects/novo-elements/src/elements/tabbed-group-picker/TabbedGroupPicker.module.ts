// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoTabbedGroupPickerElement } from './TabbedGroupPicker';
import { NovoTabModule } from '../tabs/Tabs.module';
import { NovoListModule } from '../list/List.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';

@NgModule({
  imports: [CommonModule, FormsModule, NovoTabModule, NovoListModule, NovoFormExtrasModule, NovoButtonModule, NovoDropdownModule],
  declarations: [NovoTabbedGroupPickerElement],
  exports: [NovoTabbedGroupPickerElement],
})
export class NovoTabbedGroupPickerModule {}
