// NG2
import { Component, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoChipElement, NovoChipsElement } from './Chips';

// Value accessor for the component (supports ngModel)
const CHIPS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoRowChipsElement),
  multi: true,
};

@Component({
  selector: 'row-chip,novo-row-chip',
  template: `<div class="row-chips-columns"><ng-content></ng-content><i class="bhi-delete-o" *ngIf="!disabled" (click)="onRemove($event)"></i></div>`,
})
export class NovoRowChipElement extends NovoChipElement {
  onSelect(e) {
    return false;
  }
}

@Component({
  selector: 'row-chips,novo-row-chips',
  providers: [CHIPS_VALUE_ACCESSOR],
  host: {
    '[class.with-value]': 'items.length > 0',
  },
  template: `
        <div class="row-chips-columns">
          <div class="main-column label">{{ source.columns.label }}</div>
          <div class="additional-column label" *ngFor="let column of source.columns.additionalColumns">{{ column.label }}</div>
        </div>
        <row-chip
          *ngFor="let item of _items | async"
          [type]="type || item?.value?.searchEntity"
          [class.selected]="item == selected"
          [disabled]="disablePickerInput"
          (remove)="remove($event, item)"
          (select)="select($event, item)">
          <div class="main-column column-data">{{ item.label }}</div>
          <div class="additional-column column-data" *ngFor="let column of source.columns.additionalColumns">{{ column.value(item.value) }}</div>
        </row-chip>
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
            [overrideElement]="element">
        </novo-picker>
        <div class="preview-container">
            <span #preview></span>
        </div>
   `,
})
export class NovoRowChipsElement extends NovoChipsElement {
  constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService) {
    super(element, componentUtils, labels);
  }

  onKeyDown(event) {
    return;
  }
}
