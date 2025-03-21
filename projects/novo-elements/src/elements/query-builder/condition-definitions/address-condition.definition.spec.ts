import { signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NovoDefaultAddressConditionDef } from './address-condition.definition';

describe('NovoDefaultAddressConditionDef', () => {
    beforeEach(() => {
        NovoDefaultAddressConditionDef.prototype.radiusUnits = signal('km');
    })

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
    describe('Function: updateRadiusInValues', () => {
        it('should return values updated with the radius based on form values if radius operator is selected', () => {
            const expected = [{
                id: 1,
                radius: {
                    operator: 'insideRadius',
                    units: 'km',
                    value: 3,
                },
            }];
            const values = [
                { id: 1 },
            ];
            const formGroup = new FormGroup({
                value: new FormControl(null),
                operator: new FormControl('insideRadius'),
                supportingValue: new FormControl(3),
            });
            const actual = (NovoDefaultAddressConditionDef.prototype as any).updateRadiusInValues(formGroup, values);
            expect(actual).toEqual(expected);
        });
        it('should not set raidus if radius operator is not selected', () => {
            const expected = [{
                id: 1,
                radius: undefined,
            }];
            const values = [
                { id: 1 },
            ];
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
