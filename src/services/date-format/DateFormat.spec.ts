// APP
import { DateFormatService } from './DateFormat';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

xdescribe('Service: DateFormatService', () => {
    let service;

    beforeEach(() => {
        service = new DateFormatService(new NovoLabelService());
    });

    describe('Function: getDateMask()', () => {
        it('should be defined', () => {
            expect(service.getDateMask).toBeDefined();
        });
        it('should return a default mask', () => {
            service.labels.dateFormat = '';
            let actual = service.getDateMask();
            expect(actual.length).toBeGreaterThan(0);
        });
        it('should return a mask that supports a date with format dd-MM-yyyy', () => {
            let value = '11-02-2017';
            let dateMask = service.getDateMask();
            for (let i in dateMask) {
                if (dateMask[i]) {
                    expect(dateMask[i].match(value[i])).toBeTruthy();
                }
            }
        });
        it('should return a mask that supports dd.MM.yyyy', () => {
            let value = '11.02.2017';
            let dateMask = service.getDateMask();
            for (let i in dateMask) {
                if (dateMask[i]) {
                    expect(dateMask[i].match(value[i])).toBeTruthy();
                }
            }
        });
        it('should return a mask that supports d/M/yyyy', () => {
            let value = '1/2/2017';
            let dateMask = service.getDateMask();
            for (let i in dateMask) {
                if (dateMask[i]) {
                    expect(dateMask[i].match(value[i])).toBeTruthy();
                }
            }
        });
        it('should return a mask that supports M/d/yyyy', () => {
            let value = '2/1/2017';
            let dateMask = service.getDateMask();
            for (let i in dateMask) {
                if (dateMask[i]) {
                    expect(dateMask[i].match(value[i])).toBeTruthy();
                }
            }
        });
    });

    describe('Function: getTimeMask()', () => {
        it('should be defined', () => {
            expect(service.getTimeMask).toBeDefined();
        });
        it('should work for militaryTime', () => {
        });
    });

    describe('Function: getTimePlaceHolder(militaryTime: boolean): string', () => {
        it('should be defined', () => {
            expect(service.getTimePlaceHolder).toBeDefined();
        });
        it('should get the right placeholder for 24 hour time', () => {
            service.labels.timeFormatPlaceholder24Hour = 'stuff';
            expect(service.getTimePlaceHolder()).toEqual(service.labels.timeFormatPlaceholder24Hour);
        });
        it('should get the right placeholder for 12 hour time', () => {
            service.labels.timeFormatPlaceholderAM = 'stuff';
            expect(service.getTimePlaceHolder()).toEqual(service.labels.timeFormatPlaceholderAM);
        });
    });

    describe('Function: parseDateString(dateString: string): Date', () => {
        it('should be defined', () => {
            expect(service.parseDateString).toBeDefined();
        });
        describe('when dateFormat is not defined', () => {
            it('should parse the date string using mm/dd/yyyy', () => {
                expect(service.parseDateString).toBeDefined();
            });
            it('should accommodate for error states when dateString in an unsupported format ', () => {
                expect(service.parseDateString).toBeDefined();
            });
        });
        describe('when dateString is a complete date value ', () => {
            it('should parse date correctly when format is dd-MM-yyyy', () => {

            });
            it('should parse date correctly when format is dd.MM.yyyy', () => {
                service.labels.dateFormat = 'dd.MM.yyyy';
                expect(service.getDateMask()).toEqual([ /\d/, /\d/, /./, /\d/, /\d/, /./, /\d/, /\d/, /\d/, /\d/]);
            });
            it('should parse date correctly when format is  d/M/yyyy', () => {
                service.labels.dateFormat = 'd/M/yyyy';
                expect(service.getDateMask()).toEqual([ /\d/, /\d/, /\//, /\d/, /\d/, /\//, /\d/, /\d/, /\d/, /\d/]);
            });
            it('should parse date correctly when format is  M/d/yyyy', () => {
                service.labels.dateFormat = 'M/d/yyyy';
                expect(service.getDateMask()).toEqual([ /\d/, /\d/, /\//, /\d/, /\d/, /\//, /\d/, /\d/, /\d/, /\d/]);
            });
        });
        describe('when dateString is an incomplete date value ', () => {
            describe('and only 1 digit is filled in', () => {
                it('should fill in the right delimiter for dd-MM-yyyy', () => {
                });
                it('should fill in the right delimiter for dd.MM.yyyy', () => {
                });
            });
            describe('when 2 date-part digits are filled in', () => {
                it('should fill in the right delimiter for d/M/yyyy', () => {
                });
                it('should fill in the right delimiter for M/d/yyyy', () => {
                });
            });
        });
    });

    describe('Function: parseTimeString(timeString: string, militaryTime: boolean): Date', () => {
        it('should be defined', () => {
            expect(service.parseTimeString).toBeDefined();
        });
        it('should not parse if the string doesn\'t contain :', () => {
            let [value, timeString] = service.parseTimeString('', false);
            expect(timeString).toEqual('');
        });
        describe('for 24hour time', () => {
            it('should parse 1:45', () => {
            });
            it('should parse 07:45', () => {
            });
        });
        describe('for 12hour time', () => {
            describe('when timeString has an AM value', () => {
                it('should convert 12:45AM to 00:45', () => {

                });
                it('should convert 1:45A.M. to 1:45', () => {

                });
            });
            describe('when timeString has a PM value', () => {
                it('should convert 1:45PM to 13:45', () => {

                });
                it('should convert 1:45P.M. to 13:45', () => {

                });
            });
        });
    });

    describe('Function: parseString(dateTimeString: string, militaryTime: boolean, type: string)', () => {
        it('should be defined', () => {
            expect(service.parseString).toBeDefined();
        });
        it('should call parseDateString for dates', () => {
            spyOn(service, 'parseDateString');
            service.parseString('', false, 'date');
            expect(service.parseDateString).toHaveBeenCalled();
        });
        it('should call parseTimeString for time', () => {
            spyOn(service, 'parseTimeString');
            service.parseString('', false, 'time');
            expect(service.parseTimeString).toHaveBeenCalledWith('', false);
        });
    });

    describe('Function: isValidDatePart(value: string, format: string): boolean', () => {
        it('should be defined', () => {
            expect(service.isValidDatePart).toBeDefined();
        });
        it('should return false if format is m and value is 1', () => {
            expect(service.isValidDatePart('1', 'm')).toEqual(false);
        });
        it('should return true if format is m and value is 3', () => {
           expect(service.isValidDatePart('3', 'm')).toEqual(true);
        });
        it('should return false if format is m and value is 0', () => {
           expect(service.isValidDatePart('0', 'm')).toEqual(false);
        });
        it('should return false if format is d and value is 0', () => {
            expect(service.isValidDatePart('0', 'd')).toEqual(false);
        });
        it('should return false if format is d and value is 2', () => {
            expect(service.isValidDatePart('2', 'd')).toEqual(false);
        });
        it('should return true if format is d and value is 4', () => {
            expect(service.isValidDatePart('4', 'd')).toEqual(true);
        });
        it('should return false if format is y and value is 1', () => {
            expect(service.isValidDatePart('1', 'yyyy')).toEqual(true);
        });
        it('should return true if format is y and value is 1900', () => {
            expect(service.isValidDatePart('1900', 'yyyy')).toEqual(true);
        });
    });

});
