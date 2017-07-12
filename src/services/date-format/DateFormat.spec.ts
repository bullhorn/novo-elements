// APP
import { DateFormatService } from './DateFormat';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Service: DateFormatService', () => {
    let service;

    beforeEach(() => {
        service = new DateFormatService(new NovoLabelService());
    });

    describe('Function: getDateMask()', () => {
        beforeEach(() => {
        });
        it('should be defined', () => {
            expect(service.getDateMask).toBeDefined();
        });
        it('should return a default mask when the dateFormat is empty', () => {
            service.labels.dateFormat = '';
            let actual = service.getDateMask();
            expect(actual.length).toBeGreaterThan(0);
        });
        it('should return a the correct mask when dateFormat is dd-MM-yyyy', () => {
            service.labels.dateFormat = 'dd-MM-yyyy';
            expect(service.getDateMask()).toEqual([ /\d/, /\d/, /-/, /\d/, /\d/, /-/, /\d/, /\d/, /\d/, /\d/ ]);
        });
        it('should return a the correct mask when dateFormat is dd.MM.yyyy', () => {
            service.labels.dateFormat = 'dd.MM.yyyy';
            expect(service.getDateMask()).toEqual([ /\d/, /\d/, /./, /\d/, /\d/, /./, /\d/, /\d/, /\d/, /\d/]);
        });
        it('should return a the correct mask when dateFormat is d/M/yyyy', () => {
            service.labels.dateFormat = 'd/M/yyyy';
            expect(service.getDateMask()).toEqual([ /\d/, /\d/, /\//, /\d/, /\d/, /\//, /\d/, /\d/, /\d/, /\d/]);
        });
        it('should return a the correct mask when dateFormat is M/d/yyyy', () => {
            service.labels.dateFormat = 'M/d/yyyy';
            expect(service.getDateMask()).toEqual([ /\d/, /\d/, /\//, /\d/, /\d/, /\//, /\d/, /\d/, /\d/, /\d/]);
        });
    });

});
