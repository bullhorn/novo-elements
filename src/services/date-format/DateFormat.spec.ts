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

    describe('Function: getDateTimeMask()', () => {
        it('should be defined', () => {
            expect(service.getDateTimeMask).toBeDefined();
        });
    });

    describe('Function: getTimeMask()', () => {
        it('should be defined', () => {
            expect(service.getTimeMask).toBeDefined();
        });
    });

    describe('Function: getTimePlaceHolder(militaryTime: boolean): string', () => {
       it('should be defined', () => {
            expect(service.getTimePlaceHolder).toBeDefined();
        });
    });

    describe('Function: parseDateString(dateString: string): Date', () => {
       it('should be defined', () => {
            expect(service.parseDateString).toBeDefined();
        });
    });

    describe('Function: parseTimeString(timeString: string, militaryTime: boolean): Date', () => {
       it('should be defined', () => {
            expect(service.parseTimeString).toBeDefined();
        });
    });

    describe('Function: parseDateTimeString(dateTimeString: string, militaryTime: boolean): Date', () => {
       it('should be defined', () => {
            expect(service.parseDateTimeString).toBeDefined();
        });
    });

    describe('Function: parseString(dateTimeString: string, militaryTime: boolean, type: string)', () => {
       it('should be defined', () => {
            expect(service.parseString).toBeDefined();
        });
    });

});
