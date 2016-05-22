import { FormValidators } from './FormValidators';

describe('Util: FormValidators', () => {
    describe('Method: maxInteger(control)', () => {
        it('should return null for correct data', () => {
            expect(FormValidators.maxInteger({ value: 123 })).toEqual(null);
        });
        it('should return the error for incorrect data', () => {
            expect(FormValidators.maxInteger({ value: 2147483657 })).toEqual({ 'maxInteger': true });
        });
    });

    describe('Method: maxDouble(control)', () => {
        it('should return null for correct data', () => {
            expect(FormValidators.maxDouble({ value: 123 })).toEqual(null);
        });
        it('should return the error for incorrect data', () => {
            expect(FormValidators.maxDouble({ value: Number.MAX_SAFE_INTEGER + 10 })).toEqual({ 'maxDouble': true });
        });
    });

    describe('Method: isNumber(control)', () => {
        it('should return null for correct data', () => {
            expect(FormValidators.isNumber({ value: 123 })).toEqual(null);
        });
        it('should return the error for incorrect data', () => {
            expect(FormValidators.isNumber({ value: Number.NaN })).toEqual({ 'requiredNumber': true });
        });
    });
});
