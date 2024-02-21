// APP
import { NovoLabelService } from '../novo-label-service';
import { DateFormatService } from './DateFormat';

interface IMaskRegexOpts { mask: RegExp }

describe('Service: DateFormatService', () => {
  let service: DateFormatService;
  let labelService = new NovoLabelService();

  beforeEach(() => {
    service = new DateFormatService(labelService);
  });

  describe('Function: getDateMask()', () => {
    it('should return a mask that supports a date with format dd-MM-yyyy', () => {
      const value = '11-02-2017';
      const dateMask = service.getDateMask() as IMaskRegexOpts;
      expect(dateMask.mask.test(value)).toBeTruthy();
    });
    it('should return a mask that supports dd.MM.yyyy', () => {
      const value = '11.02.2017';
      const dateMask = service.getDateMask() as IMaskRegexOpts;;
      expect(dateMask.mask.test(value)).toBeTruthy();
    });
    it('should return a mask that supports d/M/yyyy', () => {
      const value = '1/2/2017';
      const dateMask = service.getDateMask() as IMaskRegexOpts;;
      expect(dateMask.mask.test(value)).toBeTruthy();
    });
    it('should return a mask that supports M/d/yyyy', () => {
      const value = '11/2/2017';
      const dateMask = service.getDateMask() as IMaskRegexOpts;;
      expect(dateMask.mask.test(value)).toBeTruthy();
    });
  });

  describe('Function: getTimeMask()', () => {
    it('should be defined', () => {
      expect(service.getTimeMask).toBeDefined();
    });
    describe('For Military Time', () => {
      let imask;
      beforeEach(() => {
        imask = service.getTimeMask(true);
      });
      it('should work for 1:23', () => {
        const timeString = '01:23';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 12:23', () => {
        const timeString = '12:23';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 00:23', () => {
        const timeString = '00:23';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 23:23', () => {
        const timeString = '23:23';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
    });
    describe('For 12hour time', () => {
      let imask;
      beforeEach(() => {
        imask = service.getTimeMask(false);
      });
      it('should work for 12:23am', () => {
        const timeString = '12:23am';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 12:23pm', () => {
        const timeString = '12:23pm';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 1:23pm', () => {
        const timeString = '1:23pm';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 1:23am', () => {
        const timeString = '1:23am';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      it('should work for 1:23 am (space inclusive)', () => {
        const timeString = '1:23 am';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      // Could not seem to get these tests to work - no instance of time input fields appears to respect the "A.M." formatting
      xit('should work for 1:23 A.M.', () => {
        labelService.timeFormatPlaceholderAM = 'hh:mm A.M.';
        imask = service.getTimeMask(false);
        const timeString = '1:23 A.M.';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
      xit('should work for 1:23 P.M.', () => {
        labelService.timeFormatPlaceholderAM = 'hh:mm A.M.';
        imask = service.getTimeMask(false);
        const timeString = '1:23 P.M.';
        imask.rawInputValue = timeString;
        expect(imask.rawInputValue).toEqual(timeString);
      });
    });
  });

  describe('Function: getTimePlaceHolder(militaryTime: boolean): string', () => {
    it('should be defined', () => {
      expect(service.getTimePlaceHolder).toBeDefined();
    });
    it('should get the right placeholder for 24 hour time', () => {
      labelService.timeFormatPlaceholder24Hour = 'stuff';
      expect(service.getTimePlaceHolder(true)).toEqual(labelService.timeFormatPlaceholder24Hour);
    });
    it('should get the right placeholder for 12 hour time', () => {
      labelService.timeFormatPlaceholderAM = 'stuff';
      expect(service.getTimePlaceHolder(false)).toEqual(labelService.timeFormatPlaceholderAM);
    });
  });

  describe('Function: parseDateString(dateString: string): Date', () => {
    it('should be defined', () => {
      expect(service.parseDateString).toBeDefined();
    });
    describe('when dateFormat is not defined', () => {
      beforeEach(() => {
        labelService.dateFormat = '';
      });
      it('should parse the date string using mm/dd/yyyy', () => {
        let dateString = '1/22/2017';
        let dateValue;
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(0);
        expect(dateValue.getDate()).toEqual(22);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should default to current date when dateString in an unsupported format ', () => {
        let dateString = '22-22-2017';
        let dateValue;
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue).toEqual(null);
      });
    });
    describe('when dateFormat is defined', () => {
      it('should parse the date string using dd/mm/yyyy', () => {
        let dateString = '11/2/2017';
        let dateValue;
        labelService.dateFormat = 'dd/mm/yyyy';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(1);
        expect(dateValue.getDate()).toEqual(11);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should parse the date string using M-d-yyyy', () => {
        let dateString = '2-11-2017';
        let dateValue;
        labelService.dateFormat = 'M-d-yyyy';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(1);
        expect(dateValue.getDate()).toEqual(11);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should parse the date string using dd.MM.yyyy', () => {
        let dateString = '22.01.2017';
        let dateValue;
        labelService.dateFormat = 'dd.MM.yyyy';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(0);
        expect(dateValue.getDate()).toEqual(22);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
      it('should parse the date string using yyyy-MM-dd', () => {
        let dateString = '2017-01-22';
        let dateValue;
        labelService.dateFormat = 'yyyy-MM-dd';
        [dateValue, dateString] = service.parseDateString(dateString);
        expect(dateValue.getMonth()).toEqual(0);
        expect(dateValue.getDate()).toEqual(22);
        expect(dateValue.getFullYear()).toEqual(2017);
      });
    });
    describe('when dateString is an incomplete date value ', () => {
      describe('and only 1 digit is filled in', () => {
        it('should not append delimiter for dd-MM-yyyy when value = 1', () => {
          let dateString = '1';
          let dateValue;
          labelService.dateFormat = 'dd-MM-yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('1');
        });
        it('should append delimiter for dd-MM-yyyy when value = 4', () => {
          let dateString = '4';
          let dateValue;
          labelService.dateFormat = 'dd-MM-yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4-');
        });
        it('should append delimiter for dd-MM-yyyy when value = 21', () => {
          let dateString = '21';
          let dateValue;
          labelService.dateFormat = 'dd-MM-yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('21-');
        });
        it('should fill in the right delimiter for dd.MM.yyyy when value = 5', () => {
          let dateString = '5';
          let dateValue;
          labelService.dateFormat = 'dd.MM.yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('5.');
        });
      });
      describe('when 2 date-part digits are filled in', () => {
        it('should append the right delimiter for d/M/yyyy', () => {
          let dateString = '4/11';
          let dateValue;
          labelService.dateFormat = 'd/M/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4/11/');
        });
        it('should not append the right delimiter for d/M/yyyy when value = 2/1', () => {
          let dateString = '2/1';
          let dateValue;
          labelService.dateFormat = 'd/M/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('2/1');
        });
        it('should not append the right delimiter for M/d/yyyy when value = 4/3', () => {
          let dateString = '4/3';
          let dateValue;
          labelService.dateFormat = 'M/d/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4/3');
        });
        it('should append the right delimiter for M/d/yyyy when value = 4/30', () => {
          let dateString = '4/30';
          let dateValue;
          labelService.dateFormat = 'M/d/yyyy';
          [dateValue, dateString] = service.parseDateString(dateString);
          expect(dateString).toEqual('4/30/');
        });
      });
    });
  });

  describe('Function: parseTimeString(timeString: string, militaryTime: boolean): Date', () => {
    it('should be defined', () => {
      expect(service.parseTimeString).toBeDefined();
    });
    it(`should not parse if the string doesn't contain :`, () => {
      const [value, timeString] = service.parseTimeString('', false);
      expect(timeString).toEqual('');
    });
    describe('for 24hour time', () => {
      it('should parse 1:45', () => {
        const [value, timeString] = service.parseTimeString('1:45', true);
        expect(value.getHours()).toEqual(1);
        expect(value.getMinutes()).toEqual(45);
      });
      it('should parse 07:45', () => {
        const [value, timeString] = service.parseTimeString('07:45', true);
        expect(value.getHours()).toEqual(7);
        expect(value.getMinutes()).toEqual(45);
      });
      it('should parse 12:45', () => {
        const [value, timeString] = service.parseTimeString('12:45', true);
        expect(value.getHours()).toEqual(12);
        expect(value.getMinutes()).toEqual(45);
      });
    });
    describe('for 12hour time', () => {
      describe('when timeString has an AM value', () => {
        beforeEach(() => {
          labelService.timeFormatPlaceholderAM = 'hh:mm AM';
          labelService.timeFormatAM = 'AM';
          labelService.timeFormatPM = 'PM';
        });
        it('should convert 12:45 AM to 00:45', () => {
          const [value, timeString] = service.parseTimeString('12:45AM', false);
          expect(value.getHours()).toEqual(0);
          expect(value.getMinutes()).toEqual(45);
        });
        it('should convert 1:45 AM to 1:45', () => {
          const [value, timeString] = service.parseTimeString('12:45AM', false);
          expect(value.getHours()).toEqual(0);
          expect(value.getMinutes()).toEqual(45);
        });
      });
      describe('when timeString has a P.M. value', () => {
        beforeEach(() => {
          labelService.timeFormatPlaceholderAM = 'hh:mm A.M.';
          labelService.timeFormatAM = 'A.M.';
          labelService.timeFormatPM = 'P.M.';
        });
        it('should convert 1:45 P.M. to 13:45', () => {
          const [value, timeString] = service.parseTimeString('1:45 P.M.', false);
          expect(value.getHours()).toEqual(13);
          expect(value.getMinutes()).toEqual(45);
        });
        it('should convert 12:45 P.M. to 12:45', () => {
          const [value, timeString] = service.parseTimeString('12:45 P.M.', false);
          expect(value.getHours()).toEqual(12);
          expect(value.getMinutes()).toEqual(45);
        });
      });
    });
  });

  describe('Function: parseString(dateTimeString: string, militaryTime: boolean, type: string)', () => {
    it('should call parseDateString and parseTimeString for datetime', () => {
      const dateStr = 'Tue Dec 5, 2023 3:00 PM';
      const date = new Date(dateStr);
      jest.spyOn(service, 'parseDateString').mockReturnValue([date, 'Tue Dec 5, 2023', false]);
      jest.spyOn(service, 'parseTimeString').mockReturnValueOnce([date, '3:00 PM']);
      const [returnDate, returnStr] = service.parseString('a b', false, 'datetime');
      expect(returnDate.getTime()).toEqual(date.getTime());
      expect(returnStr).toEqual(dateStr);
    });
    it('should call parseDateString for dates', () => {
      jest.spyOn(service, 'parseDateString');
      service.parseString('a', false, 'date');
      expect(service.parseDateString).toHaveBeenCalled();
    });
    it('should call parseTimeString for time', () => {
      jest.spyOn(service, 'parseTimeString');
      service.parseString('a', false, 'time');
      expect(service.parseTimeString).toHaveBeenCalledWith('a', false);
    });
    it('should immediately return null for blank values', () => {
      jest.spyOn(service, 'parseTimeString');
      const retval = service.parseString('', false, 'time');
      expect(service.parseTimeString).not.toHaveBeenCalled();
      expect(retval).toBeNull();
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
      expect(service.isValidDatePart('1', 'yyyy')).toEqual(false);
    });
    it('should return true if format is y and value is 1900', () => {
      expect(service.isValidDatePart('1900', 'yyyy')).toEqual(true);
    });
  });

  describe('Function: parseCustomDateString', () => {
    it('should recognize format of date', () => {
      const value = 'Tue Dec 5, 2023';
      const format = 'ddd MMM D, YYYY';
      const [dateTimeValue, , isInvalidDate] = service.parseCustomDateString(value, format);
      expect(isInvalidDate).toBeFalsy();
      expect(dateTimeValue.getDate()).toBe(5);
      expect(dateTimeValue.getFullYear()).toBe(2023);
    });

    it('should fail upon incorrect day of week', () => {
      const value = 'Fri Dec 5, 2023';
      const format = 'ddd MMM D, YYYY';
      const [, , isInvalidDate] = service.parseCustomDateString(value, format);
      expect(isInvalidDate).toBeTruthy();
    });

    it('should fail on mismatched day-of-month format', () => {
      const value = 'Fri Dec 05, 2023';
      const format = 'ddd MMM D, YYYY';
      const [, , isInvalidDate] = service.parseCustomDateString(value, format);
      expect(isInvalidDate).toBeTruthy();
    });
  })
});
