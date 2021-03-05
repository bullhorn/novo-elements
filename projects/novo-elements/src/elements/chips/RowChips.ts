// NG2
import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
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
  template: `<div class="novo-row-chips-columns">
    <ng-content></ng-content><i class="bhi-delete-o" *ngIf="!disabled" (click)="remove()"></i>
  </div>`,
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
    <div class="novo-row-chips-columns" *ngIf="items.length > 0">
      <div class="column-label" *ngFor="let column of source.columns">{{ column.label }}</div>
    </div>
    <div class="novo-row-chips-empty-message" *ngIf="source.emptyReadOnlyMessage && disablePickerInput && items.length === 0">
      {{ source.emptyReadOnlyMessage }}
    </div>
    <novo-row-chip
      *ngFor="let item of _items | async"
      [type]="type || item?.value?.searchEntity"
      [class.selected]="item == selected"
      [disabled]="disablePickerInput"
      (removed)="remove($event, item)"
      (selectionChange)="select($event, item)"
    >
      <div class="column-data" *ngFor="let column of source.columns">
        <span>{{ column.data(item) }}</span>
      </div>
    </novo-row-chip>
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
      [overrideElement]="element"
      *ngIf="!maxlength || (maxlength && items.length < maxlength)"
    >
    </novo-picker>
    <div class="preview-container">
      <span #preview></span>
    </div>
  `,
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
