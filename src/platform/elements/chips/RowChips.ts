// NG2
import { Component, forwardRef, ElementRef, Input } from '@angular/core';
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
  selector: 'novo-row-chip',
  template: `<div class="novo-row-chips-columns"><ng-content></ng-content><i class="bhi-delete-o" *ngIf="!disabled" (click)="onRemove($event)"></i></div>`,
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
        <novo-row-chip
          *ngFor="let item of _items | async"
          [type]="type || item?.value?.searchEntity"
          [class.selected]="item == selected"
          [disabled]="disablePickerInput"
          (remove)="remove($event, item)"
          (select)="select($event, item)">
          <div class="column-data" *ngFor="let column of source.columns"><span>{{ column.data(item) }}</span></div>
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
            [overrideElement]="element">
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
