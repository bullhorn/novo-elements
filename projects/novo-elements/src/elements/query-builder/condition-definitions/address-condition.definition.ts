import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoOverlayTemplateComponent } from '../../common/overlay/Overlay';
import { NovoLabelService } from '../../../services';

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
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup)">
              {{ item.formatted_address }}
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.location"
              (keyup)="onKeyup($event)"
              (focus)="openPanel()"
              (click)="openPanel()"
              #addressInput />
          </novo-chip-list>
          <novo-overlay-template [parent]="novoField._elementRef" #overlay>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup)" formControlName="value"></google-places-list>
          </novo-overlay-template>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
  @ViewChild('addressInput') addressInputElement: ElementRef;
  @ViewChild('overlay') overlay: NovoOverlayTemplateComponent;
  defaultOperator = 'includeAny';
  chipListModel: any = '';
  term: string = '';

  constructor(public element: ElementRef, public labels: NovoLabelService) {
    super(labels);
  }

  onKeyup(event) {
    this.term = event.target.value;
  }

  openPanel(): void {
    this.overlay?.openPanel();
  }

  getValue(formGroup: AbstractControl): any[] {
    return formGroup.value.value || [];
  }

  selectPlace(event: any, formGroup: AbstractControl): void {
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
    this.addressInputElement.nativeElement.value = '';
  }

  remove(valueToRemove: any, formGroup: AbstractControl): void {
    const current = this.getValue(formGroup);
    const index = current.indexOf(valueToRemove);
    if (index >= 0) {
      const oldValue = [...current]
      oldValue.splice(index, 1);
      formGroup.get('value').setValue(oldValue);
    }
  }
}
