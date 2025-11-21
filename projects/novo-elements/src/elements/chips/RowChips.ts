// NG2
import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { NovoChipElement } from './Chip';
import { NovoChipsElement } from './Chips';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoRowChipsElement),
  multi: true,
};

@Component({
  selector: 'novo-row-chip',
  template: `
    <div class="novo-row-chips-columns">
      <ng-content></ng-content>
      @if (!disabled) {
        <i class="bhi-delete-o" (click)="remove()"></i>
      }
    </div>
  `,
  host: {
    class: 'novo-row-chip novo-focus-indicator',
    '[attr.tabindex]': 'disabled ? null : tabIndex',
    role: 'option',
    '[class.novo-row-chip-selected]': 'selected',
    '[class.novo-row-chip-with-trailing-icon]': 'removeIcon',
    '[class.novo-row-chip-disabled]': 'disabled',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-selected]': 'ariaSelected',
    '(click)': '_handleClick($event)',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': 'focus()',
    '(blur)': '_blur()',
  },
  standalone: false
})
export class NovoRowChipElement extends NovoChipElement {
  onSelect(e) {
    return false;
  }
}

@Component({
    selector: 'novo-row-chips',
    providers: [CHIPS_VALUE_ACCESSOR],
    host: {
        '[class.with-value]': 'items.length > 0',
    },
    template: `
    @if (items.length > 0) {
      <div class="novo-row-chips-columns">
        @for (column of source.columns; track column) {
          <div class="column-label" [style.flexBasis.px]="column.width || 200">{{ column.label }}</div>
        }
      </div>
    }
    @if (source.emptyReadOnlyMessage && disablePickerInput && items.length === 0) {
      <div class="novo-row-chips-empty-message">
        {{ source.emptyReadOnlyMessage }}
      </div>
    }
    @for (item of _items | async; track item) {
      <novo-row-chip
        [type]="type || item?.value?.searchEntity"
        [class.selected]="item == selected"
        [disabled]="disablePickerInput"
        (removed)="remove($event, item)"
        (selectionChange)="select($event, item)"
        >
        @for (column of source.columns; track column) {
          <div
            class="column-data"
            [class.show-overflow]="column.showOverflow"
            [class.editable]="column.editable"
            [style.flexBasis.px]="column.width || 200"
            >
            @if (column.editable) {
              @if (column.type === 'checkbox') {
                <novo-checkbox [(ngModel)]="item.value[column.name]" [disabled]="!column.editable"></novo-checkbox>
              }
              @if (column.type !== 'checkbox') {
                <novo-field>
                  <input novoInput [type]="column.type || 'text'" [(ngModel)]="item.value[column.name]" />
                </novo-field>
              }
            }
            @if (!column.editable) {
              <span>{{ column.data(item) }}</span>
            }
          </div>
        }
      </novo-row-chip>
    }
    @if (!maxlength || (maxlength && items.length < maxlength)) {
      <novo-picker
        clearValueOnSelect="true"
        [closeOnSelect]="closeOnSelect"
        [config]="source"
        [disablePickerInput]="disablePickerInput"
        [hidden]="disablePickerInput"
        [placeholder]="placeholder"
        [(ngModel)]="itemToAdd"
        (select)="add($event)"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus($event)"
        (typing)="onTyping($event)"
        (blur)="onTouched($event)"
        [selected]="items"
        >
      </novo-picker>
    }
    <div class="preview-container">
      <span #preview></span>
    </div>
    `,
    styleUrls: ['./RowChips.scss'],
    standalone: false
})
export class NovoRowChipsElement extends NovoChipsElement {
  @Input()
  closeOnSelect: boolean = true;

  constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService) {
    super(element, componentUtils, labels);
  }

  onKeyDown(event) {
    return;
  }
}
