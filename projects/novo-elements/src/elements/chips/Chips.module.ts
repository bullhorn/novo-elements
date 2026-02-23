// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { Key } from 'novo-elements/utils';
import { ErrorStateMatcher, NovoCommonModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './Chip';
import { NovoChipsDefaultOptions, NOVO_CHIPS_DEFAULT_OPTIONS } from './ChipDefaults';
import { NovoChipInput } from './ChipInput';
import { NovoChipList } from './ChipList';
import { NovoChipsElement } from './Chips';
import { NovoRowChipElement, NovoRowChipsElement } from './RowChips';
import { AvatarTypePipe } from './pipe/AvatarType.pipe';
@NgModule({
  imports: [CommonModule, FormsModule, NovoCheckboxModule, NovoPickerModule, NovoIconModule, NovoFieldModule, NovoCommonModule],
  declarations: [
    NovoChipElement,
    NovoChipAvatar,
    NovoChipRemove,
    NovoChipInput,
    NovoChipList,
    NovoChipsElement,
    NovoRowChipElement,
    NovoRowChipsElement,
    AvatarTypePipe,
  ],
  exports: [
    NovoChipElement,
    NovoChipAvatar,
    NovoChipRemove,
    NovoChipInput,
    NovoChipList,
    NovoChipsElement,
    NovoRowChipElement,
    NovoRowChipsElement,
    AvatarTypePipe,
  ],
  providers: [
    ErrorStateMatcher,
    {
      provide: NOVO_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [Key.Enter],
      } as NovoChipsDefaultOptions,
    },
  ],
})
export class NovoChipsModule {}
