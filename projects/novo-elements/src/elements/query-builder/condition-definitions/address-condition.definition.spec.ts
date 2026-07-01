import { signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NovoDefaultAddressConditionDef } from './address-condition.definition';

describe('NovoDefaultAddressConditionDef', () => {
  beforeEach(() => {
    NovoDefaultAddressConditionDef.prototype.radiusUnits = signal('km');
  });

  describe('Function: isRadiusOperatorSelected', () => {
    it('should return false if operator is not insideRadius or outsideRadius', () => {
      const formGroup = new FormGroup({
        value: new FormControl(null),
        operator: new FormControl('includeAny'),
      });
      const actual = (NovoDefaultAddressConditionDef.prototype as any).isRadiusOperatorSelected(formGroup);
      expect(actual).toBeFalsy();
    });
    it('should return true if operator is insideRadius', () => {
      const formGroup = new FormGroup({
        value: new FormControl(null),
        operator: new FormControl('insideRadius'),
      });
      const actual = (NovoDefaultAddressConditionDef.prototype as any).isRadiusOperatorSelected(formGroup);
      expect(actual).toBeTruthy();
    });
    it('should return true if operator is outsideRadius', () => {
      const formGroup = new FormGroup({
        value: new FormControl(null),
        operator: new FormControl('outsideRadius'),
      });
      const actual = (NovoDefaultAddressConditionDef.prototype as any).isRadiusOperatorSelected(formGroup);
      expect(actual).toBeTruthy();
    });
  });
  describe('Function: addressLabel', () => {
    const addressLabel = NovoDefaultAddressConditionDef.prototype.addressLabel;

    it('uses formatted_address for the Google client-SDK shape', () => {
      expect(addressLabel({ formatted_address: 'Boston, MA, USA' } as any)).toBe('Boston, MA, USA');
    });

    it('falls back to formattedAddress for the address-search-service shape', () => {
      expect(addressLabel({ formattedAddress: 'Boston, MA, USA' } as any)).toBe('Boston, MA, USA');
    });

    it('returns empty string when neither field is present', () => {
      expect(addressLabel({} as any)).toBe('');
      expect(addressLabel(undefined as any)).toBe('');
    });
  });

  describe('Function: selectPlace', () => {
    const buildContext = (formGroup: FormGroup) => ({
      getValue: NovoDefaultAddressConditionDef.prototype.getValue,
      updateRadiusInValues: (_fg: any, values: any[]) => values,
      inputChildren: { forEach: () => {} },
      getCurrentInput: () => undefined,
      closePlacesList: () => {},
    });

    it('should store the Google client-SDK fields when the result has address_components', () => {
      const formGroup = new FormGroup({ value: new FormControl(null) });
      const googleEvent = {
        address_components: [{ long_name: 'Boston', short_name: 'Boston', types: ['locality'] }],
        formatted_address: 'Boston, MA, USA',
        geometry: { location: { lat: 1, lng: 2 } },
        name: 'Boston',
        place_id: 'g1',
        types: ['locality'],
        extraneous: 'dropped',
      };
      NovoDefaultAddressConditionDef.prototype.selectPlace.call(buildContext(formGroup), googleEvent, formGroup, 'v1');
      expect(formGroup.get('value').value).toEqual([
        {
          address_components: googleEvent.address_components,
          formatted_address: 'Boston, MA, USA',
          geometry: googleEvent.geometry,
          name: 'Boston',
          postal_codes: undefined,
          place_id: 'g1',
          types: ['locality'],
        },
      ]);
    });

    it('should store the flat address-search-service shape as-is when there are no address_components', () => {
      const formGroup = new FormGroup({ value: new FormControl(null) });
      const flatEvent = {
        city: 'Boston',
        state: 'Massachusetts',
        countryName: 'United States',
        formattedAddress: 'Boston, MA, USA',
        referenceId: 'ref-1',
        viewport: { northeast: { latitude: 1, longitude: 2 }, southwest: { latitude: 3, longitude: 4 } },
      };
      NovoDefaultAddressConditionDef.prototype.selectPlace.call(buildContext(formGroup), flatEvent, formGroup, 'v1');
      expect(formGroup.get('value').value).toEqual([flatEvent]);
    });

    it('does not store UI-state fields (active, description) added by setRecentLocation into the form value', () => {
      const formGroup = new FormGroup({ value: new FormControl(null) });
      const flatEventWithUiState = {
        city: 'Boston',
        formattedAddress: 'Boston, MA, USA',
        referenceId: 'ref-1',
        active: false,
        description: 'Boston, MA, USA',
      };
      NovoDefaultAddressConditionDef.prototype.selectPlace.call(buildContext(formGroup), flatEventWithUiState, formGroup, 'v1');
      const stored = formGroup.get('value').value[0];
      expect(stored.active).toBeUndefined();
      expect(stored.description).toBeUndefined();
      expect(stored.city).toBe('Boston');
      expect(stored.formattedAddress).toBe('Boston, MA, USA');
      expect(stored.referenceId).toBe('ref-1');
    });

    it('should append to existing values', () => {
      const formGroup = new FormGroup({ value: new FormControl([{ referenceId: 'existing' }]) });
      NovoDefaultAddressConditionDef.prototype.selectPlace.call(buildContext(formGroup), { referenceId: 'new' }, formGroup, 'v1');
      expect(formGroup.get('value').value).toEqual([{ referenceId: 'existing' }, { referenceId: 'new' }]);
    });
  });

  describe('Function: updateRadiusInValues', () => {
    it('should return values updated with the radius based on form values if radius operator is selected', () => {
      const expected = [
        {
          id: 1,
          radius: {
            operator: 'insideRadius',
            units: 'km',
            value: 3,
          },
        },
      ];
      const values = [{ id: 1 }];
      const formGroup = new FormGroup({
        value: new FormControl(null),
        operator: new FormControl('insideRadius'),
        supportingValue: new FormControl(3),
      });
      const actual = (NovoDefaultAddressConditionDef.prototype as any).updateRadiusInValues(formGroup, values);
      expect(actual).toEqual(expected);
    });
    it('should not set raidus if radius operator is not selected', () => {
      const expected = [
        {
          id: 1,
          radius: undefined,
        },
      ];
      const values = [{ id: 1 }];
      const formGroup = new FormGroup({
        value: new FormControl(null),
        operator: new FormControl('includeAny'),
        supportingValue: new FormControl(null),
      });
      const actual = (NovoDefaultAddressConditionDef.prototype as any).updateRadiusInValues(formGroup, values);
      expect(actual).toEqual(expected);
    });
  });
});
