import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import { Key } from 'novo-elements/utils';

/**
 * Handle selection of field values when a list of options is provided.
 */
@Component({
  selector: 'novo-address-condition-def',
  template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'excludeAny']" #novoField>
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
              <novo-text ellipsis>{{ item.formatted_address }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              (keydown)="onKeydown($event, viewIndex)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
  @ViewChildren(NovoPickerToggleElement) overlayChildren: QueryList<NovoPickerToggleElement>;
  @ViewChildren('addressInput') inputChildren: QueryList<ElementRef>;
  @ViewChild('placesPicker') placesPicker: PlacesListComponent;

  defaultOperator = 'includeAny';
  chipListModel: any = '';
  term: string = '';

  constructor(public element: ElementRef, public labels: NovoLabelService) {
    super(labels);
  }

  onKeyup(event, viewIndex) {
    if (![Key.Escape, Key.Enter].includes(event.key)) {
      this.openPlacesList(viewIndex);
    }
    this.term = event.target.value;
  }

  onKeydown(event, viewIndex) {
    if (!this.placesPicker.dropdownOpen) {
      this.openPlacesList(viewIndex);
      this.placesPicker.dropdownOpen = true;
    }
    if ([Key.Escape, Key.Tab].includes(event.key)) {
      this.closePlacesList(viewIndex);
    } else {
      this.placesPicker.onKeyDown(event);
    }
  }

  getValue(formGroup: AbstractControl): any[] {
    return formGroup.value.value || [];
  }

  getCurrentOverlay(viewIndex: string): NovoPickerToggleElement {
    return this.overlayChildren?.find(item => item.overlayId === viewIndex);
  }

  getCurrentInput(viewIndex: string): ElementRef {
    return this.inputChildren?.find(item => (item as any).nativeElement.id === viewIndex);
  }

  openPlacesList(viewIndex) {
    this.getCurrentOverlay(viewIndex)?.openPanel();
  }

  closePlacesList(viewIndex) {
    this.getCurrentOverlay(viewIndex)?.closePanel();
  }

  selectPlace(event: any, formGroup: AbstractControl, viewIndex: string): void {
    const valueToAdd = {
      address_components: event.address_components,
      formatted_address: event.formatted_address,
      geometry: event.geometry,
      place_id: event.place_id,
    };
    const current = this.getValue(formGroup);
    if (!Array.isArray(current)) {
      formGroup.get('value').setValue([valueToAdd]);
    } else {
      formGroup.get('value').setValue([...current, valueToAdd]);
    }
    this.inputChildren.forEach(input => {
      input.nativeElement.value = '';
    })
    this.getCurrentInput(viewIndex)?.nativeElement.focus();
    this.closePlacesList(viewIndex);
  }

  remove(valueToRemove: any, formGroup: AbstractControl, viewIndex: string): void {
    const current = this.getValue(formGroup);
    const index = current.indexOf(valueToRemove);
    if (index >= 0) {
      const oldValue = [...current]
      oldValue.splice(index, 1);
      formGroup.get('value').setValue(oldValue);
    }
    this.closePlacesList(viewIndex);
  }
}
