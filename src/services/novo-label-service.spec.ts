// APP
import { NovoLabelService } from './novo-label-service';

describe('Service: NovoLabelService', () => {
    let service;

    beforeEach(() => {
        service = new NovoLabelService();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Method: selectedRecords()', () => {
        it('should be defined.', () => {
            expect(service.selectedRecords).toBeDefined();
        });
    });

    describe('Method: totalRecords()', () => {
        it('should be defined.', () => {
            expect(service.totalRecords).toBeDefined();
        });
    });

    describe('Method: formatDateWithFormat()', () => {
        it('should be defined.', () => {
            expect(service.formatDateWithFormat).toBeDefined();
        });
    });

    describe('Method: getWeekdays()', () => {
        it('should be defined.', () => {
            expect(service.getWeekdays).toBeDefined();
        });
    });

    describe('Method: getMonths()', () => {
        it('should be defined.', () => {
            expect(service.getMonths).toBeDefined();
        });
    });

    describe('Method: getProperty()', () => {
        it('should be defined.', () => {
            expect(service.getProperty).toBeDefined();
        });
    });
});
