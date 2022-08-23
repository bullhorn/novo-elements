// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoRowChipElement, NovoRowChipsElement } from './row-chips';
import { NovoChipsElement } from './chips';
import { NovoChipList } from './chip-list';
import { NovoChipInput } from './chip-input';
import { NovoChipsDefaultOptions, NOVO_CHIPS_DEFAULT_OPTIONS } from './chip-defaults';
import { NovoChipAvatar, NovoChipElement, NovoChipRemove } from './chip';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoFieldModule } from 'novo-elements/components/field';
import { ErrorStateMatcher } from 'novo-elements/common';
import { Key } from 'novo-elements/utils';
@NgModule({
  imports: [CommonModule, FormsModule, NovoPickerModule, NovoIconModule, NovoFieldModule],
  declarations: [
    NovoChipElement,
    NovoChipAvatar,
    NovoChipRemove,
    NovoChipInput,
    NovoChipList,
    NovoChipsElement,
    NovoRowChipElement,
    NovoRowChipsElement,
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
