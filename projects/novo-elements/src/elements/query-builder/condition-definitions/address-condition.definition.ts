import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  QueryList,
  Signal,
  signal,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { PlacesListComponent } from 'novo-elements/elements/places';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers, Key } from 'novo-elements/utils';
import { Subscription } from 'rxjs';
import {
  AddressCriteriaConfig,
  AddressData,
  AddressRadius,
  AddressRadiusUnitsName,
  Operator,
  RadiusUnits,
} from '../query-builder.types';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import { NovoSelectElement } from 'novo-elements/elements/select';

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
          <novo-option value="insideRadius" *ngIf="radiusEnabled()">{{ labels.insideRadius }}</novo-option>
          <novo-option value="outsideRadius" *ngIf="radiusEnabled()">{{ labels.outsideRadius }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [formGroup]="formGroup">
        <novo-flex justify="space-between" align="end">
          <novo-field #input *ngIf="['insideRadius', 'outsideRadius'].includes(formGroup.value.operator)" class="address-radius">
            <input
              novoInput
              type="number"
              min="1"
              step="1"
              placeholder="{{ unitsLabel() }}"
              [value]="radius()"
              #distanceInput
              (input)="onRadiusSelect(formGroup, $event)"
            />
            <span *ngIf="!!this.radius()" style="margin-left: 8px;">{{ unitsLabel() }}</span>
          </novo-field>
          <novo-field #novoField class="address-location">
            <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
              <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
                <novo-text ellipsis [tooltip]="item.formatted_address" tooltipOnOverflow>{{ item.formatted_address }}</novo-text>
                <novo-icon novoChipRemove>close</novo-icon>
              </novo-chip>
              <input
                novoChipInput
                [id]="viewIndex"
                [placeholder]="labels.location"
                (keyup)="onKeyup($event, viewIndex)"
                (keydown)="onKeydown($event, viewIndex)"
                [picker]="placesPicker"
                #addressInput/>
            </novo-chip-list>
            <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
              <google-places-list
                [term]="term"
                (select)="selectPlace($event, formGroup, viewIndex)"
                formControlName="value"
                #placesPicker/>
            </novo-picker-toggle>
          </novo-field>
        </novo-flex>
      </ng-container>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef implements OnDestroy {
  @ViewChildren(NovoPickerToggleElement) overlayChildren: QueryList<NovoPickerToggleElement>;
  @ViewChildren('addressInput') inputChildren: QueryList<ElementRef>;
  @ViewChild('placesPicker') placesPicker: PlacesListComponent;
  @ViewChildren(NovoSelectElement) addressSideTest: any;

  // Static defaults
  radiusValues: number[] = [5, 10, 20, 30, 40, 50, 100];
  defaultRadius: number = 30;

  // Overridable defaults
  defaults: AddressCriteriaConfig = {
    radiusEnabled: false,
    radiusUnits: 'miles',
  };
  config: InputSignal<AddressCriteriaConfig> = input();
  radiusUnits: Signal<AddressRadiusUnitsName> = computed(() =>
    this.config()?.radiusUnits || this.defaults.radiusUnits
  );
  radiusEnabled: Signal<boolean> = computed(() =>
    this.config()?.radiusEnabled || this.defaults.radiusEnabled
  );
  unitsLabel: Signal<string> = computed(() =>
    this.radiusUnits() === RadiusUnits.miles ? this.labels.miles : this.labels.km
  );

  radius: WritableSignal<number> = signal(null);
  radiusOptions: Signal<{ label: string; value: number; }[]> = computed(() => {
    const unitsLabel = this.radiusUnits() === RadiusUnits.miles ? this.labels.miles : this.labels.km;
    return this.radiusValues.map(value => ({
      label: `${value.toString()} ${unitsLabel}`,
      value,
    }));
  });

  defaultOperator = Operator.includeAny;
  chipListModel: any = '';
  term: string = '';

  private _addressChangesSubscription: Subscription = Subscription.EMPTY;

  public element = inject(ElementRef);

  constructor(labelService: NovoLabelService) {
    super(labelService);
    this.defineOperatorEditGroup(Operator.includeAny, Operator.excludeAny, Operator.insideRadius, Operator.outsideRadius);
  }

  frameAfterViewInit(): void {
    super.frameAfterViewInit();
    // Initialize the radius value from existing data
    this.assignRadiusFromValue();

    // Update the radius on address value changes
    this._addressChangesSubscription = this.inputChildren.changes.subscribe(() => {
      this.assignRadiusFromValue();
    });
  }

  ngOnDestroy() {
    this._addressChangesSubscription.unsubscribe();
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

  getValue(formGroup: AbstractControl): AddressData[] {
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
    const valueToAdd: AddressData = {
      address_components: event.address_components,
      formatted_address: event.formatted_address,
      geometry: event.geometry,
      name: event.name,
      place_id: event.place_id,
      types: event.types,
    };
    const current: AddressData | AddressData[] = this.getValue(formGroup);
    const updated: AddressData[] = Array.isArray(current) ? [...current, valueToAdd] : [valueToAdd];
    formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, updated));

    this.inputChildren.forEach(input => {
      input.nativeElement.value = '';
    })
    this.getCurrentInput(viewIndex)?.nativeElement.focus();
    this.closePlacesList(viewIndex);
  }

  remove(valueToRemove: AddressData, formGroup: AbstractControl, viewIndex: string): void {
    const current = this.getValue(formGroup);
    const index = current.indexOf(valueToRemove);
    if (index >= 0) {
      const oldValue = [...current]
      oldValue.splice(index, 1);
      formGroup.get('value').setValue(oldValue);
    }
    this.closePlacesList(viewIndex);
  }

  // Override abstract behavior - allow moving location from includeAny to radius, but when moving the opposite direction,
  // trim out radius information from the value
  onOperatorSelect(formGroup: UntypedFormGroup): void {
    const previousOperator = this._previousOperatorValue;
    super.onOperatorSelect(formGroup);
    if ([previousOperator, formGroup.get('operator').getRawValue()].indexOf(Operator.insideRadius) !== -1 && //
        formGroup.get('value').getRawValue() != null) {
      formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
    }
  }

  onRadiusSelect(formGroup: AbstractControl, event): void {
    this.radius.set(event.target.value);
    // We must dirty the form explicitly to show up as a user modification when it was done programmatically
    formGroup.get('value').setValue(this.updateRadiusInValues(formGroup, this.getValue(formGroup)));
    formGroup.markAsDirty();
  }

  private assignRadiusFromValue() {
    if (this.placesPicker?.model?.length) {
      const addressData: AddressData = this.placesPicker.model[0];
      const initialRadius = addressData.radius?.value;
      if (initialRadius && Helpers.isNumber(initialRadius)) {
        this.radius.set(initialRadius);
      }
    }
  }

  private updateRadiusInValues(formGroup: AbstractControl, values: AddressData[]): AddressData[] {
    return values.map(val => ({
      ...val,
      radius: this.isRadiusOperatorSelected(formGroup) ? this.getRadiusData(formGroup) : undefined,
    }));
  }

  private getRadiusData(formGroup: AbstractControl): AddressRadius {
    return {
      value: this.radius(),
      units: this.radiusUnits(),
      operator: formGroup.value.operator,
    };
  }

  private getRadius(formGroup: AbstractControl): number | undefined {
    return this.isRadiusOperatorSelected(formGroup) ? this.radius() : undefined;
  }

  private isRadiusOperatorSelected(formGroup: AbstractControl): boolean {
    return ['insideRadius', 'outsideRadius'].includes(formGroup.get('operator')?.value) && this.radius !== null;
  }
}
