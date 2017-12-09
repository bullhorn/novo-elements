// APP
import { getCountries, getStates, getStateObjects, findByCountryCode } from './countries.service';

describe('Utils: Countries', () => {
    describe('Method: getCountries()', () => {
        it('should be defined', () => {
            expect(getCountries).toBeDefined();
        });

        it('should get Countries', () => {
            expect(getCountries()[0]).toBe('United States');
        });
    });

    describe('Method: getStates(country)', () => {
        it('should be defined', () => {
            expect(getStates).toBeDefined();
        });

        it('should get states for US', () => {
            expect(getStates('United States')[0]).toBe('Alabama');
        });
    });

    describe('Method: getStateObjects(countryName)', () => {
        it('should be defined', () => {
            expect(getStateObjects).toBeDefined();
        });

        it('should get states for US', () => {
            expect(getStateObjects('United States')[0]).toEqual({ code: 'AL', name: 'Alabama' });
        });
    });

    describe('Method: findByCountryCode(countryCode)', () => {
        it('should be defined', () => {
            expect(findByCountryCode).toBeDefined();
        });

        it('should get states for US', () => {
            expect(findByCountryCode('VI').name).toEqual('Virgin Islands; U.S.');
        });
    });
});
