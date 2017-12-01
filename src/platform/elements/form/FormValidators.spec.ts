// APP
import { FormValidators } from './FormValidators';

/**
 * Creates a mock address
 */
function createAddress(address1, city, state, zip, countryName) {
    return {
        address1: address1,
        city: city,
        state: state,
        zip: zip,
        countryName: countryName
    };
}

describe('FormValidators', () => {
    describe('Method: maxInteger(control)', () => {
        it('should be defined', () => {
            expect(FormValidators.maxInteger).toBeDefined();
        });
        it('should return null if valid', () => {
            expect(FormValidators.maxInteger({ value: 123 })).toBe(null);
        });
        it('should return error if invalid', () => {
            expect(FormValidators.maxInteger({ value: 1234567891011123 })).toEqual({ 'integerTooLarge': true });
        });
    });

    describe('Method: maxDouble(control)', () => {
        it('should be defined', () => {
            expect(FormValidators.maxDouble).toBeDefined();
        });
        it('should return null if valid', () => {
            expect(FormValidators.maxDouble({ value: 123 })).toBe(null);
        });
        it('should return error if invalid', () => {
            expect(FormValidators.maxDouble({ value: 123456789101112323223 })).toEqual({ 'doubleTooLarge': true });
        });
    });

    describe('Method: isEmail(control)', () => {
        it('should be defined', () => {
            expect(FormValidators.isEmail).toBeDefined();
        });
        it('should return null if valid', () => {
            expect(FormValidators.isEmail({ value: 'test@test.com' })).toBe(null);
        });
        it('should return error if invalid', () => {
            expect(FormValidators.isEmail({ value: 'NOT_AN_EMAIL' })).toEqual({ 'invalidEmail': true });
        });
    });

    describe('Method: isValidAddress(control)', () => {
        it('should be defined', () => {
            expect(FormValidators.isValidAddress).toBeDefined();
        });
        it('should return null if no value', () => {
            expect(FormValidators.isValidAddress({})).toBe(null);
        });
        it('should return null if valid', () => {
            let valid = createAddress('TEST', 'TEST', 'TEST', '12345', 'TEST');
            expect(FormValidators.isValidAddress({ value: valid })).toBe(null);
        });
        xit('should return invalid if no address1', () => {
            let address = createAddress(null, 'TEST', 'TEST', '12345', 'TEST');
            expect(FormValidators.isValidAddress({ value: address })).toEqual({ 'invalidAddress': true });
        });
        xit('should return invalid if no city', () => {
            let address = createAddress('TEST', null, 'TEST', '12345', 'TEST');
            expect(FormValidators.isValidAddress({ value: address })).toEqual({ 'invalidAddress': true });
        });
        xit('should return invalid if no state', () => {
            let address = createAddress('TEST', 'TEST', null, '12345', 'TEST');
            expect(FormValidators.isValidAddress({ value: address })).toEqual({ 'invalidAddress': true });
        });
        xit('should return invalid if no zip', () => {
            let address = createAddress('TEST', 'TEST', 'TEST', null, 'TEST');
            expect(FormValidators.isValidAddress({ value: address })).toEqual({ 'invalidAddress': true });
        });
        xit('should return invalid if bad zip', () => {
            let address = createAddress('TEST', 'TEST', 'TEST', '123', 'TEST');
            expect(FormValidators.isValidAddress({ value: address })).toEqual({ 'invalidAddress': true });
        });
        xit('should return invalid if no countryName', () => {
            let address = createAddress('TEST', 'TEST', 'TEST', '12345', null);
            expect(FormValidators.isValidAddress({ value: address })).toEqual({ 'invalidAddress': true });
        });
    });
});
